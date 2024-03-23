/*
 * Author: Ankur Gupta(ankurg22)
 */

import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from 'react-native-responsive-screen';

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 360, 640 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const wp = (dimension) => {
  return wp2dp((dimension / 360) * 100 + '%');
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 360, 640 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const hp = (dimension) => {
  return hp2dp((dimension / 640) * 100 + '%');
};
