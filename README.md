# PICTURY (Project)

**Problem (User Story):**

Have you ever spent hours on google finding the perfect picture for your website or app? And then after you found them, facing the hassle of uploading all these files to your development environment in order to use them… All this takes time and patience.

But, we now have the solution for you: Pictury!

Pictury is a VS Code plugin that will scrape popular free stock images from sites such as Unsplash and display the best pictures for you from a search output, right from your development environment.

You don’t need to google, you don’t need to leave your sandbox! With the Picture extension for VSCode, you can search, choose and use stock-free images on your project, with just 1 command line.

Pictury is a must for all your development endevevors. And it's free. Download it now: <picture.download.link>
### How to use?
1. As the extension is not yet available on the VS Code extensions market, you'll have to clone this repository to your workspace
2. Launch the debugger
3. A new VS Code window is opened. Go to its workspace, and load any folder of yours, as if you were working on a project.
4. Use the Key-Binding SHIFT+A to launch the extension. A generic search result webview will appear. 
5. Click on any picture to copy its URL. Double-Click to download it in your active workspace ( a new option to ask the user for a specific 
download path will soon be implemented).
PS: the search bar isn't active yet, we're almost done with implementing it! The design will also be improved in the future, and several new features will be added (I.e: resize a picture, get results from several websites (not only unsplash), snippet to generate a random picture URL in your code, and many others!)


**Desired Features -- to be implemented:**

1. stock-free photo library from inside vscode

2. ability to display images inside vscode upon a search

3. ability to allow downloads or copy and paste from the search window

4. photo library to be used (fetched): Unsplash

5. ability to fecth image/artist credits with metadata as classes (directly to the alt and/or title tags on html) upon image uploading to workspace

6. ability to fetch a .txt file list into the workspace or externally with image credits and photo links on unsplash (for the developer record, may use it for read me later, for proper image credits)

**Desired Technologies -- to be used:**

1. Javascript
2. Svelt
3. Python ?
4. Fast API ?

# pictury README

This is the README for your extension "pictury". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
