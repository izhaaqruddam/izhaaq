import jsPDF from 'jspdf'
import essaysData from '@/lib/essays.json'

export async function exportToPDF(
  elementId: string,
  filename: string,
  articleUrl: string,
  title: string
) {
  // Find the essay content from our data source
  const essay = essaysData.find(e => e.title === title) || {
    title: title,
    excerpt: 'Article export from Sosei',
    content: 'Content could not be retrieved for PDF export.',
    category: 'Essay',
    date: new Date().toLocaleDateString(),
    wordCount: 0
  }

  const pdf = new jsPDF({
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const margin = 20
  const maxWidth = pageWidth - margin * 2
  let y = 30

  // --- Title ---
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(26)
  const titleLines = pdf.splitTextToSize(essay.title, maxWidth)
  pdf.text(titleLines, margin, y)
  y += (titleLines.length * 10) + 5

  // --- Meta ---
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(150, 150, 150)
  pdf.text(`CATEGORY: ${essay.category.toUpperCase()}  |  DATE: ${essay.date}`, margin, y)
  y += 6
  pdf.text(`SOURCE: ${articleUrl}`, margin, y)
  y += 10

  // --- Tagline ---
  pdf.setFontSize(9)
  pdf.setTextColor(255, 183, 197) // Cherry Blossom Pink
  pdf.text('SOSEI — JAPANESE FOR CREATION & REVIVAL', margin, y)
  y += 15

  // --- Divider ---
  pdf.setDrawColor(200, 200, 200)
  pdf.line(margin, y - 5, pageWidth - margin, y - 5)

  // --- Content Parsing ---
  pdf.setTextColor(0, 0, 0)
  
  // Split content by H2 tags to handle styling
  const parts = essay.content.split(/(<h2>.*?<\/h2>)/g)

  parts.forEach((part: string) => {
    if (part.startsWith('<h2>')) {
      // Style for H2
      const headingText = part.replace(/<\/?h2>/g, '')
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(15)
      y += 5 // Extra space before heading
      
      const lines = pdf.splitTextToSize(headingText, maxWidth)
      lines.forEach((line: string) => {
        if (y > 270) {
          pdf.addPage()
          y = 20
        }
        pdf.text(line, margin, y)
        y += 8
      })
      y += 2 // Extra space after heading
    } else {
      // Style for Paragraph
      const cleanText = part.replace(/<[^>]*>/g, '').trim()
      if (!cleanText) return

      pdf.setFont('times', 'normal')
      pdf.setFontSize(12)
      
      const lines = pdf.splitTextToSize(cleanText, maxWidth)
      lines.forEach((line: string) => {
        if (y > 270) {
          pdf.addPage()
          y = 20
        }
        pdf.text(line, margin, y)
        y += 7
      })
      y += 4 // Space between paragraphs
    }
  })

  // --- Footer ---
  const pageCount = pdf.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: 'center' })
  }

  pdf.save(`${filename}.pdf`)
}