import{l as ce,B as ee,s as R,p as le,J as V,a as g,g as _,d as W,v as de,r as U,c as B,o as ue,w as X,z as pe,a8 as fe,aa as G,f as F}from"./BY3kRY6U.js";import{S as me}from"./8W1_ar5h.js";import{e as v}from"./IjCjKoYp.js";import{a as be}from"./CLV5d7Ui.js";import{f as Y}from"./BLGKysw8.js";import{i as ye}from"./DRLWuC-J.js";import{p as ge}from"./A6C1nVJp.js";import{d as he}from"./Cx8eBnou.js";import{g as we}from"./C8WljJgk.js";const Z=1e3,$=3e4;function Ie(a){const t=new Map;async function r(n){const i=t.get(n);if(i){if(i.inFlight){i.pendingRefresh=!0;return}i.inFlight=!0;try{const I=await a.invokeQuery({alias:i.alias,sql:i.sql,params:i.params});if(t.get(n)!==i)return;const P=ke(n,I),N=JSON.stringify(P);i.lastSnapshotKey!==N&&(i.lastSnapshotKey=N,a.postSnapshot(P))}catch(I){if(t.get(n)!==i)return;const P={type:"strawberry:artifact-db:live-snapshot",subscriptionId:n,ok:!1,status:"error",error:{code:"bridge_error",message:we(I)}},N=JSON.stringify(P);i.lastSnapshotKey!==N&&(i.lastSnapshotKey=N,a.postSnapshot(P))}finally{t.get(n)===i&&(i.inFlight=!1,i.pendingRefresh&&t.has(n)&&(i.pendingRefresh=!1,await r(n)))}}}function f(n){p(n.subscriptionId);const i=ve(n.intervalMs),I={alias:n.alias||"default",sql:n.sql,params:Array.isArray(n.params)?n.params:[],tables:Ae(n.tables),timer:i===null?null:setInterval(()=>{r(n.subscriptionId)},i),lastSnapshotKey:null,inFlight:!1,pendingRefresh:!1};t.set(n.subscriptionId,I),r(n.subscriptionId)}function p(n){const i=t.get(n);i&&(i.timer&&clearInterval(i.timer),t.delete(n))}async function o(n){if(n){await r(n);return}await Promise.all([...t.keys()].map(i=>r(i)))}async function m(n){const i=[...t.entries()].filter(([,I])=>Se(I,n)).map(([I])=>I);await Promise.all(i.map(I=>r(I)))}function w(n){for(const i of t.values())if(i.alias===n)return!0;return!1}function h(){for(const n of t.keys())p(n)}return{subscribe:f,unsubscribe:p,refreshAll:o,refreshForChange:m,hasSubscriptionsForAlias:w,close:h}}function ve(a){if(!Number.isFinite(a))return null;const t=Number(a);return t<Z?Z:t>$?$:Math.round(t)}function Ae(a){if(!Array.isArray(a))return[];const t=new Set;for(const r of a){const f=r.trim();f.length>0&&t.add(f)}return[...t]}function Se(a,t){if(a.alias!==t.alias)return!1;if(a.tables.length===0||t.tables.length===0)return!0;const r=new Set(t.tables);return a.tables.some(f=>r.has(f))}function ke(a,t){return t.ok===!1?{type:"strawberry:artifact-db:live-snapshot",subscriptionId:a,ok:!1,status:"error",error:t.error}:{type:"strawberry:artifact-db:live-snapshot",subscriptionId:a,ok:!0,status:"ready",rows:t.rows??[],rowCount:t.rowCount,rowsAffected:t.rowsAffected,truncated:t.truncated}}function qe(a,t){const r=a.artifactCapabilities?.databases??[],f=_e(t),p=new Map;for(const o of[...f,...r])p.set(o.alias,o);return[...p.values()]}function Me(a,t){const r=a.artifactCapabilities?.apps??[],f=Pe(t),p=new Map;for(const o of[...f,...r]){const m=p.get(o.appId);if(!m){p.set(o.appId,o);continue}const w=o.accountBinding??(o.accountId?"fixed":m.accountBinding),h={appId:o.appId,actions:[...new Set([...m.actions,...o.actions])],role:o.role??m.role};w&&(h.accountBinding=w),w==="fixed"&&(h.accountId=o.accountId??m.accountId);const n=o.allowAccountOverride??m.allowAccountOverride;n!==void 0&&(h.allowAccountOverride=n);const i=o.cacheTtlMs??m.cacheTtlMs;i!==void 0&&(h.cacheTtlMs=i),p.set(o.appId,h)}return[...p.values()]}function ze(a){const t=a.fileServerPort&&a.fileServerPort>0?`http://127.0.0.1:${a.fileServerPort}`:"",r=a.allowRemoteImages?"https:":"",f=["data:","blob:",t,r].filter(Boolean).join(" "),p=f,o=["data:",t].filter(Boolean).join(" ");return["default-src 'none'","script-src 'unsafe-inline' 'unsafe-eval'","style-src 'unsafe-inline'",`img-src ${f}`,`media-src ${p}`,`font-src ${o}`,"connect-src 'none'","frame-src 'none'","base-uri 'none'","form-action 'none'"].join("; ")}function Ce(a,t,r={}){const f=Ne(t),o=`${`<meta http-equiv="Content-Security-Policy" content="${ze(r)}">`}${f}`;return/<head[\s>]/i.test(a)?a.replace(/<head([^>]*)>/i,`<head$1>${o}`):/<html[\s>]/i.test(a)?a.replace(/<html([^>]*)>/i,`<html$1><head>${o}</head>`):`<!doctype html><html><head>${o}</head><body>${a}</body></html>`}function _e(a){const t=te(a);return t?(t.databases??[]).map(r=>({alias:r.alias??"default",dbHandle:r.dbHandle??r.db_handle??"",role:r.role??"readonly"})).filter(r=>r.dbHandle.length>0&&(r.role==="readonly"||r.role==="readwrite")):[]}function Pe(a){const t=te(a);return t?(t.apps??[]).map(r=>{const f=r.appId??r.app_id??"",p=r.accountBinding??r.account_binding,o=r.accountId??r.account_id,m=r.allowAccountOverride??r.allow_account_override,w=r.cacheTtlMs??r.cache_ttl_ms,h={appId:f,actions:Array.isArray(r.actions)?r.actions.map(n=>String(n)):[],role:r.role??"readonly"};return p&&(h.accountBinding=p),o&&p!=="viewer"&&(h.accountId=o),m!==void 0&&(h.allowAccountOverride=m),w!==void 0&&(h.cacheTtlMs=w),{...h}}).filter(r=>r.appId.length>0&&r.actions.length>0&&(r.role==="readonly"||r.role==="readwrite")):[]}function te(a){let t;try{t=new DOMParser().parseFromString(a,"text/html")}catch{return null}const r=t.querySelector('script[type="application/json"][data-strawberry-artifact], script[type="application/json"]#strawberry-artifact-config');if(!r?.textContent?.trim())return null;try{return JSON.parse(r.textContent)}catch{return null}}function Ne(a){return`<script>
;(() => {
  const capabilitySetId = ${JSON.stringify(a)};
  const pending = new Map();
  const liveSubscriptions = new Map();
  let appWriteConfirmationHandler = null;

  function createMemoryStorage() {
    const values = new Map();
    return {
      get length() {
        return values.size;
      },
      key(index) {
        return Array.from(values.keys())[index] ?? null;
      },
      getItem(key) {
        const normalized = String(key);
        return values.has(normalized) ? values.get(normalized) : null;
      },
      setItem(key, value) {
        values.set(String(key), String(value));
      },
      removeItem(key) {
        values.delete(String(key));
      },
      clear() {
        values.clear();
      }
    };
  }

  function installStorageShim(name) {
    try {
      void window[name];
      return;
    } catch {
      try {
        Object.defineProperty(window, name, {
          configurable: true,
          enumerable: true,
          value: createMemoryStorage()
        });
      } catch {
        // Some environments may reject redefining storage. In that case the
        // artifact should avoid storage access or wrap it in try/catch.
      }
    }
  }

  installStorageShim('localStorage');
  installStorageShim('sessionStorage');

  function requestDb(payload) {
    if (!capabilitySetId) {
      return Promise.reject(new Error('This artifact does not have a database capability.'));
    }
    const requestId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    return new Promise((resolve, reject) => {
      pending.set(requestId, { resolve, reject });
      window.parent.postMessage({
        type: 'strawberry:artifact-db:request',
        requestId,
        ...payload
      }, '*');
    });
  }

  function requestApp(payload) {
    if (!capabilitySetId) {
      return Promise.reject(new Error('This artifact does not have an app capability.'));
    }
    const requestId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    return new Promise((resolve, reject) => {
      pending.set(requestId, { resolve, reject, kind: 'app' });
      window.parent.postMessage({
        type: 'strawberry:artifact-app:request',
        requestId,
        ...payload
      }, '*');
    });
  }

  function requestAppAccounts(payload) {
    if (!capabilitySetId) {
      return Promise.reject(new Error('This artifact does not have an app capability.'));
    }
    const requestId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    return new Promise((resolve, reject) => {
      pending.set(requestId, { resolve, reject, kind: 'app-accounts' });
      window.parent.postMessage({
        type: 'strawberry:artifact-app:list-accounts',
        requestId,
        ...payload
      }, '*');
    });
  }

  window.addEventListener('message', (event) => {
    const message = event.data;
    if (!message) return;
    if (message.type === 'strawberry:artifact-db:live-snapshot') {
      const subscription = liveSubscriptions.get(message.subscriptionId);
      if (!subscription || subscription.closed) return;
      subscription.callback({
        rows: message.rows || [],
        rowCount: message.rowCount,
        rowsAffected: message.rowsAffected,
        truncated: Boolean(message.truncated),
        status: message.status || (message.ok ? 'ready' : 'error'),
        ok: Boolean(message.ok),
        error: message.error
      });
      return;
    }
    if (message.type === 'strawberry:artifact-app:response') {
      const callbacks = pending.get(message.requestId);
      if (!callbacks) return;
      pending.delete(message.requestId);
      if (message.ok) {
        callbacks.resolve(message.data);
        return;
      }
      const err = new Error(message.error?.message || 'App request failed.');
      err.code = message.error?.code || 'app_error';
      callbacks.reject(err);
      return;
    }
    if (message.type === 'strawberry:artifact-app:list-accounts-response') {
      const callbacks = pending.get(message.requestId);
      if (!callbacks) return;
      pending.delete(message.requestId);
      if (message.ok) {
        callbacks.resolve(message.accounts || []);
        return;
      }
      const err = new Error(message.error?.message || 'App account list failed.');
      err.code = message.error?.code || 'app_error';
      callbacks.reject(err);
      return;
    }
    if (message.type !== 'strawberry:artifact-db:response') return;
    const callbacks = pending.get(message.requestId);
    if (!callbacks) return;
    pending.delete(message.requestId);
    if (message.ok) {
      callbacks.resolve({
        rows: message.rows || [],
        rowCount: message.rowCount,
        rowsAffected: message.rowsAffected,
        truncated: Boolean(message.truncated)
      });
      return;
    }
    const err = new Error(message.error?.message || 'Database request failed.');
    err.code = message.error?.code || 'pg_error';
    callbacks.reject(err);
  });

  function database(alias = 'default') {
    return {
      query(sql, params = []) {
        return requestDb({ alias, operation: 'query', sql, params });
      },
      execute(sql, params = []) {
        return requestDb({ alias, operation: 'execute', sql, params });
      },
      liveQuery(input, callback) {
        if (!capabilitySetId) {
          throw new Error('This artifact does not have a database capability.');
        }
        if (typeof callback !== 'function') {
          throw new Error('liveQuery requires a callback.');
        }
        const normalized =
          typeof input === 'string'
            ? { sql: input, params: [], tables: [], intervalMs: undefined }
            : {
                sql: input?.sql,
                params: Array.isArray(input?.params) ? input.params : [],
                tables: Array.isArray(input?.tables) ? input.tables : [],
                intervalMs: input?.intervalMs
              };
        if (typeof normalized.sql !== 'string' || normalized.sql.length === 0) {
          throw new Error('Invalid live query: SQL must be a string.');
        }

        const subscriptionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const subscription = { callback, closed: false };
        liveSubscriptions.set(subscriptionId, subscription);
        window.parent.postMessage({
          type: 'strawberry:artifact-db:live-subscribe',
          subscriptionId,
          alias,
          sql: normalized.sql,
          params: normalized.params,
          tables: normalized.tables,
          intervalMs: normalized.intervalMs
        }, '*');

        return {
          close() {
            if (subscription.closed) return;
            subscription.closed = true;
            liveSubscriptions.delete(subscriptionId);
            window.parent.postMessage({
              type: 'strawberry:artifact-db:live-unsubscribe',
              subscriptionId
            }, '*');
          },
          refresh() {
            if (subscription.closed) return;
            window.parent.postMessage({
              type: 'strawberry:artifact-db:live-refresh',
              subscriptionId
            }, '*');
          }
        };
      }
    };
  }

  window.strawberry = {
    app(appId) {
      return app(appId);
    },
    invokeApp(appId, actionName, params = {}, options = {}) {
      return invokeApp(appId, actionName, params, options);
    },
    setAppWriteConfirmationHandler(handler) {
      if (handler !== null && typeof handler !== 'function') {
        throw new Error('App write confirmation handler must be a function or null.');
      }
      appWriteConfirmationHandler = handler;
    },
    listAppAccounts(appId) {
      return listAppAccounts(appId);
    },
    db(alias = 'default') {
      return Promise.resolve(database(alias));
    },
    dbTransport(alias = 'default') {
      return Promise.resolve({
        query(first, second = [], third = 'all') {
          const dbRequest =
            typeof first === 'object' && first !== null
              ? {
                  sql: first.sql,
                  params: Array.isArray(first.params) ? first.params : [],
                  method: first.method || 'all'
                }
              : { sql: first, params: Array.isArray(second) ? second : [], method: third };
          if (typeof dbRequest.sql !== 'string' || dbRequest.sql.length === 0) {
            return Promise.reject(new Error('Invalid database request: SQL must be a string.'));
          }
          return requestDb({
            alias,
            operation: 'drizzle',
            sql: dbRequest.sql,
            params: dbRequest.params,
            method: dbRequest.method
          });
        }
      });
    }
  };

  function normalizeActionName(appId, actionName) {
    const trimmed = String(actionName || '').trim();
    if (!trimmed) return trimmed;
    if (trimmed.includes('_') || trimmed.includes(':')) return trimmed;
    return appId + '_' + trimmed;
  }

  function normalizeAppOptions(options) {
    if (!options || typeof options !== 'object') return {};
    const cacheInput = options.cache && typeof options.cache === 'object' ? options.cache : options;
    const cache = {};
    if (typeof cacheInput.ttlMs === 'number') cache.ttlMs = cacheInput.ttlMs;
    if (typeof cacheInput.key === 'string') cache.key = cacheInput.key;
    if (typeof cacheInput.forceRefresh === 'boolean') cache.forceRefresh = cacheInput.forceRefresh;
    return {
      accountId: typeof options.accountId === 'string' ? options.accountId : undefined,
      writeIntent: options.write === true || options.writeIntent === true,
      confirmationMessage:
        typeof options.confirmationMessage === 'string' ? options.confirmationMessage : undefined,
      cache: Object.keys(cache).length > 0 ? cache : undefined
    };
  }

  async function confirmAppWriteIfRequested(details) {
    if (!details.writeIntent) {
      return { ok: true, confirmationMessage: details.confirmationMessage };
    }
    if (typeof appWriteConfirmationHandler !== 'function') {
      return { ok: true, confirmationMessage: details.confirmationMessage };
    }

    const decision = await appWriteConfirmationHandler({
      appId: details.appId,
      actionName: details.actionName,
      params: details.params,
      confirmationMessage: details.confirmationMessage
    });
    if (decision === false) {
      return { ok: false };
    }
    if (typeof decision === 'string') {
      return { ok: true, confirmationMessage: decision };
    }
    if (decision && typeof decision === 'object') {
      if (decision.allow === false) {
        return { ok: false };
      }
      if (typeof decision.message === 'string') {
        return { ok: true, confirmationMessage: decision.message };
      }
    }
    return { ok: true, confirmationMessage: details.confirmationMessage };
  }

  async function invokeApp(appId, actionName, params = {}, options = {}) {
    const normalizedAppId = String(appId || '').trim();
    const normalizedActionName = normalizeActionName(normalizedAppId, actionName);
    if (!normalizedAppId || !normalizedActionName) {
      return Promise.reject(new Error('Invalid app request: appId and actionName are required.'));
    }
    const normalizedOptions = normalizeAppOptions(options);
    const normalizedParams = params && typeof params === 'object' ? params : {};
    const confirmation = await confirmAppWriteIfRequested({
      appId: normalizedAppId,
      actionName: normalizedActionName,
      params: normalizedParams,
      writeIntent: normalizedOptions.writeIntent,
      confirmationMessage: normalizedOptions.confirmationMessage
    });
    if (!confirmation.ok) {
      const err = new Error('App write cancelled by artifact.');
      err.code = 'user_cancelled';
      throw err;
    }
    return requestApp({
      appId: normalizedAppId,
      actionName: normalizedActionName,
      params: normalizedParams,
      accountId: normalizedOptions.accountId,
      writeIntent: normalizedOptions.writeIntent,
      cache: normalizedOptions.cache
    });
  }

  function listAppAccounts(appId) {
    const normalizedAppId = String(appId || '').trim();
    if (!normalizedAppId) {
      return Promise.reject(new Error('Invalid app account request: appId is required.'));
    }
    return requestAppAccounts({ appId: normalizedAppId });
  }

  function app(appId) {
    return new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === 'then') return undefined;
          if (typeof prop !== 'string') return undefined;
          return (params = {}, options = {}) => invokeApp(appId, prop, params, options);
        }
      }
    );
  }
})();
<\/script>`}var je=F('<div class="w-full h-full flex items-center justify-center"><!></div>'),Re=F('<div class="w-full h-full flex items-center justify-center p-4 text-sm text-muted-foreground"> </div>'),xe=F('<iframe sandbox="allow-scripts allow-modals" referrerpolicy="no-referrer" title="HTML Preview" class="w-full h-full border-0" style="background: transparent;"></iframe>'),Te=F('<div data-testid="artifact-html-view" class="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden"><!></div>');function Ee(a,t){ce(t,!0);let r=ee(t,"bundleUrl",3,null),f=R(null),p=R(null),o=R(null),m=R(!0),w=R(null),h=R(null),n=R(le([]));V(()=>{const s=t.url,c=r(),y=t.file,A=t.sessionId,d=t.companionProfileId;let C=!1,S=null;g(m,!0),g(w,null),g(p,null),g(o,null),g(h,null),g(n,[],!0);async function T(){try{const z=await fetch(s);if(C)return;if(!z.ok){g(w,z.status===404?"File not found":`Failed to load (${z.status})`,!0),g(m,!1);return}const x=await z.text();if(C)return;const j=Me(y,x);g(n,j,!0);const E=Y.derived.agentDbEnabled?qe(y,x):[];if(!(E.length>0||j.length>0)&&c){g(p,c,!0),g(m,!1);return}if(!Y.derived.agentDbEnabled&&j.length===0){g(o,x,!0),g(m,!1);return}const l=ge.currentProfile?.id;if(y.hostPath&&d&&(E.length>0||j.length>0&&l)){const k=await v.invoke("artifact-db:create-capability-set",{sessionId:A,companionId:d,profileId:l,artifactPath:y.hostPath,databases:E,apps:l?j:[]});if(C){k?.capabilitySetId&&await v.invoke("artifact-db:delete-capability-set",{capabilitySetId:k.capabilitySetId});return}S=k?.capabilitySetId??null,g(h,S,!0)}g(o,Ce(x,S,{fileServerPort:ye.port,allowRemoteImages:!S}),!0),g(m,!1)}catch{if(C)return;g(w,"Failed to load HTML artifact"),g(m,!1)}}return T(),()=>{C=!0;const z=S;z&&v.invoke("artifact-db:delete-capability-set",{capabilitySetId:z}).catch(()=>{})}}),V(()=>{const s=_(f),c=_(h),y=_(n),A=t.file.hostPath;if(!s||!A)return;const d=Ie({invokeQuery:async l=>{if(!c)return{ok:!1,error:{code:"forbidden",message:"This artifact does not have a database capability."}};const e=await v.invoke("artifact-db:request",{capabilitySetId:c,sessionId:t.sessionId,artifactPath:A,alias:l.alias,operation:"query",sql:l.sql,params:l.params,method:"all"});return e?.ok?{ok:!0,rows:e.rows??[],rowCount:e.rowCount,rowsAffected:e.rowsAffected,truncated:e.truncated}:{ok:!1,error:e?.error??{code:"pg_error",message:"Database request failed."}}},postSnapshot:l=>{s.contentWindow?.postMessage(l,"*")}}),C=new Map,S=new Map,T=new Set;let z=!1;function x(l,e){const k={type:"strawberry:artifact-db:live-snapshot",subscriptionId:l,ok:!1,status:"error",error:{code:"invalid_input",message:e}};s.contentWindow?.postMessage(k,"*")}async function j(l){if(c&&!(S.has(l)||T.has(l))){T.add(l);try{const e=await v.invoke("artifact-db:subscribe-realtime",{capabilitySetId:c,sessionId:t.sessionId,artifactPath:A,alias:l});if(!e?.ok)return;if(z||!d.hasSubscriptionsForAlias(l)){v.invoke("artifact-db:unsubscribe-realtime",{subscriptionKey:e.subscriptionKey}).catch(()=>{});return}const k=v.subscribeTargeted("artifact-db:changed",[e.subscriptionKey],b=>{const q={alias:b.alias,tables:[b.tableName]};d.refreshForChange(q)}),u=v.subscribeTargeted("artifact-db:ready",[e.subscriptionKey],b=>{const q={alias:b.alias,tables:[]};d.refreshForChange(q)});S.set(l,{subscriptionKey:e.subscriptionKey,cleanupTargetedSubscriptions:()=>{k(),u()}})}finally{T.delete(l)}}}function E(l){if(d.hasSubscriptionsForAlias(l))return;const e=S.get(l);e&&(e.cleanupTargetedSubscriptions(),S.delete(l),v.invoke("artifact-db:unsubscribe-realtime",{subscriptionKey:e.subscriptionKey}).catch(()=>{}))}async function D(l){if(l.source!==s.contentWindow)return;const e=l.data;if(!e)return;if(e.type==="strawberry:artifact-db:live-subscribe"){const u=String(e.subscriptionId??""),b=String(e.alias??"default"),q=String(e.sql??"");if(!u||!q){x(u,"Invalid live query subscription.");return}C.set(u,b),d.subscribe({type:"strawberry:artifact-db:live-subscribe",subscriptionId:u,alias:b,sql:q,params:Array.isArray(e.params)?e.params:[],tables:Array.isArray(e.tables)?e.tables:[],intervalMs:typeof e.intervalMs=="number"?e.intervalMs:void 0}),j(b);return}if(e.type==="strawberry:artifact-db:live-unsubscribe"){const u=String(e.subscriptionId??""),b=C.get(u);d.unsubscribe(u),C.delete(u),b&&E(b);return}if(e.type==="strawberry:artifact-db:live-refresh"){await d.refreshAll(e.subscriptionId?String(e.subscriptionId):void 0);return}if(e.type==="strawberry:artifact-app:list-accounts"){const u=String(e.requestId??""),b=String(e.appId??"");let q;const O=I(y,b);if(!c||!O)q={type:"strawberry:artifact-app:list-accounts-response",requestId:u,ok:!1,error:{code:"forbidden",message:"This artifact does not have that app capability."}};else{const L=await v.invoke("integration:get-connections",{});q={type:"strawberry:artifact-app:list-accounts-response",requestId:u,ok:!0,accounts:P(L?.integrations??[],b,O)}}s.contentWindow?.postMessage(q,"*");return}if(e.type==="strawberry:artifact-app:request"){const u=String(e.requestId??"");let b;if(!c)b={type:"strawberry:artifact-app:response",requestId:u,ok:!1,error:{code:"forbidden",message:"This artifact does not have an app capability."}};else{const q=e.params&&typeof e.params=="object"&&!Array.isArray(e.params)?e.params:{},O=String(e.appId??""),L=String(e.actionName??""),oe=e.writeIntent===!0,Q=J=>v.invoke("artifact-app:request",{capabilitySetId:c,sessionId:t.sessionId,artifactPath:A,appId:O,actionName:L,params:q,accountId:typeof e.accountId=="string"?e.accountId:void 0,writeIntent:oe,approvalId:J,cache:e.cache&&typeof e.cache=="object"?{ttlMs:typeof e.cache.ttlMs=="number"?e.cache.ttlMs:void 0,key:typeof e.cache.key=="string"?e.cache.key:void 0,forceRefresh:typeof e.cache.forceRefresh=="boolean"?e.cache.forceRefresh:void 0}:void 0});let M=await Q();if(!M?.ok&&M?.error?.code==="permission_required"&&M.error.approval){if(!await re(M.error.approval)){b=N(u),s.contentWindow?.postMessage(b,"*");return}M=await Q(M.error.approval.id)}b={type:"strawberry:artifact-app:response",requestId:u,ok:!!M?.ok,data:M?.data,cached:M?.cached,error:M?.error?{code:M.error.code,message:M.error.message}:void 0}}s.contentWindow?.postMessage(b,"*");return}if(e.type!=="strawberry:artifact-db:request")return;let k;if(!c)k={type:"strawberry:artifact-db:response",requestId:String(e.requestId??""),ok:!1,error:{code:"forbidden",message:"This artifact does not have a database capability."}};else{const u=await v.invoke("artifact-db:request",{capabilitySetId:c,sessionId:t.sessionId,artifactPath:A,alias:String(e.alias??"default"),operation:e.operation==="execute"||e.operation==="drizzle"?e.operation:"query",sql:String(e.sql??""),params:Array.isArray(e.params)?e.params:[],method:e.method==="get"||e.method==="run"||e.method==="values"?e.method:"all"});k={type:"strawberry:artifact-db:response",requestId:String(e.requestId??""),ok:!!u?.ok,rows:u?.rows,rowCount:u?.rowCount,rowsAffected:u?.rowsAffected,truncated:u?.truncated,error:u?.error}}s.contentWindow?.postMessage(k,"*"),k.ok&&i(e)&&await d.refreshAll()}return window.addEventListener("message",D),()=>{z=!0,window.removeEventListener("message",D);for(const l of S.values())l.cleanupTargetedSubscriptions(),v.invoke("artifact-db:unsubscribe-realtime",{subscriptionKey:l.subscriptionKey}).catch(()=>{});S.clear(),d.close()}});function i(s){return s.operation==="execute"?!0:s.operation==="drizzle"&&s.method==="run"}function I(s,c){return s.find(y=>y.appId===c)}function P(s,c,y){const A=s.filter(d=>d.connectionId&&he(d.id,c)).map(d=>({id:d.connectionId??"",name:d.accountName||d.connectionId||d.name})).filter(d=>d.id.length>0);return y.accountBinding!=="fixed"?A:A.filter(d=>d.id===y.accountId)}function N(s){return{type:"strawberry:artifact-app:response",requestId:s,ok:!1,error:{code:"user_cancelled",message:"App write cancelled by user."}}}async function re(s){const c=H(s.appId),y=H(s.actionName),A=s.accountId?`
Account: ${H(s.accountId)}`:"";return await be({title:"Allow this artifact to modify connected app data?",description:`App: ${c}
Action: ${y}${A}`,actionLabel:"Allow"})}function H(s){return s.replace(/[\u0000-\u001f\u007f]/g," ").trim().slice(0,120)||"Unknown"}var K=Te(),ae=W(K);{var ne=s=>{var c=je(),y=W(c);me(y,{class:"size-5 text-muted-foreground",label:"Loading file"}),U(c),B(s,c)},se=s=>{var c=Re(),y=W(c,!0);U(c),X(()=>pe(y,_(w))),B(s,c)},ie=s=>{var c=xe();fe(c,y=>g(f,y),()=>_(f)),X(()=>{G(c,"src",_(p)??void 0),G(c,"srcdoc",_(o))}),B(s,c)};de(ae,s=>{_(m)?s(ne):_(w)?s(se,1):s(ie,-1)})}U(K),B(a,K),ue()}function Qe(a,t){let r=ee(t,"bundleUrl",3,null);Ee(a,{get url(){return t.url},get bundleUrl(){return r()},get file(){return t.file},get sessionId(){return t.sessionId},get companionProfileId(){return t.companionProfileId}})}export{Qe as default};
