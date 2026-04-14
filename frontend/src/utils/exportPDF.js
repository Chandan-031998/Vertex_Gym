import jsPDF from 'jspdf';

export const exportPDF = (title = 'Report') => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 16, 20);
  doc.setFontSize(10);
  doc.text(`Exported on ${new Date().toLocaleString()}`, 16, 28);
  doc.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};
