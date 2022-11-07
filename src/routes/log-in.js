const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../model/user.js");
const { createSession } = require("../model/session.js");
const { Layout, loginForm } = require("../templates/templates");
const { sanitize } = require("../templates/sanitize");

function get(req, res) {
  const title = "Log in to your account";
  const content = loginForm(title);
  const userFromSession = req.session;
  const body = Layout({ title, content });

  if (userFromSession) {
    res.send("You're already logged in");
  }

  res.send(body);
}

// ------------------------------------------------------------

function post(req, res) {
  const { email, password } = req.body;
  const user = getUserByEmail(sanitize(email));
  const title = "Log in to your account";
  const error = {};

  if (!email) {
    error.email = "Please enter your email";
  }

  if (Object.keys(error).length > 0) {
    const body = Layout({ title, content: loginForm(title, error, req.body) });
    return res.status(400).send(body);
  }

  if (!user) {
    error.user = "This user does not exist";
    const body = Layout({ title, content: loginForm(title, error, req.body) });
    return res.status(400).send(body);
  } else {
    bcrypt.compare(password, user.hash).then((match) => {
      if (!match) {
        return res.status(400).send("<h1>Login failed</h1>");
      } else {
        const session_id = createSession(user.id);
        res.cookie("sid", session_id, {
          signed: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
          sameSite: "lax",
          httpOnly: true,
        });
        res.redirect(`/actions?id=${user.id}`);
      }
    });
  }
}

module.exports = { get, post };
