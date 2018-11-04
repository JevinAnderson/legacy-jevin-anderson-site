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
	'dojo/text!./templates/MenuModal.html',

	'xstyle/css!./styles/MenuModal.css'
], function(
	_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
	declare, fx, lang, domConstruct, domGeometry, domStyle, on, template,
	css
) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template,
		postCreate: function() {
			this.inherited(arguments);

		},
		expand: function() {
			this.content.style.top = this._calculateMenuTopPosition();
			domStyle.set(this.content, 'visibility', 'visible');
			domStyle.set(this.menuEntryHeader, 'visibility', 'hidden');
			fx.animateProperty({
				node: this.content,
				duration: 300,
				properties: {
					top: 0
				},
				onEnd: lang.hitch(this, function() {

				})
			}).play();
			this.menuOpen = true;
		},
		collapse: function() {
			this.content.style.top = this._calculateMenuTopPosition();
			fx.animateProperty({
				node: this.content,
				duration: 300,
				properties: {
					top: this._calculateMenuTopPosition()
				},
				onEnd: lang.hitch(this, function() {
					domStyle.set(this.content, 'visibility', 'hidden');
					domStyle.set(this.menuEntryHeader, 'visibility', 'visible');
				})
			}).play();
			this.menuOpen = false;
		},
		_calculateMenuTopPosition: function() {
			var height = domGeometry.position(this.content).h;

			return (height > 100) ? -500 : 100;
		}
	});
});