document.addEventListener('DOMContentLoaded', async() => {
    const editMainContainer = document.querySelector('.edit-main-container');
    const projectId = editMainContainer.getAttribute('id');

    //get project data - will work for new and edit projects
    const res1 = await fetch(`/api/projects/${projectId}`);
    const { project } = await res1.json();

    //dynamically add inputs for destructions based on user clicking "add step" button
    //	question: how to have these dynamically added form inputs be picked up in formData variable? Need to dynamically navigate through formData class instance.
    const projectNameInput = document.querySelector('#edit-project-form__name');

    //this fills out the intro+supplies box - this box will always exist, so it is hard-coded into template.
    const heading0 = document.querySelector('#heading-0');
    heading0.innerHTML = `Intro and Supplies:&nbsp;${project.name}`
    const text0 = document.querySelector('#text-0');
    const supplies = project.supplies;
    if (supplies) {
        const suppliesText = supplies.map(supply => `${supply}<br>`);
        text0.innerHTML = suppliesText;
    }

    //steps beyond intro are not guaranteed. They are stored in project in an array called desturctions.
    const destructions = project.destructions;
    if (destructions.length > 0) {
        //we should make a helper function that will generate page html similar to current template for each step. What will be different is the id (#heading-1, #description-1, etc.)
        _generateEditPage(destructions); //this will run starting from i = 1 to i <= destructions.length
        //then we should have a helper function that will go through and update the elements with the project info.
        //I think we should be able to use querySelectorAll(".edit-step") to grab each step node.
        //then we should be able to iterate through each node and update the necessary field (image(maybe), heading, and text). Heading and text are in a subarray in project.destructions
    }

    _generateEditPage(destructions) {
        for (let i = 1; i <= destructions.length; i++) {
            stepNode = document.createTextNode(`
					<div class='edit-step' id='step-${i}'>
						<div class='edit-step__image-container'>
							<div class='edit-step__image-text'> (DOWN ARROW) Drag Images From Top Bar </div>
						</div>
						<div class='edit-step__contents'>
							<div class='edit-step__text'>
								<div class='edit-step__heading' id='heading-${i}'>${destructions[i-1][0]}</div>
								<div class='edit-step__description' id='text-${i}'>${destructions[i-1][1]}</div>
							</div>
							<div class='edit-step__options-container'>
								<div class='edit-step__reorder'>&#9776;</div>
								<div class='edit-step__new'>&rsaquo;</div>
								<div class='edit-step__delete'>&#x274C;</div>
							</div>
						</div>
					</div>`);
            editMainContainer.appendChild(stepNode);
        }
    }



    //save this for later
    const saveButton = document.querySelector('#edit-nav__save');
    saveButton.addEventListener('click', async(e) => {
        e.preventDefault();
        const stepsText = document.querySelectorAll('.edit-step__text');
        const contentArray = stepsText.map((step, i) => {
            const heading = document.querySelector(`#heading-${i}`);
            const description = document.querySelector(`#text-${i}`);
            //get value from both of these, then push into sub-array with [heading, text]. This is what we return to contentArray.
            const headingVal = heading.nodeValue;
            const descriptionVal = description.nodeValue;
            return [headingVal, descriptionVal];
        });
        body = contentArray;
        const res = await fetch(`/api/projects/edit/${projectId}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json();
        project = data.project; //this should be our updated project
        //I need to make a method here that dynamically updates the page.
    })

    //old code - might delete
    const form = document.querySelector('.edit-project-form');
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const formData = new FormData(form);

        //flesh this out based on form:
        //const input1 = formData.get('input1')
        //const input2 = formData.get('input2')
        // const body = { input1, input2 };


        const res2 = await fetch(`/api/projects/edit/${projectId}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res2.json();
        if (!res2.ok) { //add more here (like public/js/signup) for error handling
            const { message } = data;
            const errorsContainer = document.querySelector('#errors-container');
            errorsContainer.innerHTML = message;
            return;
        }
        // const { project } = data
        window.location.href = `/projects/${projectId}`
    })
})