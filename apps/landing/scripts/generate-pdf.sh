#!/bin/sh

# Navigate to project root
cd "$(dirname "$0")/.."

# Generate HTML first
pandoc src/content/resume.md -f markdown -t html -c public/resume-stylesheet.css -s -o public/resume.html

# Use puppeteer to convert HTML to PDF
node scripts/generate-pdf.js

# Clean up intermediate HTML
rm -f public/resume.html

echo "✓ PDF generated at public/resume.pdf"
