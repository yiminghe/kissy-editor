KISSY.Editor.add("bangpai-music",function(s){var k=KISSY,w=k.UA,x=k.Event,l=k.Editor,t=k.DOM,y=k.Node,z=l.Config.base+"theme/loading.gif",r=l.Flash,n="ke_xiami",p=s.htmlDataProcessor,u=p&&p.dataFilter,v="输入歌曲名、专辑名、艺人名";u&&u.addRules({elements:{object:function(g){var i=g.attributes,m=g.attributes.title,j;if(!(i.classid&&String(i.classid).toLowerCase())){for(i=0;i<g.children.length;i++){j=g.children[i];if(j.name=="embed"){if(!r.isFlashEmbed(j))break;if(/xiami\.com/i.test(j.attributes.src))return p.createFakeParserElement(g,
n,"bangpai-music",true,{title:m})}}return null}for(i=0;i<g.children.length;i++){j=g.children[i];if(j.name=="param"&&j.attributes.name=="movie")if(/xiami\.com/i.test(j.attributes.value))return p.createFakeParserElement(g,n,"bangpai-music",true,{title:m})}},embed:function(g){if(!r.isFlashEmbed(g))return null;if(/xiami\.com/i.test(g.attributes.src))return p.createFakeParserElement(g,n,"bangpai-music",true,{title:g.attributes.title})}}},4);l.BangPaiMusic||function(){function g(b){g.superclass.constructor.apply(this,
arguments);b.cfg.disableObjectResizing||x.on(b.document.body,w.ie?"resizestart":"resize",function(a){t.hasClass(a.target,n)&&a.preventDefault()})}function i(b){return A.replace(/\${([^}]+)}/g,function(a,d){return b[d]})}function m(b,a,d){return"<a class='ke-xiami-page-item ke-button"+(b==a?" ke-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(d||a)+"</a>"}function j(b){return b._4e_name()==="img"&&!!b.hasClass(n)&&b}t.addStyleSheet(".ke-xiami-list {margin:10px 0 10px 0;padding:10px 20px 0 20px;border-top:1px solid #CED5E0;display:none;}.ke-xiami-list li{border:1px solid #CED5E0;border-width:0 0 1px 0;overflow:hidden;zoom:1;color:#646464;height:24px;line-height:24px;padding:0 20px 0 10px;}.ke-xiami-list .ke-xiami-add {float:right;}.ke-xiami-list .ke-xiami-song {float:left;width:300px;white-space:nowrap;overflow:hidden;}.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; padding:1px 7px;margin:0 3px;}.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {color:red;text-decoration:none;}.ke-xiami-paging {text-align:center;margin:20px -10px 0 -10px;}.ke-xiami-page-more {padding:0 10px;}",
"BangPaiMusic");window.bangpai_xiami=function(b){var a=bangpai_xiami.instance;b.page=bangpai_xiami.page;a._listSearch(b)};var A="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";k.extend(g,r,{_config:function(){this._cls=n;this._type="bangpai-music";this._title="虾米音乐";this._bodyHtml="<div style='padding:20px 0;'><form action='#' class='ke-xiami-form' style='margin:0 20px;'><p class='ke-xiami-title'></p><p class='ke-xiami-url-wrap'><input class='ke-xiami-url ke-input' style='width:374px;vertical-align:middle;'/> &nbsp;  <button class='ke-xiami-submit'>搜 索</button></p><p style='margin:10px 0'><label>对 齐： <select class='ke-xiami-align'><option value=''>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></label><label style='margin-left:70px;'>间距：  <input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ke-xiami-margin ke-input' style='width:60px;vertical-align:middle;' value='5'/> 像素</label></p></form><div class='ke-xiami-list'></div></div>";
this._footHtml="<a class='ke-xiami-ok ke-button' style='margin-right:20px;'>确&nbsp;定</a><a class='ke-xiami-cancel ke-button'>取&nbsp;消</a>";this._contentCls="ke-toolbar-music";this._tip="插入虾米音乐";this._contextMenu=B;this._flashRules=["img."+n]},_updateTip:function(b,a){var d=this.editor.restoreRealElement(a);if(d){b.html(a.attr("title"));b.attr("href",this._getFlashUrl(d))}},_initD:function(){function b(h){var f=e.val();if(f.replace(/[^\x00-\xff]/g,"@@").length>30)alert("长度上限30个字符（1个汉字=2个字符）");else if(!k.trim(f)||
f==v)alert("不能为空！");else{a._xiami_submit.disable();f={key:encodeURIComponent(e.val()),page:h,random:(new Date).valueOf()};f=i(f);bangpai_xiami.instance=a;bangpai_xiami.page=h;a._xiamia_list.html("<img style='display:block;width:32px;height:32px;margin:5px auto 0 auto;'src='"+z+"'/><p style='width: 130px; margin: 15px auto 0; color: rgb(150, 150, 150);'>正在搜索，请稍候......</p>");a._xiamia_list.show();var o=k.getScript(f,{timeout:10,success:function(){},error:function(){o.src="";a._xiami_submit.enable();
a._xiamia_list.html("<p style='text-align:center;margin:10px 0;'>不好意思，超时了，请重试！</p>")}})}}var a=this,d=a.editor,c=a.d;c.el.one(".ke-xiami-form");var e=c.el.one(".ke-xiami-url");a.dAlign=l.Select.decorate(c.el.one(".ke-xiami-align"));a._xiami_input=e;l.Utils.placeholder(e,v);a._xiamia_list=c.el.one(".ke-xiami-list");a._xiami_submit=new l.TripleButton({el:c.el.one(".ke-xiami-submit"),cls:"ke-button",text:"搜&nbsp;索"});a._xiami_submit.on("offClick",function(){b(1)});e.on("keydown",function(h){h.keyCode===
13&&b(1)});a.dMargin=c.el.one(".ke-xiami-margin");a._xiami_url_wrap=c.el.one(".ke-xiami-url-wrap");a._xiamia_title=c.el.one(".ke-xiami-title");var q=c.foot.one(".ke-xiami-ok");c.foot.one(".ke-xiami-cancel").on("click",function(){c.hide()});q.on("click",function(){var h=a.selectedFlash,f=d.restoreRealElement(h);a._dinfo={url:a._getFlashUrl(f),attrs:{title:h.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()},a);a._xiamia_list.on("click",function(h){h.preventDefault();
var f=new y(h.target);h=f._4e_ascendant(function(o){return a._xiamia_list._4e_contains(o)&&o.hasClass("ke-xiami-add")},true);f=f._4e_ascendant(function(o){return a._xiamia_list._4e_contains(o)&&o.hasClass("ke-xiami-page-item")},true);if(h){a._dinfo={url:"http://www.xiami.com/widget/"+h.attr("data-value")+"/singlePlayer.swf",attrs:{title:h.attr("title"),align:a.dAlign.val(),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;"}};a._gen()}else f&&b(parseInt(f.attr("data-value")))})},_listSearch:function(b){var a,
d=b.results,c="";if(b.key==k.trim(this._xiami_input.val())){this._xiami_submit.enable();if(d&&d.length){c="<ul>";for(a=0;a<d.length;a++){var e=d[a],q=decodeURIComponent(e.song_name)+" - "+decodeURIComponent(e.artist_name);c=c;var h="<li title='"+q+"'><span class='ke-xiami-song'>",f=q;if(f.length>35)f=f.substring(0,35)+"...";c=c+(h+f+"</span><a href='#' title='"+q+"' class='ke-xiami-add' data-value='"+(e.album_id+"_"+e.song_id)+"'>添加</a></li>")}c+="</ul>";d=b.page;b=Math.floor(b.total/8);a=d-1;e=d+
1;if(b>1){c+="<p class='ke-xiami-paging'>";if(a<=2){e=Math.min(2-a+e,b-1);a=2}e=Math.min(e,b-1);if(e==b-1)a=Math.max(2,e-3);if(d!=1)c+=m(d,d-1,"上一页");c+=m(d,1,"1");if(a!=2)c+="<span class='ke-xiami-page-more'>...</span>";for(a=a;a<=e;a++)c+=m(d,a);if(e!=b){if(e!=b-1)c+="<span class='ke-xiami-page-more'>...</span>";c+=m(d,b,b)}if(d!=b)c+=m(d,d+1,"下一页");c+="</p>"}}else c="<p style='text-align:center;margin:10px 0;'>不好意思，没有找到结果！</p>";this._xiamia_list.html(c)}},_updateD:function(){var b=this.selectedFlash;
if(b){this._xiami_input.val(b.attr("title"));this._xiamia_title.html(b.attr("title"));this.dAlign.val(b.attr("align"));this.dMargin.val(parseInt(b._4e_style("margin"))||0);this._xiami_url_wrap.hide();this.d.foot.show();this._xiamia_title.show()}else{l.Utils.resetInput(this._xiami_input);this.dAlign.val("");this.dMargin.val("5");this._xiami_url_wrap.show();this.d.foot.hide();this._xiamia_title.hide();this._xiami_submit.enable()}this._xiamia_list.hide();this._xiamia_list.html("")},_getDInfo:function(){k.mix(this._dinfo.attrs,
{width:257,height:33});return this._dinfo}});var B={"虾米属性":function(b){var a=b.getSelection();a=a&&a.getStartElement();a=j(a);b=b._toolbars["bangpai-music"];a&&b.show(null,a)}};r.registerBubble("bangpai-music","虾米音乐： ",j);l.BangPaiMusic=g}();s.addPlugin(function(){new l.BangPaiMusic(s)})},{attach:false,requires:["flashsupport"]});
