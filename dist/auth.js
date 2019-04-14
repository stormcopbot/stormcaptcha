      var fs = require('fs');
      const storage = require('electron-json-storage');

      var licenseStatus;
      var validcopy;
      var deviceIP
      var copyID
// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDKNCman0AZSkudLnqZ6ZLv-Y-Pp9jdhlw",
    authDomain: "stormcaptcha-dc67d.firebaseapp.com",
    databaseURL: "https://stormcaptcha-dc67d.firebaseio.com",
    projectId: "stormcaptcha-dc67d",
    storageBucket: "stormcaptcha-dc67d.appspot.com",
    messagingSenderId: "659785301892"
  };
  firebase.initializeApp(config);


function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]

  storage.get('uuid', function(error, data) {
    if (error) throw error;
   
    deviceIP = data
  });
  check(deviceIP)
function check(deviceIP){
  firebase.database().ref('/users/' +  encodeURIComponent(user.uid).replace(".","")).once('value').then(function(snapshot) {
    if(snapshot.val() == null){
      console.log(snapshot.val())
      if (deviceIP == undefined){
        console.log(deviceIP)
          function guid() {
              function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              }
              return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }
            var uuid = guid();


        storage.set('uuid', uuid, function(error) {
          if (error) throw error;
        });
        storage.set('useruid', encodeURIComponent(user.uid).replace(".",""), function(error) {
          if (error) throw error;
        });

        firebase.database().ref('users/' + encodeURIComponent(user.uid).replace(".","")).set({
              deviceID: uuid,
          }).then(function(){check(deviceIP)});
      }else if(deviceIP != undefined){
        firebase.database().ref('users/' + encodeURIComponent(user.uid).replace(".","")).set({
              deviceID: deviceIP,
          }).then(function(){check(deviceIP)});
      }else{
        alert("Eroor")
      }
    }else{

      storage.get('uuid', function(error, data) {

        if(snapshot.val().deviceID == data){
          fs.readFile(`${__dirname}/main.js`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            var s = data.split("/*login*/")[0]
            var remove = data.replace(s, 'var userlog="' + document.getElementById('username').value +'";'+'var passwordlog="'+document.getElementById('password').value+'";');
            fs.writeFile(`${__dirname}/main.js`, remove, function(err){
              if(err){

              }else{
                alert('Restart the app to continue')
              }
            });;

            //window.resizeTo(1000, 655);

          });

        }else{
          alert("account is already used in another device")
        }

      });
  
    }
    // ...
  }).catch(function(error) {
      // Handle Errors here.
      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;
      }
      // ...
    });
}
    //  document.getElementById('sign-out').addEventListener('click', startSignIn, false);

   // window.location.replace("index.html");

       //window.location.href = "background.html"
      //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // [END_EXCLUDE]
    } else {
      
      document.getElementById('quickstart-button').textContent = 'Sign-in';
      document.getElementById('quickstart-button').addEventListener('click', signinuserpass, false);
      document.getElementById('resetPassword').addEventListener('click', resetPass, false);
     // document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
  });
  // [END authstatelistener]
  
}

function resetPass(){
  firebase.auth().sendPasswordResetEmail(document.getElementById('username').value).then(function(user) {
    document.getElementById('message').textContent = "A password creation link was successfully sent to your email"
     // user signed in
}).catch(function(error) {
  // Handle Errors here.
  if(error){
    var errorCode = error.code;
    var errorMessage = error.message;

    document.getElementById('message').textContent = errorMessage
  }
  // ...
});
}


function signoutclicking(){
  document.getElementById('message').textContent = 'Access denied. Must be logged in to continue.'
}

function signinuserpass(user){

  var username = document.getElementById('username').value
var password = document.getElementById('password').value

firebase.auth().signInWithEmailAndPassword(username, password).then(function(user) {

    storage.set('username', username, function(error) {
          if (error) throw error;
    });

    storage.set('password', password, function(error) {
          if (error) throw error;
    });

 //location.reload()
     // user signed in
}).catch(function(error) {
  // Handle Errors here.
  if(error){
    var errorCode = error.code;
    var errorMessage = error.message;

    document.getElementById('message').textContent = errorMessage
  }
  // ...
});

}
/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('sign-out').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}

window.onload = function() {
  initApp();
};
