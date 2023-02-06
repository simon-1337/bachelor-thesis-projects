<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="./WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>


<s:script type="javascript">
var username;
var allCookies = request.getCookies();

if (allCookies != null) {
	for (var i = 0; i < allCookies.length; i++) {
		var c = allCookies[i];
		if (c.getName() == 'username') {
			username = c.getValue();			
		}
	}
} 

if (username == null) {
	out.println('<p>Hello what is your name?</p>');
	out.println('<form>' +
					'<label for="username">Username:</label>' +
					'<input type="text" name="username" required>' + 
					'<input type="submit" value="Ok">' +
				'</form>');
} else {
	out.println('<p>Welcome back, ' + username + '!</p>')
	out.println('<form>' +
 					'<input type="hidden" name="logoutButton" value="1">' +
					'<input type="submit" value="Logout">' +
				'</form>');
}
</s:script>


<s:script type="javascript" src="code/logout.js" cacheSrc="false" />

</body>
</html>