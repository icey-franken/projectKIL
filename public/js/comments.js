// Discussion Container
const commentsDisplayContainer = document.getElementById("display-comments-container")
const numberOfCommentsDisplay = document.getElementById("display-comments_number-of-comments")

// Dicussion Container Elements
const discussionBoxButtonsInputs = document.getElementById("discussion-box_buttons-inputs");
const buttonAddTip = document.getElementById("button_add-tip");
const buttonAskQuestion = document.getElementById("button_ask-question");
const buttonPostComment = document.getElementById("button_post-comment");
const discussionBoxPostButton = document.getElementById("discussion-box_post-button");
const discusionBoxTextArea = document.getElementById('discussion-box_text-area');
const discussionBoxButtons = document.getElementById("discussion-box_buttons");
const discussionJumbotron = document.querySelector(".jumbotron");

// Paths
let currentPath = window.location.href;
const digitPath = (function () {
    let charCount = 0;

    if (currentPath[currentPath.length - 1] === '/') {
        currentPath = currentPath.slice(0, currentPath.length - 1);
    }
    for (let i = currentPath.length - 1; i > 0; i--) {
        let char = currentPath[i];
        charCount++;
        if (char === "/") break
    }
    return charCount;
})();
const currentRoute = currentPath.slice(currentPath.length - digitPath + 1);
//variables
let comments;
let users;

function getTimestampFromDate(dateAndTime) {
    const year = dateAndTime.slice(0, 4);
    const month = dateAndTime.slice(5, 7);
    const day = dateAndTime.slice(8, 10);
    const hours = dateAndTime.slice(11, 13);
    const minutes = dateAndTime.slice(14, 16);
    const seconds = dateAndTime.slice(17, 19);
    const milliseconds = dateAndTime.slice(20, 23);

    // return milliseconds + (seconds * 1000) + (minutes * 60000) + (hours * 3600000) + (day * 86400000) + (month * 2592000000) + ((year - 1970) * 31536000000)
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}:${milliseconds}Z`
}

function timeDifference(current, previous) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}

async function fetchComments(route) {
    const res = await fetch(`/api/comments/project/${route}`);
    const data = await res.json();
    const value = data.comments;
    return value;
}

async function fetchAllUsers() {
    const res = await fetch('/api/users');
    const data = await res.json();
    const { users } = data;
    return users;
}
async function initialSetup() {
    users = await fetchAllUsers();
    comments = await fetchComments(currentRoute);
    numberOfCommentsDisplay.innerHTML = `${comments.length} Discussions`
    createCommentElements();
    discussionElementInteractions();
}


async function createCommentElements() {
    for (let comment of comments) {
        const username = comment.User.username;
        const commentDiv = document.createElement('div');
        const small = document.createElement('small');

        const currentTimestamp = Date.now();
        const commentTimestamp = new Date(comment.updatedAt).getTime();
        const timeAgo = timeDifference(currentTimestamp, commentTimestamp)
        commentDiv.classList.add('media');
        commentDiv.classList.add('pt-3');
        commentDiv.classList.add("border-top");
        commentDiv.id = (`comment-container-${comment.id}`)
        small.classList.add("text-left")
        small.classList.add("mt-3")
        commentDiv.innerHTML = `
            <article class="w-100">
                <div class="post-header">
                    <div class="d-flex align-items-center w-100">
                        <div class="avatar">
                            <a href="/member/${username}/">
                                <img class="poster lazyloaded" src="https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg">
                            </a>
                        </div>
                        <div class="px-5">
                            <a class="author" href="/member/${username}/">${username}</a>
                            <p class="posted-date">
                                ${timeAgo}
                            </p>
                            <button type="button" class="btn btn-primary" id="comment-button_edit">Edit</button>
                            <button type="button" class="btn btn-primary" id="comment-button_delete">Delete</button>
                        </div>
                    </div>
                </div>
                <div class="text-break my-3">
                    <p class="quarantine-message js-quarantine-message" id="comment-${comment.id}">${comment.comment}</p>
                    <div class="hidden" id="comment_text-area-container-${comment.id}">
                        <textarea class="w-100 h-100" contentEditable="true" id="comment_text-area-container_text-area-${comment.id}"></textarea>
                        <button class="btn btn-primary my-2" id="comment_text-area_update-button-${comment.id}">Update</button>
                    </div>
                </div>
                <div class="js-edit-container"></div>
                <div class="photos js-photos"></div>
                <div class="attachments js-attachments"></div>
            </article>
        `
        commentsDisplayContainer.prepend(commentDiv);
        const commentContainer = document.getElementById(`comment-container-${comment.id}`);
        const commentId = document.getElementById(`comment-${comment.id}`);
        const commentTextAreaContainer = document.getElementById(`comment_text-area-container-${comment.id}`);
        const commentTextAreaContainerTextArea = document.getElementById(`comment_text-area-container_text-area-${comment.id}`);
        commentTextAreaContainerTextArea.value = comment.comment;
        const commentButtonEdit = document.getElementById("comment-button_edit");
        const commentButtonDelete = document.getElementById("comment-button_delete");
        const commentTextAreaUpdateButton = document.getElementById(`comment_text-area_update-button-${comment.id}`)

        commentButtonEdit.addEventListener('click', async function (e) {
            commentButtonEdit.classList.add('hidden');
            commentId.classList.add('hidden');
            commentTextAreaContainer.classList.remove('hidden');
            commentTextAreaContainerTextArea.focus();
        });

        commentTextAreaUpdateButton.addEventListener('click', async function (e) {
            const updateCommentTextAreaValue = commentTextAreaContainerTextArea.value;
            if (updateCommentTextAreaValue) {
                const res = await fetch(`/api/comments/${comment.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ updatedComment: updateCommentTextAreaValue })
                });
                if (res.ok) {
                    commentButtonEdit.classList.remove('hidden');
                    commentId.classList.remove('hidden');
                    commentTextAreaContainer.classList.add('hidden');
                    commentId.innerHTML = updateCommentTextAreaValue;
                }
                else console.log('failed')
            }
            else {
                alert('Must enter something to update')
                commentTextAreaContainerTextArea.value = comment.comment;
                commentTextAreaContainerTextArea.focus();
            }
        });
        commentTextAreaContainerTextArea.addEventListener('blur', function (e) {
            console.log(e.relatedTarget)
            if (!e.relatedTarget) {
                commentButtonEdit.classList.remove('hidden');
                commentId.classList.remove('hidden');
                commentTextAreaContainer.classList.add('hidden');
            }

        }, true);
        commentButtonDelete.addEventListener('click', async function (e) {
            const res = await fetch(`/api/comments/${comment.id}`, {
                method: "DELETE",
            });
            console.log(res);
            if (res.ok) {
                commentContainer.outerHTML = '';
                comments = await fetchComments(currentRoute);
                numberOfCommentsDisplay.innerHTML = `${comments.length} Discussions`;
            }
            else console.log('failed')
        })
    };
    // commentsDisplayContainer.appendChild(commentsDisplayDiv);
}

async function discussionElementInteractions() {


    discussionBoxButtons.addEventListener('click', function (e) {
        discussionBoxButtons.classList.add('hidden');
        discusionBoxTextArea.classList.remove('hidden');
        discusionBoxTextArea.focus();
        if (discusionBoxTextArea.value) discussionBoxPostButton.disabled = false;
    });

    discusionBoxTextArea.addEventListener('blur', function (e) {
        console.log('blurred')
        console.log(e.relatedTarget);
        if (!e.relatedTarget) {
            console.log('hiding')
            discusionBoxTextArea.classList.add('hidden');
            discussionBoxButtons.classList.remove('hidden');
            discussionBoxPostButton.disabled = true;
        }
    });
    discusionBoxTextArea.addEventListener('input', function (e) {
        if (discusionBoxTextArea.value) {
            discussionBoxPostButton.disabled = false;
        } else discussionBoxPostButton.disabled = true;
    });
    discussionBoxPostButton.addEventListener('click', async function (e) {
        const commentText = discusionBoxTextArea.value;
        // const commentText = commentValue.replace(/\n\r?/g, '<br />');
        if (commentText) {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment: commentText, userId: 1, projectId: Number.parseInt(currentRoute) })
            });
            if (res.ok) {
                commentsDisplayContainer.innerHTML = '';
                console.log('posted')
                comments = await fetchComments(currentRoute);
                discussionBoxPostButton.disabled = true;
                numberOfCommentsDisplay.innerHTML = `${comments.length} Discussions`;
                discusionBoxTextArea.value = '';
                createCommentElements();

            }
            else console.log('failed')

        }
        else alert('Please enter a comment')
        discusionBoxTextArea.classList.add('hidden');
        discussionBoxButtons.classList.remove('hidden');
    })
}
initialSetup();
