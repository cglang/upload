import{s as c}from"./index-80bae6ae.js";var h={},j={get exports(){return h},set exports(d){h=d}};(function(d,L){(function(v,i){i()})(c,function(){function v(e,t){return typeof t>"u"?t={autoBom:!1}:typeof t!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function i(e,t,r){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){u(n.response,t,r)},n.onerror=function(){console.error("could not download file")},n.send()}function w(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(r){}return 200<=t.status&&299>=t.status}function l(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(r){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var a=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof c=="object"&&c.global===c?c:void 0,m=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),u=a.saveAs||(typeof window!="object"||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!m?function(e,t,r){var n=a.URL||a.webkitURL,o=document.createElement("a");t=t||e.name||"download",o.download=t,o.rel="noopener",typeof e=="string"?(o.href=e,o.origin===location.origin?l(o):w(o.href)?i(e,t,r):l(o,o.target="_blank")):(o.href=n.createObjectURL(e),setTimeout(function(){n.revokeObjectURL(o.href)},4e4),setTimeout(function(){l(o)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,r){if(t=t||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(v(e,r),t);else if(w(e))i(e,t,r);else{var n=document.createElement("a");n.href=e,n.target="_blank",setTimeout(function(){l(n)})}}:function(e,t,r,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),typeof e=="string")return i(e,t,r);var o=e.type==="application/octet-stream",b=/constructor/i.test(a.HTMLElement)||a.safari,y=/CriOS\/[\d]+/.test(navigator.userAgent);if((y||o&&b||m)&&typeof FileReader<"u"){var f=new FileReader;f.onloadend=function(){var s=f.result;s=y?s:s.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=s:location=s,n=null},f.readAsDataURL(e)}else{var E=a.URL||a.webkitURL,p=E.createObjectURL(e);n?n.location=p:location.href=p,n=null,setTimeout(function(){E.revokeObjectURL(p)},4e4)}});a.saveAs=u.saveAs=u,d.exports=u})})(j);
