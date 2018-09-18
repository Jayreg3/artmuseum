const API_KEY = "c2f10da0-b77e-11e8-a4d1-69890776a30b";
var url2;
var url;

document.addEventListener("DOMContentLoaded", () => {
	url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
	//make sure to use a backtick when entering template strings like the one above. `` instead of '' or ""
	document.querySelector('#all-galleries').innerHTML += `<a href="#O1979.389">Test Stuff</a>`;
	if (!window.location.hash) { 
		console.log("no hash");
		getGalleries(url);
	}
	else if (window.location.hash) { 
		if (window.location.hash[1] == 'E') {
			runGalleriesFunction();
		}
		else if (window.location.hash[1] == 'O') {
			runObjectsFunction();
		}
	}
});

window.addEventListener('hashchange', () => {
	if (window.location.hash[1] == 'E') {runGalleriesFunction();}
	else if (window.location.hash[1] == 'O') {runObjectsFunction();}
});

function runGalleriesFunction() {
	 {
			console.log(window.location.hash);
			let galleryid = window.location.hash.slice(2);
			console.log(galleryid);
			url2 = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${galleryid}&page=1`;
			console.log("Going to run objects");
			console.log(url2);
			getObjects(url2);
			displayObjectsTable();
		}
}

function runObjectsFunction() {
	console.log(window.location.hash);
			let objectnumber = window.location.hash.slice(2);
			console.log(objectnumber);
			url3 = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&objectnumber=${objectnumber}`;
			console.log("Going to run objects");
			console.log(url3);
			getSpecificObject(url3);
			displaySpecificObject();
}


function getGalleries(url) {
fetch(url)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		data.records.forEach(gallery => {
			document.querySelector('#galleries').innerHTML += `<li><a href="#E${gallery.id}">Gallery #${gallery.gallerynumber}: ${gallery.name} - (Floor ${gallery.floor})</a></li>`;
		});
		if(data.info.next) {
			getGalleries(data.info.next);
		}
	})
}

function getObjects(url2) {
	console.log("using "+url2);
			fetch(url2)
				.then(response2 => response2.json())
				.then (data2 => {
					console.log(data2);
					data2.records.forEach(exhibit => {console.log(exhibit.objectid);
						var row = document.querySelector('#object-table').insertRow();
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						var cell3 = row.insertCell(2);
						var cell4 = row.insertCell(3);
						cell1.innerHTML = `<a href="#O${exhibit.objectnumber}">${exhibit.title}</a>`;
						cell2.innerHTML = `<img src="${exhibit.primaryimageurl}" width="100px">`;
						//cell3.innerHTML = `${exhibit.people}`;
						exhibit.people.forEach(author => {
							cell3.innerHTML += `${author.name}, `;
						});
						cell3.innerHTML = cell3.innerHTML.replace(/,\s*$/, "");
						cell4.innerHTML = `<a href="${exhibit.url}" target="_blank">See More</a>`;
					});
					if(data2.info.next) {
						getObjects(data2.info.next);
					}	
				});
	}

function getSpecificObject(url3) {
	fetch(url3)
				.then(response3 => response3.json())
				.then (data3 => { console.log(data3); console.log(data3.records.technique);
					console.log(`worked with objectid - ${data3.records}`) 
					data3.records.forEach(exhibit => {
						console.log(exhibit.provenance);
						document.querySelector('#specific-object').style.display="block";				
						document.querySelector('#title').innerHTML=`${exhibit.title}</br>`;
						document.querySelector('#description').innerHTML=`${exhibit.description}</br>`;
						document.querySelector('#provenance').innerHTML=`${exhibit.provenance}</br>`;
						document.querySelector('#accessionyear').innerHTML=`${exhibit.accessionyear}</br>`;
					})
	});
}

function displayGalleries() {
	getGalleries(url);
	document.querySelector("#all-objects").style.display = "none";
	document.querySelector("#all-galleries").style.display = "block";
	document.querySelector("#specific-object").style.display = "none";
}

function displayObjectsTable() {
	objectTable = document.querySelector('#object-table');
	if (objectTable.rows.length) {
			for(var i = objectTable.rows.length - 1; i > 0; i--)
			{
				console.error("deleting row");
	    		objectTable.deleteRow(i);
			}
		}
	getObjects(url2);
	document.querySelector("#all-galleries").style.display = "none";
	document.querySelector("#specific-object").style.display = "none";
	document.querySelector("#all-objects").style.display = "block";
}

function displaySpecificObject() {
	document.querySelector("#all-objects").style.display = "none";
	document.querySelector("#all-galleries").style.display = "none";
	document.querySelector("#specific-object").style.display = "block";
}
