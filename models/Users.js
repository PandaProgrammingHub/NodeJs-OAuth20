const monogoes = require("mongoose");

const UserSchema = new monogoes.Schema({
  googleId: {
    type: String,
    require: true,
  },
  twitterId: {
    type: String,
    require: true,
  },
  githubId: {
    type: String,
    require: true,
  },
  linkedinId: {
    type: String,
    require: true,
  },
  faceBookId: {
    type: String,
    require: true,
  },
  displayName: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = monogoes.model("Users", UserSchema);
