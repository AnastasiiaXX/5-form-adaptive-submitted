document.querySelectorAll('input, textarea').forEach((input) => {
  input.addEventListener('input', validateForm);
});

function validateForm() {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const formButton = document.getElementById('form-button');
  const firstNameError = document.getElementById('first-name-error');
  const lastNameError = document.getElementById('last-name-error');
  const emailError = document.getElementById('email-error');
  const phoneNumberError = document.getElementById('phone-number-error');

  let isFormValid = true;

  if (!firstName) {
    firstNameError.style.display = 'block';
    isFormValid = false;
  } else {
    firstNameError.style.display = 'none';
  }

  if (!lastName) {
    lastNameError.style.display = 'block';
    isFormValid = false;
  } else {
    lastNameError.style.display = 'none';
  }

  if (!email || !validateEmail(email)) {
    emailError.style.display = 'block';
    isFormValid = false;
  } else {
    emailError.style.display = 'none';
  }

  if (!validatePhoneNumber(phoneNumber)) {
    phoneNumberError.style.display = 'block';
    isFormValid = false;
  } else {
    phoneNumberError.style.display = 'none';
  }

  formButton.disabled = !isFormValid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phoneNumber) {
  const re = /^\+7\d{10}$/;
  return re.test(String(phoneNumber));
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert('Форма успешно отправлена');
    console.log(data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('form').reset();
});
