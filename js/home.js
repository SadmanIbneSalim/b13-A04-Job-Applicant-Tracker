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

function calculateCount() {
   totalCount.innerText = allJobs.children.length;
    interviewCount.innerText = interview.length;
    rejectedCount.innerText = rejection.length;
}
calculateCount();


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

mainContainer.addEventListener('click',function(event){
    
    
    // interview button
        
    if(event.target.classList.contains('card-btn-interview')){

        const parentNode=event.target.parentNode.parentNode;

        const companyName=parentNode.querySelector('.company-name').innerText;
    const position=parentNode.querySelector('.position').innerText;
    const location=parentNode.querySelector('.location').innerText;
    const type=parentNode.querySelector('.type').innerText;
    const salary=parentNode.querySelector('.salary').innerText;
    const cardCondition=parentNode.querySelector('.condition').innerText
    const description=parentNode.querySelector('.description').innerText;
    parentNode.querySelector('.condition').innerText='interview';
   
  
    const cardInfo={
        companyName,
        position,
        location,
        type,
        salary,
        condition: 'Interview',
        description
    }
    

    
    const companyExist=interview.find(item=> item.companyName ==cardInfo.companyName);

    if(!companyExist){
        interview.push(cardInfo);
    
    }

    //  interview=interview.filter(item=>item.companyName != cardInfo.companyName);
     
     if(condition=='rejected-btn'){
         renderRejection();
        }
       parentNode.remove();
calculateCount();

if(condition === 'rejected-btn'){
    renderRejection();
}
    }
    // rejected button
    
    else if(event.target.classList.contains('card-btn-rejected')){

        const parentNode=event.target.parentNode.parentNode;

        const companyName=parentNode.querySelector('.company-name').innerText;
    const position=parentNode.querySelector('.position').innerText;
    const location=parentNode.querySelector('.location').innerText;
    const type=parentNode.querySelector('.type').innerText;
    const salary=parentNode.querySelector('.salary').innerText;
    const cardCondition=parentNode.querySelector('.condition').innerText
    const description=parentNode.querySelector('.description').innerText;
    parentNode.querySelector('.condition').innerText='Rejected';
   
  
    const cardInfo={
        companyName,
        position,
        location,
        type,
        salary,
        condition: 'Rejected',
        description
    }
   

    
    const companyExist=rejection.find(item=> item.companyName ==cardInfo.companyName);

    if(!companyExist){
        rejection.push(cardInfo);
    
    }
    // rejection=rejection.filter(item=>item.companyName !=cardInfo.companyName);

    if(condition=="rejected-btn"){
        renderRejection();

    }
    
    
     parentNode.remove();
calculateCount();

if(condition === 'rejected-btn'){
    renderRejection();
}
}
});

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



// console.log(parent)