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

        var user = firebase.auth().currentUser;
        var name, age, email, dealbreakerOne, dealbreakerTwo, dealbreakerThree;
        var displayName, displayAge, displayCityState, displayEmail, displayOne, displayTwo, displayThree;
        var imSeeking, myIdentity;
        var i = 0;
        var todaysDate = new Date();

        db.collection('users').where('id', '==', user.uid).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                imSeeking = doc.data().seeking;
                myIdentity = doc.data().identity;

                db.collection('users')
                    .where('identity', '==', imSeeking).where('seeking', '==', myIdentity)
                    .get().then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        if (doc.data().id != user.uid)
                        {
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
                            ageString = "Age: " + age;
                            email = doc.data().contactEmail;
                            cityState = doc.data().city + ", " + doc.data().state;
                            dealbreakerOne = doc.data().dealbreakerOne;
                            dealbreakerTwo = doc.data().dealbreakerTwo;
                            dealbreakerThree = doc.data().dealbreakerThree;   

                            displayName = document.getElementById("name-" + i);
                            displayName.innerText = name;

                            displayAge = document.getElementById("age-" + i);
                            displayAge.innerText = ageString;

                            displayEmail = document.getElementById("email-" + i);
                            displayEmail.innerText = email;
                            displayEmail.setAttribute("href", "mailto:" + email);

                            displayCityState = document.getElementById("city-" + i);
                            displayCityState.innerText = cityState;

                            displayOne = document.getElementById("DealBreaker-" + i + "-1");
                            displayOne.innerText = dealbreakerOne;

                            displayTwo = document.getElementById("DealBreaker-" + i + "-2");
                            displayTwo.innerText = dealbreakerTwo;

                            displayThree = document.getElementById("DealBreaker-" + i + "-3");
                            displayThree.innerText = dealbreakerThree;
                            
                            i++;
                        }
                    });
                });
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