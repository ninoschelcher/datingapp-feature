/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */

const profilePicture = document.querySelector('#change-profipic');
const editProfilePicture = document.querySelector('#changeimage');
const dogPicInput = document.querySelector("#dogpicture");
const dogPicPreview = document.querySelector(".dogpicpreview");
const profilePicPreview = document.querySelector(".profilepicpreview");
const profilePicInput = document.querySelector("#profilepicture");

const previousStep = document.querySelector("#previousStep");
const nextStep = document.querySelector("#nextStep");

const navSteps = document.querySelector("#navsteps");
const stepTab = document.querySelectorAll(".steptab");
const stepsSubmit = document.querySelector("#allstepssubmit");
const progressBars = document.querySelectorAll(".allprogress");

dogPicInput.addEventListener('change', (event) => {
    dogPicPreview.src = URL.createObjectURL(event.target.files[0]);
});

profilePicInput.addEventListener('change', (event) => {
    profilePicPreview.src = URL.createObjectURL(event.target.files[0]);
});

progressBars.forEach(progress => progress.style.display = "block");
stepTab.forEach(step => step.style.display = "none");

stepsSubmit.style.display = "none";
navSteps.style.display = "flex";

let currentTab = 0; 

const changeStep = (nextStep) => {
    const stepTab = document.getElementsByClassName("steptab");
    if (nextStep == 1 && !validateForm()) return false;
    stepTab[currentTab].style.display = "none";
    currentTab = currentTab + nextStep;
    if (currentTab >= stepTab.length) {
        document.getElementById("submitallsteps").submit();
        return false;
      }
    showStep(currentTab);
  }

const showStep = (currentStep) => {
  const stepTab = document.getElementsByClassName("steptab");
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
  if (currentStep == (stepTab.length - 1)) {
    nextStep.innerHTML = "Submit";
  } else {
    nextStep.innerHTML = "Next Step";
  }
}

const validateForm = () => {
  let valid = true;
  const stepTab = document.getElementsByClassName("steptab");
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

nextStep.addEventListener('click', function(){changeStep(1)});
previousStep.addEventListener('click', function(){changeStep(-1)});

showStep(currentTab); 


