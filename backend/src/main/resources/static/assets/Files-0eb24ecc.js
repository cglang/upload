import{_ as $,a as u,l as f,c as a,b as o,F as C,r as M,d as h,w as y,v as S,e as B,f as v,o as d,n as D,t as p,g as F,h as x,p as U,i as z}from"./index-80bae6ae.js";import"./FileSaver.min-0f7e6647.js";let k;const P=u.CancelToken,I={data(){return{currentDirectory:"/",directories:[],files:[],filter:"",multiSelect:!1,checkedFiles:[],cutFiles:[],columns:["size","lastModified"],sort:{key:"name",direction:"asc"}}},methods:{sortBy(t){t!==this.sort.key?(this.sort.key=t,this.sort.direction="asc"):this.sort.direction==="asc"?this.sort.direction="desc":this.sort.direction="asc"},list(){this.$root.loading=!0,this.files=[],this.checkedFiles=[],k!==void 0&&k(),u.post("file/list",f.stringify({currentDirectory:this.currentDirectory}),{cancelToken:new P(function(e){k=e})}).then(t=>{if(t.success)this.files=t.detail,this.doSort(this.sort);else{if(t.msg==="没有权限"&&!this.$root.hasToken(()=>this.list()))return;this.$root.showModal("失败",t.msg)}}).catch(t=>{this.$root.showModal("错误",t.message)}).finally(()=>{this.$root.loading=!1})},search(){if(this.filter.trim().length===0){this.list();return}this.$root.loading=!0,this.files=[],this.checkedFiles=[],k!==void 0&&k(),u.post("file/search",f.stringify({filter:this.filter,currentDirectory:this.currentDirectory}),{cancelToken:new P(function(e){k=e})}).then(t=>{t.success?(this.files=t.detail,this.doSort(this.sort)):this.$root.showModal("失败",t.msg)}).catch(t=>{t.name!=="CanceledError"&&this.$root.showModal("错误",t.message)}).finally(()=>{this.$root.loading=!1})},changeDirectory(t){this.currentDirectory=t,this.list(),this.getDirectoryHierachy()},getDirectoryHierachy(){this.directories=[];const t=this.currentDirectory.split("/"),e=[];for(let n=0;n<t.length;n++){e.push(t[n]);const c=e.join("/");this.directories.push({displayName:t[n],relativePath:c.length===0?"/":c})}this.directories[0].displayName="Home"},getParentDirectory(t){let e=t.split("/");e.pop();let n=e.join("/");return n.length===0?"/":n},upload(t){if(!this.$root.hasToken(()=>this.upload(t)))return;this.$root.message.title="上传进度";const e=new Modal(this.$root.$refs.progressModal);e.show();const n=new FormData;n.append("currentDirectory",this.currentDirectory),Array.from(t.target.files).forEach(s=>{console.log(s),n.append("files",s)});var i=new Date().getTime(),l=0;u({method:"post",url:"file/upload",data:n,headers:{"Content-Type":"multipart/form-data"},onUploadProgress:s=>{const r=s.loaded,g=s.total;this.$root.progress=Math.round(r/g*100)+"%";var _=new Date().getTime(),b=r-l,w=(_-i)/1e3,T=w?b/w:0;l=r,i=_,this.$root.speed=this.$root.formatBytes(T)+"/s"}}).then(s=>{s.success?(e.hide(),this.list(),this.$root.showModal("成功","上传成功"),this.$root.progress=0):(e.hide(),this.$root.showModal("失败",s.msg),this.$root.progress=0)}).catch(s=>{e.hide(),this.$root.showModal("错误",s.message),this.$root.progress=0})},createDirectory(){const t=this.$root.$refs.input.value;if(t.trim().length===0){this.$root.showModal("提示","文件夹名不能为空");return}this.$root.hasToken(()=>this.createDirectory())&&(this.$root.loading=!0,u.post("file/mkdir",f.stringify({relativePath:this.currentDirectory+"/"+t})).then(e=>{e.success?(this.list(),this.$root.showModal("成功","新建文件夹成功")):this.$root.showModal("失败",e.msg)}).catch(e=>{this.$root.showModal("错误",e.message)}).finally(()=>{this.$root.loading=!1}))},removeOuterQuotes(t){return t.startsWith('"')&&t.endsWith('"')?t.slice(1,-1):t},download(t,e){this.$root.message.title="正在下载";const n=new Modal(this.$root.$refs.progressModal);n.show();var c=new Date().getTime(),i=0;u({method:"post",url:u.defaults.baseURL+e,data:f.stringify({relativePath:t}),responseType:"blob",onDownloadProgress:l=>{const s=l.loaded,r=l.total;this.$root.progress=Math.round(s*100/r)+"%";var g=new Date().getTime(),_=s-i,b=(g-c)/1e3,w=b?_/b:0;i=s,c=g,this.$root.speed=this.$root.formatBytes(w)+"/s"}}).then(l=>{let s=l.headers["content-disposition"].split("filename=")[1];s=decodeURIComponent(s),saveAs(l.data,this.removeOuterQuotes(s))}).catch(l=>{n.hide(),this.$root.showModal("错误",l.message)}).finally(()=>{this.$root.progress=0,n.hide()})},downloadFile(t){this.download(t,"file/download")},downloadFolder(t){this.download(t,"file/downloadFolder")},bulkDownload(){this.download(JSON.stringify(this.checkedFiles),"file/bulk")},deleteFile(t){this.$root.hasToken(()=>this.deleteFile(t))&&(this.$root.loading=!0,u.post("file/delete",f.stringify({relativePath:JSON.stringify(t)})).then(e=>{e.success?(this.filter.length===0?this.list():this.search(this.filter),this.$root.showModal("成功","删除成功")):this.$root.showModal("失败",e.msg)}).catch(e=>{this.$root.showModal("错误",e.message)}).finally(()=>{this.$root.loading=!1}))},zipFolder(t){this.$root.loading=!0,u.post("file/zip",f.stringify({relativePath:t})).then(e=>{e.success?(this.$root.showModal("成功","压缩成功"),this.list()):this.$root.showModal("成功","压缩失败")}).catch(e=>{this.$root.showModal("错误",e.message)}).finally(()=>{this.$root.loading=!1})},bulkZip(){this.$root.loading=!0,u.post("file/bulkZip",f.stringify({relativePath:JSON.stringify(this.checkedFiles)})).then(t=>{t.success?(this.$root.showModal("成功","压缩成功"),this.list()):this.$root.showModal("成功","压缩失败")}).catch(t=>{this.$root.showModal("错误",t.message)}).finally(()=>{this.$root.loading=!1})},rename(t){const e=this.$root.$refs.input.value;if(e.trim().length===0){this.$root.showModal("提示","新文件名不能为空");return}this.$root.hasToken(()=>this.rename(t))&&(this.$root.loading=!0,u.post("file/rename",f.stringify({src:t,dst:this.currentDirectory+"/"+e})).then(n=>{n.success?(this.$root.showModal("成功",n.msg),this.list()):this.$root.showModal("失败",n.msg)}).catch(n=>{this.$root.showModal("错误",n.message)}).finally(()=>{this.$root.loading=!1}))},cut(t){this.cutFiles=t,this.$root.showModal("剪切成功",this.cutFiles.join(`
`))},paste(){this.cutFiles.length!==0&&this.$root.hasToken(()=>this.paste())&&(this.$root.loading=!0,u.post("file/move",f.stringify({src:JSON.stringify(this.cutFiles),dst:this.currentDirectory})).then(t=>{t.success?(this.$root.showModal("成功",t.msg),this.cutFiles=[],this.list()):(this.$root.showModal("失败",t.msg),this.cutFiles=[])}).catch(t=>{this.$root.showModal("错误",t.message),this.cutFiles=[]}).finally(()=>{this.$root.loading=!1}))},preview(t,e){t.includes("text")?(this.$root.loading=!0,this.$root.message.title=e,this.$root.message.text="",u.post("file/read",f.stringify({relativePath:e})).then(n=>{n.success?(this.$root.message.text=n.detail,new Modal(this.$root.$refs.textModal).show()):this.$root.showModal("失败",n.msg)}).catch(n=>{this.$root.showModal("错误",n.message)}).finally(()=>{this.$root.loading=!1})):t.includes("image")&&(this.$root.src="",this.$root.src=u.defaults.baseURL+"file/previewImage?relativePath="+encodeURIComponent(e),new Modal(this.$root.$refs.imageModal).show())},share(t){this.$root.loading=!0,u.post("shareCode/add",f.stringify({path:t})).then(e=>{e.success?this.$root.showModal("分享成功",location.protocol+"//"+location.host+"/files/"+e.detail):this.$root.showModal("失败",e.msg)}).catch(e=>{this.$root.showModal("错误",e.message)}).finally(()=>{this.$root.loading=!1})},directoryStats(t){this.$root.loading=!0,u.post("file/folderInfo",f.stringify({relativePath:t})).then(e=>{e.success?this.$root.showModal("详细信息",e.msg):this.$root.showModal("失败",e.msg)}).catch(e=>{this.$root.showModal("错误",e.message)}).finally(()=>{this.$root.loading=!1})},checkAll(t){t.target.checked?(this.files.folders.forEach(e=>{this.checkedFiles.push(e.relativePath)}),this.files.files.forEach(e=>{this.checkedFiles.push(e.relativePath)})):this.checkedFiles=[]},hideColumn(t){this.columns.includes(t)?this.columns=this.columns.filter(e=>e!==t):this.columns.push(t)},getIcon(t,e){const n=t.split(".").pop(),c={"bi-file-earmark-binary":["exe"],"bi-file-earmark-zip":["zip","7z","rar"],"bi-file-earmark-code":["py","java","c","cpp","html","js","css"],"bi-file-earmark-pdf":["pdf"],"bi-file-earmark-word":["doc","docx"],"bi-file-earmark-excel":["xls","xlsx"],"bi-file-earmark-ppt":["ppt","pptx"]};for(const[s,r]of Object.entries(c))if(r.includes(n))return s;let l={text:"bi-file-earmark-text",image:"bi-file-earmark-image",audio:"bi-file-earmark-music",video:"bi-file-earmark-play"}[e.split("/")[0]];return l!=null?l:" bi-file-earmark"},doSort(t){t.key==="time"&&(t.direction==="desc"?(this.files.folders.sort((e,n)=>{const c=new Date(e.lastModified),i=new Date(n.lastModified),l=e.name.toUpperCase(),s=n.name.toUpperCase();return c<i?1:c>i||l<s?-1:l>s?1:0}),this.files.files.sort((e,n)=>{const c=new Date(e.lastModified),i=new Date(n.lastModified),l=e.name.toUpperCase(),s=n.name.toUpperCase();return c<i?1:c>i||l<s?-1:l>s?1:0})):(this.files.folders.sort((e,n)=>{const c=new Date(e.lastModified),i=new Date(n.lastModified),l=e.name.toUpperCase(),s=n.name.toUpperCase();return c<i?-1:c>i?1:l<s?-1:l>s?1:0}),this.files.files.sort((e,n)=>{const c=new Date(e.lastModified),i=new Date(n.lastModified),l=e.name.toUpperCase(),s=n.name.toUpperCase();return c<i?-1:c>i?1:l<s?-1:l>s?1:0}))),t.key=="name"&&(t.direction==="desc"?(this.files.files.sort((e,n)=>{const c=e.name.toUpperCase(),i=n.name.toUpperCase();return c<i?1:c>i?-1:0}),this.files.folders.sort((e,n)=>{const c=e.name.toUpperCase(),i=n.name.toUpperCase();return c<i?1:c>i?-1:0})):(this.files.files.sort((e,n)=>{const c=e.name.toUpperCase(),i=n.name.toUpperCase();return c<i?-1:c>i?1:0}),this.files.folders.sort((e,n)=>{const c=e.name.toUpperCase(),i=n.name.toUpperCase();return c<i?-1:c>i?1:0})))}},mounted(){this.list(),this.getDirectoryHierachy()},watch:{sort:{handler(t,e){this.doSort(t)},deep:!0,flush:"post"}}},m=t=>(U("data-v-a56dc13a"),t=t(),z(),t),A={class:"card border-bottom-0"},N={class:"card-header"},O={class:"breadcrumb float-start",style:{margin:"0.5rem 0"}},V={key:0},j=["onClick"],E={class:"card-body"},H={id:"form",action:"upload",method:"post",enctype:"multipart/form-data"},J={class:"files-left"},R=m(()=>o("button",{class:"btn btn-outline-primary",onclick:"document.getElementById('file').value=null; document.getElementById('file').click()"}," 上传文件 ",-1)),q=m(()=>o("button",{class:"btn btn-outline-primary ms-1 me-1",onclick:"document.getElementById('folder').value=null; document.getElementById('folder').click()"}," 上传文件夹 ",-1)),L={class:"btn-group"},W=["disabled"],Z=["disabled"],K=["disabled"],Q=["disabled"],G=["disabled"],X={class:"files-right"},Y={class:"w-100 d-flex"},ee={class:"dropdown",style:{"padding-left":"5px"}},te=m(()=>o("button",{class:"btn btn-outline-primary dropdown-toggle","data-bs-toggle":"dropdown","data-bs-auto-close":"outside"},[o("i",{class:"bi bi-grid-3x3-gap-fill"})],-1)),se={class:"dropdown-menu"},ie={class:"dropdown-item"},oe={class:"form-check"},le=["checked"],ne=m(()=>o("label",{class:"form-check-label",for:"size"},"大小",-1)),re={class:"dropdown-item"},ce={class:"form-check"},ae=["checked"],de=m(()=>o("label",{class:"form-check-label",for:"contentType"},"类型",-1)),he={class:"dropdown-item"},ue={class:"form-check"},me=["checked"],fe=m(()=>o("label",{class:"form-check-label",for:"lastModified"},"修改日期",-1)),pe={class:"mb-0 table table-hover"},ke={style:{"user-select":"none"}},ye=["checked","indeterminate","disabled"],ge={class:"sort-by-filename"},_e={key:0,class:"bi bi-sort-alpha-up text-muted"},be={key:1,class:"bi bi-sort-alpha-down-alt text-muted"},we={key:1,class:"size"},ve={key:2,class:"contentType"},Ce={class:"sort-by-time"},Me={key:0,class:"bi bi-sort-numeric-up text-muted"},De={key:1,class:"bi bi-sort-numeric-down-alt text-muted"},Fe=m(()=>o("th",{class:"action"},"操作",-1)),xe={key:0},Pe=m(()=>o("a",{class:"link-primary"},"..",-1)),Te=[Pe],$e=["value"],Se=["onClick"],Be=m(()=>o("i",{class:"bi bi-folder2"},null,-1)),Ue={class:"link-primary"},ze={key:0,class:"size"},Ie={key:1,class:"contentType"},Ae={key:2,class:"lastModified"},Ne={class:"action"},Oe=["onClick"],Ve=m(()=>o("i",{class:"bi bi-cloud-download"},null,-1)),je=[Ve],Ee=["onClick"],He=m(()=>o("i",{class:"bi bi-trash"},null,-1)),Je=[He],Re={class:"dropdown d-inline"},qe=m(()=>o("a",{class:"link-primary ms-1","data-bs-toggle":"dropdown","aria-expanded":"false"},[o("i",{class:"bi bi-three-dots"})],-1)),Le={class:"dropdown-menu"},We=["onClick"],Ze=["onClick"],Ke=["onClick"],Qe=["onClick"],Ge=["value"],Xe={class:"filename text-truncate"},Ye={key:0,class:"size"},et={key:1,class:"contentType"},tt={key:2,class:"lastModified"},st={class:"action"},it=["onClick"],ot=m(()=>o("i",{class:"bi bi-cloud-download"},null,-1)),lt=[ot],nt=["onClick"],rt=m(()=>o("i",{class:"bi bi-trash"},null,-1)),ct=[rt],at={class:"dropdown d-inline"},dt=m(()=>o("a",{class:"link-primary ms-1","data-bs-toggle":"dropdown","aria-expanded":"false"},[o("i",{class:"bi bi-three-dots"})],-1)),ht={class:"dropdown-menu"},ut=["onClick"],mt=["onClick"],ft=["onClick"],pt=["onClick"],kt=["onClick"];function yt(t,e,n,c,i,l){return d(),a("div",A,[o("div",N,[o("ol",O,[(d(!0),a(C,null,M(i.directories,s=>(d(),a("li",{class:D(["filename text-truncate",["breadcrumb-item",{active:s.relativePath==i.currentDirectory}]]),key:s},[s.relativePath==i.currentDirectory?(d(),a("a",V,p(s.displayName),1)):(d(),a("a",{key:1,class:"link-primary",onClick:r=>l.changeDirectory(s.relativePath)},p(s.displayName),9,j))],2))),128))])]),o("div",E,[o("form",H,[o("input",{type:"file",name:"file",id:"file",class:"d-none",onChange:e[0]||(e[0]=s=>l.upload(s)),multiple:""},null,32),o("input",{type:"file",name:"folder",id:"folder",class:"d-none",onChange:e[1]||(e[1]=s=>l.upload(s)),multiple:"",webkitdirectory:""},null,32)]),o("div",J,[R,q,o("button",{class:"btn btn-outline-primary me-1",onClick:e[2]||(e[2]=s=>{t.$root.inputValue="",t.$root.showInput("新建文件夹","输入文件夹名",l.createDirectory)})}," 新建文件夹 "),o("button",{class:"btn btn-outline-primary me-1",onClick:e[3]||(e[3]=s=>l.list())}," 刷新 "),i.cutFiles.length!==0&&l.getParentDirectory(i.cutFiles[0])!==i.currentDirectory&&!i.currentDirectory.startsWith(i.cutFiles[0])?(d(),a("button",{key:0,class:"btn btn-outline-primary me-1",onClick:e[4]||(e[4]=s=>l.paste())}," 粘贴 ")):h("",!0),o("div",L,[o("button",{class:"btn btn-outline-primary",disabled:i.files.length===0,onClick:e[5]||(e[5]=s=>{i.multiSelect=!i.multiSelect,i.checkedFiles=[]})}," 多选 ",8,W),i.multiSelect?(d(),a("button",{key:0,disabled:i.checkedFiles.length==0,class:"btn btn-outline-primary",onClick:e[6]||(e[6]=s=>l.bulkDownload())}," 下载 ",8,Z)):h("",!0),i.multiSelect?(d(),a("button",{key:1,disabled:i.checkedFiles.length==0,class:"btn btn-outline-primary",onClick:e[7]||(e[7]=s=>{t.$root.showConfirm(function(){l.deleteFile(i.checkedFiles)})})}," 删除 ",8,K)):h("",!0),i.multiSelect?(d(),a("button",{key:2,disabled:i.checkedFiles.length==0,class:"btn btn-outline-primary",onClick:e[8]||(e[8]=s=>l.cut(i.checkedFiles))}," 剪切 ",8,Q)):h("",!0),i.multiSelect?(d(),a("button",{key:3,disabled:i.checkedFiles.length==0,class:"btn btn-outline-primary",onClick:e[9]||(e[9]=s=>l.bulkZip())}," 打包 ",8,G)):h("",!0)])]),o("div",X,[o("div",Y,[y(o("input",{class:"form-control",style:{flex:"1 1 auto",width:"1%"},placeholder:"搜索","onUpdate:modelValue":e[10]||(e[10]=s=>i.filter=s),onKeyup:e[11]||(e[11]=B(s=>l.search(),["enter"]))},null,544),[[S,i.filter]]),o("div",ee,[te,o("ul",se,[o("li",ie,[o("div",oe,[o("input",{class:"form-check-input",type:"checkbox",id:"size",checked:i.columns.includes("size"),onClick:e[12]||(e[12]=s=>l.hideColumn("size"))},null,8,le),ne])]),o("li",re,[o("div",ce,[o("input",{class:"form-check-input",type:"checkbox",id:"contentType",checked:i.columns.includes("contentType"),onClick:e[13]||(e[13]=s=>l.hideColumn("contentType"))},null,8,ae),de])]),o("li",he,[o("div",ue,[o("input",{class:"form-check-input",type:"checkbox",id:"lastModified",checked:i.columns.includes("lastModified"),onClick:e[14]||(e[14]=s=>l.hideColumn("lastModified"))},null,8,me),fe])])])])])])]),o("table",pe,[o("tbody",null,[o("tr",ke,[i.multiSelect?(d(),a("th",{key:0,class:"checkbox",onClick:e[16]||(e[16]=s=>s.target===s.currentTarget&&s.target.querySelector(".form-check-input").click())},[o("input",{type:"checkbox",class:"form-check-input",onClick:e[15]||(e[15]=s=>l.checkAll(s)),checked:Object.keys(i.files).length>0&&i.checkedFiles.length>0&&i.files.folders.length+i.files.files.length>0,indeterminate:Object.keys(i.files).length>0&&i.checkedFiles.length>0&&i.checkedFiles.length<i.files.folders.length+i.files.files.length,disabled:Object.keys(i.files).length>0&&i.files.folders.length+i.files.files.length==0},null,8,ye)])):h("",!0),o("th",{class:"filename text-truncate cursor-pointer",onClick:e[17]||(e[17]=s=>l.sortBy("name"))},[v(" 文件名 "),o("div",ge,[i.sort.key==="name"&&i.sort.direction==="asc"?(d(),a("i",_e)):h("",!0),i.sort.key==="name"&&i.sort.direction==="desc"?(d(),a("i",be)):h("",!0)])]),i.columns.includes("size")?(d(),a("th",we,"大小")):h("",!0),i.columns.includes("contentType")?(d(),a("th",ve," 类型 ")):h("",!0),i.columns.includes("lastModified")?(d(),a("th",{key:3,class:"lastModified cursor-pointer",onClick:e[18]||(e[18]=s=>l.sortBy("time"))},[v(" 修改时间 "),o("div",Ce,[i.sort.key==="time"&&i.sort.direction==="asc"?(d(),a("i",Me)):h("",!0),i.sort.key==="time"&&i.sort.direction==="desc"?(d(),a("i",De)):h("",!0)])])):h("",!0),Fe]),i.currentDirectory!="/"?(d(),a("tr",xe,[o("td",{colspan:"6",onClick:e[19]||(e[19]=s=>l.changeDirectory(l.getParentDirectory(i.currentDirectory)))},Te)])):h("",!0),(d(!0),a(C,null,M(i.files.folders,s=>(d(),a("tr",{key:s},[y(o("td",{class:"checkbox",onClick:e[21]||(e[21]=r=>r.target===r.currentTarget&&r.target.querySelector(".form-check-input").click())},[y(o("input",{type:"checkbox",class:"form-check-input",value:s.relativePath,"onUpdate:modelValue":e[20]||(e[20]=r=>i.checkedFiles=r)},null,8,$e),[[x,i.checkedFiles]])],512),[[F,i.multiSelect]]),o("td",{class:"filename text-truncate",onClick:r=>l.changeDirectory(s.relativePath)},[Be,v("  "),o("a",Ue,p(s.name),1)],8,Se),i.columns.includes("size")?(d(),a("td",ze,"-")):h("",!0),i.columns.includes("contentType")?(d(),a("td",Ie,"-")):h("",!0),i.columns.includes("lastModified")?(d(),a("td",Ae,p(s.lastModified),1)):h("",!0),o("td",Ne,[o("a",{class:"link-primary",onClick:r=>l.downloadFolder(s.relativePath)},je,8,Oe),o("a",{class:"link-danger ms-1",onClick:r=>{t.$root.showConfirm(function(){l.deleteFile([s.relativePath])})}},Je,8,Ee),o("div",Re,[qe,o("ul",Le,[o("li",null,[o("a",{class:"dropdown-item",onClick:r=>l.zipFolder(s.relativePath)},"压缩",8,We)]),o("li",null,[o("a",{class:"dropdown-item",onClick:r=>l.cut([s.relativePath])},"剪切",8,Ze)]),o("li",null,[o("a",{class:"dropdown-item",onClick:r=>{t.$root.inputValue=s.name,t.$root.showInput("重命名","输入新文件夹名",function(){l.rename(s.relativePath)})}},"重命名",8,Ke)]),o("li",null,[o("a",{class:"dropdown-item",onClick:r=>l.directoryStats(s.relativePath)},"详细信息",8,Qe)])])])])]))),128)),(d(!0),a(C,null,M(i.files.files,s=>(d(),a("tr",{key:s},[y(o("td",{class:"checkbox",onClick:e[23]||(e[23]=r=>r.target===r.currentTarget&&r.target.querySelector(".form-check-input").click())},[y(o("input",{type:"checkbox",class:"form-check-input",value:s.relativePath,"onUpdate:modelValue":e[22]||(e[22]=r=>i.checkedFiles=r)},null,8,Ge),[[x,i.checkedFiles]])],512),[[F,i.multiSelect]]),o("td",Xe,[o("i",{class:D(["bi",l.getIcon(s.name,s.fileType)])},null,2),v("  "+p(s.name),1)]),i.columns.includes("size")?(d(),a("td",Ye,p(t.$root.formatBytes(s.length)),1)):h("",!0),i.columns.includes("contentType")?(d(),a("td",et,p(s.fileType),1)):h("",!0),i.columns.includes("lastModified")?(d(),a("td",tt,p(s.lastModified),1)):h("",!0),o("td",st,[o("a",{class:"link-primary",onClick:r=>l.downloadFile(s.relativePath)},lt,8,it),o("a",{class:"link-danger ms-1",onClick:r=>{t.$root.showConfirm(function(){l.deleteFile([s.relativePath])})}},ct,8,nt),o("div",at,[dt,o("ul",ht,[o("li",null,[s.fileType.includes("image")||s.fileType.includes("text")?(d(),a("a",{key:0,class:"dropdown-item",onClick:r=>l.preview(s.fileType,s.relativePath)},"预览",8,ut)):h("",!0)]),o("li",null,[o("a",{class:"dropdown-item",onClick:r=>l.share(s.relativePath)},"分享",8,mt)]),o("li",null,[o("a",{class:"dropdown-item",onClick:r=>l.cut([s.relativePath])},"剪切",8,ft)]),o("li",null,[o("a",{class:"dropdown-item",onClick:r=>{t.$root.inputValue=s.name,t.$root.showInput("重命名","输入新文件名",function(){l.rename(s.relativePath)})}},"重命名",8,pt)]),o("li",null,[o("a",{class:"dropdown-item",onClick:r=>l.directoryStats(s.relativePath)},"详细信息",8,kt)])])])])]))),128))])])])}const bt=$(I,[["render",yt],["__scopeId","data-v-a56dc13a"]]);export{bt as default};
