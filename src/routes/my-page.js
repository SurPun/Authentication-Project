const { Layout, ActionsTable, Navigation } = require("../templates/templates");
const { getUserByid } = require("../model/user.js");
const { addAction, listUserActions } = require("../model/actions.js");
const { sanitize } = require("../templates/sanitize");

function get(req, res) {
  const id = Number(req.params.id);
  const userActions = ActionsTable(listUserActions(id), id);
  const userFromSession = req.session && req.session.user_id;
  const pageNavigation = Navigation(req.session.user_id);
  const user = getUserByid(id);

  const content = /*html*/ `
  ${pageNavigation}
      <div class="containerk my-page">
      
        <h1 class="">${user.name}</h1>

        <form method="POST" action="/actions/${id}">

          <div class="Stack" style="--gap: 0.25rem">
            <label for="message">Action:</label>
            <textarea id="message" name="message" rows="8" cols="50" required></textarea>
          </div>
          <div class="Stack" style="--gap: 0.25rem">
            <label for="category">Category:</label>
            <select name="category" id="category">
              <option value="stop">Stop</option>
              <option value="go">Go</option>
              <option value="continue">Continue</option>
            </select>
          </div>
          <div class="Stack" style="--gap: 0.25rem">
            <label for="postType">Action type:</label>
            <select name="postType" id="postType">
              <option value="1" selected>Personal</option>
              <option value="0">Public</option>
            </select>
          </div>
          <label></label>
          <button class="btn btn-primary">Post</button>

        </form>
        <ul>
          ${userActions}
        </ul>
      </div>
    `;

  if (!userFromSession) {
    res.send("You're not allowed to access this page");
  }

  if (id !== userFromSession) {
    res.send("You're not allowed to access this page");
  }

  const body = Layout({ title: "My Page", content });
  res.send(body);
}

// ------------------------------------------------------------

function post(req, res) {
  const id = req.params.id;
  const { message, category, postType } = req.body;

  addAction(sanitize(message), id, category, Number(postType));

  let pageToGoTo;

  postType === "0"
    ? (pageToGoTo = `/actions?id=${id}`)
    : (pageToGoTo = `/actions/${id}`);
  res.redirect(pageToGoTo);
}

module.exports = { get, post };
