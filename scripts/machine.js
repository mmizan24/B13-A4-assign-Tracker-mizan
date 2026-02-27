// function getTransferFromAll(id){
//     const restore=document.getElementById(id);
//     const value=restore.innerText
//     console.log(id,value);
//     return value;
// }


//  another option .for btn toggleing ........................................

// const container = document.getElementById('button-container');

// container.addEventListener('click', (e) => {
//   // 1. Ensure we only act if a button was clicked
//   const clickedBtn = e.target.closest('button');
//   if (!clickedBtn) return;

//   // 2. Find the one button that currently has the active classes
//   const currentActive = container.querySelector('.bg-blue-600');

//   // 3. Swap classes between the old active and the new clicked button
//   if (currentActive) {
//     currentActive.classList.replace('bg-blue-600', 'text-gray-600');
//     currentActive.classList.remove('text-white');
//   }

//   clickedBtn.classList.replace('text-gray-600', 'bg-blue-600');
//   clickedBtn.classList.add('text-white');
// });

// const interOneBtn = document.getElementById('btn-inter-one');
// const firstJobSection = document.getElementById('first-job');

// interOneBtn.addEventListener('click', () => {
//   // This adds 'hidden' if it's missing, or removes it if it's there
//   firstJobSection.classList.add('hidden'); 

//   // Logic Tip: If you want it to reappear on a second click, use .toggle()
//   // firstJobSection.classList.toggle('hidden');
// });

// btn --toggling end here .........................................................

let interveiwList = [];
let rejectedList = [];

// Get DOM elements for counters
const totalNum = document.getElementById('total-num');
const interviewNum = document.getElementById('interview-num') || document.getElementById('interVeiw-num');
const rejectedNum = document.getElementById('rejected-num');

const allJobSection = document.getElementById('alljobs');
const filteredSection = document.getElementById('filtered-section');

// Calculate and update all counts
function calculateCount() {
    // Get all job cards from the main section
    const allJobs = document.querySelectorAll('#alljobs > section, #alljobs > div');
    const totalJobs = allJobs.length;
    
    // Update total count
    if (totalNum) {
        totalNum.innerText = totalJobs;
    }
    
    // Update interview count
    if (interviewNum) {
        interviewNum.innerText = interveiwList.length;
    }
    
    // Update rejected count
    if (rejectedNum) {
        rejectedNum.innerText = rejectedList.length;
    }
    
    // Also update the "Available Jobs" count in the section header
    const jobsCountSpan = document.querySelector('.flex.justify-between p');
    if (jobsCountSpan) {
        jobsCountSpan.innerHTML = `${totalJobs} <span>jobs</span>`;
    }
}

// Initial count calculation
setTimeout(() => {
    calculateCount();
}, 100);

// Toggle style for tabs
const allBtn = document.getElementById('btn-all');
const interveiwBtn = document.getElementById('btn-interview');
const rejectedBtn = document.getElementById('btn-rejected');

function toggleStyle(id) {
    // Remove active styles from all buttons
    if (allBtn) {
        allBtn.classList.remove('bg-blue-600', 'text-white');
        allBtn.classList.add('bg-gray-200', 'text-black');
    }
    if (interveiwBtn) {
        interveiwBtn.classList.remove('bg-blue-600', 'text-white');
        interveiwBtn.classList.add('bg-gray-200', 'text-black');
    }
    if (rejectedBtn) {
        rejectedBtn.classList.remove('bg-blue-600', 'text-white');
        rejectedBtn.classList.add('bg-gray-200', 'text-black');
    }

    // Add active style to selected button
    const selected = document.getElementById(id);
    if (selected) {
        selected.classList.remove('bg-gray-200', 'text-black');
        selected.classList.add('bg-blue-600', 'text-white');
    }

    // Show/hide sections based on selected tab
    if (id == 'btn-interview') {
        allJobSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderFilteredJobs('interview');
    } else if (id == 'btn-rejected') {
        allJobSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderFilteredJobs('rejected');
    } else {
        allJobSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
    }
}

// Render filtered jobs (interview or rejected)
function renderFilteredJobs(type) {
    filteredSection.innerHTML = '';
    
    let listToRender = type === 'interview' ? interveiwList : rejectedList;
    
    if (listToRender.length === 0) {
        // Show "No jobs" message
        filteredSection.innerHTML = `
            <div class="card bg-base-100 h-100 w-full shadow-sm flex justify-center items-center p-10">
                <div class="text-center">
                    <div><img src="./jobs.png" alt="No jobs" class="w-20 mx-auto"></div>
                    <h2 class="text-xl font-bold mt-4">No Jobs Available</h2>
                    <p class="text-gray-500">Check back soon for new job opportunities</p>
                </div>
            </div>
        `;
    } else {
        listToRender.forEach(job => {
            let div = document.createElement('div');
            div.className = 'grid row-auto gap-5 mb-5';
            div.innerHTML = `
                <div class="space-y-4">
                    <div class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm relative transition-shadow hover:shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <h2 class="text-xl font-bold text-slate-900 dark:text-white company">${job.company || 'Unknown Company'}</h2>
                                <p class="text-slate-600 dark:text-slate-400 font-medium mb-2 skills">${job.skills || 'Unknown Position'}</p>
                                <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-500 mb-4">
                                    <span class="flex items-center gap-1">${job.jobPattern || 'Remote'}</span>
                                    <span class="flex items-center gap-1">${job.jobTime || 'Full-time'}</span>
                                    <span class="flex items-center gap-1">${job.salaryRange || 'Salary not specified'}</span>
                                </div>
                            </div>
                            <button class="p-2 text-slate-400 hover:text-red-500 transition-colors delete-btn">
                                <span class="material-icons-outlined">delete</span>
                            </button>
                        </div>
                        <div class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-4 status-badge">
                            ${job.notApplied || (type === 'interview' ? 'INTERVIEW' : 'REJECTED')}
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 notes">${job.notes || 'No description available'}</p>
                        <div class="flex gap-3">
                            <button class="px-4 py-2 text-sm font-bold border-2 border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors interview-btn">INTERVIEW</button>
                            <button class="px-4 py-2 text-sm font-bold border-2 border-red-500 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors reject-btn">REJECTED</button>
                        </div>
                    </div>
                </div>
            `;
            filteredSection.appendChild(div);
        });
    }
}

// Function to extract job details from a card
function extractJobDetails(jobCard) {
    // Try multiple selectors to find company name
    const company = jobCard.querySelector('.company, [id="C-name"], h2:not(.card-title), .font-bold.text-slate-900')?.innerText || 'Unknown Company';
    
    // Find skills/position
    const skills = jobCard.querySelector('.skills, .font-medium.mb-2, p.text-slate-600.font-medium')?.innerText || 'Unknown Position';
    
    // Find job details (location, type, salary)
    const detailElements = jobCard.querySelectorAll('.flex.flex-wrap span, .flex.flex-wrap span span, .text-slate-500 span');
    let jobPattern = 'Remote';
    let jobTime = 'Full-time';
    let salaryRange = 'Salary not specified';
    
    if (detailElements.length >= 3) {
        jobPattern = detailElements[0]?.innerText || 'Remote';
        jobTime = detailElements[1]?.innerText || 'Full-time';
        salaryRange = detailElements[2]?.innerText || 'Salary not specified';
    } else {
        // Try to get from text content
        const detailText = jobCard.querySelector('.flex.flex-wrap')?.innerText || '';
        const parts = detailText.split('\n').filter(p => p.trim());
        if (parts.length >= 3) {
            jobPattern = parts[0] || 'Remote';
            jobTime = parts[1] || 'Full-time';
            salaryRange = parts[2] || 'Salary not specified';
        }
    }
    
    // Find notes/description
    const notes = jobCard.querySelector('.notes, p.leading-relaxed, .text-sm.leading-relaxed')?.innerText || 'No description available';
    
    return {
        company,
        skills,
        jobPattern,
        jobTime,
        salaryRange,
        notes
    };
}

// Main event listener
const mainContainer = document.querySelector('main');

if (mainContainer) {
    mainContainer.addEventListener('click', function(event) {
        // Find the clicked element and the job card
        const clickedElement = event.target;
        const jobCard = clickedElement.closest('.border-slate-200, .bg-white, [class*="bg-white"], .space-y-4 > div');
        
        if (!jobCard) return;
        
        // Check if it's an interview button (multiple possible classes)
        const isInterviewBtn = clickedElement.classList.contains('interview-btn') || 
                              clickedElement.classList.contains('btnInterveiw') ||
                              clickedElement.id === 'btn-inter-one' ||
                              (clickedElement.tagName === 'BUTTON' && clickedElement.textContent.includes('INTERVIEW')) ||
                              clickedElement.closest('.interview-btn') ||
                              clickedElement.closest('.btnInterveiw');
        
        // Check if it's a reject button (multiple possible classes)
        const isRejectBtn = clickedElement.classList.contains('reject-btn') || 
                           clickedElement.classList.contains('btnRejected') ||
                           (clickedElement.tagName === 'BUTTON' && clickedElement.textContent.includes('REJECTED')) ||
                           clickedElement.closest('.reject-btn') ||
                           clickedElement.closest('.btnRejected');
        
        // Check if it's a delete button
        const isDeleteBtn = clickedElement.classList.contains('delete-btn') || 
                           clickedElement.closest('.delete-btn') ||
                           clickedElement.classList.contains('btnDelete') ||
                           clickedElement.closest('.btnDelete') ||
                           (clickedElement.classList.contains('material-icons-outlined') && clickedElement.textContent === 'delete') ||
                           (clickedElement.tagName === 'BUTTON' && clickedElement.querySelector('.material-icons-outlined')?.textContent === 'delete');
        
        // Handle Interview button click
        if (isInterviewBtn) {
            // Get job details
            const jobDetails = extractJobDetails(jobCard);
            
            // Update status badge
            const statusBadge = jobCard.querySelector('.notApplied, .inline-flex, .status-badge, [class*="bg-slate-100"]');
            if (statusBadge) {
                statusBadge.innerHTML = '<span class="notApplied">INTERVIEW</span>';
                statusBadge.innerText = 'INTERVIEW';
            }
            
            // Create job object
            const cardInfo = {
                ...jobDetails,
                notApplied: 'INTERVIEW',
                status: 'interview'
            };
            
            // Check if job already exists in interview list
            const jobExist = interveiwList.some(item => item.company === cardInfo.company);
            
            if (!jobExist) {
                interveiwList.push(cardInfo);
                
                // Remove from rejected list if present
                rejectedList = rejectedList.filter(item => item.company !== cardInfo.company);
            }
            
            // Update counts
            calculateCount();
            
            // If on interview tab, refresh the view
            if (interveiwBtn && interveiwBtn.classList.contains('bg-blue-600')) {
                renderFilteredJobs('interview');
            }
            
            console.log('Interview clicked for:', jobDetails.company);
        }
        
        // Handle Reject button click
        if (isRejectBtn) {
            // Get job details
            const jobDetails = extractJobDetails(jobCard);
            
            // Update status badge
            const statusBadge = jobCard.querySelector('.notApplied, .inline-flex, .status-badge, [class*="bg-slate-100"]');
            if (statusBadge) {
                statusBadge.innerHTML = '<span class="notApplied">REJECTED</span>';
                statusBadge.innerText = 'REJECTED';
            }
            
            // Create job object
            const cardInfo = {
                ...jobDetails,
                notApplied: 'REJECTED',
                status: 'rejected'
            };
            
            // Check if job already exists in rejected list
            const jobExist = rejectedList.some(item => item.company === cardInfo.company);
            
            if (!jobExist) {
                rejectedList.push(cardInfo);
                
                // Remove from interview list if present
                interveiwList = interveiwList.filter(item => item.company !== cardInfo.company);
            }
            
            // Update counts
            calculateCount();
            
            // If on rejected tab, refresh the view
            if (rejectedBtn && rejectedBtn.classList.contains('bg-blue-600')) {
                renderFilteredJobs('rejected');
            }
            
            console.log('Reject clicked for:', jobDetails.company);
        }
        
        // Handle Delete button click
        if (isDeleteBtn) {
            // Get company name to remove from lists
            const companyName = jobCard.querySelector('.company, [id="C-name"], h2:not(.card-title)')?.innerText;
            
            // Remove from DOM
            jobCard.remove();
            
            // Remove from interview list if present
            if (companyName) {
                interveiwList = interveiwList.filter(item => item.company !== companyName);
                rejectedList = rejectedList.filter(item => item.company !== companyName);
            }
            
            // Update counts
            calculateCount();
            
            // Refresh current view if on filtered tab
            if (allJobSection && allJobSection.classList.contains('hidden')) {
                if (interveiwBtn && interveiwBtn.classList.contains('bg-blue-600')) {
                    renderFilteredJobs('interview');
                } else if (rejectedBtn && rejectedBtn.classList.contains('bg-blue-600')) {
                    renderFilteredJobs('rejected');
                }
            }
            
            console.log('Delete clicked for:', companyName);
        }
    });
}

// Also add click event listener directly to buttons for redundancy
document.addEventListener('click', function(event) {
    // This is a backup for any buttons that might not be caught by the main container
    if (event.target.classList.contains('btnRejected') || 
        (event.target.tagName === 'BUTTON' && event.target.textContent.includes('REJECTED') && !event.target.classList.contains('interview-btn'))) {
        
        const jobCard = event.target.closest('.border-slate-200, .bg-white, [class*="bg-white"]');
        if (jobCard) {
            const jobDetails = extractJobDetails(jobCard);
            
            // Update status badge
            const statusBadge = jobCard.querySelector('.notApplied, .inline-flex, .status-badge, [class*="bg-slate-100"]');
            if (statusBadge) {
                statusBadge.innerText = 'REJECTED';
            }
            
            const cardInfo = {
                ...jobDetails,
                notApplied: 'REJECTED',
                status: 'rejected'
            };
            
            const jobExist = rejectedList.some(item => item.company === cardInfo.company);
            
            if (!jobExist) {
                rejectedList.push(cardInfo);
                interveiwList = interveiwList.filter(item => item.company !== cardInfo.company);
            }
            
            calculateCount();
            
            if (rejectedBtn && rejectedBtn.classList.contains('bg-blue-600')) {
                renderFilteredJobs('rejected');
            }
        }
    }
});

// Make sure counts update when page loads
window.addEventListener('load', function() {
    calculateCount();
    
    // Also update when any changes happen
    const observer = new MutationObserver(function() {
        calculateCount();
    });
    
    // Observe changes to the alljobs section
    if (allJobSection) {
        observer.observe(allJobSection, { childList: true, subtree: true });
    }
});