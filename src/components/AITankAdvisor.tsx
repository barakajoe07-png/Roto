import React, { useState } from 'react';
import { Sparkles, Calculator, Droplets, ArrowRight, CheckCircle, ShieldCheck, RefreshCw, ShoppingBag, Info, Percent, Building, MapPin } from 'lucide-react';
import { TankAdvisorInput, AdvisorRecommendation, Product } from '../types';
import { CustomSelect } from './CustomSelect';

interface AITankAdvisorProps {
  onAddRfqItem: (product: Product, quantity: number, color: string) => void;
  products: Product[];
}

export const AITankAdvisor: React.FC<AITankAdvisorProps> = ({ onAddRfqItem, products }) => {
  const [input, setInput] = useState<TankAdvisorInput>({
    applicationType: 'residential',
    occupants: 6,
    roofAreaM2: 120,
    livestockCount: 0,
    chemicalType: 'Potable Water',
    locationRegion: 'Nairobi / Central Kenya',
    additionalNotes: 'Need reliable water storage for 2-week dry spells and rainwater harvesting.',
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AdvisorRecommendation | null>(null);
  const [source, setSource] = useState<string>('');

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation(null);

    try {
      const response = await fetch('/api/ai/tank-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
        setSource(data.source || 'gemini');
      }
    } catch (err) {
      console.error('Advisor error:', err);
      // Local fallback calculation if API unreachable
      setRecommendation({
        recommendedCapacityLiters: input.occupants * 150 * 14,
        recommendedModels: [
          { name: "Roto Vertical Cylindrical Heavy Duty Tank 5,000 Litres", sku: "RVT-5000", dimensions: "1,850mm D x 2,100mm H", priceKsh: 45457, highlights: "100% Food grade UV-stabilized virgin LLDPE" },
          { name: "Roto Vertical Cylindrical Tank 2,500 Litres", sku: "RVT-2500", dimensions: "1,480mm D x 1,650mm H", priceKsh: 23929, highlights: "Compact footprint for domestic yard" }
        ],
        harvestingPotentialLitersPerYear: Math.round((input.roofAreaM2 || 100) * 850 * 0.8),
        advisorSummary: "Based on an average daily per-capita consumption of 150L in East Africa, a 5,000L vertical Roto tank combined with an auxiliary 2,500L rainwater tank will ensure continuous water security.",
        tips: [
          "Install a first-flush diverter to keep organic gutter leaf debris out of the tank.",
          "Place tank on a level 100mm reinforced concrete slab.",
          "Use flexible hose couplings at tank outlet fittings."
        ]
      });
      setSource('local');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecommendedToQuote = (sku: string) => {
    const matchedProduct = products.find((p) => p.sku === sku) || products[0];
    onAddRfqItem(matchedProduct, 1, matchedProduct.colorOptions[0]);
  };

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold rounded-full text-xs uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>AI Tank Capacity & Sizing Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Engineering Storage Recommendation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Powered by Gemini AI. Input your household, agricultural, or commercial specs to calculate exact water storage requirements & rainwater harvesting potential.
          </p>
        </div>

        {/* Input Form & Report Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <form onSubmit={handleCalculate} className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-slate-800/80 shadow-2xl shadow-slate-950/80 space-y-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Project Parameters</span>
            </h3>

            {/* Application Type Custom Dropdown */}
            <div>
              <CustomSelect
                label="Application Type:"
                icon={<Building className="w-4 h-4 text-amber-400" />}
                value={input.applicationType}
                onChange={(val) => setInput({ ...input, applicationType: val as any })}
                dark={true}
                options={[
                  { value: 'residential', label: 'Residential Household Water', description: 'Domestic water storage' },
                  { value: 'agricultural', label: 'Farm & Livestock Watering', description: 'Cattle, irrigation & poultry' },
                  { value: 'commercial', label: 'Apartments / Schools / Office', description: 'Multi-family & commercial buildings' },
                  { value: 'industrial', label: 'Industrial Chemical & Acid', description: 'Heavy duty thick-wall tanks' },
                  { value: 'rainwater', label: 'Rainwater Harvesting Primary', description: 'Roof catchment storage' },
                ]}
              />
            </div>

            {/* Occupants / Household count */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Occupants / Family Members:</label>
              <input
                type="number"
                min="1"
                max="5000"
                value={input.occupants}
                onChange={(e) => setInput({ ...input, occupants: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
              />
            </div>

            {/* Roof catchment area in m² */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Roof Catchment Area (m²):</label>
              <input
                type="number"
                min="0"
                max="50000"
                value={input.roofAreaM2}
                onChange={(e) => setInput({ ...input, roofAreaM2: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Used for calculating annual rainwater collection yield</span>
            </div>

            {/* Region Custom Dropdown */}
            <div>
              <CustomSelect
                label="Location / Rainfall Zone:"
                icon={<MapPin className="w-4 h-4 text-red-500" />}
                value={input.locationRegion}
                onChange={(val) => setInput({ ...input, locationRegion: val })}
                dark={true}
                options={[
                  { value: 'Nairobi / Central Kenya', label: 'Nairobi / Central Kenya', description: 'High Rainfall Region' },
                  { value: 'Coast / Mombasa', label: 'Mombasa / Coastal Region', description: 'Saline Water / Tropical Heat' },
                  { value: 'Rift Valley / Nakuru', label: 'Rift Valley / Nakuru / Eldoret', description: 'Agricultural & Highland' },
                  { value: 'Western / Kisumu', label: 'Western Kenya / Kisumu Lake Basin', description: 'High Humidity / Bimodal Rain' },
                  { value: 'Northern Kenya / ASAL', label: 'Northern / ASAL Region', description: 'Extended Drought Storage' },
                  { value: 'Tanzania / Arusha', label: 'Tanzania / Arusha / Dar es Salaam', description: 'East Africa Cross-Border' },
                  { value: 'Uganda / Kampala', label: 'Uganda / Kampala Hub', description: 'East Africa Cross-Border' },
                ]}
              />
            </div>

            {/* Additional Specs */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Special Requirements / Notes:</label>
              <textarea
                rows={2}
                value={input.additionalNotes}
                onChange={(e) => setInput({ ...input, additionalNotes: e.target.value })}
                placeholder="e.g. Need underground tank due to small yard, or chemical resistance for fertilizer"
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs text-white focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing Project with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Calculate Recommended Capacity</span>
                </>
              )}
            </button>
          </form>

          {/* Results Side */}
          <div className="lg:col-span-7 space-y-6">
            {loading && (
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 sm:p-7 shadow-2xl space-y-6 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                  </div>
                  <div>
                    <div className="h-4 w-48 bg-slate-800 rounded-md mb-1.5"></div>
                    <div className="h-3 w-32 bg-slate-800/60 rounded-md"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                    <div className="h-3 w-28 bg-amber-400/20 rounded-md"></div>
                    <div className="h-8 w-36 bg-slate-800 rounded-md"></div>
                    <div className="h-3 w-40 bg-slate-800/50 rounded-md"></div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                    <div className="h-3 w-28 bg-emerald-400/20 rounded-md"></div>
                    <div className="h-8 w-36 bg-slate-800 rounded-md"></div>
                    <div className="h-3 w-40 bg-slate-800/50 rounded-md"></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="h-3 w-48 bg-amber-400/30 rounded-md"></div>
                  <div className="h-3 w-full bg-slate-800/60 rounded-md"></div>
                  <div className="h-3 w-5/6 bg-slate-800/60 rounded-md"></div>
                </div>
              </div>
            )}

            {!recommendation && !loading && (
              <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-10 text-center space-y-3 shadow-2xl">
                <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                  <Droplets className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Ready to calculate your capacity</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-normal leading-relaxed">
                  Adjust the parameters on the left and click calculate to receive a custom engineering recommendation and matching Roto tank models.
                </p>
              </div>
            )}

            {recommendation && (
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-950/80 space-y-6">
                
                {/* Result Top Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 shadow-md">
                    <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">Recommended Capacity</span>
                    <p className="text-3xl font-black text-white mt-1">
                      {recommendation.recommendedCapacityLiters.toLocaleString()} <span className="text-base text-red-500 font-bold">Litres</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">Provides ~14 days water autonomy</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 shadow-md">
                    <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block">Annual Rainwater Harvest</span>
                    <p className="text-3xl font-black text-white mt-1">
                      {recommendation.harvestingPotentialLitersPerYear.toLocaleString()} <span className="text-base text-emerald-400 font-bold">L/year</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">Based on regional precipitation yield</p>
                  </div>
                </div>

                {/* AI Guidance Text */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2 shadow-inner">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Roto Moulders Engineering Assessment</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {recommendation.advisorSummary}
                  </p>
                </div>

                {/* Recommended Tank Models */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recommended Roto Tank Models:</h4>
                  <div className="space-y-2.5">
                    {recommendation.recommendedModels.map((model, idx) => (
                      <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700/80 transition-colors">
                        <div>
                          <span className="text-[10px] bg-red-950 text-red-300 border border-red-800/60 font-bold px-2 py-0.5 rounded-md">
                            SKU: {model.sku}
                          </span>
                          <h5 className="text-xs font-bold text-white mt-1.5">{model.name}</h5>
                          <p className="text-[11px] text-slate-400 font-normal">{model.dimensions} • {model.highlights}</p>
                          <p className="text-xs font-black text-amber-400 mt-1">Est. KSh {model.priceKsh.toLocaleString()}</p>
                        </div>

                        <button
                          onClick={() => handleAddRecommendedToQuote(model.sku)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer uppercase tracking-wider"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Quote</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Installation Tips */}
                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Crucial Installation Notes:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-normal">
                    {recommendation.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

