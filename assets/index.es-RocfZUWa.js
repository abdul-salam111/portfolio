import{Y as Fn,G as We,d as Ue,a6 as _n,K as st,r as T,M as Ye,q as zn,Q as Rn,I as jn,a7 as ht,a as Dn,u as $t,w as J,x as H,z as Wn,R as Ve}from"./index-BvjCMG4a.js";function Un(...t){const e=!Array.isArray(t[0]),n=e?0:-1,a=t[0+n],r=t[1+n],o=t[2+n],s=t[3+n],i=Fn(r,o,s);return e?i(a):i}function Yn(t,e,n={}){const a=t.get();let r=null,o=a,s;const i=typeof a=="string"?a.replace(/[\d.-]/g,""):void 0,f=()=>{r&&(r.stop(),r=null),t.animation=void 0},c=()=>{const p=re(t.get()),d=re(o);if(p===d){f();return}const h=r?r.getGeneratorVelocity():t.getVelocity();f(),r=new _n({keyframes:[p,d],velocity:h,type:"spring",restDelta:.001,restSpeed:.01,...n,onUpdate:s})},u=()=>{var p;c(),t.animation=r??void 0,(p=t.events.animationStart)==null||p.notify(),r==null||r.then(()=>{var d;t.animation=void 0,(d=t.events.animationComplete)==null||d.notify()})};if(t.attach((p,d)=>{o=p,s=h=>d(yt(h,i)),We.postRender(u)},f),Ue(e)){let p=n.skipInitialAnimation===!0;const d=e.on("change",A=>{p?(p=!1,t.jump(yt(A,i),!1)):t.set(yt(A,i))}),h=t.on("destroy",d);return()=>{d(),h()}}return f}function yt(t,e){return e?t+e:t}function re(t){return typeof t=="number"?t:parseFloat(t)}function Ge(t){const e=st(()=>zn(t)),{isStatic:n}=T.useContext(Ye);if(n){const[,a]=T.useState(t);T.useEffect(()=>e.on("change",a),[])}return e}function He(t,e){const n=Ge(e()),a=()=>n.set(e());return a(),Rn(()=>{const r=()=>We.preRender(a,!1,!0),o=t.map(s=>s.on("change",r));return()=>{o.forEach(s=>s()),jn(a)}}),n}function Vn(t){ht.current=[],t();const e=He(ht.current,t);return ht.current=void 0,e}function $e(t,e,n,a){if(typeof t=="function")return Vn(t);if(n!==void 0&&!Array.isArray(n)&&typeof e!="function")return Gn(t,e,n,a);const s=typeof e=="function"?e:Un(e,n,a),i=Array.isArray(t)?oe(t,s):oe([t],([c])=>s(c)),f=Array.isArray(t)?void 0:t.accelerate;return f&&!f.isTransformed&&typeof e!="function"&&Array.isArray(n)&&(a==null?void 0:a.clamp)!==!1&&(i.accelerate={...f,times:e,keyframes:n,isTransformed:!0}),i}function oe(t,e){const n=st(()=>[]);return He(t,()=>{n.length=0;const a=t.length;for(let r=0;r<a;r++)n[r]=t[r].get();return e(n)})}function Gn(t,e,n,a){const r=st(()=>Object.keys(n)),o=st(()=>({}));for(const s of r)o[s]=$e(t,e,n[s],a);return o}function Hn(t,e={}){const{isStatic:n}=T.useContext(Ye),a=()=>Ue(t)?t.get():t;if(n)return $e(a);const r=Ge(a());return T.useInsertionEffect(()=>Yn(r,t,e),[r,JSON.stringify(e)]),r}function ho(t,e={}){return Hn(t,{type:"spring",...e})}const $n={some:0,all:1};function Xn(t,e,{root:n,margin:a,amount:r="some"}={}){const o=Dn(t),s=new WeakMap,i=c=>{c.forEach(u=>{const p=s.get(u.target);if(u.isIntersecting!==!!p)if(u.isIntersecting){const d=e(u.target,u);typeof d=="function"?s.set(u.target,d):f.unobserve(u.target)}else typeof p=="function"&&(p(u),s.delete(u.target))})},f=new IntersectionObserver(i,{root:n,rootMargin:a,threshold:typeof r=="number"?r:$n[r]});return o.forEach(c=>f.observe(c)),()=>f.disconnect()}function Xe(t,{root:e,margin:n,amount:a,once:r=!1,initial:o=!1}={}){const[s,i]=T.useState(o);return T.useEffect(()=>{if(!t.current||r&&s)return;const f=()=>(i(!0),r?void 0:()=>i(!1)),c={root:e&&e.current||void 0,margin:n,amount:a};return Xn(t.current,f,c)},[e,t,n,r,a]),s}const se={up:{y:34,x:0},down:{y:-34,x:0},left:{x:-34,y:0},right:{x:34,y:0},none:{x:0,y:0}},yo=({children:t,delay:e=0,direction:n="up",distance:a,duration:r=.7,blur:o=!1,scale:s,once:i=!0,margin:f="-70px 0px",className:c="",as:u="div",style:p,...d})=>{const h=T.useRef(null),A=Xe(h,{once:i,margin:f}),{reduced:S}=$t(),b=J[u]??J.div;if(S){const w=u;return H.jsx(w,{ref:h,className:c,style:p,...d,children:t})}const v=se[n]??se.up,x=a?{x:Math.sign(v.x)*a,y:Math.sign(v.y)*a}:v;return H.jsx(b,{ref:h,className:c,style:p,initial:{opacity:0,...x,...s?{scale:s}:null,...o?{filter:"blur(10px)"}:null},animate:A?{opacity:1,x:0,y:0,...s?{scale:1}:null,...o?{filter:"blur(0px)"}:null}:void 0,transition:{duration:r,delay:e,ease:[.16,1,.3,1]},...d,children:t})},bo=({children:t,stagger:e=.09,delay:n=0,className:a="",margin:r="-70px 0px",once:o=!0,...s})=>{const i=T.useRef(null),f=Xe(i,{once:o,margin:r}),{reduced:c}=$t();return H.jsx(J.div,{ref:i,className:a,initial:c?!1:"hidden",animate:c||f?"visible":"hidden",variants:{hidden:{},visible:{transition:{staggerChildren:c?0:e,delayChildren:n}}},...s,children:t})},Bn={hidden:{opacity:0,y:26,filter:"blur(6px)"},visible:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.68,ease:[.16,1,.3,1]}}},vo=({children:t,className:e="",as:n="div",...a})=>{const r=J[n]??J.div;return H.jsx(r,{className:e,variants:Bn,...a,children:t})},qn=[{color:"var(--accent)",size:"46rem",top:"-18%",left:"-10%",opacity:.3,delay:"0s"},{color:"var(--violet)",size:"38rem",top:"24%",left:"58%",opacity:.22,delay:"-7s"},{color:"var(--accent-soft)",size:"32rem",top:"62%",left:"6%",opacity:.2,delay:"-13s"}],xo=({blobs:t=qn,grain:e=!0,className:n=""})=>{const{reduced:a}=$t();return H.jsx("div",{className:`aurora ${e?"grain":""} ${n}`,"aria-hidden":"true",children:t.map((r,o)=>H.jsx("span",{className:"aurora-blob",style:{width:r.size,height:r.size,top:r.top,left:r.left,opacity:r.opacity,background:r.color,animation:a?"none":`aurora ${18+o*5}s ease-in-out ${r.delay} infinite`}},o))})};/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const Ao={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},wo={prefix:"fas",iconName:"plug",icon:[384,512,[128268],"f1e6","M96 0C78.3 0 64 14.3 64 32l0 96 64 0 0-96c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32l0 96 64 0 0-96c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l0 32c0 77.4 55 142 128 156.8l0 67.2c0 17.7 14.3 32 32 32s32-14.3 32-32l0-67.2C297 398 352 333.4 352 256l0-32c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"]},ko={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"]},So={prefix:"fas",iconName:"layer-group",icon:[576,512,[],"f5fd","M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"]},Po={prefix:"fas",iconName:"arrow-up-right-from-square",icon:[512,512,["external-link"],"f08e","M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"]},Oo={prefix:"fas",iconName:"arrow-right",icon:[448,512,[8594],"f061","M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},Co={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"]},Eo={prefix:"fas",iconName:"arrow-left",icon:[448,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},Io={prefix:"fas",iconName:"tag",icon:[448,512,[127991],"f02b","M0 80L0 229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7L48 32C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},No={prefix:"fas",iconName:"comment",icon:[512,512,[128489,61669],"f075","M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"]},To={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"]},Mo={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},Lo={prefix:"fas",iconName:"download",icon:[512,512,[],"f019","M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"]},Fo={prefix:"fas",iconName:"bolt",icon:[448,512,[9889,"zap"],"f0e7","M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"]},_o={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"]};/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function Kn(t,e,n){return(e=Qn(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ie(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ie(Object(n),!0).forEach(function(a){Kn(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ie(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Jn(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Qn(t){var e=Jn(t,"string");return typeof e=="symbol"?e:e+""}const le=()=>{};let Xt={},Be={},qe=null,Ke={mark:le,measure:le};try{typeof window<"u"&&(Xt=window),typeof document<"u"&&(Be=document),typeof MutationObserver<"u"&&(qe=MutationObserver),typeof performance<"u"&&(Ke=performance)}catch{}const{userAgent:ce=""}=Xt.navigator||{},z=Xt,y=Be,fe=qe,nt=Ke;z.document;const F=!!y.documentElement&&!!y.head&&typeof y.addEventListener=="function"&&typeof y.createElement=="function",Je=~ce.indexOf("MSIE")||~ce.indexOf("Trident/");var Zn=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,ta=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Qe={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},ea={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Ze=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],k="classic",ft="duotone",na="sharp",aa="sharp-duotone",tn=[k,ft,na,aa],ra={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},oa={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},sa=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),ia={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},la=["fak","fa-kit","fakd","fa-kit-duotone"],ue={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},ca=["kit"],fa={kit:{"fa-kit":"fak"}},ua=["fak","fakd"],ma={kit:{fak:"fa-kit"}},me={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},at={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},da=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],pa=["fak","fa-kit","fakd","fa-kit-duotone"],ga={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},ha={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},ya={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Ct={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},ba=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],Et=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...da,...ba],va=["solid","regular","light","thin","duotone","brands"],en=[1,2,3,4,5,6,7,8,9,10],xa=en.concat([11,12,13,14,15,16,17,18,19,20]),Aa=[...Object.keys(ya),...va,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",at.GROUP,at.SWAP_OPACITY,at.PRIMARY,at.SECONDARY].concat(en.map(t=>"".concat(t,"x"))).concat(xa.map(t=>"w-".concat(t))),wa={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const M="___FONT_AWESOME___",It=16,nn="fa",an="svg-inline--fa",W="data-fa-i2svg",Nt="data-fa-pseudo-element",ka="data-fa-pseudo-element-pending",Bt="data-prefix",qt="data-icon",de="fontawesome-i2svg",Sa="async",Pa=["HTML","HEAD","STYLE","SCRIPT"],rn=(()=>{try{return!0}catch{return!1}})();function tt(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[k]}})}const on=l({},Qe);on[k]=l(l(l(l({},{"fa-duotone":"duotone"}),Qe[k]),ue.kit),ue["kit-duotone"]);const Oa=tt(on),Tt=l({},ia);Tt[k]=l(l(l(l({},{duotone:"fad"}),Tt[k]),me.kit),me["kit-duotone"]);const pe=tt(Tt),Mt=l({},Ct);Mt[k]=l(l({},Mt[k]),ma.kit);const Kt=tt(Mt),Lt=l({},ha);Lt[k]=l(l({},Lt[k]),fa.kit);tt(Lt);const Ca=Zn,sn="fa-layers-text",Ea=ta,Ia=l({},ra);tt(Ia);const Na=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],bt=ea,Ta=[...ca,...Aa],q=z.FontAwesomeConfig||{};function Ma(t){var e=y.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function La(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}y&&typeof y.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=La(Ma(n));r!=null&&(q[a]=r)});const ln={styleDefault:"solid",familyDefault:k,cssPrefix:nn,replacementClass:an,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};q.familyPrefix&&(q.cssPrefix=q.familyPrefix);const $=l(l({},ln),q);$.autoReplaceSvg||($.observeMutations=!1);const m={};Object.keys(ln).forEach(t=>{Object.defineProperty(m,t,{enumerable:!0,set:function(e){$[t]=e,K.forEach(n=>n(m))},get:function(){return $[t]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){$.cssPrefix=t,K.forEach(e=>e(m))},get:function(){return $.cssPrefix}});z.FontAwesomeConfig=m;const K=[];function Fa(t){return K.push(t),()=>{K.splice(K.indexOf(t),1)}}const _=It,E={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function _a(t){if(!t||!F)return;const e=y.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=y.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const o=n[r],s=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(a=o)}return y.head.insertBefore(e,a),t}const za="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Q(){let t=12,e="";for(;t-- >0;)e+=za[Math.random()*62|0];return e}function X(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Jt(t){return t.classList?X(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function cn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ra(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(cn(t[n]),'" '),"").trim()}function ut(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function Qt(t){return t.size!==E.size||t.x!==E.x||t.y!==E.y||t.rotate!==E.rotate||t.flipX||t.flipY}function ja(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),i="rotate(".concat(e.rotate," 0 0)"),f={transform:"".concat(o," ").concat(s," ").concat(i)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:f,path:c}}function Da(t){let{transform:e,width:n=It,height:a=It,startCentered:r=!1}=t,o="";return r&&Je?o+="translate(".concat(e.x/_-n/2,"em, ").concat(e.y/_-a/2,"em) "):r?o+="translate(calc(-50% + ".concat(e.x/_,"em), calc(-50% + ").concat(e.y/_,"em)) "):o+="translate(".concat(e.x/_,"em, ").concat(e.y/_,"em) "),o+="scale(".concat(e.size/_*(e.flipX?-1:1),", ").concat(e.size/_*(e.flipY?-1:1),") "),o+="rotate(".concat(e.rotate,"deg) "),o}var Wa=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function fn(){const t=nn,e=an,n=m.cssPrefix,a=m.replacementClass;let r=Wa;if(n!==t||a!==e){const o=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),i=new RegExp("\\.".concat(e),"g");r=r.replace(o,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(i,".".concat(a))}return r}let ge=!1;function vt(){m.autoAddCss&&!ge&&(_a(fn()),ge=!0)}var Ua={mixout(){return{dom:{css:fn,insertCss:vt}}},hooks(){return{beforeDOMElementCreation(){vt()},beforeI2svg(){vt()}}}};const L=z||{};L[M]||(L[M]={});L[M].styles||(L[M].styles={});L[M].hooks||(L[M].hooks={});L[M].shims||(L[M].shims=[]);var I=L[M];const un=[],mn=function(){y.removeEventListener("DOMContentLoaded",mn),it=1,un.map(t=>t())};let it=!1;F&&(it=(y.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(y.readyState),it||y.addEventListener("DOMContentLoaded",mn));function Ya(t){F&&(it?setTimeout(t,0):un.push(t))}function et(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?cn(t):"<".concat(e," ").concat(Ra(n),">").concat(a.map(et).join(""),"</").concat(e,">")}function he(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var xt=function(e,n,a,r){var o=Object.keys(e),s=o.length,i=n,f,c,u;for(a===void 0?(f=1,u=e[o[0]]):(f=0,u=a);f<s;f++)c=o[f],u=i(u,e[c],c,e);return u};function Va(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const o=t.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Ft(t){const e=Va(t);return e.length===1?e[0].toString(16):null}function Ga(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function ye(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function _t(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=ye(e);typeof I.hooks.addPack=="function"&&!a?I.hooks.addPack(t,ye(e)):I.styles[t]=l(l({},I.styles[t]||{}),r),t==="fas"&&_t("fa",e)}const{styles:Z,shims:Ha}=I,dn=Object.keys(Kt),$a=dn.reduce((t,e)=>(t[e]=Object.keys(Kt[e]),t),{});let Zt=null,pn={},gn={},hn={},yn={},bn={};function Xa(t){return~Ta.indexOf(t)}function Ba(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!Xa(r)?r:null}const vn=()=>{const t=a=>xt(Z,(r,o,s)=>(r[s]=xt(o,a,{}),r),{});pn=t((a,r,o)=>(r[3]&&(a[r[3]]=o),r[2]&&r[2].filter(i=>typeof i=="number").forEach(i=>{a[i.toString(16)]=o}),a)),gn=t((a,r,o)=>(a[o]=o,r[2]&&r[2].filter(i=>typeof i=="string").forEach(i=>{a[i]=o}),a)),bn=t((a,r,o)=>{const s=r[2];return a[o]=o,s.forEach(i=>{a[i]=o}),a});const e="far"in Z||m.autoFetchSvg,n=xt(Ha,(a,r)=>{const o=r[0];let s=r[1];const i=r[2];return s==="far"&&!e&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:i}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:i}),a},{names:{},unicodes:{}});hn=n.names,yn=n.unicodes,Zt=mt(m.styleDefault,{family:m.familyDefault})};Fa(t=>{Zt=mt(t.styleDefault,{family:m.familyDefault})});vn();function te(t,e){return(pn[t]||{})[e]}function qa(t,e){return(gn[t]||{})[e]}function D(t,e){return(bn[t]||{})[e]}function xn(t){return hn[t]||{prefix:null,iconName:null}}function Ka(t){const e=yn[t],n=te("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function R(){return Zt}const An=()=>({prefix:null,iconName:null,rest:[]});function Ja(t){let e=k;const n=dn.reduce((a,r)=>(a[r]="".concat(m.cssPrefix,"-").concat(r),a),{});return tn.forEach(a=>{(t.includes(n[a])||t.some(r=>$a[a].includes(r)))&&(e=a)}),e}function mt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=k}=e,a=Oa[n][t];if(n===ft&&!t)return"fad";const r=pe[n][t]||pe[n][a],o=t in I.styles?t:null;return r||o||null}function Qa(t){let e=[],n=null;return t.forEach(a=>{const r=Ba(m.cssPrefix,a);r?n=r:a&&e.push(a)}),{iconName:n,rest:e}}function be(t){return t.sort().filter((e,n,a)=>a.indexOf(e)===n)}function dt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let a=null;const r=Et.concat(pa),o=be(t.filter(p=>r.includes(p))),s=be(t.filter(p=>!Et.includes(p))),i=o.filter(p=>(a=p,!Ze.includes(p))),[f=null]=i,c=Ja(o),u=l(l({},Qa(s)),{},{prefix:mt(f,{family:c})});return l(l(l({},u),nr({values:t,family:c,styles:Z,config:m,canonical:u,givenPrefix:a})),Za(n,a,u))}function Za(t,e,n){let{prefix:a,iconName:r}=n;if(t||!a||!r)return{prefix:a,iconName:r};const o=e==="fa"?xn(r):{},s=D(a,r);return r=o.iconName||s||r,a=o.prefix||a,a==="far"&&!Z.far&&Z.fas&&!m.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}const tr=tn.filter(t=>t!==k||t!==ft),er=Object.keys(Ct).filter(t=>t!==k).map(t=>Object.keys(Ct[t])).flat();function nr(t){const{values:e,family:n,canonical:a,givenPrefix:r="",styles:o={},config:s={}}=t,i=n===ft,f=e.includes("fa-duotone")||e.includes("fad"),c=s.familyDefault==="duotone",u=a.prefix==="fad"||a.prefix==="fa-duotone";if(!i&&(f||c||u)&&(a.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(a.prefix="fab"),!a.prefix&&tr.includes(n)&&(Object.keys(o).find(d=>er.includes(d))||s.autoFetchSvg)){const d=sa.get(n).defaultShortPrefixId;a.prefix=d,a.iconName=D(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||r==="fa")&&(a.prefix=R()||"fas"),a}class ar{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(o=>{this.definitions[o]=l(l({},this.definitions[o]||{}),r[o]),_t(o,r[o]);const s=Kt[k][o];s&&_t(s,r[o]),vn()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:o,iconName:s,icon:i}=a[r],f=i[2];e[o]||(e[o]={}),f.length>0&&f.forEach(c=>{typeof c=="string"&&(e[o][c]=i)}),e[o][s]=i}),e}}let ve=[],Y={};const G={},rr=Object.keys(G);function or(t,e){let{mixoutsTo:n}=e;return ve=t,Y={},Object.keys(G).forEach(a=>{rr.indexOf(a)===-1&&delete G[a]}),ve.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(o=>{typeof r[o]=="function"&&(n[o]=r[o]),typeof r[o]=="object"&&Object.keys(r[o]).forEach(s=>{n[o]||(n[o]={}),n[o][s]=r[o][s]})}),a.hooks){const o=a.hooks();Object.keys(o).forEach(s=>{Y[s]||(Y[s]=[]),Y[s].push(o[s])})}a.provides&&a.provides(G)}),n}function zt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(Y[t]||[]).forEach(s=>{e=s.apply(null,[e,...a])}),e}function U(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(Y[t]||[]).forEach(o=>{o.apply(null,n)})}function j(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return G[t]?G[t].apply(null,e):void 0}function Rt(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||R();if(e)return e=D(n,e)||e,he(wn.definitions,n,e)||he(I.styles,n,e)}const wn=new ar,sr=()=>{m.autoReplaceSvg=!1,m.observeMutations=!1,U("noAuto")},ir={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return F?(U("beforeI2svg",t),j("pseudoElements2svg",t),j("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Ya(()=>{cr({autoReplaceSvgRoot:e}),U("watch",t)})}},lr={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:D(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=mt(t[0]);return{prefix:n,iconName:D(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(Ca))){const e=dt(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||R(),iconName:D(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=R();return{prefix:e,iconName:D(e,t)||t}}}},P={noAuto:sr,config:m,dom:ir,parse:lr,library:wn,findIconDefinition:Rt,toHtml:et},cr=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=y}=t;(Object.keys(I.styles).length>0||m.autoFetchSvg)&&F&&m.autoReplaceSvg&&P.dom.i2svg({node:e})};function pt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>et(n))}}),Object.defineProperty(t,"node",{get:function(){if(!F)return;const n=y.createElement("div");return n.innerHTML=t.html,n.children}}),t}function fr(t){let{children:e,main:n,mask:a,attributes:r,styles:o,transform:s}=t;if(Qt(s)&&n.found&&!a.found){const{width:i,height:f}=n,c={x:i/f/2,y:.5};r.style=ut(l(l({},o),{},{"transform-origin":"".concat(c.x+s.x/16,"em ").concat(c.y+s.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function ur(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:o}=t;const s=o===!0?"".concat(e,"-").concat(m.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:l(l({},r),{},{id:s}),children:a}]}]}function ee(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:o,symbol:s,title:i,maskId:f,titleId:c,extra:u,watchable:p=!1}=t,{width:d,height:h}=n.found?n:e,A=ua.includes(a),S=[m.replacementClass,r?"".concat(m.cssPrefix,"-").concat(r):""].filter(O=>u.classes.indexOf(O)===-1).filter(O=>O!==""||!!O).concat(u.classes).join(" ");let b={children:[],attributes:l(l({},u.attributes),{},{"data-prefix":a,"data-icon":r,class:S,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(d," ").concat(h)})};const v=A&&!~u.classes.indexOf("fa-fw")?{width:"".concat(d/h*16*.0625,"em")}:{};p&&(b.attributes[W]=""),i&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(c||Q())},children:[i]}),delete b.attributes.title);const x=l(l({},b),{},{prefix:a,iconName:r,main:e,mask:n,maskId:f,transform:o,symbol:s,styles:l(l({},v),u.styles)}),{children:w,attributes:N}=n.found&&e.found?j("generateAbstractMask",x)||{children:[],attributes:{}}:j("generateAbstractIcon",x)||{children:[],attributes:{}};return x.children=w,x.attributes=N,s?ur(x):fr(x)}function xe(t){const{content:e,width:n,height:a,transform:r,title:o,extra:s,watchable:i=!1}=t,f=l(l(l({},s.attributes),o?{title:o}:{}),{},{class:s.classes.join(" ")});i&&(f[W]="");const c=l({},s.styles);Qt(r)&&(c.transform=Da({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const u=ut(c);u.length>0&&(f.style=u);const p=[];return p.push({tag:"span",attributes:f,children:[e]}),o&&p.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),p}function mr(t){const{content:e,title:n,extra:a}=t,r=l(l(l({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),o=ut(a.styles);o.length>0&&(r.style=o);const s=[];return s.push({tag:"span",attributes:r,children:[e]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}const{styles:At}=I;function jt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(bt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(bt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(bt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const dr={found:!1,width:512,height:512};function pr(t,e){!rn&&!m.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Dt(t,e){let n=e;return e==="fa"&&m.styleDefault!==null&&(e=R()),new Promise((a,r)=>{if(n==="fa"){const o=xn(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&At[e]&&At[e][t]){const o=At[e][t];return a(jt(o))}pr(t,e),a(l(l({},dr),{},{icon:m.showMissingIcons&&t?j("missingIconAbstract")||{}:{}}))})}const Ae=()=>{},Wt=m.measurePerformance&&nt&&nt.mark&&nt.measure?nt:{mark:Ae,measure:Ae},B='FA "6.7.2"',gr=t=>(Wt.mark("".concat(B," ").concat(t," begins")),()=>kn(t)),kn=t=>{Wt.mark("".concat(B," ").concat(t," ends")),Wt.measure("".concat(B," ").concat(t),"".concat(B," ").concat(t," begins"),"".concat(B," ").concat(t," ends"))};var ne={begin:gr,end:kn};const rt=()=>{};function we(t){return typeof(t.getAttribute?t.getAttribute(W):null)=="string"}function hr(t){const e=t.getAttribute?t.getAttribute(Bt):null,n=t.getAttribute?t.getAttribute(qt):null;return e&&n}function yr(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(m.replacementClass)}function br(){return m.autoReplaceSvg===!0?ot.replace:ot[m.autoReplaceSvg]||ot.replace}function vr(t){return y.createElementNS("http://www.w3.org/2000/svg",t)}function xr(t){return y.createElement(t)}function Sn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?vr:xr}=e;if(typeof t=="string")return y.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])}),(t.children||[]).forEach(function(o){a.appendChild(Sn(o,{ceFn:n}))}),a}function Ar(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const ot={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(Sn(n),e)}),e.getAttribute(W)===null&&m.keepOriginalSource){let n=y.createComment(Ar(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~Jt(e).indexOf(m.replacementClass))return ot.replace(t);const a=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((s,i)=>(i===m.replacementClass||i.match(a)?s.toSvg.push(i):s.toNode.push(i),s),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}const r=n.map(o=>et(o)).join(`
`);e.setAttribute(W,""),e.innerHTML=r}};function ke(t){t()}function Pn(t,e){const n=typeof e=="function"?e:rt;if(t.length===0)n();else{let a=ke;m.mutateApproach===Sa&&(a=z.requestAnimationFrame||ke),a(()=>{const r=br(),o=ne.begin("mutate");t.map(r),o(),n()})}}let ae=!1;function On(){ae=!0}function Ut(){ae=!1}let lt=null;function Se(t){if(!fe||!m.observeMutations)return;const{treeCallback:e=rt,nodeCallback:n=rt,pseudoElementsCallback:a=rt,observeMutationsRoot:r=y}=t;lt=new fe(o=>{if(ae)return;const s=R();X(o).forEach(i=>{if(i.type==="childList"&&i.addedNodes.length>0&&!we(i.addedNodes[0])&&(m.searchPseudoElements&&a(i.target),e(i.target)),i.type==="attributes"&&i.target.parentNode&&m.searchPseudoElements&&a(i.target.parentNode),i.type==="attributes"&&we(i.target)&&~Na.indexOf(i.attributeName))if(i.attributeName==="class"&&hr(i.target)){const{prefix:f,iconName:c}=dt(Jt(i.target));i.target.setAttribute(Bt,f||s),c&&i.target.setAttribute(qt,c)}else yr(i.target)&&n(i.target)})}),F&&lt.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function wr(){lt&&lt.disconnect()}function kr(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const o=r.split(":"),s=o[0],i=o.slice(1);return s&&i.length>0&&(a[s]=i.join(":").trim()),a},{})),n}function Sr(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=dt(Jt(t));return r.prefix||(r.prefix=R()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=qa(r.prefix,t.innerText)||te(r.prefix,Ft(t.innerText))),!r.iconName&&m.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Pr(t){const e=X(t.attributes).reduce((r,o)=>(r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return m.autoA11y&&(n?e["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(a||Q()):(e["aria-hidden"]="true",e.focusable="false")),e}function Or(){return{iconName:null,title:null,titleId:null,prefix:null,transform:E,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Pe(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=Sr(t),o=Pr(t),s=zt("parseNodeAttributes",{},t);let i=e.styleParser?kr(t):[];return l({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:E,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:i,attributes:o}},s)}const{styles:Cr}=I;function Cn(t){const e=m.autoReplaceSvg==="nest"?Pe(t,{styleParser:!1}):Pe(t);return~e.extra.classes.indexOf(sn)?j("generateLayersText",t,e):j("generateSvgReplacementMutation",t,e)}function Er(){return[...la,...Et]}function Oe(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!F)return Promise.resolve();const n=y.documentElement.classList,a=u=>n.add("".concat(de,"-").concat(u)),r=u=>n.remove("".concat(de,"-").concat(u)),o=m.autoFetchSvg?Er():Ze.concat(Object.keys(Cr));o.includes("fa")||o.push("fa");const s=[".".concat(sn,":not([").concat(W,"])")].concat(o.map(u=>".".concat(u,":not([").concat(W,"])"))).join(", ");if(s.length===0)return Promise.resolve();let i=[];try{i=X(t.querySelectorAll(s))}catch{}if(i.length>0)a("pending"),r("complete");else return Promise.resolve();const f=ne.begin("onTree"),c=i.reduce((u,p)=>{try{const d=Cn(p);d&&u.push(d)}catch(d){rn||d.name==="MissingIcon"&&console.error(d)}return u},[]);return new Promise((u,p)=>{Promise.all(c).then(d=>{Pn(d,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),f(),u()})}).catch(d=>{f(),p(d)})})}function Ir(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Cn(t).then(n=>{n&&Pn([n],e)})}function Nr(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:Rt(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Rt(r||{})),t(a,l(l({},n),{},{mask:r}))}}const Tr=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=E,symbol:a=!1,mask:r=null,maskId:o=null,title:s=null,titleId:i=null,classes:f=[],attributes:c={},styles:u={}}=e;if(!t)return;const{prefix:p,iconName:d,icon:h}=t;return pt(l({type:"icon"},t),()=>(U("beforeDOMElementCreation",{iconDefinition:t,params:e}),m.autoA11y&&(s?c["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(i||Q()):(c["aria-hidden"]="true",c.focusable="false")),ee({icons:{main:jt(h),mask:r?jt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:p,iconName:d,transform:l(l({},E),n),symbol:a,title:s,maskId:o,titleId:i,extra:{attributes:c,styles:u,classes:f}})))};var Mr={mixout(){return{icon:Nr(Tr)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=Oe,t.nodeCallback=Ir,t}}},provides(t){t.i2svg=function(e){const{node:n=y,callback:a=()=>{}}=e;return Oe(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:o,prefix:s,transform:i,symbol:f,mask:c,maskId:u,extra:p}=n;return new Promise((d,h)=>{Promise.all([Dt(a,s),c.iconName?Dt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(A=>{let[S,b]=A;d([e,ee({icons:{main:S,mask:b},prefix:s,iconName:a,transform:i,symbol:f,maskId:u,title:r,titleId:o,extra:p,watchable:!0})])}).catch(h)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:o,styles:s}=e;const i=ut(s);i.length>0&&(a.style=i);let f;return Qt(o)&&(f=j("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),n.push(f||r.icon),{children:n,attributes:a}}}},Lr={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return pt({type:"layer"},()=>{U("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(o=>{a=a.concat(o.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Fr={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:o={}}=e;return pt({type:"counter",content:t},()=>(U("beforeDOMElementCreation",{content:t,params:e}),mr({content:t.toString(),title:n,extra:{attributes:r,styles:o,classes:["".concat(m.cssPrefix,"-layers-counter"),...a]}})))}}}},_r={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=E,title:a=null,classes:r=[],attributes:o={},styles:s={}}=e;return pt({type:"text",content:t},()=>(U("beforeDOMElementCreation",{content:t,params:e}),xe({content:t,transform:l(l({},E),n),title:a,extra:{attributes:o,styles:s,classes:["".concat(m.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:o}=n;let s=null,i=null;if(Je){const f=parseInt(getComputedStyle(e).fontSize,10),c=e.getBoundingClientRect();s=c.width/f,i=c.height/f}return m.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([e,xe({content:e.innerHTML,width:s,height:i,transform:r,title:a,extra:o,watchable:!0})])}}};const zr=new RegExp('"',"ug"),Ce=[1105920,1112319],Ee=l(l(l(l({},{FontAwesome:{normal:"fas",400:"fas"}}),oa),wa),ga),Yt=Object.keys(Ee).reduce((t,e)=>(t[e.toLowerCase()]=Ee[e],t),{}),Rr=Object.keys(Yt).reduce((t,e)=>{const n=Yt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function jr(t){const e=t.replace(zr,""),n=Ga(e,0),a=n>=Ce[0]&&n<=Ce[1],r=e.length===2?e[0]===e[1]:!1;return{value:Ft(r?e[0]:e),isSecondary:a||r}}function Dr(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(Yt[n]||{})[r]||Rr[n]}function Ie(t,e){const n="".concat(ka).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const s=X(t.children).filter(d=>d.getAttribute(Nt)===e)[0],i=z.getComputedStyle(t,e),f=i.getPropertyValue("font-family"),c=f.match(Ea),u=i.getPropertyValue("font-weight"),p=i.getPropertyValue("content");if(s&&!c)return t.removeChild(s),a();if(c&&p!=="none"&&p!==""){const d=i.getPropertyValue("content");let h=Dr(f,u);const{value:A,isSecondary:S}=jr(d),b=c[0].startsWith("FontAwesome");let v=te(h,A),x=v;if(b){const w=Ka(A);w.iconName&&w.prefix&&(v=w.iconName,h=w.prefix)}if(v&&!S&&(!s||s.getAttribute(Bt)!==h||s.getAttribute(qt)!==x)){t.setAttribute(n,x),s&&t.removeChild(s);const w=Or(),{extra:N}=w;N.attributes[Nt]=e,Dt(v,h).then(O=>{const Mn=ee(l(l({},w),{},{icons:{main:O,mask:An()},prefix:h,iconName:x,extra:N,watchable:!0})),gt=y.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(gt,t.firstChild):t.appendChild(gt),gt.outerHTML=Mn.map(Ln=>et(Ln)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Wr(t){return Promise.all([Ie(t,"::before"),Ie(t,"::after")])}function Ur(t){return t.parentNode!==document.head&&!~Pa.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Nt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Ne(t){if(F)return new Promise((e,n)=>{const a=X(t.querySelectorAll("*")).filter(Ur).map(Wr),r=ne.begin("searchPseudoElements");On(),Promise.all(a).then(()=>{r(),Ut(),e()}).catch(()=>{r(),Ut(),n()})})}var Yr={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=Ne,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=y}=e;m.searchPseudoElements&&Ne(n)}}};let Te=!1;var Vr={mixout(){return{dom:{unwatch(){On(),Te=!0}}}},hooks(){return{bootstrap(){Se(zt("mutationObserverCallbacks",{}))},noAuto(){wr()},watch(t){const{observeMutationsRoot:e}=t;Te?Ut():Se(zt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const Me=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),o=r[0];let s=r.slice(1).join("-");if(o&&s==="h")return n.flipX=!0,n;if(o&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(o){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},e)};var Gr={mixout(){return{parse:{transform:t=>Me(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=Me(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:o}=e;const s={transform:"translate(".concat(r/2," 256)")},i="translate(".concat(a.x*32,", ").concat(a.y*32,") "),f="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(i," ").concat(f," ").concat(c)},p={transform:"translate(".concat(o/2*-1," -256)")},d={outer:s,inner:u,path:p};return{tag:"g",attributes:l({},d.outer),children:[{tag:"g",attributes:l({},d.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:l(l({},n.icon.attributes),d.path)}]}]}}}};const wt={x:0,y:0,width:"100%",height:"100%"};function Le(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Hr(t){return t.tag==="g"?t.children:[t]}var $r={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?dt(n.split(" ").map(r=>r.trim())):An();return a.prefix||(a.prefix=R()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:o,maskId:s,transform:i}=e;const{width:f,icon:c}=r,{width:u,icon:p}=o,d=ja({transform:i,containerWidth:u,iconWidth:f}),h={tag:"rect",attributes:l(l({},wt),{},{fill:"white"})},A=c.children?{children:c.children.map(Le)}:{},S={tag:"g",attributes:l({},d.inner),children:[Le(l({tag:c.tag,attributes:l(l({},c.attributes),d.path)},A))]},b={tag:"g",attributes:l({},d.outer),children:[S]},v="mask-".concat(s||Q()),x="clip-".concat(s||Q()),w={tag:"mask",attributes:l(l({},wt),{},{id:v,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[h,b]},N={tag:"defs",children:[{tag:"clipPath",attributes:{id:x},children:Hr(p)},w]};return n.push(N,{tag:"rect",attributes:l({fill:"currentColor","clip-path":"url(#".concat(x,")"),mask:"url(#".concat(v,")")},wt)}),{children:n,attributes:a}}}},Xr={provides(t){let e=!1;z.matchMedia&&(e=z.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:l(l({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const o=l(l({},r),{},{attributeName:"opacity"}),s={tag:"circle",attributes:l(l({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||s.children.push({tag:"animate",attributes:l(l({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:l(l({},o),{},{values:"1;0;1;1;0;1;"})}),n.push(s),n.push({tag:"path",attributes:l(l({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:l(l({},o),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:l(l({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:l(l({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Br={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},qr=[Ua,Mr,Lr,Fr,_r,Yr,Vr,Gr,$r,Xr,Br];or(qr,{mixoutsTo:P});P.noAuto;P.config;P.library;P.dom;const Vt=P.parse;P.findIconDefinition;P.toHtml;const Kr=P.icon;P.layer;P.text;P.counter;var kt={exports:{}},St,Fe;function Jr(){if(Fe)return St;Fe=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return St=t,St}var Pt,_e;function Qr(){if(_e)return Pt;_e=1;var t=Jr();function e(){}function n(){}return n.resetWarningCache=e,Pt=function(){function a(s,i,f,c,u,p){if(p!==t){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}a.isRequired=a;function r(){return a}var o={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:r,element:a,elementType:a,instanceOf:r,node:a,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:n,resetWarningCache:e};return o.PropTypes=o,o},Pt}var ze;function Zr(){return ze||(ze=1,kt.exports=Qr()()),kt.exports}var to=Zr();const g=Wn(to);function Re(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function C(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Re(Object(n),!0).forEach(function(a){V(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Re(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function ct(t){"@babel/helpers - typeof";return ct=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ct(t)}function V(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function eo(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,o;for(o=0;o<a.length;o++)r=a[o],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function no(t,e){if(t==null)return{};var n=eo(t,e),a,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)a=o[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Gt(t){return ao(t)||ro(t)||oo(t)||so()}function ao(t){if(Array.isArray(t))return Ht(t)}function ro(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function oo(t,e){if(t){if(typeof t=="string")return Ht(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ht(t,e)}}function Ht(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function so(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function io(t){var e,n=t.beat,a=t.fade,r=t.beatFade,o=t.bounce,s=t.shake,i=t.flash,f=t.spin,c=t.spinPulse,u=t.spinReverse,p=t.pulse,d=t.fixedWidth,h=t.inverse,A=t.border,S=t.listItem,b=t.flip,v=t.size,x=t.rotation,w=t.pull,N=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":o,"fa-shake":s,"fa-flash":i,"fa-spin":f,"fa-spin-reverse":u,"fa-spin-pulse":c,"fa-pulse":p,"fa-fw":d,"fa-inverse":h,"fa-border":A,"fa-li":S,"fa-flip":b===!0,"fa-flip-horizontal":b==="horizontal"||b==="both","fa-flip-vertical":b==="vertical"||b==="both"},V(e,"fa-".concat(v),typeof v<"u"&&v!==null),V(e,"fa-rotate-".concat(x),typeof x<"u"&&x!==null&&x!==0),V(e,"fa-pull-".concat(w),typeof w<"u"&&w!==null),V(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(N).map(function(O){return N[O]?O:null}).filter(function(O){return O})}function lo(t){return t=t-0,t===t}function En(t){return lo(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var co=["style"];function fo(t){return t.charAt(0).toUpperCase()+t.slice(1)}function uo(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=En(n.slice(0,a)),o=n.slice(a+1).trim();return r.startsWith("webkit")?e[fo(r)]=o:e[r]=o,e},{})}function In(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(f){return In(t,f)}),r=Object.keys(e.attributes||{}).reduce(function(f,c){var u=e.attributes[c];switch(c){case"class":f.attrs.className=u,delete e.attributes.class;break;case"style":f.attrs.style=uo(u);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?f.attrs[c.toLowerCase()]=u:f.attrs[En(c)]=u}return f},{attrs:{}}),o=n.style,s=o===void 0?{}:o,i=no(n,co);return r.attrs.style=C(C({},r.attrs.style),s),t.apply(void 0,[e.tag,C(C({},r.attrs),i)].concat(Gt(a)))}var Nn=!1;try{Nn=!0}catch{}function mo(){if(!Nn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function je(t){if(t&&ct(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Vt.icon)return Vt.icon(t);if(t===null)return null;if(t&&ct(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function Ot(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?V({},t,e):{}}var De={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},Tn=Ve.forwardRef(function(t,e){var n=C(C({},De),t),a=n.icon,r=n.mask,o=n.symbol,s=n.className,i=n.title,f=n.titleId,c=n.maskId,u=je(a),p=Ot("classes",[].concat(Gt(io(n)),Gt((s||"").split(" ")))),d=Ot("transform",typeof n.transform=="string"?Vt.transform(n.transform):n.transform),h=Ot("mask",je(r)),A=Kr(u,C(C(C(C({},p),d),h),{},{symbol:o,title:i,titleId:f,maskId:c}));if(!A)return mo("Could not find icon",u),null;var S=A.abstract,b={ref:e};return Object.keys(n).forEach(function(v){De.hasOwnProperty(v)||(b[v]=n[v])}),po(S[0],b)});Tn.displayName="FontAwesomeIcon";Tn.propTypes={beat:g.bool,border:g.bool,beatFade:g.bool,bounce:g.bool,className:g.string,fade:g.bool,flash:g.bool,mask:g.oneOfType([g.object,g.array,g.string]),maskId:g.string,fixedWidth:g.bool,inverse:g.bool,flip:g.oneOf([!0,!1,"horizontal","vertical","both"]),icon:g.oneOfType([g.object,g.array,g.string]),listItem:g.bool,pull:g.oneOf(["right","left"]),pulse:g.bool,rotation:g.oneOf([0,90,180,270]),shake:g.bool,size:g.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:g.bool,spinPulse:g.bool,spinReverse:g.bool,symbol:g.oneOfType([g.bool,g.string]),title:g.string,titleId:g.string,transform:g.oneOfType([g.string,g.object]),swapOpacity:g.bool};var po=In.bind(null,Ve.createElement);export{xo as A,Tn as F,yo as R,$e as a,ho as b,bo as c,vo as d,ko as e,Fo as f,Lo as g,wo as h,Oo as i,To as j,_o as k,Mo as l,So as m,Po as n,Co as o,Ge as p,Eo as q,Zr as r,Ao as s,No as t,Xe as u,Io as v};
