const projectContainer = document.querySelector('.project-container');

const projects = async() => {
    const res = await fetch('/api/projects');
    const { projects } = await res.json();
    console.log(projects);
    console.log(projects[0].User.username)
}
projects();