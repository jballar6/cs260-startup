This is my notes file
#Midterm review:

- **link element** specifies a relationship between the current document and an external resource. Most commonly used to link to stylesheets but also for linking to favicon icons among other things.
- **div tag** a generic container for flow content. It has no effect on the content or layout until styled in some way using CSS, such as direct styling of some kind of layout model like Flexbox.
- **title tag** is required, gives page a title. #title can search for a title id when used with JavaScript, .grid would search for a CSS class
- **padding** is the first layer out from an object, **margin** is the third, after the **border**.
- **arrow functions** are a compact alternative to a traditional function expression. They dont have their own bindings to this, arguments, or super, should not be used as method. Cannot be used as constructors. Cannot be created as generators, don't use yield. Sort of like a python lambda. Syntax is declaring parameter, then arrow to what to do with parameters.
- The **# selector** looks for ID's in elements.
- **JSON** is the Java Script Object Notation file, it works like a dictionary but is a standardized format for sending, receiving, and storing data.
- **web certificate** is necessary for HTTPS.
- pwd = print working directory, ls = list the directory contents, vim = VI improved, nano = another text editor, mkdir = make directory, mv = move, rm = remove, man = manual for Linux commands, cd = change directory, ssh = secure shell protocol for remote access and file transfer, ps = lets you see the processes running on your system, wget = used to retrieve content and files from various web servers, sudo means run as admin
- **ls -la** will list hidden files too
- **subdomain.(root(secondary.top)**
- **Port 443** is used for HTTPS, **80** is used for HTTP, and **22** is for SSH
- DNS points to an IP address, not another A.
- You can use Object.create() or just declare the context and set up the key - value pairs.


#Final review
- HTTP port = 80, HTTPS = 443, SSH = 22
- HTTP status codes: 300 = redirection, the client must take additional action to complete the request. 400 = client errors. The request contains bad syntax or cannot be fulfilled. 500 = server errors. The server failed to fulfill an apparently valid request.
- The Content-Type HTTP header field defines the media type of the body sent to the recipient or, in the case of responses, the media type of the resource in the message body1. It allows the client to interpret the content correctly.
- The attributes of a cookie serve the following purposes:
Domain: Specifies the domain for which the cookie is valid. An explicitly specified domain must always start with a dot.
Path: Indicates a URL path that must exist in the requested URL in order to send the Cookie header.
SameSite: Allows you to declare if your cookie should be restricted to a first-party or same-site context.
HTTPOnly: If set to true, JavaScript will not be able to access this cookie. This can help to reduce identity theft through XSS attacks.
- Passwords should be encrypted in databases, not stored as plaintext.
- The WebSocket protocol is used for creating a two-way communication channel over a single, long-lived connection that remains open between a client and a server. It’s commonly used in web applications to enable real-time, bidirectional communication between the client and the server. This can be useful for applications that require real-time data updates, such as live chat applications, real-time gaming, and real-time updates in web applications.
- JSX is a syntax extension for JavaScript. Curly braces are used to embed JavaScript expressions within the HTML-like syntax.
