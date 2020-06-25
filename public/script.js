/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */

// Query selectors for image preview //
const dogPicInput = document.querySelector("#dogpicture");
const dogPicPreview = document.querySelector(".dogpicpreview");
const profilePicPreview = document.querySelector(".profilepicpreview");
const profilePicInput = document.querySelector("#profilepicture");

// Query selectors for progressive disclosure steps
const previousStep = document.querySelector("#previousStep");
const nextStep = document.querySelector("#nextStep");
const navSteps = document.querySelector("#navsteps");
const stepTab = document.querySelectorAll(".steptab");
const stepsSubmit = document.querySelector("#allstepssubmit");
const progressBars = document.querySelectorAll(".allprogress");

// Eventlisteners for image preview inputs //
dogPicInput.addEventListener('change', (event) => {
    dogPicPreview.src = URL.createObjectURL(event.target.files[0]);
});

profilePicInput.addEventListener('change', (event) => {
    profilePicPreview.src = URL.createObjectURL(event.target.files[0]);
});

// Make sure progress bar shows when js is turned on & all setps are automatically hidden
progressBars.forEach(progress => progress.style.display = "block");
stepTab.forEach(step => step.style.display = "none");

// Hide non-js submit button when js is on & show new navigation items
stepsSubmit.style.display = "none";
navSteps.style.display = "flex";

// Set currenttab to 0 so the first step shows
let currentTab = 0; 

// Function to show current step when the button Next Step is hit and updates nav & progressbar if necessary
const showStep = (currentStep) => {
  const progressBar = stepTab[currentStep].getElementsByClassName("allprogressBar");

  stepTab[currentStep].style.display = "block";

  for(i = 0; i < progressBar.length; i++) {
    if(currentStep == 0) {
      progressBar[i].style.width = "0%";
    } else if (currentStep == 1) {
      progressBar[i].style.width = "20%";
    } else if (currentStep == 2) {
      progressBar[i].style.width = "40%";
    } else if (currentStep == 3) {
      progressBar[i].style.width = "60%";
    } else if (currentStep == 4) {
      progressBar[i].style.width = "80%";
    } 
  }

  if (currentStep == 0) {
    previousStep.style.display = "none";
  } else {
    previousStep.style.display = "block";
  }
  if (currentStep == 4) {
    nextStep.innerHTML = "Submit";
  } else {
    nextStep.innerHTML = "Next Step";
  }
}

// Function to validate if forms arent empty and checking if you can go to the next step or if you are at the last stap which means submit
const changeStep = (nextStep) => {
    if (nextStep == 1 && !validateForm()) return false;
    stepTab[currentTab].style.display = "none";
    currentTab = currentTab + nextStep;
    if (currentTab >= stepTab.length) {
        document.getElementById("submitallsteps").submit();
        return false;
      }
    showStep(currentTab);
  }

// Function that checks if form input are empty, based on that change styling of the inputs, its like a custom error
const validateForm = () => {
  let valid = true;
  const inputs = stepTab[currentTab].getElementsByTagName("input");
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
nextStep.addEventListener('click', function(){changeStep(1)});
previousStep.addEventListener('click', function(){changeStep(-1)});

// Call the showstep function with the parameter 0 which is declared above all functions
showStep(currentTab); 