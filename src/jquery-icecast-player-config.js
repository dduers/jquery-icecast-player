
$(document).ready(function() {
    $.fn.jqueryIcecastPlayer({
        statusUrl: 'http://localhost:8000/stats-json.xsl',
        statusServerType: 'application/ogg',
        statusTimeout: 30000,
        defaultSiteTitle: 'My Radio Station',
        elemPlayerContainer: $('#player'),
        elemPlayerAudio: $('#player audio'),
        elemPlayerButton: $('#player button'),
        elemPlayerButtonTitlePlay: 'Play',
        elemPlayerButtonTitleStop: 'Stop',
        elemPlayerButtonTitleOffline: 'Offline',
        elemPlayerButtonHtmlPlay: 'Play',
        elemPlayerButtonHtmlStop: 'Stop',
        elemPlayerButtonHtmlOffline: 'Offline',
        elementsArtistName: [
            $('#player #artistname')
        ],
        elementsSongTitle: [
            $('#player #songtitle')
        ],
        elementsServerName: [
            $('#player #servername')
        ],
        elementsServerDescription: [
            $('#player #serverdescription')
        ],
        functionInitPayload: null,
        debug: false,
    });
});
