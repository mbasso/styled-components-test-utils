import { ServerStyleSheet } from 'styled-components';
import isOverV2 from './isOverV2';
import isServer from './isServer';

const STYLE_TAGS_REGEXP = /<style[^>]*>([^<]*)</g;

const parseCSSfromHTML = (html) => {
  let css = '';
  let matches;
  // eslint-disable-next-line
  while ((matches = STYLE_TAGS_REGEXP.exec(html)) !== null) {
    css += matches[1].trim();
  }
  return css;
};

const getCSS = (styleSheet) => {
  const overV2 = isOverV2();
  if (overV2 && isServer()) {
    return parseCSSfromHTML(new ServerStyleSheet().getStyleTags());
  } else if (overV2) {
    return parseCSSfromHTML(styleSheet.instance.toHTML());
  }
  return styleSheet.rules().map(rule => rule.cssText).join('\n');
};

export default getCSS;
