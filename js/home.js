let interview = [];
let rejection = [];
let condition = "all-btn";

// counts--->>==============================

// let allJobsCount=allJobs.children.length;

let totalCount = document.getElementById("count-total");
let interviewCount = document.getElementById("count-interview");
let rejectedCount = document.getElementById("count-rejected");

// buttons--->>=============================

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

// container----->>============================

const allJobs = document.getElementById("allJobs");
const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");

// count jobs------->>=========================

function calculateCount() {
  totalCount.innerText = allJobs.children.length;
  interviewCount.innerText = interview.length;
  rejectedCount.innerText = rejection.length;
}
calculateCount();

// toggleBtn

function toggleBtn(id) {
  allBtn.classList.add("text-neutral/60");
  interviewBtn.classList.add("text-neutral/60");
  rejectedBtn.classList.add("text-neutral/60");

  allBtn.classList.remove("bg-sky-500", "text-neutral/60", "text-white");
  interviewBtn.classList.remove("bg-sky-500", "text-neutral/60", "text-white");
  rejectedBtn.classList.remove("bg-sky-500", "text-neutral/60", "text-white");

  const selected = document.getElementById(id);
  condition = id;
  console.log("condition");

  selected.classList.add("bg-sky-500", "text-white");

  if (id == "interview-btn") {
    allJobs.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } else if (id == "all-btn") {
    allJobs.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  } else if (id == "rejected-btn") {
    allJobs.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejection();
  }
  const totalJobs = allJobs.children.length;
  const tabJobCount = document.getElementById("tab-job-count");

//   x of y jobs----->>

  if (id === "all-btn") {
    tabJobCount.innerText = totalJobs;
  } else if (id === "interview-btn") {
    tabJobCount.innerText = interview.length + " of " + totalJobs;
  } else if (id === "rejected-btn") {
    tabJobCount.innerText = rejection.length + " of " + totalJobs;
  }
  checkEmpty();
}

mainContainer.addEventListener("click", function (event) {
  // interview button
  if (event.target.closest("button")?.querySelector(".fa-trash-can")) {
  const card = event.target.closest(".job-card") || event.target.closest("[class*='p-8 bg-white']");
  if (!card) return;

  const companyName = card.querySelector(".company-name")?.innerText.trim();
  if (!companyName) return;

  interview  = interview.filter(c => c.companyName !== companyName);
  rejection = rejection.filter(c => c.companyName !== companyName);
  
  card.remove();
  calculateCount();
  checkEmpty();

  if (condition === "interview-btn") renderInterview();
  if (condition === "rejected-btn") renderRejection();
  
  if (condition !== "all-btn") checkEmpty(condition.replace("-btn", ""));
}

  if (event.target.classList.contains("card-btn-interview")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".company-name").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const cardCondition = parentNode.querySelector(".condition").innerText;
    const description = parentNode.querySelector(".description").innerText;
    parentNode.querySelector(".condition").innerText = "Interview";
    parentNode.classList.remove("border-l-4", "border-red-500");
    parentNode.classList.add("border-l-4", "border-green-500");
    parentNode.querySelector(".condition").classList.remove("btn-error"); 
    parentNode.querySelector(".condition").classList.add("btn-success", "text-white");

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      condition: "Interview",
      description,
    };
    
    rejection = rejection.filter((item) => item.companyName !== companyName);

    const companyExist = interview.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!companyExist) {
      interview.push(cardInfo);
    }



    if (condition == "rejected-btn") {
      renderRejection();
    }
   
    calculateCount();
    checkEmpty();

    if (condition === "rejected-btn") {
      renderRejection();
    }
  }
 
  else if (event.target.classList.contains("card-btn-rejected")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".company-name").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const cardCondition = parentNode.querySelector(".condition").innerText;
    const description = parentNode.querySelector(".description").innerText;
    parentNode.querySelector(".condition").innerText = "Rejected";
    parentNode.classList.remove("border-l-4", "border-green-500");
    parentNode.classList.add("border-l-4", "border-red-500");
    parentNode.querySelector(".condition").classList.remove("btn-success"); 
    parentNode.querySelector(".condition").classList.add("btn-error", "text-white");

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      condition: "Rejected",
      description,
    };

    interview = interview.filter((item) => item.companyName !== companyName);

    const companyExist = rejection.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!companyExist) {
      rejection.push(cardInfo);
    }
    
    if (condition == "rejected-btn") {
      renderRejection();
    }
    calculateCount();
    checkEmpty();

    if (condition === "rejected-btn") {
      renderRejection();
    }
  }
  
});

function renderRejection() {
  filteredSection.innerHTML = "";
  for (let i of rejection) {
    let div = document.createElement("div");
    div.className = 'card-container space-y-2 p-8 bg-white rounded-[8px]';
   
    div.innerHTML = `
        
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

          <h3 class="btn btn-error text-white pointer-events-none condition">${i.condition}</h3>
          <p class="description">
            ${i.description}
          </p>
          <!-- buttons of card -->
          <div>
            <button class="card-btn-interview btn btn-success btn-outline">Interview</button>
<button class="card-btn-rejected btn btn-error btn-outline">Rejected</button>
          </div>
        </div>`;
    filteredSection.appendChild(div);
  }
}
function renderInterview() {
  filteredSection.innerHTML = "";
  for (let i of interview) {
    let div = document.createElement("div");
    
    div.innerHTML = `
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

        <h3 class="btn btn-success text-white pointer-events-none condition">${i.condition}</h3>
          <p class="description">
            ${i.description}
          </p>
          <!-- buttons of card -->
          <div>
            <button class="card-btn-interview btn btn-success btn-outline">Interview</button>
<button class="card-btn-rejected btn btn-error btn-outline">Rejected</button>
          </div>
        </div>`;
    filteredSection.appendChild(div);
  }
}
function checkEmpty() {
  const emptyState = document.getElementById("empty-state");

  const totalJobs = allJobs.children.length;

  if (condition === "all-btn") {
    if (totalJobs === 0) {
      allJobs.classList.add("hidden");
      emptyState.classList.remove("hidden");
    } else {
      allJobs.classList.remove("hidden");
      emptyState.classList.add("hidden");
    }
  }

  else if (condition === "interview-btn") {
    if (interview.length === 0) {
      filteredSection.classList.add("hidden");
      emptyState.classList.remove("hidden");
    } else {
      filteredSection.classList.remove("hidden");
      emptyState.classList.add("hidden");
    }
  }

  else if (condition === "rejected-btn") {
    if (rejection.length === 0) {
      filteredSection.classList.add("hidden");
      emptyState.classList.remove("hidden");
    } else {
      filteredSection.classList.remove("hidden");
      emptyState.classList.add("hidden");
    }
  }
}

// console.log(parent)
