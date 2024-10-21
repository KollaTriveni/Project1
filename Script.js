document.getElementById('emailForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const emailContent = document.getElementById('emailContent').value;
  const resultDiv = document.getElementById('result');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const downloadBtn = document.getElementById('downloadReportBtn');

  // Check if email content is empty
  if (!emailContent.trim()) {
    resultDiv.innerHTML = "Please provide email content for analysis.";
    resultDiv.className = 'result danger';
    return;
  }

  // Show loading spinner
  loadingSpinner.classList.add('show');
  resultDiv.innerHTML = '';
  downloadBtn.style.display = 'none';
  
  try {
    // Send a POST request to the Flask backend
    const response = await fetch('http://localhost:5000/analyze-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailContent })
    });

    const result = await response.json();

    // Display the result in the frontend
    if (result.malicious) {
      resultDiv.innerHTML = "This email is flagged as MALICIOUS!";
      resultDiv.className = 'result danger';
    } else {
      resultDiv.innerHTML = "This email appears SAFE.";
      resultDiv.className = 'result success';
    }

    // Show the download report button
    downloadBtn.style.display = 'inline';
  } catch (error) {
    console.error("Error analyzing the email:", error);
    resultDiv.innerHTML = "Error analyzing the email. Please try again later.";
    resultDiv.className = 'result danger';
  } finally {
    // Hide the loading spinner
    loadingSpinner.classList.remove('show');
  }
});
