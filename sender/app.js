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

/**
 * receiver listener during initialization
 */
function receiverListener(e) {
	if( e === 'available' ) {
		console.log("receiver found");
		appendMessage("receiver found");
	}
	else {
		console.log("receiver list empty");
		appendMessage("receiver list empty");
	}
};

/**
 * session listener during initialization
 */
function sessionListener(e) {
	console.log('New session ID: ' + e.sessionId);
	appendMessage('New session ID:' + e.sessionId);
	session = e;
	session.sendMessage("urn:x-cast:fr.the6thscreen.chromecastapp","http://grid-vm3.unice.fr:8080/yourcast-glc-client/",successCallBack, errorCallback);
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
	appendMessage(message);
	if (!isAlive) {
		console.log("Not alive anymore");
	}
};