define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',

    'dojo/_base/declare',
    'dojo/text!./BlogPost/template.html',

    'xstyle/css!./BlogPost/template.css'
], function(
    _TemplatedMixin,
    _WidgetBase,
    _WidgetsInTemplateMixin,

    declare,
    template,

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