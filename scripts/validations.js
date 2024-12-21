
const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

function formatPhoneNumber(num) {
    const hasPlus = num.startsWith('+');
    const trimmedNum = hasPlus ? num.slice(1) : num;

    const parts = [];
    let start = 0;

    while (start < trimmedNum.length) {
        let size = start === 0 && hasPlus ? 1 : (trimmedNum.length >= 10 ? 3 : 2);
        if (start + size > trimmedNum.length) size = trimmedNum.length - start; // Don't exceed string length  
        parts.push(trimmedNum.slice(start, start + size));
        start += size;
    }

    return hasPlus ? '+' + parts.join(' ') : parts.join(' ');
}

function isValidPhoneNumber(num) {
    const cleanedNum = num.replace(/[^+\d]/g, '');

    const isValidFormat = cleanedNum.startsWith('+') || cleanedNum.startsWith('0');
    const digitCount = cleanedNum.replace(/[^\d]/g, '').length; // Count only digits  

    return isValidFormat && digitCount >= 10 && digitCount <= 15; // Adjust the limits as needed  
}

function ValidateForm() {
    const fullName = document.getElementById('name');
    const email = document.getElementById('email');
    const phoneNumber = document.getElementById('number');

    if (fullName.value === '') {
        setError(fullName)
    } else {
        removeError(fullName)
    }

    if (email.value === '') {
        setError(email)
    } else if (!validateEmail(email.value)) {
        setError(email, 'Please enter a valid email');
    } else {
        removeError(email);
    }

    if (phoneNumber.value === '') {
        setError(phoneNumber)
    } else if (!isValidPhoneNumber(phoneNumber.value)) {
        setError(phoneNumber, 'Invalid phone number');
    } else {
        removeError(phoneNumber)
    }
}

