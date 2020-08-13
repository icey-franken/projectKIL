document.addEventListener('DOMContentLoaded', async() => {
    const createProjectForm = document.querySelector('.new-project-form');

    createProjectForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        //first we check that user signed in
        const cookies = document.cookie;
        const res = await fetch(`/api/users/signinstate`, {
            method: 'post',
            body: JSON.stringify({ cookies }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { userSignedIn } = await res.json();
        //if they are, we get the userId and proceed with new project creation
        if (userSignedIn) {
            //get user id from signinstate above???


            const formData = new FormData(createProjectForm);
            const name = formData.get('name')
            const body = { name };
            const res = await fetch('/api/projects/new', { //need to send over userId as well
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            if (!res.ok) {
                const { message } = data;
                const errorsContainer = document.querySelector('#errors-container');
                errorsContainer.innerHTML = message;
                return;
            }
            const { project } = data;
            window.location.href = `/editDestructable/${project.id}`;
        }
    })
})