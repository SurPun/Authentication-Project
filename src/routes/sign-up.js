const { createUser } = require("../model/user");
const { Layout, signUpForm } = require("../templates/templates");
const { createSession } = require("../model/session.js");
const { sanitize } = require("../templates/sanitize");
const bcrypt = require("bcryptjs");

function get(req, res) {
  const title = "Create an account";
  const content = signUpForm(title);
  const userFromSession = req.session;

  if (userFromSession) {
    res.send("You're already logged in");
  }

  const body = Layout({ title, content });
  res.send(body);
}

// ------------------------------------------------------------

function post(req, res) {
  const { name, email, password } = req.body;
  const error = {};
  const title = "Create an account";

  if (!name) {
    error.name = "Please enter your name";
  }

  if (!email) {
    error.email = "Please enter your email";
  }

  if (Object.keys(error).length > 0) {
    const body = Layout({ title, content: signUpForm(title, error, req.body) });
    return res.status(400).send(body);
  } else {
    bcrypt.hash(password, 12).then((hash) => {
      const user = createUser(sanitize(name), sanitize(email), hash);
      const sessionId = createSession(user.id);

      res.cookie("sid", sessionId, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "lax",
        httpOnly: true,
      });

      res.redirect(`/actions?id=${user.id}`);
    });
  }
}

module.exports = { get, post };
