<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link rel="stylesheet" href="../css/style.css">
<title>fruitshop_admin</title> 
</head>
<header>

<h1>Create a Newsletter</h1>

<a href="/fruitshop/admin" class="link-btn">Admin Starting Page</a>

</header>
<body>

<s:script type="javascript">
var DriverManager = Java.type('java.sql.DriverManager');

// Create a connection to the SQLite database
var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

var stmt = conn.createStatement();
var qry = "SELECT * FROM customer WHERE receives_mail = '1';";
var rs = stmt.executeQuery(qry); // check how many people are subscribed

var count = 0;
while (rs.next()) {
    count++;
}
rs.close();
stmt.close();

stmt = conn.createStatement();
qry = "SELECT name FROM fruit;";
rs = stmt.executeQuery(qry); // get the names of all available products

out.println('<div class="newsletter-ctn">')
out.println('<form action="mailer" method="post">');
while (rs.next()) {
    out.println('<br>');
    out.println('<li><label for="choice">' + rs.getString("name") + '</label>');
    out.println('<input type="checkbox" name="choice" value="' + rs.getString("name") + '"></li>');
}
rs.close();
stmt.close();
conn.close();
out.println('<input type="submit" style="margin-top: 20px;" value="Send Newsletter to ' + count + ' Receivers">');
out.println('</form>');
out.println('</div>');  
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