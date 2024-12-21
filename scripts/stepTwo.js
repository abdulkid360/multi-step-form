const form2 = document.getElementById('form2');
const nextForm = document.getElementById('form3');
const inputs = Array.from(form2.getElementsByClassName('input'));
inputs.forEach(function (input) {
    input.onclick = function () {
        try {
            const selectedInput = form2.querySelector('.active-input');
            selectedInput.classList.remove('active-input');
        } catch {
            { };
        }
        this.classList.add('active-input');
    }
})

let checkBox = form2.querySelector('#checkbox');
checkBox.onclick = () => {
    if (checkBox.checked) {
        form2.querySelector('.year').classList.add('checked-color');
        form2.querySelector('.month').classList.add('unchecked-color');
        // Form 2 variables
        form2.querySelectorAll('.variable-price').forEach(varPrice => {
            varPrice.style.display = 'none';
        })
        form2.querySelectorAll('.variable-price2').forEach(varPrice => {
            varPrice.style.display = 'inline';
        })
        form2.querySelectorAll('.free-month').forEach(varPrice => {
            varPrice.style.display = 'inline';
        })
        checkBox.value = 'year';
        // Form 3 variable
        nextForm.querySelectorAll('.variable-price2').forEach(varPrice => {
            varPrice.style.display = 'inline';
        })
        nextForm.querySelectorAll('.variable-price').forEach(varPrice => {
            varPrice.style.display = 'none';
        })
    } else {
        form2.querySelector('.year').classList.remove('checked-color');
        form2.querySelector('.month').classList.remove('unchecked-color');
        form2.querySelectorAll('.variable-price').forEach(varPrice => {
            varPrice.style.display = 'inline';
        })
        form2.querySelectorAll('.variable-price2').forEach(varPrice => {
            varPrice.style.display = 'none';
        })
        form2.querySelectorAll('.free-month').forEach(varPrice => {
            varPrice.style.display = 'none';
        })
        checkBox.value = 'month';

        // Form 3 variable
        nextForm.querySelectorAll('.variable-price2').forEach(varPrice => {
            varPrice.style.display = 'none';
        })
        nextForm.querySelectorAll('.variable-price').forEach(varPrice => {
            varPrice.style.display = 'inline';
        })
    }
}