const containerExplore = document.getElementById("container-explore")
const containerExploreCategory = document.getElementById("container-explore_category")

let projects;

async function fetchProjects() {
    const res = await fetch(`/api/projects`);
    const data = await res.json();
    const values = data.projects;
    return values;
}


async function createProjectElements() {
    console.log(projects);
    for (let i = 0; i < 5;) {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row", "w-100", "my-5")
        for (let j = 0; j < 5; j++) {
            if (i >= projects.length) break;
            const project = projects[i];
            console.log(project)
            i++;
            const projectDiv = document.createElement('div');
            projectDiv.classList.add("col");
            projectDiv.id = (`project-container-${project.id}`)
            projectDiv.innerHTML = `
                <div class="card mb-2">
                <a href="/projects/${project.id}" class="overflow-hidden">
                    <img class="card-img-top" src="/public/images/loginSignup.png" alt="Card image cap">
                </a>
                <div class="card-body">
                    <a href="/projects/${project.id}" class="card-title font-weight-bold">${project.name}</a>
                    by ${project.User.username} in ${project.Category.name}
                </div >
        <div class="card-footer text-muted">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
                     0
                </div>
                </div >
        `
            rowContainer.append(projectDiv);
        }
        containerExplore.append(rowContainer);

    };
    commentsDisplayContainer.appendChild(commentsDisplayDiv);
}

async function initialSetup() {
    projects = await fetchProjects();
    createProjectElements();
}

initialSetup();