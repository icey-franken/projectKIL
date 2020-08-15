const uploadFileInput = document.getElementById('upload-file_input');
const uploadFileButton = document.getElementById('upload-file_button');

uploadFileButton.addEventListener('click', (e) => {
    console.log(uploadFileInput);
});
$('.file-upload').file_upload();
