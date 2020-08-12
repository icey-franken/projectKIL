document.addEventListener('DOMContentLoaded', async() => {
    const loginLink = document.querySelector('#loginLink');
    const signUpLink = document.querySelector('#signUpLink');
    const logoutLink = document.querySelector('#logoutLink');

    const tokens = document.cookie.split(';').filter(cookie => cookie.slice(0, 6) === 'token=').map(token => token.slice(6));
    console.log(tokens);
    // tokenArr.forEach()
    // console.log(tokens);

    //how to find if user is logged in? Set as boolean
    // if (userSignedIn) {
    //     loginLink.classList.add('hidden');
    //     signUpLink.classList.add('hidden');
    //     logoutLink.classList.remove('hidden');
    // } else {
    //     loginLink.classList.remove('hidden');
    //     signUpLink.classList.remove('hidden');
    //     logoutLink.classList.add('hidden');
    // }
})