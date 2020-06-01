
const step3form = document.querySelector('#step3form');
const hobbiesinput = document.querySelectorAll('.hobbies');
const firstHobby = document.querySelector('#fir')

hobbiesinput.forEach(input => input.style.display = "none");



const loadDogPicture = (event) => {
    const dogPicture = document.getElementById('picture-dog');
    dogPicture.src = URL.createObjectURL(event.target.files[0]);
};

const loadProfilePicture = (event) => {
    const profilePicture = document.getElementById('picture-profile');
    profilePicture.src = URL.createObjectURL(event.target.files[0]);
}