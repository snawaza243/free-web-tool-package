const form = document.querySelector('form');
const result = document.querySelector('.result');

form.addEventListener('submit', event => {
  event.preventDefault();
  const birthdate = new Date(event.target.elements.birthdate.value);
  const ageInMilliseconds = Date.now() - birthdate.getTime();
  const ageInYears = new Date(ageInMilliseconds).getUTCFullYear() - 1970;
  result.textContent = `Your age is ${ageInYears} years.`;
});
