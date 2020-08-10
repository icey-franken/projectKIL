//create demo user/password and prevent page refresh on login submission event
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#login-form');
    form.addEventListener('submit', async(e) => {
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
        console.log(data);
    });
});