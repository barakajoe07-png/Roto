import React, { useState } from 'react';
import { RFQItem } from '../types';
import { X, Trash2, CheckCircle, FileText, ShoppingBag, Send, MapPin, Download, Printer, Compass, MessageCircle, FileCode } from 'lucide-react';
import { KENYA_COUNTIES } from '../data/kenyaCounties';
import { CustomSelect } from './CustomSelect';
import { downloadPDFQuote, downloadTXTQuote, openWhatsAppQuote, autoDownloadAndShareQuote, CustomerQuoteInfo } from '../utils/quoteHelpers';

interface RFQCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfqItems: RFQItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const RFQCartModal: React.FC<RFQCartModalProps> = ({
  isOpen,
  onClose,
  rfqItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // County & Sub-county state (Defaults to Nairobi City -> Westlands)
  const [selectedCounty, setSelectedCounty] = useState('Nairobi City');
  const [selectedSubCounty, setSelectedSubCounty] = useState('Westlands');
  
  const [deliveryMode, setDeliveryMode] = useState<'factory-pickup' | 'depot-delivery'>('depot-delivery');
  const [customNotes, setCustomNotes] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRfq, setSubmittedRfq] = useState<{
    reference: string;
    submittedAt: string;
  } | null>(null);

  // Find subcounties for selected county
  const currentCountyObj = KENYA_COUNTIES.find(c => c.name === selectedCounty) || KENYA_COUNTIES[46];
  const subCountiesList = currentCountyObj ? currentCountyObj.subCounties : [];

  const handleCountyChange = (countyName: string) => {
    setSelectedCounty(countyName);
    const countyObj = KENYA_COUNTIES.find(c => c.name === countyName);
    if (countyObj && countyObj.subCounties.length > 0) {
      setSelectedSubCounty(countyObj.subCounties[0]);
    } else {
      setSelectedSubCounty('');
    }
  };

  // Helper for Kenyan Phone validation
  const isKenyanPhoneValid = (p: string) => {
    const clean = p.replace(/\s+/g, '').replace(/-/g, '');
    return /^(?:\+?254|0)(?:7|1)\d{8}$/.test(clean);
  };

  const formattedLocation = `${selectedCounty} County, ${selectedSubCounty} Sub-County`;

  const subtotalKsh = rfqItems.reduce(
    (acc, item) => acc + item.product.priceKsh * item.quantity,
    0
  );

  const customerData: CustomerQuoteInfo = {
    name: customerName,
    phone,
    email,
    county: selectedCounty,
    subCounty: selectedSubCounty,
    deliveryMode,
    notes: customNotes,
  };

  const handleDownloadPDF = (ref?: string) => {
    if (rfqItems.length === 0) return;
    downloadPDFQuote(rfqItems, customerData, ref || submittedRfq?.reference);
  };

  const handleDownloadTXT = (ref?: string) => {
    if (rfqItems.length === 0) return;
    downloadTXTQuote(rfqItems, customerData, ref || submittedRfq?.reference);
  };

  const handleOpenWhatsApp = (ref?: string) => {
    if (rfqItems.length === 0) return;
    openWhatsAppQuote(rfqItems, customerData, ref || submittedRfq?.reference);
  };

  // Auto Download (.PDF & .TXT) + Forward to WhatsApp when clearing cart
  const handleClearCartWithAutoShare = (mode: 'auto-save-and-clear' | 'clear-only') => {
    if (rfqItems.length > 0 && mode === 'auto-save-and-clear') {
      autoDownloadAndShareQuote(rfqItems, customerData, undefined, {
        downloadPdf: true,
        downloadTxt: true,
        openWhatsapp: true,
      });
    }
    onClearCart();
    setShowClearConfirm(false);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rfqItems.length === 0) return;

    setIsSubmitting(true);
    const generatedRef = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await fetch('/api/quotes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName,
          phone,
          email,
          county: selectedCounty,
          subCounty: selectedSubCounty,
          location: formattedLocation,
          deliveryMode,
          items: rfqItems.map(i => ({
            sku: i.product.sku,
            name: i.product.name,
            quantity: i.quantity,
            color: i.selectedColor,
            priceKsh: i.product.priceKsh,
            notes: i.customFittingNotes
          })),
          customNotes
        })
      });

      const data = await response.json();
      const finalRef = data.success ? data.rfqReference : generatedRef;

      setSubmittedRfq({
        reference: finalRef,
        submittedAt: data.submittedAt || new Date().toISOString()
      });

      // Automatically trigger PDF & TXT downloads + forward prefilled quote to WhatsApp
      autoDownloadAndShareQuote(rfqItems, customerData, finalRef, {
        downloadPdf: true,
        downloadTxt: true,
        openWhatsapp: true,
      });

    } catch (err) {
      console.error("Quote submission error", err);
      setSubmittedRfq({
        reference: generatedRef,
        submittedAt: new Date().toISOString()
      });
      
      // Fallback auto download & WhatsApp
      autoDownloadAndShareQuote(rfqItems, customerData, generatedRef, {
        downloadPdf: true,
        downloadTxt: true,
        openWhatsapp: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintQuotation = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-800 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Sleek Header */}
        <div className="px-5 py-4 bg-slate-950/90 text-white flex items-center justify-between shrink-0 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600/90 rounded-xl flex items-center justify-center text-white shadow-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">Sales Quotation Request</h2>
              <p className="text-xs text-slate-400 font-normal">{rfqItems.length} Product{rfqItems.length !== 1 ? 's' : ''} Selected • <span className="text-slate-200 font-semibold">KSh {subtotalKsh.toLocaleString()}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {submittedRfq ? (
            /* Submission Success View */
            <div className="text-center py-6 sm:py-8 space-y-5">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Quotation Submitted & Processed</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Quote Ref: <span className="text-amber-400 font-mono">{submittedRfq.reference}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 max-w-md mx-auto font-normal leading-relaxed">
                  Thank you, <strong className="text-white">{customerName || 'Valued Customer'}</strong>. Your quotation request has been processed.
                </p>
              </div>

              {/* PDF Downloads Folder Notification Banner */}
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 max-w-lg mx-auto text-left text-xs text-emerald-200 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-emerald-300 mb-0.5">PDF Saved to Your Downloads Folder</h4>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed font-normal">
                    A copy of your official sales quotation PDF (<strong className="text-white">{submittedRfq.reference}.pdf</strong>) has been downloaded directly to your device's <strong>Downloads</strong> folder. The quote text was also forwarded to WhatsApp Sales.
                  </p>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-left max-w-lg mx-auto space-y-2 text-xs text-slate-300 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between font-semibold text-slate-200 pb-2 border-b border-slate-800 gap-1">
                  <span>Customer: {customerName || 'Valued Customer'}</span>
                  <span>Phone: {phone || 'N/A'}</span>
                </div>
                <div className="text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                  Location: <span className="text-slate-200">{selectedCounty} County — {selectedSubCounty}</span> ({deliveryMode === 'depot-delivery' ? 'Depot Delivery' : 'Factory Pick-up'})
                </div>
                <div className="space-y-1 pt-1">
                  {rfqItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-slate-300">
                      <span>{item.quantity}x {item.product.name} ({item.selectedColor})</span>
                      <span className="font-medium text-slate-100 font-mono">KSh {(item.product.priceKsh * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2.5 border-t border-slate-800 flex justify-between font-bold text-sm text-amber-400">
                  <span>Total Amount (VAT Incl):</span>
                  <span>KSh {subtotalKsh.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => handleDownloadPDF()}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={() => handleDownloadTXT()}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download .TXT</span>
                </button>

                <button
                  onClick={() => handleOpenWhatsApp()}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send to WhatsApp</span>
                </button>

                <button
                  onClick={handlePrintQuotation}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  onClick={() => {
                    onClearCart();
                    setSubmittedRfq(null);
                    onClose();
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-950 text-slate-200 font-semibold text-xs rounded-lg border border-slate-800 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : rfqItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 bg-slate-800/80 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">Your Quote List is Empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto font-normal">
                Browse our water tanks, chemical storage, or septic products and click "Add Quote" to calculate price estimates.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 cursor-pointer transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            /* Cart Items & Form */
            <div className="space-y-5">
              
              {/* Clean Selected Tank Items Bar */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Selected Products ({rfqItems.length})</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadPDF()}
                      className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-md border border-slate-700/80 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3 h-3 text-red-400" />
                      <span>.PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadTXT()}
                      className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-md border border-slate-700/80 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Download .TXT"
                    >
                      <FileCode className="w-3 h-3 text-amber-400" />
                      <span>.TXT</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenWhatsApp()}
                      className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-medium rounded-md border border-emerald-500/30 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Share via WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-400" />
                      <span>WhatsApp</span>
                    </button>

                    {!showClearConfirm ? (
                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(true)}
                        className="text-xs text-slate-400 hover:text-red-400 font-medium px-2 py-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
                        <span className="text-slate-300 font-medium text-[11px]">Clear cart?</span>
                        <button
                          type="button"
                          onClick={() => handleClearCartWithAutoShare('auto-save-and-clear')}
                          className="text-amber-400 hover:underline font-semibold text-[11px] cursor-pointer"
                          title="Auto-download quote files and share to WhatsApp before clearing"
                        >
                          Auto-Save & Clear
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                          type="button"
                          onClick={() => handleClearCartWithAutoShare('clear-only')}
                          className="text-red-400 hover:underline font-semibold text-[11px] cursor-pointer"
                        >
                          Clear Only
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowClearConfirm(false)}
                          className="text-slate-500 hover:text-slate-300 text-[11px] cursor-pointer ml-1"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product List */}
                <div className="divide-y divide-slate-800/80 border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40">
                  {rfqItems.map((item) => (
                    <div key={item.product.id} className="p-3 sm:p-3.5 flex items-center justify-between gap-3 hover:bg-slate-900/50 transition-colors">
                      
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-contain bg-slate-900 p-1 rounded-lg shrink-0 border border-slate-800"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{item.product.name}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className="font-mono text-slate-400">SKU: {item.product.sku}</span>
                            <span>•</span>
                            <span className="text-slate-300 font-medium">Color: {item.selectedColor}</span>
                          </div>
                          {item.customFittingNotes && (
                            <p className="text-[11px] text-amber-400/90 truncate mt-0.5">Note: {item.customFittingNotes}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900 overflow-hidden text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800 font-bold transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 font-bold text-slate-200">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800 font-bold transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <p className="text-xs font-bold text-slate-100 font-mono">
                            KSh {(item.product.priceKsh * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">KSh {item.product.priceKsh.toLocaleString()} ea</p>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Contact & Delivery Form */}
              <form onSubmit={handleSubmitQuote} className="bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4 text-white">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-red-500" />
                    <span>Customer & Delivery Specification</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Official Proforma Estimate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Mutua"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-slate-500 font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                      <span>Phone Number *</span>
                      {phone && isKenyanPhoneValid(phone) && (
                        <span className="text-[10px] text-emerald-400 font-semibold">Valid</span>
                      )}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0710 492 539 or +254 7XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-3 py-2 bg-slate-900 border rounded-lg text-xs text-white focus:outline-none placeholder-slate-500 font-mono ${
                        phone ? (isKenyanPhoneValid(phone) ? 'border-emerald-500/80' : 'border-amber-500/80') : 'border-slate-800 focus:border-red-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. samuel@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-slate-500 font-normal"
                    />
                  </div>

                  {/* County Custom Selector */}
                  <div>
                    <CustomSelect
                      label="County (47 Counties) *"
                      icon={<MapPin className="w-3.5 h-3.5 text-red-500" />}
                      value={selectedCounty}
                      onChange={(val) => handleCountyChange(val)}
                      searchable={true}
                      options={KENYA_COUNTIES.map((c) => ({
                        value: c.name,
                        label: `${String(c.code).padStart(2, '0')}. ${c.name} County`,
                        badge: `Code ${c.code}`,
                        description: `${c.subCounties.length} Sub-Counties`,
                      }))}
                    />
                  </div>

                  {/* Sub-County Custom Selector */}
                  <div className="sm:col-span-2">
                    <CustomSelect
                      label={`Sub-County / Location (${selectedCounty}) *`}
                      icon={<Compass className="w-3.5 h-3.5 text-amber-400" />}
                      value={selectedSubCounty}
                      onChange={(val) => setSelectedSubCounty(val)}
                      searchable={subCountiesList.length > 5}
                      options={subCountiesList.map((sc) => ({
                        value: sc,
                        label: `${sc} Sub-County`,
                        description: `${selectedCounty} County`,
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Fulfillment Option:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('depot-delivery')}
                      className={`p-2.5 rounded-lg border text-left font-medium transition-all cursor-pointer ${
                        deliveryMode === 'depot-delivery'
                          ? 'bg-red-950/40 text-white border-red-600/80 shadow-xs'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <span>🚛 Regional Depot Delivery</span>
                      </div>
                      <span className="block text-[11px] text-slate-400 font-normal mt-0.5">
                        Delivered to nearest Roto branch in {selectedCounty}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('factory-pickup')}
                      className={`p-2.5 rounded-lg border text-left font-medium transition-all cursor-pointer ${
                        deliveryMode === 'factory-pickup'
                          ? 'bg-red-950/40 text-white border-red-600/80 shadow-xs'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <span>🏢 Direct Factory Pick-up</span>
                      </div>
                      <span className="block text-[11px] text-slate-400 font-normal mt-0.5">
                        Collect directly at Roto Factory Off Enterprise Rd, Nairobi
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Special Plumbing / Fitting Notes:</label>
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. Include 2-inch gate valves, overflow fittings, or delivery landmarks"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-slate-500 font-normal"
                  />
                </div>

                {/* Subtotal Display & Submit */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-normal">Total Payable (16% VAT Incl):</span>
                    <p className="text-xl font-bold text-amber-400 font-mono">
                      KSh {subtotalKsh.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleDownloadPDF()}
                      className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-700/80"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-red-400" />
                      <span>PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadTXT()}
                      className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-700/80"
                      title="Download TXT"
                    >
                      <FileCode className="w-3.5 h-3.5 text-amber-400" />
                      <span>TXT</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-initial px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                          <span>Submit Quote & WhatsApp</span>
                          <Send className="w-3 h-3 text-amber-300" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
