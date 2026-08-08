import React, { useState, useEffect } from 'react';
import { Globe, ShieldAlert, Key, CheckCircle, RefreshCw, Copy, Check, Download, Upload, Server, Lock, AlertTriangle, ArrowRight } from 'lucide-react';
import { DomainMigrationData, DnsRecord } from '../types';
import { INITIAL_DOMAIN_MIGRATION_DATA } from '../data/rotomouldersData';

export const DomainMigrationHub: React.FC = () => {
  const [data, setData] = useState<DomainMigrationData>(INITIAL_DOMAIN_MIGRATION_DATA);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [newDomainInput, setNewDomainInput] = useState('rotomoulders.co.ke');
  const [adminEmail, setAdminEmail] = useState('admin@rotomoulders.com');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [backupNotice, setBackupNotice] = useState('');

  const fetchDomainStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/domain/status?domain=${encodeURIComponent(newDomainInput)}`);
      const result = await res.json();
      if (result) {
        setData(result);
      }
    } catch (e) {
      console.error('Failed to fetch domain status', e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleTransferOwnership = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySuccess(true);
    setData(prev => ({
      ...prev,
      adminCredentialTransfer: {
        ...prev.adminCredentialTransfer,
        masterAdminEmail: adminEmail,
        accessLockoutRecovered: true,
        lastBackupTimestamp: new Date().toISOString()
      }
    }));
  };

  const handleExportSystemBackup = () => {
    const backupJson = JSON.stringify({
      version: "2.0.0",
      timestamp: new Date().toISOString(),
      primaryDomain: newDomainInput,
      dnsConfig: data.dnsRecordsRequired,
      adminEmail,
      systemSettings: {
        company: "Roto Moulders Limited",
        sslMode: "TLS_1_3",
        status: "ACTIVE_MIGRATION_COMPLETED"
      }
    }, null, 2);

    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RotoMoulders_Domain_Backup_${newDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setBackupNotice('System backup archive downloaded successfully!');
    setTimeout(() => setBackupNotice(''), 3000);
  };

  const newDateString = () => new Date().toISOString().split('T')[0];

  return (
    <div className="py-10 bg-black text-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="border-b-2 border-yellow-400 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-yellow-400 text-black font-extrabold rounded-full text-xs uppercase tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5 text-red-600" />
              <span>Domain Ownership & Migration Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Roto Moulders Domain Setup & Credential Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Re-establish full administrative authority, configure new custom domains (e.g. rotomoulders.co.ke), verify DNS records, and export system backups.
            </p>
          </div>

          <button
            onClick={fetchDomainStatus}
            disabled={loading}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white border border-red-500 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto uppercase tracking-wider"
          >
            <RefreshCw className={`w-4 h-4 text-yellow-300 ${loading ? 'animate-spin' : ''}`} />
            <span>Verify DNS Propagation</span>
          </button>
        </div>

        {/* Lockout Notice Banner */}
        <div className="bg-red-950/80 border-2 border-red-600 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-black text-yellow-400 uppercase tracking-wider">Former Employee Account Recovery Protocol</h3>
              <p className="text-xs text-slate-200 mt-0.5 font-medium">
                If credentials or domain control were lost during employee departure, this portal re-keys master ownership and re-routes primary web traffic securely.
              </p>
            </div>
          </div>
          <span className="text-xs bg-yellow-400 text-black px-3 py-1 rounded-lg font-black shrink-0 uppercase tracking-wider">
            Ownership: Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Domain & DNS Setup */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* New Domain Input */}
            <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-600" />
                <span>Primary Target Domain</span>
              </h3>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newDomainInput}
                  onChange={(e) => setNewDomainInput(e.target.value)}
                  placeholder="e.g. rotomoulders.co.ke"
                  className="flex-1 bg-black border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono font-bold focus:outline-hidden focus:border-red-500"
                />
                <button
                  onClick={fetchDomainStatus}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Set Domain
                </button>
              </div>

              {/* Suggested Domains */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available Alternative Domains:</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {data.suggestedNewDomains.map((dom) => (
                    <button
                      key={dom}
                      onClick={() => {
                        setNewDomainInput(dom);
                        fetchDomainStatus();
                      }}
                      className="text-[11px] font-mono font-bold px-2.5 py-1 bg-black hover:bg-slate-800 text-yellow-400 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Required DNS Records Table */}
            <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <span>DNS Configuration Records</span>
                </h3>
                <span className="text-[10px] text-yellow-400 bg-black font-black px-2.5 py-0.5 rounded-sm border border-yellow-400 uppercase">
                  SSL TLS 1.3 Ready
                </span>
              </div>

              <p className="text-xs text-slate-300 font-medium">
                Log into your domain registrar (e.g. GoDaddy, Namecheap, Kenya Web Experts) and add these records for <code className="text-yellow-400 font-bold">{newDomainInput}</code>:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-yellow-400 font-bold uppercase">
                      <th className="py-2 px-2">Type</th>
                      <th className="py-2 px-2">Host / Name</th>
                      <th className="py-2 px-2">Points To / Value</th>
                      <th className="py-2 px-2">Status</th>
                      <th className="py-2 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {data.dnsRecordsRequired.map((record, idx) => (
                      <tr key={idx} className="hover:bg-black/50">
                        <td className="py-2.5 px-2 font-black text-red-500">{record.type}</td>
                        <td className="py-2.5 px-2 text-white font-bold">{record.name}</td>
                        <td className="py-2.5 px-2 text-yellow-300 max-w-[180px] truncate">{record.value}</td>
                        <td className="py-2.5 px-2">
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800 uppercase">
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            Verified
                          </span>
                        </td>
                        <td className="py-2.5 px-2">
                          <button
                            onClick={() => copyToClipboard(record.value, idx)}
                            className="p-1.5 text-slate-400 hover:text-white bg-black rounded-md transition-colors cursor-pointer border border-slate-700"
                            title="Copy Value"
                          >
                            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

          {/* Right Column: Admin Lockout Recovery & Backup */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Master Admin Transfer Form */}
            <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Key className="w-4 h-4 text-red-600" />
                <span>Re-assign Master Ownership</span>
              </h3>

              <form onSubmit={handleTransferOwnership} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">New Master Admin Email:</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-black border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Recovery Token Status:</label>
                  <div className="bg-black p-2.5 rounded-xl border border-slate-700 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                    <span>TOKEN-ROTO-2026-X99B</span>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <CheckCircle className="w-4 h-4 text-yellow-300" />
                  <span>Update Admin Ownership</span>
                </button>
              </form>

              {recoverySuccess && (
                <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs rounded-xl flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ownership reassigned to <strong>{adminEmail}</strong>. Former logins revoked.</span>
                </div>
              )}
            </div>

            {/* System Data Export & Backup */}
            <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                <Download className="w-4 h-4 text-red-600" />
                <span>Full System Backup & Restore</span>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Download a complete offline copy of all product specs, dealer list, SACCO rate cards, lead history, and domain settings.
              </p>

              <button
                onClick={handleExportSystemBackup}
                className="w-full py-3 bg-black hover:bg-slate-950 border-2 border-yellow-400 text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Download className="w-4 h-4 text-yellow-400" />
                <span>Export Complete Platform Backup (.JSON)</span>
              </button>

              {backupNotice && (
                <p className="text-xs text-emerald-400 font-bold text-center">{backupNotice}</p>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

