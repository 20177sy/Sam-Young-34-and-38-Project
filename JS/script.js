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

/*************************************************
Cart System
*************************************************/
var orderButton;
var totalPrice;
var ordered;
var ordersQuantity;
var order = {};
var tempItemInfo = {};

function scriptCartPageload (_status) {
	totalPrice = 0;
	ordered = false;
	orderButton = document.getElementById('b_orderButton');
	order.name = sessionStorage.getItem('NAME');
	if (_status == 'login') {
		alert('You must be logged in to access the cart.');
	} else {
		fb_readAll(ORDERS, dbData, fbm_cartOrdersCheck);
	}
}

function scriptCartProcess(_orders) {
	ordersQuantity = _orders;
	scriptCartLoad();
}

function scriptCartLoad() {
	console.log('%cscriptCartLoad', 'color: brown;');
	const str = sessionStorage.getItem('userCart');
	userCart = JSON.parse(str);
	let numberOfItems = userCart.length;

	const div = document.getElementById("cartTable");
	div.style.width = '100%';
	if (numberOfItems == 1) {
		let p = document.createElement('p');
		p.innerHTML = 'Go to the menu to add something to your cart';
		div.appendChild(p);
	} else {
		const tbl = document.createElement('table');
		tbl.style.width = '7fr';
		tbl.style.borderCollapse = 'collapse';
		tbl.style.borderBottom = '1px solid black';

		for (let i = 0; i <= numberOfItems; i++) {
			const tr = tbl.insertRow();
			
			for (let j = 0; j < 4; j++) {
				const td = tr.insertCell();
				if (i==0) {
					tr.style.borderBottom = '1px solid black';
					console.log('Round: '+i+'\nObject: '+userCart[i]);
					if (j == 0) {
						td.style.width = '3fr';
						td.appendChild(document.createTextNode('Item Name'));
					} else if (j == 1) {
						td.style.width = '1fr';
						td.style.paddingLeft = '60px';
						td.appendChild(document.createTextNode('Unit Price'));
					} else if (j == 2) {
						td.style.width = '1.5fr';
						td.style.paddingLeft = '60px';
						td.appendChild(document.createTextNode('Quantity'));
					} else if (j == 3) {
						td.style.width = '1.5fr';
						td.style.paddingLeft = '60px';
						td.appendChild(document.createTextNode('Price'));
					}
				} else if (i > 0 && i < numberOfItems) {
					console.log('Round: '+i+'\nObject: '+userCart[i]);
					
					if (j == 0) {
						td.appendChild(document.createTextNode(userCart[i].itemName));
					} else if (j == 1) {
						td.style.paddingLeft = '60px';
						td.appendChild(document.createTextNode('$'+userCart[i].itemPrice));
					} else if (j == 2) {
						td.style.paddingLeft = '60px';
						td.appendChild(document.createTextNode(userCart[i].itemQuantity));
					} else if (j == 3) {
						td.style.paddingLeft = '60px';
						let itemNumPrice = Number(userCart[i].itemPrice);
						let itemNumQuantity = Number(userCart[i].itemQuantity);
						let itemTotalPrice = itemNumPrice*itemNumQuantity;
						totalPrice = totalPrice+itemTotalPrice
						console.log('itemTotalPrice: '+itemTotalPrice);
						let item = userCart[i].itemName;
						console.log(item);
						tempItemInfo.itemPrice = itemTotalPrice;
						tempItemInfo.itemQuantity = userCart[i].itemQuantity;
						// This next line doesn't work for more than one item in an order, it overwrites previous entries. I have no idea why. 
						order[item] = tempItemInfo;
						console.log(order);
						td.appendChild(document.createTextNode('$'+itemTotalPrice));
					}
				} else if (i==numberOfItems) {
					console.log('Round: '+i+'\nTotal Price: '+totalPrice);
					tr.style.borderTop = '1px solid black';
					if (j == 0) {

					} else if (j == 1) {

					} else if (j == 2) {
						td.style.paddingLeft = '60px';
						td.style.textAlign = 'right';
						td.appendChild(document.createTextNode('Total:'));
					} else if (j == 3) {
						td.style.paddingLeft = '60px';
						td.appendChild(document.createTextNode('$'+totalPrice));
					}
				}
			}
		}
		tbl.style.marginLeft = 'auto';
		tbl.style.marginRight = 'auto';
		div.appendChild(tbl);
		orderButton.style.visibility = 'visible';
	}
}

function scriptOrderButton() {
	console.log('ordered');
	if (ordered == false) {
		ordered = true
		orderButton.innerHTML = 'ORDERING...'
		fb_writeRec(ORDERS, ordersQuantity, order);
		alert('Order Placed');
		orderButton.innerHTML = 'ORDERED'
	} else {

	}
}
