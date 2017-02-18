// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  dataPulled: undefined,
  getMessage: $('#submit').on('click', function() {
    debugger;
    var $messageText = $('input#message').val().text();
    var message = {};
    if ($messageText.length > 0) {
      message.text = $messageText;
      message.username = window.location.href.slice(window.location.href.indexOf('=') + 1);
      app.send(message);
    }
  }),
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
        app.renderRoom();
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
  clearMessages: function() {},
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
    for (var i = 0; i < app.dataPulled.results.length; i++) {
      if (app.dataPulled.results[i].text !== undefined && app.dataPulled.results[i].username !== undefined) {
        this.renderMessage(app.dataPulled.results[i]); 
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


app.fetch();
$('#submit').on('click', function() {
  debugger;
  var $messageText = $('input#message').text();
  var message = {};
  if ($messageText.length > 0) {
    message.text = $messageText;
    message.username = window.location.href.slice(window.location.href.indexOf('=') + 1);
    app.send(message);
  }
});

// var username = window.location.href.slice(window.location.href.indexOf('=') + 1);
