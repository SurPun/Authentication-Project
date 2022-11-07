const express = require("express");
const cookieParser = require("cookie-parser");

// Routes
const home = require("./routes/home.js");
const signup = require("./routes/sign-up.js");
const deleteItem = require("./routes/delete");

const staticHandler = express.static("public");
const actions = require("./routes/actions");
const login = require("./routes/log-in.js");
const logout = require("./routes/log-out.js");
const myPage = require("./routes/my-page.js");

// Sessions/Servers
const { getSession, removeSession } = require("./model/session.js");
const body = express.urlencoded({ extended: false });
const cookies = cookieParser(process.env.COOKIE_SECRET);
const server = express();

server.use(staticHandler);

server.use((req, res, next) => {
  const time = new Date().toLocaleTimeString("en-GB");
  console.log(`${time} ${req.method} ${req.url}`);
  next();
});
server.use(cookies);
server.use(sessions);

// Routes Handlers
server.get("/", home.get);

server.get("/signup", sessions, signup.get);
server.post("/signup", body, signup.post);

server.get("/login", sessions, login.get);
server.post("/login", body, login.post);

server.get("/actions", sessions, actions.get);

server.get("/actions/:id", sessions, myPage.get);
server.post("/actions/:id", body, myPage.post);

server.post("/delete", body, deleteItem.post);

server.post("/logout", logout.post);

// Sessions Function
function sessions(req, res, next) {
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  if (session) {
    const expiry = new Date(session.expires_at);
    const today = new Date();
    if (expiry < today) {
      removeSession(sid);
      res.clearCookie("sid");
    } else {
      req.session = session;
    }
  }
  next();
}

module.exports = server;
