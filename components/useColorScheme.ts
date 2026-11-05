import { ColorSchemeName, useColorScheme as useColorSchemeCore } from 'react-native';

export const useColorScheme = (): 'light' | 'dark' => {
  const scheme = useColorSchemeCore() as ColorSchemeName | 'unspecified';
  return scheme === 'dark' ? 'dark' : 'light';
};
