KISSY.Editor.add("selection",function(o){function A(b){this.document=this.document=b;this._={cache:{}};if(r){var a=this.getNative().createRange();if(!a||a.item&&a.item(0).ownerDocument!=b||a.parentElement&&a.parentElement().ownerDocument!=b)this.isInvalid=j}}function F(b){b=new A(b);return!b||b.isInvalid?C:b}function K(b){function a(h){var i=o.XHTML_DTD;return h._4e_isBlockBoundary()&&i.$empty[h._4e_name()]}var d=b.document,c=new m(d.body),e=new m(d.documentElement);if(u.ie){o.Utils.ieEngine<8&&e.on("click",
function(h){(new m(h.target))._4e_name()==="html"&&b.getSelection().getNative().createRange().select()});var f,g,k=j;e.on("mousedown",function(){k=w});e.on("mouseup",function(){k=j});c.on("focusin",function(h){if((new m(h.target))._4e_name()=="body")if(f){try{k&&f.select()}catch(i){}f=C}});c.on("focus",function(){g=j;q()});c.on("beforedeactivate",function(h){if(!h.relatedTarget){g=w;k=j}});b.on("blur",function(){try{var h=document.documentElement||document.body,i=h.scrollTop,l=h.scrollLeft;d&&d.selection.empty();
h.scrollTop=i;h.scrollLeft=l}catch(G){}});c.on("mousedown",function(){g=w});c.on("mouseup",function(){g=j;setTimeout(function(){q(j)},0)});var q=function(h){if(g){var i=b.document,l=b.getSelection(),G=l&&l.getType(),x=l&&i.selection;if(h&&x&&G==p.SELECTION_NONE)if(!i.queryCommandEnabled("InsertImage")){setTimeout(function(){q(j)},50);return}var y;if(!(x&&x.type&&x.type!="Control"&&(y=x.createRange())&&(y=y.parentElement())&&(y=y.nodeName)&&y.toLowerCase()in{input:1,textarea:1})){f=x&&l.getRanges()[0];
b._monitor()}}};c.on("keydown",function(){g=w});c.on("keyup",function(){g=j;setTimeout(function(){q()},0)})}else{H.on(d,"mouseup",b._monitor,b);H.on(d,"keyup",b._monitor,b)}var s=/\s*<(p|div|address|h\d|center)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;|(<!--[\s\S]*?--\>))?\s*(:?<\/\1>)?(?=\s*$|<\/body>)/gi,D=o.Walker.whitespaces(j),B=function(h){return D(h)&&h&&h[0].nodeType!=8};b.on("selectionChange",function(h){var i=h.path;h=(h=h.selection)&&h.getRanges()[0];if(!(!h||!h.collapsed||i.block)){if(i.blockLimit._4e_name()==
"body"){if((i=h.fixBlock(j,"p"))&&i[0]!=c[0].lastChild)if(i._4e_outerHtml().match(s)){var l=i._4e_next(B);if(l&&l[0].nodeType==n.NODE_ELEMENT&&!a[l]){h.moveToElementEditablePosition(l);i._4e_remove()}else if((l=i._4e_previous(B))&&l[0].nodeType==n.NODE_ELEMENT&&!a[l]){h.moveToElementEditablePosition(l,l._4e_outerHtml().match(s)?w:j);i._4e_remove()}}h.select();b.notifySelectionChange()}i=new o.Range(d);i.moveToElementEditablePosition(c,j);if((new o.ElementPath(i.startContainer)).blockLimit._4e_name()!==
"body"){i=(new m(d.createElement("p"))).appendTo(c);u.ie||i._4e_appendBogus()}}})}o.SELECTION={SELECTION_NONE:1,SELECTION_TEXT:2,SELECTION_ELEMENT:3};var j=true,w=false,C=null,v=KISSY,u=v.UA,t=v.DOM,H=v.Event,m=v.Node,p=o.SELECTION,E=o.RANGE,n=o.NODE,r=u.ie,L=o.Walker,z=o.Range,I={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};v.augment(A,{getNative:!r?function(){var b=this._.cache;return b.nativeSel||(b.nativeSel=
t._4e_getWin(this.document).getSelection())}:function(){var b=this._.cache;return b.nativeSel||(b.nativeSel=this.document.selection)},getType:!r?function(){var b=this._.cache;if(b.type)return b.type;var a=p.SELECTION_TEXT,d=this.getNative();if(d){if(d.rangeCount==1){d=d.getRangeAt(0);var c=d.startContainer;if(c==d.endContainer&&c.nodeType==n.NODE_ELEMENT&&Number(d.endOffset-d.startOffset)==1&&I[c.childNodes[d.startOffset].nodeName.toLowerCase()])a=p.SELECTION_ELEMENT}}else a=p.SELECTION_NONE;return b.type=
a}:function(){var b=this._.cache;if(b.type)return b.type;var a=p.SELECTION_NONE;try{var d=this.getNative(),c=d.type;if(c=="Text")a=p.SELECTION_TEXT;if(c=="Control")a=p.SELECTION_ELEMENT;if(d.createRange().parentElement)a=p.SELECTION_TEXT}catch(e){}return b.type=a},getRanges:r?function(){var b=function(a,d){a=a.duplicate();a.collapse(d);for(var c=a.parentElement(),e=c.childNodes,f,g=0;g<e.length;g++){var k=e[g];if(k.nodeType==n.NODE_ELEMENT){f=a.duplicate();f.moveToElementText(k);k=f.compareEndPoints("StartToStart",
a);var q=f.compareEndPoints("EndToStart",a);f.collapse();if(k>0)break;else if(!k||q==1&&k==-1)return{container:c,offset:g};else if(!q)return{container:c,offset:g+1};f=C}}if(!f){f=a.duplicate();f.moveToElementText(c);f.collapse(w)}f.setEndPoint("StartToStart",a);f=String(f.text).replace(/\r\n|\r/g,"\n").length;try{for(;f>0;)f-=e[--g].nodeValue.length}catch(s){f=0}return f===0?{container:c,offset:g}:{container:e[g],offset:-f}};return function(a){var d=this._.cache;if(d.ranges&&!a)return d.ranges;var c=
this.getNative();a=c&&c.createRange();var e=this.getType();if(!c)return[];if(e==p.SELECTION_TEXT){c=new z(this.document);e=b(a,j);c.setStart(new m(e.container),e.offset);e=b(a);c.setEnd(new m(e.container),e.offset);return d.ranges=[c]}else if(e==p.SELECTION_ELEMENT){d=d.ranges=[];for(e=0;e<a.length;e++){var f=a.item(e),g=f.parentNode,k=0;for(c=new z(this.document);k<g.childNodes.length&&g.childNodes[k]!=f;k++);c.setStart(new m(g),k);c.setEnd(new m(g),k+1);d.push(c)}return d}return d.ranges=[]}}():
function(b){var a=this._.cache;if(a.ranges&&!b)return a.ranges;b=[];var d=this.getNative();if(!d)return[];for(var c=0;c<d.rangeCount;c++){var e=d.getRangeAt(c),f=new z(this.document);f.setStart(new m(e.startContainer),e.startOffset);f.setEnd(new m(e.endContainer),e.endOffset);b.push(f)}return a.ranges=b},getStartElement:function(){var b=this._.cache;if(b.startElement!==undefined)return b.startElement;var a,d=this.getNative();switch(this.getType()){case p.SELECTION_ELEMENT:return this.getSelectedElement();
case p.SELECTION_TEXT:var c=this.getRanges()[0];if(c)if(!c.collapsed){for(c.optimize();j;){a=c.startContainer;if(c.startOffset==(a[0].nodeType===n.NODE_ELEMENT?a[0].childNodes.length:a[0].nodeValue.length)&&!a._4e_isBlockBoundary())c.setStartAfter(a);else break}a=c.startContainer;if(a[0].nodeType!=n.NODE_ELEMENT)return a.parent();a=new m(a[0].childNodes[c.startOffset]);if(!a[0]||a[0].nodeType!=n.NODE_ELEMENT)return c.startContainer;for(c=a[0].firstChild;c&&c.nodeType==n.NODE_ELEMENT;){a=new m(c);
c=c.firstChild}return a}if(r){c=d.createRange();c.collapse(j);a=c.parentElement()}else if((a=d.anchorNode)&&a.nodeType!=n.NODE_ELEMENT)a=a.parentNode}return b.startElement=a?t._4e_wrap(a):C},getSelectedElement:function(){var b=this,a,d=b._.cache;if(d.selectedElement!==undefined)return d.selectedElement;if(r){a=b.getNative().createRange();a=a.item&&a.item(0)}a||(a=function(){for(var c=b.getRanges()[0],e,f,g=2;g&&!((e=c.getEnclosedNode())&&e[0].nodeType==n.NODE_ELEMENT&&I[e._4e_name()]&&(f=e));g--)c.shrink(E.SHRINK_ELEMENT);
return f&&f[0]}());return d.selectedElement=t._4e_wrap(a)},reset:function(){this._.cache={}},selectElement:function(b){var a,d=this.document;if(r)try{a=d.body.createControlRange();a.addElement(b[0]);a.select()}catch(c){a=d.body.createTextRange();a.moveToElementText(b[0]);a.select()}finally{}else{a=d.createRange();a.selectNode(b[0]);b=this.getNative();b.removeAllRanges();b.addRange(a)}this.reset()},selectRanges:function(b){if(r){if(b.length>1){var a=b[b.length-1];b[0].setEnd(a.endContainer,a.endOffset);
b.length=1}b[0]&&b[0].select()}else{a=this.getNative();if(!a)return;a.removeAllRanges();for(var d=0;d<b.length;d++){var c=b[d],e=this.document.createRange(),f=c.startContainer;if(c.collapsed&&(u.gecko&&u.gecko<1.09||u.opera||u.webkit)&&f[0].nodeType==n.NODE_ELEMENT&&!f[0].childNodes.length){f[0].appendChild(this.document.createTextNode(u.webkit?"\u200b":""));c.startOffset++;c.endOffset++}e.setStart(f[0],c.startOffset);e.setEnd(c.endContainer[0],c.endOffset);a.addRange(e)}}this.reset()},createBookmarks2:function(b){for(var a=
[],d=this.getRanges(),c=0;c<d.length;c++)a.push(d[c].createBookmark2(b));return a},createBookmarks:function(b,a){var d=[],c=this.document,e;a=a||this.getRanges();for(var f=a.length,g=0;g<f;g++){d.push(e=a[g].createBookmark(b,j));var k=(b=e.serializable)?v.one("#"+e.startNode,c):e.startNode;e=b?v.one("#"+e.endNode,c):e.endNode;for(var q=g+1;q<f;q++){var s=a[q],D=s.startContainer,B=s.endContainer;t._4e_equals(D,k.parent())&&s.startOffset++;t._4e_equals(D,e.parent())&&s.startOffset++;t._4e_equals(B,
k.parent())&&s.endOffset++;t._4e_equals(B,e.parent())&&s.endOffset++}}return d},selectBookmarks:function(b){for(var a=[],d=0;d<b.length;d++){var c=new z(this.document);c.moveToBookmark(b[d]);a.push(c)}this.selectRanges(a);return this},getCommonAncestor:function(){var b=this.getRanges();return b[0].startContainer._4e_commonAncestor(b[b.length-1].endContainer)},scrollIntoView:function(){var b=this.getStartElement();b&&b._4e_scrollIntoView()},removeAllRanges:function(){var b=this.getNative();if(r)b&&
b.clear();else b&&b.removeAllRanges()}});var J={table:1,tbody:1,tr:1},M=L.whitespaces(j),N=/\ufeff|\u00a0/;z.prototype.select=z.prototype.select=!r?function(){var b=this.startContainer;this.collapsed&&b[0].nodeType==n.NODE_ELEMENT&&!b[0].childNodes.length&&b[0].appendChild(this.document.createTextNode(""));var a=this.document.createRange();a.setStart(b[0],this.startOffset);try{a.setEnd(this.endContainer[0],this.endOffset)}catch(d){if(d.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")>=0){this.collapse(j);
a.setEnd(this.endContainer[0],this.endOffset)}else throw d;}b=F(this.document).getNative();b.removeAllRanges();b.addRange(a)}:function(b){var a=this.collapsed,d,c;if(this.startContainer[0]===this.endContainer[0]&&this.endOffset-this.startOffset==1){var e=this.startContainer[0].childNodes[this.startOffset];if(e.nodeType==n.NODE_ELEMENT){(new A(this.document)).selectElement(new m(e));return}}if(this.startContainer[0].nodeType==n.NODE_ELEMENT&&this.startContainer._4e_name()in J||this.endContainer[0].nodeType==
n.NODE_ELEMENT&&this.endContainer._4e_name()in J)this.shrink(E.SHRINK_ELEMENT,j);var f=this.createBookmark();e=f.startNode;var g;if(!a)g=f.endNode;f=this.document.body.createTextRange();f.moveToElementText(e[0]);f.moveStart("character",1);if(g){b=this.document.body.createTextRange();b.moveToElementText(g[0]);f.setEndPoint("EndToEnd",b);f.moveEnd("character",-1)}else{for(d=e[0].nextSibling;d&&!M(d);)d=d.nextSibling;d=!(d&&d.nodeValue&&d.nodeValue.match(N))&&(b||!e[0].previousSibling||e[0].previousSibling&&
t._4e_name(e[0].previousSibling)=="br");c=new m(this.document.createElement("span"));c.html("&#65279;");c.insertBefore(e);if(d)t.insertBefore(this.document.createTextNode("\ufeff"),e[0]||e)}this.setStartBefore(e);e._4e_remove();if(a){if(d){f.moveStart("character",-1);f.select();this.document.selection.clear()}else f.select();if(c){this.moveToPosition(c,E.POSITION_BEFORE_START);c._4e_remove()}}else{this.setEndBefore(g);g._4e_remove();f.select()}};A.getSelection=F;o.Selection=A;o.on("instanceCreated",function(b){K(b.editor)})});
