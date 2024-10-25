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
var menuItemATC

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
	document.getElementById("h_"+menuItemRef+"Price").innerHTML = '$'+_data.price;
	document.getElementById("p_"+menuItemRef+"Description").innerHTML = _data.desc;
	document.getElementById("p_"+menuItemRef+"Allergens").innerHTML = _data.algy;
	document.getElementById("p_"+menuItemRef+"Ingredients").innerHTML = _data.ingr;
	document.getElementById("itemLoading").style.display = "none";
	document.getElementById("itemImage").style.display = "inline";
	document.getElementById("itemPurchase").style.display = "grid";
	document.getElementById("itemInfo").style.display = "inline";
	menuItemATC = {itemName: _data.name, itemPrice: _data.price};
}

function menuItemAddToCart() {
	console.log('%cmenuItemAddToCart:', 'color: brown;');
	const str = sessionStorage.getItem('userCart');
	userCart = JSON.parse(str);
	menuItemATC.itemQuantity = prompt(menuItemATC.itemName+' added to cart \nQuantity:');
	userCart.push(menuItemATC);
	const jsonArray = JSON.stringify(userCart);
	sessionStorage.setItem('userCart', jsonArray);
}

function menuItemAddToFavourite(_itemType, _item) {
	console.log('%cmenuItemAddToCart:', 'color: brown;');
	if (menuItemFav == "login") {
		alert("You must be logged in to use this function.");
	} else if (menuItemFav == "added") {
		sessionStorage.setItem(_itemType, _item);
		userProfile.name = sessionStorage.getItem('NAME');
		userProfile.age = sessionStorage.getItem('AGE');
		userProfile.phNumber = sessionStorage.getItem('PHNUMBER');
		userProfile.uid = sessionStorage.getItem('UID');
		userProfile.email = sessionStorage.getItem('EMAIL');
		userProfile.favMain = sessionStorage.getItem('MAIN');
		userProfile.favSide = sessionStorage.getItem('SIDE');
		userProfile.favDessert = sessionStorage.getItem('DESSERT');
		userProfile.favDrink = sessionStorage.getItem('DRINK');
		fb_writeRec(PROFILE, sessionStorage.getItem('UID'), userProfile);
		alert("You have favourited this item.");
	}
}