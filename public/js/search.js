document.addEventListener("DOMContentLoaded", async () => {
  const searchForm = document.getElementById("search-form");
  const searchResultsContainer = document.querySelector(
    ".search-results-container"
  );
  let projects = [];

  //grab input from search form
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchString = e.target.value.toLowerCase();
    if (searchString === "") return;
    const filteredProjects = projects.filter((project) => {
      return (
        project.name.toLowerCase().includes(searchString) ||
        project.intro.toLowerCase().includes(searchString)
      );
    });
    displayProjects(filteredProjects);
  });

  const loadProjects = async () => {
    const res = await fetch("api/projects");
    projects = await res.json();
    displayProjects(projects);
  };

  const displayProjects = (projects) => {
    const htmlString = projects
      .map((project) => {
        return `
                <li class="project-titles">
                    <h2>${project.name}</h2>
                    <p>Intro: ${project.intro}</p>
                </li>`;
      })
      .join("");
    searchResultsContainer.innerHTML = htmlString;
  };
});
