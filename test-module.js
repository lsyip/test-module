/* Magic Mirror
* Module: face-rec-module
*
* By Lynn Yip, Alex Martinez, & Nicholas Balch
* For CIS11B, Montgomery County Community College
*/


//TODO: PLACEHOLDER: Module Template by roramirez: https://github.com/roramirez/MagicMirror-Module-Template
Module.register("test-module", {

	// anything here in defaults will be added to the config data
	// and replaced if the same thing is provided in config
	defaults: {
		greeting: "Not this one",
		
	},

	// socket notification received handler
	socketNotificationReceived: function(notification, payload) {
		if (notification === "HELLO") {
			console.log("Hello notification received");
			this.greeting = payload;
			console.log("New greeting written " + payload);
			this.updateDom();
			
			} 
		else {
			console.log("Hello notification not received");
			}
		},
		
	start: function(){
		console.log(this.name + " is starting!");
		this.sendSocketNotification("GET HELLO", "initial");

	},

	// only called if the module header was configured in module config in config.js
	getHeader: function() {
		return "Hello test-module";
	},
	

	// this is the major worker of the module, it provides the displayable content for this module
	getDom: function() {
		var wrapper = document.createElement("div");

		// if user supplied message text in its module config, use it
		if(this.config.hasOwnProperty("greeting")){
			// using text from module config block in config.js
			wrapper.innerHTML = this.greeting;
		}
		else{
		// use hard coded text
			wrapper.innerHTML = "no name found D:";
		}

		// pass the created content back to MM to add to DOM.
		return wrapper;
	},

})
