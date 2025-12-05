const GitHubStrategy = require("passport-github2").Strategy;

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
            id: profile.id,
            displayName: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value || 'no-email@github',
            provider: 'github',
            photo: profile.photos[0].value,
            accessToken
        };
        return done(null, user);
      }
    )
  );
};
