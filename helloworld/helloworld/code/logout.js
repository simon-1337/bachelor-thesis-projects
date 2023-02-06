if (request.getParameter('username') != null) {
	var uname = request.getParameter('username');
	var Cookie = Java.type('jakarta.servlet.http.Cookie');
	var newCookie = new Cookie('username', uname);
	newCookie.setMaxAge(60 * 60 * 24);
	newCookie.setPath('/');
	response.addCookie(newCookie);
	response.sendRedirect(request.getRequestURI());
}

if (request.getParameter('logoutButton') != null) {
	var Cookie = Java.type('jakarta.servlet.http.Cookie');
	var removerCookie = new Cookie('username', '');
	removerCookie.setPath('/');
	removerCookie.setMaxAge(0);
	response.addCookie(removerCookie);
	response.sendRedirect(request.getRequestURI()); 
}