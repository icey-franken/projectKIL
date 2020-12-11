//create demo user/password and prevent page refresh on login submission event
const form = document.querySelector('#login-form');
const demoLoginLink = document.querySelector('#demo-login-link2');
console.log(demoLoginLink)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    const body = { username, password };
    const res = await fetch('/api/users/token', {
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
    window.location.href = '/projects';

});
// document.addEventListener('DOMContentLoaded', async () => {
demoLoginLink.addEventListener('click', async (e) => {
    alert('You are now logged in as DemoUser')
    const res = await fetch('/api/users/token', {
        method: 'post',
        body: JSON.stringify({ username: 'demo@user.com', password: 'password' }),
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
    } else {
        demoLoginLink.classList.add('hidden');
        window.location.href = '/projects';
    }
})
// })
