import styleSheet from 'styled-components/lib/models/StyleSheet';

const getCSS = () => styleSheet.instance.tags.map(x => x.el.innerHTML).join('');

export default getCSS;
