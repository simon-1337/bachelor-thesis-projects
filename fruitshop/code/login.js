var session = request.getSession();

var username = request.getParameter("username");
var pwd = request.getParameter("pwd");

// Import the Connection class from the java.sql package
var DriverManager = Java.type('java.sql.DriverManager');

// Create a connection to the SQLite database
var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

if (username != null && pwd != null) { 
//else the code is executed each time you load the page	
	
	var prepstmt = conn.prepareStatement("SELECT password, customer_id FROM customer WHERE username=?;"); //search for customer in database (by username)
	prepstmt.setString(1, username);
	var rs = prepstmt.executeQuery();
	
	if (rs.next()) {
		var id = rs.getString("customer_id");
		var hashedPassword = rs.getString("password");
	} else {
		templateWrongCredentials(); //if username is not in database
	}
	rs.close();
	prepstmt.close();
	
	var bcrypt = Java.type("org.mindrot.jbcrypt.BCrypt");
	//check if password is correct
	if (bcrypt.checkpw(pwd, hashedPassword)) {
	  //store the login status is the session
	  session.setAttribute('logged', id)
		
	  // Transfer session shopping cart, 
	  //only if shopping cart exists in session
	  if (session.getAttribute('shopping_cart') != null) {
	    var shopping_cart = session.getAttribute('shopping_cart');
	    var user_id = session.getAttribute('logged');
	    var quantity;
	    var item;
			
        //iterate through the shopping_cart that was stored in the session
	    for (var selection in shopping_cart) {
	      quantity = shopping_cart[selection];
	      quantity = parseInt(quantity);
	      item = selection;
	  			
	      // Create the prepared statement and 
	      //set the parameters to check if prdouct is already in cart
	      var qry = "SELECT quantity FROM shopping_cart WHERE customer_id = ? AND fruit_id = ?";
	      prepstmt = conn.prepareStatement(qry);
	      prepstmt.setInt(1, id);
	      prepstmt.setInt(2, item);
	
		  // Execute the query and get the result set
		  rs = prepstmt.executeQuery();
				
		  var shopping_cart_quantity = 0;
		  while (rs.next()) { //can only be one time
		    shopping_cart_quantity = rs.getString('quantity');
			shopping_cart_quantity = parseInt(shopping_cart_quantity);
		  }
		  rs.close();
		  prepstmt.close();
				
		  // Create the prepared statement and set the parameters
		  var qry = "INSERT INTO shopping_cart (customer_id, fruit_id, quantity) VALUES (?,?,?) ON CONFLICT (customer_id,fruit_id) DO UPDATE SET quantity = ?";
		  prepstmt = conn.prepareStatement(qry);
		  prepstmt.setInt(1, user_id);
		  prepstmt.setInt(2, item);
		  prepstmt.setInt(3, quantity);
		  prepstmt.setInt(4, quantity + shopping_cart_quantity);
	
		  // Execute the update
		  prepstmt.executeUpdate();
		}
		conn.close();
		session.removeAttribute('shopping_cart') 
		//shopping_cart is now in database therefore not needed in session
	  } 
	  response.sendRedirect('index.jsp')
	} else {
		templateWrongCredentials(); //if passwords do not match
		rs.close();
		prepstmt.close();
		conn.close();
	}
}





function templateWrongCredentials() {
	out.println('<p class="warning">Wrong credentials, please try again!</p>')
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
