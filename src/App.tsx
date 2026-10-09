import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import { Layout } from './components/layout';
import { HomePage } from './pages/HomePage';
import { LoginPage, RegisterPage } from './pages/auth';
import { PropertiesPage, PropertyDetailPage, NewPropertyPage } from './pages/properties';
import { DashboardPage } from './pages/dashboard';
import { MessagesPage } from './pages/messages';
import { SavedPropertiesPage } from './pages/saved';
import { ProfilePage } from './pages/profile';
import { SellerProfilePage } from './pages/seller';
import { HelpPage } from './pages/HelpPage';
import { AboutPage, PolicyPage } from './pages/InfoPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/new" element={<NewPropertyPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
