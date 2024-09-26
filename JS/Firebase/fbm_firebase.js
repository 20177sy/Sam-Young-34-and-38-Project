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
const PROFILE = "userProfile";
const ADMIN = "admin";
const MENU = "menuItems"

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userProfile = {
	uid:    		'',
	email:   		'',
	name:			'',
	age:			'',
	phNumber:		'',
	favMain:		'',
	favSide:		'',
	favDessert:		'',
	favDrink:		''
};

var admin = {
	uid:	'',
	admin:	''
};

var menuItem = {
	algy:	'',
	desc:	'',
	ingr:	'',
	name:	'',
	price:	'',
}

var dbData = {};
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
// Processes and save the user PROFILE
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
	sessionStorage.setItem('MAIN', _user.favMain);
	sessionStorage.setItem('SIDE', _user.favSide);
	sessionStorage.setItem('DESSERT', _user.favDessert);
	sessionStorage.setItem('DRINK', _user.favDrink);

	if (_loginStatus == 'logged in' || _loginStatus == 'logged in via popup') {
		console.log('%clogin success', 'color: green;');
		fb_readRec(PROFILE, userProfile.uid, userProfile, fbm_registerCheck);

	} else {
		console.log('%clogin failure', 'color: red;');
	}
}

/**************************************************************/
// fbm_registerCheck(_snapshot, _data)
// checks for user in firebase, moves to new page depending on the answer
// Input:  Recieved data and where to store it
// Return:
/**************************************************************/
function fbm_registerCheck(_readStatus, _snapshot, _data, _error) {
	console.log('%cfbm_registerCheck:', 'color: brown;');
	if (_readStatus == 'failed') {
		console.error('%c'+_error, 'color: red');
		alert('Read Record Error, Check Console.');
	} else if (_snapshot.val() == null) {
		console.log(sessionStorage.getItem('UID'));
		fb_readRec('admin', sessionStorage.getItem('UID'), dbData, fbm_adminCheck);
		window.location.replace("/register.html");
	} else {
		fb_readRec(ADMIN, sessionStorage.getItem('UID'), dbData, fbm_adminCheck);
		window.location.replace("/profile.html");
	}
}


function fbm_adminCheck(_readStatus, _snapshot, _data, _error) {
	console.log('%cfbm_adminCheck:', 'color: brown;');
	if (_readStatus == 'failed') {
		console.error('%c'+_error, 'color: red');
		alert('Read Record Error, Check Console.');
	} else if (_snapshot.val() == true) {
		
	}
}

/**************************************************************/
// fbm_menuItemRegisterCheck(_snapshot, _data)
// checks for user in firebase, moves to new page depending on the answer
// Input:  Recieved data and where to store it
// Return:
/**************************************************************/
function fbm_menuItemRegisterCheck(_readStatus, _snapshot, _data, _error) {
	console.log('%cfbm_registerCheck2:', 'color: brown;');
	if (_readStatus == 'failed') {
		console.error('%c'+_error, 'color: red');
		alert('Read Record Error, Check Console.');
	} else if (_snapshot.val() == null) {
		menuItemPageSetup("login");
	} else {
		menuItemPageSetup("added");
	}
}

/**************************************************************/
// fbm_menuItemCheck(_snapshot, _data)
// checks for menu item in firebase, moves to new page depending on the answer
// Input:  Recieved data and where to store it
// Return:
/**************************************************************/
function fbm_menuItemCheck(_readStatus, _snapshot, _data, _error) {
	console.log('%cfbm_menuItemCheck:', 'color: brown;');
	if (_readStatus == 'failed') {
		console.error('%c'+_error, 'color: red');
		alert('Read Record Error, Check Console.');
	} else {
		console.log('%cfbm_menuItemCheck: Success', 'color: green;');
		menuItemProcessing(_snapshot, _data);
	}
}

/**************************************************************/
// fbm_menuItemCheck(_snapshot, _data)
// checks for menu item in firebase, moves to new page depending on the answer
// Input:  Recieved data and where to store it
// Return:
/**************************************************************/
function fbm_menuItemCheck(_readStatus, _snapshot, _data, _error) {
	console.log('%cfbm_menuItemCheck:', 'color: brown;');
	if (_readStatus == 'failed') {
		console.error('%c'+_error, 'color: red');
		alert('Read Record Error, Check Console.');
	} else {
		console.log('%cfbm_menuItemCheck: Success', 'color: green;');
		menuItemProcessing(_snapshot, _data);
	}
}

/**************************************************************/
/************************ END OF MODULE ***********************/
/**************************************************************/