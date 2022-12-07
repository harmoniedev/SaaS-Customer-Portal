export type UserType = {
  license: string;
  role: string;
  email: string;
  name: string;
};

export type UserFields = {
  _id: string;
  lastActiveDate: string;
} & UserType;

export type SortOrder = 'asc' | 'desc';

export type StaticState = 'loading' | 'idle' | 'success' | 'error';

export type StaticFormName = 'edit' | 'add' | 'delete' | 'deleteAll';

export type ParamsListType = {
  key: string;
  value: string | number;
};

export const COLORS = {
  blue: '#496fff',
  lightblue: '#f7fafc',
  white: '#ffffff',
  red: '#f4473f',
  green: '#99cf2d',
  yellow: '#ffc933',
  indigo: '#003e56',
  darkblue: '#334eb3',
  gray: '#e5e7eb',
  black: '#000',
  lightpurple: '#C8D4FF',
  lightindigo: '#B3C5CC',
};

export const ALIGNMENTS = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
  auto: 'Auto',
};

export const SIZES = {
  none: 'None',
  xs: 'Extra Extra Small',
  xxs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
  xxl: 'Extra Extra Large',
};

export type TextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'span'
  | 'div'
  | 'p'
  | 'figcaption'
  | 'strong';

export const FONT_WEIGHTS = {
  thin: 'Thin',
  extralight: 'Extralight',
  light: 'Light',
  normal: 'Normal',
  medium: 'Medium',
  semibold: 'Semibold',
  bold: 'Bold',
  extrabold: 'Extrabold',
  black: 'Black',
};
