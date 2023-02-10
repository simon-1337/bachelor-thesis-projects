
###### PREREQUISITES TO USE THE FRUITSHOP AND HELLOWORLD PROJECTS ######


Necessary Software:

1.	Apache Tomcat server -> https://tomcat.apache.org/
2.	Eclipse IDE -> https://www.eclipse.org/downloads/
3.	OpenJDK -> https://jdk.java.net/
4.	script-jsr223.tld -> https://sourceforge.net/projects/bsf4oorexx/files/Sandbox/rgf/taglibs/ga/ 
	(already in the war-archive)
5.	jakarta.ScriptTagsLibs.jar -> https://sourceforge.net/projects/bsf4oorexx/files/Sandbox/rgf/taglibs/ga/
6.	nashorn-core-15.4.jar -> https://search.maven.org/artifact/org.openjdk.nashorn/nashorn-core/15.4/jar
7.	asm-7.3.1.jar, asm-commons-7.3.1.jar, 
	asm-tree-7.3.1.jar and asm-util-7.3.1.jar -> https://repository.ow2.org/nexus/#welcome 
8.	SQLite -> https://www.sqlite.org/
9.	SQLite JDBC Driver -> https://mvnrepository.com/artifact/org.xerial/sqlite-jdbc
10.	Bcrypt -> https://mvnrepository.com/artifact/org.mindrot/jbcrypt/0.4
11.	MailHog -> https://github.com/mailhog/MailHog
12.	Jakarta Mail & Jakarta Activation -> https://jar-download.com/artifacts/com.sun.mail/jakarta.mail/2.0.1/source-code



Installation & Setup Steps

 
Apache Tomcat & Eclipse IDE:

1.	Download the latest version of Apache Tomcat and Eclipse IDE from their respective websites.
2.	Extract the Tomcat files from the downloaded zip archive to a directory of your choice.
3.	Install and open the Eclipse IDE.
4.	Create a new server by clicking the "servers" tab in the Eclipse IDE and selecting the server type.
5.	Choose the directory of the Apache Tomcat installation and select the OpenJDK JRE.
6.	The Tomcat server will be visible as [Stopped, Republish] under the Servers tab.
7.	Double-click on the Tomcat server to see the server settings and note the default HTTP port (8080).
8.	Right-click on the server and select Start to test if the server is working.
9.	If there is an error 404, go back to the Eclipse IDE, double-click on the Tomcat server, 
	and select the "Use Tomcat installation" option in the Server Locations section.
10.	Save the changes and restart the server by right-clicking on it and selecting Restart.
11.	The server can be accessed via the URL: http://localhost:8080/ in any browser.


Configuring Manager Application Access:

To access the JSPs, a username and password must be configured in the manager application of a Tomcat web server. 
By default the access to the manager application is restricted for security purposes. 
The developer can create a new username and password or assign a manager-xxx role to an existing one, 
by editing the tomcat-users.xml file in the conf directory of the Tomcat installation.
IMPORTANT: As Eclipse is used the tomcat-users.xml file in the eclipse-workbench must be configured 
and not the one in the Apache Tomcat installation. 
Below is the necessary configuration to login to the manager application with the username and password “test”.

<role rolename="manager-gui"/>
<role rolename="admin-gui"/>
<user username="test" password="test" roles="manager-gui,admin-gui"/>


OpenJDK

Steps to install OpenJDK:
1.	Go to the website https://jdk.java.net/ and click on the "OpenJDK Early Access Builds" button.
2.	Select the latest JDK version found in the "Ready for use" section.
3.	Download the ZIP archive file with the description Windows/x64.
4.	Extract the ZIP file to C:\jdk-19.

Steps to set up the environment variables:
1.	Open the system properties by searching for "env" in the Windows taskbar 
	and clicking on "Edit system environment variables".
2.	Go to the environment variables and create a new system variable called JAVA_HOME with the value C:\jdk-19.
3.	Search for the Path environment variable and edit it.
4.	Click on the new button and enter %JAVA_HOME%\bin. Move the new path to the top.
5.	If there is no Path environment variable, create one with the name Path and value %JAVA_HOME%\bin.


script-jsr223.tld and jakarta.ScriptTagsLibs.jar

Download the jakarta.ScriptTagLibs.jar as well as the script-jsr223.tld from 
the URL https://sourceforge.net/projects/bsf4oorexx/files/Sandbox/rgf/taglibs/ga/. 
This enables the usage of Nashorn. 
The jakarta.ScriptTagsLibs.jar needs to be added to the lib directory inside the Apache Tomcat folder 
The script-jst223.tld needs to be added to the WEB-INF Folder of the Project.
IMPORTANT: The steps regarding script-jsr223.tld are already done if the developed projects are used.


Nashorn

The jar file needs to be downloaded from the URL: https://search.maven.org/artifact/org.openjdk.nashorn/nashorn-core/15.4/jar.
Afterwards the jar file needs to be added to the lib directory of the Tomcat server.


ASM

Nashorn depends on the four ASM jar files: 
	
	- asm-7.3.1.jar 
	- asm-commons-7.3.1.jar 
	- asm-tree-7.3.1.jar 
	- asm-util-7.3.1.jar
 
They need to be dowloaded from the OW2 Maven repository (https://repository.ow2.org/nexus/#welcome) 
and added to the lib directory in Apache Tomcat.


SQLite

1.	Download the command-line shell program for SQLite on Windows from 
	the Precompiled Binaries section of the SQLite Download Page.
2.	Extract the contents of the downloaded zip file to a folder named "sqlite".
3.	The extracted contents should include the command-line shell program, 
	the sqldiff.exe program, and the sqlite3_analyzer.exe program.

Now SQLite can be used via the console. To start it the user needs to be inside the sqlite folder and type 'sqlite'.

ATTENTION: In the case that the path of the folder is different from 'C:\sqlite',
the URL in the context.xml needs to be changed to point to the correct location.


SQLite JDBC Driver

The .jar file of the SQLite JDBC Driver can be downloaded from https://mvnrepository.com/artifact/org.xerial/sqlite-jdbc. 
After the download, the file needs to be added to the lib directory of the Tomcat server.


Bcrypt

Download the jbcrypt library by Damien Miller from https://mvnrepository.com/artifact/org.mindrot/jbcrypt/0.4. 
Then copy it into the lib directory of the Apache Tomcat server.


Jakarta Mail & Jakarta Activation

Both jar files can be downloaded together in a zip formatted folder under the following link: 
https://jar-download.com/artifacts/com.sun.mail/jakarta.mail/2.0.1/source-code. 
After the download is complete the jar files need to be extracted and added to the lib folder.


MailHog

1.	Download the latest release for the appropriate operating system.
2.	Start the program using the .exe file.
3.	The MailHog HTTP server starts on port 8025.
4.	Access the server in the browser by using the URL "localhost:8025".

Now the sent emails can be analyzed in the browser






