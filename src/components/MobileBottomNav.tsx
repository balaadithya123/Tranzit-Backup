import React from 'react';
import { OwnerProfile } from '../types';
import { 
  LayoutDashboard, 
  Bus, 
  Ticket, 
  Wallet, 
  UserCheck, 
  FileText,
  Menu
} from 'lucide-react';

interface MobileBottomNavProps {
  owner: OwnerProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMobileDrawer: () => void;
  maintenanceAlertsCount?: number;
  driverAlertsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  owner,
  activeTab,
  setActiveTab,
  onOpenMobileDrawer,
  maintenanceAlertsCount = 0,
  driverAlertsCount = 0,
}) => {
  const isSaaS = owner.planType === 'SaaS';

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: 0,
    },
    {
      id: 'fleet',
      label: 'Fleet',
      icon: Bus,
      badge: maintenanceAlertsCount,
    },
    {
      id: isSaaS ? 'fares' : 'lease',
      label: isSaaS ? 'Routes' : 'Lease',
      icon: isSaaS ? Ticket : FileText,
      badge: 0,
    },
    {
      id: 'drivers',
      label: 'Drivers',
      icon: UserCheck,
      badge: driverAlertsCount,
    },
    {
      id: isSaaS ? 'earnings' : 'lease',
      label: isSaaS ? 'Earnings' : 'Payouts',
      icon: isSaaS ? Wallet : FileText,
      badge: 0,
    },
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0c0e15]/95 backdrop-blur-md border-t border-slate-200 dark:border-neutral-800 px-2 py-1.5 shadow-lg safe-area-bottom"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all relative min-h-[46px] min-w-[52px] cursor-pointer ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-1 bg-rose-500 text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 font-sans ${isActive ? 'font-bold text-blue-600 dark:text-blue-400' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 mt-0.5"></span>
              )}
            </button>
          );
        })}

        {/* More Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenMobileDrawer}
          className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white min-h-[46px] min-w-[52px] cursor-pointer"
        >
          <Menu className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] tracking-tight mt-0.5 font-sans font-medium">
            More
          </span>
        </button>
      </div>
    </nav>
  );
};
