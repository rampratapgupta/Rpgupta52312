// Define correct login credentials
const validUsername = 'Rampratap';
const validPassword = 'RamPratap123';

// Access form and error message
const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Add form submit event listener
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Get user input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if entered credentials match the valid credentials
    if (username === validUsername && password === validPassword) {
        // Store login status in sessionStorage
        sessionStorage.setItem('loggedIn', true);
        // Redirect to index page
        window.location.href = 'index.html';  // Redirect to the home page
    } else {
        // Show error message
        errorMessage.classList.remove('hidden');
    }
});
