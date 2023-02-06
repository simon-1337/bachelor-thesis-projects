<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="css/style.css">
<title>Fruitshop</title>
</head>
<header>

<h1>Status of your order</h1>


<a href="index.jsp" class="link-btn">Back to Main Page</a>



</header>
<body>

<s:script type="nashorn">

var session = request.getSession();

// Import the Connection class from the java.sql package
var DriverManager = Java.type('java.sql.DriverManager');
	
// Create a connection to the SQLite database
conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

out.println('<div style="padding: 20px">')
if (session.getAttribute('logged') == null) {
	out.println('<p class="warning">Please login first!</p>')
	out.println('<a href="login.jsp" class="link-btn">Login</a>');
} else {
	var qry = "DELETE FROM shopping_cart WHERE customer_id = ?;"
	var prepstmt = conn.prepareStatement(qry);
	prepstmt.setInt(1,session.getAttribute("logged"));
    prepstmt.executeUpdate();
    prepstmt.close();
    conn.close();

 	out.println('<h4 class="thank-you">Thank you for your order!</h4>');
	out.println('<p class="order-success">Your order has been placed successfully!</h4>');
}
out.println('</div>')

</s:script>

</body>
</html>

<%-- 
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
 --%>