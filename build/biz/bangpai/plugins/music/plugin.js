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
        BTIP = "�?�?",
        BLOADING = "载入�?",
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
            //4 �?flash 的优先级 5 高！
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
                " <input type='submit' " +
                "style='vertical-align:middle;' value='" + BTIP + "' />" +
                "</p>" +
                "<p style='margin:5px 0'><label>�?齐： " +
                "<select class='ke-xiami-align'>" +
                "<option value=''>�?/option>" +
                "<option value='left'>左对�?/option>" +
                "<option value='right'>右对�?/option>" +
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

                    function loadRecordsByPage(page) {
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
                        if (re && re.length) {
                            html = "<ul>";
                            for (i = 0; i < re.length; i++) {
                                var r = re[i];
                                html += "<li " +
                                    "title='" + decodeURIComponent(r.song_name) + "'>" +
                                    "<span class='ke-xiami-song'>"
                                    + limit(decodeURIComponent(r.song_name), 25) +
                                    "</span>" +
                                    "" +
                                    "" +
                                    //album_id_song_id
                                    "<a href='#' " +
                                    "title='" + decodeURIComponent(r.song_name) + "' " +
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
                            html = "<p style='text-align:center;margin:10px 0;'>不好意�?，没有找到结果！</p>";
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
                    self._xiamia_list.html("");
                },

                _getDInfo:function() {
                    var self = this;
                    S.mix(self._dinfo.attrs, {
                        width:165,
                        height:37
                    });
                    return self._dinfo;
                }
            });
            function getXiamiPaging(page, i, s) {
                return "<a class='ke-xiami-page-item" +
                    ((page == i) ? " ke-xiami-curpage" : "") +
                    "' data-value='" + i + "' href='#'>" + (s || i) + "</a>";
            }

            function checkXiami(lastElement) {
                return lastElement._4e_ascendant(function(node) {
                    return node._4e_name() === 'img' && (!!node.hasClass(CLS_XIAMI));
                }, true);
            }

            var contextMenu = {
                "虾米属�?":function(editor) {
                    var selection = editor.getSelection(),
                        startElement = selection && selection.getStartElement(),
                        flash = checkXiami(startElement),
                        flashUI = editor._toolbars[TYPE_XIAMI];
                    if (flash) {
                        flashUI.show(null, flash);
                    }
                }
            };

            Flash.registerBubble(TYPE_XIAMI, "虾米音乐�?", checkXiami);

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
});