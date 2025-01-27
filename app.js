
   
  const firebaseConfig = {
    apiKey: "AIzaSyAM7pYiPUXB4v0ye6tRbixrD2o8giYlfVU",
    authDomain: "mukherbal-f7974.firebaseapp.com",
    projectId: "mukherbal-f7974",
    storageBucket: "mukherbal-f7974.appspot.com",
    messagingSenderId: "18891945272",
    appId: "1:18891945272:web:81b8263d1f9b9ffec47dcd"
  };

  var app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

console.log(auth);


function changeIcon() 
{
  var passwordInput = document.getElementById("password");
  var img = document.getElementById("img");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    img.src = "./images/invisible.png";
  } else {
    passwordInput.type = "password";
    img.src = "./images/show.png";
  }
}

function validation() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var mobileNumber = document.getElementById("mobileNumber").value;

  var userCheck = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  var emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  var passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  var mobileCheck =
    /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

  if (userCheck.test(username)) {
    document.getElementById("usernameError").innerHTML = "";
  } else {
    document.getElementById("usernameError").innerHTML = "** Invalid username";
    return false;
  }

  if (emailCheck.test(email)) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "** Invalid email";
    return false;
  }

  if (passwordCheck.test(password)) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML = "** Invalid password";
    return false;
  }

  if (mobileCheck.test(mobileNumber)) {
    document.getElementById("mobileError").innerHTML = "";
  } else {
    document.getElementById("mobileError").innerHTML =
      "** Invalid mobileNumber";
    return false;
  }

  var obj = {
    username,
    mobileNumber,
  };

  localStorage.setItem("obj", JSON.stringify(obj));

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      window.location = "index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (location.pathname === "/login.html" ||location.pathname === "/signup.html" ) {
      window.location = "index.html";
    }
    console.log(user);
  } else {
    

    console.log("not login");
  }
});

function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout successfully..");
      })
      .catch((error) => {
        console.log(error);
      });
  }


