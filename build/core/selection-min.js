KISSY.Editor.add("selection",function(r){function v(b){this.document=this.document=b;this._={cache:{}};if(s){var a=this.getNative().createRange();if(!a||a.item&&a.item(0).ownerDocument!=b||a.parentElement&&a.parentElement().ownerDocument!=b)this.isInvalid=k}}function G(b){b=new v(b);return!b||b.isInvalid?A:b}function L(b){var a=b.document,c=new m(a.body),d=new m(a.documentElement);if(B.ie){B.ieEngine<8&&d.on("click",function(h){(new m(h.target))._4e_name()==="html"&&b.getSelection().getNative().createRange().select()});
var e,f,g=1;d.on("mousedown",function(){g=0});d.on("mouseup",function(){g=1});c.on("focusin",function(h){if((new m(h.target))._4e_name()=="body")if(e){try{g&&e.select()}catch(p){}e=A}});c.on("focus",function(){f=k;q()});c.on("beforedeactivate",function(h){if(!h.relatedTarget){f=C;g=1}});D.on(t._4e_getWin(a),"blur",function(){a&&a.selection.empty()});c.on("mousedown",function(){i()});c.on("mouseup",function(){f=k;setTimeout(function(){q(k)},0)});var i=function(){f=C},q=function(h){if(f){var p=b.document,
n=b.getSelection(),H=n&&n.getType(),E=n&&p.selection;if(h&&E&&H==o.SELECTION_NONE)if(!p.queryCommandEnabled("InsertImage")){setTimeout(function(){q(k)},50);return}var I;if(!(E&&H==o.SELECTION_TEXT&&(I=t._4e_name(n.getStartElement()))&&I in{input:1,textarea:1})){e=E&&E.createRange();b._monitor()}}};c.on("keydown",i);c.on("keyup",function(){f=k;q()});D.on(a,"selectionchange",q)}else{D.on(a,"mouseup",b._monitor,b);D.on(a,"keyup",b._monitor,b)}var u={table:1,pre:1},y=/\s*<(p|div|address|h\d|center)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\1>)?(?=\s*$|<\/body>)/gi,
z=r.Walker.whitespaces(k);b.on("selectionChange",function(h){var p=h.path;h=(h=h.selection)&&h.getRanges()[0];if(!(!h||!h.collapsed||p.block))if(p.blockLimit._4e_name()=="body"){p=h.fixBlock(k,"p");if(p._4e_outerHtml().match(y)){var n=p._4e_next(z);if(n&&n[0].nodeType==l.NODE_ELEMENT&&!u[n._4e_name()]){h.moveToElementEditablePosition(n);p._4e_remove()}else if((n=p._4e_previous(z))&&n[0].nodeType==l.NODE_ELEMENT&&!u[n._4e_name()]){h.moveToElementEditablePosition(n,n._4e_outerHtml().match(y)?C:k);p._4e_remove()}}h.select();
s||b.notifySelectionChange()}})}r.SELECTION={SELECTION_NONE:1,SELECTION_TEXT:2,SELECTION_ELEMENT:3};var k=true,C=false,A=null,w=KISSY,B=w.UA,t=w.DOM,D=w.Event,m=w.Node,o=r.SELECTION,F=r.RANGE,l=r.NODE,s=!window.getSelection,j=r.Walker,x=r.Range,J={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};w.augment(v,{getNative:!s?function(){var b=this._.cache;return b.nativeSel||(b.nativeSel=t._4e_getWin(this.document).getSelection())}:
function(){var b=this._.cache;return b.nativeSel||(b.nativeSel=this.document.selection)},getType:!s?function(){var b=this._.cache;if(b.type)return b.type;var a=o.SELECTION_TEXT,c=this.getNative();if(c){if(c.rangeCount==1){c=c.getRangeAt(0);var d=c.startContainer;if(d==c.endContainer&&d.nodeType==l.NODE_ELEMENT&&c.endOffset-c.startOffset===1&&J[d.childNodes[c.startOffset].nodeName.toLowerCase()])a=o.SELECTION_ELEMENT}}else a=o.SELECTION_NONE;return b.type=a}:function(){var b=this._.cache;if(b.type)return b.type;
var a=o.SELECTION_NONE;try{var c=this.getNative(),d=c.type;if(d=="Text")a=o.SELECTION_TEXT;if(d=="Control")a=o.SELECTION_ELEMENT;if(c.createRange().parentElement)a=o.SELECTION_TEXT}catch(e){}return b.type=a},getRanges:s?function(){var b=function(a,c){a=a.duplicate();a.collapse(c);for(var d=a.parentElement(),e=d.childNodes,f,g=0;g<e.length;g++){var i=e[g];if(i.nodeType==l.NODE_ELEMENT){f=a.duplicate();f.moveToElementText(i);i=f.compareEndPoints("StartToStart",a);var q=f.compareEndPoints("EndToStart",
a);f.collapse();if(i>0)break;else if(!i||q==1&&i==-1)return{container:d,offset:g};else if(!q)return{container:d,offset:g+1};f=A}}if(!f){f=a.duplicate();f.moveToElementText(d);f.collapse(C)}f.setEndPoint("StartToStart",a);f=String(f.text).replace(/\r\n|\r/g,"\n").length;try{for(;f>0;)f-=e[--g].nodeValue.length}catch(u){f=0}return f===0?{container:d,offset:g}:{container:e[g],offset:-f}};return function(){var a=this._.cache;if(a.ranges)return a.ranges;var c=this.getNative(),d=c&&c.createRange(),e=this.getType();
if(!c)return[];if(e==o.SELECTION_TEXT){c=new x(this.document);e=b(d,k);c.setStart(new m(e.container),e.offset);e=b(d);c.setEnd(new m(e.container),e.offset);return a.ranges=[c]}else if(e==o.SELECTION_ELEMENT){a=a.ranges=[];for(e=0;e<d.length;e++){var f=d.item(e),g=f.parentNode,i=0;for(c=new x(this.document);i<g.childNodes.length&&g.childNodes[i]!=f;i++);c.setStart(new m(g),i);c.setEnd(new m(g),i+1);a.push(c)}return a}return a.ranges=[]}}():function(){var b=this._.cache;if(b.ranges)return b.ranges;
var a=[],c=this.getNative();if(!c)return[];for(var d=0;d<c.rangeCount;d++){var e=c.getRangeAt(d),f=new x(this.document);f.setStart(new m(e.startContainer),e.startOffset);f.setEnd(new m(e.endContainer),e.endOffset);a.push(f)}return b.ranges=a},getStartElement:function(){var b=this._.cache;if(b.startElement!==undefined)return b.startElement;var a,c=this.getNative();switch(this.getType()){case o.SELECTION_ELEMENT:return this.getSelectedElement();case o.SELECTION_TEXT:var d=this.getRanges()[0];if(d)if(!d.collapsed){for(d.optimize();k;){a=
d.startContainer;if(d.startOffset==(a[0].nodeType===l.NODE_ELEMENT?a[0].childNodes.length:a[0].nodeValue.length)&&!a._4e_isBlockBoundary())d.setStartAfter(a);else break}a=d.startContainer;if(a[0].nodeType!=l.NODE_ELEMENT)return a.parent();a=new m(a[0].childNodes[d.startOffset]);if(!a[0]||a[0].nodeType!=l.NODE_ELEMENT)return d.startContainer;for(d=a[0].firstChild;d&&d.nodeType==l.NODE_ELEMENT;){a=new m(d);d=d.firstChild}return a}if(s){d=c.createRange();d.collapse(k);a=d.parentElement()}else if((a=
c.anchorNode)&&a.nodeType!=l.NODE_ELEMENT)a=a.parentNode}return b.startElement=a?t._4e_wrap(a):A},getSelectedElement:function(){var b=this,a,c=b._.cache;if(c.selectedElement!==undefined)return c.selectedElement;if(s){a=b.getNative().createRange();a=a.item&&a.item(0)}a||(a=function(){for(var d=b.getRanges()[0],e,f,g=2;g&&!((e=d.getEnclosedNode())&&e[0].nodeType==l.NODE_ELEMENT&&J[e._4e_name()]&&(f=e));g--)d.shrink(F.SHRINK_ELEMENT);return f&&f[0]}());return c.selectedElement=t._4e_wrap(a)},reset:function(){this._.cache=
{}},selectElement:function(b){var a,c=this.document;if(s)try{a=c.body.createControlRange();a.addElement(b[0]);a.select()}catch(d){a=c.body.createTextRange();a.moveToElementText(b[0]);a.select()}finally{}else{a=c.createRange();a.selectNode(b[0]);b=this.getNative();b.removeAllRanges();b.addRange(a)}this.reset()},selectRanges:function(b){if(s){if(b.length>1){var a=b[b.length-1];b[0].setEnd(a.endContainer,a.endOffset);b.length=1}b[0]&&b[0].select()}else{a=this.getNative();if(!a)return;a.removeAllRanges();
for(var c=0;c<b.length;c++){var d=b[c],e=this.document.createRange(),f=d.startContainer;d.collapsed&&B.gecko&&B.gecko<1.09&&f[0].nodeType==l.NODE_ELEMENT&&!f[0].childNodes.length&&f[0].appendChild(this.document.createTextNode(""));e.setStart(f[0],d.startOffset);e.setEnd(d.endContainer[0],d.endOffset);a.addRange(e)}}this.reset()},createBookmarks2:function(b){for(var a=[],c=this.getRanges(),d=0;d<c.length;d++)a.push(c[d].createBookmark2(b));return a},createBookmarks:function(b,a){var c=[],d=this.document,
e;a=a||this.getRanges();for(var f=a.length,g=0;g<f;g++){c.push(e=a[g].createBookmark(b,k));var i=(b=e.serializable)?w.one("#"+e.startNode,d):e.startNode;e=b?w.one("#"+e.endNode,d):e.endNode;for(var q=g+1;q<f;q++){var u=a[q],y=u.startContainer,z=u.endContainer;t._4e_equals(y,i.parent())&&u.startOffset++;t._4e_equals(y,e.parent())&&u.startOffset++;t._4e_equals(z,i.parent())&&u.endOffset++;t._4e_equals(z,e.parent())&&u.endOffset++}}return c},selectBookmarks:function(b){for(var a=[],c=0;c<b.length;c++){var d=
new x(this.document);d.moveToBookmark(b[c]);a.push(d)}this.selectRanges(a);return this},getCommonAncestor:function(){var b=this.getRanges();return b[0].startContainer._4e_commonAncestor(b[b.length-1].endContainer)},scrollIntoView:function(){var b=this.getStartElement();b&&b._4e_scrollIntoView()},removeAllRanges:function(){var b=this.getNative();if(s)b&&b.clear();else b&&b.removeAllRanges()}});var K={table:1,tbody:1,tr:1},M=j.whitespaces(k),N=/\ufeff|\u00a0/;x.prototype.select=x.prototype.select=!s?
function(){var b=this.startContainer;this.collapsed&&b[0].nodeType==l.NODE_ELEMENT&&!b[0].childNodes.length&&b[0].appendChild(this.document.createTextNode(""));var a=this.document.createRange();a.setStart(b[0],this.startOffset);try{a.setEnd(this.endContainer[0],this.endOffset)}catch(c){if(c.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")>=0){this.collapse(k);a.setEnd(this.endContainer[0],this.endOffset)}else throw c;}b=G(this.document).getNative();b.removeAllRanges();b.addRange(a)}:function(b){var a=
this.collapsed,c,d;if(this.startContainer[0]===this.endContainer[0]&&this.endOffset-this.startOffset==1){var e=this.startContainer[0].childNodes[this.startOffset];if(e.nodeType==l.NODE_ELEMENT){(new v(this.document)).selectElement(new m(e));return}}if(this.startContainer[0].nodeType==l.NODE_ELEMENT&&this.startContainer._4e_name()in K||this.endContainer[0].nodeType==l.NODE_ELEMENT&&this.endContainer._4e_name()in K)this.shrink(F.SHRINK_ELEMENT,k);var f=this.createBookmark();e=f.startNode;var g;if(!a)g=
f.endNode;f=this.document.body.createTextRange();f.moveToElementText(e[0]);f.moveStart("character",1);if(g){b=this.document.body.createTextRange();b.moveToElementText(g[0]);f.setEndPoint("EndToEnd",b);f.moveEnd("character",-1)}else{for(c=e[0].nextSibling;c&&!M(c);)c=c.nextSibling;c=!(c&&c.nodeValue&&c.nodeValue.match(N))&&(b||!e[0].previousSibling||e[0].previousSibling&&t._4e_name(e[0].previousSibling)=="br");d=new m(this.document.createElement("span"));d.html("&#65279;");d.insertBefore(e);c&&t.insertBefore(this.document.createTextNode("\ufeff"),
e)}this.setStartBefore(e);e._4e_remove();if(a){if(c){f.moveStart("character",-1);f.select();this.document.selection.clear()}else f.select();if(d){this.moveToPosition(d,F.POSITION_BEFORE_START);d._4e_remove()}}else{this.setEndBefore(g);g._4e_remove();f.select()}};v.getSelection=G;r.Selection=v;r.Selection=v;j=v.prototype;r.Utils.extern(j,{getNative:j.getNative,getType:j.getType,getRanges:j.getRanges,getStartElement:j.getStartElement,getSelectedElement:j.getSelectedElement,reset:j.reset,selectElement:j.selectElement,
selectRanges:j.selectRanges,createBookmarks2:j.createBookmarks2,createBookmarks:j.createBookmarks,getCommonAncestor:j.getCommonAncestor,scrollIntoView:j.scrollIntoView,selectBookmarks:j.selectBookmarks,removeAllRanges:j.removeAllRanges});r.on("instanceCreated",function(b){L(b.editor)})});
