KISSY.Editor.add("draft",function(j){var h=KISSY,g=h.Editor;g.Draft||function(){function i(a,b,c){for(a+="";a.length<b;)a=c+a;return a}function l(a){if(h.isNumber(a))a=new Date(a);return a instanceof Date?[a.getFullYear(),"-",i(a.getMonth()+1,2,"0"),"-",i(a.getDate(),2,"0")," ",i(a.getHours(),2,"0"),":",i(a.getMinutes(),2,"0"),":",i(a.getSeconds(),2,"0")].join(""):a}function m(a){this.editor=a;this._init()}var k=h.Node,n=h.JSON,o=window[g.STORE];h.augment(m,{_init:function(){var a=this,b=a.editor,
c=b.statusDiv,d=b.cfg.pluginConfig;d.draft=d.draft||{};a.draftInterval=d.draft.interval=d.draft.interval||5;a.draftLimit=d.draft.limit=d.draft.limit||5;c=(new k("<div class='ke-draft'><spa class='ke-draft-title'>内容正文每"+d.draft.interval+"分钟自动保存一次。</span></div>")).appendTo(c);a.timeTip=(new k("<span class='ke-draft-time''>")).appendTo(c);d=(new k("<a class='ke-button ke-draft-save-btn' style='vertical-align:middle;padding:1px 9px;'><span class='ke-draft-mansave'></span><span>立即保存</span></a>")).appendTo(c);
var e=new g.Select({container:c,menuContainer:document.body,doc:b.document,width:"85px",popUpWidth:"225px",align:["r","t"],title:"恢复编辑历史"});new g.TripleButton({cls:"ke-draft-help",title:"帮助",text:"帮助",container:c});var f=o.getItem("ke-draft-save"),p=[];a.versions=e;if(f)p=h.isString(f)?n.parse(decodeURIComponent(f)):f;a.drafts=p;a.sync();d.on("click",function(){a.save(false)});setInterval(function(){a.save(true)},a.draftInterval*60*1E3);e.on("click",a.recover,a);a.holder=c;g.Utils.sourceDisable(b,
a)},disable:function(){this.holder.css("visibility","hidden")},enable:function(){this.holder.css("visibility","")},sync:function(){var a=this.draftLimit,b=this.timeTip,c=this.versions,d=this.drafts;d.length>a&&d.splice(0,d.length-a);a=[];for(var e,f=0;f<d.length;f++){e=d[f];e=(e.auto?"自动":"手动")+"保存于 : "+l(e.date);a.push({name:e,value:f})}c.set("items",a.reverse());b.html(e);o.setItem("ke-draft-save",encodeURIComponent(n.stringify(d)))},save:function(a){var b=this.drafts,c=j._getRawData();if(b[b.length-
1]&&c==b[b.length-1].content)b.length-=1;this.drafts=b.concat({content:c,date:(new Date).getTime(),auto:a});this.sync()},recover:function(a){var b=this.editor,c=this.drafts;a=a.newVal;this.versions.reset("value");if(confirm("确认恢复 "+l(c[a].date)+" 的编辑历史？")){b.fire("save");b._setRawData(c[a].content);b.fire("save")}}});g.Draft=m}();j.addPlugin(function(){g.storeReady(function(){new g.Draft(j)})})});
