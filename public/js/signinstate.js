document.addEventListener('DOMContentLoaded', async () => {
    const loginLink = document.querySelector('#loginLink');
    const demoLoginLink = document.querySelector('#demo-login-link');
    const signUpLink = document.querySelector('#signUpLink');
    const logoutLink = document.querySelector('#logoutLink');

    logoutLink.addEventListener('click', async (e) => {
        await fetch(`/api/users/logout`);
        alert('You are now logged out')
    })
    const cookies = document.cookie;
    const res = await fetch(`/api/users/signinstate`, {
        method: 'post',
        body: JSON.stringify({ cookies }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const { userSignedIn } = await res.json();
    console.log('USER SIGNED IN', userSignedIn)
    if (userSignedIn) {
        loginLink.classList.add('hidden');
        demoLoginLink.classList.add('hidden');
        signUpLink.classList.add('hidden');
        logoutLink.classList.remove('hidden');
    } else {
        loginLink.classList.remove('hidden');
        demoLoginLink.classList.remove('hidden');
        signUpLink.classList.remove('hidden');
        logoutLink.classList.add('hidden');
    }

    demoLoginLink.addEventListener('click', async (e) => {
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
            loginLink.classList.add('hidden');
            demoLoginLink.classList.add('hidden');
            signUpLink.classList.add('hidden');
            logoutLink.classList.remove('hidden');

            alert('You are now logged in as DemoUser')
        }
    })
})
