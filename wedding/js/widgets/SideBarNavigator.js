define([
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase',
	'dijit/_WidgetsInTemplateMixin',

	'dojo/_base/declare',
	'dojo/_base/fx',
	'dojo/_base/lang',
	'dojo/_base/window',
	'dojo/dom-class',
	'dojo/dom-construct',
	'dojo/dom-geometry',
	'dojo/on',
	'dojo/text!./SideBarNavigator/templates/SideBarNavigator.html',

	'xstyle/css!./SideBarNavigator/styles/SideBarNavigator.css'
], function(
	_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
	declare, fx, lang, win, domClass, domConstruct, domGeometry, on, template,
	css
) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template,
		postCreate: function() {
			this.inherited(arguments);

			this._setupNavigation(this.stories);
		},
		_setupNavigation: function(stories) {
			this.placeholders = [];
			stories.forEach(function(story, index, array) {
				var placeholder = domConstruct.create('i', {
					class: 'fa fa-circle-o fa-lg'
				}, this.graphicPlaceholderDiv, 'last');
				this.placeholders.push(placeholder);

				this.own(on(placeholder, 'click', lang.hitch(this, '_scrollToStory', story, placeholder)));
			}, this);
			this.placeholders[0].setAttribute('data-help-tooltip', 'This toolbar helps you navigate our story. The arrows move to the previous or next story, and the circles move to a specific story.');

			this.placeholderIndex = 0;
		},
		startup: function() {
			this.inherited(arguments);
			//Do stuff
		},
		scrollToTop: function() {
			this.scrollToPosition(0);
			this._highlightPlaceholder(this.placeholders[0]);
		},
		_scrollToStory: function(story, placeholder) {
			var position = domGeometry.position(story.domNode, true)
			var y = position.y;

			this.scrollToPosition(this.scrollDiv.scrollTop + y);
			this._highlightPlaceholder(placeholder);
		},
		_highlightPlaceholder: function(placeholder) {
			this.placeholders.forEach(function(currentPlaceholder, index, array) {
				if (currentPlaceholder === placeholder) {
					domClass.replace(currentPlaceholder, 'fa-circle', 'fa-circle-o');
					this.placeholderIndex = index;
				} else {
					domClass.replace(currentPlaceholder, 'fa-circle-o', 'fa-circle');
				}
			}, this);
		},
		scrollToPosition: function(position) {
			if (this.animation) {
				this.animation.stop();
			};

			this.animation = fx.animateProperty({
				node: this.scrollDiv,
				properties: {
					opacity: {
						start: this.scrollDiv.scrollTop || 1,
						end: position + 1
					}
				},
				onEnd: lang.hitch(this, function() {

				}),
				onAnimate: lang.hitch(this, function(node, values) {
					// Using opacity hack because dojo tries to set scrollTop property
					// with string ending in "px" instead of a number
					node.scrollTop = parseInt(values.opacity - 1);
				}, this.scrollDiv),
				duration: 1000
			});

			this.animation.play();
		},
		previous: function() {
			this.placeholderIndex--;

			if (this.placeholderIndex < 0) {
				this.placeholderIndex = this.placeholders.length - 1;
			}

			this.placeholders[this.placeholderIndex].click();
		},
		next: function() {
			this.placeholderIndex++;

			if (this.placeholderIndex >= this.placeholders.length) {
				this.placeholderIndex = 0;
			};

			this.placeholders[this.placeholderIndex].click();
		},
		destroy: function() {
			//Do stuff
			this.inherited(arguments);
		}
	});
});