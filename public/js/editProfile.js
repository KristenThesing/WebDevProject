//edit profile method
const editProfileForm = document.querySelector('#editProfileForm');
editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var user = firebase.auth().currentUser;

    //save user profile data
    db.collection('users').doc(user.uid).update({
            firstName: editProfileForm['firstName'].value,
            lastName: editProfileForm['lastName'].value,
            contactEmail: editProfileForm['contactEmail'].value,
            city: editProfileForm['city'].value,
            state: editProfileForm['state'].value,
            identity: editProfileForm['identity'].value,
            seeking: editProfileForm['seeking'].value,
            dealbreakerOne: editProfileForm['dealbreaker-one'].value,
            dealbreakerTwo: editProfileForm['dealbreaker-two'].value,
            dealbreakerThree: editProfileForm['dealbreaker-three'].value,
    }).then(() => {
        editProfileForm.reset();
        window.location.replace("profile.html"); 
    });
});