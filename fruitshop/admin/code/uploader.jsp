<%@ page session="false" contentType="text/html; charset=UTF-8" 
pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/script-jsr223.tld" prefix="s" %>

<s:script type="javascript">
var session = request.getSession();

var name = request.getParameter('name'); 
var weight = request.getParameter('weight');
var price = request.getParameter('price');

// Import the Connection class from the java.sql package
var DriverManager = Java.type('java.sql.DriverManager');

// Create a connection to the SQLite database
var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");


if (checkIfProductExists()) {
	var filename = name + ".jpg";
	var location = "/files/" + filename;
	request.getPart("file").write(filename);

	var prepstmt = conn.prepareStatement("INSERT INTO fruit (name, price, weight, picture) VALUES (?,?,?,?)");
	prepstmt.setString(1, name);
	prepstmt.setString(2, price);
	prepstmt.setString(3, weight);
	prepstmt.setString(4, location);
	prepstmt.executeUpdate();
	out.println(openHTML());
	out.println('<p class="success margin-left">Product has been created successfully!</p>');
	out.println(closeHTML());
	prepstmt.close();
	conn.close();
}

function checkIfProductExists() {
	var prepstmt = conn.prepareStatement("SELECT * FROM fruit WHERE name = ?");

	prepstmt.setString(1, name);
	var rs = prepstmt.executeQuery();

	while (rs.next()) {
		out.println(openHTML());
    	out.println('<p class="warning margin-left">Entry already exists! Please try again</p>');
    	out.println(closeHTML());
    	rs.close();
    	prepstmt.close();
    	conn.close();
		return false; // Product exists
	}
	rs.close();
	prepstmt.close();
	return true; //Product does not exist
}



//// HTML TEMPLATES ////

function openHTML() {
	return '<!DOCTYPE html>' +
		   '<html>' +
	       '<head>' +
	       '<meta charset="UTF-8" />' +
	       '<link rel="stylesheet" href="../css/style.css">' +
	       '<title>fruitshop_admin</title>' +
	       '<header>' +
		       '<h1>Status of Product Creation</h1>' +

		       '<a href="/fruitshop/admin" class="link-btn">Admin Starting Page</a>' +
		       '<a href="/fruitshop" class="link-btn">Main Page</a>' +

	       '</header>' +
	       '<body>'
}

function closeHTML() {
	return '</body>' +
		   '</html>'
}   
</s:script>



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
