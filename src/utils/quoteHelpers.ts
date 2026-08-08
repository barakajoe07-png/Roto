import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RFQItem } from '../types';

export interface CustomerQuoteInfo {
  name: string;
  phone: string;
  email: string;
  county: string;
  subCounty: string;
  deliveryMode: string;
  notes?: string;
}

/**
 * Formats a clean WhatsApp message text with customer & itemized quote details
 */
export const formatWhatsAppMessage = (
  rfqItems: RFQItem[],
  customerInfo: CustomerQuoteInfo,
  quoteRef?: string
): string => {
  const ref = quoteRef || `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' });
  const subtotalKsh = rfqItems.reduce((acc, item) => acc + item.product.priceKsh * item.quantity, 0);
  const vatKsh = Math.round(subtotalKsh * 0.16);
  const netKsh = subtotalKsh - vatKsh;

  let text = `*ROTO MOULDERS LIMITED*\n`;
  text += `*Official Sales & Proforma Quotation*\n`;
  text += `----------------------------------------\n`;
  text += `*Quote Ref:* \`${ref}\`\n`;
  text += `*Date:* ${dateStr}\n\n`;

  text += `*CLIENT & DELIVERY DETAILS*\n`;
  text += `*Name:* ${customerInfo.name?.trim() || 'Valued Customer'}\n`;
  text += `*Phone:* ${customerInfo.phone?.trim() || 'Not provided'}\n`;
  if (customerInfo.email?.trim()) {
    text += `*Email:* ${customerInfo.email.trim()}\n`;
  }
  text += `*County:* ${customerInfo.county || 'Nairobi'} County\n`;
  text += `*Sub-County:* ${customerInfo.subCounty || 'Central'} Sub-County\n`;
  text += `*Fulfillment:* ${customerInfo.deliveryMode === 'depot-delivery' ? 'Regional Depot Delivery' : 'Direct Factory Pick-up'}\n\n`;

  text += `*ITEMIZED PRODUCT ORDER (${rfqItems.length} item${rfqItems.length > 1 ? 's' : ''})*\n`;
  text += `----------------------------------------\n`;
  rfqItems.forEach((item, index) => {
    const itemTotal = item.product.priceKsh * item.quantity;
    text += `*${index + 1}. ${item.product.name}*\n`;
    text += `   SKU Code: \`${item.product.sku}\` | Color: *${item.selectedColor}*\n`;
    text += `   Quantity: ${item.quantity} x KSh ${item.product.priceKsh.toLocaleString()}\n`;
    if (item.customFittingNotes) {
      text += `   Fitting Specs: _${item.customFittingNotes}_\n`;
    }
    text += `   Subtotal: *KSh ${itemTotal.toLocaleString()}*\n\n`;
  });

  text += `*FINANCIAL SUMMARY*\n`;
  text += `----------------------------------------\n`;
  text += `Subtotal (Net): KSh ${netKsh.toLocaleString()}\n`;
  text += `VAT (16% Included): KSh ${vatKsh.toLocaleString()}\n`;
  text += `*TOTAL PAYABLE: KSh ${subtotalKsh.toLocaleString()}*\n\n`;

  if (customerInfo.notes && customerInfo.notes.trim()) {
    text += `*SPECIAL PLUMBING / FITTING NOTES*\n`;
    text += `_${customerInfo.notes.trim()}_\n\n`;
  }

  text += `*Manufacturer Guarantee:* 10-15 Year Official Replacement Warranty\n`;
  text += `*Factory Address:* Enterprise Road, Industrial Area, Nairobi, Kenya\n`;
  text += `*Sales Hotline:* +254 710 492 539\n`;
  text += `----------------------------------------\n`;
  text += `_Note: A copy of this sales quotation PDF has been downloaded to your Downloads folder._`;

  return text;
};

/**
 * Opens WhatsApp with the formatted quote message targeted to Roto Moulders Sales
 */
export const openWhatsAppQuote = (
  rfqItems: RFQItem[],
  customerInfo: CustomerQuoteInfo,
  quoteRef?: string,
  targetPhone: string = '254710492539'
) => {
  const message = formatWhatsAppMessage(rfqItems, customerInfo, quoteRef);
  const encodedText = encodeURIComponent(message);
  const cleanTarget = targetPhone.replace(/\+/g, '').replace(/\s+/g, '');
  const url = `https://wa.me/${cleanTarget}?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Generates and downloads an official Roto Moulders PDF Sales Quote
 */
export const downloadPDFQuote = (
  rfqItems: RFQItem[],
  customerInfo: CustomerQuoteInfo,
  quoteRef?: string
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const ref = quoteRef || `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const subtotalKsh = rfqItems.reduce((acc, item) => acc + item.product.priceKsh * item.quantity, 0);

  // Styling palette
  const primaryRed = [220, 38, 38]; // #dc2626
  const primaryBlack = [15, 23, 42]; // #0f172a
  const lightBg = [248, 250, 252];

  // Header Banner
  doc.setFillColor(primaryBlack[0], primaryBlack[1], primaryBlack[2]);
  doc.rect(0, 0, 210, 38, 'F');

  // Decorative Accent line
  doc.setFillColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.rect(0, 38, 210, 3, 'F');

  // Company Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('ROTO MOULDERS LIMITED', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(248, 250, 252);
  doc.text("Kenya's Leading Rotational Moulding Water Tank Manufacturers", 14, 23);
  doc.text('Enterprise Road, Industrial Area | P.O. Box 46143-00100 Nairobi, Kenya', 14, 28);
  doc.text('Hotline: +254 710 492 539 | Email: sales@rotomoulders.com', 14, 33);

  // Quote Title & Reference Box on top right
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(135, 10, 62, 22, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('SALES QUOTATION', 166, 17, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`REF: ${ref}`, 166, 23, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${dateStr}`, 166, 28, { align: 'center' });

  // Customer Details Block
  let yPos = 48;
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, yPos, 182, 34, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, yPos, 182, 34, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.text('CUSTOMER & DELIVERY SPECIFICATIONS', 18, yPos + 7);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryBlack[0], primaryBlack[1], primaryBlack[2]);
  doc.text('Customer Name:', 18, yPos + 15);
  doc.text('Phone Number:', 18, yPos + 21);
  doc.text('Email Address:', 18, yPos + 27);

  doc.setFont('helvetica', 'normal');
  doc.text(customerInfo.name || 'Valued Customer', 50, yPos + 15);
  doc.text(customerInfo.phone || 'Not specified', 50, yPos + 21);
  doc.text(customerInfo.email || 'Not specified', 50, yPos + 27);

  doc.setFont('helvetica', 'bold');
  doc.text('Delivery Location:', 110, yPos + 15);
  doc.text('Fulfillment Mode:', 110, yPos + 21);
  doc.text('Warranty Coverage:', 110, yPos + 27);

  doc.setFont('helvetica', 'normal');
  const locStr = `${customerInfo.county || 'Nairobi'} Co., ${customerInfo.subCounty || 'Central'}`;
  doc.text(locStr, 143, yPos + 15);
  doc.text(customerInfo.deliveryMode === 'depot-delivery' ? 'Regional Depot Delivery' : 'Factory Pick-up', 143, yPos + 21);
  doc.text('10-Year Manufacturer Warranty', 143, yPos + 27);

  // Table of Items
  yPos += 40;

  const tableData = rfqItems.map((item, idx) => [
    (idx + 1).toString(),
    `${item.product.name}\nSKU: ${item.product.sku}${item.customFittingNotes ? ` (${item.customFittingNotes})` : ''}`,
    item.selectedColor,
    item.quantity.toString(),
    `KSh ${item.product.priceKsh.toLocaleString()}`,
    `KSh ${(item.product.priceKsh * item.quantity).toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Product Description & Specs', 'Color', 'Qty', 'Unit Price', 'Total (KSh)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [51, 65, 85],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 75 },
      2: { cellWidth: 25 },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 27, halign: 'right' },
      5: { cellWidth: 30, halign: 'right' },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-expect-error autoTable attaches lastAutoTable to doc
  const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : yPos + 40) + 6;

  // Subtotal Summary Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(114, finalY, 82, 22, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(114, finalY, 82, 22, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('Subtotal (VAT Exclusive):', 118, finalY + 7);
  doc.text('VAT (16% Included):', 118, finalY + 12);
  doc.setFontSize(10);
  doc.setTextColor(220, 38, 38);
  doc.text('TOTAL AMOUNT (KSh):', 118, finalY + 18);

  const vatAmount = Math.round(subtotalKsh * 0.16);
  const netAmount = subtotalKsh - vatAmount;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(`KSh ${netAmount.toLocaleString()}`, 192, finalY + 7, { align: 'right' });
  doc.text(`KSh ${vatAmount.toLocaleString()}`, 192, finalY + 12, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(220, 38, 38);
  doc.text(`KSh ${subtotalKsh.toLocaleString()}`, 192, finalY + 18, { align: 'right' });

  // Special Notes Box if present
  if (customerInfo.notes && customerInfo.notes.trim()) {
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(14, finalY, 95, 22, 2, 2, 'F');
    doc.setDrawColor(252, 165, 165);
    doc.roundedRect(14, finalY, 95, 22, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(220, 38, 38);
    doc.text('PLUMBING & CUSTOM FITTING NOTES:', 18, finalY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const splitNotes = doc.splitTextToSize(customerInfo.notes.trim(), 87);
    doc.text(splitNotes, 18, finalY + 11);
  }

  // Terms & Conditions Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 272, 196, 272);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('TERMS & OFFICIAL PROFORMA CONDITIONS:', 14, 277);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('1. Quotation valid for 30 days. Prices subject to final site fitting confirmation.', 14, 281);
  doc.text('2. Payment via Official M-Pesa Paybill / Bank Transfer prior to dispatch.', 14, 285);
  doc.text('3. Roto Moulders products comply with KEBS ISO 9001:2015 quality standards.', 14, 289);

  // Save PDF document
  doc.save(`Roto_Moulders_Quote_${ref}.pdf`);
};

/**
 * Formats quotation into clean TXT format
 */
export const formatTXTQuote = (
  rfqItems: RFQItem[],
  customerInfo: CustomerQuoteInfo,
  quoteRef?: string
): string => {
  const ref = quoteRef || `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const subtotalKsh = rfqItems.reduce(
    (acc, item) => acc + item.product.priceKsh * item.quantity,
    0
  );
  const vatAmount = Math.round(subtotalKsh * 0.16);
  const netAmount = subtotalKsh - vatAmount;

  let txt = `================================================================================\n`;
  txt += `                       ROTO MOULDERS LIMITED                                   \n`;
  txt += `       Kenya's Leading Rotational Polyethylene Tank Manufacturers              \n`;
  txt += ` Enterprise Road, Industrial Area | P.O. Box 46143-00100 Nairobi, Kenya         \n`;
  txt += ` Hotline: +254 710 492 539 | Email: sales@rotomoulders.com                    \n`;
  txt += `================================================================================\n\n`;

  txt += `OFFICIAL SALES QUOTATION & PROFORMA ESTIMATE\n`;
  txt += `--------------------------------------------------------------------------------\n`;
  txt += `Quote Reference : ${ref}\n`;
  txt += `Date Issued     : ${dateStr}\n`;
  txt += `Status          : PENDING PROFORMA VERIFICATION\n\n`;

  txt += `CUSTOMER & DELIVERY SPECIFICATIONS:\n`;
  txt += `--------------------------------------------------------------------------------\n`;
  txt += `Customer Name   : ${customerInfo.name.trim() || 'Valued Customer'}\n`;
  txt += `Phone Number    : ${customerInfo.phone.trim() || 'Not specified'}\n`;
  txt += `Email Address   : ${customerInfo.email.trim() || 'Not specified'}\n`;
  txt += `County          : ${customerInfo.county || 'Nairobi'} County\n`;
  txt += `Sub-County      : ${customerInfo.subCounty || 'Westlands'} Sub-County\n`;
  txt += `Fulfillment     : ${customerInfo.deliveryMode === 'depot-delivery' ? 'Regional Depot Delivery' : 'Direct Factory Pick-up'}\n`;
  txt += `Warranty        : 10–15 Year Official Manufacturer Replacement Guarantee\n\n`;

  txt += `ITEMIZED PRODUCT ORDER BREAKDOWN:\n`;
  txt += `--------------------------------------------------------------------------------\n`;
  txt += `#   SKU          Product Description                   Qty   Color       Unit Price (KSh)   Subtotal (KSh)\n`;
  txt += `--------------------------------------------------------------------------------\n`;

  rfqItems.forEach((item, idx) => {
    const num = String(idx + 1).padEnd(3);
    const sku = item.product.sku.padEnd(12);
    const name = item.product.name.substring(0, 36).padEnd(38);
    const qty = String(item.quantity).padStart(3);
    const color = item.selectedColor.substring(0, 10).padEnd(11);
    const unitPrice = item.product.priceKsh.toLocaleString().padStart(16);
    const itemSubtotal = (item.product.priceKsh * item.quantity).toLocaleString().padStart(16);

    txt += `${num} ${sku} ${name} ${qty}   ${color} ${unitPrice} ${itemSubtotal}\n`;
    if (item.customFittingNotes) {
      txt += `    └─ Specs: ${item.customFittingNotes}\n`;
    }
  });

  txt += `--------------------------------------------------------------------------------\n\n`;

  txt += `FINANCIAL SUMMARY (VAT INCLUSIVE):\n`;
  txt += `--------------------------------------------------------------------------------\n`;
  txt += `Subtotal (VAT Exclusive)  : KSh ${netAmount.toLocaleString()}\n`;
  txt += `VAT (16% Included)        : KSh ${vatAmount.toLocaleString()}\n`;
  txt += `TOTAL AMOUNT PAYABLE      : KSh ${subtotalKsh.toLocaleString()}\n`;
  txt += `================================================================================\n\n`;

  if (customerInfo.notes && customerInfo.notes.trim()) {
    txt += `PLUMBING & SPECIAL FITTING INSTRUCTIONS:\n`;
    txt += `"${customerInfo.notes.trim()}"\n\n`;
  }

  txt += `TERMS & CONDITIONS:\n`;
  txt += `1. Quotation valid for 30 days. Prices subject to final site fitting confirmation.\n`;
  txt += `2. Deliveries subject to regional depot route scheduling and ground access.\n`;
  txt += `3. Official M-Pesa Paybill / Bank details provided upon sales call confirmation.\n`;
  txt += `4. Roto Moulders products comply with KEBS ISO 9001:2015 quality standards.\n\n`;

  txt += `Thank you for choosing Roto Moulders - "Made Heavier to Last Longer"\n`;
  txt += `================================================================================\n`;

  return txt;
};

/**
 * Downloads quotation as formatted TXT file
 */
export const downloadTXTQuote = (
  rfqItems: RFQItem[],
  customerInfo: CustomerQuoteInfo,
  quoteRef?: string
) => {
  const textContent = formatTXTQuote(rfqItems, customerInfo, quoteRef);
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const ref = quoteRef || `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
  link.href = url;
  link.download = `Roto_Moulders_Quotation_${ref}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Auto downloads both PDF & TXT quotes and optionally opens WhatsApp
 */
export const autoDownloadAndShareQuote = (
  rfqItems: RFQItem[],
  customerInfo: CustomerQuoteInfo,
  quoteRef?: string,
  options: {
    downloadPdf?: boolean;
    downloadTxt?: boolean;
    openWhatsapp?: boolean;
  } = { downloadPdf: true, downloadTxt: true, openWhatsapp: true }
) => {
  const ref = quoteRef || `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

  if (options.downloadPdf !== false) {
    downloadPDFQuote(rfqItems, customerInfo, ref);
  }

  if (options.downloadTxt !== false) {
    setTimeout(() => {
      downloadTXTQuote(rfqItems, customerInfo, ref);
    }, 250);
  }

  if (options.openWhatsapp !== false) {
    setTimeout(() => {
      openWhatsAppQuote(rfqItems, customerInfo, ref);
    }, 500);
  }
};
