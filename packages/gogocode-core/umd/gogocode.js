(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.gogocode = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser$1 = true;
	var env = {};
	var argv = [];
	var version$1 = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var browser$1$1 = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser$1,
	  env: env,
	  argv: argv,
	  version: version$1,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	var __importStar = (undefined && undefined.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var fs_1 = __importDefault(require("fs"));
	var types$3 = __importStar(require("ast-types"));
	exports.types = types$3;
	var parser_1 = require("./lib/parser");
	exports.parse = parser_1.parse;
	var printer_1 = require("./lib/printer");
	/**
	 * Traverse and potentially modify an abstract syntax tree using a
	 * convenient visitor syntax:
	 *
	 *   recast.visit(ast, {
	 *     names: [],
	 *     visitIdentifier: function(path) {
	 *       var node = path.value;
	 *       this.visitor.names.push(node.name);
	 *       this.traverse(path);
	 *     }
	 *   });
	 */
	var ast_types_1 = require("ast-types");
	exports.visit = ast_types_1.visit;
	/**
	 * Reprint a modified syntax tree using as much of the original source
	 * code as possible.
	 */
	function print(node, options) {
	    return new printer_1.Printer(options).print(node);
	}
	exports.print = print;
	/**
	 * Print without attempting to reuse any original source code.
	 */
	function prettyPrint(node, options) {
	    return new printer_1.Printer(options).printGenerically(node);
	}
	exports.prettyPrint = prettyPrint;
	/**
	 * Convenient command-line interface (see e.g. example/add-braces).
	 */
	function run(transformer, options) {
	    return runFile(browser$1$1.argv[2], transformer, options);
	}
	exports.run = run;
	function runFile(path, transformer, options) {
	    fs_1.default.readFile(path, "utf-8", function (err, code) {
	        if (err) {
	            console.error(err);
	            return;
	        }
	        runString(code, transformer, options);
	    });
	}
	function defaultWriteback(output) {
	    browser$1$1.stdout.write(output);
	}
	function runString(code, transformer, options) {
	    var writeback = options && options.writeback || defaultWriteback;
	    transformer(parser_1.parse(code, options), function (node) {
	        writeback(print(node, options).code);
	    });
	}

	var main$2 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var require$$1 = /*@__PURE__*/getAugmentedNamespace(main$2);

	var lib = {};

	Object.defineProperty(lib, '__esModule', { value: true });

	const beforeExpr = true;
	const startsExpr = true;
	const isLoop = true;
	const isAssign = true;
	const prefix = true;
	const postfix = true;
	class TokenType {
	  constructor(label, conf = {}) {
	    this.label = void 0;
	    this.keyword = void 0;
	    this.beforeExpr = void 0;
	    this.startsExpr = void 0;
	    this.rightAssociative = void 0;
	    this.isLoop = void 0;
	    this.isAssign = void 0;
	    this.prefix = void 0;
	    this.postfix = void 0;
	    this.binop = void 0;
	    this.updateContext = void 0;
	    this.label = label;
	    this.keyword = conf.keyword;
	    this.beforeExpr = !!conf.beforeExpr;
	    this.startsExpr = !!conf.startsExpr;
	    this.rightAssociative = !!conf.rightAssociative;
	    this.isLoop = !!conf.isLoop;
	    this.isAssign = !!conf.isAssign;
	    this.prefix = !!conf.prefix;
	    this.postfix = !!conf.postfix;
	    this.binop = conf.binop != null ? conf.binop : null;
	    this.updateContext = null;
	  }

	}
	const keywords$1 = new Map();

	function createKeyword(name, options = {}) {
	  options.keyword = name;
	  const token = new TokenType(name, options);
	  keywords$1.set(name, token);
	  return token;
	}

	function createBinop(name, binop) {
	  return new TokenType(name, {
	    beforeExpr,
	    binop
	  });
	}

	const types$1 = {
	  num: new TokenType("num", {
	    startsExpr
	  }),
	  bigint: new TokenType("bigint", {
	    startsExpr
	  }),
	  decimal: new TokenType("decimal", {
	    startsExpr
	  }),
	  regexp: new TokenType("regexp", {
	    startsExpr
	  }),
	  string: new TokenType("string", {
	    startsExpr
	  }),
	  name: new TokenType("name", {
	    startsExpr
	  }),
	  privateName: new TokenType("#name", {
	    startsExpr
	  }),
	  eof: new TokenType("eof"),
	  bracketL: new TokenType("[", {
	    beforeExpr,
	    startsExpr
	  }),
	  bracketHashL: new TokenType("#[", {
	    beforeExpr,
	    startsExpr
	  }),
	  bracketBarL: new TokenType("[|", {
	    beforeExpr,
	    startsExpr
	  }),
	  bracketR: new TokenType("]"),
	  bracketBarR: new TokenType("|]"),
	  braceL: new TokenType("{", {
	    beforeExpr,
	    startsExpr
	  }),
	  braceBarL: new TokenType("{|", {
	    beforeExpr,
	    startsExpr
	  }),
	  braceHashL: new TokenType("#{", {
	    beforeExpr,
	    startsExpr
	  }),
	  braceR: new TokenType("}", {
	    beforeExpr
	  }),
	  braceBarR: new TokenType("|}"),
	  parenL: new TokenType("(", {
	    beforeExpr,
	    startsExpr
	  }),
	  parenR: new TokenType(")"),
	  comma: new TokenType(",", {
	    beforeExpr
	  }),
	  semi: new TokenType(";", {
	    beforeExpr
	  }),
	  colon: new TokenType(":", {
	    beforeExpr
	  }),
	  doubleColon: new TokenType("::", {
	    beforeExpr
	  }),
	  dot: new TokenType("."),
	  question: new TokenType("?", {
	    beforeExpr
	  }),
	  questionDot: new TokenType("?."),
	  arrow: new TokenType("=>", {
	    beforeExpr
	  }),
	  template: new TokenType("template"),
	  ellipsis: new TokenType("...", {
	    beforeExpr
	  }),
	  backQuote: new TokenType("`", {
	    startsExpr
	  }),
	  dollarBraceL: new TokenType("${", {
	    beforeExpr,
	    startsExpr
	  }),
	  at: new TokenType("@"),
	  hash: new TokenType("#", {
	    startsExpr
	  }),
	  interpreterDirective: new TokenType("#!..."),
	  eq: new TokenType("=", {
	    beforeExpr,
	    isAssign
	  }),
	  assign: new TokenType("_=", {
	    beforeExpr,
	    isAssign
	  }),
	  slashAssign: new TokenType("_=", {
	    beforeExpr,
	    isAssign
	  }),
	  incDec: new TokenType("++/--", {
	    prefix,
	    postfix,
	    startsExpr
	  }),
	  bang: new TokenType("!", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  tilde: new TokenType("~", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  pipeline: createBinop("|>", 0),
	  nullishCoalescing: createBinop("??", 1),
	  logicalOR: createBinop("||", 1),
	  logicalAND: createBinop("&&", 2),
	  bitwiseOR: createBinop("|", 3),
	  bitwiseXOR: createBinop("^", 4),
	  bitwiseAND: createBinop("&", 5),
	  equality: createBinop("==/!=/===/!==", 6),
	  relational: createBinop("</>/<=/>=", 7),
	  bitShift: createBinop("<</>>/>>>", 8),
	  plusMin: new TokenType("+/-", {
	    beforeExpr,
	    binop: 9,
	    prefix,
	    startsExpr
	  }),
	  modulo: new TokenType("%", {
	    beforeExpr,
	    binop: 10,
	    startsExpr
	  }),
	  star: new TokenType("*", {
	    binop: 10
	  }),
	  slash: createBinop("/", 10),
	  exponent: new TokenType("**", {
	    beforeExpr,
	    binop: 11,
	    rightAssociative: true
	  }),
	  _break: createKeyword("break"),
	  _case: createKeyword("case", {
	    beforeExpr
	  }),
	  _catch: createKeyword("catch"),
	  _continue: createKeyword("continue"),
	  _debugger: createKeyword("debugger"),
	  _default: createKeyword("default", {
	    beforeExpr
	  }),
	  _do: createKeyword("do", {
	    isLoop,
	    beforeExpr
	  }),
	  _else: createKeyword("else", {
	    beforeExpr
	  }),
	  _finally: createKeyword("finally"),
	  _for: createKeyword("for", {
	    isLoop
	  }),
	  _function: createKeyword("function", {
	    startsExpr
	  }),
	  _if: createKeyword("if"),
	  _return: createKeyword("return", {
	    beforeExpr
	  }),
	  _switch: createKeyword("switch"),
	  _throw: createKeyword("throw", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  _try: createKeyword("try"),
	  _var: createKeyword("var"),
	  _const: createKeyword("const"),
	  _while: createKeyword("while", {
	    isLoop
	  }),
	  _with: createKeyword("with"),
	  _new: createKeyword("new", {
	    beforeExpr,
	    startsExpr
	  }),
	  _this: createKeyword("this", {
	    startsExpr
	  }),
	  _super: createKeyword("super", {
	    startsExpr
	  }),
	  _class: createKeyword("class", {
	    startsExpr
	  }),
	  _extends: createKeyword("extends", {
	    beforeExpr
	  }),
	  _export: createKeyword("export"),
	  _import: createKeyword("import", {
	    startsExpr
	  }),
	  _null: createKeyword("null", {
	    startsExpr
	  }),
	  _true: createKeyword("true", {
	    startsExpr
	  }),
	  _false: createKeyword("false", {
	    startsExpr
	  }),
	  _in: createKeyword("in", {
	    beforeExpr,
	    binop: 7
	  }),
	  _instanceof: createKeyword("instanceof", {
	    beforeExpr,
	    binop: 7
	  }),
	  _typeof: createKeyword("typeof", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  _void: createKeyword("void", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  }),
	  _delete: createKeyword("delete", {
	    beforeExpr,
	    prefix,
	    startsExpr
	  })
	};

	const lineBreak = /\r\n?|[\n\u2028\u2029]/;
	const lineBreakG = new RegExp(lineBreak.source, "g");
	function isNewLine(code) {
	  switch (code) {
	    case 10:
	    case 13:
	    case 8232:
	    case 8233:
	      return true;

	    default:
	      return false;
	  }
	}
	const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
	function isWhitespace$9(code) {
	  switch (code) {
	    case 0x0009:
	    case 0x000b:
	    case 0x000c:
	    case 32:
	    case 160:
	    case 5760:
	    case 0x2000:
	    case 0x2001:
	    case 0x2002:
	    case 0x2003:
	    case 0x2004:
	    case 0x2005:
	    case 0x2006:
	    case 0x2007:
	    case 0x2008:
	    case 0x2009:
	    case 0x200a:
	    case 0x202f:
	    case 0x205f:
	    case 0x3000:
	    case 0xfeff:
	      return true;

	    default:
	      return false;
	  }
	}

	class Position {
	  constructor(line, col) {
	    this.line = void 0;
	    this.column = void 0;
	    this.line = line;
	    this.column = col;
	  }

	}
	class SourceLocation {
	  constructor(start, end) {
	    this.start = void 0;
	    this.end = void 0;
	    this.filename = void 0;
	    this.identifierName = void 0;
	    this.start = start;
	    this.end = end;
	  }

	}
	function getLineInfo(input, offset) {
	  let line = 1;
	  let lineStart = 0;
	  let match;
	  lineBreakG.lastIndex = 0;

	  while ((match = lineBreakG.exec(input)) && match.index < offset) {
	    line++;
	    lineStart = lineBreakG.lastIndex;
	  }

	  return new Position(line, offset - lineStart);
	}

	class BaseParser {
	  constructor() {
	    this.sawUnambiguousESM = false;
	    this.ambiguousScriptDifferentAst = false;
	  }

	  hasPlugin(name) {
	    return this.plugins.has(name);
	  }

	  getPluginOption(plugin, name) {
	    if (this.hasPlugin(plugin)) return this.plugins.get(plugin)[name];
	  }

	}

	function last(stack) {
	  return stack[stack.length - 1];
	}

	class CommentsParser extends BaseParser {
	  addComment(comment) {
	    if (this.filename) comment.loc.filename = this.filename;
	    this.state.trailingComments.push(comment);
	    this.state.leadingComments.push(comment);
	  }

	  adjustCommentsAfterTrailingComma(node, elements, takeAllComments) {
	    if (this.state.leadingComments.length === 0) {
	      return;
	    }

	    let lastElement = null;
	    let i = elements.length;

	    while (lastElement === null && i > 0) {
	      lastElement = elements[--i];
	    }

	    if (lastElement === null) {
	      return;
	    }

	    for (let j = 0; j < this.state.leadingComments.length; j++) {
	      if (this.state.leadingComments[j].end < this.state.commentPreviousNode.end) {
	        this.state.leadingComments.splice(j, 1);
	        j--;
	      }
	    }

	    const newTrailingComments = [];

	    for (let i = 0; i < this.state.leadingComments.length; i++) {
	      const leadingComment = this.state.leadingComments[i];

	      if (leadingComment.end < node.end) {
	        newTrailingComments.push(leadingComment);

	        if (!takeAllComments) {
	          this.state.leadingComments.splice(i, 1);
	          i--;
	        }
	      } else {
	        if (node.trailingComments === undefined) {
	          node.trailingComments = [];
	        }

	        node.trailingComments.push(leadingComment);
	      }
	    }

	    if (takeAllComments) this.state.leadingComments = [];

	    if (newTrailingComments.length > 0) {
	      lastElement.trailingComments = newTrailingComments;
	    } else if (lastElement.trailingComments !== undefined) {
	      lastElement.trailingComments = [];
	    }
	  }

	  processComment(node) {
	    if (node.type === "Program" && node.body.length > 0) return;
	    const stack = this.state.commentStack;
	    let firstChild, lastChild, trailingComments, i, j;

	    if (this.state.trailingComments.length > 0) {
	      if (this.state.trailingComments[0].start >= node.end) {
	        trailingComments = this.state.trailingComments;
	        this.state.trailingComments = [];
	      } else {
	        this.state.trailingComments.length = 0;
	      }
	    } else if (stack.length > 0) {
	      const lastInStack = last(stack);

	      if (lastInStack.trailingComments && lastInStack.trailingComments[0].start >= node.end) {
	        trailingComments = lastInStack.trailingComments;
	        delete lastInStack.trailingComments;
	      }
	    }

	    if (stack.length > 0 && last(stack).start >= node.start) {
	      firstChild = stack.pop();
	    }

	    while (stack.length > 0 && last(stack).start >= node.start) {
	      lastChild = stack.pop();
	    }

	    if (!lastChild && firstChild) lastChild = firstChild;

	    if (firstChild) {
	      switch (node.type) {
	        case "ObjectExpression":
	          this.adjustCommentsAfterTrailingComma(node, node.properties);
	          break;

	        case "ObjectPattern":
	          this.adjustCommentsAfterTrailingComma(node, node.properties, true);
	          break;

	        case "CallExpression":
	          this.adjustCommentsAfterTrailingComma(node, node.arguments);
	          break;

	        case "ArrayExpression":
	          this.adjustCommentsAfterTrailingComma(node, node.elements);
	          break;

	        case "ArrayPattern":
	          this.adjustCommentsAfterTrailingComma(node, node.elements, true);
	          break;
	      }
	    } else if (this.state.commentPreviousNode && (this.state.commentPreviousNode.type === "ImportSpecifier" && node.type !== "ImportSpecifier" || this.state.commentPreviousNode.type === "ExportSpecifier" && node.type !== "ExportSpecifier")) {
	      this.adjustCommentsAfterTrailingComma(node, [this.state.commentPreviousNode]);
	    }

	    if (lastChild) {
	      if (lastChild.leadingComments) {
	        if (lastChild !== node && lastChild.leadingComments.length > 0 && last(lastChild.leadingComments).end <= node.start) {
	          node.leadingComments = lastChild.leadingComments;
	          delete lastChild.leadingComments;
	        } else {
	          for (i = lastChild.leadingComments.length - 2; i >= 0; --i) {
	            if (lastChild.leadingComments[i].end <= node.start) {
	              node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
	              break;
	            }
	          }
	        }
	      }
	    } else if (this.state.leadingComments.length > 0) {
	      if (last(this.state.leadingComments).end <= node.start) {
	        if (this.state.commentPreviousNode) {
	          for (j = 0; j < this.state.leadingComments.length; j++) {
	            if (this.state.leadingComments[j].end < this.state.commentPreviousNode.end) {
	              this.state.leadingComments.splice(j, 1);
	              j--;
	            }
	          }
	        }

	        if (this.state.leadingComments.length > 0) {
	          node.leadingComments = this.state.leadingComments;
	          this.state.leadingComments = [];
	        }
	      } else {
	        for (i = 0; i < this.state.leadingComments.length; i++) {
	          if (this.state.leadingComments[i].end > node.start) {
	            break;
	          }
	        }

	        const leadingComments = this.state.leadingComments.slice(0, i);

	        if (leadingComments.length) {
	          node.leadingComments = leadingComments;
	        }

	        trailingComments = this.state.leadingComments.slice(i);

	        if (trailingComments.length === 0) {
	          trailingComments = null;
	        }
	      }
	    }

	    this.state.commentPreviousNode = node;

	    if (trailingComments) {
	      if (trailingComments.length && trailingComments[0].start >= node.start && last(trailingComments).end <= node.end) {
	        node.innerComments = trailingComments;
	      } else {
	        const firstTrailingCommentIndex = trailingComments.findIndex(comment => comment.end >= node.end);

	        if (firstTrailingCommentIndex > 0) {
	          node.innerComments = trailingComments.slice(0, firstTrailingCommentIndex);
	          node.trailingComments = trailingComments.slice(firstTrailingCommentIndex);
	        } else {
	          node.trailingComments = trailingComments;
	        }
	      }
	    }

	    stack.push(node);
	  }

	}

	const ErrorCodes = Object.freeze({
	  SyntaxError: "BABEL_PARSER_SYNTAX_ERROR",
	  SourceTypeModuleError: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED"
	});

	const ErrorMessages = makeErrorTemplates({
	  AccessorIsGenerator: "A %0ter cannot be a generator.",
	  ArgumentsInClass: "'arguments' is only allowed in functions and class methods.",
	  AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block.",
	  AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function.",
	  AwaitBindingIdentifierInStaticBlock: "Can not use 'await' as identifier inside a static block.",
	  AwaitExpressionFormalParameter: "'await' is not allowed in async function parameters.",
	  AwaitNotInAsyncContext: "'await' is only allowed within async functions and at the top levels of modules.",
	  AwaitNotInAsyncFunction: "'await' is only allowed within async functions.",
	  BadGetterArity: "A 'get' accesor must not have any formal parameters.",
	  BadSetterArity: "A 'set' accesor must have exactly one formal parameter.",
	  BadSetterRestParameter: "A 'set' accesor function argument must not be a rest parameter.",
	  ConstructorClassField: "Classes may not have a field named 'constructor'.",
	  ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'.",
	  ConstructorIsAccessor: "Class constructor may not be an accessor.",
	  ConstructorIsAsync: "Constructor can't be an async function.",
	  ConstructorIsGenerator: "Constructor can't be a generator.",
	  DeclarationMissingInitializer: "'%0' require an initialization value.",
	  DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. You can set the 'decoratorsBeforeExport' option to false to use the 'export @decorator class {}' syntax.",
	  DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
	  DecoratorExportClass: "Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead.",
	  DecoratorSemicolon: "Decorators must not be followed by a semicolon.",
	  DecoratorStaticBlock: "Decorators can't be used with a static block.",
	  DeletePrivateField: "Deleting a private field is not allowed.",
	  DestructureNamedImport: "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
	  DuplicateConstructor: "Duplicate constructor in the same class.",
	  DuplicateDefaultExport: "Only one default export allowed per module.",
	  DuplicateExport: "`%0` has already been exported. Exported identifiers must be unique.",
	  DuplicateProto: "Redefinition of __proto__ property.",
	  DuplicateRegExpFlags: "Duplicate regular expression flag.",
	  ElementAfterRest: "Rest element must be last element.",
	  EscapedCharNotAnIdentifier: "Invalid Unicode escape.",
	  ExportBindingIsString: "A string literal cannot be used as an exported binding without `from`.\n- Did you mean `export { '%0' as '%1' } from 'some-module'`?",
	  ExportDefaultFromAsIdentifier: "'from' is not allowed as an identifier after 'export default'.",
	  ForInOfLoopInitializer: "'%0' loop variable declaration may not have an initializer.",
	  ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.",
	  ForOfLet: "The left-hand side of a for-of loop may not start with 'let'.",
	  GeneratorInSingleStatementContext: "Generators can only be declared at the top level or inside a block.",
	  IllegalBreakContinue: "Unsyntactic %0.",
	  IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list.",
	  IllegalReturn: "'return' outside of function.",
	  ImportBindingIsString: 'A string literal cannot be used as an imported binding.\n- Did you mean `import { "%0" as foo }`?',
	  ImportCallArgumentTrailingComma: "Trailing comma is disallowed inside import(...) arguments.",
	  ImportCallArity: "`import()` requires exactly %0.",
	  ImportCallNotNewExpression: "Cannot use new with import(...).",
	  ImportCallSpreadArgument: "`...` is not allowed in `import()`.",
	  InvalidBigIntLiteral: "Invalid BigIntLiteral.",
	  InvalidCodePoint: "Code point out of bounds.",
	  InvalidDecimal: "Invalid decimal.",
	  InvalidDigit: "Expected number in radix %0.",
	  InvalidEscapeSequence: "Bad character escape sequence.",
	  InvalidEscapeSequenceTemplate: "Invalid escape sequence in template.",
	  InvalidEscapedReservedWord: "Escape sequence in keyword %0.",
	  InvalidIdentifier: "Invalid identifier %0.",
	  InvalidLhs: "Invalid left-hand side in %0.",
	  InvalidLhsBinding: "Binding invalid left-hand side in %0.",
	  InvalidNumber: "Invalid number.",
	  InvalidOrMissingExponent: "Floating-point numbers require a valid exponent after the 'e'.",
	  InvalidOrUnexpectedToken: "Unexpected character '%0'.",
	  InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern.",
	  InvalidPrivateFieldResolution: "Private name #%0 is not defined.",
	  InvalidPropertyBindingPattern: "Binding member expression.",
	  InvalidRecordProperty: "Only properties and spread elements are allowed in record definitions.",
	  InvalidRestAssignmentPattern: "Invalid rest operator's argument.",
	  LabelRedeclaration: "Label '%0' is already declared.",
	  LetInLexicalBinding: "'let' is not allowed to be used as a name in 'let' or 'const' declarations.",
	  LineTerminatorBeforeArrow: "No line break is allowed before '=>'.",
	  MalformedRegExpFlags: "Invalid regular expression flag.",
	  MissingClassName: "A class name is required.",
	  MissingEqInAssignment: "Only '=' operator can be used for specifying default value.",
	  MissingSemicolon: "Missing semicolon.",
	  MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX.",
	  MixingCoalesceWithLogical: "Nullish coalescing operator(??) requires parens when mixing with logical operators.",
	  ModuleAttributeDifferentFromType: "The only accepted module attribute is `type`.",
	  ModuleAttributeInvalidValue: "Only string literals are allowed as module attribute values.",
	  ModuleAttributesWithDuplicateKeys: 'Duplicate key "%0" is not allowed in module attributes.',
	  ModuleExportNameHasLoneSurrogate: "An export name cannot include a lone surrogate, found '\\u%0'.",
	  ModuleExportUndefined: "Export '%0' is not defined.",
	  MultipleDefaultsInSwitch: "Multiple default clauses.",
	  NewlineAfterThrow: "Illegal newline after throw.",
	  NoCatchOrFinally: "Missing catch or finally clause.",
	  NumberIdentifier: "Identifier directly after number.",
	  NumericSeparatorInEscapeSequence: "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.",
	  ObsoleteAwaitStar: "'await*' has been removed from the async functions proposal. Use Promise.all() instead.",
	  OptionalChainingNoNew: "Constructors in/after an Optional Chain are not allowed.",
	  OptionalChainingNoTemplate: "Tagged Template Literals are not allowed in optionalChain.",
	  OverrideOnConstructor: "'override' modifier cannot appear on a constructor declaration.",
	  ParamDupe: "Argument name clash.",
	  PatternHasAccessor: "Object pattern can't contain getter or setter.",
	  PatternHasMethod: "Object pattern can't contain methods.",
	  PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.',
	  PipelineBodySequenceExpression: "Pipeline body may not be a comma-separated sequence expression.",
	  PipelineHeadSequenceExpression: "Pipeline head should not be a comma-separated sequence expression.",
	  PipelineTopicUnused: "Pipeline is in topic style but does not use topic reference.",
	  PrimaryTopicNotAllowed: "Topic reference was used in a lexical context without topic binding.",
	  PrimaryTopicRequiresSmartPipeline: "Primary Topic Reference found but pipelineOperator not passed 'smart' for 'proposal' option.",
	  PrivateInExpectedIn: "Private names are only allowed in property accesses (`obj.#%0`) or in `in` expressions (`#%0 in obj`).",
	  PrivateNameRedeclaration: "Duplicate private name #%0.",
	  RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
	  RecordNoProto: "'__proto__' is not allowed in Record expressions.",
	  RestTrailingComma: "Unexpected trailing comma after rest element.",
	  SloppyFunction: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.",
	  StaticPrototype: "Classes may not have static property named prototype.",
	  StrictDelete: "Deleting local variable in strict mode.",
	  StrictEvalArguments: "Assigning to '%0' in strict mode.",
	  StrictEvalArgumentsBinding: "Binding '%0' in strict mode.",
	  StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block.",
	  StrictNumericEscape: "The only valid numeric escape in strict mode is '\\0'.",
	  StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode.",
	  StrictWith: "'with' in strict mode.",
	  SuperNotAllowed: "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
	  SuperPrivateField: "Private fields can't be accessed on super.",
	  TrailingDecorator: "Decorators must be attached to a class element.",
	  TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
	  TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
	  UnexpectedArgumentPlaceholder: "Unexpected argument placeholder.",
	  UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.',
	  UnexpectedDigitAfterHash: "Unexpected digit after hash token.",
	  UnexpectedImportExport: "'import' and 'export' may only appear at the top level.",
	  UnexpectedKeyword: "Unexpected keyword '%0'.",
	  UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration.",
	  UnexpectedLexicalDeclaration: "Lexical declaration cannot appear in a single-statement context.",
	  UnexpectedNewTarget: "`new.target` can only be used in functions or class properties.",
	  UnexpectedNumericSeparator: "A numeric separator is only allowed between two digits.",
	  UnexpectedPrivateField: "Private names can only be used as the name of a class element (i.e. class C { #p = 42; #m() {} } )\n or a property of member expression (i.e. this.#p).",
	  UnexpectedReservedWord: "Unexpected reserved word '%0'.",
	  UnexpectedSuper: "'super' is only allowed in object methods and classes.",
	  UnexpectedToken: "Unexpected token '%0'.",
	  UnexpectedTokenUnaryExponentiation: "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
	  UnsupportedBind: "Binding should be performed on object property.",
	  UnsupportedDecoratorExport: "A decorated export must export a class declaration.",
	  UnsupportedDefaultExport: "Only expressions, functions or classes are allowed as the `default` export.",
	  UnsupportedImport: "`import` can only be used in `import()` or `import.meta`.",
	  UnsupportedMetaProperty: "The only valid meta property for %0 is %0.%1.",
	  UnsupportedParameterDecorator: "Decorators cannot be used to decorate parameters.",
	  UnsupportedPropertyDecorator: "Decorators cannot be used to decorate object literal properties.",
	  UnsupportedSuper: "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).",
	  UnterminatedComment: "Unterminated comment.",
	  UnterminatedRegExp: "Unterminated regular expression.",
	  UnterminatedString: "Unterminated string constant.",
	  UnterminatedTemplate: "Unterminated template.",
	  VarRedeclaration: "Identifier '%0' has already been declared.",
	  YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator.",
	  YieldInParameter: "Yield expression is not allowed in formal parameters.",
	  ZeroDigitNumericSeparator: "Numeric separator can not be used after leading 0."
	}, ErrorCodes.SyntaxError);
	const SourceTypeModuleErrorMessages = makeErrorTemplates({
	  ImportMetaOutsideModule: `import.meta may appear only with 'sourceType: "module"'`,
	  ImportOutsideModule: `'import' and 'export' may appear only with 'sourceType: "module"'`
	}, ErrorCodes.SourceTypeModuleError);

	function makeErrorTemplates(messages, code) {
	  const templates = {};
	  Object.keys(messages).forEach(reasonCode => {
	    templates[reasonCode] = Object.freeze({
	      code,
	      reasonCode,
	      template: messages[reasonCode]
	    });
	  });
	  return Object.freeze(templates);
	}
	class ParserError extends CommentsParser {
	  getLocationForPosition(pos) {
	    let loc;
	    if (pos === this.state.start) loc = this.state.startLoc;else if (pos === this.state.lastTokStart) loc = this.state.lastTokStartLoc;else if (pos === this.state.end) loc = this.state.endLoc;else if (pos === this.state.lastTokEnd) loc = this.state.lastTokEndLoc;else loc = getLineInfo(this.input, pos);
	    return loc;
	  }

	  raise(pos, {
	    code,
	    reasonCode,
	    template
	  }, ...params) {
	    return this.raiseWithData(pos, {
	      code,
	      reasonCode
	    }, template, ...params);
	  }

	  raiseOverwrite(pos, {
	    code,
	    template
	  }, ...params) {
	    const loc = this.getLocationForPosition(pos);
	    const message = template.replace(/%(\d+)/g, (_, i) => params[i]) + ` (${loc.line}:${loc.column})`;

	    if (this.options.errorRecovery) {
	      const errors = this.state.errors;

	      for (let i = errors.length - 1; i >= 0; i--) {
	        const error = errors[i];

	        if (error.pos === pos) {
	          return Object.assign(error, {
	            message
	          });
	        } else if (error.pos < pos) {
	          break;
	        }
	      }
	    }

	    return this._raise({
	      code,
	      loc,
	      pos
	    }, message);
	  }

	  raiseWithData(pos, data, errorTemplate, ...params) {
	    const loc = this.getLocationForPosition(pos);
	    const message = errorTemplate.replace(/%(\d+)/g, (_, i) => params[i]) + ` (${loc.line}:${loc.column})`;
	    return this._raise(Object.assign({
	      loc,
	      pos
	    }, data), message);
	  }

	  _raise(errorContext, message) {
	    const err = new SyntaxError(message);
	    Object.assign(err, errorContext);

	    if (this.options.errorRecovery) {
	      if (!this.isLookahead) this.state.errors.push(err);
	      return err;
	    } else {
	      throw err;
	    }
	  }

	}

	var estree = (superClass => class extends superClass {
	  parseRegExpLiteral({
	    pattern,
	    flags
	  }) {
	    let regex = null;

	    try {
	      regex = new RegExp(pattern, flags);
	    } catch (e) {}

	    const node = this.estreeParseLiteral(regex);
	    node.regex = {
	      pattern,
	      flags
	    };
	    return node;
	  }

	  parseBigIntLiteral(value) {
	    let bigInt;

	    try {
	      bigInt = BigInt(value);
	    } catch (_unused) {
	      bigInt = null;
	    }

	    const node = this.estreeParseLiteral(bigInt);
	    node.bigint = String(node.value || value);
	    return node;
	  }

	  parseDecimalLiteral(value) {
	    const decimal = null;
	    const node = this.estreeParseLiteral(decimal);
	    node.decimal = String(node.value || value);
	    return node;
	  }

	  estreeParseLiteral(value) {
	    return this.parseLiteral(value, "Literal");
	  }

	  parseStringLiteral(value) {
	    return this.estreeParseLiteral(value);
	  }

	  parseNumericLiteral(value) {
	    return this.estreeParseLiteral(value);
	  }

	  parseNullLiteral() {
	    return this.estreeParseLiteral(null);
	  }

	  parseBooleanLiteral(value) {
	    return this.estreeParseLiteral(value);
	  }

	  directiveToStmt(directive) {
	    const directiveLiteral = directive.value;
	    const stmt = this.startNodeAt(directive.start, directive.loc.start);
	    const expression = this.startNodeAt(directiveLiteral.start, directiveLiteral.loc.start);
	    expression.value = directiveLiteral.extra.expressionValue;
	    expression.raw = directiveLiteral.extra.raw;
	    stmt.expression = this.finishNodeAt(expression, "Literal", directiveLiteral.end, directiveLiteral.loc.end);
	    stmt.directive = directiveLiteral.extra.raw.slice(1, -1);
	    return this.finishNodeAt(stmt, "ExpressionStatement", directive.end, directive.loc.end);
	  }

	  initFunction(node, isAsync) {
	    super.initFunction(node, isAsync);
	    node.expression = false;
	  }

	  checkDeclaration(node) {
	    if (node != null && this.isObjectProperty(node)) {
	      this.checkDeclaration(node.value);
	    } else {
	      super.checkDeclaration(node);
	    }
	  }

	  getObjectOrClassMethodParams(method) {
	    return method.value.params;
	  }

	  isValidDirective(stmt) {
	    var _stmt$expression$extr;

	    return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && typeof stmt.expression.value === "string" && !((_stmt$expression$extr = stmt.expression.extra) != null && _stmt$expression$extr.parenthesized);
	  }

	  stmtToDirective(stmt) {
	    const directive = super.stmtToDirective(stmt);
	    const value = stmt.expression.value;
	    this.addExtra(directive.value, "expressionValue", value);
	    return directive;
	  }

	  parseBlockBody(node, ...args) {
	    super.parseBlockBody(node, ...args);
	    const directiveStatements = node.directives.map(d => this.directiveToStmt(d));
	    node.body = directiveStatements.concat(node.body);
	    delete node.directives;
	  }

	  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
	    this.parseMethod(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", true);

	    if (method.typeParameters) {
	      method.value.typeParameters = method.typeParameters;
	      delete method.typeParameters;
	    }

	    classBody.body.push(method);
	  }

	  parseMaybePrivateName(...args) {
	    const node = super.parseMaybePrivateName(...args);

	    if (node.type === "PrivateName" && this.getPluginOption("estree", "classFeatures")) {
	      return this.convertPrivateNameToPrivateIdentifier(node);
	    }

	    return node;
	  }

	  convertPrivateNameToPrivateIdentifier(node) {
	    const name = super.getPrivateNameSV(node);
	    node = node;
	    delete node.id;
	    node.name = name;
	    node.type = "PrivateIdentifier";
	    return node;
	  }

	  isPrivateName(node) {
	    if (!this.getPluginOption("estree", "classFeatures")) {
	      return super.isPrivateName(node);
	    }

	    return node.type === "PrivateIdentifier";
	  }

	  getPrivateNameSV(node) {
	    if (!this.getPluginOption("estree", "classFeatures")) {
	      return super.getPrivateNameSV(node);
	    }

	    return node.name;
	  }

	  parseLiteral(value, type) {
	    const node = super.parseLiteral(value, type);
	    node.raw = node.extra.raw;
	    delete node.extra;
	    return node;
	  }

	  parseFunctionBody(node, allowExpression, isMethod = false) {
	    super.parseFunctionBody(node, allowExpression, isMethod);
	    node.expression = node.body.type !== "BlockStatement";
	  }

	  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = false) {
	    let funcNode = this.startNode();
	    funcNode.kind = node.kind;
	    funcNode = super.parseMethod(funcNode, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope);
	    funcNode.type = "FunctionExpression";
	    delete funcNode.kind;
	    node.value = funcNode;

	    if (type === "ClassPrivateMethod") {
	      node.computed = false;
	    }

	    type = "MethodDefinition";
	    return this.finishNode(node, type);
	  }

	  parseClassProperty(...args) {
	    const propertyNode = super.parseClassProperty(...args);

	    if (this.getPluginOption("estree", "classFeatures")) {
	      propertyNode.type = "PropertyDefinition";
	    }

	    return propertyNode;
	  }

	  parseClassPrivateProperty(...args) {
	    const propertyNode = super.parseClassPrivateProperty(...args);

	    if (this.getPluginOption("estree", "classFeatures")) {
	      propertyNode.type = "PropertyDefinition";
	      propertyNode.computed = false;
	    }

	    return propertyNode;
	  }

	  parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) {
	    const node = super.parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor);

	    if (node) {
	      node.type = "Property";
	      if (node.kind === "method") node.kind = "init";
	      node.shorthand = false;
	    }

	    return node;
	  }

	  parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors) {
	    const node = super.parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors);

	    if (node) {
	      node.kind = "init";
	      node.type = "Property";
	    }

	    return node;
	  }

	  toAssignable(node, isLHS = false) {
	    if (node != null && this.isObjectProperty(node)) {
	      this.toAssignable(node.value, isLHS);
	      return node;
	    }

	    return super.toAssignable(node, isLHS);
	  }

	  toAssignableObjectExpressionProp(prop, ...args) {
	    if (prop.kind === "get" || prop.kind === "set") {
	      this.raise(prop.key.start, ErrorMessages.PatternHasAccessor);
	    } else if (prop.method) {
	      this.raise(prop.key.start, ErrorMessages.PatternHasMethod);
	    } else {
	      super.toAssignableObjectExpressionProp(prop, ...args);
	    }
	  }

	  finishCallExpression(node, optional) {
	    super.finishCallExpression(node, optional);

	    if (node.callee.type === "Import") {
	      node.type = "ImportExpression";
	      node.source = node.arguments[0];

	      if (this.hasPlugin("importAssertions")) {
	        var _node$arguments$;

	        node.attributes = (_node$arguments$ = node.arguments[1]) != null ? _node$arguments$ : null;
	      }

	      delete node.arguments;
	      delete node.callee;
	    }

	    return node;
	  }

	  toReferencedArguments(node) {
	    if (node.type === "ImportExpression") {
	      return;
	    }

	    super.toReferencedArguments(node);
	  }

	  parseExport(node) {
	    super.parseExport(node);

	    switch (node.type) {
	      case "ExportAllDeclaration":
	        node.exported = null;
	        break;

	      case "ExportNamedDeclaration":
	        if (node.specifiers.length === 1 && node.specifiers[0].type === "ExportNamespaceSpecifier") {
	          node.type = "ExportAllDeclaration";
	          node.exported = node.specifiers[0].exported;
	          delete node.specifiers;
	        }

	        break;
	    }

	    return node;
	  }

	  parseSubscript(base, startPos, startLoc, noCalls, state) {
	    const node = super.parseSubscript(base, startPos, startLoc, noCalls, state);

	    if (state.optionalChainMember) {
	      if (node.type === "OptionalMemberExpression" || node.type === "OptionalCallExpression") {
	        node.type = node.type.substring(8);
	      }

	      if (state.stop) {
	        const chain = this.startNodeAtNode(node);
	        chain.expression = node;
	        return this.finishNode(chain, "ChainExpression");
	      }
	    } else if (node.type === "MemberExpression" || node.type === "CallExpression") {
	      node.optional = false;
	    }

	    return node;
	  }

	  hasPropertyAsPrivateName(node) {
	    if (node.type === "ChainExpression") {
	      node = node.expression;
	    }

	    return super.hasPropertyAsPrivateName(node);
	  }

	  isOptionalChain(node) {
	    return node.type === "ChainExpression";
	  }

	  isObjectProperty(node) {
	    return node.type === "Property" && node.kind === "init" && !node.method;
	  }

	  isObjectMethod(node) {
	    return node.method || node.kind === "get" || node.kind === "set";
	  }

	});

	class TokContext {
	  constructor(token, preserveSpace) {
	    this.token = void 0;
	    this.preserveSpace = void 0;
	    this.token = token;
	    this.preserveSpace = !!preserveSpace;
	  }

	}
	const types$2 = {
	  brace: new TokContext("{"),
	  template: new TokContext("`", true)
	};

	types$1.braceR.updateContext = context => {
	  context.pop();
	};

	types$1.braceL.updateContext = types$1.braceHashL.updateContext = types$1.dollarBraceL.updateContext = context => {
	  context.push(types$2.brace);
	};

	types$1.backQuote.updateContext = context => {
	  if (context[context.length - 1] === types$2.template) {
	    context.pop();
	  } else {
	    context.push(types$2.template);
	  }
	};

	let nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u08a0-\u08b4\u08b6-\u08c7\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9ffc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7bf\ua7c2-\ua7ca\ua7f5-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
	let nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d3-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf\u1ac0\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1df9\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
	const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
	const nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
	nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
	const astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938];
	const astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

	function isInAstralSet(code, set) {
	  let pos = 0x10000;

	  for (let i = 0, length = set.length; i < length; i += 2) {
	    pos += set[i];
	    if (pos > code) return false;
	    pos += set[i + 1];
	    if (pos >= code) return true;
	  }

	  return false;
	}

	function isIdentifierStart(code) {
	  if (code < 65) return code === 36;
	  if (code <= 90) return true;
	  if (code < 97) return code === 95;
	  if (code <= 122) return true;

	  if (code <= 0xffff) {
	    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
	  }

	  return isInAstralSet(code, astralIdentifierStartCodes);
	}
	function isIdentifierChar(code) {
	  if (code < 48) return code === 36;
	  if (code < 58) return true;
	  if (code < 65) return false;
	  if (code <= 90) return true;
	  if (code < 97) return code === 95;
	  if (code <= 122) return true;

	  if (code <= 0xffff) {
	    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
	  }

	  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
	}

	const reservedWords = {
	  keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
	  strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
	  strictBind: ["eval", "arguments"]
	};
	const keywords$2 = new Set(reservedWords.keyword);
	const reservedWordsStrictSet = new Set(reservedWords.strict);
	const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
	function isReservedWord(word, inModule) {
	  return inModule && word === "await" || word === "enum";
	}
	function isStrictReservedWord(word, inModule) {
	  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
	}
	function isStrictBindOnlyReservedWord(word) {
	  return reservedWordsStrictBindSet.has(word);
	}
	function isStrictBindReservedWord(word, inModule) {
	  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
	}
	function isKeyword(word) {
	  return keywords$2.has(word);
	}

	function isIteratorStart(current, next) {
	  return current === 64 && next === 64;
	}
	const reservedWordLikeSet = new Set(["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "eval", "arguments", "enum", "await"]);
	function canBeReservedWord(word) {
	  return reservedWordLikeSet.has(word);
	}

	const SCOPE_OTHER = 0b000000000,
	      SCOPE_PROGRAM = 0b000000001,
	      SCOPE_FUNCTION = 0b000000010,
	      SCOPE_ARROW = 0b000000100,
	      SCOPE_SIMPLE_CATCH = 0b000001000,
	      SCOPE_SUPER = 0b000010000,
	      SCOPE_DIRECT_SUPER = 0b000100000,
	      SCOPE_CLASS = 0b001000000,
	      SCOPE_STATIC_BLOCK = 0b010000000,
	      SCOPE_TS_MODULE = 0b100000000,
	      SCOPE_VAR = SCOPE_PROGRAM | SCOPE_FUNCTION | SCOPE_TS_MODULE;
	const BIND_KIND_VALUE = 0b000000000001,
	      BIND_KIND_TYPE = 0b000000000010,
	      BIND_SCOPE_VAR = 0b000000000100,
	      BIND_SCOPE_LEXICAL = 0b000000001000,
	      BIND_SCOPE_FUNCTION = 0b000000010000,
	      BIND_FLAGS_NONE = 0b000001000000,
	      BIND_FLAGS_CLASS = 0b000010000000,
	      BIND_FLAGS_TS_ENUM = 0b000100000000,
	      BIND_FLAGS_TS_CONST_ENUM = 0b001000000000,
	      BIND_FLAGS_TS_EXPORT_ONLY = 0b010000000000,
	      BIND_FLAGS_FLOW_DECLARE_FN = 0b100000000000;
	const BIND_CLASS = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL | BIND_FLAGS_CLASS,
	      BIND_LEXICAL = BIND_KIND_VALUE | 0 | BIND_SCOPE_LEXICAL | 0,
	      BIND_VAR = BIND_KIND_VALUE | 0 | BIND_SCOPE_VAR | 0,
	      BIND_FUNCTION = BIND_KIND_VALUE | 0 | BIND_SCOPE_FUNCTION | 0,
	      BIND_TS_INTERFACE = 0 | BIND_KIND_TYPE | 0 | BIND_FLAGS_CLASS,
	      BIND_TS_TYPE = 0 | BIND_KIND_TYPE | 0 | 0,
	      BIND_TS_ENUM = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL | BIND_FLAGS_TS_ENUM,
	      BIND_TS_AMBIENT = 0 | 0 | 0 | BIND_FLAGS_TS_EXPORT_ONLY,
	      BIND_NONE = 0 | 0 | 0 | BIND_FLAGS_NONE,
	      BIND_OUTSIDE = BIND_KIND_VALUE | 0 | 0 | BIND_FLAGS_NONE,
	      BIND_TS_CONST_ENUM = BIND_TS_ENUM | BIND_FLAGS_TS_CONST_ENUM,
	      BIND_TS_NAMESPACE = 0 | 0 | 0 | BIND_FLAGS_TS_EXPORT_ONLY,
	      BIND_FLOW_DECLARE_FN = BIND_FLAGS_FLOW_DECLARE_FN;
	const CLASS_ELEMENT_FLAG_STATIC = 0b100,
	      CLASS_ELEMENT_KIND_GETTER = 0b010,
	      CLASS_ELEMENT_KIND_SETTER = 0b001,
	      CLASS_ELEMENT_KIND_ACCESSOR = CLASS_ELEMENT_KIND_GETTER | CLASS_ELEMENT_KIND_SETTER;
	const CLASS_ELEMENT_STATIC_GETTER = CLASS_ELEMENT_KIND_GETTER | CLASS_ELEMENT_FLAG_STATIC,
	      CLASS_ELEMENT_STATIC_SETTER = CLASS_ELEMENT_KIND_SETTER | CLASS_ELEMENT_FLAG_STATIC,
	      CLASS_ELEMENT_INSTANCE_GETTER = CLASS_ELEMENT_KIND_GETTER,
	      CLASS_ELEMENT_INSTANCE_SETTER = CLASS_ELEMENT_KIND_SETTER,
	      CLASS_ELEMENT_OTHER = 0;

	class Scope {
	  constructor(flags) {
	    this.var = new Set();
	    this.lexical = new Set();
	    this.functions = new Set();
	    this.flags = flags;
	  }

	}
	class ScopeHandler {
	  constructor(raise, inModule) {
	    this.scopeStack = [];
	    this.undefinedExports = new Map();
	    this.undefinedPrivateNames = new Map();
	    this.raise = raise;
	    this.inModule = inModule;
	  }

	  get inFunction() {
	    return (this.currentVarScopeFlags() & SCOPE_FUNCTION) > 0;
	  }

	  get allowSuper() {
	    return (this.currentThisScopeFlags() & SCOPE_SUPER) > 0;
	  }

	  get allowDirectSuper() {
	    return (this.currentThisScopeFlags() & SCOPE_DIRECT_SUPER) > 0;
	  }

	  get inClass() {
	    return (this.currentThisScopeFlags() & SCOPE_CLASS) > 0;
	  }

	  get inClassAndNotInNonArrowFunction() {
	    const flags = this.currentThisScopeFlags();
	    return (flags & SCOPE_CLASS) > 0 && (flags & SCOPE_FUNCTION) === 0;
	  }

	  get inStaticBlock() {
	    return (this.currentThisScopeFlags() & SCOPE_STATIC_BLOCK) > 0;
	  }

	  get inNonArrowFunction() {
	    return (this.currentThisScopeFlags() & SCOPE_FUNCTION) > 0;
	  }

	  get treatFunctionsAsVar() {
	    return this.treatFunctionsAsVarInScope(this.currentScope());
	  }

	  createScope(flags) {
	    return new Scope(flags);
	  }

	  enter(flags) {
	    this.scopeStack.push(this.createScope(flags));
	  }

	  exit() {
	    this.scopeStack.pop();
	  }

	  treatFunctionsAsVarInScope(scope) {
	    return !!(scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_PROGRAM);
	  }

	  declareName(name, bindingType, pos) {
	    let scope = this.currentScope();

	    if (bindingType & BIND_SCOPE_LEXICAL || bindingType & BIND_SCOPE_FUNCTION) {
	      this.checkRedeclarationInScope(scope, name, bindingType, pos);

	      if (bindingType & BIND_SCOPE_FUNCTION) {
	        scope.functions.add(name);
	      } else {
	        scope.lexical.add(name);
	      }

	      if (bindingType & BIND_SCOPE_LEXICAL) {
	        this.maybeExportDefined(scope, name);
	      }
	    } else if (bindingType & BIND_SCOPE_VAR) {
	      for (let i = this.scopeStack.length - 1; i >= 0; --i) {
	        scope = this.scopeStack[i];
	        this.checkRedeclarationInScope(scope, name, bindingType, pos);
	        scope.var.add(name);
	        this.maybeExportDefined(scope, name);
	        if (scope.flags & SCOPE_VAR) break;
	      }
	    }

	    if (this.inModule && scope.flags & SCOPE_PROGRAM) {
	      this.undefinedExports.delete(name);
	    }
	  }

	  maybeExportDefined(scope, name) {
	    if (this.inModule && scope.flags & SCOPE_PROGRAM) {
	      this.undefinedExports.delete(name);
	    }
	  }

	  checkRedeclarationInScope(scope, name, bindingType, pos) {
	    if (this.isRedeclaredInScope(scope, name, bindingType)) {
	      this.raise(pos, ErrorMessages.VarRedeclaration, name);
	    }
	  }

	  isRedeclaredInScope(scope, name, bindingType) {
	    if (!(bindingType & BIND_KIND_VALUE)) return false;

	    if (bindingType & BIND_SCOPE_LEXICAL) {
	      return scope.lexical.has(name) || scope.functions.has(name) || scope.var.has(name);
	    }

	    if (bindingType & BIND_SCOPE_FUNCTION) {
	      return scope.lexical.has(name) || !this.treatFunctionsAsVarInScope(scope) && scope.var.has(name);
	    }

	    return scope.lexical.has(name) && !(scope.flags & SCOPE_SIMPLE_CATCH && scope.lexical.values().next().value === name) || !this.treatFunctionsAsVarInScope(scope) && scope.functions.has(name);
	  }

	  checkLocalExport(id) {
	    const {
	      name
	    } = id;
	    const topLevelScope = this.scopeStack[0];

	    if (!topLevelScope.lexical.has(name) && !topLevelScope.var.has(name) && !topLevelScope.functions.has(name)) {
	      this.undefinedExports.set(name, id.start);
	    }
	  }

	  currentScope() {
	    return this.scopeStack[this.scopeStack.length - 1];
	  }

	  currentVarScopeFlags() {
	    for (let i = this.scopeStack.length - 1;; i--) {
	      const {
	        flags
	      } = this.scopeStack[i];

	      if (flags & SCOPE_VAR) {
	        return flags;
	      }
	    }
	  }

	  currentThisScopeFlags() {
	    for (let i = this.scopeStack.length - 1;; i--) {
	      const {
	        flags
	      } = this.scopeStack[i];

	      if (flags & (SCOPE_VAR | SCOPE_CLASS) && !(flags & SCOPE_ARROW)) {
	        return flags;
	      }
	    }
	  }

	}

	class FlowScope extends Scope {
	  constructor(...args) {
	    super(...args);
	    this.declareFunctions = new Set();
	  }

	}

	class FlowScopeHandler extends ScopeHandler {
	  createScope(flags) {
	    return new FlowScope(flags);
	  }

	  declareName(name, bindingType, pos) {
	    const scope = this.currentScope();

	    if (bindingType & BIND_FLAGS_FLOW_DECLARE_FN) {
	      this.checkRedeclarationInScope(scope, name, bindingType, pos);
	      this.maybeExportDefined(scope, name);
	      scope.declareFunctions.add(name);
	      return;
	    }

	    super.declareName(...arguments);
	  }

	  isRedeclaredInScope(scope, name, bindingType) {
	    if (super.isRedeclaredInScope(...arguments)) return true;

	    if (bindingType & BIND_FLAGS_FLOW_DECLARE_FN) {
	      return !scope.declareFunctions.has(name) && (scope.lexical.has(name) || scope.functions.has(name));
	    }

	    return false;
	  }

	  checkLocalExport(id) {
	    if (!this.scopeStack[0].declareFunctions.has(id.name)) {
	      super.checkLocalExport(id);
	    }
	  }

	}

	const reservedTypes = new Set(["_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void"]);
	const FlowErrors = makeErrorTemplates({
	  AmbiguousConditionalArrow: "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
	  AmbiguousDeclareModuleKind: "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.",
	  AssignReservedType: "Cannot overwrite reserved type %0.",
	  DeclareClassElement: "The `declare` modifier can only appear on class fields.",
	  DeclareClassFieldInitializer: "Initializers are not allowed in fields with the `declare` modifier.",
	  DuplicateDeclareModuleExports: "Duplicate `declare module.exports` statement.",
	  EnumBooleanMemberNotInitialized: "Boolean enum members need to be initialized. Use either `%0 = true,` or `%0 = false,` in enum `%1`.",
	  EnumDuplicateMemberName: "Enum member names need to be unique, but the name `%0` has already been used before in enum `%1`.",
	  EnumInconsistentMemberValues: "Enum `%0` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.",
	  EnumInvalidExplicitType: "Enum type `%1` is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `%0`.",
	  EnumInvalidExplicitTypeUnknownSupplied: "Supplied enum type is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `%0`.",
	  EnumInvalidMemberInitializerPrimaryType: "Enum `%0` has type `%2`, so the initializer of `%1` needs to be a %2 literal.",
	  EnumInvalidMemberInitializerSymbolType: "Symbol enum members cannot be initialized. Use `%1,` in enum `%0`.",
	  EnumInvalidMemberInitializerUnknownType: "The enum member initializer for `%1` needs to be a literal (either a boolean, number, or string) in enum `%0`.",
	  EnumInvalidMemberName: "Enum member names cannot start with lowercase 'a' through 'z'. Instead of using `%0`, consider using `%1`, in enum `%2`.",
	  EnumNumberMemberNotInitialized: "Number enum members need to be initialized, e.g. `%1 = 1` in enum `%0`.",
	  EnumStringMemberInconsistentlyInitailized: "String enum members need to consistently either all use initializers, or use no initializers, in enum `%0`.",
	  GetterMayNotHaveThisParam: "A getter cannot have a `this` parameter.",
	  ImportTypeShorthandOnlyInPureImport: "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.",
	  InexactInsideExact: "Explicit inexact syntax cannot appear inside an explicit exact object type.",
	  InexactInsideNonObject: "Explicit inexact syntax cannot appear in class or interface definitions.",
	  InexactVariance: "Explicit inexact syntax cannot have variance.",
	  InvalidNonTypeImportInDeclareModule: "Imports within a `declare module` body must always be `import type` or `import typeof`.",
	  MissingTypeParamDefault: "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
	  NestedDeclareModule: "`declare module` cannot be used inside another `declare module`.",
	  NestedFlowComment: "Cannot have a flow comment inside another flow comment.",
	  OptionalBindingPattern: "A binding pattern parameter cannot be optional in an implementation signature.",
	  SetterMayNotHaveThisParam: "A setter cannot have a `this` parameter.",
	  SpreadVariance: "Spread properties cannot have variance.",
	  ThisParamAnnotationRequired: "A type annotation is required for the `this` parameter.",
	  ThisParamBannedInConstructor: "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.",
	  ThisParamMayNotBeOptional: "The `this` parameter cannot be optional.",
	  ThisParamMustBeFirst: "The `this` parameter must be the first function parameter.",
	  ThisParamNoDefault: "The `this` parameter may not have a default value.",
	  TypeBeforeInitializer: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
	  TypeCastInPattern: "The type cast expression is expected to be wrapped with parenthesis.",
	  UnexpectedExplicitInexactInObject: "Explicit inexact syntax must appear at the end of an inexact object.",
	  UnexpectedReservedType: "Unexpected reserved type %0.",
	  UnexpectedReservedUnderscore: "`_` is only allowed as a type argument to call or new.",
	  UnexpectedSpaceBetweenModuloChecks: "Spaces between `%` and `checks` are not allowed here.",
	  UnexpectedSpreadType: "Spread operator cannot appear in class or interface definitions.",
	  UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint".',
	  UnexpectedTokenAfterTypeParameter: "Expected an arrow function after this type parameter declaration.",
	  UnexpectedTypeParameterBeforeAsyncArrowFunction: "Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.",
	  UnsupportedDeclareExportKind: "`declare export %0` is not supported. Use `%1` instead.",
	  UnsupportedStatementInDeclareModule: "Only declares and type imports are allowed inside declare module.",
	  UnterminatedFlowComment: "Unterminated flow-comment."
	}, ErrorCodes.SyntaxError);

	function isEsModuleType(bodyElement) {
	  return bodyElement.type === "DeclareExportAllDeclaration" || bodyElement.type === "DeclareExportDeclaration" && (!bodyElement.declaration || bodyElement.declaration.type !== "TypeAlias" && bodyElement.declaration.type !== "InterfaceDeclaration");
	}

	function hasTypeImportKind(node) {
	  return node.importKind === "type" || node.importKind === "typeof";
	}

	function isMaybeDefaultImport(state) {
	  return (state.type === types$1.name || !!state.type.keyword) && state.value !== "from";
	}

	const exportSuggestions = {
	  const: "declare export var",
	  let: "declare export var",
	  type: "export type",
	  interface: "export interface"
	};

	function partition(list, test) {
	  const list1 = [];
	  const list2 = [];

	  for (let i = 0; i < list.length; i++) {
	    (test(list[i], i, list) ? list1 : list2).push(list[i]);
	  }

	  return [list1, list2];
	}

	const FLOW_PRAGMA_REGEX = /\*?\s*@((?:no)?flow)\b/;
	var flow$1 = (superClass => class extends superClass {
	  constructor(...args) {
	    super(...args);
	    this.flowPragma = undefined;
	  }

	  getScopeHandler() {
	    return FlowScopeHandler;
	  }

	  shouldParseTypes() {
	    return this.getPluginOption("flow", "all") || this.flowPragma === "flow";
	  }

	  shouldParseEnums() {
	    return !!this.getPluginOption("flow", "enums");
	  }

	  finishToken(type, val) {
	    if (type !== types$1.string && type !== types$1.semi && type !== types$1.interpreterDirective) {
	      if (this.flowPragma === undefined) {
	        this.flowPragma = null;
	      }
	    }

	    return super.finishToken(type, val);
	  }

	  addComment(comment) {
	    if (this.flowPragma === undefined) {
	      const matches = FLOW_PRAGMA_REGEX.exec(comment.value);

	      if (!matches) ; else if (matches[1] === "flow") {
	        this.flowPragma = "flow";
	      } else if (matches[1] === "noflow") {
	        this.flowPragma = "noflow";
	      } else {
	        throw new Error("Unexpected flow pragma");
	      }
	    }

	    return super.addComment(comment);
	  }

	  flowParseTypeInitialiser(tok) {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    this.expect(tok || types$1.colon);
	    const type = this.flowParseType();
	    this.state.inType = oldInType;
	    return type;
	  }

	  flowParsePredicate() {
	    const node = this.startNode();
	    const moduloPos = this.state.start;
	    this.next();
	    this.expectContextual("checks");

	    if (this.state.lastTokStart > moduloPos + 1) {
	      this.raise(moduloPos, FlowErrors.UnexpectedSpaceBetweenModuloChecks);
	    }

	    if (this.eat(types$1.parenL)) {
	      node.value = this.parseExpression();
	      this.expect(types$1.parenR);
	      return this.finishNode(node, "DeclaredPredicate");
	    } else {
	      return this.finishNode(node, "InferredPredicate");
	    }
	  }

	  flowParseTypeAndPredicateInitialiser() {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    this.expect(types$1.colon);
	    let type = null;
	    let predicate = null;

	    if (this.match(types$1.modulo)) {
	      this.state.inType = oldInType;
	      predicate = this.flowParsePredicate();
	    } else {
	      type = this.flowParseType();
	      this.state.inType = oldInType;

	      if (this.match(types$1.modulo)) {
	        predicate = this.flowParsePredicate();
	      }
	    }

	    return [type, predicate];
	  }

	  flowParseDeclareClass(node) {
	    this.next();
	    this.flowParseInterfaceish(node, true);
	    return this.finishNode(node, "DeclareClass");
	  }

	  flowParseDeclareFunction(node) {
	    this.next();
	    const id = node.id = this.parseIdentifier();
	    const typeNode = this.startNode();
	    const typeContainer = this.startNode();

	    if (this.isRelational("<")) {
	      typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      typeNode.typeParameters = null;
	    }

	    this.expect(types$1.parenL);
	    const tmp = this.flowParseFunctionTypeParams();
	    typeNode.params = tmp.params;
	    typeNode.rest = tmp.rest;
	    typeNode.this = tmp._this;
	    this.expect(types$1.parenR);
	    [typeNode.returnType, node.predicate] = this.flowParseTypeAndPredicateInitialiser();
	    typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation");
	    id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation");
	    this.resetEndLocation(id);
	    this.semicolon();
	    this.scope.declareName(node.id.name, BIND_FLOW_DECLARE_FN, node.id.start);
	    return this.finishNode(node, "DeclareFunction");
	  }

	  flowParseDeclare(node, insideModule) {
	    if (this.match(types$1._class)) {
	      return this.flowParseDeclareClass(node);
	    } else if (this.match(types$1._function)) {
	      return this.flowParseDeclareFunction(node);
	    } else if (this.match(types$1._var)) {
	      return this.flowParseDeclareVariable(node);
	    } else if (this.eatContextual("module")) {
	      if (this.match(types$1.dot)) {
	        return this.flowParseDeclareModuleExports(node);
	      } else {
	        if (insideModule) {
	          this.raise(this.state.lastTokStart, FlowErrors.NestedDeclareModule);
	        }

	        return this.flowParseDeclareModule(node);
	      }
	    } else if (this.isContextual("type")) {
	      return this.flowParseDeclareTypeAlias(node);
	    } else if (this.isContextual("opaque")) {
	      return this.flowParseDeclareOpaqueType(node);
	    } else if (this.isContextual("interface")) {
	      return this.flowParseDeclareInterface(node);
	    } else if (this.match(types$1._export)) {
	      return this.flowParseDeclareExportDeclaration(node, insideModule);
	    } else {
	      throw this.unexpected();
	    }
	  }

	  flowParseDeclareVariable(node) {
	    this.next();
	    node.id = this.flowParseTypeAnnotatableIdentifier(true);
	    this.scope.declareName(node.id.name, BIND_VAR, node.id.start);
	    this.semicolon();
	    return this.finishNode(node, "DeclareVariable");
	  }

	  flowParseDeclareModule(node) {
	    this.scope.enter(SCOPE_OTHER);

	    if (this.match(types$1.string)) {
	      node.id = this.parseExprAtom();
	    } else {
	      node.id = this.parseIdentifier();
	    }

	    const bodyNode = node.body = this.startNode();
	    const body = bodyNode.body = [];
	    this.expect(types$1.braceL);

	    while (!this.match(types$1.braceR)) {
	      let bodyNode = this.startNode();

	      if (this.match(types$1._import)) {
	        this.next();

	        if (!this.isContextual("type") && !this.match(types$1._typeof)) {
	          this.raise(this.state.lastTokStart, FlowErrors.InvalidNonTypeImportInDeclareModule);
	        }

	        this.parseImport(bodyNode);
	      } else {
	        this.expectContextual("declare", FlowErrors.UnsupportedStatementInDeclareModule);
	        bodyNode = this.flowParseDeclare(bodyNode, true);
	      }

	      body.push(bodyNode);
	    }

	    this.scope.exit();
	    this.expect(types$1.braceR);
	    this.finishNode(bodyNode, "BlockStatement");
	    let kind = null;
	    let hasModuleExport = false;
	    body.forEach(bodyElement => {
	      if (isEsModuleType(bodyElement)) {
	        if (kind === "CommonJS") {
	          this.raise(bodyElement.start, FlowErrors.AmbiguousDeclareModuleKind);
	        }

	        kind = "ES";
	      } else if (bodyElement.type === "DeclareModuleExports") {
	        if (hasModuleExport) {
	          this.raise(bodyElement.start, FlowErrors.DuplicateDeclareModuleExports);
	        }

	        if (kind === "ES") {
	          this.raise(bodyElement.start, FlowErrors.AmbiguousDeclareModuleKind);
	        }

	        kind = "CommonJS";
	        hasModuleExport = true;
	      }
	    });
	    node.kind = kind || "CommonJS";
	    return this.finishNode(node, "DeclareModule");
	  }

	  flowParseDeclareExportDeclaration(node, insideModule) {
	    this.expect(types$1._export);

	    if (this.eat(types$1._default)) {
	      if (this.match(types$1._function) || this.match(types$1._class)) {
	        node.declaration = this.flowParseDeclare(this.startNode());
	      } else {
	        node.declaration = this.flowParseType();
	        this.semicolon();
	      }

	      node.default = true;
	      return this.finishNode(node, "DeclareExportDeclaration");
	    } else {
	      if (this.match(types$1._const) || this.isLet() || (this.isContextual("type") || this.isContextual("interface")) && !insideModule) {
	        const label = this.state.value;
	        const suggestion = exportSuggestions[label];
	        throw this.raise(this.state.start, FlowErrors.UnsupportedDeclareExportKind, label, suggestion);
	      }

	      if (this.match(types$1._var) || this.match(types$1._function) || this.match(types$1._class) || this.isContextual("opaque")) {
	          node.declaration = this.flowParseDeclare(this.startNode());
	          node.default = false;
	          return this.finishNode(node, "DeclareExportDeclaration");
	        } else if (this.match(types$1.star) || this.match(types$1.braceL) || this.isContextual("interface") || this.isContextual("type") || this.isContextual("opaque")) {
	          node = this.parseExport(node);

	          if (node.type === "ExportNamedDeclaration") {
	            node.type = "ExportDeclaration";
	            node.default = false;
	            delete node.exportKind;
	          }

	          node.type = "Declare" + node.type;
	          return node;
	        }
	    }

	    throw this.unexpected();
	  }

	  flowParseDeclareModuleExports(node) {
	    this.next();
	    this.expectContextual("exports");
	    node.typeAnnotation = this.flowParseTypeAnnotation();
	    this.semicolon();
	    return this.finishNode(node, "DeclareModuleExports");
	  }

	  flowParseDeclareTypeAlias(node) {
	    this.next();
	    this.flowParseTypeAlias(node);
	    node.type = "DeclareTypeAlias";
	    return node;
	  }

	  flowParseDeclareOpaqueType(node) {
	    this.next();
	    this.flowParseOpaqueType(node, true);
	    node.type = "DeclareOpaqueType";
	    return node;
	  }

	  flowParseDeclareInterface(node) {
	    this.next();
	    this.flowParseInterfaceish(node);
	    return this.finishNode(node, "DeclareInterface");
	  }

	  flowParseInterfaceish(node, isClass = false) {
	    node.id = this.flowParseRestrictedIdentifier(!isClass, true);
	    this.scope.declareName(node.id.name, isClass ? BIND_FUNCTION : BIND_LEXICAL, node.id.start);

	    if (this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      node.typeParameters = null;
	    }

	    node.extends = [];
	    node.implements = [];
	    node.mixins = [];

	    if (this.eat(types$1._extends)) {
	      do {
	        node.extends.push(this.flowParseInterfaceExtends());
	      } while (!isClass && this.eat(types$1.comma));
	    }

	    if (this.isContextual("mixins")) {
	      this.next();

	      do {
	        node.mixins.push(this.flowParseInterfaceExtends());
	      } while (this.eat(types$1.comma));
	    }

	    if (this.isContextual("implements")) {
	      this.next();

	      do {
	        node.implements.push(this.flowParseInterfaceExtends());
	      } while (this.eat(types$1.comma));
	    }

	    node.body = this.flowParseObjectType({
	      allowStatic: isClass,
	      allowExact: false,
	      allowSpread: false,
	      allowProto: isClass,
	      allowInexact: false
	    });
	  }

	  flowParseInterfaceExtends() {
	    const node = this.startNode();
	    node.id = this.flowParseQualifiedTypeIdentifier();

	    if (this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterInstantiation();
	    } else {
	      node.typeParameters = null;
	    }

	    return this.finishNode(node, "InterfaceExtends");
	  }

	  flowParseInterface(node) {
	    this.flowParseInterfaceish(node);
	    return this.finishNode(node, "InterfaceDeclaration");
	  }

	  checkNotUnderscore(word) {
	    if (word === "_") {
	      this.raise(this.state.start, FlowErrors.UnexpectedReservedUnderscore);
	    }
	  }

	  checkReservedType(word, startLoc, declaration) {
	    if (!reservedTypes.has(word)) return;
	    this.raise(startLoc, declaration ? FlowErrors.AssignReservedType : FlowErrors.UnexpectedReservedType, word);
	  }

	  flowParseRestrictedIdentifier(liberal, declaration) {
	    this.checkReservedType(this.state.value, this.state.start, declaration);
	    return this.parseIdentifier(liberal);
	  }

	  flowParseTypeAlias(node) {
	    node.id = this.flowParseRestrictedIdentifier(false, true);
	    this.scope.declareName(node.id.name, BIND_LEXICAL, node.id.start);

	    if (this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      node.typeParameters = null;
	    }

	    node.right = this.flowParseTypeInitialiser(types$1.eq);
	    this.semicolon();
	    return this.finishNode(node, "TypeAlias");
	  }

	  flowParseOpaqueType(node, declare) {
	    this.expectContextual("type");
	    node.id = this.flowParseRestrictedIdentifier(true, true);
	    this.scope.declareName(node.id.name, BIND_LEXICAL, node.id.start);

	    if (this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    } else {
	      node.typeParameters = null;
	    }

	    node.supertype = null;

	    if (this.match(types$1.colon)) {
	      node.supertype = this.flowParseTypeInitialiser(types$1.colon);
	    }

	    node.impltype = null;

	    if (!declare) {
	      node.impltype = this.flowParseTypeInitialiser(types$1.eq);
	    }

	    this.semicolon();
	    return this.finishNode(node, "OpaqueType");
	  }

	  flowParseTypeParameter(requireDefault = false) {
	    const nodeStart = this.state.start;
	    const node = this.startNode();
	    const variance = this.flowParseVariance();
	    const ident = this.flowParseTypeAnnotatableIdentifier();
	    node.name = ident.name;
	    node.variance = variance;
	    node.bound = ident.typeAnnotation;

	    if (this.match(types$1.eq)) {
	      this.eat(types$1.eq);
	      node.default = this.flowParseType();
	    } else {
	      if (requireDefault) {
	        this.raise(nodeStart, FlowErrors.MissingTypeParamDefault);
	      }
	    }

	    return this.finishNode(node, "TypeParameter");
	  }

	  flowParseTypeParameterDeclaration() {
	    const oldInType = this.state.inType;
	    const node = this.startNode();
	    node.params = [];
	    this.state.inType = true;

	    if (this.isRelational("<") || this.match(types$1.jsxTagStart)) {
	      this.next();
	    } else {
	      this.unexpected();
	    }

	    let defaultRequired = false;

	    do {
	      const typeParameter = this.flowParseTypeParameter(defaultRequired);
	      node.params.push(typeParameter);

	      if (typeParameter.default) {
	        defaultRequired = true;
	      }

	      if (!this.isRelational(">")) {
	        this.expect(types$1.comma);
	      }
	    } while (!this.isRelational(">"));

	    this.expectRelational(">");
	    this.state.inType = oldInType;
	    return this.finishNode(node, "TypeParameterDeclaration");
	  }

	  flowParseTypeParameterInstantiation() {
	    const node = this.startNode();
	    const oldInType = this.state.inType;
	    node.params = [];
	    this.state.inType = true;
	    this.expectRelational("<");
	    const oldNoAnonFunctionType = this.state.noAnonFunctionType;
	    this.state.noAnonFunctionType = false;

	    while (!this.isRelational(">")) {
	      node.params.push(this.flowParseType());

	      if (!this.isRelational(">")) {
	        this.expect(types$1.comma);
	      }
	    }

	    this.state.noAnonFunctionType = oldNoAnonFunctionType;
	    this.expectRelational(">");
	    this.state.inType = oldInType;
	    return this.finishNode(node, "TypeParameterInstantiation");
	  }

	  flowParseTypeParameterInstantiationCallOrNew() {
	    const node = this.startNode();
	    const oldInType = this.state.inType;
	    node.params = [];
	    this.state.inType = true;
	    this.expectRelational("<");

	    while (!this.isRelational(">")) {
	      node.params.push(this.flowParseTypeOrImplicitInstantiation());

	      if (!this.isRelational(">")) {
	        this.expect(types$1.comma);
	      }
	    }

	    this.expectRelational(">");
	    this.state.inType = oldInType;
	    return this.finishNode(node, "TypeParameterInstantiation");
	  }

	  flowParseInterfaceType() {
	    const node = this.startNode();
	    this.expectContextual("interface");
	    node.extends = [];

	    if (this.eat(types$1._extends)) {
	      do {
	        node.extends.push(this.flowParseInterfaceExtends());
	      } while (this.eat(types$1.comma));
	    }

	    node.body = this.flowParseObjectType({
	      allowStatic: false,
	      allowExact: false,
	      allowSpread: false,
	      allowProto: false,
	      allowInexact: false
	    });
	    return this.finishNode(node, "InterfaceTypeAnnotation");
	  }

	  flowParseObjectPropertyKey() {
	    return this.match(types$1.num) || this.match(types$1.string) ? this.parseExprAtom() : this.parseIdentifier(true);
	  }

	  flowParseObjectTypeIndexer(node, isStatic, variance) {
	    node.static = isStatic;

	    if (this.lookahead().type === types$1.colon) {
	      node.id = this.flowParseObjectPropertyKey();
	      node.key = this.flowParseTypeInitialiser();
	    } else {
	      node.id = null;
	      node.key = this.flowParseType();
	    }

	    this.expect(types$1.bracketR);
	    node.value = this.flowParseTypeInitialiser();
	    node.variance = variance;
	    return this.finishNode(node, "ObjectTypeIndexer");
	  }

	  flowParseObjectTypeInternalSlot(node, isStatic) {
	    node.static = isStatic;
	    node.id = this.flowParseObjectPropertyKey();
	    this.expect(types$1.bracketR);
	    this.expect(types$1.bracketR);

	    if (this.isRelational("<") || this.match(types$1.parenL)) {
	      node.method = true;
	      node.optional = false;
	      node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.start, node.loc.start));
	    } else {
	      node.method = false;

	      if (this.eat(types$1.question)) {
	        node.optional = true;
	      }

	      node.value = this.flowParseTypeInitialiser();
	    }

	    return this.finishNode(node, "ObjectTypeInternalSlot");
	  }

	  flowParseObjectTypeMethodish(node) {
	    node.params = [];
	    node.rest = null;
	    node.typeParameters = null;
	    node.this = null;

	    if (this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    }

	    this.expect(types$1.parenL);

	    if (this.match(types$1._this)) {
	      node.this = this.flowParseFunctionTypeParam(true);
	      node.this.name = null;

	      if (!this.match(types$1.parenR)) {
	        this.expect(types$1.comma);
	      }
	    }

	    while (!this.match(types$1.parenR) && !this.match(types$1.ellipsis)) {
	      node.params.push(this.flowParseFunctionTypeParam(false));

	      if (!this.match(types$1.parenR)) {
	        this.expect(types$1.comma);
	      }
	    }

	    if (this.eat(types$1.ellipsis)) {
	      node.rest = this.flowParseFunctionTypeParam(false);
	    }

	    this.expect(types$1.parenR);
	    node.returnType = this.flowParseTypeInitialiser();
	    return this.finishNode(node, "FunctionTypeAnnotation");
	  }

	  flowParseObjectTypeCallProperty(node, isStatic) {
	    const valueNode = this.startNode();
	    node.static = isStatic;
	    node.value = this.flowParseObjectTypeMethodish(valueNode);
	    return this.finishNode(node, "ObjectTypeCallProperty");
	  }

	  flowParseObjectType({
	    allowStatic,
	    allowExact,
	    allowSpread,
	    allowProto,
	    allowInexact
	  }) {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    const nodeStart = this.startNode();
	    nodeStart.callProperties = [];
	    nodeStart.properties = [];
	    nodeStart.indexers = [];
	    nodeStart.internalSlots = [];
	    let endDelim;
	    let exact;
	    let inexact = false;

	    if (allowExact && this.match(types$1.braceBarL)) {
	      this.expect(types$1.braceBarL);
	      endDelim = types$1.braceBarR;
	      exact = true;
	    } else {
	      this.expect(types$1.braceL);
	      endDelim = types$1.braceR;
	      exact = false;
	    }

	    nodeStart.exact = exact;

	    while (!this.match(endDelim)) {
	      let isStatic = false;
	      let protoStart = null;
	      let inexactStart = null;
	      const node = this.startNode();

	      if (allowProto && this.isContextual("proto")) {
	        const lookahead = this.lookahead();

	        if (lookahead.type !== types$1.colon && lookahead.type !== types$1.question) {
	          this.next();
	          protoStart = this.state.start;
	          allowStatic = false;
	        }
	      }

	      if (allowStatic && this.isContextual("static")) {
	        const lookahead = this.lookahead();

	        if (lookahead.type !== types$1.colon && lookahead.type !== types$1.question) {
	          this.next();
	          isStatic = true;
	        }
	      }

	      const variance = this.flowParseVariance();

	      if (this.eat(types$1.bracketL)) {
	        if (protoStart != null) {
	          this.unexpected(protoStart);
	        }

	        if (this.eat(types$1.bracketL)) {
	          if (variance) {
	            this.unexpected(variance.start);
	          }

	          nodeStart.internalSlots.push(this.flowParseObjectTypeInternalSlot(node, isStatic));
	        } else {
	          nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic, variance));
	        }
	      } else if (this.match(types$1.parenL) || this.isRelational("<")) {
	        if (protoStart != null) {
	          this.unexpected(protoStart);
	        }

	        if (variance) {
	          this.unexpected(variance.start);
	        }

	        nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, isStatic));
	      } else {
	        let kind = "init";

	        if (this.isContextual("get") || this.isContextual("set")) {
	          const lookahead = this.lookahead();

	          if (lookahead.type === types$1.name || lookahead.type === types$1.string || lookahead.type === types$1.num) {
	            kind = this.state.value;
	            this.next();
	          }
	        }

	        const propOrInexact = this.flowParseObjectTypeProperty(node, isStatic, protoStart, variance, kind, allowSpread, allowInexact != null ? allowInexact : !exact);

	        if (propOrInexact === null) {
	          inexact = true;
	          inexactStart = this.state.lastTokStart;
	        } else {
	          nodeStart.properties.push(propOrInexact);
	        }
	      }

	      this.flowObjectTypeSemicolon();

	      if (inexactStart && !this.match(types$1.braceR) && !this.match(types$1.braceBarR)) {
	        this.raise(inexactStart, FlowErrors.UnexpectedExplicitInexactInObject);
	      }
	    }

	    this.expect(endDelim);

	    if (allowSpread) {
	      nodeStart.inexact = inexact;
	    }

	    const out = this.finishNode(nodeStart, "ObjectTypeAnnotation");
	    this.state.inType = oldInType;
	    return out;
	  }

	  flowParseObjectTypeProperty(node, isStatic, protoStart, variance, kind, allowSpread, allowInexact) {
	    if (this.eat(types$1.ellipsis)) {
	      const isInexactToken = this.match(types$1.comma) || this.match(types$1.semi) || this.match(types$1.braceR) || this.match(types$1.braceBarR);

	      if (isInexactToken) {
	        if (!allowSpread) {
	          this.raise(this.state.lastTokStart, FlowErrors.InexactInsideNonObject);
	        } else if (!allowInexact) {
	          this.raise(this.state.lastTokStart, FlowErrors.InexactInsideExact);
	        }

	        if (variance) {
	          this.raise(variance.start, FlowErrors.InexactVariance);
	        }

	        return null;
	      }

	      if (!allowSpread) {
	        this.raise(this.state.lastTokStart, FlowErrors.UnexpectedSpreadType);
	      }

	      if (protoStart != null) {
	        this.unexpected(protoStart);
	      }

	      if (variance) {
	        this.raise(variance.start, FlowErrors.SpreadVariance);
	      }

	      node.argument = this.flowParseType();
	      return this.finishNode(node, "ObjectTypeSpreadProperty");
	    } else {
	      node.key = this.flowParseObjectPropertyKey();
	      node.static = isStatic;
	      node.proto = protoStart != null;
	      node.kind = kind;
	      let optional = false;

	      if (this.isRelational("<") || this.match(types$1.parenL)) {
	        node.method = true;

	        if (protoStart != null) {
	          this.unexpected(protoStart);
	        }

	        if (variance) {
	          this.unexpected(variance.start);
	        }

	        node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.start, node.loc.start));

	        if (kind === "get" || kind === "set") {
	          this.flowCheckGetterSetterParams(node);
	        }

	        if (!allowSpread && node.key.name === "constructor" && node.value.this) {
	          this.raise(node.value.this.start, FlowErrors.ThisParamBannedInConstructor);
	        }
	      } else {
	        if (kind !== "init") this.unexpected();
	        node.method = false;

	        if (this.eat(types$1.question)) {
	          optional = true;
	        }

	        node.value = this.flowParseTypeInitialiser();
	        node.variance = variance;
	      }

	      node.optional = optional;
	      return this.finishNode(node, "ObjectTypeProperty");
	    }
	  }

	  flowCheckGetterSetterParams(property) {
	    const paramCount = property.kind === "get" ? 0 : 1;
	    const start = property.start;
	    const length = property.value.params.length + (property.value.rest ? 1 : 0);

	    if (property.value.this) {
	      this.raise(property.value.this.start, property.kind === "get" ? FlowErrors.GetterMayNotHaveThisParam : FlowErrors.SetterMayNotHaveThisParam);
	    }

	    if (length !== paramCount) {
	      if (property.kind === "get") {
	        this.raise(start, ErrorMessages.BadGetterArity);
	      } else {
	        this.raise(start, ErrorMessages.BadSetterArity);
	      }
	    }

	    if (property.kind === "set" && property.value.rest) {
	      this.raise(start, ErrorMessages.BadSetterRestParameter);
	    }
	  }

	  flowObjectTypeSemicolon() {
	    if (!this.eat(types$1.semi) && !this.eat(types$1.comma) && !this.match(types$1.braceR) && !this.match(types$1.braceBarR)) {
	      this.unexpected();
	    }
	  }

	  flowParseQualifiedTypeIdentifier(startPos, startLoc, id) {
	    startPos = startPos || this.state.start;
	    startLoc = startLoc || this.state.startLoc;
	    let node = id || this.flowParseRestrictedIdentifier(true);

	    while (this.eat(types$1.dot)) {
	      const node2 = this.startNodeAt(startPos, startLoc);
	      node2.qualification = node;
	      node2.id = this.flowParseRestrictedIdentifier(true);
	      node = this.finishNode(node2, "QualifiedTypeIdentifier");
	    }

	    return node;
	  }

	  flowParseGenericType(startPos, startLoc, id) {
	    const node = this.startNodeAt(startPos, startLoc);
	    node.typeParameters = null;
	    node.id = this.flowParseQualifiedTypeIdentifier(startPos, startLoc, id);

	    if (this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterInstantiation();
	    }

	    return this.finishNode(node, "GenericTypeAnnotation");
	  }

	  flowParseTypeofType() {
	    const node = this.startNode();
	    this.expect(types$1._typeof);
	    node.argument = this.flowParsePrimaryType();
	    return this.finishNode(node, "TypeofTypeAnnotation");
	  }

	  flowParseTupleType() {
	    const node = this.startNode();
	    node.types = [];
	    this.expect(types$1.bracketL);

	    while (this.state.pos < this.length && !this.match(types$1.bracketR)) {
	      node.types.push(this.flowParseType());
	      if (this.match(types$1.bracketR)) break;
	      this.expect(types$1.comma);
	    }

	    this.expect(types$1.bracketR);
	    return this.finishNode(node, "TupleTypeAnnotation");
	  }

	  flowParseFunctionTypeParam(first) {
	    let name = null;
	    let optional = false;
	    let typeAnnotation = null;
	    const node = this.startNode();
	    const lh = this.lookahead();
	    const isThis = this.state.type === types$1._this;

	    if (lh.type === types$1.colon || lh.type === types$1.question) {
	      if (isThis && !first) {
	        this.raise(node.start, FlowErrors.ThisParamMustBeFirst);
	      }

	      name = this.parseIdentifier(isThis);

	      if (this.eat(types$1.question)) {
	        optional = true;

	        if (isThis) {
	          this.raise(node.start, FlowErrors.ThisParamMayNotBeOptional);
	        }
	      }

	      typeAnnotation = this.flowParseTypeInitialiser();
	    } else {
	      typeAnnotation = this.flowParseType();
	    }

	    node.name = name;
	    node.optional = optional;
	    node.typeAnnotation = typeAnnotation;
	    return this.finishNode(node, "FunctionTypeParam");
	  }

	  reinterpretTypeAsFunctionTypeParam(type) {
	    const node = this.startNodeAt(type.start, type.loc.start);
	    node.name = null;
	    node.optional = false;
	    node.typeAnnotation = type;
	    return this.finishNode(node, "FunctionTypeParam");
	  }

	  flowParseFunctionTypeParams(params = []) {
	    let rest = null;
	    let _this = null;

	    if (this.match(types$1._this)) {
	      _this = this.flowParseFunctionTypeParam(true);
	      _this.name = null;

	      if (!this.match(types$1.parenR)) {
	        this.expect(types$1.comma);
	      }
	    }

	    while (!this.match(types$1.parenR) && !this.match(types$1.ellipsis)) {
	      params.push(this.flowParseFunctionTypeParam(false));

	      if (!this.match(types$1.parenR)) {
	        this.expect(types$1.comma);
	      }
	    }

	    if (this.eat(types$1.ellipsis)) {
	      rest = this.flowParseFunctionTypeParam(false);
	    }

	    return {
	      params,
	      rest,
	      _this
	    };
	  }

	  flowIdentToTypeAnnotation(startPos, startLoc, node, id) {
	    switch (id.name) {
	      case "any":
	        return this.finishNode(node, "AnyTypeAnnotation");

	      case "bool":
	      case "boolean":
	        return this.finishNode(node, "BooleanTypeAnnotation");

	      case "mixed":
	        return this.finishNode(node, "MixedTypeAnnotation");

	      case "empty":
	        return this.finishNode(node, "EmptyTypeAnnotation");

	      case "number":
	        return this.finishNode(node, "NumberTypeAnnotation");

	      case "string":
	        return this.finishNode(node, "StringTypeAnnotation");

	      case "symbol":
	        return this.finishNode(node, "SymbolTypeAnnotation");

	      default:
	        this.checkNotUnderscore(id.name);
	        return this.flowParseGenericType(startPos, startLoc, id);
	    }
	  }

	  flowParsePrimaryType() {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const node = this.startNode();
	    let tmp;
	    let type;
	    let isGroupedType = false;
	    const oldNoAnonFunctionType = this.state.noAnonFunctionType;

	    switch (this.state.type) {
	      case types$1.name:
	        if (this.isContextual("interface")) {
	          return this.flowParseInterfaceType();
	        }

	        return this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdentifier());

	      case types$1.braceL:
	        return this.flowParseObjectType({
	          allowStatic: false,
	          allowExact: false,
	          allowSpread: true,
	          allowProto: false,
	          allowInexact: true
	        });

	      case types$1.braceBarL:
	        return this.flowParseObjectType({
	          allowStatic: false,
	          allowExact: true,
	          allowSpread: true,
	          allowProto: false,
	          allowInexact: false
	        });

	      case types$1.bracketL:
	        this.state.noAnonFunctionType = false;
	        type = this.flowParseTupleType();
	        this.state.noAnonFunctionType = oldNoAnonFunctionType;
	        return type;

	      case types$1.relational:
	        if (this.state.value === "<") {
	          node.typeParameters = this.flowParseTypeParameterDeclaration();
	          this.expect(types$1.parenL);
	          tmp = this.flowParseFunctionTypeParams();
	          node.params = tmp.params;
	          node.rest = tmp.rest;
	          node.this = tmp._this;
	          this.expect(types$1.parenR);
	          this.expect(types$1.arrow);
	          node.returnType = this.flowParseType();
	          return this.finishNode(node, "FunctionTypeAnnotation");
	        }

	        break;

	      case types$1.parenL:
	        this.next();

	        if (!this.match(types$1.parenR) && !this.match(types$1.ellipsis)) {
	          if (this.match(types$1.name) || this.match(types$1._this)) {
	            const token = this.lookahead().type;
	            isGroupedType = token !== types$1.question && token !== types$1.colon;
	          } else {
	            isGroupedType = true;
	          }
	        }

	        if (isGroupedType) {
	          this.state.noAnonFunctionType = false;
	          type = this.flowParseType();
	          this.state.noAnonFunctionType = oldNoAnonFunctionType;

	          if (this.state.noAnonFunctionType || !(this.match(types$1.comma) || this.match(types$1.parenR) && this.lookahead().type === types$1.arrow)) {
	            this.expect(types$1.parenR);
	            return type;
	          } else {
	            this.eat(types$1.comma);
	          }
	        }

	        if (type) {
	          tmp = this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(type)]);
	        } else {
	          tmp = this.flowParseFunctionTypeParams();
	        }

	        node.params = tmp.params;
	        node.rest = tmp.rest;
	        node.this = tmp._this;
	        this.expect(types$1.parenR);
	        this.expect(types$1.arrow);
	        node.returnType = this.flowParseType();
	        node.typeParameters = null;
	        return this.finishNode(node, "FunctionTypeAnnotation");

	      case types$1.string:
	        return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");

	      case types$1._true:
	      case types$1._false:
	        node.value = this.match(types$1._true);
	        this.next();
	        return this.finishNode(node, "BooleanLiteralTypeAnnotation");

	      case types$1.plusMin:
	        if (this.state.value === "-") {
	          this.next();

	          if (this.match(types$1.num)) {
	            return this.parseLiteralAtNode(-this.state.value, "NumberLiteralTypeAnnotation", node);
	          }

	          if (this.match(types$1.bigint)) {
	            return this.parseLiteralAtNode(-this.state.value, "BigIntLiteralTypeAnnotation", node);
	          }

	          throw this.raise(this.state.start, FlowErrors.UnexpectedSubtractionOperand);
	        }

	        throw this.unexpected();

	      case types$1.num:
	        return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");

	      case types$1.bigint:
	        return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");

	      case types$1._void:
	        this.next();
	        return this.finishNode(node, "VoidTypeAnnotation");

	      case types$1._null:
	        this.next();
	        return this.finishNode(node, "NullLiteralTypeAnnotation");

	      case types$1._this:
	        this.next();
	        return this.finishNode(node, "ThisTypeAnnotation");

	      case types$1.star:
	        this.next();
	        return this.finishNode(node, "ExistsTypeAnnotation");

	      default:
	        if (this.state.type.keyword === "typeof") {
	          return this.flowParseTypeofType();
	        } else if (this.state.type.keyword) {
	          const label = this.state.type.label;
	          this.next();
	          return super.createIdentifier(node, label);
	        }

	    }

	    throw this.unexpected();
	  }

	  flowParsePostfixType() {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    let type = this.flowParsePrimaryType();
	    let seenOptionalIndexedAccess = false;

	    while ((this.match(types$1.bracketL) || this.match(types$1.questionDot)) && !this.canInsertSemicolon()) {
	      const node = this.startNodeAt(startPos, startLoc);
	      const optional = this.eat(types$1.questionDot);
	      seenOptionalIndexedAccess = seenOptionalIndexedAccess || optional;
	      this.expect(types$1.bracketL);

	      if (!optional && this.match(types$1.bracketR)) {
	        node.elementType = type;
	        this.next();
	        type = this.finishNode(node, "ArrayTypeAnnotation");
	      } else {
	        node.objectType = type;
	        node.indexType = this.flowParseType();
	        this.expect(types$1.bracketR);

	        if (seenOptionalIndexedAccess) {
	          node.optional = optional;
	          type = this.finishNode(node, "OptionalIndexedAccessType");
	        } else {
	          type = this.finishNode(node, "IndexedAccessType");
	        }
	      }
	    }

	    return type;
	  }

	  flowParsePrefixType() {
	    const node = this.startNode();

	    if (this.eat(types$1.question)) {
	      node.typeAnnotation = this.flowParsePrefixType();
	      return this.finishNode(node, "NullableTypeAnnotation");
	    } else {
	      return this.flowParsePostfixType();
	    }
	  }

	  flowParseAnonFunctionWithoutParens() {
	    const param = this.flowParsePrefixType();

	    if (!this.state.noAnonFunctionType && this.eat(types$1.arrow)) {
	      const node = this.startNodeAt(param.start, param.loc.start);
	      node.params = [this.reinterpretTypeAsFunctionTypeParam(param)];
	      node.rest = null;
	      node.this = null;
	      node.returnType = this.flowParseType();
	      node.typeParameters = null;
	      return this.finishNode(node, "FunctionTypeAnnotation");
	    }

	    return param;
	  }

	  flowParseIntersectionType() {
	    const node = this.startNode();
	    this.eat(types$1.bitwiseAND);
	    const type = this.flowParseAnonFunctionWithoutParens();
	    node.types = [type];

	    while (this.eat(types$1.bitwiseAND)) {
	      node.types.push(this.flowParseAnonFunctionWithoutParens());
	    }

	    return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation");
	  }

	  flowParseUnionType() {
	    const node = this.startNode();
	    this.eat(types$1.bitwiseOR);
	    const type = this.flowParseIntersectionType();
	    node.types = [type];

	    while (this.eat(types$1.bitwiseOR)) {
	      node.types.push(this.flowParseIntersectionType());
	    }

	    return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation");
	  }

	  flowParseType() {
	    const oldInType = this.state.inType;
	    this.state.inType = true;
	    const type = this.flowParseUnionType();
	    this.state.inType = oldInType;
	    return type;
	  }

	  flowParseTypeOrImplicitInstantiation() {
	    if (this.state.type === types$1.name && this.state.value === "_") {
	      const startPos = this.state.start;
	      const startLoc = this.state.startLoc;
	      const node = this.parseIdentifier();
	      return this.flowParseGenericType(startPos, startLoc, node);
	    } else {
	      return this.flowParseType();
	    }
	  }

	  flowParseTypeAnnotation() {
	    const node = this.startNode();
	    node.typeAnnotation = this.flowParseTypeInitialiser();
	    return this.finishNode(node, "TypeAnnotation");
	  }

	  flowParseTypeAnnotatableIdentifier(allowPrimitiveOverride) {
	    const ident = allowPrimitiveOverride ? this.parseIdentifier() : this.flowParseRestrictedIdentifier();

	    if (this.match(types$1.colon)) {
	      ident.typeAnnotation = this.flowParseTypeAnnotation();
	      this.resetEndLocation(ident);
	    }

	    return ident;
	  }

	  typeCastToParameter(node) {
	    node.expression.typeAnnotation = node.typeAnnotation;
	    this.resetEndLocation(node.expression, node.typeAnnotation.end, node.typeAnnotation.loc.end);
	    return node.expression;
	  }

	  flowParseVariance() {
	    let variance = null;

	    if (this.match(types$1.plusMin)) {
	      variance = this.startNode();

	      if (this.state.value === "+") {
	        variance.kind = "plus";
	      } else {
	        variance.kind = "minus";
	      }

	      this.next();
	      this.finishNode(variance, "Variance");
	    }

	    return variance;
	  }

	  parseFunctionBody(node, allowExpressionBody, isMethod = false) {
	    if (allowExpressionBody) {
	      return this.forwardNoArrowParamsConversionAt(node, () => super.parseFunctionBody(node, true, isMethod));
	    }

	    return super.parseFunctionBody(node, false, isMethod);
	  }

	  parseFunctionBodyAndFinish(node, type, isMethod = false) {
	    if (this.match(types$1.colon)) {
	      const typeNode = this.startNode();
	      [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser();
	      node.returnType = typeNode.typeAnnotation ? this.finishNode(typeNode, "TypeAnnotation") : null;
	    }

	    super.parseFunctionBodyAndFinish(node, type, isMethod);
	  }

	  parseStatement(context, topLevel) {
	    if (this.state.strict && this.match(types$1.name) && this.state.value === "interface") {
	      const lookahead = this.lookahead();

	      if (lookahead.type === types$1.name || isKeyword(lookahead.value)) {
	        const node = this.startNode();
	        this.next();
	        return this.flowParseInterface(node);
	      }
	    } else if (this.shouldParseEnums() && this.isContextual("enum")) {
	      const node = this.startNode();
	      this.next();
	      return this.flowParseEnumDeclaration(node);
	    }

	    const stmt = super.parseStatement(context, topLevel);

	    if (this.flowPragma === undefined && !this.isValidDirective(stmt)) {
	      this.flowPragma = null;
	    }

	    return stmt;
	  }

	  parseExpressionStatement(node, expr) {
	    if (expr.type === "Identifier") {
	      if (expr.name === "declare") {
	        if (this.match(types$1._class) || this.match(types$1.name) || this.match(types$1._function) || this.match(types$1._var) || this.match(types$1._export)) {
	          return this.flowParseDeclare(node);
	        }
	      } else if (this.match(types$1.name)) {
	        if (expr.name === "interface") {
	          return this.flowParseInterface(node);
	        } else if (expr.name === "type") {
	          return this.flowParseTypeAlias(node);
	        } else if (expr.name === "opaque") {
	          return this.flowParseOpaqueType(node, false);
	        }
	      }
	    }

	    return super.parseExpressionStatement(node, expr);
	  }

	  shouldParseExportDeclaration() {
	    return this.isContextual("type") || this.isContextual("interface") || this.isContextual("opaque") || this.shouldParseEnums() && this.isContextual("enum") || super.shouldParseExportDeclaration();
	  }

	  isExportDefaultSpecifier() {
	    if (this.match(types$1.name) && (this.state.value === "type" || this.state.value === "interface" || this.state.value === "opaque" || this.shouldParseEnums() && this.state.value === "enum")) {
	      return false;
	    }

	    return super.isExportDefaultSpecifier();
	  }

	  parseExportDefaultExpression() {
	    if (this.shouldParseEnums() && this.isContextual("enum")) {
	      const node = this.startNode();
	      this.next();
	      return this.flowParseEnumDeclaration(node);
	    }

	    return super.parseExportDefaultExpression();
	  }

	  parseConditional(expr, startPos, startLoc, refExpressionErrors) {
	    if (!this.match(types$1.question)) return expr;

	    if (this.state.maybeInArrowParameters) {
	      const result = this.tryParse(() => super.parseConditional(expr, startPos, startLoc));

	      if (!result.node) {
	        if (result.error) {
	          super.setOptionalParametersError(refExpressionErrors, result.error);
	        }

	        return expr;
	      }

	      if (result.error) this.state = result.failState;
	      return result.node;
	    }

	    this.expect(types$1.question);
	    const state = this.state.clone();
	    const originalNoArrowAt = this.state.noArrowAt;
	    const node = this.startNodeAt(startPos, startLoc);
	    let {
	      consequent,
	      failed
	    } = this.tryParseConditionalConsequent();
	    let [valid, invalid] = this.getArrowLikeExpressions(consequent);

	    if (failed || invalid.length > 0) {
	      const noArrowAt = [...originalNoArrowAt];

	      if (invalid.length > 0) {
	        this.state = state;
	        this.state.noArrowAt = noArrowAt;

	        for (let i = 0; i < invalid.length; i++) {
	          noArrowAt.push(invalid[i].start);
	        }

	        ({
	          consequent,
	          failed
	        } = this.tryParseConditionalConsequent());
	        [valid, invalid] = this.getArrowLikeExpressions(consequent);
	      }

	      if (failed && valid.length > 1) {
	        this.raise(state.start, FlowErrors.AmbiguousConditionalArrow);
	      }

	      if (failed && valid.length === 1) {
	        this.state = state;
	        this.state.noArrowAt = noArrowAt.concat(valid[0].start);
	        ({
	          consequent,
	          failed
	        } = this.tryParseConditionalConsequent());
	      }
	    }

	    this.getArrowLikeExpressions(consequent, true);
	    this.state.noArrowAt = originalNoArrowAt;
	    this.expect(types$1.colon);
	    node.test = expr;
	    node.consequent = consequent;
	    node.alternate = this.forwardNoArrowParamsConversionAt(node, () => this.parseMaybeAssign(undefined, undefined));
	    return this.finishNode(node, "ConditionalExpression");
	  }

	  tryParseConditionalConsequent() {
	    this.state.noArrowParamsConversionAt.push(this.state.start);
	    const consequent = this.parseMaybeAssignAllowIn();
	    const failed = !this.match(types$1.colon);
	    this.state.noArrowParamsConversionAt.pop();
	    return {
	      consequent,
	      failed
	    };
	  }

	  getArrowLikeExpressions(node, disallowInvalid) {
	    const stack = [node];
	    const arrows = [];

	    while (stack.length !== 0) {
	      const node = stack.pop();

	      if (node.type === "ArrowFunctionExpression") {
	        if (node.typeParameters || !node.returnType) {
	          this.finishArrowValidation(node);
	        } else {
	          arrows.push(node);
	        }

	        stack.push(node.body);
	      } else if (node.type === "ConditionalExpression") {
	        stack.push(node.consequent);
	        stack.push(node.alternate);
	      }
	    }

	    if (disallowInvalid) {
	      arrows.forEach(node => this.finishArrowValidation(node));
	      return [arrows, []];
	    }

	    return partition(arrows, node => node.params.every(param => this.isAssignable(param, true)));
	  }

	  finishArrowValidation(node) {
	    var _node$extra;

	    this.toAssignableList(node.params, (_node$extra = node.extra) == null ? void 0 : _node$extra.trailingComma, false);
	    this.scope.enter(SCOPE_FUNCTION | SCOPE_ARROW);
	    super.checkParams(node, false, true);
	    this.scope.exit();
	  }

	  forwardNoArrowParamsConversionAt(node, parse) {
	    let result;

	    if (this.state.noArrowParamsConversionAt.indexOf(node.start) !== -1) {
	      this.state.noArrowParamsConversionAt.push(this.state.start);
	      result = parse();
	      this.state.noArrowParamsConversionAt.pop();
	    } else {
	      result = parse();
	    }

	    return result;
	  }

	  parseParenItem(node, startPos, startLoc) {
	    node = super.parseParenItem(node, startPos, startLoc);

	    if (this.eat(types$1.question)) {
	      node.optional = true;
	      this.resetEndLocation(node);
	    }

	    if (this.match(types$1.colon)) {
	      const typeCastNode = this.startNodeAt(startPos, startLoc);
	      typeCastNode.expression = node;
	      typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();
	      return this.finishNode(typeCastNode, "TypeCastExpression");
	    }

	    return node;
	  }

	  assertModuleNodeAllowed(node) {
	    if (node.type === "ImportDeclaration" && (node.importKind === "type" || node.importKind === "typeof") || node.type === "ExportNamedDeclaration" && node.exportKind === "type" || node.type === "ExportAllDeclaration" && node.exportKind === "type") {
	      return;
	    }

	    super.assertModuleNodeAllowed(node);
	  }

	  parseExport(node) {
	    const decl = super.parseExport(node);

	    if (decl.type === "ExportNamedDeclaration" || decl.type === "ExportAllDeclaration") {
	      decl.exportKind = decl.exportKind || "value";
	    }

	    return decl;
	  }

	  parseExportDeclaration(node) {
	    if (this.isContextual("type")) {
	      node.exportKind = "type";
	      const declarationNode = this.startNode();
	      this.next();

	      if (this.match(types$1.braceL)) {
	        node.specifiers = this.parseExportSpecifiers();
	        this.parseExportFrom(node);
	        return null;
	      } else {
	        return this.flowParseTypeAlias(declarationNode);
	      }
	    } else if (this.isContextual("opaque")) {
	      node.exportKind = "type";
	      const declarationNode = this.startNode();
	      this.next();
	      return this.flowParseOpaqueType(declarationNode, false);
	    } else if (this.isContextual("interface")) {
	      node.exportKind = "type";
	      const declarationNode = this.startNode();
	      this.next();
	      return this.flowParseInterface(declarationNode);
	    } else if (this.shouldParseEnums() && this.isContextual("enum")) {
	      node.exportKind = "value";
	      const declarationNode = this.startNode();
	      this.next();
	      return this.flowParseEnumDeclaration(declarationNode);
	    } else {
	      return super.parseExportDeclaration(node);
	    }
	  }

	  eatExportStar(node) {
	    if (super.eatExportStar(...arguments)) return true;

	    if (this.isContextual("type") && this.lookahead().type === types$1.star) {
	      node.exportKind = "type";
	      this.next();
	      this.next();
	      return true;
	    }

	    return false;
	  }

	  maybeParseExportNamespaceSpecifier(node) {
	    const pos = this.state.start;
	    const hasNamespace = super.maybeParseExportNamespaceSpecifier(node);

	    if (hasNamespace && node.exportKind === "type") {
	      this.unexpected(pos);
	    }

	    return hasNamespace;
	  }

	  parseClassId(node, isStatement, optionalId) {
	    super.parseClassId(node, isStatement, optionalId);

	    if (this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    }
	  }

	  parseClassMember(classBody, member, state) {
	    const pos = this.state.start;

	    if (this.isContextual("declare")) {
	      if (this.parseClassMemberFromModifier(classBody, member)) {
	        return;
	      }

	      member.declare = true;
	    }

	    super.parseClassMember(classBody, member, state);

	    if (member.declare) {
	      if (member.type !== "ClassProperty" && member.type !== "ClassPrivateProperty" && member.type !== "PropertyDefinition") {
	          this.raise(pos, FlowErrors.DeclareClassElement);
	        } else if (member.value) {
	        this.raise(member.value.start, FlowErrors.DeclareClassFieldInitializer);
	      }
	    }
	  }

	  isIterator(word) {
	    return word === "iterator" || word === "asyncIterator";
	  }

	  readIterator() {
	    const word = super.readWord1();
	    const fullWord = "@@" + word;

	    if (!this.isIterator(word) || !this.state.inType) {
	      this.raise(this.state.pos, ErrorMessages.InvalidIdentifier, fullWord);
	    }

	    this.finishToken(types$1.name, fullWord);
	  }

	  getTokenFromCode(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (code === 123 && next === 124) {
	      return this.finishOp(types$1.braceBarL, 2);
	    } else if (this.state.inType && (code === 62 || code === 60)) {
	      return this.finishOp(types$1.relational, 1);
	    } else if (this.state.inType && code === 63) {
	      if (next === 46) {
	        return this.finishOp(types$1.questionDot, 2);
	      }

	      return this.finishOp(types$1.question, 1);
	    } else if (isIteratorStart(code, next)) {
	      this.state.pos += 2;
	      return this.readIterator();
	    } else {
	      return super.getTokenFromCode(code);
	    }
	  }

	  isAssignable(node, isBinding) {
	    switch (node.type) {
	      case "Identifier":
	      case "ObjectPattern":
	      case "ArrayPattern":
	      case "AssignmentPattern":
	        return true;

	      case "ObjectExpression":
	        {
	          const last = node.properties.length - 1;
	          return node.properties.every((prop, i) => {
	            return prop.type !== "ObjectMethod" && (i === last || prop.type === "SpreadElement") && this.isAssignable(prop);
	          });
	        }

	      case "ObjectProperty":
	        return this.isAssignable(node.value);

	      case "SpreadElement":
	        return this.isAssignable(node.argument);

	      case "ArrayExpression":
	        return node.elements.every(element => this.isAssignable(element));

	      case "AssignmentExpression":
	        return node.operator === "=";

	      case "ParenthesizedExpression":
	      case "TypeCastExpression":
	        return this.isAssignable(node.expression);

	      case "MemberExpression":
	      case "OptionalMemberExpression":
	        return !isBinding;

	      default:
	        return false;
	    }
	  }

	  toAssignable(node, isLHS = false) {
	    if (node.type === "TypeCastExpression") {
	      return super.toAssignable(this.typeCastToParameter(node), isLHS);
	    } else {
	      return super.toAssignable(node, isLHS);
	    }
	  }

	  toAssignableList(exprList, trailingCommaPos, isLHS) {
	    for (let i = 0; i < exprList.length; i++) {
	      const expr = exprList[i];

	      if ((expr == null ? void 0 : expr.type) === "TypeCastExpression") {
	        exprList[i] = this.typeCastToParameter(expr);
	      }
	    }

	    return super.toAssignableList(exprList, trailingCommaPos, isLHS);
	  }

	  toReferencedList(exprList, isParenthesizedExpr) {
	    for (let i = 0; i < exprList.length; i++) {
	      var _expr$extra;

	      const expr = exprList[i];

	      if (expr && expr.type === "TypeCastExpression" && !((_expr$extra = expr.extra) != null && _expr$extra.parenthesized) && (exprList.length > 1 || !isParenthesizedExpr)) {
	        this.raise(expr.typeAnnotation.start, FlowErrors.TypeCastInPattern);
	      }
	    }

	    return exprList;
	  }

	  parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
	    const node = super.parseArrayLike(close, canBePattern, isTuple, refExpressionErrors);

	    if (canBePattern && !this.state.maybeInArrowParameters) {
	      this.toReferencedList(node.elements);
	    }

	    return node;
	  }

	  checkLVal(expr, ...args) {
	    if (expr.type !== "TypeCastExpression") {
	      return super.checkLVal(expr, ...args);
	    }
	  }

	  parseClassProperty(node) {
	    if (this.match(types$1.colon)) {
	      node.typeAnnotation = this.flowParseTypeAnnotation();
	    }

	    return super.parseClassProperty(node);
	  }

	  parseClassPrivateProperty(node) {
	    if (this.match(types$1.colon)) {
	      node.typeAnnotation = this.flowParseTypeAnnotation();
	    }

	    return super.parseClassPrivateProperty(node);
	  }

	  isClassMethod() {
	    return this.isRelational("<") || super.isClassMethod();
	  }

	  isClassProperty() {
	    return this.match(types$1.colon) || super.isClassProperty();
	  }

	  isNonstaticConstructor(method) {
	    return !this.match(types$1.colon) && super.isNonstaticConstructor(method);
	  }

	  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
	    if (method.variance) {
	      this.unexpected(method.variance.start);
	    }

	    delete method.variance;

	    if (this.isRelational("<")) {
	      method.typeParameters = this.flowParseTypeParameterDeclaration();
	    }

	    super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);

	    if (method.params && isConstructor) {
	      const params = method.params;

	      if (params.length > 0 && this.isThisParam(params[0])) {
	        this.raise(method.start, FlowErrors.ThisParamBannedInConstructor);
	      }
	    } else if (method.type === "MethodDefinition" && isConstructor && method.value.params) {
	      const params = method.value.params;

	      if (params.length > 0 && this.isThisParam(params[0])) {
	        this.raise(method.start, FlowErrors.ThisParamBannedInConstructor);
	      }
	    }
	  }

	  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
	    if (method.variance) {
	      this.unexpected(method.variance.start);
	    }

	    delete method.variance;

	    if (this.isRelational("<")) {
	      method.typeParameters = this.flowParseTypeParameterDeclaration();
	    }

	    super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
	  }

	  parseClassSuper(node) {
	    super.parseClassSuper(node);

	    if (node.superClass && this.isRelational("<")) {
	      node.superTypeParameters = this.flowParseTypeParameterInstantiation();
	    }

	    if (this.isContextual("implements")) {
	      this.next();
	      const implemented = node.implements = [];

	      do {
	        const node = this.startNode();
	        node.id = this.flowParseRestrictedIdentifier(true);

	        if (this.isRelational("<")) {
	          node.typeParameters = this.flowParseTypeParameterInstantiation();
	        } else {
	          node.typeParameters = null;
	        }

	        implemented.push(this.finishNode(node, "ClassImplements"));
	      } while (this.eat(types$1.comma));
	    }
	  }

	  checkGetterSetterParams(method) {
	    super.checkGetterSetterParams(method);
	    const params = this.getObjectOrClassMethodParams(method);

	    if (params.length > 0) {
	      const param = params[0];

	      if (this.isThisParam(param) && method.kind === "get") {
	        this.raise(param.start, FlowErrors.GetterMayNotHaveThisParam);
	      } else if (this.isThisParam(param)) {
	        this.raise(param.start, FlowErrors.SetterMayNotHaveThisParam);
	      }
	    }
	  }

	  parsePropertyName(node, isPrivateNameAllowed) {
	    const variance = this.flowParseVariance();
	    const key = super.parsePropertyName(node, isPrivateNameAllowed);
	    node.variance = variance;
	    return key;
	  }

	  parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
	    if (prop.variance) {
	      this.unexpected(prop.variance.start);
	    }

	    delete prop.variance;
	    let typeParameters;

	    if (this.isRelational("<") && !isAccessor) {
	      typeParameters = this.flowParseTypeParameterDeclaration();
	      if (!this.match(types$1.parenL)) this.unexpected();
	    }

	    super.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors);

	    if (typeParameters) {
	      (prop.value || prop).typeParameters = typeParameters;
	    }
	  }

	  parseAssignableListItemTypes(param) {
	    if (this.eat(types$1.question)) {
	      if (param.type !== "Identifier") {
	        this.raise(param.start, FlowErrors.OptionalBindingPattern);
	      }

	      if (this.isThisParam(param)) {
	        this.raise(param.start, FlowErrors.ThisParamMayNotBeOptional);
	      }

	      param.optional = true;
	    }

	    if (this.match(types$1.colon)) {
	      param.typeAnnotation = this.flowParseTypeAnnotation();
	    } else if (this.isThisParam(param)) {
	      this.raise(param.start, FlowErrors.ThisParamAnnotationRequired);
	    }

	    if (this.match(types$1.eq) && this.isThisParam(param)) {
	      this.raise(param.start, FlowErrors.ThisParamNoDefault);
	    }

	    this.resetEndLocation(param);
	    return param;
	  }

	  parseMaybeDefault(startPos, startLoc, left) {
	    const node = super.parseMaybeDefault(startPos, startLoc, left);

	    if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
	      this.raise(node.typeAnnotation.start, FlowErrors.TypeBeforeInitializer);
	    }

	    return node;
	  }

	  shouldParseDefaultImport(node) {
	    if (!hasTypeImportKind(node)) {
	      return super.shouldParseDefaultImport(node);
	    }

	    return isMaybeDefaultImport(this.state);
	  }

	  parseImportSpecifierLocal(node, specifier, type, contextDescription) {
	    specifier.local = hasTypeImportKind(node) ? this.flowParseRestrictedIdentifier(true, true) : this.parseIdentifier();
	    this.checkLVal(specifier.local, contextDescription, BIND_LEXICAL);
	    node.specifiers.push(this.finishNode(specifier, type));
	  }

	  maybeParseDefaultImportSpecifier(node) {
	    node.importKind = "value";
	    let kind = null;

	    if (this.match(types$1._typeof)) {
	      kind = "typeof";
	    } else if (this.isContextual("type")) {
	      kind = "type";
	    }

	    if (kind) {
	      const lh = this.lookahead();

	      if (kind === "type" && lh.type === types$1.star) {
	        this.unexpected(lh.start);
	      }

	      if (isMaybeDefaultImport(lh) || lh.type === types$1.braceL || lh.type === types$1.star) {
	        this.next();
	        node.importKind = kind;
	      }
	    }

	    return super.maybeParseDefaultImportSpecifier(node);
	  }

	  parseImportSpecifier(node) {
	    const specifier = this.startNode();
	    const firstIdentIsString = this.match(types$1.string);
	    const firstIdent = this.parseModuleExportName();
	    let specifierTypeKind = null;

	    if (firstIdent.type === "Identifier") {
	      if (firstIdent.name === "type") {
	        specifierTypeKind = "type";
	      } else if (firstIdent.name === "typeof") {
	        specifierTypeKind = "typeof";
	      }
	    }

	    let isBinding = false;

	    if (this.isContextual("as") && !this.isLookaheadContextual("as")) {
	      const as_ident = this.parseIdentifier(true);

	      if (specifierTypeKind !== null && !this.match(types$1.name) && !this.state.type.keyword) {
	        specifier.imported = as_ident;
	        specifier.importKind = specifierTypeKind;
	        specifier.local = as_ident.__clone();
	      } else {
	        specifier.imported = firstIdent;
	        specifier.importKind = null;
	        specifier.local = this.parseIdentifier();
	      }
	    } else if (specifierTypeKind !== null && (this.match(types$1.name) || this.state.type.keyword)) {
	      specifier.imported = this.parseIdentifier(true);
	      specifier.importKind = specifierTypeKind;

	      if (this.eatContextual("as")) {
	        specifier.local = this.parseIdentifier();
	      } else {
	        isBinding = true;
	        specifier.local = specifier.imported.__clone();
	      }
	    } else {
	      if (firstIdentIsString) {
	        throw this.raise(specifier.start, ErrorMessages.ImportBindingIsString, firstIdent.value);
	      }

	      isBinding = true;
	      specifier.imported = firstIdent;
	      specifier.importKind = null;
	      specifier.local = specifier.imported.__clone();
	    }

	    const nodeIsTypeImport = hasTypeImportKind(node);
	    const specifierIsTypeImport = hasTypeImportKind(specifier);

	    if (nodeIsTypeImport && specifierIsTypeImport) {
	      this.raise(specifier.start, FlowErrors.ImportTypeShorthandOnlyInPureImport);
	    }

	    if (nodeIsTypeImport || specifierIsTypeImport) {
	      this.checkReservedType(specifier.local.name, specifier.local.start, true);
	    }

	    if (isBinding && !nodeIsTypeImport && !specifierIsTypeImport) {
	      this.checkReservedWord(specifier.local.name, specifier.start, true, true);
	    }

	    this.checkLVal(specifier.local, "import specifier", BIND_LEXICAL);
	    node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
	  }

	  parseBindingAtom() {
	    switch (this.state.type) {
	      case types$1._this:
	        return this.parseIdentifier(true);

	      default:
	        return super.parseBindingAtom();
	    }
	  }

	  parseFunctionParams(node, allowModifiers) {
	    const kind = node.kind;

	    if (kind !== "get" && kind !== "set" && this.isRelational("<")) {
	      node.typeParameters = this.flowParseTypeParameterDeclaration();
	    }

	    super.parseFunctionParams(node, allowModifiers);
	  }

	  parseVarId(decl, kind) {
	    super.parseVarId(decl, kind);

	    if (this.match(types$1.colon)) {
	      decl.id.typeAnnotation = this.flowParseTypeAnnotation();
	      this.resetEndLocation(decl.id);
	    }
	  }

	  parseAsyncArrowFromCallExpression(node, call) {
	    if (this.match(types$1.colon)) {
	      const oldNoAnonFunctionType = this.state.noAnonFunctionType;
	      this.state.noAnonFunctionType = true;
	      node.returnType = this.flowParseTypeAnnotation();
	      this.state.noAnonFunctionType = oldNoAnonFunctionType;
	    }

	    return super.parseAsyncArrowFromCallExpression(node, call);
	  }

	  shouldParseAsyncArrow() {
	    return this.match(types$1.colon) || super.shouldParseAsyncArrow();
	  }

	  parseMaybeAssign(refExpressionErrors, afterLeftParse) {
	    var _jsx;

	    let state = null;
	    let jsx;

	    if (this.hasPlugin("jsx") && (this.match(types$1.jsxTagStart) || this.isRelational("<"))) {
	      state = this.state.clone();
	      jsx = this.tryParse(() => super.parseMaybeAssign(refExpressionErrors, afterLeftParse), state);
	      if (!jsx.error) return jsx.node;
	      const {
	        context
	      } = this.state;
	      const curContext = context[context.length - 1];

	      if (curContext === types$2.j_oTag) {
	        context.length -= 2;
	      } else if (curContext === types$2.j_expr) {
	        context.length -= 1;
	      }
	    }

	    if ((_jsx = jsx) != null && _jsx.error || this.isRelational("<")) {
	      var _jsx2, _jsx3;

	      state = state || this.state.clone();
	      let typeParameters;
	      const arrow = this.tryParse(abort => {
	        var _arrowExpression$extr;

	        typeParameters = this.flowParseTypeParameterDeclaration();
	        const arrowExpression = this.forwardNoArrowParamsConversionAt(typeParameters, () => {
	          const result = super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
	          this.resetStartLocationFromNode(result, typeParameters);
	          return result;
	        });

	        if (arrowExpression.type !== "ArrowFunctionExpression" && (_arrowExpression$extr = arrowExpression.extra) != null && _arrowExpression$extr.parenthesized) {
	          abort();
	        }

	        const expr = this.maybeUnwrapTypeCastExpression(arrowExpression);
	        expr.typeParameters = typeParameters;
	        this.resetStartLocationFromNode(expr, typeParameters);
	        return arrowExpression;
	      }, state);
	      let arrowExpression = null;

	      if (arrow.node && this.maybeUnwrapTypeCastExpression(arrow.node).type === "ArrowFunctionExpression") {
	        if (!arrow.error && !arrow.aborted) {
	          if (arrow.node.async) {
	            this.raise(typeParameters.start, FlowErrors.UnexpectedTypeParameterBeforeAsyncArrowFunction);
	          }

	          return arrow.node;
	        }

	        arrowExpression = arrow.node;
	      }

	      if ((_jsx2 = jsx) != null && _jsx2.node) {
	        this.state = jsx.failState;
	        return jsx.node;
	      }

	      if (arrowExpression) {
	        this.state = arrow.failState;
	        return arrowExpression;
	      }

	      if ((_jsx3 = jsx) != null && _jsx3.thrown) throw jsx.error;
	      if (arrow.thrown) throw arrow.error;
	      throw this.raise(typeParameters.start, FlowErrors.UnexpectedTokenAfterTypeParameter);
	    }

	    return super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
	  }

	  parseArrow(node) {
	    if (this.match(types$1.colon)) {
	      const result = this.tryParse(() => {
	        const oldNoAnonFunctionType = this.state.noAnonFunctionType;
	        this.state.noAnonFunctionType = true;
	        const typeNode = this.startNode();
	        [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser();
	        this.state.noAnonFunctionType = oldNoAnonFunctionType;
	        if (this.canInsertSemicolon()) this.unexpected();
	        if (!this.match(types$1.arrow)) this.unexpected();
	        return typeNode;
	      });
	      if (result.thrown) return null;
	      if (result.error) this.state = result.failState;
	      node.returnType = result.node.typeAnnotation ? this.finishNode(result.node, "TypeAnnotation") : null;
	    }

	    return super.parseArrow(node);
	  }

	  shouldParseArrow() {
	    return this.match(types$1.colon) || super.shouldParseArrow();
	  }

	  setArrowFunctionParameters(node, params) {
	    if (this.state.noArrowParamsConversionAt.indexOf(node.start) !== -1) {
	      node.params = params;
	    } else {
	      super.setArrowFunctionParameters(node, params);
	    }
	  }

	  checkParams(node, allowDuplicates, isArrowFunction) {
	    if (isArrowFunction && this.state.noArrowParamsConversionAt.indexOf(node.start) !== -1) {
	      return;
	    }

	    for (let i = 0; i < node.params.length; i++) {
	      if (this.isThisParam(node.params[i]) && i > 0) {
	        this.raise(node.params[i].start, FlowErrors.ThisParamMustBeFirst);
	      }
	    }

	    return super.checkParams(...arguments);
	  }

	  parseParenAndDistinguishExpression(canBeArrow) {
	    return super.parseParenAndDistinguishExpression(canBeArrow && this.state.noArrowAt.indexOf(this.state.start) === -1);
	  }

	  parseSubscripts(base, startPos, startLoc, noCalls) {
	    if (base.type === "Identifier" && base.name === "async" && this.state.noArrowAt.indexOf(startPos) !== -1) {
	      this.next();
	      const node = this.startNodeAt(startPos, startLoc);
	      node.callee = base;
	      node.arguments = this.parseCallExpressionArguments(types$1.parenR, false);
	      base = this.finishNode(node, "CallExpression");
	    } else if (base.type === "Identifier" && base.name === "async" && this.isRelational("<")) {
	      const state = this.state.clone();
	      const arrow = this.tryParse(abort => this.parseAsyncArrowWithTypeParameters(startPos, startLoc) || abort(), state);
	      if (!arrow.error && !arrow.aborted) return arrow.node;
	      const result = this.tryParse(() => super.parseSubscripts(base, startPos, startLoc, noCalls), state);
	      if (result.node && !result.error) return result.node;

	      if (arrow.node) {
	        this.state = arrow.failState;
	        return arrow.node;
	      }

	      if (result.node) {
	        this.state = result.failState;
	        return result.node;
	      }

	      throw arrow.error || result.error;
	    }

	    return super.parseSubscripts(base, startPos, startLoc, noCalls);
	  }

	  parseSubscript(base, startPos, startLoc, noCalls, subscriptState) {
	    if (this.match(types$1.questionDot) && this.isLookaheadToken_lt()) {
	      subscriptState.optionalChainMember = true;

	      if (noCalls) {
	        subscriptState.stop = true;
	        return base;
	      }

	      this.next();
	      const node = this.startNodeAt(startPos, startLoc);
	      node.callee = base;
	      node.typeArguments = this.flowParseTypeParameterInstantiation();
	      this.expect(types$1.parenL);
	      node.arguments = this.parseCallExpressionArguments(types$1.parenR, false);
	      node.optional = true;
	      return this.finishCallExpression(node, true);
	    } else if (!noCalls && this.shouldParseTypes() && this.isRelational("<")) {
	      const node = this.startNodeAt(startPos, startLoc);
	      node.callee = base;
	      const result = this.tryParse(() => {
	        node.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew();
	        this.expect(types$1.parenL);
	        node.arguments = this.parseCallExpressionArguments(types$1.parenR, false);
	        if (subscriptState.optionalChainMember) node.optional = false;
	        return this.finishCallExpression(node, subscriptState.optionalChainMember);
	      });

	      if (result.node) {
	        if (result.error) this.state = result.failState;
	        return result.node;
	      }
	    }

	    return super.parseSubscript(base, startPos, startLoc, noCalls, subscriptState);
	  }

	  parseNewArguments(node) {
	    let targs = null;

	    if (this.shouldParseTypes() && this.isRelational("<")) {
	      targs = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node;
	    }

	    node.typeArguments = targs;
	    super.parseNewArguments(node);
	  }

	  parseAsyncArrowWithTypeParameters(startPos, startLoc) {
	    const node = this.startNodeAt(startPos, startLoc);
	    this.parseFunctionParams(node);
	    if (!this.parseArrow(node)) return;
	    return this.parseArrowExpression(node, undefined, true);
	  }

	  readToken_mult_modulo(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (code === 42 && next === 47 && this.state.hasFlowComment) {
	      this.state.hasFlowComment = false;
	      this.state.pos += 2;
	      this.nextToken();
	      return;
	    }

	    super.readToken_mult_modulo(code);
	  }

	  readToken_pipe_amp(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (code === 124 && next === 125) {
	      this.finishOp(types$1.braceBarR, 2);
	      return;
	    }

	    super.readToken_pipe_amp(code);
	  }

	  parseTopLevel(file, program) {
	    const fileNode = super.parseTopLevel(file, program);

	    if (this.state.hasFlowComment) {
	      this.raise(this.state.pos, FlowErrors.UnterminatedFlowComment);
	    }

	    return fileNode;
	  }

	  skipBlockComment() {
	    if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
	      if (this.state.hasFlowComment) {
	        this.unexpected(null, FlowErrors.NestedFlowComment);
	      }

	      this.hasFlowCommentCompletion();
	      this.state.pos += this.skipFlowComment();
	      this.state.hasFlowComment = true;
	      return;
	    }

	    if (this.state.hasFlowComment) {
	      const end = this.input.indexOf("*-/", this.state.pos += 2);

	      if (end === -1) {
	        throw this.raise(this.state.pos - 2, ErrorMessages.UnterminatedComment);
	      }

	      this.state.pos = end + 3;
	      return;
	    }

	    super.skipBlockComment();
	  }

	  skipFlowComment() {
	    const {
	      pos
	    } = this.state;
	    let shiftToFirstNonWhiteSpace = 2;

	    while ([32, 9].includes(this.input.charCodeAt(pos + shiftToFirstNonWhiteSpace))) {
	      shiftToFirstNonWhiteSpace++;
	    }

	    const ch2 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos);
	    const ch3 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos + 1);

	    if (ch2 === 58 && ch3 === 58) {
	      return shiftToFirstNonWhiteSpace + 2;
	    }

	    if (this.input.slice(shiftToFirstNonWhiteSpace + pos, shiftToFirstNonWhiteSpace + pos + 12) === "flow-include") {
	      return shiftToFirstNonWhiteSpace + 12;
	    }

	    if (ch2 === 58 && ch3 !== 58) {
	      return shiftToFirstNonWhiteSpace;
	    }

	    return false;
	  }

	  hasFlowCommentCompletion() {
	    const end = this.input.indexOf("*/", this.state.pos);

	    if (end === -1) {
	      throw this.raise(this.state.pos, ErrorMessages.UnterminatedComment);
	    }
	  }

	  flowEnumErrorBooleanMemberNotInitialized(pos, {
	    enumName,
	    memberName
	  }) {
	    this.raise(pos, FlowErrors.EnumBooleanMemberNotInitialized, memberName, enumName);
	  }

	  flowEnumErrorInvalidMemberName(pos, {
	    enumName,
	    memberName
	  }) {
	    const suggestion = memberName[0].toUpperCase() + memberName.slice(1);
	    this.raise(pos, FlowErrors.EnumInvalidMemberName, memberName, suggestion, enumName);
	  }

	  flowEnumErrorDuplicateMemberName(pos, {
	    enumName,
	    memberName
	  }) {
	    this.raise(pos, FlowErrors.EnumDuplicateMemberName, memberName, enumName);
	  }

	  flowEnumErrorInconsistentMemberValues(pos, {
	    enumName
	  }) {
	    this.raise(pos, FlowErrors.EnumInconsistentMemberValues, enumName);
	  }

	  flowEnumErrorInvalidExplicitType(pos, {
	    enumName,
	    suppliedType
	  }) {
	    return this.raise(pos, suppliedType === null ? FlowErrors.EnumInvalidExplicitTypeUnknownSupplied : FlowErrors.EnumInvalidExplicitType, enumName, suppliedType);
	  }

	  flowEnumErrorInvalidMemberInitializer(pos, {
	    enumName,
	    explicitType,
	    memberName
	  }) {
	    let message = null;

	    switch (explicitType) {
	      case "boolean":
	      case "number":
	      case "string":
	        message = FlowErrors.EnumInvalidMemberInitializerPrimaryType;
	        break;

	      case "symbol":
	        message = FlowErrors.EnumInvalidMemberInitializerSymbolType;
	        break;

	      default:
	        message = FlowErrors.EnumInvalidMemberInitializerUnknownType;
	    }

	    return this.raise(pos, message, enumName, memberName, explicitType);
	  }

	  flowEnumErrorNumberMemberNotInitialized(pos, {
	    enumName,
	    memberName
	  }) {
	    this.raise(pos, FlowErrors.EnumNumberMemberNotInitialized, enumName, memberName);
	  }

	  flowEnumErrorStringMemberInconsistentlyInitailized(pos, {
	    enumName
	  }) {
	    this.raise(pos, FlowErrors.EnumStringMemberInconsistentlyInitailized, enumName);
	  }

	  flowEnumMemberInit() {
	    const startPos = this.state.start;

	    const endOfInit = () => this.match(types$1.comma) || this.match(types$1.braceR);

	    switch (this.state.type) {
	      case types$1.num:
	        {
	          const literal = this.parseNumericLiteral(this.state.value);

	          if (endOfInit()) {
	            return {
	              type: "number",
	              pos: literal.start,
	              value: literal
	            };
	          }

	          return {
	            type: "invalid",
	            pos: startPos
	          };
	        }

	      case types$1.string:
	        {
	          const literal = this.parseStringLiteral(this.state.value);

	          if (endOfInit()) {
	            return {
	              type: "string",
	              pos: literal.start,
	              value: literal
	            };
	          }

	          return {
	            type: "invalid",
	            pos: startPos
	          };
	        }

	      case types$1._true:
	      case types$1._false:
	        {
	          const literal = this.parseBooleanLiteral(this.match(types$1._true));

	          if (endOfInit()) {
	            return {
	              type: "boolean",
	              pos: literal.start,
	              value: literal
	            };
	          }

	          return {
	            type: "invalid",
	            pos: startPos
	          };
	        }

	      default:
	        return {
	          type: "invalid",
	          pos: startPos
	        };
	    }
	  }

	  flowEnumMemberRaw() {
	    const pos = this.state.start;
	    const id = this.parseIdentifier(true);
	    const init = this.eat(types$1.eq) ? this.flowEnumMemberInit() : {
	      type: "none",
	      pos
	    };
	    return {
	      id,
	      init
	    };
	  }

	  flowEnumCheckExplicitTypeMismatch(pos, context, expectedType) {
	    const {
	      explicitType
	    } = context;

	    if (explicitType === null) {
	      return;
	    }

	    if (explicitType !== expectedType) {
	      this.flowEnumErrorInvalidMemberInitializer(pos, context);
	    }
	  }

	  flowEnumMembers({
	    enumName,
	    explicitType
	  }) {
	    const seenNames = new Set();
	    const members = {
	      booleanMembers: [],
	      numberMembers: [],
	      stringMembers: [],
	      defaultedMembers: []
	    };
	    let hasUnknownMembers = false;

	    while (!this.match(types$1.braceR)) {
	      if (this.eat(types$1.ellipsis)) {
	        hasUnknownMembers = true;
	        break;
	      }

	      const memberNode = this.startNode();
	      const {
	        id,
	        init
	      } = this.flowEnumMemberRaw();
	      const memberName = id.name;

	      if (memberName === "") {
	        continue;
	      }

	      if (/^[a-z]/.test(memberName)) {
	        this.flowEnumErrorInvalidMemberName(id.start, {
	          enumName,
	          memberName
	        });
	      }

	      if (seenNames.has(memberName)) {
	        this.flowEnumErrorDuplicateMemberName(id.start, {
	          enumName,
	          memberName
	        });
	      }

	      seenNames.add(memberName);
	      const context = {
	        enumName,
	        explicitType,
	        memberName
	      };
	      memberNode.id = id;

	      switch (init.type) {
	        case "boolean":
	          {
	            this.flowEnumCheckExplicitTypeMismatch(init.pos, context, "boolean");
	            memberNode.init = init.value;
	            members.booleanMembers.push(this.finishNode(memberNode, "EnumBooleanMember"));
	            break;
	          }

	        case "number":
	          {
	            this.flowEnumCheckExplicitTypeMismatch(init.pos, context, "number");
	            memberNode.init = init.value;
	            members.numberMembers.push(this.finishNode(memberNode, "EnumNumberMember"));
	            break;
	          }

	        case "string":
	          {
	            this.flowEnumCheckExplicitTypeMismatch(init.pos, context, "string");
	            memberNode.init = init.value;
	            members.stringMembers.push(this.finishNode(memberNode, "EnumStringMember"));
	            break;
	          }

	        case "invalid":
	          {
	            throw this.flowEnumErrorInvalidMemberInitializer(init.pos, context);
	          }

	        case "none":
	          {
	            switch (explicitType) {
	              case "boolean":
	                this.flowEnumErrorBooleanMemberNotInitialized(init.pos, context);
	                break;

	              case "number":
	                this.flowEnumErrorNumberMemberNotInitialized(init.pos, context);
	                break;

	              default:
	                members.defaultedMembers.push(this.finishNode(memberNode, "EnumDefaultedMember"));
	            }
	          }
	      }

	      if (!this.match(types$1.braceR)) {
	        this.expect(types$1.comma);
	      }
	    }

	    return {
	      members,
	      hasUnknownMembers
	    };
	  }

	  flowEnumStringMembers(initializedMembers, defaultedMembers, {
	    enumName
	  }) {
	    if (initializedMembers.length === 0) {
	      return defaultedMembers;
	    } else if (defaultedMembers.length === 0) {
	      return initializedMembers;
	    } else if (defaultedMembers.length > initializedMembers.length) {
	      for (const member of initializedMembers) {
	        this.flowEnumErrorStringMemberInconsistentlyInitailized(member.start, {
	          enumName
	        });
	      }

	      return defaultedMembers;
	    } else {
	      for (const member of defaultedMembers) {
	        this.flowEnumErrorStringMemberInconsistentlyInitailized(member.start, {
	          enumName
	        });
	      }

	      return initializedMembers;
	    }
	  }

	  flowEnumParseExplicitType({
	    enumName
	  }) {
	    if (this.eatContextual("of")) {
	      if (!this.match(types$1.name)) {
	        throw this.flowEnumErrorInvalidExplicitType(this.state.start, {
	          enumName,
	          suppliedType: null
	        });
	      }

	      const {
	        value
	      } = this.state;
	      this.next();

	      if (value !== "boolean" && value !== "number" && value !== "string" && value !== "symbol") {
	        this.flowEnumErrorInvalidExplicitType(this.state.start, {
	          enumName,
	          suppliedType: value
	        });
	      }

	      return value;
	    }

	    return null;
	  }

	  flowEnumBody(node, {
	    enumName,
	    nameLoc
	  }) {
	    const explicitType = this.flowEnumParseExplicitType({
	      enumName
	    });
	    this.expect(types$1.braceL);
	    const {
	      members,
	      hasUnknownMembers
	    } = this.flowEnumMembers({
	      enumName,
	      explicitType
	    });
	    node.hasUnknownMembers = hasUnknownMembers;

	    switch (explicitType) {
	      case "boolean":
	        node.explicitType = true;
	        node.members = members.booleanMembers;
	        this.expect(types$1.braceR);
	        return this.finishNode(node, "EnumBooleanBody");

	      case "number":
	        node.explicitType = true;
	        node.members = members.numberMembers;
	        this.expect(types$1.braceR);
	        return this.finishNode(node, "EnumNumberBody");

	      case "string":
	        node.explicitType = true;
	        node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
	          enumName
	        });
	        this.expect(types$1.braceR);
	        return this.finishNode(node, "EnumStringBody");

	      case "symbol":
	        node.members = members.defaultedMembers;
	        this.expect(types$1.braceR);
	        return this.finishNode(node, "EnumSymbolBody");

	      default:
	        {
	          const empty = () => {
	            node.members = [];
	            this.expect(types$1.braceR);
	            return this.finishNode(node, "EnumStringBody");
	          };

	          node.explicitType = false;
	          const boolsLen = members.booleanMembers.length;
	          const numsLen = members.numberMembers.length;
	          const strsLen = members.stringMembers.length;
	          const defaultedLen = members.defaultedMembers.length;

	          if (!boolsLen && !numsLen && !strsLen && !defaultedLen) {
	            return empty();
	          } else if (!boolsLen && !numsLen) {
	            node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
	              enumName
	            });
	            this.expect(types$1.braceR);
	            return this.finishNode(node, "EnumStringBody");
	          } else if (!numsLen && !strsLen && boolsLen >= defaultedLen) {
	            for (const member of members.defaultedMembers) {
	              this.flowEnumErrorBooleanMemberNotInitialized(member.start, {
	                enumName,
	                memberName: member.id.name
	              });
	            }

	            node.members = members.booleanMembers;
	            this.expect(types$1.braceR);
	            return this.finishNode(node, "EnumBooleanBody");
	          } else if (!boolsLen && !strsLen && numsLen >= defaultedLen) {
	            for (const member of members.defaultedMembers) {
	              this.flowEnumErrorNumberMemberNotInitialized(member.start, {
	                enumName,
	                memberName: member.id.name
	              });
	            }

	            node.members = members.numberMembers;
	            this.expect(types$1.braceR);
	            return this.finishNode(node, "EnumNumberBody");
	          } else {
	            this.flowEnumErrorInconsistentMemberValues(nameLoc, {
	              enumName
	            });
	            return empty();
	          }
	        }
	    }
	  }

	  flowParseEnumDeclaration(node) {
	    const id = this.parseIdentifier();
	    node.id = id;
	    node.body = this.flowEnumBody(this.startNode(), {
	      enumName: id.name,
	      nameLoc: id.start
	    });
	    return this.finishNode(node, "EnumDeclaration");
	  }

	  isLookaheadToken_lt() {
	    const next = this.nextTokenStart();

	    if (this.input.charCodeAt(next) === 60) {
	      const afterNext = this.input.charCodeAt(next + 1);
	      return afterNext !== 60 && afterNext !== 61;
	    }

	    return false;
	  }

	  maybeUnwrapTypeCastExpression(node) {
	    return node.type === "TypeCastExpression" ? node.expression : node;
	  }

	});

	const entities = {
	  quot: "\u0022",
	  amp: "&",
	  apos: "\u0027",
	  lt: "<",
	  gt: ">",
	  nbsp: "\u00A0",
	  iexcl: "\u00A1",
	  cent: "\u00A2",
	  pound: "\u00A3",
	  curren: "\u00A4",
	  yen: "\u00A5",
	  brvbar: "\u00A6",
	  sect: "\u00A7",
	  uml: "\u00A8",
	  copy: "\u00A9",
	  ordf: "\u00AA",
	  laquo: "\u00AB",
	  not: "\u00AC",
	  shy: "\u00AD",
	  reg: "\u00AE",
	  macr: "\u00AF",
	  deg: "\u00B0",
	  plusmn: "\u00B1",
	  sup2: "\u00B2",
	  sup3: "\u00B3",
	  acute: "\u00B4",
	  micro: "\u00B5",
	  para: "\u00B6",
	  middot: "\u00B7",
	  cedil: "\u00B8",
	  sup1: "\u00B9",
	  ordm: "\u00BA",
	  raquo: "\u00BB",
	  frac14: "\u00BC",
	  frac12: "\u00BD",
	  frac34: "\u00BE",
	  iquest: "\u00BF",
	  Agrave: "\u00C0",
	  Aacute: "\u00C1",
	  Acirc: "\u00C2",
	  Atilde: "\u00C3",
	  Auml: "\u00C4",
	  Aring: "\u00C5",
	  AElig: "\u00C6",
	  Ccedil: "\u00C7",
	  Egrave: "\u00C8",
	  Eacute: "\u00C9",
	  Ecirc: "\u00CA",
	  Euml: "\u00CB",
	  Igrave: "\u00CC",
	  Iacute: "\u00CD",
	  Icirc: "\u00CE",
	  Iuml: "\u00CF",
	  ETH: "\u00D0",
	  Ntilde: "\u00D1",
	  Ograve: "\u00D2",
	  Oacute: "\u00D3",
	  Ocirc: "\u00D4",
	  Otilde: "\u00D5",
	  Ouml: "\u00D6",
	  times: "\u00D7",
	  Oslash: "\u00D8",
	  Ugrave: "\u00D9",
	  Uacute: "\u00DA",
	  Ucirc: "\u00DB",
	  Uuml: "\u00DC",
	  Yacute: "\u00DD",
	  THORN: "\u00DE",
	  szlig: "\u00DF",
	  agrave: "\u00E0",
	  aacute: "\u00E1",
	  acirc: "\u00E2",
	  atilde: "\u00E3",
	  auml: "\u00E4",
	  aring: "\u00E5",
	  aelig: "\u00E6",
	  ccedil: "\u00E7",
	  egrave: "\u00E8",
	  eacute: "\u00E9",
	  ecirc: "\u00EA",
	  euml: "\u00EB",
	  igrave: "\u00EC",
	  iacute: "\u00ED",
	  icirc: "\u00EE",
	  iuml: "\u00EF",
	  eth: "\u00F0",
	  ntilde: "\u00F1",
	  ograve: "\u00F2",
	  oacute: "\u00F3",
	  ocirc: "\u00F4",
	  otilde: "\u00F5",
	  ouml: "\u00F6",
	  divide: "\u00F7",
	  oslash: "\u00F8",
	  ugrave: "\u00F9",
	  uacute: "\u00FA",
	  ucirc: "\u00FB",
	  uuml: "\u00FC",
	  yacute: "\u00FD",
	  thorn: "\u00FE",
	  yuml: "\u00FF",
	  OElig: "\u0152",
	  oelig: "\u0153",
	  Scaron: "\u0160",
	  scaron: "\u0161",
	  Yuml: "\u0178",
	  fnof: "\u0192",
	  circ: "\u02C6",
	  tilde: "\u02DC",
	  Alpha: "\u0391",
	  Beta: "\u0392",
	  Gamma: "\u0393",
	  Delta: "\u0394",
	  Epsilon: "\u0395",
	  Zeta: "\u0396",
	  Eta: "\u0397",
	  Theta: "\u0398",
	  Iota: "\u0399",
	  Kappa: "\u039A",
	  Lambda: "\u039B",
	  Mu: "\u039C",
	  Nu: "\u039D",
	  Xi: "\u039E",
	  Omicron: "\u039F",
	  Pi: "\u03A0",
	  Rho: "\u03A1",
	  Sigma: "\u03A3",
	  Tau: "\u03A4",
	  Upsilon: "\u03A5",
	  Phi: "\u03A6",
	  Chi: "\u03A7",
	  Psi: "\u03A8",
	  Omega: "\u03A9",
	  alpha: "\u03B1",
	  beta: "\u03B2",
	  gamma: "\u03B3",
	  delta: "\u03B4",
	  epsilon: "\u03B5",
	  zeta: "\u03B6",
	  eta: "\u03B7",
	  theta: "\u03B8",
	  iota: "\u03B9",
	  kappa: "\u03BA",
	  lambda: "\u03BB",
	  mu: "\u03BC",
	  nu: "\u03BD",
	  xi: "\u03BE",
	  omicron: "\u03BF",
	  pi: "\u03C0",
	  rho: "\u03C1",
	  sigmaf: "\u03C2",
	  sigma: "\u03C3",
	  tau: "\u03C4",
	  upsilon: "\u03C5",
	  phi: "\u03C6",
	  chi: "\u03C7",
	  psi: "\u03C8",
	  omega: "\u03C9",
	  thetasym: "\u03D1",
	  upsih: "\u03D2",
	  piv: "\u03D6",
	  ensp: "\u2002",
	  emsp: "\u2003",
	  thinsp: "\u2009",
	  zwnj: "\u200C",
	  zwj: "\u200D",
	  lrm: "\u200E",
	  rlm: "\u200F",
	  ndash: "\u2013",
	  mdash: "\u2014",
	  lsquo: "\u2018",
	  rsquo: "\u2019",
	  sbquo: "\u201A",
	  ldquo: "\u201C",
	  rdquo: "\u201D",
	  bdquo: "\u201E",
	  dagger: "\u2020",
	  Dagger: "\u2021",
	  bull: "\u2022",
	  hellip: "\u2026",
	  permil: "\u2030",
	  prime: "\u2032",
	  Prime: "\u2033",
	  lsaquo: "\u2039",
	  rsaquo: "\u203A",
	  oline: "\u203E",
	  frasl: "\u2044",
	  euro: "\u20AC",
	  image: "\u2111",
	  weierp: "\u2118",
	  real: "\u211C",
	  trade: "\u2122",
	  alefsym: "\u2135",
	  larr: "\u2190",
	  uarr: "\u2191",
	  rarr: "\u2192",
	  darr: "\u2193",
	  harr: "\u2194",
	  crarr: "\u21B5",
	  lArr: "\u21D0",
	  uArr: "\u21D1",
	  rArr: "\u21D2",
	  dArr: "\u21D3",
	  hArr: "\u21D4",
	  forall: "\u2200",
	  part: "\u2202",
	  exist: "\u2203",
	  empty: "\u2205",
	  nabla: "\u2207",
	  isin: "\u2208",
	  notin: "\u2209",
	  ni: "\u220B",
	  prod: "\u220F",
	  sum: "\u2211",
	  minus: "\u2212",
	  lowast: "\u2217",
	  radic: "\u221A",
	  prop: "\u221D",
	  infin: "\u221E",
	  ang: "\u2220",
	  and: "\u2227",
	  or: "\u2228",
	  cap: "\u2229",
	  cup: "\u222A",
	  int: "\u222B",
	  there4: "\u2234",
	  sim: "\u223C",
	  cong: "\u2245",
	  asymp: "\u2248",
	  ne: "\u2260",
	  equiv: "\u2261",
	  le: "\u2264",
	  ge: "\u2265",
	  sub: "\u2282",
	  sup: "\u2283",
	  nsub: "\u2284",
	  sube: "\u2286",
	  supe: "\u2287",
	  oplus: "\u2295",
	  otimes: "\u2297",
	  perp: "\u22A5",
	  sdot: "\u22C5",
	  lceil: "\u2308",
	  rceil: "\u2309",
	  lfloor: "\u230A",
	  rfloor: "\u230B",
	  lang: "\u2329",
	  rang: "\u232A",
	  loz: "\u25CA",
	  spades: "\u2660",
	  clubs: "\u2663",
	  hearts: "\u2665",
	  diams: "\u2666"
	};

	class State {
	  constructor() {
	    this.strict = void 0;
	    this.curLine = void 0;
	    this.startLoc = void 0;
	    this.endLoc = void 0;
	    this.errors = [];
	    this.potentialArrowAt = -1;
	    this.noArrowAt = [];
	    this.noArrowParamsConversionAt = [];
	    this.maybeInArrowParameters = false;
	    this.inPipeline = false;
	    this.inType = false;
	    this.noAnonFunctionType = false;
	    this.inPropertyName = false;
	    this.hasFlowComment = false;
	    this.isAmbientContext = false;
	    this.inAbstractClass = false;
	    this.topicContext = {
	      maxNumOfResolvableTopics: 0,
	      maxTopicIndex: null
	    };
	    this.soloAwait = false;
	    this.inFSharpPipelineDirectBody = false;
	    this.labels = [];
	    this.decoratorStack = [[]];
	    this.comments = [];
	    this.trailingComments = [];
	    this.leadingComments = [];
	    this.commentStack = [];
	    this.commentPreviousNode = null;
	    this.pos = 0;
	    this.lineStart = 0;
	    this.type = types$1.eof;
	    this.value = null;
	    this.start = 0;
	    this.end = 0;
	    this.lastTokEndLoc = null;
	    this.lastTokStartLoc = null;
	    this.lastTokStart = 0;
	    this.lastTokEnd = 0;
	    this.context = [types$2.brace];
	    this.exprAllowed = true;
	    this.containsEsc = false;
	    this.strictErrors = new Map();
	    this.tokensLength = 0;
	  }

	  init(options) {
	    this.strict = options.strictMode === false ? false : options.sourceType === "module";
	    this.curLine = options.startLine;
	    this.startLoc = this.endLoc = this.curPosition();
	  }

	  curPosition() {
	    return new Position(this.curLine, this.pos - this.lineStart);
	  }

	  clone(skipArrays) {
	    const state = new State();
	    const keys = Object.keys(this);

	    for (let i = 0, length = keys.length; i < length; i++) {
	      const key = keys[i];
	      let val = this[key];

	      if (!skipArrays && Array.isArray(val)) {
	        val = val.slice();
	      }

	      state[key] = val;
	    }

	    return state;
	  }

	}

	const HEX_NUMBER = /^[\da-fA-F]+$/;
	const DECIMAL_NUMBER = /^\d+$/;
	const JsxErrors = makeErrorTemplates({
	  AttributeIsEmpty: "JSX attributes must only be assigned a non-empty expression.",
	  MissingClosingTagElement: "Expected corresponding JSX closing tag for <%0>.",
	  MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>.",
	  UnexpectedSequenceExpression: "Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?",
	  UnsupportedJsxValue: "JSX value should be either an expression or a quoted JSX text.",
	  UnterminatedJsxContent: "Unterminated JSX contents.",
	  UnwrappedAdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?"
	}, ErrorCodes.SyntaxError);
	types$2.j_oTag = new TokContext("<tag");
	types$2.j_cTag = new TokContext("</tag");
	types$2.j_expr = new TokContext("<tag>...</tag>", true);
	types$1.jsxName = new TokenType("jsxName");
	types$1.jsxText = new TokenType("jsxText", {
	  beforeExpr: true
	});
	types$1.jsxTagStart = new TokenType("jsxTagStart", {
	  startsExpr: true
	});
	types$1.jsxTagEnd = new TokenType("jsxTagEnd");

	types$1.jsxTagStart.updateContext = context => {
	  context.push(types$2.j_expr, types$2.j_oTag);
	};

	function isFragment(object) {
	  return object ? object.type === "JSXOpeningFragment" || object.type === "JSXClosingFragment" : false;
	}

	function getQualifiedJSXName(object) {
	  if (object.type === "JSXIdentifier") {
	    return object.name;
	  }

	  if (object.type === "JSXNamespacedName") {
	    return object.namespace.name + ":" + object.name.name;
	  }

	  if (object.type === "JSXMemberExpression") {
	    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
	  }

	  throw new Error("Node had unexpected type: " + object.type);
	}

	var jsx = (superClass => class extends superClass {
	  jsxReadToken() {
	    let out = "";
	    let chunkStart = this.state.pos;

	    for (;;) {
	      if (this.state.pos >= this.length) {
	        throw this.raise(this.state.start, JsxErrors.UnterminatedJsxContent);
	      }

	      const ch = this.input.charCodeAt(this.state.pos);

	      switch (ch) {
	        case 60:
	        case 123:
	          if (this.state.pos === this.state.start) {
	            if (ch === 60 && this.state.exprAllowed) {
	              ++this.state.pos;
	              return this.finishToken(types$1.jsxTagStart);
	            }

	            return super.getTokenFromCode(ch);
	          }

	          out += this.input.slice(chunkStart, this.state.pos);
	          return this.finishToken(types$1.jsxText, out);

	        case 38:
	          out += this.input.slice(chunkStart, this.state.pos);
	          out += this.jsxReadEntity();
	          chunkStart = this.state.pos;
	          break;

	        case 62:
	        case 125:

	        default:
	          if (isNewLine(ch)) {
	            out += this.input.slice(chunkStart, this.state.pos);
	            out += this.jsxReadNewLine(true);
	            chunkStart = this.state.pos;
	          } else {
	            ++this.state.pos;
	          }

	      }
	    }
	  }

	  jsxReadNewLine(normalizeCRLF) {
	    const ch = this.input.charCodeAt(this.state.pos);
	    let out;
	    ++this.state.pos;

	    if (ch === 13 && this.input.charCodeAt(this.state.pos) === 10) {
	      ++this.state.pos;
	      out = normalizeCRLF ? "\n" : "\r\n";
	    } else {
	      out = String.fromCharCode(ch);
	    }

	    ++this.state.curLine;
	    this.state.lineStart = this.state.pos;
	    return out;
	  }

	  jsxReadString(quote) {
	    let out = "";
	    let chunkStart = ++this.state.pos;

	    for (;;) {
	      if (this.state.pos >= this.length) {
	        throw this.raise(this.state.start, ErrorMessages.UnterminatedString);
	      }

	      const ch = this.input.charCodeAt(this.state.pos);
	      if (ch === quote) break;

	      if (ch === 38) {
	        out += this.input.slice(chunkStart, this.state.pos);
	        out += this.jsxReadEntity();
	        chunkStart = this.state.pos;
	      } else if (isNewLine(ch)) {
	        out += this.input.slice(chunkStart, this.state.pos);
	        out += this.jsxReadNewLine(false);
	        chunkStart = this.state.pos;
	      } else {
	        ++this.state.pos;
	      }
	    }

	    out += this.input.slice(chunkStart, this.state.pos++);
	    return this.finishToken(types$1.string, out);
	  }

	  jsxReadEntity() {
	    let str = "";
	    let count = 0;
	    let entity;
	    let ch = this.input[this.state.pos];
	    const startPos = ++this.state.pos;

	    while (this.state.pos < this.length && count++ < 10) {
	      ch = this.input[this.state.pos++];

	      if (ch === ";") {
	        if (str[0] === "#") {
	          if (str[1] === "x") {
	            str = str.substr(2);

	            if (HEX_NUMBER.test(str)) {
	              entity = String.fromCodePoint(parseInt(str, 16));
	            }
	          } else {
	            str = str.substr(1);

	            if (DECIMAL_NUMBER.test(str)) {
	              entity = String.fromCodePoint(parseInt(str, 10));
	            }
	          }
	        } else {
	          entity = entities[str];
	        }

	        break;
	      }

	      str += ch;
	    }

	    if (!entity) {
	      this.state.pos = startPos;
	      return "&";
	    }

	    return entity;
	  }

	  jsxReadWord() {
	    let ch;
	    const start = this.state.pos;

	    do {
	      ch = this.input.charCodeAt(++this.state.pos);
	    } while (isIdentifierChar(ch) || ch === 45);

	    return this.finishToken(types$1.jsxName, this.input.slice(start, this.state.pos));
	  }

	  jsxParseIdentifier() {
	    const node = this.startNode();

	    if (this.match(types$1.jsxName)) {
	      node.name = this.state.value;
	    } else if (this.state.type.keyword) {
	      node.name = this.state.type.keyword;
	    } else {
	      this.unexpected();
	    }

	    this.next();
	    return this.finishNode(node, "JSXIdentifier");
	  }

	  jsxParseNamespacedName() {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const name = this.jsxParseIdentifier();
	    if (!this.eat(types$1.colon)) return name;
	    const node = this.startNodeAt(startPos, startLoc);
	    node.namespace = name;
	    node.name = this.jsxParseIdentifier();
	    return this.finishNode(node, "JSXNamespacedName");
	  }

	  jsxParseElementName() {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    let node = this.jsxParseNamespacedName();

	    if (node.type === "JSXNamespacedName") {
	      return node;
	    }

	    while (this.eat(types$1.dot)) {
	      const newNode = this.startNodeAt(startPos, startLoc);
	      newNode.object = node;
	      newNode.property = this.jsxParseIdentifier();
	      node = this.finishNode(newNode, "JSXMemberExpression");
	    }

	    return node;
	  }

	  jsxParseAttributeValue() {
	    let node;

	    switch (this.state.type) {
	      case types$1.braceL:
	        node = this.startNode();
	        this.next();
	        node = this.jsxParseExpressionContainer(node);

	        if (node.expression.type === "JSXEmptyExpression") {
	          this.raise(node.start, JsxErrors.AttributeIsEmpty);
	        }

	        return node;

	      case types$1.jsxTagStart:
	      case types$1.string:
	        return this.parseExprAtom();

	      default:
	        throw this.raise(this.state.start, JsxErrors.UnsupportedJsxValue);
	    }
	  }

	  jsxParseEmptyExpression() {
	    const node = this.startNodeAt(this.state.lastTokEnd, this.state.lastTokEndLoc);
	    return this.finishNodeAt(node, "JSXEmptyExpression", this.state.start, this.state.startLoc);
	  }

	  jsxParseSpreadChild(node) {
	    this.next();
	    node.expression = this.parseExpression();
	    this.expect(types$1.braceR);
	    return this.finishNode(node, "JSXSpreadChild");
	  }

	  jsxParseExpressionContainer(node) {
	    if (this.match(types$1.braceR)) {
	      node.expression = this.jsxParseEmptyExpression();
	    } else {
	      const expression = this.parseExpression();
	      node.expression = expression;
	    }

	    this.expect(types$1.braceR);
	    return this.finishNode(node, "JSXExpressionContainer");
	  }

	  jsxParseAttribute() {
	    const node = this.startNode();

	    if (this.eat(types$1.braceL)) {
	      this.expect(types$1.ellipsis);
	      node.argument = this.parseMaybeAssignAllowIn();
	      this.expect(types$1.braceR);
	      return this.finishNode(node, "JSXSpreadAttribute");
	    }

	    node.name = this.jsxParseNamespacedName();
	    node.value = this.eat(types$1.eq) ? this.jsxParseAttributeValue() : null;
	    return this.finishNode(node, "JSXAttribute");
	  }

	  jsxParseOpeningElementAt(startPos, startLoc) {
	    const node = this.startNodeAt(startPos, startLoc);

	    if (this.match(types$1.jsxTagEnd)) {
	      this.expect(types$1.jsxTagEnd);
	      return this.finishNode(node, "JSXOpeningFragment");
	    }

	    node.name = this.jsxParseElementName();
	    return this.jsxParseOpeningElementAfterName(node);
	  }

	  jsxParseOpeningElementAfterName(node) {
	    const attributes = [];

	    while (!this.match(types$1.slash) && !this.match(types$1.jsxTagEnd)) {
	      attributes.push(this.jsxParseAttribute());
	    }

	    node.attributes = attributes;
	    node.selfClosing = this.eat(types$1.slash);
	    this.expect(types$1.jsxTagEnd);
	    return this.finishNode(node, "JSXOpeningElement");
	  }

	  jsxParseClosingElementAt(startPos, startLoc) {
	    const node = this.startNodeAt(startPos, startLoc);

	    if (this.match(types$1.jsxTagEnd)) {
	      this.expect(types$1.jsxTagEnd);
	      return this.finishNode(node, "JSXClosingFragment");
	    }

	    node.name = this.jsxParseElementName();
	    this.expect(types$1.jsxTagEnd);
	    return this.finishNode(node, "JSXClosingElement");
	  }

	  jsxParseElementAt(startPos, startLoc) {
	    const node = this.startNodeAt(startPos, startLoc);
	    const children = [];
	    const openingElement = this.jsxParseOpeningElementAt(startPos, startLoc);
	    let closingElement = null;

	    if (!openingElement.selfClosing) {
	      contents: for (;;) {
	        switch (this.state.type) {
	          case types$1.jsxTagStart:
	            startPos = this.state.start;
	            startLoc = this.state.startLoc;
	            this.next();

	            if (this.eat(types$1.slash)) {
	              closingElement = this.jsxParseClosingElementAt(startPos, startLoc);
	              break contents;
	            }

	            children.push(this.jsxParseElementAt(startPos, startLoc));
	            break;

	          case types$1.jsxText:
	            children.push(this.parseExprAtom());
	            break;

	          case types$1.braceL:
	            {
	              const node = this.startNode();
	              this.next();

	              if (this.match(types$1.ellipsis)) {
	                children.push(this.jsxParseSpreadChild(node));
	              } else {
	                children.push(this.jsxParseExpressionContainer(node));
	              }

	              break;
	            }

	          default:
	            throw this.unexpected();
	        }
	      }

	      if (isFragment(openingElement) && !isFragment(closingElement)) {
	        this.raise(closingElement.start, JsxErrors.MissingClosingTagFragment);
	      } else if (!isFragment(openingElement) && isFragment(closingElement)) {
	        this.raise(closingElement.start, JsxErrors.MissingClosingTagElement, getQualifiedJSXName(openingElement.name));
	      } else if (!isFragment(openingElement) && !isFragment(closingElement)) {
	        if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
	          this.raise(closingElement.start, JsxErrors.MissingClosingTagElement, getQualifiedJSXName(openingElement.name));
	        }
	      }
	    }

	    if (isFragment(openingElement)) {
	      node.openingFragment = openingElement;
	      node.closingFragment = closingElement;
	    } else {
	      node.openingElement = openingElement;
	      node.closingElement = closingElement;
	    }

	    node.children = children;

	    if (this.isRelational("<")) {
	      throw this.raise(this.state.start, JsxErrors.UnwrappedAdjacentJSXElements);
	    }

	    return isFragment(openingElement) ? this.finishNode(node, "JSXFragment") : this.finishNode(node, "JSXElement");
	  }

	  jsxParseElement() {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    this.next();
	    return this.jsxParseElementAt(startPos, startLoc);
	  }

	  parseExprAtom(refExpressionErrors) {
	    if (this.match(types$1.jsxText)) {
	      return this.parseLiteral(this.state.value, "JSXText");
	    } else if (this.match(types$1.jsxTagStart)) {
	      return this.jsxParseElement();
	    } else if (this.isRelational("<") && this.input.charCodeAt(this.state.pos) !== 33) {
	      this.finishToken(types$1.jsxTagStart);
	      return this.jsxParseElement();
	    } else {
	      return super.parseExprAtom(refExpressionErrors);
	    }
	  }

	  createLookaheadState(state) {
	    const lookaheadState = super.createLookaheadState(state);
	    lookaheadState.inPropertyName = state.inPropertyName;
	    return lookaheadState;
	  }

	  getTokenFromCode(code) {
	    if (this.state.inPropertyName) return super.getTokenFromCode(code);
	    const context = this.curContext();

	    if (context === types$2.j_expr) {
	      return this.jsxReadToken();
	    }

	    if (context === types$2.j_oTag || context === types$2.j_cTag) {
	      if (isIdentifierStart(code)) {
	        return this.jsxReadWord();
	      }

	      if (code === 62) {
	        ++this.state.pos;
	        return this.finishToken(types$1.jsxTagEnd);
	      }

	      if ((code === 34 || code === 39) && context === types$2.j_oTag) {
	        return this.jsxReadString(code);
	      }
	    }

	    if (code === 60 && this.state.exprAllowed && this.input.charCodeAt(this.state.pos + 1) !== 33) {
	      ++this.state.pos;
	      return this.finishToken(types$1.jsxTagStart);
	    }

	    return super.getTokenFromCode(code);
	  }

	  updateContext(prevType) {
	    super.updateContext(prevType);
	    const {
	      context,
	      type
	    } = this.state;

	    if (type === types$1.slash && prevType === types$1.jsxTagStart) {
	      context.splice(-2, 2, types$2.j_cTag);
	      this.state.exprAllowed = false;
	    } else if (type === types$1.jsxTagEnd) {
	      const out = context.pop();

	      if (out === types$2.j_oTag && prevType === types$1.slash || out === types$2.j_cTag) {
	        context.pop();
	        this.state.exprAllowed = context[context.length - 1] === types$2.j_expr;
	      } else {
	        this.state.exprAllowed = true;
	      }
	    } else if (type.keyword && (prevType === types$1.dot || prevType === types$1.questionDot)) {
	      this.state.exprAllowed = false;
	    } else {
	      this.state.exprAllowed = type.beforeExpr;
	    }
	  }

	});

	class TypeScriptScope extends Scope {
	  constructor(...args) {
	    super(...args);
	    this.types = new Set();
	    this.enums = new Set();
	    this.constEnums = new Set();
	    this.classes = new Set();
	    this.exportOnlyBindings = new Set();
	  }

	}

	class TypeScriptScopeHandler extends ScopeHandler {
	  createScope(flags) {
	    return new TypeScriptScope(flags);
	  }

	  declareName(name, bindingType, pos) {
	    const scope = this.currentScope();

	    if (bindingType & BIND_FLAGS_TS_EXPORT_ONLY) {
	      this.maybeExportDefined(scope, name);
	      scope.exportOnlyBindings.add(name);
	      return;
	    }

	    super.declareName(...arguments);

	    if (bindingType & BIND_KIND_TYPE) {
	      if (!(bindingType & BIND_KIND_VALUE)) {
	        this.checkRedeclarationInScope(scope, name, bindingType, pos);
	        this.maybeExportDefined(scope, name);
	      }

	      scope.types.add(name);
	    }

	    if (bindingType & BIND_FLAGS_TS_ENUM) scope.enums.add(name);
	    if (bindingType & BIND_FLAGS_TS_CONST_ENUM) scope.constEnums.add(name);
	    if (bindingType & BIND_FLAGS_CLASS) scope.classes.add(name);
	  }

	  isRedeclaredInScope(scope, name, bindingType) {
	    if (scope.enums.has(name)) {
	      if (bindingType & BIND_FLAGS_TS_ENUM) {
	        const isConst = !!(bindingType & BIND_FLAGS_TS_CONST_ENUM);
	        const wasConst = scope.constEnums.has(name);
	        return isConst !== wasConst;
	      }

	      return true;
	    }

	    if (bindingType & BIND_FLAGS_CLASS && scope.classes.has(name)) {
	      if (scope.lexical.has(name)) {
	        return !!(bindingType & BIND_KIND_VALUE);
	      } else {
	        return false;
	      }
	    }

	    if (bindingType & BIND_KIND_TYPE && scope.types.has(name)) {
	      return true;
	    }

	    return super.isRedeclaredInScope(...arguments);
	  }

	  checkLocalExport(id) {
	    const topLevelScope = this.scopeStack[0];
	    const {
	      name
	    } = id;

	    if (!topLevelScope.types.has(name) && !topLevelScope.exportOnlyBindings.has(name)) {
	      super.checkLocalExport(id);
	    }
	  }

	}

	const PARAM = 0b0000,
	      PARAM_YIELD = 0b0001,
	      PARAM_AWAIT = 0b0010,
	      PARAM_RETURN = 0b0100,
	      PARAM_IN = 0b1000;
	class ProductionParameterHandler {
	  constructor() {
	    this.stacks = [];
	  }

	  enter(flags) {
	    this.stacks.push(flags);
	  }

	  exit() {
	    this.stacks.pop();
	  }

	  currentFlags() {
	    return this.stacks[this.stacks.length - 1];
	  }

	  get hasAwait() {
	    return (this.currentFlags() & PARAM_AWAIT) > 0;
	  }

	  get hasYield() {
	    return (this.currentFlags() & PARAM_YIELD) > 0;
	  }

	  get hasReturn() {
	    return (this.currentFlags() & PARAM_RETURN) > 0;
	  }

	  get hasIn() {
	    return (this.currentFlags() & PARAM_IN) > 0;
	  }

	}
	function functionFlags(isAsync, isGenerator) {
	  return (isAsync ? PARAM_AWAIT : 0) | (isGenerator ? PARAM_YIELD : 0);
	}

	function nonNull(x) {
	  if (x == null) {
	    throw new Error(`Unexpected ${x} value.`);
	  }

	  return x;
	}

	function assert(x) {
	  if (!x) {
	    throw new Error("Assert fail");
	  }
	}

	const TSErrors = makeErrorTemplates({
	  AbstractMethodHasImplementation: "Method '%0' cannot have an implementation because it is marked abstract.",
	  AccesorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.",
	  AccesorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
	  ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
	  ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.",
	  ConstructorHasTypeParameters: "Type parameters cannot appear on a constructor declaration.",
	  DeclareAccessor: "'declare' is not allowed in %0ters.",
	  DeclareClassFieldHasInitializer: "Initializers are not allowed in ambient contexts.",
	  DeclareFunctionHasImplementation: "An implementation cannot be declared in ambient contexts.",
	  DuplicateAccessibilityModifier: "Accessibility modifier already seen.",
	  DuplicateModifier: "Duplicate modifier: '%0'.",
	  EmptyHeritageClauseType: "'%0' list cannot be empty.",
	  EmptyTypeArguments: "Type argument list cannot be empty.",
	  EmptyTypeParameters: "Type parameter list cannot be empty.",
	  ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.",
	  ImportAliasHasImportType: "An import alias can not use 'import type'.",
	  IncompatibleModifiers: "'%0' modifier cannot be used with '%1' modifier.",
	  IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.",
	  IndexSignatureHasAccessibility: "Index signatures cannot have an accessibility modifier ('%0').",
	  IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.",
	  IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.",
	  IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.",
	  InvalidModifierOnTypeMember: "'%0' modifier cannot appear on a type member.",
	  InvalidModifiersOrder: "'%0' modifier must precede '%1' modifier.",
	  InvalidTupleMemberLabel: "Tuple members must be labeled with a simple identifier.",
	  MixedLabeledAndUnlabeledElements: "Tuple members must all have names or all not have names.",
	  NonAbstractClassHasAbstractMethod: "Abstract methods can only appear within an abstract class.",
	  NonClassMethodPropertyHasAbstractModifer: "'abstract' modifier can only appear on a class, method, or property declaration.",
	  OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
	  OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.",
	  PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
	  PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
	  PrivateElementHasAccessibility: "Private elements cannot have an accessibility modifier ('%0').",
	  ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.",
	  SetAccesorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.",
	  SetAccesorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.",
	  SetAccesorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.",
	  StaticBlockCannotHaveModifier: "Static class blocks cannot have any modifier.",
	  TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
	  TypeImportCannotSpecifyDefaultAndNamed: "A type-only import can specify a default import or named bindings, but not both.",
	  UnexpectedParameterModifier: "A parameter property is only allowed in a constructor implementation.",
	  UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
	  UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
	  UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
	  UnsupportedImportTypeArgument: "Argument in a type import must be a string literal.",
	  UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
	  UnsupportedSignatureParameterKind: "Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got %0."
	}, ErrorCodes.SyntaxError);

	function keywordTypeFromName(value) {
	  switch (value) {
	    case "any":
	      return "TSAnyKeyword";

	    case "boolean":
	      return "TSBooleanKeyword";

	    case "bigint":
	      return "TSBigIntKeyword";

	    case "never":
	      return "TSNeverKeyword";

	    case "number":
	      return "TSNumberKeyword";

	    case "object":
	      return "TSObjectKeyword";

	    case "string":
	      return "TSStringKeyword";

	    case "symbol":
	      return "TSSymbolKeyword";

	    case "undefined":
	      return "TSUndefinedKeyword";

	    case "unknown":
	      return "TSUnknownKeyword";

	    default:
	      return undefined;
	  }
	}

	function tsIsAccessModifier(modifier) {
	  return modifier === "private" || modifier === "public" || modifier === "protected";
	}

	var typescript = (superClass => class extends superClass {
	  getScopeHandler() {
	    return TypeScriptScopeHandler;
	  }

	  tsIsIdentifier() {
	    return this.match(types$1.name);
	  }

	  tsTokenCanFollowModifier() {
	    return (this.match(types$1.bracketL) || this.match(types$1.braceL) || this.match(types$1.star) || this.match(types$1.ellipsis) || this.match(types$1.privateName) || this.isLiteralPropertyName()) && !this.hasPrecedingLineBreak();
	  }

	  tsNextTokenCanFollowModifier() {
	    this.next();
	    return this.tsTokenCanFollowModifier();
	  }

	  tsParseModifier(allowedModifiers) {
	    if (!this.match(types$1.name)) {
	      return undefined;
	    }

	    const modifier = this.state.value;

	    if (allowedModifiers.indexOf(modifier) !== -1 && this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) {
	      return modifier;
	    }

	    return undefined;
	  }

	  tsParseModifiers(modified, allowedModifiers, disallowedModifiers, errorTemplate) {
	    const enforceOrder = (pos, modifier, before, after) => {
	      if (modifier === before && modified[after]) {
	        this.raise(pos, TSErrors.InvalidModifiersOrder, before, after);
	      }
	    };

	    const incompatible = (pos, modifier, mod1, mod2) => {
	      if (modified[mod1] && modifier === mod2 || modified[mod2] && modifier === mod1) {
	        this.raise(pos, TSErrors.IncompatibleModifiers, mod1, mod2);
	      }
	    };

	    for (;;) {
	      const startPos = this.state.start;
	      const modifier = this.tsParseModifier(allowedModifiers.concat(disallowedModifiers != null ? disallowedModifiers : []));
	      if (!modifier) break;

	      if (tsIsAccessModifier(modifier)) {
	        if (modified.accessibility) {
	          this.raise(startPos, TSErrors.DuplicateAccessibilityModifier);
	        } else {
	          enforceOrder(startPos, modifier, modifier, "override");
	          enforceOrder(startPos, modifier, modifier, "static");
	          enforceOrder(startPos, modifier, modifier, "readonly");
	          modified.accessibility = modifier;
	        }
	      } else {
	        if (Object.hasOwnProperty.call(modified, modifier)) {
	          this.raise(startPos, TSErrors.DuplicateModifier, modifier);
	        } else {
	          enforceOrder(startPos, modifier, "static", "readonly");
	          enforceOrder(startPos, modifier, "static", "override");
	          enforceOrder(startPos, modifier, "override", "readonly");
	          enforceOrder(startPos, modifier, "abstract", "override");
	          incompatible(startPos, modifier, "declare", "override");
	          incompatible(startPos, modifier, "static", "abstract");
	        }

	        modified[modifier] = true;
	      }

	      if (disallowedModifiers != null && disallowedModifiers.includes(modifier)) {
	        this.raise(startPos, errorTemplate, modifier);
	      }
	    }
	  }

	  tsIsListTerminator(kind) {
	    switch (kind) {
	      case "EnumMembers":
	      case "TypeMembers":
	        return this.match(types$1.braceR);

	      case "HeritageClauseElement":
	        return this.match(types$1.braceL);

	      case "TupleElementTypes":
	        return this.match(types$1.bracketR);

	      case "TypeParametersOrArguments":
	        return this.isRelational(">");
	    }

	    throw new Error("Unreachable");
	  }

	  tsParseList(kind, parseElement) {
	    const result = [];

	    while (!this.tsIsListTerminator(kind)) {
	      result.push(parseElement());
	    }

	    return result;
	  }

	  tsParseDelimitedList(kind, parseElement) {
	    return nonNull(this.tsParseDelimitedListWorker(kind, parseElement, true));
	  }

	  tsParseDelimitedListWorker(kind, parseElement, expectSuccess) {
	    const result = [];

	    for (;;) {
	      if (this.tsIsListTerminator(kind)) {
	        break;
	      }

	      const element = parseElement();

	      if (element == null) {
	        return undefined;
	      }

	      result.push(element);

	      if (this.eat(types$1.comma)) {
	        continue;
	      }

	      if (this.tsIsListTerminator(kind)) {
	        break;
	      }

	      if (expectSuccess) {
	        this.expect(types$1.comma);
	      }

	      return undefined;
	    }

	    return result;
	  }

	  tsParseBracketedList(kind, parseElement, bracket, skipFirstToken) {
	    if (!skipFirstToken) {
	      if (bracket) {
	        this.expect(types$1.bracketL);
	      } else {
	        this.expectRelational("<");
	      }
	    }

	    const result = this.tsParseDelimitedList(kind, parseElement);

	    if (bracket) {
	      this.expect(types$1.bracketR);
	    } else {
	      this.expectRelational(">");
	    }

	    return result;
	  }

	  tsParseImportType() {
	    const node = this.startNode();
	    this.expect(types$1._import);
	    this.expect(types$1.parenL);

	    if (!this.match(types$1.string)) {
	      this.raise(this.state.start, TSErrors.UnsupportedImportTypeArgument);
	    }

	    node.argument = this.parseExprAtom();
	    this.expect(types$1.parenR);

	    if (this.eat(types$1.dot)) {
	      node.qualifier = this.tsParseEntityName(true);
	    }

	    if (this.isRelational("<")) {
	      node.typeParameters = this.tsParseTypeArguments();
	    }

	    return this.finishNode(node, "TSImportType");
	  }

	  tsParseEntityName(allowReservedWords) {
	    let entity = this.parseIdentifier();

	    while (this.eat(types$1.dot)) {
	      const node = this.startNodeAtNode(entity);
	      node.left = entity;
	      node.right = this.parseIdentifier(allowReservedWords);
	      entity = this.finishNode(node, "TSQualifiedName");
	    }

	    return entity;
	  }

	  tsParseTypeReference() {
	    const node = this.startNode();
	    node.typeName = this.tsParseEntityName(false);

	    if (!this.hasPrecedingLineBreak() && this.isRelational("<")) {
	      node.typeParameters = this.tsParseTypeArguments();
	    }

	    return this.finishNode(node, "TSTypeReference");
	  }

	  tsParseThisTypePredicate(lhs) {
	    this.next();
	    const node = this.startNodeAtNode(lhs);
	    node.parameterName = lhs;
	    node.typeAnnotation = this.tsParseTypeAnnotation(false);
	    node.asserts = false;
	    return this.finishNode(node, "TSTypePredicate");
	  }

	  tsParseThisTypeNode() {
	    const node = this.startNode();
	    this.next();
	    return this.finishNode(node, "TSThisType");
	  }

	  tsParseTypeQuery() {
	    const node = this.startNode();
	    this.expect(types$1._typeof);

	    if (this.match(types$1._import)) {
	      node.exprName = this.tsParseImportType();
	    } else {
	      node.exprName = this.tsParseEntityName(true);
	    }

	    return this.finishNode(node, "TSTypeQuery");
	  }

	  tsParseTypeParameter() {
	    const node = this.startNode();
	    node.name = this.parseIdentifierName(node.start);
	    node.constraint = this.tsEatThenParseType(types$1._extends);
	    node.default = this.tsEatThenParseType(types$1.eq);
	    return this.finishNode(node, "TSTypeParameter");
	  }

	  tsTryParseTypeParameters() {
	    if (this.isRelational("<")) {
	      return this.tsParseTypeParameters();
	    }
	  }

	  tsParseTypeParameters() {
	    const node = this.startNode();

	    if (this.isRelational("<") || this.match(types$1.jsxTagStart)) {
	      this.next();
	    } else {
	      this.unexpected();
	    }

	    node.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this), false, true);

	    if (node.params.length === 0) {
	      this.raise(node.start, TSErrors.EmptyTypeParameters);
	    }

	    return this.finishNode(node, "TSTypeParameterDeclaration");
	  }

	  tsTryNextParseConstantContext() {
	    if (this.lookahead().type === types$1._const) {
	      this.next();
	      return this.tsParseTypeReference();
	    }

	    return null;
	  }

	  tsFillSignature(returnToken, signature) {
	    const returnTokenRequired = returnToken === types$1.arrow;
	    signature.typeParameters = this.tsTryParseTypeParameters();
	    this.expect(types$1.parenL);
	    signature.parameters = this.tsParseBindingListForSignature();

	    if (returnTokenRequired) {
	      signature.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(returnToken);
	    } else if (this.match(returnToken)) {
	      signature.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(returnToken);
	    }
	  }

	  tsParseBindingListForSignature() {
	    return this.parseBindingList(types$1.parenR, 41).map(pattern => {
	      if (pattern.type !== "Identifier" && pattern.type !== "RestElement" && pattern.type !== "ObjectPattern" && pattern.type !== "ArrayPattern") {
	        this.raise(pattern.start, TSErrors.UnsupportedSignatureParameterKind, pattern.type);
	      }

	      return pattern;
	    });
	  }

	  tsParseTypeMemberSemicolon() {
	    if (!this.eat(types$1.comma) && !this.isLineTerminator()) {
	      this.expect(types$1.semi);
	    }
	  }

	  tsParseSignatureMember(kind, node) {
	    this.tsFillSignature(types$1.colon, node);
	    this.tsParseTypeMemberSemicolon();
	    return this.finishNode(node, kind);
	  }

	  tsIsUnambiguouslyIndexSignature() {
	    this.next();
	    return this.eat(types$1.name) && this.match(types$1.colon);
	  }

	  tsTryParseIndexSignature(node) {
	    if (!(this.match(types$1.bracketL) && this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this)))) {
	      return undefined;
	    }

	    this.expect(types$1.bracketL);
	    const id = this.parseIdentifier();
	    id.typeAnnotation = this.tsParseTypeAnnotation();
	    this.resetEndLocation(id);
	    this.expect(types$1.bracketR);
	    node.parameters = [id];
	    const type = this.tsTryParseTypeAnnotation();
	    if (type) node.typeAnnotation = type;
	    this.tsParseTypeMemberSemicolon();
	    return this.finishNode(node, "TSIndexSignature");
	  }

	  tsParsePropertyOrMethodSignature(node, readonly) {
	    if (this.eat(types$1.question)) node.optional = true;
	    const nodeAny = node;

	    if (this.match(types$1.parenL) || this.isRelational("<")) {
	      if (readonly) {
	        this.raise(node.start, TSErrors.ReadonlyForMethodSignature);
	      }

	      const method = nodeAny;

	      if (method.kind && this.isRelational("<")) {
	        this.raise(this.state.pos, TSErrors.AccesorCannotHaveTypeParameters);
	      }

	      this.tsFillSignature(types$1.colon, method);
	      this.tsParseTypeMemberSemicolon();

	      if (method.kind === "get") {
	        if (method.parameters.length > 0) {
	          this.raise(this.state.pos, ErrorMessages.BadGetterArity);

	          if (this.isThisParam(method.parameters[0])) {
	            this.raise(this.state.pos, TSErrors.AccesorCannotDeclareThisParameter);
	          }
	        }
	      } else if (method.kind === "set") {
	        if (method.parameters.length !== 1) {
	          this.raise(this.state.pos, ErrorMessages.BadSetterArity);
	        } else {
	          const firstParameter = method.parameters[0];

	          if (this.isThisParam(firstParameter)) {
	            this.raise(this.state.pos, TSErrors.AccesorCannotDeclareThisParameter);
	          }

	          if (firstParameter.type === "Identifier" && firstParameter.optional) {
	            this.raise(this.state.pos, TSErrors.SetAccesorCannotHaveOptionalParameter);
	          }

	          if (firstParameter.type === "RestElement") {
	            this.raise(this.state.pos, TSErrors.SetAccesorCannotHaveRestParameter);
	          }
	        }

	        if (method.typeAnnotation) {
	          this.raise(method.typeAnnotation.start, TSErrors.SetAccesorCannotHaveReturnType);
	        }
	      } else {
	        method.kind = "method";
	      }

	      return this.finishNode(method, "TSMethodSignature");
	    } else {
	      const property = nodeAny;
	      if (readonly) property.readonly = true;
	      const type = this.tsTryParseTypeAnnotation();
	      if (type) property.typeAnnotation = type;
	      this.tsParseTypeMemberSemicolon();
	      return this.finishNode(property, "TSPropertySignature");
	    }
	  }

	  tsParseTypeMember() {
	    const node = this.startNode();

	    if (this.match(types$1.parenL) || this.isRelational("<")) {
	      return this.tsParseSignatureMember("TSCallSignatureDeclaration", node);
	    }

	    if (this.match(types$1._new)) {
	      const id = this.startNode();
	      this.next();

	      if (this.match(types$1.parenL) || this.isRelational("<")) {
	        return this.tsParseSignatureMember("TSConstructSignatureDeclaration", node);
	      } else {
	        node.key = this.createIdentifier(id, "new");
	        return this.tsParsePropertyOrMethodSignature(node, false);
	      }
	    }

	    this.tsParseModifiers(node, ["readonly"], ["declare", "abstract", "private", "protected", "public", "static", "override"], TSErrors.InvalidModifierOnTypeMember);
	    const idx = this.tsTryParseIndexSignature(node);

	    if (idx) {
	      return idx;
	    }

	    this.parsePropertyName(node, false);

	    if (!node.computed && node.key.type === "Identifier" && (node.key.name === "get" || node.key.name === "set") && this.tsTokenCanFollowModifier()) {
	      node.kind = node.key.name;
	      this.parsePropertyName(node, false);
	    }

	    return this.tsParsePropertyOrMethodSignature(node, !!node.readonly);
	  }

	  tsParseTypeLiteral() {
	    const node = this.startNode();
	    node.members = this.tsParseObjectTypeMembers();
	    return this.finishNode(node, "TSTypeLiteral");
	  }

	  tsParseObjectTypeMembers() {
	    this.expect(types$1.braceL);
	    const members = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
	    this.expect(types$1.braceR);
	    return members;
	  }

	  tsIsStartOfMappedType() {
	    this.next();

	    if (this.eat(types$1.plusMin)) {
	      return this.isContextual("readonly");
	    }

	    if (this.isContextual("readonly")) {
	      this.next();
	    }

	    if (!this.match(types$1.bracketL)) {
	      return false;
	    }

	    this.next();

	    if (!this.tsIsIdentifier()) {
	      return false;
	    }

	    this.next();
	    return this.match(types$1._in);
	  }

	  tsParseMappedTypeParameter() {
	    const node = this.startNode();
	    node.name = this.parseIdentifierName(node.start);
	    node.constraint = this.tsExpectThenParseType(types$1._in);
	    return this.finishNode(node, "TSTypeParameter");
	  }

	  tsParseMappedType() {
	    const node = this.startNode();
	    this.expect(types$1.braceL);

	    if (this.match(types$1.plusMin)) {
	      node.readonly = this.state.value;
	      this.next();
	      this.expectContextual("readonly");
	    } else if (this.eatContextual("readonly")) {
	      node.readonly = true;
	    }

	    this.expect(types$1.bracketL);
	    node.typeParameter = this.tsParseMappedTypeParameter();
	    node.nameType = this.eatContextual("as") ? this.tsParseType() : null;
	    this.expect(types$1.bracketR);

	    if (this.match(types$1.plusMin)) {
	      node.optional = this.state.value;
	      this.next();
	      this.expect(types$1.question);
	    } else if (this.eat(types$1.question)) {
	      node.optional = true;
	    }

	    node.typeAnnotation = this.tsTryParseType();
	    this.semicolon();
	    this.expect(types$1.braceR);
	    return this.finishNode(node, "TSMappedType");
	  }

	  tsParseTupleType() {
	    const node = this.startNode();
	    node.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), true, false);
	    let seenOptionalElement = false;
	    let labeledElements = null;
	    node.elementTypes.forEach(elementNode => {
	      var _labeledElements;

	      let {
	        type
	      } = elementNode;

	      if (seenOptionalElement && type !== "TSRestType" && type !== "TSOptionalType" && !(type === "TSNamedTupleMember" && elementNode.optional)) {
	        this.raise(elementNode.start, TSErrors.OptionalTypeBeforeRequired);
	      }

	      seenOptionalElement = seenOptionalElement || type === "TSNamedTupleMember" && elementNode.optional || type === "TSOptionalType";

	      if (type === "TSRestType") {
	        elementNode = elementNode.typeAnnotation;
	        type = elementNode.type;
	      }

	      const isLabeled = type === "TSNamedTupleMember";
	      labeledElements = (_labeledElements = labeledElements) != null ? _labeledElements : isLabeled;

	      if (labeledElements !== isLabeled) {
	        this.raise(elementNode.start, TSErrors.MixedLabeledAndUnlabeledElements);
	      }
	    });
	    return this.finishNode(node, "TSTupleType");
	  }

	  tsParseTupleElementType() {
	    const {
	      start: startPos,
	      startLoc
	    } = this.state;
	    const rest = this.eat(types$1.ellipsis);
	    let type = this.tsParseType();
	    const optional = this.eat(types$1.question);
	    const labeled = this.eat(types$1.colon);

	    if (labeled) {
	      const labeledNode = this.startNodeAtNode(type);
	      labeledNode.optional = optional;

	      if (type.type === "TSTypeReference" && !type.typeParameters && type.typeName.type === "Identifier") {
	        labeledNode.label = type.typeName;
	      } else {
	        this.raise(type.start, TSErrors.InvalidTupleMemberLabel);
	        labeledNode.label = type;
	      }

	      labeledNode.elementType = this.tsParseType();
	      type = this.finishNode(labeledNode, "TSNamedTupleMember");
	    } else if (optional) {
	      const optionalTypeNode = this.startNodeAtNode(type);
	      optionalTypeNode.typeAnnotation = type;
	      type = this.finishNode(optionalTypeNode, "TSOptionalType");
	    }

	    if (rest) {
	      const restNode = this.startNodeAt(startPos, startLoc);
	      restNode.typeAnnotation = type;
	      type = this.finishNode(restNode, "TSRestType");
	    }

	    return type;
	  }

	  tsParseParenthesizedType() {
	    const node = this.startNode();
	    this.expect(types$1.parenL);
	    node.typeAnnotation = this.tsParseType();
	    this.expect(types$1.parenR);
	    return this.finishNode(node, "TSParenthesizedType");
	  }

	  tsParseFunctionOrConstructorType(type, abstract) {
	    const node = this.startNode();

	    if (type === "TSConstructorType") {
	      node.abstract = !!abstract;
	      if (abstract) this.next();
	      this.next();
	    }

	    this.tsFillSignature(types$1.arrow, node);
	    return this.finishNode(node, type);
	  }

	  tsParseLiteralTypeNode() {
	    const node = this.startNode();

	    node.literal = (() => {
	      switch (this.state.type) {
	        case types$1.num:
	        case types$1.bigint:
	        case types$1.string:
	        case types$1._true:
	        case types$1._false:
	          return this.parseExprAtom();

	        default:
	          throw this.unexpected();
	      }
	    })();

	    return this.finishNode(node, "TSLiteralType");
	  }

	  tsParseTemplateLiteralType() {
	    const node = this.startNode();
	    node.literal = this.parseTemplate(false);
	    return this.finishNode(node, "TSLiteralType");
	  }

	  parseTemplateSubstitution() {
	    if (this.state.inType) return this.tsParseType();
	    return super.parseTemplateSubstitution();
	  }

	  tsParseThisTypeOrThisTypePredicate() {
	    const thisKeyword = this.tsParseThisTypeNode();

	    if (this.isContextual("is") && !this.hasPrecedingLineBreak()) {
	      return this.tsParseThisTypePredicate(thisKeyword);
	    } else {
	      return thisKeyword;
	    }
	  }

	  tsParseNonArrayType() {
	    switch (this.state.type) {
	      case types$1.name:
	      case types$1._void:
	      case types$1._null:
	        {
	          const type = this.match(types$1._void) ? "TSVoidKeyword" : this.match(types$1._null) ? "TSNullKeyword" : keywordTypeFromName(this.state.value);

	          if (type !== undefined && this.lookaheadCharCode() !== 46) {
	            const node = this.startNode();
	            this.next();
	            return this.finishNode(node, type);
	          }

	          return this.tsParseTypeReference();
	        }

	      case types$1.string:
	      case types$1.num:
	      case types$1.bigint:
	      case types$1._true:
	      case types$1._false:
	        return this.tsParseLiteralTypeNode();

	      case types$1.plusMin:
	        if (this.state.value === "-") {
	          const node = this.startNode();
	          const nextToken = this.lookahead();

	          if (nextToken.type !== types$1.num && nextToken.type !== types$1.bigint) {
	            throw this.unexpected();
	          }

	          node.literal = this.parseMaybeUnary();
	          return this.finishNode(node, "TSLiteralType");
	        }

	        break;

	      case types$1._this:
	        return this.tsParseThisTypeOrThisTypePredicate();

	      case types$1._typeof:
	        return this.tsParseTypeQuery();

	      case types$1._import:
	        return this.tsParseImportType();

	      case types$1.braceL:
	        return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();

	      case types$1.bracketL:
	        return this.tsParseTupleType();

	      case types$1.parenL:
	        return this.tsParseParenthesizedType();

	      case types$1.backQuote:
	        return this.tsParseTemplateLiteralType();
	    }

	    throw this.unexpected();
	  }

	  tsParseArrayTypeOrHigher() {
	    let type = this.tsParseNonArrayType();

	    while (!this.hasPrecedingLineBreak() && this.eat(types$1.bracketL)) {
	      if (this.match(types$1.bracketR)) {
	        const node = this.startNodeAtNode(type);
	        node.elementType = type;
	        this.expect(types$1.bracketR);
	        type = this.finishNode(node, "TSArrayType");
	      } else {
	        const node = this.startNodeAtNode(type);
	        node.objectType = type;
	        node.indexType = this.tsParseType();
	        this.expect(types$1.bracketR);
	        type = this.finishNode(node, "TSIndexedAccessType");
	      }
	    }

	    return type;
	  }

	  tsParseTypeOperator(operator) {
	    const node = this.startNode();
	    this.expectContextual(operator);
	    node.operator = operator;
	    node.typeAnnotation = this.tsParseTypeOperatorOrHigher();

	    if (operator === "readonly") {
	      this.tsCheckTypeAnnotationForReadOnly(node);
	    }

	    return this.finishNode(node, "TSTypeOperator");
	  }

	  tsCheckTypeAnnotationForReadOnly(node) {
	    switch (node.typeAnnotation.type) {
	      case "TSTupleType":
	      case "TSArrayType":
	        return;

	      default:
	        this.raise(node.start, TSErrors.UnexpectedReadonly);
	    }
	  }

	  tsParseInferType() {
	    const node = this.startNode();
	    this.expectContextual("infer");
	    const typeParameter = this.startNode();
	    typeParameter.name = this.parseIdentifierName(typeParameter.start);
	    node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter");
	    return this.finishNode(node, "TSInferType");
	  }

	  tsParseTypeOperatorOrHigher() {
	    const operator = ["keyof", "unique", "readonly"].find(kw => this.isContextual(kw));
	    return operator ? this.tsParseTypeOperator(operator) : this.isContextual("infer") ? this.tsParseInferType() : this.tsParseArrayTypeOrHigher();
	  }

	  tsParseUnionOrIntersectionType(kind, parseConstituentType, operator) {
	    const node = this.startNode();
	    const hasLeadingOperator = this.eat(operator);
	    const types = [];

	    do {
	      types.push(parseConstituentType());
	    } while (this.eat(operator));

	    if (types.length === 1 && !hasLeadingOperator) {
	      return types[0];
	    }

	    node.types = types;
	    return this.finishNode(node, kind);
	  }

	  tsParseIntersectionTypeOrHigher() {
	    return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), types$1.bitwiseAND);
	  }

	  tsParseUnionTypeOrHigher() {
	    return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), types$1.bitwiseOR);
	  }

	  tsIsStartOfFunctionType() {
	    if (this.isRelational("<")) {
	      return true;
	    }

	    return this.match(types$1.parenL) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
	  }

	  tsSkipParameterStart() {
	    if (this.match(types$1.name) || this.match(types$1._this)) {
	      this.next();
	      return true;
	    }

	    if (this.match(types$1.braceL)) {
	      let braceStackCounter = 1;
	      this.next();

	      while (braceStackCounter > 0) {
	        if (this.match(types$1.braceL)) {
	          ++braceStackCounter;
	        } else if (this.match(types$1.braceR)) {
	          --braceStackCounter;
	        }

	        this.next();
	      }

	      return true;
	    }

	    if (this.match(types$1.bracketL)) {
	      let braceStackCounter = 1;
	      this.next();

	      while (braceStackCounter > 0) {
	        if (this.match(types$1.bracketL)) {
	          ++braceStackCounter;
	        } else if (this.match(types$1.bracketR)) {
	          --braceStackCounter;
	        }

	        this.next();
	      }

	      return true;
	    }

	    return false;
	  }

	  tsIsUnambiguouslyStartOfFunctionType() {
	    this.next();

	    if (this.match(types$1.parenR) || this.match(types$1.ellipsis)) {
	      return true;
	    }

	    if (this.tsSkipParameterStart()) {
	      if (this.match(types$1.colon) || this.match(types$1.comma) || this.match(types$1.question) || this.match(types$1.eq)) {
	        return true;
	      }

	      if (this.match(types$1.parenR)) {
	        this.next();

	        if (this.match(types$1.arrow)) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  tsParseTypeOrTypePredicateAnnotation(returnToken) {
	    return this.tsInType(() => {
	      const t = this.startNode();
	      this.expect(returnToken);
	      const node = this.startNode();
	      const asserts = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));

	      if (asserts && this.match(types$1._this)) {
	        let thisTypePredicate = this.tsParseThisTypeOrThisTypePredicate();

	        if (thisTypePredicate.type === "TSThisType") {
	          node.parameterName = thisTypePredicate;
	          node.asserts = true;
	          node.typeAnnotation = null;
	          thisTypePredicate = this.finishNode(node, "TSTypePredicate");
	        } else {
	          this.resetStartLocationFromNode(thisTypePredicate, node);
	          thisTypePredicate.asserts = true;
	        }

	        t.typeAnnotation = thisTypePredicate;
	        return this.finishNode(t, "TSTypeAnnotation");
	      }

	      const typePredicateVariable = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));

	      if (!typePredicateVariable) {
	        if (!asserts) {
	          return this.tsParseTypeAnnotation(false, t);
	        }

	        node.parameterName = this.parseIdentifier();
	        node.asserts = asserts;
	        node.typeAnnotation = null;
	        t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
	        return this.finishNode(t, "TSTypeAnnotation");
	      }

	      const type = this.tsParseTypeAnnotation(false);
	      node.parameterName = typePredicateVariable;
	      node.typeAnnotation = type;
	      node.asserts = asserts;
	      t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
	      return this.finishNode(t, "TSTypeAnnotation");
	    });
	  }

	  tsTryParseTypeOrTypePredicateAnnotation() {
	    return this.match(types$1.colon) ? this.tsParseTypeOrTypePredicateAnnotation(types$1.colon) : undefined;
	  }

	  tsTryParseTypeAnnotation() {
	    return this.match(types$1.colon) ? this.tsParseTypeAnnotation() : undefined;
	  }

	  tsTryParseType() {
	    return this.tsEatThenParseType(types$1.colon);
	  }

	  tsParseTypePredicatePrefix() {
	    const id = this.parseIdentifier();

	    if (this.isContextual("is") && !this.hasPrecedingLineBreak()) {
	      this.next();
	      return id;
	    }
	  }

	  tsParseTypePredicateAsserts() {
	    if (!this.match(types$1.name) || this.state.value !== "asserts" || this.hasPrecedingLineBreak()) {
	      return false;
	    }

	    const containsEsc = this.state.containsEsc;
	    this.next();

	    if (!this.match(types$1.name) && !this.match(types$1._this)) {
	      return false;
	    }

	    if (containsEsc) {
	      this.raise(this.state.lastTokStart, ErrorMessages.InvalidEscapedReservedWord, "asserts");
	    }

	    return true;
	  }

	  tsParseTypeAnnotation(eatColon = true, t = this.startNode()) {
	    this.tsInType(() => {
	      if (eatColon) this.expect(types$1.colon);
	      t.typeAnnotation = this.tsParseType();
	    });
	    return this.finishNode(t, "TSTypeAnnotation");
	  }

	  tsParseType() {
	    assert(this.state.inType);
	    const type = this.tsParseNonConditionalType();

	    if (this.hasPrecedingLineBreak() || !this.eat(types$1._extends)) {
	      return type;
	    }

	    const node = this.startNodeAtNode(type);
	    node.checkType = type;
	    node.extendsType = this.tsParseNonConditionalType();
	    this.expect(types$1.question);
	    node.trueType = this.tsParseType();
	    this.expect(types$1.colon);
	    node.falseType = this.tsParseType();
	    return this.finishNode(node, "TSConditionalType");
	  }

	  isAbstractConstructorSignature() {
	    return this.isContextual("abstract") && this.lookahead().type === types$1._new;
	  }

	  tsParseNonConditionalType() {
	    if (this.tsIsStartOfFunctionType()) {
	      return this.tsParseFunctionOrConstructorType("TSFunctionType");
	    }

	    if (this.match(types$1._new)) {
	      return this.tsParseFunctionOrConstructorType("TSConstructorType");
	    } else if (this.isAbstractConstructorSignature()) {
	      return this.tsParseFunctionOrConstructorType("TSConstructorType", true);
	    }

	    return this.tsParseUnionTypeOrHigher();
	  }

	  tsParseTypeAssertion() {
	    const node = this.startNode();

	    const _const = this.tsTryNextParseConstantContext();

	    node.typeAnnotation = _const || this.tsNextThenParseType();
	    this.expectRelational(">");
	    node.expression = this.parseMaybeUnary();
	    return this.finishNode(node, "TSTypeAssertion");
	  }

	  tsParseHeritageClause(descriptor) {
	    const originalStart = this.state.start;
	    const delimitedList = this.tsParseDelimitedList("HeritageClauseElement", this.tsParseExpressionWithTypeArguments.bind(this));

	    if (!delimitedList.length) {
	      this.raise(originalStart, TSErrors.EmptyHeritageClauseType, descriptor);
	    }

	    return delimitedList;
	  }

	  tsParseExpressionWithTypeArguments() {
	    const node = this.startNode();
	    node.expression = this.tsParseEntityName(false);

	    if (this.isRelational("<")) {
	      node.typeParameters = this.tsParseTypeArguments();
	    }

	    return this.finishNode(node, "TSExpressionWithTypeArguments");
	  }

	  tsParseInterfaceDeclaration(node) {
	    node.id = this.parseIdentifier();
	    this.checkLVal(node.id, "typescript interface declaration", BIND_TS_INTERFACE);
	    node.typeParameters = this.tsTryParseTypeParameters();

	    if (this.eat(types$1._extends)) {
	      node.extends = this.tsParseHeritageClause("extends");
	    }

	    const body = this.startNode();
	    body.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this));
	    node.body = this.finishNode(body, "TSInterfaceBody");
	    return this.finishNode(node, "TSInterfaceDeclaration");
	  }

	  tsParseTypeAliasDeclaration(node) {
	    node.id = this.parseIdentifier();
	    this.checkLVal(node.id, "typescript type alias", BIND_TS_TYPE);
	    node.typeParameters = this.tsTryParseTypeParameters();
	    node.typeAnnotation = this.tsInType(() => {
	      this.expect(types$1.eq);

	      if (this.isContextual("intrinsic") && this.lookahead().type !== types$1.dot) {
	        const node = this.startNode();
	        this.next();
	        return this.finishNode(node, "TSIntrinsicKeyword");
	      }

	      return this.tsParseType();
	    });
	    this.semicolon();
	    return this.finishNode(node, "TSTypeAliasDeclaration");
	  }

	  tsInNoContext(cb) {
	    const oldContext = this.state.context;
	    this.state.context = [oldContext[0]];

	    try {
	      return cb();
	    } finally {
	      this.state.context = oldContext;
	    }
	  }

	  tsInType(cb) {
	    const oldInType = this.state.inType;
	    this.state.inType = true;

	    try {
	      return cb();
	    } finally {
	      this.state.inType = oldInType;
	    }
	  }

	  tsEatThenParseType(token) {
	    return !this.match(token) ? undefined : this.tsNextThenParseType();
	  }

	  tsExpectThenParseType(token) {
	    return this.tsDoThenParseType(() => this.expect(token));
	  }

	  tsNextThenParseType() {
	    return this.tsDoThenParseType(() => this.next());
	  }

	  tsDoThenParseType(cb) {
	    return this.tsInType(() => {
	      cb();
	      return this.tsParseType();
	    });
	  }

	  tsParseEnumMember() {
	    const node = this.startNode();
	    node.id = this.match(types$1.string) ? this.parseExprAtom() : this.parseIdentifier(true);

	    if (this.eat(types$1.eq)) {
	      node.initializer = this.parseMaybeAssignAllowIn();
	    }

	    return this.finishNode(node, "TSEnumMember");
	  }

	  tsParseEnumDeclaration(node, isConst) {
	    if (isConst) node.const = true;
	    node.id = this.parseIdentifier();
	    this.checkLVal(node.id, "typescript enum declaration", isConst ? BIND_TS_CONST_ENUM : BIND_TS_ENUM);
	    this.expect(types$1.braceL);
	    node.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this));
	    this.expect(types$1.braceR);
	    return this.finishNode(node, "TSEnumDeclaration");
	  }

	  tsParseModuleBlock() {
	    const node = this.startNode();
	    this.scope.enter(SCOPE_OTHER);
	    this.expect(types$1.braceL);
	    this.parseBlockOrModuleBlockBody(node.body = [], undefined, true, types$1.braceR);
	    this.scope.exit();
	    return this.finishNode(node, "TSModuleBlock");
	  }

	  tsParseModuleOrNamespaceDeclaration(node, nested = false) {
	    node.id = this.parseIdentifier();

	    if (!nested) {
	      this.checkLVal(node.id, "module or namespace declaration", BIND_TS_NAMESPACE);
	    }

	    if (this.eat(types$1.dot)) {
	      const inner = this.startNode();
	      this.tsParseModuleOrNamespaceDeclaration(inner, true);
	      node.body = inner;
	    } else {
	      this.scope.enter(SCOPE_TS_MODULE);
	      this.prodParam.enter(PARAM);
	      node.body = this.tsParseModuleBlock();
	      this.prodParam.exit();
	      this.scope.exit();
	    }

	    return this.finishNode(node, "TSModuleDeclaration");
	  }

	  tsParseAmbientExternalModuleDeclaration(node) {
	    if (this.isContextual("global")) {
	      node.global = true;
	      node.id = this.parseIdentifier();
	    } else if (this.match(types$1.string)) {
	      node.id = this.parseExprAtom();
	    } else {
	      this.unexpected();
	    }

	    if (this.match(types$1.braceL)) {
	      this.scope.enter(SCOPE_TS_MODULE);
	      this.prodParam.enter(PARAM);
	      node.body = this.tsParseModuleBlock();
	      this.prodParam.exit();
	      this.scope.exit();
	    } else {
	      this.semicolon();
	    }

	    return this.finishNode(node, "TSModuleDeclaration");
	  }

	  tsParseImportEqualsDeclaration(node, isExport) {
	    node.isExport = isExport || false;
	    node.id = this.parseIdentifier();
	    this.checkLVal(node.id, "import equals declaration", BIND_LEXICAL);
	    this.expect(types$1.eq);
	    const moduleReference = this.tsParseModuleReference();

	    if (node.importKind === "type" && moduleReference.type !== "TSExternalModuleReference") {
	      this.raise(moduleReference.start, TSErrors.ImportAliasHasImportType);
	    }

	    node.moduleReference = moduleReference;
	    this.semicolon();
	    return this.finishNode(node, "TSImportEqualsDeclaration");
	  }

	  tsIsExternalModuleReference() {
	    return this.isContextual("require") && this.lookaheadCharCode() === 40;
	  }

	  tsParseModuleReference() {
	    return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(false);
	  }

	  tsParseExternalModuleReference() {
	    const node = this.startNode();
	    this.expectContextual("require");
	    this.expect(types$1.parenL);

	    if (!this.match(types$1.string)) {
	      throw this.unexpected();
	    }

	    node.expression = this.parseExprAtom();
	    this.expect(types$1.parenR);
	    return this.finishNode(node, "TSExternalModuleReference");
	  }

	  tsLookAhead(f) {
	    const state = this.state.clone();
	    const res = f();
	    this.state = state;
	    return res;
	  }

	  tsTryParseAndCatch(f) {
	    const result = this.tryParse(abort => f() || abort());
	    if (result.aborted || !result.node) return undefined;
	    if (result.error) this.state = result.failState;
	    return result.node;
	  }

	  tsTryParse(f) {
	    const state = this.state.clone();
	    const result = f();

	    if (result !== undefined && result !== false) {
	      return result;
	    } else {
	      this.state = state;
	      return undefined;
	    }
	  }

	  tsTryParseDeclare(nany) {
	    if (this.isLineTerminator()) {
	      return;
	    }

	    let starttype = this.state.type;
	    let kind;

	    if (this.isContextual("let")) {
	      starttype = types$1._var;
	      kind = "let";
	    }

	    return this.tsInAmbientContext(() => {
	      switch (starttype) {
	        case types$1._function:
	          nany.declare = true;
	          return this.parseFunctionStatement(nany, false, true);

	        case types$1._class:
	          nany.declare = true;
	          return this.parseClass(nany, true, false);

	        case types$1._const:
	          if (this.match(types$1._const) && this.isLookaheadContextual("enum")) {
	            this.expect(types$1._const);
	            this.expectContextual("enum");
	            return this.tsParseEnumDeclaration(nany, true);
	          }

	        case types$1._var:
	          kind = kind || this.state.value;
	          return this.parseVarStatement(nany, kind);

	        case types$1.name:
	          {
	            const value = this.state.value;

	            if (value === "global") {
	              return this.tsParseAmbientExternalModuleDeclaration(nany);
	            } else {
	              return this.tsParseDeclaration(nany, value, true);
	            }
	          }
	      }
	    });
	  }

	  tsTryParseExportDeclaration() {
	    return this.tsParseDeclaration(this.startNode(), this.state.value, true);
	  }

	  tsParseExpressionStatement(node, expr) {
	    switch (expr.name) {
	      case "declare":
	        {
	          const declaration = this.tsTryParseDeclare(node);

	          if (declaration) {
	            declaration.declare = true;
	            return declaration;
	          }

	          break;
	        }

	      case "global":
	        if (this.match(types$1.braceL)) {
	          this.scope.enter(SCOPE_TS_MODULE);
	          this.prodParam.enter(PARAM);
	          const mod = node;
	          mod.global = true;
	          mod.id = expr;
	          mod.body = this.tsParseModuleBlock();
	          this.scope.exit();
	          this.prodParam.exit();
	          return this.finishNode(mod, "TSModuleDeclaration");
	        }

	        break;

	      default:
	        return this.tsParseDeclaration(node, expr.name, false);
	    }
	  }

	  tsParseDeclaration(node, value, next) {
	    switch (value) {
	      case "abstract":
	        if (this.tsCheckLineTerminator(next) && (this.match(types$1._class) || this.match(types$1.name))) {
	          return this.tsParseAbstractDeclaration(node);
	        }

	        break;

	      case "enum":
	        if (next || this.match(types$1.name)) {
	          if (next) this.next();
	          return this.tsParseEnumDeclaration(node, false);
	        }

	        break;

	      case "interface":
	        if (this.tsCheckLineTerminator(next) && this.match(types$1.name)) {
	          return this.tsParseInterfaceDeclaration(node);
	        }

	        break;

	      case "module":
	        if (this.tsCheckLineTerminator(next)) {
	          if (this.match(types$1.string)) {
	            return this.tsParseAmbientExternalModuleDeclaration(node);
	          } else if (this.match(types$1.name)) {
	            return this.tsParseModuleOrNamespaceDeclaration(node);
	          }
	        }

	        break;

	      case "namespace":
	        if (this.tsCheckLineTerminator(next) && this.match(types$1.name)) {
	          return this.tsParseModuleOrNamespaceDeclaration(node);
	        }

	        break;

	      case "type":
	        if (this.tsCheckLineTerminator(next) && this.match(types$1.name)) {
	          return this.tsParseTypeAliasDeclaration(node);
	        }

	        break;
	    }
	  }

	  tsCheckLineTerminator(next) {
	    if (next) {
	      if (this.hasFollowingLineBreak()) return false;
	      this.next();
	      return true;
	    }

	    return !this.isLineTerminator();
	  }

	  tsTryParseGenericAsyncArrowFunction(startPos, startLoc) {
	    if (!this.isRelational("<")) {
	      return undefined;
	    }

	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    this.state.maybeInArrowParameters = true;
	    const res = this.tsTryParseAndCatch(() => {
	      const node = this.startNodeAt(startPos, startLoc);
	      node.typeParameters = this.tsParseTypeParameters();
	      super.parseFunctionParams(node);
	      node.returnType = this.tsTryParseTypeOrTypePredicateAnnotation();
	      this.expect(types$1.arrow);
	      return node;
	    });
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;

	    if (!res) {
	      return undefined;
	    }

	    return this.parseArrowExpression(res, null, true);
	  }

	  tsParseTypeArguments() {
	    const node = this.startNode();
	    node.params = this.tsInType(() => this.tsInNoContext(() => {
	      this.expectRelational("<");
	      return this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this));
	    }));

	    if (node.params.length === 0) {
	      this.raise(node.start, TSErrors.EmptyTypeArguments);
	    }

	    this.expectRelational(">");
	    return this.finishNode(node, "TSTypeParameterInstantiation");
	  }

	  tsIsDeclarationStart() {
	    if (this.match(types$1.name)) {
	      switch (this.state.value) {
	        case "abstract":
	        case "declare":
	        case "enum":
	        case "interface":
	        case "module":
	        case "namespace":
	        case "type":
	          return true;
	      }
	    }

	    return false;
	  }

	  isExportDefaultSpecifier() {
	    if (this.tsIsDeclarationStart()) return false;
	    return super.isExportDefaultSpecifier();
	  }

	  parseAssignableListItem(allowModifiers, decorators) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    let accessibility;
	    let readonly = false;
	    let override = false;

	    if (allowModifiers !== undefined) {
	      const modified = {};
	      this.tsParseModifiers(modified, ["public", "private", "protected", "override", "readonly"]);
	      accessibility = modified.accessibility;
	      override = modified.override;
	      readonly = modified.readonly;

	      if (allowModifiers === false && (accessibility || readonly || override)) {
	        this.raise(startPos, TSErrors.UnexpectedParameterModifier);
	      }
	    }

	    const left = this.parseMaybeDefault();
	    this.parseAssignableListItemTypes(left);
	    const elt = this.parseMaybeDefault(left.start, left.loc.start, left);

	    if (accessibility || readonly || override) {
	      const pp = this.startNodeAt(startPos, startLoc);

	      if (decorators.length) {
	        pp.decorators = decorators;
	      }

	      if (accessibility) pp.accessibility = accessibility;
	      if (readonly) pp.readonly = readonly;
	      if (override) pp.override = override;

	      if (elt.type !== "Identifier" && elt.type !== "AssignmentPattern") {
	        this.raise(pp.start, TSErrors.UnsupportedParameterPropertyKind);
	      }

	      pp.parameter = elt;
	      return this.finishNode(pp, "TSParameterProperty");
	    }

	    if (decorators.length) {
	      left.decorators = decorators;
	    }

	    return elt;
	  }

	  parseFunctionBodyAndFinish(node, type, isMethod = false) {
	    if (this.match(types$1.colon)) {
	      node.returnType = this.tsParseTypeOrTypePredicateAnnotation(types$1.colon);
	    }

	    const bodilessType = type === "FunctionDeclaration" ? "TSDeclareFunction" : type === "ClassMethod" ? "TSDeclareMethod" : undefined;

	    if (bodilessType && !this.match(types$1.braceL) && this.isLineTerminator()) {
	      this.finishNode(node, bodilessType);
	      return;
	    }

	    if (bodilessType === "TSDeclareFunction" && this.state.isAmbientContext) {
	      this.raise(node.start, TSErrors.DeclareFunctionHasImplementation);

	      if (node.declare) {
	        super.parseFunctionBodyAndFinish(node, bodilessType, isMethod);
	        return;
	      }
	    }

	    super.parseFunctionBodyAndFinish(node, type, isMethod);
	  }

	  registerFunctionStatementId(node) {
	    if (!node.body && node.id) {
	      this.checkLVal(node.id, "function name", BIND_TS_AMBIENT);
	    } else {
	      super.registerFunctionStatementId(...arguments);
	    }
	  }

	  tsCheckForInvalidTypeCasts(items) {
	    items.forEach(node => {
	      if ((node == null ? void 0 : node.type) === "TSTypeCastExpression") {
	        this.raise(node.typeAnnotation.start, TSErrors.UnexpectedTypeAnnotation);
	      }
	    });
	  }

	  toReferencedList(exprList, isInParens) {
	    this.tsCheckForInvalidTypeCasts(exprList);
	    return exprList;
	  }

	  parseArrayLike(...args) {
	    const node = super.parseArrayLike(...args);

	    if (node.type === "ArrayExpression") {
	      this.tsCheckForInvalidTypeCasts(node.elements);
	    }

	    return node;
	  }

	  parseSubscript(base, startPos, startLoc, noCalls, state) {
	    if (!this.hasPrecedingLineBreak() && this.match(types$1.bang)) {
	      this.state.exprAllowed = false;
	      this.next();
	      const nonNullExpression = this.startNodeAt(startPos, startLoc);
	      nonNullExpression.expression = base;
	      return this.finishNode(nonNullExpression, "TSNonNullExpression");
	    }

	    if (this.isRelational("<")) {
	      const result = this.tsTryParseAndCatch(() => {
	        if (!noCalls && this.atPossibleAsyncArrow(base)) {
	          const asyncArrowFn = this.tsTryParseGenericAsyncArrowFunction(startPos, startLoc);

	          if (asyncArrowFn) {
	            return asyncArrowFn;
	          }
	        }

	        const node = this.startNodeAt(startPos, startLoc);
	        node.callee = base;
	        const typeArguments = this.tsParseTypeArguments();

	        if (typeArguments) {
	          if (!noCalls && this.eat(types$1.parenL)) {
	            node.arguments = this.parseCallExpressionArguments(types$1.parenR, false);
	            this.tsCheckForInvalidTypeCasts(node.arguments);
	            node.typeParameters = typeArguments;

	            if (state.optionalChainMember) {
	              node.optional = false;
	            }

	            return this.finishCallExpression(node, state.optionalChainMember);
	          } else if (this.match(types$1.backQuote)) {
	            const result = this.parseTaggedTemplateExpression(base, startPos, startLoc, state);
	            result.typeParameters = typeArguments;
	            return result;
	          }
	        }

	        this.unexpected();
	      });
	      if (result) return result;
	    }

	    return super.parseSubscript(base, startPos, startLoc, noCalls, state);
	  }

	  parseNewArguments(node) {
	    if (this.isRelational("<")) {
	      const typeParameters = this.tsTryParseAndCatch(() => {
	        const args = this.tsParseTypeArguments();
	        if (!this.match(types$1.parenL)) this.unexpected();
	        return args;
	      });

	      if (typeParameters) {
	        node.typeParameters = typeParameters;
	      }
	    }

	    super.parseNewArguments(node);
	  }

	  parseExprOp(left, leftStartPos, leftStartLoc, minPrec) {
	    if (nonNull(types$1._in.binop) > minPrec && !this.hasPrecedingLineBreak() && this.isContextual("as")) {
	      const node = this.startNodeAt(leftStartPos, leftStartLoc);
	      node.expression = left;

	      const _const = this.tsTryNextParseConstantContext();

	      if (_const) {
	        node.typeAnnotation = _const;
	      } else {
	        node.typeAnnotation = this.tsNextThenParseType();
	      }

	      this.finishNode(node, "TSAsExpression");
	      this.reScan_lt_gt();
	      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec);
	    }

	    return super.parseExprOp(left, leftStartPos, leftStartLoc, minPrec);
	  }

	  checkReservedWord(word, startLoc, checkKeywords, isBinding) {}

	  checkDuplicateExports() {}

	  parseImport(node) {
	    node.importKind = "value";

	    if (this.match(types$1.name) || this.match(types$1.star) || this.match(types$1.braceL)) {
	      let ahead = this.lookahead();

	      if (this.isContextual("type") && ahead.type !== types$1.comma && !(ahead.type === types$1.name && ahead.value === "from") && ahead.type !== types$1.eq) {
	        node.importKind = "type";
	        this.next();
	        ahead = this.lookahead();
	      }

	      if (this.match(types$1.name) && ahead.type === types$1.eq) {
	        return this.tsParseImportEqualsDeclaration(node);
	      }
	    }

	    const importNode = super.parseImport(node);

	    if (importNode.importKind === "type" && importNode.specifiers.length > 1 && importNode.specifiers[0].type === "ImportDefaultSpecifier") {
	      this.raise(importNode.start, TSErrors.TypeImportCannotSpecifyDefaultAndNamed);
	    }

	    return importNode;
	  }

	  parseExport(node) {
	    if (this.match(types$1._import)) {
	      this.next();

	      if (this.isContextual("type") && this.lookaheadCharCode() !== 61) {
	        node.importKind = "type";
	        this.next();
	      } else {
	        node.importKind = "value";
	      }

	      return this.tsParseImportEqualsDeclaration(node, true);
	    } else if (this.eat(types$1.eq)) {
	      const assign = node;
	      assign.expression = this.parseExpression();
	      this.semicolon();
	      return this.finishNode(assign, "TSExportAssignment");
	    } else if (this.eatContextual("as")) {
	      const decl = node;
	      this.expectContextual("namespace");
	      decl.id = this.parseIdentifier();
	      this.semicolon();
	      return this.finishNode(decl, "TSNamespaceExportDeclaration");
	    } else {
	      if (this.isContextual("type") && this.lookahead().type === types$1.braceL) {
	        this.next();
	        node.exportKind = "type";
	      } else {
	        node.exportKind = "value";
	      }

	      return super.parseExport(node);
	    }
	  }

	  isAbstractClass() {
	    return this.isContextual("abstract") && this.lookahead().type === types$1._class;
	  }

	  parseExportDefaultExpression() {
	    if (this.isAbstractClass()) {
	      const cls = this.startNode();
	      this.next();
	      cls.abstract = true;
	      this.parseClass(cls, true, true);
	      return cls;
	    }

	    if (this.state.value === "interface") {
	      const result = this.tsParseDeclaration(this.startNode(), this.state.value, true);
	      if (result) return result;
	    }

	    return super.parseExportDefaultExpression();
	  }

	  parseStatementContent(context, topLevel) {
	    if (this.state.type === types$1._const) {
	      const ahead = this.lookahead();

	      if (ahead.type === types$1.name && ahead.value === "enum") {
	        const node = this.startNode();
	        this.expect(types$1._const);
	        this.expectContextual("enum");
	        return this.tsParseEnumDeclaration(node, true);
	      }
	    }

	    return super.parseStatementContent(context, topLevel);
	  }

	  parseAccessModifier() {
	    return this.tsParseModifier(["public", "protected", "private"]);
	  }

	  tsHasSomeModifiers(member, modifiers) {
	    return modifiers.some(modifier => {
	      if (tsIsAccessModifier(modifier)) {
	        return member.accessibility === modifier;
	      }

	      return !!member[modifier];
	    });
	  }

	  parseClassMember(classBody, member, state) {
	    const invalidModifersForStaticBlocks = ["declare", "private", "public", "protected", "override", "abstract", "readonly"];
	    this.tsParseModifiers(member, invalidModifersForStaticBlocks.concat(["static"]));

	    const callParseClassMemberWithIsStatic = () => {
	      const isStatic = !!member.static;

	      if (isStatic && this.eat(types$1.braceL)) {
	        if (this.tsHasSomeModifiers(member, invalidModifersForStaticBlocks)) {
	          this.raise(this.state.pos, TSErrors.StaticBlockCannotHaveModifier);
	        }

	        this.parseClassStaticBlock(classBody, member);
	      } else {
	        this.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
	      }
	    };

	    if (member.declare) {
	      this.tsInAmbientContext(callParseClassMemberWithIsStatic);
	    } else {
	      callParseClassMemberWithIsStatic();
	    }
	  }

	  parseClassMemberWithIsStatic(classBody, member, state, isStatic) {
	    const idx = this.tsTryParseIndexSignature(member);

	    if (idx) {
	      classBody.body.push(idx);

	      if (member.abstract) {
	        this.raise(member.start, TSErrors.IndexSignatureHasAbstract);
	      }

	      if (member.accessibility) {
	        this.raise(member.start, TSErrors.IndexSignatureHasAccessibility, member.accessibility);
	      }

	      if (member.declare) {
	        this.raise(member.start, TSErrors.IndexSignatureHasDeclare);
	      }

	      if (member.override) {
	        this.raise(member.start, TSErrors.IndexSignatureHasOverride);
	      }

	      return;
	    }

	    if (!this.state.inAbstractClass && member.abstract) {
	      this.raise(member.start, TSErrors.NonAbstractClassHasAbstractMethod);
	    }

	    if (member.override) {
	      if (!state.hadSuperClass) {
	        this.raise(member.start, TSErrors.OverrideNotInSubClass);
	      }
	    }

	    super.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
	  }

	  parsePostMemberNameModifiers(methodOrProp) {
	    const optional = this.eat(types$1.question);
	    if (optional) methodOrProp.optional = true;

	    if (methodOrProp.readonly && this.match(types$1.parenL)) {
	      this.raise(methodOrProp.start, TSErrors.ClassMethodHasReadonly);
	    }

	    if (methodOrProp.declare && this.match(types$1.parenL)) {
	      this.raise(methodOrProp.start, TSErrors.ClassMethodHasDeclare);
	    }
	  }

	  parseExpressionStatement(node, expr) {
	    const decl = expr.type === "Identifier" ? this.tsParseExpressionStatement(node, expr) : undefined;
	    return decl || super.parseExpressionStatement(node, expr);
	  }

	  shouldParseExportDeclaration() {
	    if (this.tsIsDeclarationStart()) return true;
	    return super.shouldParseExportDeclaration();
	  }

	  parseConditional(expr, startPos, startLoc, refExpressionErrors) {
	    if (!this.state.maybeInArrowParameters || !this.match(types$1.question)) {
	      return super.parseConditional(expr, startPos, startLoc, refExpressionErrors);
	    }

	    const result = this.tryParse(() => super.parseConditional(expr, startPos, startLoc));

	    if (!result.node) {
	      if (result.error) {
	        super.setOptionalParametersError(refExpressionErrors, result.error);
	      }

	      return expr;
	    }

	    if (result.error) this.state = result.failState;
	    return result.node;
	  }

	  parseParenItem(node, startPos, startLoc) {
	    node = super.parseParenItem(node, startPos, startLoc);

	    if (this.eat(types$1.question)) {
	      node.optional = true;
	      this.resetEndLocation(node);
	    }

	    if (this.match(types$1.colon)) {
	      const typeCastNode = this.startNodeAt(startPos, startLoc);
	      typeCastNode.expression = node;
	      typeCastNode.typeAnnotation = this.tsParseTypeAnnotation();
	      return this.finishNode(typeCastNode, "TSTypeCastExpression");
	    }

	    return node;
	  }

	  parseExportDeclaration(node) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const isDeclare = this.eatContextual("declare");

	    if (isDeclare && (this.isContextual("declare") || !this.shouldParseExportDeclaration())) {
	      throw this.raise(this.state.start, TSErrors.ExpectedAmbientAfterExportDeclare);
	    }

	    let declaration;

	    if (this.match(types$1.name)) {
	      declaration = this.tsTryParseExportDeclaration();
	    }

	    if (!declaration) {
	      declaration = super.parseExportDeclaration(node);
	    }

	    if (declaration && (declaration.type === "TSInterfaceDeclaration" || declaration.type === "TSTypeAliasDeclaration" || isDeclare)) {
	      node.exportKind = "type";
	    }

	    if (declaration && isDeclare) {
	      this.resetStartLocation(declaration, startPos, startLoc);
	      declaration.declare = true;
	    }

	    return declaration;
	  }

	  parseClassId(node, isStatement, optionalId) {
	    if ((!isStatement || optionalId) && this.isContextual("implements")) {
	      return;
	    }

	    super.parseClassId(node, isStatement, optionalId, node.declare ? BIND_TS_AMBIENT : BIND_CLASS);
	    const typeParameters = this.tsTryParseTypeParameters();
	    if (typeParameters) node.typeParameters = typeParameters;
	  }

	  parseClassPropertyAnnotation(node) {
	    if (!node.optional && this.eat(types$1.bang)) {
	      node.definite = true;
	    }

	    const type = this.tsTryParseTypeAnnotation();
	    if (type) node.typeAnnotation = type;
	  }

	  parseClassProperty(node) {
	    this.parseClassPropertyAnnotation(node);

	    if (this.state.isAmbientContext && this.match(types$1.eq)) {
	      this.raise(this.state.start, TSErrors.DeclareClassFieldHasInitializer);
	    }

	    return super.parseClassProperty(node);
	  }

	  parseClassPrivateProperty(node) {
	    if (node.abstract) {
	      this.raise(node.start, TSErrors.PrivateElementHasAbstract);
	    }

	    if (node.accessibility) {
	      this.raise(node.start, TSErrors.PrivateElementHasAccessibility, node.accessibility);
	    }

	    this.parseClassPropertyAnnotation(node);
	    return super.parseClassPrivateProperty(node);
	  }

	  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
	    const typeParameters = this.tsTryParseTypeParameters();

	    if (typeParameters && isConstructor) {
	      this.raise(typeParameters.start, TSErrors.ConstructorHasTypeParameters);
	    }

	    if (method.declare && (method.kind === "get" || method.kind === "set")) {
	      this.raise(method.start, TSErrors.DeclareAccessor, method.kind);
	    }

	    if (typeParameters) method.typeParameters = typeParameters;
	    super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
	  }

	  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
	    const typeParameters = this.tsTryParseTypeParameters();
	    if (typeParameters) method.typeParameters = typeParameters;
	    super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
	  }

	  parseClassSuper(node) {
	    super.parseClassSuper(node);

	    if (node.superClass && this.isRelational("<")) {
	      node.superTypeParameters = this.tsParseTypeArguments();
	    }

	    if (this.eatContextual("implements")) {
	      node.implements = this.tsParseHeritageClause("implements");
	    }
	  }

	  parseObjPropValue(prop, ...args) {
	    const typeParameters = this.tsTryParseTypeParameters();
	    if (typeParameters) prop.typeParameters = typeParameters;
	    super.parseObjPropValue(prop, ...args);
	  }

	  parseFunctionParams(node, allowModifiers) {
	    const typeParameters = this.tsTryParseTypeParameters();
	    if (typeParameters) node.typeParameters = typeParameters;
	    super.parseFunctionParams(node, allowModifiers);
	  }

	  parseVarId(decl, kind) {
	    super.parseVarId(decl, kind);

	    if (decl.id.type === "Identifier" && this.eat(types$1.bang)) {
	      decl.definite = true;
	    }

	    const type = this.tsTryParseTypeAnnotation();

	    if (type) {
	      decl.id.typeAnnotation = type;
	      this.resetEndLocation(decl.id);
	    }
	  }

	  parseAsyncArrowFromCallExpression(node, call) {
	    if (this.match(types$1.colon)) {
	      node.returnType = this.tsParseTypeAnnotation();
	    }

	    return super.parseAsyncArrowFromCallExpression(node, call);
	  }

	  parseMaybeAssign(...args) {
	    var _jsx, _jsx2, _typeCast, _jsx3, _typeCast2, _jsx4, _typeCast3;

	    let state;
	    let jsx;
	    let typeCast;

	    if (this.hasPlugin("jsx") && (this.match(types$1.jsxTagStart) || this.isRelational("<"))) {
	      state = this.state.clone();
	      jsx = this.tryParse(() => super.parseMaybeAssign(...args), state);
	      if (!jsx.error) return jsx.node;
	      const {
	        context
	      } = this.state;

	      if (context[context.length - 1] === types$2.j_oTag) {
	        context.length -= 2;
	      } else if (context[context.length - 1] === types$2.j_expr) {
	        context.length -= 1;
	      }
	    }

	    if (!((_jsx = jsx) != null && _jsx.error) && !this.isRelational("<")) {
	      return super.parseMaybeAssign(...args);
	    }

	    let typeParameters;
	    state = state || this.state.clone();
	    const arrow = this.tryParse(abort => {
	      var _expr$extra, _typeParameters;

	      typeParameters = this.tsParseTypeParameters();
	      const expr = super.parseMaybeAssign(...args);

	      if (expr.type !== "ArrowFunctionExpression" || (_expr$extra = expr.extra) != null && _expr$extra.parenthesized) {
	        abort();
	      }

	      if (((_typeParameters = typeParameters) == null ? void 0 : _typeParameters.params.length) !== 0) {
	        this.resetStartLocationFromNode(expr, typeParameters);
	      }

	      expr.typeParameters = typeParameters;
	      return expr;
	    }, state);
	    if (!arrow.error && !arrow.aborted) return arrow.node;

	    if (!jsx) {
	      assert(!this.hasPlugin("jsx"));
	      typeCast = this.tryParse(() => super.parseMaybeAssign(...args), state);
	      if (!typeCast.error) return typeCast.node;
	    }

	    if ((_jsx2 = jsx) != null && _jsx2.node) {
	      this.state = jsx.failState;
	      return jsx.node;
	    }

	    if (arrow.node) {
	      this.state = arrow.failState;
	      return arrow.node;
	    }

	    if ((_typeCast = typeCast) != null && _typeCast.node) {
	      this.state = typeCast.failState;
	      return typeCast.node;
	    }

	    if ((_jsx3 = jsx) != null && _jsx3.thrown) throw jsx.error;
	    if (arrow.thrown) throw arrow.error;
	    if ((_typeCast2 = typeCast) != null && _typeCast2.thrown) throw typeCast.error;
	    throw ((_jsx4 = jsx) == null ? void 0 : _jsx4.error) || arrow.error || ((_typeCast3 = typeCast) == null ? void 0 : _typeCast3.error);
	  }

	  parseMaybeUnary(refExpressionErrors) {
	    if (!this.hasPlugin("jsx") && this.isRelational("<")) {
	      return this.tsParseTypeAssertion();
	    } else {
	      return super.parseMaybeUnary(refExpressionErrors);
	    }
	  }

	  parseArrow(node) {
	    if (this.match(types$1.colon)) {
	      const result = this.tryParse(abort => {
	        const returnType = this.tsParseTypeOrTypePredicateAnnotation(types$1.colon);
	        if (this.canInsertSemicolon() || !this.match(types$1.arrow)) abort();
	        return returnType;
	      });
	      if (result.aborted) return;

	      if (!result.thrown) {
	        if (result.error) this.state = result.failState;
	        node.returnType = result.node;
	      }
	    }

	    return super.parseArrow(node);
	  }

	  parseAssignableListItemTypes(param) {
	    if (this.eat(types$1.question)) {
	      if (param.type !== "Identifier" && !this.state.isAmbientContext && !this.state.inType) {
	        this.raise(param.start, TSErrors.PatternIsOptional);
	      }

	      param.optional = true;
	    }

	    const type = this.tsTryParseTypeAnnotation();
	    if (type) param.typeAnnotation = type;
	    this.resetEndLocation(param);
	    return param;
	  }

	  toAssignable(node, isLHS = false) {
	    switch (node.type) {
	      case "TSTypeCastExpression":
	        return super.toAssignable(this.typeCastToParameter(node), isLHS);

	      case "TSParameterProperty":
	        return super.toAssignable(node, isLHS);

	      case "ParenthesizedExpression":
	        return this.toAssignableParenthesizedExpression(node, isLHS);

	      case "TSAsExpression":
	      case "TSNonNullExpression":
	      case "TSTypeAssertion":
	        node.expression = this.toAssignable(node.expression, isLHS);
	        return node;

	      default:
	        return super.toAssignable(node, isLHS);
	    }
	  }

	  toAssignableParenthesizedExpression(node, isLHS) {
	    switch (node.expression.type) {
	      case "TSAsExpression":
	      case "TSNonNullExpression":
	      case "TSTypeAssertion":
	      case "ParenthesizedExpression":
	        node.expression = this.toAssignable(node.expression, isLHS);
	        return node;

	      default:
	        return super.toAssignable(node, isLHS);
	    }
	  }

	  checkLVal(expr, contextDescription, ...args) {
	    var _expr$extra2;

	    switch (expr.type) {
	      case "TSTypeCastExpression":
	        return;

	      case "TSParameterProperty":
	        this.checkLVal(expr.parameter, "parameter property", ...args);
	        return;

	      case "TSAsExpression":
	      case "TSTypeAssertion":
	        if (!args[0] && contextDescription !== "parenthesized expression" && !((_expr$extra2 = expr.extra) != null && _expr$extra2.parenthesized)) {
	          this.raise(expr.start, ErrorMessages.InvalidLhs, contextDescription);
	          break;
	        }

	        this.checkLVal(expr.expression, "parenthesized expression", ...args);
	        return;

	      case "TSNonNullExpression":
	        this.checkLVal(expr.expression, contextDescription, ...args);
	        return;

	      default:
	        super.checkLVal(expr, contextDescription, ...args);
	        return;
	    }
	  }

	  parseBindingAtom() {
	    switch (this.state.type) {
	      case types$1._this:
	        return this.parseIdentifier(true);

	      default:
	        return super.parseBindingAtom();
	    }
	  }

	  parseMaybeDecoratorArguments(expr) {
	    if (this.isRelational("<")) {
	      const typeArguments = this.tsParseTypeArguments();

	      if (this.match(types$1.parenL)) {
	        const call = super.parseMaybeDecoratorArguments(expr);
	        call.typeParameters = typeArguments;
	        return call;
	      }

	      this.unexpected(this.state.start, types$1.parenL);
	    }

	    return super.parseMaybeDecoratorArguments(expr);
	  }

	  checkCommaAfterRest(close) {
	    if (this.state.isAmbientContext && this.match(types$1.comma) && this.lookaheadCharCode() === close) {
	      this.next();
	    } else {
	      super.checkCommaAfterRest(close);
	    }
	  }

	  isClassMethod() {
	    return this.isRelational("<") || super.isClassMethod();
	  }

	  isClassProperty() {
	    return this.match(types$1.bang) || this.match(types$1.colon) || super.isClassProperty();
	  }

	  parseMaybeDefault(...args) {
	    const node = super.parseMaybeDefault(...args);

	    if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
	      this.raise(node.typeAnnotation.start, TSErrors.TypeAnnotationAfterAssign);
	    }

	    return node;
	  }

	  getTokenFromCode(code) {
	    if (this.state.inType && (code === 62 || code === 60)) {
	      return this.finishOp(types$1.relational, 1);
	    } else {
	      return super.getTokenFromCode(code);
	    }
	  }

	  reScan_lt_gt() {
	    if (this.match(types$1.relational)) {
	      const code = this.input.charCodeAt(this.state.start);

	      if (code === 60 || code === 62) {
	        this.state.pos -= 1;
	        this.readToken_lt_gt(code);
	      }
	    }
	  }

	  toAssignableList(exprList) {
	    for (let i = 0; i < exprList.length; i++) {
	      const expr = exprList[i];
	      if (!expr) continue;

	      switch (expr.type) {
	        case "TSTypeCastExpression":
	          exprList[i] = this.typeCastToParameter(expr);
	          break;

	        case "TSAsExpression":
	        case "TSTypeAssertion":
	          if (!this.state.maybeInArrowParameters) {
	            exprList[i] = this.typeCastToParameter(expr);
	          } else {
	            this.raise(expr.start, TSErrors.UnexpectedTypeCastInParameter);
	          }

	          break;
	      }
	    }

	    return super.toAssignableList(...arguments);
	  }

	  typeCastToParameter(node) {
	    node.expression.typeAnnotation = node.typeAnnotation;
	    this.resetEndLocation(node.expression, node.typeAnnotation.end, node.typeAnnotation.loc.end);
	    return node.expression;
	  }

	  shouldParseArrow() {
	    return this.match(types$1.colon) || super.shouldParseArrow();
	  }

	  shouldParseAsyncArrow() {
	    return this.match(types$1.colon) || super.shouldParseAsyncArrow();
	  }

	  canHaveLeadingDecorator() {
	    return super.canHaveLeadingDecorator() || this.isAbstractClass();
	  }

	  jsxParseOpeningElementAfterName(node) {
	    if (this.isRelational("<")) {
	      const typeArguments = this.tsTryParseAndCatch(() => this.tsParseTypeArguments());
	      if (typeArguments) node.typeParameters = typeArguments;
	    }

	    return super.jsxParseOpeningElementAfterName(node);
	  }

	  getGetterSetterExpectedParamCount(method) {
	    const baseCount = super.getGetterSetterExpectedParamCount(method);
	    const params = this.getObjectOrClassMethodParams(method);
	    const firstParam = params[0];
	    const hasContextParam = firstParam && this.isThisParam(firstParam);
	    return hasContextParam ? baseCount + 1 : baseCount;
	  }

	  parseCatchClauseParam() {
	    const param = super.parseCatchClauseParam();
	    const type = this.tsTryParseTypeAnnotation();

	    if (type) {
	      param.typeAnnotation = type;
	      this.resetEndLocation(param);
	    }

	    return param;
	  }

	  tsInAmbientContext(cb) {
	    const oldIsAmbientContext = this.state.isAmbientContext;
	    this.state.isAmbientContext = true;

	    try {
	      return cb();
	    } finally {
	      this.state.isAmbientContext = oldIsAmbientContext;
	    }
	  }

	  parseClass(node, ...args) {
	    const oldInAbstractClass = this.state.inAbstractClass;
	    this.state.inAbstractClass = !!node.abstract;

	    try {
	      return super.parseClass(node, ...args);
	    } finally {
	      this.state.inAbstractClass = oldInAbstractClass;
	    }
	  }

	  tsParseAbstractDeclaration(node) {
	    if (this.match(types$1._class)) {
	      node.abstract = true;
	      return this.parseClass(node, true, false);
	    } else if (this.isContextual("interface")) {
	      if (!this.hasFollowingLineBreak()) {
	        node.abstract = true;
	        this.raise(node.start, TSErrors.NonClassMethodPropertyHasAbstractModifer);
	        this.next();
	        return this.tsParseInterfaceDeclaration(node);
	      }
	    } else {
	      this.unexpected(null, types$1._class);
	    }
	  }

	  parseMethod(...args) {
	    const method = super.parseMethod(...args);

	    if (method.abstract) {
	      const hasBody = this.hasPlugin("estree") ? !!method.value.body : !!method.body;

	      if (hasBody) {
	        const {
	          key
	        } = method;
	        this.raise(method.start, TSErrors.AbstractMethodHasImplementation, key.type === "Identifier" ? key.name : `[${this.input.slice(key.start, key.end)}]`);
	      }
	    }

	    return method;
	  }

	  shouldParseAsAmbientContext() {
	    return !!this.getPluginOption("typescript", "dts");
	  }

	  parse() {
	    if (this.shouldParseAsAmbientContext()) {
	      this.state.isAmbientContext = true;
	    }

	    return super.parse();
	  }

	  getExpression() {
	    if (this.shouldParseAsAmbientContext()) {
	      this.state.isAmbientContext = true;
	    }

	    return super.getExpression();
	  }

	});

	types$1.placeholder = new TokenType("%%", {
	  startsExpr: true
	});
	const PlaceHolderErrors = makeErrorTemplates({
	  ClassNameIsRequired: "A class name is required."
	}, ErrorCodes.SyntaxError);
	var placeholders = (superClass => class extends superClass {
	  parsePlaceholder(expectedNode) {
	    if (this.match(types$1.placeholder)) {
	      const node = this.startNode();
	      this.next();
	      this.assertNoSpace("Unexpected space in placeholder.");
	      node.name = super.parseIdentifier(true);
	      this.assertNoSpace("Unexpected space in placeholder.");
	      this.expect(types$1.placeholder);
	      return this.finishPlaceholder(node, expectedNode);
	    }
	  }

	  finishPlaceholder(node, expectedNode) {
	    const isFinished = !!(node.expectedNode && node.type === "Placeholder");
	    node.expectedNode = expectedNode;
	    return isFinished ? node : this.finishNode(node, "Placeholder");
	  }

	  getTokenFromCode(code) {
	    if (code === 37 && this.input.charCodeAt(this.state.pos + 1) === 37) {
	      return this.finishOp(types$1.placeholder, 2);
	    }

	    return super.getTokenFromCode(...arguments);
	  }

	  parseExprAtom() {
	    return this.parsePlaceholder("Expression") || super.parseExprAtom(...arguments);
	  }

	  parseIdentifier() {
	    return this.parsePlaceholder("Identifier") || super.parseIdentifier(...arguments);
	  }

	  checkReservedWord(word) {
	    if (word !== undefined) super.checkReservedWord(...arguments);
	  }

	  parseBindingAtom() {
	    return this.parsePlaceholder("Pattern") || super.parseBindingAtom(...arguments);
	  }

	  checkLVal(expr) {
	    if (expr.type !== "Placeholder") super.checkLVal(...arguments);
	  }

	  toAssignable(node) {
	    if (node && node.type === "Placeholder" && node.expectedNode === "Expression") {
	      node.expectedNode = "Pattern";
	      return node;
	    }

	    return super.toAssignable(...arguments);
	  }

	  isLet(context) {
	    if (super.isLet(context)) {
	      return true;
	    }

	    if (!this.isContextual("let")) {
	      return false;
	    }

	    if (context) return false;
	    const nextToken = this.lookahead();

	    if (nextToken.type === types$1.placeholder) {
	      return true;
	    }

	    return false;
	  }

	  verifyBreakContinue(node) {
	    if (node.label && node.label.type === "Placeholder") return;
	    super.verifyBreakContinue(...arguments);
	  }

	  parseExpressionStatement(node, expr) {
	    if (expr.type !== "Placeholder" || expr.extra && expr.extra.parenthesized) {
	      return super.parseExpressionStatement(...arguments);
	    }

	    if (this.match(types$1.colon)) {
	      const stmt = node;
	      stmt.label = this.finishPlaceholder(expr, "Identifier");
	      this.next();
	      stmt.body = this.parseStatement("label");
	      return this.finishNode(stmt, "LabeledStatement");
	    }

	    this.semicolon();
	    node.name = expr.name;
	    return this.finishPlaceholder(node, "Statement");
	  }

	  parseBlock() {
	    return this.parsePlaceholder("BlockStatement") || super.parseBlock(...arguments);
	  }

	  parseFunctionId() {
	    return this.parsePlaceholder("Identifier") || super.parseFunctionId(...arguments);
	  }

	  parseClass(node, isStatement, optionalId) {
	    const type = isStatement ? "ClassDeclaration" : "ClassExpression";
	    this.next();
	    this.takeDecorators(node);
	    const oldStrict = this.state.strict;
	    const placeholder = this.parsePlaceholder("Identifier");

	    if (placeholder) {
	      if (this.match(types$1._extends) || this.match(types$1.placeholder) || this.match(types$1.braceL)) {
	        node.id = placeholder;
	      } else if (optionalId || !isStatement) {
	        node.id = null;
	        node.body = this.finishPlaceholder(placeholder, "ClassBody");
	        return this.finishNode(node, type);
	      } else {
	        this.unexpected(null, PlaceHolderErrors.ClassNameIsRequired);
	      }
	    } else {
	      this.parseClassId(node, isStatement, optionalId);
	    }

	    this.parseClassSuper(node);
	    node.body = this.parsePlaceholder("ClassBody") || this.parseClassBody(!!node.superClass, oldStrict);
	    return this.finishNode(node, type);
	  }

	  parseExport(node) {
	    const placeholder = this.parsePlaceholder("Identifier");
	    if (!placeholder) return super.parseExport(...arguments);

	    if (!this.isContextual("from") && !this.match(types$1.comma)) {
	      node.specifiers = [];
	      node.source = null;
	      node.declaration = this.finishPlaceholder(placeholder, "Declaration");
	      return this.finishNode(node, "ExportNamedDeclaration");
	    }

	    this.expectPlugin("exportDefaultFrom");
	    const specifier = this.startNode();
	    specifier.exported = placeholder;
	    node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];
	    return super.parseExport(node);
	  }

	  isExportDefaultSpecifier() {
	    if (this.match(types$1._default)) {
	      const next = this.nextTokenStart();

	      if (this.isUnparsedContextual(next, "from")) {
	        if (this.input.startsWith(types$1.placeholder.label, this.nextTokenStartSince(next + 4))) {
	          return true;
	        }
	      }
	    }

	    return super.isExportDefaultSpecifier();
	  }

	  maybeParseExportDefaultSpecifier(node) {
	    if (node.specifiers && node.specifiers.length > 0) {
	      return true;
	    }

	    return super.maybeParseExportDefaultSpecifier(...arguments);
	  }

	  checkExport(node) {
	    const {
	      specifiers
	    } = node;

	    if (specifiers != null && specifiers.length) {
	      node.specifiers = specifiers.filter(node => node.exported.type === "Placeholder");
	    }

	    super.checkExport(node);
	    node.specifiers = specifiers;
	  }

	  parseImport(node) {
	    const placeholder = this.parsePlaceholder("Identifier");
	    if (!placeholder) return super.parseImport(...arguments);
	    node.specifiers = [];

	    if (!this.isContextual("from") && !this.match(types$1.comma)) {
	      node.source = this.finishPlaceholder(placeholder, "StringLiteral");
	      this.semicolon();
	      return this.finishNode(node, "ImportDeclaration");
	    }

	    const specifier = this.startNodeAtNode(placeholder);
	    specifier.local = placeholder;
	    this.finishNode(specifier, "ImportDefaultSpecifier");
	    node.specifiers.push(specifier);

	    if (this.eat(types$1.comma)) {
	      const hasStarImport = this.maybeParseStarImportSpecifier(node);
	      if (!hasStarImport) this.parseNamedImportSpecifiers(node);
	    }

	    this.expectContextual("from");
	    node.source = this.parseImportSource();
	    this.semicolon();
	    return this.finishNode(node, "ImportDeclaration");
	  }

	  parseImportSource() {
	    return this.parsePlaceholder("StringLiteral") || super.parseImportSource(...arguments);
	  }

	});

	var v8intrinsic = (superClass => class extends superClass {
	  parseV8Intrinsic() {
	    if (this.match(types$1.modulo)) {
	      const v8IntrinsicStart = this.state.start;
	      const node = this.startNode();
	      this.eat(types$1.modulo);

	      if (this.match(types$1.name)) {
	        const name = this.parseIdentifierName(this.state.start);
	        const identifier = this.createIdentifier(node, name);
	        identifier.type = "V8IntrinsicIdentifier";

	        if (this.match(types$1.parenL)) {
	          return identifier;
	        }
	      }

	      this.unexpected(v8IntrinsicStart);
	    }
	  }

	  parseExprAtom() {
	    return this.parseV8Intrinsic() || super.parseExprAtom(...arguments);
	  }

	});

	function hasPlugin(plugins, name) {
	  return plugins.some(plugin => {
	    if (Array.isArray(plugin)) {
	      return plugin[0] === name;
	    } else {
	      return plugin === name;
	    }
	  });
	}
	function getPluginOption(plugins, name, option) {
	  const plugin = plugins.find(plugin => {
	    if (Array.isArray(plugin)) {
	      return plugin[0] === name;
	    } else {
	      return plugin === name;
	    }
	  });

	  if (plugin && Array.isArray(plugin)) {
	    return plugin[1][option];
	  }

	  return null;
	}
	const PIPELINE_PROPOSALS = ["minimal", "smart", "fsharp"];
	const RECORD_AND_TUPLE_SYNTAX_TYPES = ["hash", "bar"];
	function validatePlugins(plugins) {
	  if (hasPlugin(plugins, "decorators")) {
	    if (hasPlugin(plugins, "decorators-legacy")) {
	      throw new Error("Cannot use the decorators and decorators-legacy plugin together");
	    }

	    const decoratorsBeforeExport = getPluginOption(plugins, "decorators", "decoratorsBeforeExport");

	    if (decoratorsBeforeExport == null) {
	      throw new Error("The 'decorators' plugin requires a 'decoratorsBeforeExport' option," + " whose value must be a boolean. If you are migrating from" + " Babylon/Babel 6 or want to use the old decorators proposal, you" + " should use the 'decorators-legacy' plugin instead of 'decorators'.");
	    } else if (typeof decoratorsBeforeExport !== "boolean") {
	      throw new Error("'decoratorsBeforeExport' must be a boolean.");
	    }
	  }

	  if (hasPlugin(plugins, "flow") && hasPlugin(plugins, "typescript")) {
	    throw new Error("Cannot combine flow and typescript plugins.");
	  }

	  if (hasPlugin(plugins, "placeholders") && hasPlugin(plugins, "v8intrinsic")) {
	    throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
	  }

	  if (hasPlugin(plugins, "pipelineOperator") && !PIPELINE_PROPOSALS.includes(getPluginOption(plugins, "pipelineOperator", "proposal"))) {
	    throw new Error("'pipelineOperator' requires 'proposal' option whose value should be one of: " + PIPELINE_PROPOSALS.map(p => `'${p}'`).join(", "));
	  }

	  if (hasPlugin(plugins, "moduleAttributes")) {
	    {
	      if (hasPlugin(plugins, "importAssertions")) {
	        throw new Error("Cannot combine importAssertions and moduleAttributes plugins.");
	      }

	      const moduleAttributesVerionPluginOption = getPluginOption(plugins, "moduleAttributes", "version");

	      if (moduleAttributesVerionPluginOption !== "may-2020") {
	        throw new Error("The 'moduleAttributes' plugin requires a 'version' option," + " representing the last proposal update. Currently, the" + " only supported value is 'may-2020'.");
	      }
	    }
	  }

	  if (hasPlugin(plugins, "recordAndTuple") && !RECORD_AND_TUPLE_SYNTAX_TYPES.includes(getPluginOption(plugins, "recordAndTuple", "syntaxType"))) {
	    throw new Error("'recordAndTuple' requires 'syntaxType' option whose value should be one of: " + RECORD_AND_TUPLE_SYNTAX_TYPES.map(p => `'${p}'`).join(", "));
	  }

	  if (hasPlugin(plugins, "asyncDoExpressions") && !hasPlugin(plugins, "doExpressions")) {
	    const error = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
	    error.missingPlugins = "doExpressions";
	    throw error;
	  }
	}
	const mixinPlugins = {
	  estree,
	  jsx,
	  flow: flow$1,
	  typescript,
	  v8intrinsic,
	  placeholders
	};
	const mixinPluginNames = Object.keys(mixinPlugins);

	const defaultOptions = {
	  sourceType: "script",
	  sourceFilename: undefined,
	  startLine: 1,
	  allowAwaitOutsideFunction: false,
	  allowReturnOutsideFunction: false,
	  allowImportExportEverywhere: false,
	  allowSuperOutsideMethod: false,
	  allowUndeclaredExports: false,
	  plugins: [],
	  strictMode: null,
	  ranges: false,
	  tokens: false,
	  createParenthesizedExpressions: false,
	  errorRecovery: false
	};
	function getOptions(opts) {
	  const options = {};

	  for (const key of Object.keys(defaultOptions)) {
	    options[key] = opts && opts[key] != null ? opts[key] : defaultOptions[key];
	  }

	  return options;
	}

	var _isDigit = function isDigit(code) {
	  return code >= 48 && code <= 57;
	};
	const VALID_REGEX_FLAGS = new Set([103, 109, 115, 105, 121, 117, 100]);
	const forbiddenNumericSeparatorSiblings = {
	  decBinOct: [46, 66, 69, 79, 95, 98, 101, 111],
	  hex: [46, 88, 95, 120]
	};
	const allowedNumericSeparatorSiblings = {};
	allowedNumericSeparatorSiblings.bin = [48, 49];
	allowedNumericSeparatorSiblings.oct = [...allowedNumericSeparatorSiblings.bin, 50, 51, 52, 53, 54, 55];
	allowedNumericSeparatorSiblings.dec = [...allowedNumericSeparatorSiblings.oct, 56, 57];
	allowedNumericSeparatorSiblings.hex = [...allowedNumericSeparatorSiblings.dec, 65, 66, 67, 68, 69, 70, 97, 98, 99, 100, 101, 102];
	class Token {
	  constructor(state) {
	    this.type = state.type;
	    this.value = state.value;
	    this.start = state.start;
	    this.end = state.end;
	    this.loc = new SourceLocation(state.startLoc, state.endLoc);
	  }

	}
	class Tokenizer extends ParserError {
	  constructor(options, input) {
	    super();
	    this.isLookahead = void 0;
	    this.tokens = [];
	    this.state = new State();
	    this.state.init(options);
	    this.input = input;
	    this.length = input.length;
	    this.isLookahead = false;
	  }

	  pushToken(token) {
	    this.tokens.length = this.state.tokensLength;
	    this.tokens.push(token);
	    ++this.state.tokensLength;
	  }

	  next() {
	    this.checkKeywordEscapes();

	    if (this.options.tokens) {
	      this.pushToken(new Token(this.state));
	    }

	    this.state.lastTokEnd = this.state.end;
	    this.state.lastTokStart = this.state.start;
	    this.state.lastTokEndLoc = this.state.endLoc;
	    this.state.lastTokStartLoc = this.state.startLoc;
	    this.nextToken();
	  }

	  eat(type) {
	    if (this.match(type)) {
	      this.next();
	      return true;
	    } else {
	      return false;
	    }
	  }

	  match(type) {
	    return this.state.type === type;
	  }

	  createLookaheadState(state) {
	    return {
	      pos: state.pos,
	      value: null,
	      type: state.type,
	      start: state.start,
	      end: state.end,
	      lastTokEnd: state.end,
	      context: [this.curContext()],
	      inType: state.inType
	    };
	  }

	  lookahead() {
	    const old = this.state;
	    this.state = this.createLookaheadState(old);
	    this.isLookahead = true;
	    this.nextToken();
	    this.isLookahead = false;
	    const curr = this.state;
	    this.state = old;
	    return curr;
	  }

	  nextTokenStart() {
	    return this.nextTokenStartSince(this.state.pos);
	  }

	  nextTokenStartSince(pos) {
	    skipWhiteSpace.lastIndex = pos;
	    const skip = skipWhiteSpace.exec(this.input);
	    return pos + skip[0].length;
	  }

	  lookaheadCharCode() {
	    return this.input.charCodeAt(this.nextTokenStart());
	  }

	  codePointAtPos(pos) {
	    let cp = this.input.charCodeAt(pos);

	    if ((cp & 0xfc00) === 0xd800 && ++pos < this.input.length) {
	      const trail = this.input.charCodeAt(pos);

	      if ((trail & 0xfc00) === 0xdc00) {
	        cp = 0x10000 + ((cp & 0x3ff) << 10) + (trail & 0x3ff);
	      }
	    }

	    return cp;
	  }

	  setStrict(strict) {
	    this.state.strict = strict;

	    if (strict) {
	      this.state.strictErrors.forEach((message, pos) => this.raise(pos, message));
	      this.state.strictErrors.clear();
	    }
	  }

	  curContext() {
	    return this.state.context[this.state.context.length - 1];
	  }

	  nextToken() {
	    const curContext = this.curContext();
	    if (!curContext.preserveSpace) this.skipSpace();
	    this.state.start = this.state.pos;
	    if (!this.isLookahead) this.state.startLoc = this.state.curPosition();

	    if (this.state.pos >= this.length) {
	      this.finishToken(types$1.eof);
	      return;
	    }

	    if (curContext === types$2.template) {
	      this.readTmplToken();
	    } else {
	      this.getTokenFromCode(this.codePointAtPos(this.state.pos));
	    }
	  }

	  pushComment(block, text, start, end, startLoc, endLoc) {
	    const comment = {
	      type: block ? "CommentBlock" : "CommentLine",
	      value: text,
	      start: start,
	      end: end,
	      loc: new SourceLocation(startLoc, endLoc)
	    };
	    if (this.options.tokens) this.pushToken(comment);
	    this.state.comments.push(comment);
	    this.addComment(comment);
	  }

	  skipBlockComment() {
	    let startLoc;
	    if (!this.isLookahead) startLoc = this.state.curPosition();
	    const start = this.state.pos;
	    const end = this.input.indexOf("*/", this.state.pos + 2);
	    if (end === -1) throw this.raise(start, ErrorMessages.UnterminatedComment);
	    this.state.pos = end + 2;
	    lineBreakG.lastIndex = start;
	    let match;

	    while ((match = lineBreakG.exec(this.input)) && match.index < this.state.pos) {
	      ++this.state.curLine;
	      this.state.lineStart = match.index + match[0].length;
	    }

	    if (this.isLookahead) return;
	    this.pushComment(true, this.input.slice(start + 2, end), start, this.state.pos, startLoc, this.state.curPosition());
	  }

	  skipLineComment(startSkip) {
	    const start = this.state.pos;
	    let startLoc;
	    if (!this.isLookahead) startLoc = this.state.curPosition();
	    let ch = this.input.charCodeAt(this.state.pos += startSkip);

	    if (this.state.pos < this.length) {
	      while (!isNewLine(ch) && ++this.state.pos < this.length) {
	        ch = this.input.charCodeAt(this.state.pos);
	      }
	    }

	    if (this.isLookahead) return;
	    this.pushComment(false, this.input.slice(start + startSkip, this.state.pos), start, this.state.pos, startLoc, this.state.curPosition());
	  }

	  skipSpace() {
	    loop: while (this.state.pos < this.length) {
	      const ch = this.input.charCodeAt(this.state.pos);

	      switch (ch) {
	        case 32:
	        case 160:
	        case 9:
	          ++this.state.pos;
	          break;

	        case 13:
	          if (this.input.charCodeAt(this.state.pos + 1) === 10) {
	            ++this.state.pos;
	          }

	        case 10:
	        case 8232:
	        case 8233:
	          ++this.state.pos;
	          ++this.state.curLine;
	          this.state.lineStart = this.state.pos;
	          break;

	        case 47:
	          switch (this.input.charCodeAt(this.state.pos + 1)) {
	            case 42:
	              this.skipBlockComment();
	              break;

	            case 47:
	              this.skipLineComment(2);
	              break;

	            default:
	              break loop;
	          }

	          break;

	        default:
	          if (isWhitespace$9(ch)) {
	            ++this.state.pos;
	          } else {
	            break loop;
	          }

	      }
	    }
	  }

	  finishToken(type, val) {
	    this.state.end = this.state.pos;
	    const prevType = this.state.type;
	    this.state.type = type;
	    this.state.value = val;

	    if (!this.isLookahead) {
	      this.state.endLoc = this.state.curPosition();
	      this.updateContext(prevType);
	    }
	  }

	  readToken_numberSign() {
	    if (this.state.pos === 0 && this.readToken_interpreter()) {
	      return;
	    }

	    const nextPos = this.state.pos + 1;
	    const next = this.codePointAtPos(nextPos);

	    if (next >= 48 && next <= 57) {
	      throw this.raise(this.state.pos, ErrorMessages.UnexpectedDigitAfterHash);
	    }

	    if (next === 123 || next === 91 && this.hasPlugin("recordAndTuple")) {
	      this.expectPlugin("recordAndTuple");

	      if (this.getPluginOption("recordAndTuple", "syntaxType") !== "hash") {
	        throw this.raise(this.state.pos, next === 123 ? ErrorMessages.RecordExpressionHashIncorrectStartSyntaxType : ErrorMessages.TupleExpressionHashIncorrectStartSyntaxType);
	      }

	      this.state.pos += 2;

	      if (next === 123) {
	        this.finishToken(types$1.braceHashL);
	      } else {
	        this.finishToken(types$1.bracketHashL);
	      }
	    } else if (isIdentifierStart(next)) {
	      ++this.state.pos;
	      this.finishToken(types$1.privateName, this.readWord1(next));
	    } else if (next === 92) {
	      ++this.state.pos;
	      this.finishToken(types$1.privateName, this.readWord1());
	    } else {
	      this.finishOp(types$1.hash, 1);
	    }
	  }

	  readToken_dot() {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (next >= 48 && next <= 57) {
	      this.readNumber(true);
	      return;
	    }

	    if (next === 46 && this.input.charCodeAt(this.state.pos + 2) === 46) {
	      this.state.pos += 3;
	      this.finishToken(types$1.ellipsis);
	    } else {
	      ++this.state.pos;
	      this.finishToken(types$1.dot);
	    }
	  }

	  readToken_slash() {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (next === 61) {
	      this.finishOp(types$1.slashAssign, 2);
	    } else {
	      this.finishOp(types$1.slash, 1);
	    }
	  }

	  readToken_interpreter() {
	    if (this.state.pos !== 0 || this.length < 2) return false;
	    let ch = this.input.charCodeAt(this.state.pos + 1);
	    if (ch !== 33) return false;
	    const start = this.state.pos;
	    this.state.pos += 1;

	    while (!isNewLine(ch) && ++this.state.pos < this.length) {
	      ch = this.input.charCodeAt(this.state.pos);
	    }

	    const value = this.input.slice(start + 2, this.state.pos);
	    this.finishToken(types$1.interpreterDirective, value);
	    return true;
	  }

	  readToken_mult_modulo(code) {
	    let type = code === 42 ? types$1.star : types$1.modulo;
	    let width = 1;
	    let next = this.input.charCodeAt(this.state.pos + 1);

	    if (code === 42 && next === 42) {
	      width++;
	      next = this.input.charCodeAt(this.state.pos + 2);
	      type = types$1.exponent;
	    }

	    if (next === 61 && !this.state.inType) {
	      width++;
	      type = types$1.assign;
	    }

	    this.finishOp(type, width);
	  }

	  readToken_pipe_amp(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (next === code) {
	      if (this.input.charCodeAt(this.state.pos + 2) === 61) {
	        this.finishOp(types$1.assign, 3);
	      } else {
	        this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
	      }

	      return;
	    }

	    if (code === 124) {
	      if (next === 62) {
	        this.finishOp(types$1.pipeline, 2);
	        return;
	      }

	      if (this.hasPlugin("recordAndTuple") && next === 125) {
	        if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	          throw this.raise(this.state.pos, ErrorMessages.RecordExpressionBarIncorrectEndSyntaxType);
	        }

	        this.state.pos += 2;
	        this.finishToken(types$1.braceBarR);
	        return;
	      }

	      if (this.hasPlugin("recordAndTuple") && next === 93) {
	        if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	          throw this.raise(this.state.pos, ErrorMessages.TupleExpressionBarIncorrectEndSyntaxType);
	        }

	        this.state.pos += 2;
	        this.finishToken(types$1.bracketBarR);
	        return;
	      }
	    }

	    if (next === 61) {
	      this.finishOp(types$1.assign, 2);
	      return;
	    }

	    this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
	  }

	  readToken_caret() {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (next === 61) {
	      this.finishOp(types$1.assign, 2);
	    } else {
	      this.finishOp(types$1.bitwiseXOR, 1);
	    }
	  }

	  readToken_plus_min(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (next === code) {
	      if (next === 45 && !this.inModule && this.input.charCodeAt(this.state.pos + 2) === 62 && (this.state.lastTokEnd === 0 || this.hasPrecedingLineBreak())) {
	        this.skipLineComment(3);
	        this.skipSpace();
	        this.nextToken();
	        return;
	      }

	      this.finishOp(types$1.incDec, 2);
	      return;
	    }

	    if (next === 61) {
	      this.finishOp(types$1.assign, 2);
	    } else {
	      this.finishOp(types$1.plusMin, 1);
	    }
	  }

	  readToken_lt_gt(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    let size = 1;

	    if (next === code) {
	      size = code === 62 && this.input.charCodeAt(this.state.pos + 2) === 62 ? 3 : 2;

	      if (this.input.charCodeAt(this.state.pos + size) === 61) {
	        this.finishOp(types$1.assign, size + 1);
	        return;
	      }

	      this.finishOp(types$1.bitShift, size);
	      return;
	    }

	    if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.state.pos + 2) === 45 && this.input.charCodeAt(this.state.pos + 3) === 45) {
	      this.skipLineComment(4);
	      this.skipSpace();
	      this.nextToken();
	      return;
	    }

	    if (next === 61) {
	      size = 2;
	    }

	    this.finishOp(types$1.relational, size);
	  }

	  readToken_eq_excl(code) {
	    const next = this.input.charCodeAt(this.state.pos + 1);

	    if (next === 61) {
	      this.finishOp(types$1.equality, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
	      return;
	    }

	    if (code === 61 && next === 62) {
	      this.state.pos += 2;
	      this.finishToken(types$1.arrow);
	      return;
	    }

	    this.finishOp(code === 61 ? types$1.eq : types$1.bang, 1);
	  }

	  readToken_question() {
	    const next = this.input.charCodeAt(this.state.pos + 1);
	    const next2 = this.input.charCodeAt(this.state.pos + 2);

	    if (next === 63) {
	      if (next2 === 61) {
	        this.finishOp(types$1.assign, 3);
	      } else {
	        this.finishOp(types$1.nullishCoalescing, 2);
	      }
	    } else if (next === 46 && !(next2 >= 48 && next2 <= 57)) {
	      this.state.pos += 2;
	      this.finishToken(types$1.questionDot);
	    } else {
	      ++this.state.pos;
	      this.finishToken(types$1.question);
	    }
	  }

	  getTokenFromCode(code) {
	    switch (code) {
	      case 46:
	        this.readToken_dot();
	        return;

	      case 40:
	        ++this.state.pos;
	        this.finishToken(types$1.parenL);
	        return;

	      case 41:
	        ++this.state.pos;
	        this.finishToken(types$1.parenR);
	        return;

	      case 59:
	        ++this.state.pos;
	        this.finishToken(types$1.semi);
	        return;

	      case 44:
	        ++this.state.pos;
	        this.finishToken(types$1.comma);
	        return;

	      case 91:
	        if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
	          if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	            throw this.raise(this.state.pos, ErrorMessages.TupleExpressionBarIncorrectStartSyntaxType);
	          }

	          this.state.pos += 2;
	          this.finishToken(types$1.bracketBarL);
	        } else {
	          ++this.state.pos;
	          this.finishToken(types$1.bracketL);
	        }

	        return;

	      case 93:
	        ++this.state.pos;
	        this.finishToken(types$1.bracketR);
	        return;

	      case 123:
	        if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
	          if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") {
	            throw this.raise(this.state.pos, ErrorMessages.RecordExpressionBarIncorrectStartSyntaxType);
	          }

	          this.state.pos += 2;
	          this.finishToken(types$1.braceBarL);
	        } else {
	          ++this.state.pos;
	          this.finishToken(types$1.braceL);
	        }

	        return;

	      case 125:
	        ++this.state.pos;
	        this.finishToken(types$1.braceR);
	        return;

	      case 58:
	        if (this.hasPlugin("functionBind") && this.input.charCodeAt(this.state.pos + 1) === 58) {
	          this.finishOp(types$1.doubleColon, 2);
	        } else {
	          ++this.state.pos;
	          this.finishToken(types$1.colon);
	        }

	        return;

	      case 63:
	        this.readToken_question();
	        return;

	      case 96:
	        ++this.state.pos;
	        this.finishToken(types$1.backQuote);
	        return;

	      case 48:
	        {
	          const next = this.input.charCodeAt(this.state.pos + 1);

	          if (next === 120 || next === 88) {
	            this.readRadixNumber(16);
	            return;
	          }

	          if (next === 111 || next === 79) {
	            this.readRadixNumber(8);
	            return;
	          }

	          if (next === 98 || next === 66) {
	            this.readRadixNumber(2);
	            return;
	          }
	        }

	      case 49:
	      case 50:
	      case 51:
	      case 52:
	      case 53:
	      case 54:
	      case 55:
	      case 56:
	      case 57:
	        this.readNumber(false);
	        return;

	      case 34:
	      case 39:
	        this.readString(code);
	        return;

	      case 47:
	        this.readToken_slash();
	        return;

	      case 37:
	      case 42:
	        this.readToken_mult_modulo(code);
	        return;

	      case 124:
	      case 38:
	        this.readToken_pipe_amp(code);
	        return;

	      case 94:
	        this.readToken_caret();
	        return;

	      case 43:
	      case 45:
	        this.readToken_plus_min(code);
	        return;

	      case 60:
	      case 62:
	        this.readToken_lt_gt(code);
	        return;

	      case 61:
	      case 33:
	        this.readToken_eq_excl(code);
	        return;

	      case 126:
	        this.finishOp(types$1.tilde, 1);
	        return;

	      case 64:
	        ++this.state.pos;
	        this.finishToken(types$1.at);
	        return;

	      case 35:
	        this.readToken_numberSign();
	        return;

	      case 92:
	        this.readWord();
	        return;

	      default:
	        if (isIdentifierStart(code)) {
	          this.readWord(code);
	          return;
	        }

	    }

	    throw this.raise(this.state.pos, ErrorMessages.InvalidOrUnexpectedToken, String.fromCodePoint(code));
	  }

	  finishOp(type, size) {
	    const str = this.input.slice(this.state.pos, this.state.pos + size);
	    this.state.pos += size;
	    this.finishToken(type, str);
	  }

	  readRegexp() {
	    const start = this.state.start + 1;
	    let escaped, inClass;
	    let {
	      pos
	    } = this.state;

	    for (;; ++pos) {
	      if (pos >= this.length) {
	        throw this.raise(start, ErrorMessages.UnterminatedRegExp);
	      }

	      const ch = this.input.charCodeAt(pos);

	      if (isNewLine(ch)) {
	        throw this.raise(start, ErrorMessages.UnterminatedRegExp);
	      }

	      if (escaped) {
	        escaped = false;
	      } else {
	        if (ch === 91) {
	          inClass = true;
	        } else if (ch === 93 && inClass) {
	          inClass = false;
	        } else if (ch === 47 && !inClass) {
	          break;
	        }

	        escaped = ch === 92;
	      }
	    }

	    const content = this.input.slice(start, pos);
	    ++pos;
	    let mods = "";

	    while (pos < this.length) {
	      const cp = this.codePointAtPos(pos);
	      const char = String.fromCharCode(cp);

	      if (VALID_REGEX_FLAGS.has(cp)) {
	        if (mods.includes(char)) {
	          this.raise(pos + 1, ErrorMessages.DuplicateRegExpFlags);
	        }
	      } else if (isIdentifierChar(cp) || cp === 92) {
	        this.raise(pos + 1, ErrorMessages.MalformedRegExpFlags);
	      } else {
	        break;
	      }

	      ++pos;
	      mods += char;
	    }

	    this.state.pos = pos;
	    this.finishToken(types$1.regexp, {
	      pattern: content,
	      flags: mods
	    });
	  }

	  readInt(radix, len, forceLen, allowNumSeparator = true) {
	    const start = this.state.pos;
	    const forbiddenSiblings = radix === 16 ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct;
	    const allowedSiblings = radix === 16 ? allowedNumericSeparatorSiblings.hex : radix === 10 ? allowedNumericSeparatorSiblings.dec : radix === 8 ? allowedNumericSeparatorSiblings.oct : allowedNumericSeparatorSiblings.bin;
	    let invalid = false;
	    let total = 0;

	    for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
	      const code = this.input.charCodeAt(this.state.pos);
	      let val;

	      if (code === 95) {
	        const prev = this.input.charCodeAt(this.state.pos - 1);
	        const next = this.input.charCodeAt(this.state.pos + 1);

	        if (allowedSiblings.indexOf(next) === -1) {
	          this.raise(this.state.pos, ErrorMessages.UnexpectedNumericSeparator);
	        } else if (forbiddenSiblings.indexOf(prev) > -1 || forbiddenSiblings.indexOf(next) > -1 || Number.isNaN(next)) {
	          this.raise(this.state.pos, ErrorMessages.UnexpectedNumericSeparator);
	        }

	        if (!allowNumSeparator) {
	          this.raise(this.state.pos, ErrorMessages.NumericSeparatorInEscapeSequence);
	        }

	        ++this.state.pos;
	        continue;
	      }

	      if (code >= 97) {
	        val = code - 97 + 10;
	      } else if (code >= 65) {
	        val = code - 65 + 10;
	      } else if (_isDigit(code)) {
	        val = code - 48;
	      } else {
	        val = Infinity;
	      }

	      if (val >= radix) {
	        if (this.options.errorRecovery && val <= 9) {
	          val = 0;
	          this.raise(this.state.start + i + 2, ErrorMessages.InvalidDigit, radix);
	        } else if (forceLen) {
	          val = 0;
	          invalid = true;
	        } else {
	          break;
	        }
	      }

	      ++this.state.pos;
	      total = total * radix + val;
	    }

	    if (this.state.pos === start || len != null && this.state.pos - start !== len || invalid) {
	      return null;
	    }

	    return total;
	  }

	  readRadixNumber(radix) {
	    const start = this.state.pos;
	    let isBigInt = false;
	    this.state.pos += 2;
	    const val = this.readInt(radix);

	    if (val == null) {
	      this.raise(this.state.start + 2, ErrorMessages.InvalidDigit, radix);
	    }

	    const next = this.input.charCodeAt(this.state.pos);

	    if (next === 110) {
	      ++this.state.pos;
	      isBigInt = true;
	    } else if (next === 109) {
	      throw this.raise(start, ErrorMessages.InvalidDecimal);
	    }

	    if (isIdentifierStart(this.codePointAtPos(this.state.pos))) {
	      throw this.raise(this.state.pos, ErrorMessages.NumberIdentifier);
	    }

	    if (isBigInt) {
	      const str = this.input.slice(start, this.state.pos).replace(/[_n]/g, "");
	      this.finishToken(types$1.bigint, str);
	      return;
	    }

	    this.finishToken(types$1.num, val);
	  }

	  readNumber(startsWithDot) {
	    const start = this.state.pos;
	    let isFloat = false;
	    let isBigInt = false;
	    let isDecimal = false;
	    let hasExponent = false;
	    let isOctal = false;

	    if (!startsWithDot && this.readInt(10) === null) {
	      this.raise(start, ErrorMessages.InvalidNumber);
	    }

	    const hasLeadingZero = this.state.pos - start >= 2 && this.input.charCodeAt(start) === 48;

	    if (hasLeadingZero) {
	      const integer = this.input.slice(start, this.state.pos);
	      this.recordStrictModeErrors(start, ErrorMessages.StrictOctalLiteral);

	      if (!this.state.strict) {
	        const underscorePos = integer.indexOf("_");

	        if (underscorePos > 0) {
	          this.raise(underscorePos + start, ErrorMessages.ZeroDigitNumericSeparator);
	        }
	      }

	      isOctal = hasLeadingZero && !/[89]/.test(integer);
	    }

	    let next = this.input.charCodeAt(this.state.pos);

	    if (next === 46 && !isOctal) {
	      ++this.state.pos;
	      this.readInt(10);
	      isFloat = true;
	      next = this.input.charCodeAt(this.state.pos);
	    }

	    if ((next === 69 || next === 101) && !isOctal) {
	      next = this.input.charCodeAt(++this.state.pos);

	      if (next === 43 || next === 45) {
	        ++this.state.pos;
	      }

	      if (this.readInt(10) === null) {
	        this.raise(start, ErrorMessages.InvalidOrMissingExponent);
	      }

	      isFloat = true;
	      hasExponent = true;
	      next = this.input.charCodeAt(this.state.pos);
	    }

	    if (next === 110) {
	      if (isFloat || hasLeadingZero) {
	        this.raise(start, ErrorMessages.InvalidBigIntLiteral);
	      }

	      ++this.state.pos;
	      isBigInt = true;
	    }

	    if (next === 109) {
	      this.expectPlugin("decimal", this.state.pos);

	      if (hasExponent || hasLeadingZero) {
	        this.raise(start, ErrorMessages.InvalidDecimal);
	      }

	      ++this.state.pos;
	      isDecimal = true;
	    }

	    if (isIdentifierStart(this.codePointAtPos(this.state.pos))) {
	      throw this.raise(this.state.pos, ErrorMessages.NumberIdentifier);
	    }

	    const str = this.input.slice(start, this.state.pos).replace(/[_mn]/g, "");

	    if (isBigInt) {
	      this.finishToken(types$1.bigint, str);
	      return;
	    }

	    if (isDecimal) {
	      this.finishToken(types$1.decimal, str);
	      return;
	    }

	    const val = isOctal ? parseInt(str, 8) : parseFloat(str);
	    this.finishToken(types$1.num, val);
	  }

	  readCodePoint(throwOnInvalid) {
	    const ch = this.input.charCodeAt(this.state.pos);
	    let code;

	    if (ch === 123) {
	      const codePos = ++this.state.pos;
	      code = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos, true, throwOnInvalid);
	      ++this.state.pos;

	      if (code !== null && code > 0x10ffff) {
	        if (throwOnInvalid) {
	          this.raise(codePos, ErrorMessages.InvalidCodePoint);
	        } else {
	          return null;
	        }
	      }
	    } else {
	      code = this.readHexChar(4, false, throwOnInvalid);
	    }

	    return code;
	  }

	  readString(quote) {
	    let out = "",
	        chunkStart = ++this.state.pos;

	    for (;;) {
	      if (this.state.pos >= this.length) {
	        throw this.raise(this.state.start, ErrorMessages.UnterminatedString);
	      }

	      const ch = this.input.charCodeAt(this.state.pos);
	      if (ch === quote) break;

	      if (ch === 92) {
	        out += this.input.slice(chunkStart, this.state.pos);
	        out += this.readEscapedChar(false);
	        chunkStart = this.state.pos;
	      } else if (ch === 8232 || ch === 8233) {
	        ++this.state.pos;
	        ++this.state.curLine;
	        this.state.lineStart = this.state.pos;
	      } else if (isNewLine(ch)) {
	        throw this.raise(this.state.start, ErrorMessages.UnterminatedString);
	      } else {
	        ++this.state.pos;
	      }
	    }

	    out += this.input.slice(chunkStart, this.state.pos++);
	    this.finishToken(types$1.string, out);
	  }

	  readTmplToken() {
	    let out = "",
	        chunkStart = this.state.pos,
	        containsInvalid = false;

	    for (;;) {
	      if (this.state.pos >= this.length) {
	        throw this.raise(this.state.start, ErrorMessages.UnterminatedTemplate);
	      }

	      const ch = this.input.charCodeAt(this.state.pos);

	      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.state.pos + 1) === 123) {
	        if (this.state.pos === this.state.start && this.match(types$1.template)) {
	          if (ch === 36) {
	            this.state.pos += 2;
	            this.finishToken(types$1.dollarBraceL);
	            return;
	          } else {
	            ++this.state.pos;
	            this.finishToken(types$1.backQuote);
	            return;
	          }
	        }

	        out += this.input.slice(chunkStart, this.state.pos);
	        this.finishToken(types$1.template, containsInvalid ? null : out);
	        return;
	      }

	      if (ch === 92) {
	        out += this.input.slice(chunkStart, this.state.pos);
	        const escaped = this.readEscapedChar(true);

	        if (escaped === null) {
	          containsInvalid = true;
	        } else {
	          out += escaped;
	        }

	        chunkStart = this.state.pos;
	      } else if (isNewLine(ch)) {
	        out += this.input.slice(chunkStart, this.state.pos);
	        ++this.state.pos;

	        switch (ch) {
	          case 13:
	            if (this.input.charCodeAt(this.state.pos) === 10) {
	              ++this.state.pos;
	            }

	          case 10:
	            out += "\n";
	            break;

	          default:
	            out += String.fromCharCode(ch);
	            break;
	        }

	        ++this.state.curLine;
	        this.state.lineStart = this.state.pos;
	        chunkStart = this.state.pos;
	      } else {
	        ++this.state.pos;
	      }
	    }
	  }

	  recordStrictModeErrors(pos, message) {
	    if (this.state.strict && !this.state.strictErrors.has(pos)) {
	      this.raise(pos, message);
	    } else {
	      this.state.strictErrors.set(pos, message);
	    }
	  }

	  readEscapedChar(inTemplate) {
	    const throwOnInvalid = !inTemplate;
	    const ch = this.input.charCodeAt(++this.state.pos);
	    ++this.state.pos;

	    switch (ch) {
	      case 110:
	        return "\n";

	      case 114:
	        return "\r";

	      case 120:
	        {
	          const code = this.readHexChar(2, false, throwOnInvalid);
	          return code === null ? null : String.fromCharCode(code);
	        }

	      case 117:
	        {
	          const code = this.readCodePoint(throwOnInvalid);
	          return code === null ? null : String.fromCodePoint(code);
	        }

	      case 116:
	        return "\t";

	      case 98:
	        return "\b";

	      case 118:
	        return "\u000b";

	      case 102:
	        return "\f";

	      case 13:
	        if (this.input.charCodeAt(this.state.pos) === 10) {
	          ++this.state.pos;
	        }

	      case 10:
	        this.state.lineStart = this.state.pos;
	        ++this.state.curLine;

	      case 8232:
	      case 8233:
	        return "";

	      case 56:
	      case 57:
	        if (inTemplate) {
	          return null;
	        } else {
	          this.recordStrictModeErrors(this.state.pos - 1, ErrorMessages.StrictNumericEscape);
	        }

	      default:
	        if (ch >= 48 && ch <= 55) {
	          const codePos = this.state.pos - 1;
	          const match = this.input.substr(this.state.pos - 1, 3).match(/^[0-7]+/);
	          let octalStr = match[0];
	          let octal = parseInt(octalStr, 8);

	          if (octal > 255) {
	            octalStr = octalStr.slice(0, -1);
	            octal = parseInt(octalStr, 8);
	          }

	          this.state.pos += octalStr.length - 1;
	          const next = this.input.charCodeAt(this.state.pos);

	          if (octalStr !== "0" || next === 56 || next === 57) {
	            if (inTemplate) {
	              return null;
	            } else {
	              this.recordStrictModeErrors(codePos, ErrorMessages.StrictNumericEscape);
	            }
	          }

	          return String.fromCharCode(octal);
	        }

	        return String.fromCharCode(ch);
	    }
	  }

	  readHexChar(len, forceLen, throwOnInvalid) {
	    const codePos = this.state.pos;
	    const n = this.readInt(16, len, forceLen, false);

	    if (n === null) {
	      if (throwOnInvalid) {
	        this.raise(codePos, ErrorMessages.InvalidEscapeSequence);
	      } else {
	        this.state.pos = codePos - 1;
	      }
	    }

	    return n;
	  }

	  readWord1(firstCode) {
	    this.state.containsEsc = false;
	    let word = "";
	    const start = this.state.pos;
	    let chunkStart = this.state.pos;

	    if (firstCode !== undefined) {
	      this.state.pos += firstCode <= 0xffff ? 1 : 2;
	    }

	    while (this.state.pos < this.length) {
	      const ch = this.codePointAtPos(this.state.pos);

	      if (isIdentifierChar(ch)) {
	        this.state.pos += ch <= 0xffff ? 1 : 2;
	      } else if (ch === 92) {
	        this.state.containsEsc = true;
	        word += this.input.slice(chunkStart, this.state.pos);
	        const escStart = this.state.pos;
	        const identifierCheck = this.state.pos === start ? isIdentifierStart : isIdentifierChar;

	        if (this.input.charCodeAt(++this.state.pos) !== 117) {
	          this.raise(this.state.pos, ErrorMessages.MissingUnicodeEscape);
	          chunkStart = this.state.pos - 1;
	          continue;
	        }

	        ++this.state.pos;
	        const esc = this.readCodePoint(true);

	        if (esc !== null) {
	          if (!identifierCheck(esc)) {
	            this.raise(escStart, ErrorMessages.EscapedCharNotAnIdentifier);
	          }

	          word += String.fromCodePoint(esc);
	        }

	        chunkStart = this.state.pos;
	      } else {
	        break;
	      }
	    }

	    return word + this.input.slice(chunkStart, this.state.pos);
	  }

	  readWord(firstCode) {
	    const word = this.readWord1(firstCode);
	    const type = keywords$1.get(word) || types$1.name;
	    this.finishToken(type, word);
	  }

	  checkKeywordEscapes() {
	    const kw = this.state.type.keyword;

	    if (kw && this.state.containsEsc) {
	      this.raise(this.state.start, ErrorMessages.InvalidEscapedReservedWord, kw);
	    }
	  }

	  updateContext(prevType) {
	    var _this$state$type$upda, _this$state$type;

	    (_this$state$type$upda = (_this$state$type = this.state.type).updateContext) == null ? void 0 : _this$state$type$upda.call(_this$state$type, this.state.context);
	  }

	}

	class ClassScope {
	  constructor() {
	    this.privateNames = new Set();
	    this.loneAccessors = new Map();
	    this.undefinedPrivateNames = new Map();
	  }

	}
	class ClassScopeHandler {
	  constructor(raise) {
	    this.stack = [];
	    this.undefinedPrivateNames = new Map();
	    this.raise = raise;
	  }

	  current() {
	    return this.stack[this.stack.length - 1];
	  }

	  enter() {
	    this.stack.push(new ClassScope());
	  }

	  exit() {
	    const oldClassScope = this.stack.pop();
	    const current = this.current();

	    for (const [name, pos] of Array.from(oldClassScope.undefinedPrivateNames)) {
	      if (current) {
	        if (!current.undefinedPrivateNames.has(name)) {
	          current.undefinedPrivateNames.set(name, pos);
	        }
	      } else {
	        this.raise(pos, ErrorMessages.InvalidPrivateFieldResolution, name);
	      }
	    }
	  }

	  declarePrivateName(name, elementType, pos) {
	    const classScope = this.current();
	    let redefined = classScope.privateNames.has(name);

	    if (elementType & CLASS_ELEMENT_KIND_ACCESSOR) {
	      const accessor = redefined && classScope.loneAccessors.get(name);

	      if (accessor) {
	        const oldStatic = accessor & CLASS_ELEMENT_FLAG_STATIC;
	        const newStatic = elementType & CLASS_ELEMENT_FLAG_STATIC;
	        const oldKind = accessor & CLASS_ELEMENT_KIND_ACCESSOR;
	        const newKind = elementType & CLASS_ELEMENT_KIND_ACCESSOR;
	        redefined = oldKind === newKind || oldStatic !== newStatic;
	        if (!redefined) classScope.loneAccessors.delete(name);
	      } else if (!redefined) {
	        classScope.loneAccessors.set(name, elementType);
	      }
	    }

	    if (redefined) {
	      this.raise(pos, ErrorMessages.PrivateNameRedeclaration, name);
	    }

	    classScope.privateNames.add(name);
	    classScope.undefinedPrivateNames.delete(name);
	  }

	  usePrivateName(name, pos) {
	    let classScope;

	    for (classScope of this.stack) {
	      if (classScope.privateNames.has(name)) return;
	    }

	    if (classScope) {
	      classScope.undefinedPrivateNames.set(name, pos);
	    } else {
	      this.raise(pos, ErrorMessages.InvalidPrivateFieldResolution, name);
	    }
	  }

	}

	const kExpression = 0,
	      kMaybeArrowParameterDeclaration = 1,
	      kMaybeAsyncArrowParameterDeclaration = 2,
	      kParameterDeclaration = 3;

	class ExpressionScope {
	  constructor(type = kExpression) {
	    this.type = void 0;
	    this.type = type;
	  }

	  canBeArrowParameterDeclaration() {
	    return this.type === kMaybeAsyncArrowParameterDeclaration || this.type === kMaybeArrowParameterDeclaration;
	  }

	  isCertainlyParameterDeclaration() {
	    return this.type === kParameterDeclaration;
	  }

	}

	class ArrowHeadParsingScope extends ExpressionScope {
	  constructor(type) {
	    super(type);
	    this.errors = new Map();
	  }

	  recordDeclarationError(pos, template) {
	    this.errors.set(pos, template);
	  }

	  clearDeclarationError(pos) {
	    this.errors.delete(pos);
	  }

	  iterateErrors(iterator) {
	    this.errors.forEach(iterator);
	  }

	}

	class ExpressionScopeHandler {
	  constructor(raise) {
	    this.stack = [new ExpressionScope()];
	    this.raise = raise;
	  }

	  enter(scope) {
	    this.stack.push(scope);
	  }

	  exit() {
	    this.stack.pop();
	  }

	  recordParameterInitializerError(pos, template) {
	    const {
	      stack
	    } = this;
	    let i = stack.length - 1;
	    let scope = stack[i];

	    while (!scope.isCertainlyParameterDeclaration()) {
	      if (scope.canBeArrowParameterDeclaration()) {
	        scope.recordDeclarationError(pos, template);
	      } else {
	        return;
	      }

	      scope = stack[--i];
	    }

	    this.raise(pos, template);
	  }

	  recordParenthesizedIdentifierError(pos, template) {
	    const {
	      stack
	    } = this;
	    const scope = stack[stack.length - 1];

	    if (scope.isCertainlyParameterDeclaration()) {
	      this.raise(pos, template);
	    } else if (scope.canBeArrowParameterDeclaration()) {
	      scope.recordDeclarationError(pos, template);
	    } else {
	      return;
	    }
	  }

	  recordAsyncArrowParametersError(pos, template) {
	    const {
	      stack
	    } = this;
	    let i = stack.length - 1;
	    let scope = stack[i];

	    while (scope.canBeArrowParameterDeclaration()) {
	      if (scope.type === kMaybeAsyncArrowParameterDeclaration) {
	        scope.recordDeclarationError(pos, template);
	      }

	      scope = stack[--i];
	    }
	  }

	  validateAsPattern() {
	    const {
	      stack
	    } = this;
	    const currentScope = stack[stack.length - 1];
	    if (!currentScope.canBeArrowParameterDeclaration()) return;
	    currentScope.iterateErrors((template, pos) => {
	      this.raise(pos, template);
	      let i = stack.length - 2;
	      let scope = stack[i];

	      while (scope.canBeArrowParameterDeclaration()) {
	        scope.clearDeclarationError(pos);
	        scope = stack[--i];
	      }
	    });
	  }

	}
	function newParameterDeclarationScope() {
	  return new ExpressionScope(kParameterDeclaration);
	}
	function newArrowHeadScope() {
	  return new ArrowHeadParsingScope(kMaybeArrowParameterDeclaration);
	}
	function newAsyncArrowScope() {
	  return new ArrowHeadParsingScope(kMaybeAsyncArrowParameterDeclaration);
	}
	function newExpressionScope() {
	  return new ExpressionScope();
	}

	class UtilParser extends Tokenizer {
	  addExtra(node, key, val) {
	    if (!node) return;
	    const extra = node.extra = node.extra || {};
	    extra[key] = val;
	  }

	  isRelational(op) {
	    return this.match(types$1.relational) && this.state.value === op;
	  }

	  expectRelational(op) {
	    if (this.isRelational(op)) {
	      this.next();
	    } else {
	      this.unexpected(null, types$1.relational);
	    }
	  }

	  isContextual(name) {
	    return this.match(types$1.name) && this.state.value === name && !this.state.containsEsc;
	  }

	  isUnparsedContextual(nameStart, name) {
	    const nameEnd = nameStart + name.length;

	    if (this.input.slice(nameStart, nameEnd) === name) {
	      const nextCh = this.input.charCodeAt(nameEnd);
	      return !(isIdentifierChar(nextCh) || (nextCh & 0xfc00) === 0xd800);
	    }

	    return false;
	  }

	  isLookaheadContextual(name) {
	    const next = this.nextTokenStart();
	    return this.isUnparsedContextual(next, name);
	  }

	  eatContextual(name) {
	    return this.isContextual(name) && this.eat(types$1.name);
	  }

	  expectContextual(name, template) {
	    if (!this.eatContextual(name)) this.unexpected(null, template);
	  }

	  canInsertSemicolon() {
	    return this.match(types$1.eof) || this.match(types$1.braceR) || this.hasPrecedingLineBreak();
	  }

	  hasPrecedingLineBreak() {
	    return lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
	  }

	  hasFollowingLineBreak() {
	    return lineBreak.test(this.input.slice(this.state.end, this.nextTokenStart()));
	  }

	  isLineTerminator() {
	    return this.eat(types$1.semi) || this.canInsertSemicolon();
	  }

	  semicolon(allowAsi = true) {
	    if (allowAsi ? this.isLineTerminator() : this.eat(types$1.semi)) return;
	    this.raise(this.state.lastTokEnd, ErrorMessages.MissingSemicolon);
	  }

	  expect(type, pos) {
	    this.eat(type) || this.unexpected(pos, type);
	  }

	  assertNoSpace(message = "Unexpected space.") {
	    if (this.state.start > this.state.lastTokEnd) {
	      this.raise(this.state.lastTokEnd, {
	        code: ErrorCodes.SyntaxError,
	        reasonCode: "UnexpectedSpace",
	        template: message
	      });
	    }
	  }

	  unexpected(pos, messageOrType = {
	    code: ErrorCodes.SyntaxError,
	    reasonCode: "UnexpectedToken",
	    template: "Unexpected token"
	  }) {
	    if (messageOrType instanceof TokenType) {
	      messageOrType = {
	        code: ErrorCodes.SyntaxError,
	        reasonCode: "UnexpectedToken",
	        template: `Unexpected token, expected "${messageOrType.label}"`
	      };
	    }

	    throw this.raise(pos != null ? pos : this.state.start, messageOrType);
	  }

	  expectPlugin(name, pos) {
	    if (!this.hasPlugin(name)) {
	      throw this.raiseWithData(pos != null ? pos : this.state.start, {
	        missingPlugin: [name]
	      }, `This experimental syntax requires enabling the parser plugin: '${name}'`);
	    }

	    return true;
	  }

	  expectOnePlugin(names, pos) {
	    if (!names.some(n => this.hasPlugin(n))) {
	      throw this.raiseWithData(pos != null ? pos : this.state.start, {
	        missingPlugin: names
	      }, `This experimental syntax requires enabling one of the following parser plugin(s): '${names.join(", ")}'`);
	    }
	  }

	  tryParse(fn, oldState = this.state.clone()) {
	    const abortSignal = {
	      node: null
	    };

	    try {
	      const node = fn((node = null) => {
	        abortSignal.node = node;
	        throw abortSignal;
	      });

	      if (this.state.errors.length > oldState.errors.length) {
	        const failState = this.state;
	        this.state = oldState;
	        this.state.tokensLength = failState.tokensLength;
	        return {
	          node,
	          error: failState.errors[oldState.errors.length],
	          thrown: false,
	          aborted: false,
	          failState
	        };
	      }

	      return {
	        node,
	        error: null,
	        thrown: false,
	        aborted: false,
	        failState: null
	      };
	    } catch (error) {
	      const failState = this.state;
	      this.state = oldState;

	      if (error instanceof SyntaxError) {
	        return {
	          node: null,
	          error,
	          thrown: true,
	          aborted: false,
	          failState
	        };
	      }

	      if (error === abortSignal) {
	        return {
	          node: abortSignal.node,
	          error: null,
	          thrown: false,
	          aborted: true,
	          failState
	        };
	      }

	      throw error;
	    }
	  }

	  checkExpressionErrors(refExpressionErrors, andThrow) {
	    if (!refExpressionErrors) return false;
	    const {
	      shorthandAssign,
	      doubleProto,
	      optionalParameters
	    } = refExpressionErrors;

	    if (!andThrow) {
	      return shorthandAssign >= 0 || doubleProto >= 0 || optionalParameters >= 0;
	    }

	    if (shorthandAssign >= 0) {
	      this.unexpected(shorthandAssign);
	    }

	    if (doubleProto >= 0) {
	      this.raise(doubleProto, ErrorMessages.DuplicateProto);
	    }

	    if (optionalParameters >= 0) {
	      this.unexpected(optionalParameters);
	    }
	  }

	  isLiteralPropertyName() {
	    return this.match(types$1.name) || !!this.state.type.keyword || this.match(types$1.string) || this.match(types$1.num) || this.match(types$1.bigint) || this.match(types$1.decimal);
	  }

	  isPrivateName(node) {
	    return node.type === "PrivateName";
	  }

	  getPrivateNameSV(node) {
	    return node.id.name;
	  }

	  hasPropertyAsPrivateName(node) {
	    return (node.type === "MemberExpression" || node.type === "OptionalMemberExpression") && this.isPrivateName(node.property);
	  }

	  isOptionalChain(node) {
	    return node.type === "OptionalMemberExpression" || node.type === "OptionalCallExpression";
	  }

	  isObjectProperty(node) {
	    return node.type === "ObjectProperty";
	  }

	  isObjectMethod(node) {
	    return node.type === "ObjectMethod";
	  }

	  initializeScopes(inModule = this.options.sourceType === "module") {
	    const oldLabels = this.state.labels;
	    this.state.labels = [];
	    const oldExportedIdentifiers = this.exportedIdentifiers;
	    this.exportedIdentifiers = new Set();
	    const oldInModule = this.inModule;
	    this.inModule = inModule;
	    const oldScope = this.scope;
	    const ScopeHandler = this.getScopeHandler();
	    this.scope = new ScopeHandler(this.raise.bind(this), this.inModule);
	    const oldProdParam = this.prodParam;
	    this.prodParam = new ProductionParameterHandler();
	    const oldClassScope = this.classScope;
	    this.classScope = new ClassScopeHandler(this.raise.bind(this));
	    const oldExpressionScope = this.expressionScope;
	    this.expressionScope = new ExpressionScopeHandler(this.raise.bind(this));
	    return () => {
	      this.state.labels = oldLabels;
	      this.exportedIdentifiers = oldExportedIdentifiers;
	      this.inModule = oldInModule;
	      this.scope = oldScope;
	      this.prodParam = oldProdParam;
	      this.classScope = oldClassScope;
	      this.expressionScope = oldExpressionScope;
	    };
	  }

	  enterInitialScopes() {
	    let paramFlags = PARAM;

	    if (this.hasPlugin("topLevelAwait") && this.inModule) {
	      paramFlags |= PARAM_AWAIT;
	    }

	    this.scope.enter(SCOPE_PROGRAM);
	    this.prodParam.enter(paramFlags);
	  }

	}
	class ExpressionErrors {
	  constructor() {
	    this.shorthandAssign = -1;
	    this.doubleProto = -1;
	    this.optionalParameters = -1;
	  }

	}

	class Node {
	  constructor(parser, pos, loc) {
	    this.type = void 0;
	    this.start = void 0;
	    this.end = void 0;
	    this.loc = void 0;
	    this.range = void 0;
	    this.leadingComments = void 0;
	    this.trailingComments = void 0;
	    this.innerComments = void 0;
	    this.extra = void 0;
	    this.type = "";
	    this.start = pos;
	    this.end = 0;
	    this.loc = new SourceLocation(loc);
	    if (parser != null && parser.options.ranges) this.range = [pos, 0];
	    if (parser != null && parser.filename) this.loc.filename = parser.filename;
	  }

	  __clone() {
	    const newNode = new Node();
	    const keys = Object.keys(this);

	    for (let i = 0, length = keys.length; i < length; i++) {
	      const key = keys[i];

	      if (key !== "leadingComments" && key !== "trailingComments" && key !== "innerComments") {
	        newNode[key] = this[key];
	      }
	    }

	    return newNode;
	  }

	}

	class NodeUtils extends UtilParser {
	  startNode() {
	    return new Node(this, this.state.start, this.state.startLoc);
	  }

	  startNodeAt(pos, loc) {
	    return new Node(this, pos, loc);
	  }

	  startNodeAtNode(type) {
	    return this.startNodeAt(type.start, type.loc.start);
	  }

	  finishNode(node, type) {
	    return this.finishNodeAt(node, type, this.state.lastTokEnd, this.state.lastTokEndLoc);
	  }

	  finishNodeAt(node, type, pos, loc) {

	    node.type = type;
	    node.end = pos;
	    node.loc.end = loc;
	    if (this.options.ranges) node.range[1] = pos;
	    this.processComment(node);
	    return node;
	  }

	  resetStartLocation(node, start, startLoc) {
	    node.start = start;
	    node.loc.start = startLoc;
	    if (this.options.ranges) node.range[0] = start;
	  }

	  resetEndLocation(node, end = this.state.lastTokEnd, endLoc = this.state.lastTokEndLoc) {
	    node.end = end;
	    node.loc.end = endLoc;
	    if (this.options.ranges) node.range[1] = end;
	  }

	  resetStartLocationFromNode(node, locationNode) {
	    this.resetStartLocation(node, locationNode.start, locationNode.loc.start);
	  }

	}

	const unwrapParenthesizedExpression = node => {
	  return node.type === "ParenthesizedExpression" ? unwrapParenthesizedExpression(node.expression) : node;
	};

	class LValParser extends NodeUtils {
	  toAssignable(node, isLHS = false) {
	    var _node$extra, _node$extra3;

	    let parenthesized = undefined;

	    if (node.type === "ParenthesizedExpression" || (_node$extra = node.extra) != null && _node$extra.parenthesized) {
	      parenthesized = unwrapParenthesizedExpression(node);

	      if (isLHS) {
	        if (parenthesized.type === "Identifier") {
	          this.expressionScope.recordParenthesizedIdentifierError(node.start, ErrorMessages.InvalidParenthesizedAssignment);
	        } else if (parenthesized.type !== "MemberExpression") {
	          this.raise(node.start, ErrorMessages.InvalidParenthesizedAssignment);
	        }
	      } else {
	        this.raise(node.start, ErrorMessages.InvalidParenthesizedAssignment);
	      }
	    }

	    switch (node.type) {
	      case "Identifier":
	      case "ObjectPattern":
	      case "ArrayPattern":
	      case "AssignmentPattern":
	        break;

	      case "ObjectExpression":
	        node.type = "ObjectPattern";

	        for (let i = 0, length = node.properties.length, last = length - 1; i < length; i++) {
	          var _node$extra2;

	          const prop = node.properties[i];
	          const isLast = i === last;
	          this.toAssignableObjectExpressionProp(prop, isLast, isLHS);

	          if (isLast && prop.type === "RestElement" && (_node$extra2 = node.extra) != null && _node$extra2.trailingComma) {
	            this.raiseRestNotLast(node.extra.trailingComma);
	          }
	        }

	        break;

	      case "ObjectProperty":
	        this.toAssignable(node.value, isLHS);
	        break;

	      case "SpreadElement":
	        {
	          this.checkToRestConversion(node);
	          node.type = "RestElement";
	          const arg = node.argument;
	          this.toAssignable(arg, isLHS);
	          break;
	        }

	      case "ArrayExpression":
	        node.type = "ArrayPattern";
	        this.toAssignableList(node.elements, (_node$extra3 = node.extra) == null ? void 0 : _node$extra3.trailingComma, isLHS);
	        break;

	      case "AssignmentExpression":
	        if (node.operator !== "=") {
	          this.raise(node.left.end, ErrorMessages.MissingEqInAssignment);
	        }

	        node.type = "AssignmentPattern";
	        delete node.operator;
	        this.toAssignable(node.left, isLHS);
	        break;

	      case "ParenthesizedExpression":
	        this.toAssignable(parenthesized, isLHS);
	        break;
	    }

	    return node;
	  }

	  toAssignableObjectExpressionProp(prop, isLast, isLHS) {
	    if (prop.type === "ObjectMethod") {
	      const error = prop.kind === "get" || prop.kind === "set" ? ErrorMessages.PatternHasAccessor : ErrorMessages.PatternHasMethod;
	      this.raise(prop.key.start, error);
	    } else if (prop.type === "SpreadElement" && !isLast) {
	      this.raiseRestNotLast(prop.start);
	    } else {
	      this.toAssignable(prop, isLHS);
	    }
	  }

	  toAssignableList(exprList, trailingCommaPos, isLHS) {
	    let end = exprList.length;

	    if (end) {
	      const last = exprList[end - 1];

	      if ((last == null ? void 0 : last.type) === "RestElement") {
	        --end;
	      } else if ((last == null ? void 0 : last.type) === "SpreadElement") {
	        last.type = "RestElement";
	        let arg = last.argument;
	        this.toAssignable(arg, isLHS);
	        arg = unwrapParenthesizedExpression(arg);

	        if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern" && arg.type !== "ObjectPattern") {
	          this.unexpected(arg.start);
	        }

	        if (trailingCommaPos) {
	          this.raiseTrailingCommaAfterRest(trailingCommaPos);
	        }

	        --end;
	      }
	    }

	    for (let i = 0; i < end; i++) {
	      const elt = exprList[i];

	      if (elt) {
	        this.toAssignable(elt, isLHS);

	        if (elt.type === "RestElement") {
	          this.raiseRestNotLast(elt.start);
	        }
	      }
	    }

	    return exprList;
	  }

	  toReferencedList(exprList, isParenthesizedExpr) {
	    return exprList;
	  }

	  toReferencedListDeep(exprList, isParenthesizedExpr) {
	    this.toReferencedList(exprList, isParenthesizedExpr);

	    for (const expr of exprList) {
	      if ((expr == null ? void 0 : expr.type) === "ArrayExpression") {
	        this.toReferencedListDeep(expr.elements);
	      }
	    }
	  }

	  parseSpread(refExpressionErrors, refNeedsArrowPos) {
	    const node = this.startNode();
	    this.next();
	    node.argument = this.parseMaybeAssignAllowIn(refExpressionErrors, undefined, refNeedsArrowPos);
	    return this.finishNode(node, "SpreadElement");
	  }

	  parseRestBinding() {
	    const node = this.startNode();
	    this.next();
	    node.argument = this.parseBindingAtom();
	    return this.finishNode(node, "RestElement");
	  }

	  parseBindingAtom() {
	    switch (this.state.type) {
	      case types$1.bracketL:
	        {
	          const node = this.startNode();
	          this.next();
	          node.elements = this.parseBindingList(types$1.bracketR, 93, true);
	          return this.finishNode(node, "ArrayPattern");
	        }

	      case types$1.braceL:
	        return this.parseObjectLike(types$1.braceR, true);
	    }

	    return this.parseIdentifier();
	  }

	  parseBindingList(close, closeCharCode, allowEmpty, allowModifiers) {
	    const elts = [];
	    let first = true;

	    while (!this.eat(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(types$1.comma);
	      }

	      if (allowEmpty && this.match(types$1.comma)) {
	        elts.push(null);
	      } else if (this.eat(close)) {
	        break;
	      } else if (this.match(types$1.ellipsis)) {
	        elts.push(this.parseAssignableListItemTypes(this.parseRestBinding()));
	        this.checkCommaAfterRest(closeCharCode);
	        this.expect(close);
	        break;
	      } else {
	        const decorators = [];

	        if (this.match(types$1.at) && this.hasPlugin("decorators")) {
	          this.raise(this.state.start, ErrorMessages.UnsupportedParameterDecorator);
	        }

	        while (this.match(types$1.at)) {
	          decorators.push(this.parseDecorator());
	        }

	        elts.push(this.parseAssignableListItem(allowModifiers, decorators));
	      }
	    }

	    return elts;
	  }

	  parseAssignableListItem(allowModifiers, decorators) {
	    const left = this.parseMaybeDefault();
	    this.parseAssignableListItemTypes(left);
	    const elt = this.parseMaybeDefault(left.start, left.loc.start, left);

	    if (decorators.length) {
	      left.decorators = decorators;
	    }

	    return elt;
	  }

	  parseAssignableListItemTypes(param) {
	    return param;
	  }

	  parseMaybeDefault(startPos, startLoc, left) {
	    var _startLoc, _startPos, _left;

	    startLoc = (_startLoc = startLoc) != null ? _startLoc : this.state.startLoc;
	    startPos = (_startPos = startPos) != null ? _startPos : this.state.start;
	    left = (_left = left) != null ? _left : this.parseBindingAtom();
	    if (!this.eat(types$1.eq)) return left;
	    const node = this.startNodeAt(startPos, startLoc);
	    node.left = left;
	    node.right = this.parseMaybeAssignAllowIn();
	    return this.finishNode(node, "AssignmentPattern");
	  }

	  checkLVal(expr, contextDescription, bindingType = BIND_NONE, checkClashes, disallowLetBinding, strictModeChanged = false) {
	    switch (expr.type) {
	      case "Identifier":
	        {
	          const {
	            name
	          } = expr;

	          if (this.state.strict && (strictModeChanged ? isStrictBindReservedWord(name, this.inModule) : isStrictBindOnlyReservedWord(name))) {
	            this.raise(expr.start, bindingType === BIND_NONE ? ErrorMessages.StrictEvalArguments : ErrorMessages.StrictEvalArgumentsBinding, name);
	          }

	          if (checkClashes) {
	            if (checkClashes.has(name)) {
	              this.raise(expr.start, ErrorMessages.ParamDupe);
	            } else {
	              checkClashes.add(name);
	            }
	          }

	          if (disallowLetBinding && name === "let") {
	            this.raise(expr.start, ErrorMessages.LetInLexicalBinding);
	          }

	          if (!(bindingType & BIND_NONE)) {
	            this.scope.declareName(name, bindingType, expr.start);
	          }

	          break;
	        }

	      case "MemberExpression":
	        if (bindingType !== BIND_NONE) {
	          this.raise(expr.start, ErrorMessages.InvalidPropertyBindingPattern);
	        }

	        break;

	      case "ObjectPattern":
	        for (let prop of expr.properties) {
	          if (this.isObjectProperty(prop)) prop = prop.value;else if (this.isObjectMethod(prop)) continue;
	          this.checkLVal(prop, "object destructuring pattern", bindingType, checkClashes, disallowLetBinding);
	        }

	        break;

	      case "ArrayPattern":
	        for (const elem of expr.elements) {
	          if (elem) {
	            this.checkLVal(elem, "array destructuring pattern", bindingType, checkClashes, disallowLetBinding);
	          }
	        }

	        break;

	      case "AssignmentPattern":
	        this.checkLVal(expr.left, "assignment pattern", bindingType, checkClashes);
	        break;

	      case "RestElement":
	        this.checkLVal(expr.argument, "rest element", bindingType, checkClashes);
	        break;

	      case "ParenthesizedExpression":
	        this.checkLVal(expr.expression, "parenthesized expression", bindingType, checkClashes);
	        break;

	      default:
	        {
	          this.raise(expr.start, bindingType === BIND_NONE ? ErrorMessages.InvalidLhs : ErrorMessages.InvalidLhsBinding, contextDescription);
	        }
	    }
	  }

	  checkToRestConversion(node) {
	    if (node.argument.type !== "Identifier" && node.argument.type !== "MemberExpression") {
	      this.raise(node.argument.start, ErrorMessages.InvalidRestAssignmentPattern);
	    }
	  }

	  checkCommaAfterRest(close) {
	    if (this.match(types$1.comma)) {
	      if (this.lookaheadCharCode() === close) {
	        this.raiseTrailingCommaAfterRest(this.state.start);
	      } else {
	        this.raiseRestNotLast(this.state.start);
	      }
	    }
	  }

	  raiseRestNotLast(pos) {
	    throw this.raise(pos, ErrorMessages.ElementAfterRest);
	  }

	  raiseTrailingCommaAfterRest(pos) {
	    this.raise(pos, ErrorMessages.RestTrailingComma);
	  }

	}

	class ExpressionParser extends LValParser {
	  checkProto(prop, isRecord, protoRef, refExpressionErrors) {
	    if (prop.type === "SpreadElement" || this.isObjectMethod(prop) || prop.computed || prop.shorthand) {
	      return;
	    }

	    const key = prop.key;
	    const name = key.type === "Identifier" ? key.name : key.value;

	    if (name === "__proto__") {
	      if (isRecord) {
	        this.raise(key.start, ErrorMessages.RecordNoProto);
	        return;
	      }

	      if (protoRef.used) {
	        if (refExpressionErrors) {
	          if (refExpressionErrors.doubleProto === -1) {
	            refExpressionErrors.doubleProto = key.start;
	          }
	        } else {
	          this.raise(key.start, ErrorMessages.DuplicateProto);
	        }
	      }

	      protoRef.used = true;
	    }
	  }

	  shouldExitDescending(expr, potentialArrowAt) {
	    return expr.type === "ArrowFunctionExpression" && expr.start === potentialArrowAt;
	  }

	  getExpression() {
	    let paramFlags = PARAM;

	    if (this.hasPlugin("topLevelAwait") && this.inModule) {
	      paramFlags |= PARAM_AWAIT;
	    }

	    this.scope.enter(SCOPE_PROGRAM);
	    this.prodParam.enter(paramFlags);
	    this.nextToken();
	    const expr = this.parseExpression();

	    if (!this.match(types$1.eof)) {
	      this.unexpected();
	    }

	    expr.comments = this.state.comments;
	    expr.errors = this.state.errors;

	    if (this.options.tokens) {
	      expr.tokens = this.tokens;
	    }

	    return expr;
	  }

	  parseExpression(disallowIn, refExpressionErrors) {
	    if (disallowIn) {
	      return this.disallowInAnd(() => this.parseExpressionBase(refExpressionErrors));
	    }

	    return this.allowInAnd(() => this.parseExpressionBase(refExpressionErrors));
	  }

	  parseExpressionBase(refExpressionErrors) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const expr = this.parseMaybeAssign(refExpressionErrors);

	    if (this.match(types$1.comma)) {
	      const node = this.startNodeAt(startPos, startLoc);
	      node.expressions = [expr];

	      while (this.eat(types$1.comma)) {
	        node.expressions.push(this.parseMaybeAssign(refExpressionErrors));
	      }

	      this.toReferencedList(node.expressions);
	      return this.finishNode(node, "SequenceExpression");
	    }

	    return expr;
	  }

	  parseMaybeAssignDisallowIn(refExpressionErrors, afterLeftParse) {
	    return this.disallowInAnd(() => this.parseMaybeAssign(refExpressionErrors, afterLeftParse));
	  }

	  parseMaybeAssignAllowIn(refExpressionErrors, afterLeftParse) {
	    return this.allowInAnd(() => this.parseMaybeAssign(refExpressionErrors, afterLeftParse));
	  }

	  setOptionalParametersError(refExpressionErrors, resultError) {
	    var _resultError$pos;

	    refExpressionErrors.optionalParameters = (_resultError$pos = resultError == null ? void 0 : resultError.pos) != null ? _resultError$pos : this.state.start;
	  }

	  parseMaybeAssign(refExpressionErrors, afterLeftParse) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;

	    if (this.isContextual("yield")) {
	      if (this.prodParam.hasYield) {
	        let left = this.parseYield();

	        if (afterLeftParse) {
	          left = afterLeftParse.call(this, left, startPos, startLoc);
	        }

	        return left;
	      }
	    }

	    let ownExpressionErrors;

	    if (refExpressionErrors) {
	      ownExpressionErrors = false;
	    } else {
	      refExpressionErrors = new ExpressionErrors();
	      ownExpressionErrors = true;
	    }

	    if (this.match(types$1.parenL) || this.match(types$1.name)) {
	      this.state.potentialArrowAt = this.state.start;
	    }

	    let left = this.parseMaybeConditional(refExpressionErrors);

	    if (afterLeftParse) {
	      left = afterLeftParse.call(this, left, startPos, startLoc);
	    }

	    if (this.state.type.isAssign) {
	      const node = this.startNodeAt(startPos, startLoc);
	      const operator = this.state.value;
	      node.operator = operator;

	      if (this.match(types$1.eq)) {
	        node.left = this.toAssignable(left, true);
	        refExpressionErrors.doubleProto = -1;
	      } else {
	        node.left = left;
	      }

	      if (refExpressionErrors.shorthandAssign >= node.left.start) {
	        refExpressionErrors.shorthandAssign = -1;
	      }

	      this.checkLVal(left, "assignment expression");
	      this.next();
	      node.right = this.parseMaybeAssign();
	      return this.finishNode(node, "AssignmentExpression");
	    } else if (ownExpressionErrors) {
	      this.checkExpressionErrors(refExpressionErrors, true);
	    }

	    return left;
	  }

	  parseMaybeConditional(refExpressionErrors) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const potentialArrowAt = this.state.potentialArrowAt;
	    const expr = this.parseExprOps(refExpressionErrors);

	    if (this.shouldExitDescending(expr, potentialArrowAt)) {
	      return expr;
	    }

	    return this.parseConditional(expr, startPos, startLoc, refExpressionErrors);
	  }

	  parseConditional(expr, startPos, startLoc, refExpressionErrors) {
	    if (this.eat(types$1.question)) {
	      const node = this.startNodeAt(startPos, startLoc);
	      node.test = expr;
	      node.consequent = this.parseMaybeAssignAllowIn();
	      this.expect(types$1.colon);
	      node.alternate = this.parseMaybeAssign();
	      return this.finishNode(node, "ConditionalExpression");
	    }

	    return expr;
	  }

	  parseExprOps(refExpressionErrors) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const potentialArrowAt = this.state.potentialArrowAt;
	    const expr = this.parseMaybeUnary(refExpressionErrors);

	    if (this.shouldExitDescending(expr, potentialArrowAt)) {
	      return expr;
	    }

	    return this.parseExprOp(expr, startPos, startLoc, -1);
	  }

	  parseExprOp(left, leftStartPos, leftStartLoc, minPrec) {
	    let prec = this.state.type.binop;

	    if (prec != null && (this.prodParam.hasIn || !this.match(types$1._in))) {
	      if (prec > minPrec) {
	        const op = this.state.type;

	        if (op === types$1.pipeline) {
	          this.expectPlugin("pipelineOperator");

	          if (this.state.inFSharpPipelineDirectBody) {
	            return left;
	          }

	          this.state.inPipeline = true;
	          this.checkPipelineAtInfixOperator(left, leftStartPos);
	        }

	        const node = this.startNodeAt(leftStartPos, leftStartLoc);
	        node.left = left;
	        node.operator = this.state.value;
	        const logical = op === types$1.logicalOR || op === types$1.logicalAND;
	        const coalesce = op === types$1.nullishCoalescing;

	        if (coalesce) {
	          prec = types$1.logicalAND.binop;
	        }

	        this.next();

	        if (op === types$1.pipeline && this.getPluginOption("pipelineOperator", "proposal") === "minimal") {
	          if (this.match(types$1.name) && this.state.value === "await" && this.prodParam.hasAwait) {
	            throw this.raise(this.state.start, ErrorMessages.UnexpectedAwaitAfterPipelineBody);
	          }
	        }

	        node.right = this.parseExprOpRightExpr(op, prec);
	        this.finishNode(node, logical || coalesce ? "LogicalExpression" : "BinaryExpression");
	        const nextOp = this.state.type;

	        if (coalesce && (nextOp === types$1.logicalOR || nextOp === types$1.logicalAND) || logical && nextOp === types$1.nullishCoalescing) {
	          throw this.raise(this.state.start, ErrorMessages.MixingCoalesceWithLogical);
	        }

	        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec);
	      }
	    }

	    return left;
	  }

	  parseExprOpRightExpr(op, prec) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;

	    switch (op) {
	      case types$1.pipeline:
	        switch (this.getPluginOption("pipelineOperator", "proposal")) {
	          case "smart":
	            return this.withTopicPermittingContext(() => {
	              return this.parseSmartPipelineBody(this.parseExprOpBaseRightExpr(op, prec), startPos, startLoc);
	            });

	          case "fsharp":
	            return this.withSoloAwaitPermittingContext(() => {
	              return this.parseFSharpPipelineBody(prec);
	            });
	        }

	      default:
	        return this.parseExprOpBaseRightExpr(op, prec);
	    }
	  }

	  parseExprOpBaseRightExpr(op, prec) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    return this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, op.rightAssociative ? prec - 1 : prec);
	  }

	  checkExponentialAfterUnary(node) {
	    if (this.match(types$1.exponent)) {
	      this.raise(node.argument.start, ErrorMessages.UnexpectedTokenUnaryExponentiation);
	    }
	  }

	  parseMaybeUnary(refExpressionErrors, sawUnary) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const isAwait = this.isContextual("await");

	    if (isAwait && this.isAwaitAllowed()) {
	      this.next();
	      const expr = this.parseAwait(startPos, startLoc);
	      if (!sawUnary) this.checkExponentialAfterUnary(expr);
	      return expr;
	    }

	    if (this.isContextual("module") && this.lookaheadCharCode() === 123 && !this.hasFollowingLineBreak()) {
	      return this.parseModuleExpression();
	    }

	    const update = this.match(types$1.incDec);
	    const node = this.startNode();

	    if (this.state.type.prefix) {
	      node.operator = this.state.value;
	      node.prefix = true;

	      if (this.match(types$1._throw)) {
	        this.expectPlugin("throwExpressions");
	      }

	      const isDelete = this.match(types$1._delete);
	      this.next();
	      node.argument = this.parseMaybeUnary(null, true);
	      this.checkExpressionErrors(refExpressionErrors, true);

	      if (this.state.strict && isDelete) {
	        const arg = node.argument;

	        if (arg.type === "Identifier") {
	          this.raise(node.start, ErrorMessages.StrictDelete);
	        } else if (this.hasPropertyAsPrivateName(arg)) {
	          this.raise(node.start, ErrorMessages.DeletePrivateField);
	        }
	      }

	      if (!update) {
	        if (!sawUnary) this.checkExponentialAfterUnary(node);
	        return this.finishNode(node, "UnaryExpression");
	      }
	    }

	    const expr = this.parseUpdate(node, update, refExpressionErrors);

	    if (isAwait) {
	      const startsExpr = this.hasPlugin("v8intrinsic") ? this.state.type.startsExpr : this.state.type.startsExpr && !this.match(types$1.modulo);

	      if (startsExpr && !this.isAmbiguousAwait()) {
	        this.raiseOverwrite(startPos, this.hasPlugin("topLevelAwait") ? ErrorMessages.AwaitNotInAsyncContext : ErrorMessages.AwaitNotInAsyncFunction);
	        return this.parseAwait(startPos, startLoc);
	      }
	    }

	    return expr;
	  }

	  parseUpdate(node, update, refExpressionErrors) {
	    if (update) {
	      this.checkLVal(node.argument, "prefix operation");
	      return this.finishNode(node, "UpdateExpression");
	    }

	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    let expr = this.parseExprSubscripts(refExpressionErrors);
	    if (this.checkExpressionErrors(refExpressionErrors, false)) return expr;

	    while (this.state.type.postfix && !this.canInsertSemicolon()) {
	      const node = this.startNodeAt(startPos, startLoc);
	      node.operator = this.state.value;
	      node.prefix = false;
	      node.argument = expr;
	      this.checkLVal(expr, "postfix operation");
	      this.next();
	      expr = this.finishNode(node, "UpdateExpression");
	    }

	    return expr;
	  }

	  parseExprSubscripts(refExpressionErrors) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    const potentialArrowAt = this.state.potentialArrowAt;
	    const expr = this.parseExprAtom(refExpressionErrors);

	    if (this.shouldExitDescending(expr, potentialArrowAt)) {
	      return expr;
	    }

	    return this.parseSubscripts(expr, startPos, startLoc);
	  }

	  parseSubscripts(base, startPos, startLoc, noCalls) {
	    const state = {
	      optionalChainMember: false,
	      maybeAsyncArrow: this.atPossibleAsyncArrow(base),
	      stop: false
	    };

	    do {
	      base = this.parseSubscript(base, startPos, startLoc, noCalls, state);
	      state.maybeAsyncArrow = false;
	    } while (!state.stop);

	    return base;
	  }

	  parseSubscript(base, startPos, startLoc, noCalls, state) {
	    if (!noCalls && this.eat(types$1.doubleColon)) {
	      return this.parseBind(base, startPos, startLoc, noCalls, state);
	    } else if (this.match(types$1.backQuote)) {
	      return this.parseTaggedTemplateExpression(base, startPos, startLoc, state);
	    }

	    let optional = false;

	    if (this.match(types$1.questionDot)) {
	      if (noCalls && this.lookaheadCharCode() === 40) {
	        state.stop = true;
	        return base;
	      }

	      state.optionalChainMember = optional = true;
	      this.next();
	    }

	    if (!noCalls && this.match(types$1.parenL)) {
	      return this.parseCoverCallAndAsyncArrowHead(base, startPos, startLoc, state, optional);
	    } else if (optional || this.match(types$1.bracketL) || this.eat(types$1.dot)) {
	      return this.parseMember(base, startPos, startLoc, state, optional);
	    } else {
	      state.stop = true;
	      return base;
	    }
	  }

	  parseMember(base, startPos, startLoc, state, optional) {
	    const node = this.startNodeAt(startPos, startLoc);
	    const computed = this.eat(types$1.bracketL);
	    node.object = base;
	    node.computed = computed;
	    const privateName = !computed && this.match(types$1.privateName) && this.state.value;
	    const property = computed ? this.parseExpression() : privateName ? this.parsePrivateName() : this.parseIdentifier(true);

	    if (privateName !== false) {
	      if (node.object.type === "Super") {
	        this.raise(startPos, ErrorMessages.SuperPrivateField);
	      }

	      this.classScope.usePrivateName(privateName, property.start);
	    }

	    node.property = property;

	    if (computed) {
	      this.expect(types$1.bracketR);
	    }

	    if (state.optionalChainMember) {
	      node.optional = optional;
	      return this.finishNode(node, "OptionalMemberExpression");
	    } else {
	      return this.finishNode(node, "MemberExpression");
	    }
	  }

	  parseBind(base, startPos, startLoc, noCalls, state) {
	    const node = this.startNodeAt(startPos, startLoc);
	    node.object = base;
	    node.callee = this.parseNoCallExpr();
	    state.stop = true;
	    return this.parseSubscripts(this.finishNode(node, "BindExpression"), startPos, startLoc, noCalls);
	  }

	  parseCoverCallAndAsyncArrowHead(base, startPos, startLoc, state, optional) {
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    let refExpressionErrors = null;
	    this.state.maybeInArrowParameters = true;
	    this.next();
	    let node = this.startNodeAt(startPos, startLoc);
	    node.callee = base;

	    if (state.maybeAsyncArrow) {
	      this.expressionScope.enter(newAsyncArrowScope());
	      refExpressionErrors = new ExpressionErrors();
	    }

	    if (state.optionalChainMember) {
	      node.optional = optional;
	    }

	    if (optional) {
	      node.arguments = this.parseCallExpressionArguments(types$1.parenR);
	    } else {
	      node.arguments = this.parseCallExpressionArguments(types$1.parenR, base.type === "Import", base.type !== "Super", node, refExpressionErrors);
	    }

	    this.finishCallExpression(node, state.optionalChainMember);

	    if (state.maybeAsyncArrow && this.shouldParseAsyncArrow() && !optional) {
	      state.stop = true;
	      this.expressionScope.validateAsPattern();
	      this.expressionScope.exit();
	      node = this.parseAsyncArrowFromCallExpression(this.startNodeAt(startPos, startLoc), node);
	    } else {
	      if (state.maybeAsyncArrow) {
	        this.checkExpressionErrors(refExpressionErrors, true);
	        this.expressionScope.exit();
	      }

	      this.toReferencedArguments(node);
	    }

	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    return node;
	  }

	  toReferencedArguments(node, isParenthesizedExpr) {
	    this.toReferencedListDeep(node.arguments, isParenthesizedExpr);
	  }

	  parseTaggedTemplateExpression(base, startPos, startLoc, state) {
	    const node = this.startNodeAt(startPos, startLoc);
	    node.tag = base;
	    node.quasi = this.parseTemplate(true);

	    if (state.optionalChainMember) {
	      this.raise(startPos, ErrorMessages.OptionalChainingNoTemplate);
	    }

	    return this.finishNode(node, "TaggedTemplateExpression");
	  }

	  atPossibleAsyncArrow(base) {
	    return base.type === "Identifier" && base.name === "async" && this.state.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && base.start === this.state.potentialArrowAt;
	  }

	  finishCallExpression(node, optional) {
	    if (node.callee.type === "Import") {
	      if (node.arguments.length === 2) {
	        {
	          if (!this.hasPlugin("moduleAttributes")) {
	            this.expectPlugin("importAssertions");
	          }
	        }
	      }

	      if (node.arguments.length === 0 || node.arguments.length > 2) {
	        this.raise(node.start, ErrorMessages.ImportCallArity, this.hasPlugin("importAssertions") || this.hasPlugin("moduleAttributes") ? "one or two arguments" : "one argument");
	      } else {
	        for (const arg of node.arguments) {
	          if (arg.type === "SpreadElement") {
	            this.raise(arg.start, ErrorMessages.ImportCallSpreadArgument);
	          }
	        }
	      }
	    }

	    return this.finishNode(node, optional ? "OptionalCallExpression" : "CallExpression");
	  }

	  parseCallExpressionArguments(close, dynamicImport, allowPlaceholder, nodeForExtra, refExpressionErrors) {
	    const elts = [];
	    let first = true;
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = false;

	    while (!this.eat(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(types$1.comma);

	        if (this.match(close)) {
	          if (dynamicImport && !this.hasPlugin("importAssertions") && !this.hasPlugin("moduleAttributes")) {
	            this.raise(this.state.lastTokStart, ErrorMessages.ImportCallArgumentTrailingComma);
	          }

	          if (nodeForExtra) {
	            this.addExtra(nodeForExtra, "trailingComma", this.state.lastTokStart);
	          }

	          this.next();
	          break;
	        }
	      }

	      elts.push(this.parseExprListItem(false, refExpressionErrors, allowPlaceholder));
	    }

	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    return elts;
	  }

	  shouldParseAsyncArrow() {
	    return this.match(types$1.arrow) && !this.canInsertSemicolon();
	  }

	  parseAsyncArrowFromCallExpression(node, call) {
	    var _call$extra;

	    this.expect(types$1.arrow);
	    this.parseArrowExpression(node, call.arguments, true, (_call$extra = call.extra) == null ? void 0 : _call$extra.trailingComma);
	    return node;
	  }

	  parseNoCallExpr() {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
	  }

	  parseExprAtom(refExpressionErrors) {
	    let node;

	    switch (this.state.type) {
	      case types$1._super:
	        return this.parseSuper();

	      case types$1._import:
	        node = this.startNode();
	        this.next();

	        if (this.match(types$1.dot)) {
	          return this.parseImportMetaProperty(node);
	        }

	        if (!this.match(types$1.parenL)) {
	          this.raise(this.state.lastTokStart, ErrorMessages.UnsupportedImport);
	        }

	        return this.finishNode(node, "Import");

	      case types$1._this:
	        node = this.startNode();
	        this.next();
	        return this.finishNode(node, "ThisExpression");

	      case types$1.name:
	        {
	          const canBeArrow = this.state.potentialArrowAt === this.state.start;
	          const containsEsc = this.state.containsEsc;
	          const id = this.parseIdentifier();

	          if (!containsEsc && id.name === "async" && !this.canInsertSemicolon()) {
	            if (this.match(types$1._function)) {
	              this.next();
	              return this.parseFunction(this.startNodeAtNode(id), undefined, true);
	            } else if (this.match(types$1.name)) {
	              if (this.lookaheadCharCode() === 61) {
	                return this.parseAsyncArrowUnaryFunction(id);
	              } else {
	                return id;
	              }
	            } else if (this.match(types$1._do)) {
	              return this.parseDo(true);
	            }
	          }

	          if (canBeArrow && this.match(types$1.arrow) && !this.canInsertSemicolon()) {
	            this.next();
	            return this.parseArrowExpression(this.startNodeAtNode(id), [id], false);
	          }

	          return id;
	        }

	      case types$1._do:
	        {
	          return this.parseDo(false);
	        }

	      case types$1.slash:
	      case types$1.slashAssign:
	        {
	          this.readRegexp();
	          return this.parseRegExpLiteral(this.state.value);
	        }

	      case types$1.num:
	        return this.parseNumericLiteral(this.state.value);

	      case types$1.bigint:
	        return this.parseBigIntLiteral(this.state.value);

	      case types$1.decimal:
	        return this.parseDecimalLiteral(this.state.value);

	      case types$1.string:
	        return this.parseStringLiteral(this.state.value);

	      case types$1._null:
	        return this.parseNullLiteral();

	      case types$1._true:
	        return this.parseBooleanLiteral(true);

	      case types$1._false:
	        return this.parseBooleanLiteral(false);

	      case types$1.parenL:
	        {
	          const canBeArrow = this.state.potentialArrowAt === this.state.start;
	          return this.parseParenAndDistinguishExpression(canBeArrow);
	        }

	      case types$1.bracketBarL:
	      case types$1.bracketHashL:
	        {
	          return this.parseArrayLike(this.state.type === types$1.bracketBarL ? types$1.bracketBarR : types$1.bracketR, false, true, refExpressionErrors);
	        }

	      case types$1.bracketL:
	        {
	          return this.parseArrayLike(types$1.bracketR, true, false, refExpressionErrors);
	        }

	      case types$1.braceBarL:
	      case types$1.braceHashL:
	        {
	          return this.parseObjectLike(this.state.type === types$1.braceBarL ? types$1.braceBarR : types$1.braceR, false, true, refExpressionErrors);
	        }

	      case types$1.braceL:
	        {
	          return this.parseObjectLike(types$1.braceR, false, false, refExpressionErrors);
	        }

	      case types$1._function:
	        return this.parseFunctionOrFunctionSent();

	      case types$1.at:
	        this.parseDecorators();

	      case types$1._class:
	        node = this.startNode();
	        this.takeDecorators(node);
	        return this.parseClass(node, false);

	      case types$1._new:
	        return this.parseNewOrNewTarget();

	      case types$1.backQuote:
	        return this.parseTemplate(false);

	      case types$1.doubleColon:
	        {
	          node = this.startNode();
	          this.next();
	          node.object = null;
	          const callee = node.callee = this.parseNoCallExpr();

	          if (callee.type === "MemberExpression") {
	            return this.finishNode(node, "BindExpression");
	          } else {
	            throw this.raise(callee.start, ErrorMessages.UnsupportedBind);
	          }
	        }

	      case types$1.privateName:
	        {
	          const start = this.state.start;
	          const value = this.state.value;
	          node = this.parsePrivateName();

	          if (this.match(types$1._in)) {
	            this.expectPlugin("privateIn");
	            this.classScope.usePrivateName(value, node.start);
	          } else if (this.hasPlugin("privateIn")) {
	            this.raise(this.state.start, ErrorMessages.PrivateInExpectedIn, value);
	          } else {
	            throw this.unexpected(start);
	          }

	          return node;
	        }

	      case types$1.hash:
	        {
	          if (this.state.inPipeline) {
	            node = this.startNode();

	            if (this.getPluginOption("pipelineOperator", "proposal") !== "smart") {
	              this.raise(node.start, ErrorMessages.PrimaryTopicRequiresSmartPipeline);
	            }

	            this.next();

	            if (!this.primaryTopicReferenceIsAllowedInCurrentTopicContext()) {
	              this.raise(node.start, ErrorMessages.PrimaryTopicNotAllowed);
	            }

	            this.registerTopicReference();
	            return this.finishNode(node, "PipelinePrimaryTopicReference");
	          }
	        }

	      case types$1.relational:
	        {
	          if (this.state.value === "<") {
	            const lookaheadCh = this.input.codePointAt(this.nextTokenStart());

	            if (isIdentifierStart(lookaheadCh) || lookaheadCh === 62) {
	                this.expectOnePlugin(["jsx", "flow", "typescript"]);
	              }
	          }
	        }

	      default:
	        throw this.unexpected();
	    }
	  }

	  parseAsyncArrowUnaryFunction(id) {
	    const node = this.startNodeAtNode(id);
	    this.prodParam.enter(functionFlags(true, this.prodParam.hasYield));
	    const params = [this.parseIdentifier()];
	    this.prodParam.exit();

	    if (this.hasPrecedingLineBreak()) {
	      this.raise(this.state.pos, ErrorMessages.LineTerminatorBeforeArrow);
	    }

	    this.expect(types$1.arrow);
	    this.parseArrowExpression(node, params, true);
	    return node;
	  }

	  parseDo(isAsync) {
	    this.expectPlugin("doExpressions");

	    if (isAsync) {
	      this.expectPlugin("asyncDoExpressions");
	    }

	    const node = this.startNode();
	    node.async = isAsync;
	    this.next();
	    const oldLabels = this.state.labels;
	    this.state.labels = [];

	    if (isAsync) {
	      this.prodParam.enter(PARAM_AWAIT);
	      node.body = this.parseBlock();
	      this.prodParam.exit();
	    } else {
	      node.body = this.parseBlock();
	    }

	    this.state.labels = oldLabels;
	    return this.finishNode(node, "DoExpression");
	  }

	  parseSuper() {
	    const node = this.startNode();
	    this.next();

	    if (this.match(types$1.parenL) && !this.scope.allowDirectSuper && !this.options.allowSuperOutsideMethod) {
	      this.raise(node.start, ErrorMessages.SuperNotAllowed);
	    } else if (!this.scope.allowSuper && !this.options.allowSuperOutsideMethod) {
	      this.raise(node.start, ErrorMessages.UnexpectedSuper);
	    }

	    if (!this.match(types$1.parenL) && !this.match(types$1.bracketL) && !this.match(types$1.dot)) {
	      this.raise(node.start, ErrorMessages.UnsupportedSuper);
	    }

	    return this.finishNode(node, "Super");
	  }

	  parseMaybePrivateName(isPrivateNameAllowed) {
	    const isPrivate = this.match(types$1.privateName);

	    if (isPrivate) {
	      if (!isPrivateNameAllowed) {
	        this.raise(this.state.start + 1, ErrorMessages.UnexpectedPrivateField);
	      }

	      return this.parsePrivateName();
	    } else {
	      return this.parseIdentifier(true);
	    }
	  }

	  parsePrivateName() {
	    const node = this.startNode();
	    const id = this.startNodeAt(this.state.start + 1, new Position(this.state.curLine, this.state.start + 1 - this.state.lineStart));
	    const name = this.state.value;
	    this.next();
	    node.id = this.createIdentifier(id, name);
	    return this.finishNode(node, "PrivateName");
	  }

	  parseFunctionOrFunctionSent() {
	    const node = this.startNode();
	    this.next();

	    if (this.prodParam.hasYield && this.match(types$1.dot)) {
	      const meta = this.createIdentifier(this.startNodeAtNode(node), "function");
	      this.next();
	      return this.parseMetaProperty(node, meta, "sent");
	    }

	    return this.parseFunction(node);
	  }

	  parseMetaProperty(node, meta, propertyName) {
	    node.meta = meta;

	    if (meta.name === "function" && propertyName === "sent") {
	      if (this.isContextual(propertyName)) {
	        this.expectPlugin("functionSent");
	      } else if (!this.hasPlugin("functionSent")) {
	        this.unexpected();
	      }
	    }

	    const containsEsc = this.state.containsEsc;
	    node.property = this.parseIdentifier(true);

	    if (node.property.name !== propertyName || containsEsc) {
	      this.raise(node.property.start, ErrorMessages.UnsupportedMetaProperty, meta.name, propertyName);
	    }

	    return this.finishNode(node, "MetaProperty");
	  }

	  parseImportMetaProperty(node) {
	    const id = this.createIdentifier(this.startNodeAtNode(node), "import");
	    this.next();

	    if (this.isContextual("meta")) {
	      if (!this.inModule) {
	        this.raise(id.start, SourceTypeModuleErrorMessages.ImportMetaOutsideModule);
	      }

	      this.sawUnambiguousESM = true;
	    }

	    return this.parseMetaProperty(node, id, "meta");
	  }

	  parseLiteralAtNode(value, type, node) {
	    this.addExtra(node, "rawValue", value);
	    this.addExtra(node, "raw", this.input.slice(node.start, this.state.end));
	    node.value = value;
	    this.next();
	    return this.finishNode(node, type);
	  }

	  parseLiteral(value, type) {
	    const node = this.startNode();
	    return this.parseLiteralAtNode(value, type, node);
	  }

	  parseStringLiteral(value) {
	    return this.parseLiteral(value, "StringLiteral");
	  }

	  parseNumericLiteral(value) {
	    return this.parseLiteral(value, "NumericLiteral");
	  }

	  parseBigIntLiteral(value) {
	    return this.parseLiteral(value, "BigIntLiteral");
	  }

	  parseDecimalLiteral(value) {
	    return this.parseLiteral(value, "DecimalLiteral");
	  }

	  parseRegExpLiteral(value) {
	    const node = this.parseLiteral(value.value, "RegExpLiteral");
	    node.pattern = value.pattern;
	    node.flags = value.flags;
	    return node;
	  }

	  parseBooleanLiteral(value) {
	    const node = this.startNode();
	    node.value = value;
	    this.next();
	    return this.finishNode(node, "BooleanLiteral");
	  }

	  parseNullLiteral() {
	    const node = this.startNode();
	    this.next();
	    return this.finishNode(node, "NullLiteral");
	  }

	  parseParenAndDistinguishExpression(canBeArrow) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    let val;
	    this.next();
	    this.expressionScope.enter(newArrowHeadScope());
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.maybeInArrowParameters = true;
	    this.state.inFSharpPipelineDirectBody = false;
	    const innerStartPos = this.state.start;
	    const innerStartLoc = this.state.startLoc;
	    const exprList = [];
	    const refExpressionErrors = new ExpressionErrors();
	    let first = true;
	    let spreadStart;
	    let optionalCommaStart;

	    while (!this.match(types$1.parenR)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(types$1.comma, refExpressionErrors.optionalParameters === -1 ? null : refExpressionErrors.optionalParameters);

	        if (this.match(types$1.parenR)) {
	          optionalCommaStart = this.state.start;
	          break;
	        }
	      }

	      if (this.match(types$1.ellipsis)) {
	        const spreadNodeStartPos = this.state.start;
	        const spreadNodeStartLoc = this.state.startLoc;
	        spreadStart = this.state.start;
	        exprList.push(this.parseParenItem(this.parseRestBinding(), spreadNodeStartPos, spreadNodeStartLoc));
	        this.checkCommaAfterRest(41);
	        break;
	      } else {
	        exprList.push(this.parseMaybeAssignAllowIn(refExpressionErrors, this.parseParenItem));
	      }
	    }

	    const innerEndPos = this.state.lastTokEnd;
	    const innerEndLoc = this.state.lastTokEndLoc;
	    this.expect(types$1.parenR);
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    let arrowNode = this.startNodeAt(startPos, startLoc);

	    if (canBeArrow && this.shouldParseArrow() && (arrowNode = this.parseArrow(arrowNode))) {
	      this.expressionScope.validateAsPattern();
	      this.expressionScope.exit();
	      this.parseArrowExpression(arrowNode, exprList, false);
	      return arrowNode;
	    }

	    this.expressionScope.exit();

	    if (!exprList.length) {
	      this.unexpected(this.state.lastTokStart);
	    }

	    if (optionalCommaStart) this.unexpected(optionalCommaStart);
	    if (spreadStart) this.unexpected(spreadStart);
	    this.checkExpressionErrors(refExpressionErrors, true);
	    this.toReferencedListDeep(exprList, true);

	    if (exprList.length > 1) {
	      val = this.startNodeAt(innerStartPos, innerStartLoc);
	      val.expressions = exprList;
	      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
	    } else {
	      val = exprList[0];
	    }

	    if (!this.options.createParenthesizedExpressions) {
	      this.addExtra(val, "parenthesized", true);
	      this.addExtra(val, "parenStart", startPos);
	      return val;
	    }

	    const parenExpression = this.startNodeAt(startPos, startLoc);
	    parenExpression.expression = val;
	    this.finishNode(parenExpression, "ParenthesizedExpression");
	    return parenExpression;
	  }

	  shouldParseArrow() {
	    return !this.canInsertSemicolon();
	  }

	  parseArrow(node) {
	    if (this.eat(types$1.arrow)) {
	      return node;
	    }
	  }

	  parseParenItem(node, startPos, startLoc) {
	    return node;
	  }

	  parseNewOrNewTarget() {
	    const node = this.startNode();
	    this.next();

	    if (this.match(types$1.dot)) {
	      const meta = this.createIdentifier(this.startNodeAtNode(node), "new");
	      this.next();
	      const metaProp = this.parseMetaProperty(node, meta, "target");

	      if (!this.scope.inNonArrowFunction && !this.scope.inClass) {
	        this.raise(metaProp.start, ErrorMessages.UnexpectedNewTarget);
	      }

	      return metaProp;
	    }

	    return this.parseNew(node);
	  }

	  parseNew(node) {
	    node.callee = this.parseNoCallExpr();

	    if (node.callee.type === "Import") {
	      this.raise(node.callee.start, ErrorMessages.ImportCallNotNewExpression);
	    } else if (this.isOptionalChain(node.callee)) {
	      this.raise(this.state.lastTokEnd, ErrorMessages.OptionalChainingNoNew);
	    } else if (this.eat(types$1.questionDot)) {
	      this.raise(this.state.start, ErrorMessages.OptionalChainingNoNew);
	    }

	    this.parseNewArguments(node);
	    return this.finishNode(node, "NewExpression");
	  }

	  parseNewArguments(node) {
	    if (this.eat(types$1.parenL)) {
	      const args = this.parseExprList(types$1.parenR);
	      this.toReferencedList(args);
	      node.arguments = args;
	    } else {
	      node.arguments = [];
	    }
	  }

	  parseTemplateElement(isTagged) {
	    const elem = this.startNode();

	    if (this.state.value === null) {
	      if (!isTagged) {
	        this.raise(this.state.start + 1, ErrorMessages.InvalidEscapeSequenceTemplate);
	      }
	    }

	    elem.value = {
	      raw: this.input.slice(this.state.start, this.state.end).replace(/\r\n?/g, "\n"),
	      cooked: this.state.value
	    };
	    this.next();
	    elem.tail = this.match(types$1.backQuote);
	    return this.finishNode(elem, "TemplateElement");
	  }

	  parseTemplate(isTagged) {
	    const node = this.startNode();
	    this.next();
	    node.expressions = [];
	    let curElt = this.parseTemplateElement(isTagged);
	    node.quasis = [curElt];

	    while (!curElt.tail) {
	      this.expect(types$1.dollarBraceL);
	      node.expressions.push(this.parseTemplateSubstitution());
	      this.expect(types$1.braceR);
	      node.quasis.push(curElt = this.parseTemplateElement(isTagged));
	    }

	    this.next();
	    return this.finishNode(node, "TemplateLiteral");
	  }

	  parseTemplateSubstitution() {
	    return this.parseExpression();
	  }

	  parseObjectLike(close, isPattern, isRecord, refExpressionErrors) {
	    if (isRecord) {
	      this.expectPlugin("recordAndTuple");
	    }

	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = false;
	    const propHash = Object.create(null);
	    let first = true;
	    const node = this.startNode();
	    node.properties = [];
	    this.next();

	    while (!this.match(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(types$1.comma);

	        if (this.match(close)) {
	          this.addExtra(node, "trailingComma", this.state.lastTokStart);
	          break;
	        }
	      }

	      const prop = this.parsePropertyDefinition(isPattern, refExpressionErrors);

	      if (!isPattern) {
	        this.checkProto(prop, isRecord, propHash, refExpressionErrors);
	      }

	      if (isRecord && !this.isObjectProperty(prop) && prop.type !== "SpreadElement") {
	        this.raise(prop.start, ErrorMessages.InvalidRecordProperty);
	      }

	      if (prop.shorthand) {
	        this.addExtra(prop, "shorthand", true);
	      }

	      node.properties.push(prop);
	    }

	    this.next();
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    let type = "ObjectExpression";

	    if (isPattern) {
	      type = "ObjectPattern";
	    } else if (isRecord) {
	      type = "RecordExpression";
	    }

	    return this.finishNode(node, type);
	  }

	  maybeAsyncOrAccessorProp(prop) {
	    return !prop.computed && prop.key.type === "Identifier" && (this.isLiteralPropertyName() || this.match(types$1.bracketL) || this.match(types$1.star));
	  }

	  parsePropertyDefinition(isPattern, refExpressionErrors) {
	    let decorators = [];

	    if (this.match(types$1.at)) {
	      if (this.hasPlugin("decorators")) {
	        this.raise(this.state.start, ErrorMessages.UnsupportedPropertyDecorator);
	      }

	      while (this.match(types$1.at)) {
	        decorators.push(this.parseDecorator());
	      }
	    }

	    const prop = this.startNode();
	    let isGenerator = false;
	    let isAsync = false;
	    let isAccessor = false;
	    let startPos;
	    let startLoc;

	    if (this.match(types$1.ellipsis)) {
	      if (decorators.length) this.unexpected();

	      if (isPattern) {
	        this.next();
	        prop.argument = this.parseIdentifier();
	        this.checkCommaAfterRest(125);
	        return this.finishNode(prop, "RestElement");
	      }

	      return this.parseSpread();
	    }

	    if (decorators.length) {
	      prop.decorators = decorators;
	      decorators = [];
	    }

	    prop.method = false;

	    if (isPattern || refExpressionErrors) {
	      startPos = this.state.start;
	      startLoc = this.state.startLoc;
	    }

	    if (!isPattern) {
	      isGenerator = this.eat(types$1.star);
	    }

	    const containsEsc = this.state.containsEsc;
	    const key = this.parsePropertyName(prop, false);

	    if (!isPattern && !isGenerator && !containsEsc && this.maybeAsyncOrAccessorProp(prop)) {
	      const keyName = key.name;

	      if (keyName === "async" && !this.hasPrecedingLineBreak()) {
	        isAsync = true;
	        isGenerator = this.eat(types$1.star);
	        this.parsePropertyName(prop, false);
	      }

	      if (keyName === "get" || keyName === "set") {
	        isAccessor = true;
	        prop.kind = keyName;

	        if (this.match(types$1.star)) {
	          isGenerator = true;
	          this.raise(this.state.pos, ErrorMessages.AccessorIsGenerator, keyName);
	          this.next();
	        }

	        this.parsePropertyName(prop, false);
	      }
	    }

	    this.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors);
	    return prop;
	  }

	  getGetterSetterExpectedParamCount(method) {
	    return method.kind === "get" ? 0 : 1;
	  }

	  getObjectOrClassMethodParams(method) {
	    return method.params;
	  }

	  checkGetterSetterParams(method) {
	    var _params;

	    const paramCount = this.getGetterSetterExpectedParamCount(method);
	    const params = this.getObjectOrClassMethodParams(method);
	    const start = method.start;

	    if (params.length !== paramCount) {
	      if (method.kind === "get") {
	        this.raise(start, ErrorMessages.BadGetterArity);
	      } else {
	        this.raise(start, ErrorMessages.BadSetterArity);
	      }
	    }

	    if (method.kind === "set" && ((_params = params[params.length - 1]) == null ? void 0 : _params.type) === "RestElement") {
	      this.raise(start, ErrorMessages.BadSetterRestParameter);
	    }
	  }

	  parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) {
	    if (isAccessor) {
	      this.parseMethod(prop, isGenerator, false, false, false, "ObjectMethod");
	      this.checkGetterSetterParams(prop);
	      return prop;
	    }

	    if (isAsync || isGenerator || this.match(types$1.parenL)) {
	      if (isPattern) this.unexpected();
	      prop.kind = "method";
	      prop.method = true;
	      return this.parseMethod(prop, isGenerator, isAsync, false, false, "ObjectMethod");
	    }
	  }

	  parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors) {
	    prop.shorthand = false;

	    if (this.eat(types$1.colon)) {
	      prop.value = isPattern ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssignAllowIn(refExpressionErrors);
	      return this.finishNode(prop, "ObjectProperty");
	    }

	    if (!prop.computed && prop.key.type === "Identifier") {
	      this.checkReservedWord(prop.key.name, prop.key.start, true, false);

	      if (isPattern) {
	        prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
	      } else if (this.match(types$1.eq) && refExpressionErrors) {
	        if (refExpressionErrors.shorthandAssign === -1) {
	          refExpressionErrors.shorthandAssign = this.state.start;
	        }

	        prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
	      } else {
	        prop.value = prop.key.__clone();
	      }

	      prop.shorthand = true;
	      return this.finishNode(prop, "ObjectProperty");
	    }
	  }

	  parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
	    const node = this.parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) || this.parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors);
	    if (!node) this.unexpected();
	    return node;
	  }

	  parsePropertyName(prop, isPrivateNameAllowed) {
	    if (this.eat(types$1.bracketL)) {
	      prop.computed = true;
	      prop.key = this.parseMaybeAssignAllowIn();
	      this.expect(types$1.bracketR);
	    } else {
	      const oldInPropertyName = this.state.inPropertyName;
	      this.state.inPropertyName = true;
	      const type = this.state.type;
	      prop.key = type === types$1.num || type === types$1.string || type === types$1.bigint || type === types$1.decimal ? this.parseExprAtom() : this.parseMaybePrivateName(isPrivateNameAllowed);

	      if (type !== types$1.privateName) {
	        prop.computed = false;
	      }

	      this.state.inPropertyName = oldInPropertyName;
	    }

	    return prop.key;
	  }

	  initFunction(node, isAsync) {
	    node.id = null;
	    node.generator = false;
	    node.async = !!isAsync;
	  }

	  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = false) {
	    this.initFunction(node, isAsync);
	    node.generator = !!isGenerator;
	    const allowModifiers = isConstructor;
	    this.scope.enter(SCOPE_FUNCTION | SCOPE_SUPER | (inClassScope ? SCOPE_CLASS : 0) | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
	    this.prodParam.enter(functionFlags(isAsync, node.generator));
	    this.parseFunctionParams(node, allowModifiers);
	    this.parseFunctionBodyAndFinish(node, type, true);
	    this.prodParam.exit();
	    this.scope.exit();
	    return node;
	  }

	  parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
	    if (isTuple) {
	      this.expectPlugin("recordAndTuple");
	    }

	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = false;
	    const node = this.startNode();
	    this.next();
	    node.elements = this.parseExprList(close, !isTuple, refExpressionErrors, node);
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    return this.finishNode(node, isTuple ? "TupleExpression" : "ArrayExpression");
	  }

	  parseArrowExpression(node, params, isAsync, trailingCommaPos) {
	    this.scope.enter(SCOPE_FUNCTION | SCOPE_ARROW);
	    let flags = functionFlags(isAsync, false);

	    if (!this.match(types$1.bracketL) && this.prodParam.hasIn) {
	      flags |= PARAM_IN;
	    }

	    this.prodParam.enter(flags);
	    this.initFunction(node, isAsync);
	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;

	    if (params) {
	      this.state.maybeInArrowParameters = true;
	      this.setArrowFunctionParameters(node, params, trailingCommaPos);
	    }

	    this.state.maybeInArrowParameters = false;
	    this.parseFunctionBody(node, true);
	    this.prodParam.exit();
	    this.scope.exit();
	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    return this.finishNode(node, "ArrowFunctionExpression");
	  }

	  setArrowFunctionParameters(node, params, trailingCommaPos) {
	    node.params = this.toAssignableList(params, trailingCommaPos, false);
	  }

	  parseFunctionBodyAndFinish(node, type, isMethod = false) {
	    this.parseFunctionBody(node, false, isMethod);
	    this.finishNode(node, type);
	  }

	  parseFunctionBody(node, allowExpression, isMethod = false) {
	    const isExpression = allowExpression && !this.match(types$1.braceL);
	    this.expressionScope.enter(newExpressionScope());

	    if (isExpression) {
	      node.body = this.parseMaybeAssign();
	      this.checkParams(node, false, allowExpression, false);
	    } else {
	      const oldStrict = this.state.strict;
	      const oldLabels = this.state.labels;
	      this.state.labels = [];
	      this.prodParam.enter(this.prodParam.currentFlags() | PARAM_RETURN);
	      node.body = this.parseBlock(true, false, hasStrictModeDirective => {
	        const nonSimple = !this.isSimpleParamList(node.params);

	        if (hasStrictModeDirective && nonSimple) {
	          const errorPos = (node.kind === "method" || node.kind === "constructor") && !!node.key ? node.key.end : node.start;
	          this.raise(errorPos, ErrorMessages.IllegalLanguageModeDirective);
	        }

	        const strictModeChanged = !oldStrict && this.state.strict;
	        this.checkParams(node, !this.state.strict && !allowExpression && !isMethod && !nonSimple, allowExpression, strictModeChanged);

	        if (this.state.strict && node.id) {
	          this.checkLVal(node.id, "function name", BIND_OUTSIDE, undefined, undefined, strictModeChanged);
	        }
	      });
	      this.prodParam.exit();
	      this.expressionScope.exit();
	      this.state.labels = oldLabels;
	    }
	  }

	  isSimpleParamList(params) {
	    for (let i = 0, len = params.length; i < len; i++) {
	      if (params[i].type !== "Identifier") return false;
	    }

	    return true;
	  }

	  checkParams(node, allowDuplicates, isArrowFunction, strictModeChanged = true) {
	    const checkClashes = new Set();

	    for (const param of node.params) {
	      this.checkLVal(param, "function parameter list", BIND_VAR, allowDuplicates ? null : checkClashes, undefined, strictModeChanged);
	    }
	  }

	  parseExprList(close, allowEmpty, refExpressionErrors, nodeForExtra) {
	    const elts = [];
	    let first = true;

	    while (!this.eat(close)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(types$1.comma);

	        if (this.match(close)) {
	          if (nodeForExtra) {
	            this.addExtra(nodeForExtra, "trailingComma", this.state.lastTokStart);
	          }

	          this.next();
	          break;
	        }
	      }

	      elts.push(this.parseExprListItem(allowEmpty, refExpressionErrors));
	    }

	    return elts;
	  }

	  parseExprListItem(allowEmpty, refExpressionErrors, allowPlaceholder) {
	    let elt;

	    if (this.match(types$1.comma)) {
	      if (!allowEmpty) {
	        this.raise(this.state.pos, ErrorMessages.UnexpectedToken, ",");
	      }

	      elt = null;
	    } else if (this.match(types$1.ellipsis)) {
	      const spreadNodeStartPos = this.state.start;
	      const spreadNodeStartLoc = this.state.startLoc;
	      elt = this.parseParenItem(this.parseSpread(refExpressionErrors), spreadNodeStartPos, spreadNodeStartLoc);
	    } else if (this.match(types$1.question)) {
	      this.expectPlugin("partialApplication");

	      if (!allowPlaceholder) {
	        this.raise(this.state.start, ErrorMessages.UnexpectedArgumentPlaceholder);
	      }

	      const node = this.startNode();
	      this.next();
	      elt = this.finishNode(node, "ArgumentPlaceholder");
	    } else {
	      elt = this.parseMaybeAssignAllowIn(refExpressionErrors, this.parseParenItem);
	    }

	    return elt;
	  }

	  parseIdentifier(liberal) {
	    const node = this.startNode();
	    const name = this.parseIdentifierName(node.start, liberal);
	    return this.createIdentifier(node, name);
	  }

	  createIdentifier(node, name) {
	    node.name = name;
	    node.loc.identifierName = name;
	    return this.finishNode(node, "Identifier");
	  }

	  parseIdentifierName(pos, liberal) {
	    let name;
	    const {
	      start,
	      type
	    } = this.state;

	    if (type === types$1.name) {
	      name = this.state.value;
	    } else if (type.keyword) {
	      name = type.keyword;
	    } else {
	      throw this.unexpected();
	    }

	    if (liberal) {
	      this.state.type = types$1.name;
	    } else {
	      this.checkReservedWord(name, start, !!type.keyword, false);
	    }

	    this.next();
	    return name;
	  }

	  checkReservedWord(word, startLoc, checkKeywords, isBinding) {
	    if (word.length > 10) {
	      return;
	    }

	    if (!canBeReservedWord(word)) {
	      return;
	    }

	    if (word === "yield") {
	      if (this.prodParam.hasYield) {
	        this.raise(startLoc, ErrorMessages.YieldBindingIdentifier);
	        return;
	      }
	    } else if (word === "await") {
	      if (this.prodParam.hasAwait) {
	        this.raise(startLoc, ErrorMessages.AwaitBindingIdentifier);
	        return;
	      } else if (this.scope.inStaticBlock && !this.scope.inNonArrowFunction) {
	        this.raise(startLoc, ErrorMessages.AwaitBindingIdentifierInStaticBlock);
	        return;
	      } else {
	        this.expressionScope.recordAsyncArrowParametersError(startLoc, ErrorMessages.AwaitBindingIdentifier);
	      }
	    } else if (word === "arguments") {
	      if (this.scope.inClassAndNotInNonArrowFunction) {
	        this.raise(startLoc, ErrorMessages.ArgumentsInClass);
	        return;
	      }
	    }

	    if (checkKeywords && isKeyword(word)) {
	      this.raise(startLoc, ErrorMessages.UnexpectedKeyword, word);
	      return;
	    }

	    const reservedTest = !this.state.strict ? isReservedWord : isBinding ? isStrictBindReservedWord : isStrictReservedWord;

	    if (reservedTest(word, this.inModule)) {
	      this.raise(startLoc, ErrorMessages.UnexpectedReservedWord, word);
	    }
	  }

	  isAwaitAllowed() {
	    if (this.prodParam.hasAwait) return true;

	    if (this.options.allowAwaitOutsideFunction && !this.scope.inFunction) {
	      return true;
	    }

	    return false;
	  }

	  parseAwait(startPos, startLoc) {
	    const node = this.startNodeAt(startPos, startLoc);
	    this.expressionScope.recordParameterInitializerError(node.start, ErrorMessages.AwaitExpressionFormalParameter);

	    if (this.eat(types$1.star)) {
	      this.raise(node.start, ErrorMessages.ObsoleteAwaitStar);
	    }

	    if (!this.scope.inFunction && !this.options.allowAwaitOutsideFunction) {
	      if (this.isAmbiguousAwait()) {
	        this.ambiguousScriptDifferentAst = true;
	      } else {
	        this.sawUnambiguousESM = true;
	      }
	    }

	    if (!this.state.soloAwait) {
	      node.argument = this.parseMaybeUnary(null, true);
	    }

	    return this.finishNode(node, "AwaitExpression");
	  }

	  isAmbiguousAwait() {
	    return this.hasPrecedingLineBreak() || this.match(types$1.plusMin) || this.match(types$1.parenL) || this.match(types$1.bracketL) || this.match(types$1.backQuote) || this.match(types$1.regexp) || this.match(types$1.slash) || this.hasPlugin("v8intrinsic") && this.match(types$1.modulo);
	  }

	  parseYield() {
	    const node = this.startNode();
	    this.expressionScope.recordParameterInitializerError(node.start, ErrorMessages.YieldInParameter);
	    this.next();
	    let delegating = false;
	    let argument = null;

	    if (!this.hasPrecedingLineBreak()) {
	      delegating = this.eat(types$1.star);

	      switch (this.state.type) {
	        case types$1.semi:
	        case types$1.eof:
	        case types$1.braceR:
	        case types$1.parenR:
	        case types$1.bracketR:
	        case types$1.braceBarR:
	        case types$1.colon:
	        case types$1.comma:
	          if (!delegating) break;

	        default:
	          argument = this.parseMaybeAssign();
	      }
	    }

	    node.delegate = delegating;
	    node.argument = argument;
	    return this.finishNode(node, "YieldExpression");
	  }

	  checkPipelineAtInfixOperator(left, leftStartPos) {
	    if (this.getPluginOption("pipelineOperator", "proposal") === "smart") {
	      if (left.type === "SequenceExpression") {
	        this.raise(leftStartPos, ErrorMessages.PipelineHeadSequenceExpression);
	      }
	    }
	  }

	  parseSmartPipelineBody(childExpression, startPos, startLoc) {
	    this.checkSmartPipelineBodyEarlyErrors(childExpression, startPos);
	    return this.parseSmartPipelineBodyInStyle(childExpression, startPos, startLoc);
	  }

	  checkSmartPipelineBodyEarlyErrors(childExpression, startPos) {
	    if (this.match(types$1.arrow)) {
	      throw this.raise(this.state.start, ErrorMessages.PipelineBodyNoArrow);
	    } else if (childExpression.type === "SequenceExpression") {
	      this.raise(startPos, ErrorMessages.PipelineBodySequenceExpression);
	    }
	  }

	  parseSmartPipelineBodyInStyle(childExpression, startPos, startLoc) {
	    const bodyNode = this.startNodeAt(startPos, startLoc);
	    const isSimpleReference = this.isSimpleReference(childExpression);

	    if (isSimpleReference) {
	      bodyNode.callee = childExpression;
	    } else {
	      if (!this.topicReferenceWasUsedInCurrentTopicContext()) {
	        this.raise(startPos, ErrorMessages.PipelineTopicUnused);
	      }

	      bodyNode.expression = childExpression;
	    }

	    return this.finishNode(bodyNode, isSimpleReference ? "PipelineBareFunction" : "PipelineTopicExpression");
	  }

	  isSimpleReference(expression) {
	    switch (expression.type) {
	      case "MemberExpression":
	        return !expression.computed && this.isSimpleReference(expression.object);

	      case "Identifier":
	        return true;

	      default:
	        return false;
	    }
	  }

	  withTopicPermittingContext(callback) {
	    const outerContextTopicState = this.state.topicContext;
	    this.state.topicContext = {
	      maxNumOfResolvableTopics: 1,
	      maxTopicIndex: null
	    };

	    try {
	      return callback();
	    } finally {
	      this.state.topicContext = outerContextTopicState;
	    }
	  }

	  withTopicForbiddingContext(callback) {
	    const outerContextTopicState = this.state.topicContext;
	    this.state.topicContext = {
	      maxNumOfResolvableTopics: 0,
	      maxTopicIndex: null
	    };

	    try {
	      return callback();
	    } finally {
	      this.state.topicContext = outerContextTopicState;
	    }
	  }

	  withSoloAwaitPermittingContext(callback) {
	    const outerContextSoloAwaitState = this.state.soloAwait;
	    this.state.soloAwait = true;

	    try {
	      return callback();
	    } finally {
	      this.state.soloAwait = outerContextSoloAwaitState;
	    }
	  }

	  allowInAnd(callback) {
	    const flags = this.prodParam.currentFlags();
	    const prodParamToSet = PARAM_IN & ~flags;

	    if (prodParamToSet) {
	      this.prodParam.enter(flags | PARAM_IN);

	      try {
	        return callback();
	      } finally {
	        this.prodParam.exit();
	      }
	    }

	    return callback();
	  }

	  disallowInAnd(callback) {
	    const flags = this.prodParam.currentFlags();
	    const prodParamToClear = PARAM_IN & flags;

	    if (prodParamToClear) {
	      this.prodParam.enter(flags & ~PARAM_IN);

	      try {
	        return callback();
	      } finally {
	        this.prodParam.exit();
	      }
	    }

	    return callback();
	  }

	  registerTopicReference() {
	    this.state.topicContext.maxTopicIndex = 0;
	  }

	  primaryTopicReferenceIsAllowedInCurrentTopicContext() {
	    return this.state.topicContext.maxNumOfResolvableTopics >= 1;
	  }

	  topicReferenceWasUsedInCurrentTopicContext() {
	    return this.state.topicContext.maxTopicIndex != null && this.state.topicContext.maxTopicIndex >= 0;
	  }

	  parseFSharpPipelineBody(prec) {
	    const startPos = this.state.start;
	    const startLoc = this.state.startLoc;
	    this.state.potentialArrowAt = this.state.start;
	    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
	    this.state.inFSharpPipelineDirectBody = true;
	    const ret = this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, prec);
	    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
	    return ret;
	  }

	  parseModuleExpression() {
	    this.expectPlugin("moduleBlocks");
	    const node = this.startNode();
	    this.next();
	    this.eat(types$1.braceL);
	    const revertScopes = this.initializeScopes(true);
	    this.enterInitialScopes();
	    const program = this.startNode();

	    try {
	      node.body = this.parseProgram(program, types$1.braceR, "module");
	    } finally {
	      revertScopes();
	    }

	    this.eat(types$1.braceR);
	    return this.finishNode(node, "ModuleExpression");
	  }

	}

	const loopLabel = {
	  kind: "loop"
	},
	      switchLabel = {
	  kind: "switch"
	};
	const FUNC_NO_FLAGS = 0b000,
	      FUNC_STATEMENT = 0b001,
	      FUNC_HANGING_STATEMENT = 0b010,
	      FUNC_NULLABLE_ID = 0b100;
	const loneSurrogate = /[\uD800-\uDFFF]/u;
	const keywordRelationalOperator = /in(?:stanceof)?/y;

	function babel7CompatTokens(tokens) {
	  {
	    for (let i = 0; i < tokens.length; i++) {
	      const token = tokens[i];

	      if (token.type === types$1.privateName) {
	        const {
	          loc,
	          start,
	          value,
	          end
	        } = token;
	        const hashEndPos = start + 1;
	        const hashEndLoc = new Position(loc.start.line, loc.start.column + 1);
	        tokens.splice(i, 1, new Token({
	          type: types$1.hash,
	          value: "#",
	          start: start,
	          end: hashEndPos,
	          startLoc: loc.start,
	          endLoc: hashEndLoc
	        }), new Token({
	          type: types$1.name,
	          value: value,
	          start: hashEndPos,
	          end: end,
	          startLoc: hashEndLoc,
	          endLoc: loc.end
	        }));
	      }
	    }
	  }
	  return tokens;
	}

	class StatementParser extends ExpressionParser {
	  parseTopLevel(file, program) {
	    file.program = this.parseProgram(program);
	    file.comments = this.state.comments;
	    if (this.options.tokens) file.tokens = babel7CompatTokens(this.tokens);
	    return this.finishNode(file, "File");
	  }

	  parseProgram(program, end = types$1.eof, sourceType = this.options.sourceType) {
	    program.sourceType = sourceType;
	    program.interpreter = this.parseInterpreterDirective();
	    this.parseBlockBody(program, true, true, end);

	    if (this.inModule && !this.options.allowUndeclaredExports && this.scope.undefinedExports.size > 0) {
	      for (const [name] of Array.from(this.scope.undefinedExports)) {
	        const pos = this.scope.undefinedExports.get(name);
	        this.raise(pos, ErrorMessages.ModuleExportUndefined, name);
	      }
	    }

	    return this.finishNode(program, "Program");
	  }

	  stmtToDirective(stmt) {
	    const expr = stmt.expression;
	    const directiveLiteral = this.startNodeAt(expr.start, expr.loc.start);
	    const directive = this.startNodeAt(stmt.start, stmt.loc.start);
	    const raw = this.input.slice(expr.start, expr.end);
	    const val = directiveLiteral.value = raw.slice(1, -1);
	    this.addExtra(directiveLiteral, "raw", raw);
	    this.addExtra(directiveLiteral, "rawValue", val);
	    directive.value = this.finishNodeAt(directiveLiteral, "DirectiveLiteral", expr.end, expr.loc.end);
	    return this.finishNodeAt(directive, "Directive", stmt.end, stmt.loc.end);
	  }

	  parseInterpreterDirective() {
	    if (!this.match(types$1.interpreterDirective)) {
	      return null;
	    }

	    const node = this.startNode();
	    node.value = this.state.value;
	    this.next();
	    return this.finishNode(node, "InterpreterDirective");
	  }

	  isLet(context) {
	    if (!this.isContextual("let")) {
	      return false;
	    }

	    return this.isLetKeyword(context);
	  }

	  isLetKeyword(context) {
	    const next = this.nextTokenStart();
	    const nextCh = this.codePointAtPos(next);

	    if (nextCh === 92 || nextCh === 91) {
	      return true;
	    }

	    if (context) return false;
	    if (nextCh === 123) return true;

	    if (isIdentifierStart(nextCh)) {
	      keywordRelationalOperator.lastIndex = next;
	      const matched = keywordRelationalOperator.exec(this.input);

	      if (matched !== null) {
	        const endCh = this.codePointAtPos(next + matched[0].length);

	        if (!isIdentifierChar(endCh) && endCh !== 92) {
	          return false;
	        }
	      }

	      return true;
	    }

	    return false;
	  }

	  parseStatement(context, topLevel) {
	    if (this.match(types$1.at)) {
	      this.parseDecorators(true);
	    }

	    return this.parseStatementContent(context, topLevel);
	  }

	  parseStatementContent(context, topLevel) {
	    let starttype = this.state.type;
	    const node = this.startNode();
	    let kind;

	    if (this.isLet(context)) {
	      starttype = types$1._var;
	      kind = "let";
	    }

	    switch (starttype) {
	      case types$1._break:
	      case types$1._continue:
	        return this.parseBreakContinueStatement(node, starttype.keyword);

	      case types$1._debugger:
	        return this.parseDebuggerStatement(node);

	      case types$1._do:
	        return this.parseDoStatement(node);

	      case types$1._for:
	        return this.parseForStatement(node);

	      case types$1._function:
	        if (this.lookaheadCharCode() === 46) break;

	        if (context) {
	          if (this.state.strict) {
	            this.raise(this.state.start, ErrorMessages.StrictFunction);
	          } else if (context !== "if" && context !== "label") {
	            this.raise(this.state.start, ErrorMessages.SloppyFunction);
	          }
	        }

	        return this.parseFunctionStatement(node, false, !context);

	      case types$1._class:
	        if (context) this.unexpected();
	        return this.parseClass(node, true);

	      case types$1._if:
	        return this.parseIfStatement(node);

	      case types$1._return:
	        return this.parseReturnStatement(node);

	      case types$1._switch:
	        return this.parseSwitchStatement(node);

	      case types$1._throw:
	        return this.parseThrowStatement(node);

	      case types$1._try:
	        return this.parseTryStatement(node);

	      case types$1._const:
	      case types$1._var:
	        kind = kind || this.state.value;

	        if (context && kind !== "var") {
	          this.raise(this.state.start, ErrorMessages.UnexpectedLexicalDeclaration);
	        }

	        return this.parseVarStatement(node, kind);

	      case types$1._while:
	        return this.parseWhileStatement(node);

	      case types$1._with:
	        return this.parseWithStatement(node);

	      case types$1.braceL:
	        return this.parseBlock();

	      case types$1.semi:
	        return this.parseEmptyStatement(node);

	      case types$1._import:
	        {
	          const nextTokenCharCode = this.lookaheadCharCode();

	          if (nextTokenCharCode === 40 || nextTokenCharCode === 46) {
	              break;
	            }
	        }

	      case types$1._export:
	        {
	          if (!this.options.allowImportExportEverywhere && !topLevel) {
	            this.raise(this.state.start, ErrorMessages.UnexpectedImportExport);
	          }

	          this.next();
	          let result;

	          if (starttype === types$1._import) {
	            result = this.parseImport(node);

	            if (result.type === "ImportDeclaration" && (!result.importKind || result.importKind === "value")) {
	              this.sawUnambiguousESM = true;
	            }
	          } else {
	            result = this.parseExport(node);

	            if (result.type === "ExportNamedDeclaration" && (!result.exportKind || result.exportKind === "value") || result.type === "ExportAllDeclaration" && (!result.exportKind || result.exportKind === "value") || result.type === "ExportDefaultDeclaration") {
	              this.sawUnambiguousESM = true;
	            }
	          }

	          this.assertModuleNodeAllowed(node);
	          return result;
	        }

	      default:
	        {
	          if (this.isAsyncFunction()) {
	            if (context) {
	              this.raise(this.state.start, ErrorMessages.AsyncFunctionInSingleStatementContext);
	            }

	            this.next();
	            return this.parseFunctionStatement(node, true, !context);
	          }
	        }
	    }

	    const maybeName = this.state.value;
	    const expr = this.parseExpression();

	    if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
	      return this.parseLabeledStatement(node, maybeName, expr, context);
	    } else {
	      return this.parseExpressionStatement(node, expr);
	    }
	  }

	  assertModuleNodeAllowed(node) {
	    if (!this.options.allowImportExportEverywhere && !this.inModule) {
	      this.raise(node.start, SourceTypeModuleErrorMessages.ImportOutsideModule);
	    }
	  }

	  takeDecorators(node) {
	    const decorators = this.state.decoratorStack[this.state.decoratorStack.length - 1];

	    if (decorators.length) {
	      node.decorators = decorators;
	      this.resetStartLocationFromNode(node, decorators[0]);
	      this.state.decoratorStack[this.state.decoratorStack.length - 1] = [];
	    }
	  }

	  canHaveLeadingDecorator() {
	    return this.match(types$1._class);
	  }

	  parseDecorators(allowExport) {
	    const currentContextDecorators = this.state.decoratorStack[this.state.decoratorStack.length - 1];

	    while (this.match(types$1.at)) {
	      const decorator = this.parseDecorator();
	      currentContextDecorators.push(decorator);
	    }

	    if (this.match(types$1._export)) {
	      if (!allowExport) {
	        this.unexpected();
	      }

	      if (this.hasPlugin("decorators") && !this.getPluginOption("decorators", "decoratorsBeforeExport")) {
	        this.raise(this.state.start, ErrorMessages.DecoratorExportClass);
	      }
	    } else if (!this.canHaveLeadingDecorator()) {
	      throw this.raise(this.state.start, ErrorMessages.UnexpectedLeadingDecorator);
	    }
	  }

	  parseDecorator() {
	    this.expectOnePlugin(["decorators-legacy", "decorators"]);
	    const node = this.startNode();
	    this.next();

	    if (this.hasPlugin("decorators")) {
	      this.state.decoratorStack.push([]);
	      const startPos = this.state.start;
	      const startLoc = this.state.startLoc;
	      let expr;

	      if (this.eat(types$1.parenL)) {
	        expr = this.parseExpression();
	        this.expect(types$1.parenR);
	      } else {
	        expr = this.parseIdentifier(false);

	        while (this.eat(types$1.dot)) {
	          const node = this.startNodeAt(startPos, startLoc);
	          node.object = expr;
	          node.property = this.parseIdentifier(true);
	          node.computed = false;
	          expr = this.finishNode(node, "MemberExpression");
	        }
	      }

	      node.expression = this.parseMaybeDecoratorArguments(expr);
	      this.state.decoratorStack.pop();
	    } else {
	      node.expression = this.parseExprSubscripts();
	    }

	    return this.finishNode(node, "Decorator");
	  }

	  parseMaybeDecoratorArguments(expr) {
	    if (this.eat(types$1.parenL)) {
	      const node = this.startNodeAtNode(expr);
	      node.callee = expr;
	      node.arguments = this.parseCallExpressionArguments(types$1.parenR, false);
	      this.toReferencedList(node.arguments);
	      return this.finishNode(node, "CallExpression");
	    }

	    return expr;
	  }

	  parseBreakContinueStatement(node, keyword) {
	    const isBreak = keyword === "break";
	    this.next();

	    if (this.isLineTerminator()) {
	      node.label = null;
	    } else {
	      node.label = this.parseIdentifier();
	      this.semicolon();
	    }

	    this.verifyBreakContinue(node, keyword);
	    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
	  }

	  verifyBreakContinue(node, keyword) {
	    const isBreak = keyword === "break";
	    let i;

	    for (i = 0; i < this.state.labels.length; ++i) {
	      const lab = this.state.labels[i];

	      if (node.label == null || lab.name === node.label.name) {
	        if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
	        if (node.label && isBreak) break;
	      }
	    }

	    if (i === this.state.labels.length) {
	      this.raise(node.start, ErrorMessages.IllegalBreakContinue, keyword);
	    }
	  }

	  parseDebuggerStatement(node) {
	    this.next();
	    this.semicolon();
	    return this.finishNode(node, "DebuggerStatement");
	  }

	  parseHeaderExpression() {
	    this.expect(types$1.parenL);
	    const val = this.parseExpression();
	    this.expect(types$1.parenR);
	    return val;
	  }

	  parseDoStatement(node) {
	    this.next();
	    this.state.labels.push(loopLabel);
	    node.body = this.withTopicForbiddingContext(() => this.parseStatement("do"));
	    this.state.labels.pop();
	    this.expect(types$1._while);
	    node.test = this.parseHeaderExpression();
	    this.eat(types$1.semi);
	    return this.finishNode(node, "DoWhileStatement");
	  }

	  parseForStatement(node) {
	    this.next();
	    this.state.labels.push(loopLabel);
	    let awaitAt = -1;

	    if (this.isAwaitAllowed() && this.eatContextual("await")) {
	      awaitAt = this.state.lastTokStart;
	    }

	    this.scope.enter(SCOPE_OTHER);
	    this.expect(types$1.parenL);

	    if (this.match(types$1.semi)) {
	      if (awaitAt > -1) {
	        this.unexpected(awaitAt);
	      }

	      return this.parseFor(node, null);
	    }

	    const startsWithLet = this.isContextual("let");
	    const isLet = startsWithLet && this.isLetKeyword();

	    if (this.match(types$1._var) || this.match(types$1._const) || isLet) {
	      const init = this.startNode();
	      const kind = isLet ? "let" : this.state.value;
	      this.next();
	      this.parseVar(init, true, kind);
	      this.finishNode(init, "VariableDeclaration");

	      if ((this.match(types$1._in) || this.isContextual("of")) && init.declarations.length === 1) {
	        return this.parseForIn(node, init, awaitAt);
	      }

	      if (awaitAt > -1) {
	        this.unexpected(awaitAt);
	      }

	      return this.parseFor(node, init);
	    }

	    const startsWithUnescapedName = this.match(types$1.name) && !this.state.containsEsc;
	    const refExpressionErrors = new ExpressionErrors();
	    const init = this.parseExpression(true, refExpressionErrors);
	    const isForOf = this.isContextual("of");

	    if (isForOf) {
	      if (startsWithLet) {
	        this.raise(init.start, ErrorMessages.ForOfLet);
	      } else if (awaitAt === -1 && startsWithUnescapedName && init.type === "Identifier" && init.name === "async") {
	        this.raise(init.start, ErrorMessages.ForOfAsync);
	      }
	    }

	    if (isForOf || this.match(types$1._in)) {
	      this.toAssignable(init, true);
	      const description = isForOf ? "for-of statement" : "for-in statement";
	      this.checkLVal(init, description);
	      return this.parseForIn(node, init, awaitAt);
	    } else {
	      this.checkExpressionErrors(refExpressionErrors, true);
	    }

	    if (awaitAt > -1) {
	      this.unexpected(awaitAt);
	    }

	    return this.parseFor(node, init);
	  }

	  parseFunctionStatement(node, isAsync, declarationPosition) {
	    this.next();
	    return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), isAsync);
	  }

	  parseIfStatement(node) {
	    this.next();
	    node.test = this.parseHeaderExpression();
	    node.consequent = this.parseStatement("if");
	    node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
	    return this.finishNode(node, "IfStatement");
	  }

	  parseReturnStatement(node) {
	    if (!this.prodParam.hasReturn && !this.options.allowReturnOutsideFunction) {
	      this.raise(this.state.start, ErrorMessages.IllegalReturn);
	    }

	    this.next();

	    if (this.isLineTerminator()) {
	      node.argument = null;
	    } else {
	      node.argument = this.parseExpression();
	      this.semicolon();
	    }

	    return this.finishNode(node, "ReturnStatement");
	  }

	  parseSwitchStatement(node) {
	    this.next();
	    node.discriminant = this.parseHeaderExpression();
	    const cases = node.cases = [];
	    this.expect(types$1.braceL);
	    this.state.labels.push(switchLabel);
	    this.scope.enter(SCOPE_OTHER);
	    let cur;

	    for (let sawDefault; !this.match(types$1.braceR);) {
	      if (this.match(types$1._case) || this.match(types$1._default)) {
	        const isCase = this.match(types$1._case);
	        if (cur) this.finishNode(cur, "SwitchCase");
	        cases.push(cur = this.startNode());
	        cur.consequent = [];
	        this.next();

	        if (isCase) {
	          cur.test = this.parseExpression();
	        } else {
	          if (sawDefault) {
	            this.raise(this.state.lastTokStart, ErrorMessages.MultipleDefaultsInSwitch);
	          }

	          sawDefault = true;
	          cur.test = null;
	        }

	        this.expect(types$1.colon);
	      } else {
	        if (cur) {
	          cur.consequent.push(this.parseStatement(null));
	        } else {
	          this.unexpected();
	        }
	      }
	    }

	    this.scope.exit();
	    if (cur) this.finishNode(cur, "SwitchCase");
	    this.next();
	    this.state.labels.pop();
	    return this.finishNode(node, "SwitchStatement");
	  }

	  parseThrowStatement(node) {
	    this.next();

	    if (this.hasPrecedingLineBreak()) {
	      this.raise(this.state.lastTokEnd, ErrorMessages.NewlineAfterThrow);
	    }

	    node.argument = this.parseExpression();
	    this.semicolon();
	    return this.finishNode(node, "ThrowStatement");
	  }

	  parseCatchClauseParam() {
	    const param = this.parseBindingAtom();
	    const simple = param.type === "Identifier";
	    this.scope.enter(simple ? SCOPE_SIMPLE_CATCH : 0);
	    this.checkLVal(param, "catch clause", BIND_LEXICAL);
	    return param;
	  }

	  parseTryStatement(node) {
	    this.next();
	    node.block = this.parseBlock();
	    node.handler = null;

	    if (this.match(types$1._catch)) {
	      const clause = this.startNode();
	      this.next();

	      if (this.match(types$1.parenL)) {
	        this.expect(types$1.parenL);
	        clause.param = this.parseCatchClauseParam();
	        this.expect(types$1.parenR);
	      } else {
	        clause.param = null;
	        this.scope.enter(SCOPE_OTHER);
	      }

	      clause.body = this.withTopicForbiddingContext(() => this.parseBlock(false, false));
	      this.scope.exit();
	      node.handler = this.finishNode(clause, "CatchClause");
	    }

	    node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;

	    if (!node.handler && !node.finalizer) {
	      this.raise(node.start, ErrorMessages.NoCatchOrFinally);
	    }

	    return this.finishNode(node, "TryStatement");
	  }

	  parseVarStatement(node, kind) {
	    this.next();
	    this.parseVar(node, false, kind);
	    this.semicolon();
	    return this.finishNode(node, "VariableDeclaration");
	  }

	  parseWhileStatement(node) {
	    this.next();
	    node.test = this.parseHeaderExpression();
	    this.state.labels.push(loopLabel);
	    node.body = this.withTopicForbiddingContext(() => this.parseStatement("while"));
	    this.state.labels.pop();
	    return this.finishNode(node, "WhileStatement");
	  }

	  parseWithStatement(node) {
	    if (this.state.strict) {
	      this.raise(this.state.start, ErrorMessages.StrictWith);
	    }

	    this.next();
	    node.object = this.parseHeaderExpression();
	    node.body = this.withTopicForbiddingContext(() => this.parseStatement("with"));
	    return this.finishNode(node, "WithStatement");
	  }

	  parseEmptyStatement(node) {
	    this.next();
	    return this.finishNode(node, "EmptyStatement");
	  }

	  parseLabeledStatement(node, maybeName, expr, context) {
	    for (const label of this.state.labels) {
	      if (label.name === maybeName) {
	        this.raise(expr.start, ErrorMessages.LabelRedeclaration, maybeName);
	      }
	    }

	    const kind = this.state.type.isLoop ? "loop" : this.match(types$1._switch) ? "switch" : null;

	    for (let i = this.state.labels.length - 1; i >= 0; i--) {
	      const label = this.state.labels[i];

	      if (label.statementStart === node.start) {
	        label.statementStart = this.state.start;
	        label.kind = kind;
	      } else {
	        break;
	      }
	    }

	    this.state.labels.push({
	      name: maybeName,
	      kind: kind,
	      statementStart: this.state.start
	    });
	    node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
	    this.state.labels.pop();
	    node.label = expr;
	    return this.finishNode(node, "LabeledStatement");
	  }

	  parseExpressionStatement(node, expr) {
	    node.expression = expr;
	    this.semicolon();
	    return this.finishNode(node, "ExpressionStatement");
	  }

	  parseBlock(allowDirectives = false, createNewLexicalScope = true, afterBlockParse) {
	    const node = this.startNode();

	    if (allowDirectives) {
	      this.state.strictErrors.clear();
	    }

	    this.expect(types$1.braceL);

	    if (createNewLexicalScope) {
	      this.scope.enter(SCOPE_OTHER);
	    }

	    this.parseBlockBody(node, allowDirectives, false, types$1.braceR, afterBlockParse);

	    if (createNewLexicalScope) {
	      this.scope.exit();
	    }

	    return this.finishNode(node, "BlockStatement");
	  }

	  isValidDirective(stmt) {
	    return stmt.type === "ExpressionStatement" && stmt.expression.type === "StringLiteral" && !stmt.expression.extra.parenthesized;
	  }

	  parseBlockBody(node, allowDirectives, topLevel, end, afterBlockParse) {
	    const body = node.body = [];
	    const directives = node.directives = [];
	    this.parseBlockOrModuleBlockBody(body, allowDirectives ? directives : undefined, topLevel, end, afterBlockParse);
	  }

	  parseBlockOrModuleBlockBody(body, directives, topLevel, end, afterBlockParse) {
	    const oldStrict = this.state.strict;
	    let hasStrictModeDirective = false;
	    let parsedNonDirective = false;

	    while (!this.match(end)) {
	      const stmt = this.parseStatement(null, topLevel);

	      if (directives && !parsedNonDirective) {
	        if (this.isValidDirective(stmt)) {
	          const directive = this.stmtToDirective(stmt);
	          directives.push(directive);

	          if (!hasStrictModeDirective && directive.value.value === "use strict") {
	            hasStrictModeDirective = true;
	            this.setStrict(true);
	          }

	          continue;
	        }

	        parsedNonDirective = true;
	        this.state.strictErrors.clear();
	      }

	      body.push(stmt);
	    }

	    if (afterBlockParse) {
	      afterBlockParse.call(this, hasStrictModeDirective);
	    }

	    if (!oldStrict) {
	      this.setStrict(false);
	    }

	    this.next();
	  }

	  parseFor(node, init) {
	    node.init = init;
	    this.semicolon(false);
	    node.test = this.match(types$1.semi) ? null : this.parseExpression();
	    this.semicolon(false);
	    node.update = this.match(types$1.parenR) ? null : this.parseExpression();
	    this.expect(types$1.parenR);
	    node.body = this.withTopicForbiddingContext(() => this.parseStatement("for"));
	    this.scope.exit();
	    this.state.labels.pop();
	    return this.finishNode(node, "ForStatement");
	  }

	  parseForIn(node, init, awaitAt) {
	    const isForIn = this.match(types$1._in);
	    this.next();

	    if (isForIn) {
	      if (awaitAt > -1) this.unexpected(awaitAt);
	    } else {
	      node.await = awaitAt > -1;
	    }

	    if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.state.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
	      this.raise(init.start, ErrorMessages.ForInOfLoopInitializer, isForIn ? "for-in" : "for-of");
	    } else if (init.type === "AssignmentPattern") {
	      this.raise(init.start, ErrorMessages.InvalidLhs, "for-loop");
	    }

	    node.left = init;
	    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssignAllowIn();
	    this.expect(types$1.parenR);
	    node.body = this.withTopicForbiddingContext(() => this.parseStatement("for"));
	    this.scope.exit();
	    this.state.labels.pop();
	    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
	  }

	  parseVar(node, isFor, kind) {
	    const declarations = node.declarations = [];
	    const isTypescript = this.hasPlugin("typescript");
	    node.kind = kind;

	    for (;;) {
	      const decl = this.startNode();
	      this.parseVarId(decl, kind);

	      if (this.eat(types$1.eq)) {
	        decl.init = isFor ? this.parseMaybeAssignDisallowIn() : this.parseMaybeAssignAllowIn();
	      } else {
	        if (kind === "const" && !(this.match(types$1._in) || this.isContextual("of"))) {
	          if (!isTypescript) {
	            this.raise(this.state.lastTokEnd, ErrorMessages.DeclarationMissingInitializer, "Const declarations");
	          }
	        } else if (decl.id.type !== "Identifier" && !(isFor && (this.match(types$1._in) || this.isContextual("of")))) {
	          this.raise(this.state.lastTokEnd, ErrorMessages.DeclarationMissingInitializer, "Complex binding patterns");
	        }

	        decl.init = null;
	      }

	      declarations.push(this.finishNode(decl, "VariableDeclarator"));
	      if (!this.eat(types$1.comma)) break;
	    }

	    return node;
	  }

	  parseVarId(decl, kind) {
	    decl.id = this.parseBindingAtom();
	    this.checkLVal(decl.id, "variable declaration", kind === "var" ? BIND_VAR : BIND_LEXICAL, undefined, kind !== "var");
	  }

	  parseFunction(node, statement = FUNC_NO_FLAGS, isAsync = false) {
	    const isStatement = statement & FUNC_STATEMENT;
	    const isHangingStatement = statement & FUNC_HANGING_STATEMENT;
	    const requireId = !!isStatement && !(statement & FUNC_NULLABLE_ID);
	    this.initFunction(node, isAsync);

	    if (this.match(types$1.star) && isHangingStatement) {
	      this.raise(this.state.start, ErrorMessages.GeneratorInSingleStatementContext);
	    }

	    node.generator = this.eat(types$1.star);

	    if (isStatement) {
	      node.id = this.parseFunctionId(requireId);
	    }

	    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
	    this.state.maybeInArrowParameters = false;
	    this.scope.enter(SCOPE_FUNCTION);
	    this.prodParam.enter(functionFlags(isAsync, node.generator));

	    if (!isStatement) {
	      node.id = this.parseFunctionId();
	    }

	    this.parseFunctionParams(node, false);
	    this.withTopicForbiddingContext(() => {
	      this.parseFunctionBodyAndFinish(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
	    });
	    this.prodParam.exit();
	    this.scope.exit();

	    if (isStatement && !isHangingStatement) {
	      this.registerFunctionStatementId(node);
	    }

	    this.state.maybeInArrowParameters = oldMaybeInArrowParameters;
	    return node;
	  }

	  parseFunctionId(requireId) {
	    return requireId || this.match(types$1.name) ? this.parseIdentifier() : null;
	  }

	  parseFunctionParams(node, allowModifiers) {
	    this.expect(types$1.parenL);
	    this.expressionScope.enter(newParameterDeclarationScope());
	    node.params = this.parseBindingList(types$1.parenR, 41, false, allowModifiers);
	    this.expressionScope.exit();
	  }

	  registerFunctionStatementId(node) {
	    if (!node.id) return;
	    this.scope.declareName(node.id.name, this.state.strict || node.generator || node.async ? this.scope.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION, node.id.start);
	  }

	  parseClass(node, isStatement, optionalId) {
	    this.next();
	    this.takeDecorators(node);
	    const oldStrict = this.state.strict;
	    this.state.strict = true;
	    this.parseClassId(node, isStatement, optionalId);
	    this.parseClassSuper(node);
	    node.body = this.parseClassBody(!!node.superClass, oldStrict);
	    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
	  }

	  isClassProperty() {
	    return this.match(types$1.eq) || this.match(types$1.semi) || this.match(types$1.braceR);
	  }

	  isClassMethod() {
	    return this.match(types$1.parenL);
	  }

	  isNonstaticConstructor(method) {
	    return !method.computed && !method.static && (method.key.name === "constructor" || method.key.value === "constructor");
	  }

	  parseClassBody(hadSuperClass, oldStrict) {
	    this.classScope.enter();
	    const state = {
	      hadConstructor: false,
	      hadSuperClass
	    };
	    let decorators = [];
	    const classBody = this.startNode();
	    classBody.body = [];
	    this.expect(types$1.braceL);
	    this.withTopicForbiddingContext(() => {
	      while (!this.match(types$1.braceR)) {
	        if (this.eat(types$1.semi)) {
	          if (decorators.length > 0) {
	            throw this.raise(this.state.lastTokEnd, ErrorMessages.DecoratorSemicolon);
	          }

	          continue;
	        }

	        if (this.match(types$1.at)) {
	          decorators.push(this.parseDecorator());
	          continue;
	        }

	        const member = this.startNode();

	        if (decorators.length) {
	          member.decorators = decorators;
	          this.resetStartLocationFromNode(member, decorators[0]);
	          decorators = [];
	        }

	        this.parseClassMember(classBody, member, state);

	        if (member.kind === "constructor" && member.decorators && member.decorators.length > 0) {
	          this.raise(member.start, ErrorMessages.DecoratorConstructor);
	        }
	      }
	    });
	    this.state.strict = oldStrict;
	    this.next();

	    if (decorators.length) {
	      throw this.raise(this.state.start, ErrorMessages.TrailingDecorator);
	    }

	    this.classScope.exit();
	    return this.finishNode(classBody, "ClassBody");
	  }

	  parseClassMemberFromModifier(classBody, member) {
	    const key = this.parseIdentifier(true);

	    if (this.isClassMethod()) {
	      const method = member;
	      method.kind = "method";
	      method.computed = false;
	      method.key = key;
	      method.static = false;
	      this.pushClassMethod(classBody, method, false, false, false, false);
	      return true;
	    } else if (this.isClassProperty()) {
	      const prop = member;
	      prop.computed = false;
	      prop.key = key;
	      prop.static = false;
	      classBody.body.push(this.parseClassProperty(prop));
	      return true;
	    }

	    return false;
	  }

	  parseClassMember(classBody, member, state) {
	    const isStatic = this.isContextual("static");

	    if (isStatic) {
	      if (this.parseClassMemberFromModifier(classBody, member)) {
	        return;
	      }

	      if (this.eat(types$1.braceL)) {
	        this.parseClassStaticBlock(classBody, member);
	        return;
	      }
	    }

	    this.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
	  }

	  parseClassMemberWithIsStatic(classBody, member, state, isStatic) {
	    const publicMethod = member;
	    const privateMethod = member;
	    const publicProp = member;
	    const privateProp = member;
	    const method = publicMethod;
	    const publicMember = publicMethod;
	    member.static = isStatic;

	    if (this.eat(types$1.star)) {
	      method.kind = "method";
	      const isPrivateName = this.match(types$1.privateName);
	      this.parseClassElementName(method);

	      if (isPrivateName) {
	        this.pushClassPrivateMethod(classBody, privateMethod, true, false);
	        return;
	      }

	      if (this.isNonstaticConstructor(publicMethod)) {
	        this.raise(publicMethod.key.start, ErrorMessages.ConstructorIsGenerator);
	      }

	      this.pushClassMethod(classBody, publicMethod, true, false, false, false);
	      return;
	    }

	    const containsEsc = this.state.containsEsc;
	    const isPrivate = this.match(types$1.privateName);
	    const key = this.parseClassElementName(member);
	    const isSimple = key.type === "Identifier";
	    const maybeQuestionTokenStart = this.state.start;
	    this.parsePostMemberNameModifiers(publicMember);

	    if (this.isClassMethod()) {
	      method.kind = "method";

	      if (isPrivate) {
	        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
	        return;
	      }

	      const isConstructor = this.isNonstaticConstructor(publicMethod);
	      let allowsDirectSuper = false;

	      if (isConstructor) {
	        publicMethod.kind = "constructor";

	        if (state.hadConstructor && !this.hasPlugin("typescript")) {
	          this.raise(key.start, ErrorMessages.DuplicateConstructor);
	        }

	        if (isConstructor && this.hasPlugin("typescript") && member.override) {
	          this.raise(key.start, ErrorMessages.OverrideOnConstructor);
	        }

	        state.hadConstructor = true;
	        allowsDirectSuper = state.hadSuperClass;
	      }

	      this.pushClassMethod(classBody, publicMethod, false, false, isConstructor, allowsDirectSuper);
	    } else if (this.isClassProperty()) {
	      if (isPrivate) {
	        this.pushClassPrivateProperty(classBody, privateProp);
	      } else {
	        this.pushClassProperty(classBody, publicProp);
	      }
	    } else if (isSimple && key.name === "async" && !containsEsc && !this.isLineTerminator()) {
	      const isGenerator = this.eat(types$1.star);

	      if (publicMember.optional) {
	        this.unexpected(maybeQuestionTokenStart);
	      }

	      method.kind = "method";
	      const isPrivate = this.match(types$1.privateName);
	      this.parseClassElementName(method);
	      this.parsePostMemberNameModifiers(publicMember);

	      if (isPrivate) {
	        this.pushClassPrivateMethod(classBody, privateMethod, isGenerator, true);
	      } else {
	        if (this.isNonstaticConstructor(publicMethod)) {
	          this.raise(publicMethod.key.start, ErrorMessages.ConstructorIsAsync);
	        }

	        this.pushClassMethod(classBody, publicMethod, isGenerator, true, false, false);
	      }
	    } else if (isSimple && (key.name === "get" || key.name === "set") && !containsEsc && !(this.match(types$1.star) && this.isLineTerminator())) {
	      method.kind = key.name;
	      const isPrivate = this.match(types$1.privateName);
	      this.parseClassElementName(publicMethod);

	      if (isPrivate) {
	        this.pushClassPrivateMethod(classBody, privateMethod, false, false);
	      } else {
	        if (this.isNonstaticConstructor(publicMethod)) {
	          this.raise(publicMethod.key.start, ErrorMessages.ConstructorIsAccessor);
	        }

	        this.pushClassMethod(classBody, publicMethod, false, false, false, false);
	      }

	      this.checkGetterSetterParams(publicMethod);
	    } else if (this.isLineTerminator()) {
	      if (isPrivate) {
	        this.pushClassPrivateProperty(classBody, privateProp);
	      } else {
	        this.pushClassProperty(classBody, publicProp);
	      }
	    } else {
	      this.unexpected();
	    }
	  }

	  parseClassElementName(member) {
	    const {
	      type,
	      value,
	      start
	    } = this.state;

	    if ((type === types$1.name || type === types$1.string) && member.static && value === "prototype") {
	      this.raise(start, ErrorMessages.StaticPrototype);
	    }

	    if (type === types$1.privateName && value === "constructor") {
	      this.raise(start, ErrorMessages.ConstructorClassPrivateField);
	    }

	    return this.parsePropertyName(member, true);
	  }

	  parseClassStaticBlock(classBody, member) {
	    var _member$decorators;

	    this.expectPlugin("classStaticBlock", member.start);
	    this.scope.enter(SCOPE_CLASS | SCOPE_STATIC_BLOCK | SCOPE_SUPER);
	    const oldLabels = this.state.labels;
	    this.state.labels = [];
	    this.prodParam.enter(PARAM);
	    const body = member.body = [];
	    this.parseBlockOrModuleBlockBody(body, undefined, false, types$1.braceR);
	    this.prodParam.exit();
	    this.scope.exit();
	    this.state.labels = oldLabels;
	    classBody.body.push(this.finishNode(member, "StaticBlock"));

	    if ((_member$decorators = member.decorators) != null && _member$decorators.length) {
	      this.raise(member.start, ErrorMessages.DecoratorStaticBlock);
	    }
	  }

	  pushClassProperty(classBody, prop) {
	    if (!prop.computed && (prop.key.name === "constructor" || prop.key.value === "constructor")) {
	      this.raise(prop.key.start, ErrorMessages.ConstructorClassField);
	    }

	    classBody.body.push(this.parseClassProperty(prop));
	  }

	  pushClassPrivateProperty(classBody, prop) {
	    const node = this.parseClassPrivateProperty(prop);
	    classBody.body.push(node);
	    this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), CLASS_ELEMENT_OTHER, node.key.start);
	  }

	  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
	    classBody.body.push(this.parseMethod(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", true));
	  }

	  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
	    const node = this.parseMethod(method, isGenerator, isAsync, false, false, "ClassPrivateMethod", true);
	    classBody.body.push(node);
	    const kind = node.kind === "get" ? node.static ? CLASS_ELEMENT_STATIC_GETTER : CLASS_ELEMENT_INSTANCE_GETTER : node.kind === "set" ? node.static ? CLASS_ELEMENT_STATIC_SETTER : CLASS_ELEMENT_INSTANCE_SETTER : CLASS_ELEMENT_OTHER;
	    this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), kind, node.key.start);
	  }

	  parsePostMemberNameModifiers(methodOrProp) {}

	  parseClassPrivateProperty(node) {
	    this.parseInitializer(node);
	    this.semicolon();
	    return this.finishNode(node, "ClassPrivateProperty");
	  }

	  parseClassProperty(node) {
	    this.parseInitializer(node);
	    this.semicolon();
	    return this.finishNode(node, "ClassProperty");
	  }

	  parseInitializer(node) {
	    this.scope.enter(SCOPE_CLASS | SCOPE_SUPER);
	    this.expressionScope.enter(newExpressionScope());
	    this.prodParam.enter(PARAM);
	    node.value = this.eat(types$1.eq) ? this.parseMaybeAssignAllowIn() : null;
	    this.expressionScope.exit();
	    this.prodParam.exit();
	    this.scope.exit();
	  }

	  parseClassId(node, isStatement, optionalId, bindingType = BIND_CLASS) {
	    if (this.match(types$1.name)) {
	      node.id = this.parseIdentifier();

	      if (isStatement) {
	        this.checkLVal(node.id, "class name", bindingType);
	      }
	    } else {
	      if (optionalId || !isStatement) {
	        node.id = null;
	      } else {
	        this.unexpected(null, ErrorMessages.MissingClassName);
	      }
	    }
	  }

	  parseClassSuper(node) {
	    node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts() : null;
	  }

	  parseExport(node) {
	    const hasDefault = this.maybeParseExportDefaultSpecifier(node);
	    const parseAfterDefault = !hasDefault || this.eat(types$1.comma);
	    const hasStar = parseAfterDefault && this.eatExportStar(node);
	    const hasNamespace = hasStar && this.maybeParseExportNamespaceSpecifier(node);
	    const parseAfterNamespace = parseAfterDefault && (!hasNamespace || this.eat(types$1.comma));
	    const isFromRequired = hasDefault || hasStar;

	    if (hasStar && !hasNamespace) {
	      if (hasDefault) this.unexpected();
	      this.parseExportFrom(node, true);
	      return this.finishNode(node, "ExportAllDeclaration");
	    }

	    const hasSpecifiers = this.maybeParseExportNamedSpecifiers(node);

	    if (hasDefault && parseAfterDefault && !hasStar && !hasSpecifiers || hasNamespace && parseAfterNamespace && !hasSpecifiers) {
	      throw this.unexpected(null, types$1.braceL);
	    }

	    let hasDeclaration;

	    if (isFromRequired || hasSpecifiers) {
	      hasDeclaration = false;
	      this.parseExportFrom(node, isFromRequired);
	    } else {
	      hasDeclaration = this.maybeParseExportDeclaration(node);
	    }

	    if (isFromRequired || hasSpecifiers || hasDeclaration) {
	      this.checkExport(node, true, false, !!node.source);
	      return this.finishNode(node, "ExportNamedDeclaration");
	    }

	    if (this.eat(types$1._default)) {
	      node.declaration = this.parseExportDefaultExpression();
	      this.checkExport(node, true, true);
	      return this.finishNode(node, "ExportDefaultDeclaration");
	    }

	    throw this.unexpected(null, types$1.braceL);
	  }

	  eatExportStar(node) {
	    return this.eat(types$1.star);
	  }

	  maybeParseExportDefaultSpecifier(node) {
	    if (this.isExportDefaultSpecifier()) {
	      this.expectPlugin("exportDefaultFrom");
	      const specifier = this.startNode();
	      specifier.exported = this.parseIdentifier(true);
	      node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];
	      return true;
	    }

	    return false;
	  }

	  maybeParseExportNamespaceSpecifier(node) {
	    if (this.isContextual("as")) {
	      if (!node.specifiers) node.specifiers = [];
	      const specifier = this.startNodeAt(this.state.lastTokStart, this.state.lastTokStartLoc);
	      this.next();
	      specifier.exported = this.parseModuleExportName();
	      node.specifiers.push(this.finishNode(specifier, "ExportNamespaceSpecifier"));
	      return true;
	    }

	    return false;
	  }

	  maybeParseExportNamedSpecifiers(node) {
	    if (this.match(types$1.braceL)) {
	      if (!node.specifiers) node.specifiers = [];
	      node.specifiers.push(...this.parseExportSpecifiers());
	      node.source = null;
	      node.declaration = null;
	      return true;
	    }

	    return false;
	  }

	  maybeParseExportDeclaration(node) {
	    if (this.shouldParseExportDeclaration()) {
	      node.specifiers = [];
	      node.source = null;
	      node.declaration = this.parseExportDeclaration(node);
	      return true;
	    }

	    return false;
	  }

	  isAsyncFunction() {
	    if (!this.isContextual("async")) return false;
	    const next = this.nextTokenStart();
	    return !lineBreak.test(this.input.slice(this.state.pos, next)) && this.isUnparsedContextual(next, "function");
	  }

	  parseExportDefaultExpression() {
	    const expr = this.startNode();
	    const isAsync = this.isAsyncFunction();

	    if (this.match(types$1._function) || isAsync) {
	      this.next();

	      if (isAsync) {
	        this.next();
	      }

	      return this.parseFunction(expr, FUNC_STATEMENT | FUNC_NULLABLE_ID, isAsync);
	    } else if (this.match(types$1._class)) {
	      return this.parseClass(expr, true, true);
	    } else if (this.match(types$1.at)) {
	      if (this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport")) {
	        this.raise(this.state.start, ErrorMessages.DecoratorBeforeExport);
	      }

	      this.parseDecorators(false);
	      return this.parseClass(expr, true, true);
	    } else if (this.match(types$1._const) || this.match(types$1._var) || this.isLet()) {
	      throw this.raise(this.state.start, ErrorMessages.UnsupportedDefaultExport);
	    } else {
	      const res = this.parseMaybeAssignAllowIn();
	      this.semicolon();
	      return res;
	    }
	  }

	  parseExportDeclaration(node) {
	    return this.parseStatement(null);
	  }

	  isExportDefaultSpecifier() {
	    if (this.match(types$1.name)) {
	      const value = this.state.value;

	      if (value === "async" && !this.state.containsEsc || value === "let") {
	        return false;
	      }

	      if ((value === "type" || value === "interface") && !this.state.containsEsc) {
	        const l = this.lookahead();

	        if (l.type === types$1.name && l.value !== "from" || l.type === types$1.braceL) {
	          this.expectOnePlugin(["flow", "typescript"]);
	          return false;
	        }
	      }
	    } else if (!this.match(types$1._default)) {
	      return false;
	    }

	    const next = this.nextTokenStart();
	    const hasFrom = this.isUnparsedContextual(next, "from");

	    if (this.input.charCodeAt(next) === 44 || this.match(types$1.name) && hasFrom) {
	      return true;
	    }

	    if (this.match(types$1._default) && hasFrom) {
	      const nextAfterFrom = this.input.charCodeAt(this.nextTokenStartSince(next + 4));
	      return nextAfterFrom === 34 || nextAfterFrom === 39;
	    }

	    return false;
	  }

	  parseExportFrom(node, expect) {
	    if (this.eatContextual("from")) {
	      node.source = this.parseImportSource();
	      this.checkExport(node);
	      const assertions = this.maybeParseImportAssertions();

	      if (assertions) {
	        node.assertions = assertions;
	      }
	    } else {
	      if (expect) {
	        this.unexpected();
	      } else {
	        node.source = null;
	      }
	    }

	    this.semicolon();
	  }

	  shouldParseExportDeclaration() {
	    if (this.match(types$1.at)) {
	      this.expectOnePlugin(["decorators", "decorators-legacy"]);

	      if (this.hasPlugin("decorators")) {
	        if (this.getPluginOption("decorators", "decoratorsBeforeExport")) {
	          this.unexpected(this.state.start, ErrorMessages.DecoratorBeforeExport);
	        } else {
	          return true;
	        }
	      }
	    }

	    return this.state.type.keyword === "var" || this.state.type.keyword === "const" || this.state.type.keyword === "function" || this.state.type.keyword === "class" || this.isLet() || this.isAsyncFunction();
	  }

	  checkExport(node, checkNames, isDefault, isFrom) {
	    if (checkNames) {
	      if (isDefault) {
	        this.checkDuplicateExports(node, "default");

	        if (this.hasPlugin("exportDefaultFrom")) {
	          var _declaration$extra;

	          const declaration = node.declaration;

	          if (declaration.type === "Identifier" && declaration.name === "from" && declaration.end - declaration.start === 4 && !((_declaration$extra = declaration.extra) != null && _declaration$extra.parenthesized)) {
	            this.raise(declaration.start, ErrorMessages.ExportDefaultFromAsIdentifier);
	          }
	        }
	      } else if (node.specifiers && node.specifiers.length) {
	        for (const specifier of node.specifiers) {
	          const {
	            exported
	          } = specifier;
	          const exportedName = exported.type === "Identifier" ? exported.name : exported.value;
	          this.checkDuplicateExports(specifier, exportedName);

	          if (!isFrom && specifier.local) {
	            const {
	              local
	            } = specifier;

	            if (local.type !== "Identifier") {
	              this.raise(specifier.start, ErrorMessages.ExportBindingIsString, local.value, exportedName);
	            } else {
	              this.checkReservedWord(local.name, local.start, true, false);
	              this.scope.checkLocalExport(local);
	            }
	          }
	        }
	      } else if (node.declaration) {
	        if (node.declaration.type === "FunctionDeclaration" || node.declaration.type === "ClassDeclaration") {
	          const id = node.declaration.id;
	          if (!id) throw new Error("Assertion failure");
	          this.checkDuplicateExports(node, id.name);
	        } else if (node.declaration.type === "VariableDeclaration") {
	          for (const declaration of node.declaration.declarations) {
	            this.checkDeclaration(declaration.id);
	          }
	        }
	      }
	    }

	    const currentContextDecorators = this.state.decoratorStack[this.state.decoratorStack.length - 1];

	    if (currentContextDecorators.length) {
	      throw this.raise(node.start, ErrorMessages.UnsupportedDecoratorExport);
	    }
	  }

	  checkDeclaration(node) {
	    if (node.type === "Identifier") {
	      this.checkDuplicateExports(node, node.name);
	    } else if (node.type === "ObjectPattern") {
	      for (const prop of node.properties) {
	        this.checkDeclaration(prop);
	      }
	    } else if (node.type === "ArrayPattern") {
	      for (const elem of node.elements) {
	        if (elem) {
	          this.checkDeclaration(elem);
	        }
	      }
	    } else if (node.type === "ObjectProperty") {
	      this.checkDeclaration(node.value);
	    } else if (node.type === "RestElement") {
	      this.checkDeclaration(node.argument);
	    } else if (node.type === "AssignmentPattern") {
	      this.checkDeclaration(node.left);
	    }
	  }

	  checkDuplicateExports(node, name) {
	    if (this.exportedIdentifiers.has(name)) {
	      this.raise(node.start, name === "default" ? ErrorMessages.DuplicateDefaultExport : ErrorMessages.DuplicateExport, name);
	    }

	    this.exportedIdentifiers.add(name);
	  }

	  parseExportSpecifiers() {
	    const nodes = [];
	    let first = true;
	    this.expect(types$1.braceL);

	    while (!this.eat(types$1.braceR)) {
	      if (first) {
	        first = false;
	      } else {
	        this.expect(types$1.comma);
	        if (this.eat(types$1.braceR)) break;
	      }

	      const node = this.startNode();
	      node.local = this.parseModuleExportName();
	      node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local.__clone();
	      nodes.push(this.finishNode(node, "ExportSpecifier"));
	    }

	    return nodes;
	  }

	  parseModuleExportName() {
	    if (this.match(types$1.string)) {
	      const result = this.parseStringLiteral(this.state.value);
	      const surrogate = result.value.match(loneSurrogate);

	      if (surrogate) {
	        this.raise(result.start, ErrorMessages.ModuleExportNameHasLoneSurrogate, surrogate[0].charCodeAt(0).toString(16));
	      }

	      return result;
	    }

	    return this.parseIdentifier(true);
	  }

	  parseImport(node) {
	    node.specifiers = [];

	    if (!this.match(types$1.string)) {
	      const hasDefault = this.maybeParseDefaultImportSpecifier(node);
	      const parseNext = !hasDefault || this.eat(types$1.comma);
	      const hasStar = parseNext && this.maybeParseStarImportSpecifier(node);
	      if (parseNext && !hasStar) this.parseNamedImportSpecifiers(node);
	      this.expectContextual("from");
	    }

	    node.source = this.parseImportSource();
	    const assertions = this.maybeParseImportAssertions();

	    if (assertions) {
	      node.assertions = assertions;
	    } else {
	      const attributes = this.maybeParseModuleAttributes();

	      if (attributes) {
	        node.attributes = attributes;
	      }
	    }

	    this.semicolon();
	    return this.finishNode(node, "ImportDeclaration");
	  }

	  parseImportSource() {
	    if (!this.match(types$1.string)) this.unexpected();
	    return this.parseExprAtom();
	  }

	  shouldParseDefaultImport(node) {
	    return this.match(types$1.name);
	  }

	  parseImportSpecifierLocal(node, specifier, type, contextDescription) {
	    specifier.local = this.parseIdentifier();
	    this.checkLVal(specifier.local, contextDescription, BIND_LEXICAL);
	    node.specifiers.push(this.finishNode(specifier, type));
	  }

	  parseAssertEntries() {
	    const attrs = [];
	    const attrNames = new Set();

	    do {
	      if (this.match(types$1.braceR)) {
	        break;
	      }

	      const node = this.startNode();
	      const keyName = this.state.value;

	      if (attrNames.has(keyName)) {
	        this.raise(this.state.start, ErrorMessages.ModuleAttributesWithDuplicateKeys, keyName);
	      }

	      attrNames.add(keyName);

	      if (this.match(types$1.string)) {
	        node.key = this.parseStringLiteral(keyName);
	      } else {
	        node.key = this.parseIdentifier(true);
	      }

	      this.expect(types$1.colon);

	      if (!this.match(types$1.string)) {
	        throw this.unexpected(this.state.start, ErrorMessages.ModuleAttributeInvalidValue);
	      }

	      node.value = this.parseStringLiteral(this.state.value);
	      this.finishNode(node, "ImportAttribute");
	      attrs.push(node);
	    } while (this.eat(types$1.comma));

	    return attrs;
	  }

	  maybeParseModuleAttributes() {
	    if (this.match(types$1._with) && !this.hasPrecedingLineBreak()) {
	      this.expectPlugin("moduleAttributes");
	      this.next();
	    } else {
	      if (this.hasPlugin("moduleAttributes")) return [];
	      return null;
	    }

	    const attrs = [];
	    const attributes = new Set();

	    do {
	      const node = this.startNode();
	      node.key = this.parseIdentifier(true);

	      if (node.key.name !== "type") {
	        this.raise(node.key.start, ErrorMessages.ModuleAttributeDifferentFromType, node.key.name);
	      }

	      if (attributes.has(node.key.name)) {
	        this.raise(node.key.start, ErrorMessages.ModuleAttributesWithDuplicateKeys, node.key.name);
	      }

	      attributes.add(node.key.name);
	      this.expect(types$1.colon);

	      if (!this.match(types$1.string)) {
	        throw this.unexpected(this.state.start, ErrorMessages.ModuleAttributeInvalidValue);
	      }

	      node.value = this.parseStringLiteral(this.state.value);
	      this.finishNode(node, "ImportAttribute");
	      attrs.push(node);
	    } while (this.eat(types$1.comma));

	    return attrs;
	  }

	  maybeParseImportAssertions() {
	    if (this.isContextual("assert") && !this.hasPrecedingLineBreak()) {
	      this.expectPlugin("importAssertions");
	      this.next();
	    } else {
	      if (this.hasPlugin("importAssertions")) return [];
	      return null;
	    }

	    this.eat(types$1.braceL);
	    const attrs = this.parseAssertEntries();
	    this.eat(types$1.braceR);
	    return attrs;
	  }

	  maybeParseDefaultImportSpecifier(node) {
	    if (this.shouldParseDefaultImport(node)) {
	      this.parseImportSpecifierLocal(node, this.startNode(), "ImportDefaultSpecifier", "default import specifier");
	      return true;
	    }

	    return false;
	  }

	  maybeParseStarImportSpecifier(node) {
	    if (this.match(types$1.star)) {
	      const specifier = this.startNode();
	      this.next();
	      this.expectContextual("as");
	      this.parseImportSpecifierLocal(node, specifier, "ImportNamespaceSpecifier", "import namespace specifier");
	      return true;
	    }

	    return false;
	  }

	  parseNamedImportSpecifiers(node) {
	    let first = true;
	    this.expect(types$1.braceL);

	    while (!this.eat(types$1.braceR)) {
	      if (first) {
	        first = false;
	      } else {
	        if (this.eat(types$1.colon)) {
	          throw this.raise(this.state.start, ErrorMessages.DestructureNamedImport);
	        }

	        this.expect(types$1.comma);
	        if (this.eat(types$1.braceR)) break;
	      }

	      this.parseImportSpecifier(node);
	    }
	  }

	  parseImportSpecifier(node) {
	    const specifier = this.startNode();
	    const importedIsString = this.match(types$1.string);
	    specifier.imported = this.parseModuleExportName();

	    if (this.eatContextual("as")) {
	      specifier.local = this.parseIdentifier();
	    } else {
	      const {
	        imported
	      } = specifier;

	      if (importedIsString) {
	        throw this.raise(specifier.start, ErrorMessages.ImportBindingIsString, imported.value);
	      }

	      this.checkReservedWord(imported.name, specifier.start, true, true);
	      specifier.local = imported.__clone();
	    }

	    this.checkLVal(specifier.local, "import specifier", BIND_LEXICAL);
	    node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
	  }

	  isThisParam(param) {
	    return param.type === "Identifier" && param.name === "this";
	  }

	}

	class Parser extends StatementParser {
	  constructor(options, input) {
	    options = getOptions(options);
	    super(options, input);
	    this.options = options;
	    this.initializeScopes();
	    this.plugins = pluginsMap(this.options.plugins);
	    this.filename = options.sourceFilename;
	  }

	  getScopeHandler() {
	    return ScopeHandler;
	  }

	  parse() {
	    this.enterInitialScopes();
	    const file = this.startNode();
	    const program = this.startNode();
	    this.nextToken();
	    file.errors = null;
	    this.parseTopLevel(file, program);
	    file.errors = this.state.errors;
	    return file;
	  }

	}

	function pluginsMap(plugins) {
	  const pluginMap = new Map();

	  for (const plugin of plugins) {
	    const [name, options] = Array.isArray(plugin) ? plugin : [plugin, {}];
	    if (!pluginMap.has(name)) pluginMap.set(name, options || {});
	  }

	  return pluginMap;
	}

	function parse$9(input, options) {
	  var _options;

	  if (((_options = options) == null ? void 0 : _options.sourceType) === "unambiguous") {
	    options = Object.assign({}, options);

	    try {
	      options.sourceType = "module";
	      const parser = getParser(options, input);
	      const ast = parser.parse();

	      if (parser.sawUnambiguousESM) {
	        return ast;
	      }

	      if (parser.ambiguousScriptDifferentAst) {
	        try {
	          options.sourceType = "script";
	          return getParser(options, input).parse();
	        } catch (_unused) {}
	      } else {
	        ast.program.sourceType = "script";
	      }

	      return ast;
	    } catch (moduleError) {
	      try {
	        options.sourceType = "script";
	        return getParser(options, input).parse();
	      } catch (_unused2) {}

	      throw moduleError;
	    }
	  } else {
	    return getParser(options, input).parse();
	  }
	}
	function parseExpression(input, options) {
	  const parser = getParser(options, input);

	  if (parser.options.strictMode) {
	    parser.state.strict = true;
	  }

	  return parser.getExpression();
	}

	function getParser(options, input) {
	  let cls = Parser;

	  if (options != null && options.plugins) {
	    validatePlugins(options.plugins);
	    cls = getParserClass(options.plugins);
	  }

	  return new cls(options, input);
	}

	const parserClassCache = {};

	function getParserClass(pluginsFromOptions) {
	  const pluginList = mixinPluginNames.filter(name => hasPlugin(pluginsFromOptions, name));
	  const key = pluginList.join("/");
	  let cls = parserClassCache[key];

	  if (!cls) {
	    cls = Parser;

	    for (const plugin of pluginList) {
	      cls = mixinPlugins[plugin](cls);
	    }

	    parserClassCache[key] = cls;
	  }

	  return cls;
	}

	lib.parse = parse$9;
	lib.parseExpression = parseExpression;
	lib.tokTypes = types$1;

	const recast$3 = require$$1;
	const babelParse = lib;
	var parse$8 = function(code, options) {
	    options = options || commonjsGlobal.parseOptions;
	    let plugins = ((options && options.plugins) ? options.plugins : [])
	        .concat([
	            'plugin-syntax-typescript',
	            'typescript',
	            'asyncGenerators',
	            'bigInt',
	            'classProperties',
	            'classPrivateProperties',
	            'classPrivateMethods',
	            'doExpressions',
	            'dynamicImport',
	            'exportDefaultFrom',
	            'exportNamespaceFrom',
	            'functionBind',
	            'functionSent',
	            'importMeta',
	            'logicalAssignment',
	            'nullishCoalescingOperator',
	            'numericSeparator',
	            'objectRestSpread',
	            'optionalCatchBinding',
	            'optionalChaining',
	            'partialApplication',
	            ['pipelineOperator', {'proposal': "smart"}],
	            'throwExpressions',
	            'topLevelAwait',
	            'decorators-legacy', 
	            ['@babel/plugin-syntax-decorators','decorators', { decoratorsBeforeExport: true }]
	        ]);
	    const parseOptions = {
	        // sourceType: 'module',
	        allowHashBang: true,
	        ecmaVersion: Infinity,
	        allowImportExportEverywhere: true,
	        allowReturnOutsideFunction: true,
	        allowAwaitOutsideFunction: true,
	        allowUndeclaredExports: true,
	        allowSuperOutsideMethod: true,
	        startLine: 1,
	        tokens: true,
	        ...(options || {}),
	        plugins,
	    };
	    return recast$3.parse(code, {
	        parser: {
	            parse(code) {
	                try {
	                    try {
	                        return babelParse.parse(code, parseOptions);   
	                    } catch(e) {
	                        // 是否存在jsx可能导致parse报错，所以在此兼容
	                        if (parseOptions.plugins) {
	                            const jsxIndex = parseOptions.plugins.indexOf('jsx');
	                            if (jsxIndex == -1) {
	                                parseOptions.plugins.push('jsx');
	                            } else {
	                                parseOptions.plugins.splice(jsxIndex, 1);
	                            }
	                        }
	                        return babelParse.parse(code, parseOptions);
	                    }
	                } catch(e) {
	                    throw Error(e.message)
	                }
	            }
	        }
	    });
	};

	function isObject$6(value) {
	    return typeof value == 'object' && value;
	}

	const hasOwn$2 = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);

	var util = {
	    isObject: isObject$6,
	    hasOwn: hasOwn$2
	};

	const { isObject: isObject$5 } = util;

	// 查找时 ast 无用属性，这些属性的保留（如行数信息）会干扰节点的匹配，所以需要过滤掉
	const Props$1 = [
	    'computed',
	    'range',
	    'loc',
	    'type',
	    'raw',
	    'start',
	    'end',
	    'leadingComments',
	    'shorthand',
	    'extra',
	    'static'
	];

	const ignoreTypeList = [
	    'Super', 
	    'Import',
	    'ImportSpecifier', 'ImportDefaultSpecifier', 'ImportNamespaceSpecifier',
	    'exportSpecifier', 'exportDefaultSpecifier', 'exportNamespaceSpecifier'
	];
	const filterProps$5 = function (node, structure, propList, expando) {
	    const props = propList || Props$1;
	    for (const key in node) {
	        // 过滤值为空的字段
	        if ((key === 'type' && ignoreTypeList.indexOf(node[key]) > -1) || (props.indexOf(key) == -1 && node[key])) {
	            if (isObject$5(node[key])) {
	                if (Array.isArray(node[key])) {
	                    structure[key] = [];
	                    node[key].forEach((n, i) => {
	                        structure[key][i] = {};
	                        filterProps$5(n, structure[key][i], props);
	                    });
	                } else {
	                    structure[key] = {};
	                    filterProps$5(node[key], structure[key], props);
	                }
	            } else if (expando) {
	                if (typeof node[key] == 'string') {
	                    node[key] = node[key].replace(/\$_\$/g, expando)
	                        .replace(/\$\$\$/g, expando.slice(0, -1) + '$3')
	                        .replace(/\/\$_\/\$/g, '$_$')
	                        .replace(/\/\$\/\$\/\$/g, '$$$$$$');
	                    structure[key] = node[key];
	                }
	            }
	            else {
	                structure[key] = node[key];
	            }
	        }
	    }
	};

	var filterProp$2 = filterProps$5;

	// 把简单的api转换成ast
	// todo await 
	const recast$2 = require$$1;
	const parse$7 = parse$8;
	const visit$2 = recast$2.types.visit;
	const filterProps$4 = filterProp$2;

	function getSelector$3(selectorCode, parseOptions, expando) {
	    const selector = { nodeType: '', structure: {} };
	    if (typeof selectorCode != 'string') {
	        // 如果是通过builders造出来的ast结构，比如return语句
	        selector.nodeType = selectorCode.type;
	        filterProps$4(selectorCode, selector.structure, '', expando);
	        selector.type = selectorCode.type; // 兼容只用type匹配的选择器
	        return selector;
	    } else {
	        selectorCode = selectorCode
	            .replace(/\$_\$/g, expando)
	            .replace(/\$\$\$/g, expando.slice(0, -1) + '$3')
	            .replace(/\/\$_\/\$/g, '$_$')
	            .replace(/\/\$\/\$\/\$/g, '$$$$$$');
	    }
	    if (selectorCode.match(/^{((.|\s)+:(.|\s)+)+}$/)) {
	        // 如果是对象字面量
	        let ast = parse$7(`var o = ${selectorCode}`);
	        ast = ast.program.body[0].declarations[0].init;
	        selector.nodeType = 'ObjectExpression';
	        filterProps$4(ast, selector.structure);
	        return selector;
	    }
	    let seletorAst;
	    try {
	        seletorAst = parse$7(selectorCode, parseOptions);
	        if (seletorAst.program.body.length == 0) {
	            // 开头的字符串会被解析成directive
	            if (seletorAst.program.directives.length) {
	                return {
	                    nodeType: 'StringLiteral',
	                    structure: {
	                        value: selectorCode ? selectorCode.slice(1, -1) : ''
	                    }
	                }
	            } else if (seletorAst.program.comments.length) {
	                let ast = seletorAst.program.comments[0];
	                selector.nodeType = ast.type;
	                filterProps$4(ast, selector.structure);
	                return selector;
	            }
	            
	        } else if (seletorAst.program.body[0] && seletorAst.program.body[0].type == 'LabeledStatement') {
	            throw new Error('Missing semicolon')
	        }
	    } catch(e) {
	        // 可能是对象属性
	        try {
	            seletorAst = parse$7(`({${selectorCode}})`, parseOptions);
	            seletorAst = seletorAst.program.body[0].expression.properties[0];
	        } catch(e) {
	            seletorAst = null;
	        }
	        
	        // 可能是类属性
	        let clsSelectorAst = null;
	        try {
	            clsSelectorAst = parse$7(`class a$_$ { ${selectorCode} }`, parseOptions);
	            clsSelectorAst = clsSelectorAst.program.body[0].body.body[0];
	        } catch(e) {
	            //
	        }
	        
	        const result = [seletorAst, clsSelectorAst]
	            .filter(s => !!s)
	            .map(sel => {
	                const selector = {
	                    nodeType: sel.type,
	                    structure: {}
	                };
	                filterProps$4(sel, selector.structure);
	                return selector;
	            });
	        if (result.length) {
	            return result;
	        } else {
	            throw new Error('parse error!' + e.message);
	        }
	    }
	    visit$2(seletorAst, {
	        visitExpressionStatement(path) {
	            const expression = path.value.expression;
	            if (!expression) return;
	            selector.nodeType = expression.type;
	            filterProps$4(expression, selector.structure);
	            this.abort();
	        },
	        visitStatement(path) {
	            const expression = path.value;
	            if (!expression) return;
	            selector.nodeType = expression.type;
	            filterProps$4(expression, selector.structure);
	            this.abort();
	        },
	        visitDeclaration(path) {
	            const declaration = path.value;
	            if (!declaration) return;
	            selector.nodeType = declaration.type;
	            filterProps$4(declaration, selector.structure);
	            this.abort();
	        }
	    });

	    return selector;
	}


	var getSelector_1$1 = getSelector$3;

	const recast$1 = require$$1;
	var generate$7 = function(ast, isPretty) {
	    return isPretty ? recast$1.prettyPrint(ast).code : recast$1.print(ast).code;
	};

	const generate$6 = generate$7;
	var specific = function handleSpecific({ full, partial, prop, extraData, Expando } = {}) {
	    let specific, result;
	    if (prop == 'body') {
	        // 匹配一块代码
	        try {
	            let bodyContent = partial.body;
	            if (Array.isArray(partial.body)) {
	                bodyContent = partial.body[0] || partial.body.body[0];
	            } else if (partial.body && partial.body.body) {
	                bodyContent = partial.body.body[0];
	            }
	            let name = '';
	            if (bodyContent) {
	                name = bodyContent.expression ? bodyContent.expression.name : bodyContent.name ? bodyContent.name : '';
	            }
	            if (name && name.match) {
	                if (name.match(Expando)) {
	                    const expandoKey = name.replace(Expando, '') || '0';
	                    extraData[expandoKey] = extraData[expandoKey] || [];
	                    // 去掉首尾花括号
	                    const bodyStr = generate$6(full.body) ? generate$6(full.body).slice(1, -2) : '';
	                    extraData[expandoKey].push({ node: full.body, value: bodyStr });
	                    specific = 'body';
	                    result = true;
	                }
	            }
	        } catch (e) {
	            // console.log(e)
	        }
	    }
	    if (partial && partial.typeName && !partial.typeParameters) {
	        if (partial.typeName.name.match(Expando)) {
	            specific = 'TypeAnnotation';
	            const expandoKey = partial.typeName.name.replace(Expando, '') || '0';
	            extraData[expandoKey] = extraData[expandoKey] || [];
	            extraData[expandoKey].push(full);
	            result = true;
	        }
	    }
	    return { specific, result }
	};

	const { isObject: isObject$4, hasOwn: hasOwn$1 } = util;
	// 通过简单ast结构查找ast节点

	const recast = require$$1;
	const visit$1 = recast.types.visit;
	const filterProps$3 = filterProp$2;
	const generate$5 = generate$7;
	const handleSpecific = specific;
	const strictSequenceAttrList = ['arguments', 'params'];

	let Expando$1 = 'g123o456g789o';

	function checkIsMatch$1(full, partial, extraData, strictSequence) {
	    return Object.keys(partial).every((prop) => {
	        const { specific, result } = handleSpecific({ full, partial, prop, extraData, Expando: Expando$1 });
	        if (specific) {
	            return result;
	        }
	        if (!full || !partial) {
	            // full没有
	            return false;
	        } else if (isObject$4(partial[prop])) {
	            let res = false;
	            let has$$$ = false;
	            if (Array.isArray(partial[prop])) {
	                // 处理$$$这种情况
	                has$$$ = find$$$$1(partial[prop], full[prop], extraData, strictSequence);
	            }
	            if (Array.isArray(partial[prop]) && !strictSequence && strictSequenceAttrList.indexOf(prop) == -1) {
	                if (hasOwn$1(full, prop)) {
	                    res = partial[prop].every((p) => {
	                        let a = false;
	                        if (!full[prop].length && partial[prop].length == 1 && has$$$) {
	                            return true
	                        }
	                        full[prop] &&
	                            full[prop].forEach((f) => {
	                                if (f && f.type == 'ObjectProperty') {
	                                    // 兼容 { a: 1 } 匹配 { 'a': 1 } 这种情况
	                                    f.key.name && (f.key.value = f.key.name);
	                                    f.key.value && (f.key.name = f.key.value);
	                                }
	                                if (
	                                    checkIsMatch$1(
	                                        f,
	                                        p,
	                                        extraData,
	                                        strictSequence
	                                    )
	                                ) {
	                                    a = true;
	                                }
	                            });
	                        return a;
	                    });
	                } else {
	                    res = false;
	                }
	            } else {
	                try {
	                    // 例如 使用{ $_$: $_$ }匹配{ a() {} }
	                    let fullProp = full[prop];
	                    if (!fullProp && !Array.isArray(full)) {
	                        if (partial[prop] && typeof partial[prop].name == 'string' && 
	                            (partial[prop].name.match(Expando$1) || partial[prop].name.match(new RegExp(Expando$1.slice(0, -1) + '\\$3')))
	                        ) {
	                            fullProp = full;
	                        }
	                    }
	                    res =
	                        // hasOwn(full, prop) 
	                        // &&
	                        checkIsMatch$1(
	                            fullProp,
	                            partial[prop],
	                            extraData,
	                            strictSequence
	                        );
	                } catch (e) {
	                    console.log(e);
	                }
	            }
	            return res;
	        } else {
	            if (partial[prop].match && partial[prop].match(new RegExp(Expando$1.slice(0, -1) + '\\$3'))) {
	                return true;
	            }
	            if (partial[prop].match && partial[prop].match(Expando$1)) {
	                if (!full) return;
	                let extra = {
	                    node: full
	                };
	                const expandoKey = partial[prop].replace(Expando$1, '') || '0';
	                extraData[expandoKey] = extraData[expandoKey] || [];
	                
	                switch (full.type) {
	                case 'Identifier':
	                    extra.value = full.name;
	                    break;
	                case 'ThisExpression':
	                    extra.value = 'this';
	                    break;
	                case 'StringLiteral':
	                    extra.raw = `'${full.value}'`;
	                    extra.value = full.value;
	                    break;
	                case 'NumericLiteral':
	                case 'BooleanLiteral':
	                    extra.value = full.value;
	                    break;
	                case 'NullLiteral':
	                    extra.value = null;
	                    break;
	                case 'CommentLine':
	                case 'CommentBlock':
	                    extra.value = full.value;
	                    break;
	                default:
	                    try {
	                        extra.value = generate$5(full);
	                    } catch(e) {
	                        if (full[prop]) {
	                            extra.value = full[prop];
	                        } else {
	                            extra.value = {};
	                            filterProps$3(full, extra.value);
	                        }
	                    }
	                }
	                extraData[expandoKey].push(extra);
	                return true;
	            } else if (partial[prop]) ;
	            if (full && full.type == 'ObjectProperty') {
	                // 兼容 { a: 1 } 匹配 { 'a': 1 } 这种情况
	                full.key.name && (full.key.value = full.key.name);
	                full.key.value && (full.key.name = full.key.value);
	            }
	            return full ? full[prop] == partial[prop] : false;
	        }
	    });
	}

	function find$$$$1(partial, full, extraData, strictSequence) {
	    // 先考虑strctSequence = false的情况
	    let key$$$;
	    let index$$$ = -1;
	    partial.forEach((p, i) => {
	        for (const key in p) {
	            const value = p[key] ? (p[key].name || p[key].value || p[key]) : null;
	            if (value && value.match && value.match(new RegExp(Expando$1.slice(0, -1) + '\\$3'))) {
	                key$$$ = value.replace(new RegExp(Expando$1.slice(0, -1) + '\\$3'), '') || '$';
	                index$$$ = i;
	          
	                break;
	            }
	        }
	    });
	    if (!key$$$) {
	        return false;
	    }
	    const extraNodeList = full ? full.slice(0) : [];
	    partial.forEach((p, i) => {
	        if (i == index$$$) {
	            return;
	        }
	        let fi = 0;
	        while(extraNodeList[fi]) {
	            if (checkIsMatch$1(extraNodeList[fi], p, {}, strictSequence)) {
	                extraNodeList.splice(fi, 1);
	            } else {
	                fi++;
	            }
	        }
	    });
	    extraData[`$$$${key$$$}`] = (extraData[`$$$${key$$$}`] || []).concat(extraNodeList);
	    return true;
	}
	 
	function find$3(nodeType, structure, strictSequence, deep = 'nn', expando = 'g123o456g789o') {
	    const nodePathList = [];
	    const matchWildCardList = [];
	    let isMatch = false;
	    Expando$1 = expando;
	    visit$1(this, {
	        [`visit${nodeType}`](path) {
	            const extraData = {};
	            if (deep != 'n' || path.parent.name == 'program') {
	                isMatch = checkIsMatch$1(
	                    path.value,
	                    structure,
	                    extraData,
	                    strictSequence
	                );
	            } else {
	                isMatch = false;
	            }
	            if (isMatch) {
	                nodePathList.push(path);
	                matchWildCardList.push(extraData);
	            }
	            switch (deep) {
	            case '1':
	                this.abort();
	                break;
	            case 'n':
	                return false;
	            case 'nn':
	                this.traverse(path);
	                break;
	            default:
	                return false;
	            }
	        },
	        visitComment() {
	            return false;
	        },
	    });
	    return { nodePathList, matchWildCardList };
	}
	var general = { find: find$3, visit: visit$1 };

	var nodeLinkMap$1 = {
	    'JSXAttribute': ' ',
	    'JSXText': '\n',
	    'ObjectProperty': ', \n',
	    'ObjectMethod': ', \n',
	    'Identifier': ',',
	    'StringLiteral': ',',
	    'JSXElement': '\n',
	    'ImportSpecifier': ','
	};

	const getSelector$2 = getSelector_1$1;
	const { find: find$2, visit } = general;
	const parse$6 = parse$8;
	const generate$4 = generate$7;
	const nodeLinkMap = nodeLinkMap$1;

	const core$3 = {
	    // 通过选择器获取，返回ast片段
	    getAstsBySelector(ast, selector, { strictSequence, deep, parseOptions, expando = 'g123o456g789o' } = {}) { 
	        //strictSequence作用：
	        // 有的时候数组不要求顺序，如{a:$_$}匹配{b:1, a:2}
	        // 有的时候需要，如function($_$, $_$)匹配function(a, b) {}
	        
	        if (!Array.isArray(selector)) {
	            selector = [selector];
	        }
	        let nodePathList = [];
	        let matchWildCardList = [];
	        const selectorAst = [];
	        selector.forEach(item => {
	            let sels = getSelector$2(item, this.parseOptions || parseOptions, expando);
	            !Array.isArray(sels) && (sels = [sels]);
	            sels.forEach(sel => {
	                if (!sel.nodeType) {
	                    throw new Error('语句类型缺失，请在 https://github.com/thx/gogocode/issues 上提供您的代码样例')
	                }
	                selectorAst.push(sel);
	            });
	        });
	        const posStrList = [];
	        selectorAst.forEach(item => {
	            const res = find$2.call(ast, item.nodeType, item.structure, strictSequence, deep, expando);
	            res.nodePathList.forEach((p, i) => {
	                const posStr = `${p.node.start},${p.node.end}`;
	                if (posStrList.indexOf(posStr) == -1 || item.nodeType.match('Comment')) { // 去重
	                    nodePathList.push(p);
	                    matchWildCardList.push(res.matchWildCardList[i]);
	                    posStrList.push(posStr);
	                }
	            });
	        });
	        return {
	            nodePathList,
	            matchWildCardList,
	            pathList: nodePathList,
	            extraDataList: matchWildCardList
	        };
	    },
	    getParentListByAst(path) {
	        const list = [];
	        while(path && path.parentPath) {
	            list.push(path.parentPath);
	            path = path.parentPath;
	        }
	        return list
	    },
	    getPrevAst(path) {
	        let parent = path.parentPath;
	        while(parent.value && !Array.isArray(parent.value)) {
	            path = parent;
	            parent = parent.parentPath;
	        }
	        parent = parent.value;
	        if (parent) {
	            const index = parent.indexOf(path.node);
	            if (index > 0) {
	                return parent[index - 1];
	            } else return null;
	        }
	        return null;
	    },
	    getNextAst(path) {
	        let parent = path.parentPath;
	        while(parent.value && !Array.isArray(parent.value)) {
	            path = parent;
	            parent = parent.parentPath;
	        }
	        parent = parent.value;
	        if (parent) {
	            const index = parent.indexOf(path.node);
	            if (parent[index + 1]) {
	                return parent[index + 1];
	            } else return null;
	        }
	        return null;
	    },
	    hasChildrenSelector(path, childSelector, expando) {
	        const childCache = path.__childCache || {};
	        for (const childKey in childCache) {
	            if (['type', 'directives'].indexOf(childKey) > -1) {
	                continue;
	            }
	            const child = childCache[childKey];
	            const { nodePathList } = core$3.getAstsBySelector(child, childSelector, { deep: 'nn', expando });
	            if (nodePathList.length > 0) {
	                return true;
	            }
	        }
	    },
	    buildAstByAstStr(str, astPatialMap = {}, { isProgram = false, parseOptions } = {}) {
	        try {
	            let ast;
	            try {
	                const ast = parse$6(str, parseOptions);
	                const program = core$3.replaceStrByAst(ast, astPatialMap);
	                if (program) {
	                    if (isProgram) {
	                        return program;
	                    } else {
	                        if (program.program.body.length > 1) {
	                            return program.program.body
	                        } else if (program.program.body.length == 1) {
	                            return program.program.body[0];
	                        } else if (program.program.comments && program.program.comments[0]) {
	                            return program.program.comments[0];
	                        } else if (program.program.directives 
	                            && program.program.directives[0]
	                            && program.program.directives[0].value 
	                            && program.program.directives[0].value.value) {
	                            return {
	                                type: 'StringLiteral',
	                                value: program.program.directives[0].value.value
	                            }
	                        } else {
	                            return program.program
	                        }
	                    }
	                } else {
	                    return null;
	                }
	            } catch(e) {
	                if (str.match(/^{(\s|.)+\}$/)) {
	                    // 对象字面量
	                    ast = parse$6(`var o = ${str}`);
	                    ast = ast.program.body[0].declarations[0].init;
	                    return ast;
	                } else if (e.message.match('Missing semicolon')) {
	                    // 可能是对象属性
	                    try {
	                        ast = parse$6(`({${str}})`, parseOptions);
	                        ast = ast.program.body[0].expression.properties[0];
	                        return ast
	                    } catch(err) {
	                        throw new Error(`buildAstByAstStr failed:${str}`);
	                    }
	                } else {
	                    throw new Error(`buildAstByAstStr failed:${str}`)
	                }
	            }
	        } catch(error) {
	            throw new Error(`buildAstByAstStr failed:${str}`)
	        }
	    },
	    replaceStrByAst(ast, astPatialMap = {}) {
	        for (let key in astPatialMap) {
	            const valueAst = astPatialMap[key];
	            const { nodePathList } = core$3.getAstsBySelector(ast, [
	                { type: 'Identifier', name: `$_$${key}$_$` },
	                { type: 'StringLiteral', value: `$_$${key}$_$` }
	            ]);
	            if (nodePathList.length > 0) {
	                nodePathList[0].replace(valueAst);
	            }
	        }
	        return ast;
	    },
	    replaceAstByAst(oldAst, newAst) {
	        if (Array.isArray(newAst)) {
	            const { arrPath = {}, index } = getArrPath(oldAst);
	            if (Array.isArray(arrPath.value) && index > -1) {
	                arrPath.value.splice(index, 1, ...newAst);
	                return;
	            }
	        }
	        if (newAst.type == 'BlockStatement' && Array.isArray(oldAst.parentPath.value)) {
	            const parentNode = oldAst.parentPath.value;
	            const oldIndex = parentNode.indexOf(oldAst.node);
	            parentNode.splice(oldIndex, 1);
	            newAst.body.forEach((replacer, index) => {
	                oldAst.parentPath.value.splice(oldIndex + index, 0, replacer);
	            });
	        } else if (!oldAst.parent && oldAst.node.type == 'File' ) {
	            oldAst.node.program.body = [ newAst ];
	        } else {
	            oldAst.replace(newAst);
	        }
	    },
	    replaceSelBySel(ast, selector, replacer, strictSequence, parseOptions, expando = 'g123o456g789o') {
	        // 用于结构不一致的，整体替换
	        const { nodePathList, matchWildCardList } = core$3.getAstsBySelector(ast, selector, { strictSequence, deep: 'nn', parseOptions: this.parseOptions || parseOptions, expando });
	        const originReplacer = replacer;
	        nodePathList.forEach((path, i) => {
	            const extra = matchWildCardList[i];
	            replacer = originReplacer;
	            if (typeof replacer == 'function') {
	                replacer = replacer(extra, path);
	                if (replacer === null) {
	                    return;
	                }
	            }
	            if (Object.keys(extra).length > 0 && typeof replacer == 'string') {
	                let newReplacer = replacer;
	                for(let key in extra) {
	                    if (key.match(/\$\$\$/)) {
	                        let key$$$ = key.replace(/\$\$\$/, '');
	                        key$$$ == '$' && (key$$$ = '');
	                        let join = '\n';

	                        let wildCardCode = extra[key].map(item => {
	                            let codeStr = generate$4(item);
	                            try {
	                                // 嵌套replace
	                                const childAst = core$3.buildAstByAstStr(generate$4(item));
	                                core$3.replaceSelBySel(childAst, selector, replacer, strictSequence, parseOptions, expando);
	                                codeStr = generate$4(childAst);
	                            } catch(e) { // 
	                            }
	                            nodeLinkMap[item.type] && (join = nodeLinkMap[item.type]);
	                            return codeStr
	                        }).join(join);
	                        // 不能都用,连接，还是需要找到$_$
	                        newReplacer = newReplacer.replace('$$$' + key$$$, wildCardCode);
	                    } else {
	                        let realKey = key == '0' ? '' : key;
	                        const matchLength = (newReplacer.match(new RegExp(`\\$_\\$${realKey}`, 'g')) || []).length;
	                        if (matchLength == extra[key].length) {
	                            extra[key].forEach(ext => {
	                                newReplacer = newReplacer
	                                    .replace(`'$_$${realKey}'`, ext.raw || ext.value)
	                                    .replace(`"$_$${realKey}"`, ext.raw || ext.value)
	                                    .replace('$_$' + realKey, ext.raw || ext.value);
	                            });
	                        } else {

	                            // 删除代码块外部{},find里前置处理了，不需要在这里做了
	                            let wildCardCode = extra[key].map(item => 
	                                typeof item.value !== 'object' ? (item.raw || item.value) : ``
	                            ).join(', ');
	                            newReplacer = newReplacer
	                                .replace(new RegExp(`'\\$_\\$${realKey}'`, 'g'), wildCardCode)
	                                .replace(new RegExp(`"\\$_\\$${realKey}"`, 'g'), wildCardCode)
	                                .replace(new RegExp(`\\$_\\$${realKey}`, 'g'), wildCardCode);
	                            // 通过选择器替换ast，返回完整ast
	                        }
	                    }
	                }
	                if (!replacer) {
	                    core$3.removePathSafe(path);
	                } else {
	                    let replacerAst = core$3.buildAstByAstStr(newReplacer);
	                    if (path.node.type == 'ClassMethod') {
	                        replacerAst = core$3.buildAstByAstStr(`class a$ {
                            ${newReplacer}
                        }`, { isProgram: false }).body.body[0];
	                    }
	                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression' && path.parentPath.name != 'body') {
	                        replacerAst = replacerAst.expression;
	                    }
	                    path && core$3.replaceAstByAst(path, replacerAst);
	                }
	            } else {
	                if (!replacer) {
	                    core$3.removePathSafe(path);
	                } else if (typeof replacer == 'string') {
	                    let replacerAst = replacer.type ? replacer : core$3.buildAstByAstStr(replacer);
	                    if (!replacer.type && path.node.type == 'ClassMethod') {
	                        replacerAst = core$3.buildAstByAstStr(`class a$ {
                            ${replacer}
                        }`, { isProgram: false }).body.body[0];
	                    }
	                    if (replacerAst.expression && replacerAst.expression.type != 'AssignmentExpression' && path.parentPath.name != 'body') {
	                        replacerAst = replacerAst.expression;
	                    }
	                    path && core$3.replaceAstByAst(path, replacerAst);
	                } else {
	                    if (replacer[0] && replacer[0].nodePath) {
	                        path.replace(replacer[0].nodePath.node);
	                    } else {
	                        core$3.replaceAstByAst(path, replacer);
	                    }
	                }
	            }
	        });
	    },
	    insertAstListBefore(path, nodeList) {
	        if (!Array.isArray(nodeList)) {
	            nodeList = [nodeList];
	        }
	        for (let i = 0; i< 3; i++) {
	            const pNode = path.parentPath;
	            if (pNode && pNode.value && Array.isArray(pNode.value)) {
	                const index = pNode.value.indexOf(path.value);
	                nodeList.reverse().forEach(item => {
	                    pNode.value.splice(index, 0, item);
	                });
	                i = 3;
	            } else {
	                path = pNode;
	            }
	        }
	    },
	    insertAstListAfter(path, nodeList) {
	        if (!Array.isArray(nodeList)) {
	            nodeList = [nodeList];
	        }
	        for (let i = 0; i< 3; i++) {
	            const pNode = path.parentPath;
	            if (pNode && pNode.value && Array.isArray(pNode.value)) {
	                const index = pNode.value.indexOf(path.value) + 1;
	                nodeList.reverse().forEach(item => {
	                    pNode.value.splice(index, 0, item);
	                });
	                i = 3;
	            } else {
	                path = pNode;
	            }
	        }
	    },
	    removeAst(ast, selector, { strictSequence, parseOptions, expando } = {}) {
	        if (!ast || typeof ast !== 'object') {
	            throw new Error('remove failed! first argument mast be object')
	        }
	        if (!selector || (typeof selector !== 'object' && typeof selector !== 'string' && !Array.isArray(selector))) {
	            throw new Error('remove failed! first argument mast be object、string or string array')
	        }
	        // const selectorAst = getSelector(selector, this.parseOptions);
	        // console.log(selectorAst)
	        const { nodePathList } = core$3.getAstsBySelector(ast, selector, { strictSequence, parseOptions, expando });
	        // const { nodePathList } = find.call(ast, selectorAst.nodeType, selectorAst.structure, true, 'nn');
	        // console.log(nodePathList)
	        nodePathList.forEach(path => {
	            // 多条语句逗号分割的话，只删除一个；一条语句的话，删除父节点
	            if ((!path.parentPath.value.length) || path.parentPath.value.length == 1) {
	                core$3.removePathSafe(path.parent);
	            } else {
	                core$3.removePathSafe(path);
	            }
	        });
	    },
	    remove(path) {
	        try {
	            core$3.removePathSafe(path);
	        } catch(e) {
	            throw `remove failed: ${e}`
	        }
	    },
	    removePathSafe(path) {
	        // 对于expression 删除之后，父节点 expressionStatement 还在，输出会多个分号。所以应该删除 expressionStatement
	        if (path.name == 'expression') {
	            path.parent.replace();
	        } else {
	            path.replace();
	        }
	    },
	    appendJsxAttr(ast, obj) {
	        if (!ast || typeof ast !== 'object') {
	            throw new Error('appendJsxAttr failed! first argument mast be object')
	        }
	        if (!obj || typeof obj !== 'object') {
	            throw new Error('appendJsxAttr failed! second argument mast be object')
	        }
	        const attrs = [];
	        for (let o in obj) {
	            attrs.push(`${o}=${obj[o]}`.replace(/'\$'/g, "$"));
	        }
	        try {
	            const jsxPartial = core$3.buildAstByAstStr(`<div ${attrs.join(' ')}></div>`);
	            const newAttrs = jsxPartial.expression.openingElement.attributes;
	            if (ast.value) {
	                ast.value.openingElement.attributes = ast.value.openingElement.attributes.concat(newAttrs);
	            } else {
	                ast.expression.openingElement.attributes = ast.expression.openingElement.attributes.concat(newAttrs);
	            }
	            
	        } catch(e) {
	            throw new Error('appendJsxAttr failed!' + e)
	        }
	        
	    },
	    visit() {
	        visit.call(this, ...Array.from(arguments));
	    },
	    traverse(node, cb, parentNode) {
	        if(!node || typeof node !== 'object'){
	            throw new Error('traverse failed! first argument mast be object')
	        }
	        if(!cb || typeof cb !== 'function'){
	            throw new Error('traverse failed! second argument mast be function')
	        }
	        if (node.type && typeof node.type == 'string') {
	            // 是一个ast节点,且不是token
	            if (['File', 'Program'].indexOf(node.type) == -1) {
	                cb(node, { parentNode });
	            }
	            for (let attr in node) {
	                const child = node[attr];
	                if (child) {
	                    if (Array.isArray(child)) {
	                        let i = 0;
	                        while(child[i]) {
	                            const c = child[i];
	                            core$3.traverse(c, cb, child);
	                            i = child.indexOf(c);
	                            i++;
	                        }
	                        // child.forEach(c => core.traverse(c, cb, node));
	                    } else if (child.type) {
	                        core$3.traverse(child, cb, node);
	                    }
	                }
	            }
	        }
	    },
	    initComment(ast) {
	        core$3.traverse(ast, ((node, {parentNode}) => {
	            if (Array.isArray(parentNode)) {
	                const index = parentNode.indexOf(node);
	                if (index == parentNode.length - 1) {
	                    if (node.trailingComments) {
	                        node.trailingComments.forEach(comment => {
	                            parentNode.push(comment);
	                        });
	                    }
	                }
	                if (node.leadingComments) {
	                    node.leadingComments.reverse().forEach(comment => {
	                        parentNode.splice(index, 0, comment);
	                    });
	                }
	            }
	        }));
	    },
	    removeComments(ast) {
	        core$3.traverse(ast, ((node, {parentNode}) => {
	            if (Array.isArray(parentNode)) {
	                if (!parentNode.every(item => typeof item.type == 'string' && item.type.match('Comment'))) {
	                    let i = 0;
	                    while (parentNode[i]) {
	                        const node = parentNode[i];
	                        if (node && typeof node.type == 'string' && node.type.match('Comment')) {
	                            parentNode.splice(i, 1);
	                            i--;
	                        }
	                        i++;
	                    }
	                }
	            }
	        }));
	    }
	};
	function getArrPath(path) {
	    let arrPath = path;
	    if (!arrPath) return;
	    let lastNode = path.node;
	    let i = 0;
	    while(!Array.isArray(arrPath.value) && i < 3) {
	        lastNode = arrPath.node;
	        arrPath = arrPath.parentPath;
	        i++;
	    }
	    if (Array.isArray(arrPath.value)) {
	        return { arrPath: arrPath, index : arrPath.value.indexOf(lastNode) }
	    } else {
	        return { arrPath: {}, index: -1 };
	    }
	}
	var core_1$2 = core$3;

	var _hyntaxYx_1_0_3_hyntaxYx = {};

	const OPEN_TAG_NAME_PATTERN = /^<(\S+)/;
	const CLOSE_TAG_NAME_PATTERN = /^<\/((?:.|\n)*)>$/;

	function prettyJSON (obj) {
	  return JSON.stringify(obj, null, 2)
	}

	/**
	 * Clear tree of nodes from everything
	 * "parentRef" properties so the tree
	 * can be easily stringified into JSON.
	 */
	function clearAst (ast) {
	  const cleanAst = ast;

	  delete cleanAst.parentRef;

	  if (Array.isArray(ast.content.children)) {
	    cleanAst.content.children = ast.content.children.map((node) => {
	      return clearAst(node)
	    });
	  }

	  return cleanAst
	}

	function parseOpenTagName$2 (openTagStartTokenContent) {
	  const match = openTagStartTokenContent.match(OPEN_TAG_NAME_PATTERN);

	  if (match === null) {
	    throw new Error(
	      'Unable to parse open tag name.\n' +
	      `${ openTagStartTokenContent } does not match pattern of opening tag.`
	    )
	  }

	  return match[1]
	}

	function parseCloseTagName$1 (closeTagTokenContent) {
	  const match = closeTagTokenContent.match(CLOSE_TAG_NAME_PATTERN);

	  if (match === null) {
	    throw new Error(
	      'Unable to parse close tag name.\n' +
	      `${ closeTagTokenContent } does not match pattern of closing tag.`
	    )
	  }

	  return match[1].trim()
	}

	function calculateTokenCharactersRange$f (state, { keepBuffer }) {
	  if (keepBuffer === undefined) {
	    throw new Error(
	      'Unable to calculate characters range for token.\n' +
	      '"keepBuffer" parameter is not specified to decide if ' +
	      'the decision buffer is a part of characters range.'
	    )
	  }

	  const startPosition = (
	    state.caretPosition -
	    (state.accumulatedContent.length - 1) -
	    state.decisionBuffer.length
	  );

	  let endPosition;

	  if (!keepBuffer) {
	    endPosition = state.caretPosition - state.decisionBuffer.length;
	  } else {
	    endPosition = state.caretPosition;
	  }

	  return { startPosition, endPosition }
	}

	function isWhitespace$8 (char) {
	  return char === ' ' || char === '\n' || char === '\t'
	}

	var helpers = {
	  prettyJSON,
	  clearAst,
	  parseOpenTagName: parseOpenTagName$2,
	  parseCloseTagName: parseCloseTagName$1,
	  calculateTokenCharactersRange: calculateTokenCharactersRange$f,
	  isWhitespace: isWhitespace$8
	};

	var tokenTypes = {
	  TOKEN_TEXT: 'token:text',

	  TOKEN_OPEN_TAG_START: 'token:open-tag-start',

	  TOKEN_ATTRIBUTE_KEY: 'token:attribute-key',
	  TOKEN_ATTRIBUTE_ASSIGNMENT: 'token:attribute-assignment',
	  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START: 'token:attribute-value-wrapper-start',
	  TOKEN_ATTRIBUTE_VALUE: 'token:attribute-value',
	  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END: 'token:attribute-value-wrapper-end',

	  TOKEN_OPEN_TAG_END: 'token:open-tag-end',
	  TOKEN_CLOSE_TAG: 'token:close-tag',

	  TOKEN_OPEN_TAG_START_SCRIPT: 'token:open-tag-start-script',
	  TOKEN_SCRIPT_TAG_CONTENT: 'token:script-tag-content',
	  TOKEN_OPEN_TAG_END_SCRIPT: 'token:open-tag-end-script',
	  TOKEN_CLOSE_TAG_SCRIPT: 'token:close-tag-script',

	  TOKEN_OPEN_TAG_START_STYLE: 'token:open-tag-start-style',
	  TOKEN_STYLE_TAG_CONTENT: 'token:style-tag-content',
	  TOKEN_OPEN_TAG_END_STYLE: 'token:open-tag-end-style',
	  TOKEN_CLOSE_TAG_STYLE: 'token:close-tag-style',

	  TOKEN_DOCTYPE_START: 'token:doctype-start',
	  TOKEN_DOCTYPE_END: 'token:doctype-end',
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START: 'token:doctype-attribute-wrapper-start',
	  TOKEN_DOCTYPE_ATTRIBUTE: 'token:doctype-attribute',
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END: 'token:doctype-attribute-wrapper-end',

	  TOKEN_COMMENT_START: 'token:comment-start',
	  TOKEN_COMMENT_CONTENT: 'token:comment-content',
	  TOKEN_COMMENT_END: 'token:comment-end'
	};

	var tokenizerContexts = {
	  DATA_CONTEXT: 'tokenizer-context:data',
	  OPEN_TAG_START_CONTEXT: 'tokenizer-context:open-tag-start',
	  CLOSE_TAG_CONTEXT: 'tokenizer-context:close-tag',
	  ATTRIBUTES_CONTEXT: 'tokenizer-context:attributes',
	  OPEN_TAG_END_CONTEXT: 'tokenizer-context:open-tag-end',
	  ATTRIBUTE_KEY_CONTEXT: 'tokenizer-context:attribute-key',
	  ATTRIBUTE_VALUE_CONTEXT: 'tokenizer-context:attribute-value',
	  ATTRIBUTE_VALUE_BARE_CONTEXT: 'tokenizer-context:attribute-value-bare',
	  ATTRIBUTE_VALUE_WRAPPED_CONTEXT: 'tokenizer-context:attribute-value-wrapped',
	  SCRIPT_CONTENT_CONTEXT: 'tokenizer-context:script-content',
	  STYLE_CONTENT_CONTEXT: 'tokenizer-context:style-content',
	  DOCTYPE_START_CONTEXT: 'tokenizer-context:doctype-start',
	  DOCTYPE_END_CONTEXT: 'tokenizer-context:doctype-end',
	  DOCTYPE_ATTRIBUTES_CONTEXT: 'tokenizer-context:doctype-attributes',
	  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT: 'tokenizer-context:doctype-attribute-wrapped',
	  DOCTYPE_ATTRIBUTE_BARE_CONTEXT: 'tokenizer-context:doctype-attribute-bare',
	  COMMENT_START_CONTEXT: 'tokenizer-context:comment-start',
	  COMMENT_CONTENT_CONTEXT: 'tokenizer-context:comment-content',
	  COMMENT_END_CONTEXT: 'tokenizer-context:comment-end'
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$e } = helpers;

	const {
	  TOKEN_TEXT: TOKEN_TEXT$1,
	  TOKEN_COMMENT_START: TOKEN_COMMENT_START$2
	} = tokenTypes;
	const {
	  OPEN_TAG_START_CONTEXT: OPEN_TAG_START_CONTEXT$1,
	  CLOSE_TAG_CONTEXT: CLOSE_TAG_CONTEXT$1,
	  DOCTYPE_START_CONTEXT: DOCTYPE_START_CONTEXT$1,
	  COMMENT_CONTENT_CONTEXT: COMMENT_CONTENT_CONTEXT$1
	} = tokenizerContexts;

	const COMMENT_START = '<!--';

	function generateTextToken (state) {
	  const range = calculateTokenCharactersRange$e(state, { keepBuffer: false });

	  return {
	    type: TOKEN_TEXT$1,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  }
	}

	function openingCornerBraceWithText (state, tokens) {
	  if (state.accumulatedContent.length !== 0) {
	    tokens.push(generateTextToken(state));
	  }

	  state.accumulatedContent = state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.currentContext = OPEN_TAG_START_CONTEXT$1;
	  state.caretPosition++;
	}

	function openingCornerBraceWithSlash (state, tokens) {
	  if (state.accumulatedContent.length !== 0) {
	    tokens.push(generateTextToken(state));
	  }

	  state.accumulatedContent = state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.currentContext = CLOSE_TAG_CONTEXT$1;
	  state.caretPosition++;
	}

	function doctypeStart$1 (state, tokens) {
	  if (state.accumulatedContent.length !== 0) {
	    tokens.push(generateTextToken(state));
	  }

	  state.accumulatedContent = state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_START_CONTEXT$1;
	  state.caretPosition++;
	}

	function commentStart (state, tokens) {
	  if (state.accumulatedContent.length !== 0) {
	    tokens.push(generateTextToken(state));
	  }

	  const commentStartRange = {
	    startPosition: state.caretPosition - (COMMENT_START.length - 1),
	    endPosition: state.caretPosition
	  };

	  tokens.push({
	    type: TOKEN_COMMENT_START$2,
	    content: state.decisionBuffer,
	    startPosition: commentStartRange.startPosition,
	    endPosition: commentStartRange.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = COMMENT_CONTENT_CONTEXT$1;
	  state.caretPosition++;
	}

	function handleContentEnd (state, tokens) {
	  const textContent = state.accumulatedContent + state.decisionBuffer;

	  if (textContent.length !== 0) {
	    const range = calculateTokenCharactersRange$e(state, { keepBuffer: false });

	    tokens.push({
	      type: TOKEN_TEXT$1,
	      content: textContent,
	      startPosition: range.startPosition,
	      endPosition: range.endPosition
	    });
	  }
	}

	function isIncompleteDoctype (chars) {
	  const charsUpperCase = chars.toUpperCase();

	  return (
	    charsUpperCase === '<!'
	    || charsUpperCase === '<!D'
	    || charsUpperCase === '<!DO'
	    || charsUpperCase === '<!DOC'
	    || charsUpperCase === '<!DOCT'
	    || charsUpperCase === '<!DOCTY'
	    || charsUpperCase === '<!DOCTYP'
	  )
	}

	const OPEN_TAG_START_PATTERN = /^<\w/;

	function parseSyntax$g (chars, state, tokens) {
	  if (OPEN_TAG_START_PATTERN.test(chars)) {
	    return openingCornerBraceWithText(state, tokens)
	  }

	  if (chars === '</') {
	    return openingCornerBraceWithSlash(state, tokens)
	  }

	  if (
	    chars === '<'
	    || chars === '<!'
	    || chars === '<!-'
	  ) {
	    state.caretPosition++;

	    return
	  }

	  if (chars === COMMENT_START) {
	    return commentStart(state, tokens)
	  }

	  if (isIncompleteDoctype(chars)) {
	    state.caretPosition++;

	    return
	  }

	  if (chars.toUpperCase() === '<!DOCTYPE') {
	    return doctypeStart$1(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var data = {
	  parseSyntax: parseSyntax$g,
	  handleContentEnd
	};

	const {
	  parseOpenTagName: parseOpenTagName$1,
	  isWhitespace: isWhitespace$7,
	  calculateTokenCharactersRange: calculateTokenCharactersRange$d
	} = helpers;

	const {
	  TOKEN_OPEN_TAG_START: TOKEN_OPEN_TAG_START$3,
	  TOKEN_OPEN_TAG_START_SCRIPT: TOKEN_OPEN_TAG_START_SCRIPT$2,
	  TOKEN_OPEN_TAG_START_STYLE: TOKEN_OPEN_TAG_START_STYLE$2
	} = tokenTypes;
	const {
	  OPEN_TAG_END_CONTEXT: OPEN_TAG_END_CONTEXT$3,
	  ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$a
	} = tokenizerContexts;

	const tokensMap$1 = {
	  'script': TOKEN_OPEN_TAG_START_SCRIPT$2,
	  'style': TOKEN_OPEN_TAG_START_STYLE$2,
	  'default': TOKEN_OPEN_TAG_START$3
	};

	function tagEnd$2 (state, tokens) {
	  const tagName = parseOpenTagName$1(state.accumulatedContent);
	  const range = calculateTokenCharactersRange$d(state, { keepBuffer: false });

	  tokens.push({
	    type: tokensMap$1[tagName] || tokensMap$1.default,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.decisionBuffer = '';
	  state.accumulatedContent = '';
	  state.currentContext = OPEN_TAG_END_CONTEXT$3;
	  state.contextParams[OPEN_TAG_END_CONTEXT$3] = { tagName };
	}

	function whitespace$1 (state, tokens) {
	  const tagName = parseOpenTagName$1(state.accumulatedContent);
	  const range = calculateTokenCharactersRange$d(state, { keepBuffer: false });

	  tokens.push({
	    type: tokensMap$1[tagName] || tokensMap$1.default,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTES_CONTEXT$a;
	  state.contextParams[ATTRIBUTES_CONTEXT$a] = { tagName };
	  state.caretPosition++;
	}

	function parseSyntax$f (chars, state, tokens) {
	  if (chars === '>' || chars === '/') {
	    return tagEnd$2(state, tokens)
	  }

	  if (isWhitespace$7(chars)) {
	    return whitespace$1(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var openTagStart = {
	  parseSyntax: parseSyntax$f
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$c } = helpers;

	const { TOKEN_CLOSE_TAG: TOKEN_CLOSE_TAG$2 } = tokenTypes;
	const { DATA_CONTEXT: DATA_CONTEXT$6 } = tokenizerContexts;

	function closingCornerBrace$4 (state, tokens) {
	  const range = calculateTokenCharactersRange$c(state, { keepBuffer: true });

	  tokens.push({
	    type: TOKEN_CLOSE_TAG$2,
	    content: state.accumulatedContent + state.decisionBuffer,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DATA_CONTEXT$6;
	  state.caretPosition++;
	}

	function parseSyntax$e (chars, state, tokens) {
	  if (chars === '>') {
	    return closingCornerBrace$4(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var closeTag = {
	  parseSyntax: parseSyntax$e
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$b } = helpers;

	const {
	  TOKEN_OPEN_TAG_END: TOKEN_OPEN_TAG_END$4,
	  TOKEN_OPEN_TAG_END_SCRIPT: TOKEN_OPEN_TAG_END_SCRIPT$4,
	  TOKEN_OPEN_TAG_END_STYLE: TOKEN_OPEN_TAG_END_STYLE$4
	} = tokenTypes;
	const {
	  OPEN_TAG_END_CONTEXT: OPEN_TAG_END_CONTEXT$2,
	  DATA_CONTEXT: DATA_CONTEXT$5,
	  SCRIPT_CONTENT_CONTEXT: SCRIPT_CONTENT_CONTEXT$1,
	  STYLE_CONTENT_CONTEXT: STYLE_CONTENT_CONTEXT$1
	} = tokenizerContexts;

	const tokensMap = {
	  'script': TOKEN_OPEN_TAG_END_SCRIPT$4,
	  'style': TOKEN_OPEN_TAG_END_STYLE$4,
	  'default': TOKEN_OPEN_TAG_END$4
	};

	const contextsMap$1 = {
	  'script': SCRIPT_CONTENT_CONTEXT$1,
	  'style': STYLE_CONTENT_CONTEXT$1,
	  'default': DATA_CONTEXT$5
	};

	function closingCornerBrace$3 (state, tokens) {
	  const range = calculateTokenCharactersRange$b(state, { keepBuffer: true });
	  const tagName = state.contextParams[OPEN_TAG_END_CONTEXT$2].tagName;

	  tokens.push({
	    type: tokensMap[tagName] || tokensMap.default,
	    content: state.accumulatedContent + state.decisionBuffer,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = contextsMap$1[tagName] || contextsMap$1.default;
	  state.caretPosition++;

	  state.contextParams[OPEN_TAG_END_CONTEXT$2] = undefined;
	}

	function parseSyntax$d (chars, state, tokens) {
	  if (chars === '>') {
	    return closingCornerBrace$3(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var openTagEnd = {
	  parseSyntax: parseSyntax$d
	};

	const {
	  isWhitespace: isWhitespace$6,
	  calculateTokenCharactersRange: calculateTokenCharactersRange$a
	} = helpers;
	const {
	  ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$9,
	  OPEN_TAG_END_CONTEXT: OPEN_TAG_END_CONTEXT$1,
	  ATTRIBUTE_VALUE_CONTEXT: ATTRIBUTE_VALUE_CONTEXT$3,
	  ATTRIBUTE_KEY_CONTEXT: ATTRIBUTE_KEY_CONTEXT$1
	} = tokenizerContexts;
	const { TOKEN_ATTRIBUTE_ASSIGNMENT: TOKEN_ATTRIBUTE_ASSIGNMENT$6 } = tokenTypes;

	function tagEnd$1 (state) {
	  const tagName = state.contextParams[ATTRIBUTES_CONTEXT$9].tagName;

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = OPEN_TAG_END_CONTEXT$1;
	  state.contextParams[OPEN_TAG_END_CONTEXT$1] = { tagName };

	  state.contextParams[ATTRIBUTES_CONTEXT$9] = undefined;
	}

	function noneWhitespace (state) {
	  state.accumulatedContent = state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTE_KEY_CONTEXT$1;
	  state.caretPosition++;
	}

	function equal (state, tokens) {
	  const range = calculateTokenCharactersRange$a(state, { keepBuffer: true });

	  tokens.push({
	    type: TOKEN_ATTRIBUTE_ASSIGNMENT$6,
	    content: state.decisionBuffer,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTE_VALUE_CONTEXT$3;
	  state.caretPosition++;
	}

	function parseSyntax$c (chars, state, tokens, next, nextNoWhiteChar) {
	  if (chars === '>' || (chars === '/' && nextNoWhiteChar === '>')) {
	    return tagEnd$1(state)
	  }

	  if (chars === '=') {
	    return equal(state, tokens)
	  }

	  if (!isWhitespace$6(chars)) {
	    return noneWhitespace(state)
	  }

	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var attributes$2 = {
	  parseSyntax: parseSyntax$c
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$9 } = helpers;

	const { TOKEN_ATTRIBUTE_KEY: TOKEN_ATTRIBUTE_KEY$6 } = tokenTypes;
	const { ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$8 } = tokenizerContexts;

	function keyEnd (state, tokens) {
	  const range = calculateTokenCharactersRange$9(state, { keepBuffer: false });

	  tokens.push({
	    type: TOKEN_ATTRIBUTE_KEY$6,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTES_CONTEXT$8;
	}

	function isKeyBreak (chars) {
	  return (
	    chars === '='
	    || chars === ' '
	    || chars === '\n'
	    || chars === '\t'
	    || chars === '/'
	    || chars === '>'
	  )
	}

	function parseSyntax$b (chars, state, tokens) {
	  if (isKeyBreak(chars)) {
	    return keyEnd(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var attributeKey = {
	  parseSyntax: parseSyntax$b
	};

	const { isWhitespace: isWhitespace$5 } = helpers;
	const {
	  ATTRIBUTE_VALUE_WRAPPED_CONTEXT: ATTRIBUTE_VALUE_WRAPPED_CONTEXT$2,
	  ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$7,
	  ATTRIBUTE_VALUE_BARE_CONTEXT: ATTRIBUTE_VALUE_BARE_CONTEXT$1
	} = tokenizerContexts;
	const {
	  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START$1
	} = tokenTypes;

	function wrapper$3 (state, tokens) {
	  const wrapper = state.decisionBuffer;

	  tokens.push({
	    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START$1,
	    content: wrapper,
	    startPosition: state.caretPosition,
	    endPosition: state.caretPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTE_VALUE_WRAPPED_CONTEXT$2;
	  state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT$2] = { wrapper };
	  state.caretPosition++;
	}

	function bare$1 (state) {
	  state.accumulatedContent = state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTE_VALUE_BARE_CONTEXT$1;
	  state.caretPosition++;
	}

	function tagEnd (state) {
	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTES_CONTEXT$7;
	}

	function parseSyntax$a (chars, state, tokens) {
	  if (chars === '"' || chars === '\'') {
	    return wrapper$3(state, tokens)
	  }

	  if (chars === '>' || chars === '/') {
	    return tagEnd(state)
	  }

	  if (!isWhitespace$5(chars)) {
	    return bare$1(state)
	  }

	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var attributeValue$2 = {
	  parseSyntax: parseSyntax$a
	};

	const {
	  calculateTokenCharactersRange: calculateTokenCharactersRange$8,
	  isWhitespace: isWhitespace$4
	} = helpers;

	const { TOKEN_ATTRIBUTE_VALUE: TOKEN_ATTRIBUTE_VALUE$2 } = tokenTypes;
	const { ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$6 } = tokenizerContexts;

	function valueEnd (state, tokens) {
	  const range = calculateTokenCharactersRange$8(state, { keepBuffer: false });

	  tokens.push({
	    type: TOKEN_ATTRIBUTE_VALUE$2,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTES_CONTEXT$6;
	}

	function parseSyntax$9 (chars, state, tokens) {
	  if (
	    (!state.accumulatedContent.match('{{') || state.accumulatedContent.match('}}')) && 
	    (isWhitespace$4(chars)
	    || chars === '>'
	    || chars === '/')
	  ) {
	    return valueEnd(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var attributeValueBare = {
	  parseSyntax: parseSyntax$9
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$7 } = helpers;

	const {
	  TOKEN_ATTRIBUTE_VALUE: TOKEN_ATTRIBUTE_VALUE$1,
	  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END$1
	} = tokenTypes;
	const {
	  ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$5,
	  ATTRIBUTE_VALUE_WRAPPED_CONTEXT: ATTRIBUTE_VALUE_WRAPPED_CONTEXT$1
	} = tokenizerContexts;

	function wrapper$2 (state, tokens) {
	  const range = calculateTokenCharactersRange$7(state, { keepBuffer: false });
	  const endWrapperPosition = range.endPosition + 1;

	  tokens.push(
	    {
	      type: TOKEN_ATTRIBUTE_VALUE$1,
	      content: state.accumulatedContent,
	      startPosition: range.startPosition,
	      endPosition: range.endPosition
	    },
	    {
	      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END$1,
	      content: state.decisionBuffer,
	      startPosition: endWrapperPosition,
	      endPosition: endWrapperPosition
	    }
	  );

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = ATTRIBUTES_CONTEXT$5;
	  state.caretPosition++;

	  state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT$1] = undefined;
	}

	function parseSyntax$8 (chars, state, tokens) {
	  const wrapperChar = state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT$1].wrapper;

	  if (chars === wrapperChar) {
	    return wrapper$2(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var attributeValueWrapped = {
	  parseSyntax: parseSyntax$8
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$6 } = helpers;

	const {
	  TOKEN_SCRIPT_TAG_CONTENT: TOKEN_SCRIPT_TAG_CONTENT$1,
	  TOKEN_CLOSE_TAG_SCRIPT: TOKEN_CLOSE_TAG_SCRIPT$1
	} = tokenTypes;
	const { DATA_CONTEXT: DATA_CONTEXT$4 } = tokenizerContexts;

	function closingScriptTag (state, tokens) {
	  if (state.accumulatedContent !== '') {
	    const range = calculateTokenCharactersRange$6(state, { keepBuffer: false });

	    tokens.push({
	      type: TOKEN_SCRIPT_TAG_CONTENT$1,
	      content: state.accumulatedContent,
	      startPosition: range.startPosition,
	      endPosition: range.endPosition
	    });
	  }

	  tokens.push({
	    type: TOKEN_CLOSE_TAG_SCRIPT$1,
	    content: state.decisionBuffer,
	    startPosition: state.caretPosition - (state.decisionBuffer.length - 1),
	    endPosition: state.caretPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DATA_CONTEXT$4;
	  state.caretPosition++;
	}

	const INCOMPLETE_CLOSING_TAG_PATTERN$1 = /<\/[^>]+$/;
	const CLOSING_SCRIPT_TAG_PATTERN = /<\/script\s*>/i;

	function parseSyntax$7 (chars, state, tokens) {
	  if (
	    chars === '<' ||
	    chars === '</' ||
	    INCOMPLETE_CLOSING_TAG_PATTERN$1.test(chars)
	  ) {
	    state.caretPosition++;

	    return
	  }

	  if (CLOSING_SCRIPT_TAG_PATTERN.test(chars)) {
	    return closingScriptTag(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var scriptTagContent = {
	  parseSyntax: parseSyntax$7
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$5 } = helpers;

	const {
	  TOKEN_STYLE_TAG_CONTENT: TOKEN_STYLE_TAG_CONTENT$1,
	  TOKEN_CLOSE_TAG_STYLE: TOKEN_CLOSE_TAG_STYLE$1
	} = tokenTypes;
	const { DATA_CONTEXT: DATA_CONTEXT$3 } = tokenizerContexts;

	function closingStyleTag (state, tokens) {
	  if (state.accumulatedContent !== '') {
	    const range = calculateTokenCharactersRange$5(state, { keepBuffer: false });

	    tokens.push({
	      type: TOKEN_STYLE_TAG_CONTENT$1,
	      content: state.accumulatedContent,
	      startPosition: range.startPosition,
	      endPosition: range.endPosition
	    });
	  }

	  tokens.push({
	    type: TOKEN_CLOSE_TAG_STYLE$1,
	    content: state.decisionBuffer,
	    startPosition: state.caretPosition - (state.decisionBuffer.length - 1),
	    endPosition: state.caretPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DATA_CONTEXT$3;
	  state.caretPosition++;
	}

	const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/;
	const CLOSING_STYLE_TAG_PATTERN = /<\/style\s*>/i;

	function parseSyntax$6 (chars, state, tokens) {
	  if (
	    chars === '<' ||
	    chars === '</' ||
	    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
	  ) {
	    state.caretPosition++;

	    return
	  }

	  if (CLOSING_STYLE_TAG_PATTERN.test(chars)) {
	    return closingStyleTag(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var styleTagContent = {
	  parseSyntax: parseSyntax$6
	};

	const { isWhitespace: isWhitespace$3, calculateTokenCharactersRange: calculateTokenCharactersRange$4 } = helpers;

	const {
	  TOKEN_DOCTYPE_START: TOKEN_DOCTYPE_START$2
	} = tokenTypes;

	const {
	  DOCTYPE_END_CONTEXT: DOCTYPE_END_CONTEXT$2,
	  DOCTYPE_ATTRIBUTES_CONTEXT: DOCTYPE_ATTRIBUTES_CONTEXT$5
	} = tokenizerContexts;

	function generateDoctypeStartToken (state) {
	  const range = calculateTokenCharactersRange$4(state, { keepBuffer: false });

	  return {
	    type: TOKEN_DOCTYPE_START$2,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  }
	}

	function closingCornerBrace$2 (state, tokens) {
	  tokens.push(generateDoctypeStartToken(state));

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_END_CONTEXT$2;
	}

	function whitespace (state, tokens) {
	  tokens.push(generateDoctypeStartToken(state));

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_ATTRIBUTES_CONTEXT$5;
	}

	function parseSyntax$5 (chars, state, tokens) {
	  if (isWhitespace$3(chars)) {
	    return whitespace(state, tokens)
	  }

	  if (chars === '>') {
	    return closingCornerBrace$2(state, tokens)
	  }

	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var doctypeStart = {
	  parseSyntax: parseSyntax$5
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$3 } = helpers;

	const { TOKEN_DOCTYPE_END: TOKEN_DOCTYPE_END$3 } = tokenTypes;
	const { DATA_CONTEXT: DATA_CONTEXT$2 } = tokenizerContexts;

	function closingCornerBrace$1 (state, tokens) {
	  const range = calculateTokenCharactersRange$3(state, { keepBuffer: true });

	  tokens.push({
	    type: TOKEN_DOCTYPE_END$3,
	    content: state.decisionBuffer,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DATA_CONTEXT$2;
	  state.caretPosition++;
	}

	function parseSyntax$4 (chars, state, tokens) {
	  return closingCornerBrace$1(state, tokens)
	}

	var doctypeEnd = {
	  parseSyntax: parseSyntax$4
	};

	const { isWhitespace: isWhitespace$2 } = helpers;

	const {
	  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT: DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT$2,
	  DOCTYPE_ATTRIBUTE_BARE_CONTEXT: DOCTYPE_ATTRIBUTE_BARE_CONTEXT$1,
	  DOCTYPE_END_CONTEXT: DOCTYPE_END_CONTEXT$1
	} = tokenizerContexts;
	const {
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START$3
	} = tokenTypes;

	function wrapper$1 (state, tokens) {
	  const wrapper = state.decisionBuffer;

	  tokens.push({
	    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START$3,
	    content: wrapper,
	    startPosition: state.caretPosition,
	    endPosition: state.caretPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT$2;
	  state.contextParams[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT$2] = { wrapper };
	  state.caretPosition++;
	}

	function bare (state) {
	  state.accumulatedContent = state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_ATTRIBUTE_BARE_CONTEXT$1;
	  state.caretPosition++;
	}

	function closingCornerBrace (state) {
	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_END_CONTEXT$1;
	}

	function parseSyntax$3 (chars, state, tokens) {
	  if (chars === '"' || chars === '\'') {
	    return wrapper$1(state, tokens)
	  }

	  if (chars === '>') {
	    return closingCornerBrace(state)
	  }

	  if (!isWhitespace$2(chars)) {
	    return bare(state)
	  }

	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var doctypeAttributes$2 = {
	  parseSyntax: parseSyntax$3
	};

	const { calculateTokenCharactersRange: calculateTokenCharactersRange$2 } = helpers;

	const {
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END$1,
	  TOKEN_DOCTYPE_ATTRIBUTE: TOKEN_DOCTYPE_ATTRIBUTE$4
	} = tokenTypes;
	const {
	  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT: DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT$1,
	  DOCTYPE_ATTRIBUTES_CONTEXT: DOCTYPE_ATTRIBUTES_CONTEXT$4
	} = tokenizerContexts;

	function wrapper (state, tokens) {
	  const range = calculateTokenCharactersRange$2(state, { keepBuffer: false });
	  const endWrapperPosition = range.endPosition + 1;

	  tokens.push({
	    type: TOKEN_DOCTYPE_ATTRIBUTE$4,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  tokens.push({
	    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END$1,
	    content: state.decisionBuffer,
	    startPosition: endWrapperPosition,
	    endPosition: endWrapperPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_ATTRIBUTES_CONTEXT$4;
	  state.caretPosition++;

	  state.contextParams[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT$1] = undefined;
	}

	function parseSyntax$2 (chars, state, tokens) {
	  const wrapperChar = state.contextParams[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT$1].wrapper;

	  if (chars === wrapperChar) {
	    return wrapper(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var doctypeAttributeWrapped = {
	  parseSyntax: parseSyntax$2
	};

	const { isWhitespace: isWhitespace$1, calculateTokenCharactersRange: calculateTokenCharactersRange$1 } = helpers;

	const {
	  TOKEN_DOCTYPE_ATTRIBUTE: TOKEN_DOCTYPE_ATTRIBUTE$3
	} = tokenTypes;
	const {
	  DOCTYPE_ATTRIBUTES_CONTEXT: DOCTYPE_ATTRIBUTES_CONTEXT$3
	} = tokenizerContexts;

	function attributeEnd (state, tokens) {
	  const range = calculateTokenCharactersRange$1(state, { keepBuffer: false });

	  tokens.push({
	    type: TOKEN_DOCTYPE_ATTRIBUTE$3,
	    content: state.accumulatedContent,
	    startPosition: range.startPosition,
	    endPosition: range.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DOCTYPE_ATTRIBUTES_CONTEXT$3;
	}

	function parseSyntax$1 (chars, state, tokens) {
	  if (isWhitespace$1(chars) || chars === '>') {
	    return attributeEnd(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var doctypeAttributeBare = {
	  parseSyntax: parseSyntax$1
	};

	const { calculateTokenCharactersRange } = helpers;

	const {
	  TOKEN_COMMENT_END: TOKEN_COMMENT_END$1,
	  TOKEN_COMMENT_CONTENT: TOKEN_COMMENT_CONTENT$1
	} = tokenTypes;
	const {
	  DATA_CONTEXT: DATA_CONTEXT$1
	} = tokenizerContexts;

	const COMMENT_END = '-->';

	function commentEnd (state, tokens) {
	  const contentRange = calculateTokenCharactersRange(state, { keepBuffer: false });
	  const commentEndRange = {
	    startPosition: contentRange.endPosition + 1,
	    endPosition: contentRange.endPosition + COMMENT_END.length,
	  };

	  tokens.push({
	    type: TOKEN_COMMENT_CONTENT$1,
	    content: state.accumulatedContent,
	    startPosition: contentRange.startPosition,
	    endPosition: contentRange.endPosition
	  });

	  tokens.push({
	    type: TOKEN_COMMENT_END$1,
	    content: state.decisionBuffer,
	    startPosition: commentEndRange.startPosition,
	    endPosition: commentEndRange.endPosition
	  });

	  state.accumulatedContent = '';
	  state.decisionBuffer = '';
	  state.currentContext = DATA_CONTEXT$1;
	  state.caretPosition++;
	}

	function parseSyntax (chars, state, tokens) {
	  if (chars === '-' || chars === '--') {
	    state.caretPosition++;

	    return
	  }

	  if (chars === COMMENT_END) {
	    return commentEnd(state, tokens)
	  }

	  state.accumulatedContent += state.decisionBuffer;
	  state.decisionBuffer = '';
	  state.caretPosition++;
	}

	var commentContent = {
	  parseSyntax
	};

	const dataContext = data;
	const openTagStartContext = openTagStart;
	const closeTagContext = closeTag;
	const openTagEndContext = openTagEnd;
	const attributesContext = attributes$2;
	const attributeKeyContext = attributeKey;
	const attributeValueContext = attributeValue$2;
	const attributeValueBareContext = attributeValueBare;
	const attributeValueWrappedContext = attributeValueWrapped;
	const scriptContentContext = scriptTagContent;
	const styleContentContext = styleTagContent;
	const doctypeStartContext = doctypeStart;
	const doctypeEndContextFactory = doctypeEnd;
	const doctypeAttributesContext = doctypeAttributes$2;
	const doctypeAttributeWrappedContext = doctypeAttributeWrapped;
	const doctypeAttributeBareEndContext = doctypeAttributeBare;
	const commentContentContext = commentContent;
	const { isWhitespace } = helpers;

	const {
	  DATA_CONTEXT,
	  OPEN_TAG_START_CONTEXT,
	  CLOSE_TAG_CONTEXT,
	  ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$4,
	  OPEN_TAG_END_CONTEXT,
	  ATTRIBUTE_KEY_CONTEXT,
	  ATTRIBUTE_VALUE_CONTEXT: ATTRIBUTE_VALUE_CONTEXT$2,
	  ATTRIBUTE_VALUE_BARE_CONTEXT,
	  ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
	  SCRIPT_CONTENT_CONTEXT,
	  STYLE_CONTENT_CONTEXT,
	  DOCTYPE_START_CONTEXT,
	  DOCTYPE_END_CONTEXT,
	  DOCTYPE_ATTRIBUTES_CONTEXT: DOCTYPE_ATTRIBUTES_CONTEXT$2,
	  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
	  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
	  COMMENT_CONTENT_CONTEXT,
	} = tokenizerContexts;

	const contextHandlersMap = {
	  [DATA_CONTEXT]: dataContext,
	  [OPEN_TAG_START_CONTEXT]: openTagStartContext,
	  [CLOSE_TAG_CONTEXT]: closeTagContext,
	  [ATTRIBUTES_CONTEXT$4]: attributesContext,
	  [OPEN_TAG_END_CONTEXT]: openTagEndContext,
	  [ATTRIBUTE_KEY_CONTEXT]: attributeKeyContext,
	  [ATTRIBUTE_VALUE_CONTEXT$2]: attributeValueContext,
	  [ATTRIBUTE_VALUE_BARE_CONTEXT]: attributeValueBareContext,
	  [ATTRIBUTE_VALUE_WRAPPED_CONTEXT]: attributeValueWrappedContext,
	  [SCRIPT_CONTENT_CONTEXT]: scriptContentContext,
	  [STYLE_CONTENT_CONTEXT]: styleContentContext,
	  [DOCTYPE_START_CONTEXT]: doctypeStartContext,
	  [DOCTYPE_END_CONTEXT]: doctypeEndContextFactory,
	  [DOCTYPE_ATTRIBUTES_CONTEXT$2]: doctypeAttributesContext,
	  [DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT]: doctypeAttributeWrappedContext,
	  [DOCTYPE_ATTRIBUTE_BARE_CONTEXT]: doctypeAttributeBareEndContext,
	  [COMMENT_CONTENT_CONTEXT]: commentContentContext
	};

	function tokenizeChars (
	  chars,
	  state,
	  tokens,
	  { isFinalChunk, positionOffset }
	) {
	  let charIndex = state.caretPosition - positionOffset;

	  while (charIndex < chars.length) {
	    const context = contextHandlersMap[state.currentContext];

	    state.decisionBuffer += chars[charIndex];
	    const nextChar = chars[charIndex + 1];
	    let nextNoWhiteChar = nextChar;
	    let nextNoWhiteIndex = charIndex + 1;
	    while (isWhitespace(nextNoWhiteChar)) {
	      nextNoWhiteIndex += 1;
	      nextNoWhiteChar = chars[nextNoWhiteIndex];
	    }
	    context.parseSyntax(state.decisionBuffer, state, tokens, nextChar, nextNoWhiteChar);

	    charIndex = state.caretPosition - positionOffset;
	  }

	  if (isFinalChunk) {
	    const context = contextHandlersMap[state.currentContext];

	    // Move the caret back, as at this point
	    // it in the position outside of chars array,
	    // and it should not be taken into account
	    // when calculating characters range
	    state.caretPosition--;

	    if (context.handleContentEnd !== undefined) {
	      context.handleContentEnd(state, tokens);
	    }
	  }
	}

	function tokenize$3 (
	  content = '',
	  existingState,
	  { isFinalChunk } = {}
	) {
	  isFinalChunk = isFinalChunk === undefined ? true : isFinalChunk;

	  let state;

	  if (existingState !== undefined) {
	    state = Object.assign({}, existingState);
	  } else {
	    state = {
	      currentContext: DATA_CONTEXT,
	      contextParams: {},
	      decisionBuffer: '',
	      accumulatedContent: '',
	      caretPosition: 0
	    };
	  }

	  const chars = state.decisionBuffer + content;
	  const tokens = [];

	  const positionOffset = state.caretPosition - state.decisionBuffer.length;

	  tokenizeChars(chars, state, tokens, {
	    isFinalChunk,
	    positionOffset
	  });

	  return { state, tokens }
	}

	var tokenize_1 = tokenize$3;

	var treeConstructorContexts = {
	  TAG_CONTENT_CONTEXT: 'tree-constructor-context:tag-content',
	  TAG_CONTEXT: 'tree-constructor-context:tag',
	  TAG_NAME_CONTEXT: 'tree-constructor-context:tag-name',
	  ATTRIBUTES_CONTEXT: 'tree-constructor-context:attributes',
	  ATTRIBUTE_CONTEXT: 'tree-constructor-context:attribute',
	  ATTRIBUTE_VALUE_CONTEXT: 'tree-constructor-context:attribute-value',
	  COMMENT_CONTEXT: 'tree-constructor-context:comment',
	  DOCTYPE_CONTEXT: 'tree-constructor-context:doctype',
	  DOCTYPE_ATTRIBUTES_CONTEXT: 'tree-constructor-context:doctype-attributes',
	  DOCTYPE_ATTRIBUTE_CONTEXT: 'tree-constructor-context:doctype-attribute',
	  SCRIPT_TAG_CONTEXT: 'tree-constructor-context:script-tag',
	  STYLE_TAG_CONTEXT: 'tree-constructor-context:style-tag'
	};

	const {
	  TOKEN_OPEN_TAG_START: TOKEN_OPEN_TAG_START$2,
	  TOKEN_OPEN_TAG_END: TOKEN_OPEN_TAG_END$3,
	  TOKEN_CLOSE_TAG: TOKEN_CLOSE_TAG$1,
	  TOKEN_ATTRIBUTE_KEY: TOKEN_ATTRIBUTE_KEY$5,
	  TOKEN_ATTRIBUTE_ASSIGNMENT: TOKEN_ATTRIBUTE_ASSIGNMENT$5
	} = tokenTypes;
	const {
	  TAG_NAME_CONTEXT: TAG_NAME_CONTEXT$1,
	  ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$3,
	  TAG_CONTENT_CONTEXT: TAG_CONTENT_CONTEXT$1
	} = treeConstructorContexts;

	function handleOpenTagStart$1 (state, token) {
	  state.currentNode.content.openStart = token;
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: TAG_NAME_CONTEXT$1
	  };

	  return state
	}

	function handleAttributeStart (state) {
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: ATTRIBUTES_CONTEXT$3
	  };

	  return state
	}

	function handleOpenTagEnd$2 (state, token) {
	  const SELF_CLOSING_TAGS = [
	    'area',
	    'base',
	    'br',
	    'col',
	    'embed',
	    'hr',
	    'img',
	    'input',
	    'keygen',
	    'link',
	    'meta',
	    'param',
	    'source',
	    'track',
	    'wbr'
	  ].concat((state.parseOptions || {}).selfClosingTag || []);
	  const tagName = state.currentNode.content.name;

	  state.currentNode.content.openEnd = token;

	  if (token.content.match(/\/\s*>/) || SELF_CLOSING_TAGS.indexOf(tagName) !== -1) {
	    state.currentNode.content.selfClosing = true;
	    state.currentNode = state.currentNode.parentRef;
	    state.currentContext = state.currentContext.parentRef;
	    state.caretPosition++;

	    return state
	  }

	  state.currentNode.content.selfClosing = false;
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: TAG_CONTENT_CONTEXT$1
	  };
	  state.caretPosition++;

	  return state
	}

	function handleCloseTag$1 (state, token) {
	  state.currentNode.content.close = token;
	  state.currentNode = state.currentNode.parentRef;
	  state.currentContext = state.currentContext.parentRef;
	  state.caretPosition++;

	  return state
	}

	var tag$1 = function tag (token, state) {
	  if (token.type === TOKEN_OPEN_TAG_START$2) {
	    return handleOpenTagStart$1(state, token)
	  }

	  const ATTRIBUTE_START_TOKENS = [
	    TOKEN_ATTRIBUTE_KEY$5,
	    TOKEN_ATTRIBUTE_ASSIGNMENT$5
	  ];

	  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
	    return handleAttributeStart(state)
	  }

	  if (token.type === TOKEN_OPEN_TAG_END$3) {
	    return handleOpenTagEnd$2(state, token)
	  }

	  if (token.type === TOKEN_CLOSE_TAG$1) {
	    return handleCloseTag$1(state, token)
	  }

	  state.caretPosition++;

	  return state
	};

	var astNodes = {
	  NODE_DOCUMENT: 'document',
	  NODE_TAG: 'tag',
	  NODE_TEXT: 'text',
	  NODE_DOCTYPE: 'doctype',
	  NODE_COMMENT: 'comment',
	  NODE_SCRIPT: 'script',
	  NODE_STYLE: 'style'
	};

	const parseCloseTagName = helpers.parseCloseTagName;

	const {
	  TOKEN_OPEN_TAG_START: TOKEN_OPEN_TAG_START$1,
	  TOKEN_CLOSE_TAG,
	  TOKEN_COMMENT_START: TOKEN_COMMENT_START$1,
	  TOKEN_DOCTYPE_START: TOKEN_DOCTYPE_START$1,
	  TOKEN_TEXT,
	  TOKEN_OPEN_TAG_START_SCRIPT: TOKEN_OPEN_TAG_START_SCRIPT$1,
	  TOKEN_OPEN_TAG_START_STYLE: TOKEN_OPEN_TAG_START_STYLE$1
	} = tokenTypes;
	const {
	  TAG_CONTEXT: TAG_CONTEXT$1,
	  COMMENT_CONTEXT: COMMENT_CONTEXT$1,
	  DOCTYPE_CONTEXT: DOCTYPE_CONTEXT$1,
	  SCRIPT_TAG_CONTEXT: SCRIPT_TAG_CONTEXT$1,
	  STYLE_TAG_CONTEXT: STYLE_TAG_CONTEXT$1
	} = treeConstructorContexts;
	const {
	  NODE_TAG: NODE_TAG$1,
	  NODE_TEXT: NODE_TEXT$1,
	  NODE_DOCTYPE: NODE_DOCTYPE$1,
	  NODE_COMMENT: NODE_COMMENT$1,
	  NODE_SCRIPT: NODE_SCRIPT$1,
	  NODE_STYLE: NODE_STYLE$1
	} = astNodes;

	function handleOpenTagStart (state) {
	  if (state.currentNode.content.children === undefined) {
	    state.currentNode.content.children = [];
	  }

	  const tagNode = {
	    nodeType: NODE_TAG$1,
	    parentRef: state.currentNode,
	    content: {}
	  };

	  state.currentNode.content.children.push(tagNode);

	  state.currentNode = tagNode;
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: TAG_CONTEXT$1
	  };

	  return state
	}

	function handleCloseTag (state, token) {
	  const closeTagName = parseCloseTagName(token.content);

	  if (closeTagName !== state.currentNode.content.name) {
	    state.caretPosition++;

	    return state
	  }

	  state.currentContext = state.currentContext.parentRef;

	  return state
	}

	function handleCommentStart$1 (state) {
	  if (state.currentNode.content.children === undefined) {
	    state.currentNode.content.children = [];
	  }

	  const commentNode = {
	    nodeType: NODE_COMMENT$1,
	    parentRef: state.currentNode,
	    content: {}
	  };

	  state.currentNode.content.children.push(commentNode);

	  state.currentNode = commentNode;
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: COMMENT_CONTEXT$1
	  };

	  return state
	}

	function handleDoctypeStart$1 (state) {
	  if (state.currentNode.content.children === undefined) {
	    state.currentNode.content.children = [];
	  }

	  const doctypeNode = {
	    nodeType: NODE_DOCTYPE$1,
	    parentRef: state.currentNode,
	    content: {}
	  };

	  state.currentNode.content.children.push(doctypeNode);

	  state.currentNode = doctypeNode;
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: DOCTYPE_CONTEXT$1
	  };

	  return state
	}

	function handleText (state, token) {
	  if (state.currentNode.content.children === undefined) {
	    state.currentNode.content.children = [];
	  }

	  const textNode = {
	    nodeType: NODE_TEXT$1,
	    parentRef: state.currentNode,
	    content: {
	      value: token
	    }
	  };

	  state.currentNode.content.children.push(textNode);
	  state.caretPosition++;

	  return state
	}

	function handleOpenTagStartScript$1 (state) {
	  if (state.currentNode.content.children === undefined) {
	    state.currentNode.content.children = [];
	  }

	  const scriptNode = {
	    nodeType: NODE_SCRIPT$1,
	    parentRef: state.currentNode,
	    content: {}
	  };

	  state.currentNode.content.children.push(scriptNode);

	  state.currentNode = scriptNode;
	  state.currentContext = {
	    type: SCRIPT_TAG_CONTEXT$1,
	    parentRef: state.currentContext
	  };

	  return state
	}

	function handleOpenTagStartStyle$1 (state) {
	  if (state.currentNode.content.children === undefined) {
	    state.currentNode.content.children = [];
	  }

	  const styleNode = {
	    nodeType: NODE_STYLE$1,
	    parentRef: state.currentNode,
	    content: {}
	  };

	  state.currentNode.content.children.push(styleNode);

	  state.currentNode = styleNode;
	  state.currentContext = {
	    type: STYLE_TAG_CONTEXT$1,
	    parentRef: state.currentContext
	  };

	  return state
	}

	var tagContent$1 = function tagContent (token, state) {
	  if (token.type === TOKEN_OPEN_TAG_START$1) {
	    return handleOpenTagStart(state)
	  }

	  if (token.type === TOKEN_TEXT) {
	    return handleText(state, token)
	  }

	  if (token.type === TOKEN_CLOSE_TAG) {
	    return handleCloseTag(state, token)
	  }

	  if (token.type === TOKEN_COMMENT_START$1) {
	    return handleCommentStart$1(state)
	  }

	  if (token.type === TOKEN_DOCTYPE_START$1) {
	    return handleDoctypeStart$1(state)
	  }

	  if (token.type === TOKEN_OPEN_TAG_START_SCRIPT$1) {
	    return handleOpenTagStartScript$1(state)
	  }

	  if (token.type === TOKEN_OPEN_TAG_START_STYLE$1) {
	    return handleOpenTagStartStyle$1(state)
	  }

	  state.caretPosition++;

	  return state
	};

	/**
	 * Parser for 'tag-name' context.
	 * Parses tag name from 'open-tag-start' (<div)
	 * token and save the tag name as self content.
	 * Ignores tokens others than 'open-tag-start'.
	 */

	const parseOpenTagName = helpers.parseOpenTagName;
	const {
	  TOKEN_OPEN_TAG_START
	} = tokenTypes;

	function handleTagOpenStart (state, token) {
	  state.currentNode.content.name = parseOpenTagName(token.content);

	  state.currentContext = state.currentContext.parentRef;

	  return state
	}

	var tagName$1 = function tagName (token, state) {
	  if (token.type === TOKEN_OPEN_TAG_START) {
	    handleTagOpenStart(state, token);
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_ATTRIBUTE_KEY: TOKEN_ATTRIBUTE_KEY$4,
	  TOKEN_ATTRIBUTE_ASSIGNMENT: TOKEN_ATTRIBUTE_ASSIGNMENT$4,
	  TOKEN_OPEN_TAG_END: TOKEN_OPEN_TAG_END$2,
	  TOKEN_OPEN_TAG_END_SCRIPT: TOKEN_OPEN_TAG_END_SCRIPT$3,
	  TOKEN_OPEN_TAG_END_STYLE: TOKEN_OPEN_TAG_END_STYLE$3
	} = tokenTypes;
	const {
	  ATTRIBUTE_CONTEXT: ATTRIBUTE_CONTEXT$1
	} = treeConstructorContexts;

	function handlerAttributeStart (state) {
	  if (state.currentNode.content.attributes === undefined) {
	    state.currentNode.content.attributes = [];
	  }

	  // new empty attribute
	  state.currentNode.content.attributes.push({});

	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: ATTRIBUTE_CONTEXT$1
	  };

	  return state
	}

	function handleOpenTagEnd$1 (state) {
	  state.currentContext = state.currentContext.parentRef;

	  return state
	}

	var attributes$1 = function attributes (token, state) {
	  const ATTRIBUTE_START_TOKENS = [
	    TOKEN_ATTRIBUTE_KEY$4,
	    TOKEN_ATTRIBUTE_ASSIGNMENT$4
	  ];

	  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
	    return handlerAttributeStart(state)
	  }

	  const ATTRIBUTES_END_TOKENS = [
	    TOKEN_OPEN_TAG_END$2,
	    TOKEN_OPEN_TAG_END_SCRIPT$3,
	    TOKEN_OPEN_TAG_END_STYLE$3
	  ];

	  if (ATTRIBUTES_END_TOKENS.indexOf(token.type) !== -1) {
	    return handleOpenTagEnd$1(state)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_OPEN_TAG_END: TOKEN_OPEN_TAG_END$1,
	  TOKEN_OPEN_TAG_END_SCRIPT: TOKEN_OPEN_TAG_END_SCRIPT$2,
	  TOKEN_OPEN_TAG_END_STYLE: TOKEN_OPEN_TAG_END_STYLE$2,
	  TOKEN_ATTRIBUTE_KEY: TOKEN_ATTRIBUTE_KEY$3,
	  TOKEN_ATTRIBUTE_ASSIGNMENT: TOKEN_ATTRIBUTE_ASSIGNMENT$3
	} = tokenTypes;
	const {
	  ATTRIBUTE_VALUE_CONTEXT: ATTRIBUTE_VALUE_CONTEXT$1
	} = treeConstructorContexts;

	function getLastAttribute$2 (state) {
	  const attributes = state.currentNode.content.attributes;

	  return attributes[attributes.length - 1]
	}

	function handleOpenTagEnd (state) {
	  state.currentContext = state.currentContext.parentRef;

	  return state
	}

	function handleAttributeKey (state, token) {
	  const attribute = getLastAttribute$2(state);

	  if (attribute.key !== undefined || attribute.value !== undefined) {
	    state.currentContext = state.currentContext.parentRef;

	    return state
	  }

	  attribute.key = token;
	  state.caretPosition++;

	  return state
	}

	function handleAttributeAssignment (state) {
	  const attribute = getLastAttribute$2(state);

	  if (attribute.value !== undefined) {
	    state.currentContext = state.currentContext.parentRef;

	    return state
	  }

	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: ATTRIBUTE_VALUE_CONTEXT$1
	  };
	  state.caretPosition++;

	  return state
	}

	var attribute$1 = function attribute (token, state) {
	  const OPEN_TAG_END_TOKENS = [
	    TOKEN_OPEN_TAG_END$1,
	    TOKEN_OPEN_TAG_END_SCRIPT$2,
	    TOKEN_OPEN_TAG_END_STYLE$2
	  ];

	  if (OPEN_TAG_END_TOKENS.indexOf(token.type) !== -1) {
	    return handleOpenTagEnd(state)
	  }

	  if (token.type === TOKEN_ATTRIBUTE_KEY$3) {
	    return handleAttributeKey(state, token)
	  }

	  if (token.type === TOKEN_ATTRIBUTE_ASSIGNMENT$3) {
	    return handleAttributeAssignment(state)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_OPEN_TAG_END,
	  TOKEN_OPEN_TAG_END_SCRIPT: TOKEN_OPEN_TAG_END_SCRIPT$1,
	  TOKEN_OPEN_TAG_END_STYLE: TOKEN_OPEN_TAG_END_STYLE$1,
	  TOKEN_ATTRIBUTE_KEY: TOKEN_ATTRIBUTE_KEY$2,
	  TOKEN_ATTRIBUTE_ASSIGNMENT: TOKEN_ATTRIBUTE_ASSIGNMENT$2,
	  TOKEN_ATTRIBUTE_VALUE,
	  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
	  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
	} = tokenTypes;

	function getLastAttribute$1 (state) {
	  const attributes = state.currentNode.content.attributes;

	  return attributes[attributes.length - 1]
	}

	function handleValueEnd (state) {
	  state.currentContext = state.currentContext.parentRef;

	  return state
	}

	function handleAttributeValue$1 (state, token) {
	  const attribute = getLastAttribute$1(state);

	  attribute.value = token;
	  state.caretPosition++;

	  return state
	}

	function handleAttributeValueWrapperStart (state, token) {
	  const attribute = getLastAttribute$1(state);

	  attribute.startWrapper = token;
	  state.caretPosition++;

	  return state
	}

	function handleAttributeValueWrapperEnd (state, token) {
	  const attribute = getLastAttribute$1(state);

	  attribute.endWrapper = token;
	  state.caretPosition++;

	  return state
	}

	var attributeValue$1 = function attributeValue (token, state) {
	  const VALUE_END_TOKENS = [
	    TOKEN_OPEN_TAG_END,
	    TOKEN_OPEN_TAG_END_SCRIPT$1,
	    TOKEN_OPEN_TAG_END_STYLE$1,
	    TOKEN_ATTRIBUTE_KEY$2,
	    TOKEN_ATTRIBUTE_ASSIGNMENT$2
	  ];

	  if (VALUE_END_TOKENS.indexOf(token.type) !== -1) {
	    return handleValueEnd(state)
	  }

	  if (token.type === TOKEN_ATTRIBUTE_VALUE) {
	    return handleAttributeValue$1(state, token)
	  }

	  if (token.type === TOKEN_ATTRIBUTE_VALUE_WRAPPER_START) {
	    return handleAttributeValueWrapperStart(state, token)
	  }

	  if (token.type === TOKEN_ATTRIBUTE_VALUE_WRAPPER_END) {
	    return handleAttributeValueWrapperEnd(state, token)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_COMMENT_START,
	  TOKEN_COMMENT_END,
	  TOKEN_COMMENT_CONTENT
	} = tokenTypes;

	function handleCommentStart (state, token) {
	  state.currentNode.content.start = token;
	  state.caretPosition++;

	  return state
	}

	function handleCommentContent (state, token) {
	  state.currentNode.content.value = token;
	  state.caretPosition++;

	  return state
	}

	function handleCommentEnd (state, token) {
	  state.currentNode.content.end = token;
	  state.currentNode = state.currentNode.parentRef;
	  state.currentContext = state.currentContext.parentRef;
	  state.caretPosition++;

	  return state
	}

	var comment$1 = function comment (token, state) {
	  if (token.type === TOKEN_COMMENT_START) {
	    return handleCommentStart(state, token)
	  }

	  if (token.type === TOKEN_COMMENT_CONTENT) {
	    return handleCommentContent(state, token)
	  }

	  if (token.type === TOKEN_COMMENT_END) {
	    return handleCommentEnd(state, token)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_DOCTYPE_END: TOKEN_DOCTYPE_END$2,
	  TOKEN_DOCTYPE_ATTRIBUTE: TOKEN_DOCTYPE_ATTRIBUTE$2,
	  TOKEN_DOCTYPE_START,
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START$2
	} = tokenTypes;
	const {
	  DOCTYPE_ATTRIBUTES_CONTEXT: DOCTYPE_ATTRIBUTES_CONTEXT$1
	} = treeConstructorContexts;

	function handleDoctypeStart (state, token) {
	  state.currentNode.content.start = token;
	  state.caretPosition++;

	  return state
	}

	function handleDoctypeEnd$2 (state, token) {
	  state.currentNode.content.end = token;
	  state.currentNode = state.currentNode.parentRef;
	  state.currentContext = state.currentContext.parentRef;
	  state.caretPosition++;

	  return state
	}

	function handleDoctypeAttributes (state) {
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: DOCTYPE_ATTRIBUTES_CONTEXT$1
	  };

	  return state
	}

	var doctype$1 = function doctype (token, state) {
	  if (token.type === TOKEN_DOCTYPE_START) {
	    return handleDoctypeStart(state, token)
	  }

	  if (token.type === TOKEN_DOCTYPE_END$2) {
	    return handleDoctypeEnd$2(state, token)
	  }

	  const ATTRIBUTES_START_TOKENS = [
	    TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START$2,
	    TOKEN_DOCTYPE_ATTRIBUTE$2
	  ];

	  if (ATTRIBUTES_START_TOKENS.indexOf(token.type) !== -1) {
	    return handleDoctypeAttributes(state)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  DOCTYPE_ATTRIBUTE_CONTEXT: DOCTYPE_ATTRIBUTE_CONTEXT$1
	} = treeConstructorContexts;

	const {
	  TOKEN_DOCTYPE_END: TOKEN_DOCTYPE_END$1,
	  TOKEN_DOCTYPE_ATTRIBUTE: TOKEN_DOCTYPE_ATTRIBUTE$1,
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START$1
	} = tokenTypes;

	function handleDoctypeEnd$1 (state) {
	  state.currentContext = state.currentContext.parentRef;

	  return state
	}

	function handleAttribute (state) {
	  if (state.currentNode.content.attributes === undefined) {
	    state.currentNode.content.attributes = [];
	  }

	  // new empty attribute
	  state.currentNode.content.attributes.push({});

	  state.currentContext = {
	    type: DOCTYPE_ATTRIBUTE_CONTEXT$1,
	    parentRef: state.currentContext
	  };

	  return state
	}

	var doctypeAttributes$1 = function doctypeAttributes (token, state) {
	  if (token.type === TOKEN_DOCTYPE_END$1) {
	    return handleDoctypeEnd$1(state)
	  }

	  const ATTRIBUTE_START_TOKENS = [
	    TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START$1,
	    TOKEN_DOCTYPE_ATTRIBUTE$1
	  ];

	  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
	    return handleAttribute(state)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_DOCTYPE_END,
	  TOKEN_DOCTYPE_ATTRIBUTE,
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
	  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END
	} = tokenTypes;

	function getLastAttribute (state) {
	  const attributes = state.currentNode.content.attributes;

	  return attributes[attributes.length - 1]
	}

	function handleDoctypeEnd (state) {
	  state.currentContext = state.currentContext.parentRef;

	  return state
	}

	function handleAttributeValue (state, token) {
	  const attribute = getLastAttribute(state);

	  if (attribute.value !== undefined) {
	    state.currentContext = state.currentContext.parentRef;

	    return state
	  }

	  attribute.value = token;
	  state.caretPosition++;

	  return state
	}

	function handleAttributeWrapperStart (state, token) {
	  const attribute = getLastAttribute(state);

	  if (attribute.start !== undefined || attribute.value !== undefined) {
	    state.currentContext = state.currentContext.parentRef;

	    return state
	  }

	  attribute.startWrapper = token;
	  state.caretPosition++;

	  return state
	}

	function handleAttributeWrapperEnd (state, token) {
	  const attribute = getLastAttribute(state);

	  attribute.endWrapper = token;
	  state.currentContext = state.currentContext.parentRef;
	  state.caretPosition++;

	  return state
	}

	var doctypeAttribute$1 = function doctypeAttribute (token, state) {
	  if (token.type === TOKEN_DOCTYPE_END) {
	    return handleDoctypeEnd(state)
	  }

	  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START) {
	    return handleAttributeWrapperStart(state, token)
	  }

	  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END) {
	    return handleAttributeWrapperEnd(state, token)
	  }

	  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE) {
	    return handleAttributeValue(state, token)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_OPEN_TAG_START_SCRIPT,
	  TOKEN_OPEN_TAG_END_SCRIPT,
	  TOKEN_CLOSE_TAG_SCRIPT,
	  TOKEN_ATTRIBUTE_KEY: TOKEN_ATTRIBUTE_KEY$1,
	  TOKEN_ATTRIBUTE_ASSIGNMENT: TOKEN_ATTRIBUTE_ASSIGNMENT$1,
	  TOKEN_SCRIPT_TAG_CONTENT
	} = tokenTypes;
	const { ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$2 } = treeConstructorContexts;

	function handleOpenTagStartScript (state, token) {
	  state.currentNode.content.openStart = token;
	  state.caretPosition++;

	  return state
	}

	function handleAttributeStartScript (state) {
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: ATTRIBUTES_CONTEXT$2
	  };

	  return state
	}

	function handleOpenTagEndScript (state, token) {
	  state.currentNode.content.openEnd = token;
	  state.caretPosition++;

	  return state
	}

	function handleScriptContent (state, token) {
	  state.currentNode.content.value = token;
	  state.caretPosition++;

	  return state
	}

	function handleCloseTagScript (state, token) {
	  state.currentNode.content.close = token;
	  state.currentNode = state.currentNode.parentRef;
	  state.currentContext = state.currentContext.parentRef;
	  state.caretPosition++;

	  return state
	}

	var scriptTag$1 = function scriptTag (token, state) {
	  if (token.type === TOKEN_OPEN_TAG_START_SCRIPT) {
	    return handleOpenTagStartScript(state, token)
	  }

	  const ATTRIBUTE_START_TOKENS = [
	    TOKEN_ATTRIBUTE_KEY$1,
	    TOKEN_ATTRIBUTE_ASSIGNMENT$1
	  ];

	  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
	    return handleAttributeStartScript(state)
	  }


	  if (token.type === TOKEN_OPEN_TAG_END_SCRIPT) {
	    return handleOpenTagEndScript(state, token)
	  }

	  if (token.type === TOKEN_SCRIPT_TAG_CONTENT) {
	    return handleScriptContent(state, token)
	  }

	  if (token.type === TOKEN_CLOSE_TAG_SCRIPT) {
	    return handleCloseTagScript(state, token)
	  }

	  state.caretPosition++;

	  return state
	};

	const {
	  TOKEN_OPEN_TAG_START_STYLE,
	  TOKEN_OPEN_TAG_END_STYLE,
	  TOKEN_CLOSE_TAG_STYLE,
	  TOKEN_ATTRIBUTE_KEY,
	  TOKEN_ATTRIBUTE_ASSIGNMENT,
	  TOKEN_STYLE_TAG_CONTENT
	} = tokenTypes;
	const { ATTRIBUTES_CONTEXT: ATTRIBUTES_CONTEXT$1 } = treeConstructorContexts;

	function handleOpenTagStartStyle (state, token) {
	  state.currentNode.content.openStart = token;
	  state.caretPosition++;

	  return state
	}

	function handleAttributeStartStyle (state) {
	  state.currentContext = {
	    parentRef: state.currentContext,
	    type: ATTRIBUTES_CONTEXT$1
	  };

	  return state
	}

	function handleOpenTagEndStyle (state, token) {
	  state.currentNode.content.openEnd = token;
	  state.caretPosition++;

	  return state
	}

	function handleStyleContent (state, token) {
	  state.currentNode.content.value = token;
	  state.caretPosition++;

	  return state
	}

	function handleCloseTagStyle (state, token) {
	  state.currentNode.content.close = token;
	  state.currentNode = state.currentNode.parentRef;
	  state.currentContext = state.currentContext.parentRef;
	  state.caretPosition++;

	  return state
	}

	var styleTag$1 = function styleTag (token, state) {
	  if (token.type === TOKEN_OPEN_TAG_START_STYLE) {
	    return handleOpenTagStartStyle(state, token)
	  }

	  const ATTRIBUTE_START_TOKENS = [
	    TOKEN_ATTRIBUTE_KEY,
	    TOKEN_ATTRIBUTE_ASSIGNMENT
	  ];

	  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
	    return handleAttributeStartStyle(state)
	  }

	  if (token.type === TOKEN_OPEN_TAG_END_STYLE) {
	    return handleOpenTagEndStyle(state, token)
	  }

	  if (token.type === TOKEN_STYLE_TAG_CONTENT) {
	    return handleStyleContent(state, token)
	  }

	  if (token.type === TOKEN_CLOSE_TAG_STYLE) {
	    return handleCloseTagStyle(state, token)
	  }

	  state.caretPosition++;

	  return state
	};

	const tag = tag$1;
	const tagContent = tagContent$1;
	const tagName = tagName$1;
	const attributes = attributes$1;
	const attribute = attribute$1;
	const attributeValue = attributeValue$1;
	const comment = comment$1;
	const doctype = doctype$1;
	const doctypeAttributes = doctypeAttributes$1;
	const doctypeAttribute = doctypeAttribute$1;
	const scriptTag = scriptTag$1;
	const styleTag = styleTag$1;

	const {
	  TAG_CONTENT_CONTEXT,
	  TAG_CONTEXT,
	  TAG_NAME_CONTEXT,
	  ATTRIBUTES_CONTEXT,
	  ATTRIBUTE_CONTEXT,
	  ATTRIBUTE_VALUE_CONTEXT,
	  COMMENT_CONTEXT,
	  DOCTYPE_CONTEXT,
	  DOCTYPE_ATTRIBUTES_CONTEXT,
	  DOCTYPE_ATTRIBUTE_CONTEXT,
	  SCRIPT_TAG_CONTEXT,
	  STYLE_TAG_CONTEXT
	} = treeConstructorContexts;
	const { NODE_DOCUMENT: NODE_DOCUMENT$1 } = astNodes;

	const contextsMap = {
	  [TAG_CONTENT_CONTEXT]: tagContent,
	  [TAG_CONTEXT]: tag,
	  [TAG_NAME_CONTEXT]: tagName,
	  [ATTRIBUTES_CONTEXT]: attributes,
	  [ATTRIBUTE_CONTEXT]: attribute,
	  [ATTRIBUTE_VALUE_CONTEXT]: attributeValue,
	  [COMMENT_CONTEXT]: comment,
	  [DOCTYPE_CONTEXT]: doctype,
	  [DOCTYPE_ATTRIBUTES_CONTEXT]: doctypeAttributes,
	  [DOCTYPE_ATTRIBUTE_CONTEXT]: doctypeAttribute,
	  [SCRIPT_TAG_CONTEXT]: scriptTag,
	  [STYLE_TAG_CONTEXT]: styleTag
	};

	function processTokens (tokens, state, positionOffset) {
	  let tokenIndex = state.caretPosition - positionOffset;

	  while (tokenIndex < tokens.length) {
	    const token = tokens[tokenIndex];
	    const contextHandler = contextsMap[state.currentContext.type];

	    state = contextHandler(token, state);
	    tokenIndex = state.caretPosition - positionOffset;
	  }

	  return state
	}

	var constructTree$3 = function constructTree (
	  tokens = [],
	  existingState,
	  parseOptions = {}
	) {
	  let state = existingState;

	  if (existingState === undefined) {
	    const rootContext = {
	      type: TAG_CONTENT_CONTEXT,
	      parentRef: undefined,
	      content: []
	    };
	    const rootNode = {
	      nodeType: NODE_DOCUMENT$1,
	      parentRef: undefined,
	      content: {}
	    };

	    state = {
	      caretPosition: 0,
	      currentContext: rootContext,
	      currentNode: rootNode,
	      rootNode,
	      parseOptions
	    };
	  }

	  const positionOffset = state.caretPosition;

	  processTokens(tokens, state, positionOffset);

	  return { state, ast: state.rootNode }
	};

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray$1 = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	  ? global$1.TYPED_ARRAY_SUPPORT
	  : true;

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray$1(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	Buffer.isBuffer = isBuffer;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!isArray$1(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	const { Transform: Transform$2 } = require('stream');

	const tokenize$2 = require('./tokenize');

	class StreamTokenizer$1 extends Transform$2 {
	  constructor (options) {
	    super(Object.assign(
	      {},
	      options,
	      {
	        decodeStrings: false,
	        readableObjectMode: true
	      }
	    ));

	    this.currentTokenizerState = undefined;
	    this.setDefaultEncoding('utf8');
	  }

	  _transform (chunk, encoding, callback) {
	    let chunkString = chunk;

	    if (Buffer.isBuffer(chunk)) {
	      chunkString = chunk.toString();
	    }

	    const { state, tokens } = tokenize$2(
	      chunkString,
	      this.currentTokenizerState,
	      { isFinalChunk: false }
	    );

	    this.currentTokenizerState = state;

	    callback(null, tokens);
	  }

	  _flush (callback) {
	    const tokenizeResults = tokenize$2(
	      '',
	      this.currentTokenizerState,
	      { isFinalChunk: true }
	    );

	    this.push(tokenizeResults.tokens);

	    callback();
	  }
	}

	module.exports = StreamTokenizer$1;

	var streamTokenizer = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var require$$2 = /*@__PURE__*/getAugmentedNamespace(streamTokenizer);

	var domain;

	// This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).
	function EventHandlers() {}
	EventHandlers.prototype = Object.create(null);

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}

	// nodejs oddity
	// require('events') === require('events').EventEmitter
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;

	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.init = function() {
	  this.domain = null;
	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active ) ;
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n))
	    throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	// These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.
	function emitNone(handler, isFn, self) {
	  if (isFn)
	    handler.call(self);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self);
	  }
	}
	function emitOne(handler, isFn, self, arg1) {
	  if (isFn)
	    handler.call(self, arg1);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1);
	  }
	}
	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn)
	    handler.call(self, arg1, arg2);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2);
	  }
	}
	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn)
	    handler.call(self, arg1, arg2, arg3);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2, arg3);
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn)
	    handler.apply(self, args);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].apply(self, args);
	  }
	}

	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = (type === 'error');

	  events = this._events;
	  if (events)
	    doError = (doError && events.error == null);
	  else if (!doError)
	    return false;

	  domain = this.domain;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    er = arguments[1];
	    if (domain) {
	      if (!er)
	        er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }
	    return false;
	  }

	  handler = events[type];

	  if (!handler)
	    return false;

	  var isFn = typeof handler === 'function';
	  len = arguments.length;
	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;
	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;
	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;
	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower
	    default:
	      args = new Array(len - 1);
	      for (i = 1; i < len; i++)
	        args[i - 1] = arguments[i];
	      emitMany(handler, isFn, this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');

	  events = target._events;
	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] :
	                                          [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    }

	    // Check for listener leak
	    if (!existing.warned) {
	      m = $getMaxListeners(target);
	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' +
	                            existing.length + ' ' + type + ' listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }

	  return target;
	}
	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}
	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function _onceWrap(target, type, listener) {
	  var fired = false;
	  function g() {
	    target.removeListener(type, g);
	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }
	  g.listener = listener;
	  return g;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');

	      events = this._events;
	      if (!events)
	        return this;

	      list = events[type];
	      if (!list)
	        return this;

	      if (list === listener || (list.listener && list.listener === listener)) {
	        if (--this._eventsCount === 0)
	          this._events = new EventHandlers();
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length; i-- > 0;) {
	          if (list[i] === listener ||
	              (list[i].listener && list[i].listener === listener)) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (list.length === 1) {
	          list[0] = undefined;
	          if (--this._eventsCount === 0) {
	            this._events = new EventHandlers();
	            return this;
	          } else {
	            delete events[type];
	          }
	        } else {
	          spliceOne(list, position);
	        }

	        if (events.removeListener)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events;

	      events = this._events;
	      if (!events)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (!events.removeListener) {
	        if (arguments.length === 0) {
	          this._events = new EventHandlers();
	          this._eventsCount = 0;
	        } else if (events[type]) {
	          if (--this._eventsCount === 0)
	            this._events = new EventHandlers();
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        for (var i = 0, key; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = new EventHandlers();
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners) {
	        // LIFO order
	        do {
	          this.removeListener(type, listeners[listeners.length - 1]);
	        } while (listeners[0]);
	      }

	      return this;
	    };

	EventEmitter.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;

	  if (!events)
	    ret = [];
	  else {
	    evlistener = events[type];
	    if (!evlistener)
	      ret = [];
	    else if (typeof evlistener === 'function')
	      ret = [evlistener.listener || evlistener];
	    else
	      ret = unwrapListeners(evlistener);
	  }

	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount$1.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount$1;
	function listenerCount$1(type) {
	  var events = this._events;

	  if (events) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	};

	// About 1.5x faster than the two-arg version of Array#splice().
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
	    list[i] = list[k];
	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);
	  while (i--)
	    copy[i] = arr[i];
	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	var inherits;
	if (typeof Object.create === 'function'){
	  inherits = function inherits(ctor, superCtor) {
	    // implementation from standard node.js 'util' module
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  inherits = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}
	var inherits$1 = inherits;

	var formatRegExp = /%[sdj%]/g;
	function format(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject$3(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	}

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	function deprecate(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global$1.process)) {
	    return function() {
	      return deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}

	var debugs = {};
	var debugEnviron;
	function debuglog(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = 0;
	      debugs[set] = function() {
	        var msg = format.apply(null, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	}

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    _extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction$1(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction$1(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction$1(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function(prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}

	function isNull(arg) {
	  return arg === null;
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isString(arg) {
	  return typeof arg === 'string';
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

	function isRegExp(re) {
	  return isObject$3(re) && objectToString(re) === '[object RegExp]';
	}

	function isObject$3(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isDate(d) {
	  return isObject$3(d) && objectToString(d) === '[object Date]';
	}

	function isError(e) {
	  return isObject$3(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}

	function isFunction$1(arg) {
	  return typeof arg === 'function';
	}

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	function _extend(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject$3(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	}
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	function BufferList() {
	  this.head = null;
	  this.tail = null;
	  this.length = 0;
	}

	BufferList.prototype.push = function (v) {
	  var entry = { data: v, next: null };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};

	BufferList.prototype.unshift = function (v) {
	  var entry = { data: v, next: this.head };
	  if (this.length === 0) this.tail = entry;
	  this.head = entry;
	  ++this.length;
	};

	BufferList.prototype.shift = function () {
	  if (this.length === 0) return;
	  var ret = this.head.data;
	  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	  --this.length;
	  return ret;
	};

	BufferList.prototype.clear = function () {
	  this.head = this.tail = null;
	  this.length = 0;
	};

	BufferList.prototype.join = function (s) {
	  if (this.length === 0) return '';
	  var p = this.head;
	  var ret = '' + p.data;
	  while (p = p.next) {
	    ret += s + p.data;
	  }return ret;
	};

	BufferList.prototype.concat = function (n) {
	  if (this.length === 0) return Buffer.alloc(0);
	  if (this.length === 1) return this.head.data;
	  var ret = Buffer.allocUnsafe(n >>> 0);
	  var p = this.head;
	  var i = 0;
	  while (p) {
	    p.data.copy(ret, i);
	    i += p.data.length;
	    p = p.next;
	  }
	  return ret;
	};

	// Copyright Joyent, Inc. and other Node contributors.
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     };


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	function StringDecoder(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	}

	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}

	Readable.ReadableState = ReadableState;

	var debug = debuglog('stream');
	inherits$1(Readable, EventEmitter);

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event])
	      emitter.on(event, fn);
	    else if (Array.isArray(emitter._events[event]))
	      emitter._events[event].unshift(fn);
	    else
	      emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	function listenerCount (emitter, type) {
	  return emitter.listeners(type).length;
	}
	function ReadableState(options, stream) {

	  options = options || {};

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	function Readable(options) {

	  if (!(this instanceof Readable)) return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  if (options && typeof options.read === 'function') this._read = options.read;

	  EventEmitter.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;

	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = Buffer.from(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var _e = new Error('stream.unshift() after end event');
	      stream.emit('error', _e);
	    } else {
	      var skipAdd;
	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }

	      if (!addToFront) state.reading = false;

	      // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode
	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

	          if (state.needReadable) emitReadable(stream);
	        }
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;

	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}

	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false);

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (listenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && src.listeners('data').length) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var _i = 0; _i < len; _i++) {
	      dests[_i].emit('unpipe', this);
	    }return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = EventEmitter.prototype.on.call(this, ev, fn);

	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        nextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;

	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }

	  return ret;
	}

	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}

	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = Buffer.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	// A bit simpler than readable streams.
	Writable.WritableState = WritableState;
	inherits$1(Writable, EventEmitter);

	function nop() {}

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}

	function WritableState(options, stream) {
	  Object.defineProperty(this, 'buffer', {
	    get: deprecate(function () {
	      return this.getBuffer();
	    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	  });
	  options = options || {};

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function writableStateGetBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	function Writable(options) {

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;

	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }

	  EventEmitter.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};

	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  nextTick(cb, er);
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	  // Always throw error if a null is written
	  // if we are not in object mode then throw
	  // if it is not a buffer, string, or undefined.
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    nextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

	  if (typeof cb !== 'function') cb = nop;

	  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) nextTick(cb, er);else cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      /*<replacement>*/
	        nextTick(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	        afterWrite(stream, state, finished, cb);
	      }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;

	    var count = 0;
	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }

	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;
	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }
	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}

	inherits$1(Duplex, Readable);

	var keys = Object.keys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false) this.readable = false;

	  if (options && options.writable === false) this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	// a transform stream is a readable/writable stream where you do
	inherits$1(Transform$1, Duplex);

	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined) stream.push(data);

	  cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	function Transform$1(options) {
	  if (!(this instanceof Transform$1)) return new Transform$1(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;

	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }

	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er) {
	      done(stream, er);
	    });else done(stream);
	  });
	}

	Transform$1.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform$1.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('Not implemented');
	};

	Transform$1.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform$1.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	function done(stream, er) {
	  if (er) return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

	  if (ts.transforming) throw new Error('Calling transform done when still transforming');

	  return stream.push(null);
	}

	inherits$1(PassThrough, Transform$1);
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);

	  Transform$1.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

	inherits$1(Stream, EventEmitter);
	Stream.Readable = Readable;
	Stream.Writable = Writable;
	Stream.Duplex = Duplex;
	Stream.Transform = Transform$1;
	Stream.PassThrough = PassThrough;

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;

	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EventEmitter.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EventEmitter.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};

	var stream = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': Stream,
		Readable: Readable,
		Writable: Writable,
		Duplex: Duplex,
		Transform: Transform$1,
		PassThrough: PassThrough,
		Stream: Stream
	});

	var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(stream);

	const { Transform } = require$$0$2;

	const constructTree$2 = constructTree$3;

	class StreamTreeConstructor$1 extends Transform {
	  constructor (options) {
	    super(Object.assign(
	      {},
	      options,
	      {
	        objectMode: true,
	        readableObjectMode: true
	      }
	    ));

	    this.currentState = undefined;
	  }

	  _transform (tokensChunk, encoding, callback) {
	    const { state, ast } = constructTree$2(
	      tokensChunk,
	      this.currentState
	    );

	    this.currentState = state;

	    callback(null, ast);
	  }
	}

	var streamTreeConstructor = StreamTreeConstructor$1;

	const tokenize$1 = tokenize_1;
	const constructTree$1 = constructTree$3;
	const StreamTokenizer = require$$2;
	const StreamTreeConstructor = streamTreeConstructor;

	// Need to be separate exports
	// in order to be properly bundled
	// and recognised by Rollup as named
	// exports
	_hyntaxYx_1_0_3_hyntaxYx.tokenize = tokenize$1;
	_hyntaxYx_1_0_3_hyntaxYx.constructTree = constructTree$1;
	_hyntaxYx_1_0_3_hyntaxYx.StreamTokenizer = StreamTokenizer;
	_hyntaxYx_1_0_3_hyntaxYx.StreamTreeConstructor = StreamTreeConstructor;

	const { constructTree, tokenize } = _hyntaxYx_1_0_3_hyntaxYx;
	var parse$5 = (code) => {
	    // const selfClosingTag = code.replace(/{{[^{^}]+}}/g, '').match(/(?<=\<)[a-z|\.|-]+(?=[^><]+\/>)/g)
	    const { tokens } = tokenize(code);
	    const { ast } = constructTree(tokens);
	    return ast
	};

	const { isObject: isObject$2 } = util;

	// 查找时 ast无用属性
	const Props = [
	    'startPosition',
	    'endPosition',
	    'parentRef',
	    'openStart',
	    'openEnd',
	    'startWrapper',
	    'endWrapper',
	    'close'
	];


	const filterProps$2 = function (node, structure) {
	    for (const key in node) {
	        // 过滤值为空的字段
	        if (Props.indexOf(key) == -1 && node[key]) {
	            if (isObject$2(node[key])) {
	                if (Array.isArray(node[key])) {
	                    structure[key] = [];
	                    node[key].forEach((n, i) => {
	                        structure[key][i] = {};
	                        filterProps$2(n, structure[key][i]);
	                    });
	                } else {
	                    structure[key] = {};
	                    filterProps$2(node[key], structure[key]);
	                }
	            } else {
	                structure[key] = node[key];
	            }
	        }
	    }
	};

	var filterProp$1 = filterProps$2;

	// 把简单的api转换成ast
	const parse$4 = parse$5;
	const filterProps$1 = filterProp$1;

	function getSelector$1(selectorCode, parseOptions, expando = 'g123o456g789o') {
	    const selector = { nodeType: '', structure: {} };
	    if (typeof selectorCode != 'string') {
	        // 如果是通过builders造出来的ast结构，比如return语句
	        selector.nodeType = selectorCode.nodeType;
	        filterProps$1(selectorCode, selector.structure);
	        selector.type = selectorCode.nodeType; // 兼容只用type匹配的选择器
	        return selector;
	    } else {
	        selectorCode = selectorCode
	            .replace(/\$_\$/g, expando)
	            .replace(/\$\$\$/g, expando.slice(0, -1) + '$3');
	    }
	    let selectorAst = parse$4(selectorCode);
	    if (selectorAst.content && selectorAst.content.children && selectorAst.content.children[0]) {
	        filterProps$1(selectorAst.content.children[0], selector.structure);
	        selector.nodeType = selectorAst.content.children[0].nodeType;
	    }
	    return selector;
	}

	var getSelector_1 = getSelector$1;

	var htmlTraverse = (ast, transformMap = {}, filePath, deleteComment) => {
	    if (ast.nodeType) {
	        handleNode(ast);
	    } else if (ast.content && ast.content.children && ast.content.children.length > 0) {
	        traversChildnode(ast.content.children);
	    }
	    if (Array.isArray(ast)) {
	        ast.forEach(a => { 
	            handleNode(a);
	        });
	    }
	    function handleNode(node) {
	        const posIndex = node.parentRef && node.parentRef.content.children && Array.isArray(node.parentRef.content.children)
	            ? node.parentRef.content.children.indexOf(node)
	            : undefined;
	            
	        const extra = {
	            document: ast,
	            nodeRef: node,
	            posIndex,
	            parentRef: node.parentRef,
	            filePath
	        };
	        if (node.nodeType == 'tag') {  // 标签处理
	            // 属性处理
	            const attrs = node.content.attributes || [];
	            const attrMap = {};
	            
	            attrs.forEach(attr => {
	                // 处理属性值的引号
	                // let content = attr.value.content.trim();
	                // if (content[0] == content[content.length - 1]) {
	                //     if (content.match(content[0]))
	                // }
	                attrMap[attr.key.content] = attr;
	            });

	            const tagHandle = transformMap.tag || [];
	            tagHandle.forEach(h => {
	                if (h.value) {
	                    if (h.value == node.content.name) {
	                        h.handle(node.content, Object.assign({ attrs, attrMap }, extra));    
	                    }
	                } else {
	                    h.handle(node.content, Object.assign({ attrs, attrMap }, extra));
	                }
	            });

	            const attrHandle = transformMap.attr || [];
	            
	            attrHandle.forEach(h => {
	                const { key, value } = h;
	                if (value) { // 某个属性有确定的key和value)
	                    if (attrMap[key] && attrMap[key].value && (attrMap[key].value.content.replace(/\s/g, '') == value)) {
	                        h.handle(node.content, 
	                            Object.assign({ attrs, attrMap }, extra)
	                        );
	                    }
	                } else if (key) {
	                    if (attrMap[key]) { // 只要有某个属性
	                        h.handle(node.content, 
	                            Object.assign({ attrs, attrMap }, extra)
	                        );
	                    }
	                } else {
	                    h.handle(node.content, 
	                        Object.assign({ attrs, attrMap }, extra)
	                    );
	                }
	                
	            });

	            const eventHandle = transformMap.event || [];
	            const attrKeys = Object.keys(attrMap);
	            const eventAttr = attrKeys.filter(k => k.match('mx-'))[0];
	            if (eventAttr) {
	                eventHandle.forEach(h => {
	                    h.handle(node.content, 
	                        Object.assign({ }, extra)
	                    );
	                });
	            }

	            if (transformMap.abandonAttr) {
	                for (let i = 0; i< attrs.length; i++) {
	                    const attr = attrs[i];
	                    if (attr && transformMap.abandonAttr.indexOf(attr.key.content) > -1) {
	                        attrs.splice(i, 1);
	                        i--;
	                    }
	                }
	            }
	        } else if (node.nodeType == 'text') { // 字符串处理
	            const handle = transformMap.text || [];
	            handle.forEach(h => {
	                let isContain = false;
	                switch (h.type) {
	                case 'containOne':
	                    isContain = h.value.some(v => node.content.value.content.match(v));
	                    if (isContain) {
	                        h.handle(node, extra);
	                    }
	                    break;
	                case 'containAll':
	                    isContain = h.value.every(v => node.content.value.content.match(v));
	                    if (isContain) {
	                        h.handle(node, extra);
	                    }
	                    break;
	                case 'equal': 
	                    if (node.content.value.content == h.value) {
	                        h.handle(node, extra);
	                    }
	                    break;
	                default:
	                    h.handle(node, extra);
	                }
	            });
	        } else {
	            // 其他节点类型
	            const handle = transformMap[node.nodeType];
	            handle && handle.forEach(h => {
	                h.handle(node, extra);
	            });

	            if (deleteComment && node.nodeType == 'comment') {
	                // 删除所有注释
	                extra.parentRef.content.children.splice(extra.posIndex, 1);
	            }
	        }

	        if (node.content.children && node.content.children.length) {
	            traversChildnode(node.content.children);
	        }
	    }
	    function traversChildnode(list) {
	        let index = 0;
	        while(list[index]) {
	            const node = list[index];
	            node._index = index;
	            node.reached || handleNode(node);
	            node.reached = true;
	            index++;
	        }
	        list.forEach(item => item.reached = false);
	    }
	    return ast;
	};

	var NodePath_1 =  class NodePath {
	    constructor(node, parent, parentPath) {
	        this.node = node;
	        this.parent = parent || null;
	        this.parentPath = parentPath || null;
	        this.value = node;
	    }
	};

	const {
	    NODE_DOCUMENT,
	    NODE_DOCTYPE,
	    NODE_TAG,
	    NODE_TEXT,
	    NODE_COMMENT,
	    NODE_SCRIPT,
	    NODE_STYLE
	} = astNodes;
	  
	function serializeDoctypeNode (node) {
	    let attributes = serializeDoctypeAttributes(node.content.attributes);
	  
	    if (attributes !== '') {
	        attributes = ` ${ attributes }`;
	    }
	  
	    return `<!doctype${ attributes }>`
	}
	  
	function serializeCommentNode (node) {
	    return `<!--${ node.content.value.content }-->`
	}
	  
	function serializeTagNode (nodeName, attributes, serializedChildren, selfClosing, node) {
	    let serializedAttributes = serializeTagAttributes(attributes);
	  
	    if (serializedAttributes !== '') {
	        serializedAttributes = ` ${ serializedAttributes }`;
	    }
	    selfClosing = (selfClosing === false ? false : node.content.selfClosing);
	    if (selfClosing) {
	        return `<${ nodeName }${ serializedAttributes }/>`
	    }
	  
	    return (
	        `<${ nodeName }${ serializedAttributes }>` +
	      serializedChildren +
	      `</${ nodeName }>`
	    )
	}
	  
	function serializeTagAttributes (attributes = []) {
	    // if (node.content.openEnd.content.replace(/\s/g, '').match('/if')) {
	      
	    // }
	    return attributes.map((item) => {
	        let serialized = '';
	  
	        if (item.key !== undefined) {
	            serialized += item.key.content;
	        }
	  
	        if (item.value !== undefined) {
	        // 处理属性中的引号
	            let quota = '"';
	            if (item.value.content && item.value.content.match && item.value.content.match(quota)) {
	                quota = "'";
	            }
	            if (item.value.content && item.value.content.trim && item.value.content.trim()[0] == '=') {
	                // 处理属性中的if语句{{#if(xx == bb)}}xxx{{/if(xx == bb)}}
	                serialized += `=${ item.value.content }`;
	            } else if (item.value.content && item.value.content.match && item.value.content.match(/\(/) && item.value.content.match(/\)/) && item.key.content.match(/\{\{/)) {
	                // 处理属性中的function语句{{ = body_updateState(this,crowd) }}
	                serialized += `=${ item.value.content }`;
	            } else {
	                serialized += `=${quota}${ item.value.content }${quota}`;
	            }
	        }
	  
	        return serialized
	    }).join(' ')
	}
	  
	function serializeDoctypeAttributes (attributes = []) {
	    return attributes.map((item) => {
	        let wrapper = '';
	  
	        if (item.startWrapper !== undefined) {
	            wrapper = item.startWrapper;
	        }
	  
	        return `${ wrapper }${ item.value.content }${ wrapper }`
	    }).join(' ')
	}
	  
	function serializeTextNode (node) {
	    return node.content.value.content
	}
	  
	function serializeNode (node, serializedChildren = '') {
	    if (node.content && node.content.children && node.content.children.length > 0) {
	        serializedChildren = node.content.children.map(child => {
	            return serializeNode(child, '');
	        }).join('');
	    }
	    switch (node.nodeType) {
	    case NODE_DOCUMENT: {
	        return serializedChildren
	    }
	  
	    case NODE_DOCTYPE: {
	        return serializeDoctypeNode(node)
	    }
	  
	    case NODE_TAG: {
	        return serializeTagNode(
	            node.content.name,
	            node.content.attributes,
	            serializedChildren,
	            undefined,
	            node
	        )
	    }
	  
	    case NODE_TEXT: {
	        return serializeTextNode(node)
	    }
	  
	    case NODE_COMMENT: {
	        return serializeCommentNode(node)
	    }
	  
	    case NODE_SCRIPT: {
	        return serializeTagNode(
	            'script',
	            node.content.attributes,
	            node.content.value ? node.content.value.content : '',
	            false,
	            node
	        )
	    }
	  
	    case NODE_STYLE: {
	        return serializeTagNode(
	            'style',
	            node.content.attributes,
	            node.content.value ? node.content.value.content : '',
	            false,
	            node
	        )
	    }
	  
	    default: {
	        throw new Error(
	            `generate failed! Unexpected node type for serialization: ${ node.nodeType }`
	        )
	    }
	    }
	}
	  
	var serializeNode_1 = serializeNode;

	const { isObject: isObject$1, hasOwn } = util;
	// 通过简单ast结构查找ast节点
	const filterProps = filterProp$1;
	const traverse = htmlTraverse;
	const NodePath$3 = NodePath_1;
	const generate$3 = serializeNode_1;

	let Expando = 'g123o456g789o';

	function checkIsMatch(full, partial, extraData, strictSequence) {
	    return Object.keys(partial).every(prop => {
	        if (prop == 'children') {
	            // 匹配一段代码
	            if (full.children && partial.children.length == 1
	                && partial.children[0].nodeType == 'text'
	                && (partial.children[0].content.value.content.match 
	                )) {
	                if (partial.children[0].content.value.content.match(Expando)) {
	                    const expandoKey = partial.children[0].content.value.content.replace(Expando, '') || '0';
	                    extraData[expandoKey] = extraData[expandoKey] || [];
	                    extraData[expandoKey].push({ node: full.children, value: full.children.map(c => generate$3(c)).join('\n') });
	                    return true;
	                } else if (partial.children[0].content.value.content.match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
	                    find$$$(partial[prop], full[prop], extraData, strictSequence);
	                    return true;
	                }
	            }
	        }
	        if (!full || !partial) {
	            return false;
	        } else if (isObject$1(partial[prop])) {
	            let res = false;
	            let has$$$ = false;
	            if (Array.isArray(partial[prop])) {
	                // 处理$$$这种情况
	                has$$$ = find$$$(partial[prop], full[prop], extraData, strictSequence);
	            }
	            if (Array.isArray(partial[prop]) && !strictSequence) {
	                if (hasOwn(full, prop)) {
	                    res = partial[prop].every(p => {
	                        let a = false;
	                        if (!full[prop].length && partial[prop].length == 1 && has$$$) {
	                            return true
	                        }
	                        full[prop] && full[prop].forEach(f => {
	                            if (checkIsMatch(f, p, extraData, strictSequence)) {
	                                a = true;
	                            }
	                        });
	                        return a;
	                    });
	                } else {
	                    if (partial[prop].length == 1 && has$$$) {
	                        return true
	                    }
	                    return false
	                }
	            } else {
	                // todo
	                try {
	                    if (partial[prop].type == 'token:attribute-value' && !full[prop]) {
	                        if (partial[prop].content.match && partial[prop].content.match(Expando)) {
	                            const expandoKey = partial[prop].content.replace(Expando, '') || '0';
	                            extraData[expandoKey] = extraData[expandoKey] || [];
	                            extraData[expandoKey].push({ node: null, value: null });
	                            return true;
	                        }
	                    }
	                    res = hasOwn(full, prop) && checkIsMatch(full[prop], partial[prop], extraData, strictSequence);
	                } catch (e) {
	                    console.log(e);
	                }

	            }
	            return res;
	        } else {
	            if (partial[prop].match && partial[prop].match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
	                return true;
	            }
	            if (partial[prop] == Expando || (partial[prop].match && partial[prop].match(Expando))) {
	                let extra = {
	                    node: full
	                };
	                const expandoKey = partial[prop].replace(Expando, '') || '0';
	                extraData[expandoKey] = extraData[expandoKey] || [];
	                if (!full) return;
	                if (full[prop]) {
	                    extra.value = full[prop];
	                } else {
	                    extra.value = {};
	                    filterProps(full, extra.value);
	                }
	                extraData[expandoKey].push(extra);
	                return true;
	            } else if (partial[prop]) ;
	            if (prop == 'content') {
	                if (partial[prop].trim().match(new RegExp(Expando))) {
	                    return true; 
	                } else {
	                    return full ? !!full[prop].match(partial[prop].trim()) : false;
	                }
	            } else {
	                return full ? full[prop] == partial[prop] : false;
	            }
	        }
	    });
	}

	function find$$$(partial, full, extraData, strictSequence) {
	    // 先考虑strctSequence = false的情况
	    let key$$$;
	    let index$$$ = -1;
	    partial.forEach((p, i) => {
	        for (const key in p) {
	            // 属性中包含$$$
	            let value = null;
	            if (p[key] && p[key].value && p[key].value.content) {
	                value = p[key].value.content;
	            } else if (p[key] && p[key].content) {
	                value = p[key].content;
	            }
	            if (value && value.match && value.match(new RegExp(Expando.slice(0, -1) + '\\$3'))) {
	                key$$$ = value.replace(new RegExp(Expando.slice(0, -1) + '\\$3'), '') || '$';
	                index$$$ = i;
	          
	                break;
	            }
	        }
	    });
	    if (!key$$$) {
	        return false;
	    }
	    const extraNodeList = full ? full.slice(0) : [];
	    partial.forEach((p, i) => {
	        if (i == index$$$) {
	            return;
	        }
	        let fi = 0;
	        while(extraNodeList[fi]) {
	            if (checkIsMatch(extraNodeList[fi], p, {}, strictSequence)) {
	                extraNodeList.splice(fi, 1);
	            } else {
	                fi++;
	            }
	        }
	    });
	    extraData[`$$$${key$$$}`] = (extraData[`$$$${key$$$}`] || []).concat(extraNodeList);
	    return true;
	}

	function find$1(nodeType, structure, strictSequence, deep, expando = 'g123o456g789o') {
	    const nodePathList = [];
	    const matchWildCardList = [];
	    let isMatch = false;
	    Expando = expando;
	    const traverseMap = {
	        tag: nodeType == 'tag' ? [{
	            value: (structure.content.name || '').match(Expando) ? '' : structure.content.name,
	            handle(tagContent, { attrMap, parentRef, nodeRef } = {}) {
	                const matchWildCard = {};
	                isMatch = checkIsMatch(nodeRef, structure, matchWildCard, strictSequence);
	                if (isMatch) {
	                    nodePathList.push(linkParentPath(nodeRef));
	                    matchWildCardList.push(matchWildCard);
	                }
	            }
	        }] : [],
	        attr: [],
	        text: nodeType == 'text' ? [{
	            value: [(structure.content.trim && structure.content.trim() == Expando || structure.content.value.content.trim() == Expando) ? '' : structure.content.value.content.trim()],
	            type: 'containOne',
	            handle(node) {
	                nodePathList.push(linkParentPath(node));
	                matchWildCardList.push(node.content.value.content);
	            }
	        }]: []
	    };
	    if (nodeType != 'tag' && nodeType != 'text') {
	        traverseMap[nodeType] = [{
	            handle(node) {
	                nodePathList.push(linkParentPath(node));
	                if (node.content.value) {
	                    matchWildCardList.push(node.content.value.content);
	                }
	                
	            }
	        }];
	    }
	    traverse(this, traverseMap);
	    return { nodePathList, matchWildCardList };
	}

	function linkParentPath(node) {
	    while(node) {
	        const pPath = node.parentRef ? linkParentPath(node.parentRef) : null;
	        const path = new NodePath$3(node, pPath, pPath);
	        return path;
	    }
	    return null
	}

	var find_1 = { find: find$1 };

	const getSelector = getSelector_1;
	const { find } = find_1;
	const parse$3 = parse$5;
	const generate$2 = serializeNode_1;
	const core$2 = {
	    // 通过选择器获取，返回ast片段
	    getAstsBySelector(
	        ast,
	        selector,
	        { strictSequence, deep, parseOptions, expando = 'g123o456g789o' } = {}
	    ) {
	        //strictSequence作用：
	        // 有的时候数组不要求顺序，如{a:$_$}匹配{b:1, a:2}
	        // 有的时候需要，如function($_$, $_$)匹配function(a, b) {}

	        if (!Array.isArray(selector)) {
	            selector = [selector];
	        }
	        let nodePathList = [];
	        let matchWildCardList = [];
	        const selectorAst = selector.map((item) => {
	            const sel = getSelector(
	                item,
	                this.parseOptions || parseOptions,
	                expando
	            );
	            if (!sel.nodeType) {
	                throw new Error(
	                    '语句类型缺失，请在 https://github.com/thx/gogocode/issues 上提供您的代码样例'
	                );
	            }
	            return sel;
	        });
	        const posStrList = [];
	        selectorAst.forEach((item) => {
	            const res = find.call(
	                ast,
	                item.nodeType,
	                item.structure,
	                strictSequence,
	                deep,
	                expando
	            );
	            res.nodePathList.forEach((p, i) => {
	                let posStr = '';
	                if (p.node.content.openStart) {
	                    posStr = `${p.node.content.openStart.startPosition},${p.node.content.openEnd.endPosition}`;
	                } else if (p.node.content.value) {
	                    posStr = `${p.node.content.value.startPosition},${p.node.content.value.endPosition}`;
	                }
	                if (posStrList.indexOf(posStr) == -1) {
	                    // 去重
	                    nodePathList.push(p);
	                    matchWildCardList.push(res.matchWildCardList[i]);
	                    posStrList.push(posStr);
	                }
	            });
	        });
	        return {
	            nodePathList,
	            matchWildCardList,
	            pathList: nodePathList,
	            extraDataList: matchWildCardList
	        };
	    },
	    getParentListByAst(path) {
	        const list = [];
	        while (path && path.parentPath) {
	            list.push(path.parentPath);
	            path = path.parentPath;
	        }
	        return list;
	    },

	    buildAstByAstStr(
	        str,
	        astPatialMap = {},
	        { isProgram = false, parseOptions } = {}
	    ) {
	        try {
	            const ast = parse$3(str, parseOptions);
	            const program = core$2.replaceStrByAst(ast, astPatialMap);
	            if (program) {
	                if (isProgram) {
	                    return program;
	                } else {
	                    if (
	                        program.content.children &&
	                        program.content.children[0]
	                    ) {
	                        return program.content.children[0];
	                    }
	                }
	            } else {
	                return null;
	            }
	        } catch (e) {
	            console.log('buildAstByAstStr failed:' + e);
	        }
	    },
	    replaceStrByAst(ast, astPatialMap = {}) {
	        for (let key in astPatialMap) {
	            const valueAst = astPatialMap[key];
	            const { nodePathList } = core$2.getAstsBySelector(
	                ast,
	                `'$_$${key}$_$'`
	            );
	            if (nodePathList.length > 0) {
	                nodePathList[0].replace(valueAst);
	            }
	        }
	        return ast;
	    },
	    replaceAstByAst(oldAst, newAst) {
	        if (oldAst.parent && oldAst.parent.node && oldAst.parent.node.content) {
	            oldAst.parent.node.content.children.splice(
	                oldAst.node._index,
	                1,
	                newAst
	            );
	        } else if (oldAst.node.nodeType == 'document') {
	            oldAst.node.content.children = [newAst];
	        }
	    },
	    replaceSelBySel(
	        ast,
	        selector,
	        replacer,
	        strictSequence,
	        parseOptions,
	        expando = 'g123o456g789o'
	    ) {
	        // 用于结构不一致的，整体替换
	        if (ast.node) {
	            ast = ast.node;
	        }
	        const { nodePathList, matchWildCardList } = core$2.getAstsBySelector(
	            ast,
	            selector,
	            {
	                strictSequence,
	                deep: 'nn',
	                parseOptions: this.parseOptions || parseOptions,
	                expando
	            }
	        );
	        const originReplacer = replacer;
	        nodePathList.forEach((path, i) => {
	            const extra = matchWildCardList[i];
	            replacer = originReplacer;
	            if (typeof replacer == 'function') {
	                replacer = replacer(extra, path);
	            }
	            if (Object.keys(extra).length > 0 && typeof replacer == 'string') {
	                let newReplacer = replacer;
	                for (let key in extra) {
	                    if (key.match(/\$\$\$/)) {
	                        let key$$$ = key.replace(/\$\$\$/, '');
	                        key$$$ == '$' && (key$$$ = '');
	                        let join = '\n';

	                        let wildCardCode = extra[key]
	                            .map((item) => {
	                                let codeStr = '';
	                                if (item.key) {
	                                    if (item.value) {
	                                        codeStr = `${item.key.content}="${item.value.content}"`;
	                                    } else {
	                                        codeStr = item.key.content;
	                                    }
	                                } else if (item.nodeType == 'text') {
	                                    codeStr = item.content.value.content;
	                                } else if (item.nodeType == 'tag') {
	                                    codeStr = generate$2(item);
	                                }
	                                try {
	                                    // 嵌套replace
	                                    const childAst = core$2.buildAstByAstStr(
	                                        generate$2(item), {}, { isProgram: true }
	                                    );
	                                    core$2.replaceSelBySel(
	                                        childAst,
	                                        selector,
	                                        replacer,
	                                        strictSequence,
	                                        parseOptions,
	                                        expando
	                                    );
	                                    codeStr = generate$2(childAst);
	                                } catch (e) {
	                                    //
	                                }
	                                return codeStr;
	                            })
	                            .join(join);
	                        // 不能都用,连接，还是需要找到$_$
	                        newReplacer = newReplacer.replace(
	                            '$$$' + key$$$,
	                            wildCardCode
	                        );
	                    } else {
	                        let wildCardCode = extra[key][0].value;
	                        key == '0' && (key = '');
	                        newReplacer = newReplacer
	                            .replace('$_$' + key, wildCardCode);
	                        // 通过选择器替换ast，返回完整ast
	                    }
	                }
	                core$2.replace(path, newReplacer);
	            } else {
	                core$2.replace(path, replacer);
	            }
	        });
	    },
	    replace(oldPath, newReplacer) {
	        let parentContent, index, isDoc, newNodes;
	        if (oldPath.node.nodeType == 'document') {
	            isDoc = true;
	        } else {
	            parentContent = oldPath.parent.node.content.children || [];
	            index = parentContent.indexOf(oldPath.node);
	        }
	        if (!newReplacer) {
	            // 删除节点
	            if (index > -1) {
	                if (isDoc) {
	                    oldPath.node.content.children = [];
	                } else {
	                    parentContent.splice(index, 1);
	                }
	            }
	            return;
	        } else if (newReplacer.nodeType == 'document') {
	            newNodes = newReplacer.content.children || [];
	        } else if (typeof newReplacer == 'string') {
	            // 通过字符串解析为node
	            if (index > -1) {
	                newNodes = core$2.buildAstByAstStr(
	                    newReplacer,
	                    {},
	                    { isProgram: true }
	                ).content.children;
	            }
	        } else if (newReplacer[0] && newReplacer[0].nodePath) {
	            // AST实例
	            newNodes = [newReplacer.node];
	        } else if (newReplacer.type) {
	            // AST node
	            newNodes = [newReplacer];
	        }
	        if (isDoc) {
	            oldPath.node.content.children = newNodes;
	        } else {
	            newNodes.forEach(newNode => {
	                newNode.parentRef = oldPath.parent.node;
	                parentContent.splice(index, 1, newNode);
	            });
	        }
	    },
	    removeAst(ast, selector, { strictSequence, parseOptions, expando } = {}) {
	        if (!ast || typeof ast !== 'object') {
	            throw new Error('remove failed! first argument mast be object');
	        }
	        if (
	            !selector ||
	            (typeof selector !== 'object' &&
	                typeof selector !== 'string' &&
	                !Array.isArray(selector))
	        ) {
	            throw new Error(
	                'remove failed! first argument mast be object、string or string array'
	            );
	        }
	        // const selectorAst = getSelector(selector, this.parseOptions);
	        // console.log(selectorAst)
	        const { nodePathList } = core$2.getAstsBySelector(ast, selector, {
	            strictSequence,
	            parseOptions,
	            expando
	        });
	        // const { nodePathList } = find.call(ast, selectorAst.nodeType, selectorAst.structure, true, 'nn');
	        // console.log(nodePathList)
	        nodePathList.forEach((path) => {
	            // 多条语句逗号分割的话，只删除一个；一条语句的话，删除父节点
	            const parentChildList = path.parent.node.content.children;
	            const index = parentChildList.indexOf(path.node);
	            parentChildList.splice(index, 1);
	        });
	    },
	    remove(ast) {
	        try {
	            ast.node.parentRef.content.children.forEach((item, index) => {
	                if (item == ast.node) {
	                    ast.node.parentRef.content.children.splice(index, 1);
	                }
	            });
	        } catch (e) {
	            throw `remove failed! ${e}`;
	        }
	    }
	};

	var core_1$1 = core$2;

	Object.defineProperty(exports, '__esModule', { value: true });

	var CompilerDOM = require('@vue/compiler-dom');
	var sourceMap = require('source-map');
	var hash = require('hash-sum');
	var path = require('path');
	var compilerCore = require('@vue/compiler-core');
	var url = require('url');
	var shared = require('@vue/shared');
	var CompilerSSR = require('@vue/compiler-ssr');
	var postcss = require('postcss');
	var selectorParser = require('postcss-selector-parser');
	var merge = require('merge-source-map');
	var MagicString = require('magic-string');
	var parser = require('@babel/parser');
	var estreeWalker = require('estree-walker');

	function _interopDefaultLegacy$1 (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	function _interopNamespace$1(e) {
	  if (e && e.__esModule) return e;
	  var n = Object.create(null);
	  if (e) {
	    Object.keys(e).forEach(function (k) {
	      n[k] = e[k];
	    });
	  }
	  n['default'] = e;
	  return Object.freeze(n);
	}

	var CompilerDOM__namespace = /*#__PURE__*/_interopNamespace$1(CompilerDOM);
	var hash__default = /*#__PURE__*/_interopDefaultLegacy$1(hash);
	var path__default = /*#__PURE__*/_interopDefaultLegacy$1(path);
	var CompilerSSR__namespace = /*#__PURE__*/_interopNamespace$1(CompilerSSR);
	var postcss__default = /*#__PURE__*/_interopDefaultLegacy$1(postcss);
	var selectorParser__default = /*#__PURE__*/_interopDefaultLegacy$1(selectorParser);
	var merge__default = /*#__PURE__*/_interopDefaultLegacy$1(merge);
	var MagicString__default = /*#__PURE__*/_interopDefaultLegacy$1(MagicString);

	const CSS_VARS_HELPER = `useCssVars`;
	const cssVarRE = /\bv-bind\(\s*(?:'([^']+)'|"([^"]+)"|([^'"][^)]*))\s*\)/g;
	function genCssVarsFromList(vars, id, isProd) {
	    return `{\n  ${vars
        .map(key => `"${genVarName(id, key, isProd)}": (${key})`)
        .join(',\n  ')}\n}`;
	}
	function genVarName(id, raw, isProd) {
	    if (isProd) {
	        return hash__default(id + raw);
	    }
	    else {
	        return `${id}-${raw.replace(/([^\w-])/g, '_')}`;
	    }
	}
	function parseCssVars(sfc) {
	    const vars = [];
	    sfc.styles.forEach(style => {
	        let match;
	        while ((match = cssVarRE.exec(style.content))) {
	            vars.push(match[1] || match[2] || match[3]);
	        }
	    });
	    return vars;
	}
	const cssVarsPlugin = opts => {
	    const { id, isProd } = opts;
	    return {
	        postcssPlugin: 'vue-sfc-vars',
	        Declaration(decl) {
	            // rewrite CSS variables
	            if (cssVarRE.test(decl.value)) {
	                decl.value = decl.value.replace(cssVarRE, (_, $1, $2, $3) => {
	                    return `var(--${genVarName(id, $1 || $2 || $3, isProd)})`;
	                });
	            }
	        }
	    };
	};
	cssVarsPlugin.postcss = true;
	function genCssVarsCode(vars, bindings, id, isProd) {
	    const varsExp = genCssVarsFromList(vars, id, isProd);
	    const exp = CompilerDOM.createSimpleExpression(varsExp, false);
	    const context = CompilerDOM.createTransformContext(CompilerDOM.createRoot([]), {
	        prefixIdentifiers: true,
	        inline: true,
	        bindingMetadata: bindings
	    });
	    const transformed = CompilerDOM.processExpression(exp, context);
	    const transformedString = transformed.type === 4 /* SIMPLE_EXPRESSION */
	        ? transformed.content
	        : transformed.children
	            .map(c => {
	            return typeof c === 'string'
	                ? c
	                : c.content;
	        })
	            .join('');
	    return `_${CSS_VARS_HELPER}(_ctx => (${transformedString}))`;
	}
	// <script setup> already gets the calls injected as part of the transform
	// this is only for single normal <script>
	function genNormalScriptCssVarsCode(cssVars, bindings, id, isProd) {
	    return (`\nimport { ${CSS_VARS_HELPER} as _${CSS_VARS_HELPER} } from 'vue'\n` +
	        `const __injectCSSVars__ = () => {\n${genCssVarsCode(cssVars, bindings, id, isProd)}}\n` +
	        `const __setup__ = __default__.setup\n` +
	        `__default__.setup = __setup__\n` +
	        `  ? (props, ctx) => { __injectCSSVars__();return __setup__(props, ctx) }\n` +
	        `  : __injectCSSVars__\n`);
	}

	const hasWarned = {};
	function warnOnce(msg) {
	    const isNodeProd = typeof browser$1$1 !== 'undefined' && browser$1$1.env.NODE_ENV === 'production';
	    if (!isNodeProd && !false && !hasWarned[msg]) {
	        hasWarned[msg] = true;
	        warn(msg);
	    }
	}
	function warn(msg) {
	    console.warn(`\x1b[1m\x1b[33m[@vue/compiler-sfc]\x1b[0m\x1b[33m ${msg}\x1b[0m\n`);
	}
	function warnExperimental(feature, rfcId) {
	    // eslint-disable-next-line
	    if (typeof window !== 'undefined') {
	        return;
	    }
	    warnOnce(`${feature} is still an experimental proposal.\n` +
	        `Follow its status at https://github.com/vuejs/rfcs/pull/${rfcId}.`);
	    warnOnce(`When using experimental features,\n` +
	        `it is recommended to pin your vue dependencies to exact versions to avoid breakage.`);
	}

	const SFC_CACHE_MAX_SIZE = 500;
	const sourceToSFC = new (require('lru-cache'))(SFC_CACHE_MAX_SIZE);
	function parse$2(source, { sourceMap = true, filename = 'anonymous.vue', sourceRoot = '', pad = false, compiler = CompilerDOM__namespace } = {}) {
	    const sourceKey = source + sourceMap + filename + sourceRoot + pad + compiler.parse;
	    const cache = sourceToSFC.get(sourceKey);
	    if (cache) {
	        return cache;
	    }
	    const descriptor = {
	        filename,
	        source,
	        template: null,
	        script: null,
	        scriptSetup: null,
	        styles: [],
	        customBlocks: [],
	        cssVars: [],
	        slotted: false
	    };
	    const errors = [];
	    const ast = compiler.parse(source, {
	        // there are no components at SFC parsing level
	        isNativeTag: () => true,
	        // preserve all whitespaces
	        isPreTag: () => true,
	        getTextMode: ({ tag, props }, parent) => {
	            // all top level elements except <template> are parsed as raw text
	            // containers
	            if ((!parent && tag !== 'template') ||
	                // <template lang="xxx"> should also be treated as raw text
	                (tag === 'template' &&
	                    props.some(p => p.type === 6 /* ATTRIBUTE */ &&
	                        p.name === 'lang' &&
	                        p.value &&
	                        p.value.content &&
	                        p.value.content !== 'html'))) {
	                return 2 /* RAWTEXT */;
	            }
	            else {
	                return 0 /* DATA */;
	            }
	        },
	        onError: e => {
	            errors.push(e);
	        }
	    });
	    ast.children.forEach(node => {
	        if (node.type !== 1 /* ELEMENT */) {
	            return;
	        }
	        if (!node.children.length && !hasSrc(node) && node.tag !== 'template') {
	            return;
	        }
	        switch (node.tag) {
	            case 'template':
	                if (!descriptor.template) {
	                    const templateBlock = (descriptor.template = createBlock(node, source, false));
	                    templateBlock.ast = node;
	                }
	                else {
	                    errors.push(createDuplicateBlockError(node));
	                }
	                break;
	            case 'script':
	                const scriptBlock = createBlock(node, source, pad);
	                const isSetup = !!scriptBlock.attrs.setup;
	                if (isSetup && !descriptor.scriptSetup) {
	                    descriptor.scriptSetup = scriptBlock;
	                    break;
	                }
	                if (!isSetup && !descriptor.script) {
	                    descriptor.script = scriptBlock;
	                    break;
	                }
	                errors.push(createDuplicateBlockError(node, isSetup));
	                break;
	            case 'style':
	                const styleBlock = createBlock(node, source, pad);
	                if (styleBlock.attrs.vars) {
	                    errors.push(new SyntaxError(`<style vars> has been replaced by a new proposal: ` +
	                        `https://github.com/vuejs/rfcs/pull/231`));
	                }
	                descriptor.styles.push(styleBlock);
	                break;
	            default:
	                descriptor.customBlocks.push(createBlock(node, source, pad));
	                break;
	        }
	    });
	    if (descriptor.scriptSetup) {
	        if (descriptor.scriptSetup.src) {
	            errors.push(new SyntaxError(`<script setup> cannot use the "src" attribute because ` +
	                `its syntax will be ambiguous outside of the component.`));
	            descriptor.scriptSetup = null;
	        }
	        if (descriptor.script && descriptor.script.src) {
	            errors.push(new SyntaxError(`<script> cannot use the "src" attribute when <script setup> is ` +
	                `also present because they must be processed together.`));
	            descriptor.script = null;
	        }
	    }
	    if (sourceMap) {
	        const genMap = (block) => {
	            if (block && !block.src) {
	                block.map = generateSourceMap(filename, source, block.content, sourceRoot, !pad || block.type === 'template' ? block.loc.start.line - 1 : 0);
	            }
	        };
	        genMap(descriptor.template);
	        genMap(descriptor.script);
	        descriptor.styles.forEach(genMap);
	        descriptor.customBlocks.forEach(genMap);
	    }
	    // parse CSS vars
	    descriptor.cssVars = parseCssVars(descriptor);
	    if (descriptor.cssVars.length) {
	        warnExperimental(`v-bind() CSS variable injection`, 231);
	    }
	    // check if the SFC uses :slotted
	    const slottedRE = /(?:::v-|:)slotted\(/;
	    descriptor.slotted = descriptor.styles.some(s => s.scoped && slottedRE.test(s.content));
	    const result = {
	        descriptor,
	        errors
	    };
	    sourceToSFC.set(sourceKey, result);
	    return result;
	}
	function createDuplicateBlockError(node, isScriptSetup = false) {
	    const err = new SyntaxError(`Single file component can contain only one <${node.tag}${isScriptSetup ? ` setup` : ``}> element`);
	    err.loc = node.loc;
	    return err;
	}
	function createBlock(node, source, pad) {
	    const type = node.tag;
	    let { start, end } = node.loc;
	    let content = '';
	    if (node.children.length) {
	        start = node.children[0].loc.start;
	        end = node.children[node.children.length - 1].loc.end;
	        content = source.slice(start.offset, end.offset);
	    }
	    const loc = {
	        source: content,
	        start,
	        end
	    };
	    const attrs = {};
	    const block = {
	        type,
	        content,
	        loc,
	        attrs
	    };
	    if (pad) {
	        block.content = padContent(source, block, pad) + block.content;
	    }
	    node.props.forEach(p => {
	        if (p.type === 6 /* ATTRIBUTE */) {
	            attrs[p.name] = p.value ? p.value.content || true : true;
	            if (p.name === 'lang') {
	                block.lang = p.value && p.value.content;
	            }
	            else if (p.name === 'src') {
	                block.src = p.value && p.value.content;
	            }
	            else if (type === 'style') {
	                if (p.name === 'scoped') {
	                    block.scoped = true;
	                }
	                else if (p.name === 'module') {
	                    block.module = attrs[p.name];
	                }
	            }
	            else if (type === 'script' && p.name === 'setup') {
	                block.setup = attrs.setup;
	            }
	        }
	    });
	    return block;
	}
	const splitRE = /\r?\n/g;
	const emptyRE = /^(?:\/\/)?\s*$/;
	const replaceRE = /./g;
	function generateSourceMap(filename, source, generated, sourceRoot, lineOffset) {
	    const map = new sourceMap.SourceMapGenerator({
	        file: filename.replace(/\\/g, '/'),
	        sourceRoot: sourceRoot.replace(/\\/g, '/')
	    });
	    map.setSourceContent(filename, source);
	    generated.split(splitRE).forEach((line, index) => {
	        if (!emptyRE.test(line)) {
	            const originalLine = index + 1 + lineOffset;
	            const generatedLine = index + 1;
	            for (let i = 0; i < line.length; i++) {
	                if (!/\s/.test(line[i])) {
	                    map.addMapping({
	                        source: filename,
	                        original: {
	                            line: originalLine,
	                            column: i
	                        },
	                        generated: {
	                            line: generatedLine,
	                            column: i
	                        }
	                    });
	                }
	            }
	        }
	    });
	    return JSON.parse(map.toString());
	}
	function padContent(content, block, pad) {
	    content = content.slice(0, block.loc.start.offset);
	    if (pad === 'space') {
	        return content.replace(replaceRE, ' ');
	    }
	    else {
	        const offset = content.split(splitRE).length;
	        const padChar = block.type === 'script' && !block.lang ? '//\n' : '\n';
	        return Array(offset).join(padChar);
	    }
	}
	function hasSrc(node) {
	    return node.props.some(p => {
	        if (p.type !== 6 /* ATTRIBUTE */) {
	            return false;
	        }
	        return p.name === 'src';
	    });
	}

	function isRelativeUrl(url) {
	    const firstChar = url.charAt(0);
	    return firstChar === '.' || firstChar === '~' || firstChar === '@';
	}
	const externalRE = /^https?:\/\//;
	function isExternalUrl(url) {
	    return externalRE.test(url);
	}
	const dataUrlRE = /^\s*data:/i;
	function isDataUrl(url) {
	    return dataUrlRE.test(url);
	}
	/**
	 * Parses string url into URL object.
	 */
	function parseUrl(url) {
	    const firstChar = url.charAt(0);
	    if (firstChar === '~') {
	        const secondChar = url.charAt(1);
	        url = url.slice(secondChar === '/' ? 2 : 1);
	    }
	    return parseUriParts(url);
	}
	/**
	 * vuejs/component-compiler-utils#22 Support uri fragment in transformed require
	 * @param urlString an url as a string
	 */
	function parseUriParts(urlString) {
	    // A TypeError is thrown if urlString is not a string
	    // @see https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
	    return url.parse(shared.isString(urlString) ? urlString : '', false, true);
	}

	const defaultAssetUrlOptions = {
	    base: null,
	    includeAbsolute: false,
	    tags: {
	        video: ['src', 'poster'],
	        source: ['src'],
	        img: ['src'],
	        image: ['xlink:href', 'href'],
	        use: ['xlink:href', 'href']
	    }
	};
	const normalizeOptions = (options) => {
	    if (Object.keys(options).some(key => shared.isArray(options[key]))) {
	        // legacy option format which directly passes in tags config
	        return {
	            ...defaultAssetUrlOptions,
	            tags: options
	        };
	    }
	    return {
	        ...defaultAssetUrlOptions,
	        ...options
	    };
	};
	const createAssetUrlTransformWithOptions = (options) => {
	    return (node, context) => transformAssetUrl(node, context, options);
	};
	/**
	 * A `@vue/compiler-core` plugin that transforms relative asset urls into
	 * either imports or absolute urls.
	 *
	 * ``` js
	 * // Before
	 * createVNode('img', { src: './logo.png' })
	 *
	 * // After
	 * import _imports_0 from './logo.png'
	 * createVNode('img', { src: _imports_0 })
	 * ```
	 */
	const transformAssetUrl = (node, context, options = defaultAssetUrlOptions) => {
	    if (node.type === 1 /* ELEMENT */) {
	        if (!node.props.length) {
	            return;
	        }
	        const tags = options.tags || defaultAssetUrlOptions.tags;
	        const attrs = tags[node.tag];
	        const wildCardAttrs = tags['*'];
	        if (!attrs && !wildCardAttrs) {
	            return;
	        }
	        const assetAttrs = (attrs || []).concat(wildCardAttrs || []);
	        node.props.forEach((attr, index) => {
	            if (attr.type !== 6 /* ATTRIBUTE */ ||
	                !assetAttrs.includes(attr.name) ||
	                !attr.value ||
	                isExternalUrl(attr.value.content) ||
	                isDataUrl(attr.value.content) ||
	                attr.value.content[0] === '#' ||
	                (!options.includeAbsolute && !isRelativeUrl(attr.value.content))) {
	                return;
	            }
	            const url = parseUrl(attr.value.content);
	            if (options.base && attr.value.content[0] === '.') {
	                // explicit base - directly rewrite relative urls into absolute url
	                // to avoid generating extra imports
	                // Allow for full hostnames provided in options.base
	                const base = parseUrl(options.base);
	                const protocol = base.protocol || '';
	                const host = base.host ? protocol + '//' + base.host : '';
	                const basePath = base.path || '/';
	                // when packaged in the browser, path will be using the posix-
	                // only version provided by rollup-plugin-node-builtins.
	                attr.value.content =
	                    host +
	                        (path__default.posix || path__default).join(basePath, url.path + (url.hash || ''));
	                return;
	            }
	            // otherwise, transform the url into an import.
	            // this assumes a bundler will resolve the import into the correct
	            // absolute url (e.g. webpack file-loader)
	            const exp = getImportsExpressionExp(url.path, url.hash, attr.loc, context);
	            node.props[index] = {
	                type: 7 /* DIRECTIVE */,
	                name: 'bind',
	                arg: compilerCore.createSimpleExpression(attr.name, true, attr.loc),
	                exp,
	                modifiers: [],
	                loc: attr.loc
	            };
	        });
	    }
	};
	function getImportsExpressionExp(path, hash, loc, context) {
	    if (path) {
	        const existing = context.imports.find(i => i.path === path);
	        if (existing) {
	            return existing.exp;
	        }
	        const name = `_imports_${context.imports.length}`;
	        const exp = compilerCore.createSimpleExpression(name, false, loc, 2 /* CAN_HOIST */);
	        context.imports.push({ exp, path });
	        if (hash && path) {
	            return context.hoist(compilerCore.createSimpleExpression(`${name} + '${hash}'`, false, loc, 2 /* CAN_HOIST */));
	        }
	        else {
	            return exp;
	        }
	    }
	    else {
	        return compilerCore.createSimpleExpression(`''`, false, loc, 2 /* CAN_HOIST */);
	    }
	}

	const srcsetTags = ['img', 'source'];
	// http://w3c.github.io/html/semantics-embedded-content.html#ref-for-image-candidate-string-5
	const escapedSpaceCharacters = /( |\\t|\\n|\\f|\\r)+/g;
	const createSrcsetTransformWithOptions = (options) => {
	    return (node, context) => transformSrcset(node, context, options);
	};
	const transformSrcset = (node, context, options = defaultAssetUrlOptions) => {
	    if (node.type === 1 /* ELEMENT */) {
	        if (srcsetTags.includes(node.tag) && node.props.length) {
	            node.props.forEach((attr, index) => {
	                if (attr.name === 'srcset' && attr.type === 6 /* ATTRIBUTE */) {
	                    if (!attr.value)
	                        return;
	                    const value = attr.value.content;
	                    if (!value)
	                        return;
	                    const imageCandidates = value.split(',').map(s => {
	                        // The attribute value arrives here with all whitespace, except
	                        // normal spaces, represented by escape sequences
	                        const [url, descriptor] = s
	                            .replace(escapedSpaceCharacters, ' ')
	                            .trim()
	                            .split(' ', 2);
	                        return { url, descriptor };
	                    });
	                    // data urls contains comma after the ecoding so we need to re-merge
	                    // them
	                    for (let i = 0; i < imageCandidates.length; i++) {
	                        const { url } = imageCandidates[i];
	                        if (isDataUrl(url)) {
	                            imageCandidates[i + 1].url =
	                                url + ',' + imageCandidates[i + 1].url;
	                            imageCandidates.splice(i, 1);
	                        }
	                    }
	                    const hasQualifiedUrl = imageCandidates.some(({ url }) => {
	                        return (!isExternalUrl(url) &&
	                            !isDataUrl(url) &&
	                            (options.includeAbsolute || isRelativeUrl(url)));
	                    });
	                    // When srcset does not contain any qualified URLs, skip transforming
	                    if (!hasQualifiedUrl) {
	                        return;
	                    }
	                    if (options.base) {
	                        const base = options.base;
	                        const set = [];
	                        imageCandidates.forEach(({ url, descriptor }) => {
	                            descriptor = descriptor ? ` ${descriptor}` : ``;
	                            if (isRelativeUrl(url)) {
	                                set.push((path__default.posix || path__default).join(base, url) + descriptor);
	                            }
	                            else {
	                                set.push(url + descriptor);
	                            }
	                        });
	                        attr.value.content = set.join(', ');
	                        return;
	                    }
	                    const compoundExpression = compilerCore.createCompoundExpression([], attr.loc);
	                    imageCandidates.forEach(({ url, descriptor }, index) => {
	                        if (!isExternalUrl(url) &&
	                            !isDataUrl(url) &&
	                            (options.includeAbsolute || isRelativeUrl(url))) {
	                            const { path } = parseUrl(url);
	                            let exp;
	                            if (path) {
	                                const existingImportsIndex = context.imports.findIndex(i => i.path === path);
	                                if (existingImportsIndex > -1) {
	                                    exp = compilerCore.createSimpleExpression(`_imports_${existingImportsIndex}`, false, attr.loc, 2 /* CAN_HOIST */);
	                                }
	                                else {
	                                    exp = compilerCore.createSimpleExpression(`_imports_${context.imports.length}`, false, attr.loc, 2 /* CAN_HOIST */);
	                                    context.imports.push({ exp, path });
	                                }
	                                compoundExpression.children.push(exp);
	                            }
	                        }
	                        else {
	                            const exp = compilerCore.createSimpleExpression(`"${url}"`, false, attr.loc, 2 /* CAN_HOIST */);
	                            compoundExpression.children.push(exp);
	                        }
	                        const isNotLast = imageCandidates.length - 1 > index;
	                        if (descriptor && isNotLast) {
	                            compoundExpression.children.push(` + ' ${descriptor}, ' + `);
	                        }
	                        else if (descriptor) {
	                            compoundExpression.children.push(` + ' ${descriptor}'`);
	                        }
	                        else if (isNotLast) {
	                            compoundExpression.children.push(` + ', ' + `);
	                        }
	                    });
	                    const hoisted = context.hoist(compoundExpression);
	                    hoisted.constType = 2 /* CAN_HOIST */;
	                    node.props[index] = {
	                        type: 7 /* DIRECTIVE */,
	                        name: 'bind',
	                        arg: compilerCore.createSimpleExpression('srcset', true, attr.loc),
	                        exp: hoisted,
	                        modifiers: [],
	                        loc: attr.loc
	                    };
	                }
	            });
	        }
	    }
	};

	function preprocess({ source, filename, preprocessOptions }, preprocessor) {
	    // Consolidate exposes a callback based API, but the callback is in fact
	    // called synchronously for most templating engines. In our case, we have to
	    // expose a synchronous API so that it is usable in Jest transforms (which
	    // have to be sync because they are applied via Node.js require hooks)
	    let res = '';
	    let err = null;
	    preprocessor.render(source, { filename, ...preprocessOptions }, (_err, _res) => {
	        if (_err)
	            err = _err;
	        res = _res;
	    });
	    if (err)
	        throw err;
	    return res;
	}
	function compileTemplate(options) {
	    const { preprocessLang, preprocessCustomRequire } = options;
	    const preprocessor = preprocessLang
	        ? preprocessCustomRequire
	            ? preprocessCustomRequire(preprocessLang)
	            : {}
	        : false;
	    if (preprocessor) {
	        try {
	            return doCompileTemplate({
	                ...options,
	                source: preprocess(options, preprocessor)
	            });
	        }
	        catch (e) {
	            return {
	                code: `export default function render() {}`,
	                source: options.source,
	                tips: [],
	                errors: [e]
	            };
	        }
	    }
	    else if (preprocessLang) {
	        return {
	            code: `export default function render() {}`,
	            source: options.source,
	            tips: [
	                `Component ${options.filename} uses lang ${preprocessLang} for template. Please install the language preprocessor.`
	            ],
	            errors: [
	                `Component ${options.filename} uses lang ${preprocessLang} for template, however it is not installed.`
	            ]
	        };
	    }
	    else {
	        return doCompileTemplate(options);
	    }
	}
	function doCompileTemplate({ filename, id, scoped, slotted, inMap, source, ssr = false, ssrCssVars, isProd = false, compiler = ssr ? CompilerSSR__namespace : CompilerDOM__namespace, compilerOptions = {}, transformAssetUrls }) {
	    const errors = [];
	    let nodeTransforms = [];
	    if (shared.isObject(transformAssetUrls)) {
	        const assetOptions = normalizeOptions(transformAssetUrls);
	        nodeTransforms = [
	            createAssetUrlTransformWithOptions(assetOptions),
	            createSrcsetTransformWithOptions(assetOptions)
	        ];
	    }
	    else if (transformAssetUrls !== false) {
	        nodeTransforms = [transformAssetUrl, transformSrcset];
	    }
	    if (ssr && !ssrCssVars) {
	        warnOnce(`compileTemplate is called with \`ssr: true\` but no ` +
	            `corresponding \`cssVars\` option.\`.`);
	    }
	    if (!id) {
	        warnOnce(`compileTemplate now requires the \`id\` option.\`.`);
	        id = '';
	    }
	    const shortId = id.replace(/^data-v-/, '');
	    const longId = `data-v-${shortId}`;
	    let { code, ast, preamble, map } = compiler.compile(source, {
	        mode: 'module',
	        prefixIdentifiers: true,
	        hoistStatic: true,
	        cacheHandlers: true,
	        ssrCssVars: ssr && ssrCssVars && ssrCssVars.length
	            ? genCssVarsFromList(ssrCssVars, shortId, isProd)
	            : '',
	        scopeId: scoped ? longId : undefined,
	        slotted,
	        ...compilerOptions,
	        nodeTransforms: nodeTransforms.concat(compilerOptions.nodeTransforms || []),
	        filename,
	        sourceMap: true,
	        onError: e => errors.push(e)
	    });
	    // inMap should be the map produced by ./parse.ts which is a simple line-only
	    // mapping. If it is present, we need to adjust the final map and errors to
	    // reflect the original line numbers.
	    if (inMap) {
	        if (map) {
	            map = mapLines(inMap, map);
	        }
	        if (errors.length) {
	            patchErrors(errors, source, inMap);
	        }
	    }
	    return { code, ast, preamble, source, errors, tips: [], map };
	}
	function mapLines(oldMap, newMap) {
	    if (!oldMap)
	        return newMap;
	    if (!newMap)
	        return oldMap;
	    const oldMapConsumer = new sourceMap.SourceMapConsumer(oldMap);
	    const newMapConsumer = new sourceMap.SourceMapConsumer(newMap);
	    const mergedMapGenerator = new sourceMap.SourceMapGenerator();
	    newMapConsumer.eachMapping(m => {
	        if (m.originalLine == null) {
	            return;
	        }
	        const origPosInOldMap = oldMapConsumer.originalPositionFor({
	            line: m.originalLine,
	            column: m.originalColumn
	        });
	        if (origPosInOldMap.source == null) {
	            return;
	        }
	        mergedMapGenerator.addMapping({
	            generated: {
	                line: m.generatedLine,
	                column: m.generatedColumn
	            },
	            original: {
	                line: origPosInOldMap.line,
	                // use current column, since the oldMap produced by @vue/compiler-sfc
	                // does not
	                column: m.originalColumn
	            },
	            source: origPosInOldMap.source,
	            name: origPosInOldMap.name
	        });
	    });
	    // source-map's type definition is incomplete
	    const generator = mergedMapGenerator;
	    oldMapConsumer.sources.forEach((sourceFile) => {
	        generator._sources.add(sourceFile);
	        const sourceContent = oldMapConsumer.sourceContentFor(sourceFile);
	        if (sourceContent != null) {
	            mergedMapGenerator.setSourceContent(sourceFile, sourceContent);
	        }
	    });
	    generator._sourceRoot = oldMap.sourceRoot;
	    generator._file = oldMap.file;
	    return generator.toJSON();
	}
	function patchErrors(errors, source, inMap) {
	    const originalSource = inMap.sourcesContent[0];
	    const offset = originalSource.indexOf(source);
	    const lineOffset = originalSource.slice(0, offset).split(/\r?\n/).length - 1;
	    errors.forEach(err => {
	        if (err.loc) {
	            err.loc.start.line += lineOffset;
	            err.loc.start.offset += offset;
	            if (err.loc.end !== err.loc.start) {
	                err.loc.end.line += lineOffset;
	                err.loc.end.offset += offset;
	            }
	        }
	    });
	}

	const trimPlugin = () => {
	    return {
	        postcssPlugin: 'vue-sfc-trim',
	        Once(root) {
	            root.walk(({ type, raws }) => {
	                if (type === 'rule' || type === 'atrule') {
	                    if (raws.before)
	                        raws.before = '\n';
	                    if ('after' in raws && raws.after)
	                        raws.after = '\n';
	                }
	            });
	        }
	    };
	};
	trimPlugin.postcss = true;

	const animationNameRE = /^(-\w+-)?animation-name$/;
	const animationRE = /^(-\w+-)?animation$/;
	const scopedPlugin = (id = '') => {
	    const keyframes = Object.create(null);
	    const shortId = id.replace(/^data-v-/, '');
	    return {
	        postcssPlugin: 'vue-sfc-scoped',
	        Rule(rule) {
	            processRule(id, rule);
	        },
	        AtRule(node) {
	            if (/-?keyframes$/.test(node.name) &&
	                !node.params.endsWith(`-${shortId}`)) {
	                // register keyframes
	                keyframes[node.params] = node.params = node.params + '-' + shortId;
	            }
	        },
	        OnceExit(root) {
	            if (Object.keys(keyframes).length) {
	                // If keyframes are found in this <style>, find and rewrite animation names
	                // in declarations.
	                // Caveat: this only works for keyframes and animation rules in the same
	                // <style> element.
	                // individual animation-name declaration
	                root.walkDecls(decl => {
	                    if (animationNameRE.test(decl.prop)) {
	                        decl.value = decl.value
	                            .split(',')
	                            .map(v => keyframes[v.trim()] || v.trim())
	                            .join(',');
	                    }
	                    // shorthand
	                    if (animationRE.test(decl.prop)) {
	                        decl.value = decl.value
	                            .split(',')
	                            .map(v => {
	                            const vals = v.trim().split(/\s+/);
	                            const i = vals.findIndex(val => keyframes[val]);
	                            if (i !== -1) {
	                                vals.splice(i, 1, keyframes[vals[i]]);
	                                return vals.join(' ');
	                            }
	                            else {
	                                return v;
	                            }
	                        })
	                            .join(',');
	                    }
	                });
	            }
	        }
	    };
	};
	const processedRules = new WeakSet();
	function processRule(id, rule) {
	    if (processedRules.has(rule) ||
	        (rule.parent &&
	            rule.parent.type === 'atrule' &&
	            /-?keyframes$/.test(rule.parent.name))) {
	        return;
	    }
	    processedRules.add(rule);
	    rule.selector = selectorParser__default(selectorRoot => {
	        selectorRoot.each(selector => {
	            rewriteSelector(id, selector, selectorRoot);
	        });
	    }).processSync(rule.selector);
	}
	function rewriteSelector(id, selector, selectorRoot, slotted = false) {
	    let node = null;
	    let shouldInject = true;
	    // find the last child node to insert attribute selector
	    selector.each(n => {
	        // DEPRECATED ">>>" and "/deep/" combinator
	        if (n.type === 'combinator' &&
	            (n.value === '>>>' || n.value === '/deep/')) {
	            n.value = ' ';
	            n.spaces.before = n.spaces.after = '';
	            warn(`the >>> and /deep/ combinators have been deprecated. ` +
	                `Use :deep() instead.`);
	            return false;
	        }
	        if (n.type === 'pseudo') {
	            const { value } = n;
	            // deep: inject [id] attribute at the node before the ::v-deep
	            // combinator.
	            if (value === ':deep' || value === '::v-deep') {
	                if (n.nodes.length) {
	                    // .foo ::v-deep(.bar) -> .foo[xxxxxxx] .bar
	                    // replace the current node with ::v-deep's inner selector
	                    let last = n;
	                    n.nodes[0].each(ss => {
	                        selector.insertAfter(last, ss);
	                        last = ss;
	                    });
	                    // insert a space combinator before if it doesn't already have one
	                    const prev = selector.at(selector.index(n) - 1);
	                    if (!prev || !isSpaceCombinator(prev)) {
	                        selector.insertAfter(n, selectorParser__default.combinator({
	                            value: ' '
	                        }));
	                    }
	                    selector.removeChild(n);
	                }
	                else {
	                    // DEPRECATED usage
	                    // .foo ::v-deep .bar -> .foo[xxxxxxx] .bar
	                    warn(`::v-deep usage as a combinator has ` +
	                        `been deprecated. Use :deep(<inner-selector>) instead.`);
	                    const prev = selector.at(selector.index(n) - 1);
	                    if (prev && isSpaceCombinator(prev)) {
	                        selector.removeChild(prev);
	                    }
	                    selector.removeChild(n);
	                }
	                return false;
	            }
	            // slot: use selector inside `::v-slotted` and inject [id + '-s']
	            // instead.
	            // ::v-slotted(.foo) -> .foo[xxxxxxx-s]
	            if (value === ':slotted' || value === '::v-slotted') {
	                rewriteSelector(id, n.nodes[0], selectorRoot, true /* slotted */);
	                let last = n;
	                n.nodes[0].each(ss => {
	                    selector.insertAfter(last, ss);
	                    last = ss;
	                });
	                // selector.insertAfter(n, n.nodes[0])
	                selector.removeChild(n);
	                // since slotted attribute already scopes the selector there's no
	                // need for the non-slot attribute.
	                shouldInject = false;
	                return false;
	            }
	            // global: replace with inner selector and do not inject [id].
	            // ::v-global(.foo) -> .foo
	            if (value === ':global' || value === '::v-global') {
	                selectorRoot.insertAfter(selector, n.nodes[0]);
	                selectorRoot.removeChild(selector);
	                return false;
	            }
	        }
	        if (n.type !== 'pseudo' && n.type !== 'combinator') {
	            node = n;
	        }
	    });
	    if (node) {
	        node.spaces.after = '';
	    }
	    else {
	        // For deep selectors & standalone pseudo selectors,
	        // the attribute selectors are prepended rather than appended.
	        // So all leading spaces must be eliminated to avoid problems.
	        selector.first.spaces.before = '';
	    }
	    if (shouldInject) {
	        const idToAdd = slotted ? id + '-s' : id;
	        selector.insertAfter(
	        // If node is null it means we need to inject [id] at the start
	        // insertAfter can handle `null` here
	        node, selectorParser__default.attribute({
	            attribute: idToAdd,
	            value: idToAdd,
	            raws: {},
	            quoteMark: `"`
	        }));
	    }
	}
	function isSpaceCombinator(node) {
	    return node.type === 'combinator' && /^\s+$/.test(node.value);
	}
	scopedPlugin.postcss = true;

	// .scss/.sass processor
	const scss = (source, map, options, load) => {
	    const nodeSass = load('sass');
	    const finalOptions = {
	        ...options,
	        data: getSource(source, options.filename, options.additionalData),
	        file: options.filename,
	        outFile: options.filename,
	        sourceMap: !!map
	    };
	    try {
	        const result = nodeSass.renderSync(finalOptions);
	        const dependencies = result.stats.includedFiles;
	        if (map) {
	            return {
	                code: result.css.toString(),
	                map: merge__default(map, JSON.parse(result.map.toString())),
	                errors: [],
	                dependencies
	            };
	        }
	        return { code: result.css.toString(), errors: [], dependencies };
	    }
	    catch (e) {
	        return { code: '', errors: [e], dependencies: [] };
	    }
	};
	const sass = (source, map, options, load) => scss(source, map, {
	    ...options,
	    indentedSyntax: true
	}, load);
	// .less
	const less = (source, map, options, load) => {
	    const nodeLess = load('less');
	    let result;
	    let error = null;
	    nodeLess.render(getSource(source, options.filename, options.additionalData), { ...options, syncImport: true }, (err, output) => {
	        error = err;
	        result = output;
	    });
	    if (error)
	        return { code: '', errors: [error], dependencies: [] };
	    const dependencies = result.imports;
	    if (map) {
	        return {
	            code: result.css.toString(),
	            map: merge__default(map, result.map),
	            errors: [],
	            dependencies: dependencies
	        };
	    }
	    return {
	        code: result.css.toString(),
	        errors: [],
	        dependencies: dependencies
	    };
	};
	// .styl
	const styl = (source, map, options, load) => {
	    const nodeStylus = load('stylus');
	    try {
	        const ref = nodeStylus(source);
	        Object.keys(options).forEach(key => ref.set(key, options[key]));
	        if (map)
	            ref.set('sourcemap', { inline: false, comment: false });
	        const result = ref.render();
	        const dependencies = ref.deps();
	        if (map) {
	            return {
	                code: result,
	                map: merge__default(map, ref.sourcemap),
	                errors: [],
	                dependencies
	            };
	        }
	        return { code: result, errors: [], dependencies };
	    }
	    catch (e) {
	        return { code: '', errors: [e], dependencies: [] };
	    }
	};
	function getSource(source, filename, additionalData) {
	    if (!additionalData)
	        return source;
	    if (shared.isFunction(additionalData)) {
	        return additionalData(source, filename);
	    }
	    return additionalData + source;
	}
	const processors = {
	    less,
	    sass,
	    scss,
	    styl,
	    stylus: styl
	};

	function compileStyle(options) {
	    return doCompileStyle({
	        ...options,
	        isAsync: false
	    });
	}
	function compileStyleAsync(options) {
	    return doCompileStyle({ ...options, isAsync: true });
	}
	function doCompileStyle(options) {
	    const { filename, id, scoped = false, trim = true, isProd = false, modules = false, modulesOptions = {}, preprocessLang, postcssOptions, postcssPlugins } = options;
	    const preprocessor = preprocessLang && processors[preprocessLang];
	    const preProcessedSource = preprocessor && preprocess$1(options, preprocessor);
	    const map = preProcessedSource
	        ? preProcessedSource.map
	        : options.inMap || options.map;
	    const source = preProcessedSource ? preProcessedSource.code : options.source;
	    const shortId = id.replace(/^data-v-/, '');
	    const longId = `data-v-${shortId}`;
	    const plugins = (postcssPlugins || []).slice();
	    plugins.unshift(cssVarsPlugin({ id: shortId, isProd }));
	    if (trim) {
	        plugins.push(trimPlugin());
	    }
	    if (scoped) {
	        plugins.push(scopedPlugin(longId));
	    }
	    let cssModules;
	    if (modules) {
	        if (!options.isAsync) {
	            throw new Error('[@vue/compiler-sfc] `modules` option can only be used with compileStyleAsync().');
	        }
	        plugins.push(require('postcss-modules')({
	            ...modulesOptions,
	            getJSON: (_cssFileName, json) => {
	                cssModules = json;
	            }
	        }));
	    }
	    const postCSSOptions = {
	        ...postcssOptions,
	        to: filename,
	        from: filename
	    };
	    if (map) {
	        postCSSOptions.map = {
	            inline: false,
	            annotation: false,
	            prev: map
	        };
	    }
	    let result;
	    let code;
	    let outMap;
	    // stylus output include plain css. so need remove the repeat item
	    const dependencies = new Set(preProcessedSource ? preProcessedSource.dependencies : []);
	    // sass has filename self when provided filename option
	    dependencies.delete(filename);
	    const errors = [];
	    if (preProcessedSource && preProcessedSource.errors.length) {
	        errors.push(...preProcessedSource.errors);
	    }
	    const recordPlainCssDependencies = (messages) => {
	        messages.forEach(msg => {
	            if (msg.type === 'dependency') {
	                // postcss output path is absolute position path
	                dependencies.add(msg.file);
	            }
	        });
	        return dependencies;
	    };
	    try {
	        result = postcss__default(plugins).process(source, postCSSOptions);
	        // In async mode, return a promise.
	        if (options.isAsync) {
	            return result
	                .then(result => ({
	                code: result.css || '',
	                map: result.map && result.map.toJSON(),
	                errors,
	                modules: cssModules,
	                rawResult: result,
	                dependencies: recordPlainCssDependencies(result.messages)
	            }))
	                .catch(error => ({
	                code: '',
	                map: undefined,
	                errors: [...errors, error],
	                rawResult: undefined,
	                dependencies
	            }));
	        }
	        recordPlainCssDependencies(result.messages);
	        // force synchronous transform (we know we only have sync plugins)
	        code = result.css;
	        outMap = result.map;
	    }
	    catch (e) {
	        errors.push(e);
	    }
	    return {
	        code: code || ``,
	        map: outMap && outMap.toJSON(),
	        errors,
	        rawResult: result,
	        dependencies
	    };
	}
	function preprocess$1(options, preprocessor) {
	    return preprocessor(options.source, options.inMap || options.map, {
	        filename: options.filename,
	        ...options.preprocessOptions
	    }, options.preprocessCustomRequire);
	}

	const defaultExportRE = /((?:^|\n|;)\s*)export(\s*)default/;
	const namedDefaultExportRE = /((?:^|\n|;)\s*)export(.+)as(\s*)default/;
	const exportDefaultClassRE = /((?:^|\n|;)\s*)export\s+default\s+class\s+([\w$]+)/;
	/**
	 * Utility for rewriting `export default` in a script block into a variable
	 * declaration so that we can inject things into it
	 */
	function rewriteDefault(input, as, parserPlugins) {
	    if (!hasDefaultExport(input)) {
	        return input + `\nconst ${as} = {}`;
	    }
	    let replaced;
	    const classMatch = input.match(exportDefaultClassRE);
	    if (classMatch) {
	        replaced =
	            input.replace(exportDefaultClassRE, '$1class $2') +
	                `\nconst ${as} = ${classMatch[2]}`;
	    }
	    else {
	        replaced = input.replace(defaultExportRE, `$1const ${as} =`);
	    }
	    if (!hasDefaultExport(replaced)) {
	        return replaced;
	    }
	    // if the script somehow still contains `default export`, it probably has
	    // multi-line comments or template strings. fallback to a full parse.
	    const s = new MagicString__default(input);
	    const ast = parser.parse(input, {
	        sourceType: 'module',
	        plugins: parserPlugins
	    }).program.body;
	    ast.forEach(node => {
	        if (node.type === 'ExportDefaultDeclaration') {
	            s.overwrite(node.start, node.declaration.start, `const ${as} = `);
	        }
	        if (node.type === 'ExportNamedDeclaration') {
	            node.specifiers.forEach(specifier => {
	                if (specifier.type === 'ExportSpecifier' &&
	                    specifier.exported.type === 'Identifier' &&
	                    specifier.exported.name === 'default') {
	                    const end = specifier.end;
	                    s.overwrite(specifier.start, input.charAt(end) === ',' ? end + 1 : end, ``);
	                    s.append(`\nconst ${as} = ${specifier.local.name}`);
	                }
	            });
	        }
	    });
	    return s.toString();
	}
	function hasDefaultExport(input) {
	    return defaultExportRE.test(input) || namedDefaultExportRE.test(input);
	}

	const DEFINE_PROPS = 'defineProps';
	const DEFINE_EMIT = 'defineEmit';
	/**
	 * Compile `<script setup>`
	 * It requires the whole SFC descriptor because we need to handle and merge
	 * normal `<script>` + `<script setup>` if both are present.
	 */
	function compileScript(sfc, options) {
	    const { script, scriptSetup, source, filename } = sfc;
	    if (scriptSetup) {
	        warnExperimental(`<script setup>`, 227);
	    }
	    // for backwards compat
	    if (!options) {
	        options = { id: '' };
	    }
	    if (!options.id) {
	        warnOnce(`compileScript now requires passing the \`id\` option.\n` +
	            `Upgrade your vite or vue-loader version for compatibility with ` +
	            `the latest experimental proposals.`);
	    }
	    const scopeId = options.id ? options.id.replace(/^data-v-/, '') : '';
	    const cssVars = sfc.cssVars;
	    const hasInheritAttrsFlag = sfc.template && sfc.template.attrs['inherit-attrs'] === 'false';
	    const scriptLang = script && script.lang;
	    const scriptSetupLang = scriptSetup && scriptSetup.lang;
	    const isTS = scriptLang === 'ts' || scriptSetupLang === 'ts';
	    const plugins = [...shared.babelParserDefaultPlugins, 'jsx'];
	    if (options.babelParserPlugins)
	        plugins.push(...options.babelParserPlugins);
	    if (isTS)
	        plugins.push('typescript', 'decorators-legacy');
	    if (!scriptSetup) {
	        if (!script) {
	            throw new Error(`[@vue/compiler-sfc] SFC contains no <script> tags.`);
	        }
	        if (scriptLang && scriptLang !== 'ts') {
	            // do not process non js/ts script blocks
	            return script;
	        }
	        try {
	            const scriptAst = parser.parse(script.content, {
	                plugins,
	                sourceType: 'module'
	            }).program.body;
	            const bindings = analyzeScriptBindings(scriptAst);
	            const needRewrite = cssVars.length || hasInheritAttrsFlag;
	            let content = script.content;
	            if (needRewrite) {
	                content = rewriteDefault(content, `__default__`, plugins);
	                if (cssVars.length) {
	                    content += genNormalScriptCssVarsCode(cssVars, bindings, scopeId, !!options.isProd);
	                }
	                if (hasInheritAttrsFlag) {
	                    content += `__default__.inheritAttrs = false`;
	                }
	                content += `\nexport default __default__`;
	            }
	            return {
	                ...script,
	                content,
	                bindings,
	                scriptAst
	            };
	        }
	        catch (e) {
	            // silently fallback if parse fails since user may be using custom
	            // babel syntax
	            return script;
	        }
	    }
	    if (script && scriptLang !== scriptSetupLang) {
	        throw new Error(`[@vue/compiler-sfc] <script> and <script setup> must have the same language type.`);
	    }
	    if (scriptSetupLang && scriptSetupLang !== 'ts') {
	        // do not process non js/ts script blocks
	        return scriptSetup;
	    }
	    const defaultTempVar = `__default__`;
	    const bindingMetadata = {};
	    const helperImports = new Set();
	    const userImports = Object.create(null);
	    const userImportAlias = Object.create(null);
	    const setupBindings = Object.create(null);
	    const refBindings = Object.create(null);
	    const refIdentifiers = new Set();
	    const enableRefSugar = options.refSugar !== false;
	    let defaultExport;
	    let hasDefinePropsCall = false;
	    let hasDefineEmitCall = false;
	    let propsRuntimeDecl;
	    let propsTypeDecl;
	    let propsIdentifier;
	    let emitRuntimeDecl;
	    let emitTypeDecl;
	    let emitIdentifier;
	    let hasAwait = false;
	    let hasInlinedSsrRenderFn = false;
	    // props/emits declared via types
	    const typeDeclaredProps = {};
	    const typeDeclaredEmits = new Set();
	    // record declared types for runtime props type generation
	    const declaredTypes = {};
	    // magic-string state
	    const s = new MagicString__default(source);
	    const startOffset = scriptSetup.loc.start.offset;
	    const endOffset = scriptSetup.loc.end.offset;
	    const scriptStartOffset = script && script.loc.start.offset;
	    const scriptEndOffset = script && script.loc.end.offset;
	    function helper(key) {
	        helperImports.add(key);
	        return `_${key}`;
	    }
	    function parse(input, options, offset) {
	        try {
	            return parser.parse(input, options).program.body;
	        }
	        catch (e) {
	            e.message = `[@vue/compiler-sfc] ${e.message}\n\n${sfc.filename}\n${shared.generateCodeFrame(source, e.pos + offset, e.pos + offset + 1)}`;
	            throw e;
	        }
	    }
	    function error(msg, node, end = node.end + startOffset) {
	        throw new Error(`[@vue/compiler-sfc] ${msg}\n\n${sfc.filename}\n${shared.generateCodeFrame(source, node.start + startOffset, end)}`);
	    }
	    function registerUserImport(source, local, imported, isType) {
	        if (source === 'vue' && imported) {
	            userImportAlias[imported] = local;
	        }
	        userImports[local] = {
	            isType,
	            imported: imported || 'default',
	            source
	        };
	    }
	    function processDefineProps(node) {
	        if (isCallOf(node, DEFINE_PROPS)) {
	            if (hasDefinePropsCall) {
	                error(`duplicate ${DEFINE_PROPS}() call`, node);
	            }
	            hasDefinePropsCall = true;
	            propsRuntimeDecl = node.arguments[0];
	            // context call has type parameters - infer runtime types from it
	            if (node.typeParameters) {
	                if (propsRuntimeDecl) {
	                    error(`${DEFINE_PROPS}() cannot accept both type and non-type arguments ` +
	                        `at the same time. Use one or the other.`, node);
	                }
	                const typeArg = node.typeParameters.params[0];
	                if (typeArg.type === 'TSTypeLiteral') {
	                    propsTypeDecl = typeArg;
	                }
	                else {
	                    error(`type argument passed to ${DEFINE_PROPS}() must be a literal type.`, typeArg);
	                }
	            }
	            return true;
	        }
	        return false;
	    }
	    function processDefineEmit(node) {
	        if (isCallOf(node, DEFINE_EMIT)) {
	            if (hasDefineEmitCall) {
	                error(`duplicate ${DEFINE_EMIT}() call`, node);
	            }
	            hasDefineEmitCall = true;
	            emitRuntimeDecl = node.arguments[0];
	            if (node.typeParameters) {
	                if (emitRuntimeDecl) {
	                    error(`${DEFINE_EMIT}() cannot accept both type and non-type arguments ` +
	                        `at the same time. Use one or the other.`, node);
	                }
	                const typeArg = node.typeParameters.params[0];
	                if (typeArg.type === 'TSFunctionType' ||
	                    typeArg.type === 'TSTypeLiteral') {
	                    emitTypeDecl = typeArg;
	                }
	                else {
	                    error(`type argument passed to ${DEFINE_EMIT}() must be a function type ` +
	                        `or a literal type with call signatures.`, typeArg);
	                }
	            }
	            return true;
	        }
	        return false;
	    }
	    function checkInvalidScopeReference(node, method) {
	        if (!node)
	            return;
	        walkIdentifiers(node, id => {
	            if (setupBindings[id.name]) {
	                error(`\`${method}()\` in <script setup> cannot reference locally ` +
	                    `declared variables because it will be hoisted outside of the ` +
	                    `setup() function. If your component options requires initialization ` +
	                    `in the module scope, use a separate normal <script> to export ` +
	                    `the options instead.`, id);
	            }
	        });
	    }
	    function processRefExpression(exp, statement) {
	        if (exp.type === 'AssignmentExpression') {
	            const { left, right } = exp;
	            if (left.type === 'Identifier') {
	                registerRefBinding(left);
	                s.prependRight(right.start + startOffset, `${helper('ref')}(`);
	                s.appendLeft(right.end + startOffset, ')');
	            }
	            else if (left.type === 'ObjectPattern') {
	                // remove wrapping parens
	                for (let i = left.start; i > 0; i--) {
	                    const char = source[i + startOffset];
	                    if (char === '(') {
	                        s.remove(i + startOffset, i + startOffset + 1);
	                        break;
	                    }
	                }
	                for (let i = left.end; i > 0; i++) {
	                    const char = source[i + startOffset];
	                    if (char === ')') {
	                        s.remove(i + startOffset, i + startOffset + 1);
	                        break;
	                    }
	                }
	                processRefObjectPattern(left, statement);
	            }
	            else if (left.type === 'ArrayPattern') {
	                processRefArrayPattern(left, statement);
	            }
	        }
	        else if (exp.type === 'SequenceExpression') {
	            // possible multiple declarations
	            // ref: x = 1, y = 2
	            exp.expressions.forEach(e => processRefExpression(e, statement));
	        }
	        else if (exp.type === 'Identifier') {
	            registerRefBinding(exp);
	            s.appendLeft(exp.end + startOffset, ` = ${helper('ref')}()`);
	        }
	        else {
	            error(`ref: statements can only contain assignment expressions.`, exp);
	        }
	    }
	    function registerRefBinding(id) {
	        if (id.name[0] === '$') {
	            error(`ref variable identifiers cannot start with $.`, id);
	        }
	        refBindings[id.name] = setupBindings[id.name] = "setup-ref" /* SETUP_REF */;
	        refIdentifiers.add(id);
	    }
	    function processRefObjectPattern(pattern, statement) {
	        for (const p of pattern.properties) {
	            let nameId;
	            if (p.type === 'ObjectProperty') {
	                if (p.key.start === p.value.start) {
	                    // shorthand { foo } --> { foo: __foo }
	                    nameId = p.key;
	                    s.appendLeft(nameId.end + startOffset, `: __${nameId.name}`);
	                    if (p.value.type === 'AssignmentPattern') {
	                        // { foo = 1 }
	                        refIdentifiers.add(p.value.left);
	                    }
	                }
	                else {
	                    if (p.value.type === 'Identifier') {
	                        // { foo: bar } --> { foo: __bar }
	                        nameId = p.value;
	                        s.prependRight(nameId.start + startOffset, `__`);
	                    }
	                    else if (p.value.type === 'ObjectPattern') {
	                        processRefObjectPattern(p.value, statement);
	                    }
	                    else if (p.value.type === 'ArrayPattern') {
	                        processRefArrayPattern(p.value, statement);
	                    }
	                    else if (p.value.type === 'AssignmentPattern') {
	                        // { foo: bar = 1 } --> { foo: __bar = 1 }
	                        nameId = p.value.left;
	                        s.prependRight(nameId.start + startOffset, `__`);
	                    }
	                }
	            }
	            else {
	                // rest element { ...foo } --> { ...__foo }
	                nameId = p.argument;
	                s.prependRight(nameId.start + startOffset, `__`);
	            }
	            if (nameId) {
	                registerRefBinding(nameId);
	                // append binding declarations after the parent statement
	                s.appendLeft(statement.end + startOffset, `\nconst ${nameId.name} = ${helper('ref')}(__${nameId.name});`);
	            }
	        }
	    }
	    function processRefArrayPattern(pattern, statement) {
	        for (const e of pattern.elements) {
	            if (!e)
	                continue;
	            let nameId;
	            if (e.type === 'Identifier') {
	                // [a] --> [__a]
	                nameId = e;
	            }
	            else if (e.type === 'AssignmentPattern') {
	                // [a = 1] --> [__a = 1]
	                nameId = e.left;
	            }
	            else if (e.type === 'RestElement') {
	                // [...a] --> [...__a]
	                nameId = e.argument;
	            }
	            else if (e.type === 'ObjectPattern') {
	                processRefObjectPattern(e, statement);
	            }
	            else if (e.type === 'ArrayPattern') {
	                processRefArrayPattern(e, statement);
	            }
	            if (nameId) {
	                registerRefBinding(nameId);
	                // prefix original
	                s.prependRight(nameId.start + startOffset, `__`);
	                // append binding declarations after the parent statement
	                s.appendLeft(statement.end + startOffset, `\nconst ${nameId.name} = ${helper('ref')}(__${nameId.name});`);
	            }
	        }
	    }
	    // 1. process normal <script> first if it exists
	    let scriptAst;
	    if (script) {
	        // import dedupe between <script> and <script setup>
	        scriptAst = parse(script.content, {
	            plugins,
	            sourceType: 'module'
	        }, scriptStartOffset);
	        for (const node of scriptAst) {
	            if (node.type === 'ImportDeclaration') {
	                // record imports for dedupe
	                for (const specifier of node.specifiers) {
	                    const imported = specifier.type === 'ImportSpecifier' &&
	                        specifier.imported.type === 'Identifier' &&
	                        specifier.imported.name;
	                    registerUserImport(node.source.value, specifier.local.name, imported, node.importKind === 'type');
	                }
	            }
	            else if (node.type === 'ExportDefaultDeclaration') {
	                // export default
	                defaultExport = node;
	                const start = node.start + scriptStartOffset;
	                s.overwrite(start, start + `export default`.length, `const ${defaultTempVar} =`);
	            }
	            else if (node.type === 'ExportNamedDeclaration' && node.specifiers) {
	                const defaultSpecifier = node.specifiers.find(s => s.exported.type === 'Identifier' && s.exported.name === 'default');
	                if (defaultSpecifier) {
	                    defaultExport = node;
	                    // 1. remove specifier
	                    if (node.specifiers.length > 1) {
	                        s.remove(defaultSpecifier.start + scriptStartOffset, defaultSpecifier.end + scriptStartOffset);
	                    }
	                    else {
	                        s.remove(node.start + scriptStartOffset, node.end + scriptStartOffset);
	                    }
	                    if (node.source) {
	                        // export { x as default } from './x'
	                        // rewrite to `import { x as __default__ } from './x'` and
	                        // add to top
	                        s.prepend(`import { ${defaultSpecifier.local.name} as ${defaultTempVar} } from '${node.source.value}'\n`);
	                    }
	                    else {
	                        // export { x as default }
	                        // rewrite to `const __default__ = x` and move to end
	                        s.append(`\nconst ${defaultTempVar} = ${defaultSpecifier.local.name}\n`);
	                    }
	                }
	            }
	        }
	    }
	    // 2. parse <script setup> and  walk over top level statements
	    const scriptSetupAst = parse(scriptSetup.content, {
	        plugins: [
	            ...plugins,
	            // allow top level await but only inside <script setup>
	            'topLevelAwait'
	        ],
	        sourceType: 'module'
	    }, startOffset);
	    for (const node of scriptSetupAst) {
	        const start = node.start + startOffset;
	        let end = node.end + startOffset;
	        // import or type declarations: move to top
	        // locate comment
	        if (node.trailingComments && node.trailingComments.length > 0) {
	            const lastCommentNode = node.trailingComments[node.trailingComments.length - 1];
	            end = lastCommentNode.end + startOffset;
	        }
	        // locate the end of whitespace between this statement and the next
	        while (end <= source.length) {
	            if (!/\s/.test(source.charAt(end))) {
	                break;
	            }
	            end++;
	        }
	        // process `ref: x` bindings (convert to refs)
	        if (node.type === 'LabeledStatement' &&
	            node.label.name === 'ref' &&
	            node.body.type === 'ExpressionStatement') {
	            if (enableRefSugar) {
	                warnExperimental(`ref: sugar`, 228);
	                s.overwrite(node.label.start + startOffset, node.body.start + startOffset, 'const ');
	                processRefExpression(node.body.expression, node);
	            }
	            else {
	                // TODO if we end up shipping ref: sugar as an opt-in feature,
	                // need to proxy the option in vite, vue-loader and rollup-plugin-vue.
	                error(`ref: sugar needs to be explicitly enabled via vite or vue-loader options.`, node);
	            }
	        }
	        if (node.type === 'ImportDeclaration') {
	            // import declarations are moved to top
	            s.move(start, end, 0);
	            // dedupe imports
	            let removed = 0;
	            const removeSpecifier = (i) => {
	                const removeLeft = i > removed;
	                removed++;
	                const current = node.specifiers[i];
	                const next = node.specifiers[i + 1];
	                s.remove(removeLeft
	                    ? node.specifiers[i - 1].end + startOffset
	                    : current.start + startOffset, next && !removeLeft
	                    ? next.start + startOffset
	                    : current.end + startOffset);
	            };
	            for (let i = 0; i < node.specifiers.length; i++) {
	                const specifier = node.specifiers[i];
	                const local = specifier.local.name;
	                const imported = specifier.type === 'ImportSpecifier' &&
	                    specifier.imported.type === 'Identifier' &&
	                    specifier.imported.name;
	                const source = node.source.value;
	                const existing = userImports[local];
	                if (source === 'vue' &&
	                    (imported === DEFINE_PROPS || imported === DEFINE_EMIT)) {
	                    removeSpecifier(i);
	                }
	                else if (existing) {
	                    if (existing.source === source && existing.imported === imported) {
	                        // already imported in <script setup>, dedupe
	                        removeSpecifier(i);
	                    }
	                    else {
	                        error(`different imports aliased to same local name.`, specifier);
	                    }
	                }
	                else {
	                    registerUserImport(source, local, imported, node.importKind === 'type');
	                }
	            }
	            if (node.specifiers.length && removed === node.specifiers.length) {
	                s.remove(node.start + startOffset, node.end + startOffset);
	            }
	        }
	        // process `defineProps` and `defineEmit` calls
	        if (node.type === 'ExpressionStatement' &&
	            (processDefineProps(node.expression) ||
	                processDefineEmit(node.expression))) {
	            s.remove(node.start + startOffset, node.end + startOffset);
	        }
	        if (node.type === 'VariableDeclaration' && !node.declare) {
	            for (const decl of node.declarations) {
	                if (decl.init) {
	                    const isDefineProps = processDefineProps(decl.init);
	                    if (isDefineProps) {
	                        propsIdentifier = scriptSetup.content.slice(decl.id.start, decl.id.end);
	                    }
	                    const isDefineEmit = processDefineEmit(decl.init);
	                    if (isDefineEmit) {
	                        emitIdentifier = scriptSetup.content.slice(decl.id.start, decl.id.end);
	                    }
	                    if (isDefineProps || isDefineEmit)
	                        if (node.declarations.length === 1) {
	                            s.remove(node.start + startOffset, node.end + startOffset);
	                        }
	                        else {
	                            s.remove(decl.start + startOffset, decl.end + startOffset);
	                        }
	                }
	            }
	        }
	        // walk decalrations to record declared bindings
	        if ((node.type === 'VariableDeclaration' ||
	            node.type === 'FunctionDeclaration' ||
	            node.type === 'ClassDeclaration') &&
	            !node.declare) {
	            walkDeclaration(node, setupBindings, userImportAlias);
	        }
	        // Type declarations
	        if (node.type === 'VariableDeclaration' && node.declare) {
	            s.remove(start, end);
	        }
	        // move all type declarations to outer scope
	        if (node.type.startsWith('TS') ||
	            (node.type === 'ExportNamedDeclaration' && node.exportKind === 'type')) {
	            recordType(node, declaredTypes);
	            s.move(start, end, 0);
	        }
	        // walk statements & named exports / variable declarations for top level
	        // await
	        if ((node.type === 'VariableDeclaration' && !node.declare) ||
	            node.type.endsWith('Statement')) {
	            estreeWalker.walk(node, {
	                enter(node) {
	                    if (isFunction(node)) {
	                        this.skip();
	                    }
	                    if (node.type === 'AwaitExpression') {
	                        hasAwait = true;
	                    }
	                }
	            });
	        }
	        if ((node.type === 'ExportNamedDeclaration' && node.exportKind !== 'type') ||
	            node.type === 'ExportAllDeclaration' ||
	            node.type === 'ExportDefaultDeclaration') {
	            error(`<script setup> cannot contain ES module exports. ` +
	                `If you are using a previous version of <script setup>, please ` +
	                `consult the updated RFC at https://github.com/vuejs/rfcs/pull/227.`, node);
	        }
	    }
	    // 3. Do a full walk to rewrite identifiers referencing let exports with ref
	    // value access
	    if (enableRefSugar && Object.keys(refBindings).length) {
	        for (const node of scriptSetupAst) {
	            if (node.type !== 'ImportDeclaration') {
	                walkIdentifiers(node, (id, parent, parentStack) => {
	                    if (refBindings[id.name] && !refIdentifiers.has(id)) {
	                        if (isStaticProperty(parent) && parent.shorthand) {
	                            // let binding used in a property shorthand
	                            // { foo } -> { foo: foo.value }
	                            // skip for destructure patterns
	                            if (!parent.inPattern ||
	                                isInDestructureAssignment(parent, parentStack)) {
	                                s.appendLeft(id.end + startOffset, `: ${id.name}.value`);
	                            }
	                        }
	                        else {
	                            s.appendLeft(id.end + startOffset, '.value');
	                        }
	                    }
	                    else if (id.name[0] === '$' && refBindings[id.name.slice(1)]) {
	                        // $xxx raw ref access variables, remove the $ prefix
	                        s.remove(id.start + startOffset, id.start + startOffset + 1);
	                    }
	                });
	            }
	        }
	    }
	    // 4. extract runtime props/emits code from setup context type
	    if (propsTypeDecl) {
	        extractRuntimeProps(propsTypeDecl, typeDeclaredProps, declaredTypes);
	    }
	    if (emitTypeDecl) {
	        extractRuntimeEmits(emitTypeDecl, typeDeclaredEmits);
	    }
	    // 5. check useOptions args to make sure it doesn't reference setup scope
	    // variables
	    checkInvalidScopeReference(propsRuntimeDecl, DEFINE_PROPS);
	    checkInvalidScopeReference(emitRuntimeDecl, DEFINE_PROPS);
	    // 6. remove non-script content
	    if (script) {
	        if (startOffset < scriptStartOffset) {
	            // <script setup> before <script>
	            s.remove(0, startOffset);
	            s.remove(endOffset, scriptStartOffset);
	            s.remove(scriptEndOffset, source.length);
	        }
	        else {
	            // <script> before <script setup>
	            s.remove(0, scriptStartOffset);
	            s.remove(scriptEndOffset, startOffset);
	            s.remove(endOffset, source.length);
	        }
	    }
	    else {
	        // only <script setup>
	        s.remove(0, startOffset);
	        s.remove(endOffset, source.length);
	    }
	    // 7. analyze binding metadata
	    if (scriptAst) {
	        Object.assign(bindingMetadata, analyzeScriptBindings(scriptAst));
	    }
	    if (propsRuntimeDecl) {
	        for (const key of getObjectOrArrayExpressionKeys(propsRuntimeDecl)) {
	            bindingMetadata[key] = "props" /* PROPS */;
	        }
	    }
	    for (const key in typeDeclaredProps) {
	        bindingMetadata[key] = "props" /* PROPS */;
	    }
	    for (const [key, { isType, imported, source }] of Object.entries(userImports)) {
	        if (isType)
	            continue;
	        bindingMetadata[key] =
	            (imported === 'default' && source.endsWith('.vue')) || source === 'vue'
	                ? "setup-const" /* SETUP_CONST */
	                : "setup-maybe-ref" /* SETUP_MAYBE_REF */;
	    }
	    for (const key in setupBindings) {
	        bindingMetadata[key] = setupBindings[key];
	    }
	    // 8. inject `useCssVars` calls
	    if (cssVars.length) {
	        helperImports.add(CSS_VARS_HELPER);
	        helperImports.add('unref');
	        s.prependRight(startOffset, `\n${genCssVarsCode(cssVars, bindingMetadata, scopeId, !!options.isProd)}\n`);
	    }
	    // 9. finalize setup() argument signature
	    let args = `__props`;
	    if (propsTypeDecl) {
	        args += `: ${scriptSetup.content.slice(propsTypeDecl.start, propsTypeDecl.end)}`;
	    }
	    // inject user assignment of props
	    // we use a default __props so that template expressions referencing props
	    // can use it directly
	    if (propsIdentifier) {
	        s.prependRight(startOffset, `\nconst ${propsIdentifier} = __props`);
	    }
	    if (emitIdentifier) {
	        args +=
	            emitIdentifier === `emit` ? `, { emit }` : `, { emit: ${emitIdentifier} }`;
	        if (emitTypeDecl) {
	            args += `: {
        emit: (${scriptSetup.content.slice(emitTypeDecl.start, emitTypeDecl.end)}),
        slots: any,
        attrs: any
      }`;
	        }
	    }
	    // 10. generate return statement
	    let returned;
	    if (options.inlineTemplate) {
	        if (sfc.template && !sfc.template.src) {
	            if (options.templateOptions && options.templateOptions.ssr) {
	                hasInlinedSsrRenderFn = true;
	            }
	            // inline render function mode - we are going to compile the template and
	            // inline it right here
	            const { code, ast, preamble, tips, errors } = compileTemplate({
	                filename,
	                source: sfc.template.content,
	                inMap: sfc.template.map,
	                ...options.templateOptions,
	                id: scopeId,
	                scoped: sfc.styles.some(s => s.scoped),
	                isProd: options.isProd,
	                ssrCssVars: sfc.cssVars,
	                compilerOptions: {
	                    ...(options.templateOptions &&
	                        options.templateOptions.compilerOptions),
	                    inline: true,
	                    isTS,
	                    bindingMetadata
	                }
	            });
	            if (tips.length) {
	                tips.forEach(warnOnce);
	            }
	            const err = errors[0];
	            if (typeof err === 'string') {
	                throw new Error(err);
	            }
	            else if (err) {
	                if (err.loc) {
	                    err.message +=
	                        `\n\n` +
	                            sfc.filename +
	                            '\n' +
	                            shared.generateCodeFrame(source, err.loc.start.offset, err.loc.end.offset) +
	                            `\n`;
	                }
	                throw err;
	            }
	            if (preamble) {
	                s.prepend(preamble);
	            }
	            // avoid duplicated unref import
	            // as this may get injected by the render function preamble OR the
	            // css vars codegen
	            if (ast && ast.helpers.includes(compilerCore.UNREF)) {
	                helperImports.delete('unref');
	            }
	            returned = code;
	        }
	        else {
	            returned = `() => {}`;
	        }
	    }
	    else {
	        // return bindings from setup
	        const allBindings = { ...setupBindings };
	        for (const key in userImports) {
	            if (!userImports[key].isType) {
	                allBindings[key] = true;
	            }
	        }
	        returned = `{ ${Object.keys(allBindings).join(', ')} }`;
	    }
	    s.appendRight(endOffset, `\nreturn ${returned}\n}\n\n`);
	    // 11. finalize default export
	    // expose: [] makes <script setup> components "closed" by default.
	    let runtimeOptions = `\n  expose: [],`;
	    if (hasInheritAttrsFlag) {
	        runtimeOptions += `\n  inheritAttrs: false,`;
	    }
	    if (hasInlinedSsrRenderFn) {
	        runtimeOptions += `\n  __ssrInlineRender: true,`;
	    }
	    if (propsRuntimeDecl) {
	        runtimeOptions += `\n  props: ${scriptSetup.content
            .slice(propsRuntimeDecl.start, propsRuntimeDecl.end)
            .trim()},`;
	    }
	    else if (propsTypeDecl) {
	        runtimeOptions += genRuntimeProps(typeDeclaredProps);
	    }
	    if (emitRuntimeDecl) {
	        runtimeOptions += `\n  emits: ${scriptSetup.content
            .slice(emitRuntimeDecl.start, emitRuntimeDecl.end)
            .trim()},`;
	    }
	    else if (emitTypeDecl) {
	        runtimeOptions += genRuntimeEmits(typeDeclaredEmits);
	    }
	    if (isTS) {
	        // for TS, make sure the exported type is still valid type with
	        // correct props information
	        // we have to use object spread for types to be merged properly
	        // user's TS setting should compile it down to proper targets
	        const def = defaultExport ? `\n  ...${defaultTempVar},` : ``;
	        // wrap setup code with function.
	        // export the content of <script setup> as a named export, `setup`.
	        // this allows `import { setup } from '*.vue'` for testing purposes.
	        s.prependLeft(startOffset, `\nexport default ${helper(`defineComponent`)}({${def}${runtimeOptions}\n  ${hasAwait ? `async ` : ``}setup(${args}) {\n`);
	        s.appendRight(endOffset, `})`);
	    }
	    else {
	        if (defaultExport) {
	            // can't rely on spread operator in non ts mode
	            s.prependLeft(startOffset, `\n${hasAwait ? `async ` : ``}function setup(${args}) {\n`);
	            s.append(`\nexport default /*#__PURE__*/ Object.assign(${defaultTempVar}, {${runtimeOptions}\n  setup\n})\n`);
	        }
	        else {
	            s.prependLeft(startOffset, `\nexport default {${runtimeOptions}\n  ` +
	                `${hasAwait ? `async ` : ``}setup(${args}) {\n`);
	            s.appendRight(endOffset, `}`);
	        }
	    }
	    // 12. finalize Vue helper imports
	    if (helperImports.size > 0) {
	        s.prepend(`import { ${[...helperImports]
            .map(h => `${h} as _${h}`)
            .join(', ')} } from 'vue'\n`);
	    }
	    s.trim();
	    return {
	        ...scriptSetup,
	        bindings: bindingMetadata,
	        content: s.toString(),
	        map: s.generateMap({
	            source: filename,
	            hires: true,
	            includeContent: true
	        }),
	        scriptAst,
	        scriptSetupAst
	    };
	}
	function walkDeclaration(node, bindings, userImportAlias) {
	    if (node.type === 'VariableDeclaration') {
	        const isConst = node.kind === 'const';
	        // export const foo = ...
	        for (const { id, init } of node.declarations) {
	            const isDefineCall = !!(isConst &&
	                (isCallOf(init, DEFINE_PROPS) || isCallOf(init, DEFINE_EMIT)));
	            if (id.type === 'Identifier') {
	                let bindingType;
	                const userReactiveBinding = userImportAlias['reactive'] || 'reactive';
	                if (isCallOf(init, userReactiveBinding)) {
	                    // treat reactive() calls as let since it's meant to be mutable
	                    bindingType = "setup-let" /* SETUP_LET */;
	                }
	                else if (
	                // if a declaration is a const literal, we can mark it so that
	                // the generated render fn code doesn't need to unref() it
	                isDefineCall ||
	                    (isConst && canNeverBeRef(init, userReactiveBinding))) {
	                    bindingType = "setup-const" /* SETUP_CONST */;
	                }
	                else if (isConst) {
	                    if (isCallOf(init, userImportAlias['ref'] || 'ref')) {
	                        bindingType = "setup-ref" /* SETUP_REF */;
	                    }
	                    else {
	                        bindingType = "setup-maybe-ref" /* SETUP_MAYBE_REF */;
	                    }
	                }
	                else {
	                    bindingType = "setup-let" /* SETUP_LET */;
	                }
	                bindings[id.name] = bindingType;
	            }
	            else if (id.type === 'ObjectPattern') {
	                walkObjectPattern(id, bindings, isConst, isDefineCall);
	            }
	            else if (id.type === 'ArrayPattern') {
	                walkArrayPattern(id, bindings, isConst, isDefineCall);
	            }
	        }
	    }
	    else if (node.type === 'FunctionDeclaration' ||
	        node.type === 'ClassDeclaration') {
	        // export function foo() {} / export class Foo {}
	        // export declarations must be named.
	        bindings[node.id.name] = "setup-const" /* SETUP_CONST */;
	    }
	}
	function walkObjectPattern(node, bindings, isConst, isDefineCall = false) {
	    for (const p of node.properties) {
	        if (p.type === 'ObjectProperty') {
	            // key can only be Identifier in ObjectPattern
	            if (p.key.type === 'Identifier') {
	                if (p.key === p.value) {
	                    // const { x } = ...
	                    bindings[p.key.name] = isDefineCall
	                        ? "setup-const" /* SETUP_CONST */
	                        : isConst
	                            ? "setup-maybe-ref" /* SETUP_MAYBE_REF */
	                            : "setup-let" /* SETUP_LET */;
	                }
	                else {
	                    walkPattern(p.value, bindings, isConst, isDefineCall);
	                }
	            }
	        }
	        else {
	            // ...rest
	            // argument can only be identifer when destructuring
	            bindings[p.argument.name] = isConst
	                ? "setup-const" /* SETUP_CONST */
	                : "setup-let" /* SETUP_LET */;
	        }
	    }
	}
	function walkArrayPattern(node, bindings, isConst, isDefineCall = false) {
	    for (const e of node.elements) {
	        e && walkPattern(e, bindings, isConst, isDefineCall);
	    }
	}
	function walkPattern(node, bindings, isConst, isDefineCall = false) {
	    if (node.type === 'Identifier') {
	        bindings[node.name] = isDefineCall
	            ? "setup-const" /* SETUP_CONST */
	            : isConst
	                ? "setup-maybe-ref" /* SETUP_MAYBE_REF */
	                : "setup-let" /* SETUP_LET */;
	    }
	    else if (node.type === 'RestElement') {
	        // argument can only be identifer when destructuring
	        bindings[node.argument.name] = isConst
	            ? "setup-const" /* SETUP_CONST */
	            : "setup-let" /* SETUP_LET */;
	    }
	    else if (node.type === 'ObjectPattern') {
	        walkObjectPattern(node, bindings, isConst);
	    }
	    else if (node.type === 'ArrayPattern') {
	        walkArrayPattern(node, bindings, isConst);
	    }
	    else if (node.type === 'AssignmentPattern') {
	        if (node.left.type === 'Identifier') {
	            bindings[node.left.name] = isDefineCall
	                ? "setup-const" /* SETUP_CONST */
	                : isConst
	                    ? "setup-maybe-ref" /* SETUP_MAYBE_REF */
	                    : "setup-let" /* SETUP_LET */;
	        }
	        else {
	            walkPattern(node.left, bindings, isConst);
	        }
	    }
	}
	function recordType(node, declaredTypes) {
	    if (node.type === 'TSInterfaceDeclaration') {
	        declaredTypes[node.id.name] = [`Object`];
	    }
	    else if (node.type === 'TSTypeAliasDeclaration') {
	        declaredTypes[node.id.name] = inferRuntimeType(node.typeAnnotation, declaredTypes);
	    }
	    else if (node.type === 'ExportNamedDeclaration' && node.declaration) {
	        recordType(node.declaration, declaredTypes);
	    }
	}
	function extractRuntimeProps(node, props, declaredTypes) {
	    for (const m of node.members) {
	        if (m.type === 'TSPropertySignature' && m.key.type === 'Identifier') {
	            props[m.key.name] = {
	                key: m.key.name,
	                required: !m.optional,
	                type: m.typeAnnotation
	                    ? inferRuntimeType(m.typeAnnotation.typeAnnotation, declaredTypes)
	                    : [`null`]
	            };
	        }
	    }
	}
	function inferRuntimeType(node, declaredTypes) {
	    switch (node.type) {
	        case 'TSStringKeyword':
	            return ['String'];
	        case 'TSNumberKeyword':
	            return ['Number'];
	        case 'TSBooleanKeyword':
	            return ['Boolean'];
	        case 'TSObjectKeyword':
	            return ['Object'];
	        case 'TSTypeLiteral':
	            // TODO (nice to have) generate runtime property validation
	            return ['Object'];
	        case 'TSFunctionType':
	            return ['Function'];
	        case 'TSArrayType':
	        case 'TSTupleType':
	            // TODO (nice to have) generate runtime element type/length checks
	            return ['Array'];
	        case 'TSLiteralType':
	            switch (node.literal.type) {
	                case 'StringLiteral':
	                    return ['String'];
	                case 'BooleanLiteral':
	                    return ['Boolean'];
	                case 'NumericLiteral':
	                case 'BigIntLiteral':
	                    return ['Number'];
	                default:
	                    return [`null`];
	            }
	        case 'TSTypeReference':
	            if (node.typeName.type === 'Identifier') {
	                if (declaredTypes[node.typeName.name]) {
	                    return declaredTypes[node.typeName.name];
	                }
	                switch (node.typeName.name) {
	                    case 'Array':
	                    case 'Function':
	                    case 'Object':
	                    case 'Set':
	                    case 'Map':
	                    case 'WeakSet':
	                    case 'WeakMap':
	                        return [node.typeName.name];
	                    case 'Record':
	                    case 'Partial':
	                    case 'Readonly':
	                    case 'Pick':
	                    case 'Omit':
	                    case 'Exclude':
	                    case 'Extract':
	                    case 'Required':
	                    case 'InstanceType':
	                        return ['Object'];
	                }
	            }
	            return [`null`];
	        case 'TSUnionType':
	            return [
	                ...new Set([].concat(node.types.map(t => inferRuntimeType(t, declaredTypes))))
	            ];
	        case 'TSIntersectionType':
	            return ['Object'];
	        default:
	            return [`null`]; // no runtime check
	    }
	}
	function genRuntimeProps(props) {
	    const keys = Object.keys(props);
	    if (!keys.length) {
	        return ``;
	    }
	    return `\n  props: {\n    ${keys
        .map(key => {
        const { type, required } = props[key];
        return `${key}: { type: ${toRuntimeTypeString(type)}, required: ${required} }`;
    })
        .join(',\n    ')}\n  } as unknown as undefined,`;
	}
	function toRuntimeTypeString(types) {
	    return types.some(t => t === 'null')
	        ? `null`
	        : types.length > 1
	            ? `[${types.join(', ')}]`
	            : types[0];
	}
	function extractRuntimeEmits(node, emits) {
	    if (node.type === 'TSTypeLiteral') {
	        for (let t of node.members) {
	            if (t.type === 'TSCallSignatureDeclaration') {
	                extractEventNames(t.parameters[0], emits);
	            }
	        }
	        return;
	    }
	    else {
	        extractEventNames(node.parameters[0], emits);
	    }
	}
	function extractEventNames(eventName, emits) {
	    if (eventName.type === 'Identifier' &&
	        eventName.typeAnnotation &&
	        eventName.typeAnnotation.type === 'TSTypeAnnotation') {
	        const typeNode = eventName.typeAnnotation.typeAnnotation;
	        if (typeNode.type === 'TSLiteralType') {
	            emits.add(String(typeNode.literal.value));
	        }
	        else if (typeNode.type === 'TSUnionType') {
	            for (const t of typeNode.types) {
	                if (t.type === 'TSLiteralType') {
	                    emits.add(String(t.literal.value));
	                }
	            }
	        }
	    }
	}
	function genRuntimeEmits(emits) {
	    return emits.size
	        ? `\n  emits: [${Array.from(emits)
            .map(p => JSON.stringify(p))
            .join(', ')}] as unknown as undefined,`
	        : ``;
	}
	function markScopeIdentifier(node, child, knownIds) {
	    const { name } = child;
	    if (node.scopeIds && node.scopeIds.has(name)) {
	        return;
	    }
	    if (name in knownIds) {
	        knownIds[name]++;
	    }
	    else {
	        knownIds[name] = 1;
	    }
	    (node.scopeIds || (node.scopeIds = new Set())).add(name);
	}
	/**
	 * Walk an AST and find identifiers that are variable references.
	 * This is largely the same logic with `transformExpressions` in compiler-core
	 * but with some subtle differences as this needs to handle a wider range of
	 * possible syntax.
	 */
	function walkIdentifiers(root, onIdentifier) {
	    const parentStack = [];
	    const knownIds = Object.create(null);
	    estreeWalker.walk(root, {
	        enter(node, parent) {
	            parent && parentStack.push(parent);
	            if (node.type === 'Identifier') {
	                if (!knownIds[node.name] &&
	                    isRefIdentifier(node, parent, parentStack)) {
	                    onIdentifier(node, parent, parentStack);
	                }
	            }
	            else if (isFunction(node)) {
	                // #3445
	                // should not rewrite local variables sharing a name with a top-level ref
	                if (node.body.type === 'BlockStatement') {
	                    node.body.body.forEach(p => {
	                        if (p.type === 'VariableDeclaration') {
	                            for (const decl of p.declarations) {
	                                extractIdentifiers(decl.id).forEach(id => {
	                                    markScopeIdentifier(node, id, knownIds);
	                                });
	                            }
	                        }
	                    });
	                }
	                // walk function expressions and add its arguments to known identifiers
	                // so that we don't prefix them
	                node.params.forEach(p => estreeWalker.walk(p, {
	                    enter(child, parent) {
	                        if (child.type === 'Identifier' &&
	                            // do not record as scope variable if is a destructured key
	                            !isStaticPropertyKey(child, parent) &&
	                            // do not record if this is a default value
	                            // assignment of a destructured variable
	                            !(parent &&
	                                parent.type === 'AssignmentPattern' &&
	                                parent.right === child)) {
	                            markScopeIdentifier(node, child, knownIds);
	                        }
	                    }
	                }));
	            }
	            else if (node.type === 'ObjectProperty' &&
	                parent.type === 'ObjectPattern') {
	                node.inPattern = true;
	            }
	        },
	        leave(node, parent) {
	            parent && parentStack.pop();
	            if (node.scopeIds) {
	                node.scopeIds.forEach((id) => {
	                    knownIds[id]--;
	                    if (knownIds[id] === 0) {
	                        delete knownIds[id];
	                    }
	                });
	            }
	        }
	    });
	}
	function isRefIdentifier(id, parent, parentStack) {
	    // declaration id
	    if ((parent.type === 'VariableDeclarator' ||
	        parent.type === 'ClassDeclaration') &&
	        parent.id === id) {
	        return false;
	    }
	    if (isFunction(parent)) {
	        // function decalration/expression id
	        if (parent.id === id) {
	            return false;
	        }
	        // params list
	        if (parent.params.includes(id)) {
	            return false;
	        }
	    }
	    // property key
	    // this also covers object destructure pattern
	    if (isStaticPropertyKey(id, parent)) {
	        return false;
	    }
	    // non-assignment array destructure pattern
	    if (parent.type === 'ArrayPattern' &&
	        !isInDestructureAssignment(parent, parentStack)) {
	        return false;
	    }
	    // member expression property
	    if ((parent.type === 'MemberExpression' ||
	        parent.type === 'OptionalMemberExpression') &&
	        parent.property === id &&
	        !parent.computed) {
	        return false;
	    }
	    // is a special keyword but parsed as identifier
	    if (id.name === 'arguments') {
	        return false;
	    }
	    return true;
	}
	const isStaticProperty = (node) => node &&
	    (node.type === 'ObjectProperty' || node.type === 'ObjectMethod') &&
	    !node.computed;
	const isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
	function isFunction(node) {
	    return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
	}
	function isCallOf(node, name) {
	    return !!(node &&
	        node.type === 'CallExpression' &&
	        node.callee.type === 'Identifier' &&
	        node.callee.name === name);
	}
	function canNeverBeRef(node, userReactiveImport) {
	    if (isCallOf(node, userReactiveImport)) {
	        return true;
	    }
	    switch (node.type) {
	        case 'UnaryExpression':
	        case 'BinaryExpression':
	        case 'ArrayExpression':
	        case 'ObjectExpression':
	        case 'FunctionExpression':
	        case 'ArrowFunctionExpression':
	        case 'UpdateExpression':
	        case 'ClassExpression':
	        case 'TaggedTemplateExpression':
	            return true;
	        case 'SequenceExpression':
	            return canNeverBeRef(node.expressions[node.expressions.length - 1], userReactiveImport);
	        default:
	            if (node.type.endsWith('Literal')) {
	                return true;
	            }
	            return false;
	    }
	}
	function isInDestructureAssignment(parent, parentStack) {
	    if (parent &&
	        (parent.type === 'ObjectProperty' || parent.type === 'ArrayPattern')) {
	        let i = parentStack.length;
	        while (i--) {
	            const p = parentStack[i];
	            if (p.type === 'AssignmentExpression') {
	                const root = parentStack[0];
	                // if this is a ref: destructure, it should be treated like a
	                // variable decalration!
	                return !(root.type === 'LabeledStatement' && root.label.name === 'ref');
	            }
	            else if (p.type !== 'ObjectProperty' && !p.type.endsWith('Pattern')) {
	                break;
	            }
	        }
	    }
	    return false;
	}
	/**
	 * Analyze bindings in normal `<script>`
	 * Note that `compileScriptSetup` already analyzes bindings as part of its
	 * compilation process so this should only be used on single `<script>` SFCs.
	 */
	function analyzeScriptBindings(ast) {
	    for (const node of ast) {
	        if (node.type === 'ExportDefaultDeclaration' &&
	            node.declaration.type === 'ObjectExpression') {
	            return analyzeBindingsFromOptions(node.declaration);
	        }
	    }
	    return {};
	}
	function analyzeBindingsFromOptions(node) {
	    const bindings = {};
	    // #3270, #3275
	    // mark non-script-setup so we don't resolve components/directives from these
	    Object.defineProperty(bindings, '__isScriptSetup', {
	        enumerable: false,
	        value: false
	    });
	    for (const property of node.properties) {
	        if (property.type === 'ObjectProperty' &&
	            !property.computed &&
	            property.key.type === 'Identifier') {
	            // props
	            if (property.key.name === 'props') {
	                // props: ['foo']
	                // props: { foo: ... }
	                for (const key of getObjectOrArrayExpressionKeys(property.value)) {
	                    bindings[key] = "props" /* PROPS */;
	                }
	            }
	            // inject
	            else if (property.key.name === 'inject') {
	                // inject: ['foo']
	                // inject: { foo: {} }
	                for (const key of getObjectOrArrayExpressionKeys(property.value)) {
	                    bindings[key] = "options" /* OPTIONS */;
	                }
	            }
	            // computed & methods
	            else if (property.value.type === 'ObjectExpression' &&
	                (property.key.name === 'computed' || property.key.name === 'methods')) {
	                // methods: { foo() {} }
	                // computed: { foo() {} }
	                for (const key of getObjectExpressionKeys(property.value)) {
	                    bindings[key] = "options" /* OPTIONS */;
	                }
	            }
	        }
	        // setup & data
	        else if (property.type === 'ObjectMethod' &&
	            property.key.type === 'Identifier' &&
	            (property.key.name === 'setup' || property.key.name === 'data')) {
	            for (const bodyItem of property.body.body) {
	                // setup() {
	                //   return {
	                //     foo: null
	                //   }
	                // }
	                if (bodyItem.type === 'ReturnStatement' &&
	                    bodyItem.argument &&
	                    bodyItem.argument.type === 'ObjectExpression') {
	                    for (const key of getObjectExpressionKeys(bodyItem.argument)) {
	                        bindings[key] =
	                            property.key.name === 'setup'
	                                ? "setup-maybe-ref" /* SETUP_MAYBE_REF */
	                                : "data" /* DATA */;
	                    }
	                }
	            }
	        }
	    }
	    return bindings;
	}
	function getObjectExpressionKeys(node) {
	    const keys = [];
	    for (const prop of node.properties) {
	        if ((prop.type === 'ObjectProperty' || prop.type === 'ObjectMethod') &&
	            !prop.computed) {
	            if (prop.key.type === 'Identifier') {
	                keys.push(prop.key.name);
	            }
	            else if (prop.key.type === 'StringLiteral') {
	                keys.push(prop.key.value);
	            }
	        }
	    }
	    return keys;
	}
	function getArrayExpressionKeys(node) {
	    const keys = [];
	    for (const element of node.elements) {
	        if (element && element.type === 'StringLiteral') {
	            keys.push(element.value);
	        }
	    }
	    return keys;
	}
	function getObjectOrArrayExpressionKeys(value) {
	    if (value.type === 'ArrayExpression') {
	        return getArrayExpressionKeys(value);
	    }
	    if (value.type === 'ObjectExpression') {
	        return getObjectExpressionKeys(value);
	    }
	    return [];
	}
	function extractIdentifiers(param, nodes = []) {
	    switch (param.type) {
	        case 'Identifier':
	            nodes.push(param);
	            break;
	        case 'MemberExpression':
	            let object = param;
	            while (object.type === 'MemberExpression') {
	                object = object.object;
	            }
	            nodes.push(object);
	            break;
	        case 'ObjectPattern':
	            param.properties.forEach(prop => {
	                if (prop.type === 'RestElement') {
	                    extractIdentifiers(prop.argument, nodes);
	                }
	                else {
	                    extractIdentifiers(prop.value, nodes);
	                }
	            });
	            break;
	        case 'ArrayPattern':
	            param.elements.forEach(element => {
	                if (element)
	                    extractIdentifiers(element, nodes);
	            });
	            break;
	        case 'RestElement':
	            extractIdentifiers(param.argument, nodes);
	            break;
	        case 'AssignmentPattern':
	            extractIdentifiers(param.left, nodes);
	            break;
	    }
	    return nodes;
	}

	exports.generateCodeFrame = compilerCore.generateCodeFrame;
	exports.MagicString = MagicString__default;
	exports.babelParse = parser.parse;
	exports.walk = estreeWalker.walk;
	exports.compileScript = compileScript;
	exports.compileStyle = compileStyle;
	exports.compileStyleAsync = compileStyleAsync;
	exports.compileTemplate = compileTemplate;
	exports.parse = parse$2;
	exports.rewriteDefault = rewriteDefault;
	exports.walkIdentifiers = walkIdentifiers;

	var compilerSfc_cjs = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(compilerSfc_cjs);

	let { parse: parse$1 } = require$$0$1;
	var parse_1 = (code) => {
	    const ast = parse$1(code, { filename: String(+new Date()) }).descriptor;
	    return ast
	};

	const parse = parse_1;
	const jsCore$1 = core_1$2;
	const htmlCore$2 = core_1$1;
	const NodePath$2 = NodePath_1;
	const core$1 = {
	    getAstsBySelector(ast, selector, { parseOptions } = {}) {
	        parseOptions = Object.assign({}, parseOptions);
	        let newAst = ast;
	        if (selector == '<template></template>') {
	            parseOptions.language = 'html';
	            parseOptions.rootLanguage = 'vue';
	            if (ast.templateAst) {
	                newAst = ast.templateAst;
	            } else {
	                ast.templateAst = core$1.getTemplate(ast);
	                newAst = ast.templateAst;
	            }
	        } else if (selector == '<script></script>') {
	            parseOptions.language = 'js';
	            parseOptions.rootLanguage = 'vue';
	            if (ast.scriptAst) {
	                newAst = ast.scriptAst;
	            } else {
	                ast.scriptAst = core$1.getScript(ast);
	                newAst = ast.scriptAst;
	            }
	        } else if (selector == '<script setup></script>') {
	            parseOptions.language = 'js';
	            parseOptions.rootLanguage = 'vue';
	            if (ast.scriptSetupAst) {
	                newAst = ast.scriptSetupAst;
	            } else {
	                ast.scriptSetupAst = core$1.getScript(ast, { isSetup: true });
	                newAst = ast.scriptSetupAst;
	            }
	        }
	        return { nodePathList: newAst ? [newAst] : [], matchWildCardList: [], extra: { parseOptions } }
	    },
	    getTemplate(ast) {
	        // 仅针对vue，取template，后续通过htmlcore处理
	        if (ast.template) {
	            const template = htmlCore$2.buildAstByAstStr(
	                ast.template.content,
	                {},
	                {
	                    isProgram: true,
	                    parseOptions: { language: 'html' }
	                }
	            );
	            return new NodePath$2(template);
	        } else {
	            return undefined;
	        }
	    },
	    getScript(ast, { isSetup = false } = {} ) {
	        // 仅针对vue，取script，后续通过jscore处理
	        let content;
	        if (isSetup && ast.scriptSetup) {
	            content = ast.scriptSetup.content;
	        } else if (!isSetup && ast.script) {
	            content = ast.script.content;
	            // const content = ast.script.content.replace(/\n/g, '')
	        }
	        if (content) {
	            const script = jsCore$1.buildAstByAstStr(
	                content, {},
	                { isProgram: true }
	            );
	            return new NodePath$2(script);
	        } else {
	            return undefined;
	        }
	    },
	    buildAstByAstStr(str, astPatialMap = {}, { isProgram = false, parseOptions } = {}) {
	        try {
	            const program = parse(str, parseOptions);
	            if (program) {
	                if (isProgram) {
	                    return program;
	                } else {
	                    if (program.template && program.template.ast) {
	                        return program.template
	                    } else return null
	                }
	            } else {
	                return null;
	            }
	        } catch(e) {
	            console.log('buildAstByAstStr failed:' + e);
	        }
	    }
	};

	var core_1 = core$1;

	var _indentString_4_0_0_indentString = (string, count = 1, options) => {
		options = {
			indent: ' ',
			includeEmptyLines: false,
			...options
		};

		if (typeof string !== 'string') {
			throw new TypeError(
				`Expected \`input\` to be a \`string\`, got \`${typeof string}\``
			);
		}

		if (typeof count !== 'number') {
			throw new TypeError(
				`Expected \`count\` to be a \`number\`, got \`${typeof count}\``
			);
		}

		if (typeof options.indent !== 'string') {
			throw new TypeError(
				`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
			);
		}

		if (count === 0) {
			return string;
		}

		const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

		return string.replace(regex, options.indent.repeat(count));
	};

	const indentString = _indentString_4_0_0_indentString;
	const jsGenerate = generate$7;
	const htmlGenerate$1 = serializeNode_1;
	/**
	 * The following function is adapted from https://github.com/psalaets/vue-sfc-descriptor-to-string/blob/master/index.js
	 */

	/**
	 * The MIT License (MIT)
	 * Copyright (c) 2018 Paul Salaets
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */

	var generate$1 = function toString(sfcDescriptor, options = {}) {
	    let { template, script, scriptSetup, styles = [], customBlocks = [], templateAst, scriptAst, scriptSetupAst } = sfcDescriptor;
	    if (templateAst && templateAst.node) {
	        template.content = htmlGenerate$1(templateAst.node);
	    } 
	    if (scriptAst && scriptAst.node) {
	        script.content = jsGenerate(scriptAst.node);
	    }

	    if (scriptSetupAst && scriptSetupAst.node) {
	        scriptSetup.content = jsGenerate(scriptSetupAst.node);
	    }

	    const indents = Object.assign(
	        {
	            template: 2,
	            script: 0,
	            style: 0
	        },
	        options.indents
	    );

	    return (
	        [template, script, scriptSetup, ...styles, ...customBlocks]
	            // discard blocks that don't exist
	            .filter((block) => block != null)
	            // sort blocks by source position
	            .sort((a, b) => a.start - b.start)
	            // figure out exact source positions of blocks
	            .map((block) => {
	                const openTag = makeOpenTag(block);
	                const closeTag = makeCloseTag(block);

	                return Object.assign({}, block, {
	                    openTag,
	                    closeTag,

	                    startOfOpenTag: block.start - openTag.length,
	                    endOfOpenTag: block.start,

	                    startOfCloseTag: block.end,
	                    endOfCloseTag: block.end + closeTag.length
	                });
	            })
	            // generate sfc source
	            .reduce((sfcCode, block, index, array) => {
	                const first = index === 0;

	                let newlinesBefore = 0;

	                if (first) {
	                    newlinesBefore = block.startOfOpenTag;
	                } else {
	                    const prevBlock = array[index - 1];
	                    newlinesBefore =
	                        block.startOfOpenTag - prevBlock.endOfCloseTag;
	                }

	                return (
	                    sfcCode +
	                    '\n'.repeat(newlinesBefore) +
	                    block.openTag +
	                    indentString(block.content, indents[block.type] || 0) +
	                    block.closeTag
	                );
	            }, '')
	    );
	};

	function makeOpenTag(block) {
	    let source = '<' + block.type;

	    source += Object.keys(block.attrs)
	        .sort()
	        .map((name) => {
	            const value = block.attrs[name];

	            if (value === true) {
	                return name;
	            } else {
	                return `${name}="${value}"`;
	            }
	        })
	        .map((attr) => ' ' + attr)
	        .join('');

	    return source + '>';
	}

	function makeCloseTag(block) {
	    return `</${block.type}>\n`;
	}

	const generate = generate$7;
	const htmlGenerate = serializeNode_1;
	const vueGenerate = generate$1;
	const core = core_1$2;
	const htmlCore$1 = core_1$1;
	const vueCore$1 = core_1;
	const NodePath$1 = NodePath_1;
	const filterProp = filterProp$2;
	const { isObject } = util;

	const languageMap = {
	    'js': { 
	        generate,
	        core
	    },
	    'html': { 
	        generate: htmlGenerate,
	        core: htmlCore$1
	    },
	    'vue': { 
	        generate: vueGenerate,
	        core: vueCore$1
	    }
	};

	class AST$1 {
	    constructor(nodePath, { parseOptions, match, rootNode } = {}) {
	        if (nodePath) {
	            this[0] = {
	                nodePath, match
	            };
	        }
	        this.rootNode = rootNode;
	        this.expando = 'g' + ('' + Math.random()).replace( /\D/g, "" ) + 'g';
	        this.parseOptions = parseOptions;
	    }
	    get node() {
	        return this[0].nodePath.node
	    }
	    get value() {
	        return this[0].nodePath.value
	    }
	    get match() {
	        return this[0].match
	    }
	    get isHtml() {
	        return this.parseOptions && (this.parseOptions.html || this.parseOptions.language == 'html');
	    }
	    get language() {
	        return (this.parseOptions && this.parseOptions.language) || 'js';
	    }
	    get core() {
	        return languageMap[this.language].core
	    }
	    get _index() {
	        initParent(this);
	        // todo js
	        return this[0]._index;
	    }
	    get length() {
	        let i = 0;
	        while(this[i]) {
	            i++;
	        }
	        return i;
	    }
	    each(callback) {
	        let i = 0;
	        const newAST = cloneAST(this);
	        while (this[i]) {
	            const { nodePath, match } = this[i];
	            const eachNode = new AST$1(nodePath, { parseOptions: this.parseOptions, match, rootNode: this.rootNode});
	            callback(eachNode, i);
	            newAST[i] = eachNode[0] || null;
	            i++;
	        }
	        return newAST
	    }
	    find(selector, options = {}) {
	        if (!selector) {
	            throw new Error('find failed! first argument should not be null!')
	        }
	        if (!this[0]) {
	            return this;
	        }
	        const { nodePath } = this[0];
	        // if (typeof selector !== 'string' && !Array.isArray(selector)) {
	        //     throw new Error('find failed! Nodepath is null!');
	        // }
	        const pOptions = options.parseOptions || this.parseOptions;
	        const {nodePathList, matchWildCardList, extra = {} } = this.core.getAstsBySelector(
	            nodePath.node,
	            selector, {
	                strictSequence: options.ignoreSequence === false,
	                parseOptions: pOptions,
	                expando: this.expando
	            }
	        );
	        const newAST = cloneAST(this);
	        if (!newAST.rootNode) {
	            newAST.rootNode = this[0].nodePath;
	        }
	        nodePathList.forEach((nodePath, i) => {
	            // 把this里的parentPath接到nodePath上
	            if (this.language == 'js') {
	                let theNodePath = nodePath;
	                while(theNodePath.parentPath) {
	                    if (theNodePath.parentPath && theNodePath.parentPath.name == 'root') {
	                        theNodePath.parentPath = this[0].nodePath;
	                        break;
	                    }
	                    theNodePath = theNodePath.parentPath;
	                }
	            }
	            newAST[i] = { nodePath, parseOptions: extra.parseOptions || pOptions, match: matchWildCardList[i] };
	        });
	        if (extra.parseOptions) {
	            newAST.parseOptions = extra.parseOptions;
	        }
	        return newAST;
	    }
	    parent(level = 0) {
	        if (!this[0]) {
	            return this;
	        }
	        // if (!this[0].parentList) {
	        initParent(this);
	        // }
	        const parent = this[0].parentList[level];
	        const newAST = cloneAST(this);
	        if (parent) {
	            newAST[0] = { nodePath: parent, parseOptions: this.parseOptions };
	            return newAST;
	        } else {
	            return this;
	        }
	    }
	    parents() {
	        if (!this[0]) {
	            return this;
	        }
	        // if (!this[0].parentList) {
	        initParent(this);
	        // }
	        const { parentList } = this[0];
	        const newAST = cloneAST(this);
	        parentList.forEach((nodePath, i) => {
	            newAST[i] = { nodePath, parseOptions: this.parseOptions, match: null };
	        });
	        return newAST;
	    }
	    root(option) {
	        if (!this.rootNode) {
	            return this;
	        }
	        const newAST = cloneAST(this);
	        newAST[0] = { nodePath: this.rootNode };
	        newAST.rootNode = null;
	        if (this.parseOptions && this.parseOptions.rootLanguage == 'vue') {
	            if (option == 'template') {
	                newAST[0] = { nodePath: this.rootNode.node.templateAst };
	            } else if (option == 'script') {
	                newAST[0] = { nodePath: this.rootNode.node.scriptAst };
	            } else {
	                newAST.parseOptions = { language: 'vue' };
	            }
	        }
	        return newAST;
	    }
	    has(selector, options) {
	        return !!this.find(selector, options)[0]
	    }
	    siblings() {
	        if (!this[0]) {
	            return this;
	        }
	        // if (!Array.isArray(this[0].siblings)) {
	        initSiblings(this);
	        // }
	        const siblings = this[0].siblings || [];
	        const newAST = cloneAST(this);
	        siblings.forEach((sibling, i) => {
	            newAST[i] = sibling;
	        });
	        return newAST;
	    }
	    prevAll() {
	        if (!this[0]) {
	            return this;
	        }
	        // if (!Array.isArray(this[0].siblings)) {
	        initSiblings(this);
	        // }
	        const prevAll = this[0].prevAll || [];
	        const newAST = cloneAST(this);
	        prevAll.forEach((prev, i) => {
	            newAST[i] = prev;
	        });
	        return newAST;
	    }
	    prev() {
	        if (!this[0]) {
	            return this;
	        }
	        // if (!Array.isArray(this[0].siblings)) {
	        initSiblings(this);
	        // }
	        const prevAll = this[0].prevAll || [];
	        const newAST = cloneAST(this);
	        newAST[0] = prevAll[prevAll.length - 1];
	        return newAST;
	    }

	    nextAll() {
	        if (!this[0]) {
	            return this;
	        }
	        // if (!Array.isArray(this[0].siblings)) {
	        initSiblings(this);
	        // }
	        const nextAll = this[0].nextAll || [];
	        const newAST = cloneAST(this);
	        nextAll.forEach((next, i) => {
	            newAST[i] = next;
	        });
	        return newAST;
	    }
	    next() {
	        if (!this[0]) {
	            return this;
	        }
	        // if (!Array.isArray(this[0].siblings)) {
	        initSiblings(this);
	        // }
	        const nextAll = this[0].nextAll || [];
	        const newAST = cloneAST(this);
	        newAST[0] = nextAll[0];
	        return newAST;
	    }
	    eq(index) {
	        index = index || 0;
	        const { nodePath, match } = this[index] || {};
	        const newAST = cloneAST(this);
	        newAST[0] = { nodePath, parseOptions: this.parseOptions, match };
	        return newAST;
	    }
	    attr(arg1, arg2) {
	        if (!this[0] || !this[0].nodePath || !this[0].nodePath.node) {
	            return this;
	        }
	        let attrMap = {};
	        if (arg2) {
	            // arg1是key arg2是value
	            if (typeof arg1 == 'string') {
	                attrMap = { [arg1]: arg2 };
	            } else {
	                throw new Error('attr failed! args[0] should be string!')
	            }
	        } else {
	            if (typeof arg1 == 'string') {
	                // 取某个属性
	                return getAttrValue(this[0].nodePath.node, arg1);
	            } else if (typeof arg1 == 'object') {
	                attrMap = arg1;
	            }
	        }
	        setAttrValue(this[0].nodePath.node, attrMap);
	        return this;
	    }
	    clone() {
	        if (!this[0]) {
	            return this;
	        }
	        let nodePath;
	        // html深度克隆时需要忽略parentRef
	        if (this.isHtml) {
	            const parentRefList = [];
	            markParent(this[0].nodePath.node);
	            const newNode = JSON.parse(JSON.stringify(this[0].nodePath.node));
	            resetParent(newNode);
	            resetParent(this[0].nodePath.node);
	            nodePath = new NodePath$1(
	                newNode, 
	                this[0].nodePath.parent, 
	                this[0].nodePath.parentPath 
	            );
	            function resetParent(node) {
	                for (let key in node) {
	                    if (key == 'parentRef') {
	                        node[key] = parentRefList[node[key]];
	                    } else if (isObject(node[key])) {
	                        if (Array.isArray(node[key])) {
	                            node[key].forEach(n => {
	                                resetParent(n);
	                            });
	                        } else {
	                            resetParent(node[key]);
	                        }
	                    }
	                }
	            }
	            function markParent(node) {
	                for (let key in node) {
	                    if (key == 'parentRef') {
	                        parentRefList.push(node[key]);
	                        node[key] = parentRefList.length - 1;
	                    } else if (isObject(node[key])) {
	                        if (Array.isArray(node[key])) {
	                            node[key].forEach(n => {
	                                markParent(n);
	                            });
	                        } else {
	                            markParent(node[key]);
	                        }
	                    }
	                }
	            }
	            
	        } else {
	            const node = {};
	            // js需要做一层属性过滤，否则会有环形依赖
	            filterProp(this[0].nodePath.node, node, [
	                'computed',
	                'range',
	                'loc',
	                'start',
	                'end',
	                'leadingComments',
	                'shorthand',
	                'extra',
	                'static',
	                'typeParameters'
	            ]);
	            nodePath = new NodePath$1(
	                // JSON.parse(JSON.stringify(this[0].nodePath.node)), 
	                JSON.parse(JSON.stringify(node)), 
	                this[0].nodePath.parent, 
	                this[0].nodePath.parentPath 
	            );
	        }
	        const { match } = this[0];
	        const newAST = cloneAST(this);
	        newAST[0] = { nodePath, parseOptions: this.parseOptions, match };
	        return newAST;
	    }
	    replace(selector, replacer, { ignoreSequence, parseOptions } = {}) {
	        if (!this[0]) {
	            // throw new Error('replace failed! Nodepath is null!');
	            return this;
	        }
	        this.core.replaceSelBySel(this[0].nodePath, selector, replacer, ignoreSequence === false, parseOptions, this.expando);
	        return this;
	    }
	    replaceBy(replacer) {
	        if (!this[0]) {
	            return this.root();
	        }
	        if (replacer[0] && replacer[0].nodePath) {
	            replacer = replacer[0].nodePath.node;
	        }
	        if (typeof replacer == 'string') {
	            replacer = this.core.buildAstByAstStr(replacer);
	        }
	        if (replacer.type == 'File') {
	            replacer = replacer.program.body[0];
	        }
	        let i = 0;
	        while(this[i]) {
	            this.core.replaceAstByAst(this[i].nodePath, replacer);
	            i++;
	        }
	        
	        return this;
	    }
	    insertSiblingNode(node, type) {
	        if (!this[0]) {
	            return this;
	        }
	        if (!node.type && !node.nodeType) {
	            throw new Error('insert failed! Unexpected node for insert!')
	        }
	        // if (!this[0].parentList) {
	        initParent(this);
	        // }
	        if (this.isHtml) {
	            let p;
	            let index = -1;
	            if (this.node.nodeType == 'document') {
	                p = this.node.content.children;
	                index = type == 'before' ? 0 : p.length - 1;
	            } else {
	                const parent = this.parent();
	                // todotodo
	                p = parent.attr('content.children') || [];
	                p.forEach((item, i) => {
	                    if (item == this.node) {
	                        index = i;
	                    }
	                });
	            }
	            if (type == 'before') {
	                p.splice(index, 0, node);
	            } else {
	                p.splice(index + 1, 0, node);
	            }
	        } else {
	            const parentList = this[0].parentList;
	            if ((!parentList || parentList.length == 0) && this.node.type == 'File') {
	                if (type == 'before') {
	                    this.attr('program.body').unshift(node);
	                } else {
	                    this.attr('program.body').push(node);
	                }
	                return;
	            }
	            let getArrayParent = false;
	            let i = 0;
	            let selfPathNode = this[0].nodePath.value;
	            let selfIndex = -1;
	            while(!getArrayParent) {
	                if (!parentList[i] || !parentList[i].value) {
	                    getArrayParent = true;
	                } else if (Array.isArray(parentList[i].value)) {
	                    getArrayParent = true;
	                    parentList[i].value.forEach((nodePath, index) => {
	                        if (nodePath == selfPathNode) {
	                            selfIndex = index;
	                        }
	                    });
	                    if (type == 'after') {
	                        parentList[i].value.splice(selfIndex + 1, 0, node);
	                    } else {
	                        parentList[i].value.splice(selfIndex, 0, node);
	                    }
	                }
	                selfPathNode = parentList[i].value;
	                i++;
	            }
	        }
	    }
	    after(node) {
	        if (!node) {
	            throw new Error('after failed! Unexpected node for insert!')
	        }
	        if (typeof node == 'string') {
	            node = this.core.buildAstByAstStr(node);
	        }
	        if (node[0] && node[0].nodePath) {
	            node = node[0].nodePath.value;
	        }
	        if (node.type == 'File') {
	            if (node.program.body.length > 0) {
	                node.program.body.forEach(item => {
	                    this.insertSiblingNode(item, 'after');
	                });
	                return this;
	            } else {
	                return this;
	            }
	        }
	        if (!Array.isArray(node)) {
	            node = [node];
	        }
	        node.forEach(n => {
	            this.insertSiblingNode(n, 'after');
	        });
	        return this;
	    }
	    before(node) {
	        if (!node) {
	            throw new Error('before failed! Unexpected node for insert!')
	        }
	        if (typeof node == 'string') {
	            node = this.core.buildAstByAstStr(node);
	        }
	        if (node[0] && node[0].nodePath) {
	            node = node[0].nodePath.value;
	        }
	        if (node.type == 'File') {
	            if (node.program.body.length > 0) {
	                node.program.body.reverse().forEach(item => {
	                    this.insertSiblingNode(item, 'before');
	                });
	                return this;
	            } else {
	                return this;
	            }
	        }
	        if (!Array.isArray(node)) {
	            node = [node];
	        }
	        node.reverse().forEach(n => {
	            this.insertSiblingNode(n, 'before');
	        });
	        return this;
	    }
	    insertChildNode(attr, node, type) {
	        if (!this[0] || !this[0].nodePath) {
	            return;
	        }
	        let selfNode = this[0].nodePath.value;
	        if (!Array.isArray(selfNode)) {
	            // for(let key in selfNode) {
	            //     if (Array.isArray(selfNode[key])) {
	            //         selfNode = selfNode[key]
	            //     }
	            // }
	            if (attr == 'content.children') {
	                selfNode = selfNode.content.children;
	            } else if (attr == 'program.body' && selfNode.program && selfNode.program.body) {
	                selfNode = selfNode.program.body;
	            } else {
	                selfNode = selfNode[attr];
	                if (!Array.isArray(selfNode)) {
	                    selfNode = selfNode.body;
	                }
	            }
	            
	        }

	        if (node.type == 'File' && node.program.body) {
	            node = node.program.body[0];
	            if (!node) return;
	        }
	        if (selfNode) {
	            if (type == 'append') {
	                selfNode.push(node);
	            } else {
	                selfNode.unshift(node);
	            }
	        }
	    }
	    append(attr, node) {
	        if (!attr) {
	            return this;
	        }
	        if (this.isHtml) {
	            node = attr;
	            attr = 'content.children';
	        }
	        if (!node) {
	            node = attr;
	            attr = 'program.body';
	        }
	        if (typeof node == 'string') {
	            node = this.core.buildAstByAstStr(node);
	        }
	        if (node[0] && node[0].nodePath) {
	            node = node[0].nodePath.value;
	        }
	        if (!Array.isArray(node)) {
	            node = [node];
	        }
	        node.forEach(n => {
	            this.insertChildNode(attr, n, 'append');
	        });
	        return this;

	    }
	    prepend(attr, node) {
	        if (this.isHtml) {
	            node = attr;
	            attr = 'content.children';
	        }
	        if (!node) {
	            node = attr;
	            attr = 'program.body';
	        }
	        if (typeof node == 'string') {
	            node = this.core.buildAstByAstStr(node);
	        }
	        if (node[0] && node[0].nodePath) {
	            node = node[0].nodePath.value;
	        }
	        if (!Array.isArray(node)) {
	            node = [node];
	        }
	        node.reverse().forEach(n => {
	            this.insertChildNode(attr, n, 'prepend');
	        });
	        return this;
	    }
	    empty() {
	        if (Array.isArray(this[0].nodePath.value)) {
	            this[0].nodePath.value = [];
	        } else if (this.node.type == 'File') {
	            this.attr('program.body', []);
	        }
	        return this
	    }
	    remove(selector, options = {}) {
	        if (!this[0]) {
	            return this.root()
	        }
	        if (typeof selector == 'string' || Array.isArray(selector)) {
	            const pOptions = options.parseOptions || this.parseOptions;
	            let i = 0;
	            while(this[i]) {
	                this.core.removeAst(this.node, selector, { 
	                    strictSequence: options.ignoreSequence === false, 
	                    parseOptions: pOptions, 
	                    expando: this.expando
	                });
	                i++;
	            }
	        } else {
	            let i = 0;
	            while(this[i]) {
	                this.core.remove(this[i].nodePath);
	                i++;
	            }
	            
	        }
	        return this.root()
	    }
	    generate({ isPretty = false } = {}) {
	        if (!this[0]) {
	            return '';
	        }
	        if (this.language == 'js') {
	            return generate(this[0].nodePath.node, isPretty)
	        } else {
	            return (languageMap[this.language].generate)(this[0].nodePath.value);
	        }
	    }
	}

	function cloneAST(ast) {
	    const newAST = new AST$1('', { parseOptions: ast.parseOptions, rootNode: ast.rootNode});
	    if (ast.sfc) {
	        newAST.sfc = ast.sfc;
	    }
	    return newAST
	}

	function getAttrValue(node, attr) {
	    const keyList = attr.split('.');
	    let currentNode = node;
	    let deep = 0;
	    keyList.forEach(attr => {
	        if (currentNode[attr]) {
	            currentNode = currentNode[attr];
	            deep++;
	        }
	    });
	    if (deep == keyList.length) {
	        return currentNode;
	    } else {
	        return null
	    }
	}

	function initParent(ast) {
	    if (ast.isHtml) {
	        ast[0].parentList =  ast.core.getParentListByAst(ast[0].nodePath);
	        ast[0]._index = ast[0].parentList[0] ? ast[0].parentList[0].node.content.children.indexOf(ast[0].nodePath.node) : 0;
	    } else {
	        ast[0].parentList =  core.getParentListByAst(ast[0].nodePath);
	    }
	    return ast[0].parentList
	}

	function initSiblings(ast) {
	    if (ast.language == 'html') {
	        const parent = ast.parent();
	        const siblings = (parent.attr('content.children') || []).map((node, index) => {
	            return {
	                _index: index,
	                nodePath: new NodePath$1(node, parent[0].nodePath, parent[0].nodePath),
	                parseOptions: ast.parseOptions
	            }
	        });
	        
	        ast[0].siblings = siblings;
	        ast[0].prevAll = siblings.filter(s => s._index < ast._index);
	        ast[0].nextAll = siblings.filter(s => s._index > ast._index);
	    } else {
	        const parentList = initParent(ast);
	        if (!parentList || parentList.length == 0) {
	            return;
	        }
	        const parseOptions = ast.parseOptions;
	        let getArrayParent = false;
	        let i = 0;
	        const siblings = [];
	        const prevAll = [];
	        const nextAll = [];
	        let selfPathNode = ast[0].nodePath.value;
	        while(!getArrayParent) {
	            if (!parentList[i] || !parentList[i].value) {
	                getArrayParent = true;
	            } else if (Array.isArray(parentList[i].value)) {
	                getArrayParent = true;
	                let isPrev = true;
	                let childIndex = 0;
	                while (parentList[i].__childCache[childIndex]) {
	                    const nodePath = parentList[i].__childCache[childIndex];
	                    if (nodePath.value == selfPathNode) {
	                        // find self
	                        isPrev = false;
	                    } else {
	                        siblings.push({ nodePath, parseOptions });
	                        if (isPrev) {
	                            prevAll.push({ nodePath, parseOptions });
	                        } else {
	                            nextAll.push({ nodePath, parseOptions });
	                        }
	                    }
	                    childIndex++;
	                }
	                ast[0].siblings = siblings;
	                ast[0].prevAll = prevAll;
	                ast[0].nextAll = nextAll;
	            }
	            selfPathNode = parentList[i].value;
	            i++;
	        }
	    }   
	}
	function setAttrValue(node, attrMap) {
	    for(const key in attrMap) {
	        const value = attrMap[key];
	        const keyList = key.split('.');
	        let currentNode = node;
	        keyList.forEach((attr, index) => {
	            if (index == keyList.length - 1) {
	                currentNode[attr] = value;
	            } else if (currentNode[attr]) {
	                currentNode = currentNode[attr];
	            }
	        });
	    }
	    
	}
	var Ast = AST$1;

	var empty = {};

	var empty$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': empty
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(empty$1);

	const fs$1 = require$$0;
	const code = function(filename = 'src/code/input.js') {
	    return fs$1.readFileSync(filename);
	};
	var readFile = code;

	// 写入code
	const fs = require$$0;
	const writeCode = function(code, filename = 'src/code/output.js') {
	    fs.writeFileSync(filename, code);
	    console.log(`write code to ${filename} success!`);
	};

	var writeFile$1 = writeCode;

	var name = "gogocode";
	var version = "1.0.7";
	var description = "The simplest tool to parse/transform/generate code on ast";
	var keywords = [
		"babel",
		"jscodeshift",
		"acorn",
		"babylon",
		"recast",
		"babel-generator",
		"babel-template",
		"babel-traverse",
		"babel-types",
		"esprima",
		"html-ast-transform",
		"htmlparser-to-html",
		"htmlparser2",
		"parse5",
		"ast"
	];
	var main$1 = "index.js";
	var browser = "umd/gogocode.js";
	var types = "types/index.d.ts";
	var scripts = {
		test: "jest --coverage",
		build: "rollup -c",
		prepublishOnly: "npm run build && npm run test"
	};
	var repository = {
		type: "git",
		url: "git@github.com:thx/gogocode.git"
	};
	var author = "yexi";
	var license = "ISC";
	var devDependencies = {
		"@rollup/plugin-commonjs": "^19.0.0",
		"@rollup/plugin-json": "^4.1.0",
		"@rollup/plugin-node-resolve": "^13.0.0",
		jest: "^26.6.3",
		lerna: "^3.22.1",
		rollup: "^2.52.3",
		"rollup-plugin-node-polyfills": "^0.2.1",
		"rollup-plugin-terser": "^7.0.2",
		typescript: "^3.5.2"
	};
	var dependencies = {
		"@babel/parser": "^7.7.7",
		glob: "^7.1.6",
		"hyntax-yx": "^1.0.3",
		"indent-string": "^4.0.0",
		recast: "^0.18.5",
		"vue3-browser-compiler-yx": "^1.0.1"
	};
	var jest = {
		collectCoverage: true,
		coverageDirectory: "./coverage/",
		collectCoverageFrom: [
			"src/**/*.js",
			"index.js",
			"!**/node_modules/**",
			"!src/browser.js",
			"!src/run-html-plugin.js",
			"!src/run-js-plugin.js",
			"!src/serialize-node.js",
			"!src/file-tool/read-file.js",
			"!src/file-tool/write-file.js",
			"!src/js-core/build-node.js",
			"!src/js-core/get-absolute-value.js"
		],
		testPathIgnorePatterns: [
			"/node_modules/"
		]
	};
	var require$$7 = {
		name: name,
		version: version,
		description: description,
		keywords: keywords,
		main: main$1,
		browser: browser,
		types: types,
		scripts: scripts,
		repository: repository,
		author: author,
		license: license,
		devDependencies: devDependencies,
		dependencies: dependencies,
		jest: jest
	};

	const jsCore = core_1$2;
	const htmlCore = core_1$1;
	const vueCore = core_1;
	const NodePath = NodePath_1;
	const AST = Ast;
	// const build = require('./build-node');
	const loadFile = readFile;
	const writeFile = writeFile$1;
	const pkg = require$$7;

	const langCoreMap = {
	    'vue': vueCore,
	    'html': htmlCore,
	    'js': jsCore
	};

	function getCore(parseOptions = {}) {
	    let core = jsCore;
	    if (parseOptions.language && langCoreMap[parseOptions.language]) {
	        core = langCoreMap[parseOptions.language];
	    }
	    if (parseOptions.html) {
	        core = htmlCore;
	        parseOptions.language = 'html';
	    }
	    return core
	}

	const main = (code, options = {}) => {
	    code = code || '';
	    let node;
	    let nodePath;
	    let parseOptions;
	    let astFragment;
	    let isProgram = 
	        options.isProgram === undefined || options.isProgram === true;
	    if (typeof options.parseOptions == 'object') {
	        parseOptions = options.parseOptions;
	    }

	    if (typeof options.astFragment == 'object') {
	        astFragment = options.astFragment;
	    }

	    if (typeof code == 'string') {
	        try {
	            const core = getCore(parseOptions);
	            node = core.buildAstByAstStr(
	                code,
	                astFragment,                 
	                {
	                    parseOptions,
	                    isProgram
	                }
	            );
	        } catch (e) {
	            return { 
	                src: code,
	                error: `Only correct js / html / vue could be parse successfully, please check the code or parseOptions!`
	            }
	        }
	        nodePath = new NodePath(node);
	    } else if (code.nodeType) {
	        nodePath = new NodePath(code);
	    } else if (code.type) {
	        // 传入ast node对象
	        nodePath = new NodePath(code);
	    } else if (code.node && code.parent) {
	        // 传入nodePath对象
	        nodePath = code;
	    } else {
	        throw new Error('$ failed! invalid input! accept code / ast node / nodePath');
	    }

	    let ast = new AST(nodePath, { parseOptions, rootNode: nodePath });
	    return ast;
	};

	main.loadFile = (filePath, { parseOptions } = {}) => {
	    const code = loadFile(filePath).toString();
	    return main(code, { parseOptions })
	};

	main.writeFile = writeFile;

	main.version = pkg.version;

	var $$1 = main;

	const $ = $$1;
	var gogocodeCore = $;

	return gogocodeCore;

})));
