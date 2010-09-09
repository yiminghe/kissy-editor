KISSY.Editor.add("bangpai-music",function(r){function s(d){return/xiami\.com/i.test(d)}var k=KISSY,m=k.Editor,v=k.DOM,w=k.Node,x=m.Config.base+"assets/loading.gif",p=m.Flash,l="ke_xiami",n=r.htmlDataProcessor,t=n&&n.dataFilter;t&&t.addRules({elements:{object:function(d){var g=d.attributes,q=d.attributes.title,h;if(!(g.classid&&String(g.classid).toLowerCase())){for(g=0;g<d.children.length;g++){h=d.children[g];if(h.name=="embed"){if(!p.isFlashEmbed(h))return null;if(s(h.attributes.src))return n.createFakeParserElement(d,
l,"bangpai-music",true,{title:q})}}return null}for(g=0;g<d.children.length;g++){h=d.children[g];if(h.name=="param"&&h.attributes.name=="movie")if(s(h.attributes.value))return n.createFakeParserElement(d,l,"bangpai-music",true,{title:q})}},embed:function(d){if(!p.isFlashEmbed(d))return null;if(s(d.attributes.src))return n.createFakeParserElement(d,l,"bangpai-music",true,{title:d.attributes.title})}}},4);m.BangPaiMusic||function(){function d(b,a){if(b.length>a)b=b.substring(0,a)+"...";return b}function g(){g.superclass.constructor.apply(this,
arguments)}function q(b){return y.replace(/\${([^}]+)}/g,function(a,c){return b[c]})}function h(b,a,c){return"<a class='ke-xiami-page-item"+(b==a?" ke-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(c||a)+"</a>"}function z(b){return decodeURIComponent(b.song_name)+" - "+decodeURIComponent(b.artist_name)}function u(b){return b._4e_ascendant(function(a){return a._4e_name()==="img"&&!!a.hasClass(l)},true)}v.addStyleSheet(".ke-xiami-list {margin-top:10px;}.ke-xiami-list li{border:1px dotted gray;border-width:0 0 1px 0;overflow:hidden;zoom:1;padding:2px;}\n.ke-xiami-list .ke-xiami-add {float:right;}\n.ke-xiami-list .ke-xiami-song {float:left;}\n.ke-xiami-paging a{display: inline-block; zoom: 1;  *display: inline; border:1px solid gray;padding:0 5px;margin:0 2px;}\n.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {background-color:orange;}\n.ke-xiami-paging {text-align:center;margin-top:10px;}\n",
"BangPaiMusic");window.bangpai_xiami=function(b){var a=bangpai_xiami.instance;b.page=bangpai_xiami.page;a._listSearch(b)};var y="http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?random=${random}&callback=bangpai_xiami";k.extend(g,p,{_config:function(){this._cls=l;this._type="bangpai-music";this._title="\u641c\u7d22\u97f3\u4e50";this._bodyHtml="<form action='#' class='ke-xiami-form'><p><input class='ke-xiami-url' style='width:300px' value='\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d'/> &nbsp;  <input type='submit' style='vertical-align:middle;' value='\u641c \u7d22 ' /></p><p style='margin:5px 0'><label>\u5bf9 \u9f50\uff1a <select class='ke-xiami-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></p></form><div class='ke-xiami-list'></div>";
this._footHtml="";this._contentCls="ke-toolbar-music";this._tip="\u63d2\u5165\u867e\u7c73\u97f3\u4e50";this._contextMenu=A;this._flashRules=["img."+l];this._config_dwidth="400px"},_updateTip:function(b,a){var c=this.editor.restoreRealElement(a);b.html(a.attr("title"));b.attr("href",this._getFlashUrl(c))},_initD:function(){function b(f){var j={key:encodeURIComponent(e.val()),page:f,random:(new Date).valueOf()};j=q(j);bangpai_xiami.instance=a;bangpai_xiami.page=f;a._xiamia_list.html("<img style='display:block;width:108px;margin:5px auto 0 auto;'src='"+
x+"'/>");k.getScript(j)}var a=this,c=a.d,i=c.el.one(".ke-xiami-form"),e=c.el.one(".ke-xiami-url");a.dAlign=c.el.one(".ke-xiami-align");a._xiami_input=e;a._xiamia_list=c.el.one(".ke-xiami-list");i.on("submit",function(f){b(1);f.halt()},a);a._xiamia_list.on("click",function(f){f.preventDefault();var j=new w(f.target);f=j._4e_ascendant(function(o){return a._xiamia_list._4e_contains(o)&&o.hasClass("ke-xiami-add")},true);j=j._4e_ascendant(function(o){return a._xiamia_list._4e_contains(o)&&o.hasClass("ke-xiami-page-item")},
true);if(f){a._dinfo={url:"http://www.xiami.com/widget/"+f.attr("data-value")+"/singlePlayer.swf",attrs:{title:f.attr("title"),align:a.dAlign.val()}};a._gen()}else j&&b(parseInt(j.attr("data-value")))})},_listSearch:function(b){var a,c=b.results,i;if(b.key==this._xiami_input.val()){if(c&&c.length){i="<ul>";for(a=0;a<c.length;a++){var e=c[a],f=z(e);i+="<li title='"+f+"'><span class='ke-xiami-song'>"+d(f,35)+"</span><a href='#' title='"+f+"' class='ke-xiami-add' data-value='"+(e.album_id+"_"+e.song_id)+
"'>\u9009\u62e9</a></li>"}i+="</ul>";c=b.page;b=Math.floor(b.total/8);a=c-3;e=c+3;if(b>1){if(a<=2){e=Math.min(2-a+e,b-1);a=2}e=Math.min(e,b-1);if(e==b-1)a=Math.max(2,e-6);i+="<p class='ke-xiami-paging'>"+h(c,1,"1"+(a!=2?"...":""));for(a=a;a<=e;a++)i+=h(c,a);if(e!=b)i+=h(c,b,(e!=b-1?"...":"")+b);i+="</p>"}}else i="<p style='text-align:center;margin:10px 0;'>\u4e0d\u597d\u610f\u601d\uff0c\u6ca1\u6709\u627e\u5230\u7ed3\u679c\uff01</p>";this._xiamia_list.html(i)}},_updateD:function(){var b=this.selectedFlash;
if(b){this._xiami_input.val(b.attr("title"));this.dAlign.val(b.attr("align"))}else{this._xiami_input.val("\u8f93\u5165\u60f3\u8981\u6dfb\u52a0\u7684\u6b4c\u66f2\u540d\u3001\u4e13\u8f91\u540d\u3001\u827a\u4eba\u540d");this.dAlign.val("")}this._xiamia_list.html("")},_getDInfo:function(){k.mix(this._dinfo.attrs,{width:165,height:37});return this._dinfo}});var A={"\u867e\u7c73\u5c5e\u6027":function(b){var a=b.getSelection();a=a&&a.getStartElement();a=u(a);b=b._toolbars["bangpai-music"];a&&b.show(null,
a)}};p.registerBubble("bangpai-music","\u867e\u7c73\u97f3\u4e50\uff1a ",u);m.BangPaiMusic=g}();r.addPlugin(function(){new m.BangPaiMusic(r)})},{attach:false,requires:["flashsupport"]});
/**
 * biz plugin , xiami music intergration for bangpai
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("bangpai-music", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        DOM = S.DOM,
        Node = S.Node,
        loading = KE.Config.base + "assets/loading.gif",
        Flash = KE.Flash,
        CLS_XIAMI = "ke_xiami",
        TYPE_XIAMI = "bangpai-music",
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
        BTIP = "搜 索 ",
        BLOADING = "载入中 ",
        TIP = "输入想要添加的歌曲名、专辑名、艺人名";

    function checkXiami(url) {
        return /xiami\.com/i.test(url);
    }

    dataFilter && dataFilter.addRules({
        elements : {
            'object' : function(element) {
                var attributes = element.attributes,
                    //增加音乐名字提示
                    title = element.attributes.title,
                    i,
                    c,
                    classId = attributes['classid']
                        && String(attributes['classid']).toLowerCase();
                if (!classId) {
                    // Look for the inner <embed>
                    for (i = 0; i < element.children.length; i++) {
                        c = element.children[ i ];
                        if (c.name == 'embed') {
                            if (!Flash.isFlashEmbed(c))
                                return null;
                            if (checkXiami(c.attributes.src)) {
                                return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {
                                    title:title
                                });
                            }
                        }
                    }
                    return null;
                }
                for (i = 0; i < element.children.length; i++) {
                    var c = element.children[ i ];
                    if (c.name == 'param' && c.attributes.name == "movie") {
                        if (checkXiami(c.attributes.value)) {
                            return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {
                                title:title
                            });
                        }
                    }
                }
            },

            'embed' : function(element) {
                if (!Flash.isFlashEmbed(element))
                    return null;
                if (checkXiami(element.attributes.src)) {
                    return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true, {
                        title:element.attributes.title
                    });
                }
            }
            //4 比 flash 的优先级 5 高！
        }}, 4);

    if (!KE.BangPaiMusic) {
        (function() {

            var css = '' +
                '.ke-xiami-list {' +
                'margin-top:10px;' +
                '}' +
                '' +
                '' +
                '.ke-xiami-list li{' +
                'border:1px dotted gray;' +
                'border-width:0 0 1px 0;' +
                'overflow:hidden;' +
                'zoom:1;' +
                'padding:2px;' +
                '}\n' +
                '' +
                '' +
                '.ke-xiami-list .ke-xiami-add {' +
                'float:right;' +
                '}\n' +
                '' +
                '' +
                '' +
                '.ke-xiami-list .ke-xiami-song {' +
                'float:left;' +
                '}\n' +
                '' +
                '' +
                '.ke-xiami-paging a{' +
                'display: inline-block;'
                + ' zoom: 1; '
                + ' *display: inline; ' +
                'border:1px solid gray;' +
                'padding:0 5px;' +
                'margin:0 2px;' +
                '}\n' +
                '' +
                '' +
                '.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {' +
                'background-color:orange;' +
                '}\n' +
                '' +
                '' +
                '.ke-xiami-paging {' +
                'text-align:center;' +
                'margin-top:10px;' +
                '}\n';
            DOM.addStyleSheet(css, "BangPaiMusic");
            window.bangpai_xiami = function(data) {
                var self = bangpai_xiami.instance;
                data.page = bangpai_xiami.page;
                self._listSearch(data);
            };

            function limit(str, l) {
                if (str.length > l)
                    str = str.substring(0, l) + "...";
                return str;
            }

            var bodyHtml = "" +
                "<form action='#' class='ke-xiami-form'><p>" +
                "<input class='ke-xiami-url' style='width:300px' value='"
                + TIP
                + "'/> &nbsp; " +
                " <input class='ke-xiami-submit' type='submit' " +
                "style='vertical-align:middle;' value='" + BTIP + "' />" +
                "</p>" +
                "<p style='margin:5px 0'><label>对 齐： " +
                "<select class='ke-xiami-align'>" +
                "<option value=''>无</option>" +
                "<option value='left'>左对齐</option>" +
                "<option value='right'>右对齐</option>" +
                "</select>" +
                "</p>" +
                "</form>" +
                "<div class='ke-xiami-list'>" +
                "</div>" +
                "",
                footHtml = "";


            function BangPaiMusic(editor) {
                BangPaiMusic.superclass.constructor.apply(this, arguments);
            }

            var xiami_url = "http://www.xiami.com/app/nineteen/search/key/${key}/page/${page}?" +
                "random=${random}&callback=bangpai_xiami";

            function getXiamiUrl(params) {
                return xiami_url.replace(/\${([^}]+)}/g, function(m, m1) {
                    return params[m1]
                });
            }

            S.extend(BangPaiMusic, Flash, {
                _config:function() {
                    var self = this;
                    self._cls = CLS_XIAMI;
                    self._type = TYPE_XIAMI;
                    self._title = "搜索音乐";
                    self._bodyHtml = bodyHtml;
                    self._footHtml = footHtml;
                    self._contentCls = "ke-toolbar-music";
                    self._tip = "插入虾米音乐";
                    self._contextMenu = contextMenu;
                    self._flashRules = ["img." + CLS_XIAMI];
                    self._config_dwidth = "400px";
                },
                _updateTip:function(tipurl, selectedFlash) {
                    var self = this,
                        editor = self.editor,
                        r = editor.restoreRealElement(selectedFlash);
                    tipurl.html(selectedFlash.attr("title"));
                    tipurl.attr("href", self._getFlashUrl(r));
                },
                _initD:function() {
                    var self = this,
                        editor = self.editor,
                        d = self.d,
                        action = d.el.one(".ke-xiami-form"),
                        input = d.el.one(".ke-xiami-url");
                    self.dAlign = d.el.one(".ke-xiami-align")
                    self._xiami_input = input;
                    self._xiamia_list = d.el.one(".ke-xiami-list");
                    self._xiami_submit = d.el.one(".ke-xiami-submit");
                    function loadRecordsByPage(page) {
                        self._xiami_submit[0].disabled = true;
                        var params = {
                            key:encodeURIComponent(input.val()),
                            page:page,
                            random:(new Date().valueOf())
                        };
                        var req = getXiamiUrl(params);
                        bangpai_xiami.instance = self;
                        bangpai_xiami.page = page;
                        self._xiamia_list.html("<img style='" +
                            "display:block;" +
                            "width:108px;" +
                            "margin:5px auto 0 auto;" +
                            "'src='" + loading + "'/>");
                        S.getScript(req);
                    }

                    action.on("submit", function(ev) {
                        loadRecordsByPage(1);
                        ev.halt();
                    }, self);


                    self._xiamia_list.on("click", function(ev) {
                        ev.preventDefault();
                        var t = new Node(ev.target),
                            add = t._4e_ascendant(function(node) {
                                return self._xiamia_list._4e_contains(node) && node.hasClass("ke-xiami-add");
                            }, true),
                            paging = t._4e_ascendant(function(node) {
                                return self._xiamia_list._4e_contains(node) && node.hasClass("ke-xiami-page-item");
                            }, true);
                        if (add) {
                            self._dinfo = {
                                url:("http://www.xiami.com/widget/" +
                                    add.attr("data-value")
                                    + "/singlePlayer.swf"),
                                attrs:{
                                    title:add.attr("title"),
                                    align:self.dAlign.val()
                                }
                            };
                            self._gen();
                        } else if (paging) {
                            loadRecordsByPage(parseInt(paging.attr("data-value")));
                        }
                    });
                },
                _listSearch:function(data) {
                    var self = this,i,
                        re = data.results,html;
                    if (data.key == self._xiami_input.val()) {
                        self._xiami_submit[0].disabled = false;
                        if (re && re.length) {
                            html = "<ul>";
                            for (i = 0; i < re.length; i++) {
                                var r = re[i],d = getDisplayName(r);
                                html += "<li " +
                                    "title='" + d + "'>" +
                                    "<span class='ke-xiami-song'>"
                                    + limit(d, 35) +
                                    "</span>" +
                                    "" +
                                    "" +
                                    //album_id_song_id
                                    "<a href='#' " +
                                    "title='" + d + "' " +
                                    "class='ke-xiami-add' data-value='" +
                                    (
                                        r.album_id
                                            + "_"
                                            + r.song_id
                                        )
                                    + "'>选择</a>" +
                                    "</li>"
                            }
                            html += "</ul>";

                            var page = data.page,
                                totalpage = Math.floor(data.total / 8),
                                start = page - 3,end = page + 3;
                            if (totalpage > 1) {
                                if (start <= 2) {
                                    end = Math.min(2 - start + end, totalpage - 1);
                                    start = 2;
                                }
                                end = Math.min(end, totalpage - 1);
                                if (end == totalpage - 1) {
                                    start = Math.max(2, end - 6);
                                }

                                html += "<p class='ke-xiami-paging'>" +
                                    getXiamiPaging(page, 1, "1" + (start != 2 ? "..." : ""));
                                for (i = start; i <= end; i++) {
                                    html += getXiamiPaging(page, i);
                                }
                                if (end != totalpage) {
                                    html += getXiamiPaging(page, totalpage, (end != totalpage - 1 ? "..." : "") + totalpage);
                                }
                                html += "</p>";
                            }

                        } else {
                            html = "<p style='text-align:center;margin:10px 0;'>不好意思，没有找到结果！</p>";
                        }
                        self._xiamia_list.html(html);
                    }
                },
                _updateD : function() {
                    var self = this,
                        f = self.selectedFlash;
                    if (f) {
                        self._xiami_input.val(f.attr("title"));
                        self.dAlign.val(f.attr("align"));
                    } else {
                        self._xiami_input.val(TIP);
                        self.dAlign.val("");
                    }
                    self._xiami_submit[0].disabled = false;
                    self._xiamia_list.html("");
                },

                _getDInfo:function() {
                    var self = this;
                    S.mix(self._dinfo.attrs, {
                        width:257,
                        height:33
                    });
                    return self._dinfo;
                }
            });
            function getXiamiPaging(page, i, s) {
                return "<a class='ke-xiami-page-item" +
                    ((page == i) ? " ke-xiami-curpage" : "") +
                    "' data-value='" + i + "' href='#'>" + (s || i) + "</a>";
            }

            function getDisplayName(r) {
                return decodeURIComponent(r.song_name) + " - " + decodeURIComponent(r.artist_name);
            }

            function checkXiami(lastElement) {
                return lastElement._4e_ascendant(function(node) {
                    return node._4e_name() === 'img' && (!!node.hasClass(CLS_XIAMI));
                }, true);
            }

            var contextMenu = {
                "虾米属性":function(editor) {
                    var selection = editor.getSelection(),
                        startElement = selection && selection.getStartElement(),
                        flash = checkXiami(startElement),
                        flashUI = editor._toolbars[TYPE_XIAMI];
                    if (flash) {
                        flashUI.show(null, flash);
                    }
                }
            };

            Flash.registerBubble(TYPE_XIAMI, "虾米音乐： ", checkXiami);

            KE.BangPaiMusic = BangPaiMusic;
        })();
    }
    editor.addPlugin(function() {
        new KE.BangPaiMusic(editor);
    });
},
{
    attach:false,
    requires : ["flashsupport"]
});KISSY.Editor.add("bangpai-video",function(k){function i(a){for(var d=0;d<l.length;d++){var e=l[d];if(e.reg.test(a))return e}}var m=KISSY,g=m.Editor,f="ke_video",o=g.Utils.getFlashUrl,j=g.Flash,h=k.htmlDataProcessor,n=h&&h.dataFilter;n&&n.addRules({elements:{object:function(a){var d=a.attributes;if(!(d.classid&&String(d.classid).toLowerCase())){for(d=0;d<a.children.length;d++)if(a.children[d].name=="embed"){if(!j.isFlashEmbed(a.children[d]))return null;if(i(a.children[d].attributes.src))return h.createFakeParserElement(a,
f,"bangpai-video",true)}return null}for(d=0;d<a.children.length;d++){var e=a.children[d];if(e.name=="param"&&e.attributes.name=="movie")if(i(e.attributes.value))return h.createFakeParserElement(a,f,"bangpai-video",true)}},embed:function(a){if(!j.isFlashEmbed(a))return null;if(i(a.attributes.src))return h.createFakeParserElement(a,f,"bangpai-video",true)}}},4);var l=[{reg:/youku\.com/i,width:480,height:400,detect:function(a){if(/\.swf$/.test(a))return a}},{reg:/tudou\.com/i,width:480,height:400,detect:function(a){if(/\.swf$/.test(a))return a}},
{reg:/ku6\.com/i,width:480,height:400,detect:function(a){if(/\.swf$/.test(a))return a}}];g.BangPaiVideo||function(){function a(){a.superclass.constructor.apply(this,arguments)}function d(b){return b._4e_ascendant(function(c){return c._4e_name()==="img"&&!!c.hasClass(f)},true)}var e=["img."+f];m.extend(a,j,{_config:function(){this._cls=f;this._type="bangpai-video";this._title="\u89c6\u9891\u5c5e\u6027";this._bodyHtml="<p style='margin-bottom:5px'>\u9700\u8981\u5206\u4eab\u7684\u89c6\u9891\u94fe\u63a5\uff1a\u652f\u6301 \u571f\u8c46\uff0c\u4f18\u9177\uff0cku6 \u89c6\u9891\u5206\u4eab</p><p><label><span style='color:#0066CC;font-weight:bold;'>\u89c6\u9891\u94fe\u63a5\uff1a </span><input class='ke-video-url' style='width:230px' value='\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf'/></label></p><p style='margin:5px 0'><label>\u5bf9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u9f50\uff1a <select class='ke-video-align'><option value=''>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select><p>";
this._footHtml="<button class='ke-video-ok'>\u786e\u5b9a</button> <button class='ke-video-cancel'>\u53d6\u6d88</button>";this._contentCls="ke-toolbar-flash";this._tip="\u63d2\u5165\u89c6\u9891";this._contextMenu=p;this._flashRules=e},_initD:function(){var b=this,c=b.d;b.dUrl=c.el.one(".ke-video-url");b.dAlign=c.el.one(".ke-video-align");var q=c.el.one(".ke-video-ok");c=c.el.one(".ke-video-cancel");q.on("click",b._gen,b);c.on("click",function(){b.d.hide()})},_getDInfo:function(){var b=this.dUrl.val(),
c=i(b);if(c){(b=c.detect(b))||alert("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf");return{url:b,attrs:{height:c.height,width:c.width,align:this.dAlign.val()}}}else alert("\u4e0d\u652f\u6301\u8be5\u94fe\u63a5\u6765\u6e90!")},_getFlashUrl:function(b){return o(b)},_updateD:function(){var b=this.editor,c=this.selectedFlash;if(c){b=b.restoreRealElement(c);this.dUrl.val(this._getFlashUrl(b));this.dAlign.val(b.attr("align"))}else{this.dUrl.val("\u8bf7\u8f93\u5165\u5982 http://www.xxx.com/xxx.swf");
this.dAlign.val("")}}});j.registerBubble("bangpai-video","\u89c6\u9891\u94fe\u63a5\uff1a ",d);g.BangPaiVideo=a;var p={"\u89c6\u9891\u5c5e\u6027":function(b){var c=b.getSelection();c=(c=c&&c.getStartElement())&&d(c);b=b._toolbars["bangpai-video"];c&&b.show(null,c)}}}();k.addPlugin(function(){new g.BangPaiVideo(k)})},{attach:false,requires:["flashsupport"]});
/**
 * biz plugin , video about ku6,youku,tudou for bangpai
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("bangpai-video", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        CLS_VIDEO = "ke_video",
        getFlashUrl = KE.Utils.getFlashUrl,
        TYPE_VIDEO = "bangpai-video",
        Flash = KE.Flash,
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
        TIP = "请输入如 http://www.xxx.com/xxx.swf";

    dataFilter && dataFilter.addRules({
        elements : {
            'object' : function(element) {

                var attributes = element.attributes,i,
                    classId = attributes['classid'] && String(attributes['classid']).toLowerCase();
                if (!classId) {
                    // Look for the inner <embed>
                    for (i = 0; i < element.children.length; i++) {
                        if (element.children[ i ].name == 'embed') {
                            if (!Flash.isFlashEmbed(element.children[ i ]))
                                return null;
                            if (getProvider(element.children[ i ].attributes.src)) {
                                return dataProcessor.createFakeParserElement(element, CLS_VIDEO, TYPE_VIDEO, true);
                            }
                        }
                    }
                    return null;
                }
                for (i = 0; i < element.children.length; i++) {
                    var c = element.children[ i ];
                    if (c.name == 'param' && c.attributes.name == "movie") {
                        if (getProvider(c.attributes.value)) {
                            return dataProcessor.createFakeParserElement(element, CLS_VIDEO, TYPE_VIDEO, true);
                        }
                    }
                }

            },

            'embed' : function(element) {
                if (!Flash.isFlashEmbed(element))
                    return null;
                if (getProvider(element.attributes.src)) {
                    return dataProcessor.createFakeParserElement(element, CLS_VIDEO, TYPE_VIDEO, true);
                }

            }
            //4 比 flash 的优先级 5 高！
        }}, 4);

    function getProvider(url) {
        for (var i = 0; i < provider.length; i++) {
            var p = provider[i];
            if (p.reg.test(url)) {
                return p;
            }
        }
        return undefined;
    }

    var provider = [
        {
            reg:/youku\.com/i,
            width:480,
            height:400,
            detect:function(url) {
                /*
                 var m = url.match(/id_([^.]+)\.html$/);
                 if (m) {
                 return "http://player.youku.com/player.php/sid/" + m[1] + "/v.swf";
                 }*/
                if (/\.swf$/.test(url))
                    return url;
            }
        },
        {
            reg:/tudou\.com/i,
            width:480,
            height:400,
            detect:function(url) {
                /*
                 var m = url.match(/\/view\/([^/]+)\/$/);
                 if (m) {
                 return "http://www.tudou.com/v/" + m[1] + "/v.swf";
                 }*/
                if (/\.swf$/.test(url))
                    return url;
            }
        },
        {
            reg:/ku6\.com/i,
            width:480,
            height:400,
            detect:function(url) {
                /*
                 var m = url.match(/show\/([^.]+)\.html$/);
                 if (m) {
                 return "http://player.ku6.com/refer/" + m[1] + "/v.swf";
                 }*/
                if (/\.swf$/.test(url))
                    return url;
            }
        }
    ];

    if (!KE.BangPaiVideo) {
        (function() {
            var bodyHtml = "" +
                "<p style='margin-bottom:5px'>" +
                "需要分享的视频链接：支持 土豆，优酷，ku6 视频分享" +
                "</p>" +
                "<p>" +
                "<label><span style='color:#0066CC;font-weight:bold;'>视频链接： " +
                "</span><input class='ke-video-url' style='width:230px' value='"
                + TIP
                + "'/></label>" +
                "</p>" +
                "<p style='margin:5px 0'><label>对&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;齐： " +
                "<select class='ke-video-align'>" +
                "<option value=''>无</option>" +
                "<option value='left'>左对齐</option>" +
                "<option value='right'>右对齐</option>" +
                "</select>" +
                "<p>",
                footHtml = "<button class='ke-video-ok'>确定</button> " +
                    "<button class='ke-video-cancel'>取消</button>",
                flashRules = ["img." + CLS_VIDEO];


            function BangPaiVideo(editor) {
                BangPaiVideo.superclass.constructor.apply(this, arguments);
            }

            S.extend(BangPaiVideo, Flash, {
                _config:function() {
                    var self = this;
                    self._cls = CLS_VIDEO;
                    self._type = TYPE_VIDEO;
                    self._title = "视频属性";
                    self._bodyHtml = bodyHtml;
                    self._footHtml = footHtml;
                    self._contentCls = "ke-toolbar-flash";
                    self._tip = "插入视频";
                    self._contextMenu = contextMenu;
                    self._flashRules = flashRules;
                },
                _initD:function() {
                    var self = this,
                        editor = self.editor,
                        d = self.d;
                    self.dUrl = d.el.one(".ke-video-url");
                    self.dAlign = d.el.one(".ke-video-align");
                    var action = d.el.one(".ke-video-ok"),
                        cancel = d.el.one(".ke-video-cancel");
                    action.on("click", self._gen, self);
                    cancel.on("click", function() {
                        self.d.hide();
                    });
                },

                _getDInfo:function() {
                    var self = this,
                        url = self.dUrl.val(),p = getProvider(url);
                    if (!p) {
                        alert("不支持该链接来源!");
                    } else {
                        var re = p.detect(url);
                        if (!re) {
                            alert(TIP);
                        }
                        return {
                            url:re,
                            attrs:{
                                height:p.height,
                                width:p.width,
                                align: self.dAlign.val()
                            }
                        };
                    }
                },
                _getFlashUrl:function(r) {
                    return getFlashUrl(r);
                },
                _updateD:function() {
                    var self = this,
                        editor = self.editor,
                        f = self.selectedFlash;
                    if (f) {
                        var r = editor.restoreRealElement(f);
                        self.dUrl.val(self._getFlashUrl(r));
                        self.dAlign.val(r.attr("align"));
                    } else {
                        self.dUrl.val(TIP);
                        self.dAlign.val("");
                    }
                }
            });
            function checkVideo(lastElement) {
                return lastElement._4e_ascendant(function(node) {
                    return node._4e_name() === 'img' && (!!node.hasClass(CLS_VIDEO));
                }, true);
            }

            Flash.registerBubble("bangpai-video", "视频链接： ", checkVideo);
            KE.BangPaiVideo = BangPaiVideo;
            var contextMenu = {
                "视频属性":function(editor) {
                    var selection = editor.getSelection(),
                        startElement = selection && selection.getStartElement(),
                        flash = startElement && checkVideo(startElement),
                        flashUI = editor._toolbars[TYPE_VIDEO];
                    if (flash) {
                        flashUI.show(null, flash);
                    }
                }
            };
        })();
    }
    editor.addPlugin(function() {
        new KE.BangPaiVideo(editor);
    });
}, {
    attach:false,
    requires:["flashsupport"]
});