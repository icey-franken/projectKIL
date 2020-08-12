document.addEventListener('DOMContentLoaded', async() => {
    await fetch(`/api/users/logout`);
    // const cookies = document.cookie.split(';').filter(cookie => cookie.slice(0, 6) === 'token=');
    // console.log(cookies);
    // document.cookie = 'token=;expiresIn=-1'
    // console.log(document.cookie);
})