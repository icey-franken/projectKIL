document.addEventListener('DOMContentLoaded', async() => {
    const projectContainer = document.querySelector('.project-container');
    const projectId = projectContainer.getAttribute('id');
    const res = await fetch(`/api/projects/${projectId}`);
    const { project } = await res.json();

    const titleDiv = document.createElement('div')
    titleDiv.setAttribute('id', 'project-name');
    const titleDivText = document.createTextNode(`Title: ${project.name}`);
    titleDiv.appendChild(titleDivText);


    const creatorDiv = document.createElement('div')
    creatorDiv.setAttribute('id', 'project-creator');
    const creatorDivText = document.createTextNode(`Creator: ${project.User.username}`);
    creatorDiv.appendChild(creatorDivText);

    const createdAtDiv = document.createElement('div')
    createdAtDiv.setAttribute('id', 'project-created-at');
    const createdAtDivText = document.createTextNode(`Created At: ${project.createdAt}`);
    createdAtDiv.appendChild(createdAtDivText);

    projectContainer.prepend(createdAtDiv);
    projectContainer.prepend(creatorDiv);
    projectContainer.prepend(titleDiv);
    projectContainer.setAttribute('style', 'color:white');

    const editButton = document.querySelector('#edit');
    editButton.addEventListener('click', () => {
        window.location.href = `editDestructable/${projectId}/`
    })
});