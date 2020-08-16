const addMediaContainer = document.getElementById('add-media-container');
const addMediaPreview = document.getElementById('add-media_preview');
const uploadMediaInputBox = document.getElementById('upload-media_input-box');
const uploadMediaInput = document.getElementById('upload-media_input');
const addMediaDropzone = document.getElementById('add-media_dropzone')
const uploadMediaName = document.getElementById('upload-media_name');
const uploadMediaButton = document.getElementById('upload-media_button');
const addMediaPreviewContainer = document.getElementById('add-media-preview_container');
const addMediaModal = document.getElementById('add-media-modal')
const modalCloseButton = document.getElementById('modal-close_button')

// Paths
let currentPath = window.location.href;
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
            console.log('posted file!')
            addMediaDropzone.classList.add('btn', 'd-flex');
            addMediaDropzone.classList.remove('hidden');
            addMediaPreviewContainer.classList.add('hidden');
            addMediaPreview.setAttribute('src', '');
            addMediaModal.classList.add('hide');
            addMediaDropzone.innerHTML = 'UPLOAD SUCCESSFUL'
        }
        else console.log('failed')

    }
});

modalCloseButton.addEventListener('click', (e) => {
    addMediaDropzone.innerHTML = 'Upload Files and Photos'
})
