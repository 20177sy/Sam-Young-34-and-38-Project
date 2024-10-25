/*******************************************************/
// regPage.js
// validates registration data and writes to firebase
// Written by Sam Young
/*******************************************************/
MODULENAME = "regPage.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');


/**************************************************************/
// regContinue()
// save the user details to variable objects
// Input:  
// Return:
/**************************************************************/
function regContinue() {
	console.log('%cregContinue: Start', 'color: brown;');
	document.getElementById('p_regFail').innerHTML = "";
	let validation = "incomplete";
	const INPUTS = ["reg_name", "reg_age", "reg_phNumber"]

	for (var i=0; i<3; i++) {
		console.log('%cRegForLoop: Start', 'color: brown;');
		let checkField = INPUTS[i];
		if (!document.getElementById(checkField).checkValidity()) {
			document.getElementById('p_regFail').innerHTML = "Age and Phone Number must be numerals. No field can be left blank.";
			validation = "failed";
			console.log('%creg validation: '+validation, 'color: red;');
			console.log('%creg field: '+checkField, 'color: red;');
		} else if (i == 2 && validation == "incomplete") {
			validation = "complete";
		}
		if (validation == "complete") {
			console.log('%creg validation: '+validation, 'color: green;');
			userProfile.name = document.getElementById('reg_name').value;
			userProfile.age = document.getElementById('reg_age').value;
			userProfile.phNumber = document.getElementById('reg_phNumber').value;
			userProfile.uid = sessionStorage.getItem('UID');
			userProfile.email = sessionStorage.getItem('EMAIL');
			admin.uid = sessionStorage.getItem('UID');
			admin.admin = 'false';
			sessionStorage.setItem('NAME', userProfile.name);
			sessionStorage.setItem('AGE', userProfile.age);
			sessionStorage.setItem('PHNUMBER', userProfile.phNumber);
			sessionStorage.setItem('admin', admin.admin);
			console.log(userProfile);
			userCart.push({uid: userProfile.uid});
			const jsonArray = JSON.stringify(userCart);
			sessionStorage.setItem('userCart', jsonArray);
			fb_writeRec(PROFILE, sessionStorage.getItem('UID'), userProfile);
			fb_writeRec(ADMIN, sessionStorage.getItem('UID'), admin);
			setTimeout(function () {window.location.replace("/profile.html");}, 2000);
		}
	}
}
/******************** End of Module ********************/