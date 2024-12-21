const form3 = document.getElementById('form3');
const myinputs = Array.from(form3.getElementsByClassName('input'));

myinputs.forEach(function (inp) {
    inp.onclick = function () {
        this.classList.toggle('active3-input');
        this.parentElement.querySelector('.check-box').classList.toggle('active');
        this.parentElement.querySelector('.custom-check').classList.toggle('hidden');
    }
})