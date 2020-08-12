async function createCommentElements() {
    const commentsDisplayContainer = document.getElementById("display-comments-container")
    const numberOfCommentsDisplay = document.getElementById("display-comments_number-of-comments")
    const res = await fetch('/api/comments');
    // const { comments } = data.json();
    const data = await res.json();
    const comments = data.comment;
    // const commentsDisplayDiv = document.createElement("div");
    // commentsDisplayDiv.classList.add("comments-display_div");
    numberOfCommentsDisplay.innerHTML = `${comments.length} Discussions`
    comments.forEach(function (comment) {
        const commentDiv = document.createElement("div");
        // const commentImg = document.createElement("img");
        // const commentBodyDiv = document.createElement("div");
        // const commentTopDiv = document.createElement("div");
        // const userName = document.createElement("strong");
        // const commentSpan = document.createElement("span");
        commentDiv.classList.add("media");
        commentDiv.classList.add("pt-3");
        // commentImg.classList.add("mr-2");
        // commentImg.classList.add("rounded");
        // commentBodyDiv.classList.add("media-body")
        // commentBodyDiv.classList.add("pb-3")
        // commentBodyDiv.classList.add("mb-0")
        // commentBodyDiv.classList.add("small")
        // commentBodyDiv.classList.add("lh-125")
        // commentBodyDiv.classList.add("lh-125")

        // commentBodyDiv.classList.add("media-body pb-3 mb-0 small lh-125 border-bottom border-gray")

        // commentTopDiv.classList.add("d-flex")
        // commentTopDiv.classList.add("d-flex justify-content-between align-items-center w-100")

        // userName.classList.add("text-gray-dark");
        // userName.innerHTML = comment.userName;
        // commentSpan.innerHTML = comment.comment;
        // userName.appendChild(commentSpan);
        // commentTopDiv.appendChild(userName);
        // commentBodyDiv.appendChild(commentTopDiv);
        // commentImg.appendChild(commentBodyDiv);
        // commentDiv.appendChild(commentImg);
        commentDiv.innerHTML = comment.comment
        commentsDisplayContainer.appendChild(commentDiv);
    });
    // commentsDisplayContainer.appendChild(commentsDisplayDiv);
}

createCommentElements();
