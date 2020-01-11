
/**
 * jqueryIcecastPlayer
 * by Daniel Duersteler, 2020
 * https://github.com/dduers/jquery-icecast-player
 */
$(document).ready(function() {
    $.fn.jqueryIcecastPlayer({
        /**
         * statusUrl
         * the icecast stats json page.
         */
        statusUrl: 'http://localhost:8000/stats-json.xsl',
        /**
         * statusServerType
         * the server type of the source where the stats will be read from.
         */
        statusServerType: 'application/ogg',
        /**
         * statusTimeout
         * milliseconds between stats updates.
         */
        statusTimeout: 30000,
        /**
         * defaultSiteTitle
         * site title used, when the radio station is offline.
         */
        defaultSiteTitle: 'My Radio Station',
        /**
         * elemPlayerContainer
         * the player container html element.
         */
        elemPlayerContainer: $('#player'),
        /**
         * elemPlayerAudio
         * the audio html element that plays the icecast stream.
         */
        elemPlayerAudio: $('#player audio'),
        /**
         * elemPlayerButton
         * the button element to start and stop the stream.
         */
        elemPlayerButton: $('#player button'),
        /**
         * elemPlayerButtonTitlePlay | elemPlayerButtonTitleStop | elemPlayerButtonTitleOffline
         * title attribute for the player button for each of the three states.
         */
        elemPlayerButtonTitlePlay: 'Play',
        elemPlayerButtonTitleStop: 'Stop',
        elemPlayerButtonTitleOffline: 'Offline',
        /**
         * elemPlayerButtonHtmlPlay | elemPlayerButtonHtmlStop | elemPlayerButtonHtmlOffline
         * html caption of the player button for each of the three states.
         */
        elemPlayerButtonHtmlPlay: 'Play',
        elemPlayerButtonHtmlStop: 'Stop',
        elemPlayerButtonHtmlOffline: 'Offline',
        /**
         * elementsArtistName
         * these elements will be filled with the artist name meta data.
         */
        elementsArtistName: [
            $('#player #artistname')
        ],
        /**
         * elementsSongTitle
         * these elements will be filled with the song title meta data.
         */
        elementsSongTitle: [
            $('#player #songtitle')
        ],
        /**
         * elementsServerName
         * these elements will be filled with the server name meta data.
         */
        elementsServerName: [
            $('#player #servername')
        ],
        /**
         * elementsServerDescription
         * these elements will be filled with the server description meta data.
         */
        elementsServerDescription: [
            $('#player #serverdescription')
        ],
        /**
         * functionInitPayload
         * a function that is called at the player initialization.
         */
        functionInitPayload: null,
        /**
         * debug
         * eneable or disable debug console outputs
         */
        debug: false,
    });
});
