// Using html2pdf.js to convert HTML to PDF
// This script should be loaded before content.js

// Function to convert a title to kebab case for filename
function titleToKebabCase(title) {
  // Replace periods after numbers with hyphens
  const withoutPeriods = title.replace(/(\d+)\.(\s|$)/g, '$1-$2');
  
  // Convert to lowercase and replace spaces and other non-alphanumeric chars with hyphens
  return withoutPeriods
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .trim(); // Remove leading/trailing spaces
}

// Function to generate PDF
function generatePDF(title, contentHtml) {
  // Create a container for the PDF content (off-screen)
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  
  // Add title to the container
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  titleElement.style.color = 'black';
  titleElement.style.fontSize = '36px';
  titleElement.style.marginBottom = '30px';

  // Assemble the container with title and content
  container.appendChild(titleElement);
  container.innerHTML += contentHtml;
  container.style.padding = '20px';
  container.style.backgroundColor = 'white';
  container.style.color = 'black';
  container.style.width = '210mm'; // A4 width
  container.style.fontSize = '12px';

  // Add container to the document (off-screen)
  document.body.appendChild(container);
  
  // Calculate dimensions
  const contentHeight = container.offsetHeight;
  console.log('Content height (px):', contentHeight);
  
  // Convert pixels to mm (approximate conversion)
  const pxToMm = 0.264583; // 1px ≈ 0.264583mm
  const heightInMm = Math.ceil(contentHeight * pxToMm) + 20; // Add some margin
  console.log('PDF height (mm):', heightInMm);
  
  // Generate kebab-cased filename from title
  const filename = titleToKebabCase(title) + '.pdf';
  console.log('Generated filename:', filename);
  
  // Configure PDF options with custom page size
  const options = {
    margin: [7, 7, 7, 7],
    filename: filename,
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { 
      scale: 7,
      useCORS: true,
      logging: true,
      backgroundColor: '#FFFFFF'
    },
    jsPDF: { 
      unit: 'mm', 
      format: [210, heightInMm],
      orientation: 'portrait',
      hotfixes: ['px_scaling']
    },
    pagebreak: { mode: 'avoid-all' }
  };

  // Generate PDF using promise chain
  return html2pdf()
    .from(container)
    .set(options)
    .save()
    .then(() => {
      console.log('PDF generated successfully');
    })
    .catch(error => {
      console.error('PDF generation error:', error);
    })
    .finally(() => {
      // Always clean up the container
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });
}
