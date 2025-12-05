const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            provider: 'google',
            photo: profile.photos[0].value,
            accessToken
        };
        return done(null, user);
        }
    )
  );
};
