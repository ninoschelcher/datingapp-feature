/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */

const profilePicture = document.querySelector('#change-profipic');
const editProfilePicture = document.querySelector('#changeimage');
const secondButton = document.querySelector("#step2button");
const thirdButton = document.querySelector("#step3button");
const fourthButton = document.querySelector("#step4button");
const fifthButton = document.querySelector("#step5button");
const progressBar = document.querySelector(".progressBar");
const fileInput = document.querySelector("input[type='file']")
const picturePreviews = document.querySelectorAll(".picpreview");


/* Image Preview */
if(fileInput) {
fileInput.addEventListener('change', (event) => {
    picturePreviews.forEach(preview => 
        preview.src = URL.createObjectURL(event.target.files[0]));
})
}

/* Progress Bar */
if(secondButton) {
secondButton.addEventListener('click', () => {
    progressBar.style.width = "40%";
});
}

if(thirdButton) {
thirdButton.addEventListener('click', () => {
    progressBar.style.width = "60%";
});
}


if (fourthButton) {
fourthButton.addEventListener('click', () => {
    progressBar.style.width = "80%";
});
}

if(fifthButton) {
fifthButton.addEventListener('click', () => {
    progressBar.style.width = "100%";
});
}

/* Profile Enhancements */
if(profilePicture) {
profilePicture.addEventListener('mouseover', () => {
    editProfilePicture.style.display = "block";
});

profilePicture.addEventListener('mouseleave', () => {
    editProfilePicture.style.display = "none";
})

editProfilePicture.addEventListener('mouseover', () => {
    editProfilePicture.style.display = "block";  
});
}


