//create demo user/password and prevent page refresh on login submission event
const form = document.querySelector('#signup-form');
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const password2 = formData.get('password2');

    const body = { username, email, password, password2 };
    const res = await fetch('/api/users/', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    if (!res.ok) {
        const { message, errors } = data;
        console.log(data);
        const errorsContainer = document.querySelector('#errors-container');
        errorsContainer.innerHTML = '';
        for (let error of errors) {
            const errorLi = document.createElement('li');
            errorLi.innerHTML = error;
            errorsContainer.appendChild(errorLi);
        }
        return;
    }
    window.location.href = '/';
});