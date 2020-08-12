document.addEventListener('DOMContentLoaded', async() => {

    const projectContainer = document.querySelector('.project-container');
    const res = await fetch('/api/projects');
    const { projects } = await res.json();
    console.log(projects);
    console.log(projects[0].User.username)







});