/*
Menu Item References
main = main
dsrt = dessert
drnk = drink
side = side
kids = kids
*/

var menuItemRef
var menuItemFav

function menuItemRead(_key) {
	console.log('%cmenuItemRead:'+_key, 'color: brown;');
	menuItemRef = _key
	fb_readRec(PROFILE, sessionStorage.getItem('UID'), userProfile, fbm_menuItemRegisterCheck);
}

function menuItemPageSetup(_fav) {
	menuItemFav = _fav
	fb_readRec(MENU, menuItemRef, dbData, fbm_menuItemCheck);
}

function menuItemProcessing(_snapshot, _data) {
	console.log('%cmenuItemProcessing:', 'color: brown;');
	_data = _snapshot.val();
	document.getElementById("h_"+menuItemRef+"Name").innerHTML = _data.name;
	document.getElementById("h_"+menuItemRef+"Price").innerHTML = _data.price;
	document.getElementById("p_"+menuItemRef+"Description").innerHTML = _data.desc;
	document.getElementById("p_"+menuItemRef+"Allergens").innerHTML = _data.algy;
	document.getElementById("p_"+menuItemRef+"Ingredients").innerHTML = _data.ingr;
	document.getElementById("itemLoading").style.display = "none";
	document.getElementById("itemImage").style.display = "inline";
	document.getElementById("itemPurchase").style.display = "grid";
	document.getElementById("itemInfo").style.display = "inline";
}

function menuItemAddToCart() {
	console.log('%cmenuItemAddToCart:', 'color: brown;');
	alert("This operation is currently not available.");
}

function menuItemAddToFavourite() {
	console.log('%cmenuItemAddToCart:', 'color: brown;');
	if (menuItemFav == "login") {
		alert("You must be logged in to use this function.");
	} else if (menuItemFav == "added") {
		alert("You must be logged in to use this function.");
	}
}