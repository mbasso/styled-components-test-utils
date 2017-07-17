import { ServerStyleSheet } from 'styled-components';
import StyleSheet from 'styled-components/lib/models/StyleSheet';
import css from 'css';
import isOverV2 from './isOverV2';
import isServer from './isServer';

const STYLE_TAGS_REGEXP = /<style[^>]*>([^<]*)</g;

const getStyle = (html) => {
  let style = '';
  let matches;

  // eslint-disable-next-line
  while((matches = STYLE_TAGS_REGEXP.exec(html)) !== null) {
    style += matches[1].trim();
  }

  return style;
};

const getCSS = (parse = false) => {
  let style;

  if (isOverV2()) {
    if (isServer()) {
      style = getStyle(new ServerStyleSheet().getStyleTags());
    } else {
      style = getStyle(StyleSheet.instance.toHTML());
    }
  } else {
    style = StyleSheet.rules().map(rule => rule.cssText).join('\n');
  }

  return parse ? css.parse(style) : style;
};

export default getCSS;
