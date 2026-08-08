import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

export interface ToastData {
  id: string;
  product: Product;
  quantity: number;
  color: string;
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onClose: () => void;
  onViewCart: () => void;
  cartItemCount: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onClose,
  onViewCart,
  cartItemCount,
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-40 sm:bottom-44 right-4 sm:right-6 z-50 max-w-sm w-full bg-slate-900/95 backdrop-blur-xl border border-slate-800 text-slate-100 rounded-2xl p-4 shadow-2xl shadow-slate-950/90 overflow-hidden"
        >
          {/* Subtle Progress Bar */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 4, ease: 'linear' }}
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-600 to-amber-500"
          />

          <div className="flex items-start gap-3.5">
            {/* Success Checkmark Circle with ripple */}
            <div className="relative shrink-0 mt-0.5">
              <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 pr-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-md">
                  Success
                </span>
                <p className="text-xs font-black text-white uppercase tracking-tight">
                  Added to RFQ Quote List!
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <img
                  src={toast.product.image}
                  alt={toast.product.name}
                  className="w-10 h-10 rounded-lg bg-slate-950 p-1 border border-slate-800 object-contain shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-100 truncate leading-snug">
                    {toast.product.name}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Qty: <span className="text-amber-400 font-bold">{toast.quantity}</span> • {toast.color}
                  </p>
                </div>
              </div>

              {/* View Cart Action button */}
              <div className="pt-2.5 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Total Items: {cartItemCount}
                </span>

                <button
                  onClick={() => {
                    onClose();
                    onViewCart();
                  }}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-[11px] rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 uppercase tracking-wider hover:scale-102"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>View Quote List</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              title="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
