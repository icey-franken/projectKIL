document.addEventListener('DOMContentLoaded', async() => {
    const editMainContainer = document.querySelector('.edit-main-container');
    const projectId = editMainContainer.getAttribute('id');
    const editStepContainer = document.querySelector('.edit-step-container');
    const stepNum = parseInt(editStepContainer.getAttribute('id'), 10);
    const fullPreviewButton = document.querySelector('#edit-nav__preview');
    fullPreviewButton.addEventListener('click', () =>
        window.location.href = `/projects/${projectId}`);

    //get project data - will work for new and edit projects

    let project = renderEditStepPage();
    //------------------------------------------
    async function renderEditStepPage() {
        const res1 = await fetch(`/api/projects/${projectId}`);
        let { project } = await res1.json();
        if (!project) { window.location.href = '/projects' }
        console.log(project);
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
        return project;
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
			<div class='edit-step__contents' style='width:100%;display:inline-block'>
				<form id='edit-step__form'>
				<div class='edit-step__text'>

					<div class='edit-step__heading' id='heading-${stepNum}' style:'display:inline;width:20%'>Step ${stepNum}: <input style='width:90%' name='heading' value='${stepHeading}'></input>
					</div>
					<div class='edit-step__description' id='text-${stepNum}'><textarea name='description' style='width:100%;height:100%'>${stepDescription}</textarea>



					</div>`;
        console.log(stepHeading);
        if (supplies) {
            stepDivHtml += `<div class='edit-step__supplies' id='supplies-0'><textarea name='supplies' style='width:100%;height:100%' defaultValue='${supplies}'></textarea></div>`;
        }
        stepDivHtml += `<button type='submit' class='hide' id='edit-step__save/></form></div>

				</form>
			</div>`;
        stepDiv.innerHTML = stepDivHtml;
        editMainContainer.appendChild(stepDiv);
    }

    const saveButton = document.querySelector('#edit-nav__save');
    saveButton.setAttribute('type', 'submit');
    const editStepSaveButton = document.querySelector('#edit-step__save');
    addSaveButtonListener(saveButton);

    function addSaveButtonListener(button) {
        button.addEventListener('click', async(e) => {
            const editStepForm = document.querySelector('#edit-step__form');
            const form = new FormData(editStepForm);
            let newDestructionHeading = form.get('heading');
            let newDestruction = form.get('description');
            let supplies = form.get('supplies');
            let body;
            let name;
            let intro;
            let destructions = project.destructions;;
            let destructionsHeadings = project.destructionsHeadings;;
            console.log(newDestructionHeading, stepNum === 0);
            if (stepNum === 0) {
                name = newDestructionHeading;
                intro = newDestruction;
            } else {
                name = project.name;
                intro = project.intro;
                supplies = project.supplies;
                destructions[stepNum - 1] = newDestruction;
                destructionsHeadings[stepNum - 1] = newDestructionHeading;

                console.log(supplies);
            }
            console.log(name);
            body = { name, intro, supplies, destructions, destructionsHeadings }
            let data;
            try {
                const res = await fetch(`/api/projects/edit/${projectId}`, {
                    method: 'put',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' }
                })
                data = await res.json();
                console.log(data.project);
                if (!res.ok) { throw Error('issue with save') }
                console.log('line253 projectseditform.js', res.ok)

            } catch (e) { console.error('line 263 projectseditform.js', e) }
            if (button.id === 'edit-nav__publish') {
                window.location.href = `/projects/${projectId}`
            }
            editMainContainer.innerHTML = '';
            project = data.project;
            console.log('before', project)
            const res1 = await fetch(`/api/projects/${projectId}`);
            let data1 = await res1.json();
            project = data1.project;
            console.log('after', project);
            renderEditStepPage(project);

        });
    };
});