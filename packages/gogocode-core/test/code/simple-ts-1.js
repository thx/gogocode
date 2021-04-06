const code = `
import * as PIXI from 'pixi.js';

export class MainApplication {
    constructor(options) {
        super(options.baseWidth, options.baseHeight, options);
    }
    test(){
      PIXI.test();
    }
}
`;
module.exports = code;