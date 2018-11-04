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
    'dojo/text!./FaqController/template.html',

    'widgets/Menu',
    'widgets/AudioPlayer',

    'xstyle/css!./FaqController/template.css'
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

            this.menu = new Menu({}).placeAt(this.menuDiv);
            this.menu.startup();

            var song = this.songs[this.history.visits % this.songs.length];
            this.audioPlayer = new AudioPlayer({
                file: song
            });
        },
        startup: function() {
            this.inherited(arguments);

            this.audioPlayer.play();
        }
    });
});