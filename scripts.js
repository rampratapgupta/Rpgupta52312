// Wait for the DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", function() {

    // Get elements
    const generateButton = document.getElementById("generateButton");
    const clearButton = document.getElementById("clearButton");
    const emailButton = document.getElementById("emailButton");
    const jobName = document.getElementById("jobName");
    const quantity = document.getElementById("quantity");
    const dataType = document.getElementById("dataType");
    const digitLength = document.getElementById("digitLength");
    const customPattern = document.getElementById("customPattern");
    const linkInput = document.getElementById("linkInput");
    const processingMessage = document.getElementById("processingMessage");
    const recordTableBody = document.querySelector("#recordTable tbody");
    const historyTextArea = document.getElementById("history");

    // Event listener for the generate button
    generateButton.addEventListener("click", function () {
        processingMessage.classList.remove("hidden");
        
        // Retrieve values from the form
        const job = jobName.value.trim();
        const qty = parseInt(quantity.value.trim(), 10);
        const type = dataType.value;
        const digitLen = parseInt(digitLength.value.trim(), 10) || 6;
        const pattern = customPattern.value.trim();
        const link = linkInput.value.trim();

        if (!job || isNaN(qty) || qty <= 0) {
            alert("Please fill in all fields correctly.");
            processingMessage.classList.add("hidden");
            return;
        }

        const generatedData = [];

        // Generate data based on selected type
        for (let i = 0; i < qty; i++) {
            let data = '';
            if (type === "digits") {
                data = generateDigits(digitLen);
            } else if (type === "string") {
                data = generateString(digitLen);
            } else if (type === "alphanumeric") {
                data = generateAlphanumeric(digitLen);
            } else if (type === "link" && link) {
                data = generateLink(link);
            } else if (type === "customPattern" && pattern) {
                data = generateCustomPattern(pattern);
            }
            generatedData.push(data);
            addRecordToTable(data);
        }

        // Add generated data to history
        historyTextArea.value += `Job: ${job}\nData Type: ${type}\nGenerated Data:\n${generatedData.join("\n")}\n\n`;

        // Hide processing message after completion
        processingMessage.classList.add("hidden");
    });

    // Event listener for the clear button
    clearButton.addEventListener("click", function () {
        jobName.value = '';
        quantity.value = '';
        digitLength.value = '';
        customPattern.value = '';
        linkInput.value = '';
        historyTextArea.value = '';
        recordTableBody.innerHTML = '';
    });

    // Event listener for the email button (can be customized to send an email)
    emailButton.addEventListener("click", function () {
        alert("This feature is not implemented yet.");
    });

    // Function to generate random digits
    function generateDigits(length) {
        let digits = '';
        for (let i = 0; i < length; i++) {
            digits += Math.floor(Math.random() * 10);
        }
        return digits;
    }

    // Function to generate random string
    function generateString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    }

    // Function to generate random alphanumeric string
    function generateAlphanumeric(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    }

    // Function to generate a link based on user input
    function generateLink(baseLink) {
        return baseLink + Math.floor(Math.random() * 10000);
    }

    // Function to generate custom pattern data
    function generateCustomPattern(pattern) {
        return pattern.replace(/[A-Za-z0-9]/g, function (match) {
            return generateRandomCharacter(match);
        });
    }

    // Function to generate a random character for custom patterns
    function generateRandomCharacter(char) {
        const digits = "0123456789";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const alphanumeric = digits + letters;

        if (char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z') {
            return letters.charAt(Math.floor(Math.random() * letters.length));
        } else if (char >= '0' && char <= '9') {
            return digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return char;
    }

    // Function to add a record to the table
    function addRecordToTable(data) {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.innerText = recordTableBody.rows.length + 1;
        const dataCell = document.createElement("td");
        dataCell.innerText = data;
        const timestampCell = document.createElement("td");
        timestampCell.innerText = new Date().toLocaleString();

        row.appendChild(idCell);
        row.appendChild(dataCell);
        row.appendChild(timestampCell);

        recordTableBody.appendChild(row);
    }

});


// Redirect to login page if not logged in
if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = "login.html";
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function () {
    sessionStorage.removeItem('loggedIn');
    window.location.href = "login.html";
});

// Display current date and time
function updateDateTime() {
    const currentDateTime = new Date().toLocaleString();
    document.getElementById("DateTime").innerText = `Date & Time: ${currentDateTime}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Change Username and Password
document.getElementById('changeCredentialsButton').addEventListener('click', function () {
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const statusMessage = document.getElementById('changeStatusMessage');

    if (newUsername && newPassword) {
        sessionStorage.setItem('username', newUsername);
        sessionStorage.setItem('password', newPassword);
        statusMessage.innerText = 'Username and password updated successfully!';
        statusMessage.style.color = 'green';
    } else {
        statusMessage.innerText = 'Please fill out both fields.';
        statusMessage.style.color = 'red';
    }
});

// Generate Random Data
document.getElementById('generateButton').addEventListener('click', function () {
    const jobName = document.getElementById('jobSelect').value || "RandomJob";
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const dataType = document.getElementById('dataType').value;
    const digitLength = parseInt(document.getElementById('digitLength').value) || 6;
    const customPattern = document.getElementById('customPattern').value.trim();
    const linkInput = document.getElementById('linkInput').value.trim();
    const tableBody = document.getElementById('recordTable').getElementsByTagName('tbody')[0];
    const historyTextArea = document.getElementById('history');

    tableBody.innerHTML = ''; // Clear table before generating new data
    let generatedData = '';

    for (let i = 0; i < quantity; i++) {
        switch (dataType) {
            case 'digits':
                generatedData = Math.random().toString().slice(2, 2 + digitLength);
                break;
            case 'string':
                generatedData = Math.random().toString(36).substring(2, 2 + digitLength);
                break;
            case 'alphanumeric':
                generatedData = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substring(0, digitLength);
                break;
            case 'link':
                generatedData = linkInput || `https://example.com/${Math.random().toString(36).slice(2)}`;
                break;
            case 'customPattern':
                generatedData = customPattern.replace(/X/g, () => Math.floor(Math.random() * 10));
                break;
            default:
                generatedData = 'Invalid Data Type';
        }

        const timestamp = new Date().toLocaleString();
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = i + 1;
        row.insertCell(1).innerText = jobName;
        row.insertCell(2).innerText = generatedData;
        row.insertCell(3).innerText = timestamp;

        historyTextArea.value += `Job: ${jobName}, Data: ${generatedData}, Timestamp: ${timestamp}\n`;
    }

    document.getElementById('downloadButton').disabled = false;
    document.getElementById('completionMessage').classList.remove('hidden');
});

// Clear Generated Data
document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('recordTable').getElementsByTagName('tbody')[0].innerHTML = '';
    document.getElementById('history').value = '';
    document.getElementById('completionMessage').classList.add('hidden');
    document.getElementById('downloadButton').disabled = true;
});

// Filter Jobs in Table
function filterJobs() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const tableRows = document.querySelectorAll('#recordTable tbody tr');
    tableRows.forEach(row => {
        const jobName = row.cells[1]?.textContent.toLowerCase() || '';
        row.style.display = jobName.includes(searchValue) ? '' : 'none';
    });
}
document.getElementById('searchBar').addEventListener('input', filterJobs);

// Download Data as Excel
document.getElementById('downloadButton').addEventListener('click', function () {
    const table = document.getElementById('recordTable');
    const rows = table.querySelectorAll('tr');
    const data = [];

    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(cell => rowData.push(cell.innerText));
        data.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Generated Data");
    XLSX.writeFile(wb, "generated_data.xlsx");
});

// Email Data
document.getElementById('emailButton').addEventListener('click', function () {
    const historyData = document.getElementById('history').value;

    if (historyData) {
        emailjs.send("your_service_id", "your_template_id", {
            data: historyData,
            to_email: "recipient@example.com"
        })
            .then(() => alert('Email sent successfully!'))
            .catch(err => alert('Failed to send email: ' + err));
    }
});






function filterJobs() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    const jobOptions = document.getElementById("jobSelect").options;

    for (let i = 1; i < jobOptions.length; i++) {
        const jobName = jobOptions[i].text.toLowerCase();
        jobOptions[i].style.display = jobName.includes(searchQuery) ? "block" : "none";
    }
}

function searchJobs() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase();
    alert(`Searching for jobs related to: ${searchQuery}`);
}
