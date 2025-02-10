import creds from '../credentials/creds.js';

// Define your Salesforce API URL and authentication token
const SALESFORCE_API_URL = creds.mySF_SALESFORCE_API_URL;
const ACCESS_TOKEN = creds.mySF_ACCESS_TOKEN;  // You should replace this with your actual OAuth token

// Function to handle form submission
window.handleSubmit = async function handleSubmit(formId, objectType) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = {};

    // Convert form data into an object
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Prepare the API endpoint based on the object type
    const apiEndpoint = `${SALESFORCE_API_URL}/services/data/v62.0/sobjects/${objectType}/`;

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            alert(`${objectType} record created successfully! ID: ${responseData.id}`);
        } else {
            const errorData = await response.json();
            console.log(errorData);
            alert(`Error creating ${objectType} record: ${errorData[0].message}`);
        }
    } catch (error) {
        console.log(error);
        alert('An error occurred while submitting the form: ' + error.message);
    }
}

// Function to toggle accordion content
window.toggleAccordion = function toggleAccordion(id) {
    const content = document.getElementById(id);
    const isOpen = content.style.display === "block";

    // Close all accordion contents
    const allContents = document.querySelectorAll('.accordion-content');
    allContents.forEach((section) => {
        section.style.display = 'none';
    });

    // Open the clicked accordion if it was closed
    if (!isOpen) {
        content.style.display = "block";
    }
}