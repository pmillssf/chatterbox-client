// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  dataPulled: undefined,
  roomname: 'Lobby',
  init: function() {},
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
      data: 'limit=400',
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
    var $containerDiv = $('<div><div>');
    var $usernameDiv = $('<div><div>');
    var $textDiv = $('<div><div>');
    $textDiv.append(app.cleanString(message.text));
    $usernameDiv.append(app.cleanString(message.username));
    $containerDiv.append($usernameDiv, $textDiv);
    $('#chats').append($containerDiv);
  },
  renderRoom: function() {

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


app.fetch();

// var username = window.location.href.slice(window.location.href.indexOf('=') + 1);
