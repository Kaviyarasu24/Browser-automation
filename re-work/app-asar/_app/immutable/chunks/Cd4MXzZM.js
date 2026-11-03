function o(r,s){const n=new Map;return r.map(t=>{const e=s(t),c=n.get(e)??0;return n.set(e,c+1),{item:t,key:JSON.stringify([e,c])}})}export{o as k};
