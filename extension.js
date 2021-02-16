// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const download = require('download');
const path = require('path');
const jimp = require("jimp");
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
			<!-- Bootstrap CSS : -->
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
			<!-- Meta Tags : -->
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<!-- Title: -->
			<title>Pictury</title>
		</head>
		<body>
			<div class="container">
				<!-- Instructions : -->
				<div class="instructions">
					<h2>How to Use Pictory:</h2>
					<p>1. Use the search box below to find your images.</p>
					<p>2. Type in keywords and hit enter.</p>
					<p>3. From the search results, select an image with your mouse.</p>
					<p>4. Double click an image to download it to your workspace.</p>
				</div>

				<!-- Search Input : -->
				<div class="searchbox">
					<h2>Search Here:</h2>
					<form id="myForm" autocomplete="off">
						<div class ="form-group">
							<input type="text" class ="form-control" id="search" placeholder="Search image" required>
						</div>
					</form>
				</div>
			</div>

			<!-- Bootstrap Js, jQuery and Popper.js : -->		
			<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>			
		</body>`
	return html;
}

//Returns the HTML code for each picture to be displayed in the webview
function getImageHTML(imageSource){
	let html = `<img src="${imageSource}" onclick="Copy_Picture_URL('${imageSource}')" ondblclick="Download('${imageSource}')" width="300" />\n`;
	return html;
}

// Returns the HTML code for the initial webview (Welcome screen with just the searchbar, for now) 
function getInitialPage(){
	let html =`
		<head>
		</head>
		<body>
	`;
		html.concat(getSearchBar());
		html.concat(`
			</body>
			</html>
		`);
}

// Returns the HTML code for the search query
function getSearchResult(pictures_urls) {
	let html = `
		<head>
		</head>
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
			<div class="container">
				<h2>Search Result:</h2>
				<br>
		`);
		let picture_div;
		for(let i=0;i<12;i++){
			picture_div = getImageHTML(pictures_urls[i]);
			html = html.concat(picture_div);
		}
			html = html.concat(`
				</div>
					</body>
					</html>
			`);
			return html;
		}

function scraping(query){
	// Uses unsplash API to get results for the user's query
	// Returns an array containing the URLs of the pictures that will be displayed 
  // TODO
}


	// Download the selected image to the current workplace
	// TODO prompt the user asking him for a download folder, if no active workspace is active. 
async function downloadImage(imageSource){
	let installFolder;
	if(vscode.workspace.rootPath != undefined)
		installFolder = vscode.workspace.rootPath;
	else 
		{installFolder = '';
		vscode.window.showInformationMessage("No Active Workspace!");
		return;} //TO DO, ASK THE USER FOR DOWNLOAD PATH

	let downloadSettings= {
		extract: false
	};
	await download(imageSource, installFolder, downloadSettings);
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
            enableScripts: true
			
        } // Webview options. More on these later.
		);

		// TODO Scrape unsplash.com and collect the pictures associated with the user's search
		// TODO Remove this variable (pictures_urls) after adding that, it's just used for testing purposes
		var pictures_urls = ["https://images.unsplash.com/photo-1610614810013-40aaecad27d7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080",
		 			"https://images.unsplash.com/photo-1613092869277-6e02af5564aa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080",
					"https://images.unsplash.com/photo-1611161323875-496bd460d7f5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
					"https://images.unsplash.com/photo-1611957150145-d17dbfc97a3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
		 			"https://images.unsplash.com/photo-1611920855276-06e04c91213a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max", 
					"https://images.unsplash.com/photo-1611207479391-b89565579fd9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080",
					"https://images.unsplash.com/photo-1611862301382-fdf70949ab6d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080",
					"https://images.unsplash.com/photo-1611928171065-5b989f3ea235?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080",
					"https://images.unsplash.com/photo-1612011692306-3e709cf395cc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080",
					"https://images.unsplash.com/photo-1610717077228-39c7b13e07cb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080",
					"https://images.unsplash.com/photo-1612109592939-029b082f46b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080", 
		 			"https://images.unsplash.com/photo-1610880976291-2c0f6b1e1651?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1618&ixlib=rb-1.2.1&q=80&w=1080"
				];


		// And set its initial HTML content
		panel.webview.html = getSearchResult(pictures_urls);
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
			case 'search' : // Handle Search Query from the user and display the results in WebView
				var pictures_urls = scraping(message.text); //Fetches Unsplash.com for the best results
				panel.webview.html = getSearchResult(pictures_urls); //Displays the Results Page
				return;
			}
			},
			undefined,
			context.subscriptions
		);		
	});

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
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
