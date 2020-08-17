const searchForm = document.getElementById("search-form");
const searchFormInput = document.getElementById("search-form-input");
const searchResultsContainer = document.querySelector(
  ".search-results-container"
);
let searchProjects = [];

//grab input from search form
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchString = searchFormInput.value;
  //console.log("target", e.target)
  //console.log("search string", searchString);

  if (searchString === "") return;

  const res = await fetch(`/api/projects/`);
  const { projects } = await res.json();

  for (let project of projects) {
    // console.log("project", project)
    // console.log("projects", projects)
    // console.log("project name", project.name)
    if (
      project.name.toLowerCase().includes(searchString) ||
      project.intro.toLowerCase().includes(searchString)
    ) { 
      //createProjectElements()
      //console.log(`Project name: ${project.name}`);
      searchProjects.push(
      ` <div class="card-body">
          <a href="/projects/${project.id}" class="card-title font-weight-bold">
            ${project.name}
          </a><br>
          <p> ${project.intro} <br>
          by ${project.User.username}
        </div>`

      );
      // console.log(searchProjects);
      searchResultsContainer.innerHTML = searchProjects;
    } //else { console.log("project not found")}
    //searchResultsContainer.innerHTML = searchProjects;
  }

});

