//complete signup method
const completeSignupForm = document.querySelector('#completeSignupForm');
completeSignupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var user = firebase.auth().currentUser;

    //save user profile data
    db.collection('users').doc(user.uid).update({
            id: user.uid,
            city: completeSignupForm['city'].value,
            state: completeSignupForm['state'].value,
            contactEmail: completeSignupForm['contactEmail'].value,
            birthMonth: completeSignupForm['selectMonth'].value,
            birthDay: completeSignupForm['selectDay'].value,
            birthYear: completeSignupForm['selectYear'].value,
            identity: completeSignupForm['identity'].value,
            seeking: completeSignupForm['seeking'].value,
            dealbreakerOne: completeSignupForm['dealbreaker-one'].value,
            dealbreakerTwo: completeSignupForm['dealbreaker-two'].value,
            dealbreakerThree: completeSignupForm['dealbreaker-three'].value,
            subscriptionStatus: "free"
    }).then(() => {
        completeSignupForm.reset();
        window.location.replace("profile.html");
    });
});