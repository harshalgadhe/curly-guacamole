import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, USE_DEMO_DATA } from '../lib/firebase';
import { SiteSettings } from '../types';
import { initialSiteSettings } from '../data/seedData';

const STORAGE_KEY = 'apex_site_settings';

export const getSiteSettings = async (): Promise<SiteSettings> => {
  if (USE_DEMO_DATA) {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  }

  if (!db) throw new Error('Firestore not initialized');
  const docRef = doc(db, 'settings', 'general');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data() as SiteSettings;
  }
  return initialSiteSettings;
};

export const updateSiteSettings = async (settings: SiteSettings): Promise<void> => {
  if (USE_DEMO_DATA) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return;
  }

  if (!db) throw new Error('Firestore not initialized');
  const docRef = doc(db, 'settings', 'general');
  await setDoc(docRef, settings, { merge: true });
};
