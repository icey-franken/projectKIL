const projectHeader = document.getElementById("project-header")
const projectIntroImage = document.getElementById("project-intro_image")
const projectOwnerContainer = document.getElementById("project-owner-container")
const projectSupplies = document.getElementById("project-supplies")
const projectStepsContainer = document.getElementById("project-steps-container")
const editProjectButton = document.getElementById("edit");
const endOfProjectDetails = document.getElementById("end-of-project-details")
const endOfSupplies = document.getElementById('end-of-supplies')
let project;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createCarousel() {
    let projectImages = project.images;
    console.log(projectImages)
    let projectImagesString = '';
    if (projectImages) {
        let randomImageIndex = getRndInteger(0, projectImages.length)
        let projectImage = projectImages[randomImageIndex];
        console.log(projectImage);
        // let splitProjectImageString = projectImage.split('.');
        // if (splitProjectImageString[randomImageIndex] = 'jpeg') {
        //     splitProjectImageString[randomImageIndex] = 'jpg'
        //     projectImage = splitProjectImageString.join('.')
        // }
        projectImagesString += `
            <div class="container text-center my-4">
                <img class=" w-75" src="https://destructables-storage-dev.s3-us-west-1.amazonaws.com/${projectImage}">
            </div>
      `
    }

    return projectImagesString
}


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

async function fetchProject() {
    const res = await fetch(`/api/projects/${currentRoute}`);
    const data = await res.json();
    const values = data.project;
    return values;
}

function createProjectHeader() {
    projectHeader.outerHTML = `
            <div class = "page-header">
            <h1>
               ${project.name}
            </h1>
            <small>by ${project.User.username} in ${project.Category.name} 0 views 0 favorites </small>
            </div>
            <div class="row flex-nowrap justify-content-between align-items-center">
            <div class="col-4 pt-1">
                Published Aug 14th, 2020
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center">
                <a class="btn btn-sm btn-outline-secondary" href="#">Download</a>
                <a class="btn btn-sm btn-outline-secondary" href="#">Favorite</a>
            </div>
            </div>
        `
};

function createProjectOwnerContainer() {
    return `
    <div class="media">
        <img class="align-self-center mr-3 poster" src="https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg" alt="Generic placeholder image">
    <div class="media-body">
        <h5 class="mt-0">by ${project.User.username}</h5>
        <p>${project.intro}</p>
    </div>
    </div>
    `
}

function createSupplies() {
    return `<h1>Supplies</h1>
    <p>${project.supplies}</p>`
}

function createEndOfStepHTML() {
    return `
    <div class="container text-center py-4">
        <button class="btn btn-primary btn-sm mx-3">Add</button><button class="btn btn-primary btn-sm mx-3">TipAsk</button><button class="btn btn-primary btn-sm mx-3">Question</button><button class="btn btn-primary btn-sm mx-3">Comment</button>
    </div>
    <hr width="20%">`
}

function createProjectSteps() {
    const destructions = project.destructions;
    const destructionHeadings = project.destructionsHeadings;

    for (let i = 0; i < destructions.length; i++) {
        const stepDiv = document.createElement("div");
        const imageDiv = document.createElement("div");
        const stepNumberHeader = document.createElement("h1");
        const stepDestruction = document.createElement("p");
        const endOfStepSeperatorDiv = document.createElement('div');
        const stepNumber = i + 1;
        const destructionHeading = destructionHeadings[i];
        endOfStepSeperatorDiv.innerHTML = createEndOfStepHTML();
        endOfStepSeperatorDiv.addEventListener('click', (e) => {
            endOfProjectDetails.scrollIntoView();
        })
        stepDiv.classList.add('container');
        stepNumberHeader.classList.add('text-center')
        stepDestruction.classList.add('container', 'w-50');
        if (destructionHeading) stepNumberHeader.innerHTML = `Step ${stepNumber}: ${destructionHeading}`;
        else stepNumberHeader.innerHTML = `Step ${stepNumber}`;
        stepDiv.appendChild(stepNumberHeader);
        imageDiv.innerHTML = createCarousel();
        stepDestruction.innerHTML = `${destructions[i]}`;
        stepDiv.appendChild(imageDiv);
        stepDiv.appendChild(stepDestruction);
        stepDiv.appendChild(endOfStepSeperatorDiv);
        projectStepsContainer.appendChild(stepDiv);
    };
}

async function initialSetup() {
    project = await fetchProject();
    checkEditPriv(project.userId);
    createProjectHeader();
    projectIntroImage.innerHTML = createCarousel();
    projectOwnerContainer.innerHTML = createProjectOwnerContainer();
    projectSupplies.innerHTML = createSupplies();
    endOfSupplies.innerHTML = createEndOfStepHTML();
    endOfSupplies.addEventListener('click', (e) => {
        endOfProjectDetails.scrollIntoView();
    })
    createProjectSteps();
    editProjectButton.href = `/editDestructable/${currentRoute}`;
}

initialSetup();


async function checkEditPriv(projectUserId) {
    const editButton = document.querySelector('#edit-destruction');
    const cookies = document.cookie;
    const res1 = await fetch(`/api/users/signinstate`, {
        method: 'post',
        body: JSON.stringify({ cookies }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { token } = await res1.json();
    const res2 = await fetch(`/api/users/getUserId`, {
        method: 'post',
        body: JSON.stringify({ token }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { userId } = await res2.json();
    console.log(userId);
    console.log(projectUserId);
    if (userId !== projectUserId) { editButton.remove() }
}
