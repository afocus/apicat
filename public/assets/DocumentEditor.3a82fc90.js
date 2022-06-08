var E=Object.defineProperty,N=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var l=(t,e,o)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,s=(t,e)=>{for(var o in e||(e={}))B.call(e,o)&&l(t,o,e[o]);if(m)for(var o of m(e))$.call(e,o)&&l(t,o,e[o]);return t},u=(t,e)=>N(t,T(e));import{b as v,a5 as L,a6 as P,a7 as j,a8 as A,a1 as h,a0 as y,a9 as p,aa as U,a4 as b}from"./index.0747997f.js";import{E as i,f as k,v as O}from"./element-plus.33434d3d.js";import{d as w,be as I,q as V,b4 as S,aY as M,r as R,as as _,b0 as J,Q as f,e as q,f as d,av as Y,V as z,S as Q,Y as W,W as G,a1 as H,o as g,ab as K}from"./vendor.1b70e788.js";import{a as X,d as Z,b as x}from"./params.f200ea60.js";const tt=w({components:{AcEditor:I(()=>b(()=>import("./editor.es.f6de7654.js"),["assets/editor.es.f6de7654.js","assets/vendor.1b70e788.js","assets/index.0747997f.js","assets/index.0ea8bad7.css","assets/element-plus.33434d3d.js","assets/element-plus.07fbf481.css","assets/sortable.esm.85cd8ec3.js"]))},setup(){const t=V("updateTreeNode"),e=S(),o=M();return{docuemntContainer:R(null),project_id:e.params.project_id,node_id:parseInt(e.params.node_id,10),$route:e,$router:o,updateTreeNode:t}},data(){return{editorOptions:{uploadImage:t=>this.uploadImage(t),getAllCommonParams:()=>this.getAllCommonParams(),addCommonParam:t=>this.addCommonParam(t),deleteCommonParam:t=>this.deleteCommonParam(t),getUrlList:()=>this.getUrlList(),deleteUrl:t=>this.deleteUrl(t),openNotification:()=>this.openNotification()},document:{},isLoading:!1,isDocumentLoading:!1}},watch:{"$route.params.node_id":{immediate:!0,handler:function(){this.getDocumentDetail()}},"document.title":function(){this.onDocumentTitleChange()}},methods:{openNotification(){this.$refs.notice.show()},intoEditor(t){t.target===this.docuemntContainer&&setTimeout(()=>this.$refs.editor&&this.$refs.editor.editor.focus(),200)},uploadImage(t){return new Promise((e,o)=>{if(!t)return i.error("\u8BF7\u9009\u62E9\u56FE\u7247"),o("\u8BF7\u9009\u62E9\u56FE\u7247");if(t.size>10*1024*1024)return i.error("\u56FE\u7247\u4E0D\u80FD\u8D85\u8FC710MB"),o("\u56FE\u7247\u4E0D\u80FD\u8D85\u8FC710MB");L().send(t).end((a,r)=>{if(!a){P(r.data).then(({src:c})=>e(c));return}i.error(a||"\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\uFF01"),o("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\uFF01")})})},getUrlList(){return j(this.project_id).then(t=>t.data).catch(()=>{})},deleteUrl(t){return A(this.project_id,t).then(()=>{i.success("\u5E38\u7528URL\u5220\u9664\u6210\u529F")})},addCommonParam(t){const e=u(s({},t),{project_id:this.project_id});return delete e.sub_params,delete e._id,X(e).then(o=>(i.success("\u5E38\u7528\u53C2\u6570\u6DFB\u52A0\u6210\u529F"),o.data))},deleteCommonParam(t){return Z(this.project_id,t.id).then(e=>(i.success("\u5E38\u7528\u53C2\u6570\u5220\u9664\u6210\u529F"),e.data))},getAllCommonParams(){return x(this.project_id).then(t=>t.data).catch(t=>{})},getDocumentDetail(){const t=parseInt(this.$route.params.node_id,10);if(isNaN(t)){h();return}this.node_id=t,this.isDocumentLoading=!0,y(this.project_id,this.node_id).then(e=>{e.data.project_id=this.project_id,e.data.doc_id=e.data.id,!e.data.url&&(e.data.url=""),e.data.content=JSON.parse(e.data.content||"{}"),this.document=e.data,this.autoFocus()}).catch(e=>{}).finally(()=>{this.isDocumentLoading=!1,h()})},updateTreeNodeTitle(t){t&&this.updateTreeNode&&this.updateTreeNode(t.doc_id,{title:t.title||""})},onSaveBtnClick(){this.save()},save(){this.isLoading=!0,p(this.getDocumentContent()).then(t=>{i.success(t.message||"\u4FDD\u5B58\u6210\u529F"),this.updateTreeNodeTitle(t.data),this.$router.push({name:"document.api.detail",params:{project_id:this.project_id,node_id:this.node_id}})}).catch(t=>t).finally(()=>{this.isLoading=!1})},getDocumentContent(){if(this.$refs.editor&&this.$refs.editor.editor){let t=this.$refs.editor.editor.getJSON();return u(s({},this.document),{content:JSON.stringify(t)})}return this.document},onDocumentChange:_(function(){p(this.getDocumentContent()).then(t=>{this.updateTreeNodeTitle(t.data)})},500),onDocumentTitleChange:_(function(){J(this.document.title)||(U({project_id:this.project_id,title:this.document.title,doc_id:this.node_id}),this.updateTreeNodeTitle({doc_id:this.node_id,title:this.document.title}))},500),autoFocus(){this.$route.query.isNew&&this.$refs.title&&this.$refs.title.focus()}}}),et={class:"ac-document__operate"},ot={class:"ac-document__operate-inner text-right"},it=K(" \u4FDD\u5B58 ");function at(t,e,o,a,r,c){const C=H("AcEditor"),D=k,F=O;return f((g(),q("div",{class:"ac-document is-edit",ref:"docuemntContainer",onClick:e[1]||(e[1]=(...n)=>t.intoEditor&&t.intoEditor(...n))},[f(d("input",{class:"ac-document__title",type:"text",maxlength:"255",ref:"title","onUpdate:modelValue":e[0]||(e[0]=n=>t.document.title=n),placeholder:"\u8BF7\u8F93\u5165\u6587\u6863\u6807\u9898"},null,512),[[Y,t.document.title]]),t.document.content?(g(),z(C,{key:0,ref:"editor",document:t.document.content,options:t.editorOptions,onOnChange:t.onDocumentChange},null,8,["document","options","onOnChange"])):Q("",!0),d("div",et,[d("div",ot,[W(D,{loading:t.isLoading,type:"primary",onClick:t.onSaveBtnClick},{default:G(()=>[it]),_:1},8,["loading","onClick"])])])])),[[F,t.isDocumentLoading]])}var ct=v(tt,[["render",at]]);export{ct as default};
