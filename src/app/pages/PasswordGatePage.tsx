import { useState, useCallback, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/Button';

interface PasswordGatePageProps {
  onAuthenticate: () => void;
}

export function PasswordGatePage({ onAuthenticate }: PasswordGatePageProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const expected = import.meta.env.VITE_PORTFOLIO_PASSWORD;
      if (input === expected) {
        onAuthenticate();
      } else {
        setError('Incorrect password. Try again.');
        setInput('');
      }
    },
    [input, onAuthenticate]
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm flex flex-col items-center text-center gap-6"
      >
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Private portfolio
          </h1>
          <p className="text-sm text-muted-foreground">
            This portfolio is password protected.{' '}
            <a
              href="mailto:johd@netlight.com"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Click here to request access.
            </a>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter password"
            autoFocus
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive text-left"
            >
              {error}
            </motion.p>
          )}

          <Button variant="primary" className="w-full justify-center">
            Enter
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
