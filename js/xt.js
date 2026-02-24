let interview=[];
let rejection=[];
let condition= 'all'

// counts--->>==============================

// let allJobsCount=allJobs.children.length;

let totalCount=document.getElementById('count-total');
let interviewCount=document.getElementById('count-interview');
let rejectedCount=document.getElementById('count-rejected');


// buttons--->>=============================

const allBtn=document.getElementById('all-btn');
const interviewBtn=document.getElementById("interview-btn" );
const rejectedBtn=document.getElementById("rejected-btn");

// container----->>============================

const allJobs =document.getElementById('allJobs');
const mainContainer=document.querySelector('main');
const filteredSection=document.getElementById('filtered-section');


// count jobs------->>=========================

let tabJobCount = document.getElementById('tab-job-count'); // Add this to your variables at the top

function calculateCount() {
    totalCount.innerText = allJobs.children.length;
    interviewCount.innerText = interview.length;
    rejectedCount.innerText = rejection.length;

    // REQUIREMENT: Tab-wise count
    if (condition === 'interview-btn') tabJobCount.innerText = interview.length;
    else if (condition === 'rejected-btn') tabJobCount.innerText = rejection.length;
    else tabJobCount.innerText = allJobs.children.length;
}

// Inside your mainContainer.addEventListener:
mainContainer.addEventListener('click', function (event) {
    
    // --- 1. INTERVIEW LOGIC ---
    if (event.target.classList.contains('card-btn-interview')) {
        const parentNode = event.target.parentNode.parentNode;
        // ... (keep your existing querySelectors for companyName, etc) ...

        const cardInfo = { companyName, position, location, type, salary, condition: 'Interview', description };

        // REQUIREMENT: Toggle Status (Remove from Rejected if it's there)
        rejection = rejection.filter(item => item.companyName !== cardInfo.companyName);

        const companyExist = interview.find(item => item.companyName == cardInfo.companyName);
        if (!companyExist) {
            interview.push(cardInfo);
            parentNode.querySelector('.condition').innerText = 'Interview';
        }
        
        calculateCount();
        if(condition == "interview-btn") renderInterview();
    }
    
    // --- 2. REJECTED LOGIC ---
    else if (event.target.classList.contains('btn-error')) {
        const parentNode = event.target.parentNode.parentNode;
        // ... (keep your existing querySelectors for companyName, etc) ...

        const cardInfo = { companyName, position, location, type, salary, condition: 'Rejected', description };

        // REQUIREMENT: Toggle Status (Remove from Interview if it's there)
        interview = interview.filter(item => item.companyName !== cardInfo.companyName);

        const companyExist = rejection.find(item => item.companyName == cardInfo.companyName);
        if (!companyExist) {
            rejection.push(cardInfo);
            parentNode.querySelector('.condition').innerText = 'Rejected';
        }

        calculateCount();
        if (condition == "rejected-btn") renderRejection();
    }

    // --- 3. DELETE CHALLENGE LOGIC ---
    // REQUIREMENT: Delete button challenge
    else if (event.target.classList.contains('trash-btn') || event.target.closest('button')?.querySelector('.fa-trash-can')) {
        
        // Find the main card container
        const card = event.target.closest('.p-8'); 
        const companyName = card.querySelector('.company-name').innerText;

        // Remove from arrays
        interview = interview.filter(item => item.companyName !== companyName);
        rejection = rejection.filter(item => item.companyName !== companyName);

        // If we are on a filtered tab, we also need to delete the original card hidden in the 'allJobs' div
        const allCards = Array.from(allJobs.children);
        const originalCard = allCards.find(c => c.querySelector('.company-name').innerText === companyName);
        if (originalCard) originalCard.remove();

        // Remove the card we just clicked
        card.remove();

        // Update UI
        calculateCount();
        if (condition == "interview-btn") renderInterview();
        if (condition == "rejected-btn") renderRejection();
    }
});

function renderRejection() {
    filteredSection.innerHTML = '';
    
    // REQUIREMENT: Empty State Message
    if (rejection.length === 0) {
        filteredSection.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 bg-white rounded-[8px]">
            <i class="fa-regular fa-folder-open text-6xl text-gray-300 mb-4"></i>
            <h2 class="text-2xl font-bold text-[#002C5C]">No jobs Available</h2>
            <p class="text-neutral/60 mt-2">You haven't rejected any jobs yet.</p>
        </div>`;
        return;
    }

    // (Your existing loop to render cards goes here)
    for (let i of rejection) {
        let div = document.createElement('div');
        div.innerHTML = `
         <div class="space-y-2 p-8 bg-white rounded-[8px] mb-4">
          <div class="flex justify-between">
            <div>
              <h2 class="company-name text-[#002C5C] text-lg font-bold">${i.companyName}</h2>
              <h3 class="text-neutral/60 position">${i.position}</h3>
            </div>
            <button class="bg-white p-3 rounded-full btn hover:border-red-600 trash-btn">
              <i class="fa-regular fa-trash-can pointer-events-none"></i>
            </button>
          </div>
          <h4 class="text-[14px] py-2">
            <span class="location">${i.location}</span>
             <span class="type"> ${i.type}</span> 
             <span class="salary"> ${i.salary}</span> 
          </h4>
          <h3 class="btn btn-error text-white pointer-events-none condition">${i.condition}</h3>
          <p class="description text-sm text-gray-600">
            ${i.description}
          </p>
        </div>`
        filteredSection.appendChild(div);
    }
}

function renderInterview() {
    filteredSection.innerHTML = '';
    
    // REQUIREMENT: Empty State Message
    if (interview.length === 0) {
        filteredSection.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 bg-white rounded-[8px]">
            <i class="fa-regular fa-folder-open text-6xl text-gray-300 mb-4"></i>
            <h2 class="text-2xl font-bold text-[#002C5C]">No jobs Available</h2>
            <p class="text-neutral/60 mt-2">You haven't selected any jobs for interview yet.</p>
        </div>`;
        return;
    }

    // (Your existing loop to render cards goes here)
    for (let i of interview) {
        let div = document.createElement('div');
        div.innerHTML = `
         <div class="space-y-2 p-8 bg-white rounded-[8px] mb-4">
          <div class="flex justify-between">
            <div>
              <h2 class="company-name text-[#002C5C] text-lg font-bold">${i.companyName}</h2>
              <h3 class="text-neutral/60 position">${i.position}</h3>
            </div>
            <button class="bg-white p-3 rounded-full btn hover:border-red-600 trash-btn">
              <i class="fa-regular fa-trash-can pointer-events-none"></i>
            </button>
          </div>
          <h4 class="text-[14px] py-2">
            <span class="location">${i.location}</span>
             <span class="type"> ${i.type}</span> 
             <span class="salary"> ${i.salary}</span> 
          </h4>
          <h3 class="btn btn-success text-white pointer-events-none condition">${i.condition}</h3>
          <p class="description text-sm text-gray-600">
            ${i.description}
          </p>
        </div>`
        filteredSection.appendChild(div);
    }
}


// console.log(parent)