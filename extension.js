// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const download = require('download');
const path = require('path');
const jimp = require("jimp");

var i = 1;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

// Returns the HTML code for the search bar and the tutorial on
// How to use it
function getSearchBar(){
	// TODO
	let html = 
		`<!DOCTYPE html>
		<html lang="en">
		<head>
			<!-- Required Meta Tags : -->
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">

			<!-- Title : -->
			<!-- HTML Emoji instructions: https://medium.com/@hollybourneville/how-to-use-emojis-in-html-b3c671e21b92 -->
			<!-- HTML Emoji cheatsheet: https://www.w3schools.com/charsets/ref_emoji.asp -->
			<title>&#x1F4F8 Pictury</title>
			
			<!-- Bootstrap 4.6.0 CSS : -->
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
			
			<!-- Custom CSS Style : -->
			<style>
				/* ------- Typography */
				@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;500;700&display=swap");
				
				
				h1, h2, h3, h4, h5, h6 {
					letter-spacing: .2em !important;
				}

				.tagline {
					letter-spacing: .1em;
				}

				.intro {
					font-family: 'Inconsolata', monospace;
				}

				.hand {
					font-size: 20px;
				}
				
				/* -------- links */
				a:link, 
				a:visited, 
				a:hover, 
				a:active  {
					text-decoration: none;
				}

				a:link, 
				a:visited {
					color: #18A2B8;
				}
				
				a:hover,
				a:active {
					color: #000;
					background-color: #fff89e;
				}

				/* -------- Instructions accordion */
				.card {
					background-color: #f5f5f5;
					border: none;
					font-family: 'Inconsolata', monospace;
					font-weight: medium;
				}

				/* -------- Search form */
				#search-form {
					width: 40%;
				}

				input {
					font-family: 'Inconsolata', monospace;
					font-weight: bold;
				}

				.form-control {
					border: none !important;
				}

				/* -------- Photo grid and overlay effect */
				.image {
					display: inline-block;
					width: 300px;
					height: auto;
					object-fit: cover;
				}
				/* Overlay on hover */
				/* Installation credit: https://codepen.io/nxworld/pen/ZYNOBZ */
				/* Fix credit: https://dev.to/ellen_dev/two-ways-to-achieve-an-image-colour-overlay-with-css-eio */
				.figure {
					background: #18A2B8;
					overflow: hidden;
				}

				.figure img {
					opacity: 1;
					-webkit-transition: .3s ease-in-out;
					transition: .3s ease-in-out;
				}

				.figure:hover img {
					opacity: .5;
					cursor: pointer;
				}

				/* -------- Footer */
				.footer-credits {
					letter-spacing: .2em;
					text-align: center;
				}				
			</style>
		</head>
		<body>
			<div class="container mt-2 pt-4 pb-4">

				<!-- Pictury header : -->
				<div class="row">
					<div class="col">
						<h3 class="text-uppercase">&#x1F4F8 Pictury</h3>
						<p class="tagline">
							A VS-Code extension to search, 
							upload and edit stock-free images directly 
							into your workspace
						</p>
					</div>
				</div>

				<!-- Pictury intro : -->
				<div class="row">
					<div class="col">
						<p class="small intro">
							Don't leave your sandbox!
							<i>Pictury</i> will scrape free stock images from 
							<a href="https://unsplash.com/" target="_blank" alt="Go to Unsplash">Unsplash</a> 
							and display a selection of images, queried from your search output.
							With <i>Pictury</i> you can <strong>search</strong>, <strong>download</strong>, and <strong>edit</strong> stock-free images directly 
							from and into your workspace with a simple click. Our extension also gives you 
							the ability to easily grab artist and image information 
							so you can properly credit them on your projects.
							<i>Pictury</i> was built by 
							<a href="https://github.com/Ali-Doggaz" target="_blank" alt="Go to Ali's GitHub">@Ali-Doggaz</a>, 
							<a href="https://github.com/jackbisceglia" target="_blank" alt="Go to Jack's GitHub">@JackBisceglia</a> 
							and <a href="https://github.com/kescardoso" target="_blank" alt="Go to Kes's GitHub">@KesCardoso</a> -- we are 
							<a href="https://fellowship.mlh.io/programs/explorer" target="_blank" alt="Go to MLH Explorer Fellowshiup">MLH Fellow Explorers</a>, 
							members of the <a href="https://github.com/goofy-goofy" target="_blank" alt="Go to Goofy-Goofy Pod on Github">Goofy-Goofy Pod (Spring, 2021)</a>
							and we are happy to help and hear your suggestions and comments.
							Thank you for using <i>Pictury</i>, we hope you enjoy it!
						</p>
					</div>
				</div>

				<!-- Pictury Instructions : -->
				<div class="row">
					<div class="col">
						<!-- Button, toogles accordion : -->
						<button class="btn btn-info align-middle pt-2 pb-1" 
								type="button" 
								data-toggle="collapse" 
								data-target="#collapseExample" 
								aria-expanded="false" 
								aria-controls="collapseExample">
								<h6 class="text-uppercase align-middle">
									Instructions <span class="hand">&#128072;</span>
								</h6>
						</button>
						<!-- Accordion with ordered list : -->
						<div class="collapse" id="collapseExample">
							<div class="card card-body">
								<ol>
									<li>Use the search box below to find your images.</li>
									<li>Type in keywords and hit enter.</li>
									<li>From the display of search results, select an image.</li>
									<li>Double click an image to download it to your workspace.</li>
									<li>To edit an image, right-click to open the Pictury submenu</li>
									<li>To resise: click on 'resize' in the menu input box, and provide new dimensions in the following format: widthxheight (auto is supported)</li>
									<li>To rotate or to convert image to a different format: click on the corresponding function in the Pictury submenu</li>
									<li>To change the folder in which your pictures are saved: right-click on a folder, go to the Pictury submenu, and click on 'set as download path'</li>
								</ol>
								<p class="text-right">Enjoy! &#x1F604</p>
							</div>
						</div>
					</div>
				</div>
			
			</div>
			<!-- End container -->

			<div class="container pt-2 pb-2">

				<!-- Search Box : -->
				<!-- Style credit: https://bootstrapious.com/p/bootstrap-search-bar -->
				<!-- Installation credit: https://youtu.be/Jpt6tQBm0Bo -->
				<div class="row">
					<div class="col justify-content-center text-center">
						<h6 class="text-uppercase">Search Here:</h6>
						<form class="justify-content-center mx-auto" id="search-form" autocomplete="off">
							<div class ="form-group">
								<input type="text" 
								class ="form-control p-4 bg-light rounded rounded-pill shadow-sm mb-4" 
								id="search" 
								placeholder="Type query, hit enter, see the magic!" required>
							</div>
						</form>
					</div>
				</div>

			</div>
			<!-- End container -->
		</body>`
	return html;
}

//Returns the HTML code for each picture to be displayed in the webview
function getImageHTML(imageSource){
	let html =`
		<span class="figure">
			<img style="width:300px;height:300px;"  src="${imageSource}" 
				onclick="Copy_Picture_URL('${imageSource}')" 
				ondblclick="Download('${imageSource}')" 
				class="image" />
		</span>\n
	`;
	return html;
}
				

// Returns the HTML code for the initial webview (Welcome screen with just the searchbar, for now) 
function getInitialPage(){
	let html = ``

	html = html.concat(getSearchBar());

	html = html.concat(`
		<!-- Footer -->
	<footer class="justify-content-center text-center text-uppercase pt-2 pb-2 mb-2">
		<p class="footer-credits small">
			<strong>Pictury VSCode Extension</strong>
			<br>
			Powered by <a href="https://github.com/goofy-goofy" target="_blank" alt="Go to Goofy-Goofy Pod on Github">Goofy-Goofy</a>
		</p>
	</footer>
	<!-- jQuery + Popper.js and Bootstrap Js : -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>		
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script>
	var vscode=acquireVsCodeApi();
	document.getElementById('search').addEventListener("keypress",function(event){
		if(event.keyCode===13){
			i = 1;
			search = $(this).val()
			console.log(search)
			
			let url = "https://api.unsplash.com/search/photos?per_page=30&query=" + search + "&client_id=" + "lCw1Co0gKgCxSUnBjaXtxcuxFNJH9oAx8aD3QJF-aAc"
			let picture_urls = search + "<sp>"
			fetch(url)
			.then(function(response){
				return response.json()
			})
			.then(function(data){
				data = JSON.parse(JSON.stringify(data))
				for(let j=0;j<30;j++)
				{
				let elem = data.results[j].urls.small
				elem = elem.concat("<sp>")
				picture_urls = picture_urls.concat(elem)
				}
				return picture_urls;
			})
			.then(function (picture_urls) {
				vscode.postMessage({
				command: 'searchResult',	
				text: picture_urls
				});
			})
		}
	})
	</script>		
	</body>
	</html>
	`);

	return html;

}

// Returns the HTML code for the search query
function getSearchResult(pictures_urls, searchQuery, i) {
	let html = `
		<body>
		<script>
		var vscode=acquireVsCodeApi(); // initialize the VsCodeApi that is used to communicate between the extension and the webview
		function Copy_Picture_URL(txt) {
			const el = document.createElement('textarea');
			el.value = txt;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			vscode.postMessage({
			command: 'alert',
			text: 'URL Copied!'
			});
		}
		function Download(pictureSource) {
			vscode.postMessage({
			command: 'download',	
			text: pictureSource
			});
		}
		</script>
		`;
		html = html.concat(getSearchBar());
		html = html.concat(`
			<div class="container justify-content-center text-center pt-2 pb-4" id="images-container">
				<h6 class="text-uppercase pb-1">Search Results:</h6>
		`);
		let picture_div;
		for(let s=0;s<30;s++){
			picture_div = getImageHTML(pictures_urls[s]);
			html = html.concat(picture_div);
		}
			if(i>1) html = html.concat('<button class="btn btn-dark" type="button" onClick=getPreviousPage()> ⇠ Previous Page </button>')
			html = html.concat(`
				<button class="btn btn-dark" type="button" onClick=getNextPage() > Next Page ⇢ </button>
				</div>
				<!-- Footer -->
				<footer class="justify-content-center text-center text-uppercase pt-2 pb-2 mb-2">
					<p class="footer-credits small">
						<strong>Pictury VSCode Extension</strong>
						<br>
						Powered by <a href="https://github.com/goofy-goofy" target="_blank" alt="Go to Goofy-Goofy Pod on Github">Goofy-Goofy</a>
					</p>
				</footer>

				<!-- jQuery + Popper.js and Bootstrap Js : -->
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>		
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>

				<!-- Search Form with jQuery Script : -->
				<script>
				var search = '${searchQuery}';
				var i = ${i} ;
				document.getElementById('search').addEventListener("keypress",function(event){

					if(event.keyCode===13){
						i = 1;
						search = $(this).val()
						console.log(search)
						
						let url = "https://api.unsplash.com/search/photos?per_page=30&query=" + search + "&client_id=" + "lCw1Co0gKgCxSUnBjaXtxcuxFNJH9oAx8aD3QJF-aAc"
						let picture_urls = search + "<sp>"

						fetch(url)
						.then(function(response){
							return response.json()
						})
						.then(function(data){
							data = JSON.parse(JSON.stringify(data))
							for(let j=0;j<30;j++)
							{
							let elem = data.results[j].urls.small
							elem = elem.concat("<sp>")
							picture_urls = picture_urls.concat(elem)
							}
							return picture_urls;
						})
						.then(function (picture_urls) {
							console.log(picture_urls)
							vscode.postMessage({
							command: 'searchResult',	
							text: picture_urls
							});
						})
					}
				
					
				})				

				function getNextPage(){
					$("html, body").animate({scrollTop:0}, 400);
					let url = "https://api.unsplash.com/search/photos?page="+${i+1}+"&per_page=30&query=" + search + "&client_id=" + "lCw1Co0gKgCxSUnBjaXtxcuxFNJH9oAx8aD3QJF-aAc"
					let picture_urls = search + "<sp>"

					fetch(url)
					.then(function(response){
						return response.json()
					})
					.then(function(data){
						data = JSON.parse(JSON.stringify(data))
						for(let j=0;j<30;j++)
						{
						let elem = data.results[j].urls.small
						elem = elem.concat("<sp>")
						picture_urls = picture_urls.concat(elem)
						}
						return picture_urls;
					})
					.then(function (picture_urls) {
						console.log(picture_urls)
						vscode.postMessage({
						command: 'nextPage',	
						text: picture_urls
						});
					})
				}
				function getPreviousPage(){
					let url = "https://api.unsplash.com/search/photos?page="+${i-1}+"&per_page=30&query=" + search + "&client_id=" + "lCw1Co0gKgCxSUnBjaXtxcuxFNJH9oAx8aD3QJF-aAc"
					let picture_urls = search + "<sp>"

					fetch(url)
					.then(function(response){
						return response.json()
					})
					.then(function(data){
						data = JSON.parse(JSON.stringify(data))
						for(let j=0;j<30;j++)
						{
						let elem = data.results[j].urls.small
						elem = elem.concat("<sp>")
						picture_urls = picture_urls.concat(elem)
						}
						return picture_urls;
					})
					.then(function (picture_urls) {
						console.log(picture_urls)
						vscode.postMessage({
							command: 'previousPage',	
							text: picture_urls
						});
					})
					
				}
				</script>

				</body>
				</html>
			`);
			return html;
		}

async function rotatePicture(a, path){
	let rotatedImage = path.fsPath.split(/(?:\.)([^\/]*)$/g);
	jimp.read(path.fsPath, function (err, image) {
		if (err) {
		  console.log(err)
		} else {
			image.rotate(a)
			.write(rotatedImage[0]+"-Rotated"+a+'.'+rotatedImage[1]); 
			console.log(rotatedImage[0]+"-Rotated"+a+'.'+rotatedImage[1]);
		}
	  })
}

// Initialize the download path to the active workspace
let downloadPath = vscode.workspace.rootPath;

// Prompts the user with a file explorer, and changes the download
// Path to the folder's path selected by the user
async function changeDownloadPath(){
	let folder = await vscode.window.showOpenDialog({
		canSelectFolders: true,
		canSelectFiles: false,
	});
	downloadPath = folder[0].fsPath;
	console.log("New download path set to: " + downloadPath);
}

async function changeDownloadPath_onRightClick(path){

	downloadPath = path.fsPath.split(/(?:\.)([^\/]*)$/g)[0];
	console.log("New download path set to: " + downloadPath);
}

	// Download the selected image to the current workplace
	// TODO prompt the user asking him for a download folder, if no active workspace is active. 
async function downloadImage(imageSource){
	console.log(downloadPath);
	if(downloadPath === undefined){
		console.log("undefined dP " + downloadPath);
		if(vscode.workspace.rootPath === undefined)
			await changeDownloadPath();
		else 
			{	console.log("defined dP " + downloadPath);
				downloadPath = vscode.workspace.rootPath;
			}
	}

	console.log(downloadPath);
	let downloadSettings= {
		extract: false
	};
	console.log(imageSource);
	console.log(downloadPath);
	await download(imageSource, downloadPath, downloadSettings);
	console.log("fin download");
	vscode.window.showInformationMessage("Picture Downloaded!");

	
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pictury" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pictury.start', function () {
		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
		'pictury', // Identifies the type of the webview. Used internally
		'Pictury', // Title of the panel displayed to the user
		vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
            enableScripts: true,
			
        } // Webview options.
		);


		// And set its initial HTML content
		panel.webview.html = getInitialPage();
				
		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(
		message => {
			switch (message.command) {
			case 'download': 
				downloadImage(message.text);
				

			case 'alert':    // Inform user that the picture's URL has been copied
				//vscode.window.showInformationMessage("Pictury Notification: " + message.txt);
				vscode.window.setStatusBarMessage("Pictury Notification: " + message.text,2000);
				return;

			case 'searchResult' : // Handle Search Query from the user and display the results in WebView
				i = 1
				let picture_urls = message.text.split("<sp>")
				let searchQuery = picture_urls[0]
				console.log("Search Query " + searchQuery + " " + typeof searchQuery)
				picture_urls.shift()

				panel.webview.html = getSearchResult(picture_urls, searchQuery, i); //Displays the Results Page
				return;

			case 'nextPage':
				let picture_urls_next = message.text.split("<sp>")
				let searchQuery_next = picture_urls_next[0]
				console.log("Search Query " + searchQuery_next + " " + typeof searchQuery_next)
				picture_urls_next.shift()
				i++
				panel.webview.html = getSearchResult(picture_urls_next, searchQuery_next, i);
				return;
				
			case 'previousPage':
				let picture_urls_before = message.text.split("<sp>")
				let searchQuery_before = picture_urls_before[0]
				console.log("Search Query " + searchQuery_before + " " + typeof searchQuery_before)
				picture_urls_before.shift()
				i--
				panel.webview.html = getSearchResult(picture_urls_before, searchQuery_before, i);
				return;
			}
			},
			undefined,
			context.subscriptions
		);	
	});

	// Resizes a picture with the width:height inputed by the user
	let disposable2 = vscode.commands.registerCommand('pictury.resize', function (path=vscode.Uri) {
		// This function's credits: https://github.com/lukapetrovic/vscode-imageresizer
		let userInput = vscode.window.showInputBox();
		userInput.then(widthXheight => {
			let resizeDimensions = widthXheight.split("x");
	
			if (resizeDimensions[0] == null || resizeDimensions[1] == null) {
			  vscode.window.showInformationMessage(
				"Incorrect format. Should be widhtxheight"
			  );
			} else {
			  let resizedImageLocationParts = path.fsPath.split(/(?:\.)([^\/]*)$/g);
			  jimp
				.read(path.fsPath)
				.then(function (image) {
				  // if only one of the dimensions is auto, it will be autoscaled
				  let width = resizeDimensions[0].toLowerCase() == 'auto' ? jimp.AUTO : Number.parseInt(resizeDimensions[0]);
				  let height = resizeDimensions[1].toLowerCase() == 'auto' ? jimp.AUTO : Number.parseInt(resizeDimensions[1]);
				  image
					.resize(width, height)
					.write(resizedImageLocationParts[0] + "-" + widthXheight + "." + resizedImageLocationParts[1], (error) => {
					  if (error === null) {
						vscode.window.showInformationMessage("Image resized");
					  } else {
						vscode.window.showInformationMessage("Error resizing");
					  }
	
					})
	
				})
				.catch(function (err) {
				  vscode.window.showInformationMessage(err);
				});
	
			}
		  });
		}
	  );

	// Converts the picture selected by the user from JPG/JPEG to PNG
	let toPNG = vscode.commands.registerCommand('pictury.toPNG', function (path=vscode.Uri) {
		let convertedImage = path.fsPath.split(/(?:\.)([^\/]*)$/g);
		jimp.read(path.fsPath, function (err, image) {
			if (err) {
			  console.log(err)
			} else {
			  image.write(convertedImage[0] + ".png" );
			}
		  })
		}
	  );

	// Converts the picture selected by the user from PNG to JPG
	let toJPG = vscode.commands.registerCommand('pictury.toJPG', function (path=vscode.Uri) {
		let convertedImage = path.fsPath.split(/(?:\.)([^\/]*)$/g);
		jimp.read(path.fsPath, function (err, image) {
			if (err) {
			  console.log(err)
			} else {
			  image.write(convertedImage[0] + ".jpg" );
			}
		  })
		}
	  );	  
	
	//The following commands rotate the picture selected by the user
	let rotateRight90 = vscode.commands.registerCommand('pictury.rotateRight90', function(path=vscode.Uri) {
		rotatePicture(270, path);
	})
	let rotateRight180 = vscode.commands.registerCommand('pictury.rotateRight180', function(path=vscode.Uri) {
		rotatePicture(180, path);
	})
	let rotateLeft90 = vscode.commands.registerCommand('pictury.rotateLeft90', function(path=vscode.Uri) {
		rotatePicture(90, path);
	})
	let rotateLeft180 = vscode.commands.registerCommand('pictury.rotateLeft180', function(path=vscode.Uri) {
		rotatePicture(180, path);
	})

	let downloadPathModifier = vscode.commands.registerCommand('pictury.downloadPathModifier', function(path=vscode.Uri) {
		changeDownloadPath_onRightClick(path);
	})
	
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(toPNG);
	context.subscriptions.push(toJPG);
	context.subscriptions.push(rotateRight90);
	context.subscriptions.push(rotateRight180);
	context.subscriptions.push(rotateLeft90);
	context.subscriptions.push(rotateLeft180);
	context.subscriptions.push(downloadPathModifier);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
