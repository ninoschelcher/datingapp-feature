/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */
const dogPictureInput = document.querySelector('#dogpicture');

if (dogPictureInput) {
dogPictureInput.addEventListener('change', (event) => {
    const dogPicture = document.querySelector('#picture-dog');
    dogPicture.src = URL.createObjectURL(event.target.files[0]);
});
}

const profilePictureInput = document.querySelector('#profilepicture');

if(profilePictureInput) {
profilePictureInput.addEventListener('change', (event) => {
    const profilePicture = document.querySelector('#profile-picturepreview');
    profilePicture.src = URL.createObjectURL(event.target.files[0]);
});
}


/* Profile Enhancements */

const profilePicture = document.querySelector('#profilepictures');
const editProfilePicture = document.querySelector('#changeimage');

if(profilePicture) {
profilePicture.addEventListener('mouseover', () => {
    editProfilePicture.style.display = "block";
});
}


