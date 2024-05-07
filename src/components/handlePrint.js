import jsPDF from 'jspdf';

function formatMultilineTextForPdf(text) {
  if (!text) return ["No information provided"];
  return text.split('\n').reduce((acc, line) => {
    // Split each line by sentences or predefined maximum line length
    let currentLine = line;
    while (currentLine.length) {
      let maxLength = Math.min(95, currentLine.length);
      let pos = maxLength;
      if (currentLine.length > maxLength) {
        while (pos > 0 && currentLine[pos] !== ' ' && currentLine[pos] !== '-') pos--;
        if (pos === 0) pos = maxLength;
      }
      acc.push(currentLine.substring(0, pos));
      currentLine = currentLine.substring(pos + 1);
    }
    return acc;
  }, []);
}

const handlePrint = (formData, index) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  let yPos = 20;

  const checkAndAddPage = (yPosition) => {
    if (yPosition > 280) {  // A4 page height is approximately 297mm
      pdf.addPage();
      return 20;  // Return new starting position for the new page
    }
    return yPosition;
  };
  
  // Document Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);

  // Name and contact info
  pdf.setFontSize(33);
  pdf.text(formData.name || "No name provided", 105, yPos, { align: "center" });
  yPos += 10;

  pdf.setFontSize(12);
  let contactInfo = `${formData.email || "No email provided"} / ${formData.mobile || "No mobile provided"}`;
  pdf.text(contactInfo, 105, yPos, { align: "center" });
  yPos += 15;

  // Process each section
  const sections = [
    { title: "Languages", content: formData.languages },
    { title: "Education", content: formData.education },
    { title: "Projects and Experience", content: formData.projects },
    { title: "Activities", content: formData.activity }
  ];

  pdf.setFontSize(12);
  sections.forEach(section => {
    if (section.content) {
      yPos = checkAndAddPage(yPos);  // Check if a new page is needed
      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      pdf.text(section.title, 105, yPos, { align: "center" });
      yPos += 10;

      let lines = formatMultilineTextForPdf(String(section.content));
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      lines.forEach(line => {
        yPos = checkAndAddPage(yPos);  // Check again for each line
        pdf.text(line, 20, yPos);
        yPos += 5;
      });
      yPos += 5;
    }
  });

  pdf.save(`Resume-${index + 1}.pdf`);
};


export default handlePrint;