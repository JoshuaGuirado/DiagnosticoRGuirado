import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useStore } from '@/src/store';

export function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="h-screen w-full flex bg-[#F8F0E3] font-sans overflow-hidden text-[#1A2840]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A2840] h-full flex flex-col text-white shadow-xl shrink-0 z-10 hidden md:flex border-r">
        <div className="p-8 flex items-center justify-center border-b border-[#1F4761]">
          <img src="/logo-full.png" alt="R. Guirado Logo" className="h-12 w-auto object-contain" />
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <Link to="/" className={cn(
            "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
            location.pathname === '/' || location.pathname.startsWith('/diagnostico') || location.pathname.startsWith('/resultado')
              ? "text-[#F3C611] bg-[#1F4761]" 
              : "opacity-70 hover:bg-[#F3C611]/10 hover:text-[#F3C611] hover:opacity-100"
          )}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>

          <Link to="/admin" className={cn(
            "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
            isAdmin 
              ? "text-[#F3C611] bg-[#1F4761]" 
              : "opacity-70 hover:bg-[#F3C611]/10 hover:text-[#F3C611] hover:opacity-100"
          )}>
            <ShieldAlert className="w-5 h-5" />
            <span className="text-sm font-semibold">Admin</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 md:p-10 overflow-hidden min-w-0">
        <header className="flex justify-between items-center mb-8 shrink-0">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="R. Guirado" className="w-10 h-10 object-contain flex md:hidden shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                {isAdmin ? 'Painel Administrativo' : 'Painel de Consultoria'}
              </h2>
              <p className="text-[#1A2840] opacity-60 text-sm md:text-base hidden sm:block">
                {isAdmin ? 'Gerencie todos os diagnósticos realizados.' : 'Selecione a avaliação estratégica para iniciar o diagnóstico.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex gap-2">
              <Link to="/" className={cn("p-2 rounded-lg", location.pathname === '/' ? "bg-[#1F4761] text-[#F3C611]" : "bg-white")}>
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <Link to="/admin" className={cn("p-2 rounded-lg", isAdmin ? "bg-[#1F4761] text-[#F3C611]" : "bg-white")}>
                <ShieldAlert className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto min-h-0 md:pr-4 pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
