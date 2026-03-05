const form = document.getElementById("postForm");
const postList = document.getElementById("postList");

form.addEventListener("submit", function(e){

e.preventDefault();

const title = document.getElementById("title").value;
const author = document.getElementById("author").value;
const content = document.getElementById("content").value;

const postDiv = document.createElement("div");
postDiv.classList.add("post");

postDiv.innerHTML = `
<h3>${title}</h3>
<p><b>Author:</b> ${author}</p>
<p>${content}</p>
`;

postList.prepend(postDiv);

form.reset();

});