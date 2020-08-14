const containerExplore = document.getElementById("container-explore")
const containerExploreCategory = document.getElementById("container-explore_category")

let projects;
let users;

async function fetchProjects() {
    const res = await fetch(`/api/projects`);
    const data = await res.json();
    const values = data.projects;
    console.log(data);
    return values;
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

async function createProjectElements() {
    projects.forEach(function (project) {
        const projectDiv = document.createElement('div');

        const currentTimestamp = Date.now();
        const projectTimestamp = new Date(project.updatedAt).getTime();
        const timeAgo = timeDifference(currentTimestamp, projectTimestamp)
        projectDiv.classList.add("col-lg-3");
        projectDiv.id = (`project-container-${project.id}`)
        projectDiv.innerHTML = `
            <div class="card mb-2">
            <a href="/projects/${project.id}/" class="overflow-hidden">
                <img class="card-img-top" src="public/images/loginSignup.png" alt="Card image cap">
            </a>
            <div class="card-body">
                <h4 class="card-title font-weight-bold">${project.name}</h4>
                <p class="card-text">${project.intro}</p>
                <a class="btn btn-primary btn-md btn-rounded">Button</a>
            </div>
            </div>
        `
        containerExploreCategory.append(projectDiv)

    });
    // commentsDisplayContainer.appendChild(commentsDisplayDiv);
}

async function initialSetup() {
    projects = await fetchProjects();
    createProjectElements();
}

initialSetup();
