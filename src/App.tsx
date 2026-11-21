import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context';
import { Layout } from './components/layout';
import { WHATSAPP_URL } from './lib/contact';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const LoginPage = lazy(() => import('./pages/auth').then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth').then((module) => ({ default: module.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./pages/auth').then((module) => ({ default: module.ForgotPasswordPage })));
const GoogleOnboardingPage = lazy(() => import('./pages/auth').then((module) => ({ default: module.GoogleOnboardingPage })));
const PropertiesPage = lazy(() => import('./pages/properties').then((module) => ({ default: module.PropertiesPage })));
const PropertyDetailPage = lazy(() => import('./pages/properties').then((module) => ({ default: module.PropertyDetailPage })));
const NewPropertyPage = lazy(() => import('./pages/properties').then((module) => ({ default: module.NewPropertyPage })));
const DashboardPage = lazy(() => import('./pages/dashboard').then((module) => ({ default: module.DashboardPage })));
const MessagesPage = lazy(() => import('./pages/messages').then((module) => ({ default: module.MessagesPage })));
const SavedPropertiesPage = lazy(() => import('./pages/saved').then((module) => ({ default: module.SavedPropertiesPage })));
const ProfilePage = lazy(() => import('./pages/profile').then((module) => ({ default: module.ProfilePage })));
const SellerProfilePage = lazy(() => import('./pages/seller').then((module) => ({ default: module.SellerProfilePage })));
const HelpPage = lazy(() => import('./pages/HelpPage').then((module) => ({ default: module.HelpPage })));
const AboutPage = lazy(() => import('./pages/InfoPage').then((module) => ({ default: module.AboutPage })));
const PolicyPage = lazy(() => import('./pages/InfoPage').then((module) => ({ default: module.PolicyPage })));
const RestorationPage = lazy(() => import('./pages/RestorationPage').then((module) => ({ default: module.RestorationPage })));
const RestorationSubmissionPage = lazy(() => import('./pages/RestorationSubmissionPage').then((module) => ({ default: module.RestorationSubmissionPage })));
const RestorationPartnerPage = lazy(() => import('./pages/RestorationPartnerPage').then((module) => ({ default: module.RestorationPartnerPage })));

function RouteLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-700" />
    </div>
  );
}

function FloatingWhatsAppButton() {
  const { pathname } = useLocation();
  const isHelpPage = pathname === '/help';

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className={`fixed right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.22)] ring-1 ring-white/30 transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${isHelpPage ? 'bottom-[calc(9rem+env(safe-area-inset-bottom))] sm:bottom-24' : 'bottom-[calc(5rem+env(safe-area-inset-bottom))] sm:bottom-6'}`}
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-ping" />
      <svg aria-hidden="true" viewBox="0 0 24 24" className="relative z-10 h-6 w-6 fill-current">
        <path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0C5.5 0 .15 5.34.15 11.92c0 2.1.55 4.15 1.6 5.96L.05 24l6.27-1.64a11.9 11.9 0 0 0 5.74 1.46h.01c6.57 0 11.92-5.35 11.93-11.92a11.85 11.85 0 0 0-3.48-8.42ZM12.07 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.46 9.92-9.94 9.92Zm5.45-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/google-onboarding" element={<GoogleOnboardingPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/new" element={<NewPropertyPage />} />
            <Route path="/accommodation/new" element={<NewPropertyPage submissionType="accommodation" />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/restoration" element={<RestorationPage />} />
            <Route path="/restoration/report" element={<RestorationSubmissionPage />} />
            <Route path="/restoration/partners/register" element={<RestorationPartnerPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:conversationId?" element={<MessagesPage />} />
            <Route path="/saved" element={<SavedPropertiesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/seller/:slug" element={<SellerProfilePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PolicyPage kind="privacy" />} />
            <Route path="/terms" element={<PolicyPage kind="terms" />} />
          </Route>
          </Routes>
        </Suspense>

        <FloatingWhatsAppButton />
      </Router>
    </AuthProvider>
  );
}

export default App;
