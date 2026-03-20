import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export async function generatePDF(elementId, filename = 'invoice.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const width = imgWidth * ratio;
  const height = imgHeight * ratio;
  const x = (pdfWidth - width) / 2;

  pdf.addImage(imgData, 'PNG', x, 0, width, height);
  pdf.save(filename);
}
