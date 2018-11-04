define([
	'dijit/_WidgetBase',

	'dojo/_base/declare',
	'dojo/_base/window',
	'dojo/dom-attr',
	'dojo/dom-construct'
], function(
	_WidgetBase,
	declare, win, domAttr, domConstruct
) {
	return declare([_WidgetBase], {
		postCreate: function() {
			this.inherited(arguments);

			this._initializeAudio(this.file);
		},
		_initializeAudio: function(audioFile) {
			this.audioElement = domConstruct.create('audio', {
				src: require.toUrl('audio/' + audioFile),
				style: {
					position: 'absolute',
					bottom: '20px',
					right: '20px',
					zIndex: 20
				},
				preload: 'auto',
				loop: true,
				controls: true
			}, win.body(), 'last');
			this.audioElement.volume = 0.5;
			this.own(this.audioElement);
			
		},
		play: function() {
			this.audioElement.play();
		},
		pause: function() {
			this.audioElement.pause();
		}
	});
});