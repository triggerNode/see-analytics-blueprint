
import { useAuth } from '@/contexts/AuthContext';

export const useFeature = (flag: 'premiumOnly') => {
  const { isAdmin, tier } = useAuth();
  
  switch (flag) {
    case 'premiumOnly':
      return isAdmin || tier === 'pro';
    default:
      return false;
  }
};
