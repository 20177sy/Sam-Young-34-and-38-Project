/**************************************************************/
// fbm_firebase.js
// Written by Sam Young   2024
// v1 firebase DB testing write AND read to firebase
// v2 add Google login
// v2 use pop up for login
// v3 add console.logs
/**************************************************************/
MODULENAME = "fbm_firebase.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
const DETAILS = "userProfile";
const ADMIN = "admin";

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userProfile = {
	uid:    		  '',
	email:   			'',
	name:					'',
	age:					'',
	phNumber:			'',
	savedOrder:		''
};

var admin = {
	uid:		'',
	admin:	''
}
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/

/**************************************************************/
// fbm_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fbm_initialise() {
	console.log('%cfbm_initialise: ', 'color: brown;');

	// PLACE YOUR CONFIG FROM THE FIREBASE CONSOLE BELOW <========
	const FIREBASECONFIG = {
		apiKey: "AIzaSyAST0rg5FDJXYCKjDpFEgqESsa051n0WF4",
    authDomain: "samyoung-as34and38-cafe.firebaseapp.com",
    databaseURL: "https://samyoung-as34and38-cafe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "samyoung-as34and38-cafe",
    storageBucket: "samyoung-as34and38-cafe.appspot.com",
    messagingSenderId: "438434697303",
    appId: "1:438434697303:web:9eadd31445d871cfa95312",
    measurementId: "G-PEG0VGLDL0"
	};

	// Check if firebase already initialised
	if (!firebase.apps.length) {
		firebase.initializeApp(FIREBASECONFIG);
		database = firebase.database();
		sessionStorage.setItem('database', database);
	}
}

/**************************************************************/
// fbm_procLogin(_loginStatus, _user, _save)
// Processes and save the user details
// Input:  Recieved data and where to store it
// Return:
/**************************************************************/
function fbm_procLogin(_loginStatus, _user, _save) {
	console.log('%cfbm_procLogin:', 'color: brown;');
	console.log(_user.uid);
	_save.uid = _user.uid;
	sessionStorage.setItem('UID', _user.uid);
	sessionStorage.setItem('NAME', _user.displayName);
	sessionStorage.setItem('EMAIL', _user.email);
	sessionStorage.setItem('PHOTO', _user.photoURL);

	if (_loginStatus == 'logged in' || _loginStatus == 'logged in via popup') {
		console.log('%clogin success', 'color: green;');
		fb_readRec(DETAILS, userDetails.uid, userDetails, fbm_registerCheck);

	} else {
		console.log('%clogin failure', 'color: red;');
	}
}

/**************************************************************/
/************************ END OF MODULE ***********************/
/**************************************************************/