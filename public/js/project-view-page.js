document.addEventListener('DOMContentLoaded', async() => {
    const projectContainer = document.querySelector('.project-container');
    const projectId = projectContainer.getAttribute('id');
    const res = await fetch(`/api/projects/${projectId}`);
    const { project } = await res.json();
    let projectHtml = `<p/><a style='color:white;text-decoration:none' href='/projects/${project.id}'><div>Title: ${project.name}<div>Creator: ${project.User.username}</div><div>Created At: ${project.createdAt}</div></div></a><p/>`;
    projectContainer.innerHTML = projectHtml;
});