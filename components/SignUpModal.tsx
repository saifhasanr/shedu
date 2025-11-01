
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth(); // Using signIn as our mock registration function

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-secondary p-8 rounded-lg shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-highlight text-sm font-bold mb-2" htmlFor="signup-name">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-accent px-3 py-2 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-highlight text-sm font-bold mb-2" htmlFor="signup-email">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-accent px-3 py-2 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-highlight text-sm font-bold mb-2" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-accent px-3 py-2 text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <button type="submit" className="w-full bg-brand hover:bg-sky-400 text-primary font-bold py-2 px-4 rounded-md transition-colors duration-300">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-highlight mt-4">
          Already have an account?{' '}
          <button onClick={onSwitchToSignIn} className="text-brand hover:underline font-semibold">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
