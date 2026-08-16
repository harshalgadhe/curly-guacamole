import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, AUTHORIZED_ADMIN_UID, USE_DEMO_DATA } from '../lib/firebase';

const DEMO_ADMIN_KEY = 'apex_demo_admin_auth';

export const isDemoAuthenticated = (): boolean => {
  return localStorage.getItem(DEMO_ADMIN_KEY) === 'true';
};

export const loginAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
  if (USE_DEMO_DATA) {
    if (email === 'admin@apexindustrial.in' && pass === 'admin123') {
      localStorage.setItem(DEMO_ADMIN_KEY, 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. Use demo: admin@apexindustrial.in / admin123' };
  }

  if (!auth) throw new Error('Firebase Auth not initialized');

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    if (AUTHORIZED_ADMIN_UID && cred.user.uid !== AUTHORIZED_ADMIN_UID) {
      await firebaseSignOut(auth);
      return { success: false, error: 'Access Denied: Your account UID is not authorized for CMS admin access.' };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Authentication failed' };
  }
};

export const logoutAdmin = async (): Promise<void> => {
  if (USE_DEMO_DATA) {
    localStorage.removeItem(DEMO_ADMIN_KEY);
    return;
  }

  if (auth) {
    await firebaseSignOut(auth);
  }
};

export const subscribeAuth = (callback: (user: User | boolean | null) => void) => {
  if (USE_DEMO_DATA) {
    callback(isDemoAuthenticated());
    return () => {};
  }

  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    if (user && AUTHORIZED_ADMIN_UID && user.uid !== AUTHORIZED_ADMIN_UID) {
      callback(false); // Unauthorized user
    } else {
      callback(user);
    }
  });
};
