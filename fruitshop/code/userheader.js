var session = request.getSession();
var shopping_cart;
var shopping_cart_quantity;

//// HEADER FOR A USER NOT LOGGED IN ////
if (session.getAttribute('logged') == null) {
	out.println('<div class="userheader-child">');
	out.println('<a href="productlist.jsp" class="link-btn">Productlist</a>');
	out.println(templateLoginButton());
	out.println(templateSignUpButton());
	out.println('</div>');

	shopping_cart_quantity = 0;
	if (session.getAttribute('shopping_cart') != null) {
		shopping_cart = session.getAttribute('shopping_cart');
		//get the number of products hel in the shopping cart
		
		// Iterate through the shopping cart array
		for (var i = 0; i < shopping_cart.length; i++) {
 			// Check if the element at the current index is not null
  			if (shopping_cart[i] != null) {
    			// Add the element's value to the shopping cart quantity
    			shopping_cart_quantity += shopping_cart[i];
  			}
		}
	}

}


//// HEADER FOR A LOGGED IN USER ///
if (session.getAttribute('logged') != null) {
	// Import the DriverManager class from the java.sql package
	var DriverManager = Java.type('java.sql.DriverManager');

	// Create a connection to the SQLite database
	var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

	var qry ="SELECT username FROM customer WHERE customer_id = ?;";
	var prepstmt = conn.prepareStatement(qry);
    prepstmt.setInt(1,session.getAttribute("logged"));
    var rs = prepstmt.executeQuery();
    
    out.println('<div class="userheader-child">');
	out.println('<a href="productlist.jsp" class="link-btn">Productlist</a>');
    out.println('<div class="user_container">');
	while (rs.next()) {
    	out.println('Hello, ' + rs.getString("username"));
	}
	out.println(templateLogoutButton());
	out.println('</div>');
	out.println('</div>');
	rs.close();
	prepstmt.close();
	
	var qry = "SELECT SUM(quantity) as sum FROM shopping_cart WHERE customer_id = ?";
	var prepstmt = conn.prepareStatement(qry);
	prepstmt.setInt(1, session.getAttribute("logged"));
	var rs = prepstmt.executeQuery();

	while (rs.next()) {
  		shopping_cart_quantity = rs.getInt("sum");
	}
	rs.close();
	prepstmt.close();
	conn.close();
	
	if (shopping_cart_quantity == null) {
		shopping_cart_quantity = 0;
	}
}

//// CHECKOUT BUTTON, DISPLAY NUMBER OF ITEMS ////

if (shopping_cart_quantity == 0) {
	shopping_cart_quantity == 'None';
}

out.println(templateShoppingCart());
  

////HTML TEMPLATES////

//login button
function templateLoginButton() {
	return '<a href="login.jsp" class="link-btn">Login</a>'
}

//signup button
function templateSignUpButton() {
	return '<a href="signup.jsp" class="link-btn">Sign Up</a>'
}

//logout button
function templateLogoutButton() {
	return '<form action="logout.jsp" method="post" style="float:left;">' +
    			'<input type="submit" class="submit-btn" value="Logout" class="button">' +
			'</form>';
}

//goto shoppingCart 
function templateShoppingCart() { //maybe change to link
	return '<div class="shopping-cart-userheader" style="float:right;">' +
		       '<span>Items in Cart: ' + shopping_cart_quantity + '</span>' +
			   '<form action="shopping_cart.jsp" method="post">' +
			       '<input type="submit" class="submit-btn" value="View Cart" class="button">' +
		       '</form>' +
		   '</div>';
}

/*
    ------------------------ Apache Version 2.0 license -------------------------
       Copyright 2023 Simon Besenbäck

       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    -----------------------------------------------------------------------------
*/