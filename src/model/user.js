const db = require("../database/db.js");

const insertUser = db.prepare(
  /*sql*/
  `
    INSERT INTO users (
        name, 
        email, 
        hash
    )

    VALUES (
        $name, 
        $email, 
        $hash
    )
    RETURNING id
`
);

function createUser(name, email, hash) {
  return insertUser.get({ name, email, hash });
}

const select_user_by_email = db.prepare(
  /*sql*/
  `
  SELECT 
    id, 
    name, 
    email, 
    hash, 
    created_at 
  FROM users 
  
  WHERE email = ?
`
);

function getUserByEmail(email) {
  return select_user_by_email.get(email);
}

const select_user_by_id = db.prepare(
  /*sql*/
  `
  SELECT 
  id, 
  name, 
  email, 
  hash, 
  created_at 
  FROM users 
  
  WHERE id = ?
`
);

function getUserByid(id) {
  return select_user_by_id.get(id);
}

module.exports = { createUser, getUserByEmail, getUserByid };
