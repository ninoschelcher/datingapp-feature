
const step3form = document.querySelector('#step3form');
const hobbiesinput = document.querySelectorAll('.hobbies');
const firstHobby = document.querySelector('#hobby1');

hobbiesinput.forEach(input => input.style.display = "none");

if(firstHobby) {
firstHobby.addEventListener('keyup', (event) => {
   console.log(this.value);
})};


const profilePicture = document.querySelector('#profilepictures');
const editProfilePicture = document.querySelector('#changeimage');
profilePicture.addEventListener('mouseover', () => {
    editProfilePicture.style.display = "block";
})





/* https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript used preview images when uploading them */
const dogPictureInput = document.querySelector('#dogpicture');
const profilePictureInput = document.querySelector('#profilepicture');

if(dogPictureInput) {
dogPictureInput.addEventListener('change', (event) => {
    const dogPicture = document.getElementById('picture-dog');
    dogPicture.src = URL.createObjectURL(event.target.files[0]);
});
}

if(profilePictureInput) {
profilePictureInput.addEventListener('change', (event) => {
    const profilePicture = document.getElementById('picture-profile');
    profilePicture.src = URL.createObjectURL(event.target.files[0]);
});
}
