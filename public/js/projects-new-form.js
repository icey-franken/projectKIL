document.addEventListener('DOMContentLoaded', async() => {
    const createProjectForm = document.querySelector('.new-project-form');

    createProjectForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        //first we check that user signed in
        const cookies = document.cookie;
        const res1 = await fetch('/api/users/signinstate', {
            method: 'post',
            body: JSON.stringify({ cookies }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data1 = await res1.json();
        if (!res1.ok) return displayErrors(data1);
        const { userSignedIn, token } = data1;
        //if signed in, get userId and proceed with new project creation
        if (userSignedIn) {
            const formData = new FormData(createProjectForm);
            const name = formData.get('name');
            const res2 = await fetch('/api/users/getUserId', {
                method: 'post',
                body: JSON.stringify({ token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data2 = await res2.json();
            if (!res2.ok) return displayErrors(data2);
            const { userId } = data2;
            const body = { name, userId };
            const res3 = await fetch('/api/projects/new', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data3 = await res3.json();
            if (!res3.ok) return displayErrors(data3);
            const { project } = data3;
            window.location.href = `/editDestructable/${project.id}`;
        } else {
            window.location.href = '/signup'
        };
    });
})


function displayErrors(data) {
    const { message, errors } = data;
    const errorsContainer = document.querySelector('#errors-container');
    errorsContainer.innerHTML = '';
    for (let error of errors) {
        const errorLi = document.createElement('li');
        errorLi.innerHTML = error;
        errorsContainer.appendChild(errorLi);
    }
    return;
}