const users = require('./users/users.service.js');
const friends = require('./friends/friends.service.js');
const parties = require('./parties/parties.service.js');
const messages = require('./messages/messages.service.js');
const groupMessages = require('./group-messages/group-messages.service.js');
const groupUsers = require('./group-users/group-users.service.js');
const media = require('./media/media.service.js');
const dm = require('./dm/dm.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(friends);
  app.configure(parties);
  app.configure(messages);
  app.configure(groupMessages);
  app.configure(groupUsers);
  app.configure(media);
  app.configure(dm);
};
