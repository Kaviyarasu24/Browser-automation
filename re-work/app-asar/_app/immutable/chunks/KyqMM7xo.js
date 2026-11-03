const r=new Intl.PluralRules("en");function s(n,l,e=`${l}s`){return`${n.toLocaleString()} ${u(n,l,e)}`}function u(n,l,e=`${l}s`){return r.select(n)==="one"?l:e}export{u as a,s as p};
