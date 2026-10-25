const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, 'JNTU_Project_Report.pdf');
const mdPath = path.join(__dirname, 'JNTU_Project_Report.md');
const content = fs.readFileSync(mdPath, 'utf8');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 70, bottom: 70, left: 72, right: 57 },
  info: {
    Title: 'Blood Bank Availability Finder - JNTU Project Report',
    Author: 'Athreya, Dhiraj, Rithwik, Sagar',
    Subject: 'B.Tech CSE Capstone Project Report',
    Creator: 'JNTU Hyderabad'
  }
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

// ── Helpers ────────────────────────────────────────────────────────────────
const PAGE_W = doc.page.width - 72 - 57;
const CRIMSON = '#B71C1C';
const NAVY    = '#1A237E';
const BLACK   = '#000000';
const GRAY    = '#555555';
const LGRAY   = '#F5F5F5';

let pageNum = 0;

function addPageNumber() {
  if (pageNum > 0) {
    doc.fontSize(9).fillColor(GRAY)
       .text(`Page ${pageNum}`, 0, doc.page.height - 45, {
         align: 'center', width: doc.page.width
       });
    doc.fontSize(9).fillColor(GRAY)
       .text('JNTU Hyderabad — Blood Bank Availability Finder', 0, doc.page.height - 58, {
         align: 'center', width: doc.page.width
       });
  }
}

doc.on('pageAdded', () => {
  pageNum++;
});

// ── Parse and render markdown lines ───────────────────────────────────────
const lines = content.split('\n');
let i = 0;
let inTable = false;
let tableRows = [];
let inCode = false;
let codeLines = [];

function ensureSpace(needed) {
  if (doc.y > doc.page.height - doc.page.margins.bottom - needed) {
    addPageNumber();
    doc.addPage();
  }
}

function renderParagraph(text) {
  if (!text.trim()) return;
  // strip inline markdown
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '$1');
  text = text.replace(/\*\*(.+?)\*\*/g, '$1');
  text = text.replace(/\*(.+?)\*/g, '$1');
  text = text.replace(/`(.+?)`/g, '$1');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/\$\$?[^$]+\$\$?/g, '[Formula]');
  ensureSpace(20);
  doc.fontSize(11).fillColor(BLACK).font('Times-Roman').text(text, {
    align: 'justify', lineGap: 3
  });
  doc.moveDown(0.3);
}

function renderHeading(level, text) {
  text = text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').trim();
  if (level === 1) {
    ensureSpace(50);
    doc.moveDown(0.5);
    doc.fontSize(16).fillColor(NAVY).font('Helvetica-Bold').text(text, { align: 'center' });
    doc.moveDown(0.3);
    doc.moveTo(72, doc.y).lineTo(72 + PAGE_W, doc.y).lineWidth(2).strokeColor(CRIMSON).stroke();
    doc.moveDown(0.5);
  } else if (level === 2) {
    if (!['CERTIFICATE','DECLARATION','ACKNOWLEDGEMENT','ABSTRACT','TABLE OF CONTENTS','LIST OF FIGURES','LIST OF TABLES'].includes(text.trim())) {
      ensureSpace(60);
    }
    doc.moveDown(0.8);
    doc.fontSize(13).fillColor(CRIMSON).font('Helvetica-Bold').text(text);
    doc.moveTo(72, doc.y).lineTo(72 + PAGE_W, doc.y).lineWidth(1).strokeColor(NAVY).stroke();
    doc.moveDown(0.4);
  } else if (level === 3) {
    ensureSpace(40);
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor(NAVY).font('Helvetica-Bold').text(text);
    doc.moveDown(0.2);
  } else if (level === 4) {
    ensureSpace(30);
    doc.moveDown(0.3);
    doc.fontSize(11).fillColor(BLACK).font('Helvetica-Bold').text(text);
    doc.moveDown(0.2);
  } else {
    ensureSpace(25);
    doc.moveDown(0.2);
    doc.fontSize(11).fillColor(GRAY).font('Helvetica-Bold').text(text);
    doc.moveDown(0.2);
  }
}

function renderHR() {
  doc.moveDown(0.3);
  doc.moveTo(72, doc.y).lineTo(72 + PAGE_W, doc.y).lineWidth(0.5).strokeColor('#999').stroke();
  doc.moveDown(0.5);
}

function renderCodeBlock(codeArr) {
  const codeText = codeArr.join('\n');
  ensureSpace(60);
  doc.moveDown(0.3);
  const startY = doc.y;
  // background
  const lineCount = Math.min(codeArr.length, 40);
  const blockH = lineCount * 13 + 16;
  doc.rect(72, startY, PAGE_W, Math.min(blockH, doc.page.height - startY - 80))
     .fillColor('#F0F0F0').fill();
  // left bar
  doc.rect(72, startY, 4, Math.min(blockH, doc.page.height - startY - 80))
     .fillColor(CRIMSON).fill();
  doc.fillColor(BLACK);
  doc.fontSize(8).font('Courier').text(codeText, 82, startY + 8, {
    width: PAGE_W - 20,
    lineGap: 2,
    lineBreak: true
  });
  doc.moveDown(0.5);
}

function renderTableRows(rows) {
  if (rows.length < 2) return;
  ensureSpace(80);
  doc.moveDown(0.3);

  // Parse header and data rows, skip separator
  const parsedRows = rows
    .filter(r => !r.match(/^\|[-: |]+\|$/))
    .map(r => r.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim()));

  if (parsedRows.length === 0) return;

  const colCount = parsedRows[0].length;
  const colW = PAGE_W / colCount;
  const rowH = 20;
  const startX = 72;
  let curY = doc.y;

  parsedRows.forEach((cells, ri) => {
    ensureSpace(rowH + 10);
    curY = doc.y;
    const isHeader = ri === 0;

    // Row background
    doc.rect(startX, curY, PAGE_W, rowH)
       .fillColor(isHeader ? NAVY : (ri % 2 === 0 ? '#FFFFFF' : '#F5F5F5'))
       .fill();

    // Cells
    cells.forEach((cell, ci) => {
      doc.fontSize(9)
         .fillColor(isHeader ? '#FFFFFF' : BLACK)
         .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
         .text(cell, startX + ci * colW + 4, curY + 5, {
           width: colW - 8,
           height: rowH - 6,
           lineBreak: false,
           ellipsis: true
         });
    });

    // Row border
    doc.rect(startX, curY, PAGE_W, rowH).lineWidth(0.3).strokeColor('#AAAAAA').stroke();
    doc.moveDown(0);
    doc.y = curY + rowH;
  });

  doc.moveDown(0.5);
}

function renderListItem(text, ordered, num) {
  text = text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  ensureSpace(18);
  const bullet = ordered ? `${num}.` : '•';
  doc.fontSize(11).fillColor(BLACK).font('Times-Roman')
     .text(`${bullet}  ${text}`, { indent: 15, lineGap: 2 });
  doc.moveDown(0.1);
}

// ── Main render loop ───────────────────────────────────────────────────────
// First page is added automatically
pageNum = 1;

let listNum = 0;
let prevWasBlank = false;

while (i < lines.length) {
  const line = lines[i];

  // Code block
  if (line.startsWith('```')) {
    inCode = !inCode;
    if (!inCode) {
      renderCodeBlock(codeLines);
      codeLines = [];
    }
    i++;
    continue;
  }
  if (inCode) {
    codeLines.push(line);
    i++;
    continue;
  }

  // Table detection
  if (line.startsWith('|')) {
    tableRows.push(line);
    i++;
    continue;
  } else if (tableRows.length > 0) {
    renderTableRows(tableRows);
    tableRows = [];
  }

  // Headings
  const h6 = line.match(/^###### (.+)/);
  const h5 = line.match(/^##### (.+)/);
  const h4 = line.match(/^#### (.+)/);
  const h3 = line.match(/^### (.+)/);
  const h2 = line.match(/^## (.+)/);
  const h1 = line.match(/^# (.+)/);

  if (h1) { renderHeading(1, h1[1]); listNum = 0; i++; continue; }
  if (h2) { renderHeading(2, h2[1]); listNum = 0; i++; continue; }
  if (h3) { renderHeading(3, h3[1]); listNum = 0; i++; continue; }
  if (h4) { renderHeading(4, h4[1]); listNum = 0; i++; continue; }
  if (h5) { renderHeading(5, h5[1]); listNum = 0; i++; continue; }
  if (h6) { renderHeading(6, h6[1]); listNum = 0; i++; continue; }

  // HR
  if (line.match(/^---+$/)) { renderHR(); i++; continue; }

  // Unordered list
  const ul = line.match(/^[*\-] (.+)/);
  if (ul) { listNum = 0; renderListItem(ul[1], false, 0); i++; continue; }

  // Ordered list
  const ol = line.match(/^(\d+)\. (.+)/);
  if (ol) { listNum++; renderListItem(ol[2], true, listNum); i++; continue; }

  // Blank line
  if (!line.trim()) {
    if (!prevWasBlank) doc.moveDown(0.4);
    prevWasBlank = true;
    listNum = 0;
    i++;
    continue;
  }

  prevWasBlank = false;
  listNum = 0;

  // Skip mermaid diagram blocks (render a placeholder)
  if (line.trim() === '```mermaid') {
    // handled by code block detection above - won't reach here normally
    i++; continue;
  }

  // Regular paragraph
  renderParagraph(line);
  i++;
}

// Flush any remaining table
if (tableRows.length > 0) renderTableRows(tableRows);

// Last page number
addPageNumber();

doc.end();

stream.on('finish', () => {
  console.log('✅ PDF created successfully:', outPath);
  const stats = fs.statSync(outPath);
  console.log('📄 File size:', (stats.size / 1024).toFixed(1), 'KB');
  console.log('📄 Pages: approximately', pageNum);
});

stream.on('error', (err) => {
  console.error('❌ Error creating PDF:', err);
});
