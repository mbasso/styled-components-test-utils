import { ServerStyleSheet } from 'styled-components';
import css from 'css';

import StyleSheet from './styleSheet';
import isServer from './isServer';

const STYLE_TAGS_REGEXP = /<style[^>]*>([^<]*)</g;

const getStyle = (html) => {
  let style = '';
  let matches;

  // eslint-disable-next-line
  while ((matches = STYLE_TAGS_REGEXP.exec(html)) !== null) {
    style += matches[1].trim();
  }

  return style;
};

const getCSS = (parse = false) => {
  let style;

  if (isServer()) {
    style = getStyle(new ServerStyleSheet().getStyleTags());
  } else {
    style = getStyle(StyleSheet.instance.toHTML());
  }

  return parse ? css.parse(style) : style;
};

export default getCSS;
