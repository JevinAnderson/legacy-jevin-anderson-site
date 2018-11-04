define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',

    'dojo/_base/declare',
    'dojo/text!./BlogContentController/template.html',

    'widgets/BlogPost',

    'xstyle/css!./BlogContentController/template.css'
], function(
    _TemplatedMixin,
    _WidgetBase,
    _WidgetsInTemplateMixin,

    declare,
    template,

    BlogPost,

    css
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        //Infrequently used
        constructor: function() {},
        //Infrequently used
        postMixInProperties: function() {
            this.inherited(arguments);
            //Do stuff
        },
        //Infrequently used
        buildRendering: function() {
            this.inherited(arguments);
            //Do stuff
        },
        postCreate: function() {
            this.inherited(arguments);
            //Do stuff
        },
        startup: function() {
            this.inherited(arguments);
            //Do stuff
        },
        //Generally you put other functions here
        destroy: function() {
            //Do stuff
            this.inherited(arguments);
        }
    });
});