<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Fruitshop</title>
<link rel="stylesheet" href="css/style.css">
</head>
<header>

<h1>Productlist</h1>

<a href="index.jsp" class="link-btn" style="float: left">Back to Main Page</a>

</header>
<body>
<s:script type="javascript">
// Import the DriverManager class from the java.sql package
var DriverManager = Java.type('java.sql.DriverManager');

// Create a connection to the SQLite database
var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

// Execute a SELECT query to retrieve all data from table fruit
var stmt = conn.createStatement();
var rs = stmt.executeQuery('SELECT * FROM fruit;');

out.println('<ul>');
while (rs.next()) { //iterate through all rows in the table
	out.println('<li>' + rs.getString('name') + ': ' + rs.getString('price') + 
    '€</li>');
};
out.println('</ul>')
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