# LeetCode Question to PDF

A Chrome extension that allows you to save LeetCode problems as PDF files with a single click.

## Features

- Adds a "Save as PDF" button to LeetCode problem pages
- Generates clean, well-formatted PDFs of problem descriptions
- Automatically names files based on the problem title

## Installation

1. Clone this repository or download the source code
2. Load the extension in Chrome:
   - Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", and select the extension folder

## Usage

1. Navigate to any LeetCode problem page
2. Click the "Save as PDF" button in the navigation bar
3. The PDF will be automatically generated and downloaded

## Technology

This extension is built using:
- JavaScript
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) (v0.10.3) - HTML to PDF conversion library

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This project includes the following third-party libraries:

- **html2pdf.js** (v0.10.3): A client-side HTML-to-PDF rendering library.
  - Source: https://github.com/eKoopmans/html2pdf.js
  - License: MIT
