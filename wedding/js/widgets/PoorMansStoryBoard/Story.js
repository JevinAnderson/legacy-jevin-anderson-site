define([
  'dijit/_TemplatedMixin',
  'dijit/_WidgetBase',
  'dijit/_WidgetsInTemplateMixin',

  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom-construct',
  'dojo/dom-geometry',
  'dojo/dom-style',
  'dojo/on',
  'dojo/text!./templates/Story.html',

  'esri/geometry/Point',
  'esri/Graphic',
  'esri/geometry/support/webMercatorUtils',
  'esri/symbols/ObjectSymbol3DLayer',
  'esri/symbols/PointSymbol3D',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/PopupTemplate',


  'widgets/PoorMansStoryBoard/GraphicsCarousel',

  'xstyle/css!./styles/Story.css'
], function(
  _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
  declare, lang, domConstruct, domGeom, domStyle, on, template,
  Point, Graphic, webMercatorUtils, ObjectSymbol3DLayer, PointSymbol3D, SimpleLineSymbol, SimpleMarkerSymbol, PopupTemplate,
  GraphicsCarousel,
  css
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      templateString: template,
      postCreate: function() {
        this.inherited(arguments);

        this._initializeStoryContent(this.config.sidebarContents);
        this._initializeMapContent(this.config.mapContent);
        this._initializeGraphicsCarousel(this.graphics, this.map);
      },

      _initializeStoryContent: function(sidebarContents) {
        sidebarContents.forEach(function(content) {
          if (content.type === 'img') {
            domConstruct.create(content.type, {
              src: require.toUrl(content.src)
            }, this.content, 'last');
          } else {
            domConstruct.create(content.type, {
              innerHTML: content.value
            }, this.content, 'last');
          }
        }, this);
      },
      _initializeMapContent: function(mapContent) {
        this.basemap = mapContent.basemap;
        this.startingPoint = new Point(mapContent.startingPoint.location);
        this.startingScale = mapContent.startingPoint.scale;

        this.graphics = mapContent.locations.map(function(location, index, locations) {
          var point = new Point(location.coordinates);
          point = webMercatorUtils.geographicToWebMercator(point, this.sceneView.sp)
          var markSymbol = new SimpleMarkerSymbol({
            color: [0, 0, 255],
            outline: new SimpleLineSymbol({
              color: [0, 244, 255],
              width: 2
            })
          });

          // var pointSymbol = new PointSymbol3D(
          //     new ObjectSymbol3DLayer({
          //         width: 5,
          //         resource: {
          //             primitive: 'sphere'
          //         },
          //         material: {
          //             color: 'blue'
          //         }
          //     })
          // );

          var template = new PopupTemplate({
            title: '<p>{title}</p>',
            image: require.toUrl(location.img),
            content: '<img src="' + require.toUrl(location.img) + '" style="width: 100%;height: auto;"><p>{description}</p>'
          });

          return new Graphic({
            attributes: {
              title: location.title,
              img: location.img,
              description: location.description
            },
            geometry: point,
            symbol: markSymbol,
            popupTemplate: template
          });
        }, this);
      },
      _initializeGraphicsCarousel: function(graphics, map) {
        if (graphics.length) {
          var graphicsCarousel = new GraphicsCarousel({
            graphics: graphics,
            map: map,
            sceneView: this.sceneView
          }).placeAt(this.content, 'last');
          graphicsCarousel.startup();
        }
        domConstruct.create('div', {
          class: 'bottomPadding'
        }, this.content, 'last');
      },
      startup: function() {
        this.inherited(arguments);

        this._payAttentionToScrolling(this.container, this.domNode);
      },
      _payAttentionToScrolling: function(container, domNode) {
        this.own(on(container, 'scroll', lang.hitch(this, function(event) {
          var position = domGeom.position(domNode);
          var inFocus = (position.y > 0) ? (position.h - position.y) / position.h > 0.3 : (position.h + position.y) / position.h > 0.3;

          if (inFocus) {
            this._movedIntoFocus();
          } else {
            this._movedOutOfFocus();
          }
        })));
      },
      _movedIntoFocus: function() {
        if (!this.inFocus) {
          this.inFocus = true;

          domStyle.set(this.content, 'opacity', 1);

          if (this.graphics) {
            this.graphicsLayer.add(this.graphics);
          };

          if (this.basemap) {
            this.map.basemap = this.basemap;
          }

          var target = {
            scale: this.startingScale, //Optional
            // zoom: 10, //Optional
            // tilt: 45, //Optional
            heading: 0, //Optional,
            target: this.startingPoint
          }

          this.sceneView.animateTo(target, {
            delay: 0
          }).then(lang.hitch(this, function(animation) {


          }), function(error) {
            console.log('_movedIntoFocus animation error : ', error);
          });
        }
      },
      _movedOutOfFocus: function() {
        if (this.inFocus) {
          this.inFocus = false;

          domStyle.set(this.content, 'opacity', 0.25);


          if (this.graphics) {
            this.graphicsLayer.remove(this.graphics);
          };
        }
      }
    });
  });