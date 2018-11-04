define([
    'dijit/_WidgetBase',
    'dijit/Tooltip',

    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/dom-construct',
    'dojo/domReady!',
    'dojo/on',
    'dojo/dom',
    'dojo/query',

    'dojo/_base/declare'
], function(
    _WidgetBase, Tooltip,

    lang, win, domConstruct, domReady, on, dom, query,

    declare
) {
    return declare([_WidgetBase], {
       postCreate: function() {
            this.inherited(arguments);

            on.once(this.helpButton, 'click', lang.hitch(this, '_lazyLoadHelp'));
        },
        startup: function() {
            this.inherited(arguments);
            //Do stuff
        },
        _lazyLoadHelp: function(){
            this.sidebar = query('.SidebarDiv')[0];
            this._createOverlay();
            this.tooltips = query('[data-help-tooltip]').map(function(node){
                return node;
            }, this);

            this.own(on(this.helpButton, 'click', lang.hitch(this, 'help')));
            this.help();
        },
        _createOverlay: function() {
            this.overlay = domConstruct.create('div', {
                class: 'help-overlay'
            });
            this.own(on(this.overlay, 'click', lang.hitch(this, '_overlayClickHandler')))
        },
        _overlayClickHandler: function(event){
            event.preventDefault();

            var tooltip = this.tooltips[this.index++];
            Tooltip.hide(tooltip);

            var teardown = tooltip.getAttribute('data-help-tooltip-teardown');
            if (teardown) {
                this.sidebar.scrollTop = this.teardownPosition;
            }

            if (this.index < this.tooltips.length) {
                this._showTooltip(this.index);
            } else {
                document.body.removeChild(this.overlay);
                this.tooltipHandler.remove();
            }
        },
        _showTooltip: function(index) {
            var tooltip = this.tooltips[index];
            var setup = tooltip.getAttribute('data-help-tooltip-setup');
            if (setup) {
                this.teardownPosition = this.sidebar.scrollTop;
                this.sidebar.scrollTop = setup;
            }

            Tooltip.show(tooltip.getAttribute('data-help-tooltip'), tooltip);
        },
        help: function() {
            this.index = 0;
            document.body.insertBefore(this.overlay, document.body.firstChild);
            this._showTooltip(this.index);
            
            var tooltip = query('.dijitTooltip')[0];
            this.tooltipHandler = on(tooltip, 'click', lang.hitch(this, '_overlayClickHandler'));
        },
        destroy: function() {
            //Do stuff
            this.inherited(arguments);
        }
    });
});