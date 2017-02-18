// YOUR CODE HERE:
$(document).ready(
  function () {
    app.init();

    $('#submit').on('click', function() {
      var $messageText = $('input#message').val();
      var message = {};
      if ($messageText.length > 0) {
        message.username = window.location.href.slice(window.location.href.indexOf('=') + 1);
        message.text = $messageText;
        message.roomname = app.roomname;
        app.send(message);
        app.clearMessages();
        app.fetch();
      }
    });
    
    $('#CreateRoom').on('click', function() {
      //debugger;
      var $roomnameText = $('input#roomname').val();
      var $newRoomOption = $('<option selected></option>');
      if ($roomnameText.length > 0 && $roomnameText !== undefined) {
        $newRoomOption.append(app.cleanString($roomnameText));
        $newRoomOption.attr('value', app.cleanString($roomnameText));
        $('#roomOptions').append($newRoomOption);
        // $('#roomOptions:last-child').attr('selected', 'selected');
      }
    });

    $('#roomOptions').change(function() {
      app.roomname = $('#roomOptions').val();
      app.clearMessages();
      app.fetch();
    });
  }
);
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  dataPulled: undefined,
  roomname: 'Lobby',
  init: function() {
    app.fetch();
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        debugger;
        console.log('chatterbox: Message sent');
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: app.server,
      data: 'order=-createdAt',
      data: 'limit=1000',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.dataPulled = data;
        for (var i = 0; i < app.dataPulled.results.length; i++) {
          if (app.dataPulled.results[i].text !== undefined && app.dataPulled.results[i].username !== undefined && app.dataPulled.results[i].roomname === app.roomname) {
            app.renderMessage(app.dataPulled.results[i]); 
          }
        }
        //console.log('chatterbox: Message sent');
        console.log(data);
        //return data;
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').html('');
  },
  renderMessage: function(message) {
    var $containerDiv = $('<div></div>');
    var $usernameDiv = $('<div></div>');
    var $textDiv = $('<div></div>');
    $textDiv.append(app.cleanString(message.text));
    $usernameDiv.append(app.cleanString(message.username));
    $containerDiv.append($usernameDiv, $textDiv);
    $('#chats').prepend($containerDiv);
  },
  renderRoom: function(roomname) {
    if (roomname !== undefined) {
      var $newRoomOption = $('<option selected></option>');

      if (roomname.length > 0) {
        $newRoomOption.append(roomname);
        $newRoomOption.attr('value', roomname);
        $('#roomOptions').prepend($newRoomOption);
      }
    }
  },
  cleanString: function(unsafe) {
    console.log(unsafe);
    // Found at http://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
    return unsafe
   .replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;")
   .replace(/'/g, "&#039;");
  },
};


// app.init();

// var username = window.location.href.slice(window.location.href.indexOf('=') + 1);
