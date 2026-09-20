import React, { useState } from 'react';
import { OwnerProfile } from '../types';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Calendar, 
  Menu,
  Sparkles, 
  Download, 
  Keyboard, 
  LogOut, 
  User,
  Layers
} from 'lucide-react';
import { isPlatformAdmin } from '../lib/pricingService';

interface HeaderProps {
  owner: OwnerProfile;
  activeTab: string;
  layoutMode?: 'island' | 'classic';
  onToggleLayoutMode?: () => void;
  onOpenMobileSidebar: () => void;
  onOpenProfileModal: () => void;
  onOpenReportsModal: () => void;
  onOpenCommandPalette?: () => void;
  onOpenShortcutsModal?: () => void;
  onLogout?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  owner,
  activeTab,
  layoutMode = 'island',
  onToggleLayoutMode,
  onOpenMobileSidebar,
  onOpenProfileModal,
  onOpenReportsModal,
  onOpenCommandPalette,
  onOpenShortcutsModal,
  onLogout,
  onNavigateTab
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('30 min');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const isSaaS = owner.planType === 'SaaS';
  const isAdmin = isPlatformAdmin(owner);

  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'fleet', label: 'Fleet' },
    { id: 'fares', label: 'Routes' },
    { id: 'drivers', label: 'Drivers' },
    { id: isSaaS ? 'earnings' : 'lease', label: isSaaS ? 'Earnings' : 'Lease & Payouts' },
    { id: 'fuel-perks', label: 'Fuel Perks' },
    { id: 'settings', label: 'Settings' },
    ...(isAdmin ? [{ id: 'admin-pricing', label: 'Admin' }] : [])
  ];

  return (
    <header className="w-full pb-6 pt-1 flex flex-col gap-4 border-b border-slate-100 dark:border-neutral-800/80 mb-6">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Brand Identity with OrchestrateIQ multi-bar logo */}
        <div className="flex items-center space-x-3 shrink-0">
          {/* Mobile Drawer Button */}
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo Mark: Authentic Tranzit Icon */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-900 dark:bg-amber-500/20 text-white dark:text-amber-400 flex items-center justify-center font-extrabold text-sm sm:text-base tracking-tighter rounded-xl border border-slate-800 dark:border-amber-500/30 shadow-2xs">
              TZ
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white font-sans">
                  Tranzit
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 rounded font-bold">
                  OS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Floating Pill Navigation Tabs (Desktop) */}
        <div className="hidden md:flex items-center bg-slate-100/80 dark:bg-neutral-900/90 p-1 rounded-full border border-slate-200/80 dark:border-neutral-800">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigateTab && onNavigateTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Live Pill, Layout Switcher, Time Filter, Search, Notifications, Profile */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          {/* Live Indicator Pill */}
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live</span>
          </div>

          {/* Layout Mode Preserved Switcher */}
          {onToggleLayoutMode && (
            <button
              type="button"
              onClick={onToggleLayoutMode}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 text-xs font-mono text-slate-700 dark:text-neutral-300 transition-colors shadow-2xs cursor-pointer"
              title={layoutMode === 'island' ? 'Switch to Classic Enterprise Sidebar' : 'Switch to Modern Floating Island'}
            >
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>{layoutMode === 'island' ? 'Island View' : 'Classic View'}</span>
            </button>
          )}

          {/* Timeframe Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-full text-xs font-mono text-slate-700 dark:text-neutral-300 transition-colors cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{timeFilter}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {isTimeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 py-1 font-mono text-xs animate-in fade-in zoom-in-95">
                {['Live (Real-time)', '30 min', 'Today', 'Last 7 days', 'Last 30 days'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setTimeFilter(option);
                      setIsTimeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors ${
                      timeFilter === option ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-neutral-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Icon Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="p-2 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-full text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
              title="Search (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Notification Bell Button */}
          <button
            onClick={onOpenReportsModal}
            className="relative p-2 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-full text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
            title="Notifications & Reports"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-neutral-900"></span>
          </button>

          {/* User Profile Capsule */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 pl-1 pr-2 py-1 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-full transition-colors cursor-pointer shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#e06c53] text-white flex items-center justify-center font-bold text-xs">
                {owner.name ? owner.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div className="text-left hidden xl:block">
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight font-sans truncate max-w-[110px]">
                  {owner.name || 'Platform Team'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono leading-none">
                  {owner.companyName || 'Owner • Tranzit'}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-neutral-800 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{owner.name}</p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 truncate">{owner.email}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {owner.planType} Plan
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenProfileModal();
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fleet Profile & City Hub</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenReportsModal();
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download Fleet Reports</span>
                </button>

                {onOpenShortcutsModal && (
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onOpenShortcutsModal();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <Keyboard className="w-3.5 h-3.5 text-slate-400" />
                    <span>Keyboard Shortcuts (?)</span>
                  </button>
                )}

                {onLogout && (
                  <div className="mt-1 pt-1 border-t border-slate-100 dark:border-neutral-800">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer font-bold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

