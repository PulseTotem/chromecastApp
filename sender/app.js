initializeCastApi = function() {

	var applicationID = '11AB7AE5';
	var sessionRequest = new chrome.cast.SessionRequest(applicationID);
	var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
		sessionListener,
		receiverListener);
	chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

if (!chrome.cast || !chrome.cast.isAvailable) {
	setTimeout(initializeCastApi, 1000);
}

function launchApplication() {

	var webadress = document.getElementById('webadress').value;

	chrome.cast.requestSession(
		// Success
		function(session){
			session.sendMessage("urn:x-cast:fr.the6thscreen.chromecastapp",webadress,successCallBack, errorCallback);
		},
		// Error
		function(castError){
			console.log('session_established');
			console.log("ERROR: " + JSON.stringify(castError));
		});
}

/**
 * initialization success callback
 */
function onInitSuccess() {
	appendMessage("init success");
}

/**
 * initialization error callback
 */
function onError() {
	console.log("error");
}

/**
 * generic success callback
 */
function onSuccess(message) {
	console.log(message);
}

/**
 * receiver listener during initialization
 */
function receiverListener(e) {
	if( e === 'available' ) {
		console.log("receiver found");
	}
	else {
		console.log("receiver list empty");
	}
};

/**
 * session listener during initialization
 */
function sessionListener(e) {
	console.log('New session ID: ' + e.sessionId);
	session = e;
	var webadress = document.getElementById('webadress').value;
	session.sendMessage("urn:x-cast:fr.the6thscreen.chromecastapp",webadress,successCallBack, errorCallback);
};

function successCallBack() {
	console.log('event success ! ');
};

function errorCallback(error) {
	console.log('event error !');
	console.log(error);
}

/**
 * session update listener
 */
function sessionUpdateListener(isAlive) {
	var message = isAlive ? 'Session Updated' : 'Session Removed';
	message += ': ' + session.sessionId;
	console.log(message);
	if (!isAlive) {
		console.log("Not alive anymore");
	}
};
