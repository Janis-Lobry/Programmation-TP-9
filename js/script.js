let currentUser;
let currentPublication;
let userPostCommentsCtn = document.createElement("div");

// 1.2
function getUsersData() {
  let req = new XMLHttpRequest();
  let route = "https://jsonplaceholder.typicode.com/users";
  let httpMethod = "GET";
  req.overrideMimeType("application/json");
  req.open(httpMethod, route, true);

  req.onreadystatechange = function() {

    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let data = JSON.parse(req.responseText);
        displayUsers(data);
      } else {
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
      }
    }
  };
  req.send(null);
}

getUsersData();

// 1.3
function displayUsers(data) {
  let usersList = document.createElement("div");
  usersList.style.position = "fixed";
  document.body.appendChild(usersList);

  for (var i = 0; i < data.length; i++) {
    let currentElement = data[i];
    let buttonName = document.createElement("button");
    buttonName.textContent = currentElement.name;
    buttonName.setAttribute("class", "btnUser");

    buttonName.addEventListener('click', function() {
      if (userData) {
        document.body.removeChild(userData)
      }
      if (userPosts) {
        document.body.removeChild(userPosts)
      }
      btns = document.getElementsByClassName('btnUser');
      let currentBtn;
      for (var i = 0; i < btns.length; i++) {
        currentBtn = btns[i];
        currentBtn.style.fontWeight = "inherit";
      }
      buttonName.style.fontWeight = 'bold';
      getUserData(currentElement.id);

    });
    usersList.appendChild(buttonName);


  }
}

// 2.1
function getUserData(id) {
  let req = new XMLHttpRequest();
  let route = "https://jsonplaceholder.typicode.com/users/" + id;
  let httpMethod = "GET";
  req.overrideMimeType("application/json");
  req.open(httpMethod, route, true);

  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let data = JSON.parse(req.responseText);
        currentUser = data;
        displayUser(currentUser);
        getUserPostsData(currentUser.id);
      } else {
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
      }
    }
  };
  req.send(null);
}

// 2.2
let userData;

function displayUser(data) {
  userData = document.createElement("div");
  document.body.appendChild(userData);
  userData.style.position = "fixed";
  userData.style.right = "0px";

  let name = document.createElement("h4");
  name.textContent = "Nom  :";
  userData.appendChild(name);

  let nameValue = document.createElement("p");
  nameValue.textContent = data.name;
  userData.appendChild(nameValue);

  let pseudo = document.createElement("h4");
  pseudo.textContent = "Nom d'utilisateur :";
  userData.appendChild(pseudo);

  let pseudoValue = document.createElement("p");
  pseudoValue.textContent = data.username;
  userData.appendChild(pseudoValue);

  let city = document.createElement("h4");
  city.textContent = "Ville :";
  userData.appendChild(city);

  let cityValue = document.createElement("p");
  cityValue.textContent = data.address.city;
  userData.appendChild(cityValue);

  let website = document.createElement("h4");
  website.textContent = "Site :";
  userData.appendChild(website);

  let websiteValue = document.createElement("p");
  websiteValue.textContent = data.website;
  userData.appendChild(websiteValue);
}

// 3.1
function getUserPostsData(userId) {
  let req = new XMLHttpRequest();
  let route = "https://jsonplaceholder.typicode.com/posts?userId=" + userId;
  let httpMethod = "GET";
  req.overrideMimeType("application/json");
  req.open(httpMethod, route, true);

  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let data = JSON.parse(req.responseText);
        console.log(data);
        displayUserPosts(data);
      } else {
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
      }
    }
  };
  req.send(null);
}

// 3.2
let userPosts;

function displayUserPosts(data) {
  userPosts = document.createElement("div");
  userPosts.setAttribute("class", "post-ctn");
  document.body.appendChild(userPosts);

  for (let i = data.length - 1; i >= 0; i--) {
    let currentElement = data[i];

    let postsCtn = document.createElement("div");
    postsCtn.setAttribute("class", "container mb-4")
    userPosts.appendChild(postsCtn);

    let postNameValue = document.createElement("label");
    postNameValue.textContent = currentUser.name;
    postNameValue.style.fontWeight = 'bold';
    postsCtn.appendChild(postNameValue);

    let postPseudoValue = document.createElement("label");
    postPseudoValue.innerHTML = `<small>@${currentUser.username}</small>`;
    postPseudoValue.setAttribute("class", "userDataTitle ml-2")
    postsCtn.appendChild(postPseudoValue);

    let postTitleValue = document.createElement("p");
    postTitleValue.textContent = currentElement.title;
    postTitleValue.style.fontWeight = 'bold';
    postsCtn.appendChild(postTitleValue);

    let postBodyValue = document.createElement("p");
    postBodyValue.textContent = currentElement.body;
    postsCtn.appendChild(postBodyValue);

    postsCtn.addEventListener("click", function() {
      getCommentsData(currentElement.id);
      currentPublication = postsCtn.innerHTML;
    }, false)
  }
}
// 4.1
function getCommentsData(postId) {
  let req = new XMLHttpRequest();
  let route = "https://jsonplaceholder.typicode.com/comments?postId=" + postId;
  let httpMethod = "GET";
  req.overrideMimeType("application/json");
  req.open(httpMethod, route, true);

  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let data = JSON.parse(req.responseText);
        console.log(data.length + " commentaires");
        console.log(data);
        displayComments(data);
      } else {
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
      }
    }
  };
  req.send(null);
}

// 4.2
function displayComments(data) {
  userPostCommentsCtn.innerHTML = "";
  userPostCommentsCtn.setAttribute("class", "comments-ctn");
  document.body.appendChild(userPostCommentsCtn);

  let publicationCtn = document.createElement("p");
  publicationCtn.innerHTML = currentPublication;
  userPostCommentsCtn.appendChild(publicationCtn);


  let userPostCommentsNb = document.createElement("p");
  userPostCommentsNb.textContent = data.length + " commentaires";
  userPostCommentsCtn.appendChild(userPostCommentsNb);

  for (let i = 0; i < data.length; i++) {
    let currentElement = data[i];

    let userPostCommentsTitle = document.createElement("p");
    userPostCommentsTitle.textContent = currentElement.title;
    userPostCommentsCtn.appendChild(userPostCommentsTitle);

    let userPostCommentsBody = document.createElement("p");
    userPostCommentsBody.textContent = currentElement.body;
    userPostCommentsCtn.appendChild(userPostCommentsBody);
  }
}
