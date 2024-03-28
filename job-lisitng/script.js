// script.js

let jobListings = [];

document.addEventListener('DOMContentLoaded', () => {
  const jobListingsContainer = document.getElementById('jobListingsContainer');

  fetch('http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=e79f5ed7&app_key=2c35d3ee4c37fce1e9193c80562beab0&results_per_page=20&what=javascript%20developer&content-type=application/json')
    .then(response => response.json())
    .then(data => {
      jobListings = data.results;
      renderJobCards();
    })
    .catch(error => console.error('Error fetching jobs:', error));
});

function renderJobCards() {
  const jobListingsContainer = document.getElementById('jobListingsContainer');
  jobListingsContainer.innerHTML = "";

  jobListings.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.innerHTML = `
      <h2>${job.title}</h2>
      <p>Company: ${job.company.display_name}</p>
      <p>Location: ${job.location.display_name}</p>
    `;
    jobListingsContainer.appendChild(jobCard);
    jobCard.addEventListener('click', () => showJobDetails(job.id));
  });

  // Add event listener to details buttons
  const detailsButtons = document.querySelectorAll('.details-button');
  detailsButtons.forEach(button => {
    button.addEventListener('click', () => showJobDetails(button.dataset.jobId));
  });
}



function showJobDetails(jobId) {
  const jobDetailsContainer = document.getElementById('jobDetails');
  const jobPanel = document.getElementById('jobPanel');
  jobDetailsContainer.innerHTML = "";

  const job = jobListings.find(job => job.id === jobId);
  if (job) {
    jobDetailsContainer.innerHTML = `
      <div class="job-details">
        <h3>${job.title}</h3>
        <p>Company: ${job.company.display_name}</p>
        <p>Location: ${job.location.display_name}</p>
        <p>Salary: £${job.salary_min} - £${job.salary_max}</p>
        <p>Description: ${job.description}</p>
      </div>
    `;
    jobPanel.classList.add('active');
  } else {
    console.error('Job not found');
  }
}
