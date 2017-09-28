(function ($) {
  "use strict";
  
  if($('.playlist').length == 0) return;

  var playlist = $( '.playlist' ).mepPlaylist({
    audioHeight: '40',
    audioWidth: '100%',
    videoHeight: '40',
    videoWidth: '100%',
    audioVolume: 'vertical',
    mepPlaylistLoop: true,
    alwaysShowControls: true,
    mepSkin: 'mejs-audio',
    mepResponsiveProgress: true,
    mepSelectors: {
      playlist: '.playlist',
      track: '.track',
      tracklist: '.tracks'
    },
    features: [
      'meplike',
      'mepartwork',
      'mepcurrentdetails',
      'mepplaylist',
      'mephistory',
      'mepprevioustrack',
      'playpause',
      'mepnexttrack',
      'progress',
      'current',
      'duration',
      'volume',
      'mepicons',
      'meprepeat',
      'mepshuffle',
      'mepsource',
      'mepbuffering',
      'meptracklist',
      'mepplaylisttoggle',
      'youtube'
    ],
    mepPlaylistTracks: [
      {
            "id": "item-1",
            "title": "Change My Life",
            "except": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Nihil illinc huc pervenit.",
            "link": "track.detail.html",
            "thumb": { "src": "http://avatar.nct.nixcdn.com/playlist/2015/07/29/6/e/5/b/1438181950080.jpg" },
            "src": "http://f9.stream.nixcdn.com/f748ed7b6a57866e5d776dd64cf56591/59c8722f/NhacCuaTui939/ChangeMyLife-DreamAmi-4850875.mp3?t=1506309511961",
            "meta": {
                "author": "Summerella",
                "authorlink": "artist.detail.html",
                "date": "30.05.2016",
                "category": "Blue",
                "tag": "Holiday",
                "play": 3200,
                "like": 210,
                "duration": "2:50"
            }
        },
        {
            "id": "item-2",
            "title": "Cheer Up",
            "except": "Hidem saepe faciamus. Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.",
            "link": "track.detail.html",
            "thumb": { "src": "http://avatar.nct.nixcdn.com/singer/avatar/2017/05/15/9/c/5/1/1494836138089.jpg" },
            "src": "http://s82.stream.nixcdn.com/8983ce4d2ca515a8ce835bd38650cd27/59c86b74/Warner_Audio18/CHEERUPJapaneseVer-TWICE-5031386.mp3?t=1506308085646",
            "meta": {
                "author": "Kygo",
                "authorlink": "artist.detail.html",
                "date": "02.05.2016",
                "category": "Jazz",
                "play": 30,
                "like": 10,
                "duration": "4:25"
            }
        },
        {
            "id": "item-3",
            "title": "Sau Tất Cả",
            "except": "Tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.",
            "link": "track.detail.html",
            "thumb": { "src": "http://avatar.nct.nixcdn.com/singer/avatar/2016/09/16/d/1/7/c/1474010206663.jpg" },
            "src": "http://aredir.nixcdn.com/5899f6e460732108a1771d8e2d659e7f/59c86b74/NhacCuaTui941/SauTatCa-MONSTARERIKST319-4301357.mp3?t=1506308300471",
            "meta": {
                "author": "Jeremy Scott",
                "authorlink": "artist.detail.html",
                "date": "09.04.2016",
                "category": "DJ",
                "play": 300,
                "like": 10,
                "duration": "2:50"
            }
        }
    ]
  });

  // get player, then you can use the player.mepAdd(), player.mepRemove(), player.mepSelect()
  var player = playlist.find('audio, video')[0].player;

  // event on like btn
  player.$node.on('like.mep', function(e, trackid){
    $('[track-id='+trackid+']').toggleClass('is-like');
  });

  // event on play
  player.$node.on('play', function(e){
    updateDisplay();
  });

  // event on pause
  player.$node.on('pause', function(e){
    updateDisplay();
  });

  // update when pjax end
  $(document).on('pjaxEnd', function() {
    updateDisplay();
  });

  // simulate the play btn
  $(document).on('click.btn', '.btn-playpause', function(e){
      e.stopPropagation();
      var self = $(this);
      if( self.hasClass('is-playing') ){
        self.removeClass('is-playing');
        player.pause();
      }else{
        var item = getItem(self);
        item && player.mepAdd(item, true);
      }
  });

  function updateDisplay(){
    $('[data-id]').removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    var track = player.mepGetCurrentTrack();
    if(!track || !track.id) return;
    var item = $('[data-id="'+track.id+'"]');
    if( player.media.paused ){
      item.removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    }else{
      item.addClass('active').find('.btn-playpause').addClass('is-playing').parent().addClass('active');
    }
  }

  // get item data, you can use ajax to get data from server
  function getItem(self){
    var item = self.closest('.item');
    // track detail
    if(!item.attr('data-src')){
      self.toggleClass('is-playing');
      $('#tracks').find('.btn-playpause').first().trigger('click');
      return false;
    }

    var obj = {
        meta: {
           author: item.find('.item-author').find('a').text()
          ,authorlink : item.find('.item-author').find('a').attr('href')
        }
        ,src: self.closest('[data-src]').attr("data-src")
        ,thumb: {
          src: item.find('.item-media-content').css("background-image").replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
        }
        ,title: item.find('.item-title').find('a').text()
        ,link: item.find('.item-title').find('a').attr('href')
        ,id: self.attr("data-id") ? self.attr("data-id") : self.closest('[data-id]').attr("data-id")
    };
    return obj;
  }

})(jQuery);
