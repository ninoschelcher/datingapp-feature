/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */
const dogPictureInput = document.querySelector('#dogpicture');
const profilePictureInput = document.querySelector('#profilepicture');
const profilePicture = document.querySelector('#change-profipic');
const editProfilePicture = document.querySelector('#changeimage');


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


