KISSY.Editor.add("bangpai-music", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        DOM = S.DOM,
        Node = S.Node,
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
                    i,
                    classId = attributes['classid']
                        && String(attributes['classid']).toLowerCase();
                if (!classId) {
                    // Look for the inner <embed>
                    for (i = 0; i < element.children.length; i++) {
                        if (element.children[ i ].name == 'embed') {
                            if (!Flash.isFlashEmbed(element.children[ i ]))
                                return null;
                            if (checkXiami(element.children[ i ].attributes.src)) {
                                return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true);
                            }
                        }
                    }
                    return null;
                }
                for (i = 0; i < element.children.length; i++) {
                    var c = element.children[ i ];
                    if (c.name == 'param' && c.attributes.name == "movie") {
                        if (checkXiami(c.attributes.value)) {
                            return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true);
                        }
                    }
                }
            },

            'embed' : function(element) {
                if (!Flash.isFlashEmbed(element))
                    return null;
                if (checkXiami(element.attributes.src)) {
                    return dataProcessor.createFakeParserElement(element, CLS_XIAMI, TYPE_XIAMI, true);
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

            var bodyHtml = "<div>" +
                "<p class='ks-clear'>" +
                "<input class='ke-xiami-url' style='width:250px' value='"
                + TIP
                + "'/> &nbsp; " +
                " <button style='vertical-align:middle;'>" + BTIP + "</button>" +
                "</p>" +
                "<div class='ke-xiami-list'>" +
                "</div>" +
                "</div>",
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
                    self._contextMenu = null;
                    self._flashRules = null;
                },
                _initD:function() {
                    var self = this,
                        editor = self.editor,
                        d = self.d,
                        action = d.el.one("button"),
                        input = d.el.one(".ke-xiami-url");
                    self._xiami_input = input;
                    self._xiamia_list = d.el.one(".ke-xiami-list");
                    self._action = action;

                    function loadRecordsByPage(page) {
                        var params = {
                            key:encodeURIComponent(input.val()),
                            page:page,
                            random:(new Date().valueOf())
                        };
                        var req = getXiamiUrl(params);
                        bangpai_xiami.instance = self;
                        bangpai_xiami.page = page;

                        action.html(BLOADING);
                        action[0].disabled = true;
                        S.getScript(req);
                    }

                    action.on("click", function() {
                        loadRecordsByPage(1);
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
                            self._durl = "http://www.xiami.com/widget/" +
                                add.attr("data-value")
                                + "/singlePlayer.swf";
                            self._gen();
                        } else if (paging) {
                            loadRecordsByPage(parseInt(paging.attr("data-value")));
                        }
                    });
                },
                _listSearch:function(data) {
                    var self = this,
                        re = data.results,html,
                        action = self._action;
                    action.html(BTIP);
                    action[0].disabled = false;
                    if (re && re.length) {
                        html = "<ul>";
                        for (var i = 0; i < re.length; i++) {
                            var r = re[i];
                            html += "<li " +
                                "title='" + decodeURIComponent(r.song_name) + "'>" +
                                "<span class='ke-xiami-song'>"
                                + limit(decodeURIComponent(r.song_name), 25) +
                                "</span>" +
                                "" +
                                "" +
                                //album_id_song_id
                                "<a href='#' class='ke-xiami-add' data-value='" +
                                (
                                    r.album_id
                                        + "_"
                                        + r.song_id
                                    )
                                + "'>添加</a>" +
                                "</li>"
                        }
                        html += "</ul>";
                        //debugger
                        var page = data.page,totalpage = Math.floor(data.total / 8),start = page - 3,end = page + 3;
                        if (totalpage > 1) {
                            html += "<p class='ke-xiami-paging'>" +
                                getXiamiPaging(page, 1, "1...");
                            if (start <= 2) {
                                end = Math.min(2 - start + end, totalpage - 1);
                                start = 2;
                            }
                            for (var i = start; i <= end; i++) {
                                html += getXiamiPaging(page, i);
                            }
                            if (end != totalpage) {
                                html += getXiamiPaging(page, totalpage, totalpage + "...");
                            }
                            html += "</p>";
                        }


                    } else {
                        html = "<p style='text-align:center;margin:10px 0;'>不好意思，没有找到结果！</p>";
                    }

                    self._xiamia_list.html(html);
                },
                _updateD : function() {
                    var self = this;
                    self._xiami_input.val(TIP);
                    self._xiamia_list.html("");
                },
                //双击不能修改
                _dbclick:function() {

                }
                ,
                _getDWidth:function() {
                    return 257;
                }
                ,
                _getDURl:function() {
                    return this._durl;
                }
                ,
                _getDHeight:function() {
                    return 33;
                }
            });
            function getXiamiPaging(page, i, s) {
                return "<a class='ke-xiami-page-item" +
                    ((page == i) ? " ke-xiami-curpage" : "") +
                    "' data-value='" + i + "' href='#'>" + (s || i) + "</a>";
            }

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
});KISSY.Editor.add("bangpai-video", function(editor) {
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
            var bodyHtml = "<div>" +
                "<p style='margin-bottom:5px'>" +
                "需要分享的视频链接：支持 土豆，优酷，ku6 视频分享" +
                "</p>" +
                "<p>" +
                "<label><span style='color:#0066CC;font-weight:bold;'>视频链接： " +
                "</span><input class='ke-video-url' style='width:230px' value='"
                + TIP
                + "'/></label>" +
                "</p>" +
                "</div>",
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
                    var action = d.el.one(".ke-video-ok"),
                        cancel = d.el.one(".ke-video-cancel");
                    action.on("click", self._gen, self);
                    cancel.on("click", function() {
                        self.d.hide();
                    });
                },
                _getDWidth:function() {
                    var url = this.dUrl.val(),p = getProvider(url);
                    return p && p.width;
                },
                _getDURl:function() {
                    var url = this.dUrl.val(),p = getProvider(url);
                    if (!p) {
                        alert("不支持该链接来源!");
                    } else {
                        var re = p.detect(url);
                        if (!re) {
                            alert(TIP);
                        }
                        return re;
                    }
                },
                _getDHeight:function() {
                    var url = this.dUrl.val(),p = getProvider(url);
                    return p && p.height;
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
                    } else {
                        self.dUrl.val(TIP);
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