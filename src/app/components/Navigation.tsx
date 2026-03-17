import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import {
  checkAdminPassword,
  setAdminSession,
  isAdminAuthenticated,
} from '@/app/utils/adminAuth';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleAdminClick = () => {
    if (isAdminAuthenticated()) {
      onNavigate('admin');
      return;
    }
    setPasswordInput('');
    setPasswordError('');
    setShowPasswordDialog(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPassword(passwordInput)) {
      setAdminSession();
      setShowPasswordDialog(false);
      onNavigate('admin');
    } else {
      setPasswordError('Incorrect password.');
    }
  };

  const navItems = [
    { name: 'Work', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
    { name: 'Talk to me', page: 'converse' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="text-sm font-semibold tracking-tight hover:text-accent transition-colors"
          >
            JOHAN OLESUND
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  currentPage === item.page ? 'text-accent' : 'text-foreground'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleAdminClick}
              className={`flex items-center gap-1 text-xs transition-colors hover:text-muted-foreground ${
                currentPage === 'admin' ? 'text-muted-foreground' : 'text-muted-foreground/40'
              }`}
              aria-label="Admin"
            >
              <Lock size={12} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-base font-medium transition-colors hover:text-accent ${
                    currentPage === item.page ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin password dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>Enter the admin password to continue.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-3 mt-2">
            <Input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            {passwordError && (
              <p className="text-destructive text-xs">{passwordError}</p>
            )}
            <button
              type="submit"
              className="w-full text-sm px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-medium"
            >
              Enter
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
