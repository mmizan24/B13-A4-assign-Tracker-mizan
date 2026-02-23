function getTransferFromAll(id){
    const restore=document.getElementById(id);
    const value=restore.innerText
    console.log(id,value);
    return value;
}



const container = document.getElementById('button-container');

  container.addEventListener('click', (e) => {
    // 1. Ensure we only act if a button was clicked
    const clickedBtn = e.target.closest('button');
    if (!clickedBtn) return;

    // 2. Find the one button that currently has the active classes
    const currentActive = container.querySelector('.bg-blue-600');

    // 3. Swap classes between the old active and the new clicked button
    if (currentActive) {
      currentActive.classList.replace('bg-blue-600', 'text-gray-600');
      currentActive.classList.remove('text-white');
    }

    clickedBtn.classList.replace('text-gray-600', 'bg-blue-600');
    clickedBtn.classList.add('text-white');
  });