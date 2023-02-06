<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/script-jsr223.tld" prefix="s" %>

<s:script type="javascript">
var choices = request.getParameterValues("choice");

// make sure at least one product is selected
if (choices !== null) {
    var DriverManager = Java.type('java.sql.DriverManager');

	// Create a connection to the SQLite database
	var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

    var choice = '';
    for (var i = 0; i < choices.length; i++) {
        // append all product names to a string
        choice += "'" + choices[i] + "',";
    }
	// remove the string's last comma
    choice = choice.substring(0, choice.length - 1);   

	var stmt1 = conn.createStatement();
    var qry1 = "SELECT * FROM customer WHERE receives_mail = 1;";
    // select all customers who wish to receive the newsletter
	var customers = stmt1.executeQuery(qry1); 
	var emailCount = 0;

    while (customers.next()) {
    	var props = new (Java.type("java.util.Properties"))();
		var session = Java.type("jakarta.mail.Session").getInstance(props);
		var msg = new (Java.type("jakarta.mail.internet.MimeMessage"))(session);
		
		var sender = new (Java.type("jakarta.mail.internet.InternetAddress"))("newsletter@treeshop.com");
		msg.setFrom(sender);

		var receiverAddress = customers.getString("username");
		var receiver = new (Java.type("jakarta.mail.internet.InternetAddress"))(receiverAddress);
		var type = Java.type("jakarta.mail.Message$RecipientType").TO;
		msg.addRecipient(type, receiver);

		
		msg.setSubject("Here Are the Latest Products from treeshop!");
		
		var stmt2 = conn.createStatement();
		var qry2 = "SELECT * FROM fruit WHERE name IN (" + choice + ")";
		var products = stmt2.executeQuery(qry2);
		
		var i = 0;
		var productHTML = [];		

		while (products.next()) {
    		var line1 = '<div style="float: left; margin-right: 10px;">';
    		var line2 = '<h2>' + products.getString("name") + '</h2>';
    		var line3 = '<img src="http://localhost:8080' + products.getString("picture") + '" height="120" width="150" />';
    		var line4 = '<p>Price: ' + products.getString("price") + ' Euro</p>';
    		var line5 = '<p>Weight: ' + products.getString("weight") + ' KG</p>';
    		var line6 = '</div>';

    		productHTML.push(line1 + line2 + line3 + line4 + line5 + line6);
    		i++;
		}
		products.close();
		stmt2.close();

		var text = '<html><head><meta charset="UTF-8" /></head><header>';
		text += '<h1><a href="http://localhost:8080/fruitshop">Vist fruitshop</a></h1>';
		text += '<h4><a href="http://localhost:8080/fruitshop/admin/unsubscribe.jsp?unsub=' + receiverAddress + '">Click Here to Unsubscribe</a></h4>';

		for (var count = 0; count < i; count++) { 
			//i is one more then the index in the array
    		text += productHTML[count];
		}

		text += '</body></html>';

		msg.setContent(text, "text/html");

		var transport = session.getTransport("smtp");
		transport.connect("localhost", 1025, "username", "pw");
		transport.sendMessage(msg, msg.getRecipients(type));

		emailCount++;
	}
	customers.close();
	stmt1.close();

	out.println(openHTML());
	out.println('<p class="success">Sending emails has been successfull!</p>');
	out.println(closeHTML());
} else {
	out.println(openHTML());
	out.println('<p class="warning">At least one product needs to be chosen!</p>');
	out.println(closeHTML());
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
		       '<h1>Sending a Newsletter</h1>' +

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