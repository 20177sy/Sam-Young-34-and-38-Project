function signinCheck() {
	console.log('%csignInCheck', 'color: brown;');
	fb_login(userProfile, fbm_procLogin);
}

function screenSizeCheck() {
	console.log('%cscreenSizeCheck', 'color: brown;');
	if (window.screen.width >= 769) {
		window.location.replace('/mains.html');
	}
}
