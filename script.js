// Declare chart instances globally
let stepsDoughnutChart, waterDoughnutChart, sleepDoughnutChart;
let stepsChart, waterChart, sleepChart;

// Arrays to store weekly data
let weeklyStepsData = [];
let weeklyWaterData = [];
let weeklySleepData = [];

// Function to initialize charts
function initializeCharts() {
    const ctxSteps = document.getElementById('stepsDoughnutChart').getContext('2d');
    stepsDoughnutChart = new Chart(ctxSteps, {
        type: 'doughnut',
        data: {
            labels: ['Steps Taken', 'Remaining'],
            datasets: [{
                label: 'Steps',
                data: [0, 10000], // Example data
                backgroundColor: ['#36A2EB', '#f0f0f0'], // Light gray for remaining
                borderColor: ['#36A2EB', '#f0f0f0'], // Border color
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    const ctxWater = document.getElementById('waterDoughnutChart').getContext('2d');
    waterDoughnutChart = new Chart(ctxWater, {
        type: 'doughnut',
        data: {
            labels: ['Water Intake', 'Remaining'],
            datasets: [{
                label: 'Water Intake',
                data: [0, 3], // Example data
                backgroundColor: ['#4BC0C0', '#f0f0f0'], // Light gray for remaining
                borderColor: ['#4BC0C0', '#f0f0f0'], // Border color
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    const ctxSleep = document.getElementById('sleepDoughnutChart').getContext('2d');
    sleepDoughnutChart = new Chart(ctxSleep, {
        type: 'doughnut',
        data: {
            labels: ['Sleep Hours', 'Remaining'],
            datasets: [{
                label: 'Sleep',
                data: [0, 8], // Example data
                backgroundColor: ['#FF6384', '#f0f0f0'], // Light gray for remaining
                borderColor: ['#FF6384', '#f0f0f0'], // Border color
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    const ctxStepsWeekly = document.getElementById('stepsChart').getContext('2d');
    stepsChart = new Chart(ctxStepsWeekly, {
        type: 'line',
        data: {
            labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Steps (7 Days)',
                data: weeklyStepsData, // Start with empty data
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue background
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    const ctxWaterWeekly = document.getElementById('waterChart').getContext('2d');
    waterChart = new Chart(ctxWaterWeekly, {
        type: 'line',
        data: {
            labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Water Intake (7 Days)',
                data: weeklyWaterData, // Start with empty data
                borderColor: '#4BC0C0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light teal background
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    const ctxSleepWeekly = document.getElementById('sleepChart').getContext('2d');
    sleepChart = new Chart(ctxSleepWeekly, {
        type: 'line',
        data: {
            labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Sleep (7 Days)',
                data: weeklySleepData, // Start with empty data
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light pink background
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Initialize charts on page load
window.onload = initializeCharts;

// Handle form submission
document.getElementById('healthForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const steps = parseFloat(document.getElementById('steps').value) || 0;
    const water = parseFloat(document.getElementById('water').value) || 0;
    const sleep = parseFloat(document.getElementById('sleep').value) || 0;
    const now = new Date();

    // Update doughnut charts
    stepsDoughnutChart.data.datasets[0].data = [steps, 10000 - steps];
    stepsDoughnutChart.update();

    waterDoughnutChart.data.datasets[0].data = [water, 3 - water];
    waterDoughnutChart.update();

    sleepDoughnutChart.data.datasets[0].data = [sleep, 8 - sleep];
    sleepDoughnutChart.update();

    // Update weekly charts
    if (weeklyStepsData.length >= 7) weeklyStepsData.shift();
    if (weeklyWaterData.length >= 7) weeklyWaterData.shift();
    if (weeklySleepData.length >= 7) weeklySleepData.shift();

    weeklyStepsData.push(steps);
    weeklyWaterData.push(water);
    weeklySleepData.push(sleep);

    stepsChart.update();
    waterChart.update();
    sleepChart.update();

    // Update last updated section
    const lastUpdated = document.getElementById('lastUpdated');
    lastUpdated.querySelector('p').textContent = `Last updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    // Reset form
    document.getElementById('healthForm').reset();
});
