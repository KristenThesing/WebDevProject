  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyC-eG4Sn1gAbnYDdSn_kObzVTGTsfH09lk",
    authDomain: "dealbreaker-dating.firebaseapp.com",
    databaseURL: "https://dealbreaker-dating.firebaseio.com",
    storageBucket: "dealbreaker-dating.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  