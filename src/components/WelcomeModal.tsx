import React, { useState } from 'react';

const STORAGE_KEY = 'uep_welcome_seen';

export const WelcomeModal: React.FC = () => {
  const [open, setOpen] = useState(() => sessionStorage.getItem(STORAGE_KEY) !== '1');

  if (!open) return null;

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">
      <div
        role="dialog"
        aria-labelledby="welcome-title"
        className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-7 shadow-2xl border border-outline-variant/30 space-y-5"
      >
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold px-3 py-1 rounded-full">
            Comité Central UEP CDP
          </span>
          <h2 id="welcome-title" className="font-headline font-bold text-2xl text-on-surface leading-tight">
            Bienvenida al período 2026–2027
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Consulta el plan, la agenda y las cuentas del comité. Esta experiencia fue acompañada por Ingeniería 4G.
          </p>
        </div>

        <a
          href="https://www.ingenieria4g.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-sm font-bold text-primary underline underline-offset-4"
        >
          Ingeniería 4G
        </a>

        <button
          type="button"
          onClick={close}
          className="btn-action w-full bg-primary text-on-primary text-sm shadow-md hover:bg-primary-container"
        >
          Entrar al comité
        </button>
      </div>
    </div>
  );
};
