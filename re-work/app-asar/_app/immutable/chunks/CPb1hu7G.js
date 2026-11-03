import{T as Xt,j as $A,k as Je,m as G,L as Pe,l as bA,F as EA,M as q,V,C as $,au as O,as as AA,S as Zt,P as $t,D as Aa,n as u,I as ea,Q as Ye,o as ta,O as fe,p as aa,q as ia,B as _A,r as na,s as TA,N as sa,t as oa,u as ze,v as eA,w as GA,x as Ae,y as ra,z as ca,A as ga,E as HA,G as Ia,H as Ve,J as la,K as nA,U as Ba,W as We,X as fa,Y as Ce,Z as Ca,_ as da,$ as ba,a0 as Ea,a1 as OA,a2 as ha,a3 as Xe,a4 as Ze,a5 as Qa,a6 as pa,a7 as ua,a8 as ma,a9 as $e,aa as wa,ab as De,ac as xe,ad as ye,ae as Se,av as ee,af as Da,ag as xa,ah as cA,ai as LA,ay as te,az as ya,aA as At,aB as Sa,aC as Fa,aD as ae,aE as et,aF as ie,aG as va,aH as RA,aI as sA,aJ as hA,aK as Z,aL as w,aM as Ra,aN as ka,aO as tt,aP as Fe,aQ as ve,aR as Ga,aS as Ta,aT as La,aU as Ma,aV as Re,aW as ke,aX as qA,aY as Na,aZ as Ua,a_ as _a,a$ as Ha,b0 as ne,b1 as CA,b2 as dA,b3 as at,b4 as it,b5 as Oa,b6 as qa,c as aA,b7 as wA,b8 as de,b9 as kA,ba as ja,bb as nt,bc as DA,bd as Ka,be as Ja,bf as Pa,aq as Ya,bg as H,an as za,bh as Va,bi as Wa,bj as Ge}from"./CmXWIMO_.js";import"./BY3kRY6U.js";function Te(s,A){if(A===Xt)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(A===$A||A===Je){let e=s.getIndex();if(e===null){const n=[],o=s.getAttribute("position");if(o!==void 0){for(let r=0;r<o.count;r++)n.push(r);s.setIndex(n),e=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const i=e.count-2,t=[];if(A===$A)for(let n=1;n<=i;n++)t.push(e.getX(0)),t.push(e.getX(n)),t.push(e.getX(n+1));else for(let n=0;n<i;n++)n%2===0?(t.push(e.getX(n)),t.push(e.getX(n+1)),t.push(e.getX(n+2))):(t.push(e.getX(n+2)),t.push(e.getX(n+1)),t.push(e.getX(n)));t.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const a=s.clone();return a.setIndex(t),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",A),s}class Dn extends Pe{constructor(A){super(A),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new ei(e)}),this.register(function(e){return new ti(e)}),this.register(function(e){return new Ii(e)}),this.register(function(e){return new li(e)}),this.register(function(e){return new Bi(e)}),this.register(function(e){return new ii(e)}),this.register(function(e){return new ni(e)}),this.register(function(e){return new si(e)}),this.register(function(e){return new oi(e)}),this.register(function(e){return new Ai(e)}),this.register(function(e){return new ri(e)}),this.register(function(e){return new ai(e)}),this.register(function(e){return new gi(e)}),this.register(function(e){return new ci(e)}),this.register(function(e){return new Za(e)}),this.register(function(e){return new fi(e)}),this.register(function(e){return new Ci(e)})}load(A,e,i,t){const a=this;let n;if(this.resourcePath!=="")n=this.resourcePath;else if(this.path!==""){const c=bA.extractUrlBase(A);n=bA.resolveURL(c,this.path)}else n=bA.extractUrlBase(A);this.manager.itemStart(A);const o=function(c){t?t(c):console.error(c),a.manager.itemError(A),a.manager.itemEnd(A)},r=new EA(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(A,function(c){try{a.parse(c,n,function(I){e(I),a.manager.itemEnd(A)},o)}catch(I){o(I)}},i,o)}setDRACOLoader(A){return this.dracoLoader=A,this}setKTX2Loader(A){return this.ktx2Loader=A,this}setMeshoptDecoder(A){return this.meshoptDecoder=A,this}register(A){return this.pluginCallbacks.indexOf(A)===-1&&this.pluginCallbacks.push(A),this}unregister(A){return this.pluginCallbacks.indexOf(A)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(A),1),this}parse(A,e,i,t){let a;const n={},o={},r=new TextDecoder;if(typeof A=="string")a=JSON.parse(A);else if(A instanceof ArrayBuffer)if(r.decode(new Uint8Array(A,0,4))===st){try{n[m.KHR_BINARY_GLTF]=new di(A)}catch(g){t&&t(g);return}a=JSON.parse(n[m.KHR_BINARY_GLTF].content)}else a=JSON.parse(r.decode(A));else a=A;if(a.asset===void 0||a.asset.version[0]<2){t&&t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Fi(a,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let I=0;I<this.pluginCallbacks.length;I++){const g=this.pluginCallbacks[I](c);g.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[g.name]=g,n[g.name]=!0}if(a.extensionsUsed)for(let I=0;I<a.extensionsUsed.length;++I){const g=a.extensionsUsed[I],l=a.extensionsRequired||[];switch(g){case m.KHR_MATERIALS_UNLIT:n[g]=new $a;break;case m.KHR_DRACO_MESH_COMPRESSION:n[g]=new bi(a,this.dracoLoader);break;case m.KHR_TEXTURE_TRANSFORM:n[g]=new Ei;break;case m.KHR_MESH_QUANTIZATION:n[g]=new hi;break;default:l.indexOf(g)>=0&&o[g]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+g+'".')}}c.setExtensions(n),c.setPlugins(o),c.parse(i,t)}parseAsync(A,e){const i=this;return new Promise(function(t,a){i.parse(A,e,t,a)})}}function Xa(){let s={};return{get:function(A){return s[A]},add:function(A,e){s[A]=e},remove:function(A){delete s[A]},removeAll:function(){s={}}}}const m={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Za{constructor(A){this.parser=A,this.name=m.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const A=this.parser,e=this.parser.json.nodes||[];for(let i=0,t=e.length;i<t;i++){const a=e[i];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&A._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(A){const e=this.parser,i="light:"+A;let t=e.cache.get(i);if(t)return t;const a=e.json,r=((a.extensions&&a.extensions[this.name]||{}).lights||[])[A];let c;const I=new $(16777215);r.color!==void 0&&I.setRGB(r.color[0],r.color[1],r.color[2],O);const g=r.range!==void 0?r.range:0;switch(r.type){case"directional":c=new Aa(I),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new $t(I),c.distance=g;break;case"spot":c=new Zt(I),c.distance=g,r.spot=r.spot||{},r.spot.innerConeAngle=r.spot.innerConeAngle!==void 0?r.spot.innerConeAngle:0,r.spot.outerConeAngle=r.spot.outerConeAngle!==void 0?r.spot.outerConeAngle:Math.PI/4,c.angle=r.spot.outerConeAngle,c.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+r.type)}return c.position.set(0,0,0),_(c,r),r.intensity!==void 0&&(c.intensity=r.intensity),c.name=e.createUniqueName(r.name||"light_"+A),t=Promise.resolve(c),e.cache.add(i,t),t}getDependency(A,e){if(A==="light")return this._loadLight(e)}createNodeAttachment(A){const e=this,i=this.parser,a=i.json.nodes[A],o=(a.extensions&&a.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(r){return i._getNodeRef(e.cache,o,r)})}}class $a{constructor(){this.name=m.KHR_MATERIALS_UNLIT}getMaterialType(){return nA}extendParams(A,e,i){const t=[];A.color=new $(1,1,1),A.opacity=1;const a=e.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){const n=a.baseColorFactor;A.color.setRGB(n[0],n[1],n[2],O),A.opacity=n[3]}a.baseColorTexture!==void 0&&t.push(i.assignTexture(A,"map",a.baseColorTexture,AA))}return Promise.all(t)}}class Ai{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(A,e){const t=this.parser.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=t.extensions[this.name].emissiveStrength;return a!==void 0&&(e.emissiveIntensity=a),Promise.resolve()}}class ei{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_CLEARCOAT}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[],n=t.extensions[this.name];if(n.clearcoatFactor!==void 0&&(e.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&a.push(i.assignTexture(e,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&a.push(i.assignTexture(e,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(a.push(i.assignTexture(e,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const o=n.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new V(o,o)}return Promise.all(a)}}class ti{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_DISPERSION}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const t=this.parser.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=t.extensions[this.name];return e.dispersion=a.dispersion!==void 0?a.dispersion:0,Promise.resolve()}}class ai{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_IRIDESCENCE}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[],n=t.extensions[this.name];return n.iridescenceFactor!==void 0&&(e.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&a.push(i.assignTexture(e,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(e.iridescenceIOR=n.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&a.push(i.assignTexture(e,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(a)}}class ii{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_SHEEN}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[];e.sheenColor=new $(0,0,0),e.sheenRoughness=0,e.sheen=1;const n=t.extensions[this.name];if(n.sheenColorFactor!==void 0){const o=n.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],O)}return n.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&a.push(i.assignTexture(e,"sheenColorMap",n.sheenColorTexture,AA)),n.sheenRoughnessTexture!==void 0&&a.push(i.assignTexture(e,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(a)}}class ni{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_TRANSMISSION}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[],n=t.extensions[this.name];return n.transmissionFactor!==void 0&&(e.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&a.push(i.assignTexture(e,"transmissionMap",n.transmissionTexture)),Promise.all(a)}}class si{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_VOLUME}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[],n=t.extensions[this.name];e.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&a.push(i.assignTexture(e,"thicknessMap",n.thicknessTexture)),e.attenuationDistance=n.attenuationDistance||1/0;const o=n.attenuationColor||[1,1,1];return e.attenuationColor=new $().setRGB(o[0],o[1],o[2],O),Promise.all(a)}}class oi{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_IOR}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const t=this.parser.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=t.extensions[this.name];return e.ior=a.ior!==void 0?a.ior:1.5,Promise.resolve()}}class ri{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_SPECULAR}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[],n=t.extensions[this.name];e.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&a.push(i.assignTexture(e,"specularIntensityMap",n.specularTexture));const o=n.specularColorFactor||[1,1,1];return e.specularColor=new $().setRGB(o[0],o[1],o[2],O),n.specularColorTexture!==void 0&&a.push(i.assignTexture(e,"specularColorMap",n.specularColorTexture,AA)),Promise.all(a)}}class ci{constructor(A){this.parser=A,this.name=m.EXT_MATERIALS_BUMP}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[],n=t.extensions[this.name];return e.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&a.push(i.assignTexture(e,"bumpMap",n.bumpTexture)),Promise.all(a)}}class gi{constructor(A){this.parser=A,this.name=m.KHR_MATERIALS_ANISOTROPY}getMaterialType(A){const i=this.parser.json.materials[A];return!i.extensions||!i.extensions[this.name]?null:q}extendMaterialParams(A,e){const i=this.parser,t=i.json.materials[A];if(!t.extensions||!t.extensions[this.name])return Promise.resolve();const a=[],n=t.extensions[this.name];return n.anisotropyStrength!==void 0&&(e.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(e.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&a.push(i.assignTexture(e,"anisotropyMap",n.anisotropyTexture)),Promise.all(a)}}class Ii{constructor(A){this.parser=A,this.name=m.KHR_TEXTURE_BASISU}loadTexture(A){const e=this.parser,i=e.json,t=i.textures[A];if(!t.extensions||!t.extensions[this.name])return null;const a=t.extensions[this.name],n=e.options.ktx2Loader;if(!n){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(A,a.source,n)}}class li{constructor(A){this.parser=A,this.name=m.EXT_TEXTURE_WEBP}loadTexture(A){const e=this.name,i=this.parser,t=i.json,a=t.textures[A];if(!a.extensions||!a.extensions[e])return null;const n=a.extensions[e],o=t.images[n.source];let r=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(r=c)}return i.loadTextureImage(A,n.source,r)}}class Bi{constructor(A){this.parser=A,this.name=m.EXT_TEXTURE_AVIF}loadTexture(A){const e=this.name,i=this.parser,t=i.json,a=t.textures[A];if(!a.extensions||!a.extensions[e])return null;const n=a.extensions[e],o=t.images[n.source];let r=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(r=c)}return i.loadTextureImage(A,n.source,r)}}class fi{constructor(A){this.name=m.EXT_MESHOPT_COMPRESSION,this.parser=A}loadBufferView(A){const e=this.parser.json,i=e.bufferViews[A];if(i.extensions&&i.extensions[this.name]){const t=i.extensions[this.name],a=this.parser.getDependency("buffer",t.buffer),n=this.parser.options.meshoptDecoder;if(!n||!n.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(o){const r=t.byteOffset||0,c=t.byteLength||0,I=t.count,g=t.byteStride,l=new Uint8Array(o,r,c);return n.decodeGltfBufferAsync?n.decodeGltfBufferAsync(I,g,l,t.mode,t.filter).then(function(B){return B.buffer}):n.ready.then(function(){const B=new ArrayBuffer(I*g);return n.decodeGltfBuffer(new Uint8Array(B),I,g,l,t.mode,t.filter),B})})}else return null}}class Ci{constructor(A){this.name=m.EXT_MESH_GPU_INSTANCING,this.parser=A}createNodeMesh(A){const e=this.parser.json,i=e.nodes[A];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const t=e.meshes[i.mesh];for(const c of t.primitives)if(c.mode!==M.TRIANGLES&&c.mode!==M.TRIANGLE_STRIP&&c.mode!==M.TRIANGLE_FAN&&c.mode!==void 0)return null;const n=i.extensions[this.name].attributes,o=[],r={};for(const c in n)o.push(this.parser.getDependency("accessor",n[c]).then(I=>(r[c]=I,r[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(A)),Promise.all(o).then(c=>{const I=c.pop(),g=I.isGroup?I.children:[I],l=c[0].count,B=[];for(const C of g){const h=new G,Q=new u,E=new Ye,b=new u(1,1,1),d=new ea(C.geometry,C.material,l);for(let f=0;f<l;f++)r.TRANSLATION&&Q.fromBufferAttribute(r.TRANSLATION,f),r.ROTATION&&E.fromBufferAttribute(r.ROTATION,f),r.SCALE&&b.fromBufferAttribute(r.SCALE,f),d.setMatrixAt(f,h.compose(Q,E,b));for(const f in r)if(f==="_COLOR_0"){const p=r[f];d.instanceColor=new ta(p.array,p.itemSize,p.normalized)}else f!=="TRANSLATION"&&f!=="ROTATION"&&f!=="SCALE"&&C.geometry.setAttribute(f,r[f]);fe.prototype.copy.call(d,C),this.parser.assignFinalMaterial(d),B.push(d)}return I.isGroup?(I.clear(),I.add(...B),I):B[0]}))}}const st="glTF",BA=12,Le={JSON:1313821514,BIN:5130562};class di{constructor(A){this.name=m.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(A,0,BA),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(A.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==st)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const t=this.header.length-BA,a=new DataView(A,BA);let n=0;for(;n<t;){const o=a.getUint32(n,!0);n+=4;const r=a.getUint32(n,!0);if(n+=4,r===Le.JSON){const c=new Uint8Array(A,BA+n,o);this.content=i.decode(c)}else if(r===Le.BIN){const c=BA+n;this.body=A.slice(c,c+o)}n+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class bi{constructor(A,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=m.KHR_DRACO_MESH_COMPRESSION,this.json=A,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(A,e){const i=this.json,t=this.dracoLoader,a=A.extensions[this.name].bufferView,n=A.extensions[this.name].attributes,o={},r={},c={};for(const I in n){const g=se[I]||I.toLowerCase();o[g]=n[I]}for(const I in A.attributes){const g=se[I]||I.toLowerCase();if(n[I]!==void 0){const l=i.accessors[A.attributes[I]],B=rA[l.componentType];c[g]=B.name,r[g]=l.normalized===!0}}return e.getDependency("bufferView",a).then(function(I){return new Promise(function(g,l){t.decodeDracoFile(I,function(B){for(const C in B.attributes){const h=B.attributes[C],Q=r[C];Q!==void 0&&(h.normalized=Q)}g(B)},o,c,O,l)})})}}class Ei{constructor(){this.name=m.KHR_TEXTURE_TRANSFORM}extendTexture(A,e){return(e.texCoord===void 0||e.texCoord===A.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(A=A.clone(),e.texCoord!==void 0&&(A.channel=e.texCoord),e.offset!==void 0&&A.offset.fromArray(e.offset),e.rotation!==void 0&&(A.rotation=e.rotation),e.scale!==void 0&&A.repeat.fromArray(e.scale),A.needsUpdate=!0),A}}class hi{constructor(){this.name=m.KHR_MESH_QUANTIZATION}}class ot extends xa{constructor(A,e,i,t){super(A,e,i,t)}copySampleValue_(A){const e=this.resultBuffer,i=this.sampleValues,t=this.valueSize,a=A*t*3+t;for(let n=0;n!==t;n++)e[n]=i[a+n];return e}interpolate_(A,e,i,t){const a=this.resultBuffer,n=this.sampleValues,o=this.valueSize,r=o*2,c=o*3,I=t-e,g=(i-e)/I,l=g*g,B=l*g,C=A*c,h=C-c,Q=-2*B+3*l,E=B-l,b=1-Q,d=E-l+g;for(let f=0;f!==o;f++){const p=n[h+f+o],D=n[h+f+r]*I,x=n[C+f+o],R=n[C+f]*I;a[f]=b*p+d*D+Q*x+E*R}return a}}const Qi=new Ye;class pi extends ot{interpolate_(A,e,i,t){const a=super.interpolate_(A,e,i,t);return Qi.fromArray(a).normalize().toArray(a),a}}const M={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},rA={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Me={9728:GA,9729:eA,9984:ze,9985:oa,9986:sa,9987:TA},Ne={33071:ca,33648:ra,10497:Ae},jA={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},se={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},z={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ui={CUBICSPLINE:void 0,LINEAR:$e,STEP:ma},KA={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function mi(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ve({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Da})),s.DefaultMaterial}function W(s,A,e){for(const i in e.extensions)s[i]===void 0&&(A.userData.gltfExtensions=A.userData.gltfExtensions||{},A.userData.gltfExtensions[i]=e.extensions[i])}function _(s,A){A.extras!==void 0&&(typeof A.extras=="object"?Object.assign(s.userData,A.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+A.extras))}function wi(s,A,e){let i=!1,t=!1,a=!1;for(let c=0,I=A.length;c<I;c++){const g=A[c];if(g.POSITION!==void 0&&(i=!0),g.NORMAL!==void 0&&(t=!0),g.COLOR_0!==void 0&&(a=!0),i&&t&&a)break}if(!i&&!t&&!a)return Promise.resolve(s);const n=[],o=[],r=[];for(let c=0,I=A.length;c<I;c++){const g=A[c];if(i){const l=g.POSITION!==void 0?e.getDependency("accessor",g.POSITION):s.attributes.position;n.push(l)}if(t){const l=g.NORMAL!==void 0?e.getDependency("accessor",g.NORMAL):s.attributes.normal;o.push(l)}if(a){const l=g.COLOR_0!==void 0?e.getDependency("accessor",g.COLOR_0):s.attributes.color;r.push(l)}}return Promise.all([Promise.all(n),Promise.all(o),Promise.all(r)]).then(function(c){const I=c[0],g=c[1],l=c[2];return i&&(s.morphAttributes.position=I),t&&(s.morphAttributes.normal=g),a&&(s.morphAttributes.color=l),s.morphTargetsRelative=!0,s})}function Di(s,A){if(s.updateMorphTargets(),A.weights!==void 0)for(let e=0,i=A.weights.length;e<i;e++)s.morphTargetInfluences[e]=A.weights[e];if(A.extras&&Array.isArray(A.extras.targetNames)){const e=A.extras.targetNames;if(s.morphTargetInfluences.length===e.length){s.morphTargetDictionary={};for(let i=0,t=e.length;i<t;i++)s.morphTargetDictionary[e[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function xi(s){let A;const e=s.extensions&&s.extensions[m.KHR_DRACO_MESH_COMPRESSION];if(e?A="draco:"+e.bufferView+":"+e.indices+":"+JA(e.attributes):A=s.indices+":"+JA(s.attributes)+":"+s.mode,s.targets!==void 0)for(let i=0,t=s.targets.length;i<t;i++)A+=":"+JA(s.targets[i]);return A}function JA(s){let A="";const e=Object.keys(s).sort();for(let i=0,t=e.length;i<t;i++)A+=e[i]+":"+s[e[i]]+";";return A}function oe(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yi(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Si=new G;class Fi{constructor(A={},e={}){this.json=A,this.extensions={},this.plugins={},this.options=e,this.cache=new Xa,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,t=-1,a=!1,n=-1;if(typeof navigator<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const r=o.match(/Version\/(\d+)/);t=i&&r?parseInt(r[1],10):-1,a=o.indexOf("Firefox")>-1,n=a?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&t<17||a&&n<98?this.textureLoader=new aa(this.options.manager):this.textureLoader=new ia(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new EA(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(A){this.extensions=A}setPlugins(A){this.plugins=A}parse(A,e){const i=this,t=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(n){return n._markDefs&&n._markDefs()}),Promise.all(this._invokeAll(function(n){return n.beforeRoot&&n.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(n){const o={scene:n[0][t.scene||0],scenes:n[0],animations:n[1],cameras:n[2],asset:t.asset,parser:i,userData:{}};return W(a,o,t),_(o,t),Promise.all(i._invokeAll(function(r){return r.afterRoot&&r.afterRoot(o)})).then(function(){for(const r of o.scenes)r.updateMatrixWorld();A(o)})}).catch(e)}_markDefs(){const A=this.json.nodes||[],e=this.json.skins||[],i=this.json.meshes||[];for(let t=0,a=e.length;t<a;t++){const n=e[t].joints;for(let o=0,r=n.length;o<r;o++)A[n[o]].isBone=!0}for(let t=0,a=A.length;t<a;t++){const n=A[t];n.mesh!==void 0&&(this._addNodeRef(this.meshCache,n.mesh),n.skin!==void 0&&(i[n.mesh].isSkinnedMesh=!0)),n.camera!==void 0&&this._addNodeRef(this.cameraCache,n.camera)}}_addNodeRef(A,e){e!==void 0&&(A.refs[e]===void 0&&(A.refs[e]=A.uses[e]=0),A.refs[e]++)}_getNodeRef(A,e,i){if(A.refs[e]<=1)return i;const t=i.clone(),a=(n,o)=>{const r=this.associations.get(n);r!=null&&this.associations.set(o,r);for(const[c,I]of n.children.entries())a(I,o.children[c])};return a(i,t),t.name+="_instance_"+A.uses[e]++,t}_invokeOne(A){const e=Object.values(this.plugins);e.push(this);for(let i=0;i<e.length;i++){const t=A(e[i]);if(t)return t}return null}_invokeAll(A){const e=Object.values(this.plugins);e.unshift(this);const i=[];for(let t=0;t<e.length;t++){const a=A(e[t]);a&&i.push(a)}return i}getDependency(A,e){const i=A+":"+e;let t=this.cache.get(i);if(!t){switch(A){case"scene":t=this.loadScene(e);break;case"node":t=this._invokeOne(function(a){return a.loadNode&&a.loadNode(e)});break;case"mesh":t=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(e)});break;case"accessor":t=this.loadAccessor(e);break;case"bufferView":t=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(e)});break;case"buffer":t=this.loadBuffer(e);break;case"material":t=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(e)});break;case"texture":t=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(e)});break;case"skin":t=this.loadSkin(e);break;case"animation":t=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(e)});break;case"camera":t=this.loadCamera(e);break;default:if(t=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(A,e)}),!t)throw new Error("Unknown type: "+A);break}this.cache.add(i,t)}return t}getDependencies(A){let e=this.cache.get(A);if(!e){const i=this,t=this.json[A+(A==="mesh"?"es":"s")]||[];e=Promise.all(t.map(function(a,n){return i.getDependency(A,n)})),this.cache.add(A,e)}return e}loadBuffer(A){const e=this.json.buffers[A],i=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&A===0)return Promise.resolve(this.extensions[m.KHR_BINARY_GLTF].body);const t=this.options;return new Promise(function(a,n){i.load(bA.resolveURL(e.uri,t.path),a,void 0,function(){n(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(A){const e=this.json.bufferViews[A];return this.getDependency("buffer",e.buffer).then(function(i){const t=e.byteLength||0,a=e.byteOffset||0;return i.slice(a,a+t)})}loadAccessor(A){const e=this,i=this.json,t=this.json.accessors[A];if(t.bufferView===void 0&&t.sparse===void 0){const n=jA[t.type],o=rA[t.componentType],r=t.normalized===!0,c=new o(t.count*n);return Promise.resolve(new _A(c,n,r))}const a=[];return t.bufferView!==void 0?a.push(this.getDependency("bufferView",t.bufferView)):a.push(null),t.sparse!==void 0&&(a.push(this.getDependency("bufferView",t.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",t.sparse.values.bufferView))),Promise.all(a).then(function(n){const o=n[0],r=jA[t.type],c=rA[t.componentType],I=c.BYTES_PER_ELEMENT,g=I*r,l=t.byteOffset||0,B=t.bufferView!==void 0?i.bufferViews[t.bufferView].byteStride:void 0,C=t.normalized===!0;let h,Q;if(B&&B!==g){const E=Math.floor(l/B),b="InterleavedBuffer:"+t.bufferView+":"+t.componentType+":"+E+":"+t.count;let d=e.cache.get(b);d||(h=new c(o,E*B,t.count*B/I),d=new na(h,B/I),e.cache.add(b,d)),Q=new wa(d,r,l%B/I,C)}else o===null?h=new c(t.count*r):h=new c(o,l,t.count*r),Q=new _A(h,r,C);if(t.sparse!==void 0){const E=jA.SCALAR,b=rA[t.sparse.indices.componentType],d=t.sparse.indices.byteOffset||0,f=t.sparse.values.byteOffset||0,p=new b(n[1],d,t.sparse.count*E),D=new c(n[2],f,t.sparse.count*r);o!==null&&(Q=new _A(Q.array.slice(),Q.itemSize,Q.normalized)),Q.normalized=!1;for(let x=0,R=p.length;x<R;x++){const k=p[x];if(Q.setX(k,D[x*r]),r>=2&&Q.setY(k,D[x*r+1]),r>=3&&Q.setZ(k,D[x*r+2]),r>=4&&Q.setW(k,D[x*r+3]),r>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}Q.normalized=C}return Q})}loadTexture(A){const e=this.json,i=this.options,a=e.textures[A].source,n=e.images[a];let o=this.textureLoader;if(n.uri){const r=i.manager.getHandler(n.uri);r!==null&&(o=r)}return this.loadTextureImage(A,a,o)}loadTextureImage(A,e,i){const t=this,a=this.json,n=a.textures[A],o=a.images[e],r=(o.uri||o.bufferView)+":"+n.sampler;if(this.textureCache[r])return this.textureCache[r];const c=this.loadImageSource(e,i).then(function(I){I.flipY=!1,I.name=n.name||o.name||"",I.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(I.name=o.uri);const l=(a.samplers||{})[n.sampler]||{};return I.magFilter=Me[l.magFilter]||eA,I.minFilter=Me[l.minFilter]||TA,I.wrapS=Ne[l.wrapS]||Ae,I.wrapT=Ne[l.wrapT]||Ae,I.generateMipmaps=!I.isCompressedTexture&&I.minFilter!==GA&&I.minFilter!==eA,t.associations.set(I,{textures:A}),I}).catch(function(){return null});return this.textureCache[r]=c,c}loadImageSource(A,e){const i=this,t=this.json,a=this.options;if(this.sourceCache[A]!==void 0)return this.sourceCache[A].then(g=>g.clone());const n=t.images[A],o=self.URL||self.webkitURL;let r=n.uri||"",c=!1;if(n.bufferView!==void 0)r=i.getDependency("bufferView",n.bufferView).then(function(g){c=!0;const l=new Blob([g],{type:n.mimeType});return r=o.createObjectURL(l),r});else if(n.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+A+" is missing URI and bufferView");const I=Promise.resolve(r).then(function(g){return new Promise(function(l,B){let C=l;e.isImageBitmapLoader===!0&&(C=function(h){const Q=new De(h);Q.needsUpdate=!0,l(Q)}),e.load(bA.resolveURL(g,a.path),C,void 0,B)})}).then(function(g){return c===!0&&o.revokeObjectURL(r),_(g,n),g.userData.mimeType=n.mimeType||yi(n.uri),g}).catch(function(g){throw console.error("THREE.GLTFLoader: Couldn't load texture",r),g});return this.sourceCache[A]=I,I}assignTexture(A,e,i,t){const a=this;return this.getDependency("texture",i.index).then(function(n){if(!n)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(n=n.clone(),n.channel=i.texCoord),a.extensions[m.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[m.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const r=a.associations.get(n);n=a.extensions[m.KHR_TEXTURE_TRANSFORM].extendTexture(n,o),a.associations.set(n,r)}}return t!==void 0&&(n.colorSpace=t),A[e]=n,n})}assignFinalMaterial(A){const e=A.geometry;let i=A.material;const t=e.attributes.tangent===void 0,a=e.attributes.color!==void 0,n=e.attributes.normal===void 0;if(A.isPoints){const o="PointsMaterial:"+i.uuid;let r=this.cache.get(o);r||(r=new ga,HA.prototype.copy.call(r,i),r.color.copy(i.color),r.map=i.map,r.sizeAttenuation=!1,this.cache.add(o,r)),i=r}else if(A.isLine){const o="LineBasicMaterial:"+i.uuid;let r=this.cache.get(o);r||(r=new Ia,HA.prototype.copy.call(r,i),r.color.copy(i.color),r.map=i.map,this.cache.add(o,r)),i=r}if(t||a||n){let o="ClonedMaterial:"+i.uuid+":";t&&(o+="derivative-tangents:"),a&&(o+="vertex-colors:"),n&&(o+="flat-shading:");let r=this.cache.get(o);r||(r=i.clone(),a&&(r.vertexColors=!0),n&&(r.flatShading=!0),t&&(r.normalScale&&(r.normalScale.y*=-1),r.clearcoatNormalScale&&(r.clearcoatNormalScale.y*=-1)),this.cache.add(o,r),this.associations.set(r,this.associations.get(i))),i=r}A.material=i}getMaterialType(){return Ve}loadMaterial(A){const e=this,i=this.json,t=this.extensions,a=i.materials[A];let n;const o={},r=a.extensions||{},c=[];if(r[m.KHR_MATERIALS_UNLIT]){const g=t[m.KHR_MATERIALS_UNLIT];n=g.getMaterialType(),c.push(g.extendParams(o,a,e))}else{const g=a.pbrMetallicRoughness||{};if(o.color=new $(1,1,1),o.opacity=1,Array.isArray(g.baseColorFactor)){const l=g.baseColorFactor;o.color.setRGB(l[0],l[1],l[2],O),o.opacity=l[3]}g.baseColorTexture!==void 0&&c.push(e.assignTexture(o,"map",g.baseColorTexture,AA)),o.metalness=g.metallicFactor!==void 0?g.metallicFactor:1,o.roughness=g.roughnessFactor!==void 0?g.roughnessFactor:1,g.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(o,"metalnessMap",g.metallicRoughnessTexture)),c.push(e.assignTexture(o,"roughnessMap",g.metallicRoughnessTexture))),n=this._invokeOne(function(l){return l.getMaterialType&&l.getMaterialType(A)}),c.push(Promise.all(this._invokeAll(function(l){return l.extendMaterialParams&&l.extendMaterialParams(A,o)})))}a.doubleSided===!0&&(o.side=la);const I=a.alphaMode||KA.OPAQUE;if(I===KA.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,I===KA.MASK&&(o.alphaTest=a.alphaCutoff!==void 0?a.alphaCutoff:.5)),a.normalTexture!==void 0&&n!==nA&&(c.push(e.assignTexture(o,"normalMap",a.normalTexture)),o.normalScale=new V(1,1),a.normalTexture.scale!==void 0)){const g=a.normalTexture.scale;o.normalScale.set(g,g)}if(a.occlusionTexture!==void 0&&n!==nA&&(c.push(e.assignTexture(o,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&n!==nA){const g=a.emissiveFactor;o.emissive=new $().setRGB(g[0],g[1],g[2],O)}return a.emissiveTexture!==void 0&&n!==nA&&c.push(e.assignTexture(o,"emissiveMap",a.emissiveTexture,AA)),Promise.all(c).then(function(){const g=new n(o);return a.name&&(g.name=a.name),_(g,a),e.associations.set(g,{materials:A}),a.extensions&&W(t,g,a),g})}createUniqueName(A){const e=Ba.sanitizeNodeName(A||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(A){const e=this,i=this.extensions,t=this.primitiveCache;function a(o){return i[m.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(r){return Ue(r,o,e)})}const n=[];for(let o=0,r=A.length;o<r;o++){const c=A[o],I=xi(c),g=t[I];if(g)n.push(g.promise);else{let l;c.extensions&&c.extensions[m.KHR_DRACO_MESH_COMPRESSION]?l=a(c):l=Ue(new We,c,e),t[I]={primitive:c,promise:l},n.push(l)}}return Promise.all(n)}loadMesh(A){const e=this,i=this.json,t=this.extensions,a=i.meshes[A],n=a.primitives,o=[];for(let r=0,c=n.length;r<c;r++){const I=n[r].material===void 0?mi(this.cache):this.getDependency("material",n[r].material);o.push(I)}return o.push(e.loadGeometries(n)),Promise.all(o).then(function(r){const c=r.slice(0,r.length-1),I=r[r.length-1],g=[];for(let B=0,C=I.length;B<C;B++){const h=I[B],Q=n[B];let E;const b=c[B];if(Q.mode===M.TRIANGLES||Q.mode===M.TRIANGLE_STRIP||Q.mode===M.TRIANGLE_FAN||Q.mode===void 0)E=a.isSkinnedMesh===!0?new fa(h,b):new Ce(h,b),E.isSkinnedMesh===!0&&E.normalizeSkinWeights(),Q.mode===M.TRIANGLE_STRIP?E.geometry=Te(E.geometry,Je):Q.mode===M.TRIANGLE_FAN&&(E.geometry=Te(E.geometry,$A));else if(Q.mode===M.LINES)E=new Ca(h,b);else if(Q.mode===M.LINE_STRIP)E=new da(h,b);else if(Q.mode===M.LINE_LOOP)E=new ba(h,b);else if(Q.mode===M.POINTS)E=new Ea(h,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+Q.mode);Object.keys(E.geometry.morphAttributes).length>0&&Di(E,a),E.name=e.createUniqueName(a.name||"mesh_"+A),_(E,a),Q.extensions&&W(t,E,Q),e.assignFinalMaterial(E),g.push(E)}for(let B=0,C=g.length;B<C;B++)e.associations.set(g[B],{meshes:A,primitives:B});if(g.length===1)return a.extensions&&W(t,g[0],a),g[0];const l=new OA;a.extensions&&W(t,l,a),e.associations.set(l,{meshes:A});for(let B=0,C=g.length;B<C;B++)l.add(g[B]);return l})}loadCamera(A){let e;const i=this.json.cameras[A],t=i[i.type];if(!t){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?e=new ha(Xe.radToDeg(t.yfov),t.aspectRatio||1,t.znear||1,t.zfar||2e6):i.type==="orthographic"&&(e=new Ze(-t.xmag,t.xmag,t.ymag,-t.ymag,t.znear,t.zfar)),i.name&&(e.name=this.createUniqueName(i.name)),_(e,i),Promise.resolve(e)}loadSkin(A){const e=this.json.skins[A],i=[];for(let t=0,a=e.joints.length;t<a;t++)i.push(this._loadNodeShallow(e.joints[t]));return e.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",e.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(t){const a=t.pop(),n=t,o=[],r=[];for(let c=0,I=n.length;c<I;c++){const g=n[c];if(g){o.push(g);const l=new G;a!==null&&l.fromArray(a.array,c*16),r.push(l)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new Qa(o,r)})}loadAnimation(A){const e=this.json,i=this,t=e.animations[A],a=t.name?t.name:"animation_"+A,n=[],o=[],r=[],c=[],I=[];for(let g=0,l=t.channels.length;g<l;g++){const B=t.channels[g],C=t.samplers[B.sampler],h=B.target,Q=h.node,E=t.parameters!==void 0?t.parameters[C.input]:C.input,b=t.parameters!==void 0?t.parameters[C.output]:C.output;h.node!==void 0&&(n.push(this.getDependency("node",Q)),o.push(this.getDependency("accessor",E)),r.push(this.getDependency("accessor",b)),c.push(C),I.push(h))}return Promise.all([Promise.all(n),Promise.all(o),Promise.all(r),Promise.all(c),Promise.all(I)]).then(function(g){const l=g[0],B=g[1],C=g[2],h=g[3],Q=g[4],E=[];for(let d=0,f=l.length;d<f;d++){const p=l[d],D=B[d],x=C[d],R=h[d],k=Q[d];if(p===void 0)continue;p.updateMatrix&&p.updateMatrix();const v=i._createAnimationTracks(p,D,x,R,k);if(v)for(let T=0;T<v.length;T++)E.push(v[T])}const b=new pa(a,void 0,E);return _(b,t),b})}createNodeMesh(A){const e=this.json,i=this,t=e.nodes[A];return t.mesh===void 0?null:i.getDependency("mesh",t.mesh).then(function(a){const n=i._getNodeRef(i.meshCache,t.mesh,a);return t.weights!==void 0&&n.traverse(function(o){if(o.isMesh)for(let r=0,c=t.weights.length;r<c;r++)o.morphTargetInfluences[r]=t.weights[r]}),n})}loadNode(A){const e=this.json,i=this,t=e.nodes[A],a=i._loadNodeShallow(A),n=[],o=t.children||[];for(let c=0,I=o.length;c<I;c++)n.push(i.getDependency("node",o[c]));const r=t.skin===void 0?Promise.resolve(null):i.getDependency("skin",t.skin);return Promise.all([a,Promise.all(n),r]).then(function(c){const I=c[0],g=c[1],l=c[2];l!==null&&I.traverse(function(B){B.isSkinnedMesh&&B.bind(l,Si)});for(let B=0,C=g.length;B<C;B++)I.add(g[B]);return I})}_loadNodeShallow(A){const e=this.json,i=this.extensions,t=this;if(this.nodeCache[A]!==void 0)return this.nodeCache[A];const a=e.nodes[A],n=a.name?t.createUniqueName(a.name):"",o=[],r=t._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(A)});return r&&o.push(r),a.camera!==void 0&&o.push(t.getDependency("camera",a.camera).then(function(c){return t._getNodeRef(t.cameraCache,a.camera,c)})),t._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(A)}).forEach(function(c){o.push(c)}),this.nodeCache[A]=Promise.all(o).then(function(c){let I;if(a.isBone===!0?I=new ua:c.length>1?I=new OA:c.length===1?I=c[0]:I=new fe,I!==c[0])for(let g=0,l=c.length;g<l;g++)I.add(c[g]);if(a.name&&(I.userData.name=a.name,I.name=n),_(I,a),a.extensions&&W(i,I,a),a.matrix!==void 0){const g=new G;g.fromArray(a.matrix),I.applyMatrix4(g)}else a.translation!==void 0&&I.position.fromArray(a.translation),a.rotation!==void 0&&I.quaternion.fromArray(a.rotation),a.scale!==void 0&&I.scale.fromArray(a.scale);if(!t.associations.has(I))t.associations.set(I,{});else if(a.mesh!==void 0&&t.meshCache.refs[a.mesh]>1){const g=t.associations.get(I);t.associations.set(I,{...g})}return t.associations.get(I).nodes=A,I}),this.nodeCache[A]}loadScene(A){const e=this.extensions,i=this.json.scenes[A],t=this,a=new OA;i.name&&(a.name=t.createUniqueName(i.name)),_(a,i),i.extensions&&W(e,a,i);const n=i.nodes||[],o=[];for(let r=0,c=n.length;r<c;r++)o.push(t.getDependency("node",n[r]));return Promise.all(o).then(function(r){for(let I=0,g=r.length;I<g;I++)a.add(r[I]);const c=I=>{const g=new Map;for(const[l,B]of t.associations)(l instanceof HA||l instanceof De)&&g.set(l,B);return I.traverse(l=>{const B=t.associations.get(l);B!=null&&g.set(l,B)}),g};return t.associations=c(a),a})}_createAnimationTracks(A,e,i,t,a){const n=[],o=A.name?A.name:A.uuid,r=[];z[a.path]===z.weights?A.traverse(function(l){l.morphTargetInfluences&&r.push(l.name?l.name:l.uuid)}):r.push(o);let c;switch(z[a.path]){case z.weights:c=ye;break;case z.rotation:c=Se;break;case z.translation:case z.scale:c=xe;break;default:switch(i.itemSize){case 1:c=ye;break;case 2:case 3:default:c=xe;break}break}const I=t.interpolation!==void 0?ui[t.interpolation]:$e,g=this._getArrayFromAccessor(i);for(let l=0,B=r.length;l<B;l++){const C=new c(r[l]+"."+z[a.path],e.array,g,I);t.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(C),n.push(C)}return n}_getArrayFromAccessor(A){let e=A.array;if(A.normalized){const i=oe(e.constructor),t=new Float32Array(e.length);for(let a=0,n=e.length;a<n;a++)t[a]=e[a]*i;e=t}return e}_createCubicSplineTrackInterpolant(A){A.createInterpolant=function(i){const t=this instanceof Se?pi:ot;return new t(this.times,this.values,this.getValueSize()/3,i)},A.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function vi(s,A,e){const i=A.attributes,t=new cA;if(i.POSITION!==void 0){const o=e.json.accessors[i.POSITION],r=o.min,c=o.max;if(r!==void 0&&c!==void 0){if(t.set(new u(r[0],r[1],r[2]),new u(c[0],c[1],c[2])),o.normalized){const I=oe(rA[o.componentType]);t.min.multiplyScalar(I),t.max.multiplyScalar(I)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const a=A.targets;if(a!==void 0){const o=new u,r=new u;for(let c=0,I=a.length;c<I;c++){const g=a[c];if(g.POSITION!==void 0){const l=e.json.accessors[g.POSITION],B=l.min,C=l.max;if(B!==void 0&&C!==void 0){if(r.setX(Math.max(Math.abs(B[0]),Math.abs(C[0]))),r.setY(Math.max(Math.abs(B[1]),Math.abs(C[1]))),r.setZ(Math.max(Math.abs(B[2]),Math.abs(C[2]))),l.normalized){const h=oe(rA[l.componentType]);r.multiplyScalar(h)}o.max(r)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}t.expandByVector(o)}s.boundingBox=t;const n=new LA;t.getCenter(n.center),n.radius=t.min.distanceTo(t.max)/2,s.boundingSphere=n}function Ue(s,A,e){const i=A.attributes,t=[];function a(n,o){return e.getDependency("accessor",n).then(function(r){s.setAttribute(o,r)})}for(const n in i){const o=se[n]||n.toLowerCase();o in s.attributes||t.push(a(i[n],o))}if(A.indices!==void 0&&!s.index){const n=e.getDependency("accessor",A.indices).then(function(o){s.setIndex(o)});t.push(n)}return ee.workingColorSpace!==O&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ee.workingColorSpace}" not supported.`),_(s,A),vi(s,A,e),Promise.all(t).then(function(){return A.targets!==void 0?wi(s,A.targets,e):s})}(function(){var s="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb",A="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb",e=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),i=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var t=WebAssembly.validate(e)?o(A):o(s),a,n=WebAssembly.instantiate(t,{}).then(function(E){a=E.instance,a.exports.__wasm_call_ctors()});function o(E){for(var b=new Uint8Array(E.length),d=0;d<E.length;++d){var f=E.charCodeAt(d);b[d]=f>96?f-97:f>64?f-39:f+4}for(var p=0,d=0;d<E.length;++d)b[p++]=b[d]<60?i[b[d]]:(b[d]-60)*64+b[++d];return b.buffer.slice(0,p)}function r(E,b,d,f,p,D,x){var R=E.exports.sbrk,k=f+3&-4,v=R(k*p),T=R(D.length),J=new Uint8Array(E.exports.memory.buffer);J.set(D,T);var j=b(v,f,p,T,D.length);if(j==0&&x&&x(v,k,p),d.set(J.subarray(v,v+f*p)),R(v-R(0)),j!=0)throw new Error("Malformed buffer data: "+j)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},I={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},g=[],l=0;function B(E){var b={object:new Worker(E),pending:0,requests:{}};return b.object.onmessage=function(d){var f=d.data;b.pending-=f.count,b.requests[f.id][f.action](f.value),delete b.requests[f.id]},b}function C(E){for(var b="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(t)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+Q.name+";"+r.toString()+Q.toString(),d=new Blob([b],{type:"text/javascript"}),f=URL.createObjectURL(d),p=g.length;p<E;++p)g[p]=B(f);for(var p=E;p<g.length;++p)g[p].object.postMessage({});g.length=E,URL.revokeObjectURL(f)}function h(E,b,d,f,p){for(var D=g[0],x=1;x<g.length;++x)g[x].pending<D.pending&&(D=g[x]);return new Promise(function(R,k){var v=new Uint8Array(d),T=++l;D.pending+=E,D.requests[T]={resolve:R,reject:k},D.object.postMessage({id:T,count:E,size:b,source:v,mode:f,filter:p},[v.buffer])})}function Q(E){var b=E.data;if(!b.id)return self.close();self.ready.then(function(d){try{var f=new Uint8Array(b.count*b.size);r(d,d.exports[b.mode],f,b.count,b.size,b.source,d.exports[b.filter]),self.postMessage({id:b.id,count:b.count,action:"resolve",value:f},[f.buffer])}catch(p){self.postMessage({id:b.id,count:b.count,action:"reject",value:p})}})}return{ready:n,supported:!0,useWorkers:function(E){C(E)},decodeVertexBuffer:function(E,b,d,f,p){r(a,a.exports.meshopt_decodeVertexBuffer,E,b,d,f,a.exports[c[p]])},decodeIndexBuffer:function(E,b,d,f){r(a,a.exports.meshopt_decodeIndexBuffer,E,b,d,f)},decodeIndexSequence:function(E,b,d,f){r(a,a.exports.meshopt_decodeIndexSequence,E,b,d,f)},decodeGltfBuffer:function(E,b,d,f,p,D){r(a,a.exports[I[p]],E,b,d,f,a.exports[c[D]])},decodeGltfBufferAsync:function(E,b,d,f,p){return g.length>0?h(E,b,d,I[f],c[p]):n.then(function(){var D=new Uint8Array(E*b);return r(a,a.exports[I[f]],D,E,b,d,a.exports[c[p]]),D})}}})();class Ri{constructor(A=4){this.pool=A,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0,this.workerCreator=null}_initWorker(A){if(!this.workers[A]){const e=this.workerCreator();e.addEventListener("message",this._onMessage.bind(this,A)),this.workers[A]=e}}_getIdleWorker(){for(let A=0;A<this.pool;A++)if(!(this.workerStatus&1<<A))return A;return-1}_onMessage(A,e){const i=this.workersResolve[A];if(i&&i(e),this.queue.length){const{resolve:t,msg:a,transfer:n}=this.queue.shift();this.workersResolve[A]=t,this.workers[A].postMessage(a,n)}else this.workerStatus^=1<<A}setWorkerCreator(A){this.workerCreator=A}setWorkerLimit(A){this.pool=A}postMessage(A,e){return new Promise(i=>{const t=this._getIdleWorker();t!==-1?(this._initWorker(t),this.workerStatus|=1<<t,this.workersResolve[t]=i,this.workers[t].postMessage(A,e)):this.queue.push({resolve:i,msg:A,transfer:e})})}dispose(){this.workers.forEach(A=>A.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}}const ki=0,_e=2,Gi=1,He=2,Ti=0,Li=1,Mi=10,Ni=0,rt=9,ct=15,gt=16,It=22,lt=37,Bt=43,ft=76,Ct=83,dt=97,bt=100,Et=103,ht=109,Qt=122,pt=123,ut=131,mt=132,wt=133,Dt=134,xt=137,yt=138,St=139,Ft=140,vt=141,Rt=142,kt=145,Gt=146,Tt=148,Lt=152,re=153,Ui=154,ce=155,_i=156,Mt=157,Nt=158,Ut=165,_t=166,Ht=1000054e3,Ot=1000054001,qt=1000054004,jt=1000054005,be=1000066e3,Kt=1000066004;class fA{constructor(A,e,i,t){this._dataView=void 0,this._littleEndian=void 0,this._offset=void 0,this._dataView=new DataView(A.buffer,A.byteOffset+e,i),this._littleEndian=t,this._offset=0}_nextUint8(){const A=this._dataView.getUint8(this._offset);return this._offset+=1,A}_nextUint16(){const A=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,A}_nextUint32(){const A=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,A}_nextUint64(){const A=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,A}_nextInt32(){const A=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,A}_nextUint8Array(A){const e=new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+this._offset,A);return this._offset+=A,e}_skip(A){return this._offset+=A,this}_scan(A,e=0){const i=this._offset;let t=0;for(;this._dataView.getUint8(this._offset)!==e&&t<A;)t++,this._offset++;return t<A&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+i,t)}}const L=[171,75,84,88,32,50,48,187,13,10,26,10];function Oe(s){return new TextDecoder().decode(s)}function Hi(s){const A=new Uint8Array(s.buffer,s.byteOffset,L.length);if(A[0]!==L[0]||A[1]!==L[1]||A[2]!==L[2]||A[3]!==L[3]||A[4]!==L[4]||A[5]!==L[5]||A[6]!==L[6]||A[7]!==L[7]||A[8]!==L[8]||A[9]!==L[9]||A[10]!==L[10]||A[11]!==L[11])throw new Error("Missing KTX 2.0 identifier.");const e={vkFormat:0,typeSize:1,pixelWidth:0,pixelHeight:0,pixelDepth:0,layerCount:0,faceCount:1,levelCount:0,supercompressionScheme:0,levels:[],dataFormatDescriptor:[{vendorId:0,descriptorType:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],keyValue:{},globalData:null},i=17*Uint32Array.BYTES_PER_ELEMENT,t=new fA(s,L.length,i,!0);e.vkFormat=t._nextUint32(),e.typeSize=t._nextUint32(),e.pixelWidth=t._nextUint32(),e.pixelHeight=t._nextUint32(),e.pixelDepth=t._nextUint32(),e.layerCount=t._nextUint32(),e.faceCount=t._nextUint32(),e.levelCount=t._nextUint32(),e.supercompressionScheme=t._nextUint32();const a=t._nextUint32(),n=t._nextUint32(),o=t._nextUint32(),r=t._nextUint32(),c=t._nextUint64(),I=t._nextUint64(),g=3*Math.max(e.levelCount,1)*8,l=new fA(s,L.length+i,g,!0);for(let S=0,F=Math.max(e.levelCount,1);S<F;S++)e.levels.push({levelData:new Uint8Array(s.buffer,s.byteOffset+l._nextUint64(),l._nextUint64()),uncompressedByteLength:l._nextUint64()});const B=new fA(s,a,n,!0);B._skip(4);const C=B._nextUint16(),h=B._nextUint16(),Q=B._nextUint16(),E=B._nextUint16(),b={vendorId:C,descriptorType:h,versionNumber:Q,colorModel:B._nextUint8(),colorPrimaries:B._nextUint8(),transferFunction:B._nextUint8(),flags:B._nextUint8(),texelBlockDimension:[B._nextUint8(),B._nextUint8(),B._nextUint8(),B._nextUint8()],bytesPlane:[B._nextUint8(),B._nextUint8(),B._nextUint8(),B._nextUint8(),B._nextUint8(),B._nextUint8(),B._nextUint8(),B._nextUint8()],samples:[]},d=(E/4-6)/4;for(let S=0;S<d;S++){const F={bitOffset:B._nextUint16(),bitLength:B._nextUint8(),channelType:B._nextUint8(),samplePosition:[B._nextUint8(),B._nextUint8(),B._nextUint8(),B._nextUint8()],sampleLower:Number.NEGATIVE_INFINITY,sampleUpper:Number.POSITIVE_INFINITY};64&F.channelType?(F.sampleLower=B._nextInt32(),F.sampleUpper=B._nextInt32()):(F.sampleLower=B._nextUint32(),F.sampleUpper=B._nextUint32()),b.samples[S]=F}e.dataFormatDescriptor.length=0,e.dataFormatDescriptor.push(b);const f=new fA(s,o,r,!0);for(;f._offset<r;){const S=f._nextUint32(),F=f._scan(S),N=Oe(F);if(e.keyValue[N]=f._nextUint8Array(S-F.byteLength-1),N.match(/^ktx/i)){const SA=Oe(e.keyValue[N]);e.keyValue[N]=SA.substring(0,SA.lastIndexOf("\0"))}f._skip(S%4?4-S%4:0)}if(I<=0)return e;const p=new fA(s,c,I,!0),D=p._nextUint16(),x=p._nextUint16(),R=p._nextUint32(),k=p._nextUint32(),v=p._nextUint32(),T=p._nextUint32(),J=[];for(let S=0,F=Math.max(e.levelCount,1);S<F;S++)J.push({imageFlags:p._nextUint32(),rgbSliceByteOffset:p._nextUint32(),rgbSliceByteLength:p._nextUint32(),alphaSliceByteOffset:p._nextUint32(),alphaSliceByteLength:p._nextUint32()});const j=c+p._offset,P=j+R,gA=P+k,Y=gA+v,xA=new Uint8Array(s.buffer,s.byteOffset+j,R),IA=new Uint8Array(s.buffer,s.byteOffset+P,k),lA=new Uint8Array(s.buffer,s.byteOffset+gA,v),yA=new Uint8Array(s.buffer,s.byteOffset+Y,T);return e.globalData={endpointCount:D,selectorCount:x,imageDescs:J,endpointsData:xA,selectorsData:IA,tablesData:lA,extendedData:yA},e}let PA,K,ge;const YA={env:{emscripten_notify_memory_growth:function(s){ge=new Uint8Array(K.exports.memory.buffer)}}};class Oi{init(){return PA||(PA=typeof fetch<"u"?fetch("data:application/wasm;base64,"+qe).then(A=>A.arrayBuffer()).then(A=>WebAssembly.instantiate(A,YA)).then(this._init):WebAssembly.instantiate(Buffer.from(qe,"base64"),YA).then(this._init),PA)}_init(A){K=A.instance,YA.env.emscripten_notify_memory_growth(0)}decode(A,e=0){if(!K)throw new Error("ZSTDDecoder: Await .init() before decoding.");const i=A.byteLength,t=K.exports.malloc(i);ge.set(A,t),e=e||Number(K.exports.ZSTD_findDecompressedSize(t,i));const a=K.exports.malloc(e),n=K.exports.ZSTD_decompress(a,e,t,i),o=ge.slice(a,a+n);return K.exports.free(t),K.exports.free(a),o}}const qe="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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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",qi="display-p3",ji="display-p3-linear";({...ee.spaces[AA]});const zA=new WeakMap;let VA=0,WA;class U extends Pe{constructor(A){super(A),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new Ri,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER<"u"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(A){return this.transcoderPath=A,this}setWorkerLimit(A){return this.workerPool.setWorkerLimit(A),this}async detectSupportAsync(A){return console.warn('KTX2Loader: "detectSupportAsync()" has been deprecated. Use "detectSupport()" and "await renderer.init();" when creating the renderer.'),await A.init(),this.detectSupport(A)}detectSupport(A){return A.isWebGPURenderer===!0?this.workerConfig={astcSupported:A.hasFeature("texture-compression-astc"),astcHDRSupported:!1,etc1Supported:A.hasFeature("texture-compression-etc1"),etc2Supported:A.hasFeature("texture-compression-etc2"),dxtSupported:A.hasFeature("texture-compression-s3tc"),bptcSupported:A.hasFeature("texture-compression-bc"),pvrtcSupported:A.hasFeature("texture-compression-pvrtc")}:(this.workerConfig={astcSupported:A.extensions.has("WEBGL_compressed_texture_astc"),astcHDRSupported:A.extensions.has("WEBGL_compressed_texture_astc")&&A.extensions.get("WEBGL_compressed_texture_astc").getSupportedProfiles().includes("hdr"),etc1Supported:A.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:A.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:A.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:A.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:A.extensions.has("WEBGL_compressed_texture_pvrtc")||A.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},typeof navigator<"u"&&navigator.platform.indexOf("Linux")>=0&&navigator.userAgent.indexOf("Firefox")>=0&&this.workerConfig.astcSupported&&this.workerConfig.etc2Supported&&this.workerConfig.bptcSupported&&this.workerConfig.dxtSupported&&(this.workerConfig.astcSupported=!1,this.workerConfig.etc2Supported=!1)),this}init(){if(!this.transcoderPending){const A=new EA(this.manager);A.setPath(this.transcoderPath),A.setWithCredentials(this.withCredentials);const e=A.loadAsync("basis_transcoder.js"),i=new EA(this.manager);i.setPath(this.transcoderPath),i.setResponseType("arraybuffer"),i.setWithCredentials(this.withCredentials);const t=i.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([e,t]).then(([a,n])=>{const o=U.BasisWorker.toString(),r=["/* constants */","let _EngineFormat = "+JSON.stringify(U.EngineFormat),"let _EngineType = "+JSON.stringify(U.EngineType),"let _TranscoderFormat = "+JSON.stringify(U.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(U.BasisFormat),"/* basis_transcoder.js */",a,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([r])),this.transcoderBinary=n,this.workerPool.setWorkerCreator(()=>{const c=new Worker(this.workerSourceURL),I=this.transcoderBinary.slice(0);return c.postMessage({type:"init",config:this.workerConfig,transcoderBinary:I},[I]),c})}),VA>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),VA++}return this.transcoderPending}load(A,e,i,t){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");const a=new EA(this.manager);a.setPath(this.path),a.setCrossOrigin(this.crossOrigin),a.setWithCredentials(this.withCredentials),a.setRequestHeader(this.requestHeader),a.setResponseType("arraybuffer"),a.load(A,n=>{this.parse(n,e,t)},i,t)}parse(A,e,i){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");if(zA.has(A))return zA.get(A).promise.then(e).catch(i);this._createTexture(A).then(t=>e?e(t):null).catch(i)}_createTextureFrom(A,e){const{type:i,error:t,data:{faces:a,width:n,height:o,format:r,type:c,dfdFlags:I}}=A;if(i==="error")return Promise.reject(t);let g;if(e.faceCount===6)g=new Ra(a,r,c);else{const l=a[0].mipmaps;g=e.layerCount>1?new ka(l,n,o,e.layerCount,r,c):new tt(l,n,o,r,c)}return g.minFilter=a[0].mipmaps.length===1?eA:TA,g.magFilter=eA,g.generateMipmaps=!1,g.needsUpdate=!0,g.colorSpace=Jt(e),g.premultiplyAlpha=!!(I&Gi),g}async _createTexture(A,e={}){const i=Hi(new Uint8Array(A)),t=i.vkFormat===be&&i.dataFormatDescriptor[0].colorModel===167;if(!(i.vkFormat===Ni||t&&!this.workerConfig.astcHDRSupported))return Ji(i);const n=e,o=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:A,taskConfig:n},[A])).then(r=>this._createTextureFrom(r.data,i));return zA.set(A,{promise:o}),o}dispose(){this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),VA--}}U.BasisFormat={ETC1S:0,UASTC:1,UASTC_HDR:2};U.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16,BC6H:22,RGB_HALF:24,RGBA_HALF:25};U.EngineFormat={RGBAFormat:sA,RGBA_ASTC_4x4_Format:RA,RGB_BPTC_UNSIGNED_Format:va,RGBA_BPTC_Format:ie,RGBA_ETC2_EAC_Format:et,RGBA_PVRTC_4BPPV1_Format:ae,RGBA_S3TC_DXT5_Format:Fa,RGB_ETC1_Format:Sa,RGB_ETC2_Format:At,RGB_PVRTC_4BPPV1_Format:ya,RGBA_S3TC_DXT1_Format:te};U.EngineType={UnsignedByteType:w,HalfFloatType:Z,FloatType:hA};U.BasisWorker=function(){let s,A,e;const i=_EngineFormat,t=_EngineType,a=_TranscoderFormat,n=_BasisFormat;self.addEventListener("message",function(C){const h=C.data;switch(h.type){case"init":s=h.config,o(h.transcoderBinary);break;case"transcode":A.then(()=>{try{const{faces:Q,buffers:E,width:b,height:d,hasAlpha:f,format:p,type:D,dfdFlags:x}=r(h.buffer);self.postMessage({type:"transcode",id:h.id,data:{faces:Q,width:b,height:d,hasAlpha:f,format:p,type:D,dfdFlags:x}},E)}catch(Q){console.error(Q),self.postMessage({type:"error",id:h.id,error:Q.message})}});break}});function o(C){A=new Promise(h=>{e={wasmBinary:C,onRuntimeInitialized:h},BASIS(e)}).then(()=>{e.initializeBasis(),e.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function r(C){const h=new e.KTX2File(new Uint8Array(C));function Q(){h.close(),h.delete()}if(!h.isValid())throw Q(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");let E;if(h.isUASTC())E=n.UASTC;else if(h.isETC1S())E=n.ETC1S;else if(h.isHDR())E=n.UASTC_HDR;else throw new Error("THREE.KTX2Loader: Unknown Basis encoding");const b=h.getWidth(),d=h.getHeight(),f=h.getLayers()||1,p=h.getLevels(),D=h.getFaces(),x=h.getHasAlpha(),R=h.getDFDFlags(),{transcoderFormat:k,engineFormat:v,engineType:T}=g(E,b,d,x);if(!b||!d||!p)throw Q(),new Error("THREE.KTX2Loader:	Invalid texture");if(!h.startTranscoding())throw Q(),new Error("THREE.KTX2Loader: .startTranscoding failed");const J=[],j=[];for(let P=0;P<D;P++){const gA=[];for(let Y=0;Y<p;Y++){const xA=[];let IA,lA;for(let S=0;S<f;S++){const F=h.getImageLevelInfo(Y,S,P);P===0&&Y===0&&S===0&&(F.origWidth%4!==0||F.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),p>1?(IA=F.origWidth,lA=F.origHeight):(IA=F.width,lA=F.height);let N=new Uint8Array(h.getImageTranscodedSizeInBytes(Y,S,0,k));const SA=h.transcodeImage(N,Y,S,P,k,0,-1,-1);if(T===t.HalfFloatType&&(N=new Uint16Array(N.buffer,N.byteOffset,N.byteLength/Uint16Array.BYTES_PER_ELEMENT)),!SA)throw Q(),new Error("THREE.KTX2Loader: .transcodeImage failed.");xA.push(N)}const yA=B(xA);gA.push({data:yA,width:IA,height:lA}),j.push(yA.buffer)}J.push({mipmaps:gA,width:b,height:d,format:v,type:T})}return Q(),{faces:J,buffers:j,width:b,height:d,hasAlpha:x,dfdFlags:R,format:v,type:T}}const c=[{if:"astcSupported",basisFormat:[n.UASTC],transcoderFormat:[a.ASTC_4x4,a.ASTC_4x4],engineFormat:[i.RGBA_ASTC_4x4_Format,i.RGBA_ASTC_4x4_Format],engineType:[t.UnsignedByteType],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[n.ETC1S,n.UASTC],transcoderFormat:[a.BC7_M5,a.BC7_M5],engineFormat:[i.RGBA_BPTC_Format,i.RGBA_BPTC_Format],engineType:[t.UnsignedByteType],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[n.ETC1S,n.UASTC],transcoderFormat:[a.BC1,a.BC3],engineFormat:[i.RGBA_S3TC_DXT1_Format,i.RGBA_S3TC_DXT5_Format],engineType:[t.UnsignedByteType],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[n.ETC1S,n.UASTC],transcoderFormat:[a.ETC1,a.ETC2],engineFormat:[i.RGB_ETC2_Format,i.RGBA_ETC2_EAC_Format],engineType:[t.UnsignedByteType],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[n.ETC1S,n.UASTC],transcoderFormat:[a.ETC1],engineFormat:[i.RGB_ETC1_Format],engineType:[t.UnsignedByteType],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[n.ETC1S,n.UASTC],transcoderFormat:[a.PVRTC1_4_RGB,a.PVRTC1_4_RGBA],engineFormat:[i.RGB_PVRTC_4BPPV1_Format,i.RGBA_PVRTC_4BPPV1_Format],engineType:[t.UnsignedByteType],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0},{if:"bptcSupported",basisFormat:[n.UASTC_HDR],transcoderFormat:[a.BC6H],engineFormat:[i.RGB_BPTC_UNSIGNED_Format],engineType:[t.HalfFloatType],priorityHDR:1,needsPowerOfTwo:!1},{basisFormat:[n.ETC1S,n.UASTC],transcoderFormat:[a.RGBA32,a.RGBA32],engineFormat:[i.RGBAFormat,i.RGBAFormat],engineType:[t.UnsignedByteType,t.UnsignedByteType],priorityETC1S:100,priorityUASTC:100,needsPowerOfTwo:!1},{basisFormat:[n.UASTC_HDR],transcoderFormat:[a.RGBA_HALF],engineFormat:[i.RGBAFormat],engineType:[t.HalfFloatType],priorityHDR:100,needsPowerOfTwo:!1}],I={[n.ETC1S]:c.filter(C=>C.basisFormat.includes(n.ETC1S)).sort((C,h)=>C.priorityETC1S-h.priorityETC1S),[n.UASTC]:c.filter(C=>C.basisFormat.includes(n.UASTC)).sort((C,h)=>C.priorityUASTC-h.priorityUASTC),[n.UASTC_HDR]:c.filter(C=>C.basisFormat.includes(n.UASTC_HDR)).sort((C,h)=>C.priorityHDR-h.priorityHDR)};function g(C,h,Q,E){const b=I[C];for(let d=0;d<b.length;d++){const f=b[d];if(f.if&&!s[f.if]||!f.basisFormat.includes(C)||E&&f.transcoderFormat.length<2||f.needsPowerOfTwo&&!(l(h)&&l(Q)))continue;const p=f.transcoderFormat[E?1:0],D=f.engineFormat[E?1:0],x=f.engineType[0];return{transcoderFormat:p,engineFormat:D,engineType:x}}throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.")}function l(C){return C<=2?!0:(C&C-1)===0&&C!==0}function B(C){if(C.length===1)return C[0];let h=0;for(let b=0;b<C.length;b++){const d=C[b];h+=d.byteLength}const Q=new Uint8Array(h);let E=0;for(let b=0;b<C.length;b++){const d=C[b];Q.set(d,E),E+=d.byteLength}return Q}};const Ki=new Set([sA,ne,dA,CA]),XA={[ht]:sA,[Et]:dA,[bt]:CA,[dt]:sA,[Ct]:dA,[ft]:CA,[Bt]:sA,[lt]:sA,[It]:dA,[gt]:dA,[ct]:CA,[rt]:CA,[pt]:ne,[Qt]:ne,[Lt]:et,[Tt]:At,[re]:Ha,[Ui]:_a,[ce]:Ua,[_i]:Na,[be]:RA,[Nt]:RA,[Mt]:RA,[Kt]:qA,[_t]:qA,[Ut]:qA,[Dt]:te,[wt]:te,[mt]:ke,[ut]:ke,[yt]:Re,[xt]:Re,[Ft]:Ma,[St]:La,[Rt]:Ta,[vt]:Ga,[Gt]:ie,[kt]:ie,[jt]:ae,[Ot]:ae,[qt]:ve,[Ht]:ve},iA={[ht]:hA,[Et]:hA,[bt]:hA,[dt]:Z,[Ct]:Z,[ft]:Z,[Bt]:w,[lt]:w,[It]:w,[gt]:w,[ct]:w,[rt]:w,[pt]:it,[Qt]:at,[Lt]:w,[Tt]:w,[re]:w,[re]:w,[ce]:w,[ce]:w,[be]:Z,[Nt]:w,[Mt]:w,[Kt]:Z,[_t]:w,[Ut]:w,[Dt]:w,[wt]:w,[mt]:w,[ut]:w,[yt]:w,[xt]:w,[Ft]:w,[St]:w,[Rt]:w,[vt]:w,[Gt]:w,[kt]:w,[jt]:w,[Ot]:w,[qt]:w,[Ht]:w};async function Ji(s){const{vkFormat:A}=s;if(XA[A]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat: "+A);iA[A]===void 0&&console.warn('THREE.KTX2Loader: Missing ".type" for vkFormat: '+A);let e;s.supercompressionScheme===_e&&(WA||(WA=new Promise(async n=>{const o=new Oi;await o.init(),n(o)})),e=await WA);const i=[];for(let n=0;n<s.levels.length;n++){const o=Math.max(1,s.pixelWidth>>n),r=Math.max(1,s.pixelHeight>>n),c=s.pixelDepth?Math.max(1,s.pixelDepth>>n):0,I=s.levels[n];let g;if(s.supercompressionScheme===ki)g=I.levelData;else if(s.supercompressionScheme===_e)g=e.decode(I.levelData,I.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let l;iA[A]===hA?l=new Float32Array(g.buffer,g.byteOffset,g.byteLength/Float32Array.BYTES_PER_ELEMENT):iA[A]===Z?l=new Uint16Array(g.buffer,g.byteOffset,g.byteLength/Uint16Array.BYTES_PER_ELEMENT):iA[A]===it||iA[A]===at?l=new Uint32Array(g.buffer,g.byteOffset,g.byteLength/Uint32Array.BYTES_PER_ELEMENT):l=g,i.push({data:l,width:o,height:r,depth:c})}const t=s.levelCount===0||i.length>1;let a;if(Ki.has(XA[A]))a=s.pixelDepth===0?new Oa(i[0].data,s.pixelWidth,s.pixelHeight):new qa(i[0].data,s.pixelWidth,s.pixelHeight,s.pixelDepth),a.minFilter=t?ze:GA,a.magFilter=GA,a.generateMipmaps=s.levelCount===0;else{if(s.pixelDepth>0)throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");a=new tt(i,s.pixelWidth,s.pixelHeight),a.minFilter=t?TA:eA,a.magFilter=eA}return a.mipmaps=i,a.type=iA[A],a.format=XA[A],a.colorSpace=Jt(s),a.needsUpdate=!0,Promise.resolve(a)}function Jt(s){const A=s.dataFormatDescriptor[0];return A.colorPrimaries===Li?A.transferFunction===He?AA:O:A.colorPrimaries===Mi?A.transferFunction===He?qi:ji:A.colorPrimaries===Ti?Fe:(console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${A.colorPrimaries}"`),Fe)}const X=s=>({subscribe:s.subscribe,get current(){return s.current}});let QA=0;const Ee=aA(!1),MA=aA(!1),he=aA(void 0),Qe=aA(0),pe=aA(0),Pt=aA([]),ue=aA(0),{onStart:Pi,onLoad:Yi,onError:zi}=wA;wA.onStart=(s,A,e)=>{Pi?.(s,A,e),MA.set(!0),he.set(s),Qe.set(A),pe.set(e);const i=(A-QA)/(e-QA);ue.set(i),i===1&&Ee.set(!0)};wA.onLoad=()=>{Yi?.(),MA.set(!1)};wA.onError=s=>{zi?.(s),Pt.update(A=>[...A,s])};wA.onProgress=(s,A,e)=>{A===e&&(QA=e),MA.set(!0),he.set(s),Qe.set(A),pe.set(e);const i=(A-QA)/(e-QA)||1;ue.set(i),i===1&&Ee.set(!0)};X(MA),X(he),X(Qe),X(pe),X(Pt),X(ue),X(Ee);new u;new u;new u;new LA;new G;new de;new u;new u;new G;new u;new u;new fe;new u;new u;new u;new V;const Vi="Right",Wi="Top",Xi="Front",Zi="Left",$i="Bottom",An="Back";[Vi,Wi,Xi,Zi,$i,An].map(s=>s.toLocaleLowerCase());new cA;new u;kA.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new V(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ja.line={uniforms:nt.merge([kA.common,kA.fog,kA.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};new DA;new u;new u;new DA;new DA;new DA;new u;new G;new Ka;new u;new cA;new LA;new DA;new de;new Ja;Math.cos(70*Xe.DEG2RAD);new u;new V;new V;new u;new u;new u;new u;new u;new u;new u;new Pa;new u;new u;new u(1,0,0),new u(0,1,0),new u(0,0,1);new Ya;new u(0,1,0);new u(0,0,0);new G;new u;new G;new u(1,0,0);new u(0,1,0);new u(0,0,1);new u;new u;new u;new G;new G;new Ce;`${H.logdepthbuf_pars_vertex}${H.fog_pars_vertex}${H.logdepthbuf_vertex}${H.fog_vertex}`;class me extends Ce{constructor(){const A=me.SkyShader,e=new za({name:A.name,uniforms:nt.clone(A.uniforms),vertexShader:A.vertexShader,fragmentShader:A.fragmentShader,side:Va,depthWrite:!1});super(new Wa(1,1,1),e),this.isSky=!0}}me.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new u},up:{value:new u(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const ZA=new G;class we{constructor(A){A=A||{},this.zNear=A.webGL===!0?-1:0,this.vertices={near:[new u,new u,new u,new u],far:[new u,new u,new u,new u]},A.projectionMatrix!==void 0&&this.setFromProjectionMatrix(A.projectionMatrix,A.maxFar||1e4)}setFromProjectionMatrix(A,e){const i=this.zNear,t=A.elements[11]===0;return ZA.copy(A).invert(),this.vertices.near[0].set(1,1,i),this.vertices.near[1].set(1,-1,i),this.vertices.near[2].set(-1,-1,i),this.vertices.near[3].set(-1,1,i),this.vertices.near.forEach(function(a){a.applyMatrix4(ZA)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(a){a.applyMatrix4(ZA);const n=Math.abs(a.z);t?a.z*=Math.min(e/n,1):a.multiplyScalar(Math.min(e/n,1))}),this.vertices}split(A,e){for(;A.length>e.length;)e.push(new we);e.length=A.length;for(let i=0;i<A.length;i++){const t=e[i];if(i===0)for(let a=0;a<4;a++)t.vertices.near[a].copy(this.vertices.near[a]);else for(let a=0;a<4;a++)t.vertices.near[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],A[i-1]);if(i===A.length-1)for(let a=0;a<4;a++)t.vertices.far[a].copy(this.vertices.far[a]);else for(let a=0;a<4;a++)t.vertices.far[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],A[i])}}toSpace(A,e){for(let i=0;i<4;i++)e.vertices.near[i].copy(this.vertices.near[i]).applyMatrix4(A),e.vertices.far[i].copy(this.vertices.far[i]).applyMatrix4(A)}}new G;new we({webGL:!0});new u;new u;new cA;new G;new G;new u(0,1,0);`${H.tonemapping_fragment}${H.colorspace_fragment}`;`${H.tonemapping_fragment}${H.colorspace_fragment}`;const en=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,tn=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`,an=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,nn=an,sn=`
	${en}
	${tn}
`;`${nn}${sn}${H.tonemapping_fragment}${H.colorspace_fragment}`;new cA;typeof window<"u"&&document.createElement("div");for(let s=0;s<256;s++)(s<16?"0":"")+s.toString(16);new Ze(-1,1,1,-1,0,1);class on extends We{constructor(){super(),this.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ge([0,2,0,0,2,0],2))}}new on;var Yt={exports:{}};Yt.exports=NA;Yt.exports.default=NA;function NA(s,A,e){e=e||2;var i=A&&A.length,t=i?A[0]*e:s.length,a=zt(s,0,t,e,!0),n=[];if(!a||a.next===a.prev)return n;var o,r,c,I,g,l,B;if(i&&(a=ln(s,A,a,e)),s.length>80*e){o=c=s[0],r=I=s[1];for(var C=e;C<t;C+=e)g=s[C],l=s[C+1],g<o&&(o=g),l<r&&(r=l),g>c&&(c=g),l>I&&(I=l);B=Math.max(c-o,I-r),B=B!==0?32767/B:0}return pA(a,n,e,o,r,B,0),n}function zt(s,A,e,i,t){var a,n;if(t===Be(s,A,e,i)>0)for(a=A;a<e;a+=i)n=je(a,s[a],s[a+1],n);else for(a=e-i;a>=A;a-=i)n=je(a,s[a],s[a+1],n);return n&&UA(n,n.next)&&(mA(n),n=n.next),n}function tA(s,A){if(!s)return s;A||(A=s);var e=s,i;do if(i=!1,!e.steiner&&(UA(e,e.next)||y(e.prev,e,e.next)===0)){if(mA(e),e=A=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==A);return A}function pA(s,A,e,i,t,a,n){if(s){!n&&a&&bn(s,i,t,a);for(var o=s,r,c;s.prev!==s.next;){if(r=s.prev,c=s.next,a?cn(s,i,t,a):rn(s)){A.push(r.i/e|0),A.push(s.i/e|0),A.push(c.i/e|0),mA(s),s=c.next,o=c.next;continue}if(s=c,s===o){n?n===1?(s=gn(tA(s),A,e),pA(s,A,e,i,t,a,2)):n===2&&In(s,A,e,i,t,a):pA(tA(s),A,e,i,t,a,1);break}}}}function rn(s){var A=s.prev,e=s,i=s.next;if(y(A,e,i)>=0)return!1;for(var t=A.x,a=e.x,n=i.x,o=A.y,r=e.y,c=i.y,I=t<a?t<n?t:n:a<n?a:n,g=o<r?o<c?o:c:r<c?r:c,l=t>a?t>n?t:n:a>n?a:n,B=o>r?o>c?o:c:r>c?r:c,C=i.next;C!==A;){if(C.x>=I&&C.x<=l&&C.y>=g&&C.y<=B&&oA(t,o,a,r,n,c,C.x,C.y)&&y(C.prev,C,C.next)>=0)return!1;C=C.next}return!0}function cn(s,A,e,i){var t=s.prev,a=s,n=s.next;if(y(t,a,n)>=0)return!1;for(var o=t.x,r=a.x,c=n.x,I=t.y,g=a.y,l=n.y,B=o<r?o<c?o:c:r<c?r:c,C=I<g?I<l?I:l:g<l?g:l,h=o>r?o>c?o:c:r>c?r:c,Q=I>g?I>l?I:l:g>l?g:l,E=Ie(B,C,A,e,i),b=Ie(h,Q,A,e,i),d=s.prevZ,f=s.nextZ;d&&d.z>=E&&f&&f.z<=b;){if(d.x>=B&&d.x<=h&&d.y>=C&&d.y<=Q&&d!==t&&d!==n&&oA(o,I,r,g,c,l,d.x,d.y)&&y(d.prev,d,d.next)>=0||(d=d.prevZ,f.x>=B&&f.x<=h&&f.y>=C&&f.y<=Q&&f!==t&&f!==n&&oA(o,I,r,g,c,l,f.x,f.y)&&y(f.prev,f,f.next)>=0))return!1;f=f.nextZ}for(;d&&d.z>=E;){if(d.x>=B&&d.x<=h&&d.y>=C&&d.y<=Q&&d!==t&&d!==n&&oA(o,I,r,g,c,l,d.x,d.y)&&y(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;f&&f.z<=b;){if(f.x>=B&&f.x<=h&&f.y>=C&&f.y<=Q&&f!==t&&f!==n&&oA(o,I,r,g,c,l,f.x,f.y)&&y(f.prev,f,f.next)>=0)return!1;f=f.nextZ}return!0}function gn(s,A,e){var i=s;do{var t=i.prev,a=i.next.next;!UA(t,a)&&Vt(t,i,i.next,a)&&uA(t,a)&&uA(a,t)&&(A.push(t.i/e|0),A.push(i.i/e|0),A.push(a.i/e|0),mA(i),mA(i.next),i=s=a),i=i.next}while(i!==s);return tA(i)}function In(s,A,e,i,t,a){var n=s;do{for(var o=n.next.next;o!==n.prev;){if(n.i!==o.i&&Qn(n,o)){var r=Wt(n,o);n=tA(n,n.next),r=tA(r,r.next),pA(n,A,e,i,t,a,0),pA(r,A,e,i,t,a,0);return}o=o.next}n=n.next}while(n!==s)}function ln(s,A,e,i){var t=[],a,n,o,r,c;for(a=0,n=A.length;a<n;a++)o=A[a]*i,r=a<n-1?A[a+1]*i:s.length,c=zt(s,o,r,i,!1),c===c.next&&(c.steiner=!0),t.push(hn(c));for(t.sort(Bn),a=0;a<t.length;a++)e=fn(t[a],e);return e}function Bn(s,A){return s.x-A.x}function fn(s,A){var e=Cn(s,A);if(!e)return A;var i=Wt(e,s);return tA(i,i.next),tA(e,e.next)}function Cn(s,A){var e=A,i=s.x,t=s.y,a=-1/0,n;do{if(t<=e.y&&t>=e.next.y&&e.next.y!==e.y){var o=e.x+(t-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(o<=i&&o>a&&(a=o,n=e.x<e.next.x?e:e.next,o===i))return n}e=e.next}while(e!==A);if(!n)return null;var r=n,c=n.x,I=n.y,g=1/0,l;e=n;do i>=e.x&&e.x>=c&&i!==e.x&&oA(t<I?i:a,t,c,I,t<I?a:i,t,e.x,e.y)&&(l=Math.abs(t-e.y)/(i-e.x),uA(e,s)&&(l<g||l===g&&(e.x>n.x||e.x===n.x&&dn(n,e)))&&(n=e,g=l)),e=e.next;while(e!==r);return n}function dn(s,A){return y(s.prev,s,A.prev)<0&&y(A.next,s,s.next)<0}function bn(s,A,e,i){var t=s;do t.z===0&&(t.z=Ie(t.x,t.y,A,e,i)),t.prevZ=t.prev,t.nextZ=t.next,t=t.next;while(t!==s);t.prevZ.nextZ=null,t.prevZ=null,En(t)}function En(s){var A,e,i,t,a,n,o,r,c=1;do{for(e=s,s=null,a=null,n=0;e;){for(n++,i=e,o=0,A=0;A<c&&(o++,i=i.nextZ,!!i);A++);for(r=c;o>0||r>0&&i;)o!==0&&(r===0||!i||e.z<=i.z)?(t=e,e=e.nextZ,o--):(t=i,i=i.nextZ,r--),a?a.nextZ=t:s=t,t.prevZ=a,a=t;e=i}a.nextZ=null,c*=2}while(n>1);return s}function Ie(s,A,e,i,t){return s=(s-e)*t|0,A=(A-i)*t|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,A=(A|A<<8)&16711935,A=(A|A<<4)&252645135,A=(A|A<<2)&858993459,A=(A|A<<1)&1431655765,s|A<<1}function hn(s){var A=s,e=s;do(A.x<e.x||A.x===e.x&&A.y<e.y)&&(e=A),A=A.next;while(A!==s);return e}function oA(s,A,e,i,t,a,n,o){return(t-n)*(A-o)>=(s-n)*(a-o)&&(s-n)*(i-o)>=(e-n)*(A-o)&&(e-n)*(a-o)>=(t-n)*(i-o)}function Qn(s,A){return s.next.i!==A.i&&s.prev.i!==A.i&&!pn(s,A)&&(uA(s,A)&&uA(A,s)&&un(s,A)&&(y(s.prev,s,A.prev)||y(s,A.prev,A))||UA(s,A)&&y(s.prev,s,s.next)>0&&y(A.prev,A,A.next)>0)}function y(s,A,e){return(A.y-s.y)*(e.x-A.x)-(A.x-s.x)*(e.y-A.y)}function UA(s,A){return s.x===A.x&&s.y===A.y}function Vt(s,A,e,i){var t=vA(y(s,A,e)),a=vA(y(s,A,i)),n=vA(y(e,i,s)),o=vA(y(e,i,A));return!!(t!==a&&n!==o||t===0&&FA(s,e,A)||a===0&&FA(s,i,A)||n===0&&FA(e,s,i)||o===0&&FA(e,A,i))}function FA(s,A,e){return A.x<=Math.max(s.x,e.x)&&A.x>=Math.min(s.x,e.x)&&A.y<=Math.max(s.y,e.y)&&A.y>=Math.min(s.y,e.y)}function vA(s){return s>0?1:s<0?-1:0}function pn(s,A){var e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==A.i&&e.next.i!==A.i&&Vt(e,e.next,s,A))return!0;e=e.next}while(e!==s);return!1}function uA(s,A){return y(s.prev,s,s.next)<0?y(s,A,s.next)>=0&&y(s,s.prev,A)>=0:y(s,A,s.prev)<0||y(s,s.next,A)<0}function un(s,A){var e=s,i=!1,t=(s.x+A.x)/2,a=(s.y+A.y)/2;do e.y>a!=e.next.y>a&&e.next.y!==e.y&&t<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==s);return i}function Wt(s,A){var e=new le(s.i,s.x,s.y),i=new le(A.i,A.x,A.y),t=s.next,a=A.prev;return s.next=A,A.prev=s,e.next=t,t.prev=e,i.next=e,e.prev=i,a.next=i,i.prev=a,i}function je(s,A,e,i){var t=new le(s,A,e);return i?(t.next=i.next,t.prev=i,i.next.prev=t,i.next=t):(t.prev=t,t.next=t),t}function mA(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function le(s,A,e){this.i=s,this.x=A,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}NA.deviation=function(s,A,e,i){var t=A&&A.length,a=t?A[0]*e:s.length,n=Math.abs(Be(s,0,a,e));if(t)for(var o=0,r=A.length;o<r;o++){var c=A[o]*e,I=o<r-1?A[o+1]*e:s.length;n-=Math.abs(Be(s,c,I,e))}var g=0;for(o=0;o<i.length;o+=3){var l=i[o]*e,B=i[o+1]*e,C=i[o+2]*e;g+=Math.abs((s[l]-s[C])*(s[B+1]-s[l+1])-(s[l]-s[B])*(s[C+1]-s[l+1]))}return n===0&&g===0?0:Math.abs((g-n)/n)};function Be(s,A,e,i){for(var t=0,a=A,n=e-i;a<e;a+=i)t+=(s[n]-s[a])*(s[a+1]+s[n+1]),n=a;return t}NA.flatten=function(s){for(var A=s[0][0].length,e={vertices:[],holes:[],dimensions:A},i=0,t=0;t<s.length;t++){for(var a=0;a<s[t].length;a++)for(var n=0;n<A;n++)e.vertices.push(s[t][a][n]);t>0&&(i+=s[t-1].length,e.holes.push(i))}return e};new V;new V;var Ke;(s=>{function A(t){let a=t.slice();return a.sort(s.POINT_COMPARATOR),s.makeHullPresorted(a)}s.makeHull=A;function e(t){if(t.length<=1)return t.slice();let a=[];for(let o=0;o<t.length;o++){const r=t[o];for(;a.length>=2;){const c=a[a.length-1],I=a[a.length-2];if((c.x-I.x)*(r.y-I.y)>=(c.y-I.y)*(r.x-I.x))a.pop();else break}a.push(r)}a.pop();let n=[];for(let o=t.length-1;o>=0;o--){const r=t[o];for(;n.length>=2;){const c=n[n.length-1],I=n[n.length-2];if((c.x-I.x)*(r.y-I.y)>=(c.y-I.y)*(r.x-I.x))n.pop();else break}n.push(r)}return n.pop(),a.length==1&&n.length==1&&a[0].x==n[0].x&&a[0].y==n[0].y?a:a.concat(n)}s.makeHullPresorted=e;function i(t,a){return t.x<a.x?-1:t.x>a.x?1:t.y<a.y?-1:t.y>a.y?1:0}s.POINT_COMPARATOR=i})(Ke||(Ke={}));new nA;new u;new G;new de;new LA;new cA;new u;new u;export{Dn as G};
