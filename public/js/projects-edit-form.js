document.addEventListener('DOMContentLoaded', async() => {
    const editMainContainer = document.querySelector('.edit-main-container');
    const projectId = editMainContainer.getAttribute('id');

    //get project data - will work for new and edit projects
    const res1 = await fetch(`/api/projects/${projectId}`);
    const { project } = await res1.json();

    //dynamically add inputs for destructions based on user clicking "add step" button
    //	question: how to have these dynamically added form inputs be picked up in formData variable? Need to dynamically navigate through formData class instance.
    // const projectNameInput = document.querySelector('#edit-project-form__name');

    //this fills out the intro+supplies box - this box will always exist, so it is hard-coded into template.
    // const heading0 = document.querySelector('#heading-0');
    // heading0.innerHTML = `Intro and Supplies:&nbsp;${project.name}`
    // const text0 = document.querySelector('#text-0');
    // const supplies = project.supplies;
    // if (supplies) {
    //     const suppliesText = supplies.map(supply => `${supply}<br>`);
    //     text0.innerHTML = suppliesText;
    // }

    //steps beyond intro are not guaranteed. They are stored in project in an array called desturctions.
    const destructions = project.destructions;
    console.log(destructions);
    if (destructions.length > 0) {
        //we should make a helper function that will generate page html similar to current template for each step. What will be different is the id (#heading-1, #description-1, etc.)
        _generateEditPage(project); //this will run starting from i = 1 to i <= destructions.length
        //then we should have a helper function that will go through and update the elements with the project info.
        //I think we should be able to use querySelectorAll(".edit-step") to grab each step node.
        //then we should be able to iterate through each node and update the necessary field (image(maybe), heading, and text). Heading and text are in a subarray in project.destructions
        const editButtons = document.querySelectorAll('.edit-step__edit');
        editButtons.forEach(editButton => _addEditButtonListener(editButton));
        const deleteButtons = document.querySelectorAll('.edit-step__delete');
        deleteButtons.forEach(deleteButton => _addDeleteButtonListener(deleteButton));

    }

    //-------------------------------------------------------
    //this function basically generates the entire page based on existing project model
    //need to add validation that destructions and destructionsHeadings are same length. If they leave it empty we should log an empty string so that page renders correctly.
    function _generateEditPage(project) {
        //add intro step - required
        const introDiv = document.createElement('div');
        introDiv.setAttribute('id', `step-0`);
        introDiv.setAttribute('class', 'edit-step');
        const introDivHtml = `
						<div class='edit-step__image-container'>
							<div class='edit-step__image'>
								<span class='edit-step__image-arrow'>&#129095;</span>
								<span class='edit-step__image-text'> Drag Images From Top Bar</span>
							</div>
						</div>
						<div class='edit-step__contents'>
							<div class='edit-step__text'>
								<div class='edit-step__heading' id='heading-0'>Intro and Supplies: ${project.name}</div>
								<div class='edit-step__description' id='text-0'>${project.intro}</div>
							</div>
							<div class='edit-step__options-container'>
								<div class='edit-step__reorder'>&#9776;</div>
								<div class='edit-step__edit' id='edit-0'>&#62;</div>
								<div class='edit-step__delete--intro' id='delete-0'></div>
							</div>
						</div>`;
        introDiv.innerHTML = introDivHtml;
        editMainContainer.appendChild(introDiv);
        //add steps - depends on project
        const destructionsHeadings = project.destructionsHeadings;
        const destructions = project.destructions;
        for (let i = 1; i <= destructions.length; i++) {
            const stepDiv = document.createElement('div');
            stepDiv.setAttribute('id', `step-${i}`);
            stepDiv.setAttribute('class', 'edit-step');
            const stepDivHtml = `
						<div class='edit-step__image-container'>
							<div class='edit-step__image'>
								<span class='edit-step__image-arrow'>&#129095;</span>
								<span class='edit-step__image-text'> Drag Images From Top Bar</span>
							</div>
						</div>
						<div class='edit-step__contents'>
							<div class='edit-step__text'>
								<div class='edit-step__heading' id='heading-${i}'>Step ${i}: ${destructionsHeadings[i-1]}</div>
								<div class='edit-step__description' id='text-${i}'>${destructions[i-1]}</div>
							</div>
							<div class='edit-step__options-container'>
								<div class='edit-step__reorder'>&#9776;</div>
								<div class='edit-step__edit' id='edit-${i}'>&#62;</div>
								<div class='edit-step__delete' id='delete-${i}'>&#215;</div>
							</div>
						</div>`;
            stepDiv.innerHTML = stepDivHtml;
            editMainContainer.appendChild(stepDiv);
        };

        //add 'add step' button to bottom of step list
        const addStepFooter = document.createElement('div');
        addStepFooter.setAttribute('class', 'edit-main__add-step');
        const addStepFooterHtml = `<button class='edit-main__add-step-button btn' id='add-step-button' >Add Step</button>`;
        addStepFooter.innerHTML = addStepFooterHtml;
        editMainContainer.appendChild(addStepFooter);
    };
    //-------------------------------------------

    //-----------------------------------------------
    //add step
    const addStepFooter = document.querySelector('.edit-main__add-step');
    const addStepButton = document.querySelector('#add-step-button');
    console.log(addStepButton);
    addStepButton.addEventListener('click', e => {
        const stepNum = document.querySelectorAll('.edit-step').length;
        const newStep = _createStepDiv(stepNum);
        addStepFooter.insertAdjacentElement('beforebegin', newStep);
        //we do the edit and delete button event listeners here so we don't have to grab ALL the buttons again - minor improvement
        const editButton = document.querySelector(`#edit-${stepNum}`);
        _addEditButtonListener(editButton);
        const deleteButton = document.querySelector(`#delete-${stepNum}`);
        _addDeleteButtonListener(deleteButton);
    });

    //----------------------------------------------
    //add edit button event listeners - input is an edit button node
    function _addEditButtonListener(editButton) {
        editButton.addEventListener('click', (e) => {
            const stepId = e.target.id.slice(5);
            window.location.href = `/editDestructable/${projectId}/step/${stepId}`;
        });
    };

    //---------------------------------------------
    //delete step button
    //
    function _addDeleteButtonListener(deleteButton) {
        deleteButton.addEventListener('click', (e) => {
            const stepId = e.target.id.slice(7);
            //might be easiest to delete step from database, then re-render all elements. This is resource intensive.

            //alternative is to delete step from html, change id's of all subsequent steps, and delete from database

            //I think for now you should do the re-render option as it'll be easier to implement, albeit slower.
            //so make a fetch request to delete a step. That fetch should return the project. Then call _generateEditPage(project)
        });
    };

    //-------------------------------------------
    //creates a blank step div - for add step button
    function _createStepDiv(stepNumber) {
        const stepDiv = document.createElement('div');
        stepDiv.setAttribute('id', `step-${stepNumber}`);
        stepDiv.setAttribute('class', 'edit-step');
        const stepDivHtml = `
						<div class='edit-step__image-container'>
							<div class='edit-step__image'>
								<span class='edit-step__image-arrow'>&#129095;</span>
								<span class='edit-step__image-text'> Drag Images From Top Bar</span>
							</div>
						</div>
						<div class='edit-step__contents'>
							<div class='edit-step__text'>
								<div class='edit-step__heading' id='heading-${stepNumber}'>Step ${stepNumber}: (click to edit))</div>
								<div class='edit-step__description' id='text-${stepNumber}'></div>
							</div>
							<div class='edit-step__options-container'>
								<div class='edit-step__reorder'>&#9776;</div>
								<div class='edit-step__edit' id='edit-${stepNumber}'>&#62;</div>
								<div class='edit-step__delete' id='delete-${stepNumber}'>&#215;</div>
							</div>
						</div>`;
        stepDiv.innerHTML = stepDivHtml;
        return stepDiv;
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
    // form.addEventListener('submit', async(e) => {
    //     e.preventDefault();
    //     const formData = new FormData(form);

    //     //flesh this out based on form:
    //     //const input1 = formData.get('input1')
    //     //const input2 = formData.get('input2')
    //     // const body = { input1, input2 };


    //     const res2 = await fetch(`/api/projects/edit/${projectId}`, {
    //         method: 'post',
    //         body: JSON.stringify(body),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const data = await res2.json();
    //     if (!res2.ok) { //add more here (like public/js/signup) for error handling
    //         const { message } = data;
    //         const errorsContainer = document.querySelector('#errors-container');
    //         errorsContainer.innerHTML = message;
    //         return;
    //     }
    //     // const { project } = data
    //     window.location.href = `/projects/${projectId}`
    // })
})