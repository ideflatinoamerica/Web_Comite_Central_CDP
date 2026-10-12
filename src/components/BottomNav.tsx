import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  key: TabType;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'inicio', label: 'Inicio', icon: 'home' },
  { key: 'plan', label: 'Plan', icon: 'assignment' },
  { key: 'agenda', label: 'Agenda', icon: 'calendar_month' },
  { key: 'cuentas', label: 'Cuentas', icon: 'account_balance_wallet' },
  { key: 'participa', label: 'Participa', icon: 'volunteer_activism' }
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#fcf9f8]/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.05)] border-t border-surface-variant/40">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                onTabChange(item.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition-all group ${
                isActive
                  ? 'text-primary-container font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform duration-150 group-active:scale-95 ${
                    isActive ? 'scale-110 font-bold' : ''
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {isActive && (
                  <span className="absolute -top-1 right-0 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
