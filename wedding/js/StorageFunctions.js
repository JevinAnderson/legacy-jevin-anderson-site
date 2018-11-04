function saveObject(key, object) {
	localStorage.setItem(key, JSON.stringify(object));
}

function getObject(key) {
	return JSON.parse(localStorage.getItem(key));
}