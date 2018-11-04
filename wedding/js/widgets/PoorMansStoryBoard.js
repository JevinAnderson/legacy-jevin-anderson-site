define([
    './PoorMansStoryBoard/Story',

    'dijit/_WidgetBase',

    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/query',

    'esri/layers/GraphicsLayer'
], function(
    Story,
    _WidgetBase,
    declare, lang, domStyle, query,
    GraphicsLayer
) {
    return declare([_WidgetBase], {
        postCreate: function() {
            this.inherited(arguments);

            this.graphicsLayer = new GraphicsLayer();
            this.map.add(this.graphicsLayer);

            this._initializeContent(this.container, this.config, this.map, this.graphicsLayer, this.sceneView);
        },

        _initializeContent: function(container, config, map, graphicsLayer, sceneView) {
            this.stories = config.map(function(storyConfig, index, config) {
                var story = new Story({
                    container: container,
                    config: storyConfig,
                    graphicsLayer: graphicsLayer,
                    map: map,
                    nextStoryConfig: config[index + 1],
                    sceneView: sceneView
                }).placeAt(container, 'last');
                story.startup();

                return story;
            }, this);

            (function() {
                var carousel = query('.CarouselControls')[0];
                carousel.setAttribute('data-help-tooltip', 'These help you navigate the map content. Their controls work the same as the sidebar controls.');
                carousel.setAttribute('data-help-tooltip-setup', 1150);
                carousel.setAttribute('data-help-tooltip-teardown', true);
            })()

            if (this.stories.length) {
                var story = this.stories[0];
                domStyle.set(story.content, 'opacity', 1);

                var target = {
                    scale: story.startingScale,
                    target: story.startingPoint
                }

                this.sceneView.animateTo(target, {
                    delay: 0
                }).then(lang.hitch(this, function(animation) {}), function(error) {
                    console.log('_initializeContent animation error : ', error);
                });
            };
        }
    });
});