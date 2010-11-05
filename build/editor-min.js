/*
 Constructor for kissy editor and module dependency definition
 @author: yiminghe@gmail.com, lifesinger@gmail.com
 @version: 2.0
 @buildtime: 2010-11-05 14:02:14
*/
KISSY.add("editor",function(c,x){function i(a,d){function y(e){for(var m=i.Env.mods,h=0;h<e.length;h++){for(var f=e[h],k=q,n=0;n<h;n++)if(f==e[n]){k=r;break}n=m[f];if(k&&n){k=c.clone(n);f=f+"_"+h;k.name=f;e[h]=f;m[f]||(m[f]=k)}}}var b=this;if(!(b instanceof i))return new i(a,d);if(c.isString(a))a=c.one(a);a=z._4e_wrap(a);d=d||{};d.pluginConfig=d.pluginConfig||{};b.cfg=d;d.pluginConfig=d.pluginConfig;b.cfg=d;c.app(b,c.EventTarget);var t=["htmldataprocessor","enterkey","clipboard"],s=q;b.use=function(e,
m){e=e.split(",");y(e);if(!s)for(var h=0;h<t.length;h++){var f=t[h];c.inArray(f,e)||e.unshift(f)}c.use.call(b,e.join(","),function(){b.ready(function(){m&&m.call(b);if(!s){b.setData(a.val());if(d.focus)b.focus();else{var k=b.getSelection();k&&k.removeAllRanges()}b.fire("save");s=r}})},{order:r,global:i});return b};b.use=b.use;b.init(a);return b}function u(a){var d=c.Config.debug;a=d?d==="dev"?"../src/"+a:a:a.replace(/\.(js|css)/i,"-min.$1");a+=a.indexOf("?")!=-1?"&":"?";a+="t="+encodeURIComponent("2010-11-05 14:02:14");
return a}var z=c.DOM,r=true,q=false;c.app(i,c.EventTarget);i.Config.base=c.Config.base+"editor/";var l=["separator","sourcearea/support","tabs","flashbridge","flashutils","clipboard",{name:"colorsupport",requires:["overlay"]},{name:"colorsupport/dialog"},{name:"forecolor",requires:["colorsupport"]},{name:"bgcolor",requires:["colorsupport"]},{name:"elementpaths"},"enterkey",{name:"pagebreak",requires:["fakeobjects"]},{name:"fakeobjects",requires:["htmldataprocessor"]},{name:"draft",requires:["localStorage"]},
{name:"flash",requires:["flash/support"]},{name:"flash/dialog"},{name:"flash/support",requires:["flashutils","contextmenu","fakeobjects","bubbleview"]},{name:"font",requires:["select"]},"format",{name:"htmldataprocessor"},{name:"image",requires:["contextmenu","bubbleview"]},{name:"image/dialog",requires:["tabs"]},"indent","justify",{name:"link",requires:["bubbleview"]},{name:"link/dialog"},"list","maximize",{name:"music",requires:["flash/support"]},{name:"music/dialog",requires:["flash/dialog"]},
"preview","removeformat",{name:"smiley"},{name:"sourcearea",requires:["sourcearea/support"]},{name:"table",requires:["contextmenu"]},{name:"table/dialog"},{name:"templates",requires:["overlay"]},"undo",{name:"resize",requires:["dd"]}],j,p,g,o,v={};j=0;for(p=l.length;j<p;j++){g=l[j];if(c.isString(g))g=l[j]={name:g+"",requires:null};o=g.requires||[];var w=["button"];g.name.indexOf("/dialog")!=-1&&w.push("overlay");g.requires=o.concat(w)}l=[{name:"localStorage",requires:["flashutils","flashbridge"]},
{name:"button"},{name:"dd"},{name:"progressbar"},{name:"overlay",requires:["dd"]},{name:"contextmenu",requires:["overlay"]},{name:"bubbleview",requires:["overlay"]},{name:"select",requires:["overlay"]}].concat(l);j=0;for(p=l.length;j<p;j++){g=l[j];o=g.name;v[o]={attach:q,charset:"utf-8",requires:g.requires,csspath:g.useCss?u("plugins/"+o+"/plugin.css"):x,path:u("plugins/"+o+"/plugin.js")}}i.add(v);c.Editor=i;c.Editor=i});
