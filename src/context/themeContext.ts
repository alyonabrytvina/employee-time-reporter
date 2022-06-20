import { createContext } from 'react';

interface ThemeContextProps{
  backgroundRowsOdd: string,
  backgroundRowsEven: string,

  mainBackground: string,
  mainColor: string,
  border: string,
  borderTooltip: string,

  headerColor: string,

  arrowColor: string,
  arrowDisabledColor: string,

  checkboxColor: string,
  checkmarkColor: string,
  checkmarkColorHeader: string,

  backgroundInput: string,
  backgroundHeader: string,
  backgroundTooltip: string
}

export const themes = {
  light: {
    backgroundRowsOdd: '#FFFFFF',
    backgroundRowsEven: '#FFFFFF',
    mainBackground: '#F8F8F8',

    mainColor: '#435072',
    border: '1px solid #D5DEEB',

    headerColor: '#FFFFFF',
    arrowColor: 'invert(62%) sepia(68%) saturate(4724%) hue-rotate(219deg) brightness(103%) contrast(103%)',
    arrowDisabledColor: 'invert(33%) sepia(9%) saturate(486%) hue-rotate(178deg) brightness(92%) contrast(91%)',

    checkboxColor: '#FFFFFF',
    checkmarkColor: 'invert(62%) sepia(68%) saturate(4724%) hue-rotate(219deg) brightness(103%) contrast(103%)',
    checkmarkColorHeader: 'invert(20%) sepia(52%) saturate(1791%) hue-rotate(191deg) brightness(88%) contrast(88%)',

    backgroundInput: '#FFFFFF',
    backgroundHeader: '#FFFFFF',

    backgroundTooltip: '#FFFFFF',
    colorBorderTooltip: '#1E242F',
    borderTooltip: '1px solid #353E56',
  },
  dark: {
    backgroundRowsOdd: '#242B35',
    backgroundRowsEven: '#1E242F',
    mainBackground: '#171E28',

    mainColor: '#B6B4C6',
    border: '1px solid #3D444E',

    headerColor: '#1C467A',
    arrowColor: ' none',
    arrowDisabledColor: 'invert(33%) sepia(9%) saturate(486%) hue-rotate(178deg) brightness(92%) contrast(91%)',

    checkboxColor: '#242B35',
    checkmarkColor: 'none',
    checkmarkColorHeader: 'none',

    backgroundInput: '#242B35',
    backgroundHeader: '#2D333D',

    backgroundTooltip: '#242B35',
    borderTooltip: '1px solid #353E56',
  },
};

export const ThemeContext = createContext<ThemeContextProps>(null!);
