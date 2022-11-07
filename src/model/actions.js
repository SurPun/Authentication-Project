const db = require("../database/db.js");

const select_all_actions = db.prepare(
  /*sql*/
  `
    SELECT 
        actions.action, 
        actions.category, 
        users.name, 
        users.id, 
        actions.id AS action_id, 
        actions.user_id
    FROM actions

    JOIN users 
    ON actions.user_id = users.id
    WHERE actions.private = 0
`
);

function listActions() {
  return select_all_actions.all();
}

// ----------------------------------------------------------------------

const select_user_actions = db.prepare(
  /*sql*/
  `
    SELECT 
        actions.action, 
        actions.category, 
        users.name, users.id, 
        actions.id AS action_id, 
        actions.user_id
    FROM actions

    JOIN users 
    ON actions.user_id = users.id
    WHERE actions.user_id = $id
    AND actions.private = 1
`
);

function listUserActions(id) {
  return select_user_actions.all({ id });
}

// ----------------------------------------------------------------------

const insert_action = db.prepare(
  /*sql */
  `
    INSERT INTO actions (
        action, 
        user_id, 
        category, 
        private
      )
        
    VALUES(
        $action, 
        $user_id, 
        $category, 
        $private
      )
    RETURNING id, action, user_id, category
`
);

function addAction(action, user_id, category, private) {
  return insert_action.get({
    action,
    user_id,
    category,
    private,
  });
}

// ----------------------------------------------------------------------

const delete_action = db.prepare(
  /*sql */
  `
    DELETE FROM actions 
    WHERE id = ?
`
);

function removeAction(id) {
  return delete_action.run(id);
}

module.exports = { listActions, listUserActions, addAction, removeAction };
