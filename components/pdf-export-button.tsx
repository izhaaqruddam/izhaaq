'use client'

import { useState } from 'react'
import { exportToPDF } from '@/lib/pdf-export'

interface PDFExportButtonProps {
  elementId: string
  filename: string
  articleUrl: string
  title: string
}

export default function PDFExportButton({
  elementId,
  filename,
  articleUrl,
  title,
}: PDFExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = async () => {
    setIsLoading(true)
    try {
      await exportToPDF(elementId, filename, articleUrl, title)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent hover:text-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-6-4m6 4l6-4"
        />
      </svg>
      {isLoading ? 'Exporting...' : 'Export PDF'}
    </button>
  )
}
