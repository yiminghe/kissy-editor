KISSY.Editor.add("draft",function(l){var h=KISSY,g=h.Editor;g.Draft||function(){function i(a,b,c){for(a+="";a.length<b;)a=c+a;return a}function m(a){if(h.isNumber(a))a=new Date(a);return a instanceof Date?[a.getFullYear(),"-",i(a.getMonth()+1,2,"0"),"-",i(a.getDate(),2,"0")," ",i(a.getHours(),2,"0"),":",i(a.getMinutes(),2,"0"),":",i(a.getSeconds(),2,"0")].join(""):a}function n(a){this.editor=a;this._init()}var j=h.Node,s=h.Event,o=KISSY.UA,p=h.JSON,q=window[g.STORE];h.augment(n,{_init:function(){var a=
this,b=a.editor,c=b.statusDiv,d=b.cfg.pluginConfig;d.draft=d.draft||{};a.draftInterval=d.draft.interval=d.draft.interval||5;a.draftLimit=d.draft.limit=d.draft.limit||5;c=(new j("<div class='ke-draft'><spa class='ke-draft-title'>内容正文每"+d.draft.interval+"分钟自动保存一次。</span></div>")).appendTo(c);a.timeTip=(new j("<span class='ke-draft-time''>")).appendTo(c);var f=(new j("<a class='ke-button ke-draft-save-btn' style='vertical-align:middle;padding:1px 9px;'><span class='ke-draft-mansave'></span><span>立即保存</span></a>")).appendTo(c),
e=new g.Select({container:c,menuContainer:document.body,doc:b.document,width:"85px",popUpWidth:"225px",align:["r","t"],title:"恢复编辑历史"}),k=q.getItem("ke-draft-save"),r=[];a.versions=e;if(k)r=h.isString(k)?p.parse(decodeURIComponent(k)):k;a.drafts=r;a.sync();f.on("click",function(){a.save(false)});setInterval(function(){a.save(true)},a.draftInterval*60*1E3);e.on("click",a.recover,a);a.holder=c;g.Utils.sourceDisable(b,a);if(d.draft.helpHtml){b=new g.TripleButton({cls:"ke-draft-help",title:"帮助",text:"帮助",
container:c});b.on("click",function(){a._prepareHelp()});g.Utils.lazyRun(a,"_prepareHelp","_realHelp");a.helpBtn=b.el}a._holder=c},_prepareHelp:function(){var a=this,b=a.editor,c=a.helpBtn,d=(new j(b.cfg.pluginConfig.draft.helpHtml||"")).appendTo(document.body),f=new j("<div style='height:0;position:absolute;width:0;border:8px #CED5E0 solid;border-color:#CED5E0 "+(o.ie<7?"tomato tomato tomato;filter: chroma(color = tomato)":"transparent transparent transparent")+";'><div style='height:0;position:absolute;width:0;left:-8px;top:-10px;border:8px white solid;border-color:white "+
(o.ie<7?"tomato tomato tomato;filter: chroma(color = tomato)":"transparent transparent transparent")+";'></div></div>");d.append(f);d.css({border:"1px solid #ACB4BE","text-align":"left"});a._help=new g.SimpleOverlay({el:d,focusMgr:false,draggable:false,width:d.width()+"px",mask:false});a._help.el.css("border","none");a._help.arrow=f;s.on([document,b.document],"click",function(e){e=e.target;e==c[0]||c._4e_contains(e)||a._help.hide()})},_realHelp:function(){var a=this._help,b=this.helpBtn,c=a.arrow;
a.show();b=b.offset();a.el.offset({left:b.left-a.el.width()+17,top:b.top-a.el.height()-7});c.offset({left:b.left-2,top:b.top-8})},disable:function(){this.holder.css("visibility","hidden")},enable:function(){this.holder.css("visibility","")},sync:function(){var a=this.draftLimit,b=this.timeTip,c=this.versions,d=this.drafts;d.length>a&&d.splice(0,d.length-a);a=[];for(var f,e=0;e<d.length;e++){f=d[e];f=(f.auto?"自动":"手动")+"保存于 : "+m(f.date);a.push({name:f,value:e})}c.set("items",a.reverse());b.html(f);
q.setItem("ke-draft-save",encodeURIComponent(p.stringify(d)))},save:function(a){var b=this.drafts,c=l._getRawData();if(b[b.length-1]&&c==b[b.length-1].content)b.length-=1;this.drafts=b.concat({content:c,date:(new Date).getTime(),auto:a});this.sync()},recover:function(a){var b=this.editor,c=this.drafts;a=a.newVal;this.versions.reset("value");if(confirm("确认恢复 "+m(c[a].date)+" 的编辑历史？")){b.fire("save");b._setRawData(c[a].content);b.fire("save")}}});g.Draft=n}();l.addPlugin(function(){g.storeReady(function(){new g.Draft(l)})})});
