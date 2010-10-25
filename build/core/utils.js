/**
 * modified from ckeditor,common utils for kissy editor
 * @modifier: <yiminghe@gmail.com>
 */
KISSY.Editor.add("utils", function(KE) {

    var S = KISSY,
        Node = S.Node,
        DOM = S.DOM,
        UA = S.UA,
        Event = S.Event;
    KE.Utils = {

        debugUrl:function (url) {
            var debug = S.Config.debug;
            if (!debug) return url.replace(/\.(js|css)/i, "-min.$1");
            if (debug === "dev") {
                return  "../src/" + url;
            }
            return  url;
        }
        ,
        /**
         * 懒惰一下
         * @param obj
         * @param before
         * @param after
         */
        lazyRun:function(obj, before, after) {
            var b = obj[before],a = obj[after];
            obj[before] = function() {
                b.apply(this, arguments);
                obj[before] = obj[after];
                return a.apply(this, arguments);
            };
        }
        ,

        getXY:function(x, y, srcDoc, destDoc) {
            var currentWindow = srcDoc.defaultView || srcDoc.parentWindow;

            //x,y相对于当前iframe文档,防止当前iframe有滚动条
            x -= DOM.scrollLeft(currentWindow);
            y -= DOM.scrollTop(currentWindow);
            if (destDoc) {
                var refWindow = destDoc.defaultView || destDoc.parentWindow;
                if (currentWindow != refWindow && currentWindow.frameElement) {
                    //note:when iframe is static ,still some mistake
                    var iframePosition = DOM._4e_getOffset(currentWindow.frameElement, destDoc);
                    x += iframePosition.left;
                    y += iframePosition.top;
                }
            }
            return {left:x,top:y};
        }
        ,

        tryThese : function() {

            var returnValue;
            for (var i = 0, length = arguments.length; i < length; i++) {
                var lambda = arguments[i];
                try {
                    returnValue = lambda();
                    break;
                }
                catch (e) {
                }
            }
            return returnValue;
        }
        ,
        arrayCompare: function(arrayA, arrayB) {
            if (!arrayA && !arrayB)
                return true;

            if (!arrayA || !arrayB || arrayA.length != arrayB.length)
                return false;

            for (var i = 0; i < arrayA.length; i++) {
                if (arrayA[ i ] !== arrayB[ i ])
                    return false;
            }

            return true;
        }
        ,
        getByAddress : function(doc, address, normalized) {
            var $ = doc.documentElement;

            for (var i = 0; $ && i < address.length; i++) {
                var target = address[ i ];

                if (!normalized) {
                    $ = $.childNodes[ target ];
                    continue;
                }

                var currentIndex = -1;

                for (var j = 0; j < $.childNodes.length; j++) {
                    var candidate = $.childNodes[ j ];

                    if (normalized === true &&
                        candidate.nodeType == 3 &&
                        candidate.previousSibling &&
                        candidate.previousSibling.nodeType == 3) {
                        continue;
                    }

                    currentIndex++;

                    if (currentIndex == target) {
                        $ = candidate;
                        break;
                    }
                }
            }

            return $ ? new Node($) : null;
        }
        ,

        clearAllMarkers:function(database) {
            for (var i in database)
                database[i]._4e_clearMarkers(database, true);
        }
        ,
        htmlEncodeAttr : function(text) {
            return text.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/, '&gt;');
        }
        ,
        ltrim:function(str) {
            return str.replace(/^\s+/, "");
        }
        ,

        rtrim:function(str) {
            return str.replace(/\s+$/, "");
        }
        ,
        trim:function(str) {
            return this.ltrim(this.rtrim(str));
        }
        ,
        mix:function() {
            var r = {};
            for (var i = 0; i < arguments.length; i++) {
                var ob = arguments[i];
                r = S.mix(r, ob);
            }
            return r;
        }
        ,
        isCustomDomain : function() {
            if (!UA.ie)
                return false;

            var domain = document.domain,
                hostname = window.location.hostname;

            return domain != hostname &&
                domain != ( '[' + hostname + ']' );	// IPv6 IP support (#5434)
        },

        duplicateStr:function(str, loop) {
            return new Array(loop + 1).join(str);
        },
        /**
         * Throttles a call to a method based on the time between calls.
         * @method throttle
         * @for YUI
         * @param fn {function} The function call to throttle.
         * @param ms {int} The number of milliseconds to throttle the method call. Defaults to 150
         * @return {function} Returns a wrapped function that calls fn throttled.
         * @since 3.1.0
         */

        /*! Based on work by Simon Willison: http://gist.github.com/292562 */

        throttle : function(fn, scope, ms) {
            ms = ms || 150;

            if (ms === -1) {
                return (function() {
                    fn.apply(scope, arguments);
                });
            }

            var last = (new Date()).getTime();

            return (function() {
                var now = (new Date()).getTime();
                if (now - last > ms) {
                    last = now;
                    fn.apply(scope, arguments);
                }
            });
        },
        buffer : function(fn, scope, ms) {
            ms = ms || 0;
            var timer = null;
            return (function() {
                timer && clearTimeout(timer);
                var args = arguments;
                timer = setTimeout(function() {
                    return fn.apply(scope, args);
                }, ms);
            });
        },
        isNumber:function(n) {
            return /^\d+(.\d+)?$/.test(S.trim(n));
        },
        verifyInputs:function(inputs, warn) {
            for (var i = 0; i < inputs.length; i++) {
                var input = DOM._4e_wrap(inputs[i]),
                    v = S.trim(input.val()),
                    verify = input.attr("data-verify"),
                    warning = input.attr("data-warning");
                if (verify &&
                    !new RegExp(verify).test(v)) {
                    alert(warning);
                    return;
                }
            }
            return true;
        },
        sourceDisable:function(editor, plugin) {
            editor.on("sourcemode", plugin.disable, plugin);
            editor.on("wysiwygmode", plugin.enable, plugin);
        },
        resetInput:function(inp) {
            var placeholder = inp.attr("placeholder");
            if (placeholder && !UA.webkit) {
                inp.val(placeholder);
                inp.addClass("ke-input-tip");
            } else if (UA.webkit) {
                inp.val("");
            }
        },

        placeholder:function(inp, tip) {
            inp.attr("placeholder", tip);
            if (UA.webkit) {
                return;
            }
            inp.on("blur", function() {
                if (!S.trim(inp.val())) {
                    inp.val(tip);
                    inp.addClass("ke-input-tip");
                }
            });
            inp.on("focus", function() {
                if (S.trim(inp.val()) == tip) {
                    inp.val("");
                }
                inp.removeClass("ke-input-tip");
            });
        },
        clean:function(node) {
            node = node[0] || node;
            var cs = S.makeArray(node.childNodes);
            for (var i = 0; i < cs.length; i++) {
                var c = cs[i];
                if (c.nodeType == KE.NODE.NODE_TEXT && !S.trim(c.nodeValue)) {
                    node.removeChild(c);
                }
            }
        },
        /**
         * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode : function(value) {
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded text
         */
        htmlDecode : function(value) {
            return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },
        equalsIgnoreCase:function(str1, str2) {
            return str1.toLowerCase() == str2.toLowerCase();
        },

        normParams:function (params) {
            params = S.clone(params);
            for (var p in params) {
                if (params.hasOwnProperty(p)) {
                    var v = params[p];
                    if (S.isFunction(v)) {
                        params[p] = v();
                    }
                }
            }
            return params;
        },

        doFormUpload : function(o, ps, url) {
            var id = S.guid("form-upload-");
            var frame = document.createElement('iframe');
            frame.id = id;
            frame.name = id;
            frame.className = 'ke-hidden';
            if (UA.ie) {
                frame.src = "javascript:false";
            }
            document.body.appendChild(frame);

            if (UA.ie) {
                document.frames[id].name = id;
            }

            var form = DOM._4e_unwrap(o.form),
                buf = {
                    target: form.target,
                    method: form.method,
                    encoding: form.encoding,
                    enctype: form.enctype,
                    action: form.action
                };
            form.target = id;
            form.method = 'POST';
            form.enctype = form.encoding = 'multipart/form-data';
            if (url) {
                form.action = url;
            }

            var hiddens, hd;
            if (ps) { // add dynamic params
                hiddens = [];
                ps = KE.Utils.normParams(ps);
                for (var k in ps) {
                    if (ps.hasOwnProperty(k)) {
                        hd = document.createElement('input');
                        hd.type = 'hidden';
                        hd.name = k;
                        hd.value = ps[k];
                        form.appendChild(hd);
                        hiddens.push(hd);
                    }
                }
            }

            function cb() {
                var r = {  // bogus response object
                    responseText : '',
                    responseXML : null
                };

                r.argument = o ? o.argument : null;

                try { //
                    var doc;
                    if (UA.ie) {
                        doc = frame.contentWindow.document;
                    } else {
                        doc = (frame.contentDocument || window.frames[id].document);
                    }
                    if (doc && doc.body) {
                        r.responseText = doc.body.innerHTML;
                    }
                    if (doc && doc.XMLDocument) {
                        r.responseXML = doc.XMLDocument;
                    } else {
                        r.responseXML = doc;
                    }
                }
                catch(e) {
                    // ignore
                }

                Event.remove(frame, 'load', cb);
                o.callback && o.callback(r);

                setTimeout(function() {
                    DOM._4e_remove(frame);
                }, 100);
            }

            Event.on(frame, 'load', cb);
            form.submit();

            form.target = buf.target;
            form.method = buf.method;
            form.enctype = buf.enctype;
            form.encoding = buf.encoding;
            form.action = buf.action;

            if (hiddens) { // remove dynamic params
                for (var i = 0, len = hiddens.length; i < len; i++) {
                    DOM._4e_remove(hiddens[i]);
                }
            }
        }
    };


});
