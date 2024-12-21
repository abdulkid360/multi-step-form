const addValues = {};
const getActiveForm = () => {
    const forms = document.querySelectorAll('.form');
    const activeForm = Array.from(forms).filter(form => form.style.display != 'none')[0];

    return activeForm;
}

function displayElement(element, styleType) {
    document.querySelector(element).style.display = styleType;
}

const setError = (element, message = "This field is required") => {
    const parentContainer = element.parentElement;
    element.classList.add('input-error');
    parentContainer.querySelector('.error-text').textContent = message;
    parentContainer.querySelector('.error-text').style.display = 'inline';
};

const removeError = (element) => {
    const parentContainer = element.parentElement;
    element.classList.remove('input-error');
    parentContainer.querySelector('.error-text').style.display = 'none';
}

const secondStep = () => {
    if (getActiveForm().id === 'form3') {
        const secondForm = document.getElementById('form2');
        const currentDiv = secondForm.querySelector('.active-input');
        // console.log(currentDiv);

        // this.classList.add('active-input');
        const priceContainer = currentDiv.querySelector('.form2-price')
        const checkBtn = document.querySelector('#checkbox')
        const variableClass = checkBtn.value === 'month' ? '.variable-price' : '.variable-price2';
        const durationValue = priceContainer.querySelector(variableClass).getAttribute('data-save');
        const step2Detail = {
            type: checkBtn.value,
            value: durationValue,
            title: currentDiv.querySelector('.title').textContent
        }
        // console.log(step2Detail)
        localStorage.setItem('SecondStep', JSON.stringify(step2Detail));
    } else if (getActiveForm().id === 'form4') {
        const secondForm = document.getElementById('form3');
        // const currentDiv = secondForm.querySelector('.active3-input');
        const activeDiv = secondForm.querySelectorAll('.active');
        const previousData = JSON.parse(localStorage.getItem('SecondStep'));
        const previousVariableClass = previousData.type === 'month' ? '.variable-price' : '.variable-price2';
        // console.log(previousVariableClass);
        const arraySvg = Array.from(secondForm.querySelectorAll('svg')).filter(svg => !svg.classList.contains('active'))
        arraySvg.forEach(svg => {
            const keyValue = svg.parentElement.querySelector('.add-title').getAttribute('data-title');
            delete addValues[keyValue];
            // console.log(svg, "hhdhd");
        })
        activeDiv.forEach(cont => {
            const addPrice = cont.parentElement.querySelector(previousVariableClass).getAttribute('data-save');
            const keyValue = cont.parentElement.querySelector('.add-title').getAttribute('data-title');
            addValues[keyValue] = addPrice;
            localStorage.setItem('thirdStep', JSON.stringify(addValues))
        });
        // console.log(addValues)
        // console.log(previousData)
        const nextFormH1 = getActiveForm().querySelector('.h1');
        const nextFormPrice = getActiveForm().querySelector('.h1-price');
        const subContainer = getActiveForm().querySelector('#lastId');
        const expenseContainer = getActiveForm().querySelector('.expense-container');
        let totalExpenses = 0;
        totalExpenses = totalExpenses + Number(previousData.value);
        const unit = previousData.type === 'year' ? '/yr' : '/mo';
        nextFormH1.textContent = `${previousData.title} (${previousData.type}ly)`;
        nextFormPrice.textContent = `${previousData.value}${unit}`;
        for (const detail in addValues) {
            if (addValues.hasOwnProperty(detail)) {
                const container = document.createElement('div');
                container.className = 'sub-container';

                const span1 = document.createElement('span');
                const span2 = document.createElement('span');
                span1.textContent = detail;
                span2.className = 'sub-total';
                span2.textContent = "+" + addValues[detail] + unit;
                // console.log(detail);

                container.appendChild(span1);
                container.appendChild(span2);
                subContainer.appendChild(container);
                totalExpenses = totalExpenses + Number(addValues[detail]);
            }
        }

        const report = document.createElement('span');
        const totalReport = document.createElement('span');
        report.className = 'total-text';
        totalReport.className = 'total-expenses';
        report.textContent = `Total (per ${previousData.type})`;
        totalReport.textContent = `+$${totalExpenses}${unit}`;

        expenseContainer.appendChild(report);
        expenseContainer.appendChild(totalReport);
    }
}

document.getElementById('number').addEventListener('input', function () {
    // Remove all characters except digits and the plus sign  
    let cleanedInput = this.value.replace(/[^+\d]/g, '');

    // Reformat the cleaned input  
    let formattedInput = formatPhoneNumber(cleanedInput);

    // Set the formatted value back to the input field  
    this.value = formattedInput;
});

document.querySelectorAll('.btn').forEach(function (btn) {
    btn.onclick = function () {
        const currentForm = getActiveForm();
        const formId = currentForm.id;
        const formNumber = Number(formId.charAt(currentForm.id.length - 1));

        if (this.id === 'submit') {
            ValidateForm();
            if (errorNumbers() === 0) {
                document.querySelector('.form-nav').style.justifyContent = 'space-between';
                const nextNumber = formNumber <= 4 ? formNumber + 1 : 5;
                const nextFormId = 'form' + nextNumber;

                displayElement("#" + nextFormId, 'block');
                currentForm.style.display = 'none';

                if (nextNumber <= 3) {
                    displayElement('#back', 'block');
                } else {
                    displayElement('#submit', 'none');
                    displayElement('#confirm', 'block');
                }

                // Tracking steps
                document.getElementById('step' + nextNumber).querySelector('.circle-progress').classList.add('active');
                document.getElementById('step' + formNumber).querySelector('.circle-progress').classList.remove('active');
            };
            secondStep();
        }
        if (this.id === 'back') {
            const form4 = document.getElementById('form4');
            const nextNumber = formNumber > 1 ? formNumber - 1 : formNumber;
            const nextFormId = 'form' + nextNumber;

            displayElement("#" + nextFormId, 'block');
            currentForm.style.display = 'none';

            document.getElementById('step' + nextNumber).querySelector('.circle-progress').classList.add('active');
            document.getElementById('step' + formNumber).querySelector('.circle-progress').classList.remove('active');
            if (nextNumber == 1) {
                document.querySelector('.form-nav').style.justifyContent = 'right';
                displayElement('#back', 'none');
            } else if (nextNumber == 3) {
                displayElement('#submit', 'block');
                displayElement('#confirm', 'none');
                form4.querySelector('#lastId').innerHTML = '';
                form4.querySelector('.expense-container').innerHTML = '';
            }
        }
        if (this.id === 'confirm') {
            displayElement('#form5', 'block');
            displayElement('.form-nav', 'none');
            currentForm.style.display = 'none';
        }
    }
}
)

const errorNumbers = () => {
    const numberOfErrors = Array.from(document.getElementsByClassName('error-text')).filter(error => error.style.display === 'inline')
    return numberOfErrors.length;
}