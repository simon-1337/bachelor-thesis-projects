<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="./WEB-INF/script-jsr223.tld" prefix="s" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hello, world</title>
</head>
<body>
<header>
<s:script type="javascript">
var greeting = "Hello, world! (Sent from Nashorn)";
print('<h1>' + greeting + '</h1>');
</s:script>
</header>
<body>
<p>The time right now: <s:expr type="javascript">Date()</s:expr></p>


</body>
</html>