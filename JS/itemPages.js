/*
Menu Item References
main = main
dsrt = dessert
drnk = drink
side = side
kids = kids
*/

function menuItemRead(_key) {
	console.log('%cmenuItemRead:'+_key, 'color: brown;');
	var menuItemRef = _key
	fb_readRec(MENU, _key, menuItem, fbm_menuItemCheck);
}

function menuItemProcessing(_snapshot, _data) {
	console.log(_snapshot.algy);
	console.log(_data);
}