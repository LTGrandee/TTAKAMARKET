import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Profile } from '../lib/types';
import { generateId } from '../lib/types';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, userType?: Profile['user_type'], sellerDetails?: Partial<Profile>) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string, userType?: Profile['user_type']) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ttakamarket_auth';

function getStoredAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function setStoredAuth(data: { user: { id: string; email: string }; profile: Profile } | null) {
  if (data) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  else localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      setUser(stored.user);
      setProfile(stored.profile);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string, userType: Profile['user_type'] = 'buyer', sellerDetails?: Partial<Profile>) => {
    try {
      const id = generateId();
      const newProfile: Profile = {
        id,
        email,
        full_name: fullName,
        is_verified: false,
        verification_status: 'pending',
        user_type: userType,
        country: 'Uganda',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...sellerDetails,
      };
      const newUser = { id, email };
      setUser(newUser);
      setProfile(newProfile);
      setStoredAuth({ user: newUser, profile: newProfile });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string, userType: Profile['user_type'] = 'buyer') => {
    try {
      const stored = getStoredAuth();
      if (stored && stored.user.email === email) {
        setUser(stored.user);
        setProfile(stored.profile);
        return { error: null };
      }
      const id = generateId();
      const newProfile: Profile = {
        id,
        email,
        full_name: email.split('@')[0],
        is_verified: false,
        verification_status: 'pending',
        user_type: userType,
        country: 'Uganda',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const newUser = { id, email };
      setUser(newUser);
      setProfile(newProfile);
      setStoredAuth({ user: newUser, profile: newProfile });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    setStoredAuth(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user || !profile) throw new Error('Not authenticated');
      const updated = { ...profile, ...updates, updated_at: new Date().toISOString() };
      setProfile(updated);
      setStoredAuth({ user, profile: updated });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
