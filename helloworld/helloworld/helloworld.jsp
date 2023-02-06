<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF8" %>
<%@ taglib uri="./WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hello, World</title>
</head>
<body>
<s:script type="javascript"> 
	var greeting = "Hello, world! (Sent from Nashorn)";
	print("<div>" + greeting + "</div>")
</s:script>

</body>
</html>