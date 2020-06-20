const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

const User = require("../models/Users");

module.exports = function (passport) {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });
  // GoogleStrategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log("Profile :", profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            cb(null, user);
          } else {
            user = await User.create(newUser);
            cb(null, user);
          }
        } catch (error) {
          console.error("Error=>", Error);
        }
      }
    )
  );
  // TwitterStrategy
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log("Profile :", profile);
        const newUser = {
          twitterId: profile.id,
          displayName: profile.displayName,
          displayName: profile.displayName,
          image: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ twitterId: profile.id });
          if (user) {
            cb(null, user);
          } else {
            user = await User.create(newUser);
            cb(null, user);
          }
        } catch (error) {
          console.error("Error=>", Error);
        }
      }
    )
  );
};
