import { Icon } from 'antd'

const IconFontUrl = '//at.alicdn.com/t/font_1476029_ztk7nqyks5t.js';

/**
 * 自定义 IconFont
 * @type {React.SFC<IconProps>}
 */
export const IconFont = Icon.createFromIconfontCN({
    scriptUrl: IconFontUrl
});


