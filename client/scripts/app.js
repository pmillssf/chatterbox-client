// YOUR CODE HERE:
var app = {
  dataPulled: undefined,
  init: function() {},
  send: function() {},
  fetch: function() {},
  clearMessages: function() {},
  renderMessage: function() {},
  renderRoom: function() {},
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
