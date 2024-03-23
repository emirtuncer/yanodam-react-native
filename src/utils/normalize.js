import {
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';

export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone X's scale
const wScale = SCREEN_WIDTH / 375;
const hScale = SCREEN_HEIGHT / 812;

/**
 * Normalize with scale
 * default: wScale = SCREEN_WIDTH / 375;
 * default: hScale = SCREEN_HEIGHT / 812;
 * @export
 * @param {*} size
 * @param {string} [based='width']
 * @return {*}
 */

export function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * hScale : size * wScale;
  if (Platform.OS === 'ios') {
    return Math.round(
      PixelRatio.roundToNearestPixel(newSize),
    );
  } else {
    return (
      Math.round(PixelRatio.roundToNearestPixel(newSize)) -
      2
    );
  }
}
