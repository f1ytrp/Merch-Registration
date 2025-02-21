const form = document.getElementById('formid');
const username = document.getElementById('username');
const email = document.getElementById('email');
const bits = document.getElementById('bits');
const number = document.getElementById('number');
const hostel = document.getElementById('hostel');
const terms = document.getElementById('terms');


form.addEventListener("submit", function(event) {
    event.preventDefault();

    if(!validateInputs()){
        return;
    };

    let username = document.getElementById("username").value.trim();
    let emailV = document.getElementById("email").value.trim();
    let bitsId = document.getElementById("bits").value.trim();
    let number = document.getElementById("number").value.trim();
    let hostel = document.getElementById("hostel").value;
    let sizeOptions = document.getElementsByName("option");

    let size = "";
    for (let i = 0; i < sizeOptions.length; i++) {
        if (sizeOptions[i].checked) {
            size = sizeOptions[i].value;
            break;
        }
    }

    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    if (registrations.some(user => user.emailV === emailV)) {
        setError(email, 'Email is already registered');
        return;
    }
    registrations.push({ username, emailV, bitsId, number, hostel, size });
    localStorage.setItem('registrations', JSON.stringify(registrations));
    alert("Registration successful!");
    document.getElementById("reset").click();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const regex = /^[A-Za-z]\d{8}@pilani\.bits-pilani\.ac\.in$/;
    return regex.test(String(email).toLowerCase());
};

const isValidBits = bits => {
    const regex = /^\d{4}(A[1-9]|B[1-5]|AA|AB)PS\d{4}[PGH]$/;
    return regex.test(bits);
};

const validateInputs = () => {
    let isValid = true;
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const numValue = number.value.trim();
    const bitsValue = bits.value.trim();
    const sizeOptions = document.getElementsByName("option");

    let sizeSelected = false;
    for (let i = 0; i < sizeOptions.length; i++) {
        if (sizeOptions[i].checked) {
            sizeSelected = true;
            break;
        }
    }

    if (!sizeSelected) {
        setError(document.querySelector(".radio-size .error"), "Please select a size.");
        isValid = false;
    } else {
        setSuccess(document.querySelector(".radio-size .error"));
    }

    if(usernameValue === '') {
        setError(username, 'Name is required');
        isValid = false;
    } else if(usernameValue.length <= 5 || usernameValue.length >= 50){
        setError(username, 'Name should be between 5 to 50 characters');
        isValid = false;
    } else{
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else{
        setSuccess(email);
    }
    
    if(numValue === '') {
        setError(number, 'Phone Number is required');
        isValid = false;
    } else if (numValue.length != 10) {
        setError(number, 'Provide a valid Phone Number');
        isValid = false;
    } else{
        setSuccess(number);
    }

    if(bitsValue === '') {
        setError(bits, 'BITS-ID is required');
        isValid = false;
    } else if (!isValidBits(bitsValue)) {
        setError(bits, 'Provide a valid BITS-ID');
        isValid = false;
    } else{
        setSuccess(bits);
    }

    if(!terms.checked){
        setError(terms, "Please Agree to the Terms and Conditions");
        isValid = false;
    } else{
        setSuccess(terms);
    }

    return isValid;
};