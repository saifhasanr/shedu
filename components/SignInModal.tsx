
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials. Here, we'll simulate success.
    // We use the email prefix as the name for this mock.
    const name = email.split('@')[0];
    signIn(email, name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-secondary p-8 rounded-lg shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-highlight text-sm font-bold mb-2" htmlFor="signin-email">
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-accent px-3 py-2 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-highlight text-sm font-bold mb-2" htmlFor="signin-password">
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-accent px-3 py-2 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <button type="submit" className="w-full bg-brand hover:bg-sky-400 text-primary font-bold py-2 px-4 rounded-md transition-colors duration-300">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-highlight mt-4">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignUp} className="text-brand hover:underline font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
