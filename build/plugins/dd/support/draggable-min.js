KISSY.add("dd-draggable",function(d){function f(){f.superclass.constructor.apply(this,arguments);this._init()}var h=d.UA;f.ATTRS={node:{setter:function(a){return d.one(a)}},handlers:{value:[],setter:function(a){if(a)for(var b=0;b<a.length;b++)a[b]=d.one(a[b])}}};d.extend(f,d.Base,{_init:function(){var a=this.get("node"),b=this.get("handlers");if(b.length==0)b[0]=a;for(var c=0;c<b.length;c++){var e=b[c],g=e.css("cursor");if(e[0]!=a[0])if(!g||g==="auto")e.css("cursor","move")}a.on("mousedown",this._handleMouseDown,
this)},destroy:function(){for(var a=this.get("node"),b=this.get("handlers"),c=0;c<b.length;c++){var e=b[c];e.css("cursor")=="move"&&e.css("cursor","auto")}a.detach("mousedown",this._handleMouseDown,this)},_check:function(a){for(var b=this.get("handlers"),c=0;c<b.length;c++){var e=b[c];if(e.contains(a)||e[0]==a[0])return true}return false},_handleMouseDown:function(a){if(this._check(new d.Node(a.target))){h.webkit||a.preventDefault();d.DD.DDM._start(this);var b=this.get("node"),c=a.pageX;a=a.pageY;
b=b.offset();this.startMousePos={left:c,top:a};this.startNodePos=b;this._diff={left:c-b.left,top:a-b.top};this.set("diff",this._diff)}},_move:function(a){var b=this.get("diff");d.mix(a,{left:a.pageX-b.left,top:a.pageY-b.top});this.fire("drag",a)},_end:function(){this.fire("dragend")},_start:function(){this.fire("dragstart")}});d.Draggable=f},{host:"dd"});
