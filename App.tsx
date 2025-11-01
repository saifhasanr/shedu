
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar 
            onSignInClick={() => setIsSignInOpen(true)}
            onSignUpClick={() => setIsSignUpOpen(true)}
          />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <SignInModal 
          isOpen={isSignInOpen} 
          onClose={() => setIsSignInOpen(false)} 
          onSwitchToSignUp={() => {
            setIsSignInOpen(false);
            setIsSignUpOpen(true);
          }}
        />
        <SignUpModal 
          isOpen={isSignUpOpen} 
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToSignIn={() => {
            setIsSignUpOpen(false);
            setIsSignInOpen(true);
          }}
        />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
