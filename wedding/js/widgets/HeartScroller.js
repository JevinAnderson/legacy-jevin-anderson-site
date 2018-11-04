define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',

    'dojo/_base/declare',
    'dojo/_base/fx',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/on',
    'dojo/text!./HeartScroller/template.html',

    'xstyle/css!./HeartScroller/template.css'
], function(
    _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
    declare, fx, lang, win, domConstruct, domGeometry, on, template,
    css
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        colors: [
            'red', 'pink', 'purple'
        ],
        postCreate: function() {
            this.inherited(arguments);

            this.container.style.opacity = 0;

            var scrollDiv = this.scrollDiv;
            this.own(on(scrollDiv, 'scroll', lang.hitch(this, function(event) {
                var angle = scrollDiv.scrollTop % 360;
                this._animateHeart(this.container, angle);
            })));
        },
        _animateHeart: function(container, angle) {
            this.setNodeAngle(container, angle);

            container.style.opacity = 0.8;
            fx.fadeOut({
                node: container,
                duration: 500
            }).play();

            this._createTinyHeart(container, angle);
        },
        setNodeAngle: function(node, angle) {
            node.style.webkitTransform = 'rotate(' + angle + 'deg)';
            node.style.mozTransform = 'rotate(' + angle + 'deg)';
            node.style.msTransform = 'rotate(' + angle + 'deg)';
            node.style.oTransform = 'rotate(' + angle + 'deg)';
            node.style.transform = 'rotate(' + angle + 'deg)';
        },
        _createTinyHeart: function(container, angle) {
            var position = domGeometry.position(container);
            var heartWidth = position.w / 2;
            var heartHeight = position.h / 2;
            var colorIndex = this.getRandomInt(0, this.colors.length);

            var heart = domConstruct.create('div', {
                style: {
                    position: 'absolute',
                    top: Math.floor(position.y + heartHeight / 2) + 'px',
                    left: Math.floor(position.x + heartWidth / 2) + 'px',
                    zIndex: 21,
                    color: this.colors[colorIndex]
                },
                innerHTML: '<i class="fa fa-heart fa-2x"></i>'
            }, win.body(), 'last');

            var bodyWidth = domGeometry.position(win.body()).w - heartWidth;
            fx.animateProperty({
                node: heart,
                properties: {
                    opacity: {
                        start: 0,
                        end: 0.8
                    },
                    top: 0,
                    left: this.getRandomInt(0, bodyWidth),
                },
                onEnd: lang.hitch(this, function() {
                    this._bounceHeart(heart, 0);
                }),
                onAnimate: lang.hitch(this, function(node, values) {
                    var top = parseInt(values.top);

                    this.setNodeAngle(node, angle + top);
                }, heart),
                duration: 5000
            }).play();
        },
        _bounceHeart: function(heart, numberOfBounces) {
            if (numberOfBounces <= 0) {
                domConstruct.destroy(heart);
            } else {
                var top = this.getRandomInt(0, 800);
                var left = this.getRandomInt(0, 1400);

                fx.animateProperty({
                    node: heart,
                    properties: {
                        top: top,
                        left: left,
                    },
                    onEnd: lang.hitch(this, function() {
                        this._bounceHeart(heart, numberOfBounces - 1);
                    }),
                    onAnimate: lang.hitch(this, function(node, values) {
                        var top = parseInt(values.top);

                        this.setNodeAngle(node, top);
                    }, heart),
                    duration: 1000
                }).play();
            }
        },
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    });
});