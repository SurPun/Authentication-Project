const { removeAction } = require("../model/actions");

function post(req, res) {
  const { action_id } = req.body;
  const path = req.get("Referer");

  removeAction(Number(action_id));
  res.redirect(path);
}

module.exports = { post };
