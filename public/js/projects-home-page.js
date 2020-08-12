document.addEventListener('DOMContentLoaded', async() => {
    const projectsContainer = document.querySelector('.projects-container');
    const res = await fetch('/api/projects');
    const { projects } = await res.json();
    let projectsHtml = ['<p/>'];
    for (let project of projects) {
        projectsHtml.push(`<a style='color:white;text-decoration:none' href='/projects/${project.id}'><div>Title: ${project.name}<div>Creator: ${project.User.username}</div><div>Created At: ${project.createdAt}</div></div></a><p/>`)
    };
    projectsContainer.innerHTML = projectsHtml.join('');
});