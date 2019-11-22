const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const navItems = document.querySelectorAll('.nav-item');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    //display all permanent links
    navItems.forEach(item => item.style.display = 'block');

    if (user) {
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
        }
        //account details
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${doc.data().firstName} ${doc.data().lastName}</div>
            <div>${user.email}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;
        });

        //toggle links
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else
    {
        adminItems.forEach(item => item.style.display = 'none');
        //hide account details
        accountDetails.innerHTML = 'Please login to view account details';
        //toggle links
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }

};

//setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});