import { useEffect, useState } from 'react';
import { useColorScheme as useColorSchemeCore } from 'react-native';

export function useColorScheme(): 'light' | 'dark' {
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {setHasHydrated(true)}, []);
  const scheme = useColorSchemeCore();
  if (!hasHydrated){
    return 'light';
  }
  return scheme === 'dark' ? 'dark' : 'light';
}
