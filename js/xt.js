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

function updateCounts() {
    totalCount.innerText =
        allJobs.children.length +
        interviewSection.children.length +
        rejectedSection.children.length;

    interviewCount.innerText = interviewSection.children.length;
    rejectedCount.innerText = rejectedSection.children.length;
}


// toggleBtn

function toggleBtn(id){
    
    allBtn.classList.add('text-neutral/60');
    interviewBtn.classList.add('text-neutral/60');
    rejectedBtn.classList.add('text-neutral/60');

     allBtn.classList.remove('bg-sky-500','text-neutral/60' ,'text-white');
     interviewBtn.classList.remove('bg-sky-500','text-neutral/60' ,'text-white');
     rejectedBtn.classList.remove('bg-sky-500','text-neutral/60' ,'text-white');



     const selected=document.getElementById(id);
     condition=id;
     console.log('condition')
     
     

     selected.classList.add('bg-sky-500','text-white');

     if(id=='interview-btn'){
        allJobs.classList.add('hidden')
        filteredSection.classList.remove('hidden');
        renderInterview();
    }else if(id=='all-btn'){
         allJobs.classList.remove('hidden')
         filteredSection.classList.add('hidden')  
     }
     else if(id=="rejected-btn"){
        allJobs.classList.add('hidden')
        filteredSection.classList.remove('hidden');
        renderRejection();
     }

}
const interviewSection = document.getElementById("interview-section");
const rejectedSection = document.getElementById("rejected-section");

mainContainer.addEventListener("click", function (e) {

    const card = e.target.closest(".card-container");
    if (!card) return;

    // INTERVIEW CLICK
    if (e.target.classList.contains("card-btn-interview")) {

        card.querySelector(".condition").innerText = "Interview";
        interviewSection.appendChild(card);

        updateCounts();
        checkEmpty();

    }

    // REJECTED CLICK
    if (e.target.classList.contains("card-btn-rejected")) {

        card.querySelector(".condition").innerText = "Rejected";
        rejectedSection.appendChild(card);

        updateCounts();
        checkEmpty();
    }
});
function checkEmpty() {

    if (interviewSection.children.length === 0) {
        interviewSection.innerHTML = `
        <div class="p-6 bg-white text-center rounded">
            No Interview Jobs
        </div>`;
    }

    if (rejectedSection.children.length === 0) {
        rejectedSection.innerHTML = `
        <div class="p-6 bg-white text-center rounded">
            No Rejected Jobs
        </div>`;
    }
}

function renderRejection(){
    filteredSection.innerHTML = '';
    for(let i of rejection){
        let div=document.createElement('div');
        div.innerHTML=`
         <div id="card-container" class="space-y-2 p-8 bg-white rounded-[8px]">
          <div class="flex justify-between">
            <div>
              <h2 class="company-name text-[#002C5C] text-lg">${i.companyName}</h2>
<h3 class="text-neutral/60 position">${i.position}</h3>
            </div>
            <!-- icon -->
            <button class="bg-white p-3 rounded-full btn hover:border-red-600">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
          <h4 class="text-[14px] py-2">
            <span class="location">${i.location}</span>
             <span class="type"> ${i.type}</span> 
             <span class="salary"> ${i.salary}</span> 
          </h4>

          <h3 class="btn pointer-events-none condition">${i.condition}</h3>
          <p class="description">
            ${i.description}
          </p>
          <!-- buttons of card -->
          <div>
            <button class="btn btn-success btn-outline">Interview</button>
            <button class="btn btn-error btn-outline">Rejected</button>
          </div>
        </div>`
        filteredSection.appendChild(div)
    }
}
function renderInterview(){
    filteredSection.innerHTML = ''
    for(let i of interview){
        let div=document.createElement('div');
        div.innerHTML=`
         <div id="card-container" class="space-y-2 p-8 bg-white rounded-[8px]">
          <div class="flex justify-between">
            <div>
              <h2 class="company-name text-[#002C5C] text-lg">${i.companyName}</h2>
<h3 class="text-neutral/60 position">${i.position}</h3>
            </div>
            <!-- icon -->
            <button class="bg-white p-3 rounded-full btn hover:border-red-600">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
          <h4 class="text-[14px] py-2">
            <span class="location">${i.location}</span>
             <span class="type"> ${i.type}</span> 
             <span class="salary"> ${i.salary}</span> 
          </h4>

         <h3 class="btn pointer-events-none condition">${i.condition}</h3>
          <p class="description">
            Create stunning web experiences for high-profile clients. Must have
            portfolio and experience with modern web design trends.
          </p>
          <!-- buttons of card -->
          <div>
            <button class="btn btn-success btn-outline">Interview</button>
            <button class="btn btn-error btn-outline">Rejected</button>
          </div>
        </div>`
        filteredSection.appendChild(div)
    }
}
const allCards = document.querySelectorAll(".job-card");

const interviewContainer = document.getElementById("interviewTab");
const rejectedContainer = document.getElementById("rejectedTab");



let interviewTotal = 0;
let rejectedTotal = 0;

allCards.forEach(card => {

    const interviewBtn = card.querySelector(".interview-btn");
    const rejectedBtn = card.querySelector(".rejected-btn");

    interviewBtn.addEventListener("click", function () {

        // If already rejected → decrease rejected count
        if (card.dataset.status === "rejected") {
            rejectedTotal--;
            rejectedCount.innerText = rejectedTotal;
        }

        // If not already interview
        if (card.dataset.status !== "interview") {
            interviewTotal++;
            interviewCount.innerText = interviewTotal;
        }

        card.dataset.status = "interview";

        interviewContainer.appendChild(card);
    });


    rejectedBtn.addEventListener("click", function () {

        // If already interview → decrease interview count
        if (card.dataset.status === "interview") {
            interviewTotal--;
            interviewCount.innerText = interviewTotal;
        }

        // If not already rejected
        if (card.dataset.status !== "rejected") {
            rejectedTotal++;
            rejectedCount.innerText = rejectedTotal;
        }

        card.dataset.status = "rejected";

        rejectedContainer.appendChild(card);
    });

});



// console.log(parent)