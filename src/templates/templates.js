const { validation } = require("../templates/sanitize");

function Layout({ title, content }) {
  return /*html*/ `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width">
          <link href="/styles.css" rel="stylesheet"/>
          <title>${title}</title>
        </head>
        <body>
            <main>
              ${content}
            </main>
          </div>
        </body>
      </html>
    `;
}

// ------------------------------------------------------------

function signUpForm(title, error = {}, value = {}) {
  return /*html*/ `
        <div class="Cover">
          <h1>${title}</h1>
          <form method="POST" class="Row">
          <div class="Stack" style="--gap: 0.25rem">
              <label for="name">Name</label>
              <input type="name" id="name" name="name" value='${
                value.name ? value.name : ""
              }'>
              ${validation(error.name)}
            </div>
            <div class="Stack" style="--gap: 0.25rem">
              <label for="email">email</label>
              <input type="email" id="email" name="email" value='${
                value.email ? value.email : ""
              }'> ${validation(error.email)}
            </div>
            <div class="Stack" style="--gap: 0.25rem">
              <label for="password">password</label>
              <input type="password" id="password" name="password">
            </div>
            <button class="btn">Sign up</button>
          </form>
        </div>
      `;
}

// ------------------------------------------------------------

function Navigation(id) {
  return /*html*/ `
      <nav class="main-nav">
      <h1><a href="/">Stop, Go, Continue!</a></h1>
      <a href="/actions/${id}">My page</a>
      <form method='POST' action="/logout"><button>Log out</button></form>
      </nav>`;
}

// ------------------------------------------------------------

function loginForm(title, error = {}, value = {}) {
  return /*html */ `
    <div class="Cover">
       <h1>${title}</h1>
       <form method="POST" class="Row">
          <div class="Stack" style="--gap: 0.25rem">
            <label for="email">email</label>
            ${validation(error.user)}
            <input type="email" id="email" name="email" value='${
              value.email ? value.email : ""
            }'>
            ${validation(error.email)}
          </div>
          <div class="Stack" style="--gap: 0.25rem">
            <label for="password">password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button class="Button">Log in</button>
      </form>
    </div>
    `;
}

// ------------------------------------------------------------

function ActionsTable(list, id) {
  const actions = list.map((action) => {
    return `<li class="tile ${action.category}"> 
    <span class="category">${action.category}</span>
    <span>${action.action}</span>
    <span class="name">@${action.name}</span>
    ${
      action.user_id === Number(id)
        ? `<form method="POST" action="/delete">
      <input name="action_id" type="hidden" value="${action.action_id}">
      <input name="user_id" type="hidden" value="${id}">
      <button aria-label="delete post">&cross;</button>
    </form>`
        : ""
    }
    </li>`;
  });
  return /*html*/ `
    <ul class="grid-container">
      ${actions.join("")}
    </ul>
    `;
}

// ------------------------------------------------------------

function myPageForm(user, id, userActions) {
  return `
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
}

// ------------------------------------------------------------

function homePageLogin(title, req, res) {
  return `
      <div class="Cover">
      <h1>${title}</h1>
      ${
        req.session
          ? res.redirect(`/actions?id=${req.session.user_id}`)
          : /*html*/ `
          <nav class="login-nav">
            <a class="btn primary-btn" href="/login">Log in</a> 
            or 
            <a class="btn" href="/signup">Sign up</a>
          </nav>
          `
      }
      </div>`;
}

module.exports = {
  Layout,
  signUpForm,
  ActionsTable,
  loginForm,
  Navigation,
  myPageForm,
  homePageLogin,
};
