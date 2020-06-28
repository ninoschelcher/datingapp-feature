/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */

// Query selectors for image preview //
const dogPicInput = document.querySelector("#dogpicture");
const dogPicPreview = document.querySelector(".dogpicpreview");
const profilePicPreview = document.querySelector(".profilepicpreview");
const profilePicInput = document.querySelector("#profilepicture");

// Query selectors for progressive disclosure steps
const previousStepButton = document.querySelector("#previousStep");
const nextStepButton = document.querySelector("#nextStep");
const navSteps = document.querySelector("#navsteps");
const stepsSubmit = document.querySelector("#allstepssubmit");
const stepTab = document.querySelectorAll(".steptab");
const progressBars = document.querySelectorAll(".allprogress");

// Eventlisteners for image preview inputs
dogPicInput.addEventListener('change', (event) => {
    dogPicPreview.src = URL.createObjectURL(event.target.files[0]);
});

profilePicInput.addEventListener('change', (event) => {
    profilePicPreview.src = URL.createObjectURL(event.target.files[0]);
});

// Make sure progress bar shows when JS is turned on & all steps are hidden by defualt.
progressBars.forEach(progress => progress.style.display = "block");
stepTab.forEach(step => step.style.display = "none");

// Hide 'normal' submit button and turn on new navigation with next/previous step.
stepsSubmit.style.display = "none";
navSteps.style.display = "flex";

// Set the current step number to 0 so the first step shows when loaded, its important that this is at 0 cause you want the steps to start at 0 since its a nodelist.
let currentStepNumber = 0; 

// Function to show current step when the button Next Step/Previous Step is hit and updates nav & progressbar if necessary.
const showStep = (currentStep) => {
  const progressBar = stepTab[currentStep].querySelectorAll(".allprogressBar");

  stepTab[currentStep].style.display = "block";

  progressBar.forEach(progress => {
    if(currentStep == 0) {
      progress.style.width = "0%";
    } else if (currentStep == 1) {
      progress.style.width = "20%";
    } else if (currentStep == 2) {
      progress.style.width = "40%";
    } else if (currentStep == 3) {
      progress.style.width = "60%";
    } else if (currentStep == 4) {
      progress.style.width = "80%";
    } 
  });

  if (currentStep == 0) {
    previousStepButton.style.display = "none";
  } else {
    previousStepButton.style.display = "block";
  }
  if (currentStep == 4) {
    nextStepButton.innerHTML = "Submit";
  } else {
    nextStepButton.innerHTML = "Next";
  }
}

// Function to validate if forms arent empty and checking if you can go to the next step or if you are at the last stap which means submit.
const changeStep = (nextStep) => {
    if (nextStep == 1 && !validateForm()) return false;
    stepTab[currentStepNumber].style.display = "none";
    currentStepNumber = currentStepNumber + nextStep;
    if (currentStepNumber >= stepTab.length) {
        document.getElementById("submitallsteps").submit();
      }
    showStep(currentStepNumber);
  }

// Function that checks if form input are empty, based on that change styling of the inputs, its like a custom error validation.
const validateForm = () => {
  let valid = true;
  const inputs = stepTab[currentStepNumber].getElementsByTagName("input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      valid = false;
      inputs[i].classList.add("invalid");
    } else {
      inputs[i].classList.remove("invalid");
    }
  }
  return valid; 
}
// Eventlisteners for the nav buttons when they are hit, this starts the process.
nextStepButton.addEventListener('click', function(){changeStep(1)});
previousStepButton.addEventListener('click', function(){changeStep(-1)});

// Call the showstep function with the parameter 0, this makes sure the first step shows on load.
showStep(currentStepNumber); 