import {Dimensions, PixelRatio} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
const insets = initialWindowMetrics.insets || {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidthPortrait = 375;
const guidelineBaseWidthLandscape = 667;
const guidelineBaseWidthLandscapeTablet = 960;
const guidelineBaseWidthPortraitTablet = 773;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthLandscape = windowWidth > windowHeight ? windowWidth : windowHeight;
const widthPortrait = windowWidth < windowHeight ? windowWidth : windowHeight;

export function isPortrait() {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
}

export const scalePortrait = (sizePhone, sizeTablet) => {
  const safeAreaWidthPadding = insets.left + insets.right;

  const usableWidth = widthPortrait - safeAreaWidthPadding;
  return Math.round(
    PixelRatio.roundToNearestPixel((usableWidth / guidelineBaseWidthPortrait) * sizePhone),
  );
};

export const scaleLandscape = (sizeMobile, sizeTablet) => {
  const safeAreaWidthPadding = insets.top + insets.bottom;
  const usableWidth = widthLandscape - safeAreaWidthPadding;
  const normalizeSize = (usableWidth / guidelineBaseWidthLandscape) * sizeMobile;
  return Math.round(PixelRatio.roundToNearestPixel(normalizeSize));
};
