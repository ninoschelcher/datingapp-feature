/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */

const profilePicture = document.querySelector('#change-profipic');
const editProfilePicture = document.querySelector('#changeimage');
const secondButton = document.querySelector("#step2button");
const thirdButton = document.querySelector("#step3button");
const fourthButton = document.querySelector("#step4button");
const fifthButton = document.querySelector("#step5button");

const dogPicPreview = document.querySelector(".dogpicpreview");
const profilePicPreview = document.querySelector(".profilepicpreview");
const profilePicInput = document.querySelector("#profilepicture");
const dogPicInput = document.querySelector("#dogpicture");
const previousStep = document.querySelector("#previousStep");
const nextStep = document.querySelector("#nextStep");
const navSteps = document.querySelector("#navsteps");
const stepTab = document.querySelectorAll(".steptab");
const stepsSubmit = document.querySelector("#allstepssubmit");
let currentTab = 0; 

dogPicInput.addEventListener('change', (event) => {
    dogPicPreview.src = URL.createObjectURL(event.target.files[0]);
});

profilePicInput.addEventListener('change', (event) => {
    profilePicPreview.src = URL.createObjectURL(event.target.files[0]);
});

stepTab.forEach(step => step.style.display = "none");
stepsSubmit.style.display = "none";
navSteps.style.display = "flex";

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
  const progressBar = document.getElementsByClassName("allprogressBar");
  stepTab[currentStep].style.display = "block";
  
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
        inputs[i].className += " invalid";
      } else {
        inputs[i].className += " valid";
      }
    }
    return valid; 
  }

nextStep.addEventListener('click', function(){changeStep(1)});
previousStep.addEventListener('click', function(){changeStep(-1)});
showStep(currentTab); 


