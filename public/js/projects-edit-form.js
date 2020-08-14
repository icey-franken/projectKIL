document.addEventListener('DOMContentLoaded', async() => {
    const editMainContainer = document.querySelector('.edit-main-container');
    const projectId = editMainContainer.getAttribute('id');
    const form = document.querySelector('.edit-project-form');
    //get project data - will work for new and edit projects
    const res1 = await fetch(`/api/projects/${projectId}`);
    const { project } = await res1.json();

    //dynamically add inputs for destructions based on user clicking "add step" button
    //	question: how to have these dynamically added form inputs be picked up in formData variable? Need to dynamically navigate through formData class instance.
    const projectNameInput = document.querySelector('#edit-project-form__name');

    const heading0 = document.querySelector('#heading-0');
    heading0.innerHTML = `Intro and Supplies:&nbsp;${project.name}`
    const text0 = document.querySelector('#text-0');
    const supplies = project.supplies;
    if (supplies) {
        const suppliesText = supplies.map(supply => `${supply}<br>`);
        text0.innerHTML = suppliesText;
    }

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const formData = new FormData(form);

        //flesh this out based on form:
        //const input1 = formData.get('input1')
        //const input2 = formData.get('input2')
        // const body = { input1, input2 };


        const res2 = await fetch(`/api/projects/edit/${projectId}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res2.json();
        if (!res2.ok) { //add more here (like public/js/signup) for error handling
            const { message } = data;
            const errorsContainer = document.querySelector('#errors-container');
            errorsContainer.innerHTML = message;
            return;
        }
        // const { project } = data
        window.location.href = `/projects/${projectId}`
    })
})