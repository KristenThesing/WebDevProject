const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const navItems = document.querySelectorAll('.nav-item');

const setupUI = (user) => {

    //display all permanent links
    navItems.forEach(item => item.style.display = 'block');

    if (user) {
        //toggle links
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else
    {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
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
    db.collection('users').where('id', '==', user.uid).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            first = doc.data().firstName;
            last = doc.data().lastName;
            email = doc.data().contactEmail;
            city = doc.data().city 
            state = doc.data().state;
            dealbreakerOne = doc.data().dealbreakerOne;
            dealbreakerTwo = doc.data().dealbreakerTwo;
            dealbreakerThree = doc.data().dealbreakerThree;

        db.collection('users').doc(user.uid).update({
            firstName: (editProfileForm['firstName'].value != "" ? editProfileForm['firstName'].value : first),
            lastName: (editProfileForm['lastName'].value != "" ? editProfileForm['lastName'].value : last),
            contactEmail: (editProfileForm['contactEmail'].value != "" ? editProfileForm['contactEmail'].value : email),
            city: (editProfileForm['city'].value != "" ? editProfileForm['city'].value : city),
            state: editProfileForm['state'].value,
            identity: editProfileForm['identity'].value,
            seeking: editProfileForm['seeking'].value,
            dealbreakerOne: (editProfileForm['dealbreaker-one'].value != "" ? editProfileForm['dealbreaker-one'].value : dealbreakerOne),
            dealbreakerTwo: (editProfileForm['dealbreaker-two'].value != "" ? editProfileForm['dealbreaker-two'].value : dealbreakerTwo),
            dealbreakerThree: (editProfileForm['dealbreaker-three'].value != "" ? editProfileForm['dealbreaker-three'].value : dealbreakerThree),
        }).then(() => {
            editProfileForm.reset();
            window.location.replace("profile.html"); 
        });
    });
});