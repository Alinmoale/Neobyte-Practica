const form = document.querySelector('.contact-form form');
const emailInput = document.querySelector('.email');
const emailError = document.querySelector('.email-error');
const subjectInput = document.querySelector('.subject');
const subjectError = document.querySelector('.subject-error');
const bodyTextarea = document.querySelector('textarea');
const bodyError = document.querySelector('.body-error');

const textarea = document.getElementById('message');
const characterCountSpan = document.getElementById('character-count');

textarea.addEventListener('input', () => {
  const text = textarea.value.replace(/\s+/g, '');
  const characterCount = text.length;
  characterCountSpan.textContent = `(${characterCount}/1000)`;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;

  
  if (emailInput.value === '') {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!emailInput.value.match(/[^@]+@[^@]+\.[^@]+/)) {
    emailError.textContent = 'Invalid email address';
    isValid = false;
  } else {
    emailError.textContent = '';
  }
  
  if (subjectInput.value === '') {
    subjectError.textContent = 'Subject is required';
    isValid = false;
  } else {
    subjectError.textContent = '';
  }
  
  if (bodyTextarea.value === '') {
    bodyError.textContent = 'Message is required';
    isValid = false;
  } else {
    bodyError.textContent = '';
  }
  
  if(isValid){

    document.querySelector('.half-circle-spinner').style.display = 'block';
  }

  if (isValid) {
    form.submit();
  }
});