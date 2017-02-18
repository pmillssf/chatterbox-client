// YOUR CODE HERE:
$(document).ready(
  function () {
    var $messageInput = $('<div></div>');
    var $roomInput = $('<div></div>');
    var $roomselect = $('<div></div>');
    var $roomOptions = $('<select id="roomOptions"></select>');
    $messageInput.append('<input type="text" id="message" placeholder="Write a message!"></input>');
    $messageInput.append('<button id="submit">submit</button>');
    $roomInput.append('<input type="text" id="roomname" placeholder="Create a room!"></input>');
    $roomInput.append('<button id="CreateRoom">submit</button>');
    // $roomOptions.append('<option value="Lobby" defaultSelected>Lobby</option>');
    // $roomOptions.append('<option value="8 floor">8 floor</option>');
    $roomselect.append($roomOptions);
    $('#main').append($messageInput);
    $('#main').append($roomInput);
    $('#main').append($roomselect);




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
      // var $newRoomOption = $('<option selected></option>');
      if ($roomnameText.length > 0 && $roomnameText !== undefined) {
        // $newRoomOption.append(app.cleanString($roomnameText));
        // $newRoomOption.attr('value', app.cleanString($roomnameText));
        // $('#roomOptions').append($newRoomOption);
        app.roomname = app.cleanString($roomnameText);
        var message = {};
        message.username = window.location.href.slice(window.location.href.indexOf('=') + 1);
        message.text = 'Welcome to ' + app.roomname;
        message.roomname = app.roomname;
        app.clearMessages();
        $.ajax({
          url: app.server,
          type: 'POST',
          data: JSON.stringify(message),
          contentType: 'application/json',
          success: function (data) {
            console.log('chatterbox: Message sent');
            app.fetch();
          },
          error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message', data);
          }
        });
        // app.fetch();
      }
    });

    $('#roomOptions').change(function() {
      var selectedRoom = $('#roomOptions').val();
      app.roomname = $('#roomOptions').val();
      app.clearMessages();
      app.fetch();


    });
  }
);
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  dataPulled: undefined,
  roomname: 'lobby',
  allRooms: {},
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
      data: 'limit=10000',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.dataPulled = data;
        for (var i = 0; i < app.dataPulled.results.length; i++) {
          if (app.dataPulled.results[i].text !== undefined && app.dataPulled.results[i].username !== undefined && app.dataPulled.results[i].roomname === app.roomname) {
            app.renderMessage(app.dataPulled.results[i]); 
          }
        }
        app.renderRoom();
        $("#roomOptions").val(app.roomname).prop('selected', true);
        //console.log('chatterbox: Message sent');
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
    $('#roomOptions').html('');
    for (var i = 0; i < app.dataPulled.results.length; i++) {
      if (app.dataPulled.results[i].roomname !== undefined) {
        app.allRooms[app.cleanString(app.dataPulled.results[i].roomname)] = 1;
      }
    }
    for (var room in app.allRooms) {
      var $newRoomOption = $('<option></option>');
      $newRoomOption.append(room);
      $newRoomOption.attr('value', room);
      $newRoomOption.addClass(room);
      $('#roomOptions').append($newRoomOption);

    }

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
