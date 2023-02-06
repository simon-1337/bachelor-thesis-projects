var session = request.getSession();
var conn;


// Shopping cart page if user is not loggged in 
//but has values in the shopping cart
if (session.getAttribute('logged') == null && 
	session.getAttribute('shopping_cart') != null) {
	createConnectionToDatabase();
	
	var shopping_cart = session.getAttribute('shopping_cart');
	var totalPrice = 0;
	
	var i = 0;
	out.println('<div class="shopping-cart-ctn">')
	for (var selection in shopping_cart) {
	  	var quantity = shopping_cart[selection];
	  	var quantity = parseInt(quantity);
	  	itemID = selection;
		
		var qry = "SELECT * FROM fruit WHERE fruit_id=" + itemID + ";";
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(qry);
		
		var bgColor = getBackgroundColor(i);
		
		while (rs.next()) {
			totalPrice = totalPrice + (rs.getInt('price') * quantity);
			templateProductContainer(rs.getString('name'), rs.getString('picture'), rs.getString('weight'), rs.getString('price'), quantity, itemID, bgColor);
		}
		i++;
		rs.close();
		stmt.close();
	}
	
	templateSumContainer(totalPrice);

		//Functionality of the buttons add, reduce and delete
	if (request.getParameter("actn") == "+") {
		var fruit_id = request.getParameter("fruit_id");
		// increase quantity by 1
		var quantity = parseInt(request.getParameter("quantity")) + 1; 
		shopping_cart[fruit_id] = quantity; 
		response.sendRedirect(request.getRequestURI());
	}
	
	if (request.getParameter("actn") == "-") {
	  var fruit_id = request.getParameter("fruit_id");
	  // reduce quantity by 1
	  var quantity = parseInt(request.getParameter("quantity")) - 1; 
	  shopping_cart[fruit_id] = quantity; 
	  if (quantity <= 0) {
		// delete product from cart if quantity goes below 1
	    delete shopping_cart[id]; 
	  }
	  response.sendRedirect(request.getRequestURI());
	}
	
	if (request.getParameter("actn") == "del") {
	  var fruit_id = request.getParameter("fruit_id");
	  delete shopping_cart[fruit_id]; // delete product from cart
	  response.sendRedirect(request.getRequestURI());
	}
}


//Shopping_cart page if user is logged in
if (session.getAttribute('logged') != null) {
	createConnectionToDatabase();
	
	var totalprice = 0;
	

	var qry = "SELECT * FROM shopping_cart INNER JOIN fruit USING(fruit_id) " +
	 		  "WHERE customer_id = ?;";
    var prepstmt = conn.prepareStatement(qry);
    prepstmt.setInt(1, session.getAttribute("logged"));
    var rs = prepstmt.executeQuery();    // get data for all products in cart

	var i = 0;
    out.println('<div class="shopping-cart-ctn">');    
    while (rs.next()) {
        totalprice = totalprice + (rs.getInt("price") * rs.getInt("quantity"));
        var bgColor = getBackgroundColor(i);
        templateProductContainer(rs.getString("name"), rs.getString("picture"), rs.getString("weight"), rs.getInt("price"), rs.getInt("quantity"), rs.getString("fruit_id"), bgColor);
    	i++;
    }
    rs.close();
    prepstmt.close();
    out.println('</div>');

    templateSumContainer(totalprice);

	
	////Functionality of the buttons add, reduce and delete

	 // increase quantity in database cart
	if (request.getParameter("actn") == "+") {
	    var fruit_id = request.getParameter("fruit_id");
	    var quantity = request.getParameter("quantity");
	    quantity = parseInt(quantity);
	    quantity = quantity + 1; 
	
	    var qry = "UPDATE shopping_cart SET quantity = ? WHERE customer_id = ? AND fruit_id = ?;";
	    var prepstmt = conn.prepareStatement(qry);
	    prepstmt.setInt(1, quantity);
	    prepstmt.setInt(2, session.getAttribute("logged"));
	    prepstmt.setInt(3, fruit_id);
	    prepstmt.executeUpdate(); 
	    prepstmt.close();
	    conn.close();
	
	    response.sendRedirect(request.getRequestURI());  // refresh page
	}
	
	if (request.getParameter("actn") == "-") {
	    var fruit_id = request.getParameter("fruit_id");
	    var quantity = request.getParameter("quantity") - 1;
	    // delete product from cart if quantity goes below 1
	    if (quantity <= 0) { 
	        var qry = "DELETE FROM shopping_cart WHERE customer_id = ? AND AND fruit_id = ?;";
	        var prepstmt = conn.prepareStatement(qry);
	        prepstmt.setInt(1, session.getAttribute("logged"));
	        prepstmt.setInt(2, fruit_id);
	        prepstmt.executeUpdate();  
	        prepstmt.close();
	    } else { // reduce quantity in database cart
	        var qry = "UPDATE shopping_cart SET quantity = ? WHERE customer_id = ? AND fruit_id = ?;";
	        var prepstmt = conn.prepareStatement(qry);
	        prepstmt.setInt(1, quantity);
	        prepstmt.setInt(2, session.getAttribute("logged"));
	        prepstmt.setInt(3, fruit_id);
	        prepstmt.executeUpdate();  
	        prepstmt.close();
	    }
	    conn.close();
	    response.sendRedirect(request.getRequestURI());  // refresh page
	}
	
	// delete product from cart
	if (request.getParameter("actn") == "del") {
	    var fruit_id = request.getParameter("fruit_id");
	
	    var qry = "DELETE FROM shopping_cart WHERE customer_id = ? AND fruit_id = ?;";
	    var prepstmt = conn.prepareStatement(qry);
	    prepstmt.setInt(1, session.getAttribute("logged"));
	    prepstmt.setInt(2, fruit_id);
	    prepstmt.executeUpdate();  
	    prepstmt.close();
	    conn.close();
	
	    response.sendRedirect(request.getRequestURI());  // refresh page
	}
	conn.close();
}



function getBackgroundColor(i) {
	if ((i % 2) == 0) {
		var backgroundColor = '#F9F9F9';
	} else { 
		var backgroundColor ='#F1F1F1';
	}
	return backgroundColor;
}



//// CONNECT TO DATABASE ////
	
function createConnectionToDatabase() {	
	// Import the Connection class from the java.sql package
	var DriverManager = Java.type('java.sql.DriverManager');

	// Create a connection to the SQLite database
	conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");
}


//// HTML TEMPLATES ////

function templateProductContainer(name, img, weight, price, 
quantity, itemID, bgColor) {
  out.println('<div class="cart-product-ctn" style="background-color:' + bgColor +  '">' +
			   '<h2>' + name + '</h2>' +
			   '<div style="display:flex; gap:40px;">' +
			   '<img src="' + img + '"/>' +
					'<div>' +
						'<div>' +
							'<p>Weight: ' + weight + ' Kg</p>' +
							'<p>Price per item: ' + price + ' Euro</p>' +
							'<p>Quantity ordered: ' + quantity + '</p>' +
							'<p>Subtotal: ' + price * quantity + ' Euro</p>' +
						'</div>' +
						'<form method="post">' +
							'<input type="hidden" name="fruit_id" value="' + itemID + '">' +
							'<input type="hidden" name="quantity" value="' + quantity + '">' +
							'<input type="submit" style="cursor: pointer;" name="actn" value="+">' +
				            '<input type="submit" style="cursor: pointer;" name="actn" value="-">' +
							'<input type="submit" style="cursor: pointer;" name="actn" value="del">' +
						'</form>' +
					'</div>' +	
				'</div>' +	
				'</div>');
}

function templateSumContainer(totalPrice) {
	out.println('<div class="sum-container">' +
					'<h4>Your total is: ' + totalPrice + ' Euro</h4>' +
					'<form action="checkout.jsp" method="POST">' +
					'<input type="submit" style="cursor: pointer;" value="Checkout" class="button">' +
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