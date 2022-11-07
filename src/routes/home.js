const { Layout, homePageLogin } = require("../templates/templates");

function get(req, res) {
  const title = "Stop, Go, Continue!";
  const content = `${homePageLogin(title, req, res)}`;
  const body = Layout({ title, content });

  res.send(body);
}

module.exports = { get };
