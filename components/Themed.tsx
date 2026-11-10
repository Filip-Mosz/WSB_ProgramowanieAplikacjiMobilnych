/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { Text as DefaultText, TextProps as DefaultTextProps,
  View as DefaultView, ViewProps as DefaultViewProps } from 'react-native';
import * as ColorsModule from '../constants/Colors';
import {useColorScheme} from "@/components/useColorScheme";

const Colors = (ColorsModule as any).Colors || (ColorsModule as any).default || ColorsModule;

type ThemeProps = {  lightColor?: string;  darkColor?: string;};
export type TextProps = ThemeProps & DefaultTextProps;
export type ViewProps = ThemeProps & DefaultViewProps;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  const themeColors = Colors?.[theme] || Colors?.light || {};
  return themeColors[colorName] ?? (colorName === 'text' ? '#000000' : '#ffffff');
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
