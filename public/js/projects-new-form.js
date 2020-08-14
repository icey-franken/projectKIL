document.addEventListener('DOMContentLoaded', async() => {
    const createProjectForm = document.querySelector('.new-project-form');

    createProjectForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        //first we check that user signed in
        const cookies = document.cookie;

        const res1 = await fetch('/api/users/signinstate', {
            method: 'post',
            body: JSON.stringify({ cookies }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data1 = await res1.json();
        if (!res1.ok) {
            const { message } = data1;
            const errorsContainer = document.querySelector('#errors-container');
            errorsContainer.innerHTML = message;
            return;
        }
        const { userSignedIn, token } = data1;
        //if they are, we get the userId and proceed with new project creation
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
            if (!res3.ok) {
                const { message } = data3;
                const errorsContainer = document.querySelector('#errors-container');
                errorsContainer.innerHTML = message;
                return;
            }
            const { project } = data3;
            window.location.href = `/editDestructable/${project.id}`;
        } else {
            window.location.href = '/signup'
        };
    });
})