const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const completeSignup = document.querySelectorAll('.signed-up');
const navItems = document.querySelectorAll('.nav-item');

const setupUI = (user) => {

    //display all permanent links
    navItems.forEach(item => item.style.display = 'block');

    if (user) {
        //toggle links
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        completeSignup.forEach(item => item.style.display = 'block')
    }
    else
    {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        completeSignup.forEach(item => item.style.display = 'none')
    }

};

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
    }
    else
    {
        setupUI();
    }
});

//logout method
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.replace("index.html");
});

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