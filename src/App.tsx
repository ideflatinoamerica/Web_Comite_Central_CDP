import React, { useState, useEffect } from 'react';
import { TabType, UserRole, Proposal, SponsorApplication, ProposalCategory, Expense, ExpenseCategory } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AdminDrawer } from './components/AdminDrawer';
import { InicioView } from './views/InicioView';
import { PlanView } from './views/PlanView';
import { AgendaView } from './views/AgendaView';
import { CuentasView } from './views/CuentasView';
import { ParticipaView } from './views/ParticipaView';
import { INITIAL_AXES, INITIAL_EVENTS, INITIAL_EXPENSE_CATEGORIES, INITIAL_EXPENSES, INITIAL_COMPLETED_AXES } from './data/initialData';
import { WelcomeModal } from './components/WelcomeModal';

const INITIAL_MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'prop-seed-1',
    ticketNumber: 'UEP-2026-P42',
    category: 'idea',
    categoryTitle: 'Idea o Sugerencia',
    author: 'Lcda. Carmen Morales',
    grade: 'Básica Superior (8vo - 10mo)',
    discipline: 'Taekwondo',
    description: 'Adquisición conjunta de petos con sensores inalámbricos para selectivos provinciales de la categoría juvenil.',
    createdAt: '10 Oct 2026',
    status: 'En revisión'
  },
  {
    id: 'prop-seed-2',
    ticketNumber: 'UEP-2026-P18',
    category: 'escuela',
    categoryTitle: 'Escuela para Familias',
    author: 'Dr. Fernando Reinoso',
    grade: '1ro - 2do Bachillerato',
    discipline: 'Atletismo',
    description: 'Taller de nutrición y prevención del síndrome de sobreentrenamiento para padres de atletas de alto rendimiento.',
    createdAt: '08 Oct 2026',
    status: 'Aprobado'
  }
];

const INITIAL_MOCK_SPONSORS: SponsorApplication[] = [
  {
    id: 'spon-seed-1',
    ticketNumber: 'UEP-2026-PAT104',
    orgName: 'Laboratorios Pichincha Farma',
    modality: 'Nutrición & Fisioterapia Deportiva',
    phone: '099 876 5432',
    notes: 'Kits de hidratación isotónica y vendaje neuromuscular para torneos federados.',
    createdAt: '09 Oct 2026',
    status: 'En evaluación'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [participaInitialCategory, setParticipaInitialCategory] = useState<ProposalCategory | undefined>();
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local storage state
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('uep_role') as UserRole) || 'parent';
  });

  const [proposals, setProposals] = useState<Proposal[]>(() => {
    const saved = localStorage.getItem('uep_proposals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MOCK_PROPOSALS;
      }
    }
    return INITIAL_MOCK_PROPOSALS;
  });

  const [sponsors, setSponsors] = useState<SponsorApplication[]>(() => {
    const saved = localStorage.getItem('uep_sponsors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MOCK_SPONSORS;
      }
    }
    return INITIAL_MOCK_SPONSORS;
  });

  const [userLikes, setUserLikes] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('uep_likes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(() => {
    const saved = localStorage.getItem('uep_expense_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EXPENSE_CATEGORIES;
      }
    }
    return INITIAL_EXPENSE_CATEGORIES;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('uep_expenses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EXPENSES;
      }
    }
    return INITIAL_EXPENSES;
  });

  const [completedAxisIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('uep_completed_axes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COMPLETED_AXES;
      }
    }
    return INITIAL_COMPLETED_AXES;
  });

  const [bookmarkedEvents, setBookmarkedEvents] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('uep_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('uep_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('uep_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('uep_sponsors', JSON.stringify(sponsors));
  }, [sponsors]);

  useEffect(() => {
    localStorage.setItem('uep_likes', JSON.stringify(userLikes));
  }, [userLikes]);

  useEffect(() => {
    localStorage.setItem('uep_bookmarks', JSON.stringify(bookmarkedEvents));
  }, [bookmarkedEvents]);

  useEffect(() => {
    localStorage.setItem('uep_expense_categories', JSON.stringify(expenseCategories));
  }, [expenseCategories]);

  useEffect(() => {
    localStorage.setItem('uep_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('uep_completed_axes', JSON.stringify(completedAxisIds));
  }, [completedAxisIds]);

  // Toast auto dismiss
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Like toggler
  const handleToggleLike = (axisId: string) => {
    setUserLikes((prev) => ({
      ...prev,
      [axisId]: !prev[axisId]
    }));
  };

  // Bookmark toggler
  const handleToggleBookmark = (eventId: string) => {
    setBookmarkedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  // Proposal creator
  const handleAddProposal = (prop: Proposal) => {
    setProposals((prev) => [prop, ...prev]);
  };

  // Sponsor creator
  const handleAddSponsor = (spon: SponsorApplication) => {
    setSponsors((prev) => [spon, ...prev]);
  };

  const handleAddExpenseCategory = (name: string) => {
    setExpenseCategories((prev) => [...prev, { id: `cat-${Date.now()}`, name }]);
  };

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses((prev) => [{ id: `exp-${Date.now()}`, ...expense }, ...prev]);
  };

  // Update proposal status (Admin action)
  const handleUpdateProposalStatus = (id: string, status: Proposal['status']) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  // Navigation dispatcher
  const handleNavigate = (tab: TabType, extra?: { initialCategory?: ProposalCategory }) => {
    if (extra?.initialCategory) {
      setParticipaInitialCategory(extra.initialCategory);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-[#1c1b1b] flex flex-col overflow-x-clip antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header */}
      <Header
        activeTab={activeTab}
        userRole={userRole}
        onRoleChange={setUserRole}
        proposalCount={proposals.length}
        sponsorCount={sponsors.length}
        onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 flex flex-col relative w-full max-w-2xl mx-auto px-4 pt-16 pb-20 bg-[#fcf9f8] lg:max-w-[90rem] lg:w-full lg:px-8">
        {activeTab === 'inicio' && (
          <InicioView
            onNavigate={handleNavigate}
            onShowToast={showToast}
            axes={INITIAL_AXES}
            completedAxisIds={completedAxisIds}
          />
        )}

        {activeTab === 'plan' && (
          <PlanView
            axes={INITIAL_AXES}
            userLikes={userLikes}
            onToggleLike={handleToggleLike}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'agenda' && (
          <AgendaView
            events={INITIAL_EVENTS}
            bookmarkedEvents={bookmarkedEvents}
            onToggleBookmark={handleToggleBookmark}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'cuentas' && (
          <CuentasView
            onShowToast={showToast}
            categories={expenseCategories}
            expenses={expenses}
            onAddCategory={handleAddExpenseCategory}
            onAddExpense={handleAddExpense}
          />
        )}

        {activeTab === 'participa' && (
          <ParticipaView
            initialCategory={participaInitialCategory}
            onAddProposal={handleAddProposal}
            onAddSponsor={handleAddSponsor}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setParticipaInitialCategory(undefined);
        }}
      />

      {/* Admin Drawer Modal */}
      <AdminDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        proposals={proposals}
        sponsors={sponsors}
        onUpdateProposalStatus={handleUpdateProposalStatus}
        onShowToast={showToast}
      />

      <WelcomeModal />

      {/* Floating Micro Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-50 bg-[#1c1b1b] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200 lg:left-1/2 lg:right-auto lg:-translate-x-1/2"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#fdbb12] text-[20px] shrink-0">
              check_circle
            </span>
            <span className="text-xs font-semibold truncate leading-tight">
              {toastMessage}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/70 hover:text-white p-0.5"
            aria-label="Cerrar notificación"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
