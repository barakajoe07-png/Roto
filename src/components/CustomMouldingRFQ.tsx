import React, { useState } from 'react';
import { Wrench, Upload, Send, CheckCircle, FileCode, Layers, ShieldCheck, FileText, X, RefreshCw, AlertCircle } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

export const CustomMouldingRFQ: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [industry, setIndustry] = useState('Industrial Chemical');
  const [lengthMm, setLengthMm] = useState('1500');
  const [widthMm, setWidthMm] = useState('800');
  const [heightMm, setHeightMm] = useState('900');
  const [wallThicknessMm, setWallThicknessMm] = useState('8.0');
  const [resinType, setResinType] = useState('100% Virgin Food Grade LLDPE');
  const [color, setColor] = useState('Roto Signature Blue');
  const [quantity, setQuantity] = useState('50');
  const [notes, setNotes] = useState('');
  const [cadFile, setCadFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rfqRef, setRfqRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 25 * 1024 * 1024) {
        setErrorMsg('File size exceeds 25MB max limit.');
        return;
      }
      setCadFile(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim()) {
      setErrorMsg('Please enter a project or component title.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `OEM-${Math.floor(100000 + Math.random() * 900000)}`;
      setRfqRef(ref);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>OEM & Industrial Rotational Moulding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Custom Mold Design & Plastic Fabrication
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Roto Moulders designs and fabricates custom rotational steel/aluminum moulds to engineer bespoke plastic components according to your CAD drawings.
          </p>
        </div>

        {submitted ? (
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-800/80 text-center space-y-5 shadow-2xl shadow-slate-950/80">
            <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-600/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Custom Moulding Enquiry Submitted</h3>
            <p className="text-xs text-slate-300">
              Reference Code: <span className="font-mono font-bold text-amber-400 px-2 py-0.5 bg-slate-950 rounded border border-slate-800">{rfqRef}</span>
            </p>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-normal">
              Our Senior Tooling Engineer will analyze your dimensional specifications ({lengthMm}mm × {widthMm}mm × {heightMm}mm) {cadFile ? `and attached drawing file (${cadFile.name})` : ''} and contact you with mould tooling cost estimates and production timeline.
            </p>
            <button
              onClick={() => { setSubmitted(false); setCadFile(null); setProjectTitle(''); }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-red-600/25 hover:shadow-xl cursor-pointer uppercase tracking-wider transition-all"
            >
              Submit Another Project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl shadow-slate-950/80 space-y-6">
            
            {errorMsg && (
              <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Project Name / Component Title *</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Chemical Dosing Tank for Water Treatment"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-white focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 font-medium placeholder-slate-500 transition-all shadow-inner"
                />
              </div>

              <div>
                <CustomSelect
                  label="Industry Sector *"
                  value={industry}
                  onChange={(val) => setIndustry(val)}
                  dark={true}
                  options={[
                    { value: 'Industrial Chemical', label: 'Industrial Chemical & Acid' },
                    { value: 'Agriculture', label: 'Agriculture & Irrigation' },
                    { value: 'Automotive', label: 'Automotive & Mobile Fuel Tanks' },
                    { value: 'Water Utility', label: 'Water Utility & Sanitation' },
                    { value: 'Consumer Goods', label: 'Playground & Outdoor Equipment' },
                  ]}
                />
              </div>
            </div>

            {/* CAD File Upload Section */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                Upload CAD Drawing / Technical Sketch (Optional):
              </label>
              
              {!cadFile ? (
                <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-800 hover:border-red-500/80 rounded-xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-all">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <Upload className="w-5 h-5 text-red-500" />
                    <span>Click or Drag & Drop DWG, STEP, STP, PDF, PNG (Max 25MB)</span>
                  </div>
                  <input
                    type="file"
                    accept=".dwg,.step,.stp,.pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-mono">
                    <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold truncate max-w-xs">{cadFile.name}</span>
                    <span className="text-[10px] text-slate-400">({(cadFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCadFile(null)}
                    className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Dimensions Grid */}
            <div className="p-4 sm:p-5 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-3 shadow-inner">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Target Dimensions (mm) & Wall Thickness</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Length (mm)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={lengthMm}
                    onChange={(e) => setLengthMm(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Width / Dia (mm)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={widthMm}
                    onChange={(e) => setWidthMm(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Height (mm)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={heightMm}
                    onChange={(e) => setHeightMm(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Wall Thickness (mm)</label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={wallThicknessMm}
                    onChange={(e) => setWallThicknessMm(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <CustomSelect
                  label="Polyethylene Resin Grade"
                  value={resinType}
                  onChange={(val) => setResinType(val)}
                  dark={true}
                  options={[
                    { value: '100% Virgin Food Grade LLDPE', label: 'Virgin Food Grade LLDPE' },
                    { value: 'Cross-Linked Polyethylene (XLPE)', label: 'Cross-Linked XLPE (Acids)' },
                    { value: 'High Density Polyethylene (HDPE)', label: 'HDPE Structural' },
                  ]}
                />
              </div>

              <div>
                <CustomSelect
                  label="Custom Plastic Color"
                  value={color}
                  onChange={(val) => setColor(val)}
                  dark={true}
                  options={[
                    { value: 'Roto Signature Blue', label: 'Roto Signature Blue' },
                    { value: 'Eco Green', label: 'Eco Green' },
                    { value: 'Safety Yellow', label: 'Safety Yellow' },
                    { value: 'Natural Translucent', label: 'Natural Translucent (Fluid Level)' },
                    { value: 'Granite Grey', label: 'Granite Grey' },
                    { value: 'Black', label: 'Black (UV Max)' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Estimated Annual Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs font-bold text-white focus:outline-hidden focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">Technical Specs & Mould Features Description:</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe internal baffles, threaded brass insert positions, lid requirements, or chemical concentration levels..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-white focus:outline-hidden focus:border-red-500 placeholder-slate-500 transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Processing OEM Specifications...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Custom Moulding Specs</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

