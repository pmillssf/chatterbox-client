// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  dataPulled: undefined,
  init: function() {},
  send: function() {},
  fetch: function() {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.dataPulled = data;
        app.renderRoom();
        console.log('chatterbox: Message sent');
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
    $containerDiv.append($usernameDiv, $textDiv);
    $usernameDiv.append(app.cleanString(message.username));
    $textDiv.append(app.cleanString(message.text));
    $('#chats').append($containerDiv);
  },
  renderRoom: function() {
    for (var i = 0; i < app.dataPulled.results.length; i++) {
      this.renderMessage(app.dataPulled.results[i]); 
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
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  contentType: 'application/json',
  success: function (data) {
    app.dataPulled = data;
    console.log('chatterbox: Message sent');
    console.log(data);
    return data;
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

app.fetch();
