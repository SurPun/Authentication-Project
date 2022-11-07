const { Layout, ActionsTable, Navigation } = require("../templates/templates");
const { listActions } = require("../model/actions");

function get(req, res) {
  const userId = req.session && req.session.user_id;
  const pageOwner = Number(req.query.id);
  const categoryList = listActions();
  const userActions = ActionsTable(categoryList, userId);
  const pageNavigation = Navigation(req.session.user_id);
  const content = `${pageNavigation} ${userActions}`;

  if (!userId) {
    res.send("You're not allowed to access this page");
  }

  if (pageOwner !== userId) {
    res.status(401).send("Something went wrong");
  }

  res.send(Layout({ title: "Actions", content }));
}

module.exports = { get };
