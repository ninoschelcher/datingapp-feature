/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */
const dogPictureInput = document.querySelector('#dogpicture');
const profilePictureInput = document.querySelector('#profilepicture');
const profilePicture = document.querySelector('#change-profipic');
const editProfilePicture = document.querySelector('#changeimage');

const secondButton = document.querySelector("#step2button");
const thirdButton = document.querySelector("#step3button");
const fourthButton = document.querySelector("#step4button");
const fifthButton = document.querySelector("#step5button");
const progressBar = document.querySelector(".progressBar");

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


if (dogPictureInput) {
dogPictureInput.addEventListener('change', (event) => {
    const dogPicture = document.querySelector('#picture-dog');
    dogPicture.src = URL.createObjectURL(event.target.files[0]);
});
}

if(profilePictureInput) {
profilePictureInput.addEventListener('change', (event) => {
    const profilePicture = document.querySelector('#profile-picturepreview');
    profilePicture.src = URL.createObjectURL(event.target.files[0]);
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


