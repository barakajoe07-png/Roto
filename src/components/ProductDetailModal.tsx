import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, ShoppingBag, Check, Layers, Droplets, Info, FileText, Wrench, Download, Sparkles, Percent } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddRfqItem: (product: Product, quantity: number, color: string, customNotes?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddRfqItem,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0] || 'Roto Blue');
  const [quantity, setQuantity] = useState(1);
  const [selectedFitting, setSelectedFitting] = useState(product.fittingSizes[0] || '1 inch');
  const [customNotes, setCustomNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'installation' | 'warranty'>('specs');

  const handleAddToCart = () => {
    const fullNotes = `Fitting Size: ${selectedFitting}. ${customNotes}`.trim();
    onAddRfqItem(product, quantity, selectedColor, fullNotes);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleDownloadSpecSheet = () => {
    const specContent = `
ROTO MOULDERS LIMITED - OFFICIAL PRODUCT SPECIFICATION SHEET
===============================================================
Product: ${product.name}
SKU: ${product.sku}
Capacity: ${product.capacityLiters.toLocaleString()} Litres (${product.capacityGallons} Gallons)
Estimated Price: KSh ${product.priceKsh.toLocaleString()}

DIMENSIONS & WEIGHT
-------------------
Diameter: ${product.dimensions.diameterMm ? product.dimensions.diameterMm + ' mm' : 'N/A'}
Height: ${product.dimensions.heightMm ? product.dimensions.heightMm + ' mm' : 'N/A'}
Length: ${product.dimensions.lengthMm ? product.dimensions.lengthMm + ' mm' : 'N/A'}
Width: ${product.dimensions.widthMm ? product.dimensions.widthMm + ' mm' : 'N/A'}
Manhole Diameter: ${product.dimensions.manholeDiameterMm} mm
Nominal Wall Thickness: ${product.dimensions.wallThicknessMm} mm

MATERIAL & CERTIFICATIONS
-------------------------
Material: ${product.material}
Warranty: ${product.warrantyYears} Years Manufacturer Replacement Warranty
Food Safety: FDA 21 CFR 177.1520 Food Grade Compliant
UV Protection: UV-20 Tropical Grade Anti-Degradation Additive

KEY FEATURES
------------
${product.features.map(f => '- ' + f).join('\n')}

APPLICATIONS
------------
${product.applications.map(a => '- ' + a).join('\n')}

Roto Moulders Sales Hotline: +254 710 492 539 | online@rotomoulders.com
Enterprise Road, Industrial Area, Nairobi, Kenya
`;
    const blob = new Blob([specContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RotoTanks_${product.sku}_Spec_Sheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-800 text-slate-100 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start leading-none">
              <span className="text-2xl font-black text-white tracking-tighter font-mono uppercase">
                ROTO
              </span>
              <span className="text-[10px] font-black text-white tracking-widest uppercase bg-red-600 px-1 py-0.2 rounded-xs mt-0.5">
                TANKS
              </span>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">SKU: {product.sku}</span>
              <h2 className="text-lg font-bold text-white leading-tight uppercase tracking-tight">{product.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Image & Download Spec Sheet */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-slate-950 rounded-2xl p-6 h-64 flex items-center justify-center relative border border-slate-800/80 shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  HOT ITEM
                </span>
                <span className="absolute bottom-3 right-3 bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-800">
                  {product.warrantyYears}-Year Warranty
                </span>
              </div>

              {/* Price Tag */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center shadow-inner">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Retail List Price (16% VAT Incl)</span>
                <p className="text-3xl font-black text-amber-400 mt-1">
                  KSh {product.priceKsh.toLocaleString()}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-red-950 border border-red-800 text-red-200 font-bold text-xs rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Official Factory Rate</span>
                </div>
              </div>

              <button
                onClick={handleDownloadSpecSheet}
                className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-800 cursor-pointer"
              >
                <Download className="w-4 h-4 text-red-500" />
                <span>Download Tech Spec Sheet</span>
              </button>
            </div>

            {/* Right Column: Options & Specifications */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-800 gap-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 border-b-2 transition-colors cursor-pointer uppercase tracking-wider ${
                    activeTab === 'specs' ? 'border-red-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  onClick={() => setActiveTab('installation')}
                  className={`pb-2.5 border-b-2 transition-colors cursor-pointer uppercase tracking-wider ${
                    activeTab === 'installation' ? 'border-red-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Foundation & Installation
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`pb-2.5 border-b-2 transition-colors cursor-pointer uppercase tracking-wider ${
                    activeTab === 'warranty' ? 'border-red-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Quality Standards
                </button>
              </div>

              {activeTab === 'specs' && (
                <div className="space-y-4 text-xs">
                  {/* Grid Specs */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                    <div>
                      <span className="text-slate-400 font-medium block text-[11px]">Total Capacity:</span>
                      <p className="font-bold text-white text-xs mt-0.5">{product.capacityLiters.toLocaleString()} Litres ({product.capacityGallons} Gal)</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block text-[11px]">Wall Thickness:</span>
                      <p className="font-bold text-white text-xs mt-0.5">{product.dimensions.wallThicknessMm} mm Nominal</p>
                    </div>
                    {product.dimensions.diameterMm && (
                      <div>
                        <span className="text-slate-400 font-medium block text-[11px]">Diameter:</span>
                        <p className="font-bold text-white text-xs mt-0.5">{product.dimensions.diameterMm} mm</p>
                      </div>
                    )}
                    {product.dimensions.heightMm && (
                      <div>
                        <span className="text-slate-400 font-medium block text-[11px]">Height:</span>
                        <p className="font-bold text-white text-xs mt-0.5">{product.dimensions.heightMm} mm</p>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-400 font-medium block text-[11px]">Manhole Lid Size:</span>
                      <p className="font-bold text-white text-xs mt-0.5">{product.dimensions.manholeDiameterMm} mm Threaded</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block text-[11px]">Material Grade:</span>
                      <p className="font-bold text-white text-xs mt-0.5">Virgin LLDPE (UV20)</p>
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Select Color Variant:</label>
                    <div className="flex flex-wrap gap-2">
                      {product.colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            selectedColor === color
                              ? 'bg-red-600 text-white border-red-600 shadow-md'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fitting Size Selection */}
                  {product.fittingSizes.length > 0 && (
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Pre-moulded Outlet Fitting Size:</label>
                      <div className="flex flex-wrap gap-2">
                        {product.fittingSizes.map((fit) => (
                          <button
                            key={fit}
                            type="button"
                            onClick={() => setSelectedFitting(fit)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              selectedFitting === fit
                                ? 'bg-amber-400 text-slate-950 border-amber-400'
                                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                            }`}
                          >
                            {fit} Brass Fitting
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Notes / Delivery instructions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Custom Delivery / Site Notes:</label>
                    <input
                      type="text"
                      placeholder="e.g. Delivery to Nakuru farm site, require extra 2-inch overflow"
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-red-500 font-medium placeholder-slate-500 transition-all shadow-inner"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'installation' && (
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">Site Preparation Guidelines</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-300 font-normal">
                    <li>Foundation must be a smooth, flat, level concrete slab (minimum 100mm reinforced concrete).</li>
                    <li>Do NOT support tank on timber joists with gaps greater than 50mm.</li>
                    <li>Ensure flexible hose couplings are fitted between the tank valve and rigid plumbing pipes to prevent structural stress during thermal expansion.</li>
                    <li>For underground tanks, backfill with compacted ballast/sand mix as specified in the Roto Underground installation manual.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'warranty' && (
                <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
                  <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                    <span>Roto Moulders 10–15 Year Guarantee</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-normal">
                    All genuine Roto Moulders tanks are molded with an engraved serial batch number near the manhole rim. Under proper installation, Roto Moulders guarantees full replacement against structural cracking, manufacturing flaws, or UV degradation.
                  </p>
                  <p className="text-slate-400 font-medium">
                    Complies with KEBS KS ISO 9001:2015 standards and FDA Regulation 21 CFR 177.1520 for potable drinking water storage.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity:</span>
            <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden shadow-inner">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-white hover:bg-slate-800 font-bold transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-3 py-1.5 text-xs font-bold text-amber-400">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-white hover:bg-slate-800 font-bold transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleAddToCart}
              className={`px-6 py-2.5 rounded-xl font-extrabold text-xs text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider ${
                isAdded ? 'bg-emerald-600 shadow-emerald-600/40' : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-red-600/30'
              }`}
            >
              {isAdded ? (
                <div
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Quote List!</span>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity} to Official Quote</span>
                </div>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

