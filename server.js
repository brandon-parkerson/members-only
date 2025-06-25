require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const pool = require("./db/pool");

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

// routes
const usersRouter = require("./routes/users");

app.set("view engine", "ejs");
// serve static files like css
app.use(express.static("public"));

app.use("/", usersRouter);
app.use("/register", usersRouter);
app.use("/dashboard", usersRouter);
app.use("/log-out", usersRouter);
app.use("/membership", usersRouter);


// AUTH :)
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        const user = rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// serializer and deserializer for cookie session info
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.listen(5000);
