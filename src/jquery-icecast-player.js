/**
 * jqueryIcecastPlayer
 * by Daniel Duersteler, 2020
 * https://github.com/dduers/jquery-icecast-player
 */
(function($) {
    $.fn.jqueryIcecastPlayer = function(options) {
        var api = {};
        var defaults = {
            statusUrl: 'http://localhost:8000/status-json.xsl',
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
            functionOnTrackChange: null,
            functionOnFirstStatusUpdate: null,
            debug: false,
        };
        var settings = $.extend(true, {}, defaults, options);
        var flagError = false;
        var counter = 0;
        var tag_title;
        var tag_artist;
        var tag_servername;
        var tag_serverdescription;

        var init = function() {
            if (settings.debug) {			
                console.log('jqueryShoutcastPlayer: settings', settings);
            }
            if (!settings.elemPlayerContainer.length) {
                return;
            }
            if ($.isFunction(settings.functionInitPayload)) {
                settings.functionInitPayload();
            }
            api.stopPlayer();
            settings.elemPlayerButton.click(function(event) {
                event.preventDefault();
                settings.elemPlayerAudio.get(0).paused 
                    ? api.startPlayer()
                    : api.stopPlayer() || location.reload();
            });
            $('title').text(settings.defaultSiteTitle);
            refreshStatus(); 
        };
        api.stopPlayer = function() {
            if (settings.elemPlayerAudio.length) {
                if (!settings.elemPlayerAudio.get(0).paused) {
                    settings.elemPlayerAudio.get(0).pause();
                    settings.elemPlayerAudio.get(0).currentTime = 0;
                }
            }
            if (settings.elemPlayerButton.length) {
                settings.elemPlayerButton.attr('title', settings.elemPlayerButtonTitlePlay);
                settings.elemPlayerButton.html(settings.elemPlayerButtonHtmlPlay);
            }
        };
        api.startPlayer = function() {
            if (settings.elemPlayerAudio.length) {
                settings.elemPlayerAudio.get(0).play();
            }
            if (settings.elemPlayerButton.length) {
                settings.elemPlayerButton.attr('title', settings.elemPlayerButtonTitleStop);
                settings.elemPlayerButton.html(settings.elemPlayerButtonHtmlStop);
            }
        };
        api.disablePlayer = function() {
            if (settings.elemPlayerButton.length) {
                settings.elemPlayerButton.attr('title', settings.elemPlayerButtonTitleOffline);
                settings.elemPlayerButton.html(settings.elemPlayerButtonHtmlOffline);
                settings.elemPlayerButton.addClass('disabled');
                settings.elemPlayerButton.attr('disabled', 'disabled');
            }
            $('title').text(settings.defaultSiteTitle);
        };
        api.enablePlayer = function () {
            if (settings.elemPlayerButton.length && settings.elemPlayerAudio.length) {
                settings.elemPlayerAudio.get(0).paused 
                    ? settings.elemPlayerButton.html(settings.elemPlayerButtonHtmlPlay) 
                        || settings.elemPlayerButton.attr('title', settings.elemPlayerButtonTitlePlay)
                    : settings.elemPlayerButton.html(settings.elemPlayerButtonHtmlStop) 
                        || settings.elemPlayerButton.attr('title', settings.elemPlayerButtonTitleStop)
                settings.elemPlayerButton.removeClass('disabled');
                settings.elemPlayerButton.removeAttr('disabled');
            }
        };
        var refreshStatus = function() {
            $.ajax({
                url: settings.statusUrl,
                method: 'GET',
                crossDomain: true,
                dataType: 'json',
                cache: false,
                error: function(xhr, error) {
                    api.stopPlayer();
                    api.disablePlayer();
                    flagError = true;
                    setTimeout(refreshStatus, settings.statusTimeout);
                },
                success: function(data) {
                    var temp_title;
                    var temp_artist;
                    var temp_servername;
                    var temp_serverdescription;
                    if (data && data.icestats.source) {
                        if (flagError) {
                            location.reload();
                        }
                        flagError = false;
                        api.enablePlayer();
                        if (data.icestats.source.title && data.icestats.source.server_type == settings.statusServerType) {
                            if ((tag_artist != data.icestats.source.artist) && counter) {
                                if ($.isFunction(settings.functionOnTrackChange)) {
                                    settings.functionOnTrackChange();
                                }
                            }
                            tag_artist = data.icestats.source.artist;
                            tag_title = data.icestats.source.title;
                            tag_servername = data.icestats.source.server_name;
                            tag_serverdescription = data.icestats.source.server_description;
                        } else {
                            $.each(data.icestats.source, function(index, value) {
                                if (value.server_type == settings.statusServerType) {
                                    temp_artist = value.artist;
                                    temp_title = value.title;
                                    temp_servername = value.server_name;
                                    temp_serverdescription = value.server_description;
                                }
                            });
                            if ((tag_artist != temp_artist) && counter) {
                                if ($.isFunction(settings.functionOnTrackChange)) {
                                    settings.functionOnTrackChange();
                                }
                            }
                            tag_artist = temp_artist;
                            tag_title = temp_title;
                            tag_servername = temp_servername;
                            tag_serverdescription = temp_serverdescription;
                        }
                        $.each(settings.elementsSongTitle, function(index, element) {
                            if (tag_title ? tag_title : tag_serverdescription) {
                                element.text(tag_title ? tag_title : tag_serverdescription);
                            }
                        });
                        $.each(settings.elementsArtistName, function(index, element) {
                            if (tag_artist ? tag_artist : tag_servername) {
                                element.text(tag_artist ? tag_artist : tag_servername);
                            }
                        });
                        $.each(settings.elementsServerName, function(index, element) {
                            if (tag_servername) {
                                element.text(tag_servername);
                            }
                        });
                        $.each(settings.elementsServerDescription, function(index, element) {
                            if (tag_serverdescription) {
                                element.text(tag_serverdescription);
                            }
                        });
                        if ((tag_artist ? tag_artist : tag_servername) && (tag_title ? tag_title : tag_serverdescription)) {
                            $('title').text(
                                (
                                    (tag_artist ? tag_artist : tag_servername) 
                                    + ' - ' 
                                    + (tag_title ? tag_title : tag_serverdescription)
                                ).toLowerCase()
                            );
                        } else {
                            $('title').text(settings.defaultSiteTitle);
                        }
                    } else {
                        api.stopPlayer();
                        api.disablePlayer(); 
                        flagError = true;
                    } 
                    if ($.isFunction(settings.functionOnFirstStatusUpdate) && !counter) {
                        settings.functionOnFirstStatusUpdate();
                    }
                    counter++;
                    setTimeout(refreshStatus, settings.statusTimeout);
                },
            });
        };
        init();
        return api;
    };
})($);
