import buildReportData from '../engine/reportBuilder.js'
import generateReportHTML from '../engine/reportTemplate.js'

export function downloadReport(state) {
  const reportData = buildReportData(state)
  const html = generateReportHTML(reportData)
  const blob = new Blob([html], { type: 'text/html' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `${reportData.meta.tickerSymbol}-CFO-Report.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
