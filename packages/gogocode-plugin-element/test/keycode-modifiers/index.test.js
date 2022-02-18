const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/keycode-modifiers');

test('keycode-modifiers', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast);       
    }).not.toThrow();
})

test('key-attribute', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);
    let result = ast.find('<script></script>').has(`Vue.config.keyCodes = $_$`)    
    expect(!result).toBeTruthy();
})

test('key-attribute', () => {
    let keyCodeMap = { "8": "BackSpace", "9": "Tab", "12": "Clear", "13": "Enter", "16": "Shift_L", "17": "Control_L", "18": "Alt_L", "19": "Pause", "20": "Caps_Lock", "27": "Escape", "32": "space", "33": "Prior", "34": "Next", "35": "End", "36": "Home", "37": "Left", "38": "Up", "39": "Right", "40": "Down", "41": "Select", "42": "Print", "43": "Execute", "45": "Insert", "46": "Delete", "47": "Help", "48": "0 equal braceright", "49": "1 exclam onesuperior", "50": "2 quotedbl twosuperior", "51": "3 section threesuperior", "52": "4 dollar", "53": "5 percent", "54": "6 ampersand", "55": "7 slash braceleft", "56": "8 parenleft bracketleft", "57": "9 parenright bracketright", "65": "a", "66": "b", "67": "c", "68": "d", "69": "e", "70": "f", "71": "g", "72": "h", "73": "i", "74": "j", "75": "k", "76": "l", "77": "m", "78": "n", "79": "o", "80": "p", "81": "q", "82": "r", "83": "s", "84": "t", "85": "u", "86": "v", "87": "w", "88": "x", "89": "y", "90": "z", "96": "KP_0", "97": "KP_1", "98": "KP_2", "99": "KP_3", "100": "KP_4 KP_4", "101": "KP_5", "102": "KP_6", "103": "KP_7", "104": "KP_8", "105": "KP_9", "106": "KP_Multiply", "107": "KP_Add", "108": "KP_Separator", "109": "KP_Subtract", "110": "KP_Decimal", "111": "KP_Divide", "112": "F1", "113": "F2", "114": "F3", "115": "F4", "116": "F5", "117": "F6", "118": "F7", "119": "F8", "120": "F9", "121": "F10", "122": "F11", "123": "F12", "124": "F13", "125": "F14", "126": "F15", "127": "F16", "128": "F17", "129": "F18", "130": "F19", "131": "F20", "132": "F21", "133": "F22", "134": "F23", "135": "F24", "136": "Num_Lock", "137": "Scroll_Lock", "187": "acute grave", "188": "comma semicolon", "189": "minus underscore", "190": "period colon", "192": "numbersign apostrophe", "210": "plusminus hyphen macron", "212": "copyright registered", "213": "guillemotleft guillemotright", "214": "masculine ordfeminine", "215": "ae AE", "216": "cent yen", "217": "questiondown exclamdown", "218": "onequarter onehalf threequarters", "220": "less greater bar", "221": "plus asterisk asciitilde", "227": "multiply division", "228": "acircumflex Acircumflex", "229": "ecircumflex Ecircumflex", "230": "icircumflex Icircumflex", "231": "ocircumflex Ocircumflex", "232": "ucircumflex Ucircumflex", "233": "ntilde Ntilde", "234": "yacute Yacute", "235": "oslash Ooblique", "236": "aring Aring", "237": "ccedilla Ccedilla", "238": "thorn THORN", "239": "eth ETH", "240": "diaeresis cedilla currency", "241": "agrave Agrave atilde Atilde", "242": "egrave Egrave", "243": "igrave Igrave", "244": "ograve Ograve otilde Otilde", "245": "ugrave Ugrave", "246": "adiaeresis Adiaeresis", "247": "ediaeresis Ediaeresis", "248": "idiaeresis Idiaeresis", "249": "odiaeresis Odiaeresis", "250": "udiaeresis Udiaeresis", "251": "ssharp question backslash", "252": "asciicircum degree", "253": "3 sterling", "254": "Mode_switch" }
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);
    let result = true;
    ast.find('<template></template>')
    .find(['<$_$></$_$>', '<$_$ />']).each((node) => {       
        if (Array.isArray(node.attr('content.attributes'))) {
            node.attr('content.attributes').forEach((attr) => {
                for (let keyItem in keyCodeMap) {
                    if(attr.key.content.endsWith(`.${keyItem}`)){
                        return false
                    }                   
                }
            })
        }
    })
    expect(result).toBeTruthy();
})

