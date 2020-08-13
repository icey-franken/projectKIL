document.addEventListener('DOMContentLoaded', async() => {
    //dynamically add inputs for destructions based on user clicking a "add step" button
    //	question: how to have these dynamically added form inputs be picked up in formData variable? Need to dynamically navigate through formData class instance.


    //update project in database on form submission
    const form = document.querySelector('.edit-project-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectId = form.getAttribute('id');
        const formData = new FormData(form);

        //flesh this out based on form:
        //const input1 = formData.get('input1')
        //const input2 = formData.get('input2')
        // const body = { input1, input2 };


        const res = await fetch(`/api/projects/edit/${projectId}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (!res.ok) { //add more here (like public/js/signup) for error handling
            const { message } = data;
            const errorsContainer = document.querySelector('#errors-container');
            errorsContainer.innerHTML = message;
            return;
        }
        // const { project } = data
        window.location.href = `/projects/${projectId}`
    })
})