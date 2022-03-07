if ("serviceWorker" in navigator)
{
	navigator.serviceWorker.register("sw.js").then(registration => {
		//Notification
		if ('Notification' in window) {
			//console.log('Notification permission default status:', Notification.permission);
			//Notification.requestPermission(function (status) {
				//console.log('Notification permission status:', status);
			//});
		}
		//subscribeUser(reg);
	}).catch(error => {
		//console.log("SW Registration Failed!");
		//console.log(error);
	})
}

const applicationServerPublicKey = `BCx1Zn4h18mwftwU0_yveg2sAJxbUeSgmJB8NIgk4e-RcrnGhRlFW1gIhicscwiqZuJEmJ95NvTSXvE34fsVUxs`;
function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
function subscribeUser(swRegistration) {
	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	swRegistration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: applicationServerKey
	})
		.then(subscription => {
			//console.log('User is subscribed');
			console.log(JSON.stringify(subscription));
		})
		.catch(err => {
			console.log('Failed to subscribe the user: ', err);
		});
}