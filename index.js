const API_KEY = "c2f10da0-b77e-11e8-a4d1-69890776a30b";

document.addEventListener("DOMContentLoaded", () => {
	const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
	//make sure to use a backtick when entering template strings like the one above. `` instead of '' or ""
	showGalleries(url);
});

function showGalleries(url) {
fetch(url)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		data.records.forEach(gallery => {
			document.querySelector('#galleries').innerHTML += `<li><a href="#${gallery.id}">Gallery #${gallery.gallerynumber}: ${gallery.name} - (Floor ${gallery.floor})</a></li>`;
		//console.log(gallery);
		});
		if(data.info.next) {
			showGalleries(data.info.next);
		}
	})
}

window.addEventListener('hashchange', () => {
	if (window.location.hash) /*{
		function showObjects() {*/
			{showObjectsTable();
		}
	}
);

function showObjectsTable() {
	document.querySelector("#all-objects").style.display = "block";
	document.querySelector("#all-galleries").style.display = "none";
}