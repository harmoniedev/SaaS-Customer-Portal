/**
 * Use it like this
 *
 * const { breakpoint, screenWidth } = useBreakpoint();
 *
 *  {screenWidth > BREAKPOINTS.lg && <div>only lg and up</div>}
 */
import useBreakpoints from 'use-breakpoints-width';

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type BreakpointType = keyof typeof BREAKPOINTS;

export const useBreakpoint = (): {
  breakpoint: BreakpointType;
  screenWidth: number;
} => {
  const { breakpoint, width } = useBreakpoints({
    breakpoints: BREAKPOINTS,
    debounceDelay: 1,
  });

  return { breakpoint, screenWidth: width };
};
