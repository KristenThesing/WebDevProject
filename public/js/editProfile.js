//edit profile method
const editProfileForm = document.querySelector('#editProfileForm');
editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var user = firebase.auth().currentUser;

    //save user profile data
    db.collection('users').doc(user.uid).set({
            firstName: editProfileForm['firstName'].value,
            lastName: editProfileForm['lastName'].value,
            city: editProfileForm['city'].value,
            state: editProfileForm['state'].value,
            identity: editProfileForm['identity'].value,
            seeking: editProfileForm['seeking'].value,
            subscriptionStatus: "free"
    }).then(() => {
        editProfileForm.reset();
        window.location.replace("profile.html");
    });
});