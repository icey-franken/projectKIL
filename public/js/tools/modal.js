const modalContent1 = document.getElementById('modal-content1');
const addMediaContainer = document.getElementById('add-media-container');
const addMediaPreview = document.getElementById('add-media_preview');
const uploadMediaInputBox = document.getElementById('upload-media_input-box');
const uploadMediaInput = document.getElementById('upload-media_input');
const addMediaDropzone = document.getElementById('add-media_dropzone')
const uploadMediaName = document.getElementById('upload-media_name');
const uploadMediaButton = document.getElementById('upload-media_button');
const addMediaPreviewContainer = document.getElementById('add-media-preview_container');
const addMediaModal = document.getElementById('add-media-modal')
const modalAddImageButton = document.getElementById('modal-add-image_button')

const modalImageGallery = document.getElementById('modal-image-gallery');
const modalCloseButton = document.getElementById('modal-close-button');
const uploadNewMediaButton = document.getElementById('upload-new-media_button');
const modalContent2 = document.getElementById('modal-content2');
// Paths
let currentPath = window.location.href;

//Global variables
let recentTextArea;
let postButtons;

const digitPath = (function () {
    let charCount = 0;

    if (currentPath[currentPath.length - 1] === '/') {
        currentPath = currentPath.slice(0, currentPath.length - 1);
    }
    for (let i = currentPath.length - 1; i > 0; i--) {
        let char = currentPath[i];
        charCount++;
        if (char === "/") break
    }
    return charCount;
})();

const currentRoute = currentPath.slice(currentPath.length - digitPath + 1);

uploadMediaInputBox.addEventListener('change', (e) => {
    const file = uploadMediaInputBox.files[0];
    if (file) {
        uploadMediaInput.value = null;
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            addMediaDropzone.classList.remove('btn', 'd-flex');
            addMediaDropzone.classList.add('hidden');
            addMediaPreviewContainer.classList.remove('hidden');
            addMediaPreview.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(file);
        uploadMediaName.innerHTML = file.name;
    }
});


uploadMediaInput.addEventListener('change', (e) => {
    const file = uploadMediaInput.files[0];
    if (file) {
        uploadMediaInputBox.value = null;
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            addMediaDropzone.classList.remove('btn', 'd-flex');
            addMediaDropzone.classList.add('hidden');
            addMediaPreviewContainer.classList.remove('hidden');
            addMediaPreview.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(file);
        uploadMediaName.innerHTML = file.name;
    }
});

uploadMediaButton.addEventListener('click', async (e) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=utf-8");

    let formdata = new FormData();

    let file

    if (uploadMediaInputBox.files[0]) {
        file = uploadMediaInputBox.files[0];
        uploadMediaInput.value = null;
    }
    else if (uploadMediaInput.files[0]) file = uploadMediaInput.files[0];
    if (file) {
        formdata.append("uploadedFile", file);
        let requestOptions = {
            method: 'POST',
            body: formdata,
        };
        console.log(formdata);
        console.log('uploading...');
        const res = await fetch(`/api/file_uploads/project/${currentRoute}`, requestOptions);
        // const res = await fetch(`/api/file_uploads`);
        console.log('fetched via DOM');
        if (res.ok) {
            const imageContainerDiv = document.createElement('div');
            imageContainerDiv.setAttribute('data-dismiss', "modal");
            imageContainerDiv.classList.add('col-4');
            const imageTag = document.createElement('img');
            imageTag.classList.add('img-thumbnail', 'btn')
            imageTag.setAttribute('src', `https://destructables-storage-dev.s3-us-west-1.amazonaws.com/${file.name}`);
            imageContainerDiv.appendChild(imageTag)
            modalImageGallery.appendChild(imageContainerDiv);
            console.log(file.name)
            imageTag.addEventListener('click', function (e) {
                recentTextArea.value = `<img src="https://destructables-storage-dev.s3-us-west-1.amazonaws.com/${file.name}">`
                for (let i = 0; i < postButtons.length; i++) {
                    const postButton = postButtons[i];
                    postButton.disabled = false;
                }
            })
        };
        console.log('posted file!')
        addMediaDropzone.classList.add('btn', 'd-flex');
        addMediaDropzone.classList.remove('hidden');
        addMediaPreviewContainer.classList.add('hidden');
        addMediaPreview.setAttribute('src', '');
        addMediaModal.classList.add('hide');
        addMediaDropzone.innerHTML = 'UPLOAD SUCCESSFUL! <br> Be sure to add them by click on the add images button.'
    }
    else console.log('failed')
});

modalAddImageButton.addEventListener('click', (e) => {
    modalContent1.classList.add('hidden');
    modalContent2.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', (e) => {
    addMediaDropzone.innerHTML = 'Upload Files and Photos'
})

uploadNewMediaButton.addEventListener('click', (e) => {
    addMediaDropzone.innerHTML = 'Upload Files and Photos'
    modalContent1.classList.remove('hidden');
    modalContent2.classList.add('hidden');


});

async function createImageGallery() {
    const res = await fetch(`/api/file_uploads/project/${currentRoute}`);
    const data = await res.json();
    console.log(data);
    const { images } = data;
    console.log('PROJECT', images)
    for (let i = 0; i < images.length; i++) {
        const currentImage = images[i];
        const imageContainerDiv = document.createElement('div');
        imageContainerDiv.setAttribute('data-dismiss', "modal");
        imageContainerDiv.classList.add('col-4');
        const imageTag = document.createElement('img');
        imageTag.classList.add('img-thumbnail', 'btn')
        imageTag.setAttribute('src', `https://destructables-storage-dev.s3-us-west-1.amazonaws.com/${currentImage}`);
        imageContainerDiv.appendChild(imageTag)
        modalImageGallery.appendChild(imageContainerDiv);

        imageTag.addEventListener('click', function (e) {
            recentTextArea.value = `<img src="https://destructables-storage-dev.s3-us-west-1.amazonaws.com/${currentImage}">`
            for (let i = 0; i < postButtons.length; i++) {
                const postButton = postButtons[i];
                postButton.disabled = false;
            }
        })
    };
}


async function addClickEventForTextAreas() {
    console.log('finished time out')
    let textAreas = document.querySelectorAll('textarea');
    postButtons = document.querySelectorAll('.post-comment_button');
    for (let i = 0; i < textAreas.length; i++) {
        const textArea = textAreas[i]
        textArea.addEventListener('focus', function (e) {
            recentTextArea = textArea;
            console.log(recentTextArea)
            console.log()
        });

    }
}
createImageGallery();
setTimeout(addClickEventForTextAreas, 100);
