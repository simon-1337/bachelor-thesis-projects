<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link rel="stylesheet" href="../css/style.css">
<title>Fruitshop</title> 
</head>
<header>

<h1>Unsubscribe from our Newsletter:</h1>

<a href="/fruitshop/admin" class="link-btn">Admin Starting Page</a>

</header>
<body>

<s:script type="javascript" throwException="true">

var email = request.getParameter("unsub");

out.println('<p class="margin-left warning">Are you sure you want to stop receiving e-mails at: ' + email + '</p>');

out.println('<form class="margin-left" action="unsubscriber" method="post">' +
  				'<input type="hidden" name ="unsub" value="' + email + '"><br>' +
  				'<input type="submit" value="Unsubscribe">' +
			'</form>');
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
