import React, { useState } from 'react';
import { X, Percent, Check, ShoppingBag, Download, Phone, FileText, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface SaccoPriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRfqItem: (product: Product, quantity: number, color: string, customNotes?: string) => void;
}

interface SaccoItem {
  id: string;
  sku: string;
  category: string;
  capacityLiters: number;
  fitting: string;
  dimensionsCm: string;
  retailPrice: number;
  saccoPrice: number;
}

const SACCO_PRICE_LIST: SaccoItem[] = [
  // Cylindrical Vertical Tanks
  { id: 'sacco-vert-100', sku: 'RVT-100', category: 'Cylindrical Vertical Tanks', capacityLiters: 100, fitting: '1/2"', dimensionsCm: '50 × 64', retailPrice: 2655, saccoPrice: 1912 },
  { id: 'sacco-vert-250', sku: 'RVT-250', category: 'Cylindrical Vertical Tanks', capacityLiters: 250, fitting: '1/2"', dimensionsCm: '69 × 81', retailPrice: 4795, saccoPrice: 3452 },
  { id: 'sacco-vert-500', sku: 'RVT-500', category: 'Cylindrical Vertical Tanks', capacityLiters: 500, fitting: '1/2"', dimensionsCm: '87 × 99', retailPrice: 8365, saccoPrice: 6023 },
  { id: 'sacco-vert-1000', sku: 'RVT-1000', category: 'Cylindrical Vertical Tanks', capacityLiters: 1000, fitting: '3/4"', dimensionsCm: '110 × 125', retailPrice: 14885, saccoPrice: 10717 },
  { id: 'sacco-vert-2000', sku: 'RVT-2000', category: 'Cylindrical Vertical Tanks', capacityLiters: 2000, fitting: '1"', dimensionsCm: '139 × 152', retailPrice: 27820, saccoPrice: 20030 },
  { id: 'sacco-vert-2500', sku: 'RVT-2500', category: 'Cylindrical Vertical Tanks', capacityLiters: 2500, fitting: '1"', dimensionsCm: '148 × 165', retailPrice: 33235, saccoPrice: 23929 },
  { id: 'sacco-vert-3000', sku: 'RVT-3000', category: 'Cylindrical Vertical Tanks', capacityLiters: 3000, fitting: '1"', dimensionsCm: '153 × 181', retailPrice: 38985, saccoPrice: 28069 },
  { id: 'sacco-vert-4000', sku: 'RVT-4000', category: 'Cylindrical Vertical Tanks', capacityLiters: 4000, fitting: '1 1/2"', dimensionsCm: '172 × 193', retailPrice: 51975, saccoPrice: 37422 },
  { id: 'sacco-vert-5000', sku: 'RVT-5000', category: 'Cylindrical Vertical Tanks', capacityLiters: 5000, fitting: '1 1/2"', dimensionsCm: '185 × 210', retailPrice: 63135, saccoPrice: 45457 },
  { id: 'sacco-vert-6000', sku: 'RVT-6000', category: 'Cylindrical Vertical Tanks', capacityLiters: 6000, fitting: '1 1/2"', dimensionsCm: '200 × 217', retailPrice: 73830, saccoPrice: 53158 },
  { id: 'sacco-vert-8000', sku: 'RVT-8000', category: 'Cylindrical Vertical Tanks', capacityLiters: 8000, fitting: '2"', dimensionsCm: '220 × 242', retailPrice: 103465, saccoPrice: 74495 },
  { id: 'sacco-vert-10000', sku: 'RVT-10000', category: 'Cylindrical Vertical Tanks', capacityLiters: 10000, fitting: '2"', dimensionsCm: '235 × 265', retailPrice: 135145, saccoPrice: 97304 },
  { id: 'sacco-vert-12000', sku: 'RVT-12000', category: 'Cylindrical Vertical Tanks', capacityLiters: 12000, fitting: '2"', dimensionsCm: '247 × 288', retailPrice: 164150, saccoPrice: 118188 },
  { id: 'sacco-vert-15000', sku: 'RVT-15000', category: 'Cylindrical Vertical Tanks', capacityLiters: 15000, fitting: '2"', dimensionsCm: '260 × 315', retailPrice: 224250, saccoPrice: 161460 },
  { id: 'sacco-vert-24000', sku: 'RVT-24000', category: 'Cylindrical Vertical Tanks', capacityLiters: 24000, fitting: '2"', dimensionsCm: '310 × 350', retailPrice: 412850, saccoPrice: 297252 },

  // Horizontal Baffled Transport Tanks
  { id: 'sacco-horiz-500', sku: 'RHT-500', category: 'Horizontal Transport Tanks', capacityLiters: 500, fitting: '3/4"', dimensionsCm: '105 × 85 × 80', retailPrice: 12500, saccoPrice: 9000 },
  { id: 'sacco-horiz-1000', sku: 'RHT-1000', category: 'Horizontal Transport Tanks', capacityLiters: 1000, fitting: '1"', dimensionsCm: '150 × 105 × 95', retailPrice: 24800, saccoPrice: 17856 },
  { id: 'sacco-horiz-2000', sku: 'RHT-2000', category: 'Horizontal Transport Tanks', capacityLiters: 2000, fitting: '1 1/2"', dimensionsCm: '190 × 125 × 115', retailPrice: 44500, saccoPrice: 32040 },
  { id: 'sacco-horiz-3000', sku: 'RHT-3000', category: 'Horizontal Transport Tanks', capacityLiters: 3000, fitting: '2"', dimensionsCm: '220 × 140 × 135', retailPrice: 58000, saccoPrice: 41760 },

  // Underground & Septic Tanks
  { id: 'sacco-septic-2000', sku: 'RUG-2000', category: 'Underground & Bio-Septic Tanks', capacityLiters: 2000, fitting: '4" Socket', dimensionsCm: '160 × 180', retailPrice: 38000, saccoPrice: 27360 },
  { id: 'sacco-septic-3000', sku: 'RUG-3000', category: 'Underground & Bio-Septic Tanks', capacityLiters: 3000, fitting: '4" Socket', dimensionsCm: '180 × 200', retailPrice: 52000, saccoPrice: 37440 },
  { id: 'sacco-septic-5000', sku: 'RUG-5000', category: 'Underground & Bio-Septic Tanks', capacityLiters: 5000, fitting: '4" Socket', dimensionsCm: '195 × 240', retailPrice: 75000, saccoPrice: 54000 },
];

export const SaccoPriceListModal: React.FC<SaccoPriceListModalProps> = ({
  isOpen,
  onClose,
  onAddRfqItem,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'all' | 'Cylindrical Vertical Tanks' | 'Horizontal Transport Tanks' | 'Underground & Bio-Septic Tanks'>('all');
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filteredItems = SACCO_PRICE_LIST.filter(
    item => activeTab === 'all' || item.category === activeTab
  );

  const handleOrderSaccoItem = (item: SaccoItem) => {
    const mockProduct: Product = {
      id: item.id,
      sku: item.sku,
      name: `Roto Tank ${item.capacityLiters.toLocaleString()} Litres (UN SACCO Member Discount)`,
      category: 'vertical',
      capacityLiters: item.capacityLiters,
      capacityGallons: Math.round(item.capacityLiters * 0.22),
      priceKsh: item.saccoPrice,
      dimensions: { manholeDiameterMm: 450, wallThicknessMm: 7 },
      material: '100% Virgin Food-Grade LLDPE',
      warrantyYears: 10,
      colorOptions: ['Roto Blue', 'Eco Green', 'Black'],
      features: ['28% UN SACCO Member Discount Applied', 'Pre-fitted brass outlet'],
      applications: ['Water Storage', 'SACCO Member Delivery'],
      image: '/src/assets/images/roto_tank_hero_1785146455759.jpg',
      badge: '28% OFF',
      inStock: true,
      fittingSizes: [item.fitting]
    };

    onAddRfqItem(mockProduct, 1, 'Roto Blue', `UN SACCO Member Discount Rate applied: KShs ${item.saccoPrice.toLocaleString()}`);
    setAddedIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== item.id));
    }, 1500);
  };

  const handleDownloadPdf = () => {
    let csvContent = "UN DT SACCO - ROTO MOULDERS LIMITED 28% DISCOUNTED PRICE LIST\n";
    csvContent += "Category,SKU,Capacity (L),Outlet Fitting,Dimensions (Dia x Ht cm),Retail Price (KShs),28% SACCO Price (KShs)\n";
    SACCO_PRICE_LIST.forEach(item => {
      csvContent += `"${item.category}","${item.sku}",${item.capacityLiters},"${item.fitting}","${item.dimensionsCm}",${item.retailPrice},${item.saccoPrice}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'UN_SACCO_Roto_Moulders_Discount_Price_List.csv';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border-4 border-yellow-400 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* SACCO Header Banner */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-red-600 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 text-black font-extrabold rounded-full text-xs uppercase tracking-wider mb-2">
              <Percent className="w-3.5 h-3.5 text-red-700" />
              <span>OFFICIAL UN DT SACCO PARTNERSHIP</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              UN DT SACCO & ROTO MOULDERS DISCOUNTED PRICE LIST
            </h2>
            <p className="text-xs text-yellow-300 font-semibold mt-1">
              Guaranteed 28% Member Discount on all genuine Roto Water Tanks & Products
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleDownloadPdf}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Price Sheet</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'all', label: 'All Sacco Items' },
            { id: 'Cylindrical Vertical Tanks', label: 'Vertical Tanks' },
            { id: 'Horizontal Transport Tanks', label: 'Horizontal Transport' },
            { id: 'Underground & Bio-Septic Tanks', label: 'Underground Septic' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-black text-[11px] uppercase tracking-wider">
                  <th className="p-3 border-b border-slate-800">Capacity & SKU</th>
                  <th className="p-3 border-b border-slate-800">Fitting Size</th>
                  <th className="p-3 border-b border-slate-800 hidden sm:table-cell">Dia × Ht (cm)</th>
                  <th className="p-3 border-b border-slate-800 text-slate-400">Retail Price</th>
                  <th className="p-3 border-b border-slate-800 bg-yellow-400 text-black font-extrabold text-center">28% SACCO Price</th>
                  <th className="p-3 border-b border-slate-800 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredItems.map((item) => {
                  const isAdded = addedIds.includes(item.id);
                  const savings = item.retailPrice - item.saccoPrice;

                  return (
                    <tr key={item.id} className="hover:bg-yellow-50/60 transition-colors font-medium">
                      <td className="p-3">
                        <div className="font-extrabold text-slate-900">{item.capacityLiters.toLocaleString()} Litres</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.sku} • {item.category}</div>
                      </td>
                      <td className="p-3 text-slate-700 font-semibold">{item.fitting} Brass Outlet</td>
                      <td className="p-3 text-slate-600 hidden sm:table-cell">{item.dimensionsCm} cm</td>
                      <td className="p-3 text-slate-500 line-through">
                        KShs {item.retailPrice.toLocaleString()}
                      </td>
                      <td className="p-3 bg-yellow-100 font-black text-red-600 text-sm text-center">
                        KShs {item.saccoPrice.toLocaleString()}
                        <div className="text-[10px] text-emerald-700 font-bold">Save KShs {savings.toLocaleString()}</div>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleOrderSaccoItem(item)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 mx-auto cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Order Rate</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
            <span>Prices include 16% VAT & 10–15 Year Warranty. Free pickup at Nairobi Enterprise Rd Factory or Branch Depots.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-yellow-400 text-black font-extrabold rounded-xl hover:bg-yellow-300 transition-colors cursor-pointer ml-auto"
          >
            Close Price List
          </button>
        </div>

      </div>
    </div>
  );
};
