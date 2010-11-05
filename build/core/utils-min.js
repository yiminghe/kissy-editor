KISSY.Editor.add("utils",function(o){var p=null,h=KISSY,t=h.Node,k=h.DOM,l=h.UA,s=h.Event,d={debugUrl:function(a){var b=h.Config.debug;a=b?b==="dev"?"../src/"+a:a:a.replace(/\.(js|css)/i,"-min.$1");a+=a.indexOf("?")!=-1?"&":"?";a+="t="+encodeURIComponent("2010-11-05 14:02:14");return a},lazyRun:function(a,b,c){var e=a[b],g=a[c];a[b]=function(){e.apply(this,arguments);a[b]=a[c];return g.apply(this,arguments)}},getXY:function(a,b,c,e){c=c.defaultView||c.parentWindow;a-=k.scrollLeft(c);b-=k.scrollTop(c);
if(e)if(c!=(e.defaultView||e.parentWindow)&&c.frameElement){e=k._4e_getOffset(c.frameElement,e);a+=e.left;b+=e.top}return{left:a,top:b}},tryThese:function(){for(var a,b=0,c=arguments.length;b<c;b++){var e=arguments[b];try{a=e();break}catch(g){}}return a},arrayCompare:function(a,b){if(!a&&!b)return true;if(!a||!b||a.length!=b.length)return false;for(var c=0;c<a.length;c++)if(a[c]!==b[c])return false;return true},getByAddress:function(a,b,c){a=a.documentElement;for(var e=0;a&&e<b.length;e++){var g=
b[e];if(c)for(var i=-1,f=0;f<a.childNodes.length;f++){var j=a.childNodes[f];if(!(c===true&&j.nodeType==3&&j.previousSibling&&j.previousSibling.nodeType==3)){i++;if(i==g){a=j;break}}}else a=a.childNodes[g]}return a?new t(a):p},clearAllMarkers:function(a){for(var b in a)a[b]._4e_clearMarkers(a,true)},htmlEncodeAttr:function(a){return a.replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/,"&gt;")},ltrim:function(a){return a.replace(/^\s+/,"")},rtrim:function(a){return a.replace(/\s+$/,"")},trim:function(a){return this.ltrim(this.rtrim(a))},
mix:function(){for(var a={},b=0;b<arguments.length;b++)a=h.mix(a,arguments[b]);return a},isCustomDomain:function(){if(!l.ie)return false;var a=document.domain,b=window.location.hostname;return a!=b&&a!="["+b+"]"},duplicateStr:function(a,b){return Array(b+1).join(a)},throttle:function(a,b,c){c=c||150;if(c===-1)return function(){a.apply(b,arguments)};var e=(new Date).getTime();return function(){var g=(new Date).getTime();if(g-e>c){e=g;a.apply(b,arguments)}}},buffer:function(a,b,c){c=c||0;var e=p;return function(){e&&
clearTimeout(e);var g=arguments;e=setTimeout(function(){return a.apply(b,g)},c)}},isNumber:function(a){return/^\d+(.\d+)?$/.test(h.trim(a))},verifyInputs:function(a){for(var b=0;b<a.length;b++){var c=k._4e_wrap(a[b]),e=h.trim(c.val()),g=c.attr("data-verify");c=c.attr("data-warning");if(g&&!RegExp(g).test(e)){alert(c);return false}}return true},sourceDisable:function(a,b){a.on("sourcemode",b.disable,b);a.on("wysiwygmode",b.enable,b)},resetInput:function(a){var b=a.attr("placeholder");if(b&&!l.webkit){a.val(b);
a.addClass("ke-input-tip")}else l.webkit&&a.val("")},valInput:function(a,b){a.val(b);a.removeClass("ke-input-tip")},placeholder:function(a,b){a.attr("placeholder",b);if(!l.webkit){a.on("blur",function(){if(!h.trim(a.val())){a.val(b);a.addClass("ke-input-tip")}});a.on("focus",function(){h.trim(a.val())==b&&a.val("");a.removeClass("ke-input-tip")})}},clean:function(a){a=a[0]||a;for(var b=h.makeArray(a.childNodes),c=0;c<b.length;c++){var e=b[c];e.nodeType==o.NODE.NODE_TEXT&&!h.trim(e.nodeValue)&&a.removeChild(e)}},
htmlEncode:function(a){return!a?a:String(a).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")},htmlDecode:function(a){return!a?a:String(a).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&")},equalsIgnoreCase:function(a,b){return a.toLowerCase()==b.toLowerCase()},normParams:function(a){a=h.clone(a);for(var b in a)if(a.hasOwnProperty(b)){var c=a[b];if(h.isFunction(c))a[b]=c()}return a},doFormUpload:function(a,b,c){function e(){var q=
{responseText:"",responseXML:p};q.argument=a?a.argument:p;try{var m;if((m=l.ie?i.contentWindow.document:i.contentDocument||window.frames[g].document)&&m.body)q.responseText=m.body.innerHTML;q.responseXML=m&&m.XMLDocument?m.XMLDocument:m}catch(u){}s.remove(i,"load",e);a.callback&&a.callback(q);setTimeout(function(){k._4e_remove(i)},100)}var g=h.guid("form-upload-"),i=document.createElement("iframe");i.id=g;i.name=g;i.className="ke-hidden";if(l.ie)i.src="javascript:FALSE";document.body.appendChild(i);
if(l.ie)document.frames[g].name=g;var f=k._4e_unwrap(a.form),j={target:f.target,method:f.method,encoding:f.encoding,enctype:f.enctype,action:f.action};f.target=g;f.method="POST";f.enctype=f.encoding="multipart/form-data";if(c)f.action=c;var n;if(b){n=[];b=o.Utils.normParams(b);for(var r in b)if(b.hasOwnProperty(r)){c=document.createElement("input");c.type="hidden";c.name=r;c.value=b[r];f.appendChild(c);n.push(c)}}s.on(i,"load",e);f.submit();f.target=j.target;f.method=j.method;f.enctype=j.enctype;
f.encoding=j.encoding;f.action=j.action;if(n){b=0;for(f=n.length;b<f;b++)k._4e_remove(n[b])}return i},extern:function(a,b){for(var c in b)a[c]=b[c]},map:function(a,b){for(var c=0;c<a.length;c++)a[c]=b(a[c]);return a}};o.Utils=d;o.Utils=d;d.extern(d,{debugUrl:d.debugUrl,lazyRun:d.lazyRun,getXY:d.getXY,tryThese:d.tryThese,arrayCompare:d.arrayCompare,getByAddress:d.getByAddress,clearAllMarkers:d.clearAllMarkers,htmlEncodeAttr:d.htmlEncodeAttr,ltrim:d.ltrim,rtrim:d.rtrim,trim:d.trim,mix:d.mix,isCustomDomain:d.isCustomDomain,
duplicateStr:d.duplicateStr,buffer:d.buffer,isNumber:d.isNumber,verifyInputs:d.verifyInputs,sourceDisable:d.sourceDisable,resetInput:d.resetInput,placeholder:d.placeholder,clean:d.clean,htmlEncode:d.htmlEncode,htmlDecode:d.htmlDecode,equalsIgnoreCase:d.equalsIgnoreCase,normParams:d.normParams,throttle:d.throttle,doFormUpload:d.doFormUpload,map:d.map})});
