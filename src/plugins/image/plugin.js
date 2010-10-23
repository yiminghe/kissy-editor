/**
 * insert image for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("image", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        DOM = S.DOM,
        UA = S.UA,
        JSON = S.JSON,
        Node = S.Node,
        Event = S.Event,
        TYPE_IMG = 'image',
        BubbleView = KE.BubbleView,
        Overlay = KE.SimpleOverlay,
        TIP = "http://",
        DTIP = "自动",
        MARGIN_DEFAULT = 0;

    //重新采用form提交，不采用flash，国产浏览器很多问题

    if (!KE.ImageInserter) {
        (function() {

            var checkImg = function (node) {
                return node._4e_name() === 'img' &&
                    (!/(^|\s+)ke_/.test(node[0].className)) &&
                    node;
            };

            function ImageInserter(cfg) {
                ImageInserter.superclass.constructor.call(this, cfg);
                this._init();
            }

            var TripleButton = KE.TripleButton,
                bodyHtml = "<div class='ke-image-wrap'>" +
                    "<ul class='ke-tabs ks-clear'>" +
                    "<li rel='remote'>" +
                    "网络图片" +
                    "</li>" +
                    "<li rel='local'>" +
                    "本地上传" +
                    "</li>" +
                    "</ul>" +
                    "<div style='" +
                    "padding:12px 20px 5px 20px;'>" +
                    "<div class='ke-image-tabs-content-wrap' " +
                    ">" +
                    "<div>" +
                    "<label>" +
                    "<span " +
                    "class='ke-image-title'" +
                    ">" +
                    "图片地址： " +
                    "</span>" +
                    "<input " +
                    " data-verify='^https?://[^\\s]+$' " +
                    " data-warning='网址格式为：http://' " +
                    "class='ke-img-url ke-input' " +
                    "style='width:390px;' " +
                    "value='" + TIP + "'/>" +
                    "</label>" +
                    "</div>" +
                    "<div style='position:relative;'>" +
                    "<form class='ke-img-upload-form'>" +
                    "<p>" +
                    "<input class='ke-input ke-img-local-url' " +
                    "readonly='readonly' " +
                    "style='margin-right: 15px; " +
                    "vertical-align: middle; " +
                    "width: 368px;" +
                    "color:#969696;'/>" +
                    "<a " +
                    "style='padding:3px 11px;" +
                    "position:absolute;" +
                    "left:390px;" +
                    "top:0px;" +
                    "z-index:1;' " +
                    "class='ke-image-up ke-button'>浏览...</a>" +
                    "</p>" +
                    "<div class='ke-img-up-extraHtml'>" +
                    "</div>" +
                    "</form>" +
                    "</div>" +
                    "</div>" +
                    "<table " +
                    "style='width:100%;margin-top:8px;' " +
                    "class='ke-img-setting'>" +
                    "<tr>" +
                    "<td>" +
                    "<label>" +
                    "宽度： " +
                    "<input " +
                    " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
                    " data-warning='宽度请输入正整数' " +
                    "class='ke-img-width ke-input' style='width:60px' value='" +
                    DTIP + "'/> 像素 </label>" +
                    "</td>" +
                    "<td><label>" +
                    "高度： " +
                    "<input " +
                    " data-verify='^(" + DTIP + "|((?!0$)\\d+))$' " +
                    " data-warning='高度请输入正整数' " +
                    "class='ke-img-height ke-input' style='width:60px' " +
                    "value='" + DTIP + "'/> 像素 </label>" +
                    "</td>" +

                    "</tr>" +
                    "<tr>" +
                    "<td>" +
                    "<label>" +
                    "对齐：" +
                    "<select class='ke-img-align'>" +
                    "<option value='none'>无</option>" +
                    "<option value='left'>左对齐</option>" +
                    "<option value='right'>右对齐</option>" +
                    "</select>" +
                    "</label>" +
                    "</td>" +
                    "<td><label>" +
                    "间距： " +
                    "<input " +
                    "" +
                    " data-verify='^\\d+$' " +
                    " data-warning='间距请输入非负整数' " +
                    "class='ke-img-margin ke-input' style='width:60px' value='"
                    + MARGIN_DEFAULT + "'/> 像素" +
                    "</label>" +
                    "</td>" +
                    "</tr>" +
                    "</table>" +
                    "</div>" +
                    "</div>",
                footHtml = "<a class='ke-img-insert ke-button' " +
                    "style='margin-right:30px;'>确定</a> " +
                    "<a  class='ke-img-cancel ke-button'>取消</a>";

            ImageInserter.ATTRS = {
                editor:{}
            };
            var contextMenu = {
                "图片属性":function(editor) {
                    var selection = editor.getSelection(),
                        startElement = selection && selection.getStartElement(),
                        flash = checkImg(startElement),
                        flashUI = editor._toolbars[TYPE_IMG];
                    if (flash) {
                        flashUI.show(null, flash);
                    }
                }
            };
            S.extend(ImageInserter, S.Base, {
                _init:function() {
                    var self = this,
                        editor = self.get("editor"),
                        toolBarDiv = editor.toolBarDiv,
                        myContexts = {};
                    self.editor = editor;
                    self.el = new TripleButton({
                        contentCls:"ke-toolbar-image",
                        title:"插入图片",
                        container:toolBarDiv
                    });
                    self.el.on("offClick", self.show, self);
                    Event.on(editor.document, "dblclick", self._dblclick, self);
                    KE.Utils.lazyRun(self, "_prepare", "_real");
                    editor._toolbars = editor._toolbars || {};
                    editor._toolbars[TYPE_IMG] = self;
                    if (contextMenu) {
                        for (var f in contextMenu) {
                            (function(f) {
                                myContexts[f] = function() {
                                    contextMenu[f](editor);
                                }
                            })(f);
                        }
                    }
                    KE.ContextMenu.register(editor.document, {
                        rules:[checkImg],
                        width:"120px",
                        funcs:myContexts
                    });


                    BubbleView.attach({
                        pluginName:TYPE_IMG,
                        pluginInstance:self
                    });

                    KE.Utils.sourceDisable(editor, self);
                },
                disable:function() {
                    this.el.disable();
                },
                enable:function() {
                    this.el.boff();
                },
                _dblclick:function(ev) {
                    var self = this,
                        t = new Node(ev.target);
                    if (checkImg(t)) {
                        self.show(null, t);
                        ev.halt();
                    }
                },
                _prepare:function() {
                    var self = this,
                        editor = self.get("editor"),
                        warning = "请点击浏览上传图片",
                        cfg = (editor.cfg["pluginConfig"]["image"] || {})["upload"] || null;

                    self.d = new Overlay({
                        title:"图片",//属性",
                        mask:true
                    });
                    var d = self.d;
                    d.body.html(bodyHtml);
                    d.foot.html(footHtml);
                    var content = d.el,
                        cancel = content.one(".ke-img-cancel"),
                        ok = content.one(".ke-img-insert"),
                        uploadForm = content.one(".ke-img-upload-form"),
                        imgLocalUrl = content.one(".ke-img-local-url"),
                        tab = new KE.Tabs({
                            tabs:content.one("ul.ke-tabs"),
                            contents:content.one("div.ke-image-tabs-content-wrap")
                        }),
                        ke_image_title = content.one(".ke-image-title"),
                        verifyInputs = KE.Utils.verifyInputs,
                        commonSettingTable = d.el.one(".ke-img-setting");

                    self.tab = tab;
                    imgLocalUrl.val(warning);
                    self.imgUrl = content.one(".ke-img-url");
                    self.imgHeight = content.one(".ke-img-height");
                    self.imgWidth = content.one(".ke-img-width");
                    self.imgAlign = KE.Select.decorate(content.one(".ke-img-align"));
                    self.imgMargin = content.one(".ke-img-margin");
                    cancel.on("click", function(ev) {
                        self.d.hide();
                        ev.halt();
                    });

                    ok.on("click", function() {
                        if (tab.activate() == "local" && cfg) {

                            if (!verifyInputs(commonSettingTable.all("input")))
                                return;
                            if (imgLocalUrl.val() == warning) {
                                alert("请先选择文件!");
                                return;
                            }
                            KE.Utils.doFormUpload({
                                form:uploadForm,
                                callback:function(r) {
                                    var data = S.trim(r.responseText)
                                        .replace(/\r|\n/g, "");
                                    d.unloading();
                                    //imgLocalUrl.val(warning);
                                    try {
                                        data = JSON.parse(data);
                                    } catch(e) {
                                        S.log(data);
                                        data = {error:"服务器出错，请重试"};
                                    }
                                    if (data.error) {
                                        alert(data.error);
                                        return;
                                    }
                                    self.imgUrl.val(data.imgUrl);
                                    self._insert();
                                }
                            }, cfg.serverParams, cfg.serverUrl);
                            d.loading();

                        } else {
                            if (! verifyInputs(content.all("input")))
                                return;
                            self._insert();

                        }
                    });

                    if (cfg) {
                        if (cfg.extraHtml) {
                            content.one(".ke-img-up-extraHtml")
                                .html(cfg.extraHtml);
                        }
                        var ke_image_up = content.one(".ke-image-up"),
                            sizeLimit = cfg && cfg.sizeLimit,
                            fileInput = new Node("<input " +
                                "type='file' " +
                                "style='position:absolute;" +
                                "cursor:pointer;" +
                                "left:" +
                                (UA.ie ? "360" : "369") +
                                "px;" +
                                "z-index:2;" +
                                "top:0px;" +
                                "height:26px;' " +
                                "size='1' " +
                                "name='" + (cfg.fileInput || "Filedata") + "'/>").insertAfter(imgLocalUrl);
                        if (sizeLimit)
                            warning = "单张图片容量不超过 " + (sizeLimit / 1000) + " M";
                        imgLocalUrl.val(warning);
                        fileInput.css({
                            opacity:0
                        });

                        fileInput.on("mouseenter", function() {
                            ke_image_up.addClass("ke-button-hover");
                        });
                        fileInput.on("mouseleave", function() {
                            ke_image_up.removeClass("ke-button-hover");
                        });
                        fileInput.on("change", function() {
                            imgLocalUrl.val(fileInput.val());
                        })


                    }
                    else {
                        tab.remove("local");
                    }

                },
                _updateTip:function(tipurl, img) {
                    var src = img.attr("src");
                    tipurl.html(src);
                    tipurl.attr("href", src);
                },

                _real:function() {
                    this.d.show();
                },

                _insert:function() {
                    var self = this,
                        url = self.imgUrl.val(),
                        height = parseInt(self.imgHeight.val()),
                        editor = self.get("editor"),
                        width = parseInt(self.imgWidth.val()),
                        align = self.imgAlign.val(),
                        margin = parseInt(self.imgMargin.val()),
                        style = '';
                    if (height) {
                        style += "height:" + height + "px;";
                    }
                    if (width) {
                        style += "width:" + width + "px;";
                    }
                    if (align) {
                        style += "float:" + align + ";";
                    }
                    if (!isNaN(margin)) {
                        style += "margin:" + margin + "px;";
                    }
                    if (style) {
                        style = " style='" + style + "' ";
                    }
                    var img = new Node("<img " +
                        style +
                        "src='" +
                        url +
                        "' alt='' />", null, editor.document);

                    img = editor.insertElement(img, function(el) {
                        el.on("abort error", function() {
                            el.detach();
                            //ie6 手动设置，才会出现红叉
                            el[0].src = url;
                        });
                    });
                    if (self._selectedEl) {
                        editor.getSelection().selectElement(img);
                    }
                    self.d.hide();
                    editor.notifySelectionChange();
                },

                _updateD:function(_selectedEl) {
                    var self = this,active = "remote";
                    self._selectedEl = _selectedEl;

                    if (_selectedEl) {
                        self.imgUrl.val(_selectedEl.attr("src"));
                        self.imgHeight.val(_selectedEl.height());
                        self.imgWidth.val(_selectedEl.width());
                        self.imgAlign.val(_selectedEl.css("float") || "none");
                        var margin = parseInt(_selectedEl._4e_style("margin"))
                            || 0;
                        self.imgMargin.val(margin);
                    } else {
                        active = "local";
                        self.imgUrl.val(TIP);
                        self.imgHeight.val(DTIP);
                        self.imgWidth.val(DTIP);
                        self.imgAlign.val("none");
                        self.imgMargin.val(MARGIN_DEFAULT);
                    }
                    self.tab.activate(active);
                },
                show:function(ev, _selectedEl) {
                    var self = this;
                    self._prepare();
                    self._updateD(_selectedEl);
                }
            });
            KE.ImageInserter = ImageInserter;


            var tipHtml = ' '
                + ' <a class="ke-bubbleview-url" target="_blank" href="#"></a> - '
                + '    <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> - '
                + '    <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>'
                + '';

            (function(pluginName, label, checkFlash) {

                BubbleView.register({
                    pluginName:pluginName,
                    func:checkFlash,
                    init:function() {
                        var bubble = this,
                            el = bubble.el;
                        el.html(label + tipHtml);
                        var tipurl = el.one(".ke-bubbleview-url"),
                            tipchange = el.one(".ke-bubbleview-change"),
                            tipremove = el.one(".ke-bubbleview-remove");
                        //ie focus not lose
                        tipchange._4e_unselectable();
                        tipurl._4e_unselectable();
                        tipremove._4e_unselectable();
                        tipchange.on("click", function(ev) {
                            bubble._plugin.show(null, bubble._selectedEl);
                            ev.halt();
                        });
                        tipremove.on("click", function(ev) {
                            var flash = bubble._plugin;
                            if (UA.webkit) {
                                var r = flash.editor.getSelection().getRanges();
                                r && r[0] && (r[0].collapse(true) || true) && r[0].select();
                            }
                            bubble._selectedEl._4e_remove();
                            bubble.hide();
                            flash.editor.notifySelectionChange();
                            ev.halt();
                        });
                        /*
                         位置变化
                         */
                        bubble.on("afterVisibleChange", function(ev) {
                            var v = ev.newVal,
                                a = bubble._selectedEl,
                                flash = bubble._plugin;
                            if (!v || !a)return;
                            flash._updateTip(tipurl, a);
                        });
                    }
                });
            })(TYPE_IMG, "图片网址： ", checkImg);
        })();
    }

    editor.addPlugin(function() {
        new KE.ImageInserter({
            editor:editor
        });

    });
});