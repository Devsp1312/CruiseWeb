// Mobile menu handling
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('block');
        });
    }
}

// Expandable content handling
function initializeExpandable() {
    const expandableItems = document.querySelectorAll('.accordion-item, .theme-night-card, .food-card, .day-planner-item, .detailed-day-item');

    expandableItems.forEach(item => {
        const button = item.querySelector('.accordion-button, h3[data-expandable-trigger], .day-planner-button, .detailed-day-button');
        const content = item.querySelector('.accordion-content, .theme-night-details, .food-details, .day-planner-content, .detailed-day-content');
        const icon = button ? button.querySelector('.accordion-icon, .expand-icon') : null;

        if (button && content) {
            button.addEventListener('click', () => {
                const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";
                
                if (isOpen) {
                    content.style.maxHeight = null;
                    if (icon) icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
}

// Checklist handling
function initializeChecklists() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
        });
    });
}

// Weather chart initialization
function initializeWeatherChart() {
    const weatherChartCtx = document.getElementById('weatherChart')?.getContext('2d');
    if (weatherChartCtx) {
        const weatherData = {
            labels: ['Miami', 'Ocean Cay', 'Nassau', 'Falmouth', 'George Town'],
            datasets: [
                { 
                    label: 'Avg High Temp (°C)', 
                    data: [32, 31, 30, 31, 29], 
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                },
                { 
                    label: 'Avg Low Temp (°C)', 
                    data: [24, 24, 24.5, 25.5, 26], 
                    backgroundColor: 'rgba(54, 162, 235, 0.7)'
                }
            ]
        };

        new Chart(weatherChartCtx, {
            type: 'bar',
            data: weatherData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Port of Call'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) label += context.parsed.y + '°C';
                                const portName = weatherData.labels[context.dataIndex];
                                let extraInfo = '';
                                if (portName === 'Miami') extraInfo = 'Hum: ~69-75%, Rain: ~22 days/mo';
                                if (portName === 'Ocean Cay') extraInfo = 'Hum: ~76%, Rain: High';
                                if (portName === 'Nassau') extraInfo = 'Hum: ~77-80%, Rain: ~17-18 days/mo';
                                if (portName === 'Falmouth') extraInfo = 'Hum: High, Rain: ~21 days/mo';
                                if (portName === 'George Town') extraInfo = 'Hum: ~73-82%, Rain: ~12 days/mo';
                                return [label, extraInfo];
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeExpandable();
    initializeChecklists();
    initializeWeatherChart();
});
