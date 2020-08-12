//create demo user/password and prevent page refresh on login submission event
document.addEventListener('DOMContentLoaded', async() => {

    // const countries = await fetch('');
    // const aboutYous = await AboutYou.findAll();
    // console.log(aboutYous);
    const countries = [{ name: 'USA', code: 'US' }, { name: 'China', code: 'CH' }]
        //need to flesh this out so dropdowns work!
    const countryDropdown = document.querySelector('#country-dropdown');
    const aboutYouDropdown = document.querySelector('#about-you-dropdown');
    const countriesHtml = countries.map(country => {
        return `<option value=${country.id}>${country.name} (${country.code})</option>`
    });
    countriesHtml.unshift(`<option value=null>Country</option>`)
    countryDropdown.innerHTML = countriesHtml.join('');

    const form = document.querySelector('#signup-form');
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const password2 = formData.get('password2');
        const aboutYouId = formData.get('aboutYouId');
        const countryId = formData.get('countryId');

        const body = { username, email, password, password2, aboutYouId, countryId };
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
        window.location.href = '/projects';
    });
});