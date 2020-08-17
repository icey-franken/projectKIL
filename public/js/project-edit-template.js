document.addEventListener('DOMContentLoaded', async() => {

    const editMainContainer = document.querySelector('.edit-main-container');
    const projectId = editMainContainer.getAttribute('id');

    //get project data - will work for new and edit projects
    const res1 = await fetch(`/api/projects/${projectId}`);
    const { project } = await res1.json();
    if (!project) { window.location.href = '/projects' }

    const fullPreviewButton = document.querySelector('#edit-nav__preview');

    const mediaModalButton = document.querySelector('#add-media-modal_button');
    mediaModalButton.classList.add('edit-header__add-images');
    mediaModalButton.innerHTML = '+ Click To Add Images';

    fullPreviewButton.addEventListener('click', () =>
        window.location.href = `/projects/${projectId}`);


    //------------------------------------
    //drag and drop and image stuff
    const editHeader = document.querySelector('#edit-header');
    editHeader.setAttribute('ondrop', 'drop(event)');
    editHeader.setAttribute('ondragover', 'allowDrop(event)');
    const imageHeader = document.querySelector('.edit-header__add-images');



    //download images
    const { images } = project;
    images.forEach((image, imageNum) => {
        const imageURL = `https://destructables-storage-dev.s3-us-west-1.amazonaws.com/${image}`
        const imageDiv = document.createElement('div');
        const imgEl = `<img src=${imageURL} id='image-${imageNum}' draggable='true' ondragstart='drag(event)' style='width:118px;height:118px;z-index:1;position:absolute' alt='${image}'>`;
        imageDiv.innerHTML = imgEl;
        editHeader.prepend(imageDiv);
    })

});