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

let totalNum = document.getElementById('total-num');
let InterveiwNum = document.getElementById('interVeiw-num');
let rejectedNum = document.getElementById('rejected-num')

const allJobSection = document.getElementById('alljobs');
const filteredSection = document.getElementById('filtered-section');



// select the main container 
// const mainContainer = document.querySelector('main');
// console.log(mainContainer);


function calculateCount() {
  totalNum.innerText = allJobSection.children.length;
  InterveiwNum.innerText = interveiwList.length;
  rejectedNum.innerText = rejectedList.length;


}
calculateCount()

// creating Toggle style .....

const allBtn = document.getElementById('btn-all');
const interveiwBtn = document.getElementById('btn-interview');
const rejectedBtn = document.getElementById('btn-rejected');



function toggleStyle(id) {

  allBtn.classList.remove('bg-blue-600', 'text-white')
  interveiwBtn.classList.remove('bg-blue-600', 'text-white')
  rejectedBtn.classList.remove('bg-blue-600', 'text-white')

  allBtn.classList.add('bg-gray-200', 'text-black')
  interveiwBtn.classList.add('bg-gray-200', 'text-black')
  rejectedBtn.classList.add('bg-gray-200', 'text-black')

  const selected = document.getElementById(id);
  // console.log(selected)

  selected.classList.remove('bg-gray-200', 'text-black')
  selected.classList.add('bg-blue-600', 'text-white')

  if (id == 'btn-interview') {
    allJobSection.classList.add('hidden')
    filteredSection.classList.remove('hidden')

  } else {
    allJobSection.classList.remove('hidden')
    filteredSection.classList.add('hidden')
  }

  //---toggling finished -------------------------------

  // The final works ...

  // mainContainer.addEventListener('click',function(event){
  //   console.log(event.target.parentNode);

  // })

}

// here we select the 'main div '
const mainContainer = document.querySelector('main');
//================================================================

mainContainer.addEventListener('click', function (event) {
  console.log(event.target.classList.contains('btnInterveiw'))

  if (event.target.classList.contains('btnInterveiw')) {

    const parentNode = event.target.parentNode.parentNode;

    const company = parentNode.querySelector('.company').innerText;
    const skills = parentNode.querySelector('.skills').innerText;
    const jobPattern = parentNode.querySelector('.place').innerText;
    const jobTime = parentNode.querySelector('.fulltime').innerText;
    const salaryRange = parentNode.querySelector('.salary').innerText;
    const btnDelete = parentNode.querySelector('.btnDelete').innerText;
    const notApplied = parentNode.querySelector('.notApplied').innerText;
    const notes = parentNode.querySelector('.notes').innerText;
    const btnInterveiw = parentNode.querySelector('.btnInterveiw').innerText;
    const btnRejected = parentNode.querySelector('.btnRejected').innerText;
    parentNode.querySelector('.notApplied').innerText = 'Applied';

    // object declaration 

    const cardInfo = {
      company,
      skills,
      jobPattern,
      jobTime,
      salaryRange,
      btnDelete,
      notApplied: 'Applied',
      notes,
      btnInterveiw,
      btnRejected


    }
    //  console.log(cardInfo);

    const jobExist = interveiwList.find(item => item.mobileCompany == cardInfo.mobileCompany)


    if (!jobExist) {

      interveiwList.push(cardInfo);



    }
    calculateCount()
    renderInterveiw()
  }

  // console.log(mobileCompany)

})

function renderInterveiw() {

  filteredSection.innerHTML = ''


  for (let interveiw of interveiwList) {
    console.log(interveiw);
    let div = document.createElement('div');

    div.className = ' grid row-auto gap-5 firstJob'

    div.innerHTML = `<section id="first-job">
                <div class="space-y-4 " >
                    <div
                        class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm relative transition-shadow hover:shadow-md ">
                        <div class="flex justify-between ">
                            <div>
                                <h2 id="C-name" class="  text-xl font-bold text-slate-900 dark:text-white mobileCompany">Mobile
                                    First Corp</h2>
                                <p class="text-slate-600 dark:text-slate-400 font-medium mb-2 skills">React Native Developer
                                </p>
                                <div
                                    class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-500 mb-4">
                                    <span class="flex items-center gap-1"><span
                                            class="material-icons-outlined text-sm  remote">Remote</span ></span>
                                    <span class="flex items-center gap-1"><span
                                            class="material-icons-outlined text-sm  fulltime">. Full-time</span> </span>
                                    <span class="flex items-center gap-1"><span
                                            class="material-icons-outlined text-sm salary">. $130,000 -
                                        $175,000</span></span>
                                </div>
                            </div>
                            <button class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                <span class="material-icons-outlined btnDelete">delete</span>
                            </button>
                        </div>
                        <div
                            class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-4 notApplied">
                            NOT APPLIED
                        </div>
                        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 notes">
                            Build cross-platform mobile applications using React Native. Work on products used by
                            millions
                            of
                            users worldwide.
                        </p>
                        <div class="flex gap-3">
                            <button id="btn-inter-one"
                                class="px-4 py-2 text-sm font-bold border-2 border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors btnInterveiw">INTERVIEW</button>
                            <button
                                class="px-4 py-2 text-sm font-bold border-2 border-red-500 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors btnRejected">REJECTED</button>
                        </div>
                    </div>
  
    
    `

    filteredSection.appendChild(div);


  }

}
