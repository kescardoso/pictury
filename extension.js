// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

//Returns the HTML code for the search bar
function getSearchBar(){
	// TODO
	let html = '<h2>How to Use Pictory:</h2><p>1. Use the search box below to find your images.</p><p>2. Type in keywords and hit enter.</p><p>3. From the search results, select an image with your mouse.</p><p>4. Double click an image to download it to your workspace.</p><h2>Search Here:</h2><input type="text" placeholder="Search...">'
	return html;
}

// Returns the HTML code for the webview
function getWebviewContent(pictures_urls) {
	var html = `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Pictury</title>
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
	</script>`
html=html.concat(getSearchBar());	
  html=html.concat(`<h2>Search Results:</h2>
  <br>
  `);
  let picture_div;
  for(let i=0;i<12;i++){
	picture_div =  
	`<img src="${pictures_urls[i]}" onclick="Copy_Picture_URL('${pictures_urls[i]}')" width="300" /> \n`;
	html = html.concat(picture_div);
  }
	html = html.concat(
	`</body>
	</html>`);
	console.log(html);
  	return html;
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
		'catCoding', // Identifies the type of the webview. Used internally
		'Cat Coding', // Title of the panel displayed to the user
		vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
            enableScripts: true
			
        } // Webview options. More on these later.
		);

		// TODO Scrape unsplash.com and collect the pictures associated with the user's search
		var pictures_urls = ["https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
					 "https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
					 "https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
					 "https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
		 			"https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 1050w, https://images.unsplash.com/photo-1595077770871-f0ee31fe25d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
				];


		// And set its initial HTML content
		panel.webview.html = getWebviewContent(pictures_urls);

		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(
		message => {
			switch (message.command) {
			case 'alert':    // Inform user that the picture's URL has been copied
				vscode.window.showInformationMessage(message.text);
				return;
			case 'search' : // Handle Search Query from the user and display the results in WebView
				var pictures_urls = scraping(); //Fetches Unsplash.com for the best results
				panel.webview.html = getWebviewContent(pictures_urls);
				return;
			}
			},
			undefined,
			context.subscriptions
		);		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
