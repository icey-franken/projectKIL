document.addEventListener('DOMContentLoaded', async() => {
    const loginLink = document.querySelector('#loginLink');
    const signUpLink = document.querySelector('#signUpLink');
    const logoutLink = document.querySelector('#logoutLink');
    // const res = await fetch(`api/users`)
    console.log(document.cookie);
    let tokens = [];
    const cookieArr = document.cookie.split(';');
    const tokenArr = cookieArr.filter(cookie => cookie.slice(0, 6) === 'token=')
    console.log(tokenArr);
    // if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) { tokens.push(item) }
    console.log(tokens);
    //how to find if user is logged in? Set as boolean
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