// dummy data for login
const users = [
    { email: 'kennedy@example.com', password: 'kennedy123' },
    { email: 'andrew@example.com', password: 'andrew123' }
];

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm(event, 'loginForm')) {
        login();
    }
});

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm(event, 'registerForm')) {
        register();
    }
});

function validateForm(event, formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        const asterisk = document.getElementById(input.id + 'Asterisk');
        if (!input.value) {
            asterisk.style.display = 'inline';
            isValid = false;
        } else {
            asterisk.style.display = 'none';
        }
    });

    return isValid;
}

document.querySelectorAll('input[required], select[required]').forEach(input => {
    input.addEventListener('input', function () {
        const asterisk = document.getElementById(input.id + 'Asterisk');
        if (input.value) {
            asterisk.style.display = 'none';
        } else {
            asterisk.style.display = 'inline';
        }
    });
});

// Login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);

    const errorList = document.getElementById('login-error');
    errorList.innerHTML = '';

    if (user) {
        alert('Login successful!');
        document.getElementById('loginForm').reset();
    } else {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Invalid email or password.';
        errorList.appendChild(errorItem);
    }
}

// Register
function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const emailNew = document.getElementById('emailNew').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const errorList = document.getElementById('register-error');
    errorList.innerHTML = '';

    let isValid = true;

    // Validate first name
    if (!firstName.trim()) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'First name is required.';
        errorList.appendChild(errorItem);
        isValid = false;
    }

    // Validate last name
    if (!lastName.trim()) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Last name is required.';
        errorList.appendChild(errorItem);
        isValid = false;
    }

    // Validate birth date
    if (!birthDate) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Birth date is required.';
        errorList.appendChild(errorItem);
        isValid = false;
    }

    // Validate email
    if (!emailNew.trim()) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Email is required.';
        errorList.appendChild(errorItem);
        isValid = false;
    } else if (users.some(user => user.email === emailNew)) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Email is already in use.';
        errorList.appendChild(errorItem);
        isValid = false;
    }

    // Validate password length
    if (newPassword.length < 8) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Password must be at least 8 characters long.';
        errorList.appendChild(errorItem);
        isValid = false;
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Passwords do not match.';
        errorList.appendChild(errorItem);
        isValid = false;
    }

    // Validate phone number
    if (!phone.trim() || isNaN(phone)) {
        const errorItem = document.createElement('li');
        errorItem.innerText = 'Valid phone number is required.';
        errorList.appendChild(errorItem);
        isValid = false;
    }

    // Proceed if no errors
    if (isValid) {
        const newUser = {
            email: emailNew,
            password: newPassword,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            gender: gender,
            phone: phone
        };
        users.push(newUser);
        alert('Registration successful!');
        document.getElementById('registerForm').reset();
    }
}