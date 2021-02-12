// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

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
	</script>
	<div class="input-field">
	<button class="btn-search" type="button">
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
	</svg>
	</button>
	<input id="search" type="text" placeholder="" value="Ladies">
	</div>
  <h2>Search Result:</h2>
  <br>
  `;
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
