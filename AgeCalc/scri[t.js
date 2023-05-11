
let input = document.getElementById("input");

// Get the output element from the HTML document
let output = document.getElementById("output");

// Define a function to calculate the age from a given date string
function calculateAge(dateString) {
  // Parse the date string into a Date object
  let date = new Date(dateString);

  // Get the current date
  let today = new Date();

  // Calculate the difference in years, months and days
  let years = today.getFullYear() - date.getFullYear();
  let months = today.getMonth() - date.getMonth();
  let days = today.getDate() - date.getDate();

  // Adjust the values if needed
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    days += new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  // Return the age as a string
  return `${years} years, ${months} months and ${days} days`;
}

// Add an event listener to the input element to update the output element when the input changes
input.addEventListener("input", function () {
  // Get the value of the input element
  let value = input.value;

  // Check if the value is a valid date string
  if (Date.parse(value)) {
    // Calculate the age and display it in the output element
    let age = calculateAge(value);
    output.textContent = `Your age is ${age}.`;
  } else {
    // Display an error message in the output element
    output.textContent = "Please enter a valid date.";
  }
});
```