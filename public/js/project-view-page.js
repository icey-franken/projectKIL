const projectHeader = document.getElementById("project-header")
const projectIntroImage = document.getElementById("project-intro_image")
const projectIntroDestruction = document.getElementById("project-intro_destruction")
const projectStepsContainer = document.getElementById("project-steps-container")

let project;
function createCarousel() {
    return `
        <div class="container my-4">
            <!--Carousel Wrapper-->
            <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
            <!--Slides-->
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(88).jpg" alt="First slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(121).jpg" alt="Second slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg" alt="Third slide">
                </div>
            </div>
            <!--/.Slides-->
            <!--Controls-->
            <a class="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            <!--/.Controls-->
            <ol class="carousel-indicators">
                <li data-target="#carousel-thumb" data-slide-to="0" class="active"> <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(88).jpg"
                    class="img-fluid"></li>
                <li data-target="#carousel-thumb" data-slide-to="1"><img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(121).jpg"
                    class="img-fluid"></li>
                <li data-target="#carousel-thumb" data-slide-to="2"><img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/Carousel-thumbs/img%20(31).jpg"
                    class="img-fluid"></li>
            </ol>
            </div>
            <!--/.Carousel Wrapper-->
        </div>
  `
}


const currentPath = window.location.href;
const currentRoute = currentPath.slice(31, 32);
console.log(currentRoute);

async function fetchProject() {
    const res = await fetch(`/api/projects/${currentRoute}`);
    const data = await res.json();
    const values = data.project;
    console.log(data);
    console.log(values)
    return values;
}

async function createProjectHeader() {
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

async function createProjectSteps() {
    projectStepsContainer.innerHTML = project.destructions;
}

async function initialSetup() {
    project = await fetchProject();
    createProjectHeader();
    console.log(projectIntroImage)
    projectIntroImage.innerHTML = createCarousel();
    projectIntroDestruction.innerHTML = project.intro;
    createProjectSteps();
}

initialSetup();
