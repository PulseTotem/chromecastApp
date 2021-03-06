window.onload = function() {

	cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();


	var customMessageBus =  window.castReceiverManager.getCastMessageBus("urn:x-cast:fr.the6thscreen.chromecastapp");
	customMessageBus.onMessage = function(event) {
		console.log(event);
   	    var ifram = document.getElementById("webApp");
		ifram.src = event.data;
	}

	var myhandler = function(msg, url, line) {
		console.log(msg);
		var ifram = document.getElementById("webApp");
		ifram.innerHTML = "<h1>Oops ! You are not allowed to display the following address in a frame: "+event.data+"<br /> :(</h1>";
	};

	var addErrorHandler = function (win, handler) {
		win.onerror = handler;
		for (var i = 0; i < win.frames.length; i++) {
			addErrorHandler(win.frames[i], handler);
		}
	};

	addErrorHandler(window, myhandler);

	/**
	 * Application config
	 **/
	var appConfig = new cast.receiver.CastReceiverManager.Config();

	/**
	 * Text that represents the application status. It should meet
	 * internationalization rules as may be displayed by the sender application.
	 * @type {string|undefined}
	 **/
	appConfig.statusText = 'Ready to play';

	/**
	 * Maximum time in seconds before closing an idle
	 * sender connection. Setting this value enables a heartbeat message to keep
	 * the connection alive. Used to detect unresponsive senders faster than
	 * typical TCP timeouts. The minimum value is 5 seconds, there is no upper
	 * bound enforced but practically it's minutes before platform TCP timeouts
	 * come into play. Default value is 10 seconds.
	 * @type {number|undefined}
	 **/
// 100 minutes for testing, use default 10sec in prod by not setting this value
	appConfig.maxInactivity = 6000;
	/**
	 * Initializes the system manager. The application should call this method when
	 * it is ready to start receiving messages, typically after registering
	 * to listen for the events it is interested on.
	 */
	window.castReceiverManager.start(appConfig);

}