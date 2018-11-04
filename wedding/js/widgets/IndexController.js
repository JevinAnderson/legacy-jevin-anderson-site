define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',

    'dojo/_base/declare',
    'dojo/_base/fx',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/fx',
    'dojo/on',
    'dojo/text!./IndexController/template.html',

    'widgets/Menu',
    'widgets/AudioPlayer',

    'xstyle/css!./IndexController/template.css'
], function(
    _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin,
    declare, fx, lang, domStyle, coreFx, on, template,
    Menu, AudioPlayer,
    css
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        songs: [
            '01 - All I Want Is You.mp3',
            '06 - Marry You.mp3'
        ],
        postCreate: function() {
            this.inherited(arguments);

            this._setupHeaders();

            this.menu = new Menu({}).placeAt(this.menuDiv);
            this.menu.startup();

            var song = this.songs[this.history.visits % this.songs.length];
            this.audioPlayer = new AudioPlayer({
                file: song
            });
        },
        _setupHeaders: function() {
            this.fadeHeaders = [
                this.namesHeader,
                this.announcementHeader,
                this.dateHeader,
                this.menuDiv
            ];

            this.fadeHeaders.forEach(function(header) {
                domStyle.set(header, 'opacity', 0);
            });
        },
        startup: function() {
            this.inherited(arguments);

            this._fadeInHeaders(this.fadeHeaders);
            this.audioPlayer.play();
        },
        _fadeInHeaders: function(headers) {
            var history = getObject('history');
            var duration = 2000 / history.visits;
            var delay = 500 / history.visits;

            var animations = headers.map(function(header) {
                return fx.fadeIn({
                    node: header,
                    duration: duration,
                    delay: delay
                });
            });

            coreFx.chain(animations).play();
        }
    });
});