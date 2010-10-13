/**
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
            var bodyHtml = "<div style='padding:20px 20px 0 20px'>" +
                "<p>" +
                "<label>" +
                "链接： " +
                "" +
                "<input " +
                "class='ke-video-url ke-input' style='width:300px'/>" +
                "</label>" +
                "</p>" +
                "<table style='margin:10px 0 5px  40px;width:300px;'>" +
                "<tr><td>" +
                "<label>宽度： " +
                " " +
                "<input " +
                " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
                " data-warning='宽度请输入正整数' " +
                "class='ke-video-width ke-input' style='width:60px' value='"
                + DTIP + "'/> 像素" +
                "</label>" +
                "</td>" +
                "<td>" +
                "<label> 高度： " +
                "" +
                " <input " +
                " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
                " data-warning='高度请输入正整数' " +
                "class='ke-video-height ke-input' style='width:60px' value='"
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
                "class='ke-video-margin ke-input' style='width:60px' value='"
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
                    self._config_dwidth = "400px";
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