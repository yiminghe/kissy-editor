/**
 * biz plugin , xiami music intergration for bangpai
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("bangpai-music", function(editor) {
    var S = KISSY,
        UA = S.UA,
        Event = S.Event,
        KE = S.Editor,
        DOM = S.DOM,
        Node = S.Node,
        loading = KE.Config.base + "theme/loading.gif",
        Flash = KE.Flash,
        CLS_XIAMI = "ke_xiami",
        TYPE_XIAMI = "bangpai-music",
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
        BTIP = "搜 索 ",
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
                    c = element.children[ i ];
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
                "<input class='ke-xiami-url' " +

                "style='width:300px' value='"
                + TIP
                + "'/> &nbsp; " +
                " <input " +
                "class='ke-xiami-submit' " +
                "type='submit' " +
                "style='vertical-align:middle;' value='" + BTIP + "' />" +
                "</p>" +
                "<p " +
                "style='margin:5px 0'>" +
                "<label>对 齐： " +
                "<select " +
                "class='ke-xiami-align'>" +
                "<option value=''>无</option>" +
                "<option value='left'>左对齐</option>" +
                "<option value='right'>右对齐</option>" +
                "</select>" +
                "" +
                KE.Utils.duplicateStr("&nbsp;", 1) +
                "<label>间距： " +
                "</span> " +
                "<input " +
                "" +
                " data-verify='^\\d+(.\\d+)?$' " +
                " data-warning='间距请输入非负数字' " +
                "class='ke-xiami-margin' style='width:60px' value='"
                + 5 + "'/> 像素" +
                "</label>" +
                "</p>" +
                "</form>" +
                "<div " +
                "class='ke-xiami-list'>" +
                "</div>" +
                "",
                footHtml = "";


            function BangPaiMusic(editor) {
                BangPaiMusic.superclass.constructor.apply(this, arguments);
                //只能ie能用？，目前只有firefox,ie支持图片缩放
                var disableObjectResizing = editor.cfg.disableObjectResizing;
                if (!disableObjectResizing) {
                    Event.on(editor.document.body, UA.ie ? 'resizestart' : 'resize', function(evt) {
                        //console.log(evt.target);
                        if (DOM.hasClass(evt.target, CLS_XIAMI))
                            evt.preventDefault();
                    });
                }
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
                    self.dAlign = d.el.one(".ke-xiami-align");
                    self._xiami_input = input;
                    self._xiamia_list = d.el.one(".ke-xiami-list");
                    self._xiami_submit = d.el.one(".ke-xiami-submit");
                    self.dMargin = d.el.one(".ke-xiami-margin");
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
                                    align:self.dAlign.val(),
                                    style:"margin:" + (parseInt(self.dMargin.val()) || 0) + "px;"
                                }
                            };
                            self._gen();
                        } else if (paging) {
                            loadRecordsByPage(parseInt(paging.attr("data-value")));
                        }
                    });
                },
                _listSearch:function(data) {
                    var self = this,
                        i,
                        re = data.results,
                        html = "";
                    //xiami 返回结果自动trim了
                    if (data.key == S.trim(self._xiami_input.val())) {
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
                        self.dMargin.val(parseInt(f._4e_style("margin")) || 0);
                    } else {
                        self._xiami_input.val(TIP);
                        self.dAlign.val("");
                        self.dMargin.val("5");
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

            function checkXiami(node) {
                return node._4e_name() === 'img' && (!!node.hasClass(CLS_XIAMI)) && node;
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
});KISSY.Editor.add("bangpai-upload", function(editor) {
    var S = KISSY,KE = S.Editor;

    if (KE.BangPaiUpload) return;
    (function() {

        function BangPaiUpload(editor) {
            this.editor = editor;
            this._init();
        }

        var holder = [],movie = KE.Config.base + KE.Utils.debugUrl("biz/bangpai/" +
            "plugins/upload/uploader.swf"),
            Node = S.Node,
            name = "ke-bangpai-upload";

        S.augment(BangPaiUpload, S.EventTarget, {
            _init:function() {
                var self = this,
                    editor = self.editor,
                    bangpaiCfg = editor.cfg["pluginConfig"]["bangpai-upload"],
                    holderEl = bangpaiCfg.holder,

                    bangpaiUploaderHolder = S.isString(holderEl) ? S.one(holderEl) : holderEl,
                    btn = new Node("<p><button disabled='disabled'>选择文件</button></p>")
                        .appendTo(bangpaiUploaderHolder).one("button"),
                    list = new Node("<div>").appendTo(bangpaiUploaderHolder),
                    up = new Node("<p><button>开始上传</button></p>")
                        .appendTo(bangpaiUploaderHolder),
                    fid = S.guid(name),
                    boffset = btn.offset();

                holder[fid] = self;
                self.btn = btn;
                self.up = up;
                self.on("contentReady", self._ready, self);
                var flash = KE.Utils.flash.createSWFRuntime(movie, {
                    style:("position:absolute;top:"
                        + boffset.top +
                        "px;left:"
                        + boffset.left + "px;" +
                        "width:" + btn.width() + "px;" +
                        "height:" + btn.height() + "px;" +
                        "z-index:9999;"),
                    attrs:{
                        allowScriptAccess:'always',
                        allowNetworking:'all',
                        scale:'noScale',
                        width:btn.width() ,
                        height:btn.height()
                    },
                    flashVars:{
                        allowedDomain : location.hostname,
                        shareData: true,
                        swfID:fid,
                        jsEntry:"KISSY.Editor.BangPaiUpload.EventHandler",
                        browser: name,
                        useCompression: true,
                        hand:true,
                        btn:true
                    }
                });
                self.flash = flash;
                self._list = list;
                self.on("select", self._onSelect, self);
            },
            _onSelect:function(ev) {
                var self = this,
                    list = self._list,
                    files = ev.files;
                if (files) {

                    

                }
            },

            _ready:function() {
                var self = this,
                    flash = self.flash,
                    btn = self.btn;
                btn[0].disabled = false;
                flash.browse(false, [
                    {desc:"图片文件( png,jpg,jpeg,gif )",ext:"*.jpeg;*.jpg;*.png;*.gif"}
                ]);
            },
            _eventHandler:function(event) {
                var self = this,
                    type = event.type;
                if (type === 'log') {
                    S.log(event.message);
                } else if (type) {
                    self.fire(type, event);
                }
            }
        });
        BangPaiUpload.EventHandler = function(fid, event) {
            holder[fid]._eventHandler.call(holder[fid], event);
        };
        KE.BangPaiUpload = BangPaiUpload;
    })();
    editor.addPlugin(function() {
        new KE.BangPaiUpload(editor);
    });
},
{
    attach:false,
    requires : ["flashutils"]
});/**
 * biz plugin , video about ku6,youku,tudou for bangpai
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("bangpai-video", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        CLS_VIDEO = "ke_video",
        TYPE_VIDEO = "bangpai-video",
        Flash = KE.Flash,
        DTIP = "自动",
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
        TIP = "http://";

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
                var m = url.match(/id_([^.]+)\.html$/);
                if (m) {
                    return "http://player.youku.com/player.php/sid/" + m[1] + "/v.swf";
                }
                //if (/\.swf$/.test(url))
                return url;
            }
        },
        {
            reg:/tudou\.com/i,
            width:480,
            height:400,
            detect:function(url) {
                var m = url.match(/\/view\/([^/]+)\/$/);
                if (m) {
                    return "http://www.tudou.com/v/" + m[1] + "/v.swf";
                }
                //if (/\.swf$/.test(url))
                return url;
            }
        },
        {
            reg:/ku6\.com/i,
            width:480,
            height:400,
            detect:function(url) {
                var m = url.match(/show[^\/]*\/([^.]+)\.html$/);
                if (m) {
                    return "http://player.ku6.com/refer/" + m[1] + "/v.swf";
                }
                //if (/\.swf$/.test(url))
                return url;
            }
        }
    ];

    if (!KE.BangPaiVideo) {
        (function() {
            var bodyHtml = "" +
                "<table>" +
                "<tr><td colspan='2'>" +
                "需要分享的视频链接：支持 土豆，优酷，ku6 视频分享" +
                "</td></tr>" +
                "<tr><td colspan='2'>" +
                "<label><span style='color:#0066CC;font-weight:bold;'>视频链接： " +
                "</span><input " +

                "class='ke-video-url' style='width:230px' value='"
                + TIP
                + "'/></label>" +
                "</td></tr>" +
                "<tr><td>" +
                "<label>宽度： " +
                "</span> <input " +
                "" +
                " data-verify='^" + DTIP + "|((?!0$)\\d+(.\\d+)?)$' " +
                " data-warning='宽度请输入正数' " +
                "class='ke-video-width' style='width:60px' value='"
                + DTIP + "'/> 像素 " +
                "</label>" +
                "</td>" +
                "<td>" +
                "<label> 高度： " +
                "</span> <input " +
                "" +
                " data-verify='^" + DTIP + "|((?!0$)\\d+(.\\d+)?)$' " +
                " data-warning='高度请输入正数' " +
                "class='ke-video-height' style='width:60px' value='"
                + DTIP + "'/> 像素 " +
                "</label>" +

                "</td></tr>" +
                "<tr>" +
                "<td>" +
                "<label>对齐： " +
                "<select class='ke-video-align'>" +
                "<option value=''>无</option>" +
                "<option value='left'>左对齐</option>" +
                "<option value='right'>右对齐</option>" +
                "</select>" +
                "</td>" +
                "<td>" +

                "<label>间距： " +
                "</span> <input " +
                "" +
                " data-verify='^\\d+(.\\d+)?$' " +
                " data-warning='间距请输入非负数字' " +
                "class='ke-video-margin' style='width:60px' value='"
                + 5 + "'/> 像素" +
                "</label>" +
                "</td></tr>" +
                "</table>",
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
                    self._contentCls = "ke-toolbar-video";
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
                    self.dMargin = d.el.one(".ke-video-margin");
                    self.dWidth = d.el.one(".ke-video-width");
                    self.dHeight = d.el.one(".ke-video-height");
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
                            return;
                        }
                        return {
                            url:re,
                            attrs:{
                                height:parseInt(self.dHeight.val()) || p.height,
                                width:parseInt(self.dWidth.val()) || p.width,
                                align: self.dAlign.val(),
                                style:"margin:" + (parseInt(self.dMargin.val()) || 0) + "px;"
                            }
                        };
                    }
                },

                _updateD:function() {
                    var self = this,
                        editor = self.editor,
                        f = self.selectedFlash;
                    if (f) {
                        var r = editor.restoreRealElement(f);
                        self.dUrl.val(self._getFlashUrl(r));
                        self.dAlign.val(r.attr("align"));
                        self.dMargin.val(parseInt(r._4e_style("margin")) || 0);
                        self.dWidth.val(r.attr("width"));
                        self.dHeight.val(r.attr("height"));
                    } else {
                        self.dUrl.val(TIP);
                        self.dAlign.val("");
                        self.dMargin.val("5");
                        self.dWidth.val(DTIP);
                        self.dHeight.val(DTIP);
                    }
                }
            });
            function checkVideo(node) {
                return node._4e_name() === 'img' && (!!node.hasClass(CLS_VIDEO)) && node;
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