//(function(){


  // Required for side-effects




  var config = {
    apiKey: "AIzaSyC-eG4Sn1gAbnYDdSn_kObzVTGTsfH09lk",
    authDomain: "dealbreaker-dating.firebaseapp.com",
    databaseURL: "https://dealbreaker-dating.firebaseio.com",
    projectId: "dealbreaker-dating",
  };
  firebase.initializeApp(config);
  



  //get elements
 const docRef = firestore.collection("users").doc("profileData");
  const preObject = document.getElementById('fname');
  const saveButton = document.getElementById('saveChanges');

  const dbRefObject = database().ref().child('object');

  saveButton.addEventListener("click",function(){
    const textToSave = preObject.value;
    console.log("I am going to save" + textToSave + "To firesore");
    docRef.set({
      fname:textToSave 
    });
  })

  


//}());


  