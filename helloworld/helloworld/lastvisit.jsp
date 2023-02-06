<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="./WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>last visit</title>
</head>
<body>

<s:script type="javascript" throwException="true">
//reqeuest and response procedures
//first do the request and response because response won't work if something was already printed

//request
var lastVisit;
var allCookies = request.getCookies();

//response to add the current time
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
timeString = String(time);
var Cookie = Java.type("jakarta.servlet.http.Cookie");
var newCookie = new Cookie("lastVisit", timeString);
newCookie.setMaxAge(60 * 60 * 24);
newCookie.setPath("/");
response.addCookie(newCookie);



</s:script> 


<s:script type="javascript">
//Print the last visit or if it is the first visit

if (allCookies != null) {
	for (var i = 0; i < allCookies.length; i++) {
		var c = allCookies[i];	
		if (c.getName() == 'lastVisit') {
			lastVisit = c.getValue();		
		}
	}
} 

if (lastVisit == null) {
	print("This is your first Visit!");
} else {
	print("Your last visit was at " + lastVisit);
}



</s:script> 

</body>
</html>