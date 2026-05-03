import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportToPDF(
  elementId: string,
  filename: string,
  articleUrl: string,
  title: string
) {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      console.error('Element not found')
      return
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#1F1F1F',
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    let heightLeft = canvas.height

    const imgHeight = (canvas.width / imgWidth) * pageHeight
    let position = 0

    const pdf = new jsPDF('p', 'mm', 'a4')

    // Add title and metadata
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text(title, 15, 20, { maxWidth: 180 })

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(150, 150, 150)
    pdf.text(`Read full article: ${articleUrl}`, 15, 35, { maxWidth: 180 })
    pdf.text(`Exported from: www.sosei.com`, 15, 42, { maxWidth: 180 })

    // Add separator
    pdf.setDrawColor(100, 100, 100)
    pdf.line(15, 48, 195, 48)

    // Add content
    let pageNum = 1
    const imgData = canvas.toDataURL('image/png')

    while (heightLeft > 0) {
      const heightImage = (imgWidth / canvas.width) * heightLeft

      pdf.addImage(imgData, 'PNG', 0, position + 55, imgWidth, heightImage)
      heightLeft -= pageHeight
      position += heightImage

      if (heightLeft > 0) {
        pdf.addPage()
        pageNum++
      }
    }

    // Add footer to each page
    for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
      pdf.setPage(i)
      pdf.setFontSize(9)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`Page ${i} of ${pdf.getNumberOfPages()}`, 105, 290, { align: 'center' })
    }

    pdf.save(`${filename}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}
