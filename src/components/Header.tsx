import React, { useState } from 'react';
import { TabType, UserRole } from '../types';
import { ASSETS } from '../data/initialData';

interface HeaderProps {
  activeTab: TabType;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  proposalCount: number;
  sponsorCount: number;
  onOpenAdminDrawer: () => void;
}

const TAB_TITLES: Record<TabType, string> = {
  inicio: 'Inicio',
  plan: 'Plan',
  agenda: 'Agenda',
  cuentas: 'Cuentas',
  participa: 'Participa'
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  userRole,
  onRoleChange,
  proposalCount,
  sponsorCount,
  onOpenAdminDrawer
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fcf9f8]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand Section */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="Logo UEP CDP"
            className="h-8 w-auto object-contain shrink-0"
            src={ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-semibold text-[15px] sm:text-base text-primary tracking-tight truncate">
                Comité Central UEP CDP
              </span>
              <span className="shrink-0 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                2026-2027
              </span>
            </div>
            <span className="text-xs text-on-surface-variant truncate font-medium">
              {TAB_TITLES[activeTab]}
            </span>
          </div>
        </div>

        {/* User Role Switcher Trigger */}
        <div className="relative flex items-center gap-2 shrink-0">
          {userRole === 'admin' && (
            <button
              onClick={onOpenAdminDrawer}
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold bg-primary text-on-primary px-2.5 py-1 rounded-full shadow-sm hover:bg-primary-container transition-colors"
              title="Panel de Gestión de Mesa Directiva"
            >
              <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
              <span>Buzón ({proposalCount + sponsorCount})</span>
            </button>
          )}

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-container active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Perfil y cambio de rol"
          >
            <span className="material-symbols-outlined text-[20px]">
              {userRole === 'admin' ? 'shield_person' : 'person'}
            </span>
          </button>

          {/* Profile & Role Dropdown */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-11 z-50 w-72 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-3.5 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-surface-variant pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                      {userRole === 'admin' ? 'CDP' : 'FAM'}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-on-surface">
                        {userRole === 'admin' ? 'Mesa Directiva CDP' : 'Familia UEP Deportista'}
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        {userRole === 'admin' ? 'Rol: Administrador' : 'Rol: Padre / Tutor'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${userRole === 'admin' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'}`}>
                    {userRole === 'admin' ? 'Directiva' : 'Público'}
                  </span>
                </div>

                {/* Role Switcher Button */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Cambiar Modo de Vista
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 bg-surface-container-low p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        onRoleChange('parent');
                        setShowMenu(false);
                      }}
                      className={`py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-all ${userRole === 'parent' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">family_restroom</span>
                      <span>Familia</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onRoleChange('admin');
                        setShowMenu(false);
                      }}
                      className={`py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-all ${userRole === 'admin' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                      <span>Directiva</span>
                    </button>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                {userRole === 'admin' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      onOpenAdminDrawer();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center justify-between shadow-sm active:bg-primary-container transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">inbox</span>
                      <span>Ver Solicitudes Recibidas</span>
                    </span>
                    <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px]">
                      {proposalCount + sponsorCount}
                    </span>
                  </button>
                ) : (
                  <div className="p-2 bg-surface-container-low rounded-lg text-[11px] text-on-surface-variant space-y-1">
                    <p className="font-semibold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                      Portal Oficial de Familias
                    </p>
                    <p>Envía propuestas en la pestaña 'Participa' y fiscaliza las cuentas con facturas SRI.</p>
                  </div>
                )}

                <div className="pt-1 border-t border-surface-variant flex justify-between items-center text-[11px] text-on-surface-variant">
                  <span>UEP CDP Pichincha</span>
                  <a
                    href="mailto:comite.central@uepcdp.edu.ec"
                    className="text-primary font-bold hover:underline"
                  >
                    Ayuda
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
