username = request.getParameter("username");
pwd1 = request.getParameter("pwd1");
pwd2 = request.getParameter("pwd2");

if (pwd1 != pwd2) {
	out.println('<p class="warning">Your entered Passwords do not match, please try again!</p>');
}

if (username !== null && pwd1 !== null && pwd1 === pwd2) {
    insertIntoDB();
}

// code written in a function to be able to exit with return
function insertIntoDB() {
	// Import the Connection class from the java.sql package
	var DriverManager = Java.type('java.sql.DriverManager');

	// Create a connection to the SQLite database
	var conn = DriverManager.getConnection("jdbc:sqlite:C://sqlite/shop.db");

	var prepstmt = conn.prepareStatement("SELECT EXISTS (SELECT 1 FROM customer WHERE username = ?)"); //returns 1 if row exists 0 if not
	prepstmt.setString(1, username);
	var rs = prepstmt.executeQuery();  // check if user already exists
    while (rs.next()) {
        if (rs.getBoolean(1)) {
            out.print('<p class="warning">User already exists!</p>');
            out.println(templateLoginButton());
            rs.close();
            prepstmt.close();
            conn.close();
            return;  // stop the program
      }
    }
    rs.close();
    prepstmt.close();

	var bcrypt = Java.type("org.mindrot.jbcrypt.BCrypt");

	// Generate a new salt, cost of the later hashpw will be 12
	var salt = bcrypt.gensalt(12);

	// Hash the password with the salt
	var hashedPassword = bcrypt.hashpw(pwd1, salt);

    prepstmt = conn.prepareStatement("INSERT INTO customer (username, password) VALUES (?,?)");
    prepstmt.setString(1, username);
    prepstmt.setString(2, hashedPassword);
    prepstmt.executeUpdate();  // add new user to database
    prepstmt.close();

    if (request.getParameter("newsletter") == 1) {
        prepstmt = conn.prepareStatement("UPDATE customer SET receives_mail=1 WHERE username=?");
        prepstmt.setString(1, username);
        prepstmt.executeUpdate();  // sign the user up for e-mails
        prepstmt.close();
    }
    conn.close();

    out.println('<p class="success">Account successfully created!</p>');
    out.println(templateLoginButton());
}


//signup button
function templateLoginButton() {
	return '<a href="login.jsp" class="link-btn">Login</a>'
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