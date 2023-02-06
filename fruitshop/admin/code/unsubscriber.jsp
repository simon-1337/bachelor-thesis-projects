<%@ page session="false" pageEncoding="UTF-8" 
contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/script-jsr223.tld" prefix="s" %>

<s:script type="javascript">
var DriverManager = Java.type('java.sql.DriverManager');

// Create a connection to the SQLite database
var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

email = request.getParameter("unsub");
prepstmt = conn.prepareStatement("UPDATE customer SET receives_mail=0 WHERE username=?");
prepstmt.setString(1,email);
prepstmt.executeUpdate();
prepstmt.close();
conn.close();

out.println(openHTML());
out.println('<p class="margin-left">' + email + ' has been successfully unsubscribed!</p>');
out.println(closeHTML());

//// HTML TEMPLATES ////

function openHTML() {
	return '<!DOCTYPE html>' +
		   '<html>' +
	       '<head>' +
	       '<meta charset="UTF-8" />' +
	       '<link rel="stylesheet" href="../css/style.css">' +
	       '<title>fruitshop_admin</title>' +
	       '<header>' +
		       '<h1>Subscription Status:</h1>' +

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