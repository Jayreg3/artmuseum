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
	if (window.location.hash) {
		let galleryid = window.location.hash.slice(1);
		console.log(galleryid);
		var url2 = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${galleryid}&page=1`;
		//use galleryid, not gallerynumber; they're not the same; learned that the hard way
		fetch(url2)
			.then(response2 => response2.json())
			.then (data2 => {
				console.log(data2);
				data2.records.forEach(exhibit => {
					var row = document.querySelector('#object-table').insertRow();
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					var cell3 = row.insertCell(2);
					var cell4 = row.insertCell(3);
					cell1.innerHTML = `${exhibit.title}`;
					/*cell2.innerHTML = `${exhibit.groupid}`;
					cell3.innerHTML = `${data.name}`;
					cell4.innerHTML = "success";*/
				});
			});
		showObjectsTable();
	}
});

function showObjectsTable() {
	document.querySelector("#all-objects").style.display = "block";
	document.querySelector("#all-galleries").style.display = "none";
}