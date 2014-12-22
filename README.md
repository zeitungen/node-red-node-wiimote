node-red-node-wiimote
=====================

This a wiimote listener node for [node-red](http://nodered.org/). 

[node-red](http://nodered.org/) is *a visual tool for wiring the Internet of Things* powered by [nodejs](http://nodejs.org/).

**It work only on linux plateform.**

This node use node-wii an asynchronous javascript binding fot the libcwiid, a wii C library for linux plateform.  

Instalation
-----------

Install the bluetooth stack :

	$ sudo apt-get install bluez

Install C library for compiling the nodejs module node-wii :

	$ sudo apt-get install libbluetooth-dev libcwiid-dev

You must have a node-gyp on your nodejs installation :
	
	$ sudo npm install node-gyp -g

Copy `61-wiimote.js` and `61-wiimote.html` into your Node-RED `nodes` directory

Add node-wii module to your Node-RED installation

	$ cd /path/to/your/nodered
	$ $ npm install git+https://github.com/zeitungen/node-wii.git

You can restart your Node-RED and have fun.