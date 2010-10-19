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
        BTIP = "搜 索",
        TIP = "输入歌曲名、专辑名、艺人名";

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
                'margin:10px 0 10px 0;' +
                'padding:10px 20px 0 20px;' +
                'border-top:1px solid #CED5E0;' +
                'display:none;' +
                '}' +
                '' +
                '' +
                '.ke-xiami-list li{' +
                'border:1px solid #CED5E0;' +
                'border-width:0 0 1px 0;' +
                'overflow:hidden;' +
                'zoom:1;' +
                'color:#646464;' +
                'height:24px;' +
                'line-height:24px;' +
                'padding:0 20px 0 10px;' +
                '}' +
                '' +
                '' +
                '.ke-xiami-list .ke-xiami-add {' +
                'float:right;' +
                '}' +
                '' +
                '' +
                '' +
                '.ke-xiami-list .ke-xiami-song {' +
                'float:left;' +
                'width:300px;' +
                'white-space:nowrap;' +
                'overflow:hidden;' +
                '}' +
                '' +
                '' +
                '.ke-xiami-paging a{' +
                'display: inline-block;'
                + ' zoom: 1; '
                + ' *display: inline; '
                + 'padding:1px 7px;'
                + 'margin:0 3px;' +
                '}' +
                '' +
                '' +
                '.ke-xiami-paging a:hover,.ke-xiami-paging a.ke-xiami-curpage {' +
                'color:red;' +
                'text-decoration:none;' +
                '}' +
                '' +
                '' +
                '.ke-xiami-paging {' +
                'text-align:center;' +
                'margin:20px -10px 0 -10px;' +
                '}' +
                '' +
                '.ke-xiami-page-more {' +
                'padding:0 10px;' +
                '}';
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

            var MIDDLE = "vertical-align:middle;";
            var bodyHtml = "<div style='padding:20px 0;'>" +
                "<form action='#' class='ke-xiami-form' style='margin:0 20px;'>" +
                "<p class='ke-xiami-title'>" +
                "" +
                "</p>" +
                "<p class='ke-xiami-url-wrap'>" +
                "<input class='ke-xiami-url ke-input' " +
                "style='width:374px;" + MIDDLE
                + "'" +
                "/> &nbsp; " +
                " <button " +
                "class='ke-xiami-submit'" +
                ">"
                + BTIP + "</button>" +
                "</p>" +
                "<p " +
                "style='margin:10px 0'>" +
                "<label>对 齐： " +
                "<select " +
                "class='ke-xiami-align'>" +
                "<option value=''>无</option>" +
                "<option value='left'>左对齐</option>" +
                "<option value='right'>右对齐</option>" +
                "</select>" +
                "</label>" +
                "<label style='margin-left:70px;'>间距： " +
                " " +
                "<input " +
                "" +
                " data-verify='^\\d+$' " +
                " data-warning='间距请输入非负整数' " +
                "class='ke-xiami-margin ke-input' style='width:60px;" +
                MIDDLE + "' value='"
                + 5 + "'/> 像素" +
                "</label>" +
                "</p>" +
                "</form>" +
                "<div " +
                "class='ke-xiami-list'>" +
                "</div>" +
                "</div>",
                footHtml = "<a " +
                    "class='ke-xiami-ok ke-button' " +
                    "style='margin-right:20px;'>确&nbsp;定</a>" +
                    "<a class='ke-xiami-cancel ke-button'>取&nbsp;消</a>";


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
                    self._title = "虾米属性";
                    self._bodyHtml = bodyHtml;
                    self._footHtml = footHtml;
                    self._contentCls = "ke-toolbar-music";
                    self._tip = "插入虾米音乐";
                    self._contextMenu = contextMenu;
                    self._flashRules = ["img." + CLS_XIAMI];
                },
                _updateTip:function(tipurl, selectedFlash) {
                    var self = this,
                        editor = self.editor,
                        r = editor.restoreRealElement(selectedFlash);
                    if (!r)return;
                    tipurl.html(selectedFlash.attr("title"));
                    tipurl.attr("href", self._getFlashUrl(r));
                },
                _initD:function() {
                    var self = this,
                        editor = self.editor,
                        d = self.d,
                        action = d.el.one(".ke-xiami-form"),
                        input = d.el.one(".ke-xiami-url");
                    self.dAlign = KE.Select.decorate(d.el.one(".ke-xiami-align"));
                    self._xiami_input = input;
                    KE.Utils.placeholder(input, TIP);
                    self._xiamia_list = d.el.one(".ke-xiami-list");
                    self._xiami_submit = new KE.TripleButton({
                        el:d.el.one(".ke-xiami-submit"),
                        cls:'ke-button',
                        text:"搜&nbsp;索"
                    });
                    self._xiami_submit.on("offClick", function() {
                        loadRecordsByPage(1);
                    });
                    input.on("keydown", function(ev) {
                        if (ev.keyCode === 13) {
                            loadRecordsByPage(1);
                        }
                    });
                    self.dMargin = d.el.one(".ke-xiami-margin");
                    self._xiami_url_wrap = d.el.one(".ke-xiami-url-wrap");
                    self._xiamia_title = d.el.one(".ke-xiami-title");

                    var _xiami_ok = d.foot.one(".ke-xiami-ok");
                    d.foot.one(".ke-xiami-cancel").on("click", function() {
                        d.hide();
                    });
                    _xiami_ok.on("click", function() {
                        var f = self.selectedFlash,
                            r = editor.restoreRealElement(f);
                        self._dinfo = {
                            url:self._getFlashUrl(r),
                            attrs:{
                                title:f.attr("title"),
                                align:self.dAlign.val(),
                                style:
                                    "margin:" +
                                        (parseInt(self.dMargin.val()) || 0)
                                        + "px;"
                            }
                        };
                        self._gen();
                    }, self);

                    function loadRecordsByPage(page) {
                        var query = input.val();
                        if (query.replace(/[^\x00-\xff]/g, "@@").length > 30) {
                            alert("长度上限30个字符（1个汉字=2个字符）");
                            return;
                        } else if (!S.trim(query) || query == TIP) {
                            alert("不能为空！");
                            return;
                        }
                        self._xiami_submit.disable();
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
                            "width:32px;" +
                            "height:32px;" +
                            "margin:5px auto 0 auto;" +
                            "'src='" + loading + "'/>" +
                            "<p style='width: 130px; margin: 15px auto 0; color: rgb(150, 150, 150);'>正在搜索，请稍候......</p>");
                        self._xiamia_list.show();
                        var node = S.getScript(req, {
                            timeout:10,
                            success:function() {
                            },
                            error:function() {
                                node.src = '';
                                self._xiami_submit.enable();
                                var html = "<p style='text-align:center;margin:10px 0;'>" +
                                    "不好意思，超时了，请重试！" +
                                    "</p>";
                                self._xiamia_list.html(html);
                            }
                        });


                    }

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
                                    style:
                                        "margin:" +
                                            (parseInt(self.dMargin.val()) || 0)
                                            + "px;"
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
                        self._xiami_submit.enable();
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
                                    + "'>添加</a>" +
                                    "</li>"
                            }
                            html += "</ul>";

                            var page = data.page,
                                totalpage = Math.floor(data.total / 8),
                                start = page - 1,
                                end = page + 1;

                            if (totalpage > 1) {
                                html += "<p class='ke-xiami-paging'>";
                                if (start <= 2) {
                                    end = Math.min(2 - start + end, totalpage - 1);
                                    start = 2;
                                }
                                end = Math.min(end, totalpage - 1);
                                if (end == totalpage - 1) {
                                    start = Math.max(2, end - 3);
                                }
                                if (page != 1) {
                                    html += getXiamiPaging(page, page - 1, "上一页");
                                }
                                html += getXiamiPaging(page, 1, "1");
                                if (start != 2) {
                                    html += "<span class='ke-xiami-page-more'>...</span>";
                                }
                                for (i = start; i <= end; i++) {
                                    html += getXiamiPaging(page, i);
                                }
                                if (end != totalpage) {
                                    if (end != totalpage - 1) {
                                        html += "<span class='ke-xiami-page-more'>...</span>";
                                    }
                                    html += getXiamiPaging(page, totalpage, totalpage);
                                }
                                if (page != totalpage) {
                                    html += getXiamiPaging(page, page + 1, "下一页");
                                }
                                html += "</p>";
                            }

                        } else {
                            html = "<p style='text-align:center;margin:10px 0;'>" +
                                "不好意思，没有找到结果！" +
                                "</p>";
                        }
                        self._xiamia_list.html(html);
                    }
                },

                _updateD : function() {
                    var self = this,
                        f = self.selectedFlash;
                    if (f) {
                        self._xiami_input.val(f.attr("title"));
                        self._xiamia_title.html(f.attr("title"));
                        self.dAlign.val(f.attr("align"));
                        self.dMargin.val(parseInt(f._4e_style("margin")) || 0);
                        self._xiami_url_wrap.hide();
                        self.d.foot.show();
                        self._xiamia_title.show();
                    } else {
                        KE.Utils.resetInput(self._xiami_input);
                        self.dAlign.val("");
                        self.dMargin.val("5");
                        self._xiami_url_wrap.show();
                        self.d.foot.hide();
                        self._xiamia_title.hide();
                        self._xiami_submit.enable();
                    }
                    self._xiamia_list.hide();
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
                return "<a class='ke-xiami-page-item ke-button" +
                    ((page == i) ? " ke-xiami-curpage" : "") +
                    "' data-value='" + i + "' href='#'>" + (s || i) + "</a>";
            }

            function getDisplayName(r) {
                return decodeURIComponent(r.song_name) + " - " + decodeURIComponent(r.artist_name);
            }

            function checkXiami(node) {
                return node._4e_name() === 'img' &&
                    (!!node.hasClass(CLS_XIAMI)) &&
                    node;
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
});/**
 * bangpai source editor for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("bangpai-sourcearea", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Node = S.Node
    UA = S.UA,
        TripleButton = KE.TripleButton;
    //firefox 3.5 不支持，有bug
    if (UA.gecko < 1.92) return;
    if (!KE.BangPaiSourceArea) {
        (function() {
            var SOURCE_MODE = KE.SOURCE_MODE ,
                WYSIWYG_MODE = KE.WYSIWYG_MODE;

            function BangPaiSourceArea(editor) {
                this.editor = editor;
                this._init();
            }

            S.augment(BangPaiSourceArea, {
                _init:function() {
                    var self = this,
                        editor = self.editor,
                        statusDiv = editor.statusDiv;
                    self.el = new Node("<span " +
                        "style='zoom:1;display:inline-block;height:22px;line-height:22px;'>" +
                        "<input style='margin:0 5px;vertical-align:middle;' " +
                        "type='checkbox' />" +
                        "<span style='vertical-align:middle;'>编辑源代码</span></span>")
                        .appendTo(statusDiv).one("input");
                    var el = self.el;
                    el.on("click", self._check, self);
                    editor.on("sourcemode", function() {
                        el[0].checked = true;
                    });
                    editor.on("wysiwygmode", function() {
                        el[0].checked = false;
                    });
                },
                _check:function() {
                    var self = this,el = self.el;
                    if (el[0].checked) self._show();
                    else self._hide();
                },
                _show:function() {
                    var self = this,
                        editor = self.editor;
                    editor.execCommand("sourceAreaSupport", SOURCE_MODE);
                },


                _hide:function() {
                    var self = this,
                        editor = self.editor;
                    editor.execCommand("sourceAreaSupport", WYSIWYG_MODE);
                }
            });
            KE.BangPaiSourceArea = BangPaiSourceArea;
        })();
    }

    editor.addPlugin(function() {
        new KE.BangPaiSourceArea(editor);
    });
},
{
    attach:false,
    requires : ["sourceareasupport"]
});
KISSY.Editor.add("bangpai-upload", function(editor) {
    var S = KISSY,KE = S.Editor;

    if (KE.BangPaiUpload) return;
    (function() {

        function BangPaiUpload(editor) {
            var self = this;
            self.editor = editor;
            self._init();
        }

        var DOM = S.DOM,
            JSON = S.JSON,
            PIC_NUM_LIMIT = 15,
            PIC_NUM_LIMIT_WARNING = "系统将只保留 n 张",
            PIC_SIZE_LIMIT = 1000,
            PIC_SIZE_LIMIT_WARNING = "图片太大，请压缩至 n M以下",
            Node = S.Node,
            Overlay = KE.SimpleOverlay,
            holder = [],
            KEY = "Multi-Upload-Save",
            JSON = S.JSON,
            store = window[KE.STORE],
            movie = KE.Config.base + KE.Utils.debugUrl("plugins/uploader/uploader.swf"),
            progressBars = {},
            name = "ke-bangpai-upload";

        DOM.addStyleSheet("" +

            "" +
            ".ke-upload-btn-wrap {" +
            "position:relative;" +
            "padding:15px 20px 15px 10px;" +
            "}" +
            ".ke-upload-list {" +
            "width:100%;" +
            "}" +

            ".ke-upload-list th {" +
            "border-top:1px solid #c1c8d1;" +
            "background-color: #E7E9ED;" +
            "background: -webkit-gradient(linear, left top, left bottom, from(#E7E9ED), to(#F1F4F7));" +
            "background: -moz-linear-gradient(top, #E7E9ED, #F1F4F7);" +
            // "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#E7E9ED', endColorstr = '#F1F4F7');" +
            "}" +

            ".ke-upload-list td,.ke-upload-list th {" +
            "padding:0em;" +
            "height:26px;" +
            "line-height:26px;" +
            "text-align:center;" +
            "border-bottom:1px solid #c1c8d1;" +
            "}", "ke-BangPaiUpload"
            );

        S.augment(BangPaiUpload, S.EventTarget, {
            _prepareShow:function() {
                var self = this,
                    editor = self.editor,
                    bangpaiCfg = editor.cfg["pluginConfig"]["bangpai-upload"];

                self.dialog = new Overlay({
                    title:"批量上传",
                    mask:false,
                    draggable:"all",
                    //height:"500px",
                    focusMgr:false,
                    width:"600px"
                });

                var d = self.dialog;
                d.foot.hide();
                var bangpaiUploaderHolder = d.body,
                    btnHolder = new Node(
                        "<div class='ke-upload-btn-wrap'>" +
                            "<span " +
                            "style='" +
                            "margin:0 15px 0 0px;" +
                            "color:#969696;" +
                            "display:inline-block;" +
                            "vertical-align:middle;" +
                            "width:469px;" +
                            "'></span>" +
                            "</div>").appendTo(bangpaiUploaderHolder),
                    listWrap = new Node("<div style='display:none'>")
                        .appendTo(bangpaiUploaderHolder),
                    btn = new KE.TripleButton({
                        text:"浏&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;览",
                        cls:"ke-button",
                        container:btnHolder
                    }),
                    boffset = btn.el.offset(),
                    fwidth = btn.el.width() * 2,
                    fheight = btn.el.height() * 1.5,

                    flashPos = new Node("<div style='" +
                        ("position:absolute;" +
                            "width:" + fwidth + "px;" +
                            "height:" + fheight + "px;" +
                            "z-index:" + editor.baseZIndex(9999) + ";")
                        + "'>").appendTo(btnHolder),
                    listTableWrap = new Node("<div>" +
                        "<table class='ke-upload-list'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>" +
                        "序号" +
                        "</th>" +
                        "<th>" +
                        "图片" +
                        "</th>" +
                        "<th>" +
                        "大小" +
                        "</th>" +
                        "<th style='width:35%'>" +
                        "上传进度" +
                        "</th>" +
                        "<th>" +
                        "图片操作" +
                        "</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                        "</tbody>" +
                        "</table>" +
                        "</div>").appendTo(listWrap),
                    list = listTableWrap.one("tbody"),
                    upHolder = new Node("<p " +
                        "style='" +
                        "margin:15px 20px 30px; 0;" +
                        "text-align:right;" +
                        "'>" +
                        //"<a class='ke-button ke-bangpiaupload-ok'>确定上传</a>" +
                        "<a class='ke-button ke-bangpiaupload-insertall'" +
                        " style='margin-left:20px;'>全部插入</a>" +
                        "</p>")
                        .appendTo(listWrap),
                    up = upHolder.one(".ke-bangpiaupload-ok"),
                    insertAll = upHolder.one(".ke-bangpiaupload-insertall"),
                    fid = S.guid(name),
                    statusText = new Node("<span>")
                        .insertBefore(upHolder[0].firstChild);

                if (bangpaiCfg.extraHtml) {
                    listTableWrap.append(bangpaiCfg.extraHtml);
                }

                self.statusText = statusText;

                holder[fid] = self;
                self.btn = btn;
                self.up = up;

                //swfready 要求可见
                flashPos.offset(boffset);

                var uploader = new KE.FlashBridge({
                    movie:movie,
                    methods:["removeFile",
                        "cancel",
                        "removeFile",
                        "disable",
                        "enable",
                        "setAllowMultipleFiles",
                        "setFileFilters",
                        "uploadAll"],
                    holder:flashPos,
                    attrs:{
                        width:fwidth ,
                        height:fheight
                    },
                    params:{
                        wmode:"transparent"
                    },
                    flashVars:{
                        allowedDomain : location.hostname,
                        menu:true
                    }
                });
                self.flashPos = flashPos;
                self.uploader = uploader;
                self._list = list;
                self._listTable = list.parent("table");
                self._listWrap = listWrap;
                self._ds = bangpaiCfg.serverUrl;
                self._dsp = bangpaiCfg.serverParams || {};
                self._fileInput = bangpaiCfg.fileInput || "Filedata";
                self._sizeLimit = bangpaiCfg.sizeLimit || PIC_SIZE_LIMIT;
                self._numberLimit = bangpaiCfg.numberLimit || PIC_NUM_LIMIT;
                btnHolder.one("span").html("允许用户同时上传" +
                    self._numberLimit
                    + "张图片，单张图片容量不超过" +
                    self._sizeLimit / 1000
                    + "M");

                insertAll.on("click", function() {
                    trs = list.all("tr");
                    for (var i = 0; i < trs.length; i++) {
                        var tr = new Node(trs[i]),
                            url = tr.attr("url");
                        if (url) {
                            editor.insertElement(new Node("<p>&nbsp;<img src='" +
                                url + "'/>&nbsp;</p>", null, editor.document));
                            self._removeTrFile(tr);
                            self._removeTrFile(tr);
                        }
                    }
                    if (url) {
                        listWrap.hide();
                        d.hide();
                    }
                });

                list.on("click", function(ev) {
                    var target = new Node(ev.target),tr;
                    ev.halt();
                    if (target.hasClass("ke-upload-insert")) {
                        tr = target.parent("tr"),url = tr.attr("url");
                        editor.insertElement(new Node("<img src='" +
                            url + "'/>", null, editor.document));
                    }
                    if (
                        target.hasClass("ke-upload-delete")
                            ||
                            target.hasClass("ke-upload-insert")
                        ) {
                        tr = target.parent("tr");
                        self._removeTrFile(tr);
                    }
                });

                uploader.on("fileSelect", self._onSelect, self);
                uploader.on("uploadStart", self._onUploadStart, self);
                uploader.on("uploadProgress", self._onProgress, self);
                uploader.on("uploadComplete", self._onComplete, self);
                uploader.on("uploadCompleteData", self._onUploadCompleteData, self);
                uploader.on("swfReady", self._ready, self);
                uploader.on("uploadError", self._uploadError, self);


                //从本地恢复已上传记录
                self._restore();
            },
            _removeTrFile:function(tr) {
                var self = this,
                    fid = tr.attr("fid"),
                    uploader = self.uploader;
                if (fid) {
                    try {
                        uploader.cancel(fid);
                    } catch(e) {
                    }
                    uploader.removeFile(fid);
                }
                if (progressBars[fid]) {
                    progressBars[fid].destroy();
                    delete progressBars[fid];
                }
                tr._4e_remove();
                self.denable();
                self._syncStatus();
            },
            _init:function() {
                var self = this,
                    editor = self.editor,
                    el = new KE.TripleButton({
                        contentCls:"ke-toolbar-mul-image",
                        title:"批量插图",
                        container:editor.toolBarDiv
                    });
                el.on("offClick", self.show, self);
                self.el = el;
                KE.Utils.lazyRun(self, "_prepareShow", "_realShow");
                KE.Utils.sourceDisable(editor, self);
                self.disable();
                KE.storeReady(function() {
                    self.enable();
                });
            },
            disable:function() {
                this.el.disable();
            },
            enable:function() {
                this.el.boff();
            },
            _realShow:function() {
                this.dialog.show();
            },
            show:function() {
                this._prepareShow();
            },

            _uploadError:function(ev) {
                var self = this,
                    id = ev.id,
                    tr = self._getFileTr(id),
                    bar = progressBars[id];
                if (tr) {
                    bar && bar.destroy();
                    tr.one(".ke-upload-progress").html("<div " +
                        "" +
                        "style='color:red;'>" +
                        ev.status +
                        "</div>");
                }
            },
            _getFileTr:function(id) {
                var self = this,
                    list = self._list,
                    trs = list.all("tr");
                for (var i = 0; i < trs.length; i++) {
                    var tr = new Node(trs[i]);
                    if (tr.attr("fid") == id) {
                        return tr;
                    }
                }
            },
            _onUploadStart:function(ev) {
                //console.log("_onUploadStart", ev);
                var self = this,
                    id = ev.id,
                    uploader = self.uploader;
                uploader.removeFile(id);
                //self.ddisable();
            },
            _onComplete:function() {
                //console.log("_onComplete", ev);
            },
            _onUploadCompleteData:function(ev) {
                var self = this,
                    data = S.trim(ev.data).replace(/\\r||\\n/g, ""),
                    id = ev.id;
                if (!data) return;
                data = JSON.parse(data);
                if (data.error) {
                    self._uploadError({
                        id:id,
                        status:data.error
                    });
                    return;
                }
                var tr = self._getFileTr(id);
                if (tr) {
                    tr.one(".ke-upload-insert").show();
                    tr.attr("url", data.imgUrl);
                }
                //self.denable();
                self._syncStatus();

            },
            _onProgress:function(ev) {
                //console.log("_onProgress", ev);
                var fid = ev.id,
                    progess = Math.floor(ev.bytesLoaded * 100 / ev.bytesTotal),
                    bar = progressBars[fid];
                bar && bar.set("progress", progess);

            },
            ddisable:function() {
                var self = this;
                self.uploader.disable();
                self.btn.disable();
                self.flashPos.offset({
                    left:-9999,
                    top:-9999
                });

            },
            denable:function() {
                var self = this;
                self.uploader.enable();
                self.btn.enable();
                self.flashPos.offset(self.btn.el.offset());
            },
            _syncStatus:function() {
                var self = this,
                    list = self._list,
                    seq = 1,
                    trs = list.all("tr");
                if (trs.length == 0) {
                    self._listWrap.hide();
                } else {
                    list.all(".ke-upload-seq").each(function(n) {
                        n.html(seq++);
                    });
                    var wait = 0;
                    for (var i = 0; i < trs.length; i++) {
                        var tr = new Node(trs[i]);
                        if (!tr.attr("url")) wait++;
                    }
                    self.statusText.html("队列中剩余" + wait + "张图片"
                        //+ "，点击确定上传，开始上传。 "
                        );
                }
                //当前已上传的文件同步到本地
                self._save();
            },
            //当前已上传的图片保存下来
            _restore:function() {
                var self = this,
                    data = store.getItem(KEY),
                    tbl = self._list[0];
                if (!data) return;
                data = JSON.parse(decodeURIComponent(data));
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    d.complete = 1;
                    d.fid = "restore_" + i;
                    var r = self._createFileTr(tbl, d);
                    r.attr("url", d.url);
                }
                if (d) {
                    self._listWrap.show();
                    self._syncStatus();
                }
            },
            _save:function() {
                var self = this,
                    list = self._list,
                    trs = list.all("tr"),
                    data = [];
                for (var i = 0; i < trs.length; i++) {
                    var tr = new Node(trs[i]),
                        url = tr.attr("url");
                    if (url) {
                        var size = tr.one(".ke-upload-filesize").html(),
                            name = tr.one(".ke-upload-filename").html();
                        data.push({
                            name:name,
                            size:size,
                            url:url
                        });
                    }
                }
                store.setItem(KEY, encodeURIComponent(JSON.stringify(data)));
            },
            _getFilesSize:function(files) {
                var n = 0;
                for (var i in files) {
                    if (files.hasOwnProperty(i))
                        n++;
                }
                return n;
            },
            _createFileTr:function(tbl, f) {

                /*
                 chrome not work !
                 kissy bug?
                 var row = new Node("<tr fid='" + id + "'>"
                 + "<td class='ke-upload-seq'>"
                 + "</td>"
                 + "<td>"
                 + f.name
                 + "</td>"
                 + "<td>"
                 + size
                 + "k</td>" +
                 "<td class='ke-upload-progress'>" +
                 "</td>" +
                 "<td>" +
                 "<a href='#' " +
                 "class='ke-upload-insert' " +
                 "style='display:none'>" +
                 "[插入]</a> &nbsp; " +
                 "<a href='#' class='ke-upload-delete'>[删除]</a> &nbsp; "
                 +
                 "</td>"
                 + "</tr>").appendTo(list);
                 */


                var self = this,
                    id = f.fid,
                    row = tbl.insertRow(-1);
                DOM.attr(row, "fid", id);
                var cell = row.insertCell(-1);
                DOM.attr(cell, "class", 'ke-upload-seq');
                cell = row.insertCell(-1);
                if (f.name.length > 20) {
                    f.name = f.name.substring(0, 20) + "...";
                }
                DOM.html(cell, f.name);
                DOM.attr(cell, "class", 'ke-upload-filename');
                cell = row.insertCell(-1);
                DOM.html(cell, f.size);
                DOM.attr(cell, "class", 'ke-upload-filesize');
                cell = row.insertCell(-1);
                DOM.attr(cell, "class", 'ke-upload-progress');
                cell = row.insertCell(-1);
                DOM.html(cell, "<a href='#' " +
                    "class='ke-upload-insert' " +
                    (f.complete ? "" : "style='display:none'") +
                    ">" +
                    "[插入]</a> &nbsp; " +
                    "<a href='#' class='ke-upload-delete'>" +
                    "[删除]" +
                    "</a> &nbsp;");
                row = new Node(row);

                var prog = row.one(".ke-upload-progress");
                if (parseInt(f.size) > self._sizeLimit) {
                    self._uploadError({
                        id:id,
                        status:PIC_SIZE_LIMIT_WARNING
                            .replace(/n/, self._sizeLimit / 1000)
                    });
                    self.uploader.removeFile(id);

                } else {
                    progressBars[id] = new KE.ProgressBar({
                        container:row.one(".ke-upload-progress") ,
                        width:"100px",
                        height:"15px"
                    });
                    if (f.complete) {
                        progressBars[id].set("progress", 100);
                    }
                }

                return row;
            },
            _onSelect:function(ev) {
                var self = this,
                    uploader = self.uploader,
                    list = self._list,
                    curNum = 0,
                    //当前队列的所有文件，连续选择的话累计！！！
                    files = ev.fileList,
                    normParams = KE.Utils.normParams,
                    available = self._numberLimit;

                if (files) {


                    //去除已经 ui 显示出来的
                    var trs = list.children("tr");
                    for (var i = 0; i < trs.length; i++) {
                        var tr = trs[i],fid = DOM.attr(tr, "fid");
                        fid && files[fid] && (delete files[fid]);
                    }
                    //限额-目前ui的
                    available = self._numberLimit - trs.length;

                    var l = self._getFilesSize(files);

                    if (l > available) {
                        alert(PIC_NUM_LIMIT_WARNING.replace(/n/, self._numberLimit));
                    }

                    if (l >= available) {
                        self.ddisable();
                    }

                    self._listWrap.show();
                    var tbl = self._list[0];
                    //files 是这次新选择的啦！
                    //新选择的随即删除一些
                    for (var i in files) {
                        if (!files.hasOwnProperty(i)) continue;
                        curNum ++;
                        var f = files[i],
                            size = Math.floor(f.size / 1000),
                            id = f.id;

                        if (curNum > available) {
                            uploader.removeFile(id);
                            continue;
                        }
                        self._createFileTr(tbl, {
                            size:size + "k",
                            fid:id,
                            name:f.name
                        });
                    }
                    self._syncStatus();

                    uploader.uploadAll(self._ds, "POST",
                        normParams(self._dsp),
                        self._fileInput);
                }
            },

            _ready:function() {
                var self = this,
                    uploader = self.uploader,
                    up = self.up,
                    btn = self.btn,
                    flashPos = self.flashPos,
                    normParams = KE.Utils.normParams;
                btn.enable();
                flashPos.offset(btn.el.offset());
                uploader.setAllowMultipleFiles(true);
                uploader.setFileFilters([
                    {
                        extensions:"*.jpeg;*.jpg;*.png;*.gif",
                        description:"图片文件( png,jpg,jpeg,gif )"
                    }
                ]);
                /*
                 up.detach();
                 up.on("click", function(ev) {
                 ev.halt();

                 });
                 */
            }
        });

        KE.BangPaiUpload = BangPaiUpload;
    })();
    editor.addPlugin(function() {
        new KE.BangPaiUpload(editor);
    });
}, {
    attach:false,
    requires : ["flashutils","progressbar","flashbridge","overlay","localStorage"]
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
        dataFilter = dataProcessor && dataProcessor.dataFilter;

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
                m = url.match(/v_playlist\/([^.]+)\.html$/);
                if (m) {
                    //return "http://player.youku.com/player.php/sid/" + m[1] + "/v.swf";
                }
                return url;
            }
        },
        {
            reg:/tudou\.com/i,
            width:480,
            height:400,
            detect:function(url) {
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
                return url;
            }
        }
    ];

    if (!KE.BangPaiVideo) {
        (function() {
            var MIDDLE = "vertical-align:middle;";
            var bodyHtml = "<div style='padding:20px 20px 0 20px'>" +
                "<p>" +
                "<label>" +
                "链接： " +
                "" +
                "<input " +
                "class='ke-video-url ke-input' style='width:410px;" +
                MIDDLE + "'/>" +
                "</label>" +
                "</p>" +
                "<table " +
                "style='margin:10px 0 5px  40px;width:400px;'>" +
                "<tr><td>" +
                "<label>宽度： " +
                " " +
                "<input " +
                " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
                " data-warning='宽度请输入正整数' " +
                "class='ke-video-width ke-input' " +
                "style='width:60px;margin-left:2px;" +
                MIDDLE + "' " +
                "value='"
                + DTIP + "'/> 像素" +
                "</label>" +
                "</td>" +
                "<td>" +
                "<label> 高度： " +
                "" +
                " <input " +
                " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
                " data-warning='高度请输入正整数' " +
                "class='ke-video-height ke-input' style='width:60px;" +
                MIDDLE + "' value='"
                + DTIP + "'/> 像素" +
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
                "<input " +
                "" +
                " data-verify='^\\d+$' " +
                " data-warning='间距请输入非负整数' " +
                "class='ke-video-margin ke-input' style='width:60px;" +
                MIDDLE + "' value='"
                + 5 + "'/> 像素" +
                "</label>" +
                "</td></tr>" +
                "</table>" +
                "</div>",

                footHtml = "<a " +
                    "class='ke-video-ok ke-button' " +
                    "style='margin-left:40px;margin-right:20px;'>确定</button> " +
                    "<a class='ke-video-cancel ke-button'>取消</a>",
                flashRules = ["img." + CLS_VIDEO];


            function BangPaiVideo(editor) {
                BangPaiVideo.superclass.constructor.apply(this, arguments);
            }

            S.extend(BangPaiVideo, Flash, {
                _config:function() {
                    var self = this,
                        editor = self.editor,
                        cfg = editor.cfg.pluginConfig;
                    self._cls = CLS_VIDEO;
                    self._type = TYPE_VIDEO;
                    self._title = "视频属性";
                    self._bodyHtml = bodyHtml;
                    self._footHtml = footHtml;
                    self._contentCls = "ke-toolbar-video";
                    self._tip = "插入视频";
                    self._contextMenu = contextMenu;
                    self._flashRules = flashRules;
                    self.urlCfg = cfg["bangpai-video"] &&
                        cfg["bangpai-video"].urlCfg;
                    self._urlTip = "支持 土豆，优酷，ku6 视频分享";
                },
                _initD:function() {
                    var self = this,
                        editor = self.editor,
                        d = self.d,
                        el = d.el;
                    self.dUrl = el.one(".ke-video-url");
                    self.dAlign = KE.Select.decorate(el.one(".ke-video-align"));
                    self.dMargin = el.one(".ke-video-margin");
                    self.dWidth = el.one(".ke-video-width");
                    self.dHeight = el.one(".ke-video-height");
                    var action = el.one(".ke-video-ok"),
                        cancel = el.one(".ke-video-cancel");
                    action.on("click", self._gen, self);
                    cancel.on("click", function() {
                        d.hide();
                    });
                    KE.Utils.placeholder(self.dUrl, self._urlTip);
                },

                _getDInfo:function() {

                    var self = this,
                        url = self.dUrl.val(),p = getProvider(url);
                    if (!p) {
                        alert("不支持该链接来源!");
                    } else {
                        var re = p.detect(url);
                        if (!re) {
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

                _gen:function() {
                    var self = this,
                        url = self.dUrl.val(),
                        urlCfg = self.urlCfg;
                    if (urlCfg) {
                        for (var i = 0; i < urlCfg.length; i++) {
                            var c = urlCfg[i];
                            if (c.reg.test(url)) {
                                self.d.loading();
                                BangPaiVideo.dynamicUrl.origin = url;
                                BangPaiVideo.dynamicUrl.instance = self;
                                setTimeout(function() {

                                    S.getScript(
                                        c.url
                                            //("/json.js?t=" + new Date())
                                            .replace(/@url@/,
                                            //"X"
                                            encodeURIComponent(url)
                                            )
                                            .replace(/@callback@/,
                                            encodeURIComponent("KISSY.Editor.BangPaiVideo.dynamicUrl"))
                                        //.replace(/@rand@/,
                                        //(new Date().valueOf()))
                                        );
                                    //ie 必须延迟处理？？
                                }, 30);
                                return;
                            }
                        }
                    }
                    BangPaiVideo.superclass._gen.call(self);
                },

                _dynamicUrlPrepare:function(re) {
                    var self = this;
                    self.dUrl.val(re);
                    self.d.unloading();
                    BangPaiVideo.superclass._gen.call(self);
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
                        if (f.css("width")) {
                            self.dWidth.val(parseInt(f.css("width")));
                        }
                        if (f.css("height")) {
                            self.dHeight.val(parseInt(f.css("height")));
                        }
                    } else {
                        KE.Utils.resetInput(self.dUrl);
                        self.dAlign.val("");
                        self.dMargin.val("5");
                        self.dWidth.val(DTIP);
                        self.dHeight.val(DTIP);
                    }
                }
            });
            BangPaiVideo.dynamicUrl = function(origin, re) {
                if (S.trim(origin) != S.trim(BangPaiVideo.dynamicUrl.origin)) return;
                BangPaiVideo.dynamicUrl.instance._dynamicUrlPrepare(re);
            };
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