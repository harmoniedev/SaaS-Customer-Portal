import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS, SIZES, COLORS } from '../../types';

export const SIZE_OPTIONS = pick(SIZES, 'xxs', 'xs', 'sm', 'md', 'lg');
export type SizeType = keyof typeof SIZE_OPTIONS;

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'center', 'right');
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const ICON_POSITION_OPTIONS = { before: 'Before', after: 'After' };
export type IconPositionType = keyof typeof ICON_POSITION_OPTIONS;

export const COLOR_OPTIONS = pick(
  COLORS,
  'white',
  'lightblue',
  'blue',
  'red',
  'green',
  'yellow',
  'indigo',
  'darkblue',
  'gray',
  'lightindigo',
);
export type ColorType = keyof typeof COLOR_OPTIONS;
