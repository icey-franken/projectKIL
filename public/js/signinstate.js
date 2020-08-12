document.addEventListener('DOMContentLoaded', async() => {
    const loginLink = document.querySelector('#loginLink');
    const signUpLink = document.querySelector('#signUpLink');
    const logoutLink = document.querySelector('#logoutLink');

    logoutLink.addEventListener('click', async(e) => {
        await fetch(`/api/users/logout`);
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
    if (userSignedIn) {
        loginLink.classList.add('hidden');
        signUpLink.classList.add('hidden');
        logoutLink.classList.remove('hidden');
    } else {
        loginLink.classList.remove('hidden');
        signUpLink.classList.remove('hidden');
        logoutLink.classList.add('hidden');
    }
})