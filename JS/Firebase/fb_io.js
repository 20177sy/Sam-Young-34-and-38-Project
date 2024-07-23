/**************************************************************/
// fb_io.js
// Written by Sam Young   2023
// v1 firebase DB testing write AND read to firebase
// v2 add Google login
// v2 use pop up for login
// v3 add console.logs
/**************************************************************/
MODULENAME = "fb_io.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

/**************************************************************/
// fb_login(_save, _procFunc)
// Called by setup
// Login to Firebase
// Input:  object for login data to save to
// Return: n/a
/**************************************************************/
function fb_login(_save, _procFunc) {
	console.log('%cfb_login: ', 'color: brown;');

	firebase.auth().onAuthStateChanged(newLogin);

	/*-----------------------------------------*/
	// newLogin(user)
	/*-----------------------------------------*/
	function newLogin(user) {
		if (user) {
			// user is signed in, so save Google login details
			loginStatus = 'logged in';
			_procFunc(loginStatus, user, _save);
		}
		else {
			// user NOT logged in, so redirect to Google login
			loginStatus = 'logged out';

			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
				loginStatus = 'logged in via popup';
				_procFunc(loginStatus, result.user, _save);
			})
			// Catch errors
			.catch(function(error) {
				if (error) {
					loginStatus = 'failed';
					console.log('%cfb_login: ' + error.code + ', ' +
						error.message, 'color: red;');
				}
			});
		}
		console.log('fb_login: status = ' + loginStatus);
	}
}

/**************************************************************/
// fb_logout()
// Logout of Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_logout() {
	console.log('%cfb_logout: ', 'color: brown;');

	firebase.auth().signOut();
}

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key and the data to write
// Return: 
/**************************************************************/
function fb_writeRec(_path, _key, _data) {
	console.log('%cfb_WriteRec: path= ' + _path + '  key= ' + _key,
		'color: brown;');

	database.ref(_path + '/' + _key).set(_data, 
		function (error) {
			if (error) {
				console.log('write failure: ');
				console.log(error);
			} else {
				console.log('write success');
			}
		}                                                                                        
	);
}

/**************************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save the data
// Return:
/**************************************************************/
function fb_readAll(_path, _data, _procfunc) {
	console.log('%cfb_readAll: path= ' + _path, 'color: brown;');

	readStatus = 'waiting';
	database.ref(_path).once('value', gotRecord, readErr);

/**************************************************************/
// fb_readAll(_path, _data)
// Calls the function which processes the recieved data
/**************************************************************/
	function gotRecord(snapshot) {
		readStatus = 'OK';
		_procfunc(readStatus, snapshot, _data);
	}

/**************************************************************/
// fb_readErr(error)
// Called in the event of an error
/**************************************************************/
	function readErr(error) {
		readStatus = 'failed';
		_procfunc(readStatus, null, _data, error);
	}
}



/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save the data
// Return:  
/**************************************************************/
function fb_readRec(_path, _key, _data, _procfunc) {
	console.log('%cfb_readRec: path= ' + _path +
		'  key= ' + _key, 'color: brown;');

	readStatus = 'waiting';
	database.ref(_path + '/' + _key).once('value', gotRecord, readErr);

/**************************************************************/
// fb_readAll(_path, _data)
// Calls the function which processes the recieved data
/**************************************************************/
	function gotRecord(snapshot) {
		readStatus = 'success';
		_procfunc(readStatus, snapshot, _data);
	}

/**************************************************************/
// fb_readErr(error)
// Called in the event of an error
/**************************************************************/
	function readErr(error) {
		readStatus = 'failed';
		_procfunc(readStatus, null, _data, error);
	}
}

/**************************************************************/
//    END OF MODULE
/**************************************************************/