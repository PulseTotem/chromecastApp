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
	appendMessage("error");
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


/**
 * append message to debug message window
 * @param {string} message A message string
 */
function appendMessage(message) {
	var dw = document.getElementById("debugmessage");
	dw.innerHTML += '\n' + JSON.stringify(message);
};
