//Helps run the Python code

var NodeHelper = require("node_helper");
const {PythonShell} = require("python-shell");

module.exports = NodeHelper.create({
    start:function(){
            console.log("Starting module: " + this.name);
    },

    //sendSocketNotification processes request
    socketNotificationReceived: function(notification, payload) {
    		if (notification === 'GET HELLO') {
    			console.log('Initial hello request received.');
    			this.getHello();
    		};
    	},


    // Returns identity of user via webcam
    getHello: function() {
        const self = this;
        const fileName = 'hello.py';  //The file that we want to run
        console.log('Running ' + fileName);   // Log event
                
        
        //Create new PythonShell, use that to run the file
        let pyShell = new PythonShell(fileName, {scriptPath: 'modules/test-module/python'});
        console.log('Creating new pyShell');
        
        //start input stream
        pyShell.on('message', function (message) {
                if (typeof(message) === 'string') {
                    self.sendSocketNotification('HELLO', message);
                    console.log('got hello');
                }
                else {
                console.log('Didnt get hello');
                }
        });

        //end input stream, allow process to exit
        pyShell.end(function (err) {
                if (err) throw err;
                self.sendSocketNotification('UPDATE', 'finished');
                console.log('Finished getting hello');
        });
    },
});
