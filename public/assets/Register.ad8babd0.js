import{d as x,r as w,a8 as C,a6 as n,o as b,c as v,a as e,_ as o,T as a,v as s,ak as E,a5 as A,Y as d}from"./vendor.2ee35ec0.js";import{u as V,a as y,L as k,_ as N,i as R}from"./index.6adbff9a.js";import"./element-plus.5b1d6711.js";const q={class:"flex min-h-screen"},D={class:"ac-login p-2"},K={class:"ac-login__box shadow-xl"},L={class:"-ml-1 ac-login__logo"},S=e("img",{src:N,alt:"ApiCat"},null,-1),T=e("span",{class:"logo-text logo-apicat"},"ApiCat",-1),U=e("h2",{class:"text-xl text-zinc-800 font-medium mb-4"},"\u6B22\u8FCE\u4F7F\u7528",-1),z=e("div",{class:"ac-login__label"},[e("span",null,"\u90AE\u7BB1")],-1),G=e("div",{class:"ac-login__label"},[e("span",null,"\u5BC6\u7801")],-1),H={class:""},I=d("\u6CE8\xA0\u518C"),M={class:"text-center mt-8"},O=d("\u5DF2\u6709\u8D26\u53F7\uFF0C\u53BB"),P=d("\u767B\u5F55"),W=x({setup(Y){const i=w(),t=C({email:"",password:""}),f={email:[{required:!0,message:"\u8BF7\u8F93\u5165\u90AE\u7BB1",trigger:"blur"},{validator(_,l,u){R(l)?u():u(new Error("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1"))},trigger:"blur"}],password:[{required:!0,message:"\u5BC6\u7801\u81F3\u5C118\u4F4D",min:8,trigger:"blur"}]},[g,B]=V(y().register),r=()=>{i==null||i.value.validate(async _=>{_&&await B(t)}).catch(()=>{})};return(_,l)=>{const u=n("router-link"),m=n("el-input"),p=n("el-form-item"),h=n("el-button"),F=n("el-form");return b(),v("div",q,[e("main",D,[e("div",K,[e("div",L,[o(u,{class:"inline-flex items-center",to:"/"},{default:a(()=>[S,T]),_:1})]),U,o(F,{onKeyup:E(r,["enter"]),onSubmit:A(r,["prevent"]),"label-position":"top",size:"large",rules:s(f),ref_key:"authForm",ref:i,model:s(t)},{default:a(()=>[o(p,{label:"",prop:"email"},{default:a(()=>[z,o(m,{modelValue:s(t).email,"onUpdate:modelValue":l[0]||(l[0]=c=>s(t).email=c),placeholder:"\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",autocomplete:"on"},null,8,["modelValue"])]),_:1}),o(p,{label:"",prop:"password"},{default:a(()=>[G,o(m,{type:"password",modelValue:s(t).password,"onUpdate:modelValue":l[1]||(l[1]=c=>s(t).password=c),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801","show-password":"",autocomplete:"on"},null,8,["modelValue"])]),_:1}),e("div",H,[o(h,{loading:s(g),onClick:r,class:"w-full",type:"primary"},{default:a(()=>[I]),_:1},8,["loading"])])]),_:1},8,["onKeyup","onSubmit","rules","model"]),e("p",M,[O,o(u,{to:s(k),class:"text-blue-600 mx-1"},{default:a(()=>[P]),_:1},8,["to"])])])])])}}});export{W as default};