document.addEventListener('DOMContentLoaded', async() => {
    const editMainContainer = document.querySelector('.edit-main-container');
    const projectId = editMainContainer.getAttribute('id');
    const editStepContainer = document.querySelector('.edit-step-container');
    const stepNum = parseInt(editStepContainer.getAttribute('id'), 10);

    //get project data - will work for new and edit projects
    const res1 = await fetch(`/api/projects/${projectId}`);
    const { project } = await res1.json();
    if (!project) { window.location.href = '/projects' }
    renderEditStepPage(project);
    //------------------------------------------
    function renderEditStepPage(project) {
        let stepHeading;
        let stepDescription;
        let supplies;
        if (stepNum === 0) {
            //render special page with supplies section
            stepHeading = project.name;
            stepDescription = project.intro;
            supplies = project.supplies;
        } else {
            stepHeading = project.destructionsHeadings[stepNum - 1];
            stepDescription = project.destructions[stepNum - 1];
        }
        generateEditStep(stepNum, stepHeading, stepDescription, supplies);
        console.log('stepNum', stepNum, 'heading', stepHeading, 'descrip', stepDescription, 'supplies', supplies)
    };
    //-------------------------------------------------------
    function generateEditStep(stepNum, stepHeading, stepDescription, supplies) {
        const stepDiv = document.createElement('div');
        stepDiv.setAttribute('id', `step-${stepNum}`);
        stepDiv.setAttribute('class', 'edit-step');
        let stepDivHtml = `
			<div class='edit-step__image-container'>
				<div class='edit-step__image'>
					<span class='edit-step__image-arrow'>&#129095;</span>
					<span class='edit-step__image-text'> Drag Images From Top Bar</span>
				</div>
			</div>
			<div class='edit-step__contents'>
				<div class='edit-step__text'>
					<div class='edit-step__heading' id='heading-${stepNum}'>Step ${stepNum}: ${stepHeading}</div>
					<div class='edit-step__description' id='text-${stepNum}'>${stepDescription}</div>`;
        if (supplies) {
            stepDivHtml += `<div class='edit-step__supplies' id='supplies-0' style='display:none'>${supplies}</div>`;
        }
        stepDivHtml += `</div>
				<div class='edit-step__options-container'>
					<div class='edit-step__reorder'>&#9776;</div>
					<div class='edit-step__edit' id='edit-${stepNum}'>&#62;</div>
					<div class='edit-step__delete' id='delete-${stepNum}'>&#215;</div>
				</div>
			</div>`;
        stepDiv.innerHTML = stepDivHtml;
        editMainContainer.appendChild(stepDiv);
    }
});