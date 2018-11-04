define([
    'config/loveStoryConfig',

    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',

    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/dom-construct',
    'dojo/domReady!',
    'dojo/on',
    'dojo/text!./LoveStoryController/template.html',

    'esri/Camera',
    'esri/geometry/Point',
    'esri/Map',
    'esri/views/SceneView',

    'widgets/HeartScroller',
    'widgets/PoorMansStoryBoard',
    'widgets/SideBarNavigator',
    'widgets/LoveStoryController/Help',

    'xstyle/css!./LoveStoryController/template.css'
], function(
    loveStoryConfig,
    _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
    declare, lang, win, domConstruct, domReady, on, template,
    Camera, Point, Map, SceneView,
    HeartScroller, PoorMansStoryBoard, SideBarNavigator, Help,
    css
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        basemaps: [
            'streets',
            'satellite',
            'hybrid',
            'topo',
            'gray',
            'dark-gray',
            'oceans',
            'national-geographic',
            'terrain',
            'osm'
        ],
        postCreate: function() {
            this.inherited(arguments);

            this._initializeMap();

            // this._initializeTypingHandlers(document.body);

            this.view.then(lang.hitch(this, function() {
                this._initializeStoryBoard(this.sidebarDiv, this.map);
                this._initializeHeartScroller(this.sidebarDiv);
                this._initializeSidebarNavigator(this.scrollBarDiv, this.sidebarDiv);
                this._initializeHelpButton(this.helpButton);
            }), lang.hitch(this, function(error) {
                console.log('There was an error loading the view.');
            }));
        },
        _initializeMap: function() {
            this.basemapIndex = 4;
            this.map = new Map({
                basemap: this.basemaps[this.basemapIndex]
            });

            this.view = new SceneView({
                container: this.mapDiv,
                map: this.map,
                camera: new Camera({
                    position: new Point({
                        x: -90.1978,
                        y: 38.6272,
                        z: 800000,
                    }),
                    heading: 0,
                    tilt: 0
                })
            });
            this.view.on('click', lang.hitch(this, function(event) {
                console.log('View click event : ', event);
                console.log('Map scale:', this.view.scale);
                console.log('Latitude', event.mapPoint.latitude);
                console.log('Longitude: ', event.mapPoint.longitude);
            }));
        },
        _initializeHelpButton: function(helpButton) {
            var help = new Help({
                helpButton: helpButton
            });

            help.startup();
        },
        _initializeTypingHandlers: function(body) {
            on(body, 'mousedown', lang.hitch(this, '_handleBodyEvent'));
            on(body, 'mouseup', lang.hitch(this, '_handleBodyEvent'));
            on(body, 'keydown', lang.hitch(this, '_handleBodyEvent'))
            on(body, 'keyup', lang.hitch(this, '_handleBodyEvent'));
        },
        _handleBodyEvent: function(event) {
            console.log('event : ', event);
            console.log('_handleBodyEvent event.type : ', event.type);
        },
        _initializeStoryBoard: function(sideboard, map) {
            this.storyboard = new PoorMansStoryBoard({
                map: map,
                sceneView: this.view,
                config: loveStoryConfig,
                container: sideboard
            });
            this.storyboard.startup();
        },
        _initializeHeartScroller: function(scrollDiv) {
            var container = domConstruct.create('div', {
                style: {
                    position: 'absolute',
                    bottom: '20px',
                    left: '448px',
                    zIndex: '20'
                }
            }, win.body(), 'last');

            var heartScroller = new HeartScroller({
                container: container,
                scrollDiv: scrollDiv
            }).placeAt(container, 'last');
            heartScroller.startup();
        },
        _initializeSidebarNavigator: function(scrollBarDiv, scrollDiv) {
            this.sideBarNavigator = new SideBarNavigator({
                container: scrollBarDiv,
                scrollDiv: scrollDiv,
                stories: this.storyboard.stories
            }).placeAt(scrollBarDiv, 'first');

            this.sideBarNavigator.startup();
        }
    });
});
