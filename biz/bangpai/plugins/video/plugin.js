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
                                width:p.width
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