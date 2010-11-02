KISSY.Editor.add("htmlparser-text", function() {
    var S = KISSY,
        KE = S.Editor,
        KEN = KE.NODE,
        TRUE = true,
        FALSE = false,
        NULL = null;

    /**
     * A lightweight representation of HTML text.
     * @constructor
     * @example
     */
    function MText(value) {
        /**
         * The text value.
         * @type String
         * @example
         */
        this.value = value;

        /** @private */
        this._ = {
            isBlockLike : FALSE
        };
    }

    S.augment(MText, {
        /**
         * The node type. This is a constant value set to { KEN.NODE_TEXT}.
         * @type Number
         * @example
         */
        type : KEN.NODE_TEXT,

        /**
         * Writes the HTML representation of this text to a HtmlWriter.
         *  {HtmlWriter} writer The writer to which write the HTML.
         * @example
         */
        writeHtml : function(writer, filter) {
            var text = this.value;

            if (filter && !( text = filter.onText(text, this) ))
                return;

            writer.text(text);
        }
    });

    KE.HtmlParser.Text = MText;
    KE.HtmlParser["Text"] = MText;
});
