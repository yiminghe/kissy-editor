KISSY.Editor.add("draft",function(j){var g=KISSY,e=g.Editor;e.Draft||function(){function h(a,c,b){for(a+="";a.length<c;)a=b+a;return a}function k(a){if(g.isNumber(a))a=new Date(a);return a instanceof Date?[a.getFullYear(),"-",h(a.getMonth()-1,2,"0"),"-",h(a.getDay(),2,"0")," ",h(a.getHours(),2,"0"),":",h(a.getMinutes(),2,"0"),":",h(a.getSeconds(),2,"0")].join(""):a}function l(a){this.editor=a;this._init()}var m=g.Node,n=g.JSON,o=window[e.STORE];g.augment(l,{_init:function(){var a=this,c=a.editor,
b=c.statusDiv;b=(new m("<div style='position:absolute;right:30px;bottom:0;width:600px'><span style=' vertical-align:middle;'>\u5185\u5bb9\u6b63\u6587\u6bcf5\u5206\u949f\u81ea\u52a8\u4fdd\u5b58\u4e00\u6b21\u3002</span></div>")).appendTo(b);a.timeTip=(new m("<span style=' vertical-align:middle;margin:0 10px;'>")).appendTo(b);var i=new e.Select({container:b,doc:c.document,width:"100px",popUpWidth:"220px",title:"\u6062\u590d\u7f16\u8f91\u5386\u53f2"}),f=new e.TripleButton({text:"\u7acb\u5373\u4fdd\u5b58",
title:"\u7acb\u5373\u4fdd\u5b58",container:b}),d=o.getItem("ke-draft-save"),p=[];a.versions=i;if(d)p=g.isString(d)?n.parse(decodeURIComponent(d)):d;a.drafts=p;a.sync();f.on("click",function(){a.save(false)});setInterval(function(){a.save(true)},3E5);i.on("click",a.recover,a);a.holder=b;e.Utils.sourceDisable(c,a)},disable:function(){this.holder.css("visibility","hidden")},enable:function(){this.holder.css("visibility","")},sync:function(){var a=this.timeTip,c=this.versions,b=this.drafts;b.length>5&&
b.splice(0,b.length-5);for(var i=[],f,d=0;d<b.length;d++){f=b[d];f=(f.auto?"\u81ea\u52a8":"\u624b\u52a8")+"\u4fdd\u5b58\u4e8e\uff1a"+k(f.date);i.push({name:f,value:d})}c.set("items",i.reverse());a.html(f);o.setItem("ke-draft-save",encodeURIComponent(n.stringify(b)))},save:function(a){var c=this.drafts,b=j._getRawData();if(c[c.length-1]&&b==c[c.length-1].content)c.length-=1;this.drafts=c.concat({content:b,date:(new Date).getTime(),auto:a});this.sync()},recover:function(a){var c=this.editor,b=this.drafts;
a=a.newVal;this.versions.reset("value");if(confirm("\u786e\u8ba4\u6062\u590d "+k(b[a].date)+" \u7684\u7f16\u8f91\u5386\u53f2\uff1f")){c.fire("save");c._setRawData(b[a].content);c.fire("save")}}});e.Draft=l}();j.addPlugin(function(){e.storeReady(function(){new e.Draft(j)})})});
