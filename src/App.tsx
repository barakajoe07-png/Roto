import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AITankAdvisor } from './components/AITankAdvisor';
import { DomainMigrationHub } from './components/DomainMigrationHub';
import { RFQCartModal } from './components/RFQCartModal';
import { WarrantyChecker } from './components/WarrantyChecker';
import { DealerLocator } from './components/DealerLocator';
import { CustomMouldingRFQ } from './components/CustomMouldingRFQ';
import { SaccoPriceListModal } from './components/SaccoPriceListModal';
import { HomeInfoSections } from './components/HomeInfoSections';
import { SectionDivider } from './components/SectionDivider';
import { ToastNotification, ToastData } from './components/ToastNotification';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

import { PRODUCTS } from './data/rotomouldersData';
import { Product, RFQItem } from './types';

const fadeInUpSection = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rfqItems, setRfqItems] = useState<RFQItem[]>([]);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState<boolean>(false);
  const [isSaccoModalOpen, setIsSaccoModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastData, setToastData] = useState<ToastData | null>(null);

  const handleAddRfqItem = (product: Product, quantity: number, color: string, customNotes?: string) => {
    setRfqItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].selectedColor = color;
        if (customNotes) updated[existingIndex].customFittingNotes = customNotes;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: color,
            customFittingNotes: customNotes,
          },
        ];
      }
    });

    // Show floating success toast animation
    setToastData({
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      color,
    });
  };

  const handleUpdateRfqQuantity = (productId: string, delta: number) => {
    setRfqItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as RFQItem[]
    );
  };

  const handleRemoveRfqItem = (productId: string) => {
    setRfqItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearRfq = () => {
    setRfqItems([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rfqItems={rfqItems}
        setIsRfqModalOpen={setIsRfqModalOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            <Hero
              onExploreCatalog={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAdvisor={() => setActiveTab('ai-advisor')}
              onOpenDomainHub={() => setActiveTab('domain-hub')}
            />

            <SectionDivider glowColor="amber" />

            <div id="catalog-section">
              <ProductCatalog
                products={PRODUCTS}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddRfqItem={handleAddRfqItem}
                rfqItems={rfqItems}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenAdvisor={() => setActiveTab('ai-advisor')}
              />
            </div>

            <SectionDivider glowColor="red" />

            <HomeInfoSections
              onExploreCatalog={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </>
        )}

        {activeTab === 'ai-advisor' && (
          <AITankAdvisor
            onAddRfqItem={handleAddRfqItem}
            products={PRODUCTS}
          />
        )}

        {activeTab === 'custom-moulding' && (
          <CustomMouldingRFQ />
        )}

        {activeTab === 'dealer-locator' && (
          <DealerLocator />
        )}

        {activeTab === 'warranty' && (
          <WarrantyChecker />
        )}

        {activeTab === 'domain-hub' && (
          <DomainMigrationHub />
        )}
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254710492539?text=Hello%20Roto%20Tanks,%20I%20need%20a%20quotation%20for%20water%20tanks"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border-2 border-white group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-extrabold pl-0 group-hover:pl-2">
          Chat With Sales
        </span>
      </a>

      {/* Product Specification Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddRfqItem={handleAddRfqItem}
      />

      {/* Quote Request Cart Modal */}
      <RFQCartModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        rfqItems={rfqItems}
        onUpdateQuantity={handleUpdateRfqQuantity}
        onRemoveItem={handleRemoveRfqItem}
        onClearCart={handleClearRfq}
      />

      {/* UN SACCO 28% Member Price List Modal */}
      <SaccoPriceListModal
        isOpen={isSaccoModalOpen}
        onClose={() => setIsSaccoModalOpen(false)}
        onAddRfqItem={handleAddRfqItem}
      />

      {/* Floating Success Toast Notification */}
      <ToastNotification
        toast={toastData}
        onClose={() => setToastData(null)}
        onViewCart={() => setIsRfqModalOpen(true)}
        cartItemCount={rfqItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      {/* Footer */}
      <SectionDivider glowColor="amber" />
      <Footer 
        onNavigateTab={setActiveTab} 
        onOpenSaccoModal={() => setIsSaccoModalOpen(true)}
      />
    </div>
  );
}

