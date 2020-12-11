//create demo user/password and prevent page refresh on login submission event
document.addEventListener("DOMContentLoaded", async () => {
  //update countries dropdown
  const res1 = await fetch("/api/countries");
  const { countries } = await res1.json();
  const countryDropdown = document.querySelector("#country-dropdown");
  const countriesHtml = countries.map((country) => {
    return `<option value=${country.id}>${country.name} (${country.code})</option>`;
  });
  countriesHtml.unshift(`<option value=null>Country</option>`);
  countryDropdown.innerHTML = countriesHtml.join("");

  //update aboutYous dropdown
  const res2 = await fetch("/api/aboutYous");
  const { aboutYous } = await res2.json();
  const aboutYouDropdown = document.querySelector("#about-you-dropdown");
  const aboutYousHtml = aboutYous.map((aboutYou) => {
    return `<option value=${aboutYou.id}>${aboutYou.description}</option>`;
  });
  aboutYousHtml.unshift(`<option value=null>About You</option>`);
  aboutYouDropdown.innerHTML = aboutYousHtml.join("");

  //grab input from signup form
  const form = document.querySelector("#signup-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");
    let aboutYouId = formData.get("aboutYouId");
    let countryId = formData.get("countryId");
    if (aboutYouId === "null") aboutYouId = null;
    if (countryId === "null") countryId = null;
    const body = {
      username,
      email,
      password,
      password2,
      aboutYouId,
      countryId,
    };
    const res = await fetch("/api/users/", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(errors);
      const { message, errors } = data;
      const errorsContainer = document.querySelector("#errors-container");
      errorsContainer.innerHTML = "";
      for (let error of errors) {
        const errorLi = document.createElement("li");
        errorLi.innerHTML = error;
        errorsContainer.appendChild(errorLi);
      }
      return;
    }
    window.location.href = "/projects";
  });
});
