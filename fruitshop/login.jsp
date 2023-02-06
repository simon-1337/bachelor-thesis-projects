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

<h1>Login to your account!</h1>


<a href="index.jsp" class="link-btn">Back to Main Page</a>

<a href="signup.jsp" class="link-btn">Sign Up</a>


</header>
<body>

<div class="credentials-div">
	<s:script type="javascript" src="code/login.js" cacheSrc="false" throwException="true" />

	<span class="login-form-headline">Enter your credentials:</span>
	<form method="post" style="margin-top: 12px">
		<label for="username">E-mail:</label><br>
		<input type="email" name="username" required><br>
		<label for="pwd">Password:</label><br>
		<input type="password" name="pwd" required><br>
		<input type="submit" style="cursor: pointer;" value="Submit">
	</form>
</div>

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