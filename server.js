require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const app = express();

// Serve static CSS
app.use(express.static("public"));

// Sessions
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport serialize/deserialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Load OAuth providers
require("./auth/google")(passport);
require("./auth/github")(passport);

// ROUTES
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="container">
          <h1>SSO Demo</h1>
          <a class="btn google" href="/auth/google">Login with Google</a>
          <a class="btn github" href="/auth/github">Login with GitHub</a>
        </div>
      </body>
    </html>
  `);
});

// GOOGLE
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

// GITHUB
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

// PROFILE PAGE
app.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/");

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="container">
          <h2>Welcome</h2>
            <p><strong>Tên:</strong> ${req.user.displayName}</p>
            <br><br>
          <a class="btn logout" href="/logout">Logout</a>
          </div>
          </body>
          </html>
          `);
        //   <pre class="profile">${JSON.stringify(req.user, null, 2)}</pre>
});

/**
 * <p><strong>ID:</strong> ${req.user.id}</p>
            <p><strong>Tên:</strong> ${req.user.displayName}</p>
            <p><strong>Email:</strong> ${req.user.email}</p>
            <p><strong>Provider:</strong> ${req.user.provider}</p>
            <img src="${req.user.photo}" width="100" style="border-radius:50%">
 */

// LOGOUT
app.get("/logout", (req, res) => {[]
  req.logout(() => {});
  res.redirect("/");
});

// START
app.listen(process.env.PORT, () =>
  console.log(`Server chạy tại http://localhost:${process.env.PORT}`)
);
