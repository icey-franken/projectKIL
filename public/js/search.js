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
  console.log("search string", searchString);

  if (searchString === "") return;

  const res = await fetch(`/api/projects/`);
  const { projects } = await res.json();
  //searchResultsContainer.innerHTML = projects
  for (let project of projects) {
    // console.log("project", project)
    // console.log("projects", projects)
    // console.log("project name", project.name)
    if (
      project.name.toLowerCase().includes(searchString) ||
      project.intro.toLowerCase().includes(searchString)
    ) {
      console.log(`${project.name}`);
      //searchProjects.push(`Project name: ${project.name}, Intro: ${project.intro}`)
    }
    searchResultsContainer.innerHTML = searchProjects;
  }

  //     const filteredProjects = projects.filter(project =>{
  //         return project.name.toLowerCase().includes(searchString)||
  //         project.intro.toLowerCase().includes(searchString)
  //     })
  //    searchResultsContainer.innerHTML=filteredProjects.join('');
});
