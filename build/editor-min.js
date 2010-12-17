/*
 Constructor for kissy editor,dependency moved to independent module
 thanks to CKSource's intelligent work on CKEditor
 @author: yiminghe@gmail.com, lifesinger@gmail.com
 @version: 2.1.5
 @buildtime: 2010-12-17 17:33:46
*/
KISSY.add("editor",function(b){function d(e,c){var a=this;if(!(a instanceof d))return new d(e,c);if(b.isString(e))e=b.one(e);e=m._4e_wrap(e);c=c||{};c.pluginConfig=c.pluginConfig||{};a.cfg=c;c.pluginConfig=c.pluginConfig;a.cfg=c;b.app(a,b.EventTarget);var j=["htmldataprocessor","enterkey","clipboard"],h=n;a.use=function(f,k){f=f.split(",");if(!h)for(var i=0;i<j.length;i++){var l=j[i];b.inArray(l,f)||f.unshift(l)}a.ready(function(){b.use.call(a,f.join(","),function(){for(var g=0;g<f.length;g++)a.usePlugin(f[g]);
k&&k.call(a);if(!h){a.setData(e.val());if(c.focus)a.focus();else(g=a.getSelection())&&g.removeAllRanges();h=o}},{global:d})});return a};a.use=a.use;a.Config.base=d.Config.base;a.Config.componentJsName="plugin.js?t=2010-12-17 17:33:46";a.init(e);return a}var m=b.DOM,o=true,n=false;b.app(d,b.EventTarget);d.Config.base=b.Config.base+"editor/plugins/";d.Config.componentJsName="plugin.js?t=2010-12-17 17:33:46";b.Editor=d;b.Editor=d});
