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
        completeSignup.forEach(item => item.style.display = 'block');
        var user = firebase.auth().currentUser;
        var name, age, email, cityState, dealbreakerOne, dealbreakerTwo, dealbreakerThree;
        var todaysDate = new Date();

        db.collection('users').where('id', '==', user.uid).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                name = doc.data().firstName + " " + doc.data().lastName;
                age = todaysDate.getFullYear() - doc.data().birthYear;
                if (todaysDate.getMonth() < doc.data().birthMonth)
                {
                    age - 1;
                }
                else if (todaysDate.getMonth() == doc.data().birthMonth)
                {
                    if (todaysDate.getDate() < doc.data().birthDay)
                    {
                        age - 1;
                    }
                }
                ageString = age + " years old";
                email = doc.data().contactEmail;
                cityState = doc.data().city + ", " + doc.data().state;
                dealbreakerOne = doc.data().dealbreakerOne;
                dealbreakerTwo = doc.data().dealbreakerTwo;
                dealbreakerThree = doc.data().dealbreakerThree;

                var displayName = document.getElementById("displayName");
                displayName.innerText = name;

                var displayAge = document.getElementById("displayAge");
                displayAge.innerText = ageString;

                var displayEmail = document.getElementById("displayEmail");
                displayEmail.innerText = email;

                var displayCityState = document.getElementById("displayCityState");
                displayCityState.innerText = cityState;

                var displayDealbreakerOne = document.getElementById("dealbreaker-one");
                displayDealbreakerOne.innerText = dealbreakerOne;

                var displayDealbreakerTwo = document.getElementById("dealbreaker-two");
                displayDealbreakerTwo.innerText = dealbreakerTwo;

                var displayDealbreakerThree = document.getElementById("dealbreaker-three");
                displayDealbreakerThree.innerText = dealbreakerThree;
            });
        });
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