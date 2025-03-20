(function () {
  // Wait for page to be fully loaded
  window.addEventListener('load', function () {
    setTimeout(initExtension, 1000);
  });

  // Initialize the extension
  function initExtension() {
    // Find the navigation bar to add our button
    const topButtons = document.querySelector('#ide-top-btns');

    if (!topButtons) {
      console.error('LeetCode PDF Extractor: Top buttons not found');
      return;
    }

    // Create the PDF button
    const pdfButton = document.createElement('button');
    pdfButton.className = 'leetcode-pdf-button';
    pdfButton.innerHTML = '<span class="pdf-icon">📄</span> Save as PDF';
    pdfButton.title = 'Save problem as PDF';

    // Add click event
    pdfButton.addEventListener('click', extractAndGeneratePDF);

    // Add button to the navigation bar
    topButtons.appendChild(pdfButton);

    console.info('LeetCode PDF Extractor: Button added');
  }

  // Extract content and generate PDF
  function extractAndGeneratePDF() {
    try {
      // Get problem title
      const titleElement = document.querySelector('.text-title-large');
      const title = titleElement.innerText;
      console.info('Title', title);

      // Get main content container
      const contentElement = document.querySelector(
        '[data-track-load="description_content"]'
      );

      if (!contentElement) {
        alert('Could not find problem content to extract');
        return;
      }

      // Clone content to avoid modifying the original page
      const contentClone = contentElement.cloneNode(true);

      // Extract problem content
      const extractedHtml = formatContentForPdf(contentClone);

      // Generate and download PDF
      generatePDF(title, extractedHtml);
    } catch (error) {
      console.error('Error extracting content:', error);
      alert('Error extracting content: ' + error.message);
    }
  }
  
  // Format content for PDF
  function formatContentForPdf(contentElement) {
    // Create a wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'leetcode-pdf-content';

    // Add problem title
    const titleElement = document.querySelector('.css-v3d350');
    if (titleElement) {
      const titleDiv = document.createElement('h1');
      titleDiv.textContent = titleElement.textContent;
      wrapper.appendChild(titleDiv);
    }
    
    // Add the main content
    wrapper.appendChild(contentElement);

    return wrapper.innerHTML;
  }
})();
