define([
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase',
	'dijit/_WidgetsInTemplateMixin',

	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/dom-class',
	'dojo/dom-construct',
	'dojo/dom-geometry',
	'dojo/dom-style',
	'dojo/on',
	'dojo/text!./templates/GraphicsCarousel.html',

	'xstyle/css!./styles/GraphicsCarousel.css'
], function(
	_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
	declare, lang, domClass, domConstruct, domGeom, domStyle, on, template,
	css
) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template,
		postCreate: function() {
			this.placeholders = [];

			this.inherited(arguments);

			this._setupPlaceholders(this.graphics);
		},
		_setupPlaceholders: function(graphics) {
			graphics.forEach(function(graphic) {
				var placeholder = domConstruct.create('i', {
					class: 'fa fa-circle fa-sm',
					style: {
						margin: '0 2px',
						color: 'grey'
					}
				}, this.graphicPlaceholderDiv, 'last');
				this.placeholders.push(placeholder);

				this.own(on(placeholder, 'click', lang.hitch(this, 'zoomToGraphic', graphic)));
			}, this);
		},
		_adjustCarouselControlsWidth: function() {
			var totalWidth = this.graphics.length * 22 + 44;

			domStyle.set(this.carouselControlsDiv, 'width', totalWidth + 'px')
		},
		startup: function() {
			this.inherited(arguments);

			this._adjustCarouselControlsWidth();
		},
		zoomToGraphic: function(graphic) {
			if (this.index || this.index === 0) {
				domClass.replace(this.placeholders[this.index], 'fa-sm', 'fa-lg');
			}

			this.index = this.graphics.indexOf(graphic);
			domClass.replace(this.placeholders[this.index], 'fa-lg', 'fa-sm');

			var target = {
				scale: 10000,
				heading: 0,
				target: graphic.geometry
      }

			this.sceneView.animateTo(target, {
				delay: 0
      }).then(lang.hitch(this, function(animation) {
        this.sceneView.popup.viewModel.location = graphic.geometry;
        this.sceneView.popup.viewModel.features = [graphic];
        this.sceneView.popup.viewModel.visible = true;

      }), function(error) {
				console.log('_movedIntoFocus animation error : ', error);
			});
		},
		gotoPreviousGraphic: function() {
			if (this.index || this.index === 0) {
				var index = this.index - 1;
				index = index >= 0 ? index : this.graphics.length - 1;

				this.zoomToGraphic(this.graphics[index]);
			} else {
				this.zoomToGraphic(this.graphics[0]);
			}
		},
		gotoNextGraphic: function() {
			if (this.index || this.index === 0) {
				var index = this.index + 1;
				index = index < this.graphics.length ? index : 0;

				this.zoomToGraphic(this.graphics[index]);
			} else {
				this.zoomToGraphic(this.graphics[0]);
			}
		},
		destroy: function() {
			this.inherited(arguments);
		}
	});
});