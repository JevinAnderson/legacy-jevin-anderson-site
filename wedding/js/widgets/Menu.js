define([
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase',
	'dijit/_WidgetsInTemplateMixin',

	'dojo/_base/declare',
	'dojo/_base/fx',
	'dojo/_base/lang',
	'dojo/dom-construct',
	'dojo/dom-geometry',
	'dojo/dom-style',
	'dojo/on',
	'dojo/text!./Menu/templates/Menu.html',
	'widgets/Menu/MenuModal',

	'xstyle/css!./Menu/styles/Menu.css'
], function(
	_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
	declare, fx, lang, domConstruct, domGeometry, domStyle, on, template, MenuModal,
	css
) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template,
		postCreate: function() {
			this.inherited(arguments);

			this._createMenuModal();
			this._setupEventHandlers();
		},
		_createMenuModal: function() {
			this.menuModal = new MenuModal({
				menuEntryHeader: this.menuEntryHeader
			}).placeAt(document.body, 'first');
			this.menuModal.startup();

			this.own(this.menuModal);
		},
		_setupEventHandlers: function() {
			this.own(on(this.menuEntryHeader, 'click', lang.hitch(this, 'menuEntryHandler')));
		},
		menuEntryHandler: function(event) {
			this.menuModal.expand();
		},
		startup: function() {
			this.inherited(arguments);
			//Do stuff
		},
		destroy: function() {
			//Do stuff
			this.inherited(arguments);
		}
	});
});