var session = request.getSession(); 

//session.invalidate();

// Import the Connection class from the java.sql package
var DriverManager = Java.type('java.sql.DriverManager');


// Create a connection to the SQLite database
var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

// Execute a SELECT query to retrieve all data from table fruit
var stmt = conn.createStatement();
var rs = stmt.executeQuery('SELECT * FROM fruit;');

out.println('<div class="products-grid">');
while (rs.next()) {
	templateProductItem(rs.getString("name"), rs.getString("price"), rs.getString("weight"), rs.getString("picture"), rs.getString("fruit_id"));
}
out.println('</div>');

rs.close;
stmt.close;

var selection = request.getParameter('selection');
var quantity = request.getParameter('quantity');
quantity = parseInt(quantity);


////NOT LOGGED IN USER////

// Adjust cart for a user that is not logged in
if (session.getAttribute("logged") == null) {

  // Check if choice and quantity are not null
  if (selection != null && quantity != null) {
    // Create a new cart if it doesn't exist
    if (session.getAttribute("shopping_cart") == null) {
      var cartArray = new Array(100); //creates JavaScript array object
      session.setAttribute("shopping_cart", cartArray);
    }
    var shopping_cart = session.getAttribute("shopping_cart");
    // Add a new product to the cart or update the quantity of an existing 
    //product
    if (shopping_cart[selection] == null) {
      shopping_cart[selection] = quantity;
    } else {
      shopping_cart[selection] = shopping_cart[selection] + quantity;
    }
    // as session is stored on the server it is not required 
    //to use setAttribute again, cahnges are persistent
    // Close the connection and refresh the page
    conn.close();
    response.sendRedirect(request.getRequestURI());
  }
}



////LOGGED IN USER////


// Adjust cart for a logged in user (SAVED IN THE DATABASE)
if (session.getAttribute("logged") != null) {

  // Check if selection and quantity are not null
  if (selection != null && quantity != null) {
    // Check if the product already exists in the shopping cart
    var qry = "SELECT quantity from shopping_cart where customer_id = ? and fruit_id = ?";
    var prepstmt = conn.prepareStatement(qry);
    prepstmt.setInt(1, session.getAttribute("logged"));
    prepstmt.setInt(2, selection);
    var rs = prepstmt.executeQuery();
    var cartQuantity = 0;
    while (rs.next()) {
      cartQuantity = rs.getString("quantity");
    }
    
    cartQuantity = parseInt(cartQuantity);
    
    rs.close();
    prepstmt.close();
    
    // Update the shopping cart
    qry = "INSERT INTO shopping_cart (fruit_id, customer_id, quantity) VALUES (?,?,?) ON CONFLICT (fruit_id, customer_id) DO UPDATE SET quantity = ?";
	prepstmt = conn.prepareStatement(qry);
	prepstmt.setInt(1, selection);
	prepstmt.setInt(2, session.getAttribute('logged'));
	prepstmt.setInt(3, quantity);
	prepstmt.setInt(4, cartQuantity + quantity);
	prepstmt.executeUpdate();
	prepstmt.close();
    conn.close();
    

    
    // Refresh the page
    response.sendRedirect(request.getRequestURI());
  }
}
conn.close();



//// HTML TEMPLATE ////
function templateProductItem(name, price, weight, picture, fruit_id) {
	out.println('<div class="product-container">' +
	          	'<h2>' + name + '</h2>' +
	            '<img src="' + picture + '" height="300px" width="300px" />' +
	       	    '<p>Price: ' + price + ' Euro</p>' +
	            '<p>Weight: ' + weight + 'Kg</p>' +
	        	'<form name="selection" method="post">' +
	            '<input type="hidden" name="selection" value="' + fruit_id + '">' +
	              '<select name="quantity">' +
	              	'<option value="1">1</option>' +
	           		'<option value="2">2</option>' +
	           		'<option value="3">3</option>' +
	       			'<option value="4">4</option>' +
	       			'<option value="5">5</option>' +
	        	   '</select>' +
            	'<input type="submit" style="cursor: pointer;" value="Buy">' +
	          	'</form>' +
	        	'</div>');
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