import { DatabaseSync } from 'node:sqlite';
const files = process.argv.slice(2);
for (const f of files) {
  console.log('\n########## ' + f.split(/[\/]/).slice(-1)[0] + ' ##########');
  try {
    const db = new DatabaseSync(f, { readOnly: true });
    const objs = db.prepare("SELECT type,name FROM sqlite_master WHERE type IN ('table','index','view','trigger') AND name NOT LIKE 'sqlite_%' ORDER BY type,name").all();
    const tables = objs.filter(o=>o.type==='table').map(o=>o.name);
    const others = objs.filter(o=>o.type!=='table').map(o=>o.type+':'+o.name);
    console.log('tables(' + tables.length + '): ' + tables.join(', '));
    if (others.length) console.log('other: ' + others.join(', '));
    for (const t of tables) {
      const cols = db.prepare('PRAGMA table_info(' + JSON.stringify(t) + ')').all();
      const n = db.prepare('SELECT COUNT(*) c FROM ' + JSON.stringify(t)).get().c;
      console.log('  - ' + t + ' [' + n + ' rows]: ' + cols.map(c=>c.name+':'+c.type).join(', '));
    }
    db.close();
  } catch (e) { console.log('  ERROR: ' + e.message); }
}
