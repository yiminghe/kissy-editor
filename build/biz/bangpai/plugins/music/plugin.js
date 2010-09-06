KISSY.Editor.add("bangpai-music", function(editor) {
    var S = KISSY,
        KE = S.Editor,
        Flash = KE.Flash,
        CLS_XIAMI = "ke_xiami",
        TYPE_XIAMI = "bangpai-music",
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
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
            //4 �?flash 的优先级 5 高！
        }}, 4);

    if (!KE.BangPaiMusic) {
        (function() {


            window.bangpai_xiami = function(data) {
                var self = bangpai_xiami.instance;
                self._listSearch(data);
            };
            var bodyHtml = "<div>" +
                "<p>" +
                "<input class='ke-xiami-url' style='width:290px' value='"
                + TIP
                + "'/>" +
                " <button>搜索</button>" +
                "</p>" +
                "<div class='ke-xiami-list'>" +
                "</div>" +
                "</div>",
                footHtml = "";


            function BangPaiMusic(editor) {
                BangPaiMusic.superclass.constructor.apply(this, arguments);
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
                        input = d.el.one(".ke-xiami-url")
                        ;
                    self._xiamia_list = d.el.one(".ke-xiami-list");
                    self._url = "http://www.xiami.com/app/nineteen/search/key/${key}/page/1?random=${random}&callback=bangpai_xiami";
                    action.on("click", function() {
                        var params = {
                            key:encodeURIComponent(input.val()),
                            random:(new Date().valueOf())
                        };
                        var req = self._url.replace(/\${([^}]+)}/g, function(m, m1) {
                            return params[m1]
                        });
                        bangpai_xiami.instance = self;
                        S.getScript(req);
                    }, self);
                },
                _listSearch:function(data) {
                    var self = this,
                        re = data.results,
                        html = "<ul>"
                    for (var i in re) {
                        var r = re[i];
                        html += "<li>" + decodeURIComponent(r.song_name) + "</li>"
                    }
                    html += "</ul>";
                    self._xiamia_list.html(html);
                },
                _updateD : function() {

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
                }
                ,
                _getDHeight:function() {
                    return 33;
                }
            }
                )
                ;
            KE.BangPaiMusic = BangPaiMusic;
        })();
    }
    editor.addPlugin(function() {
        new KE.BangPaiMusic(editor);
    });
},
{
    attach:false,
    requires
        :
        ["flashsupport"]
}
    )
    ;