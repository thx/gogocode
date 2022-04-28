/*md5:d614c0dcfc2216bda4d23a8f4ed53fb4*/
const CROSS_ONE_SITE_CONFIG: {
  [scope: string]: {
    remote?: string;
    library?: string;
    version?: string;
    scripts?: {
      [library: string]: string
    };
    styles?: Array<string>;
    props?: any
  }
} = window.__CROSS_ONE_SITE_CONFIG__ || {}

export default CROSS_ONE_SITE_CONFIG
