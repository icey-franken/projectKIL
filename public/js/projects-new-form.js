document.addEventListener('DOMContentLoaded', async() => {
    const createProjectForm = document.querySelector('.new-project-form');

    createProjectForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        //first we check that user signed in
        const cookies = document.cookie;

        let data;
        try {
            const res1 = await fetch('/api/users/signinstate', {
                method: 'post',
                body: JSON.stringify({ cookies }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('line15 res1', res1);
            data = await res1.json();
            if (!res1.ok) {
                const { message } = data;
                const errorsContainer = document.querySelector('#errors-container');
                errorsContainer.innerHTML = message;
                return;
            }
        } catch (e) { console.log(e) };
        const { userSignedIn } = data;
        const { token } = data;

        console.log('line17res1', userSignedIn, token)
            //if they are, we get the userId and proceed with new project creation
        if (userSignedIn) {
            //get user id from signinstate above???
            const formData = new FormData(createProjectForm);
            const name = formData.get('name')
            const res2 = await fetch('api/users/getUserId', {
                method: 'post',
                body: JSON.stringify({ token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res2);
            const { userId } = await res2.json();
            console.log(userId);
            const body = { name, userId };
            const res3 = await fetch('/api/projects/new', {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res3.json();
            if (!res.ok) {
                const { message } = data;
                const errorsContainer = document.querySelector('#errors-container');
                errorsContainer.innerHTML = message;
                return;
            }
            const { project } = data;
            console.log('line 47 in projects-new-form.js', project, project.userId, project.name);
            window.location.href = `/editDestructable/${project.id}`;
        } else { window.location.href = '/signup' };
    });
})