// Discussion Container
const commentsDisplayContainer = document.getElementById("display-comments-container")
const numberOfCommentsDisplay = document.getElementById("display-comments_number-of-comments")

// Dicussion Container Elements
const discussionBoxButtonsInputs = document.getElementById("discussion-box_buttons-inputs");
const buttonAddTip = document.getElementById("button_add-tip");
const buttonAskQuestion = document.getElementById("button_ask-question");
const buttonPostComment = document.getElementById("button_post-comment");
const discussionBoxPostButton = document.getElementById("discussion-box_post-button");

// Paths
const currentPath = window.location.href;
const currentRoute = currentPath.slice(31);
const projectIdRoute = currentRoute.slice(8);
console.log(projectIdRoute)

async function fetchComments(route) {
    const res = await fetch(`/api/comments/${route}`);
    const data = await res.json();
    const { comments } = data;
    return comments;
}

async function createCommentElements() {
    const comments = await fetchComments(currentRoute);

    const res = await fetch('/api/users');
    const data = await res.json();
    const { users } = data;

    numberOfCommentsDisplay.innerHTML = `${comments.length} Discussions`
    comments.forEach(function (comment) {
        const userId = comment.userId - 1;
        const username = users[userId].username;
        const commentDiv = document.createElement('div');
        const small = document.createElement('small');
        commentDiv.classList.add('media');
        commentDiv.classList.add('pt-3');
        commentDiv.classList.add("border-top");
        small.classList.add("text-left")
        small.classList.add("mt-3")
        commentDiv.innerHTML = `
        <div class="media pt-3">
            <a href="member/${username}">
            <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_173e31f9c60%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_173e31f9c60%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
            </a>
            <p class="media-body pb-3 mb-0">
                <a href="member/${username}">
                    <strong class="d-block text-gray-dark">${username}</strong>
                </a>
                ${comment.comment}
            </p>
        </div>
        `
        // small.innerHTML = `<a href="#">Replies</a>`
        commentsDisplayContainer.prepend(commentDiv);
        // commentsDisplayContainer.appendChild(small);
    });
    // commentsDisplayContainer.appendChild(commentsDisplayDiv);
}
async function discussionElementInteractions() {


    buttonPostComment.addEventListener('click', function (e) {
        discussionBoxButtonsInputs.innerHTML = '<textarea class="w-100 h-100" id="discussion-box_text-area"></textarea>'
    });

    discussionBoxPostButton.addEventListener('click', async function (e) {
        const discusionBoxTextArea = document.getElementById('discussion-box_text-area');
        const commentText = discusionBoxTextArea.value;
        console.log(commentText)
        const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment: commentText, userId: 1, projectId: Number.parseInt(projectIdRoute) })
        });
        console.log(res);
        if (res.ok) console.log('success');
        else console.log('failed')
        discussionBoxButtonsInputs.innerHTML = '<div class="text-center"><button class="btn btn-secondary w-25 m-3 py-5" id="button_add-tip">Add Tip</button><button class="btn btn-secondary w-25 m-3 py-5" id="button_ask-question">Ask Question</button><button class="btn btn-secondary w-25 m-3 py-5" id="button_post-comment">Post Comment</button></div>'

        commentsDisplayContainer.innerHTML = '';
        createCommentElements();
    })
}
createCommentElements();
discussionElementInteractions();
