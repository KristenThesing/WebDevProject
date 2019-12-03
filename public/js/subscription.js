const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const navItems = document.querySelectorAll('.nav-item');
const weekButton = document.getElementById('weekButton');
const monthButton = document.getElementById('monthButton');
const yearButton = document.getElementById('yearButton');

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
        });

        var user = firebase.auth().currentUser;

        //update subscription type
        weekButton.addEventListener("click",function() {
            //save user profile data
            var todaysDate = new Date();
            db.collection('users').doc(user.uid).update( {
                subscriptionStatus: "oneWeek",
                subscriptionDate: todaysDate.getMonth() + "-" + todaysDate.getDate() + "-" + todaysDate.getFullYear(),
            }).then(() => {
                window.location.replace("profile.html"); 
            });

        });

        monthButton.addEventListener("click",function() {
            //save user profile data
            var todaysDate = new Date();
            db.collection('users').doc(user.uid).update( {
                subscriptionStatus: "oneMonth",
                subscriptionDate: todaysDate.getMonth() + "-" + todaysDate.getDate() + "-" + todaysDate.getFullYear(),
            }).then(() => {
                window.location.replace("profile.html"); 
            });
        });

        yearButton.addEventListener("click",function() {
            //save user profile data
            var todaysDate = new Date();
            db.collection('users').doc(user.uid).update( {
                subscriptionStatus: "oneYear",
                subscriptionDate: todaysDate.getMonth() + "-" + todaysDate.getDate() + "-" + todaysDate.getFullYear(),
            }).then(() => {
                window.location.replace("profile.html"); 
            });
        });
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