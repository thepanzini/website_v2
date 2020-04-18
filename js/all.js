/*
 *
 *      ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ██╗   ██╗
 *      ██║██╔═══██╗██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝
 *      ██║██║   ██║██║   ██║█████╗  ██████╔╝ ╚████╔╝ 
 * ██   ██║██║▄▄ ██║██║   ██║██╔══╝  ██╔══██╗  ╚██╔╝  
 * ╚█████╔╝╚██████╔╝╚██████╔╝███████╗██║  ██║   ██║   
 *  ╚════╝  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   
 *                                                    
 *  ██████╗    ███████╗    ██████╗                     
 *  ╚════██╗   ██╔════╝   ██╔═████╗                    
 *   █████╔╝   ███████╗   ██║██╔██║                    
 *   ╚═══██╗   ╚════██║   ████╔╝██║                    
 *  ██████╔╝██╗███████║██╗╚██████╔╝                    
 *  ╚═════╝ ╚═╝╚══════╝╚═╝ ╚═════╝                     
 *                                                   
 */


/*!
 * jQuery JavaScript Library v3.5.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-04-10T15:07Z
 */
(function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
    // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
    // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
    // enough that all such attempts are guarded in a try block.
    "use strict";

    var arr = [];

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var flat = arr.flat ? function (array) {
        return arr.flat.call(array);
    } : function (array) {
        return arr.concat.apply([], array);
    };


    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);

    var support = {};

    var isFunction = function isFunction(obj) {

        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };


    var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };


    var document = window.document;



    var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
    };

    function DOMEval(code, node, doc) {
        doc = doc || document;

        var i, val,
            script = doc.createElement("script");

        script.text = code;
        if (node) {
            for (i in preservedScriptAttributes) {

                // Support: Firefox 64+, Edge 18+
                // Some browsers don't support the "nonce" property on scripts.
                // On the other hand, just using `getAttribute` is not enough as
                // the `nonce` attribute is reset to an empty string whenever it
                // becomes browsing-context connected.
                // See https://github.com/whatwg/html/issues/2369
                // See https://html.spec.whatwg.org/#nonce-attributes
                // The `node.getAttribute` check was added for the sake of
                // `jQuery.globalEval` so that it can fake a nonce-containing node
                // via an object.
                val = node[i] || node.getAttribute && node.getAttribute(i);
                if (val) {
                    script.setAttribute(i, val);
                }
            }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
    }


    function toType(obj) {
        if (obj == null) {
            return obj + "";
        }

        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }
    /* global Symbol */
    // Defining this global in .eslintrc.json would create a danger of using the global
    // unguarded in another place, it seems safer to define global only for this module



    var
        version = "3.5.0",

        // Define a local copy of jQuery
        jQuery = function (selector, context) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        };

    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {

            // Return all the elements in a clean array
            if (num == null) {
                return slice.call(this);
            }

            // Return just the one element from the set
            return num < 0 ? this[num + this.length] : this[num];
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        each: function (callback) {
            return jQuery.each(this, callback);
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        even: function () {
            return this.pushStack(jQuery.grep(this, function (_elem, i) {
                return (i + 1) % 2;
            }));
        },

        odd: function () {
            return this.pushStack(jQuery.grep(this, function (_elem, i) {
                return i % 2;
            }));
        },

        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function () {
            return this.prevObject || this.constructor();
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    copy = options[name];

                    // Prevent Object.prototype pollution
                    // Prevent never-ending loop
                    if (name === "__proto__" || target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                        src = target[name];

                        // Ensure proper type for the source value
                        if (copyIsArray && !Array.isArray(src)) {
                            clone = [];
                        } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                            clone = {};
                        } else {
                            clone = src;
                        }
                        copyIsArray = false;

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({

        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () { },

        isPlainObject: function (obj) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },

        isEmptyObject: function (obj) {
            var name;

            for (name in obj) {
                return false;
            }
            return true;
        },

        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function (code, options, doc) {
            DOMEval(code, {
                nonce: options && options.nonce
            }, doc);
        },

        each: function (obj, callback) {
            var length, i = 0;

            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }

            return obj;
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ? [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var length, value,
                i = 0,
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return flat(ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }

    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function (_i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

    function isArrayLike(obj) {

        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);

        if (isFunction(obj) || isWindow(obj)) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v2.3.5
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://js.foundation/
         *
         * Date: 2020-03-14
         */
        (function (window) {
            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                nonnativeSelectorCache = createCache(),
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                pushNative = arr.push,
                push = arr.push,
                slice = arr.slice,

                // Use a stripped-down indexOf as it's faster than native
                // https://jsperf.com/thor-indexof-vs-for/5
                indexOf = function (list, elem) {
                    var i = 0,
                        len = list.length;
                    for (; i < len; i++) {
                        if (list[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
                    "ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",

                // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
                identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
                    "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

                    // Operator (capture 2)
                    "*([*^$|!~]?=)" + whitespace +

                    // "Attribute values must be CSS identifiers [capture 5]
                    // or strings [capture 3 or capture 4]"
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
                    whitespace + "*\\]",

                pseudos = ":(" + identifier + ")(?:\\((" +

                    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                    // 1. quoted (capture 3; capture 4 or capture 5)
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

                    // 2. simple (capture 6)
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

                    // 3. anything else (capture 2)
                    ".*" +
                    ")\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
                    whitespace + "+$", "g"),

                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
                    "*"),
                rdescend = new RegExp(whitespace + "|>"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + identifier + ")"),
                    "CLASS": new RegExp("^\\.(" + identifier + ")"),
                    "TAG": new RegExp("^(" + identifier + "|[*])"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                        whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
                        whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),

                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace +
                        "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
                        "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },

                rhtml = /HTML$/i,
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,

                // CSS escapes
                // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
                funescape = function (escape, nonHex) {
                    var high = "0x" + escape.slice(1) - 0x10000;

                    return nonHex ?

                        // Strip the backslash prefix from a non-hex escape sequence
                        nonHex :

                        // Replace a hexadecimal escape sequence with the encoded Unicode code point
                        // Support: IE <=11+
                        // For values outside the Basic Multilingual Plane (BMP), manually construct a
                        // surrogate pair
                        high < 0 ?
                            String.fromCharCode(high + 0x10000) :
                            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                },

                // CSS string/identifier serialization
                // https://drafts.csswg.org/cssom/#common-serializing-idioms
                rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function (ch, asCodePoint) {
                    if (asCodePoint) {

                        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                        if (ch === "\0") {
                            return "\uFFFD";
                        }

                        // Control characters and (dependent upon position) numbers get escaped as code points
                        return ch.slice(0, -1) + "\\" +
                            ch.charCodeAt(ch.length - 1).toString(16) + " ";
                    }

                    // Other potentially-special ASCII characters get backslash-escaped
                    return "\\" + ch;
                },

                // Used for iframes
                // See setDocument()
                // Removing the function wrapper causes a "Permission Denied"
                // error in IE
                unloadHandler = function () {
                    setDocument();
                },

                inDisabledFieldset = addCombinator(
                    function (elem) {
                        return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
                    }, {
                    dir: "parentNode",
                    next: "legend"
                }
                );

            // Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call(preferredDoc.childNodes)),
                    preferredDoc.childNodes
                );

                // Support: Android<4.0
                // Detect silently failing push.apply
                // eslint-disable-next-line no-unused-expressions
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?

                        // Leverage slice if possible
                        function (target, els) {
                            pushNative.apply(target, slice.call(els));
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function (target, els) {
                            var j = target.length,
                                i = 0;

                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) { }
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector,
                    newContext = context && context.ownerDocument,

                    // nodeType defaults to 9, since context defaults to document
                    nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

                    return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {
                    setDocument(context);
                    context = context || document;

                    if (documentIsHTML) {

                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

                            // ID selector
                            if ((m = match[1])) {

                                // Document context
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {

                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }

                                    // Element context
                                } else {

                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if (newContext && (elem = newContext.getElementById(m)) &&
                                        contains(context, elem) &&
                                        elem.id === m) {

                                        results.push(elem);
                                        return results;
                                    }
                                }

                                // Type selector
                            } else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;

                                // Class selector
                            } else if ((m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName) {

                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }

                        // Take advantage of querySelectorAll
                        if (support.qsa &&
                            !nonnativeSelectorCache[selector + " "] &&
                            (!rbuggyQSA || !rbuggyQSA.test(selector)) &&

                            // Support: IE 8 only
                            // Exclude object elements
                            (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {

                            newSelector = selector;
                            newContext = context;

                            // qSA considers elements outside a scoping root when evaluating child or
                            // descendant combinators, which is not what we want.
                            // In such cases, we work around the behavior by prefixing every selector in the
                            // list with an ID selector referencing the scope context.
                            // The technique has to be used as well when a leading combinator is used
                            // as such selectors are not recognized by querySelectorAll.
                            // Thanks to Andrew Dupont for this technique.
                            if (nodeType === 1 &&
                                (rdescend.test(selector) || rcombinators.test(selector))) {

                                // Expand context for sibling selectors
                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;

                                // We can use :scope instead of the ID hack if the browser
                                // supports it & if we're not changing the context.
                                if (newContext !== context || !support.scope) {

                                    // Capture the context ID, setting it first if necessary
                                    if ((nid = context.getAttribute("id"))) {
                                        nid = nid.replace(rcssescape, fcssescape);
                                    } else {
                                        context.setAttribute("id", (nid = expando));
                                    }
                                }

                                // Prefix every selector in the list
                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = (nid ? "#" + nid : ":scope") + " " +
                                        toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");
                            }

                            try {
                                push.apply(results,
                                    newContext.querySelectorAll(newSelector)
                                );
                                return results;
                            } catch (qsaError) {
                                nonnativeSelectorCache(selector, true);
                            } finally {
                                if (nid === expando) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }

                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }

            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache(key, value) {

                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {

                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert(fn) {
                var el = document.createElement("fieldset");

                try {
                    return !!fn(el);
                } catch (e) {
                    return false;
                } finally {

                    // Remove from its parent by default
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }

                    // release memory in IE
                    el = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = arr.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        a.sourceIndex - b.sourceIndex;

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }

                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo(disabled) {

                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function (elem) {

                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ("form" in elem) {

                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if (elem.parentNode && elem.disabled === false) {

                            // Option elements defer to a parent optgroup if present
                            if ("label" in elem) {
                                if ("label" in elem.parentNode) {
                                    return elem.parentNode.disabled === disabled;
                                } else {
                                    return elem.disabled === disabled;
                                }
                            }

                            // Support: IE 6 - 11
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||

                                // Where there is no isDisabled, check manually
                                /* jshint -W018 */
                                elem.isDisabled !== !disabled &&
                                inDisabledFieldset(elem) === disabled;
                        }

                        return elem.disabled === disabled;

                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    } else if ("label" in elem) {
                        return elem.disabled === disabled;
                    }

                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

            // Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function (elem) {
                var namespace = elem.namespaceURI,
                    docElem = (elem.ownerDocument || elem).documentElement;

                // Support: IE <=8
                // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
                // https://bugs.jquery.com/ticket/4833
                return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function (node) {
                var hasCompare, subWindow,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);

                // Support: IE 9 - 11+, Edge 12 - 18+
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if (preferredDoc != document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow) {

                    // Support: IE 11, Edge
                    if (subWindow.addEventListener) {
                        subWindow.addEventListener("unload", unloadHandler, false);

                        // Support: IE 9 - 10 only
                    } else if (subWindow.attachEvent) {
                        subWindow.attachEvent("onunload", unloadHandler);
                    }
                }

                // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
                // Safari 4 - 5 only, Opera <=11.6 - 12.x only
                // IE/Edge & older browsers don't support the :scope pseudo-class.
                // Support: Safari 6.0 only
                // Safari 6.0 supports :scope but it's an alias of :root there.
                support.scope = assert(function (el) {
                    docElem.appendChild(el).appendChild(document.createElement("div"));
                    return typeof el.querySelectorAll !== "undefined" &&
                        !el.querySelectorAll(":scope fieldset div").length;
                });

                /* Attributes
                ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function (el) {
                    el.className = "i";
                    return !el.getAttribute("className");
                });

                /* getElement(s)By*
                ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (el) {
                    el.appendChild(document.createComment(""));
                    return !el.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (el) {
                    docElem.appendChild(el).id = expando;
                    return !document.getElementsByName || !document.getElementsByName(expando).length;
                });

                // ID filter and find
                if (support.getById) {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var elem = context.getElementById(id);
                            return elem ? [elem] : [];
                        }
                    };
                } else {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };

                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var node, i, elems,
                                elem = context.getElementById(id);

                            if (elem) {

                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }

                                // Fall back on getElementsByName
                                elems = context.getElementsByName(id);
                                i = 0;
                                while ((elem = elems[i++])) {
                                    node = elem.getAttributeNode("id");
                                    if (node && node.value === id) {
                                        return [elem];
                                    }
                                }
                            }

                            return [];
                        }
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== "undefined") {
                            return context.getElementsByTagName(tag);

                            // DocumentFragment nodes don't have gEBTN
                        } else if (support.qsa) {
                            return context.querySelectorAll(tag);
                        }
                    } :

                    function (tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,

                            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };

                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(document.querySelectorAll))) {

                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function (el) {

                        var input;

                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // https://bugs.jquery.com/ticket/12359
                        docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if (el.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!el.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }

                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=");
                        }

                        // Support: IE 11+, Edge 15 - 18+
                        // IE 11/Edge don't find elements on a `[name='']` query in some cases.
                        // Adding a temporary attribute to the document before the selection works
                        // around the issue.
                        // Interestingly, IE 10 & older don't seem to have the issue.
                        input = document.createElement("input");
                        input.setAttribute("name", "");
                        el.appendChild(input);
                        if (!el.querySelectorAll("[name='']").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" +
                                whitespace + "*(?:''|\"\")");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!el.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibling-combinator selector` fails
                        if (!el.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]");
                        }

                        // Support: Firefox <=3.6 - 5 only
                        // Old Firefox doesn't throw on a badly-escaped identifier.
                        el.querySelectorAll("\\\f");
                        rbuggyQSA.push("[\\r\\n\\f]");
                    });

                    assert(function (el) {
                        el.innerHTML = "<a href='' disabled='disabled'></a>" +
                            "<select disabled='disabled'><option/></select>";

                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        el.appendChild(input).setAttribute("name", "D");

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (el.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (el.querySelectorAll(":enabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Support: IE9-11+
                        // IE's :disabled selector does not pick up the children of disabled fieldsets
                        docElem.appendChild(el).disabled = true;
                        if (el.querySelectorAll(":disabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Support: Opera 10 - 11 only
                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                    docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector)))) {

                    assert(function (el) {

                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(el, "*");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(el, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
                ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (
                            adown.contains ?
                                adown.contains(bup) :
                                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                        ));
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function (a, b) {

                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        // Support: IE 11+, Edge 17 - 18+
                        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        compare = (a.ownerDocument || a) == (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                            // Choose the first element that is related to our preferred document
                            // Support: IE 11+, Edge 17 - 18+
                            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                            // two documents; shallow comparisons work.
                            // eslint-disable-next-line eqeqeq
                            if (a == document || a.ownerDocument == preferredDoc &&
                                contains(preferredDoc, a)) {
                                return -1;
                            }

                            // Support: IE 11+, Edge 17 - 18+
                            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                            // two documents; shallow comparisons work.
                            // eslint-disable-next-line eqeqeq
                            if (b == document || b.ownerDocument == preferredDoc &&
                                contains(preferredDoc, b)) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function (a, b) {

                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];

                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {

                            // Support: IE 11+, Edge 17 - 18+
                            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                            // two documents; shallow comparisons work.
                            /* eslint-disable eqeqeq */
                            return a == document ? -1 :
                                b == document ? 1 :
                                    /* eslint-enable eqeqeq */
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }

                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }

                        return i ?

                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :

                            // Otherwise nodes in our document sort first
                            // Support: IE 11+, Edge 17 - 18+
                            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                            // two documents; shallow comparisons work.
                            /* eslint-disable eqeqeq */
                            ap[i] == preferredDoc ? -1 :
                                bp[i] == preferredDoc ? 1 :
                                    /* eslint-enable eqeqeq */
                                    0;
                    };

                return document;
            };

            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function (elem, expr) {
                setDocument(elem);

                if (support.matchesSelector && documentIsHTML &&
                    !nonnativeSelectorCache[expr + " "] &&
                    (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                    try {
                        var ret = matches.call(elem, expr);

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||

                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) {
                        nonnativeSelectorCache(expr, true);
                    }
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
            };

            Sizzle.contains = function (context, elem) {

                // Set document vars if needed
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if ((context.ownerDocument || context) != document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };

            Sizzle.attr = function (elem, name) {

                // Set document vars if needed
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if ((elem.ownerDocument || elem) != document) {
                    setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],

                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                        fn(elem, name, !documentIsHTML) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute(name) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.escape = function (sel) {
                return (sel + "").replace(rcssescape, fcssescape);
            };

            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function (results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function (elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (!nodeType) {

                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {

                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {

                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {

                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }

                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },

                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[3] || match[4] ||
                            match[5] || "").replace(runescape, funescape);

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function (match) {

                        /* matches from matchExpr["CHILD"]
                            1 type (only|nth|...)
                            2 what (child|of-type)
                            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                            4 xn-component of xn+y argument ([+-]?\d*n|)
                            5 sign of xn-component
                            6 x of xn-component
                            7 sign of y-component
                            8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();

                        if (match[1].slice(0, 3) === "nth") {

                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ?
                                match[5] + (match[6] || 1) :
                                2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");

                            // other types prohibit arguments
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function (match) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if (unquoted && rpseudo.test(unquoted) &&

                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&

                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },

                filter: {

                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () {
                                return true;
                            } :
                            function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];

                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace +
                                ")" + className + "(" + whitespace + "|$)")) && classCache(
                                    className,
                                    function (elem) {
                                        return pattern.test(
                                            typeof elem.className === "string" && elem.className ||
                                            typeof elem.getAttribute !== "undefined" &&
                                            elem.getAttribute("class") ||
                                            ""
                                        );
                                    });
                    },

                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);

                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }

                            result += "";

                            /* eslint-disable max-len */

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf(check) === 0 :
                                        operator === "*=" ? check && result.indexOf(check) > -1 :
                                            operator === "$=" ? check && result.slice(-check.length) === check :
                                                operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                                    operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                        false;
                            /* eslint-enable max-len */

                        };
                    },

                    "CHILD": function (type, what, _argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :

                            function (elem, _context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = false;

                                if (parent) {

                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) {

                                                    return false;
                                                }
                                            }

                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [forward ? parent.firstChild : parent.lastChild];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {

                                        // Seek `elem` from a previously-cached index

                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});

                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[node.uniqueID] ||
                                            (outerCache[node.uniqueID] = {});

                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];

                                        while ((node = ++nodeIndex && node && node[dir] ||

                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop())) {

                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }

                                    } else {

                                        // Use previously-cached element index if available
                                        if (useCache) {

                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[node.uniqueID] ||
                                                (outerCache[node.uniqueID] = {});

                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }

                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if (diff === false) {

                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {

                                                if ((ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) &&
                                                    ++diff) {

                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        outerCache = node[expando] ||
                                                            (node[expando] = {});

                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[node.uniqueID] ||
                                                            (outerCache[node.uniqueID] = {});

                                                        uniqueCache[type] = [dirruns, diff];
                                                    }

                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0);
                                }
                            };
                    },

                    "PSEUDO": function (pseudo, argument) {

                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                                Sizzle.error("unsupported pseudo: " + pseudo);

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }

                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {

                    // Potentially complex pseudos
                    "not": markFunction(function (selector) {

                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));

                        return matcher[expando] ?
                            markFunction(function (seed, matches, _context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, _context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);

                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),

                    "contains": markFunction(function (text) {
                        text = text.replace(runescape, funescape);
                        return function (elem) {
                            return (elem.textContent || getText(elem)).indexOf(text) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function (lang) {

                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                    elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },

                    "root": function (elem) {
                        return elem === docElem;
                    },

                    "focus": function (elem) {
                        return elem === document.activeElement &&
                            (!document.hasFocus || document.hasFocus()) &&
                            !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": createDisabledPseudo(false),
                    "disabled": createDisabledPseudo(true),

                    "checked": function (elem) {

                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) ||
                            (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function (elem) {

                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            // eslint-disable-next-line no-unused-expressions
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function (elem) {

                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem);
                    },

                    // Element/input types
                    "header": function (elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "input": function (elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "button": function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function (elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null ||
                                attr.toLowerCase() === "text");
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function () {
                        return [0];
                    }),

                    "last": createPositionalPseudo(function (_matchIndexes, length) {
                        return [length - 1];
                    }),

                    "eq": createPositionalPseudo(function (_matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),

                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ?
                            argument + length :
                            argument > length ?
                                length :
                                argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

            // Add button/input type pseudos
            for (i in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in {
                submit: true,
                reset: true
            }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }

            // Easy API for creating new setFilters
            function setFilters() { }
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[selector + " "];

                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {

                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {

                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }

                    matched = false;

                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,

                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }

                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                            (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }

                    if (!matched) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error(selector) :

                        // Cache the tokens
                        tokenCache(selector, groups).slice(0);
            };

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    skip = combinator.next,
                    key = skip || dir,
                    checkNonElements = base && key === "parentNode",
                    doneName = done++;

                return combinator.first ?

                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                        return false;
                    } :

                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var oldCache, uniqueCache, outerCache,
                            newCache = [dirruns, doneName];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});

                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[elem.uniqueID] ||
                                        (outerCache[elem.uniqueID] = {});

                                    if (skip && skip === elem.nodeName.toLowerCase()) {
                                        elem = elem[dir] || elem;
                                    } else if ((oldCache = uniqueCache[key]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    } else {

                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[key] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts(
                            selector || "*",
                            context.nodeType ? [context] : context,
                            []
                        ),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && (seed || !selector) ?
                            condense(elems, preMap, preFilter, context, xml) :
                            elems,

                        matcherOut = matcher ?

                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || (seed ? preFilter : preexisting || postFilter) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }

                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }

                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {

                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {

                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice(preexisting, matcherOut.length) :
                                matcherOut
                        );
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }

            function matcherFromTokens(tokens) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator(function (elem) {
                        return elem === checkContext;
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function (elem) {
                        return indexOf(checkContext, elem) > -1;
                    }, implicitRelative, true),
                    matchers = [function (elem, context, xml) {
                        var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
                            (checkContext = context).nodeType ?
                                matchContext(elem, context, xml) :
                                matchAnyContext(elem, context, xml));

                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    }];

                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {

                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher(matchers),
                                i > 1 && toSelector(

                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens
                                        .slice(0, i - 1)
                                        .concat({
                                            value: tokens[i - 2].type === " " ? "*" : ""
                                        })
                                ).replace(rtrim, "$1"),
                                matcher,
                                i < j && matcherFromTokens(tokens.slice(i, j)),
                                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                j < len && toSelector(tokens)
                            );
                        }
                        matchers.push(matcher);
                    }
                }

                return elementMatcher(matchers);
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function (seed, context, xml, results, outermost) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,

                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]("*", outermost),

                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if (outermost) {

                            // Support: IE 11+, Edge 17 - 18+
                            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                            // two documents; shallow comparisons work.
                            // eslint-disable-next-line eqeqeq
                            outermostContext = context == document || context || outermost;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for (; i !== len && (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;

                                // Support: IE 11+, Edge 17 - 18+
                                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                                // two documents; shallow comparisons work.
                                // eslint-disable-next-line eqeqeq
                                if (!context && elem.ownerDocument != document) {
                                    setDocument(elem);
                                    xml = !documentIsHTML;
                                }
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context || document, xml)) {
                                        results.push(elem);
                                        break;
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if (bySet) {

                                // They will have gone through all possible matchers
                                if ((elem = !matcher && elem)) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if (seed) {
                                    unmatched.push(elem);
                                }
                            }
                        }

                        // `i` is now the count of elements visited above, and adding it to `matchedCount`
                        // makes the latter nonnegative.
                        matchedCount += i;

                        // Apply set filters to unmatched elements
                        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                        // no element matchers and no seed.
                        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                        // numerically zero.
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml);
                            }

                            if (seed) {

                                // Reintegrate element matches to eliminate the need for sorting
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results);
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense(setMatched);
                            }

                            // Add matches to results
                            push.apply(results, setMatched);

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if (outermost && !seed && setMatched.length > 0 &&
                                (matchedCount + setMatchers.length) > 1) {

                                Sizzle.uniqueSort(results);
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }

            compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];

                if (!cached) {

                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache(
                        selector,
                        matcherFromGroupMatchers(elementMatchers, setMatchers)
                    );

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function (selector, context, results, seed) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize((selector = compiled.selector || selector));

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {

                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

                        context = (Expr.find["ID"](token.matches[0]
                            .replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if (compiled) {
                            context = context.parentNode;
                        }

                        selector = selector.slice(tokens.shift().value.length);
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {

                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(
                                token.matches[0].replace(runescape, funescape),
                                rsibling.test(tokens[0].type) && testContext(context.parentNode) ||
                                context
                            ))) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    !context || rsibling.test(selector) && testContext(context.parentNode) || context
                );
                return results;
            };

            // One-time assignments

            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

            // Support: Chrome 14-35+
            // Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

            // Initialize against the default document
            setDocument();

            // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (el) {

                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
            });

            // Support: IE<8
            // Prevent attribute/property "interpolation"
            // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function (el) {
                el.innerHTML = "<a href='#'></a>";
                return el.firstChild.getAttribute("href") === "#";
            })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }

            // Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function (el) {
                el.innerHTML = "<input/>";
                el.firstChild.setAttribute("value", "");
                return el.firstChild.getAttribute("value") === "";
            })) {
                addHandle("value", function (elem, _name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }

            // Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function (el) {
                return el.getAttribute("disabled") == null;
            })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })(window);



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

    // Deprecated
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;




    var dir = function (elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    };


    var siblings = function (n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }

        return matched;
    };


    var rneedsContext = jQuery.expr.match.needsContext;



    function nodeName(elem, name) {

        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

    };
    var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);



    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }

        // Single element
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return (elem === qualifier) !== not;
            });
        }

        // Arraylike of elements (jQuery, arguments, Array)
        if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function (elem) {
                return (indexOf.call(qualifier, elem) > -1) !== not;
            });
        }

        // Filtered directly for both simple and complex selectors
        return jQuery.filter(qualifier, elements, not);
    }

    jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ":not(" + expr + ")";
        }

        if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }

        return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
            return elem.nodeType === 1;
        }));
    };

    jQuery.fn.extend({
        find: function (selector) {
            var i, ret,
                len = this.length,
                self = this;

            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }

            ret = this.pushStack([]);

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function (selector) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                    jQuery(selector) :
                    selector || [],
                false
            ).length;
        }
    });


    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

        init = jQuery.fn.init = function (selector, context, root) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector[0] === "<" &&
                    selector[selector.length - 1] === ">" &&
                    selector.length >= 3) {

                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {

                                // Properties of context are called as methods if possible
                                if (isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        if (elem) {

                            // Inject the element directly into the jQuery object
                            this[0] = elem;
                            this.length = 1;
                        }
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return (context || root).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (isFunction(selector)) {
                return root.ready !== undefined ?
                    root.ready(selector) :

                    // Execute immediately if ready is not present
                    selector(jQuery);
            }

            return jQuery.makeArray(selector, this);
        };

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.fn.extend({
        has: function (target) {
            var targets = jQuery(target, this),
                l = targets.length;

            return this.filter(function () {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        closest: function (selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== "string" && jQuery(selectors);

            // Positional selectors never match, since there's no _selection_ context
            if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

                        // Always skip document fragments
                        if (cur.nodeType < 11 && (targets ?
                            targets.index(cur) > -1 :

                            // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors))) {

                            matched.push(cur);
                            break;
                        }
                    }
                }
            }

            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },

        // Determine the position of an element within the set
        index: function (elem) {

            // No argument, return index in parent
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }

            // Locate the position of the desired element
            return indexOf.call(this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem
            );
        },

        add: function (selector, context) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge(this.get(), jQuery(selector, context))
                )
            );
        },

        addBack: function (selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) { }
        return cur;
    }

    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function (elem, _i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function (elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function (elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function (elem, _i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, _i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function (elem) {
            return siblings(elem.firstChild);
        },
        contents: function (elem) {
            if (elem.contentDocument != null &&

                // Support: IE 11+
                // <object> elements with no `data` attribute has an object
                // `contentDocument` with a `null` prototype.
                getProto(elem.contentDocument)) {

                return elem.contentDocument;
            }

            // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
            // Treat the template element as a regular one in browsers that
            // don't support it.
            if (nodeName(elem, "template")) {
                elem = elem.content || elem;
            }

            return jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var matched = jQuery.map(this, fn, until);

            if (name.slice(-5) !== "Until") {
                selector = until;
            }

            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }

            if (this.length > 1) {

                // Remove duplicates
                if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched);
                }

                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }

            return this.pushStack(matched);
        };
    });
    var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);



    // Convert String-formatted options into Object-formatted ones
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            createOptions(options) :
            jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,

            // Last fire value for non-forgettable lists
            memory,

            // Flag to know if list was already fired
            fired,

            // Flag to prevent firing
            locked,

            // Actual callback list
            list = [],

            // Queue of execution data for repeatable lists
            queue = [],

            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,

            // Fire callbacks
            fire = function () {

                // Enforce single-firing
                locked = locked || options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {

                        // Run callback and check for early termination
                        if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse) {

                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if (locked) {

                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];

                        // Otherwise, this object is spent
                    } else {
                        list = "";
                    }
                }
            },

            // Actual Callbacks object
            self = {

                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {

                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }

                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && toType(arg) !== "string") {

                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);

                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Remove a callback from the list
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);

                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ?
                        jQuery.inArray(fn, list) > -1 :
                        list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function () {
                    return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                    locked = queue = [];
                    if (!memory && !firing) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };

        return self;
    };


    function Identity(v) {
        return v;
    }

    function Thrower(ex) {
        throw ex;
    }

    function adoptValue(value, resolve, reject, noValue) {
        var method;

        try {

            // Check for promise aspect first to privilege synchronous behavior
            if (value && isFunction((method = value.promise))) {
                method.call(value).done(resolve).fail(reject);

                // Other thenables
            } else if (value && isFunction((method = value.then))) {
                method.call(value, resolve, reject);

                // Other non-thenables
            } else {

                // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                // * false: [ value ].slice( 0 ) => resolve( value )
                // * true: [ value ].slice( 1 ) => resolve()
                resolve.apply(undefined, [value].slice(noValue));
            }

            // For Promises/A+, convert exceptions into rejections
            // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
            // Deferred#then to conditionally suppress rejection.
        } catch (value) {

            // Support: Android 4.0 only
            // Strict mode functions invoked without .call/.apply get global-object context
            reject.apply(undefined, [value]);
        }
    }

    jQuery.extend({

        Deferred: function (func) {
            var tuples = [

                // action, add listener, callbacks,
                // ... .then handlers, argument index, [final state]
                ["notify", "progress", jQuery.Callbacks("memory"),
                    jQuery.Callbacks("memory"), 2
                ],
                ["resolve", "done", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 0, "resolved"
                ],
                ["reject", "fail", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 1, "rejected"
                ]
            ],
                state = "pending",
                promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    "catch": function (fn) {
                        return promise.then(null, fn);
                    },

                    // Keep pipe for back-compat
                    pipe: function ( /* fnDone, fnFail, fnProgress */) {
                        var fns = arguments;

                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (_i, tuple) {

                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && isFunction(returned.promise)) {
                                        returned.promise()
                                            .progress(newDefer.notify)
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject);
                                    } else {
                                        newDefer[tuple[0] + "With"](
                                            this,
                                            fn ? [returned] : arguments
                                        );
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    then: function (onFulfilled, onRejected, onProgress) {
                        var maxDepth = 0;

                        function resolve(depth, deferred, handler, special) {
                            return function () {
                                var that = this,
                                    args = arguments,
                                    mightThrow = function () {
                                        var returned, then;

                                        // Support: Promises/A+ section 2.3.3.3.3
                                        // https://promisesaplus.com/#point-59
                                        // Ignore double-resolution attempts
                                        if (depth < maxDepth) {
                                            return;
                                        }

                                        returned = handler.apply(that, args);

                                        // Support: Promises/A+ section 2.3.1
                                        // https://promisesaplus.com/#point-48
                                        if (returned === deferred.promise()) {
                                            throw new TypeError("Thenable self-resolution");
                                        }

                                        // Support: Promises/A+ sections 2.3.3.1, 3.5
                                        // https://promisesaplus.com/#point-54
                                        // https://promisesaplus.com/#point-75
                                        // Retrieve `then` only once
                                        then = returned &&

                                            // Support: Promises/A+ section 2.3.4
                                            // https://promisesaplus.com/#point-64
                                            // Only check objects and functions for thenability
                                            (typeof returned === "object" ||
                                                typeof returned === "function") &&
                                            returned.then;

                                        // Handle a returned thenable
                                        if (isFunction(then)) {

                                            // Special processors (notify) just wait for resolution
                                            if (special) {
                                                then.call(
                                                    returned,
                                                    resolve(maxDepth, deferred, Identity, special),
                                                    resolve(maxDepth, deferred, Thrower, special)
                                                );

                                                // Normal processors (resolve) also hook into progress
                                            } else {

                                                // ...and disregard older resolution values
                                                maxDepth++;

                                                then.call(
                                                    returned,
                                                    resolve(maxDepth, deferred, Identity, special),
                                                    resolve(maxDepth, deferred, Thrower, special),
                                                    resolve(maxDepth, deferred, Identity,
                                                        deferred.notifyWith)
                                                );
                                            }

                                            // Handle all other returned values
                                        } else {

                                            // Only substitute handlers pass on context
                                            // and multiple values (non-spec behavior)
                                            if (handler !== Identity) {
                                                that = undefined;
                                                args = [returned];
                                            }

                                            // Process the value(s)
                                            // Default process is resolve
                                            (special || deferred.resolveWith)(that, args);
                                        }
                                    },

                                    // Only normal processors (resolve) catch and reject exceptions
                                    process = special ?
                                        mightThrow :
                                        function () {
                                            try {
                                                mightThrow();
                                            } catch (e) {

                                                if (jQuery.Deferred.exceptionHook) {
                                                    jQuery.Deferred.exceptionHook(e,
                                                        process.stackTrace);
                                                }

                                                // Support: Promises/A+ section 2.3.3.3.4.1
                                                // https://promisesaplus.com/#point-61
                                                // Ignore post-resolution exceptions
                                                if (depth + 1 >= maxDepth) {

                                                    // Only substitute handlers pass on context
                                                    // and multiple values (non-spec behavior)
                                                    if (handler !== Thrower) {
                                                        that = undefined;
                                                        args = [e];
                                                    }

                                                    deferred.rejectWith(that, args);
                                                }
                                            }
                                        };

                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if (depth) {
                                    process();
                                } else {

                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if (jQuery.Deferred.getStackHook) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout(process);
                                }
                            };
                        }

                        return jQuery.Deferred(function (newDefer) {

                            // progress_handlers.add( ... )
                            tuples[0][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction(onProgress) ?
                                        onProgress :
                                        Identity,
                                    newDefer.notifyWith
                                )
                            );

                            // fulfilled_handlers.add( ... )
                            tuples[1][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction(onFulfilled) ?
                                        onFulfilled :
                                        Identity
                                )
                            );

                            // rejected_handlers.add( ... )
                            tuples[2][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction(onRejected) ?
                                        onRejected :
                                        Thrower
                                )
                            );
                        }).promise();
                    },

                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Add list-specific methods
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[5];

                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(
                        function () {

                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        },

                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[3 - i][2].disable,

                        // rejected_handlers.disable
                        // fulfilled_handlers.disable
                        tuples[3 - i][3].disable,

                        // progress_callbacks.lock
                        tuples[0][2].lock,

                        // progress_handlers.lock
                        tuples[0][3].lock
                    );
                }

                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add(tuple[3].fire);

                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                    return this;
                };

                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function (singleValue) {
            var

                // count of uncompleted subordinates
                remaining = arguments.length,

                // count of unprocessed arguments
                i = remaining,

                // subordinate fulfillment data
                resolveContexts = Array(i),
                resolveValues = slice.call(arguments),

                // the master Deferred
                master = jQuery.Deferred(),

                // subordinate callback factory
                updateFunc = function (i) {
                    return function (value) {
                        resolveContexts[i] = this;
                        resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (!(--remaining)) {
                            master.resolveWith(resolveContexts, resolveValues);
                        }
                    };
                };

            // Single- and empty arguments are adopted like Promise.resolve
            if (remaining <= 1) {
                adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject,
                    !remaining);

                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if (master.state() === "pending" ||
                    isFunction(resolveValues[i] && resolveValues[i].then)) {

                    return master.then();
                }
            }

            // Multiple arguments are aggregated like Promise.all array elements
            while (i--) {
                adoptValue(resolveValues[i], updateFunc(i), master.reject);
            }

            return master.promise();
        }
    });


    // These usually indicate a programmer mistake during development,
    // warn about them ASAP rather than swallowing them by default.
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

    jQuery.Deferred.exceptionHook = function (error, stack) {

        // Support: IE 8 - 9 only
        // Console exists when dev tools are open, which can happen at any time
        if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
            window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }
    };




    jQuery.readyException = function (error) {
        window.setTimeout(function () {
            throw error;
        });
    };




    // The deferred used on DOM ready
    var readyList = jQuery.Deferred();

    jQuery.fn.ready = function (fn) {

        readyList
            .then(fn)

            // Wrap jQuery.readyException in a function so that the lookup
            // happens at the time of error handling instead of callback
            // registration.
            .catch(function (error) {
                jQuery.readyException(error);
            });

        return this;
    };

    jQuery.extend({

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Handle when the DOM is ready
        ready: function (wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);
        }
    });

    jQuery.ready.then = readyList.then;

    // The ready event handler and self cleanup method
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        jQuery.ready();
    }

    // Catch cases where $(document).ready() is called
    // after the browser event has already occurred.
    // Support: IE <=9 - 10 only
    // Older IE sometimes signals "interactive" too soon
    if (document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(jQuery.ready);

    } else {

        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed);
    }




    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        if (toType(key) === "object") {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
        } else if (value !== undefined) {
            chainable = true;

            if (!isFunction(value)) {
                raw = true;
            }

            if (bulk) {

                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function (elem, _key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < len; i++) {
                    fn(
                        elems[i], key, raw ?
                        value :
                        value.call(elems[i], i, fn(elems[i], key))
                    );
                }
            }
        }

        if (chainable) {
            return elems;
        }

        // Gets
        if (bulk) {
            return fn.call(elems);
        }

        return len ? fn(elems[0], key) : emptyGet;
    };


    // Matches dashed string for camelizing
    var rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g;

    // Used by camelCase as callback to replace()
    function fcamelCase(_all, letter) {
        return letter.toUpperCase();
    }

    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE <=9 - 11, Edge 12 - 15
    // Microsoft forgot to hump their vendor prefix (#9572)
    function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    var acceptData = function (owner) {

        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    };




    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {

        cache: function (owner) {

            // Check if the owner object already has a cache
            var value = owner[this.expando];

            // If not, create one
            if (!value) {
                value = Object.create(null);

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if (acceptData(owner)) {

                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if (owner.nodeType) {
                        owner[this.expando] = value;

                        // Otherwise secure it in a non-enumerable property
                        // configurable must be true to allow the property to be
                        // deleted when data is removed
                    } else {
                        Object.defineProperty(owner, this.expando, {
                            value: value,
                            configurable: true
                        });
                    }
                }
            }

            return value;
        },
        set: function (owner, data, value) {
            var prop,
                cache = this.cache(owner);

            // Handle: [ owner, key, value ] args
            // Always use camelCase key (gh-2257)
            if (typeof data === "string") {
                cache[camelCase(data)] = value;

                // Handle: [ owner, { properties } ] args
            } else {

                // Copy the properties one-by-one to the cache object
                for (prop in data) {
                    cache[camelCase(prop)] = data[prop];
                }
            }
            return cache;
        },
        get: function (owner, key) {
            return key === undefined ?
                this.cache(owner) :

                // Always use camelCase key (gh-2257)
                owner[this.expando] && owner[this.expando][camelCase(key)];
        },
        access: function (owner, key, value) {

            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if (key === undefined ||
                ((key && typeof key === "string") && value === undefined)) {

                return this.get(owner, key);
            }

            // When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set(owner, key, value);

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function (owner, key) {
            var i,
                cache = owner[this.expando];

            if (cache === undefined) {
                return;
            }

            if (key !== undefined) {

                // Support array or space separated string of keys
                if (Array.isArray(key)) {

                    // If key is an array of keys...
                    // We always set camelCase keys, so remove that.
                    key = key.map(camelCase);
                } else {
                    key = camelCase(key);

                    // If a key with the spaces exists, use it.
                    // Otherwise, create an array by matching non-whitespace
                    key = key in cache ? [key] :
                        (key.match(rnothtmlwhite) || []);
                }

                i = key.length;

                while (i--) {
                    delete cache[key[i]];
                }
            }

            // Remove the expando if there's no more data
            if (key === undefined || jQuery.isEmptyObject(cache)) {

                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if (owner.nodeType) {
                    owner[this.expando] = undefined;
                } else {
                    delete owner[this.expando];
                }
            }
        },
        hasData: function (owner) {
            var cache = owner[this.expando];
            return cache !== undefined && !jQuery.isEmptyObject(cache);
        }
    };
    var dataPriv = new Data();

    var dataUser = new Data();



    //	Implementation Summary
    //
    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
    //	2. Improve the module's maintainability by reducing the storage
    //		paths to a single mechanism.
    //	3. Use the same single mechanism to support "private" and "user" data.
    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;

    function getData(data) {
        if (data === "true") {
            return true;
        }

        if (data === "false") {
            return false;
        }

        if (data === "null") {
            return null;
        }

        // Only convert to a number if it doesn't change the string
        if (data === +data + "") {
            return +data;
        }

        if (rbrace.test(data)) {
            return JSON.parse(data);
        }

        return data;
    }

    function dataAttr(elem, key, data) {
        var name;

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = getData(data);
                } catch (e) { }

                // Make sure we set the data so it isn't changed later
                dataUser.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    jQuery.extend({
        hasData: function (elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },

        data: function (elem, name, data) {
            return dataUser.access(elem, name, data);
        },

        removeData: function (elem, name) {
            dataUser.remove(elem, name);
        },

        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function (elem, name, data) {
            return dataPriv.access(elem, name, data);
        },

        _removeData: function (elem, name) {
            dataPriv.remove(elem, name);
        }
    });

    jQuery.fn.extend({
        data: function (key, value) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = dataUser.get(elem);

                    if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {

                            // Support: IE 11 only
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        dataPriv.set(elem, "hasDataAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function () {
                    dataUser.set(this, key);
                });
            }

            return access(this, function (value) {
                var data;

                // The calling jQuery object (element matches) is not empty
                // (and therefore has an element appears at this[ 0 ]) and the
                // `value` parameter was not undefined. An empty jQuery object
                // will result in `undefined` for elem = this[ 0 ] which will
                // throw an exception if an attempt to read a data cache is made.
                if (elem && value === undefined) {

                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr(elem, key);
                    if (data !== undefined) {
                        return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                }

                // Set the data...
                this.each(function () {

                    // We always store the camelCased key
                    dataUser.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, true);
        },

        removeData: function (key) {
            return this.each(function () {
                dataUser.remove(this, key);
            });
        }
    });


    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;

            if (elem) {
                type = (type || "fx") + "queue";
                queue = dataPriv.get(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || Array.isArray(data)) {
                        queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function (elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    dataPriv.remove(elem, [type + "queue", key]);
                })
            });
        }
    });

    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function () {
                    var queue = jQuery.queue(this, type, data);

                    // Ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },

        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function (type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = dataPriv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var documentElement = document.documentElement;



    var isAttached = function (elem) {
        return jQuery.contains(elem.ownerDocument, elem);
    },
        composed = {
            composed: true
        };

    // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
    // Check attachment across shadow DOM boundaries when possible (gh-3504)
    // Support: iOS 10.0-10.2 only
    // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
    // leading to errors. We need to check for `getRootNode`.
    if (documentElement.getRootNode) {
        isAttached = function (elem) {
            return jQuery.contains(elem.ownerDocument, elem) ||
                elem.getRootNode(composed) === elem.ownerDocument;
        };
    }
    var isHiddenWithinTree = function (elem, el) {

        // isHiddenWithinTree might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;

        // Inline style trumps all
        return elem.style.display === "none" ||
            elem.style.display === "" &&

            // Otherwise, check computed style
            // Support: Firefox <=43 - 45
            // Disconnected elements can have computed display: none, so first confirm that elem is
            // in the document.
            isAttached(elem) &&

            jQuery.css(elem, "display") === "none";
    };



    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale,
            maxIterations = 20,
            currentValue = tween ?
                function () {
                    return tween.cur();
                } :
                function () {
                    return jQuery.css(elem, prop, "");
                },
            initial = currentValue(),
            unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

            // Starting value computation is required for potential unit mismatches
            initialInUnit = elem.nodeType &&
                (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
                rcssNum.exec(jQuery.css(elem, prop));

        if (initialInUnit && initialInUnit[3] !== unit) {

            // Support: Firefox <=54
            // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
            initial = initial / 2;

            // Trust units reported by jQuery.css
            unit = unit || initialInUnit[3];

            // Iteratively approximate from a nonzero starting point
            initialInUnit = +initial || 1;

            while (maxIterations--) {

                // Evaluate and update our best guess (doubling guesses that zero out).
                // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
                jQuery.style(elem, prop, initialInUnit + unit);
                if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                    maxIterations = 0;
                }
                initialInUnit = initialInUnit / scale;

            }

            initialInUnit = initialInUnit * 2;
            jQuery.style(elem, prop, initialInUnit + unit);

            // Make sure we update the tween properties later on
            valueParts = valueParts || [];
        }

        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;

            // Apply relative offset (+=/-=) if specified
            adjusted = valueParts[1] ?
                initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }


    var defaultDisplayMap = {};

    function getDefaultDisplay(elem) {
        var temp,
            doc = elem.ownerDocument,
            nodeName = elem.nodeName,
            display = defaultDisplayMap[nodeName];

        if (display) {
            return display;
        }

        temp = doc.body.appendChild(doc.createElement(nodeName));
        display = jQuery.css(temp, "display");

        temp.parentNode.removeChild(temp);

        if (display === "none") {
            display = "block";
        }
        defaultDisplayMap[nodeName] = display;

        return display;
    }

    function showHide(elements, show) {
        var display, elem,
            values = [],
            index = 0,
            length = elements.length;

        // Determine new display value for elements that need to change
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }

            display = elem.style.display;
            if (show) {

                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if (display === "none") {
                    values[index] = dataPriv.get(elem, "display") || null;
                    if (!values[index]) {
                        elem.style.display = "";
                    }
                }
                if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                    values[index] = getDefaultDisplay(elem);
                }
            } else {
                if (display !== "none") {
                    values[index] = "none";

                    // Remember what we're overwriting
                    dataPriv.set(elem, "display", display);
                }
            }
        }

        // Set the display of the elements in a second loop to avoid constant reflow
        for (index = 0; index < length; index++) {
            if (values[index] != null) {
                elements[index].style.display = values[index];
            }
        }

        return elements;
    }

    jQuery.fn.extend({
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }

            return this.each(function () {
                if (isHiddenWithinTree(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    var rcheckableType = (/^(?:checkbox|radio)$/i);

    var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);

    var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);



    (function () {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild(document.createElement("div")),
            input = document.createElement("input");

        // Support: Android 4.0 - 4.3 only
        // Check state lost if the name is set (#11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");

        div.appendChild(input);

        // Support: Android <=4.1 only
        // Older WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

        // Support: IE <=11 only
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

        // Support: IE <=9 only
        // IE <=9 replaces <option> tags with their contents when inserted outside of
        // the select element.
        div.innerHTML = "<option></option>";
        support.option = !!div.lastChild;
    })();


    // We have to close these tags to support XHTML (#13200)
    var wrapMap = {

        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

        _default: [0, "", ""]
    };

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    // Support: IE <=9 only
    if (!support.option) {
        wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
    }


    function getAll(context, tag) {

        // Support: IE <=9 - 11 only
        // Use typeof to avoid zero-argument method invocation on host objects (#15151)
        var ret;

        if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");

        } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");

        } else {
            ret = [];
        }

        if (tag === undefined || tag && nodeName(context, tag)) {
            return jQuery.merge([context], ret);
        }

        return ret;
    }


    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var i = 0,
            l = elems.length;

        for (; i < l; i++) {
            dataPriv.set(
                elems[i],
                "globalEval",
                !refElements || dataPriv.get(refElements[i], "globalEval")
            );
        }
    }


    var rhtml = /<|&#?\w+;/;

    function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, attached, j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;

        for (; i < l; i++) {
            elem = elems[i];

            if (elem || elem === 0) {

                // Add nodes directly
                if (toType(elem) === "object") {

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                    // Convert non-html into a text node
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));

                    // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));

                    // Deserialize a standard representation
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

                    // Descend through wrappers to the right content
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge(nodes, tmp.childNodes);

                    // Remember the top-level container
                    tmp = fragment.firstChild;

                    // Ensure the created nodes are orphaned (#12392)
                    tmp.textContent = "";
                }
            }
        }

        // Remove wrapper from fragment
        fragment.textContent = "";

        i = 0;
        while ((elem = nodes[i++])) {

            // Skip elements already in the context collection (trac-4087)
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }
                continue;
            }

            attached = isAttached(elem);

            // Append to fragment
            tmp = getAll(fragment.appendChild(elem), "script");

            // Preserve script evaluation history
            if (attached) {
                setGlobalEval(tmp);
            }

            // Capture executables
            if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                    if (rscriptType.test(elem.type || "")) {
                        scripts.push(elem);
                    }
                }
            }
        }

        return fragment;
    }


    var
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    // Support: IE <=9 - 11+
    // focus() and blur() are asynchronous, except when they are no-op.
    // So expect focus to be synchronous when the element is already active,
    // and blur to be synchronous when the element is not already active.
    // (focus and blur are always synchronous in other supported browsers,
    // this just defines when we can count on it).
    function expectSync(elem, type) {
        return (elem === safeActiveElement()) === (type === "focus");
    }

    // Support: IE <=9 only
    // Accessing document.activeElement can throw unexpectedly
    // https://bugs.jquery.com/ticket/13393
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) { }
    }

    function on(elem, types, selector, data, fn, one) {
        var origFn, type;

        // Types can be a map of types/handlers
        if (typeof types === "object") {

            // ( types-Object, selector, data )
            if (typeof selector !== "string") {

                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one);
            }
            return elem;
        }

        if (data == null && fn == null) {

            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === "string") {

                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {

                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if (fn === false) {
            fn = returnFalse;
        } else if (!fn) {
            return elem;
        }

        if (one === 1) {
            origFn = fn;
            fn = function (event) {

                // Can use an empty set, since event contains the info
                jQuery().off(event);
                return origFn.apply(this, arguments);
            };

            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function () {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function (elem, types, handler, data, selector) {

            var handleObjIn, eventHandle, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.get(elem);

            // Only attach events to objects that accept data
            if (!acceptData(elem)) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Ensure that invalid selectors throw exceptions at attach time
            // Evaluate against documentElement in case elem is a non-element node (e.g., document)
            if (selector) {
                jQuery.find.matchesSelector(documentElement, selector);
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = Object.create(null);
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {

                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply(elem, arguments) : undefined;
                };
            }

            // Handle multiple events separated by a space
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener if the special events handler returns false
                    if (!special.setup ||
                        special.setup.call(elem, data, namespaces, eventHandle) === false) {

                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

        },

        // Detach an event or set of events from an element
        remove: function (elem, types, handler, selector, mappedTypes) {

            var j, origCount, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] &&
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if ((mappedTypes || origType === handleObj.origType) &&
                        (!handler || handler.guid === handleObj.guid) &&
                        (!tmp || tmp.test(handleObj.namespace)) &&
                        (!selector || selector === handleObj.selector ||
                            selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown ||
                        special.teardown.call(elem, namespaces, elemData.handle) === false) {

                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove data and the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events");
            }
        },

        dispatch: function (nativeEvent) {

            var i, j, ret, matched, handleObj, handlerQueue,
                args = new Array(arguments.length),

                // Make a writable jQuery.Event from the native event object
                event = jQuery.event.fix(nativeEvent),

                handlers = (
                    dataPriv.get(this, "events") || Object.create(null)
                )[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;

            for (i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while ((handleObj = matched.handlers[j++]) &&
                    !event.isImmediatePropagationStopped()) {

                    // If the event is namespaced, then each handler is only invoked if it is
                    // specially universal or its namespaces are a superset of the event's.
                    if (!event.rnamespace || handleObj.namespace === false ||
                        event.rnamespace.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                            handleObj.handler).apply(matched.elem, args);

                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function (event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            if (delegateCount &&

                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&

                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !(event.type === "click" && event.button >= 1)) {

                for (; cur !== this; cur = cur.parentNode || this) {

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matchedSelectors[sel] === undefined) {
                                matchedSelectors[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) > -1 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matchedSelectors[sel]) {
                                matchedHandlers.push(handleObj);
                            }
                        }
                        if (matchedHandlers.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matchedHandlers
                            });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            cur = this;
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: cur,
                    handlers: handlers.slice(delegateCount)
                });
            }

            return handlerQueue;
        },

        addProp: function (name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: isFunction(hook) ?
                    function () {
                        if (this.originalEvent) {
                            return hook(this.originalEvent);
                        }
                    } : function () {
                        if (this.originalEvent) {
                            return this.originalEvent[name];
                        }
                    },

                set: function (value) {
                    Object.defineProperty(this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                }
            });
        },

        fix: function (originalEvent) {
            return originalEvent[jQuery.expando] ?
                originalEvent :
                new jQuery.Event(originalEvent);
        },

        special: {
            load: {

                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            click: {

                // Utilize native event to ensure correct state for checkable inputs
                setup: function (data) {

                    // For mutual compressibility with _default, replace `this` access with a local var.
                    // `|| data` is dead code meant only to preserve the variable through minification.
                    var el = this || data;

                    // Claim the first handler
                    if (rcheckableType.test(el.type) &&
                        el.click && nodeName(el, "input")) {

                        // dataPriv.set( el, "click", ... )
                        leverageNative(el, "click", returnTrue);
                    }

                    // Return false to allow normal processing in the caller
                    return false;
                },
                trigger: function (data) {

                    // For mutual compressibility with _default, replace `this` access with a local var.
                    // `|| data` is dead code meant only to preserve the variable through minification.
                    var el = this || data;

                    // Force setup before triggering a click
                    if (rcheckableType.test(el.type) &&
                        el.click && nodeName(el, "input")) {

                        leverageNative(el, "click");
                    }

                    // Return non-false to allow normal event-path propagation
                    return true;
                },

                // For cross-browser consistency, suppress native .click() on links
                // Also prevent it if we're currently inside a leveraged native-event stack
                _default: function (event) {
                    var target = event.target;
                    return rcheckableType.test(target.type) &&
                        target.click && nodeName(target, "input") &&
                        dataPriv.get(target, "click") ||
                        nodeName(target, "a");
                }
            },

            beforeunload: {
                postDispatch: function (event) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };

    // Ensure the presence of an event listener that handles manually-triggered
    // synthetic events by interrupting progress until reinvoked in response to
    // *native* events that it fires directly, ensuring that state changes have
    // already occurred before other listeners are invoked.
    function leverageNative(el, type, expectSync) {

        // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
        if (!expectSync) {
            if (dataPriv.get(el, type) === undefined) {
                jQuery.event.add(el, type, returnTrue);
            }
            return;
        }

        // Register the controller as a special universal handler for all event namespaces
        dataPriv.set(el, type, false);
        jQuery.event.add(el, type, {
            namespace: false,
            handler: function (event) {
                var notAsync, result,
                    saved = dataPriv.get(this, type);

                if ((event.isTrigger & 1) && this[type]) {

                    // Interrupt processing of the outer synthetic .trigger()ed event
                    // Saved data should be false in such cases, but might be a leftover capture object
                    // from an async native handler (gh-4350)
                    if (!saved.length) {

                        // Store arguments for use when handling the inner native event
                        // There will always be at least one argument (an event object), so this array
                        // will not be confused with a leftover capture object.
                        saved = slice.call(arguments);
                        dataPriv.set(this, type, saved);

                        // Trigger the native event and capture its result
                        // Support: IE <=9 - 11+
                        // focus() and blur() are asynchronous
                        notAsync = expectSync(this, type);
                        this[type]();
                        result = dataPriv.get(this, type);
                        if (saved !== result || notAsync) {
                            dataPriv.set(this, type, false);
                        } else {
                            result = {};
                        }
                        if (saved !== result) {

                            // Cancel the outer synthetic event
                            event.stopImmediatePropagation();
                            event.preventDefault();
                            return result.value;
                        }

                        // If this is an inner synthetic event for an event with a bubbling surrogate
                        // (focus or blur), assume that the surrogate already propagated from triggering the
                        // native event and prevent that from happening again here.
                        // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
                        // bubbling surrogate propagates *after* the non-bubbling base), but that seems
                        // less bad than duplication.
                    } else if ((jQuery.event.special[type] || {}).delegateType) {
                        event.stopPropagation();
                    }

                    // If this is a native event triggered above, everything is now in order
                    // Fire an inner synthetic event with the original arguments
                } else if (saved.length) {

                    // ...and capture the result
                    dataPriv.set(this, type, {
                        value: jQuery.event.trigger(

                            // Support: IE <=9 - 11+
                            // Extend with the prototype to reset the above stopImmediatePropagation()
                            jQuery.extend(saved[0], jQuery.Event.prototype),
                            saved.slice(1),
                            this
                        )
                    });

                    // Abort handling of the native event
                    event.stopImmediatePropagation();
                }
            }
        });
    }

    jQuery.removeEvent = function (elem, type, handle) {

        // This "if" is needed for plain objects
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
        }
    };

    jQuery.Event = function (src, props) {

        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined &&

                // Support: Android <=2.3 only
                src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Create target properties
            // Support: Safari <=6 - 7 only
            // Target should not be a text node (#504, #13143)
            this.target = (src.target && src.target.nodeType === 3) ?
                src.target.parentNode :
                src.target;

            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || Date.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if (e && !this.isSimulated) {
                e.preventDefault();
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if (e && !this.isSimulated) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

    // Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,

        which: function (event) {
            var button = event.button;

            // Add which for key events
            if (event.which == null && rkeyEvent.test(event.type)) {
                return event.charCode != null ? event.charCode : event.keyCode;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                if (button & 1) {
                    return 1;
                }

                if (button & 2) {
                    return 3;
                }

                if (button & 4) {
                    return 2;
                }

                return 0;
            }

            return event.which;
        }
    }, jQuery.event.addProp);

    jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function (type, delegateType) {
        jQuery.event.special[type] = {

            // Utilize native event if possible so blur/focus sequence is correct
            setup: function () {

                // Claim the first handler
                // dataPriv.set( this, "focus", ... )
                // dataPriv.set( this, "blur", ... )
                leverageNative(this, type, expectSync);

                // Return false to allow normal processing in the caller
                return false;
            },
            trigger: function () {

                // Force setup before trigger
                leverageNative(this, type);

                // Return non-false to allow normal event-path propagation
                return true;
            },

            delegateType: delegateType
        };
    });

    // Create mouseenter/leave events using mouseover/out and event-time checks
    // so that event delegation works in jQuery.
    // Do the same for pointerenter/pointerleave and pointerover/pointerout
    //
    // Support: Safari 7 only
    // Safari sends mouseenter too often; see:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
    // for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,

            handle: function (event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mouseenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });

    jQuery.fn.extend({

        on: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {

                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {

                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {

                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        }
    });


    var

        // Support: IE <=10 - 11, Edge 12 - 13 only
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i,

        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    // Prefer a tbody over its parent table for containing new rows
    function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") &&
            nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

            return jQuery(elem).children("tbody")[0] || elem;
        }

        return elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
            elem.type = elem.type.slice(5);
        } else {
            elem.removeAttribute("type");
        }

        return elem;
    }

    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, udataOld, udataCur, events;

        if (dest.nodeType !== 1) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.get(src);
            events = pdataOld.events;

            if (events) {
                dataPriv.remove(dest, "handle events");

                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }

        // 2. Copy user data
        if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);

            dataUser.set(dest, udataCur);
        }
    }

    // Fix IE bugs, see support tests
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();

        // Fails to persist the checked state of a cloned checkbox or radio button.
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;

            // Fails to return the selected option to the default selected state when cloning options
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }

    function domManip(collection, args, callback, ignored) {

        // Flatten any nested arrays
        args = flat(args);

        var fragment, first, scripts, hasScripts, node, doc,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[0],
            valueIsFunction = isFunction(value);

        // We can't cloneNode fragments that contain checked, in WebKit
        if (valueIsFunction ||
            (l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test(value))) {
            return collection.each(function (index) {
                var self = collection.eq(index);
                if (valueIsFunction) {
                    args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
            });
        }

        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;

            if (fragment.childNodes.length === 1) {
                fragment = first;
            }

            // Require either new content or an interest in ignored elements to invoke the callback
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for (; i < l; i++) {
                    node = fragment;

                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);

                        // Keep references to cloned scripts for later restoration
                        if (hasScripts) {

                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge(scripts, getAll(node, "script"));
                        }
                    }

                    callback.call(collection[i], node, i);
                }

                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;

                    // Reenable scripts
                    jQuery.map(scripts, restoreScript);

                    // Evaluate executable scripts on first document insertion
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || "") &&
                            !dataPriv.access(node, "globalEval") &&
                            jQuery.contains(doc, node)) {

                            if (node.src && (node.type || "").toLowerCase() !== "module") {

                                // Optional AJAX dependency, but won't run scripts if not present
                                if (jQuery._evalUrl && !node.noModule) {
                                    jQuery._evalUrl(node.src, {
                                        nonce: node.nonce || node.getAttribute("nonce")
                                    }, doc);
                                }
                            } else {
                                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                            }
                        }
                    }
                }
            }
        }

        return collection;
    }

    function remove(elem, selector, keepData) {
        var node,
            nodes = selector ? jQuery.filter(selector, elem) : elem,
            i = 0;

        for (;
            (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }

            if (node.parentNode) {
                if (keepData && isAttached(node)) {
                    setGlobalEval(getAll(node, "script"));
                }
                node.parentNode.removeChild(node);
            }
        }

        return elem;
    }

    jQuery.extend({
        htmlPrefilter: function (html) {
            return html;
        },

        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode(true),
                inPage = isAttached(elem);

            // Fix IE cloning issues
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
                !jQuery.isXMLDoc(elem)) {

                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);

                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }

            // Preserve script evaluation history
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }

            // Return the cloned set
            return clone;
        },

        cleanData: function (elems) {
            var data, elem, type,
                special = jQuery.event.special,
                i = 0;

            for (;
                (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                    if ((data = elem[dataPriv.expando])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataPriv.expando] = undefined;
                    }
                    if (elem[dataUser.expando]) {

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataUser.expando] = undefined;
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        detach: function (selector) {
            return remove(this, selector, true);
        },

        remove: function (selector) {
            return remove(this, selector);
        },

        text: function (value) {
            return access(this, function (value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().each(function () {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            this.textContent = value;
                        }
                    });
            }, null, value, arguments.length);
        },

        append: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },

        prepend: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },

        before: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },

        after: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },

        empty: function () {
            var elem,
                i = 0;

            for (;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {

                    // Prevent memory leaks
                    jQuery.cleanData(getAll(elem, false));

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html: function (value) {
            return access(this, function (value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }

                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                    !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

                    value = jQuery.htmlPrefilter(value);

                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};

                            // Remove element nodes and prevent memory leaks
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch (e) { }
                }

                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },

        replaceWith: function () {
            var ignored = [];

            // Make the changes, replacing each non-ignored context element with the new content
            return domManip(this, arguments, function (elem) {
                var parent = this.parentNode;

                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this);
                    }
                }

                // Force callback invocation
            }, ignored);
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1,
                i = 0;

            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);

                // Support: Android <=4.0 only, PhantomJS 1 only
                // .get() because push.apply(_, arraylike) throws on ancient WebKit
                push.apply(ret, elems.get());
            }

            return this.pushStack(ret);
        };
    });
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

    var getStyles = function (elem) {

        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;

        if (!view || !view.opener) {
            view = window;
        }

        return view.getComputedStyle(elem);
    };

    var swap = function (elem, options, callback) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        ret = callback.call(elem);

        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }

        return ret;
    };


    var rboxStyle = new RegExp(cssExpand.join("|"), "i");



    (function () {

        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computeStyleTests() {

            // This is a singleton, we need to execute it only once
            if (!div) {
                return;
            }

            container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                "margin-top:1px;padding:0;border:0";
            div.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                "margin:auto;border:1px;padding:1px;" +
                "width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div);

            var divStyle = window.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";

            // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

            // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
            // Some styles come back with percentage values, even though they shouldn't
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

            // Support: IE 9 - 11 only
            // Detect misreporting of content dimensions for box-sizing:border-box elements
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

            // Support: IE 9 only
            // Detect overflow:scroll screwiness (gh-3699)
            // Support: Chrome <=64
            // Don't get tricked when zoom affects offsetWidth (gh-4029)
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;

            documentElement.removeChild(container);

            // Nullify the div so it wouldn't be stored in the memory and
            // it will also be a sign that checks already performed
            div = null;
        }

        function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
        }

        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
            reliableTrDimensionsVal, reliableMarginLeftVal,
            container = document.createElement("div"),
            div = document.createElement("div");

        // Finish early in limited (non-browser) environments
        if (!div.style) {
            return;
        }

        // Support: IE <=9 - 11 only
        // Style of cloned element affects source element cloned (#8908)
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        jQuery.extend(support, {
            boxSizingReliable: function () {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelBoxStyles: function () {
                computeStyleTests();
                return pixelBoxStylesVal;
            },
            pixelPosition: function () {
                computeStyleTests();
                return pixelPositionVal;
            },
            reliableMarginLeft: function () {
                computeStyleTests();
                return reliableMarginLeftVal;
            },
            scrollboxSize: function () {
                computeStyleTests();
                return scrollboxSizeVal;
            },

            // Support: IE 9 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Behavior in IE 9 is more subtle than in newer versions & it passes
            // some versions of this test; make sure not to make it pass there!
            reliableTrDimensions: function () {
                var table, tr, trChild, trStyle;
                if (reliableTrDimensionsVal == null) {
                    table = document.createElement("table");
                    tr = document.createElement("tr");
                    trChild = document.createElement("div");

                    table.style.cssText = "position:absolute;left:-11111px";
                    tr.style.height = "1px";
                    trChild.style.height = "9px";

                    documentElement
                        .appendChild(table)
                        .appendChild(tr)
                        .appendChild(trChild);

                    trStyle = window.getComputedStyle(tr);
                    reliableTrDimensionsVal = parseInt(trStyle.height) > 3;

                    documentElement.removeChild(table);
                }
                return reliableTrDimensionsVal;
            }
        });
    })();


    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret,

            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;

        computed = computed || getStyles(elem);

        // getPropertyValue is needed for:
        //   .css('filter') (IE 9 only, #12537)
        //   .css('--customProperty) (#3144)
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];

            if (ret === "" && !isAttached(elem)) {
                ret = jQuery.style(elem, name);
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Android Browser returns percentage for some values,
            // but width seems to be reliably pixels.
            // This is against the CSSOM draft spec:
            // https://drafts.csswg.org/cssom/#resolved-values
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?

            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + "" :
            ret;
    }


    function addGetHookIf(conditionFn, hookFn) {

        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function () {
                if (conditionFn()) {

                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }


    var cssPrefixes = ["Webkit", "Moz", "ms"],
        emptyStyle = document.createElement("div").style,
        vendorProps = {};

    // Return a vendor-prefixed property or undefined
    function vendorPropName(name) {

        // Check for vendor prefixed names
        var capName = name[0].toUpperCase() + name.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name;
            }
        }
    }

    // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
    function finalPropName(name) {
        var final = jQuery.cssProps[name] || vendorProps[name];

        if (final) {
            return final;
        }
        if (name in emptyStyle) {
            return name;
        }
        return vendorProps[name] = vendorPropName(name) || name;
    }


    var

        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rcustomProp = /^--/,
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function setPositiveNumber(_elem, value, subtract) {

        // Any relative (+/-) values have already been
        // normalized at this point
        var matches = rcssNum.exec(value);
        return matches ?

            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
            value;
    }

    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i = dimension === "width" ? 1 : 0,
            extra = 0,
            delta = 0;

        // Adjustment may not be necessary
        if (box === (isBorderBox ? "border" : "content")) {
            return 0;
        }

        for (; i < 4; i += 2) {

            // Both box models exclude margin
            if (box === "margin") {
                delta += jQuery.css(elem, box + cssExpand[i], true, styles);
            }

            // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
            if (!isBorderBox) {

                // Add padding
                delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                // For "border" or "margin", add border
                if (box !== "padding") {
                    delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

                    // But still keep track of it otherwise
                } else {
                    extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }

                // If we get here with a border-box (content + padding + border), we're seeking "content" or
                // "padding" or "margin"
            } else {

                // For "content", subtract padding
                if (box === "content") {
                    delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }

                // For "content" or "padding", subtract border
                if (box !== "margin") {
                    delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }

        // Account for positive content-box scroll gutter when requested by providing computedVal
        if (!isBorderBox && computedVal >= 0) {

            // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
            // Assuming integer scroll gutter, subtract the rest and round down
            delta += Math.max(0, Math.ceil(
                elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                computedVal -
                delta -
                extra -
                0.5

                // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
                // Use an explicit zero to avoid NaN (gh-3964)
            )) || 0;
        }

        return delta;
    }

    function getWidthOrHeight(elem, dimension, extra) {

        // Start with computed style
        var styles = getStyles(elem),

            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
            // Fake content-box until we know it's needed to know the true value.
            boxSizingNeeded = !support.boxSizingReliable() || extra,
            isBorderBox = boxSizingNeeded &&
                jQuery.css(elem, "boxSizing", false, styles) === "border-box",
            valueIsBorderBox = isBorderBox,

            val = curCSS(elem, dimension, styles),
            offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);

        // Support: Firefox <=54
        // Return a confounding non-pixel value or feign ignorance, as appropriate.
        if (rnumnonpx.test(val)) {
            if (!extra) {
                return val;
            }
            val = "auto";
        }


        // Support: IE 9 - 11 only
        // Use offsetWidth/offsetHeight for when box sizing is unreliable.
        // In those cases, the computed value can be trusted to be border-box.
        if ((!support.boxSizingReliable() && isBorderBox ||

            // Support: IE 10 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Interestingly, in some cases IE 9 doesn't suffer from this issue.
            !support.reliableTrDimensions() && nodeName(elem, "tr") ||

            // Fall back to offsetWidth/offsetHeight when value is "auto"
            // This happens for inline elements with no explicit setting (gh-3571)
            val === "auto" ||

            // Support: Android <=4.1 - 4.3 only
            // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
            !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&

            // Make sure the element is visible & connected
            elem.getClientRects().length) {

            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

            // Where available, offsetWidth/offsetHeight approximate border box dimensions.
            // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
            // retrieved value as a content box dimension.
            valueIsBorderBox = offsetProp in elem;
            if (valueIsBorderBox) {
                val = elem[offsetProp];
            }
        }

        // Normalize "" and auto
        val = parseFloat(val) || 0;

        // Adjust for the element's box model
        return (val +
            boxModelAdjustment(
                elem,
                dimension,
                extra || (isBorderBox ? "border" : "content"),
                valueIsBorderBox,
                styles,

                // Provide the current computed size to request scroll gutter calculation (gh-3589)
                val
            )
        ) + "px";
    }

    jQuery.extend({

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {

                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "gridArea": true,
            "gridColumn": true,
            "gridColumnEnd": true,
            "gridColumnStart": true,
            "gridRow": true,
            "gridRowEnd": true,
            "gridRowStart": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},

        // Get and set the style property on a DOM Node
        style: function (elem, name, value, extra) {

            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = camelCase(name),
                isCustomProp = rcustomProp.test(name),
                style = elem.style;

            // Make sure that we're working with the right name. We don't
            // want to query the value if it is a CSS custom property
            // since they are user-defined.
            if (!isCustomProp) {
                name = finalPropName(origName);
            }

            // Gets hook for the prefixed version, then unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                    value = adjustCSS(elem, name, ret);

                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if (value == null || value !== value) {
                    return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
                // "px" to a few hardcoded values.
                if (type === "number" && !isCustomProp) {
                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                }

                // background-* props affect original clone's values
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) ||
                    (value = hooks.set(elem, value, extra)) !== undefined) {

                    if (isCustomProp) {
                        style.setProperty(name, value);
                    } else {
                        style[name] = value;
                    }
                }

            } else {

                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks &&
                    (ret = hooks.get(elem, false, extra)) !== undefined) {

                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
            }
        },

        css: function (elem, name, extra, styles) {
            var val, num, hooks,
                origName = camelCase(name),
                isCustomProp = rcustomProp.test(name);

            // Make sure that we're working with the right name. We don't
            // want to modify the value if it is a CSS custom property
            // since they are user-defined.
            if (!isCustomProp) {
                name = finalPropName(origName);
            }

            // Try prefixed name followed by the unprefixed name
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }

            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }

            // Convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }

            // Make numeric if forced or a qualifier was provided and val looks numeric
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
            }

            return val;
        }
    });

    jQuery.each(["height", "width"], function (_i, dimension) {
        jQuery.cssHooks[dimension] = {
            get: function (elem, computed, extra) {
                if (computed) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test(jQuery.css(elem, "display")) &&

                        // Support: Safari 8+
                        // Table columns in Safari have non-zero offsetWidth & zero
                        // getBoundingClientRect().width unless display is changed.
                        // Support: IE <=11 only
                        // Running getBoundingClientRect on a disconnected node
                        // in IE throws an error.
                        (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                        swap(elem, cssShow, function () {
                            return getWidthOrHeight(elem, dimension, extra);
                        }) :
                        getWidthOrHeight(elem, dimension, extra);
                }
            },

            set: function (elem, value, extra) {
                var matches,
                    styles = getStyles(elem),

                    // Only read styles.position if the test has a chance to fail
                    // to avoid forcing a reflow.
                    scrollboxSizeBuggy = !support.scrollboxSize() &&
                        styles.position === "absolute",

                    // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
                    boxSizingNeeded = scrollboxSizeBuggy || extra,
                    isBorderBox = boxSizingNeeded &&
                        jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                    subtract = extra ?
                        boxModelAdjustment(
                            elem,
                            dimension,
                            extra,
                            isBorderBox,
                            styles
                        ) :
                        0;

                // Account for unreliable border-box dimensions by comparing offset* to computed and
                // faking a content-box to get border and padding (gh-3699)
                if (isBorderBox && scrollboxSizeBuggy) {
                    subtract -= Math.ceil(
                        elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                        parseFloat(styles[dimension]) -
                        boxModelAdjustment(elem, dimension, "border", false, styles) -
                        0.5
                    );
                }

                // Convert to pixels if value adjustment is needed
                if (subtract && (matches = rcssNum.exec(value)) &&
                    (matches[3] || "px") !== "px") {

                    elem.style[dimension] = value;
                    value = jQuery.css(elem, dimension);
                }

                return setPositiveNumber(elem, value, subtract);
            }
        };
    });

    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
        function (elem, computed) {
            if (computed) {
                return (parseFloat(curCSS(elem, "marginLeft")) ||
                    elem.getBoundingClientRect().left -
                    swap(elem, {
                        marginLeft: 0
                    }, function () {
                        return elem.getBoundingClientRect().left;
                    })
                ) + "px";
            }
        }
    );

    // These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i = 0,
                    expanded = {},

                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];

                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                        parts[i] || parts[i - 2] || parts[0];
                }

                return expanded;
            }
        };

        if (prefix !== "margin") {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function (name, value) {
            return access(this, function (elem, name, value) {
                var styles, len,
                    map = {},
                    i = 0;

                if (Array.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        }
    });


    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];

            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run: function (percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];

            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;

            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }

            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if (tween.elem.nodeType !== 1 ||
                    tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css(tween.elem, tween.prop, "");

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function (tween) {

                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.nodeType === 1 && (
                    jQuery.cssHooks[tween.prop] ||
                    tween.elem.style[finalPropName(tween.prop)] != null)) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };

    // Support: IE <=9 only
    // Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function (p) {
            return p;
        },
        swing: function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    };

    jQuery.fx = Tween.prototype.init;

    // Back compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, inProgress,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;

    function schedule() {
        if (inProgress) {
            if (document.hidden === false && window.requestAnimationFrame) {
                window.requestAnimationFrame(schedule);
            } else {
                window.setTimeout(schedule, jQuery.fx.interval);
            }

            jQuery.fx.tick();
        }
    }

    // Animations created synchronously will run synchronously
    function createFxNow() {
        window.setTimeout(function () {
            fxNow = undefined;
        });
        return (fxNow = Date.now());
    }

    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which,
            i = 0,
            attrs = {
                height: type
            };

        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }

        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween(value, prop, animation) {
        var tween,
            collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {

                // We're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
            isBox = "width" in props || "height" in props,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHiddenWithinTree(elem),
            dataShow = dataPriv.get(elem, "fxshow");

        // Queue-skipping animations hijack the fx hooks
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function () {

                // Ensure the complete handler is called before this completes
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // Detect show/hide animations
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {

                    // Pretend to be hidden if this is a "show" and
                    // there is still data from a stopped show/hide
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;

                        // Ignore all other no-op show/hide data
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }

        // Bail out if this is a no-op like .hide().hide()
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
        }

        // Restrict "overflow" and "display" styles during box animations
        if (isBox && elem.nodeType === 1) {

            // Support: IE <=9 - 11, Edge 12 - 15
            // Record all 3 overflow attributes because IE does not infer the shorthand
            // from identically-valued overflowX and overflowY and Edge just mirrors
            // the overflowX value there.
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];

            // Identify a display type, preferring old show/hide data over the CSS cascade
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
                restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery.css(elem, "display");
            if (display === "none") {
                if (restoreDisplay) {
                    display = restoreDisplay;
                } else {

                    // Get nonempty value(s) by temporarily forcing visibility
                    showHide([elem], true);
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css(elem, "display");
                    showHide([elem]);
                }
            }

            // Animate inline elements as inline-block
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                if (jQuery.css(elem, "float") === "none") {

                    // Restore the original display value at the end of pure show/hide animations
                    if (!propTween) {
                        anim.done(function () {
                            style.display = restoreDisplay;
                        });
                        if (restoreDisplay == null) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }

        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function () {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }

        // Implement show/hide animations
        propTween = false;
        for (prop in orig) {

            // General show/hide setup for this element animation
            if (!propTween) {
                if (dataShow) {
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access(elem, "fxshow", {
                        display: restoreDisplay
                    });
                }

                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if (toggle) {
                    dataShow.hidden = !hidden;
                }

                // Show elements before animating them
                if (hidden) {
                    showHide([elem], true);
                }

                /* eslint-disable no-loop-func */

                anim.done(function () {

                    /* eslint-enable no-loop-func */

                    // The final step of a "hide" animation is actually hiding the element
                    if (!hidden) {
                        showHide([elem]);
                    }
                    dataPriv.remove(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop]);
                    }
                });
            }

            // Per-property setup
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
                dataShow[prop] = propTween.start;
                if (hidden) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }

            if (index !== name) {
                props[name] = value;
                delete props[index];
            }

            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }

    function Animation(elem, properties, options) {
        var result,
            stopped,
            index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always(function () {

                // Don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

                    // Support: Android 2.3 only
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                // If there's more to do, yield
                if (percent < 1 && length) {
                    return remaining;
                }

                // If this was an empty animation, synthesize a final progress notification
                if (!length) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                }

                // Resolve the animation and report its conclusion
                deferred.resolveWith(elem, [animation]);
                return false;
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                        animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0,

                        // If we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }

                    // Resolve when we played the last frame; otherwise, reject
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                        result.stop.bind(result);
                }
                return result;
            }
        }

        jQuery.map(props, createTween, animation);

        if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        // Attach callbacks from options
        animation
            .progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);

        jQuery.fx.timer(
            jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        return animation;
    }

    jQuery.Animation = jQuery.extend(Animation, {

        tweeners: {
            "*": [function (prop, value) {
                var tween = this.createTween(prop, value);
                adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                return tween;
            }]
        },

        tweener: function (props, callback) {
            if (isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.match(rnothtmlwhite);
            }

            var prop,
                index = 0,
                length = props.length;

            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
            }
        },

        prefilters: [defaultPrefilter],

        prefilter: function (callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback);
            } else {
                Animation.prefilters.push(callback);
            }
        }
    });

    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing ||
                isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
        };

        // Go to the end state if fx are off
        if (jQuery.fx.off) {
            opt.duration = 0;

        } else {
            if (typeof opt.duration !== "number") {
                if (opt.duration in jQuery.fx.speeds) {
                    opt.duration = jQuery.fx.speeds[opt.duration];

                } else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }

        // Normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function () {
            if (isFunction(opt.old)) {
                opt.old.call(this);
            }

            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {

            // Show any hidden elements after setting opacity to 0
            return this.filter(isHiddenWithinTree).css("opacity", 0).show()

                // Animate to the value specified
                .end().animate({
                    opacity: to
                }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {

                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);

                    // Empty animations, or finishing resolves immediately
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };

            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue) {
                this.queue(type || "fx", []);
            }

            return this.each(function () {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = dataPriv.get(this);

                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }

                for (index = timers.length; index--;) {
                    if (timers[index].elem === this &&
                        (type == null || timers[index].queue === type)) {

                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function (type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function () {
                var index,
                    data = dataPriv.get(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }

                // Look for any active animations, and finish them
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }

                // Look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }

                // Turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each(["toggle", "show", "hide"], function (_i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });

    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function () {
        var timer,
            i = 0,
            timers = jQuery.timers;

        fxNow = Date.now();

        for (; i < timers.length; i++) {
            timer = timers[i];

            // Run the timer and safely remove it when done (allowing for external removal)
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }

        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function (timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
    };

    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
        if (inProgress) {
            return;
        }

        inProgress = true;
        schedule();
    };

    jQuery.fx.stop = function () {
        inProgress = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,

        // Default speed
        _default: 400
    };


    // Based off of the plugin by Clint Helfers, with permission.
    // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function (next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function () {
                window.clearTimeout(timeout);
            };
        });
    };


    (function () {
        var input = document.createElement("input"),
            select = document.createElement("select"),
            opt = select.appendChild(document.createElement("option"));

        input.type = "checkbox";

        // Support: Android <=4.3 only
        // Default value for a checkbox should be "on"
        support.checkOn = input.value !== "";

        // Support: IE <=11 only
        // Must access selectedIndex to make default options select
        support.optSelected = opt.selected;

        // Support: IE <=11 only
        // An input loses its value after becoming a radio
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();


    var boolHook,
        attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend({
        attr: function (name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        }
    });

    jQuery.extend({
        attr: function (elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set attributes on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }

            // Attribute hooks are determined by the lowercase version
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks = jQuery.attrHooks[name.toLowerCase()] ||
                    (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
            }

            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                }

                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }

                elem.setAttribute(name, value + "");
                return value;
            }

            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            ret = jQuery.find.attr(elem, name);

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },

        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!support.radioValue && value === "radio" &&
                        nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },

        removeAttr: function (elem, value) {
            var name,
                i = 0,

                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);

            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    elem.removeAttribute(name);
                }
            }
        }
    });

    // Hooks for boolean attributes
    boolHook = {
        set: function (elem, value, name) {
            if (value === false) {

                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };

    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;

        attrHandle[name] = function (elem, name, isXML) {
            var ret, handle,
                lowercaseName = name.toLowerCase();

            if (!isXML) {

                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[lowercaseName];
                attrHandle[lowercaseName] = ret;
                ret = getter(elem, name, isXML) != null ?
                    lowercaseName :
                    null;
                attrHandle[lowercaseName] = handle;
            }
            return ret;
        };
    });




    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function (name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp: function (name) {
            return this.each(function () {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });

    jQuery.extend({
        prop: function (elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }

            if (value !== undefined) {
                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }

                return (elem[name] = value);
            }

            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            return elem[name];
        },

        propHooks: {
            tabIndex: {
                get: function (elem) {

                    // Support: IE <=9 - 11 only
                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr(elem, "tabindex");

                    if (tabindex) {
                        return parseInt(tabindex, 10);
                    }

                    if (
                        rfocusable.test(elem.nodeName) ||
                        rclickable.test(elem.nodeName) &&
                        elem.href
                    ) {
                        return 0;
                    }

                    return -1;
                }
            }
        },

        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });

    // Support: IE <=11 only
    // Accessing the selectedIndex property
    // forces the browser to respect setting selected
    // on the option
    // The getter ensures a default option is selected
    // when in an optgroup
    // eslint rule "no-unused-expressions" is disabled for this code
    // since it considers such accessions noop
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function (elem) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function (elem) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;

                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function () {
        jQuery.propFix[this.toLowerCase()] = this;
    });




    // Strip and collapse whitespace according to HTML spec
    // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
    }


    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
    }

    function classesToArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === "string") {
            return value.match(rnothtmlwhite) || [];
        }
        return [];
    }

    jQuery.fn.extend({
        addClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }

            classes = classesToArray(value);

            if (classes.length) {
                while ((elem = this[i++])) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }

            if (!arguments.length) {
                return this.attr("class", "");
            }

            classes = classesToArray(value);

            if (classes.length) {
                while ((elem = this[i++])) {
                    curValue = getClass(elem);

                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {

                            // Remove *all* instances
                            while (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function (value, stateVal) {
            var type = typeof value,
                isValidValue = type === "string" || Array.isArray(value);

            if (typeof stateVal === "boolean" && isValidValue) {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            if (isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(
                        value.call(this, i, getClass(this), stateVal),
                        stateVal
                    );
                });
            }

            return this.each(function () {
                var className, i, self, classNames;

                if (isValidValue) {

                    // Toggle individual class names
                    i = 0;
                    self = jQuery(this);
                    classNames = classesToArray(value);

                    while ((className = classNames[i++])) {

                        // Check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }

                    // Toggle whole class name
                } else if (value === undefined || type === "boolean") {
                    className = getClass(this);
                    if (className) {

                        // Store className if set
                        dataPriv.set(this, "__className__", className);
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if (this.setAttribute) {
                        this.setAttribute("class",
                            className || value === false ?
                                "" :
                                dataPriv.get(this, "__className__") || ""
                        );
                    }
                }
            });
        },

        hasClass: function (selector) {
            var className, elem,
                i = 0;

            className = " " + selector + " ";
            while ((elem = this[i++])) {
                if (elem.nodeType === 1 &&
                    (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                    return true;
                }
            }

            return false;
        }
    });




    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function (value) {
            var hooks, ret, valueIsFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] ||
                        jQuery.valHooks[elem.nodeName.toLowerCase()];

                    if (hooks &&
                        "get" in hooks &&
                        (ret = hooks.get(elem, "value")) !== undefined
                    ) {
                        return ret;
                    }

                    ret = elem.value;

                    // Handle most common string cases
                    if (typeof ret === "string") {
                        return ret.replace(rreturn, "");
                    }

                    // Handle cases where value is null/undef or number
                    return ret == null ? "" : ret;
                }

                return;
            }

            valueIsFunction = isFunction(value);

            return this.each(function (i) {
                var val;

                if (this.nodeType !== 1) {
                    return;
                }

                if (valueIsFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";

                } else if (typeof val === "number") {
                    val += "";

                } else if (Array.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {

                    var val = jQuery.find.attr(elem, "value");
                    return val != null ?
                        val :

                        // Support: IE <=10 - 11 only
                        // option.text throws exceptions (#14686, #14858)
                        // Strip and collapse whitespace
                        // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                        stripAndCollapse(jQuery.text(elem));
                }
            },
            select: {
                get: function (elem) {
                    var value, option, i,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one",
                        values = one ? null : [],
                        max = one ? index + 1 : options.length;

                    if (index < 0) {
                        i = max;

                    } else {
                        i = one ? index : 0;
                    }

                    // Loop through all the selected options
                    for (; i < max; i++) {
                        option = options[i];

                        // Support: IE <=9 only
                        // IE8-9 doesn't update selected after form reset (#2551)
                        if ((option.selected || i === index) &&

                            // Don't return options that are disabled or in a disabled optgroup
                            !option.disabled &&
                            (!option.parentNode.disabled ||
                                !nodeName(option.parentNode, "optgroup"))) {

                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    return values;
                },

                set: function (elem, value) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;

                    while (i--) {
                        option = options[i];

                        /* eslint-disable no-cond-assign */

                        if (option.selected =
                            jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
                        ) {
                            optionSet = true;
                        }

                        /* eslint-enable no-cond-assign */
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });

    // Radios and checkboxes getter/setter
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
            set: function (elem, value) {
                if (Array.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function (elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




    // Return jQuery for attributes-only inclusion


    support.focusin = "onfocusin" in window;


    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        stopPropagationCallback = function (e) {
            e.stopPropagation();
        };

    jQuery.extend(jQuery.event, {

        trigger: function (event, data, elem, onlyHandlers) {

            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = lastElement = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") > -1) {

                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ? [event] :
                jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                lastElement = cur;
                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = (
                    dataPriv.get(cur, "events") || Object.create(null)
                )[event.type] &&
                    dataPriv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if ((!special._default ||
                    special._default.apply(eventPath.pop(), data) === false) &&
                    acceptData(elem)) {

                    // Call a native DOM method on the target with the same name as the event.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && isFunction(elem[type]) && !isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;

                        if (event.isPropagationStopped()) {
                            lastElement.addEventListener(type, stopPropagationCallback);
                        }

                        elem[type]();

                        if (event.isPropagationStopped()) {
                            lastElement.removeEventListener(type, stopPropagationCallback);
                        }

                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function (type, elem, event) {
            var e = jQuery.extend(
                new jQuery.Event(),
                event, {
                type: type,
                isSimulated: true
            }
            );

            jQuery.event.trigger(e, null, elem);
        }

    });

    jQuery.fn.extend({

        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });


    // Support: Firefox <=44
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    if (!support.focusin) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function (orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };

            jQuery.event.special[fix] = {
                setup: function () {

                    // Handle: regular nodes (via `this.ownerDocument`), window
                    // (via `this.document`) & document (via `this`).
                    var doc = this.ownerDocument || this.document || this,
                        attaches = dataPriv.access(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    dataPriv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this.document || this,
                        attaches = dataPriv.access(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        dataPriv.remove(doc, fix);

                    } else {
                        dataPriv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    var location = window.location;

    var nonce = {
        guid: Date.now()
    };

    var rquery = (/\?/);



    // Cross-browser xml parsing
    jQuery.parseXML = function (data) {
        var xml;
        if (!data || typeof data !== "string") {
            return null;
        }

        // Support: IE 9 - 11 only
        // IE throws on parseFromString with invalid input.
        try {
            xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        } catch (e) {
            xml = undefined;
        }

        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };


    var
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (Array.isArray(obj)) {

            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {

                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {

                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                        v,
                        traditional,
                        add
                    );
                }
            });

        } else if (!traditional && toType(obj) === "object") {

            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else {

            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, valueOrFunction) {

                // If value is a function, invoke it and use its return value
                var value = isFunction(valueOrFunction) ?
                    valueOrFunction() :
                    valueOrFunction;

                s[s.length] = encodeURIComponent(key) + "=" +
                    encodeURIComponent(value == null ? "" : value);
            };

        if (a == null) {
            return "";
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });

        } else {

            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&");
    };

    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {

                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            })
                .filter(function () {
                    var type = this.type;

                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                })
                .map(function (_i, elem) {
                    var val = jQuery(this).val();

                    if (val == null) {
                        return null;
                    }

                    if (Array.isArray(val)) {
                        return jQuery.map(val, function (val) {
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            };
                        });
                    }

                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }).get();
        }
    });


    var
        r20 = /%20/g,
        rhash = /#.*$/,
        rantiCache = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*"),

        // Anchor tag for parsing the document origin
        originAnchor = document.createElement("a");
    originAnchor.href = location.href;

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function (dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

            if (isFunction(func)) {

                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {

                    // Prepend if requested
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);

                        // Otherwise append
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" &&
                    !seekingTransport && !inspected[dataTypeOrTransport]) {

                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {

        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {

            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }

            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev,
            converters = {},

            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {

                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s.throws) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return {
            state: "success",
            data: response
        };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",

            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": JSON.parse,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function (target, settings) {
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function (url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var transport,

                // URL without anti-cache param
                cacheURL,

                // Response headers
                responseHeadersString,
                responseHeaders,

                // timeout handle
                timeoutTimer,

                // Url cleanup var
                urlAnchor,

                // Request state (becomes false upon send and true upon completion)
                completed,

                // To know if global events are to be dispatched
                fireGlobals,

                // Loop variable
                i,

                // uncached part of the url
                uncached,

                // Create the final options object
                s = jQuery.ajaxSetup({}, options),

                // Callbacks context
                callbackContext = s.context || s,

                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                    (callbackContext.nodeType || callbackContext.jquery) ?
                    jQuery(callbackContext) :
                    jQuery.event,

                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),

                // Status-dependent callbacks
                statusCode = s.statusCode || {},

                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},

                // Default abort message
                strAbort = "canceled",

                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (completed) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase() + " "] =
                                        (responseHeaders[match[1].toLowerCase() + " "] || [])
                                            .concat(match[2]);
                                }
                            }
                            match = responseHeaders[key.toLowerCase() + " "];
                        }
                        return match == null ? null : match.join(", ");
                    },

                    // Raw string
                    getAllResponseHeaders: function () {
                        return completed ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function (name, value) {
                        if (completed == null) {
                            name = requestHeadersNames[name.toLowerCase()] =
                                requestHeadersNames[name.toLowerCase()] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (completed == null) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (completed) {

                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            } else {

                                // Lazy-add the new callbacks in a way that preserves old ones
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise(jqXHR);

            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ((url || s.url || location.href) + "")
                .replace(rprotocol, location.protocol + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

            // A cross-domain request is in order when the origin doesn't match the current origin.
            if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");

                // Support: IE <=8 - 11, Edge 12 - 15
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                    urlAnchor.href = s.url;

                    // Support: IE <=8 - 11 only
                    // Anchor's host property isn't correctly set when s.url is relative
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {

                    // If there is an error parsing the URL, assume it is crossDomain,
                    // it can be rejected by the transport if it is invalid
                    s.crossDomain = true;
                }
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (completed) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            // Remove hash to simplify url manipulation
            cacheURL = s.url.replace(rhash, "");

            // More options handling for requests with no content
            if (!s.hasContent) {

                // Remember the hash so we can put it back
                uncached = s.url.slice(cacheURL.length);

                // If data is available and should be processed, append data to url
                if (s.data && (s.processData || typeof s.data === "string")) {
                    cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add or update anti-cache param if needed
                if (s.cache === false) {
                    cacheURL = cacheURL.replace(rantiCache, "$1");
                    uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce.guid++) +
                        uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
            } else if (s.data && s.processData &&
                (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                s.data = s.data.replace(r20, "+");
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                    s.accepts[s.dataTypes[0]] +
                    (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                    s.accepts["*"]
            );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend &&
                (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

                // Abort if not done already and return
                return jqXHR.abort();
            }

            // Aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }

                // If request was aborted inside ajaxSend, stop there
                if (completed) {
                    return jqXHR;
                }

                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    completed = false;
                    transport.send(requestHeaders, done);
                } catch (e) {

                    // Rethrow post-completion exceptions
                    if (completed) {
                        throw e;
                    }

                    // Propagate others as results
                    done(-1, e);
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Ignore repeat invocations
                if (completed) {
                    return;
                }

                completed = true;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Use a noop converter for missing script
                if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1) {
                    s.converters["text script"] = function () { };
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {

                    // Extract error from statusText and normalize for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
                        [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

                    // Handle the global AJAX counter
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function (_i, method) {
        jQuery[method] = function (url, data, callback, type) {

            // Shift arguments if data argument was omitted
            if (isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            // The url can be an options object (which then must have .url)
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    });

    jQuery.ajaxPrefilter(function (s) {
        var i;
        for (i in s.headers) {
            if (i.toLowerCase() === "content-type") {
                s.contentType = s.headers[i] || "";
            }
        }
    });


    jQuery._evalUrl = function (url, options, doc) {
        return jQuery.ajax({
            url: url,

            // Make this explicit, since user can override this through ajaxSetup (#11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,

            // Only evaluate the response if it is successful (gh-4126)
            // dataFilter is not invoked for failure responses, so using it instead
            // of the default converter is kludgy but it works.
            converters: {
                "text script": function () { }
            },
            dataFilter: function (response) {
                jQuery.globalEval(response, options, doc);
            }
        });
    };


    jQuery.fn.extend({
        wrapAll: function (html) {
            var wrap;

            if (this[0]) {
                if (isFunction(html)) {
                    html = html.call(this[0]);
                }

                // The elements to wrap the target around
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }

                wrap.map(function () {
                    var elem = this;

                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }

                    return elem;
                }).append(this);
            }

            return this;
        },

        wrapInner: function (html) {
            if (isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }

            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();

                if (contents.length) {
                    contents.wrapAll(html);

                } else {
                    self.append(html);
                }
            });
        },

        wrap: function (html) {
            var htmlIsFunction = isFunction(html);

            return this.each(function (i) {
                jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
        },

        unwrap: function (selector) {
            this.parent(selector).not("body").each(function () {
                jQuery(this).replaceWith(this.childNodes);
            });
            return this;
        }
    });


    jQuery.expr.pseudos.hidden = function (elem) {
        return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function (elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };




    jQuery.ajaxSettings.xhr = function () {
        try {
            return new window.XMLHttpRequest();
        } catch (e) { }
    };

    var xhrSuccessStatus = {

        // File protocol always yields status code 0, assume 200
        0: 200,

        // Support: IE <=9 only
        // #1450: sometimes IE returns 1223 when it should be 204
        1223: 204
    },
        xhrSupported = jQuery.ajaxSettings.xhr();

    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport(function (options) {
        var callback, errorCallback;

        // Cross domain only allowed if supported through XMLHttpRequest
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function (headers, complete) {
                    var i,
                        xhr = options.xhr();

                    xhr.open(
                        options.type,
                        options.url,
                        options.async,
                        options.username,
                        options.password
                    );

                    // Apply custom fields if provided
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }

                    // Override mime type if needed
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }

                    // Set headers
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }

                    // Callback
                    callback = function (type) {
                        return function () {
                            if (callback) {
                                callback = errorCallback = xhr.onload =
                                    xhr.onerror = xhr.onabort = xhr.ontimeout =
                                    xhr.onreadystatechange = null;

                                if (type === "abort") {
                                    xhr.abort();
                                } else if (type === "error") {

                                    // Support: IE <=9 only
                                    // On a manual native abort, IE9 throws
                                    // errors on any property access that is not readyState
                                    if (typeof xhr.status !== "number") {
                                        complete(0, "error");
                                    } else {
                                        complete(

                                            // File: protocol always yields status 0; see #8605, #14207
                                            xhr.status,
                                            xhr.statusText
                                        );
                                    }
                                } else {
                                    complete(
                                        xhrSuccessStatus[xhr.status] || xhr.status,
                                        xhr.statusText,

                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        (xhr.responseType || "text") !== "text" ||
                                            typeof xhr.responseText !== "string" ? {
                                                binary: xhr.response
                                            } : {
                                                text: xhr.responseText
                                            },
                                        xhr.getAllResponseHeaders()
                                    );
                                }
                            }
                        };
                    };

                    // Listen to events
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = xhr.ontimeout = callback("error");

                    // Support: IE 9 only
                    // Use onreadystatechange to replace onabort
                    // to handle uncaught aborts
                    if (xhr.onabort !== undefined) {
                        xhr.onabort = errorCallback;
                    } else {
                        xhr.onreadystatechange = function () {

                            // Check readyState before timeout as it changes
                            if (xhr.readyState === 4) {

                                // Allow onerror to be called first,
                                // but that will not handle a native abort
                                // Also, save errorCallback to a variable
                                // as xhr.onerror cannot be accessed
                                window.setTimeout(function () {
                                    if (callback) {
                                        errorCallback();
                                    }
                                });
                            }
                        };
                    }

                    // Create the abort callback
                    callback = callback("abort");

                    try {

                        // Do send the request (this may raise an exception)
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {

                        // #14683: Only rethrow if this hasn't been notified as an error yet
                        if (callback) {
                            throw e;
                        }
                    }
                },

                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });




    // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    jQuery.ajaxPrefilter(function (s) {
        if (s.crossDomain) {
            s.contents.script = false;
        }
    });

    // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " +
                "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

    // Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });

    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function (s) {

        // This transport only deals with cross domain or forced-by-attrs requests
        if (s.crossDomain || s.scriptAttrs) {
            var script, callback;
            return {
                send: function (_, complete) {
                    script = jQuery("<script>")
                        .attr(s.scriptAttrs || {})
                        .prop({
                            charset: s.scriptCharset,
                            src: s.url
                        })
                        .on("load error", callback = function (evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type);
                            }
                        });

                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    document.head.appendChild(script[0]);
                },
                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce.guid++));
            this[callback] = true;
            return callback;
        }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" &&
                (s.contentType || "")
                    .indexOf("application/x-www-form-urlencoded") === 0 &&
                rjsonp.test(s.data) && "data"
            );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // Force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function () {

                // If previous value didn't exist - remove it
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);

                    // Otherwise restore preexisting value
                } else {
                    window[callbackName] = overwritten;
                }

                // Save back as free
                if (s[callbackName]) {

                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // Save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




    // Support: Safari 8 only
    // In Safari 8 documents created via document.implementation.createHTMLDocument
    // collapse sibling forms: the second one becomes a child of the first one.
    // Because of that, this security measure has to be disabled in Safari 8.
    // https://bugs.webkit.org/show_bug.cgi?id=137337
    support.createHTMLDocument = (function () {
        var body = document.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    })();


    // Argument "data" should be string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (typeof data !== "string") {
            return [];
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }

        var base, parsed, scripts;

        if (!context) {

            // Stop scripts or inline event handlers from being executed immediately
            // by using document.implementation
            if (support.createHTMLDocument) {
                context = document.implementation.createHTMLDocument("");

                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement("base");
                base.href = document.location.href;
                context.head.appendChild(base);
            } else {
                context = document;
            }
        }

        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };


    /**
     * Load a url into a page
     */
    jQuery.fn.load = function (url, params, callback) {
        var selector, type, response,
            self = this,
            off = url.indexOf(" ");

        if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
        }

        // If it's a function
        if (isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,

                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function (responseText) {

                // Save response for use in complete callback
                response = arguments;

                self.html(selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                    // Otherwise use the full result
                    responseText);

                // If the request succeeds, this function gets "data", "status", "jqXHR"
                // but they are ignored because response was set above.
                // If it fails, this function gets "jqXHR", "status", "error"
            }).always(callback && function (jqXHR, status) {
                self.each(function () {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            });
        }

        return this;
    };




    jQuery.expr.pseudos.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
            return elem === fn.elem;
        }).length;
    };




    jQuery.offset = {
        setOffset: function (elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};

            // Set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") &&
                (curCSSTop + curCSSLeft).indexOf("auto") > -1;

            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;

            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }

            if (isFunction(options)) {

                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call(elem, i, jQuery.extend({}, curOffset));
            }

            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }

            if ("using" in options) {
                options.using.call(elem, props);

            } else {
                if (typeof props.top === "number") {
                    props.top += "px";
                }
                if (typeof props.left === "number") {
                    props.left += "px";
                }
                curElem.css(props);
            }
        }
    };

    jQuery.fn.extend({

        // offset() relates an element's border box to the document origin
        offset: function (options) {

            // Preserve chaining for setter
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function (i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }

            var rect, win,
                elem = this[0];

            if (!elem) {
                return;
            }

            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if (!elem.getClientRects().length) {
                return {
                    top: 0,
                    left: 0
                };
            }

            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },

        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function () {
            if (!this[0]) {
                return;
            }

            var offsetParent, offset, doc,
                elem = this[0],
                parentOffset = {
                    top: 0,
                    left: 0
                };

            // position:fixed elements are offset from the viewport, which itself always has zero offset
            if (jQuery.css(elem, "position") === "fixed") {

                // Assume position:fixed implies availability of getBoundingClientRect
                offset = elem.getBoundingClientRect();

            } else {
                offset = this.offset();

                // Account for the *real* offset parent, which can be the document or its root element
                // when a statically positioned element is identified
                doc = elem.ownerDocument;
                offsetParent = elem.offsetParent || doc.documentElement;
                while (offsetParent &&
                    (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                    jQuery.css(offsetParent, "position") === "static") {

                    offsetParent = offsetParent.parentNode;
                }
                if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

                    // Incorporate borders into its offset, since they are outside its content origin
                    parentOffset = jQuery(offsetParent).offset();
                    parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                    parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
                }
            }

            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },

        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent;

                while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
            });
        }
    });

    // Create scrollLeft and scrollTop methods
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (method, prop) {
        var top = "pageYOffset" === prop;

        jQuery.fn[method] = function (val) {
            return access(this, function (elem, method, val) {

                // Coalesce documents and windows
                var win;
                if (isWindow(elem)) {
                    win = elem;
                } else if (elem.nodeType === 9) {
                    win = elem.defaultView;
                }

                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }

                if (win) {
                    win.scrollTo(
                        !top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                    );

                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length);
        };
    });

    // Support: Safari <=7 - 9.1, Chrome <=37 - 49
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
    // getComputedStyle returns percent when specified for top/left/bottom/right;
    // rather than make the css module depend on the offset module, just check for it here
    jQuery.each(["top", "left"], function (_i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
            function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);

                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            }
        );
    });


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function (name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        },
            function (defaultExtra, funcName) {

                // Margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                        extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

                    return access(this, function (elem, type, value) {
                        var doc;

                        if (isWindow(elem)) {

                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf("outer") === 0 ?
                                elem["inner" + name] :
                                elem.document.documentElement["client" + name];
                        }

                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;

                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(
                                elem.body["scroll" + name], doc["scroll" + name],
                                elem.body["offset" + name], doc["offset" + name],
                                doc["client" + name]
                            );
                        }

                        return value === undefined ?

                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :

                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable);
                };
            });
    });


    jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function (_i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });




    jQuery.fn.extend({

        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },

        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {

            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ?
                this.off(selector, "**") :
                this.off(types, selector || "**", fn);
        },

        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });

    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu").split(" "),
        function (_i, name) {

            // Handle event binding
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });




    // Support: Android <=4.0 only
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    // Bind a function to a context, optionally partially applying any
    // arguments.
    // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
    // However, it is not slated for removal any time soon
    jQuery.proxy = function (fn, context) {
        var tmp, args, proxy;

        if (typeof context === "string") {
            tmp = fn[context];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if (!isFunction(fn)) {
            return undefined;
        }

        // Simulated bind
        args = slice.call(arguments, 2);
        proxy = function () {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
    };

    jQuery.holdReady = function (hold) {
        if (hold) {
            jQuery.readyWait++;
        } else {
            jQuery.ready(true);
        }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;

    jQuery.now = Date.now;

    jQuery.isNumeric = function (obj) {

        // As of jQuery 3.0, isNumeric is limited to
        // strings and numbers (primitives or objects)
        // that can be coerced to finite numbers (gh-2662)
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") &&

            // parseFloat NaNs numeric-cast false positives ("")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            !isNaN(obj - parseFloat(obj));
    };

    jQuery.trim = function (text) {
        return text == null ?
            "" :
            (text + "").replace(rtrim, "");
    };



    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.

    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }




    var

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    // Expose jQuery and $ identifiers, even in AMD
    // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (typeof noGlobal === "undefined") {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;
});

/*


     ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ██╗   ██╗     
     ██║██╔═══██╗██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝     
     ██║██║   ██║██║   ██║█████╗  ██████╔╝ ╚████╔╝      
██   ██║██║▄▄ ██║██║   ██║██╔══╝  ██╔══██╗  ╚██╔╝       
╚█████╔╝╚██████╔╝╚██████╔╝███████╗██║  ██║   ██║        
 ╚════╝  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝        
                                                        
███╗   ███╗██╗ ██████╗ ██████╗  █████╗ ████████╗███████╗
████╗ ████║██║██╔════╝ ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
██╔████╔██║██║██║  ███╗██████╔╝███████║   ██║   █████╗  
██║╚██╔╝██║██║██║   ██║██╔══██╗██╔══██║   ██║   ██╔══╝  
██║ ╚═╝ ██║██║╚██████╔╝██║  ██║██║  ██║   ██║   ███████╗
╚═╝     ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
                                                        


*/

/*!
 * jQuery Migrate - v1.4.1 - 2016-05-19
 * Copyright jQuery Foundation and other contributors
 */
(function (jQuery, window, undefined) {
    // See http://bugs.jquery.com/ticket/13335
    // "use strict";


    jQuery.migrateVersion = "1.4.1";


    var warnedAbout = {};

    // List of warnings already given; public read only
    jQuery.migrateWarnings = [];

    // Set to true to prevent console output; migrateWarnings still maintained
    // jQuery.migrateMute = false;

    // Show a message on the console so devs know we're active
    if (window.console && window.console.log) {
        window.console.log("JQMIGRATE: Migrate is installed" +
            (jQuery.migrateMute ? "" : " with logging active") +
            ", version " + jQuery.migrateVersion);
    }

    // Set to false to disable traces that appear with warnings
    if (jQuery.migrateTrace === undefined) {
        jQuery.migrateTrace = true;
    }

    // Forget any warnings we've already given; public
    jQuery.migrateReset = function () {
        warnedAbout = {};
        jQuery.migrateWarnings.length = 0;
    };

    function migrateWarn(msg) {
        var console = window.console;
        if (!warnedAbout[msg]) {
            warnedAbout[msg] = true;
            jQuery.migrateWarnings.push(msg);
            if (console && console.warn && !jQuery.migrateMute) {
                console.warn("JQMIGRATE: " + msg);
                if (jQuery.migrateTrace && console.trace) {
                    console.trace();
                }
            }
        }
    }

    function migrateWarnProp(obj, prop, value, msg) {
        if (Object.defineProperty) {
            // On ES5 browsers (non-oldIE), warn if the code tries to get prop;
            // allow property to be overwritten in case some other plugin wants it
            try {
                Object.defineProperty(obj, prop, {
                    configurable: true,
                    enumerable: true,
                    get: function () {
                        migrateWarn(msg);
                        return value;
                    },
                    set: function (newValue) {
                        migrateWarn(msg);
                        value = newValue;
                    }
                });
                return;
            } catch (err) {
                // IE8 is a dope about Object.defineProperty, can't warn there
            }
        }

        // Non-ES5 (or broken) browser; just set the property
        jQuery._definePropertyBroken = true;
        obj[prop] = value;
    }

    if (document.compatMode === "BackCompat") {
        // jQuery has never supported or tested Quirks Mode
        migrateWarn("jQuery is not compatible with Quirks Mode");
    }


    var attrFn = jQuery("<input/>", {
        size: 1
    }).attr("size") && jQuery.attrFn,
        oldAttr = jQuery.attr,
        valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get ||
            function () {
                return null;
            },
        valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set ||
            function () {
                return undefined;
            },
        rnoType = /^(?:input|button)$/i,
        rnoAttrNodeType = /^[238]$/,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        ruseDefault = /^(?:checked|selected)$/i;

    // jQuery.attrFn
    migrateWarnProp(jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated");

    jQuery.attr = function (elem, name, value, pass) {
        var lowerName = name.toLowerCase(),
            nType = elem && elem.nodeType;

        if (pass) {
            // Since pass is used internally, we only warn for new jQuery
            // versions where there isn't a pass arg in the formal params
            if (oldAttr.length < 4) {
                migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
            }
            if (elem && !rnoAttrNodeType.test(nType) &&
                (attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name]))) {
                return jQuery(elem)[name](value);
            }
        }

        // Warn if user tries to set `type`, since it breaks on IE 6/7/8; by checking
        // for disconnected elements we don't warn on $( "<button>", { type: "button" } ).
        if (name === "type" && value !== undefined && rnoType.test(elem.nodeName) && elem.parentNode) {
            migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
        }

        // Restore boolHook for boolean property/attribute synchronization
        if (!jQuery.attrHooks[lowerName] && rboolean.test(lowerName)) {
            jQuery.attrHooks[lowerName] = {
                get: function (elem, name) {
                    // Align boolean attributes with corresponding properties
                    // Fall back to attribute presence where some booleans are not supported
                    var attrNode,
                        property = jQuery.prop(elem, name);
                    return property === true || typeof property !== "boolean" &&
                        (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ?

                        name.toLowerCase() :
                        undefined;
                },
                set: function (elem, value, name) {
                    var propName;
                    if (value === false) {
                        // Remove boolean attributes when set to false
                        jQuery.removeAttr(elem, name);
                    } else {
                        // value is true since we know at this point it's type boolean and not false
                        // Set boolean attributes to the same name and set the DOM property
                        propName = jQuery.propFix[name] || name;
                        if (propName in elem) {
                            // Only set the IDL specifically if it already exists on the element
                            elem[propName] = true;
                        }

                        elem.setAttribute(name, name.toLowerCase());
                    }
                    return name;
                }
            };

            // Warn only for attributes that can remain distinct from their properties post-1.9
            if (ruseDefault.test(lowerName)) {
                migrateWarn("jQuery.fn.attr('" + lowerName + "') might use property instead of attribute");
            }
        }

        return oldAttr.call(jQuery, elem, name, value);
    };

    // attrHooks: value
    jQuery.attrHooks.value = {
        get: function (elem, name) {
            var nodeName = (elem.nodeName || "").toLowerCase();
            if (nodeName === "button") {
                return valueAttrGet.apply(this, arguments);
            }
            if (nodeName !== "input" && nodeName !== "option") {
                migrateWarn("jQuery.fn.attr('value') no longer gets properties");
            }
            return name in elem ?
                elem.value :
                null;
        },
        set: function (elem, value) {
            var nodeName = (elem.nodeName || "").toLowerCase();
            if (nodeName === "button") {
                return valueAttrSet.apply(this, arguments);
            }
            if (nodeName !== "input" && nodeName !== "option") {
                migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");
            }
            // Does not return so that setAttribute is also used
            elem.value = value;
        }
    };


    var matched, browser,
        oldInit = jQuery.fn.init,
        oldFind = jQuery.find,
        oldParseJSON = jQuery.parseJSON,
        rspaceAngle = /^\s*</,
        rattrHashTest = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
        rattrHashGlob = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
        // Note: XSS check is done below after string is trimmed
        rquickExpr = /^([^<]*)(<[\w\W]+>)([^>]*)$/;

    // $(html) "looks like html" rule change
    jQuery.fn.init = function (selector, context, rootjQuery) {
        var match, ret;

        if (selector && typeof selector === "string") {
            if (!jQuery.isPlainObject(context) &&
                (match = rquickExpr.exec(jQuery.trim(selector))) && match[0]) {

                // This is an HTML string according to the "old" rules; is it still?
                if (!rspaceAngle.test(selector)) {
                    migrateWarn("$(html) HTML strings must start with '<' character");
                }
                if (match[3]) {
                    migrateWarn("$(html) HTML text after last tag is ignored");
                }

                // Consistently reject any HTML-like string starting with a hash (gh-9521)
                // Note that this may break jQuery 1.6.x code that otherwise would work.
                if (match[0].charAt(0) === "#") {
                    migrateWarn("HTML string cannot start with a '#' character");
                    jQuery.error("JQMIGRATE: Invalid selector string (XSS)");
                }

                // Now process using loose rules; let pre-1.8 play too
                // Is this a jQuery context? parseHTML expects a DOM element (#178)
                if (context && context.context && context.context.nodeType) {
                    context = context.context;
                }

                if (jQuery.parseHTML) {
                    return oldInit.call(this,
                        jQuery.parseHTML(match[2], context && context.ownerDocument ||
                            context || document, true), context, rootjQuery);
                }
            }
        }

        ret = oldInit.apply(this, arguments);

        // Fill in selector and context properties so .live() works
        if (selector && selector.selector !== undefined) {
            // A jQuery object, copy its properties
            ret.selector = selector.selector;
            ret.context = selector.context;

        } else {
            ret.selector = typeof selector === "string" ? selector : "";
            if (selector) {
                ret.context = selector.nodeType ? selector : context || document;
            }
        }

        return ret;
    };
    jQuery.fn.init.prototype = jQuery.fn;

    jQuery.find = function (selector) {
        var args = Array.prototype.slice.call(arguments);

        // Support: PhantomJS 1.x
        // String#match fails to match when used with a //g RegExp, only on some strings
        if (typeof selector === "string" && rattrHashTest.test(selector)) {

            // The nonstandard and undocumented unquoted-hash was removed in jQuery 1.12.0
            // First see if qS thinks it's a valid selector, if so avoid a false positive
            try {
                document.querySelector(selector);
            } catch (err1) {

                // Didn't *look* valid to qSA, warn and try quoting what we think is the value
                selector = selector.replace(rattrHashGlob, function (_, attr, op, value) {
                    return "[" + attr + op + "\"" + value + "\"]";
                });

                // If the regexp *may* have created an invalid selector, don't update it
                // Note that there may be false alarms if selector uses jQuery extensions
                try {
                    document.querySelector(selector);
                    migrateWarn("Attribute selector with '#' must be quoted: " + args[0]);
                    args[0] = selector;
                } catch (err2) {
                    migrateWarn("Attribute selector with '#' was not fixed: " + args[0]);
                }
            }
        }

        return oldFind.apply(this, args);
    };

    // Copy properties attached to original jQuery.find method (e.g. .attr, .isXML)
    var findProp;
    for (findProp in oldFind) {
        if (Object.prototype.hasOwnProperty.call(oldFind, findProp)) {
            jQuery.find[findProp] = oldFind[findProp];
        }
    }

    // Let $.parseJSON(falsy_value) return null
    jQuery.parseJSON = function (json) {
        if (!json) {
            migrateWarn("jQuery.parseJSON requires a valid JSON string");
            return null;
        }
        return oldParseJSON.apply(this, arguments);
    };

    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    // Don't clobber any existing jQuery.browser in case it's different
    if (!jQuery.browser) {
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};

        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }

        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }

        jQuery.browser = browser;
    }

    // Warn if the code tries to get jQuery.browser
    migrateWarnProp(jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated");

    // jQuery.boxModel deprecated in 1.3, jQuery.support.boxModel deprecated in 1.7
    jQuery.boxModel = jQuery.support.boxModel = (document.compatMode === "CSS1Compat");
    migrateWarnProp(jQuery, "boxModel", jQuery.boxModel, "jQuery.boxModel is deprecated");
    migrateWarnProp(jQuery.support, "boxModel", jQuery.support.boxModel, "jQuery.support.boxModel is deprecated");

    jQuery.sub = function () {
        function jQuerySub(selector, context) {
            return new jQuerySub.fn.init(selector, context);
        }
        jQuery.extend(true, jQuerySub, this);
        jQuerySub.superclass = this;
        jQuerySub.fn = jQuerySub.prototype = this();
        jQuerySub.fn.constructor = jQuerySub;
        jQuerySub.sub = this.sub;
        jQuerySub.fn.init = function init(selector, context) {
            var instance = jQuery.fn.init.call(this, selector, context, rootjQuerySub);
            return instance instanceof jQuerySub ?
                instance :
                jQuerySub(instance);
        };
        jQuerySub.fn.init.prototype = jQuerySub.fn;
        var rootjQuerySub = jQuerySub(document);
        migrateWarn("jQuery.sub() is deprecated");
        return jQuerySub;
    };

    // The number of elements contained in the matched element set
    jQuery.fn.size = function () {
        migrateWarn("jQuery.fn.size() is deprecated; use the .length property");
        return this.length;
    };


    var internalSwapCall = false;

    // If this version of jQuery has .swap(), don't false-alarm on internal uses
    if (jQuery.swap) {
        jQuery.each(["height", "width", "reliableMarginRight"], function (_, name) {
            var oldHook = jQuery.cssHooks[name] && jQuery.cssHooks[name].get;

            if (oldHook) {
                jQuery.cssHooks[name].get = function () {
                    var ret;

                    internalSwapCall = true;
                    ret = oldHook.apply(this, arguments);
                    internalSwapCall = false;
                    return ret;
                };
            }
        });
    }

    jQuery.swap = function (elem, options, callback, args) {
        var ret, name,
            old = {};

        if (!internalSwapCall) {
            migrateWarn("jQuery.swap() is undocumented and deprecated");
        }

        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        ret = callback.apply(elem, args || []);

        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }

        return ret;
    };


    // Ensure that $.ajax gets the new parseJSON defined in core.js
    jQuery.ajaxSetup({
        converters: {
            "text json": jQuery.parseJSON
        }
    });


    var oldFnData = jQuery.fn.data;

    jQuery.fn.data = function (name) {
        var ret, evt,
            elem = this[0];

        // Handles 1.7 which has this behavior and 1.8 which doesn't
        if (elem && name === "events" && arguments.length === 1) {
            ret = jQuery.data(elem, name);
            evt = jQuery._data(elem, name);
            if ((ret === undefined || ret === evt) && evt !== undefined) {
                migrateWarn("Use of jQuery.fn.data('events') is deprecated");
                return evt;
            }
        }
        return oldFnData.apply(this, arguments);
    };


    var rscriptType = /\/(java|ecma)script/i;

    // Since jQuery.clean is used internally on older versions, we only shim if it's missing
    if (!jQuery.clean) {
        jQuery.clean = function (elems, context, fragment, scripts) {
            // Set context per 1.8 logic
            context = context || document;
            context = !context.nodeType && context[0] || context;
            context = context.ownerDocument || context;

            migrateWarn("jQuery.clean() is deprecated");

            var i, elem, handleScript, jsTags,
                ret = [];

            jQuery.merge(ret, jQuery.buildFragment(elems, context).childNodes);

            // Complex logic lifted directly from jQuery 1.8
            if (fragment) {
                // Special handling of each script element
                handleScript = function (elem) {
                    // Check if we consider it executable
                    if (!elem.type || rscriptType.test(elem.type)) {
                        // Detach the script and store it in the scripts array (if provided) or the fragment
                        // Return truthy to indicate that it has been handled
                        return scripts ?
                            scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) :
                            fragment.appendChild(elem);
                    }
                };

                for (i = 0;
                    (elem = ret[i]) != null; i++) {
                    // Check if we're done after handling an executable script
                    if (!(jQuery.nodeName(elem, "script") && handleScript(elem))) {
                        // Append to fragment and handle embedded scripts
                        fragment.appendChild(elem);
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
                            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);

                            // Splice the scripts into ret after their former ancestor and advance our index beyond them
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                            i += jsTags.length;
                        }
                    }
                }
            }

            return ret;
        };
    }

    var eventAdd = jQuery.event.add,
        eventRemove = jQuery.event.remove,
        eventTrigger = jQuery.event.trigger,
        oldToggle = jQuery.fn.toggle,
        oldLive = jQuery.fn.live,
        oldDie = jQuery.fn.die,
        oldLoad = jQuery.fn.load,
        ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
        rajaxEvent = new RegExp("\\b(?:" + ajaxEvents + ")\\b"),
        rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
        hoverHack = function (events) {
            if (typeof (events) !== "string" || jQuery.event.special.hover) {
                return events;
            }
            if (rhoverHack.test(events)) {
                migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
            }
            return events && events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
        };

    // Event props removed in 1.9, put them back if needed; no practical way to warn them
    if (jQuery.event.props && jQuery.event.props[0] !== "attrChange") {
        jQuery.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement");
    }

    // Undocumented jQuery.event.handle was "deprecated" in jQuery 1.7
    if (jQuery.event.dispatch) {
        migrateWarnProp(jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated");
    }

    // Support for 'hover' pseudo-event and ajax event warnings
    jQuery.event.add = function (elem, types, handler, data, selector) {
        if (elem !== document && rajaxEvent.test(types)) {
            migrateWarn("AJAX events should be attached to document: " + types);
        }
        eventAdd.call(this, elem, hoverHack(types || ""), handler, data, selector);
    };
    jQuery.event.remove = function (elem, types, handler, selector, mappedTypes) {
        eventRemove.call(this, elem, hoverHack(types) || "", handler, selector, mappedTypes);
    };

    jQuery.each(["load", "unload", "error"], function (_, name) {

        jQuery.fn[name] = function () {
            var args = Array.prototype.slice.call(arguments, 0);

            // If this is an ajax load() the first arg should be the string URL;
            // technically this could also be the "Anything" arg of the event .load()
            // which just goes to show why this dumb signature has been deprecated!
            // jQuery custom builds that exclude the Ajax module justifiably die here.
            if (name === "load" && typeof args[0] === "string") {
                return oldLoad.apply(this, args);
            }

            migrateWarn("jQuery.fn." + name + "() is deprecated");

            args.splice(0, 0, name);
            if (arguments.length) {
                return this.bind.apply(this, args);
            }

            // Use .triggerHandler here because:
            // - load and unload events don't need to bubble, only applied to window or image
            // - error event should not bubble to window, although it does pre-1.7
            // See http://bugs.jquery.com/ticket/11820
            this.triggerHandler.apply(this, args);
            return this;
        };

    });

    jQuery.fn.toggle = function (fn, fn2) {

        // Don't mess with animation or css toggles
        if (!jQuery.isFunction(fn) || !jQuery.isFunction(fn2)) {
            return oldToggle.apply(this, arguments);
        }
        migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");

        // Save reference to arguments for access in closure
        var args = arguments,
            guid = fn.guid || jQuery.guid++,
            i = 0,
            toggler = function (event) {
                // Figure out which function to execute
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);

                // Make sure that clicks stop
                event.preventDefault();

                // and execute the function
                return args[lastToggle].apply(this, arguments) || false;
            };

        // link all the functions, so any of them can unbind this click handler
        toggler.guid = guid;
        while (i < args.length) {
            args[i++].guid = guid;
        }

        return this.click(toggler);
    };

    jQuery.fn.live = function (types, data, fn) {
        migrateWarn("jQuery.fn.live() is deprecated");
        if (oldLive) {
            return oldLive.apply(this, arguments);
        }
        jQuery(this.context).on(types, this.selector, data, fn);
        return this;
    };

    jQuery.fn.die = function (types, fn) {
        migrateWarn("jQuery.fn.die() is deprecated");
        if (oldDie) {
            return oldDie.apply(this, arguments);
        }
        jQuery(this.context).off(types, this.selector || "**", fn);
        return this;
    };

    // Turn global events into document-triggered events
    jQuery.event.trigger = function (event, data, elem, onlyHandlers) {
        if (!elem && !rajaxEvent.test(event)) {
            migrateWarn("Global events are undocumented and deprecated");
        }
        return eventTrigger.call(this, event, data, elem || document, onlyHandlers);
    };
    jQuery.each(ajaxEvents.split("|"),
        function (_, name) {
            jQuery.event.special[name] = {
                setup: function () {
                    var elem = this;

                    // The document needs no shimming; must be !== for oldIE
                    if (elem !== document) {
                        jQuery.event.add(document, name + "." + jQuery.guid, function () {
                            jQuery.event.trigger(name, Array.prototype.slice.call(arguments, 1), elem, true);
                        });
                        jQuery._data(this, name, jQuery.guid++);
                    }
                    return false;
                },
                teardown: function () {
                    if (this !== document) {
                        jQuery.event.remove(document, name + "." + jQuery._data(this, name));
                    }
                    return false;
                }
            };
        }
    );

    jQuery.event.special.ready = {
        setup: function () {
            if (this === document) {
                migrateWarn("'ready' event is deprecated");
            }
        }
    };

    var oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack,
        oldFnFind = jQuery.fn.find;

    jQuery.fn.andSelf = function () {
        migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
        return oldSelf.apply(this, arguments);
    };

    jQuery.fn.find = function (selector) {
        var ret = oldFnFind.apply(this, arguments);
        ret.context = this.context;
        ret.selector = this.selector ? this.selector + " " + selector : selector;
        return ret;
    };


    // jQuery 1.6 did not support Callbacks, do not warn there
    if (jQuery.Callbacks) {

        var oldDeferred = jQuery.Deferred,
            tuples = [
                // action, add listener, callbacks, .then handlers, final state
                ["resolve", "done", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), "resolved"
                ],
                ["reject", "fail", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), "rejected"
                ],
                ["notify", "progress", jQuery.Callbacks("memory"),
                    jQuery.Callbacks("memory")
                ]
            ];

        jQuery.Deferred = function (func) {
            var deferred = oldDeferred(),
                promise = deferred.promise();

            deferred.pipe = promise.pipe = function ( /* fnDone, fnFail, fnProgress */) {
                var fns = arguments;

                migrateWarn("deferred.pipe() is deprecated");

                return jQuery.Deferred(function (newDefer) {
                    jQuery.each(tuples, function (i, tuple) {
                        var fn = jQuery.isFunction(fns[i]) && fns[i];
                        // deferred.done(function() { bind to newDefer or newDefer.resolve })
                        // deferred.fail(function() { bind to newDefer or newDefer.reject })
                        // deferred.progress(function() { bind to newDefer or newDefer.notify })
                        deferred[tuple[1]](function () {
                            var returned = fn && fn.apply(this, arguments);
                            if (returned && jQuery.isFunction(returned.promise)) {
                                returned.promise()
                                    .done(newDefer.resolve)
                                    .fail(newDefer.reject)
                                    .progress(newDefer.notify);
                            } else {
                                newDefer[tuple[0] + "With"](
                                    this === promise ? newDefer.promise() : this,
                                    fn ? [returned] : arguments
                                );
                            }
                        });
                    });
                    fns = null;
                }).promise();

            };

            deferred.isResolved = function () {
                migrateWarn("deferred.isResolved is deprecated");
                return deferred.state() === "resolved";
            };

            deferred.isRejected = function () {
                migrateWarn("deferred.isRejected is deprecated");
                return deferred.state() === "rejected";
            };

            if (func) {
                func.call(deferred, deferred);
            }

            return deferred;
        };

    }

})(jQuery, window);

/*



 █████╗ ██╗     ███████╗██████╗ ████████╗██╗███████╗██╗   ██╗
██╔══██╗██║     ██╔════╝██╔══██╗╚══██╔══╝██║██╔════╝╚██╗ ██╔╝
███████║██║     █████╗  ██████╔╝   ██║   ██║█████╗   ╚████╔╝ 
██╔══██║██║     ██╔══╝  ██╔══██╗   ██║   ██║██╔══╝    ╚██╔╝  
██║  ██║███████╗███████╗██║  ██║   ██║   ██║██║        ██║   
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝        ╚═╝   
                                                             



*/

/*! alertify - v0.3.11 - 2013-10-08 */
/*global define*/
(function (global, undefined) {
    "use strict";

    var document = global.document,
        Alertify;

    Alertify = function () {

        var _alertify = {},
            dialogs = {},
            isopen = false,
            keys = {
                ENTER: 13,
                ESC: 27,
                SPACE: 32
            },
            queue = [],
            $, btnCancel, btnOK, btnReset, btnResetBack, btnFocus, elCallee, elCover, elDialog, elLog, form, input, getTransitionEvent;

        /**
         * Markup pieces
         * @type {Object}
         */
        dialogs = {
            buttons: {
                holder: "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
                submit: "<button type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
                ok: "<button class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
                cancel: "<button class=\"alertify-button alertify-button-cancel\" id=\"alertify-cancel\">{{cancel}}</button>"
            },
            input: "<div class=\"alertify-text-wrapper\"><input type=\"text\" class=\"alertify-text\" id=\"alertify-text\"></div>",
            message: "<p class=\"alertify-message\">{{message}}</p>",
            log: "<article class=\"alertify-log{{class}}\">{{message}}</article>"
        };

        /**
         * Return the proper transitionend event
         * @return {String}    Transition type string
         */
        getTransitionEvent = function () {
            var t,
                type,
                supported = false,
                el = document.createElement("fakeelement"),
                transitions = {
                    "WebkitTransition": "webkitTransitionEnd",
                    "MozTransition": "transitionend",
                    "OTransition": "otransitionend",
                    "transition": "transitionend"
                };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    type = transitions[t];
                    supported = true;
                    break;
                }
            }

            return {
                type: type,
                supported: supported
            };
        };

        /**
         * Shorthand for document.getElementById()
         *
         * @param  {String} id    A specific element ID
         * @return {Object}       HTML element
         */
        $ = function (id) {
            return document.getElementById(id);
        };

        /**
         * Alertify private object
         * @type {Object}
         */
        _alertify = {

            /**
             * Labels object
             * @type {Object}
             */
            labels: {
                ok: "OK",
                cancel: "Cancel"
            },

            /**
             * Delay number
             * @type {Number}
             */
            delay: 5000,

            /**
             * Whether buttons are reversed (default is secondary/primary)
             * @type {Boolean}
             */
            buttonReverse: false,

            /**
             * Which button should be focused by default
             * @type {String}	"ok" (default), "cancel", or "none"
             */
            buttonFocus: "ok",

            /**
             * Set the transition event on load
             * @type {[type]}
             */
            transition: undefined,

            /**
             * Set the proper button click events
             *
             * @param {Function} fn    [Optional] Callback function
             *
             * @return {undefined}
             */
            addListeners: function (fn) {
                var hasOK = (typeof btnOK !== "undefined"),
                    hasCancel = (typeof btnCancel !== "undefined"),
                    hasInput = (typeof input !== "undefined"),
                    val = "",
                    self = this,
                    ok, cancel, common, key, reset;

                // ok event handler
                ok = function (event) {
                    if (typeof event.preventDefault !== "undefined") event.preventDefault();
                    common(event);
                    if (typeof input !== "undefined") val = input.value;
                    if (typeof fn === "function") {
                        if (typeof input !== "undefined") {
                            fn(true, val);
                        } else fn(true);
                    }
                    return false;
                };

                // cancel event handler
                cancel = function (event) {
                    if (typeof event.preventDefault !== "undefined") event.preventDefault();
                    common(event);
                    if (typeof fn === "function") fn(false);
                    return false;
                };

                // common event handler (keyup, ok and cancel)
                common = function (event) {
                    self.hide();
                    self.unbind(document.body, "keyup", key);
                    self.unbind(btnReset, "focus", reset);
                    if (hasOK) self.unbind(btnOK, "click", ok);
                    if (hasCancel) self.unbind(btnCancel, "click", cancel);
                };

                // keyup handler
                key = function (event) {
                    var keyCode = event.keyCode;
                    if ((keyCode === keys.SPACE && !hasInput) || (hasInput && keyCode === keys.ENTER)) ok(event);
                    if (keyCode === keys.ESC && hasCancel) cancel(event);
                };

                // reset focus to first item in the dialog
                reset = function (event) {
                    if (hasInput) input.focus();
                    else if (!hasCancel || self.buttonReverse) btnOK.focus();
                    else btnCancel.focus();
                };

                // handle reset focus link
                // this ensures that the keyboard focus does not
                // ever leave the dialog box until an action has
                // been taken
                this.bind(btnReset, "focus", reset);
                this.bind(btnResetBack, "focus", reset);
                // handle OK click
                if (hasOK) this.bind(btnOK, "click", ok);
                // handle Cancel click
                if (hasCancel) this.bind(btnCancel, "click", cancel);
                // listen for keys, Cancel => ESC
                this.bind(document.body, "keyup", key);
                if (!this.transition.supported) {
                    this.setFocus();
                }
            },

            /**
             * Bind events to elements
             *
             * @param  {Object}   el       HTML Object
             * @param  {Event}    event    Event to attach to element
             * @param  {Function} fn       Callback function
             *
             * @return {undefined}
             */
            bind: function (el, event, fn) {
                if (typeof el.addEventListener === "function") {
                    el.addEventListener(event, fn, false);
                } else if (el.attachEvent) {
                    el.attachEvent("on" + event, fn);
                }
            },

            /**
             * Use alertify as the global error handler (using window.onerror)
             *
             * @return {boolean} success
             */
            handleErrors: function () {
                if (typeof global.onerror !== "undefined") {
                    var self = this;
                    global.onerror = function (msg, url, line) {
                        self.error("[" + msg + " on line " + line + " of " + url + "]", 0);
                    };
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * Append button HTML strings
             *
             * @param {String} secondary    The secondary button HTML string
             * @param {String} primary      The primary button HTML string
             *
             * @return {String}             The appended button HTML strings
             */
            appendButtons: function (secondary, primary) {
                return this.buttonReverse ? primary + secondary : secondary + primary;
            },

            /**
             * Build the proper message box
             *
             * @param  {Object} item    Current object in the queue
             *
             * @return {String}         An HTML string of the message box
             */
            build: function (item) {
                var html = "",
                    type = item.type,
                    message = item.message,
                    css = item.cssClass || "";

                html += "<div class=\"alertify-dialog\">";
                html += "<a id=\"alertify-resetFocusBack\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";

                if (_alertify.buttonFocus === "none") html += "<a href=\"#\" id=\"alertify-noneFocus\" class=\"alertify-hidden\"></a>";

                // doens't require an actual form
                if (type === "prompt") html += "<div id=\"alertify-form\">";

                html += "<article class=\"alertify-inner\">";
                html += dialogs.message.replace("{{message}}", message);

                if (type === "prompt") html += dialogs.input;

                html += dialogs.buttons.holder;
                html += "</article>";

                if (type === "prompt") html += "</div>";

                html += "<a id=\"alertify-resetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
                html += "</div>";

                switch (type) {
                    case "confirm":
                        html = html.replace("{{buttons}}", this.appendButtons(dialogs.buttons.cancel, dialogs.buttons.ok));
                        html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case "prompt":
                        html = html.replace("{{buttons}}", this.appendButtons(dialogs.buttons.cancel, dialogs.buttons.submit));
                        html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case "alert":
                        html = html.replace("{{buttons}}", dialogs.buttons.ok);
                        html = html.replace("{{ok}}", this.labels.ok);
                        break;
                    default:
                        break;
                }

                elDialog.className = "alertify alertify-" + type + " " + css;
                elCover.className = "alertify-cover";
                return html;
            },

            /**
             * Close the log messages
             *
             * @param  {Object} elem    HTML Element of log message to close
             * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
             *
             * @return {undefined}
             */
            close: function (elem, wait) {
                // Unary Plus: +"2" === 2
                var timer = (wait && !isNaN(wait)) ? +wait : this.delay,
                    self = this,
                    hideElement, transitionDone;

                // set click event on log messages
                this.bind(elem, "click", function () {
                    hideElement(elem);
                });
                // Hide the dialog box after transition
                // This ensure it doens't block any element from being clicked
                transitionDone = function (event) {
                    event.stopPropagation();
                    // unbind event so function only gets called once
                    self.unbind(this, self.transition.type, transitionDone);
                    // remove log message
                    elLog.removeChild(this);
                    if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
                };
                // this sets the hide class to transition out
                // or removes the child if css transitions aren't supported
                hideElement = function (el) {
                    // ensure element exists
                    if (typeof el !== "undefined" && el.parentNode === elLog) {
                        // whether CSS transition exists
                        if (self.transition.supported) {
                            self.bind(el, self.transition.type, transitionDone);
                            el.className += " alertify-log-hide";
                        } else {
                            elLog.removeChild(el);
                            if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
                        }
                    }
                };
                // never close (until click) if wait is set to 0
                if (wait === 0) return;
                // set timeout to auto close the log message
                setTimeout(function () {
                    hideElement(elem);
                }, timer);
            },

            /**
             * Create a dialog box
             *
             * @param  {String}   message        The message passed from the callee
             * @param  {String}   type           Type of dialog to create
             * @param  {Function} fn             [Optional] Callback function
             * @param  {String}   placeholder    [Optional] Default value for prompt input field
             * @param  {String}   cssClass       [Optional] Class(es) to append to dialog box
             *
             * @return {Object}
             */
            dialog: function (message, type, fn, placeholder, cssClass) {
                // set the current active element
                // this allows the keyboard focus to be resetted
                // after the dialog box is closed
                elCallee = document.activeElement;
                // check to ensure the alertify dialog element
                // has been successfully created
                var check = function () {
                    if ((elLog && elLog.scrollTop !== null) && (elCover && elCover.scrollTop !== null)) return;
                    else check();
                };
                // error catching
                if (typeof message !== "string") throw new Error("message must be a string");
                if (typeof type !== "string") throw new Error("type must be a string");
                if (typeof fn !== "undefined" && typeof fn !== "function") throw new Error("fn must be a function");
                // initialize alertify if it hasn't already been done
                this.init();
                check();

                queue.push({
                    type: type,
                    message: message,
                    callback: fn,
                    placeholder: placeholder,
                    cssClass: cssClass
                });
                if (!isopen) this.setup();

                return this;
            },

            /**
             * Extend the log method to create custom methods
             *
             * @param  {String} type    Custom method name
             *
             * @return {Function}
             */
            extend: function (type) {
                if (typeof type !== "string") throw new Error("extend method must have exactly one parameter");
                return function (message, wait) {
                    this.log(message, type, wait);
                    return this;
                };
            },

            /**
             * Hide the dialog and rest to defaults
             *
             * @return {undefined}
             */
            hide: function () {
                var transitionDone,
                    self = this;
                // remove reference from queue
                queue.splice(0, 1);
                // if items remaining in the queue
                if (queue.length > 0) this.setup(true);
                else {
                    isopen = false;
                    // Hide the dialog box after transition
                    // This ensure it doens't block any element from being clicked
                    transitionDone = function (event) {
                        event.stopPropagation();
                        // unbind event so function only gets called once
                        self.unbind(elDialog, self.transition.type, transitionDone);
                    };
                    // whether CSS transition exists
                    if (this.transition.supported) {
                        this.bind(elDialog, this.transition.type, transitionDone);
                        elDialog.className = "alertify alertify-hide alertify-hidden";
                    } else {
                        elDialog.className = "alertify alertify-hide alertify-hidden alertify-isHidden";
                    }
                    elCover.className = "alertify-cover alertify-cover-hidden";
                    // set focus to the last element or body
                    // after the dialog is closed
                    elCallee.focus();
                }
            },

            /**
             * Initialize Alertify
             * Create the 2 main elements
             *
             * @return {undefined}
             */
            init: function () {
                // ensure legacy browsers support html5 tags
                document.createElement("nav");
                document.createElement("article");
                document.createElement("section");
                // cover
                if ($("alertify-cover") == null) {
                    elCover = document.createElement("div");
                    elCover.setAttribute("id", "alertify-cover");
                    elCover.className = "alertify-cover alertify-cover-hidden";
                    document.body.appendChild(elCover);
                }
                // main element
                if ($("alertify") == null) {
                    isopen = false;
                    queue = [];
                    elDialog = document.createElement("section");
                    elDialog.setAttribute("id", "alertify");
                    elDialog.className = "alertify alertify-hidden";
                    document.body.appendChild(elDialog);
                }
                // log element
                if ($("alertify-logs") == null) {
                    elLog = document.createElement("section");
                    elLog.setAttribute("id", "alertify-logs");
                    elLog.className = "alertify-logs alertify-logs-hidden";
                    document.body.appendChild(elLog);
                }
                // set tabindex attribute on body element
                // this allows script to give it focus
                // after the dialog is closed
                document.body.setAttribute("tabindex", "0");
                // set transition type
                this.transition = getTransitionEvent();
            },

            /**
             * Show a new log message box
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Optional type of log message
             * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
             *
             * @return {Object}
             */
            log: function (message, type, wait) {
                // check to ensure the alertify dialog element
                // has been successfully created
                var check = function () {
                    if (elLog && elLog.scrollTop !== null) return;
                    else check();
                };
                // initialize alertify if it hasn't already been done
                this.init();
                check();

                elLog.className = "alertify-logs";
                this.notify(message, type, wait);
                return this;
            },

            /**
             * Add new log message
             * If a type is passed, a class name "alertify-log-{type}" will get added.
             * This allows for custom look and feel for various types of notifications.
             *
             * @param  {String} message    The message passed from the callee
             * @param  {String} type       [Optional] Type of log message
             * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
             *
             * @return {undefined}
             */
            notify: function (message, type, wait) {
                var log = document.createElement("article");
                log.className = "alertify-log" + ((typeof type === "string" && type !== "") ? " alertify-log-" + type : "");
                log.innerHTML = message;
                // append child
                elLog.appendChild(log);
                // triggers the CSS animation
                setTimeout(function () {
                    log.className = log.className + " alertify-log-show";
                }, 50);
                this.close(log, wait);
            },

            /**
             * Set properties
             *
             * @param {Object} args     Passing parameters
             *
             * @return {undefined}
             */
            set: function (args) {
                var k;
                // error catching
                if (typeof args !== "object" && args instanceof Array) throw new Error("args must be an object");
                // set parameters
                for (k in args) {
                    if (args.hasOwnProperty(k)) {
                        this[k] = args[k];
                    }
                }
            },

            /**
             * Common place to set focus to proper element
             *
             * @return {undefined}
             */
            setFocus: function () {
                if (input) {
                    input.focus();
                    input.select();
                } else btnFocus.focus();
            },

            /**
             * Initiate all the required pieces for the dialog box
             *
             * @return {undefined}
             */
            setup: function (fromQueue) {
                var item = queue[0],
                    self = this,
                    transitionDone;

                // dialog is open
                isopen = true;
                // Set button focus after transition
                transitionDone = function (event) {
                    event.stopPropagation();
                    self.setFocus();
                    // unbind event so function only gets called once
                    self.unbind(elDialog, self.transition.type, transitionDone);
                };
                // whether CSS transition exists
                if (this.transition.supported && !fromQueue) {
                    this.bind(elDialog, this.transition.type, transitionDone);
                }
                // build the proper dialog HTML
                elDialog.innerHTML = this.build(item);
                // assign all the common elements
                btnReset = $("alertify-resetFocus");
                btnResetBack = $("alertify-resetFocusBack");
                btnOK = $("alertify-ok") || undefined;
                btnCancel = $("alertify-cancel") || undefined;
                btnFocus = (_alertify.buttonFocus === "cancel") ? btnCancel : ((_alertify.buttonFocus === "none") ? $("alertify-noneFocus") : btnOK),
                    input = $("alertify-text") || undefined;
                form = $("alertify-form") || undefined;
                // add placeholder value to the input field
                if (typeof item.placeholder === "string" && item.placeholder !== "") input.value = item.placeholder;
                if (fromQueue) this.setFocus();
                this.addListeners(item.callback);
            },

            /**
             * Unbind events to elements
             *
             * @param  {Object}   el       HTML Object
             * @param  {Event}    event    Event to detach to element
             * @param  {Function} fn       Callback function
             *
             * @return {undefined}
             */
            unbind: function (el, event, fn) {
                if (typeof el.removeEventListener === "function") {
                    el.removeEventListener(event, fn, false);
                } else if (el.detachEvent) {
                    el.detachEvent("on" + event, fn);
                }
            }
        };

        return {
            alert: function (message, fn, cssClass) {
                _alertify.dialog(message, "alert", fn, "", cssClass);
                return this;
            },
            confirm: function (message, fn, cssClass) {
                _alertify.dialog(message, "confirm", fn, "", cssClass);
                return this;
            },
            extend: _alertify.extend,
            init: _alertify.init,
            log: function (message, type, wait) {
                _alertify.log(message, type, wait);
                return this;
            },
            prompt: function (message, fn, placeholder, cssClass) {
                _alertify.dialog(message, "prompt", fn, placeholder, cssClass);
                return this;
            },
            success: function (message, wait) {
                _alertify.log(message, "success", wait);
                return this;
            },
            error: function (message, wait) {
                _alertify.log(message, "error", wait);
                return this;
            },
            set: function (args) {
                _alertify.set(args);
            },
            labels: _alertify.labels,
            debug: _alertify.handleErrors
        };
    };

    // AMD and window support
    if (typeof define === "function") {
        define([], function () {
            return new Alertify();
        });
    } else if (typeof global.alertify === "undefined") {
        global.alertify = new Alertify();
    }

}(this));


/*



██████╗ ██╗      █████╗ ███████╗████████╗
██╔══██╗██║     ██╔══██╗██╔════╝╚══██╔══╝
██████╔╝██║     ███████║███████╗   ██║   
██╔══██╗██║     ██╔══██║╚════██║   ██║   
██████╔╝███████╗██║  ██║███████║   ██║   
╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
                                         



*/

/*! Blast.js (2.0.0): julian.com/research/blast (C) 2015 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
! function ($, e, t, a) {
    var r = function () {
        if (t.documentMode) return t.documentMode;
        for (var e = 7; e > 0; e--) {
            var r = t.createElement("div");
            if (r.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", r.getElementsByTagName("span").length) return r = null, e;
            r = null
        }
        return a
    }(),
        n = e.console || {
            log: function () { },
            time: function () { }
        },
        i = "blast",
        s = {
            latinPunctuation: "–—′’'“″„\"(«.…¡¿′’'”″“\")».…!?",
            latinLetters: "\\u0041-\\u005A\\u0061-\\u007A\\u00C0-\\u017F\\u0100-\\u01FF\\u0180-\\u027F"
        },
        l = {
            abbreviations: new RegExp("[^" + s.latinLetters + "](e\\.g\\.)|(i\\.e\\.)|(mr\\.)|(mrs\\.)|(ms\\.)|(dr\\.)|(prof\\.)|(esq\\.)|(sr\\.)|(jr\\.)[^" + s.latinLetters + "]", "ig"),
            innerWordPeriod: new RegExp("[" + s.latinLetters + "].[" + s.latinLetters + "]", "ig"),
            onlyContainsPunctuation: new RegExp("[^" + s.latinPunctuation + "]"),
            adjoinedPunctuation: new RegExp("^[" + s.latinPunctuation + "]+|[" + s.latinPunctuation + "]+$", "g"),
            skippedElements: /(script|style|select|textarea)/i,
            hasPluginClass: new RegExp("(^| )" + i + "( |$)", "gi")
        };
    $.fn[i] = function (d) {
        function o(e) {
            return e.replace(l.abbreviations, function (e) {
                return e.replace(/\./g, "{{46}}")
            }).replace(l.innerWordPeriod, function (e) {
                return e.replace(/\./g, "{{46}}")
            })
        }

        function c(e) {
            return e.replace(/{{(\d{1,3})}}/g, function (e, t) {
                return String.fromCharCode(t)
            })
        }

        function u(e, a) {
            var r = t.createElement(a.tag);
            if (r.className = i, a.customClass && (r.className += " " + a.customClass, a.generateIndexID && (r.id = a.customClass + "-" + f.blastedIndex)), "all" === a.delimiter && /\s/.test(e.data) && (r.style.whiteSpace = "pre-line"), a.generateValueClass === !0 && !a.search && ("character" === a.delimiter || "word" === a.delimiter)) {
                var n, s = e.data;
                "word" === a.delimiter && l.onlyContainsPunctuation.test(s) && (s = s.replace(l.adjoinedPunctuation, "")), n = i + "-" + a.delimiter.toLowerCase() + "-" + s.toLowerCase(), r.className += " " + n
            }
            return a.aria && r.setAttribute("aria-hidden", "true"), r.appendChild(e.cloneNode(!1)), r
        }

        function g(e, t) {
            var a = -1,
                r = 0;
            if (3 === e.nodeType && e.data.length) {
                if (f.nodeBeginning && (e.data = t.search || "sentence" !== t.delimiter ? c(e.data) : o(e.data), f.nodeBeginning = !1), a = e.data.search(h), -1 !== a) {
                    var n = e.data.match(h),
                        i = n[0],
                        s = n[1] || !1;
                    "" === i ? a++ : s && s !== i && (a += i.indexOf(s), i = s);
                    var d = e.splitText(a);
                    d.splitText(i.length), r = 1, t.search || "sentence" !== t.delimiter || (d.data = c(d.data));
                    var p = u(d, t, f.blastedIndex);
                    d.parentNode.replaceChild(p, d), f.wrappers.push(p), f.blastedIndex++
                }
            } else if (1 === e.nodeType && e.hasChildNodes() && !l.skippedElements.test(e.tagName) && !l.hasPluginClass.test(e.className))
                for (var m = 0; m < e.childNodes.length; m++) f.nodeBeginning = !0, m += g(e.childNodes[m], t);
            return r
        }

        function p(t, s) {
            s.debug && n.time("blast reversal");
            var l = !1;
            t.removeClass(i + "-root").removeAttr("aria-label").find("." + i).each(function () {
                var e = $(this);
                if (e.closest("." + i + "-root").length) l = !0;
                else {
                    var t = this.parentNode;
                    7 >= r && t.firstChild.nodeName, t.replaceChild(this.firstChild, this), t.normalize()
                }
            }), e.Zepto ? t.data(i, a) : t.removeData(i), s.debug && (n.log(i + ": Reversed Blast" + (t.attr("id") ? " on #" + t.attr("id") + "." : ".") + (l ? " Skipped reversal on the children of one or more descendant root elements." : "")), n.timeEnd("blast reversal"))
        }
        var m = $.extend({}, $.fn[i].defaults, d),
            h, f = {};
        if (m.search.length && ("string" == typeof m.search || /^\d/.test(parseFloat(m.search)))) m.delimiter = m.search.toString().replace(/[-[\]{,}(.)*+?|^$\\\/]/g, "\\$&"), h = new RegExp("(?:^|[^-" + s.latinLetters + "])(" + m.delimiter + "('s)?)(?![-" + s.latinLetters + "])", "i");
        else switch ("string" == typeof m.delimiter && (m.delimiter = m.delimiter.toLowerCase()), m.delimiter) {
            case "all":
                h = /(.)/;
                break;
            case "letter":
            case "char":
            case "character":
                h = /(\S)/;
                break;
            case "word":
                h = /\s*(\S+)\s*/;
                break;
            case "sentence":
                h = /(?=\S)(([.]{2,})?[^!?]+?([.…!?]+|(?=\s+$)|$)(\s*[′’'”″“")»]+)*)/;
                break;
            case "element":
                h = /(?=\S)([\S\s]*\S)/;
                break;
            default:
                if (!(m.delimiter instanceof RegExp)) return n.log(i + ": Unrecognized delimiter, empty search string, or invalid custom Regex. Aborting."), !0;
                h = m.delimiter
        }
        if (this.each(function () {
            var e = $(this),
                r = e.text();
            if (d !== !1) {
                f = {
                    blastedIndex: 0,
                    nodeBeginning: !1,
                    wrappers: f.wrappers || []
                }, e.data(i) === a || "search" === e.data(i) && m.search !== !1 || (p(e, m), m.debug && n.log(i + ": Removed element's existing Blast call.")), e.data(i, m.search !== !1 ? "search" : m.delimiter), m.aria && e.attr("aria-label", r), m.stripHTMLTags && e.html(r);
                try {
                    t.createElement(m.tag)
                } catch (s) {
                    m.tag = "span", m.debug && n.log(i + ": Invalid tag supplied. Defaulting to span.")
                }
                e.addClass(i + "-root"), m.debug && n.time(i), g(this, m), m.debug && n.timeEnd(i)
            } else d === !1 && e.data(i) !== a && p(e, m);
            m.debug && $.each(f.wrappers, function (e, t) {
                n.log(i + " [" + m.delimiter + "] " + this.outerHTML), this.style.backgroundColor = e % 2 ? "#f12185" : "#075d9a"
            })
        }), d !== !1 && m.returnGenerated === !0) {
            var b = $().add(f.wrappers);
            return b.prevObject = this, b.context = this.context, b
        }
        return this
    }, $.fn.blast.defaults = {
        returnGenerated: !0,
        delimiter: "word",
        tag: "span",
        search: !1,
        customClass: "",
        generateIndexID: !1,
        generateValueClass: !1,
        stripHTMLTags: !1,
        aria: !0,
        debug: !1
    }
}(window.$ || window.Zepto, window, document);

/*



██████╗ ██████╗  █████╗ ██╗    ██╗    
██╔══██╗██╔══██╗██╔══██╗██║    ██║    
██║  ██║██████╔╝███████║██║ █╗ ██║    
██║  ██║██╔══██╗██╔══██║██║███╗██║    
██████╔╝██║  ██║██║  ██║╚███╔███╔╝    
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝     
                                      
███████╗██╗   ██╗ ██████╗             
██╔════╝██║   ██║██╔════╝             
███████╗██║   ██║██║  ███╗            
╚════██║╚██╗ ██╔╝██║   ██║            
███████║ ╚████╔╝ ╚██████╔╝            
╚══════╝  ╚═══╝   ╚═════╝             
                                      



*/

/* Draw SVG? */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    var pluginName = 'drawsvg',
        defaults = {
            duration: 1000,
            stagger: 200,
            easing: 'swing',
            reverse: false,
            callback: $.noop
        },
        DrawSvg = (function () {
            var fn = function fn(elm, options) {
                var _this = this,
                    opts = $.extend(defaults, options);
                _this.$elm = $(elm);
                if (!_this.$elm.is('svg'))
                    return;
                _this.options = opts;
                _this.$paths = _this.$elm.find('path');
                _this.totalDuration = opts.duration + (opts.stagger * _this.$paths.length);
                _this.duration = opts.duration / _this.totalDuration;
                _this.$paths.each(function (index, elm) {
                    var pathLength = elm.getTotalLength();
                    elm.pathLen = pathLength;
                    elm.delay = (opts.stagger * index) / _this.totalDuration;
                    elm.style.strokeDasharray = [pathLength, pathLength].join(' ');
                    elm.style.strokeDashoffset = pathLength;
                });
                _this.$elm.attr('class', function (index, classNames) {
                    return [classNames, pluginName + '-initialized'].join(' ');
                });
            };
            fn.prototype.getVal = function (p, easing) {
                return 1 - $.easing[easing](p, p, 0, 1, 1);
            };
            fn.prototype.progress = function progress(prog) {
                var _this = this,
                    opts = _this.options,
                    duration = _this.duration;
                _this.$paths.each(function (index, elm) {
                    var elmStyle = elm.style;
                    if (prog === 1) {
                        elmStyle.strokeDashoffset = 0;
                    } else if (prog === 0) {
                        elmStyle.strokeDashoffset = elm.pathLen + 'px';
                    } else if (prog >= elm.delay && prog <= duration + elm.delay) {
                        var p = ((prog - elm.delay) / duration);
                        elmStyle.strokeDashoffset = ((_this.getVal(p, opts.easing) * elm.pathLen) * (opts.reverse ? -1 : 1)) + 'px';
                    }
                });
            };
            fn.prototype.animate = function animate() {
                var _this = this;
                _this.$elm.attr('class', function (index, classNames) {
                    return [classNames, pluginName + '-animating'].join(' ');
                });
                $({
                    len: 0
                }).animate({
                    len: 1
                }, {
                    easing: 'linear',
                    duration: _this.totalDuration,
                    step: function (now, fx) {
                        _this.progress.call(_this, now / fx.end);
                    },
                    complete: function () {
                        _this.options.callback.call(this);
                        _this.$elm.attr('class', function (index, classNames) {
                            return classNames.replace(pluginName + '-animating', '');
                        });
                    }
                });
            };
            return fn;
        })();
    $.fn[pluginName] = function (method, args) {
        return this.each(function () {
            var data = $.data(this, pluginName);
            (data && '' + method === method && data[method]) ? data[method](args) : $.data(this, pluginName, new DrawSvg(this, method));
        });
    };
}));
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, a, c, b, d) {
        return jQuery.easing[jQuery.easing.def](e, a, c, b, d)
    },
    easeInQuad: function (e, a, c, b, d) {
        return b * (a /= d) * a + c
    },
    easeOutQuad: function (e, a, c, b, d) {
        return -b * (a /= d) * (a - 2) + c
    },
    easeInOutQuad: function (e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b / 2 * a * a + c;
        return -b / 2 * (--a * (a - 2) - 1) + c
    },
    easeInCubic: function (e, a, c, b, d) {
        return b * (a /= d) * a * a + c
    },
    easeOutCubic: function (e, a, c, b, d) {
        return b * ((a = a / d - 1) * a * a + 1) + c
    },
    easeInOutCubic: function (e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b / 2 * a * a * a + c;
        return b / 2 * ((a -= 2) * a * a + 2) + c
    },
    easeInQuart: function (e, a, c, b, d) {
        return b * (a /= d) * a * a * a + c
    },
    easeOutQuart: function (e, a, c, b, d) {
        return -b * ((a = a / d - 1) * a * a * a - 1) + c
    },
    easeInOutQuart: function (e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b / 2 * a * a * a * a + c;
        return -b / 2 * ((a -= 2) * a * a * a - 2) + c
    },
    easeInQuint: function (e, a, c, b, d) {
        return b * (a /= d) * a * a * a * a + c
    },
    easeOutQuint: function (e, a, c, b, d) {
        return b * ((a = a / d - 1) * a * a * a * a + 1) + c
    },
    easeInOutQuint: function (e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b / 2 * a * a * a * a * a + c;
        return b / 2 * ((a -= 2) * a * a * a * a + 2) + c
    },
    easeInSine: function (e, a, c, b, d) {
        return -b * Math.cos(a / d * (Math.PI / 2)) + b + c
    },
    easeOutSine: function (e, a, c, b, d) {
        return b * Math.sin(a / d * (Math.PI / 2)) + c
    },
    easeInOutSine: function (e, a, c, b, d) {
        return -b / 2 * (Math.cos(Math.PI * a / d) - 1) + c
    },
    easeInExpo: function (e, a, c, b, d) {
        return a == 0 ? c : b * Math.pow(2, 10 * (a / d - 1)) + c
    },
    easeOutExpo: function (e, a, c, b, d) {
        return a == d ? c + b : b * (-Math.pow(2, -10 * a / d) + 1) + c
    },
    easeInOutExpo: function (e, a, c, b, d) {
        if (a == 0) return c;
        if (a == d) return c + b;
        if ((a /= d / 2) < 1) return b / 2 * Math.pow(2, 10 * (a - 1)) + c;
        return b / 2 * (-Math.pow(2, -10 * --a) + 2) + c
    },
    easeInCirc: function (e, a, c, b, d) {
        return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c
    },
    easeOutCirc: function (e, a, c, b, d) {
        return b * Math.sqrt(1 - (a = a / d - 1) * a) + c
    },
    easeInOutCirc: function (e, a, c, b, d) {
        if ((a /= d / 2) < 1) return -b / 2 * (Math.sqrt(1 - a * a) - 1) + c;
        return b / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + c
    },
    easeInElastic: function (e, a, c, b, d) {
        e = 1.70158;
        var f = 0,
            g = b;
        if (a == 0) return c;
        if ((a /= d) == 1) return c + b;
        f || (f = d * 0.3);
        if (g < Math.abs(b)) {
            g = b;
            e = f / 4
        } else e = f / (2 * Math.PI) * Math.asin(b / g);
        return -(g * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - e) * 2 * Math.PI / f)) + c
    },
    easeOutElastic: function (e, a, c, b, d) {
        e = 1.70158;
        var f = 0,
            g = b;
        if (a == 0) return c;
        if ((a /= d) == 1) return c + b;
        f || (f = d * 0.3);
        if (g < Math.abs(b)) {
            g = b;
            e = f / 4
        } else e = f / (2 * Math.PI) * Math.asin(b / g);
        return g * Math.pow(2, -10 * a) * Math.sin((a * d - e) * 2 * Math.PI / f) + b + c
    },
    easeInOutElastic: function (e, a, c, b, d) {
        e = 1.70158;
        var f = 0,
            g = b;
        if (a == 0) return c;
        if ((a /= d / 2) == 2) return c + b;
        f || (f = d * 0.3 * 1.5);
        if (g < Math.abs(b)) {
            g = b;
            e = f / 4
        } else e = f / (2 * Math.PI) * Math.asin(b / g);
        if (a < 1) return -0.5 * g * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - e) * 2 * Math.PI / f) + c;
        return g * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * d - e) * 2 * Math.PI / f) * 0.5 + b + c
    },
    easeInBack: function (e, a, c, b, d, f) {
        if (f == undefined) f = 1.70158;
        return b * (a /= d) * a * ((f + 1) * a - f) + c
    },
    easeOutBack: function (e, a, c, b, d, f) {
        if (f == undefined) f = 1.70158;
        return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c
    },
    easeInOutBack: function (e, a, c, b, d, f) {
        if (f == undefined) f = 1.70158;
        if ((a /= d / 2) < 1) return b / 2 * a * a * (((f *= 1.525) + 1) * a - f) + c;
        return b / 2 * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + c
    },
    easeInBounce: function (e, a, c, b, d) {
        return b - jQuery.easing.easeOutBounce(e, d - a, 0, b, d) + c
    },
    easeOutBounce: function (e, a, c, b, d) {
        return (a /= d) < 1 / 2.75 ? b * 7.5625 * a * a + c : a < 2 / 2.75 ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c : a < 2.5 / 2.75 ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c
    },
    easeInOutBounce: function (e, a, c, b, d) {
        if (a < d / 2) return jQuery.easing.easeInBounce(e, a * 2, 0, b, d) * 0.5 + c;
        return jQuery.easing.easeOutBounce(e, a * 2 - d, 0, b, d) * 0.5 + b * 0.5 + c
    }
});

/*



████████╗██╗    ██╗███████╗███████╗███╗   ██╗███╗   ███╗ █████╗ ██╗  ██╗
╚══██╔══╝██║    ██║██╔════╝██╔════╝████╗  ██║████╗ ████║██╔══██╗╚██╗██╔╝
   ██║   ██║ █╗ ██║█████╗  █████╗  ██╔██╗ ██║██╔████╔██║███████║ ╚███╔╝ 
   ██║   ██║███╗██║██╔══╝  ██╔══╝  ██║╚██╗██║██║╚██╔╝██║██╔══██║ ██╔██╗ 
   ██║   ╚███╔███╔╝███████╗███████╗██║ ╚████║██║ ╚═╝ ██║██║  ██║██╔╝ ██╗
   ╚═╝    ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
                                                                        



*/

// TweenMax js

/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
        var d = function (a) {
            var b, c = [],
                d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c
        },
            e = function (a, b, c) {
                var d, e, f = a.cycle;
                for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
                delete a.cycle
            },
            f = function (a, b, d) {
                c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = f.prototype.render
            },
            g = 1e-10,
            h = c._internals,
            i = h.isSelector,
            j = h.isArray,
            k = f.prototype = c.to({}, .1, {}),
            l = [];
        f.version = "1.19.1", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), c.prototype.invalidate.call(this)
        }, k.updateTo = function (a, b) {
            var d, e = this.ratio,
                f = this.vars.immediateRender || a.immediateRender;
            b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (d in a) this.vars[d] = a[d];
            if (this._initted || f)
                if (b) this._initted = !1, f && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                    var g = this._totalTime;
                    this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
                } else if (this._initted = !1, this._init(), this._time > 0 || f)
                    for (var h, i = 1 / (1 - e), j = this._firstPT; j;) h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next;
            return this
        }, k.render = function (a, b, c) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var d, e, f, i, j, k, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
                o = this._time,
                p = this._totalTime,
                q = this._cycle,
                r = this._duration,
                s = this._rawPrevTime;
            if (a >= n - 1e-7 && a >= 0 ? (this._totalTime = n, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = r, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === r && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > s || 0 >= a && a >= -1e-7 || s === g && "isPause" !== this.data) && s !== a && (c = !0, s > g && (e = "onReverseComplete")), this._rawPrevTime = m = !b || a || s === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== p || 0 === r && s > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === r && (this._initted || !this.vars.lazy || c) && (s >= 0 && (c = !0), this._rawPrevTime = m = !b || a || s === a ? a : g)), this._initted || (c = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (i = r + this._repeatDelay, this._cycle = this._totalTime / i >> 0, 0 !== this._cycle && this._cycle === this._totalTime / i && a >= p && this._cycle--, this._time = this._totalTime - this._cycle * i, this._yoyo && 0 !== (1 & this._cycle) && (this._time = r - this._time), this._time > r ? this._time = r : this._time < 0 && (this._time = 0)), this._easeType ? (j = this._time / r, k = this._easeType, l = this._easePower, (1 === k || 3 === k && j >= .5) && (j = 1 - j), 3 === k && (j *= 2), 1 === l ? j *= j : 2 === l ? j *= j * j : 3 === l ? j *= j * j * j : 4 === l && (j *= j * j * j * j), 1 === k ? this.ratio = 1 - j : 2 === k ? this.ratio = j : this._time / r < .5 ? this.ratio = j / 2 : this.ratio = 1 - j / 2) : this.ratio = this._ease.getRatio(this._time / r)), o === this._time && !c && q === this._cycle) return void (p !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc) return;
                if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = o, this._totalTime = p, this._rawPrevTime = s, this._cycle = q, h.lazyTweens.push(this), void (this._lazy = [a, b]);
                this._time && !d ? this.ratio = this._ease.getRatio(this._time / r) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && a >= 0 && (this._active = !0), 0 === p && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === r) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
            this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c), b || (this._totalTime !== p || e) && this._callback("onUpdate")), this._cycle !== q && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === r && this._rawPrevTime === g && m !== g && (this._rawPrevTime = 0))
        }, f.to = function (a, b, c) {
            return new f(a, b, c)
        }, f.from = function (a, b, c) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
        }, f.fromTo = function (a, b, c, d) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d)
        }, f.staggerTo = f.allTo = function (a, b, g, h, k, m, n) {
            h = h || 0;
            var o, p, q, r, s = 0,
                t = [],
                u = function () {
                    g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l)
                },
                v = g.cycle,
                w = g.startAt && g.startAt.cycle;
            for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++) {
                p = {};
                for (r in g) p[r] = g[r];
                if (v && (e(p, a, q), null != p.duration && (b = p.duration, delete p.duration)), w) {
                    w = p.startAt = {};
                    for (r in g.startAt) w[r] = g.startAt[r];
                    e(p.startAt, a, q)
                }
                p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h
            }
            return t
        }, f.staggerFrom = f.allFrom = function (a, b, c, d, e, g, h) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h)
        }, f.staggerFromTo = f.allFromTo = function (a, b, c, d, e, g, h, i) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
        }, f.delayedCall = function (a, b, c, d, e) {
            return new f(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                useFrames: e,
                overwrite: 0
            })
        }, f.set = function (a, b) {
            return new f(a, 0, b)
        }, f.isTweening = function (a) {
            return c.getTweensOf(a, !0).length > 0
        };
        var m = function (a, b) {
            for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
            return d
        },
            n = f.getAllTweens = function (b) {
                return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
            };
        f.killAll = function (a, c, d, e) {
            null == c && (c = !0), null == d && (d = !0);
            var f, g, h, i = n(0 != e),
                j = i.length,
                k = c && d && e;
            for (h = 0; j > h; h++) g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
        }, f.killChildTweensOf = function (a, b) {
            if (null != a) {
                var e, g, k, l, m, n = h.tweenLookup;
                if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a))
                    for (l = a.length; --l > -1;) f.killChildTweensOf(a[l], b);
                else {
                    e = [];
                    for (k in n)
                        for (g = n[k].target.parentNode; g;) g === a && (e = e.concat(n[k].tweens)), g = g.parentNode;
                    for (m = e.length, l = 0; m > l; l++) b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1)
                }
            }
        };
        var o = function (a, c, d, e) {
            c = c !== !1, d = d !== !1, e = e !== !1;
            for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;) g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
        };
        return f.pauseAll = function (a, b, c) {
            o(!0, a, b, c)
        }, f.resumeAll = function (a, b, c) {
            o(!1, a, b, c)
        }, f.globalTimeScale = function (b) {
            var d = a._rootTimeline,
                e = c.ticker.time;
            return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
        }, k.progress = function (a, b) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
        }, k.totalProgress = function (a, b) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
        }, k.time = function (a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, k.duration = function (b) {
            return arguments.length ? a.prototype.duration.call(this, b) : this._duration
        }, k.totalDuration = function (a) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, k.repeat = function (a) {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function (a) {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function (a) {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, f
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
        var d = function (a) {
            b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var c, d, e = this.vars;
            for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
            i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
        },
            e = 1e-10,
            f = c._internals,
            g = d._internals = {},
            h = f.isSelector,
            i = f.isArray,
            j = f.lazyTweens,
            k = f.lazyRender,
            l = _gsScope._gsDefine.globals,
            m = function (a) {
                var b, c = {};
                for (b in a) c[b] = a[b];
                return c
            },
            n = function (a, b, c) {
                var d, e, f = a.cycle;
                for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
                delete a.cycle
            },
            o = g.pauseCallback = function () { },
            p = function (a) {
                var b, c = [],
                    d = a.length;
                for (b = 0; b !== d; c.push(a[b++]));
                return c
            },
            q = d.prototype = new b;
        return d.version = "1.19.1", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function (a, b, d, e) {
            var f = d.repeat && l.TweenMax || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
        }, q.from = function (a, b, d, e) {
            return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
        }, q.fromTo = function (a, b, d, e, f) {
            var g = e.repeat && l.TweenMax || c;
            return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
        }, q.staggerTo = function (a, b, e, f, g, i, j, k) {
            var l, o, q = new d({
                onComplete: i,
                onCompleteParams: j,
                callbackScope: k,
                smoothChildTiming: this.smoothChildTiming
            }),
                r = e.cycle;
            for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q.to(a[o], b, l, o * f);
            return this.add(q, g)
        }, q.staggerFrom = function (a, b, c, d, e, f, g, h) {
            return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
        }, q.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
        }, q.call = function (a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e)
        }, q.set = function (a, b, d) {
            return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
        }, d.exportRoot = function (a, b) {
            a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e, f, g = new d(a),
                h = g._timeline;
            for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;) f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f;
            return h.add(g, 0), g
        }, q.add = function (e, f, g, h) {
            var j, k, l, m, n, o;
            if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                if (e instanceof Array || e && e.push && i(e)) {
                    for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(m = e[l]) && (m = new d({
                        tweens: m
                    })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
                    return this._uncache(!0)
                }
                if ("string" == typeof e) return this.addLabel(e, f);
                if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                e = c.delayedCall(0, e)
            }
            if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
            return this
        }, q.remove = function (b) {
            if (b instanceof a) {
                this._remove(b, !1);
                var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
            }
            if (b instanceof Array || b && b.push && i(b)) {
                for (var d = b.length; --d > -1;) this.remove(b[d]);
                return this
            }
            return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
        }, q._remove = function (a, c) {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return d ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, q.append = function (a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
        }, q.insert = q.insertMultiple = function (a, b, c, d) {
            return this.add(a, b || 0, c, d)
        }, q.appendMultiple = function (a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
        }, q.addLabel = function (a, b) {
            return this._labels[a] = this._parseTimeOrLabel(b), this
        }, q.addPause = function (a, b, d, e) {
            var f = c.delayedCall(0, o, d, e || this);
            return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
        }, q.removeLabel = function (a) {
            return delete this._labels[a], this
        }, q.getLabelTime = function (a) {
            return null != this._labels[a] ? this._labels[a] : -1
        }, q._parseTimeOrLabel = function (b, c, d, e) {
            var f;
            if (e instanceof a && e.timeline === this) this.remove(e);
            else if (e && (e instanceof Array || e.push && i(e)))
                for (f = e.length; --f > -1;) e[f] instanceof a && e[f].timeline === this && this.remove(e[f]);
            if ("string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
            if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = this.duration());
            else {
                if (f = b.indexOf("="), -1 === f) return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
            }
            return Number(b) + c
        }, q.seek = function (a, b) {
            return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
        }, q.stop = function () {
            return this.paused(!0)
        }, q.gotoAndPlay = function (a, b) {
            return this.play(a, b)
        }, q.gotoAndStop = function (a, b) {
            return this.pause(a, b)
        }, q.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d, f, g, h, i, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
                o = this._time,
                p = this._startTime,
                q = this._timeScale,
                r = this._paused;
            if (a >= n - 1e-7 && a >= 0) this._totalTime = this._time = n, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = n + 1e-4;
            else if (1e-7 > a)
                if (this._totalTime = this._time = 0, (0 !== o || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a;
                else {
                    if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
                        for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
                    a = 0, this._initted || (i = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !b) {
                    if (a >= o)
                        for (d = this._first; d && d._startTime <= a && !l;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next;
                    else
                        for (d = this._last; d && d._startTime >= a && !l;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
                    l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = a
            }
            if (this._time !== o && this._first || c || i || l) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== o && a > 0 && (this._active = !0), 0 === o && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), m = this._time, m >= o)
                    for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));)(d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
                else
                    for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));) {
                        if (d._active || d._startTime <= o && !d._paused && !d._gc) {
                            if (l === d) {
                                for (l = d._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
                                l = null, this.pause()
                            }
                            d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                        }
                        d = g
                    }
                this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || n >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)))
            }
        }, q._hasPausedChild = function () {
            for (var a = this._first; a;) {
                if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
                a = a._next
            }
            return !1
        }, q.getChildren = function (a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
            return f
        }, q.getTweensOf = function (a, b) {
            var d, e, f = this._gc,
                g = [],
                h = 0;
            for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
            return f && this._enabled(!1, !0), g
        }, q.recent = function () {
            return this._recent
        }, q._contains = function (a) {
            for (var b = a.timeline; b;) {
                if (b === this) return !0;
                b = b.timeline
            }
            return !1
        }, q.shiftChildren = function (a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
            if (b)
                for (d in f) f[d] >= c && (f[d] += a);
            return this._uncache(!0)
        }, q._kill = function (a, b) {
            if (!a && !b) return this._enabled(!1, !1);
            for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
            return e
        }, q.clear = function (a) {
            var b = this.getChildren(!1, !0, !0),
                c = b.length;
            for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0)
        }, q.invalidate = function () {
            for (var b = this._first; b;) b.invalidate(), b = b._next;
            return a.prototype.invalidate.call(this)
        }, q._enabled = function (a, c) {
            if (a === this._gc)
                for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
            return b.prototype._enabled.call(this, a, c)
        }, q.totalTime = function (b, c, d) {
            this._forcingPlayhead = !0;
            var e = a.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, q.duration = function (a) {
            return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
        }, q.totalDuration = function (a) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
                    this._duration = this._totalDuration = d, this._dirty = !1
                }
                return this._totalDuration
            }
            return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
        }, q.paused = function (b) {
            if (!b)
                for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
            return a.prototype.paused.apply(this, arguments)
        }, q.usesFrames = function () {
            for (var b = this._timeline; b._timeline;) b = b._timeline;
            return b === a._rootFramesTimeline
        }, q.rawTime = function (a) {
            return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale
        }, d
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (a, b, c) {
        var d = function (b) {
            a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
        },
            e = 1e-10,
            f = b._internals,
            g = f.lazyTweens,
            h = f.lazyRender,
            i = _gsScope._gsDefine.globals,
            j = new c(null, null, 1, 0),
            k = d.prototype = new a;
        return k.constructor = d, k.kill()._gc = !1, d.version = "1.19.1", k.invalidate = function () {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
        }, k.addCallback = function (a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c)
        }, k.removeCallback = function (a, b) {
            if (a)
                if (null == b) this._kill(null, a);
                else
                    for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
            return this
        }, k.removePause = function (b) {
            return this.removeCallback(a._internals.pauseCallback, b)
        }, k.tweenTo = function (a, c) {
            c = c || {};
            var d, e, f, g = {
                ease: j,
                useFrames: this.usesFrames(),
                immediateRender: !1
            },
                h = c.repeat && i.TweenMax || b;
            for (e in c) g[e] = c[e];
            return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new h(this, d, g), g.onStart = function () {
                f.target.paused(!0), f.vars.time !== f.target.time() && d === f.duration() && f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale), c.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c.onStartParams || [])
            }, f
        }, k.tweenFromTo = function (a, b, c) {
            c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                callbackScope: this
            }, c.immediateRender = c.immediateRender !== !1;
            var d = this.tweenTo(b, c);
            return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
        }, k.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d, f, i, j, k, l, m, n, o = this._dirty ? this.totalDuration() : this._totalDuration,
                p = this._duration,
                q = this._time,
                r = this._totalTime,
                s = this._startTime,
                t = this._timeScale,
                u = this._rawPrevTime,
                v = this._paused,
                w = this._cycle;
            if (a >= o - 1e-7 && a >= 0) this._locked || (this._totalTime = o, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = p, a = p + 1e-4);
            else if (1e-7 > a)
                if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== q || 0 === p && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a;
                else {
                    if (this._rawPrevTime = p || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
                        for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
                    a = 0, this._initted || (k = !0)
                }
            else if (0 === p && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = p + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, a = p + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b && p > a) {
                if (a = this._time, a >= q || this._repeat && w !== this._cycle)
                    for (d = this._first; d && d._startTime <= a && !m;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next;
                else
                    for (d = this._last; d && d._startTime >= a && !m;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
                m && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== w && !this._locked) {
                var x = this._yoyo && 0 !== (1 & w),
                    y = x === (this._yoyo && 0 !== (1 & this._cycle)),
                    z = this._totalTime,
                    A = this._cycle,
                    B = this._rawPrevTime,
                    C = this._time;
                if (this._totalTime = w * p, this._cycle < w ? x = !x : this._totalTime += p, this._time = q, this._rawPrevTime = 0 === p ? u - 1e-4 : u, this._cycle = w, this._locked = !0, q = x ? 0 : p, this.render(q, b, 0 === p), b || this._gc || this.vars.onRepeat && (this._cycle = A, this._locked = !1, this._callback("onRepeat")), q !== this._time) return;
                if (y && (this._cycle = w, this._locked = !0, q = x ? p + 1e-4 : -1e-4, this.render(q, !0, !1)), this._locked = !1, this._paused && !v) return;
                this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
            }
            if (!(this._time !== q && this._first || c || k || m)) return void (r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && (0 === this._totalTime && this._totalDuration || b || this._callback("onStart")), n = this._time, n >= q)
                for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i;
            else
                for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));) {
                    if (d._active || d._startTime <= q && !d._paused && !d._gc) {
                        if (m === d) {
                            for (m = d._prev; m && m.endTime() > this._time;) m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev;
                            m = null, this.pause()
                        }
                        d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                    }
                    d = i
                }
            this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j)))
        }, k.getActive = function (a, b, c) {
            null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
            var d, e, f = [],
                g = this.getChildren(a, b, c),
                h = 0,
                i = g.length;
            for (d = 0; i > d; d++) e = g[d], e.isActive() && (f[h++] = e);
            return f
        }, k.getLabelAfter = function (a) {
            a || 0 !== a && (a = this._time);
            var b, c = this.getLabelsArray(),
                d = c.length;
            for (b = 0; d > b; b++)
                if (c[b].time > a) return c[b].name;
            return null
        }, k.getLabelBefore = function (a) {
            null == a && (a = this._time);
            for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
                if (b[c].time < a) return b[c].name;
            return null
        }, k.getLabelsArray = function () {
            var a, b = [],
                c = 0;
            for (a in this._labels) b[c++] = {
                time: this._labels[a],
                name: a
            };
            return b.sort(function (a, b) {
                return a.time - b.time
            }), b
        }, k.invalidate = function () {
            return this._locked = !1, a.prototype.invalidate.call(this)
        }, k.progress = function (a, b) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
        }, k.totalProgress = function (a, b) {
            return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
        }, k.totalDuration = function (b) {
            return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, k.time = function (a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
        }, k.repeat = function (a) {
            return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
        }, k.repeatDelay = function (a) {
            return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
        }, k.yoyo = function (a) {
            return arguments.length ? (this._yoyo = a, this) : this._yoyo
        }, k.currentLabel = function (a) {
            return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
        }, d
    }, !0),
        function () {
            var a = 180 / Math.PI,
                b = [],
                c = [],
                d = [],
                e = {},
                f = _gsScope._gsDefine.globals,
                g = function (a, b, c, d) {
                    c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
                },
                h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                i = function (a, b, c, d) {
                    var e = {
                        a: a
                    },
                        f = {},
                        g = {},
                        h = {
                            c: d
                        },
                        i = (a + b) / 2,
                        j = (b + c) / 2,
                        k = (c + d) / 2,
                        l = (i + j) / 2,
                        m = (j + k) / 2,
                        n = (m - l) / 8;
                    return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
                },
                j = function (a, e, f, g, h) {
                    var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1,
                        x = 0,
                        y = a[0].a;
                    for (j = 0; w > j; j++) n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
                    n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
                },
                k = function (a, d, e, f) {
                    var h, i, j, k, l, m, n = [];
                    if (f)
                        for (a = [f].concat(a), i = a.length; --i > -1;) "string" == typeof (m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
                    if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[-1 > h ? 0 : 1][d]), n;
                    for (i = 0; h > i; i++) j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
                    return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
                },
                l = function (a, f, g, i, l, m) {
                    var n, o, p, q, r, s, t, u, v = {},
                        w = [],
                        x = m || a[0];
                    l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
                    for (o in a[0]) w.push(o);
                    if (a.length > 1) {
                        for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)
                            if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
                                t = !1;
                                break
                            }
                        t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
                    }
                    for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
                    for (n = b.length; --n > -1;) b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
                    if (!i) {
                        for (n = w.length; --n > -1;)
                            if (e[o])
                                for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) r = p[q + 1].da / c[q] + p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r;
                        for (n = d.length; --n > -1;) d[n] = Math.sqrt(d[n])
                    }
                    for (n = w.length, q = g ? 4 : 1; --n > -1;) o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
                    return v
                },
                m = function (a, b, c) {
                    b = b || "soft";
                    var d, e, f, h, i, j, k, l, m, n, o, p = {},
                        q = "cubic" === b ? 3 : 2,
                        r = "soft" === b,
                        s = [];
                    if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1) throw "invalid Bezier data";
                    for (m in a[0]) s.push(m);
                    for (j = s.length; --j > -1;) {
                        for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) d = null == c ? a[k][m] : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
                        for (l = n - q + 1, n = 0, k = 0; l > k; k += q) d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
                        i.length = n
                    }
                    return p
                },
                n = function (a, b, c) {
                    for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
                        for (m = a[p], f = m.a, g = m.d - f,
                            h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++) j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
                },
                o = function (a, b) {
                    b = b >> 0 || 6;
                    var c, d, e, f, g = [],
                        h = [],
                        i = 0,
                        j = 0,
                        k = b - 1,
                        l = [],
                        m = [];
                    for (c in a) n(a[c], g, b);
                    for (e = g.length, d = 0; e > d; d++) i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
                    return {
                        length: j,
                        lengths: h,
                        segments: l
                    }
                },
                p = _gsScope._gsDefine.plugin({
                    propName: "bezier",
                    priority: -1,
                    version: "1.3.7",
                    API: 2,
                    global: !0,
                    init: function (a, b, c) {
                        this._target = a, b instanceof Array && (b = {
                            values: b
                        }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                        var d, e, f, g, h, i = b.values || [],
                            j = {},
                            k = i[0],
                            n = b.autoRotate || c.vars.orientToBezier;
                        this._autoRotate = n ? n instanceof Array ? n : [
                            ["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]
                        ] : null;
                        for (d in k) this._props.push(d);
                        for (f = this._props.length; --f > -1;) d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
                        if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
                            var p = o(this._beziers, this._timeRes);
                            this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                        }
                        if (n = this._autoRotate)
                            for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
                                for (g = 0; 3 > g; g++) d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                                d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0, this._overwriteProps.push(d)
                            }
                        return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
                    },
                    set: function (b) {
                        var c, d, e, f, g, h, i, j, k, l, m = this._segCount,
                            n = this._func,
                            o = this._target,
                            p = b !== this._startRatio;
                        if (this._timeRes) {
                            if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
                                for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;);
                                this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0]
                            } else if (b < this._l1 && e > 0) {
                                for (; e > 0 && (this._l1 = k[--e]) >= b;);
                                0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
                            }
                            if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
                                for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;);
                                this._s1 = l[e - 1], this._si = e
                            } else if (b < this._s1 && e > 0) {
                                for (; e > 0 && (this._s1 = l[--e]) >= b;);
                                0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e
                            }
                            h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                        } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
                        for (d = 1 - h, e = this._props.length; --e > -1;) f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i;
                        if (this._autoRotate) {
                            var q, r, s, t, u, v, w, x = this._autoRotate;
                            for (e = x.length; --e > -1;) f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i)
                        }
                    }
                }),
                q = p.prototype;
            p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function (a, b, c) {
                return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
            }, p._cssRegister = function () {
                var a = f.CSSPlugin;
                if (a) {
                    var b = a._internals,
                        c = b._parseToProxy,
                        d = b._setPluginRatio,
                        e = b.CSSPropTween;
                    b._registerComplexSpecialProp("bezier", {
                        parser: function (a, b, f, g, h, i) {
                            b instanceof Array && (b = {
                                values: b
                            }), i = new p;
                            var j, k, l, m = b.values,
                                n = m.length - 1,
                                o = [],
                                q = {};
                            if (0 > n) return h;
                            for (j = 0; n >= j; j++) l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
                            for (k in b) q[k] = b[k];
                            return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [
                                ["left", "top", "rotation", j, !1]
                            ] : null != l.end.x ? [
                                ["x", "y", "rotation", j, !1]
                            ] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(l.proxy, q, g._tween), h
                        }
                    })
                }
            }, q._mod = function (a) {
                for (var b, c = this._overwriteProps, d = c.length; --d > -1;) b = a[c[d]], b && "function" == typeof b && (this._mod[c[d]] = b)
            }, q._kill = function (a) {
                var b, c, d = this._props;
                for (b in this._beziers)
                    if (b in a)
                        for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) d[c] === b && d.splice(c, 1);
                if (d = this._autoRotate)
                    for (c = d.length; --c > -1;) a[d[c][2]] && d.splice(c, 1);
                return this._super._kill.call(this, a)
            }
        }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
            var c, d, e, f, g = function () {
                a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
            },
                h = _gsScope._gsDefine.globals,
                i = {},
                j = g.prototype = new a("css");
            j.constructor = g, g.version = "1.19.1", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
                top: j,
                right: j,
                bottom: j,
                left: j,
                width: j,
                height: j,
                fontSize: j,
                padding: j,
                margin: j,
                perspective: j,
                lineHeight: ""
            };
            var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                w = /(?:\d|\-|\+|=|#|\.)*/g,
                x = /opacity *= *([^)]*)/i,
                y = /opacity:([^;]*)/i,
                z = /alpha\(opacity *=.+?\)/i,
                A = /^(rgb|hsl)/,
                B = /([A-Z])/g,
                C = /-([a-z])/gi,
                D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                E = function (a, b) {
                    return b.toUpperCase()
                },
                F = /(?:Left|Right|Width)/i,
                G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                I = /,(?=[^\)]*(?:\(|$))/gi,
                J = /[\s,\(]/i,
                K = Math.PI / 180,
                L = 180 / Math.PI,
                M = {},
                N = {
                    style: {}
                },
                O = _gsScope.document || {
                    createElement: function () {
                        return N
                    }
                },
                P = function (a, b) {
                    return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O.createElement(a)
                },
                Q = P("div"),
                R = P("img"),
                S = g._internals = {
                    _specialProps: i
                },
                T = (_gsScope.navigator || {}).userAgent || "",
                U = function () {
                    var a = T.indexOf("Android"),
                        b = P("a");
                    return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
                }(),
                V = function (a) {
                    return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                W = function (a) {
                    _gsScope.console && console.log(a)
                },
                X = "",
                Y = "",
                Z = function (a, b) {
                    b = b || Q;
                    var c, d, e = b.style;
                    if (void 0 !== e[a]) return a;
                    for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
                    return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null
                },
                $ = O.defaultView ? O.defaultView.getComputedStyle : function () { },
                _ = g.getStyle = function (a, b, c, d, e) {
                    var f;
                    return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a)
                },
                aa = S.convertToPixels = function (a, c, d, e, f) {
                    if ("px" === e || !e) return d;
                    if ("auto" === e || !d) return 0;
                    var h, i, j, k = F.test(c),
                        l = a,
                        m = Q.style,
                        n = 0 > d,
                        o = 1 === d;
                    if (n && (d = -d), o && (d *= 100), "%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);
                    else {
                        if (m.cssText = "border:0 solid red;position:" + _(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                        else {
                            if (l = a.parentNode || O.body, i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
                            m[k ? "width" : "height"] = d + e
                        }
                        l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = aa(a, c, d, e, !0))
                    }
                    return o && (h /= 100), n ? -h : h
                },
                ba = S.calculateOffset = function (a, b, c) {
                    if ("absolute" !== _(a, "position", c)) return 0;
                    var d = "left" === b ? "Left" : "Top",
                        e = _(a, "margin" + d, c);
                    return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0)
                },
                ca = function (a, b) {
                    var c, d, e, f = {};
                    if (b = b || $(a, null))
                        if (c = b.length)
                            for (; --c > -1;) e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e.replace(C, E)] = b.getPropertyValue(e));
                        else
                            for (c in b) (-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]);
                    else if (b = a.currentStyle || a.style)
                        for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
                    return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
                },
                da = function (a, b, c, d, e) {
                    var f, g, h, i = {},
                        j = a.style;
                    for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
                    if (d)
                        for (g in d) "className" !== g && (i[g] = d[g]);
                    return {
                        difs: i,
                        firstMPT: h
                    }
                },
                ea = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                ga = function (a, b, c) {
                    if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0;
                    if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
                    var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                        e = ea[b],
                        f = e.length;
                    for (c = c || $(a, null); --f > -1;) d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0;
                    return d
                },
                ha = function (a, b) {
                    if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
                    (null == a || "" === a) && (a = "0 0");
                    var c, d = a.split(" "),
                        e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
                        f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
                    if (d.length > 3 && !b) {
                        for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) a.push(ha(d[c]));
                        return a.join(",")
                    }
                    return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a
                },
                ia = function (a, b) {
                    return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
                },
                ja = function (a, b) {
                    return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
                },
                ka = function (a, b, c, d) {
                    var e, f, g, h, i, j = 1e-6;
                    return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
                },
                la = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                ma = function (a, b, c) {
                    return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
                },
                na = g.parseColor = function (a, b) {
                    var c, d, e, f, g, h, i, j, k, l, m;
                    if (a)
                        if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];
                        else {
                            if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a]) c = la[a];
                            else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];
                            else if ("hsl" === a.substr(0, 3))
                                if (c = m = a.match(s), b) {
                                    if (-1 !== a.indexOf("=")) return a.match(t)
                                } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = ma(g + 1 / 3, d, e), c[1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e);
                            else c = a.match(s) || la.transparent;
                            c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
                        }
                    else c = la.black;
                    return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
                },
                oa = function (a, b) {
                    var c, d, e, f = a.match(pa) || [],
                        g = 0,
                        h = f.length ? "" : a;
                    for (c = 0; c < f.length; c++) d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
                    return h + a.substr(g)
                },
                pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (j in la) pa += "|" + j + "\\b";
            pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function (a) {
                var b, c = a[0] + a[1];
                pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0
            }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
            var qa = function (a, b, c, d) {
                if (null == a) return function (a) {
                    return a
                };
                var e, f = b ? (a.match(pa) || [""])[0] : "",
                    g = a.split(f).join("").match(u) || [],
                    h = a.substr(0, a.indexOf(g[0])),
                    i = ")" === a.charAt(a.length - 1) ? ")" : "",
                    j = -1 !== a.indexOf(" ") ? " " : ",",
                    k = g.length,
                    l = k > 0 ? g[0].replace(s, "") : "";
                return k ? e = b ? function (a) {
                    var b, m, n, o;
                    if ("number" == typeof a) a += l;
                    else if (d && I.test(a)) {
                        for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++) o[n] = e(o[n]);
                        return o.join(",")
                    }
                    if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--)
                        for (; ++n < k;) m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
                    return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
                } : function (a) {
                    var b, f, m;
                    if ("number" == typeof a) a += l;
                    else if (d && I.test(a)) {
                        for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++) f[m] = e(f[m]);
                        return f.join(",")
                    }
                    if (b = a.match(u) || [], m = b.length, k > m--)
                        for (; ++m < k;) b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
                    return h + b.join(j) + i
                } : function (a) {
                    return a
                }
            },
                ra = function (a) {
                    return a = a.split(","),
                        function (b, c, d, e, f, g, h) {
                            var i, j = (c + "").split(" ");
                            for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                            return e.parse(b, h, f, g)
                        }
                },
                sa = (S._setPluginRatio = function (a) {
                    this.plugin.setRatio(a);
                    for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
                    if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod(h.rotation, this.t) : h.rotation), 1 === a || 0 === a)
                        for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
                            if (c = i.t, c.type) {
                                if (1 === c.type) {
                                    for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) e += c["xn" + d] + c["xs" + (d + 1)];
                                    c[f] = e
                                }
                            } else c[f] = c.s + c.xs0;
                            i = i._next
                        }
                }, function (a, b, c, d, e) {
                    this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
                }),
                ta = (S._parseToProxy = function (a, b, c, d, e, f) {
                    var g, h, i, j, k, l = d,
                        m = {},
                        n = {},
                        o = c._transform,
                        p = M;
                    for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
                        if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
                            for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i]));
                        d = d._next
                    }
                    return {
                        proxy: m,
                        end: n,
                        firstMPT: j,
                        pt: k
                    }
                }, S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
                    this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
                }),
                ua = function (a, b, c, d, e, f) {
                    var g = new ta(a, b, c, d - c, e, -1, f);
                    return g.b = c, g.e = g.xs0 = d, g
                },
                va = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
                    c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
                    var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "),
                        E = d.split(", ").join(",").split(" "),
                        F = D.length,
                        G = k !== !1;
                    for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" "), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++)
                        if (p = D[m], u = E[m], x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px"), !0);
                        else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && U, p = na(p, C), u = na(u, C), y = p.length + u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(y ? "hsla(" : "hsl(", p[0], ia(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1).appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(y ? "rgba(" : "rgb(", p[0], u[0] - p[0], ",", !0, !0).appendXtra("", p[1], u[1] - p[1], ",", !0).appendXtra("", p[2], u[2] - p[2], y ? "," : B, !0), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex = 0;
                        else if (v = p.match(s)) {
                            if (w = u.match(t), !w || w.length !== v.length) return h;
                            for (o = 0, n = 0; n < v.length; n++) A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A.length, 2), 0 === n), o = z + A.length;
                            h["xs" + h.l] += p.substr(o)
                        } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
                    if (-1 !== d.indexOf("=") && h.data) {
                        for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) B += h["xs" + m] + h.data["xn" + m];
                        h.e = B + h["xs" + m]
                    }
                    return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
                },
                wa = 9;
            for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;) j["xn" + wa] = 0, j["xs" + wa] = "";
            j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) {
                var g = this,
                    h = g.l;
                return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
                    s: b + c
                }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
            };
            var xa = function (a, b) {
                b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
            },
                ya = S._registerComplexSpecialProp = function (a, b, c) {
                    "object" != typeof b && (b = {
                        parser: c
                    });
                    var d, e, f = a.split(","),
                        g = b.defaultValue;
                    for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new xa(f[d], b)
                },
                za = S._registerPluginProp = function (a) {
                    if (!i[a]) {
                        var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                        ya(a, {
                            parser: function (a, c, d, e, f, g, j) {
                                var k = h.com.greensock.plugins[b];
                                return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f)
                            }
                        })
                    }
                };
            j = xa.prototype, j.parseComplex = function (a, b, c, d, e, f) {
                var g, h, i, j, k, l, m = this.keyword;
                if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
                    for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
                    b = h.join(", "), c = i.join(", ")
                }
                return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
            }, j.parse = function (a, b, c, d, f, g, h) {
                return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
            }, g.registerSpecialProp = function (a, b, c) {
                ya(a, {
                    parser: function (a, d, e, f, g, h, i) {
                        var j = new ta(a, e, 0, 0, g, 2, e, !1, c);
                        return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
                    },
                    priority: c
                })
            }, g.useSVGTransformAttr = !0;
            var Aa, Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                Ca = Z("transform"),
                Da = X + "transform",
                Ea = Z("transformOrigin"),
                Fa = null !== Z("perspective"),
                Ga = S.Transform = function () {
                    this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1
                },
                Ha = _gsScope.SVGElement,
                Ia = function (a, b, c) {
                    var d, e = O.createElementNS("http://www.w3.org/2000/svg", a),
                        f = /([a-z])([A-Z])/g;
                    for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
                    return b.appendChild(e), e
                },
                Ja = O.documentElement || {},
                Ka = function () {
                    var a, b, c, d = p || /Android/i.test(T) && !_gsScope.chrome;
                    return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja.removeChild(a)), d
                }(),
                La = function (a, b, c, d, e, f) {
                    var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform,
                        w = Qa(a, !0);
                    v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = {
                        x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0,
                        y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0,
                        width: 0,
                        height: 0
                    }), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "))
                },
                Ma = function (a) {
                    var b, c = P("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                        d = this.parentNode,
                        e = this.nextSibling,
                        f = this.style.cssText;
                    if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try {
                        b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma
                    } catch (g) { } else this._originalGetBBox && (b = this._originalGetBBox());
                    return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style.cssText = f, b
                },
                Na = function (a) {
                    try {
                        return a.getBBox()
                    } catch (b) {
                        return Ma.call(a, !0)
                    }
                },
                Oa = function (a) {
                    return !(!(Ha && a.getCTM && Na(a)) || a.parentNode && !a.ownerSVGElement)
                },
                Pa = [1, 0, 0, 1, 0, 0],
                Qa = function (a, b) {
                    var c, d, e, f, g, h, i = a._gsTransform || new Ga,
                        j = 1e5,
                        k = a.style;
                    if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, c && Ca && ((h = "none" === $(a).display) || !a.parentNode) && (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k, "display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return Pa;
                    for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;) f = Number(e[wa]), e[wa] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
                    return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
                },
                Ra = S.getTransform = function (a, c, d, e) {
                    if (a._gsTransform && d && !e) return a._gsTransform;
                    var f, h, i, j, k, l, m = d ? a._gsTransform || new Ga : new Ga,
                        n = m.scaleX < 0,
                        o = 2e-5,
                        p = 1e5,
                        q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
                        r = parseFloat(g.defaultTransformPerspective) || 0;
                    if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(a), f !== Pa) {
                        if (16 === f.length) {
                            var s, t, u, v, w, x = f[0],
                                y = f[1],
                                z = f[2],
                                A = f[3],
                                B = f[4],
                                C = f[5],
                                D = f[6],
                                E = f[7],
                                F = f[8],
                                G = f[9],
                                H = f[10],
                                I = f[12],
                                J = f[13],
                                K = f[14],
                                M = f[11],
                                N = Math.atan2(D, H);
                            m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), x = x * v + B * w, t = y * v + C * w, C = y * -w + C * v, D = z * -w + D * v, y = t), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), m.scaleX = (Math.sqrt(x * x + y * y) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + G * G) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(D * D + H * H) * p + .5 | 0) / p, m.rotationX || m.rotationY ? m.skewX = 0 : (m.skewX = B || C ? Math.atan2(B, C) * L + m.rotation : m.skewX || 0, Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180))), m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C))
                        } else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
                            var O = f.length >= 6,
                                P = O ? f[0] : 1,
                                Q = f[1] || 0,
                                R = f[2] || 0,
                                S = O ? f[3] : 1;
                            m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, Math.abs(l) > 90 && Math.abs(l) < 270 && (n ? (i *= -1, l += 0 >= k ? 180 : -180, k += 0 >= k ? 180 : -180) : (j *= -1, l += 0 >= l ? 180 : -180)), m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S))
                        }
                        m.zOrigin = q;
                        for (h in m) m[h] < o && m[h] > -o && (m[h] = 0)
                    }
                    return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001, function () {
                        Va(a.style, Ca)
                    }) : !Aa && a.getAttribute("transform") && b.delayedCall(.001, function () {
                        a.removeAttribute("transform")
                    }))), m
                },
                Sa = function (a) {
                    var b, c, d = this.data,
                        e = -d.rotation * K,
                        f = e + d.skewX * K,
                        g = 1e5,
                        h = (Math.cos(e) * d.scaleX * g | 0) / g,
                        i = (Math.sin(e) * d.scaleX * g | 0) / g,
                        j = (Math.sin(f) * -d.scaleY * g | 0) / g,
                        k = (Math.cos(f) * d.scaleY * g | 0) / g,
                        l = this.t.style,
                        m = this.t.currentStyle;
                    if (m) {
                        c = i, i = -j, j = -c, b = m.filter, l.filter = "";
                        var n, o, q = this.t.offsetWidth,
                            r = this.t.offsetHeight,
                            s = "absolute" !== m.position,
                            t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                            u = d.x + q * d.xPercent / 100,
                            v = d.y + r * d.yPercent / 100;
                        if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                            var y, z, A, B = 8 > p ? 1 : -1;
                            for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), wa = 0; 4 > wa; wa++) z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa || 2 === wa ? 1 : B))) + "px"
                        }
                    }
                },
                Ta = S.set3DTransformRatio = S.setTransformRatio = function (a) {
                    var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data,
                        A = this.t.style,
                        B = z.rotation,
                        C = z.rotationX,
                        D = z.rotationY,
                        E = z.scaleX,
                        F = z.scaleY,
                        G = z.scaleZ,
                        H = z.x,
                        I = z.y,
                        J = z.z,
                        L = z.svg,
                        M = z.perspective,
                        N = z.force3D,
                        O = z.skewY,
                        P = z.skewX;
                    if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void (B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
                    if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r = c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r;
                    else {
                        if (!(D || C || 1 !== G || M || L)) return void (A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
                        c = g = 1, d = f = 0
                    }
                    k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",", w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t), 1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F, m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ca] = u
                };
            j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function (a, b, c, d, f, h, i) {
                    if (d._lastParsedTransform === i) return f;
                    d._lastParsedTransform = i;
                    var j, k = i.scale && "function" == typeof i.scale ? i.scale : 0;
                    "function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a));
                    var l, m, n, o, p, s, t, u, v, w = a._gsTransform,
                        x = a.style,
                        y = 1e-6,
                        z = Ba.length,
                        A = i,
                        B = {},
                        C = "transformOrigin",
                        D = Ra(a, e, !0, A.parseTransform),
                        E = A.transform && ("function" == typeof A.transform ? A.transform(r, q) : A.transform);
                    if (d._transform = D, E && "string" == typeof E && Ca) m = Q.style, m[Ca] = E, m.display = "block", m.position = "absolute", O.body.appendChild(Q), l = Ra(Q, null, !1), D.svg && (s = D.xOrigin, t = D.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin || A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] + t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body.removeChild(Q), l.perspective || (l.perspective = D.perspective), null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null != A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent));
                    else if ("object" == typeof A) {
                        if (l = {
                            scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX),
                            scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY),
                            scaleZ: ja(A.scaleZ, D.scaleZ),
                            x: ja(A.x, D.x),
                            y: ja(A.y, D.y),
                            z: ja(A.z, D.z),
                            xPercent: ja(A.xPercent, D.xPercent),
                            yPercent: ja(A.yPercent, D.yPercent),
                            perspective: ja(A.transformPerspective, D.perspective)
                        }, p = A.directionalRotation, null != p)
                            if ("object" == typeof p)
                                for (m in p) A[m] = p[m];
                            else A.rotation = p;
                        "string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D.yPercent)), l.rotation = ka("rotation" in A ? A.rotation : "shortRotation" in A ? A.shortRotation + "_short" : "rotationZ" in A ? A.rotationZ : D.rotation, D.rotation, "rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A.rotationX : "shortRotationX" in A ? A.shortRotationX + "_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l.rotationY = ka("rotationY" in A ? A.rotationY : "shortRotationY" in A ? A.shortRotationY + "_short" : D.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX = ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY)
                    }
                    for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), D.skewType = A.skewType || D.skewType || g.defaultSkewType, n = D.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --z > -1;) v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] || null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
                    return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset, t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1, "50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ? parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 = f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i.scale = k), f
                },
                prefix: !0
            }), ya("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), ya("borderRadius", {
                defaultValue: "0px",
                parser: function (a, b, c, f, g, h) {
                    b = this.format(b);
                    var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        z = a.style;
                    for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++) this.p.indexOf("border") && (y[j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
                    return g
                },
                prefix: !0,
                formatter: qa("0px 0px 0px 0px", !1, !0)
            }), ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function (a, b, c, d, f, g) {
                    return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f)
                },
                prefix: !0,
                formatter: qa("0px 0px", !1, !0)
            }), ya("backgroundPosition", {
                defaultValue: "0 0",
                parser: function (a, b, c, d, f, g) {
                    var h, i, j, k, l, m, n = "background-position",
                        o = e || $(a, null),
                        q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                        r = this.format(b);
                    if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m && "none" !== m)) {
                        for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
                        q = h.join(" ")
                    }
                    return this.parseComplex(a.style, q, r, f, g)
                },
                formatter: ha
            }), ya("backgroundSize", {
                defaultValue: "0 0",
                formatter: function (a) {
                    return a += "", ha(-1 === a.indexOf(" ") ? a + " " + a : a)
                }
            }), ya("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), ya("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), ya("transformStyle", {
                prefix: !0
            }), ya("backfaceVisibility", {
                prefix: !0
            }), ya("userSelect", {
                prefix: !0
            }), ya("margin", {
                parser: ra("marginTop,marginRight,marginBottom,marginLeft")
            }), ya("padding", {
                parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), ya("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function (a, b, c, d, f, g) {
                    var h, i, j;
                    return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(_(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
                }
            }), ya("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), ya("autoRound,strictUnits", {
                parser: function (a, b, c, d, e) {
                    return e
                }
            }), ya("border", {
                defaultValue: "0px solid #000",
                parser: function (a, b, c, d, f, g) {
                    var h = _(a, "borderTopWidth", e, !1, "0px"),
                        i = this.format(b).split(" "),
                        j = i[0].replace(w, "");
                    return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + _(a, "borderTopStyle", e, !1, "solid") + " " + _(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g)
                },
                color: !0,
                formatter: function (a) {
                    var b = a.split(" ");
                    return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0]
                }
            }), ya("borderWidth", {
                parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), ya("float,cssFloat,styleFloat", {
                parser: function (a, b, c, d, e, f) {
                    var g = a.style,
                        h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                    return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
                }
            });
            var Ua = function (a) {
                var b, c = this.t,
                    d = c.filter || _(this.data, "filter") || "",
                    e = this.s + this.c * a | 0;
                100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e))
            };
            ya("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function (a, b, c, d, f, g) {
                    var h = parseFloat(_(a, "opacity", e, !1, "1")),
                        i = a.style,
                        j = "autoAlpha" === c;
                    return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f = new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
                }
            });
            var Va = function (a, b) {
                b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b))
            },
                Wa = function (a) {
                    if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                        this.t.setAttribute("class", 0 === a ? this.b : this.e);
                        for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next;
                        1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            ya("className", {
                parser: function (a, b, d, f, g, h, i) {
                    var j, k, l, m, n, o = a.getAttribute("class") || "",
                        p = a.style.cssText;
                    if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) {
                        for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
                        l.setRatio(1)
                    }
                    return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
                }
            });
            var Xa = function (a) {
                if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var b, c, d, e, f, g = this.t.style,
                        h = i.transform.parse;
                    if ("all" === this.e) g.cssText = "", e = !0;
                    else
                        for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ea : i[c].p), Va(g, c);
                    e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                }
            };
            for (ya("clearProps", {
                parser: function (a, b, d, e, f) {
                    return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
                }
            }), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;) za(j[wa]);
            j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h, j) {
                if (!a.nodeType) return !1;
                this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps;
                var n, p, s, t, u, v, w, x, z, A = a.style;
                if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a, e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
                    for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;) s = s._next;
                    x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1, f.pop()
                }
                if (c) {
                    for (; p;) {
                        for (v = p._next, s = t; s && s.pr > p.pr;) s = s._next;
                        (p._prev = s ? s._prev : u) ? p._prev._next = p : t = p, (p._next = s) ? s._prev = p : u = p, p = v
                    }
                    this._firstPT = t
                }
                return !0
            }, j.parse = function (a, b, c, f) {
                var g, h, j, l, m, n, o, p, s, t, u = a.style;
                for (g in b) n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ga(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = aa(a, g, j, o), "%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))), f && c && !c.plugin && (c.plugin = f);
                return c
            }, j.setRatio = function (a) {
                var b, c, d, e = this._firstPT,
                    f = 1e-6;
                if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; e;) {
                            if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type)
                                if (1 === e.type)
                                    if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                    else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                    else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                    else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                    else {
                                        for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                        e.t[e.p] = c
                                    } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                            else e.t[e.p] = b + e.xs0;
                            e = e._next
                        } else
                        for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
                else
                    for (; e;) {
                        if (2 !== e.type)
                            if (e.r && -1 !== e.type)
                                if (b = Math.round(e.s + e.c), e.type) {
                                    if (1 === e.type) {
                                        for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                        e.t[e.p] = c
                                    }
                                } else e.t[e.p] = b + e.xs0;
                            else e.t[e.p] = e.e;
                        else e.setRatio(a);
                        e = e._next
                    }
            }, j._enableTransforms = function (a) {
                this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3
            };
            var Ya = function (a) {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            j._addLazySet = function (a, b, c) {
                var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2);
                d.e = c, d.setRatio = Ya, d.data = this
            }, j._linkCSSP = function (a, b, c, d) {
                return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
            }, j._mod = function (a) {
                for (var b = this._firstPT; b;) "function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1), b = b._next
            }, j._kill = function (b) {
                var c, d, e, f = b;
                if (b.autoAlpha || b.alpha) {
                    f = {};
                    for (d in b) f[d] = b[d];
                    f.opacity = 1, f.autoAlpha && (f.visibility = 1)
                }
                for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;) c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next;
                return a.prototype._kill.call(this, f)
            };
            var Za = function (a, b, c) {
                var d, e, f, g;
                if (a.slice)
                    for (e = a.length; --e > -1;) Za(a[e], b, c);
                else
                    for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c)
            };
            return g.cascadeTo = function (a, c, d) {
                var e, f, g, h, i = b.to(a, c, d),
                    j = [i],
                    k = [],
                    l = [],
                    m = [],
                    n = b._internals.reservedProps;
                for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)
                    if (f = da(m[e], k[e], l[e]), f.firstMPT) {
                        f = f.difs;
                        for (g in d) n[g] && (f[g] = d[g]);
                        h = {};
                        for (g in f) h[g] = k[e][g];
                        j.push(b.fromTo(m[e], c, h, f))
                    }
                return j
            }, a.activate([g]), g
        }, !0),
        function () {
            var a = _gsScope._gsDefine.plugin({
                propName: "roundProps",
                version: "1.6.0",
                priority: -1,
                API: 2,
                init: function (a, b, c) {
                    return this._tween = c, !0
                }
            }),
                b = function (a) {
                    for (; a;) a.f || a.blob || (a.m = Math.round), a = a._next
                },
                c = a.prototype;
            c._onInitAllProps = function () {
                for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -1;) h[f[g]] = Math.round;
                for (g = f.length; --g > -1;)
                    for (a = f[g], c = e._firstPT; c;) d = c._next, c.pg ? c.t._mod(h) : c.n === a && (2 === c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT = d), c._next = c._prev = null, e._propLookup[a] = i)), c = d;
                return !1
            }, c._add = function (a, b, c, d) {
                this._addTween(a, b, c, c + d, b, Math.round), this._overwriteProps.push(b)
            }
        }(),
        function () {
            _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.6.0",
                init: function (a, b, c, d) {
                    var e, f;
                    if ("function" != typeof a.setAttribute) return !1;
                    for (e in b) f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this._overwriteProps.push(e);
                    return !0
                }
            })
        }(), _gsScope._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.3.0",
            API: 2,
            init: function (a, b, c, d) {
                "object" != typeof b && (b = {
                    rotation: b
                }), this.finals = {};
                var e, f, g, h, i, j, k = b.useRadians === !0 ? 2 * Math.PI : 360,
                    l = 1e-6;
                for (e in b) "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)), j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf("short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)), -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g + i, e), this._overwriteProps.push(e)));
                return !0
            },
            set: function (a) {
                var b;
                if (1 !== a) this._super.setRatio.call(this, a);
                else
                    for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
            }
        })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) {
            var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope,
                f = e.com.greensock,
                g = 2 * Math.PI,
                h = Math.PI / 2,
                i = f._class,
                j = function (b, c) {
                    var d = i("easing." + b, function () { }, !0),
                        e = d.prototype = new a;
                    return e.constructor = d, e.getRatio = c, d
                },
                k = a.register || function () { },
                l = function (a, b, c, d, e) {
                    var f = i("easing." + a, {
                        easeOut: new b,
                        easeIn: new c,
                        easeInOut: new d
                    }, !0);
                    return k(f, a), f
                },
                m = function (a, b, c) {
                    this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
                },
                n = function (b, c) {
                    var d = i("easing." + b, function (a) {
                        this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
                    }, !0),
                        e = d.prototype = new a;
                    return e.constructor = d, e.getRatio = c, e.config = function (a) {
                        return new d(a)
                    }, d
                },
                o = l("Back", n("BackOut", function (a) {
                    return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
                }), n("BackIn", function (a) {
                    return a * a * ((this._p1 + 1) * a - this._p1)
                }), n("BackInOut", function (a) {
                    return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
                })),
                p = i("easing.SlowMo", function (a, b, c) {
                    b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
                }, !0),
                q = p.prototype = new a;
            return q.constructor = p, q.getRatio = function (a) {
                var b = a + (.5 - a) * this._p;
                return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
            }, p.ease = new p(.7, .7), q.config = p.config = function (a, b, c) {
                return new p(a, b, c)
            }, b = i("easing.SteppedEase", function (a) {
                a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
            }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function (a) {
                return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
            }, q.config = b.config = function (a) {
                return new b(a)
            }, c = i("easing.RoughEase", function (b) {
                b = b || {};
                for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
                    x: c,
                    y: d
                };
                for (j.sort(function (a, b) {
                    return a.x - b.x
                }), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
                this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
            }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function (a) {
                var b = this._prev;
                if (a > b.t) {
                    for (; b.next && a >= b.t;) b = b.next;
                    b = b.prev
                } else
                    for (; b.prev && a <= b.t;) b = b.prev;
                return this._prev = b, b.v + (a - b.t) / b.gap * b.c
            }, q.config = function (a) {
                return new c(a)
            }, c.ease = new c, l("Bounce", j("BounceOut", function (a) {
                return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
            }), j("BounceIn", function (a) {
                return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
            }), j("BounceInOut", function (a) {
                var b = .5 > a;
                return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
            })), l("Circ", j("CircOut", function (a) {
                return Math.sqrt(1 - (a -= 1) * a)
            }), j("CircIn", function (a) {
                return -(Math.sqrt(1 - a * a) - 1)
            }), j("CircInOut", function (a) {
                return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
            })), d = function (b, c, d) {
                var e = i("easing." + b, function (a, b) {
                    this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2
                }, !0),
                    f = e.prototype = new a;
                return f.constructor = e, f.getRatio = c, f.config = function (a, b) {
                    return new e(a, b)
                }, e
            }, l("Elastic", d("ElasticOut", function (a) {
                return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
            }, .3), d("ElasticIn", function (a) {
                return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
            }, .3), d("ElasticInOut", function (a) {
                return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
            }, .45)), l("Expo", j("ExpoOut", function (a) {
                return 1 - Math.pow(2, -10 * a)
            }), j("ExpoIn", function (a) {
                return Math.pow(2, 10 * (a - 1)) - .001
            }), j("ExpoInOut", function (a) {
                return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
            })), l("Sine", j("SineOut", function (a) {
                return Math.sin(a * h)
            }), j("SineIn", function (a) {
                return -Math.cos(a * h) + 1
            }), j("SineInOut", function (a) {
                return -.5 * (Math.cos(Math.PI * a) - 1)
            })), i("easing.EaseLookup", {
                find: function (b) {
                    return a.map[b]
                }
            }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
        }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function (a, b) {
        "use strict";
        var c = {},
            d = a.document,
            e = a.GreenSockGlobals = a.GreenSockGlobals || a;
        if (!e.TweenLite) {
            var f, g, h, i, j, k = function (a) {
                var b, c = a.split("."),
                    d = e;
                for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
                return d
            },
                l = k("com.greensock"),
                m = 1e-10,
                n = function (a) {
                    var b, c = [],
                        d = a.length;
                    for (b = 0; b !== d; c.push(a[b++]));
                    return c
                },
                o = function () { },
                p = function () {
                    var a = Object.prototype.toString,
                        b = a.call([]);
                    return function (c) {
                        return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
                    }
                }(),
                q = {},
                r = function (d, f, g, h) {
                    this.sc = q[d] ? q[d].sc : [], q[d] = this, this.gsClass = null, this.func = g;
                    var i = [];
                    this.check = function (j) {
                        for (var l, m, n, o, p, s = f.length, t = s; --s > -1;)(l = q[f[s]] || new r(f[s], [])).gsClass ? (i[s] = l.gsClass, t--) : j && l.sc.push(this);
                        if (0 === t && g) {
                            if (m = ("com.greensock." + d).split("."), n = m.pop(), o = k(m.join("."))[n] = this.gsClass = g.apply(g, i), h)
                                if (e[n] = c[n] = o, p = "undefined" != typeof module && module.exports, !p && "function" == typeof define && define.amd) define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () {
                                    return o
                                });
                                else if (p)
                                    if (d === b) {
                                        module.exports = c[b] = o;
                                        for (s in c) o[s] = c[s]
                                    } else c[b] && (c[b][n] = o);
                            for (s = 0; s < this.sc.length; s++) this.sc[s].check()
                        }
                    }, this.check(!0)
                },
                s = a._gsDefine = function (a, b, c, d) {
                    return new r(a, b, c, d)
                },
                t = l._class = function (a, b, c) {
                    return b = b || function () { }, s(a, [], function () {
                        return b
                    }, c), b
                };
            s.globals = e;
            var u = [0, 0, 1, 1],
                v = t("easing.Ease", function (a, b, c, d) {
                    this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? u.concat(b) : u
                }, !0),
                w = v.map = {},
                x = v.register = function (a, b, c, d) {
                    for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;)
                        for (f = i[j], e = d ? t("easing." + f, null, !0) : l.easing[f] || {}, g = k.length; --g > -1;) h = k[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a
                };
            for (h = v.prototype, h._calcEnd = !1, h.getRatio = function (a) {
                if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                var b = this._type,
                    c = this._power,
                    d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
                return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
            }, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], g = f.length; --g > -1;) h = f[g] + ",Power" + g, x(new v(null, null, 1, g), h, "easeOut", !0), x(new v(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")), x(new v(null, null, 3, g), h, "easeInOut");
            w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut;
            var y = t("events.EventDispatcher", function (a) {
                this._listeners = {}, this._eventTarget = a || this
            });
            h = y.prototype, h.addEventListener = function (a, b, c, d, e) {
                e = e || 0;
                var f, g, h = this._listeners[a],
                    k = 0;
                for (this !== i || j || i.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;) f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1);
                h.splice(k, 0, {
                    c: b,
                    s: c,
                    up: d,
                    pr: e
                })
            }, h.removeEventListener = function (a, b) {
                var c, d = this._listeners[a];
                if (d)
                    for (c = d.length; --c > -1;)
                        if (d[c].c === b) return void d.splice(c, 1)
            }, h.dispatchEvent = function (a) {
                var b, c, d, e = this._listeners[a];
                if (e)
                    for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, {
                        type: a,
                        target: c
                    }) : d.c.call(d.s || c))
            };
            var z = a.requestAnimationFrame,
                A = a.cancelAnimationFrame,
                B = Date.now || function () {
                    return (new Date).getTime()
                },
                C = B();
            for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z;) z = a[f[g] + "RequestAnimationFrame"], A = a[f[g] + "CancelAnimationFrame"] || a[f[g] + "CancelRequestAnimationFrame"];
            t("Ticker", function (a, b) {
                var c, e, f, g, h, k = this,
                    l = B(),
                    n = b !== !1 && z ? "auto" : !1,
                    p = 500,
                    q = 33,
                    r = "tick",
                    s = function (a) {
                        var b, d, i = B() - C;
                        i > p && (l += i - q), C += i, k.time = (C - l) / 1e3, b = k.time - h, (!c || b > 0 || a === !0) && (k.frame++, h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 && (f = e(s)), d && k.dispatchEvent(r)
                    };
                y.call(k), k.time = k.frame = 0, k.tick = function () {
                    s(!0)
                }, k.lagSmoothing = function (a, b) {
                    p = a || 1 / m, q = Math.min(b, p, 0)
                }, k.sleep = function () {
                    null != f && (n && A ? A(f) : clearTimeout(f), e = o, f = null, k === i && (j = !1))
                }, k.wake = function (a) {
                    null !== f ? k.sleep() : a ? l += -C + (C = B()) : k.frame > 10 && (C = B() - p + 5), e = 0 === c ? o : n && z ? z : function (a) {
                        return setTimeout(a, 1e3 * (h - k.time) + 1 | 0)
                    }, k === i && (j = !0), s(2)
                }, k.fps = function (a) {
                    return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void k.wake()) : c
                }, k.useRAF = function (a) {
                    return arguments.length ? (k.sleep(), n = a, void k.fps(c)) : n
                }, k.fps(a), setTimeout(function () {
                    "auto" === n && k.frame < 5 && "hidden" !== d.visibilityState && k.useRAF(!1)
                }, 1500)
            }), h = l.Ticker.prototype = new l.events.EventDispatcher, h.constructor = l.Ticker;
            var D = t("core.Animation", function (a, b) {
                if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, W) {
                    j || i.wake();
                    var c = this.vars.useFrames ? V : W;
                    c.add(this, c._time), this.vars.paused && this.paused(!0)
                }
            });
            i = D.ticker = new l.Ticker, h = D.prototype, h._dirty = h._gc = h._initted = h._paused = !1, h._totalTime = h._time = 0, h._rawPrevTime = -1, h._next = h._last = h._onUpdate = h._timeline = h.timeline = null, h._paused = !1;
            var E = function () {
                j && B() - C > 2e3 && i.wake(), setTimeout(E, 2e3)
            };
            E(), h.play = function (a, b) {
                return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
            }, h.pause = function (a, b) {
                return null != a && this.seek(a, b), this.paused(!0)
            }, h.resume = function (a, b) {
                return null != a && this.seek(a, b), this.paused(!1)
            }, h.seek = function (a, b) {
                return this.totalTime(Number(a), b !== !1)
            }, h.restart = function (a, b) {
                return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
            }, h.reverse = function (a, b) {
                return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
            }, h.render = function (a, b, c) { }, h.invalidate = function () {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, h.isActive = function () {
                var a, b = this._timeline,
                    c = this._startTime;
                return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale
            }, h._enabled = function (a, b) {
                return j || i.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
            }, h._kill = function (a, b) {
                return this._enabled(!1, !1)
            }, h.kill = function (a, b) {
                return this._kill(a, b), this
            }, h._uncache = function (a) {
                for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
                return this
            }, h._swapSelfInParams = function (a) {
                for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
                return c
            }, h._callback = function (a) {
                var b = this.vars,
                    c = b[a],
                    d = b[a + "Params"],
                    e = b[a + "Scope"] || b.callbackScope || this,
                    f = d ? d.length : 0;
                switch (f) {
                    case 0:
                        c.call(e);
                        break;
                    case 1:
                        c.call(e, d[0]);
                        break;
                    case 2:
                        c.call(e, d[0], d[1]);
                        break;
                    default:
                        c.apply(e, d)
                }
            }, h.eventCallback = function (a, b, c, d) {
                if ("on" === (a || "").substr(0, 2)) {
                    var e = this.vars;
                    if (1 === arguments.length) return e[a];
                    null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = p(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
                }
                return this
            }, h.delay = function (a) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
            }, h.duration = function (a) {
                return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, h.totalDuration = function (a) {
                return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
            }, h.time = function (a, b) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
            }, h.totalTime = function (a, b, c) {
                if (j || i.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var d = this._totalDuration,
                            e = this._timeline;
                        if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                            for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J.length && Y(), this.render(a, b, !1), J.length && Y())
                }
                return this
            }, h.progress = h.totalProgress = function (a, b) {
                var c = this.duration();
                return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
            }, h.startTime = function (a) {
                return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
            }, h.endTime = function (a) {
                return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
            }, h.timeScale = function (a) {
                if (!arguments.length) return this._timeScale;
                if (a = a || m, this._timeline && this._timeline.smoothChildTiming) {
                    var b = this._pauseTime,
                        c = b || 0 === b ? b : this._timeline.totalTime();
                    this._startTime = c - (c - this._startTime) * this._timeScale / a
                }
                return this._timeScale = a, this._uncache(!1)
            }, h.reversed = function (a) {
                return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, h.paused = function (a) {
                if (!arguments.length) return this._paused;
                var b, c, d = this._timeline;
                return a != this._paused && d && (j || a || i.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
            };
            var F = t("core.SimpleTimeline", function (a) {
                D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            h = F.prototype = new D, h.constructor = F, h.kill()._gc = !1, h._first = h._last = h._recent = null, h._sortChildren = !1, h.add = h.insert = function (a, b, c, d) {
                var e, f;
                if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
                    for (f = a._startTime; e && e._startTime > f;) e = e._prev;
                return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
            }, h._remove = function (a, b) {
                return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, h.render = function (a, b, c) {
                var d, e = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
            }, h.rawTime = function () {
                return j || i.wake(), this._totalTime
            };
            var G = t("TweenLite", function (b, c, d) {
                if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw "Cannot tween a null target.";
                this.target = b = "string" != typeof b ? b : G.selector(b) || b;
                var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                    i = this.vars.overwrite;
                if (this._overwrite = i = null == i ? U[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : U[i], (h || b instanceof Array || b.push && p(b)) && "number" != typeof b[0])
                    for (this._targets = g = n(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(n(f))) : (this._siblings[e] = Z(f, this, !1), 1 === i && this._siblings[e].length > 1 && _(f, this, null, 1, this._siblings[e])) : (f = g[e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
                else this._propLookup = {}, this._siblings = Z(b, this, !1), 1 === i && this._siblings.length > 1 && _(b, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -m, this.render(Math.min(0, -this._delay)))
            }, !0),
                H = function (b) {
                    return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
                },
                I = function (a, b) {
                    var c, d = {};
                    for (c in a) T[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!Q[c] || Q[c] && Q[c]._autoCSS) || (d[c] = a[c], delete a[c]);
                    a.css = d
                };
            h = G.prototype = new D, h.constructor = G, h.kill()._gc = !1, h.ratio = 0, h._firstPT = h._targets = h._overwrittenProps = h._startAt = null, h._notifyPluginsOfEnabled = h._lazy = !1, G.version = "1.19.1", G.defaultEase = h._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = i, G.autoSleep = 120, G.lagSmoothing = function (a, b) {
                i.lagSmoothing(a, b)
            }, G.selector = a.$ || a.jQuery || function (b) {
                var c = a.$ || a.jQuery;
                return c ? (G.selector = c, c(b)) : "undefined" == typeof d ? b : d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
            };
            var J = [],
                K = {},
                L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                M = function (a) {
                    for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? 1 === a ? this.end : a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m(b, this._target || c.t) : d > b && b > -d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
                },
                N = function (a, b, c, d) {
                    var e, f, g, h, i, j, k, l = [],
                        m = 0,
                        n = "",
                        o = 0;
                    for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++) k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
                        _next: l._firstPT,
                        t: l,
                        p: l.length - 1,
                        s: g,
                        c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
                        f: 0,
                        m: o && 4 > o ? Math.round : 0
                    }), m += k.length;
                    return n += b.substr(m), n && l.push(n), l.setRatio = M, l
                },
                O = function (a, b, c, d, e, f, g, h, i) {
                    "function" == typeof d && (d = d(i || 0, a));
                    var j, k = typeof a[b],
                        l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3),
                        m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b],
                        n = "string" == typeof d && "=" === d.charAt(1),
                        o = {
                            t: a,
                            p: b,
                            s: m,
                            f: "function" === k,
                            pg: 0,
                            n: e || b,
                            m: f ? "function" == typeof f ? f : Math.round : 0,
                            pr: 0,
                            c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
                        };
                    return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = N(m, n ? o.s + o.c : d, h || G.defaultStringFilter, o), o = {
                        t: j,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: e || b,
                        pr: 0,
                        m: 0
                    }) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0
                },
                P = G._internals = {
                    isArray: p,
                    isSelector: H,
                    lazyTweens: J,
                    blobDif: N
                },
                Q = G._plugins = {},
                R = P.tweenLookup = {},
                S = 0,
                T = P.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1
                },
                U = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                V = D._rootFramesTimeline = new F,
                W = D._rootTimeline = new F,
                X = 30,
                Y = P.lazyRender = function () {
                    var a, b = J.length;
                    for (K = {}; --b > -1;) a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
                    J.length = 0
                };
            W._startTime = i.time, V._startTime = i.frame, W._active = V._active = !0, setTimeout(Y, 1), D._updateRoot = G.render = function () {
                var a, b, c;
                if (J.length && Y(), W.render((i.time - W._startTime) * W._timeScale, !1, !1), V.render((i.frame - V._startTime) * V._timeScale, !1, !1), J.length && Y(), i.frame >= X) {
                    X = i.frame + (parseInt(G.autoSleep, 10) || 120);
                    for (c in R) {
                        for (b = R[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                        0 === b.length && delete R[c]
                    }
                    if (c = W._first, (!c || c._paused) && G.autoSleep && !V._first && 1 === i._listeners.tick.length) {
                        for (; c && c._paused;) c = c._next;
                        c || i.sleep()
                    }
                }
            }, i.addEventListener("tick", D._updateRoot);
            var Z = function (a, b, c) {
                var d, e, f = a._gsTweenID;
                if (R[f || (a._gsTweenID = f = "t" + S++)] || (R[f] = {
                    target: a,
                    tweens: []
                }), b && (d = R[f].tweens, d[e = d.length] = b, c))
                    for (; --e > -1;) d[e] === b && d.splice(e, 1);
                return R[f].tweens
            },
                $ = function (a, b, c, d) {
                    var e, f, g = a.vars.onOverwrite;
                    return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
                },
                _ = function (a, b, c, d, e) {
                    var f, g, h, i;
                    if (1 === d || d >= 4) {
                        for (i = e.length, f = 0; i > f; f++)
                            if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);
                            else if (5 === d) break;
                        return g
                    }
                    var j, k = b._startTime + m,
                        l = [],
                        n = 0,
                        o = 0 === b._duration;
                    for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || aa(b, 0, o), 0 === aa(h, j, o) && (l[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (l[n++] = h)));
                    for (f = n; --f > -1;)
                        if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
                            if (2 !== d && !$(h, b)) continue;
                            h._enabled(!1, !1) && (g = !0)
                        }
                    return g
                },
                aa = function (a, b, c) {
                    for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                        if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                        d = d._timeline
                    }
                    return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * m > f - b ? m : (f += a.totalDuration() / a._timeScale / e) > b + m ? 0 : f - b - m
                };
            h._init = function () {
                var a, b, c, d, e, f, g = this.vars,
                    h = this._overwrittenProps,
                    i = this._duration,
                    j = !!g.immediateRender,
                    k = g.ease;
                if (g.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
                    for (d in g.startAt) e[d] = g.startAt[d];
                    if (e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, this._startAt = G.to(this.target, 0, e), j)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== i) return
                } else if (g.runBackwards && 0 !== i)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (j = !1), c = {};
                        for (d in g) T[d] && "autoCSS" !== d || (c[d] = g[d]);
                        if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = G.to(this.target, 0, c), j) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = k = k ? k instanceof v ? k : "function" == typeof k ? new v(k, g.easeParams) : w[k] || G.defaultEase : G.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (f = this._targets.length, a = 0; f > a; a++) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
                else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
                if (b && G._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards)
                    for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
                this._onUpdate = g.onUpdate, this._initted = !0
            }, h._initProps = function (b, c, d, e, f) {
                var g, h, i, j, k, l;
                if (null == b) return !1;
                K[b._gsTweenID] && Y(), this.vars.css || b.style && b !== a && b.nodeType && Q.css && this.vars.autoCSS !== !1 && I(this.vars, b);
                for (g in this.vars)
                    if (l = this.vars[g], T[g]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));
                    else if (Q[g] && (j = new Q[g])._onInitTween(b, this.vars[g], this, f)) {
                        for (this._firstPT = k = {
                            _next: this._firstPT,
                            t: j,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: g,
                            pg: 1,
                            pr: j._priority,
                            m: 0
                        }, h = j._overwriteProps.length; --h > -1;) c[j._overwriteProps[h]] = this._firstPT;
                        (j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k)
                    } else c[g] = O.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
                return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && _(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i)
            }, h.render = function (a, b, c) {
                var d, e, f, g, h = this._time,
                    i = this._duration,
                    j = this._rawPrevTime;
                if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === m && "isPause" !== this.data) && j !== a && (c = !0, j > m && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : m);
                else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : m)), this._initted || (c = !0);
                else if (this._totalTime = this._time = a, this._easeType) {
                    var k = a / i,
                        l = this._easeType,
                        n = this._easePower;
                    (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2
                } else this.ratio = this._ease.getRatio(a / i);
                if (this._time !== h || c) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J.push(this), void (this._lazy = [a, b]);
                        this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                    this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === m && g !== m && (this._rawPrevTime = 0))
                }
            }, h._kill = function (a, b, c) {
                if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b;
                var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
                if ((p(b) || H(b)) && "number" != typeof b[0])
                    for (d = b.length; --d > -1;) this._kill(a, b[d], c) && (i = !0);
                else {
                    if (this._targets) {
                        for (d = this._targets.length; --d > -1;)
                            if (b === this._targets[d]) {
                                h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                                break
                            }
                    } else {
                        if (b !== this.target) return !1;
                        h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                    }
                    if (h) {
                        if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) {
                            for (f in j) h[f] && (l || (l = []), l.push(f));
                            if ((l || !a) && !$(this, c, b, l)) return !1
                        }
                        for (f in j) (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return i
            }, h.invalidate = function () {
                return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -m, this.render(Math.min(0, -this._delay))), this
            }, h._enabled = function (a, b) {
                if (j || i.wake(), a && this._gc) {
                    var c, d = this._targets;
                    if (d)
                        for (c = d.length; --c > -1;) this._siblings[c] = Z(d[c], this, !0);
                    else this._siblings = Z(this.target, this, !0)
                }
                return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
            }, G.to = function (a, b, c) {
                return new G(a, b, c)
            }, G.from = function (a, b, c) {
                return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c)
            }, G.fromTo = function (a, b, c, d) {
                return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d)
            }, G.delayedCall = function (a, b, c, d, e) {
                return new G(b, 0, {
                    delay: a,
                    onComplete: b,
                    onCompleteParams: c,
                    callbackScope: d,
                    onReverseComplete: b,
                    onReverseCompleteParams: c,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: e,
                    overwrite: 0
                })
            }, G.set = function (a, b) {
                return new G(a, 0, b)
            }, G.getTweensOf = function (a, b) {
                if (null == a) return [];
                a = "string" != typeof a ? a : G.selector(a) || a;
                var c, d, e, f;
                if ((p(a) || H(a)) && "number" != typeof a[0]) {
                    for (c = a.length, d = []; --c > -1;) d = d.concat(G.getTweensOf(a[c], b));
                    for (c = d.length; --c > -1;)
                        for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
                } else
                    for (d = Z(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
                return d
            }, G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) {
                "object" == typeof b && (c = b, b = !1);
                for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
            };
            var ba = t("plugins.TweenPlugin", function (a, b) {
                this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ba.prototype
            }, !0);
            if (h = ba.prototype, ba.version = "1.19.0", ba.API = 2, h._firstPT = null, h._addTween = O, h.setRatio = M, h._kill = function (a) {
                var b, c = this._overwriteProps,
                    d = this._firstPT;
                if (null != a[this._propName]) this._overwriteProps = [];
                else
                    for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
                for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
                return !1
            }, h._mod = h._roundProps = function (a) {
                for (var b, c = this._firstPT; c;) b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next
            }, G._onPluginEvent = function (a, b) {
                var c, d, e, f, g, h = b._firstPT;
                if ("_onInitAllProps" === a) {
                    for (; h;) {
                        for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
                        (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g
                    }
                    h = b._firstPT = e
                }
                for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
                return c
            }, ba.activate = function (a) {
                for (var b = a.length; --b > -1;) a[b].API === ba.API && (Q[(new a[b])._propName] = a[b]);
                return !0
            }, s.plugin = function (a) {
                if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
                var b, c = a.propName,
                    d = a.priority || 0,
                    e = a.overwriteProps,
                    f = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_mod",
                        mod: "_mod",
                        initAll: "_onInitAllProps"
                    },
                    g = t("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () {
                        ba.call(this, c, d), this._overwriteProps = e || []
                    }, a.global === !0),
                    h = g.prototype = new ba(c);
                h.constructor = g, g.API = a.API;
                for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
                return g.version = a.version, ba.activate([g]), g
            }, f = a._gsQueue) {
                for (g = 0; g < f.length; g++) f[g]();
                for (h in q) q[h].func || a.console.log("GSAP encountered missing dependency: " + h)
            }
            j = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

/*



 ██████╗ ██████╗ ██╗      ██████╗ ██╗   ██╗██████╗ ██████╗  ██████╗ ██╗  ██╗
██╔════╝██╔═══██╗██║     ██╔═══██╗██║   ██║██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝
██║      ██║    ██║██║     ██║   ██║██║   ██║██████╔╝██████╔╝██║   ██║ ╚███╔╝ 
██║      ██║    ██║██║     ██║   ██║██║   ██║██╔══██╗██╔══██╗██║   ██║ ██╔██╗ 
╚██████╗╚██████╔╝███████╗╚██████╔╝╚██████╔╝██║  ██║██████╔╝╚██████╔╝██╔╝ ██╗
 ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                                            



*/

/*!
 Colorbox 1.6.1
 license: MIT
 http://www.jacklmoore.com/colorbox
 */
(function (t, e, i) {
    function n(i, n, o) {
        var r = e.createElement(i);
        return n && (r.id = Z + n), o && (r.style.cssText = o), t(r)
    }

    function o() {
        return i.innerHeight ? i.innerHeight : t(i).height()
    }

    function r(e, i) {
        i !== Object(i) && (i = {}), this.cache = {}, this.el = e, this.value = function (e) {
            var n;
            return void 0 === this.cache[e] && (n = t(this.el).attr("data-cbox-" + e), void 0 !== n ? this.cache[e] = n : void 0 !== i[e] ? this.cache[e] = i[e] : void 0 !== X[e] && (this.cache[e] = X[e])), this.cache[e]
        }, this.get = function (e) {
            var i = this.value(e);
            return t.isFunction(i) ? i.call(this.el, this) : i
        }
    }

    function h(t) {
        var e = W.length,
            i = (A + t) % e;
        return 0 > i ? e + i : i
    }

    function a(t, e) {
        return Math.round((/%/.test(t) ? ("x" === e ? E.width() : o()) / 100 : 1) * parseInt(t, 10))
    }

    function s(t, e) {
        return t.get("photo") || t.get("photoRegex").test(e)
    }

    function l(t, e) {
        return t.get("retinaUrl") && i.devicePixelRatio > 1 ? e.replace(t.get("photoRegex"), t.get("retinaSuffix")) : e
    }

    function d(t) {
        "contains" in y[0] && !y[0].contains(t.target) && t.target !== v[0] && (t.stopPropagation(), y.focus())
    }

    function c(t) {
        c.str !== t && (y.add(v).removeClass(c.str).addClass(t), c.str = t)
    }

    function g(e) {
        A = 0, e && e !== !1 && "nofollow" !== e ? (W = t("." + te).filter(function () {
            var i = t.data(this, Y),
                n = new r(this, i);
            return n.get("rel") === e
        }), A = W.index(_.el), -1 === A && (W = W.add(_.el), A = W.length - 1)) : W = t(_.el)
    }

    function u(i) {
        t(e).trigger(i), ae.triggerHandler(i)
    }

    function f(i) {
        var o;
        if (!G) {
            if (o = t(i).data(Y), _ = new r(i, o), g(_.get("rel")), !$) {
                $ = q = !0, c(_.get("className")), y.css({
                    visibility: "hidden",
                    display: "block",
                    opacity: ""
                }), I = n(se, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"), b.css({
                    width: "",
                    height: ""
                }).append(I), j = T.height() + k.height() + b.outerHeight(!0) - b.height(), D = C.width() + H.width() + b.outerWidth(!0) - b.width(), N = I.outerHeight(!0), z = I.outerWidth(!0);
                var h = a(_.get("initialWidth"), "x"),
                    s = a(_.get("initialHeight"), "y"),
                    l = _.get("maxWidth"),
                    f = _.get("maxHeight");
                _.w = (l !== !1 ? Math.min(h, a(l, "x")) : h) - z - D, _.h = (f !== !1 ? Math.min(s, a(f, "y")) : s) - N - j, I.css({
                    width: "",
                    height: _.h
                }), J.position(), u(ee), _.get("onOpen"), O.add(S).hide(), y.focus(), _.get("trapFocus") && e.addEventListener && (e.addEventListener("focus", d, !0), ae.one(re, function () {
                    e.removeEventListener("focus", d, !0)
                })), _.get("returnFocus") && ae.one(re, function () {
                    t(_.el).focus()
                })
            }
            var p = parseFloat(_.get("opacity"));
            v.css({
                opacity: p === p ? p : "",
                cursor: _.get("overlayClose") ? "pointer" : "",
                visibility: "visible"
            }).show(), _.get("closeButton") ? B.html(_.get("close")).appendTo(b) : B.appendTo("<div/>"), w()
        }
    }

    function p() {
        y || (V = !1, E = t(i), y = n(se).attr({
            id: Y,
            "class": t.support.opacity === !1 ? Z + "IE" : "",
            role: "dialog",
            tabindex: "-1"
        }).hide(), v = n(se, "Overlay").hide(), M = t([n(se, "LoadingOverlay")[0], n(se, "LoadingGraphic")[0]]), x = n(se, "Wrapper"), b = n(se, "Content").append(S = n(se, "Title"), F = n(se, "Current"), P = t('<button type="button"/>').attr({
            id: Z + "Previous"
        }), K = t('<button type="button"/>').attr({
            id: Z + "Next"
        }), R = n("button", "Slideshow"), M), B = t('<button type="button"/>').attr({
            id: Z + "Close"
        }), x.append(n(se).append(n(se, "TopLeft"), T = n(se, "TopCenter"), n(se, "TopRight")), n(se, !1, "clear:left").append(C = n(se, "MiddleLeft"), b, H = n(se, "MiddleRight")), n(se, !1, "clear:left").append(n(se, "BottomLeft"), k = n(se, "BottomCenter"), n(se, "BottomRight"))).find("div div").css({
            "float": "left"
        }), L = n(se, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"), O = K.add(P).add(F).add(R)), e.body && !y.parent().length && t(e.body).append(v, y.append(x, L))
    }

    function m() {
        function i(t) {
            t.which > 1 || t.shiftKey || t.altKey || t.metaKey || t.ctrlKey || (t.preventDefault(), f(this))
        }
        return y ? (V || (V = !0, K.click(function () {
            J.next()
        }), P.click(function () {
            J.prev()
        }), B.click(function () {
            J.close()
        }), v.click(function () {
            _.get("overlayClose") && J.close()
        }), t(e).bind("keydown." + Z, function (t) {
            var e = t.keyCode;
            $ && _.get("escKey") && 27 === e && (t.preventDefault(), J.close()), $ && _.get("arrowKey") && W[1] && !t.altKey && (37 === e ? (t.preventDefault(), P.click()) : 39 === e && (t.preventDefault(), K.click()))
        }), t.isFunction(t.fn.on) ? t(e).on("click." + Z, "." + te, i) : t("." + te).live("click." + Z, i)), !0) : !1
    }

    function w() {
        var e, o, r, h = J.prep,
            d = ++le;
        if (q = !0, U = !1, u(he), u(ie), _.get("onLoad"), _.h = _.get("height") ? a(_.get("height"), "y") - N - j : _.get("innerHeight") && a(_.get("innerHeight"), "y"), _.w = _.get("width") ? a(_.get("width"), "x") - z - D : _.get("innerWidth") && a(_.get("innerWidth"), "x"), _.mw = _.w, _.mh = _.h, _.get("maxWidth") && (_.mw = a(_.get("maxWidth"), "x") - z - D, _.mw = _.w && _.w < _.mw ? _.w : _.mw), _.get("maxHeight") && (_.mh = a(_.get("maxHeight"), "y") - N - j, _.mh = _.h && _.h < _.mh ? _.h : _.mh), e = _.get("href"), Q = setTimeout(function () {
            M.show()
        }, 100), _.get("inline")) {
            var c = t(e);
            r = t("<div>").hide().insertBefore(c), ae.one(he, function () {
                r.replaceWith(c)
            }), h(c)
        } else _.get("iframe") ? h(" ") : _.get("html") ? h(_.get("html")) : s(_, e) ? (e = l(_, e), U = _.get("createImg"), t(U).addClass(Z + "Photo").bind("error." + Z, function () {
            h(n(se, "Error").html(_.get("imgError")))
        }).one("load", function () {
            d === le && setTimeout(function () {
                var e;
                _.get("retinaImage") && i.devicePixelRatio > 1 && (U.height = U.height / i.devicePixelRatio, U.width = U.width / i.devicePixelRatio), _.get("scalePhotos") && (o = function () {
                    U.height -= U.height * e, U.width -= U.width * e
                }, _.mw && U.width > _.mw && (e = (U.width - _.mw) / U.width, o()), _.mh && U.height > _.mh && (e = (U.height - _.mh) / U.height, o())), _.h && (U.style.marginTop = Math.max(_.mh - U.height, 0) / 2 + "px"), W[1] && (_.get("loop") || W[A + 1]) && (U.style.cursor = "pointer", t(U).bind("click." + Z, function () {
                    J.next()
                })), U.style.width = U.width + "px", U.style.height = U.height + "px", h(U)
            }, 1)
        }), U.src = e) : e && L.load(e, _.get("data"), function (e, i) {
            d === le && h("error" === i ? n(se, "Error").html(_.get("xhrError")) : t(this).contents())
        })
    }
    var v, y, x, b, T, C, H, k, W, E, I, L, M, S, F, R, K, P, B, O, _, j, D, N, z, A, U, $, q, G, Q, J, V, X = {
        html: !1,
        photo: !1,
        iframe: !1,
        inline: !1,
        transition: "elastic",
        speed: 300,
        fadeOut: 300,
        width: !1,
        initialWidth: "600",
        innerWidth: !1,
        maxWidth: !1,
        height: !1,
        initialHeight: "450",
        innerHeight: !1,
        maxHeight: !1,
        scalePhotos: !0,
        scrolling: !0,
        opacity: .9,
        preloading: !0,
        className: !1,
        overlayClose: !0,
        escKey: !0,
        arrowKey: !0,
        top: !1,
        bottom: !1,
        left: !1,
        right: !1,
        fixed: !1,
        data: void 0,
        closeButton: !0,
        fastIframe: !0,
        open: !1,
        reposition: !0,
        loop: !0,
        slideshow: !1,
        slideshowAuto: !0,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
        retinaImage: !1,
        retinaUrl: !1,
        retinaSuffix: "@2x.$1",
        current: "image {current} of {total}",
        previous: "previous",
        next: "next",
        close: "close",
        xhrError: "This content failed to load.",
        imgError: "This image failed to load.",
        returnFocus: !0,
        trapFocus: !0,
        onOpen: !1,
        onLoad: !1,
        onComplete: !1,
        onCleanup: !1,
        onClosed: !1,
        rel: function () {
            return this.rel
        },
        href: function () {
            return t(this).attr("href")
        },
        title: function () {
            return this.title
        },
        createImg: function () {
            var e = new Image,
                i = t(this).data("cbox-img-attrs");
            return "object" == typeof i && t.each(i, function (t, i) {
                e[t] = i
            }), e
        },
        createIframe: function () {
            var i = e.createElement("iframe"),
                n = t(this).data("cbox-iframe-attrs");
            return "object" == typeof n && t.each(n, function (t, e) {
                i[t] = e
            }), "frameBorder" in i && (i.frameBorder = 0), "allowTransparency" in i && (i.allowTransparency = "true"), i.name = (new Date).getTime(), i.allowFullScreen = !0, i
        }
    },
        Y = "colorbox",
        Z = "cbox",
        te = Z + "Element",
        ee = Z + "_open",
        ie = Z + "_load",
        ne = Z + "_complete",
        oe = Z + "_cleanup",
        re = Z + "_closed",
        he = Z + "_purge",
        ae = t("<a/>"),
        se = "div",
        le = 0,
        de = {},
        ce = function () {
            function t() {
                clearTimeout(h)
            }

            function e() {
                (_.get("loop") || W[A + 1]) && (t(), h = setTimeout(J.next, _.get("slideshowSpeed")))
            }

            function i() {
                R.html(_.get("slideshowStop")).unbind(s).one(s, n), ae.bind(ne, e).bind(ie, t), y.removeClass(a + "off").addClass(a + "on")
            }

            function n() {
                t(), ae.unbind(ne, e).unbind(ie, t), R.html(_.get("slideshowStart")).unbind(s).one(s, function () {
                    J.next(), i()
                }), y.removeClass(a + "on").addClass(a + "off")
            }

            function o() {
                r = !1, R.hide(), t(), ae.unbind(ne, e).unbind(ie, t), y.removeClass(a + "off " + a + "on")
            }
            var r, h, a = Z + "Slideshow_",
                s = "click." + Z;
            return function () {
                r ? _.get("slideshow") || (ae.unbind(oe, o), o()) : _.get("slideshow") && W[1] && (r = !0, ae.one(oe, o), _.get("slideshowAuto") ? i() : n(), R.show())
            }
        }();
    t[Y] || (t(p), J = t.fn[Y] = t[Y] = function (e, i) {
        var n, o = this;
        return e = e || {}, t.isFunction(o) && (o = t("<a/>"), e.open = !0), o[0] ? (p(), m() && (i && (e.onComplete = i), o.each(function () {
            var i = t.data(this, Y) || {};
            t.data(this, Y, t.extend(i, e))
        }).addClass(te), n = new r(o[0], e), n.get("open") && f(o[0])), o) : o
    }, J.position = function (e, i) {
        function n() {
            T[0].style.width = k[0].style.width = b[0].style.width = parseInt(y[0].style.width, 10) - D + "px", b[0].style.height = C[0].style.height = H[0].style.height = parseInt(y[0].style.height, 10) - j + "px"
        }
        var r, h, s, l = 0,
            d = 0,
            c = y.offset();
        if (E.unbind("resize." + Z), y.css({
            top: -9e4,
            left: -9e4
        }), h = E.scrollTop(), s = E.scrollLeft(), _.get("fixed") ? (c.top -= h, c.left -= s, y.css({
            position: "fixed"
        })) : (l = h, d = s, y.css({
            position: "absolute"
        })), d += _.get("right") !== !1 ? Math.max(E.width() - _.w - z - D - a(_.get("right"), "x"), 0) : _.get("left") !== !1 ? a(_.get("left"), "x") : Math.round(Math.max(E.width() - _.w - z - D, 0) / 2), l += _.get("bottom") !== !1 ? Math.max(o() - _.h - N - j - a(_.get("bottom"), "y"), 0) : _.get("top") !== !1 ? a(_.get("top"), "y") : Math.round(Math.max(o() - _.h - N - j, 0) / 2), y.css({
            top: c.top,
            left: c.left,
            visibility: "visible"
        }), x[0].style.width = x[0].style.height = "9999px", r = {
            width: _.w + z + D,
            height: _.h + N + j,
            top: l,
            left: d
        }, e) {
            var g = 0;
            t.each(r, function (t) {
                return r[t] !== de[t] ? (g = e, void 0) : void 0
            }), e = g
        }
        de = r, e || y.css(r), y.dequeue().animate(r, {
            duration: e || 0,
            complete: function () {
                n(), q = !1, x[0].style.width = _.w + z + D + "px", x[0].style.height = _.h + N + j + "px", _.get("reposition") && setTimeout(function () {
                    E.bind("resize." + Z, J.position)
                }, 1), t.isFunction(i) && i()
            },
            step: n
        })
    }, J.resize = function (t) {
        var e;
        $ && (t = t || {}, t.width && (_.w = a(t.width, "x") - z - D), t.innerWidth && (_.w = a(t.innerWidth, "x")), I.css({
            width: _.w
        }), t.height && (_.h = a(t.height, "y") - N - j), t.innerHeight && (_.h = a(t.innerHeight, "y")), t.innerHeight || t.height || (e = I.scrollTop(), I.css({
            height: "auto"
        }), _.h = I.height()), I.css({
            height: _.h
        }), e && I.scrollTop(e), J.position("none" === _.get("transition") ? 0 : _.get("speed")))
    }, J.prep = function (i) {
        function o() {
            return _.w = _.w || I.width(), _.w = _.mw && _.mw < _.w ? _.mw : _.w, _.w
        }

        function a() {
            return _.h = _.h || I.height(), _.h = _.mh && _.mh < _.h ? _.mh : _.h, _.h
        }
        if ($) {
            var d, g = "none" === _.get("transition") ? 0 : _.get("speed");
            I.remove(), I = n(se, "LoadedContent").append(i), I.hide().appendTo(L.show()).css({
                width: o(),
                overflow: _.get("scrolling") ? "auto" : "hidden"
            }).css({
                height: a()
            }).prependTo(b), L.hide(), t(U).css({
                "float": "none"
            }), c(_.get("className")), d = function () {
                function i() {
                    t.support.opacity === !1 && y[0].style.removeAttribute("filter")
                }
                var n, o, a = W.length;
                $ && (o = function () {
                    clearTimeout(Q), M.hide(), u(ne), _.get("onComplete")
                }, S.html(_.get("title")).show(), I.show(), a > 1 ? ("string" == typeof _.get("current") && F.html(_.get("current").replace("{current}", A + 1).replace("{total}", a)).show(), K[_.get("loop") || a - 1 > A ? "show" : "hide"]().html(_.get("next")), P[_.get("loop") || A ? "show" : "hide"]().html(_.get("previous")), ce(), _.get("preloading") && t.each([h(-1), h(1)], function () {
                    var i, n = W[this],
                        o = new r(n, t.data(n, Y)),
                        h = o.get("href");
                    h && s(o, h) && (h = l(o, h), i = e.createElement("img"), i.src = h)
                })) : O.hide(), _.get("iframe") ? (n = _.get("createIframe"), _.get("scrolling") || (n.scrolling = "no"), t(n).attr({
                    src: _.get("href"),
                    "class": Z + "Iframe"
                }).one("load", o).appendTo(I), ae.one(he, function () {
                    n.src = "//about:blank"
                }), _.get("fastIframe") && t(n).trigger("load")) : o(), "fade" === _.get("transition") ? y.fadeTo(g, 1, i) : i())
            }, "fade" === _.get("transition") ? y.fadeTo(g, 0, function () {
                J.position(0, d)
            }) : J.position(g, d)
        }
    }, J.next = function () {
        !q && W[1] && (_.get("loop") || W[A + 1]) && (A = h(1), f(W[A]))
    }, J.prev = function () {
        !q && W[1] && (_.get("loop") || A) && (A = h(-1), f(W[A]))
    }, J.close = function () {
        $ && !G && (G = !0, $ = !1, u(oe), _.get("onCleanup"), E.unbind("." + Z), v.fadeTo(_.get("fadeOut") || 0, 0), y.stop().fadeTo(_.get("fadeOut") || 0, 0, function () {
            y.hide(), v.hide(), u(he), I.remove(), setTimeout(function () {
                G = !1, u(re), _.get("onClosed")
            }, 1)
        }))
    }, J.remove = function () {
        y && (y.stop(), t[Y].close(), y.stop(!1, !0).remove(), v.remove(), G = !1, y = null, t("." + te).removeData(Y).removeClass(te), t(e).unbind("click." + Z).unbind("keydown." + Z))
    }, J.element = function () {
        return t(_.el)
    }, J.settings = X)
})(jQuery, document, window);

/*



███╗   ███╗ █████╗  ██████╗ ██╗ ██████╗██╗    ██╗ █████╗ ██╗     ██╗     
████╗ ████║██╔══██╗██╔════╝ ██║██╔════╝██║    ██║██╔══██╗██║     ██║     
██╔████╔██║███████║██║  ███╗██║██║     ██║ █╗ ██║███████║██║     ██║     
██║╚██╔╝██║██╔══██║██║   ██║██║██║     ██║███╗██║██╔══██║██║     ██║     
██║ ╚═╝ ██║██║  ██║╚██████╔╝██║╚██████╗╚███╔███╔╝██║  ██║███████╗███████╗
╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝ ╚═════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝
                                                                         



*/

// Magic Wall

(function ($, window, document, undefined) {
    "use strict";
    var
        doc = document,
        win = window,
        $doc = $(doc),
        $win = $(win),
        pluginName = "magicWall",
        pluginSlug = "magicwall",
        selectors = {
            loading: "." + pluginSlug + "-loading",
            hover: "." + pluginSlug + "-hover",
            wrap: "." + pluginSlug + "-wrap",
            thumb: "." + pluginSlug + "-thumb",
            grid: "." + pluginSlug + "-grid",
            gridItem: "." + pluginSlug + "-grid-item",
        };
    var
        easing = {
            swing: function (x, t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            }
        },
        prefix = (function () {
            var styles = window.getComputedStyle(document.documentElement, ''),
                pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
                dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
            return {
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: pre[0].toUpperCase() + pre.substr(1)
            };
        })(),
        has3d = (function () {
            var el, has3d;
            el = document.createElement('p');
            el.style['transform'] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
            document.body.insertBefore(el, document.body.lastChild);
            has3d = window.getComputedStyle(el).getPropertyValue('transform');
            $(el).remove();
            if (has3d !== undefined) {
                return has3d !== 'none';
            } else {
                return false;
            }
        })();

    function Css3d(e) {
        this.elem = e;
        this._init()
    }
    Css3d.prototype = {
        _init: function () {
            var e = this;
            e._addCssProps()
        },
        _raf: function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (e) {
                return window.setTimeout(e, 1e3 / 60)
            }
        }(),
        _caf: function () {
            return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function (e) {
                window.clearTimeout(e)
            }
        }(),
        _easing: {
            swing: function (e, t, n, r, i) {
                return -r * (t /= i) * (t - 2) + n
            }
        },
        _prefix: function () {
            var e = window.getComputedStyle(document.documentElement, ""),
                t = (Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/) || e.OLink === "" && ["", "o"])[1],
                n = "WebKit|Moz|MS|O".match(new RegExp("(" + t + ")", "i"))[1];
            return {
                dom: n,
                lowercase: t,
                css: "-" + t + "-",
                js: t[0].toUpperCase() + t.substr(1)
            }
        }(),
        _has3d: function () {
            var e, t;
            e = document.createElement("p");
            e.style["transform"] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
            document.body.insertBefore(e, document.body.lastChild);
            t = window.getComputedStyle(e).getPropertyValue("transform");
            $(e).remove();
            if (t !== undefined) {
                return t !== "none"
            } else {
                return false
            }
        }(),
        _addCssProps: function () {
            var e = this,
                t = [{
                    publicName: "x",
                    privateName: "_x",
                    defaultValue: 0
                }, {
                    publicName: "y",
                    privateName: "_y",
                    defaultValue: 0
                }, {
                    publicName: "z",
                    privateName: "_z",
                    defaultValue: 0
                }, {
                    publicName: "rotX",
                    privateName: "_rx",
                    defaultValue: 0
                }, {
                    publicName: "rotY",
                    privateName: "_ry",
                    defaultValue: 0
                }, {
                    publicName: "rotZ",
                    privateName: "_rz",
                    defaultValue: 0
                }, {
                    publicName: "originX",
                    privateName: "_ox",
                    defaultValue: .5
                }, {
                    publicName: "originY",
                    privateName: "_oy",
                    defaultValue: .5
                }, {
                    publicName: "scaleX",
                    privateName: "_scx",
                    defaultValue: 1
                }, {
                    publicName: "scaleY",
                    privateName: "_scy",
                    defaultValue: 1
                }, {
                    publicName: "opacity",
                    privateName: "_op",
                    defaultValue: 1
                }],
                n = 0,
                r = t.length;
            for (; n < r; n++) {
                e[t[n].publicName] = function (t) {
                    return function (n) {
                        if (n === undefined) return e[t.privateName] !== undefined ? e[t.privateName] : t.defaultValue;
                        e[t.privateName] = n;
                        return e
                    }
                }(t[n])
            }
        },
        _animate: function (e) {
            function s() {
                n = t._getValue(e.from, e.to, r, i, e.easing);
                if (e.callback) e.callback(n, r, i, e.callbackParams);
                if (e.onUpdate) e.onUpdate(n, r, i, e.onUpdateParams);
                if (r == i) {
                    if (e.complete) e.complete();
                    if (e.onComplete) e.onComplete()
                } else {
                    e.context[e.id] = t._raf.call(window, function () {
                        s()
                    })
                }
                r = Math.min(i, r + 1e3 / 60)
            }
            var t = this,
                n = e.from,
                r = -e.delay || 0,
                i = !e.duration ? 1e3 : e.duration;
            if (e.context[e.id]) t._caf.call(window, e.context[e.id]);
            if (e.callback) e.callback(n, r, i, e.callbackParams);
            if (e.onUpdate) e.onUpdate(n, r, i, e.onUpdateParams);
            s()
        },
        _getValue: function (e, t, n, r, i) {
            var s = this,
                o;
            o = $.easing && $.easing[i] ? $.easing[i] : s._easing.swing;
            return o(null, Math.max(0, n), e, t - e, r)
        },
        _doFromTo: function (e, t, n, r) {
            var i = this,
                s = e || t,
                o = i.elem instanceof jQuery,
                u;
            n = $.extend(true, {}, n);
            for (u in s) {
                n = $.extend(true, {}, n);
                n.id = u + "Tween";
                n.context = i;
                n.from = [(e || {})[u], o ? i[u]() : i.elem[u]][r == "to" ? 1 : 0];
                n.to = [(t || {})[u], o ? i[u]() : i.elem[u]][r == "from" ? 1 : 0];
                n.callback = function (e) {
                    return function (t) {
                        if (o) {
                            i[e](t);
                            i.update()
                        } else {
                            i.elem[e] = t
                        }
                    }
                }(u);
                i[u + "TweenProps"] = n;
                i._animate(n)
            }
            return i
        },
        set: function (e, t) {
            var n = this,
                r = 0,
                i;
            e = e.split(",");
            i = e.length;
            for (; r < i; r++) n[e[r]](t);
            return n
        },
        to: function (e, t) {
            var n = this;
            n._doFromTo(null, e, t, "to");
            return n
        },
        from: function (e, t) {
            var n = this;
            n._doFromTo(e, null, t, "from");
            return n
        },
        fromTo: function (e, t, n) {
            var r = this;
            r._doFromTo(e, t, n, "fromTo");
            return r
        },
        stop: function (e, t) {
            var n = this;
            e = e.split(",");
            for (var r in e) {
                if (t && n[e[r] + "TweenProps"]) {
                    n[e[r]](n[e[r] + "TweenProps"].to)
                }
                n._caf.call(window, n[e[r] + "Tween"])
            }
            return n
        },
        end: function (e) {
            var t = this;
            t.stop(e, true);
            return t
        },
        update: function () {
            var e = this,
                t = [],
                n;
            t.push("translate3d(" + e.x() + "px, " + e.y() + "px, " + e.z() + "px)");
            t.push("rotateX(" + e.rotX() + "deg)");
            t.push("rotateY(" + e.rotY() + "deg)");
            t.push("rotateZ(" + e.rotZ() + "deg)");
            t.push("scaleX(" + e.scaleX() + ")");
            t.push("scaleY(" + e.scaleY() + ")");
            n = {};
            n[e._prefix.css + "transform"] = t.join(" ");
            n[e._prefix.css + "transform-origin"] = e.originX() * 100 + "% " + e.originY() * 100 + "%";
            n["opacity"] = e.opacity();
            e.elem.css(n);
            return e
        }
    }
    $.fn[pluginName] = function (options) {
        var args = Array.prototype.slice.call(arguments, 1);
        return $(this).each(function () {
            var instance = $(this).data("_" + pluginName + "Instance");
            if (typeof options === "string" && !instance) return;
            instance = instance || new MagicWall(this);
            instance.init(options, args);
            $(this).data("_" + pluginName + "Instance", instance);
        });
    }
    $.fn[pluginName].options = {
        service: false,
        jsonUrl: false,
        appKey: false,
        userID: false,
        photoSetID: false,
        photoCount: 50,
        photoSize: 2,
        maxItemWidth: 240,
        maxItemHeight: 160,
        columnsCount: false,
        rowsCount: false,
        minColumnsCount: 1,
        minRowsCount: 1,
        maxColumnsCount: false,
        maxRowsCount: false,
        thumbSizing: "cover",
        perspective: 600,
        delay: 1000,
        loadingMode: "normal",
        paused: false,
        useCache: true,
        preloadBeforeSwitch: false,
        animations: "*",
        excludedAnimations: "",
        pauseOnHover: false,
        fixedClass: "fixed",
        breakpoints: false,
        autoUpdateOnResize: 50,
        duration: 600,
        easing: "easeInOutCubic",
        rollInXDuration: false,
        rollInXEasing: false,
        rollInYDuration: false,
        rollInYEasing: false,
        rollOutXDuration: false,
        rollOutXEasing: false,
        rollOutYDuration: false,
        rollOutYEasing: false,
        flipXDuration: false,
        flipXEasing: false,
        flipYDuration: false,
        flipYEasing: false,
        slideXDuration: false,
        slideXEasing: false,
        slideYDuration: false,
        slideYEasing: false,
        slideRowDuration: false,
        slideRowEasing: false,
        slideColumnDuration: false,
        slideColumnEasing: false,
        fadeDuration: false,
        fadeEasing: false,
    };
    $.fn[pluginName].services = {
        _json: {
            getURL: function (o) {
                return o.jsonUrl || "";
            },
            processJSON: function (json, o) {
                var p = json.photos,
                    i = 0,
                    r = [];
                if (p) {
                    for (; i < p.length; i++) {
                        r.push(p[i].image_url);
                    }
                    return r;
                }
                return false;
            }
        },
        _flickr: {
            getURL: function (o) {
                var url = "https://api.flickr.com/services/rest/?method=";
                if (o.userID) {
                    url += "flickr.people.getPublicPhotos&user_id=" + o.userID;
                } else
                    if (o.photoSetID) {
                        url += "flickr.photosets.getPhotos&media=photos&photoset_id=" + o.photoSetID;
                    }
                url += "&format=json&nojsoncallback=1&per_page=" + o.photoCount + "&api_key=" + o.appKey;
                return url;
            },
            processJSON: function (json, o) {
                var p = json.photos || json.photoset,
                    i = 0,
                    r = [],
                    sizes = ["q", "m", "n", "z",];
                if (p) {
                    p = p.photo;
                    for (; i < p.length; i++) {
                        r.push("http://farm" + p[i].farm + ".static.flickr.com/" + p[i].server + "/" + p[i].id + "_" + p[i].secret + "_" + sizes[o.photoSize - 1] + ".jpg");
                    }
                    return r;
                }
                return false;
            }
        },
        _500px: {
            getURL: function (o) {
                return "https://api.500px.com/v1/photos?feature=user&username=" + o.userID + "&rpp=" + o.photoCount + "&image_size=" + o.photoSize + "&consumer_key=" + o.appKey;
            },
            processJSON: function (json, o) {
                var p = json.photos,
                    i = 0,
                    r = [];
                if (p) {
                    for (; i < p.length; i++) {
                        r.push(p[i].image_url);
                    }
                    return r;
                }
                return false;
            }
        },
        _instagram: {
            getURL: function (o) {
                return "https://api.instagram.com/v1/users/" + o.userID + "/media/recent?count=" + o.photoCount + "&client_id=" + o.appKey + "&callback=?";
            },
            processJSON: function (json, o) {
                var p = json.data,
                    i = 0,
                    r = [],
                    sizes = ["thumbnail", "thumbnail", "low_resolution", "standard_resolution",];
                if (p) {
                    for (; i < p.length; i++) {
                        r.push(p[i].images[sizes[o.photoSize - 1]].url);
                    }
                    return r;
                }
                return false;
            }
        }
    }

    function MagicWall(elem) {
        this.elem = $(elem);
    }
    MagicWall.prototype = {
        init: function (options, args) {
            var t = this;
            if (t.api(options, args)) return t;
            t.originalHTML = t.elem.clone(true, true);
            t.manager = new MagicWallManager(t);
            t.userOptions = $.extend(true, {}, $.fn[pluginName].options, options);
            for (var p in $.fn[pluginName].options) {
                if (t.elem.data(p.toLowerCase()) !== undefined) {
                    t.userOptions[p] = t.elem.data(p.toLowerCase());
                }
            }
            t.updateOptions();
            t.setupStart();
            window.s = t;
            return t;
        },
        updateOptions: function () {
            var t = this,
                w = t.elem.outerWidth(),
                bp, i, n, o;
            bp = t.userOptions.breakpoints ? t.userOptions.breakpoints.split(",") : [];
            n = bp.length;
            for (i = 0; i < n; i++) {
                if (w <= bp[i] && t.userOptions["options_" + bp[i]]) {
                    o = t.userOptions["options_" + bp[i]];
                }
            }
            t.setOptions(o || t.userOptions);
            return t;
        },
        setOptions: function (options) {
            var t = this;
            t.options = $.extend(true, {}, $.fn[pluginName].options, options || t.options);
            return t;
        },
        setupStart: function () {
            var t = this;
            t.updateItemsList();
            t.elem.on("mouseover", selectors.grid + "," + selectors.gridItem, function () {
                $(this).addClass(selectors.hover.slice(1));
            }).on("mouseout", selectors.grid + "," + selectors.gridItem, function () {
                $(this).removeClass(selectors.hover.slice(1));
                if (t.options.pauseOnHover == "all") t.manager.reset();
            });
            if (t.options.service) {
                t.loadJSON(t.options.service);
            } else {
                t.setupComplete();
            }
            return t;
        },
        updateItemsList: function () {
            var t = this;
            t.itemsList = t.elem.find(selectors.grid);
            t.items = t.itemsList.children();
            return t;
        },
        loadJSON: function (service) {
            var t = this,
                o = t.options,
                svc = "_" + service,
                url = $.fn[pluginName].services[svc].getURL(o);
            t.elem.addClass(selectors.loading.slice(1));
            $.getJSON(url, function (json) {
                t.elem.removeClass(selectors.loading.slice(1));
                t.buildDOMItems($.fn[pluginName].services[svc].processJSON(json, o));
                t.setupComplete();
            })
            return t;
        },
        buildDOMItems: function (images) {
            var t = this,
                i = 0,
                template;
            template = t.items.eq(0).clone();
            if (!template.length) template = $("<li/>");
            t.itemsList.empty();
            for (; i < images.length; i++) {
                t.itemsList.append(template.clone().attr("data-thumb", images[i]));
            }
            t.updateItemsList();
            return t;
        },
        setupComplete: function () {
            var t = this;
            t.buildItems(t.items);
            t.gridBuild();
            t.loadItems();
            t.manager.init();
            if (t.options.autoUpdateOnResize !== false && t.options.autoUpdateOnResize > 0) {
                $(window).resize(function () {
                    clearTimeout(t.autoUpdateOnResizeTimer);
                    t.autoUpdateOnResizeTimer = setTimeout(function () {
                        t.update();
                    }, t.options.autoUpdateOnResize);
                });
            }
            return t;
        },
        buildItems: function (items) {
            var t = this;
            items.each(function () {
                var item = new MagicWallItem(t);
                item.init($(this));
                item.setIndex($(this).index());
            });
            return t;
        },
        gridBuild: function () {
            var t = this,
                i = 0;
            t.gridCalculations();
            t.items.removeClass(selectors.gridItem.slice(1));
            for (; i < t.xCount * t.yCount; i++) {
                t.items.filter("[data-index=" + i + "]").addClass(selectors.gridItem.slice(1));
            }
            t.gridLayout();
            return t;
        },
        gridCalculations: function () {
            var t = this,
                baseWidth = t.elem.width(),
                baseHeight = t.elem.height(),
                xCountMin, xCountMax, yCountMin, yCountMax, px, py, n, i;
            if (t.options.columnsCount) {
                t.xCount = t.options.columnsCount;
            } else {
                xCountMin = Math.floor(baseWidth / t.options.maxItemWidth);
                xCountMax = Math.ceil(baseWidth / t.options.maxItemWidth);
                t.xCount = baseWidth / xCountMin > t.options.maxItemWidth ? xCountMax : xCountMin;
                t.xCount = Math.max(t.options.minColumnsCount || 1, t.xCount);
                if (t.options.maxColumnsCount) t.xCount = Math.min(t.options.maxColumnsCount, t.xCount);
            }
            if (t.options.rowsCount) {
                t.yCount = t.options.rowsCount;
            } else {
                yCountMin = Math.floor(baseHeight / t.options.maxItemHeight);
                yCountMax = Math.ceil(baseHeight / t.options.maxItemHeight);
                t.yCount = baseHeight / yCountMin > t.options.maxItemHeight ? yCountMax : yCountMin;
                t.yCount = Math.max(t.options.minRowsCount || 1, t.yCount);
                if (t.options.maxRowsCount) t.yCount = Math.min(t.options.maxRowsCount, t.yCount);
            }
            t.itemWidth = Math.ceil(baseWidth / t.xCount);
            t.itemHeight = Math.ceil(baseHeight / t.yCount);
            return t;
        },
        gridLayout: function () {
            var t = this,
                px, py, grid, obj;
            grid = t.items.hide().filter(selectors.gridItem);
            grid.each(function () {
                obj = t.getItemObject($(this));
                px = obj.index % t.xCount;
                py = Math.floor(obj.index / t.xCount);
                obj.setPosition(px, py).elem.show();
            });
            return t;
        },
        loadItems: function (index) {
            var t = this,
                i = index || 0,
                g = t.items.filter(selectors.gridItem),
                n = g.length,
                more, item;

            function _loadItem(i) {
                more = i <= g.length - 1;
                if (!more) return;
                item = t.getItemObject(g.eq(i));
                if (item.loaded) {
                    if (more) _loadItem(i + 1);
                } else {
                    item.elem.bind("loaded." + pluginSlug, function () {
                        _loadItem(i + 1);
                    });
                    if (more && !item.loading) item.load();
                }
            }
            if (t.options.loadingMode == "normal") {
                g.each(function () {
                    t.getItemObject($(this)).load();
                });
            } else {
                _loadItem(i);
            }
            return t;
        },
        excludeAnimations: function (animations) {
            var t = this,
                r = [],
                i = 0,
                a;
            if (t.options.excludedAnimations) {
                a = t.options.excludedAnimations.split(",");
            } else {
                return animations;
            }
            for (; i < animations.length; i++) {
                if (a.indexOf(animations[i]) == -1) {
                    r.push(animations[i]);
                }
            }
            return r;
        },
        parseAnimationOptions: function (o) {
            var t = this,
                anim, animations = ["flipX", "flipY", "rollInX", "rollInY", "rollOutX", "rollOutY", "slideX", "slideY", "slideRow", "slideColumn", "fade",];
            if (o.animation) {
                anim = o.animation;
            } else {
                if (t.options.animations == "*") {
                    anim = t.excludeAnimations(animations);
                    anim = (Math.random() < 0.5 ? "" : "-") + anim[Math.floor(Math.random() * anim.length)];
                } else {
                    if (!t.selectedAnimations || !t.selectedAnimations.length) t.selectedAnimations = t.options.animations.split(":");
                    anim = t.excludeAnimations(t.selectedAnimations[0] == "*" ? animations : t.selectedAnimations[0].split(","));
                    anim = anim[Math.floor(Math.random() * anim.length)];
                    t.selectedAnimations.splice(0, 1);
                }
            }
            if (animations.indexOf(anim.replace("-", "")) == -1) anim = "fade";
            return $.extend(true, o, {
                animation: anim,
                type: anim.replace(/[XY-]/g, ""),
                dir: anim.indexOf("-", 0) == 0 ? -1 : 1,
                axis: anim.replace(/[^XY]/g, ""),
                duration: o.duration || t.options[anim.replace("-", "") + "Duration"] || t.options.duration,
                easing: o.easing || t.options[anim.replace("-", "") + "Easing"] || t.options.easing,
            });
        },
        switchItems: function (indexA, indexB, animation, duration, easing) {
            var t = this,
                objB, g, h, o;
            o = t.parseAnimationOptions({
                animation: animation,
                duration: duration,
                easing: easing,
            });
            t.updateItemsList();
            t.g = g = t.items.filter(selectors.gridItem);
            t.h = h = t.items.not(g);
            if (t.options.pauseOnHover == "all" && t.itemsList.hasClass(selectors.hover.slice(1))) return false;
            if (t.options.pauseOnHover == "item") g = t.excludeFromSwitch(g, selectors.hover, o);
            g = t.excludeFromSwitch(g, "." + t.options.fixedClass, o);
            if (!g.length || !h.length) return t.manager.reset();
            if (indexA === undefined) indexA = g.eq(Math.floor(Math.random() * g.length)).attr("data-index");
            if (indexB === undefined) indexB = h.eq(Math.floor(Math.random() * h.length)).attr("data-index");
            objB = t.getItemObject(t.getItem(indexB));
            if (t.options.preloadBeforeSwitch && objB.loaded !== true) {
                objB.elem.bind("loaded." + pluginSlug, function () {
                    objB.elem.unbind("loaded." + pluginSlug);
                    t.doSwitchItems(indexA, indexB, o);
                });
                objB.load();
            } else {
                t.doSwitchItems(indexA, indexB, o);
            }
        },
        excludeFromSwitch: function (items, selector, o) {
            var t = this,
                obj, i;
            items.filter(selector).each(function () {
                if (o.type == "rollOut") {
                    items = items.not(t.getItem($(this).attr("data-index") - o.dir * (o.axis == "X" ? 1 : t.xCount)));
                }
                if (o.type == "slideRow" || o.type == "slideColumn") {
                    obj = t.getItemObject($(this));
                    for (i = 0; i < (o.type == "slideRow" ? t.xCount : t.yCount); i++) {
                        items = items.not(t.getItem(t.getIndex((o.type == "slideRow" ? i : obj.px), (o.type == "slideRow" ? obj.py : i))));
                    }
                }
                items = items.not($(this));
            });
            return items;
        },
        doSwitchItems: function (indexA, indexB, o) {
            var t = this,
                itemA, itemB, itemC, objA, objB, objC, i;
            itemA = t.getItem(indexA);
            itemB = t.getItem(indexB);
            objA = t.getItemObject(itemA);
            objB = t.getItemObject(itemB);
            itemA.css("z-index", 9999);
            itemB.css("z-index", 9998);
            o.onComplete = function () {
                itemA.hide();
                objA.reset();
                t.update();
            }
            var correctionAngle = 180 * Math.atan(0.5 * (o.axis == "Y" ? t.itemHeight : t.itemWidth) / t.options.perspective) / Math.PI;
            switch (o.type) {
                case "flip":
                    t.swapItems(objA, objB);
                    objB.setPosition(objA.px, objA.py).load().elem.show();
                    i = 0;
                    o.onUpdate = (function (objA) {
                        return function (v) {
                            if (Math.abs(v) >= 90 && i == 0) {
                                i = 1;
                                objA.elem.hide();
                            }
                            objB.css3d["rot" + o.axis](v - o.dir * 180).update();
                        }
                    }(objA));
                    objA.css3d.fromTo({
                        "X": {
                            rotX: 0
                        },
                        "Y": {
                            rotY: 0
                        },
                    }[o.axis], {
                        "X": {
                            rotX: o.dir * 180
                        },
                        "Y": {
                            rotY: o.dir * 180
                        },
                    }[o.axis], o);
                    break;
                case "rollIn":
                    itemA.css("z-index", 9998);
                    itemB.css("z-index", 9999);
                    objB.setPosition(objA.px, objA.py).load().elem.show();
                    t.swapItems(objA, objB);
                    o.delay = o.duration * 0.25;
                    objB.css3d["origin" + o.axis](o.dir > 0 ? 0 : 1).fromTo({
                        "X": {
                            rotY: o.dir * (90 + correctionAngle)
                        },
                        "Y": {
                            rotX: -o.dir * (90 + correctionAngle)
                        },
                    }[o.axis], {
                        "X": {
                            rotY: 0
                        },
                        "Y": {
                            rotX: 0
                        },
                    }[o.axis], o);
                    delete o.onUpdate;
                    delete o.onComplete;
                    objB.css3d.fromTo({
                        opacity: 0
                    }, {
                        opacity: 1
                    }, o);
                    o.delay = 0;
                    objA.css3d["origin" + o.axis](o.dir > 0 ? 1 : 0).fromTo({
                        "X": {
                            rotY: 0
                        },
                        "Y": {
                            rotX: 0
                        },
                    }[o.axis], {
                        "X": {
                            rotY: -o.dir * (90 + correctionAngle)
                        },
                        "Y": {
                            rotX: o.dir * (90 + correctionAngle)
                        },
                    }[o.axis], o);
                    objA.css3d.fromTo({
                        opacity: 1
                    }, {
                        opacity: 0
                    }, o);
                    break;
                case "rollOut":
                    objB.setPosition(objA.px, objA.py).load().elem.show();
                    if ({
                        "X": (objA.px > 0 && o.dir < 0) || (objA.px < t.xCount - 1 && o.dir > 0),
                        "Y": (objA.py > 0 && o.dir < 0) || (objA.py < t.yCount - 1 && o.dir > 0),
                    }[o.axis]) {
                        itemC = t.getItem(t.getIndex({
                            "X": objA.px + o.dir,
                            "Y": objA.px,
                        }[o.axis], {
                            "X": objA.py,
                            "Y": objA.py + o.dir,
                        }[o.axis]));
                        objC = t.getItemObject(itemC);
                    }
                    t.swapItems(objA, objB);
                    if (itemC) t.swapItems(objA, objC);
                    i = 0;
                    o.onUpdate = (function (a) {
                        return function (v) {
                            if (itemC) {
                                if (Math.abs(v) >= 90 - correctionAngle && i == 0) {
                                    i = 1;
                                    a.css3d["scale" + o.axis](-1)["origin" + o.axis](o.dir > 0 ? 0 : 1)[o.axis.toLowerCase()]({
                                        "X": t.itemWidth * o.dir,
                                        "Y": t.itemHeight * o.dir
                                    }[o.axis]).update();
                                }
                            } else {
                                a.css3d.opacity(1 - Math.max(0, (Math.abs(v) - 40) / (120 - 40))).update();
                            }
                        }
                    }(objA));
                    objA.css3d["origin" + o.axis](o.dir > 0 ? 1 : 0).fromTo({
                        "X": {
                            rotY: 0
                        },
                        "Y": {
                            rotX: 0
                        },
                    }[o.axis], {
                        "X": {
                            rotY: o.dir * (itemC ? 180 : 120)
                        },
                        "Y": {
                            rotX: -o.dir * (itemC ? 180 : 120)
                        },
                    }[o.axis], o);
                    if (itemC) {
                        itemA = itemC;
                        objA = objC;
                    }
                    break;
                case "slide":
                    t.swapItems(objA, objB);
                    itemA.css("overflow", "hidden");
                    itemB.css("overflow", "hidden");
                    objB.setPosition(objA.px, objA.py).load().elem.show();
                    objA.css3d.fromTo({
                        "X": {
                            x: 0
                        },
                        "Y": {
                            y: 0
                        }
                    }[o.axis], {
                        "X": {
                            x: (o.dir > 0 ? 1 : -1) * t.itemWidth
                        },
                        "Y": {
                            y: (o.dir > 0 ? 1 : -1) * t.itemHeight
                        }
                    }[o.axis], o);
                    objB.css3d.fromTo({
                        "X": {
                            x: (o.dir > 0 ? -1 : 1) * t.itemWidth
                        },
                        "Y": {
                            y: (o.dir > 0 ? -1 : 1) * t.itemHeight
                        }
                    }[o.axis], {
                        "X": {
                            x: 0
                        },
                        "Y": {
                            y: 0
                        }
                    }[o.axis], o);
                    break;
                case "slideRow":
                    itemA = t.getItem(t.getIndex(o.dir > 0 ? t.xCount - 1 : 0, objA.py));
                    objA = t.getItemObject(itemA);
                    itemA.css("overflow", "hidden");
                    itemB.css("overflow", "hidden");
                    t.swapItems(objA, objB);
                    for (i = 0; i < t.xCount - 1; i++) {
                        var item = t.getItem((objB.index + (o.dir > 0 ? -1 : 1) * (i + 1))),
                            obj = t.getItemObject(item);
                        obj.setIndex(obj.index + (o.dir > 0 ? 1 : -1));
                    }
                    objB.setIndex(objB.index + (o.dir > 0 ? -1 : 1) * (t.xCount - 1));
                    objB.setPosition((o.dir > 0 ? 0 : t.xCount - 1), objA.py).load().elem.show();
                    o.onUpdate = function (v) {
                        for (i = 0; i < t.xCount - 1; i++) {
                            var item = t.getItem((objB.index + (o.dir > 0 ? 1 : -1) * (i + 1))),
                                obj = t.getItemObject(item);
                            obj.css3d.x(v).update();
                        }
                        objB.css3d.x(v + (o.dir > 0 ? -1 : 1) * t.itemWidth).update();
                    }
                    objA.css3d.to({
                        x: (o.dir > 0 ? 1 : -1) * t.itemWidth
                    }, o);
                    break;
                case "slideColumn":
                    itemA = t.getItem(t.getIndex(objA.px, o.dir > 0 ? t.yCount - 1 : 0));
                    objA = t.getItemObject(itemA);
                    itemA.css("overflow", "hidden");
                    itemB.css("overflow", "hidden");
                    t.swapItems(objA, objB);
                    for (i = 0; i < t.yCount - 1; i++) {
                        var item = t.getItem((objB.index + (o.dir > 0 ? -1 : 1) * (i + 1) * t.xCount)),
                            obj = t.getItemObject(item);
                        obj.setIndex(obj.index + (o.dir > 0 ? 1 : -1) * t.xCount);
                    }
                    objB.setIndex(objB.index + (o.dir > 0 ? -1 : 1) * t.xCount * (t.yCount - 1));
                    objB.setPosition(objB.index % t.xCount, (o.dir > 0 ? 0 : t.yCount - 1)).load().elem.show();
                    o.onUpdate = function (v) {
                        for (i = 0; i < t.yCount - 1; i++) {
                            var item = t.getItem((objB.index + (o.dir > 0 ? 1 : -1) * (i + 1) * t.xCount)),
                                obj = t.getItemObject(item);
                            obj.css3d.y(v).update();
                        }
                        objB.css3d.y(v + (o.dir > 0 ? -1 : 1) * t.itemHeight).update();
                    }
                    objA.css3d.to({
                        y: (o.dir > 0 ? 1 : -1) * t.itemHeight
                    }, o);
                    break;
                default:
                case "fade":
                    t.swapItems(objA, objB);
                    objB.setPosition(objA.px, objA.py).load().elem.show();
                    objA.css3d.fromTo({
                        opacity: 1
                    }, {
                        opacity: 0
                    }, o);
                    break;
            }
            itemA.removeClass(selectors.gridItem.slice(1));
            itemB.addClass(selectors.gridItem.slice(1));
            return t;
        },
        swapItems: function (objA, objB) {
            var t = this,
                tmp;
            tmp = objA.index;
            objA.setIndex(objB.index);
            objB.setIndex(tmp);
            return t;
        },
        appendItems: function (items) {
            var t = this,
                newItems = $(items).appendTo(t.items.parent());
            t.updateItemsList();
            t.buildItems(newItems);
            t.update();
            return t;
        },
        removeItems: function (items) {
            var t = this;
            $(items).remove();
            t.updateItemsList();
            t.update();
            return t;
        },
        resetItems: function () {
            var t = this;
            t.items.each(function () {
                t.getItemObject($(this)).reset();
            });
            return t;
        },
        getItem: function (index) {
            return this.items.filter("[data-index='" + index + "']");
        },
        getItemObject: function (elem) {
            return elem.get(0)["_" + pluginName + "Item"];
        },
        getIndex: function (px, py) {
            return py * this.xCount + px;
        },
        update: function () {
            var t = this;
            t.updateOptions();
            t.resetItems();
            t.manager.reset();
            t.gridBuild();
            t.loadItems();
            return t;
        },
        destroy: function () {
            var t = this;
            t.manager.stop();
            t.elem.replaceWith(t.originalHTML);
            return t;
        },
        api: function (command, args) {
            var t = this;
            if (typeof command === "string") {
                switch (command) {
                    case "appendItems":
                        t.appendItems(args[0]);
                        break;
                    case "removeItems":
                        t.removeItems(args[0]);
                        break;
                    case "update":
                        t.update();
                        break;
                    case "destroy":
                        t.destroy();
                        break;
                    case "start":
                        t.manager.start();
                        break;
                    case "stop":
                        t.manager.stop();
                        break;
                    case "switchItem":
                        t.switchItems(args[0], undefined, args[1], args[2], args[3]);
                        break;
                    case "option":
                        var o = {};
                        if (typeof args[0] === "string") {
                            o[args[0]] = args[1];
                        } else {
                            o = args[0];
                        }
                        t.userOptions = $.extend(true, {}, t.userOptions, o);
                        t.update();
                        break;
                }
                return true;
            }
            return false;
        }
    }

    function MagicWallManager(b) {
        var t = this;
        t.base = b;
    }
    MagicWallManager.prototype = {
        init: function () {
            var t = this;
            t.paused = t.base.options.paused;
            if (!t.paused) t.start();
            return t;
        },
        reset: function () {
            var t = this,
                paused = t.paused;
            t.stop();
            if (!paused) t.start();
            return t;
        },
        start: function () {
            var t = this;
            t.stop().tick();
            t.paused = false;
            return t;
        },
        stop: function () {
            var t = this;
            t.paused = true;
            clearTimeout(t.timer);
            return t;
        },
        tick: function () {
            var t = this,
                o = t.base.options;
            t.timer = setTimeout(function () {
                if (!t.paused) t.base.switchItems();
            }, o.delay);
        },
    }

    function MagicWallItem(b) {
        var t = this;
        t.base = b;
    }
    MagicWallItem.prototype = {
        init: function (elem) {
            var t = this;
            t.elem = $(elem);
            t.elem.get(0)["_" + pluginName + "Item"] = t;
            t.elem.css(prefix.css + "perspective", t.base.options.perspective);
            t.elem.on("mouseenter", {
                t: t
            }, t.handleMouseOver);
            t.elem.on("mouseleave", {
                t: t
            }, t.handleMouseOut);
            t.elem.on("touchend", {
                t: t
            }, t.handleTouchEnd);
            t.content = t.elem.wrapInner($("<div/>").addClass(selectors.wrap.slice(1))).children().eq(0);
            t.css3d = new Css3d(t.content);
            return t;
        },
        handleMouseOver: function (e) {
            var t = e.data.t;
            if (!t.mouseEvents) return;
            t.elem.addClass(selectors.hover).siblings().removeClass(selectors.hover);
        },
        handleMouseOut: function (e) {
            var t = e.data.t;
            if (!t.mouseEvents) return;
            t.elem.removeClass(selectors.hover);
        },
        handleTouchEnd: function (e) {
            var t = e.data.t;
            if (!t.mouseEvents) return;
            if (!t.elem.hasClass(selectors.hover)) {
                e.preventDefault();
                t.handleMouseOver(e);
                return false;
            }
        },
        load: function () {
            var t = this,
                src = t.elem.data("thumb"),
                img = new Image();
            if (t.loading || t.loaded || !src) {
                if (t.loaded) t.elem.trigger("loaded." + pluginSlug).unbind("loaded." + pluginSlug);
                return t;
            }
            t.loading = true;
            t.elem.addClass(selectors.loading.slice(1));
            img.onload = function () {
                t.content.append($("<div/>").addClass(selectors.thumb.slice(1)).css({
                    "background-image": "url(" + (src + (t.base.options.useCache ? "" : "?sid=" + Math.floor(Math.random() * 9E10))) + ")",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    "background-size": t.base.options.thumbSizing
                }).fadeTo(0, 0).fadeTo(300, 1));
                t.loading = false;
                t.loaded = true;
                t.elem.removeClass(selectors.loading.slice(1));
                t.elem.trigger("loaded." + pluginSlug).unbind("loaded." + pluginSlug);
            }
            img.src = src;
            return t;
        },
        setPosition: function (px, py) {
            var t = this;
            t.px = px;
            t.py = py;
            t.update();
            return t;
        },
        setIndex: function (i) {
            var t = this;
            t.index = i;
            t.elem.attr("data-index", i);
            return t;
        },
        update: function () {
            var t = this;
            t.elem.css({
                "width": t.base.itemWidth,
                "height": t.base.itemHeight,
                "left": t.px * t.base.itemWidth,
                "top": t.py * t.base.itemHeight
            });
            return t;
        },
        reset: function () {
            var t = this;
            t.elem.css({
                "z-index": 0,
                "overflow": "visible"
            });
            t.css3d.stop("x,y,z,rotX,rotY,rotZ,originX,originY,scaleX,scaleY,opacity").set("x,y,z,rotX,rotY,rotZ", 0).set("originX,originY", 0.5).set("scaleX,scaleY", 1).opacity(1).update();
            return t;
        },
    }
}(jQuery, window, document));

/*



██████╗ ██████╗ ██████╗ 
╚════██╗╚════██╗╚════██╗
  ▄███╔╝  ▄███╔╝  ▄███╔╝
  ▀▀══╝   ▀▀══╝   ▀▀══╝ 
  ██╗     ██╗     ██╗   
  ╚═╝     ╚═╝     ╚═╝   
                        



*/

// ??? Unknown addon/extension

(function (ap) {
    var M, K, L = Math.abs,
        ah = Math.sin,
        w = Math.cos,
        s = Math.max,
        aE = Math.min,
        aq = Math.ceil,
        F = Math.sqrt,
        au = Math.pow,
        h = {},
        l = {},
        m = {
            0: "0,",
            1: "17,",
            2: "34,",
            3: "51,",
            4: "68,",
            5: "85,",
            6: "102,",
            7: "119,",
            8: "136,",
            9: "153,",
            a: "170,",
            A: "170,",
            b: "187,",
            B: "187,",
            c: "204,",
            C: "204,",
            d: "221,",
            D: "221,",
            e: "238,",
            E: "238,",
            f: "255,",
            F: "255,"
        },
        x, c, Q, aG, H, aH, aa, C = document,
        p, b = {};
    for (M = 0; M < 256; ++M) {
        K = M.toString(16);
        if (M < 16) {
            K = "0" + K
        }
        l[K] = l[K.toUpperCase()] = M.toString() + ","
    }

    function ai(i) {
        return typeof i != "undefined"
    }

    function I(i) {
        return typeof i == "object" && i != null
    }

    function aw(i, j, aI) {
        return isNaN(i) ? aI : aE(aI, s(j, i))
    }

    function aB() {
        return false
    }

    function G() {
        return new Date().valueOf()
    }

    function A(aI, aL) {
        var j = [],
            aJ = aI.length,
            aK;
        for (aK = 0; aK < aJ; ++aK) {
            j.push(aI[aK])
        }
        j.sort(aL);
        return j
    }

    function an(j) {
        var aJ = j.length - 1,
            aI, aK;
        while (aJ) {
            aK = ~~(Math.random() * aJ);
            aI = j[aJ];
            j[aJ] = j[aK];
            j[aK] = aI;
            --aJ
        }
    }

    function ae(i, aI, j) {
        this.x = i;
        this.y = aI;
        this.z = j
    }
    H = ae.prototype;
    H.length = function () {
        return F(this.x * this.x + this.y * this.y + this.z * this.z)
    };
    H.dot = function (i) {
        return this.x * i.x + this.y * i.y + this.z * i.z
    };
    H.cross = function (j) {
        var i = this.y * j.z - this.z * j.y,
            aJ = this.z * j.x - this.x * j.z,
            aI = this.x * j.y - this.y * j.x;
        return new ae(i, aJ, aI)
    };
    H.angle = function (j) {
        var i = this.dot(j),
            aI;
        if (i == 0) {
            return Math.PI / 2
        }
        aI = i / (this.length() * j.length());
        if (aI >= 1) {
            return 0
        }
        if (aI <= -1) {
            return Math.PI
        }
        return Math.acos(aI)
    };
    H.unit = function () {
        var i = this.length();
        return new ae(this.x / i, this.y / i, this.z / i)
    };

    function aj(aI, j) {
        j = j * Math.PI / 180;
        aI = aI * Math.PI / 180;
        var i = ah(aI) * w(j),
            aK = -ah(j),
            aJ = -w(aI) * w(j);
        return new ae(i, aK, aJ)
    }

    function R(i) {
        this[1] = {
            1: i[0],
            2: i[1],
            3: i[2]
        };
        this[2] = {
            1: i[3],
            2: i[4],
            3: i[5]
        };
        this[3] = {
            1: i[6],
            2: i[7],
            3: i[8]
        }
    }
    aG = R.prototype;
    R.Identity = function () {
        return new R([1, 0, 0, 0, 1, 0, 0, 0, 1])
    };
    R.Rotation = function (aJ, i) {
        var j = ah(aJ),
            aI = w(aJ),
            aK = 1 - aI;
        return new R([aI + au(i.x, 2) * aK, i.x * i.y * aK - i.z * j, i.x * i.z * aK + i.y * j, i.y * i.x * aK + i.z * j, aI + au(i.y, 2) * aK, i.y * i.z * aK - i.x * j, i.z * i.x * aK - i.y * j, i.z * i.y * aK + i.x * j, aI + au(i.z, 2) * aK])
    };
    aG.mul = function (aI) {
        var aJ = [],
            aM, aL, aK = (aI.xform ? 1 : 0);
        for (aM = 1; aM <= 3; ++aM) {
            for (aL = 1; aL <= 3; ++aL) {
                if (aK) {
                    aJ.push(this[aM][1] * aI[1][aL] + this[aM][2] * aI[2][aL] + this[aM][3] * aI[3][aL])
                } else {
                    aJ.push(this[aM][aL] * aI)
                }
            }
        }
        return new R(aJ)
    };
    aG.xform = function (aI) {
        var j = {},
            i = aI.x,
            aK = aI.y,
            aJ = aI.z;
        j.x = i * this[1][1] + aK * this[2][1] + aJ * this[3][1];
        j.y = i * this[1][2] + aK * this[2][2] + aJ * this[3][2];
        j.z = i * this[1][3] + aK * this[2][3] + aJ * this[3][3];
        return j
    };

    function q(aJ, aL, aR, aO, aQ) {
        var aM, aP, j, aN, aS = [],
            aI = 2 / aJ,
            aK;
        aK = Math.PI * (3 - F(5) + (parseFloat(aQ) ? parseFloat(aQ) : 0));
        for (aM = 0; aM < aJ; ++aM) {
            aP = aM * aI - 1 + (aI / 2);
            j = F(1 - aP * aP);
            aN = aM * aK;
            aS.push([w(aN) * j * aL, aP * aR, ah(aN) * j * aO])
        }
        return aS
    }

    function W(aK, aI, aN, aU, aR, aT) {
        var aS, aV = [],
            aJ = 2 / aK,
            aL, aQ, aP, aO, aM;
        aL = Math.PI * (3 - F(5) + (parseFloat(aT) ? parseFloat(aT) : 0));
        for (aQ = 0; aQ < aK; ++aQ) {
            aP = aQ * aJ - 1 + (aJ / 2);
            aS = aQ * aL;
            aO = w(aS);
            aM = ah(aS);
            aV.push(aI ? [aP * aN, aO * aU, aM * aR] : [aO * aN, aP * aU, aM * aR])
        }
        return aV
    }

    function N(aI, aJ, aM, aS, aQ, aO) {
        var aR, aT = [],
            aK = Math.PI * 2 / aJ,
            aP, aN, aL;
        for (aP = 0; aP < aJ; ++aP) {
            aR = aP * aK;
            aN = w(aR);
            aL = ah(aR);
            aT.push(aI ? [aO * aM, aN * aS, aL * aQ] : [aN * aM, aO * aS, aL * aQ])
        }
        return aT
    }

    function am(aK, j, aI, aJ, i) {
        return W(aK, 0, j, aI, aJ, i)
    }

    function av(aK, j, aI, aJ, i) {
        return W(aK, 1, j, aI, aJ, i)
    }

    function d(aK, i, j, aI, aJ) {
        aJ = isNaN(aJ) ? 0 : aJ * 1;
        return N(0, aK, i, j, aI, aJ)
    }

    function n(aK, i, j, aI, aJ) {
        aJ = isNaN(aJ) ? 0 : aJ * 1;
        return N(1, aK, i, j, aI, aJ)
    }

    function ao(aI) {
        var j = new Image;
        j.onload = function () {
            var aJ = j.width / 2,
                i = j.height / 2;
            aI.centreFunc = function (aO, aL, aM, aK, aN) {
                aO.setTransform(1, 0, 0, 1, 0, 0);
                aO.globalAlpha = 1;
                aO.drawImage(j, aK - aJ, aN - i)
            }
        };
        j.src = aI.centreImage
    }

    function U(aL, i) {
        var aK = aL,
            aJ, aI, j = (i * 1).toPrecision(3) + ")";
        if (aL[0] === "#") {
            if (!h[aL]) {
                if (aL.length === 4) {
                    h[aL] = "rgba(" + m[aL[1]] + m[aL[2]] + m[aL[3]]
                } else {
                    h[aL] = "rgba(" + l[aL.substr(1, 2)] + l[aL.substr(3, 2)] + l[aL.substr(5, 2)]
                }
            }
            aK = h[aL] + j
        } else {
            if (aL.substr(0, 4) === "rgb(" || aL.substr(0, 4) === "hsl(") {
                aK = (aL.replace("(", "a(").replace(")", "," + j))
            } else {
                if (aL.substr(0, 5) === "rgba(" || aL.substr(0, 5) === "hsla(") {
                    aJ = aL.lastIndexOf(",") + 1, aI = aL.indexOf(")");
                    i *= parseFloat(aL.substring(aJ, aI));
                    aK = aL.substr(0, aJ) + i.toPrecision(3) + ")"
                }
            }
        }
        return aK
    }

    function P(i, j) {
        if (window.G_vmlCanvasManager) {
            return null
        }
        var aI = C.createElement("canvas");
        aI.width = i;
        aI.height = j;
        return aI
    }

    function al() {
        var j = P(3, 3),
            aJ, aI;
        if (!j) {
            return false
        }
        aJ = j.getContext("2d");
        aJ.strokeStyle = "#000";
        aJ.shadowColor = "#fff";
        aJ.shadowBlur = 3;
        aJ.globalAlpha = 0;
        aJ.strokeRect(2, 2, 2, 2);
        aJ.globalAlpha = 1;
        aI = aJ.getImageData(2, 2, 1, 1);
        j = null;
        return (aI.data[0] > 0)
    }

    function ak(aM, j, aL, aK) {
        var aJ = aM.createLinearGradient(0, 0, j, 0),
            aI;
        for (aI in aK) {
            aJ.addColorStop(1 - aI, aK[aI])
        }
        aM.fillStyle = aJ;
        aM.fillRect(0, aL, j, 1)
    }

    function k(aK, aI, j) {
        var aJ = 1024,
            aO = 1,
            aN = aK.weightGradient,
            aM, aQ, aL, aP;
        if (aK.gCanvas) {
            aQ = aK.gCanvas.getContext("2d");
            aO = aK.gCanvas.height
        } else {
            if (I(aN[0])) {
                aO = aN.length
            } else {
                aN = [aN]
            }
            aK.gCanvas = aM = P(aJ, aO);
            if (!aM) {
                return null
            }
            aQ = aM.getContext("2d");
            for (aL = 0; aL < aO; ++aL) {
                ak(aQ, aJ, aL, aN[aL])
            }
        }
        j = s(aE(j || 0, aO - 1), 0);
        aP = aQ.getImageData(~~((aJ - 1) * aI), j, 1, 1).data;
        return "rgba(" + aP[0] + "," + aP[1] + "," + aP[2] + "," + (aP[3] / 255) + ")"
    }

    function X(aR, aK, j, aV, aU, aS, aQ, aM, aJ, aT, aL, aP) {
        var aO = aU + (aM || 0) + (aJ.length && aJ[0] < 0 ? L(aJ[0]) : 0),
            aI = aS + (aM || 0) + (aJ.length && aJ[1] < 0 ? L(aJ[1]) : 0),
            aN, aW;
        aR.font = aK;
        aR.textBaseline = "top";
        aR.fillStyle = j;
        aQ && (aR.shadowColor = aQ);
        aM && (aR.shadowBlur = aM);
        aJ.length && (aR.shadowOffsetX = aJ[0], aR.shadowOffsetY = aJ[1]);
        for (aN = 0; aN < aV.length; ++aN) {
            aW = 0;
            if (aL) {
                if ("right" == aP) {
                    aW = aT - aL[aN]
                } else {
                    if ("centre" == aP) {
                        aW = (aT - aL[aN]) / 2
                    }
                }
            }
            aR.fillText(aV[aN], aO + aW, aI);
            aI += parseInt(aK)
        }
    }

    function at(aM, i, aL, j, aJ, aK, aI) {
        if (aK) {
            aM.beginPath();
            aM.moveTo(i, aL + aJ - aK);
            aM.arcTo(i, aL, i + aK, aL, aK);
            aM.arcTo(i + j, aL, i + j, aL + aK, aK);
            aM.arcTo(i + j, aL + aJ, i + j - aK, aL + aJ, aK);
            aM.arcTo(i, aL + aJ, i, aL + aJ - aK, aK);
            aM.closePath();
            aM[aI ? "stroke" : "fill"]()
        } else {
            aM[aI ? "strokeRect" : "fillRect"](i, aL, j, aJ)
        }
    }

    function g(aO, i, aM, aJ, aN, aI, aK, aL, j) {
        this.strings = aO;
        this.font = i;
        this.width = aM;
        this.height = aJ;
        this.maxWidth = aN;
        this.stringWidths = aI;
        this.align = aK;
        this.valign = aL;
        this.scale = j
    }
    aa = g.prototype;
    aa.SetImage = function (aL, j, aJ, i, aK, aN, aI, aM) {
        this.image = aL;
        this.iwidth = j * this.scale;
        this.iheight = aJ * this.scale;
        this.ipos = i;
        this.ipad = aK * this.scale;
        this.iscale = aM;
        this.ialign = aN;
        this.ivalign = aI
    };
    aa.Align = function (j, aI, i) {
        var aJ = 0;
        if (i == "right" || i == "bottom") {
            aJ = aI - j
        } else {
            if (i != "left" && i != "top") {
                aJ = (aI - j) / 2
            }
        }
        return aJ
    };
    aa.Create = function (aV, a1, aU, a2, a0, aZ, i, aY, aQ) {
        var aO, aM, aW, a7, a4, a3, aK, aJ, aI, j, aN, aL, aP, aX, aT, a6 = L(i[0]),
            a5 = L(i[1]),
            aR, aS;
        aY = s(aY, a6 + aZ, a5 + aZ);
        a4 = 2 * (aY + a2);
        aK = 2 * (aY + a2);
        aM = this.width + a4;
        aW = this.height + aK;
        aI = j = aY + a2;
        if (this.image) {
            aN = aL = aY + a2;
            aP = this.iwidth;
            aX = this.iheight;
            if (this.ipos == "top" || this.ipos == "bottom") {
                if (aP < this.width) {
                    aN += this.Align(aP, this.width, this.ialign)
                } else {
                    aI += this.Align(this.width, aP, this.align)
                }
                if (this.ipos == "top") {
                    j += aX + this.ipad
                } else {
                    aL += this.height + this.ipad
                }
                aM = s(aM, aP + a4);
                aW += aX + this.ipad
            } else {
                if (aX < this.height) {
                    aL += this.Align(aX, this.height, this.ivalign)
                } else {
                    j += this.Align(this.height, aX, this.valign)
                }
                if (this.ipos == "right") {
                    aN += this.width + this.ipad
                } else {
                    aI += aP + this.ipad
                }
                aM += aP + this.ipad;
                aW = s(aW, aX + aK)
            }
        }
        aO = P(aM, aW);
        if (!aO) {
            return null
        }
        a4 = aK = a2 / 2;
        a3 = aM - a2;
        aJ = aW - a2;
        aT = aE(aQ, a3 / 2, aJ / 2);
        a7 = aO.getContext("2d");
        if (a1) {
            a7.fillStyle = a1;
            at(a7, a4, aK, a3, aJ, aT)
        }
        if (a2) {
            a7.strokeStyle = aU;
            a7.lineWidth = a2;
            at(a7, a4, aK, a3, aJ, aT, true)
        }
        if (aZ || a6 || a5) {
            aR = P(aM, aW);
            if (aR) {
                aS = a7;
                a7 = aR.getContext("2d")
            }
        }
        X(a7, this.font, aV, this.strings, aI, j, 0, 0, [], this.maxWidth, this.stringWidths, this.align);
        if (this.image) {
            a7.drawImage(this.image, aN, aL, aP, aX)
        }
        if (aS) {
            a7 = aS;
            a0 && (a7.shadowColor = a0);
            aZ && (a7.shadowBlur = aZ);
            a7.shadowOffsetX = i[0];
            a7.shadowOffsetY = i[1];
            a7.drawImage(aR, 0, 0)
        }
        return aO
    };

    function v(aJ, j, aK) {
        var aI = P(j, aK),
            aL;
        if (!aI) {
            return null
        }
        aL = aI.getContext("2d");
        aL.drawImage(aJ, (j - aJ.width) / 2, (aK - aJ.height) / 2);
        return aI
    }

    function ay(aJ, j, aK) {
        var aI = P(j, aK),
            aL;
        if (!aI) {
            return null
        }
        aL = aI.getContext("2d");
        aL.drawImage(aJ, 0, 0, j, aK);
        return aI
    }

    function aD(aV, aQ, aW, a0, aR, aP, aN, aT, aL, aM) {
        var aJ = aQ + ((2 * aT) + aP) * a0,
            aS = aW + ((2 * aT) + aP) * a0,
            aK = P(aJ, aS),
            aZ, aY, aI, aX, j, a1, aU, aO;
        if (!aK) {
            return null
        }
        aP *= a0;
        aL *= a0;
        aY = aI = aP / 2;
        aX = aJ - aP;
        j = aS - aP;
        aT = (aT * a0) + aY;
        aZ = aK.getContext("2d");
        aO = aE(aL, aX / 2, j / 2);
        if (aR) {
            aZ.fillStyle = aR;
            at(aZ, aY, aI, aX, j, aO)
        }
        if (aP) {
            aZ.strokeStyle = aN;
            aZ.lineWidth = aP;
            at(aZ, aY, aI, aX, j, aO, true)
        }
        if (aM) {
            a1 = P(aJ, aS);
            aU = a1.getContext("2d");
            aU.drawImage(aV, aT, aT, aQ, aW);
            aU.globalCompositeOperation = "source-in";
            aU.fillStyle = aN;
            aU.fillRect(0, 0, aJ, aS);
            aU.globalCompositeOperation = "destination-over";
            aU.drawImage(aK, 0, 0);
            aU.globalCompositeOperation = "source-over";
            aZ.drawImage(a1, 0, 0)
        } else {
            aZ.drawImage(aV, aT, aT, aV.width, aV.height)
        }
        return {
            image: aK,
            width: aJ / a0,
            height: aS / a0
        }
    }

    function ar(aL, j, aK, aO, aP) {
        var aM, aN, aI = parseFloat(j),
            aJ = s(aK, aO);
        aM = P(aK, aO);
        if (!aM) {
            return null
        }
        if (j.indexOf("%") > 0) {
            aI = aJ * aI / 100
        } else {
            aI = aI * aP
        }
        aN = aM.getContext("2d");
        aN.globalCompositeOperation = "source-over";
        aN.fillStyle = "#fff";
        if (aI >= aJ / 2) {
            aI = aE(aK, aO) / 2;
            aN.beginPath();
            aN.moveTo(aK / 2, aO / 2);
            aN.arc(aK / 2, aO / 2, aI, 0, 2 * Math.PI, false);
            aN.fill();
            aN.closePath()
        } else {
            aI = aE(aK / 2, aO / 2, aI);
            at(aN, 0, 0, aK, aO, aI, true);
            aN.fill()
        }
        aN.globalCompositeOperation = "source-in";
        aN.drawImage(aL, 0, 0, aK, aO);
        return aM
    }

    function Z(aO, aU, aQ, aK, aS, aT, aJ) {
        var aV = L(aJ[0]),
            aP = L(aJ[1]),
            aL = aU + (aV > aT ? aV + aT : aT * 2) * aK,
            j = aQ + (aP > aT ? aP + aT : aT * 2) * aK,
            aN = aK * ((aT || 0) + (aJ[0] < 0 ? aV : 0)),
            aI = aK * ((aT || 0) + (aJ[1] < 0 ? aP : 0)),
            aM, aR;
        aM = P(aL, j);
        if (!aM) {
            return null
        }
        aR = aM.getContext("2d");
        aS && (aR.shadowColor = aS);
        aT && (aR.shadowBlur = aT * aK);
        aJ && (aR.shadowOffsetX = aJ[0] * aK, aR.shadowOffsetY = aJ[1] * aK);
        aR.drawImage(aO, aN, aI, aU, aQ);
        return {
            image: aM,
            width: aL / aK,
            height: j / aK
        }
    }

    function t(aU, aM, aS) {
        var aT = parseInt(aU.toString().length * aS),
            aL = parseInt(aS * 2 * aU.length),
            aJ = P(aT, aL),
            aP, j, aK, aO, aR, aQ, aI, aN;
        if (!aJ) {
            return null
        }
        aP = aJ.getContext("2d");
        aP.fillStyle = "#000";
        aP.fillRect(0, 0, aT, aL);
        X(aP, aS + "px " + aM, "#fff", aU, 0, 0, 0, 0, [], "centre");
        j = aP.getImageData(0, 0, aT, aL);
        aK = j.width;
        aO = j.height;
        aN = {
            min: {
                x: aK,
                y: aO
            },
            max: {
                x: -1,
                y: -1
            }
        };
        for (aQ = 0; aQ < aO; ++aQ) {
            for (aR = 0; aR < aK; ++aR) {
                aI = (aQ * aK + aR) * 4;
                if (j.data[aI + 1] > 0) {
                    if (aR < aN.min.x) {
                        aN.min.x = aR
                    }
                    if (aR > aN.max.x) {
                        aN.max.x = aR
                    }
                    if (aQ < aN.min.y) {
                        aN.min.y = aQ
                    }
                    if (aQ > aN.max.y) {
                        aN.max.y = aQ
                    }
                }
            }
        }
        if (aK != aT) {
            aN.min.x *= (aT / aK);
            aN.max.x *= (aT / aK)
        }
        if (aO != aL) {
            aN.min.y *= (aT / aO);
            aN.max.y *= (aT / aO)
        }
        aJ = null;
        return aN
    }

    function o(i) {
        return "'" + i.replace(/(\'|\")/g, "").replace(/\s*,\s*/g, "', '") + "'"
    }

    function ad(i, j, aI) {
        aI = aI || C;
        if (aI.addEventListener) {
            aI.addEventListener(i, j, false)
        } else {
            aI.attachEvent("on" + i, j)
        }
    }

    function a(i, j, aI) {
        aI = aI || C;
        if (aI.removeEventListener) {
            aI.removeEventListener(i, j)
        } else {
            aI.detachEvent("on" + i, j)
        }
    }

    function ax(aM, aI, aQ, aL) {
        var aR = aL.imageScale,
            aO, aJ, aN, j, aK, aP;
        if (!aI.complete) {
            return ad("load", function () {
                ax(aM, aI, aQ, aL)
            }, aI)
        }
        if (!aM.complete) {
            return ad("load", function () {
                ax(aM, aI, aQ, aL)
            }, aM)
        }
        aI.width = aI.width;
        aI.height = aI.height;
        if (aR) {
            aM.width = aI.width * aR;
            aM.height = aI.height * aR
        }
        aQ.iw = aM.width;
        aQ.ih = aM.height;
        if (aL.txtOpt) {
            aJ = aM;
            aO = aL.zoomMax * aL.txtScale;
            aK = aQ.iw * aO;
            aP = aQ.ih * aO;
            if (aK < aI.naturalWidth || aP < aI.naturalHeight) {
                aJ = ay(aM, aK, aP);
                if (aJ) {
                    aQ.fimage = aJ
                }
            } else {
                aK = aQ.iw;
                aP = aQ.ih;
                aO = 1
            }
            if (parseFloat(aL.imageRadius)) {
                aQ.image = aQ.fimage = aM = ar(aQ.image, aL.imageRadius, aK, aP, aO)
            }
            if (!aQ.HasText()) {
                if (aL.shadow) {
                    aJ = Z(aQ.image, aK, aP, aO, aL.shadow, aL.shadowBlur, aL.shadowOffset);
                    if (aJ) {
                        aQ.fimage = aJ.image;
                        aQ.w = aJ.width;
                        aQ.h = aJ.height
                    }
                }
                if (aL.bgColour || aL.bgOutlineThickness) {
                    aN = aL.bgColour == "tag" ? Y(aQ.a, "background-color") : aL.bgColour;
                    j = aL.bgOutline == "tag" ? Y(aQ.a, "color") : (aL.bgOutline || aL.textColour);
                    aK = aQ.fimage.width;
                    aP = aQ.fimage.height;
                    if (aL.outlineMethod == "colour") {
                        aJ = aD(aQ.fimage, aK, aP, aO, aN, aL.bgOutlineThickness, aQ.outline.colour, aL.padding, aL.bgRadius, 1);
                        if (aJ) {
                            aQ.oimage = aJ.image
                        }
                    }
                    aJ = aD(aQ.fimage, aK, aP, aO, aN, aL.bgOutlineThickness, j, aL.padding, aL.bgRadius);
                    if (aJ) {
                        aQ.fimage = aJ.image;
                        aQ.w = aJ.width;
                        aQ.h = aJ.height
                    }
                }
                if (aL.outlineMethod == "size") {
                    if (aL.outlineIncrease > 0) {
                        aQ.iw += 2 * aL.outlineIncrease;
                        aQ.ih += 2 * aL.outlineIncrease;
                        aK = aO * aQ.iw;
                        aP = aO * aQ.ih;
                        aJ = ay(aQ.fimage, aK, aP);
                        aQ.oimage = aJ;
                        aQ.fimage = v(aQ.fimage, aQ.oimage.width, aQ.oimage.height)
                    } else {
                        aK = aO * (aQ.iw + (2 * aL.outlineIncrease));
                        aP = aO * (aQ.ih + (2 * aL.outlineIncrease));
                        aJ = ay(aQ.fimage, aK, aP);
                        aQ.oimage = v(aJ, aQ.fimage.width, aQ.fimage.height)
                    }
                }
            }
        }
        aQ.Init()
    }

    function Y(aJ, aI) {
        var j = C.defaultView,
            i = aI.replace(/\-([a-z])/g, function (aK) {
                return aK.charAt(1).toUpperCase()
            });
        return (j && j.getComputedStyle && j.getComputedStyle(aJ, null).getPropertyValue(aI)) || (aJ.currentStyle && aJ.currentStyle[i])
    }

    function u(j, aJ, aI) {
        var i = 1,
            aK;
        if (aJ) {
            i = 1 * (j.getAttribute(aJ) || aI)
        } else {
            if (aK = Y(j, "font-size")) {
                i = (aK.indexOf("px") > -1 && aK.replace("px", "") * 1) || (aK.indexOf("pt") > -1 && aK.replace("pt", "") * 1.25) || aK * 3.3
            }
        }
        return i
    }

    function f(i) {
        return i.target && ai(i.target.id) ? i.target.id : i.srcElement.parentNode.id
    }

    function S(aK, aL) {
        var aJ, aI, i = parseInt(Y(aL, "width")) / aL.width,
            j = parseInt(Y(aL, "height")) / aL.height;
        if (ai(aK.offsetX)) {
            aJ = {
                x: aK.offsetX,
                y: aK.offsetY
            }
        } else {
            aI = ab(aL.id);
            if (ai(aK.changedTouches)) {
                aK = aK.changedTouches[0]
            }
            if (aK.pageX) {
                aJ = {
                    x: aK.pageX - aI.x,
                    y: aK.pageY - aI.y
                }
            }
        }
        if (aJ && i && j) {
            aJ.x /= i;
            aJ.y /= j
        }
        return aJ
    }

    function B(aI) {
        var j = aI.target || aI.fromElement.parentNode,
            i = y.tc[j.id];
        if (i) {
            i.mx = i.my = -1;
            i.UnFreeze();
            i.EndDrag()
        }
    }

    function af(aM) {
        var aJ, aI = y,
            j, aL, aK = f(aM);
        for (aJ in aI.tc) {
            j = aI.tc[aJ];
            if (j.tttimer) {
                clearTimeout(j.tttimer);
                j.tttimer = null
            }
        }
        if (aK && aI.tc[aK]) {
            j = aI.tc[aK];
            if (aL = S(aM, j.canvas)) {
                j.mx = aL.x;
                j.my = aL.y;
                j.Drag(aM, aL)
            }
            j.drawn = 0
        }
    }

    function z(aJ) {
        var j = y,
            i = C.addEventListener ? 0 : 1,
            aI = f(aJ);
        if (aI && aJ.button == i && j.tc[aI]) {
            j.tc[aI].BeginDrag(aJ)
        }
    }

    function aF(aK) {
        var aI = y,
            j = C.addEventListener ? 0 : 1,
            aJ = f(aK),
            i;
        if (aJ && aK.button == j && aI.tc[aJ]) {
            i = aI.tc[aJ];
            af(aK);
            if (!i.EndDrag() && !i.touchState) {
                i.Clicked(aK)
            }
        }
    }

    function T(aJ) {
        var j = f(aJ),
            i = (j && y.tc[j]),
            aI;
        if (i && aJ.changedTouches) {
            if (aJ.touches.length == 1 && i.touchState == 0) {
                i.touchState = 1;
                i.BeginDrag(aJ);
                if (aI = S(aJ, i.canvas)) {
                    i.mx = aI.x;
                    i.my = aI.y;
                    i.drawn = 0
                }
            } else {
                if (aJ.targetTouches.length == 2 && i.pinchZoom) {
                    i.touchState = 3;
                    i.EndDrag();
                    i.BeginPinch(aJ)
                } else {
                    i.EndDrag();
                    i.EndPinch();
                    i.touchState = 0
                }
            }
        }
    }

    function r(aI) {
        var j = f(aI),
            i = (j && y.tc[j]);
        if (i && aI.changedTouches) {
            switch (i.touchState) {
                case 1:
                    i.Draw();
                    i.Clicked();
                    break;
                case 2:
                    i.EndDrag();
                    break;
                case 3:
                    i.EndPinch()
            }
            i.touchState = 0
        }
    }

    function aA(aM) {
        var aJ, aI = y,
            j, aL, aK = f(aM);
        for (aJ in aI.tc) {
            j = aI.tc[aJ];
            if (j.tttimer) {
                clearTimeout(j.tttimer);
                j.tttimer = null
            }
        }
        j = (aK && aI.tc[aK]);
        if (j && aM.changedTouches && j.touchState) {
            switch (j.touchState) {
                case 1:
                case 2:
                    if (aL = S(aM, j.canvas)) {
                        j.mx = aL.x;
                        j.my = aL.y;
                        if (j.Drag(aM, aL)) {
                            j.touchState = 2
                        }
                    }
                    break;
                case 3:
                    j.Pinch(aM)
            }
            j.drawn = 0
        }
    }

    function ag(aI) {
        var i = y,
            j = f(aI);
        if (j && i.tc[j]) {
            aI.cancelBubble = true;
            aI.returnValue = false;
            aI.preventDefault && aI.preventDefault();
            i.tc[j].Wheel((aI.wheelDelta || aI.detail) > 0)
        }
    }

    function ac(aJ) {
        var aI, j = y;
        clearTimeout(j.scrollTimer);
        for (aI in j.tc) {
            j.tc[aI].Pause()
        }
        j.scrollTimer = setTimeout(function () {
            var aL, aK = y;
            for (aL in aK.tc) {
                aK.tc[aL].Resume()
            }
        }, j.scrollPause)
    }

    function O() {
        E(G())
    }

    function E(aJ) {
        var j = y.tc,
            aI;
        y.NextFrame(y.interval);
        aJ = aJ || G();
        for (aI in j) {
            j[aI].Draw(aJ)
        }
    }

    function ab(aI) {
        var aL = C.getElementById(aI),
            i = aL.getBoundingClientRect(),
            aO = C.documentElement,
            aM = C.body,
            aN = window,
            aJ = aN.pageXOffset || aO.scrollLeft,
            aP = aN.pageYOffset || aO.scrollTop,
            aK = aO.clientLeft || aM.clientLeft,
            j = aO.clientTop || aM.clientTop;
        return {
            x: i.left + aJ - aK,
            y: i.top + aP - j
        }
    }

    function V(j, aJ, aK, aI) {
        var i = j.radius * j.z1 / (j.z1 + j.z2 + aJ.z);
        return {
            x: aJ.x * i * aK,
            y: aJ.y * i * aI,
            z: aJ.z,
            w: (j.z1 - aJ.z) / j.z2
        }
    }

    function aC(i) {
        this.e = i;
        this.br = 0;
        this.line = [];
        this.text = [];
        this.original = i.innerText || i.textContent
    }
    aH = aC.prototype;
    aH.Empty = function () {
        for (var j = 0; j < this.text.length; ++j) {
            if (this.text[j].length) {
                return false
            }
        }
        return true
    };
    aH.Lines = function (aK) {
        var aJ = aK ? 1 : 0,
            aL, j, aI;
        aK = aK || this.e;
        aL = aK.childNodes;
        j = aL.length;
        for (aI = 0; aI < j; ++aI) {
            if (aL[aI].nodeName == "BR") {
                this.text.push(this.line.join(" "));
                this.br = 1
            } else {
                if (aL[aI].nodeType == 3) {
                    if (this.br) {
                        this.line = [aL[aI].nodeValue];
                        this.br = 0
                    } else {
                        this.line.push(aL[aI].nodeValue)
                    }
                } else {
                    this.Lines(aL[aI])
                }
            }
        }
        aJ || this.br || this.text.push(this.line.join(" "));
        return this.text
    };
    aH.SplitWidth = function (aI, aP, aM, aL) {
        var aK, aJ, aO, aN = [];
        aP.font = aL + "px " + aM;
        for (aK = 0; aK < this.text.length; ++aK) {
            aO = this.text[aK].split(/\s+/);
            this.line = [aO[0]];
            for (aJ = 1; aJ < aO.length; ++aJ) {
                if (aP.measureText(this.line.join(" ") + " " + aO[aJ]).width > aI) {
                    aN.push(this.line.join(" "));
                    this.line = [aO[aJ]]
                } else {
                    this.line.push(aO[aJ])
                }
            }
            aN.push(this.line.join(" "))
        }
        return this.text = aN
    };

    function J(i, j) {
        this.ts = null;
        this.tc = i;
        this.tag = j;
        this.x = this.y = this.w = this.h = this.sc = 1;
        this.z = 0;
        this.pulse = 1;
        this.pulsate = i.pulsateTo < 1;
        this.colour = i.outlineColour;
        this.adash = ~~i.outlineDash;
        this.agap = ~~i.outlineDashSpace || this.adash;
        this.aspeed = i.outlineDashSpeed * 1;
        if (this.colour == "tag") {
            this.colour = Y(j.a, "color")
        } else {
            if (this.colour == "tagbg") {
                this.colour = Y(j.a, "background-color")
            }
        }
        this.Draw = this.pulsate ? this.DrawPulsate : this.DrawSimple;
        this.radius = i.outlineRadius | 0;
        this.SetMethod(i.outlineMethod)
    }
    x = J.prototype;
    x.SetMethod = function (aI) {
        var j = {
            block: ["PreDraw", "DrawBlock"],
            colour: ["PreDraw", "DrawColour"],
            outline: ["PostDraw", "DrawOutline"],
            classic: ["LastDraw", "DrawOutline"],
            size: ["PreDraw", "DrawSize"],
            none: ["LastDraw"]
        },
            i = j[aI] || j.outline;
        if (aI == "none") {
            this.Draw = function () {
                return 1
            }
        } else {
            this.drawFunc = this[i[1]]
        }
        this[i[0]] = this.Draw
    };
    x.Update = function (aO, aN, aP, aK, aL, aM, aJ, i) {
        var j = this.tc.outlineOffset,
            aI = 2 * j;
        this.x = aL * aO + aJ - j;
        this.y = aL * aN + i - j;
        this.w = aL * aP + aI;
        this.h = aL * aK + aI;
        this.sc = aL;
        this.z = aM
    };
    x.Ants = function (aN) {
        if (!this.adash) {
            return
        }
        var aK = this.adash,
            aM = this.agap,
            aQ = this.aspeed,
            j = aK + aM,
            aL = 0,
            aJ = aK,
            i = aM,
            aP = 0,
            aO = 0,
            aI;
        if (aQ) {
            aO = L(aQ) * (G() - this.ts) / 50;
            if (aQ < 0) {
                aO = 8640000 - aO
            }
            aQ = ~~aO % j
        }
        if (aQ) {
            if (aK >= aQ) {
                aL = aK - aQ;
                aJ = aQ
            } else {
                i = j - aQ;
                aP = aM - i
            }
            aI = [aL, i, aJ, aP]
        } else {
            aI = [aK, aM]
        }
        aN.setLineDash(aI)
    };
    x.DrawOutline = function (aM, i, aL, j, aI, aK) {
        var aJ = aE(this.radius, aI / 2, j / 2);
        aM.strokeStyle = aK;
        this.Ants(aM);
        at(aM, i, aL, j, aI, aJ, true)
    };
    x.DrawSize = function (aP, aS, aQ, aT, aN, j, aU, aJ, aR) {
        var aM = aU.w,
            aI = aU.h,
            aK, aL, aO;
        if (this.pulsate) {
            if (aU.image) {
                aO = (aU.image.height + this.tc.outlineIncrease) / aU.image.height
            } else {
                aO = aU.oscale
            }
            aL = aU.fimage || aU.image;
            aK = 1 + ((aO - 1) * (1 - this.pulse));
            aU.h *= aK;
            aU.w *= aK
        } else {
            aL = aU.oimage
        }
        aU.alpha = 1;
        aU.Draw(aP, aJ, aR, aL);
        aU.h = aI;
        aU.w = aM;
        return 1
    };
    x.DrawColour = function (aJ, aM, aK, aN, aI, i, aO, j, aL) {
        if (aO.oimage) {
            if (this.pulse < 1) {
                aO.alpha = 1 - au(this.pulse, 2);
                aO.Draw(aJ, j, aL, aO.fimage);
                aO.alpha = this.pulse
            } else {
                aO.alpha = 1
            }
            aO.Draw(aJ, j, aL, aO.oimage);
            return 1
        }
        return this[aO.image ? "DrawColourImage" : "DrawColourText"](aJ, aM, aK, aN, aI, i, aO, j, aL)
    };
    x.DrawColourText = function (aK, aN, aL, aO, aI, i, aP, j, aM) {
        var aJ = aP.colour;
        aP.colour = i;
        aP.alpha = 1;
        aP.Draw(aK, j, aM);
        aP.colour = aJ;
        return 1
    };
    x.DrawColourImage = function (aN, aQ, aO, aR, aM, i, aU, j, aP) {
        var aS = aN.canvas,
            aK = ~~s(aQ, 0),
            aJ = ~~s(aO, 0),
            aL = aE(aS.width - aK, aR) + 0.5 | 0,
            aT = aE(aS.height - aJ, aM) + 0.5 | 0,
            aI;
        if (p) {
            p.width = aL, p.height = aT
        } else {
            p = P(aL, aT)
        }
        if (!p) {
            return this.SetMethod("outline")
        }
        aI = p.getContext("2d");
        aI.drawImage(aS, aK, aJ, aL, aT, 0, 0, aL, aT);
        aN.clearRect(aK, aJ, aL, aT);
        if (this.pulsate) {
            aU.alpha = 1 - au(this.pulse, 2)
        } else {
            aU.alpha = 1
        }
        aU.Draw(aN, j, aP);
        aN.setTransform(1, 0, 0, 1, 0, 0);
        aN.save();
        aN.beginPath();
        aN.rect(aK, aJ, aL, aT);
        aN.clip();
        aN.globalCompositeOperation = "source-in";
        aN.fillStyle = i;
        aN.fillRect(aK, aJ, aL, aT);
        aN.restore();
        aN.globalAlpha = 1;
        aN.globalCompositeOperation = "destination-over";
        aN.drawImage(p, 0, 0, aL, aT, aK, aJ, aL, aT);
        aN.globalCompositeOperation = "source-over";
        return 1
    };
    x.DrawBlock = function (aM, i, aL, j, aI, aK) {
        var aJ = aE(this.radius, aI / 2, j / 2);
        aM.fillStyle = aK;
        at(aM, i, aL, j, aI, aJ)
    };
    x.DrawSimple = function (aM, i, j, aJ, aL, aK) {
        var aI = this.tc;
        aM.setTransform(1, 0, 0, 1, 0, 0);
        aM.strokeStyle = this.colour;
        aM.lineWidth = aI.outlineThickness;
        aM.shadowBlur = aM.shadowOffsetX = aM.shadowOffsetY = 0;
        aM.globalAlpha = aK ? aL : 1;
        return this.drawFunc(aM, this.x, this.y, this.w, this.h, this.colour, i, j, aJ)
    };
    x.DrawPulsate = function (aM, i, j, aJ) {
        var aK = G() - this.ts,
            aI = this.tc,
            aL = aI.pulsateTo + ((1 - aI.pulsateTo) * (0.5 + (w(2 * Math.PI * aK / (1000 * aI.pulsateTime)) / 2)));
        this.pulse = aL = y.Smooth(1, aL);
        return this.DrawSimple(aM, i, j, aJ, aL, 1)
    };
    x.Active = function (aJ, i, aI) {
        var j = (i >= this.x && aI >= this.y && i <= this.x + this.w && aI <= this.y + this.h);
        if (j) {
            this.ts = this.ts || G()
        } else {
            this.ts = null
        }
        return j
    };
    x.PreDraw = x.PostDraw = x.LastDraw = aB;

    function e(aJ, aT, aP, aS, aQ, aK, aI, aM, aR, aL, aO, j, aN, i) {
        this.tc = aJ;
        this.image = null;
        this.text = aT;
        this.text_original = i;
        this.line_widths = [];
        this.title = aP.title || null;
        this.a = aP;
        this.position = new ae(aS[0], aS[1], aS[2]);
        this.x = this.y = this.z = 0;
        this.w = aQ;
        this.h = aK;
        this.colour = aI || aJ.textColour;
        this.bgColour = aM || aJ.bgColour;
        this.bgRadius = aR | 0;
        this.bgOutline = aL || this.colour;
        this.bgOutlineThickness = aO | 0;
        this.textFont = j || aJ.textFont;
        this.padding = aN | 0;
        this.sc = this.alpha = 1;
        this.weighted = !aJ.weight;
        this.outline = new J(aJ, this)
    }
    c = e.prototype;
    c.Init = function (j) {
        var i = this.tc;
        this.textHeight = i.textHeight;
        if (this.HasText()) {
            this.Measure(i.ctxt, i)
        } else {
            this.w = this.iw;
            this.h = this.ih
        }
        this.SetShadowColour = i.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
        this.SetDraw(i)
    };
    c.Draw = aB;
    c.HasText = function () {
        return this.text && this.text[0].length > 0
    };
    c.EqualTo = function (aI) {
        var j = aI.getElementsByTagName("img");
        if (this.a.href != aI.href) {
            return 0
        }
        if (j.length) {
            return this.image.src == j[0].src
        }
        return (aI.innerText || aI.textContent) == this.text_original
    };
    c.SetImage = function (j) {
        this.image = this.fimage = j
    };
    c.SetDraw = function (i) {
        this.Draw = this.fimage ? (i.ie > 7 ? this.DrawImageIE : this.DrawImage) : this.DrawText;
        i.noSelect && (this.CheckActive = aB)
    };
    c.MeasureText = function (aL) {
        var aJ, aI = this.text.length,
            j = 0,
            aK;
        for (aJ = 0; aJ < aI; ++aJ) {
            this.line_widths[aJ] = aK = aL.measureText(this.text[aJ]).width;
            j = s(j, aK)
        }
        return j
    };
    c.Measure = function (aN, aQ) {
        var aO = t(this.text, this.textFont, this.textHeight),
            aR, i, aK, j, aI, aM, aP, aJ, aL;
        aP = aO ? aO.max.y + aO.min.y : this.textHeight;
        aN.font = this.font = this.textHeight + "px " + this.textFont;
        aM = this.MeasureText(aN);
        if (aQ.txtOpt) {
            aR = aQ.txtScale;
            i = aR * this.textHeight;
            aK = i + "px " + this.textFont;
            j = [aR * aQ.shadowOffset[0], aR * aQ.shadowOffset[1]];
            aN.font = aK;
            aI = this.MeasureText(aN);
            aL = new g(this.text, aK, aI + aR, (aR * aP) + aR, aI, this.line_widths, aQ.textAlign, aQ.textVAlign, aR);
            if (this.image) {
                aL.SetImage(this.image, this.iw, this.ih, aQ.imagePosition, aQ.imagePadding, aQ.imageAlign, aQ.imageVAlign, aQ.imageScale)
            }
            aJ = aL.Create(this.colour, this.bgColour, this.bgOutline, aR * this.bgOutlineThickness, aQ.shadow, aR * aQ.shadowBlur, j, aR * this.padding, aR * this.bgRadius);
            if (aQ.outlineMethod == "colour") {
                this.oimage = aL.Create(this.outline.colour, this.bgColour, this.outline.colour, aR * this.bgOutlineThickness, aQ.shadow, aR * aQ.shadowBlur, j, aR * this.padding, aR * this.bgRadius)
            } else {
                if (aQ.outlineMethod == "size") {
                    aO = t(this.text, this.textFont, this.textHeight + aQ.outlineIncrease);
                    i = aO.max.y + aO.min.y;
                    aK = (aR * (this.textHeight + aQ.outlineIncrease)) + "px " + this.textFont;
                    aN.font = aK;
                    aI = this.MeasureText(aN);
                    aL = new g(this.text, aK, aI + aR, (aR * i) + aR, aI, this.line_widths, aQ.textAlign, aQ.textVAlign, aR);
                    if (this.image) {
                        aL.SetImage(this.image, this.iw + aQ.outlineIncrease, this.ih + aQ.outlineIncrease, aQ.imagePosition, aQ.imagePadding, aQ.imageAlign, aQ.imageVAlign, aQ.imageScale)
                    }
                    this.oimage = aL.Create(this.colour, this.bgColour, this.bgOutline, aR * this.bgOutlineThickness, aQ.shadow, aR * aQ.shadowBlur, j, aR * this.padding, aR * this.bgRadius);
                    this.oscale = this.oimage.width / aJ.width;
                    if (aQ.outlineIncrease > 0) {
                        aJ = v(aJ, this.oimage.width, this.oimage.height)
                    } else {
                        this.oimage = v(this.oimage, aJ.width, aJ.height)
                    }
                }
            }
            if (aJ) {
                this.fimage = aJ;
                aM = this.fimage.width / aR;
                aP = this.fimage.height / aR
            }
            this.SetDraw(aQ);
            aQ.txtOpt = !!this.fimage
        }
        this.h = aP;
        this.w = aM
    };
    c.SetFont = function (j, aJ, aI, i) {
        this.textFont = j;
        this.colour = aJ;
        this.bgColour = aI;
        this.bgOutline = i;
        this.Measure(this.tc.ctxt, this.tc)
    };
    c.SetWeight = function (aI) {
        var j = this.tc,
            aK = j.weightMode.split(/[, ]/),
            i, aJ, aL = aI.length;
        if (!this.HasText()) {
            return
        }
        this.weighted = true;
        for (aJ = 0; aJ < aL; ++aJ) {
            i = aK[aJ] || "size";
            if ("both" == i) {
                this.Weight(aI[aJ], j.ctxt, j, "size", j.min_weight[aJ], j.max_weight[aJ], aJ);
                this.Weight(aI[aJ], j.ctxt, j, "colour", j.min_weight[aJ], j.max_weight[aJ], aJ)
            } else {
                this.Weight(aI[aJ], j.ctxt, j, i, j.min_weight[aJ], j.max_weight[aJ], aJ)
            }
        }
        this.Measure(j.ctxt, j)
    };
    c.Weight = function (aI, aN, aJ, j, aM, aK, aL) {
        aI = isNaN(aI) ? 1 : aI;
        var i = (aI - aM) / (aK - aM);
        if ("colour" == j) {
            this.colour = k(aJ, i, aL)
        } else {
            if ("bgcolour" == j) {
                this.bgColour = k(aJ, i, aL)
            } else {
                if ("bgoutline" == j) {
                    this.bgOutline = k(aJ, i, aL)
                } else {
                    if ("outline" == j) {
                        this.outline.colour = k(aJ, i, aL)
                    } else {
                        if ("size" == j) {
                            if (aJ.weightSizeMin > 0 && aJ.weightSizeMax > aJ.weightSizeMin) {
                                this.textHeight = aJ.weightSize * (aJ.weightSizeMin + (aJ.weightSizeMax - aJ.weightSizeMin) * i)
                            } else {
                                this.textHeight = s(1, aI * aJ.weightSize)
                            }
                        }
                    }
                }
            }
        }
    };
    c.SetShadowColourFixed = function (aI, j, i) {
        aI.shadowColor = j
    };
    c.SetShadowColourAlpha = function (aI, j, i) {
        aI.shadowColor = U(j, i)
    };
    c.DrawText = function (aK, aN, aJ) {
        var aO = this.tc,
            aM = this.x,
            aL = this.y,
            aP = this.sc,
            j, aI;
        aK.globalAlpha = this.alpha;
        aK.fillStyle = this.colour;
        aO.shadow && this.SetShadowColour(aK, aO.shadow, this.alpha);
        aK.font = this.font;
        aM += aN / aP;
        aL += (aJ / aP) - (this.h / 2);
        for (j = 0; j < this.text.length; ++j) {
            aI = aM;
            if ("right" == aO.textAlign) {
                aI += this.w / 2 - this.line_widths[j]
            } else {
                if ("centre" == aO.textAlign) {
                    aI -= this.line_widths[j] / 2
                } else {
                    aI -= this.w / 2
                }
            }
            aK.setTransform(aP, 0, 0, aP, aP * aI, aP * aL);
            aK.fillText(this.text[j], 0, 0);
            aL += this.textHeight
        }
    };
    c.DrawImage = function (aK, aR, aJ, aM) {
        var aO = this.x,
            aL = this.y,
            aS = this.sc,
            j = aM || this.fimage,
            aP = this.w,
            aI = this.h,
            aN = this.alpha,
            aQ = this.shadow;
        aK.globalAlpha = aN;
        aQ && this.SetShadowColour(aK, aQ, aN);
        aO += (aR / aS) - (aP / 2);
        aL += (aJ / aS) - (aI / 2);
        aK.setTransform(aS, 0, 0, aS, aS * aO, aS * aL);
        aK.drawImage(j, 0, 0, aP, aI)
    };
    c.DrawImageIE = function (aK, aO, aJ) {
        var j = this.fimage,
            aP = this.sc,
            aN = j.width = this.w * aP,
            aI = j.height = this.h * aP,
            aM = (this.x * aP) + aO - (aN / 2),
            aL = (this.y * aP) + aJ - (aI / 2);
        aK.setTransform(1, 0, 0, 1, 0, 0);
        aK.globalAlpha = this.alpha;
        aK.drawImage(j, aM, aL)
    };
    c.Calc = function (i, aI) {
        var j, aL = this.tc,
            aK = aL.minBrightness,
            aJ = aL.maxBrightness,
            aM = aL.max_radius;
        j = i.xform(this.position);
        this.xformed = j;
        j = V(aL, j, aL.stretchX, aL.stretchY);
        this.x = j.x;
        this.y = j.y;
        this.z = j.z;
        this.sc = j.w;
        this.alpha = aI * aw(aK + (aJ - aK) * (aM - this.z) / (2 * aM), 0, 1);
        return this.xformed
    };
    c.UpdateActive = function (aN, aI, aL) {
        var aK = this.outline,
            j = this.w,
            aJ = this.h,
            i = this.x - j / 2,
            aM = this.y - aJ / 2;
        aK.Update(i, aM, j, aJ, this.sc, this.z, aI, aL);
        return aK
    };
    c.CheckActive = function (aK, i, aJ) {
        var j = this.tc,
            aI = this.UpdateActive(aK, i, aJ);
        return aI.Active(aK, j.mx, j.my) ? aI : null
    };
    c.Clicked = function (aL) {
        var j = this.a,
            aI = j.target,
            aJ = j.href,
            i;
        if (aI != "" && aI != "_self") {
            if (self.frames[aI]) {
                self.frames[aI].document.location = aJ
            } else {
                try {
                    if (top.frames[aI]) {
                        top.frames[aI].document.location = aJ;
                        return
                    }
                } catch (aK) { }
                window.open(aJ, aI)
            }
            return
        }
        if (C.createEvent) {
            i = C.createEvent("MouseEvents");
            i.initMouseEvent("click", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
            if (!j.dispatchEvent(i)) {
                return
            }
        } else {
            if (j.fireEvent) {
                if (!j.fireEvent("onclick")) {
                    return
                }
            }
        }
        C.location = aJ
    };

    function y(aO, j, aJ) {
        var aI, aL, aN = C.getElementById(aO),
            aK = ["id", "class", "innerHTML"],
            aM;
        if (!aN) {
            throw 0
        }
        if (ai(window.G_vmlCanvasManager)) {
            aN = window.G_vmlCanvasManager.initElement(aN);
            this.ie = parseFloat(navigator.appVersion.split("MSIE")[1])
        }
        if (aN && (!aN.getContext || !aN.getContext("2d").fillText)) {
            aL = C.createElement("DIV");
            for (aI = 0; aI < aK.length; ++aI) {
                aL[aK[aI]] = aN[aK[aI]]
            }
            aN.parentNode.insertBefore(aL, aN);
            aN.parentNode.removeChild(aN);
            throw 0
        }
        for (aI in y.options) {
            this[aI] = aJ && ai(aJ[aI]) ? aJ[aI] : (ai(y[aI]) ? y[aI] : y.options[aI])
        }
        this.canvas = aN;
        this.ctxt = aN.getContext("2d");
        this.z1 = 250 / s(this.depth, 0.001);
        this.z2 = this.z1 / this.zoom;
        this.radius = aE(aN.height, aN.width) * 0.0075;
        this.max_radius = 100;
        this.max_weight = [];
        this.min_weight = [];
        this.textFont = this.textFont && o(this.textFont);
        this.textHeight *= 1;
        this.imageRadius = this.imageRadius.toString();
        this.pulsateTo = aw(this.pulsateTo, 0, 1);
        this.minBrightness = aw(this.minBrightness, 0, 1);
        this.maxBrightness = aw(this.maxBrightness, this.minBrightness, 1);
        this.ctxt.textBaseline = "top";
        this.lx = (this.lock + "").indexOf("x") + 1;
        this.ly = (this.lock + "").indexOf("y") + 1;
        this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
        this.fixedAlpha = 1;
        this.source = j || aO;
        this.repeatTags = aE(64, ~~this.repeatTags);
        this.minTags = aE(200, ~~this.minTags);
        if (~~this.scrollPause > 0) {
            y.scrollPause = ~~this.scrollPause
        } else {
            this.scrollPause = 0
        }
        if (this.minTags > 0 && this.repeatTags < 1 && (aI = this.GetTags().length)) {
            this.repeatTags = aq(this.minTags / aI) - 1
        }
        this.transform = R.Identity();
        this.startTime = this.time = G();
        this.mx = this.my = -1;
        this.centreImage && ao(this);
        this.Animate = this.dragControl ? this.AnimateDrag : this.AnimatePosition;
        this.animTiming = (typeof y[this.animTiming] == "function" ? y[this.animTiming] : y.Smooth);
        if (this.shadowBlur || this.shadowOffset[0] || this.shadowOffset[1]) {
            this.ctxt.shadowColor = this.shadow;
            this.shadow = this.ctxt.shadowColor;
            this.shadowAlpha = al()
        } else {
            delete this.shadow
        }
        this.Load();
        if (j && this.hideTags) {
            (function (i) {
                if (y.loaded) {
                    i.HideTags()
                } else {
                    ad("load", function () {
                        i.HideTags()
                    }, window)
                }
            })(this)
        }
        this.yaw = this.initial ? this.initial[0] * this.maxSpeed : 0;
        this.pitch = this.initial ? this.initial[1] * this.maxSpeed : 0;
        if (this.tooltip) {
            this.ctitle = aN.title;
            aN.title = "";
            if (this.tooltip == "native") {
                this.Tooltip = this.TooltipNative
            } else {
                this.Tooltip = this.TooltipDiv;
                if (!this.ttdiv) {
                    this.ttdiv = C.createElement("div");
                    this.ttdiv.className = this.tooltipClass;
                    this.ttdiv.style.position = "absolute";
                    this.ttdiv.style.zIndex = aN.style.zIndex + 1;
                    ad("mouseover", function (i) {
                        i.target.style.display = "none"
                    }, this.ttdiv);
                    C.body.appendChild(this.ttdiv)
                }
            }
        } else {
            this.Tooltip = this.TooltipNone
        }
        if (!this.noMouse && !b[aO]) {
            b[aO] = [
                ["mousemove", af],
                ["mouseout", B],
                ["mouseup", aF],
                ["touchstart", T],
                ["touchend", r],
                ["touchcancel", r],
                ["touchmove", aA]
            ];
            if (this.dragControl) {
                b[aO].push(["mousedown", z]);
                b[aO].push(["selectstart", aB])
            }
            if (this.wheelZoom) {
                b[aO].push(["mousewheel", ag]);
                b[aO].push(["DOMMouseScroll", ag])
            }
            if (this.scrollPause) {
                b[aO].push(["scroll", ac, window])
            }
            for (aI = 0; aI < b[aO].length; ++aI) {
                aL = b[aO][aI];
                ad(aL[0], aL[1], aL[2] ? aL[2] : aN)
            }
        }
        if (!y.started) {
            aM = window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            y.NextFrame = aM ? y.NextFrameRAF : y.NextFrameTimeout;
            y.interval = this.interval;
            y.NextFrame(this.interval);
            y.started = 1
        }
    }
    Q = y.prototype;
    Q.SourceElements = function () {
        if (C.querySelectorAll) {
            return C.querySelectorAll("#" + this.source)
        }
        return [C.getElementById(this.source)]
    };
    Q.HideTags = function () {
        var aI = this.SourceElements(),
            j;
        for (j = 0; j < aI.length; ++j) {
            aI[j].style.display = "none"
        }
    };
    Q.GetTags = function () {
        var aN = this.SourceElements(),
            aM, aJ = [],
            aL, aK, aI;
        for (aI = 0; aI <= this.repeatTags; ++aI) {
            for (aL = 0; aL < aN.length; ++aL) {
                aM = aN[aL].getElementsByTagName("a");
                for (aK = 0; aK < aM.length; ++aK) {
                    aJ.push(aM[aK])
                }
            }
        }
        return aJ
    };
    Q.Message = function (aN) {
        var aP = [],
            aJ, j, aI = aN.split(""),
            aL, aO, aM, aK;
        for (aJ = 0; aJ < aI.length; ++aJ) {
            if (aI[aJ] != " ") {
                j = aJ - aI.length / 2;
                aL = C.createElement("A");
                aL.href = "#";
                aL.innerText = aI[aJ];
                aM = 100 * ah(j / 9);
                aK = -100 * w(j / 9);
                aO = new e(this, aI[aJ], aL, [aM, 0, aK], 2, 18, "#000", "#fff", 0, 0, 0, "monospace", 2, aI[aJ]);
                aO.Init();
                aP.push(aO)
            }
        }
        return aP
    };
    Q.CreateTag = function (aM) {
        var aP, aK, aQ, aL, aO, aI, aN, aJ, j = [0, 0, 0];
        if ("text" != this.imageMode) {
            aP = aM.getElementsByTagName("img");
            if (aP.length) {
                aK = new Image;
                aK.src = aP[0].src;
                if (!this.imageMode) {
                    aQ = new e(this, "", aM, j, 0, 0);
                    aQ.SetImage(aK);
                    ax(aK, aP[0], aQ, this);
                    return aQ
                }
            }
        }
        if ("image" != this.imageMode) {
            aO = new aC(aM);
            aL = aO.Lines();
            if (!aO.Empty()) {
                aI = this.textFont || o(Y(aM, "font-family"));
                if (this.splitWidth) {
                    aL = aO.SplitWidth(this.splitWidth, this.ctxt, aI, this.textHeight)
                }
                aN = this.bgColour == "tag" ? Y(aM, "background-color") : this.bgColour;
                aJ = this.bgOutline == "tag" ? Y(aM, "color") : this.bgOutline
            } else {
                aO = null
            }
        }
        if (aO || aK) {
            aQ = new e(this, aL, aM, j, 2, this.textHeight + 2, this.textColour || Y(aM, "color"), aN, this.bgRadius, aJ, this.bgOutlineThickness, aI, this.padding, aO && aO.original);
            if (aK) {
                aQ.SetImage(aK);
                ax(aK, aP[0], aQ, this)
            } else {
                aQ.Init()
            }
            return aQ
        }
    };
    Q.UpdateTag = function (aI, i) {
        var aL = this.textColour || Y(i, "color"),
            j = this.textFont || o(Y(i, "font-family")),
            aK = this.bgColour == "tag" ? Y(i, "background-color") : this.bgColour,
            aJ = this.bgOutline == "tag" ? Y(i, "color") : this.bgOutline;
        aI.a = i;
        aI.title = i.title;
        if (aI.colour != aL || aI.textFont != j || aI.bgColour != aK || aI.bgOutline != aJ) {
            aI.SetFont(j, aL, aK, aJ)
        }
    };
    Q.Weight = function (aO) {
        var aK = aO.length,
            aM, aI, aP, aL = [],
            j, aJ = this.weightFrom ? this.weightFrom.split(/[, ]/) : [null],
            aN = aJ.length;
        for (aI = 0; aI < aK; ++aI) {
            aL[aI] = [];
            for (aP = 0; aP < aN; ++aP) {
                aM = u(aO[aI].a, aJ[aP], this.textHeight);
                if (!this.max_weight[aP] || aM > this.max_weight[aP]) {
                    this.max_weight[aP] = aM
                }
                if (!this.min_weight[aP] || aM < this.min_weight[aP]) {
                    this.min_weight[aP] = aM
                }
                aL[aI][aP] = aM
            }
        }
        for (aP = 0; aP < aN; ++aP) {
            if (this.max_weight[aP] > this.min_weight[aP]) {
                j = 1
            }
        }
        if (j) {
            for (aI = 0; aI < aK; ++aI) {
                aO[aI].SetWeight(aL[aI])
            }
        }
    };
    Q.Load = function () {
        var aS = this.GetTags(),
            aN = [],
            aQ, aR, aM, aJ, aI, j, aK, aP, aL = [],
            aO = {
                sphere: q,
                vcylinder: am,
                hcylinder: av,
                vring: d,
                hring: n
            };
        if (aS.length) {
            aL.length = aS.length;
            for (aP = 0; aP < aS.length; ++aP) {
                aL[aP] = aP
            }
            this.shuffleTags && an(aL);
            aJ = 100 * this.radiusX;
            aI = 100 * this.radiusY;
            j = 100 * this.radiusZ;
            this.max_radius = s(aJ, s(aI, j));
            for (aP = 0; aP < aS.length; ++aP) {
                aR = this.CreateTag(aS[aL[aP]]);
                if (aR) {
                    aN.push(aR)
                }
            }
            this.weight && this.Weight(aN, true);
            if (this.shapeArgs) {
                this.shapeArgs[0] = aN.length
            } else {
                aM = this.shape.toString().split(/[(),]/);
                aQ = aM.shift();
                if (typeof window[aQ] === "function") {
                    this.shape = window[aQ]
                } else {
                    this.shape = aO[aQ] || aO.sphere
                }
                this.shapeArgs = [aN.length, aJ, aI, j].concat(aM)
            }
            aK = this.shape.apply(this, this.shapeArgs);
            this.listLength = aN.length;
            for (aP = 0; aP < aN.length; ++aP) {
                aN[aP].position = new ae(aK[aP][0], aK[aP][1], aK[aP][2])
            }
        }
        if (this.noTagsMessage && !aN.length) {
            aP = (this.imageMode && this.imageMode != "both" ? this.imageMode + " " : "");
            aN = this.Message("No " + aP + "tags")
        }
        this.taglist = aN
    };
    Q.Update = function () {
        var aR = this.GetTags(),
            aQ = [],
            aL = this.taglist,
            aS, aP = [],
            aN = [],
            aJ, aO, aI, aM, aK;
        if (!this.shapeArgs) {
            return this.Load()
        }
        if (aR.length) {
            aI = this.listLength = aR.length;
            aO = aL.length;
            for (aM = 0; aM < aO; ++aM) {
                aQ.push(aL[aM]);
                aN.push(aM)
            }
            for (aM = 0; aM < aI; ++aM) {
                for (aK = 0, aS = 0; aK < aO; ++aK) {
                    if (aL[aK].EqualTo(aR[aM])) {
                        this.UpdateTag(aQ[aK], aR[aM]);
                        aS = aN[aK] = -1
                    }
                }
                if (!aS) {
                    aP.push(aM)
                }
            }
            for (aM = 0, aK = 0; aM < aO; ++aM) {
                if (aN[aK] == -1) {
                    aN.splice(aK, 1)
                } else {
                    ++aK
                }
            }
            if (aN.length) {
                an(aN);
                while (aN.length && aP.length) {
                    aM = aN.shift();
                    aK = aP.shift();
                    aQ[aM] = this.CreateTag(aR[aK])
                }
                aN.sort(function (j, i) {
                    return j - i
                });
                while (aN.length) {
                    aQ.splice(aN.pop(), 1)
                }
            }
            aK = aQ.length / (aP.length + 1);
            aM = 0;
            while (aP.length) {
                aQ.splice(aq(++aM * aK), 0, this.CreateTag(aR[aP.shift()]))
            }
            this.shapeArgs[0] = aI = aQ.length;
            aJ = this.shape.apply(this, this.shapeArgs);
            for (aM = 0; aM < aI; ++aM) {
                aQ[aM].position = new ae(aJ[aM][0], aJ[aM][1], aJ[aM][2])
            }
            this.weight && this.Weight(aQ)
        }
        this.taglist = aQ
    };
    Q.SetShadow = function (i) {
        i.shadowBlur = this.shadowBlur;
        i.shadowOffsetX = this.shadowOffset[0];
        i.shadowOffsetY = this.shadowOffset[1]
    };
    Q.Draw = function (aS) {
        if (this.paused) {
            return
        }
        var aM = this.canvas,
            aK = aM.width,
            aR = aM.height,
            aU = 0,
            aJ = (aS - this.time) * y.interval / 1000,
            aQ = aK / 2 + this.offsetX,
            aP = aR / 2 + this.offsetY,
            aY = this.ctxt,
            aO, aZ, aW, aI = -1,
            aL = this.taglist,
            aV = aL.length,
            j = this.frontSelect,
            aT = (this.centreFunc == aB),
            aN;
        this.time = aS;
        if (this.frozen && this.drawn) {
            return this.Animate(aK, aR, aJ)
        }
        aN = this.AnimateFixed();
        aY.setTransform(1, 0, 0, 1, 0, 0);
        for (aW = 0; aW < aV; ++aW) {
            aL[aW].Calc(this.transform, this.fixedAlpha)
        }
        aL = A(aL, function (a0, i) {
            return i.z - a0.z
        });
        if (aN && this.fixedAnim.active) {
            aO = this.fixedAnim.tag.UpdateActive(aY, aQ, aP)
        } else {
            this.active = null;
            for (aW = 0; aW < aV; ++aW) {
                aZ = this.mx >= 0 && this.my >= 0 && this.taglist[aW].CheckActive(aY, aQ, aP);
                if (aZ && aZ.sc > aU && (!j || aZ.z <= 0)) {
                    aO = aZ;
                    aI = aW;
                    aO.tag = this.taglist[aW];
                    aU = aZ.sc
                }
            }
            this.active = aO
        }
        this.txtOpt || (this.shadow && this.SetShadow(aY));
        aY.clearRect(0, 0, aK, aR);
        for (aW = 0; aW < aV; ++aW) {
            if (!aT && aL[aW].z <= 0) {
                try {
                    this.centreFunc(aY, aK, aR, aQ, aP)
                } catch (aX) {
                    alert(aX);
                    this.centreFunc = aB
                }
                aT = true
            }
            if (!(aO && aO.tag == aL[aW] && aO.PreDraw(aY, aL[aW], aQ, aP))) {
                aL[aW].Draw(aY, aQ, aP)
            }
            aO && aO.tag == aL[aW] && aO.PostDraw(aY)
        }
        if (this.freezeActive && aO) {
            this.Freeze()
        } else {
            this.UnFreeze();
            this.drawn = (aV == this.listLength)
        }
        if (this.fixedCallback) {
            this.fixedCallback(this, this.fixedCallbackTag);
            this.fixedCallback = null
        }
        aN || this.Animate(aK, aR, aJ);
        aO && aO.LastDraw(aY);
        aM.style.cursor = aO ? this.activeCursor : "";
        this.Tooltip(aO, this.taglist[aI])
    };
    Q.TooltipNone = function () { };
    Q.TooltipNative = function (j, i) {
        if (j) {
            this.canvas.title = i && i.title ? i.title : ""
        } else {
            this.canvas.title = this.ctitle
        }
    };
    Q.SetTTDiv = function (aJ, j) {
        var i = this,
            aI = i.ttdiv.style;
        if (aJ != i.ttdiv.innerHTML) {
            aI.display = "none"
        }
        i.ttdiv.innerHTML = aJ;
        j && (j.title = i.ttdiv.innerHTML);
        if (aI.display == "none" && !i.tttimer) {
            i.tttimer = setTimeout(function () {
                var aK = ab(i.canvas.id);
                aI.display = "block";
                aI.left = aK.x + i.mx + "px";
                aI.top = aK.y + i.my + 24 + "px";
                i.tttimer = null
            }, i.tooltipDelay)
        }
    };
    Q.TooltipDiv = function (j, i) {
        if (j && i && i.title) {
            this.SetTTDiv(i.title, i)
        } else {
            if (!j && this.mx != -1 && this.my != -1 && this.ctitle.length) {
                this.SetTTDiv(this.ctitle)
            } else {
                this.ttdiv.style.display = "none"
            }
        }
    };
    Q.Transform = function (aL, i, aN) {
        if (i || aN) {
            var j = ah(i),
                aM = w(i),
                aO = ah(aN),
                aK = w(aN),
                aI = new R([aK, 0, aO, 0, 1, 0, -aO, 0, aK]),
                aJ = new R([1, 0, 0, 0, aM, -j, 0, j, aM]);
            aL.transform = aL.transform.mul(aI.mul(aJ))
        }
    };
    Q.AnimateFixed = function () {
        var aI, j, aK, i, aJ;
        if (this.fadeIn) {
            j = G() - this.startTime;
            if (j >= this.fadeIn) {
                this.fadeIn = 0;
                this.fixedAlpha = 1
            } else {
                this.fixedAlpha = j / this.fadeIn
            }
        }
        if (this.fixedAnim) {
            if (!this.fixedAnim.transform) {
                this.fixedAnim.transform = this.transform
            }
            aI = this.fixedAnim, j = G() - aI.t0, aK = aI.angle, i, aJ = this.animTiming(aI.t, j);
            this.transform = aI.transform;
            if (j >= aI.t) {
                this.fixedCallbackTag = aI.tag;
                this.fixedCallback = aI.cb;
                this.fixedAnim = this.yaw = this.pitch = 0
            } else {
                aK *= aJ
            }
            i = R.Rotation(aK, aI.axis);
            this.transform = this.transform.mul(i);
            return (this.fixedAnim != 0)
        }
        return false
    };
    Q.AnimatePosition = function (aI, aL, aJ) {
        var j = this,
            i = j.mx,
            aN = j.my,
            aK, aM;
        if (!j.frozen && i >= 0 && aN >= 0 && i < aI && aN < aL) {
            aK = j.maxSpeed, aM = j.reverse ? -1 : 1;
            j.lx || (j.yaw = ((i * 2 * aK / aI) - aK) * aM * aJ);
            j.ly || (j.pitch = ((aN * 2 * aK / aL) - aK) * -aM * aJ);
            j.initial = null
        } else {
            if (!j.initial) {
                if (j.frozen && !j.freezeDecel) {
                    j.yaw = j.pitch = 0
                } else {
                    j.Decel(j)
                }
            }
        }
        this.Transform(j, j.pitch, j.yaw)
    };
    Q.AnimateDrag = function (j, aK, aJ) {
        var i = this,
            aI = 100 * aJ * i.maxSpeed / i.max_radius / i.zoom;
        if (i.dx || i.dy) {
            i.lx || (i.yaw = i.dx * aI / i.stretchX);
            i.ly || (i.pitch = i.dy * -aI / i.stretchY);
            i.dx = i.dy = 0;
            i.initial = null
        } else {
            if (!i.initial) {
                i.Decel(i)
            }
        }
        this.Transform(i, i.pitch, i.yaw)
    };
    Q.Freeze = function () {
        if (!this.frozen) {
            this.preFreeze = [this.yaw, this.pitch];
            this.frozen = 1;
            this.drawn = 0
        }
    };
    Q.UnFreeze = function () {
        if (this.frozen) {
            this.yaw = this.preFreeze[0];
            this.pitch = this.preFreeze[1];
            this.frozen = 0
        }
    };
    Q.Decel = function (i) {
        var aI = i.minSpeed,
            aJ = L(i.yaw),
            j = L(i.pitch);
        if (!i.lx && aJ > aI) {
            i.yaw = aJ > i.z0 ? i.yaw * i.decel : 0
        }
        if (!i.ly && j > aI) {
            i.pitch = j > i.z0 ? i.pitch * i.decel : 0
        }
    };
    Q.Zoom = function (i) {
        this.z2 = this.z1 * (1 / i);
        this.drawn = 0
    };
    Q.Clicked = function (aI) {
        var i = this.active;
        try {
            if (i && i.tag) {
                if (this.clickToFront === false || this.clickToFront === null) {
                    i.tag.Clicked(aI)
                } else {
                    this.TagToFront(i.tag, this.clickToFront, function () {
                        i.tag.Clicked(aI)
                    }, true)
                }
            }
        } catch (j) { }
    };
    Q.Wheel = function (j) {
        var aI = this.zoom + this.zoomStep * (j ? 1 : -1);
        this.zoom = aE(this.zoomMax, s(this.zoomMin, aI));
        this.Zoom(this.zoom)
    };
    Q.BeginDrag = function (i) {
        this.down = S(i, this.canvas);
        i.cancelBubble = true;
        i.returnValue = false;
        i.preventDefault && i.preventDefault()
    };
    Q.Drag = function (aK, aJ) {
        if (this.dragControl && this.down) {
            var aI = this.dragThreshold * this.dragThreshold,
                j = aJ.x - this.down.x,
                i = aJ.y - this.down.y;
            if (this.dragging || j * j + i * i > aI) {
                this.dx = j;
                this.dy = i;
                this.dragging = 1;
                this.down = aJ
            }
        }
        return this.dragging
    };
    Q.EndDrag = function () {
        var i = this.dragging;
        this.dragging = this.down = null;
        return i
    };

    function D(aI) {
        var j = aI.targetTouches[0],
            i = aI.targetTouches[1];
        return F(au(i.pageX - j.pageX, 2) + au(i.pageY - j.pageY, 2))
    }
    Q.BeginPinch = function (i) {
        this.pinched = [D(i), this.zoom];
        i.preventDefault && i.preventDefault()
    };
    Q.Pinch = function (j) {
        var aJ, aI, i = this.pinched;
        if (!i) {
            return
        }
        aI = D(j);
        aJ = i[1] * aI / i[0];
        this.zoom = aE(this.zoomMax, s(this.zoomMin, aJ));
        this.Zoom(this.zoom)
    };
    Q.EndPinch = function (i) {
        this.pinched = null
    };
    Q.Pause = function () {
        this.paused = true
    };
    Q.Resume = function () {
        this.paused = false
    };
    Q.SetSpeed = function (j) {
        this.initial = j;
        this.yaw = j[0] * this.maxSpeed;
        this.pitch = j[1] * this.maxSpeed
    };
    Q.FindTag = function (aI) {
        if (!ai(aI)) {
            return null
        }
        ai(aI.index) && (aI = aI.index);
        if (!I(aI)) {
            return this.taglist[aI]
        }
        var aJ, aK, j;
        if (ai(aI.id)) {
            aJ = "id", aK = aI.id
        } else {
            if (ai(aI.text)) {
                aJ = "innerText", aK = aI.text
            }
        }
        for (j = 0; j < this.taglist.length; ++j) {
            if (this.taglist[j].a[aJ] == aK) {
                return this.taglist[j]
            }
        }
    };
    Q.RotateTag = function (aQ, aJ, aP, i, aN, aI) {
        var aO = aQ.Calc(this.transform, 1),
            aL = new ae(aO.x, aO.y, aO.z),
            aK = aj(aP, aJ),
            j = aL.angle(aK),
            aM = aL.cross(aK).unit();
        if (j == 0) {
            this.fixedCallbackTag = aQ;
            this.fixedCallback = aN
        } else {
            this.fixedAnim = {
                angle: -j,
                axis: aM,
                t: i,
                t0: G(),
                cb: aN,
                tag: aQ,
                active: aI
            }
        }
    };
    Q.TagToFront = function (i, aI, aJ, j) {
        this.RotateTag(i, 0, 0, aI, aJ, j)
    };
    y.Start = function (aI, i, j) {
        y.Delete(aI);

        y.tc[aI] = new y(aI, i, j)
    };

    function az(i, j) {
        y.tc[j] && y.tc[j][i]()
    }
    y.Linear = function (i, j) {
        return j / i
    };
    y.Smooth = function (i, j) {
        return 0.5 - w(j * Math.PI / i) / 2
    };
    y.Pause = function (i) {
        az("Pause", i)
    };
    y.Resume = function (i) {
        az("Resume", i)
    };
    y.Reload = function (i) {
        az("Load", i)
    };
    y.Update = function (i) {
        az("Update", i)
    };
    y.SetSpeed = function (j, i) {
        if (I(i) && y.tc[j] && !isNaN(i[0]) && !isNaN(i[1])) {
            y.tc[j].SetSpeed(i);
            return true
        }
        return false
    };
    y.TagToFront = function (j, i) {
        if (!I(i)) {
            return false
        }
        i.lat = i.lng = 0;
        return y.RotateTag(j, i)
    };
    y.RotateTag = function (aI, i) {
        if (I(i) && y.tc[aI]) {
            if (isNaN(i.time)) {
                i.time = 500
            }
            var j = y.tc[aI].FindTag(i);
            if (j) {
                y.tc[aI].RotateTag(j, i.lat, i.lng, i.time, i.callback, i.active);
                return true
            }
        }
        return false
    };
    y.Delete = function (aJ) {
        var j, aI;
        if (b[aJ]) {
            aI = C.getElementById(aJ);
            if (aI) {
                for (j = 0; j < b[aJ].length; ++j) {
                    a(b[aJ][j][0], b[aJ][j][1], aI)
                }
            }
        }
        delete b[aJ];
        delete y.tc[aJ]
    };
    y.NextFrameRAF = function () {
        requestAnimationFrame(E)
    };
    y.NextFrameTimeout = function (i) {
        setTimeout(O, i)
    };
    y.tc = {};
    y.options = {
        z1: 20000,
        z2: 20000,
        z0: 0.0002,
        freezeActive: false,
        freezeDecel: false,
        activeCursor: "pointer",
        pulsateTo: 1,
        pulsateTime: 3,
        reverse: false,
        depth: 0.5,
        maxSpeed: 0.05,
        minSpeed: 0,
        decel: 0.95,
        interval: 20,
        minBrightness: 0.1,
        maxBrightness: 1,
        outlineColour: "#ffff99",
        outlineThickness: 2,
        outlineOffset: 5,
        outlineMethod: "outline",
        outlineRadius: 0,
        textColour: "#ff99ff",
        textHeight: 15,
        textFont: "Helvetica, Arial, sans-serif",
        shadow: "#000",
        shadowBlur: 0,
        shadowOffset: [0, 0],
        initial: null,
        hideTags: true,
        zoom: 1,
        weight: false,
        weightMode: "size",
        weightFrom: null,
        weightSize: 1,
        weightSizeMin: null,
        weightSizeMax: null,
        weightGradient: {
            0: "#f00",
            0.33: "#ff0",
            0.66: "#0f0",
            1: "#00f"
        },
        txtOpt: true,
        txtScale: 2,
        frontSelect: false,
        wheelZoom: true,
        zoomMin: 0.3,
        zoomMax: 3,
        zoomStep: 0.05,
        shape: "sphere",
        lock: null,
        tooltip: null,
        tooltipDelay: 300,
        tooltipClass: "tctooltip",
        radiusX: 1,
        radiusY: 1,
        radiusZ: 1,
        stretchX: 1,
        stretchY: 1,
        offsetX: 0,
        offsetY: 0,
        shuffleTags: false,
        noSelect: false,
        noMouse: false,
        imageScale: 1,
        paused: false,
        dragControl: false,
        dragThreshold: 4,
        centreFunc: aB,
        splitWidth: 0,
        animTiming: "Smooth",
        clickToFront: false,
        fadeIn: 0,
        padding: 0,
        bgColour: null,
        bgRadius: 0,
        bgOutline: null,
        bgOutlineThickness: 0,
        outlineIncrease: 4,
        textAlign: "centre",
        textVAlign: "middle",
        imageMode: null,
        imagePosition: null,
        imagePadding: 2,
        imageAlign: "centre",
        imageVAlign: "middle",
        noTagsMessage: true,
        centreImage: null,
        pinchZoom: false,
        repeatTags: 0,
        minTags: 0,
        imageRadius: 0,
        scrollPause: false,
        outlineDash: 0,
        outlineDashSpace: 0,
        outlineDashSpeed: 1
    };
    for (M in y.options) {
        y[M] = y.options[M]
    }
    window.TagCanvas = y;
    jQuery.fn.tagcanvas = function (j, i) {
        var aI = {
            pause: function () {
                ap(this).each(function () {
                    az("Pause", ap(this)[0].id)
                })
            },
            resume: function () {
                ap(this).each(function () {
                    az("Resume", ap(this)[0].id)
                })
            },
            reload: function () {
                ap(this).each(function () {
                    az("Load", ap(this)[0].id)
                })
            },
            update: function () {
                ap(this).each(function () {
                    az("Update", ap(this)[0].id)
                })
            },
            tagtofront: function () {
                ap(this).each(function () {
                    y.TagToFront(ap(this)[0].id, i)
                })
            },
            rotatetag: function () {
                ap(this).each(function () {
                    y.RotateTag(ap(this)[0].id, i)
                })
            },
            "delete": function () {
                ap(this).each(function () {
                    y.Delete(ap(this)[0].id)
                })
            },
            setspeed: function () {
                ap(this).each(function () {
                    y.SetSpeed(ap(this)[0].id, i)
                })
            }
        };
        if (typeof j == "string" && aI[j]) {
            aI[j].apply(this);
            return this
        } else {
            y.jquery = 1;
            ap(this).each(function () {
                y.Start(ap(this)[0].id, i, j)
            });
            return y.started
        }
    };
    ad("load", function () {
        y.loaded = 1
    }, window)
})(jQuery);


/*



 █████╗ ██████╗ ██████╗ 
██╔══██╗██╔══██╗██╔══██╗
███████║██████╔╝██████╔╝
██╔══██║██╔═══╝ ██╔═══╝ 
██║  ██║██║      ██║     
╚═╝  ╚═╝╚═╝      ╚═╝     
                        



*/

// app

app.home = {
    init: function () {
        TweenMax.to(document.querySelector('.bg'), 0.4, {
            opacity: 1,
            ease: Power2.easeIn
        });
        var mySVG = $('svg').drawsvg({
            duration: 10000
        });
        mySVG.drawsvg('animate');
        TweenMax.fromTo($(".jb")[0], 4, {
            opacity: 0,
            y: 0,
            ease: Power2.easeIn
        }, {
            opacity: 1,
            y: 0,
            delay: 3
        });
        $('#nav_bar nav a').removeClass('active');
        $('.home-link').addClass('active');
        $(".home-page h1").blast({
            delimiter: "character",
            tag: "span"
        });
        a = 0;
        b = 0;
        $(".home-page .blast").each(function () {
            if (a == 300) {
                a = 400;
            }
            if (a == 1100) {
                a = 1200;
            }
            var el = $(this);
            if (a == 400) {
                setTimeout(function () {
                    $(".home-page h1 img").addClass('animation-logo');
                }, 800);
            }
            setTimeout(function () {
                el.addClass('animated bounceIn');
            }, a);
            if (a < 1200) {
                a = a + 100;
            } else {
                a = a + 80;
            }
        });
        setTimeout(function () {
            $(".home-page .blast").removeClass('animated bounceIn');
            $(".home-page .blast").css('opacity', 1);
            $(".home-page .blast").mouseenter(function () {
                var el = $(this);
                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass('animated rubberBand');
                });
            });
        }, 3000);
        $(".home-page .flat-button").mouseenter(function () {
            var el = $(this);
            $(this).addClass('animated rubberBand');
            $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                el.removeClass('animated rubberBand');
            });
        });
    }
};
app.about = {
    init: function () {
        $(".about h1").blast({
            delimiter: "character",
            tag: "span"
        });
        a = 0;
        $(".about h1 .blast").each(function () {
            var el = $(this);
            setTimeout(function () {
                el.addClass('animated bounceIn');
            }, a);
            a = a + 100;
        });
        setTimeout(function () {
            $(".about .blast").removeClass('animated bounceIn');
            $(".about .blast").css('opacity', 1);
            $(".about .blast").mouseenter(function () {
                var el = $(this);
                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass('animated rubberBand');
                });
            });
        }, 1000);
    }
}

app.contact = {
    init: function () {
        $(".contact h1").blast({
            delimiter: "character",
            tag: "span"
        });
        a = 0;
        $(".contact .blast").each(function () {
            var el = $(this);
            setTimeout(function () {
                el.addClass('animated bounceIn');
            }, a);
            a = a + 100;
        });
        setTimeout(function () {
            $(".contact .blast").removeClass('animated bounceIn');
            $(".contact .blast").css('opacity', 1);
            $(".contact .blast").mouseenter(function () {
                var el = $(this);
                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass('animated rubberBand');
                });
            });
        }, 1000);
        b = 300;
        $(".contact li").each(function () {
            var el = $(this);
            setTimeout(function () {
                el.addClass('animated fadeInUp');
            }, b);
            b = b + 100;
        });
        $('#submit').click(function () {
            app.contact.validate();
            if ($('.contact-form .required').length > 0) {
                alertify.error(msg1);
            } else {
                alertify.log(msg2);
                $.ajax({
                    url: "https://formspree.io/moqnoayw",
                    method: "POST",
                    data: $("#contact").serialize(),
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        alertify.success(msg3);
                        $('.contact-form .required').removeClass('required');
                        $('.contact-form input[type="text"],.contact-form input[type="email"],.contact-form textarea').val('');

                    },
                    error: function (err) {
                        console.log(err)
                        $('.contact-form .required').removeClass('required');
                        $('.contact-form input[type="text"],.contact-form input[type="email"],.contact-form textarea').val('');
                        alertify.error(msg4);
                    }
                });
            }
            return false;
        });
        $('.contact-form input, .contact-form textarea').keyup(function () {
            app.contact.validate();
        });
    },
    validate: function () {
        if ($('input[type=email]').val() == '' || !validateEmail($('input[type=email]').val())) {
            $('input[type=email]').parent().addClass('required');
        } else {
            $('input[type=email]').parent().removeClass('required');
        }
        if ($('textarea').val() == '') {
            $('textarea').parent().addClass('required');
        } else {
            $('textarea').parent().removeClass('required');
        }
    }
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

app.gallery = {
    init: function () {
        $("body").addClass('no-overflow');
        $(".magicwall").magicWall({
            maxItemHeight: 550,
            maxItemWidth: 550,
            delay: 400,
            preloadBeforeSwitch: false,
            loadingMode: "chain",
            pauseOnHover: "item",
            animations: "flipY,rollOutX,-rollOutX,rollOutY,-rollOutY,slideColumn,-slideColumn,slideRow,-slideRow,fade",
            duration: 800
        });
        $(".colorbox").colorbox({
            maxWidth: "70%",
            maxHeight: "250%",
            scrolling: true,
            onOpen: function () {
                $(".magicwall").magicWall("stop");
            },
            onClosed: function () {
                $(".magicwall").magicWall("start");
            }
        });

        alertify.log(msg5);

        setTimeout(function () {
            alertify.log(msg6);
        }, 2000);
    }
};
app.skills = {
    init: function () {
        $(".skills h1").blast({
            delimiter: "word",
            tag: "span"
        });
        a = 0;
        $(".skills h1 .blast").each(function () {
            var el = $(this);
            setTimeout(function () {
                el.addClass('animated bounceIn');
            }, a);
            a = a + 80;
        });
        setTimeout(function () {
            $(".skills .blast").removeClass('animated bounceIn');
            $(".skills .blast").css('opacity', 1);
            $(".skills .blast").mouseenter(function () {
                var el = $(this);
                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass('animated rubberBand');
                });
            });
        }, 2000);
        var textCol = '#ffffff';
        if ($('body').hasClass('white')) {
            textCol = '#FE0853';
        }
        if (!$('#myCanvas').tagcanvas({
            textColour: textCol,
            outlineThickness: 0.5,
            outlineColour: '#FE0853',
            maxSpeed: 0.06,
            freezeActive: true,
            shuffleTags: true,
            shape: 'sphere',
            zoom: 0.9,
            noSelect: true,
            textFont: null,
            pinchZoom: true,
            freezeDecel: true,
            fadeIn: 3000,
            initial: [0.3, -0.1],
            depth: 1.4
        })) {
            $('#myCanvasContainer').hide();
        }
        setTimeout(function () {
            alertify.log(msg8);
        }, 2000);
    }
};
app.text = {
    init: function () {
        $(".text-page h1").blast({
            delimiter: "character",
            tag: "span"
        });
        a = 0;
        $(".text-page h1 .blast").each(function () {
            var el = $(this);
            setTimeout(function () {
                el.addClass('animated bounceIn');
            }, a);
            a = a + 50;
        });
        setTimeout(function () {
            $(".text-page .blast").removeClass('animated bounceIn');
            $(".text-page .blast").css('opacity', 1);
            $(".text-page .blast").mouseenter(function () {
                var el = $(this);
                $(this).addClass('animated rubberBand');
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass('animated rubberBand');
                });
            });
        }, 1000);
    }
}
window.goBack = function (e) {
    var defaultLocation = "http://jacekjeznach.com";
    var oldHash = window.location.hash;
    history.back();
    var newHash = window.location.hash;
    if (newHash === oldHash && (typeof (document.referrer) !== "string" || document.referrer === "")) {
        window.setTimeout(function () {
            window.location.href = defaultLocation;
        }, 1000);
    }
    if (e) {
        if (e.preventDefault)
            e.preventDefault();
        if (e.preventPropagation)
            e.preventPropagation();
    }
    return false;
};
$ = jQuery.noConflict();
(function ($) {
    $.rand = function (arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;
        }
    };
})(jQuery);
app.ui = {
    contents: null,
    particlesArgs: [],
    animations: {
        preloaderanim: null,
        preloaderanimHide: null
    },
    navMenu: function () {
        $(document).on('click', '#nav_bar nav a,.flat-button, a.logo', function (e) {
            e.preventDefault();
            $("body").removeClass('no-overflow');
            if (!$(this).hasClass('active')) {
                if (app.ui.pageLoad($(this).attr('href'), $(this).attr('rel'))) {
                    $('#nav_bar nav a.active').removeClass('active');
                    $(this).addClass('active');
                    window.history.pushState("", "", $(this).attr('href'));
                }
            }
            $('a.logo').removeClass('active');
            return false;
        });
    },
    pageLoad: function (url, rel) {
        if (app.ajax !== null) {
            return false;
        } else {
            app.ui.preloader.preloaderInit(rel);
            app.ajax = $.ajax({
                type: 'GET',
                url: url + '?ajax=true'
            });
            app.ajax.done(function (msg) {
                var cont = $(msg).filter("#page");
                app.ui.contents = cont.contents();
                app.ajax = null;
            });
            app.ajax.fail(function (jqXHR, textStatus) {
                $("#page").html(errmsg);
            });
            return true;
        }
    },
    pageInit: function (rel) {
        if (rel == 'index') {
            app.home.init();
        } else if (rel == 'about') {
            app.about.init();
        } else if (rel == 'skills') {
            app.skills.init();
        } else if (rel == 'gallery') {
            app.gallery.init();
        } else if (rel == 'contact') {
            app.contact.init();
        }
    },
    particle: false,
    mobileMenu: function () {
        $('#mobile-link').click(function () {
            $('#nav_bar nav').toggleClass('show');
            return false;
        });
    },
    initAnimation: function () {
        app.ui.animations.preloaderanim = new TimelineMax().to(document.querySelector('.container'), 0.4, {
            immediateRender: false,
            opacity: 0.2,
            scale: 0.85,
            ease: Power4.easeOut
        }).fromTo(document.querySelector('.preloader'), 0.5, {
            immediateRender: false,
            x: '-100%',
            display: 'none',
            ease: Power4.easeOut
        }, {
            x: '0%',
            display: 'block'
        }, 0.3).pause(), app.ui.animations.preloaderanimHide = new TimelineMax().fromTo(document.querySelector('.container'), 0.5, {
            immediateRender: false,
            opacity: 0,
            scale: 0.85
        }, {
            opacity: 1,
            scale: 1
        }, 0.3).fromTo(document.querySelector('.preloader'), 0.6, {
            immediateRender: false,
            x: '0%',
            ease: Power4.easeIn
        }, {
            x: '100%',
            onComplete: function () {
                $('.progress-bar > span').text(0);
                $('.progress-bar > span').css('width', '0%');
                $('.progress-bar_bg div').css('width', '0%');
                $('.preloader').hide();
            }
        }, 0).pause()
    }
}
app.ui.preloader = {
    checkProgress: function (rel) {
        if (app.ajax === null) {
            $("#page").html(app.ui.contents);
            $('.container').removeClass('fadeIn');
            app.ui.initAnimation();
            setTimeout(function () {
                app.ui.preloader.preloaderHide();
            }, 30);
            setTimeout(function () {
                app.ui.pageInit(rel);
            }, 10);
        } else {
            setTimeout(function () {
                app.ui.preloader.checkProgress(rel);
            }, 50);
        }
    },
    preloaderInit: function (rel) {
        app.ui.animations.preloaderanim.play(0).call(app.ui.preloader.preloaderCheckRequest, [rel]);
        if (document.querySelector('.bg')) {
            TweenMax.to($('.bg'), 0.4, {
                opacity: 0.2,
                scale: 0.85,
                ease: Power4.easeOut
            });
        }
    },
    preloaderCheckRequest: function (rel) {
        $('.progress-bar_bg div').width();
        var a = 0;
        var loader = setInterval(function () {
            ++a;
            ++a;
            ++a;
            $('.progress-bar > span').text(a);
            $('.progress-bar > span').css('width', a + '%');
            $('.progress-bar_bg div').css('width', a + '%');
            if (a >= 99) {
                clearInterval(loader);
                app.ui.preloader.checkProgress(rel);
            }
        }, 25);
    },
    preloaderHide: function (rel) {
        app.ui.animations.preloaderanimHide.play();
        if (document.querySelector('.bg')) {
            TweenMax.fromTo($('.bg')[0], 0.5, {
                opacity: 0.2,
                scale: 0.85,
                ease: Power4.easeOut
            }, {
                opacity: 1,
                scale: 1,
                delay: 0.4
            });
        }
    }
}
$(function () {
    if (requested != 'true') {
        app.ui.navMenu();
        app.ui.mobileMenu();
        app.ui.initAnimation();
    }
});
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
if (requested != 'true') {
    if ($('.container.home-page').length > 0) {
        app.home.init();
    }
    if ($('.container.about').length > 0) {
        app.about.init();
    }
    if ($('.container.text-page').length > 0) {
        app.text.init();
    }
    if ($('.container.contact').length > 0) {
        app.contact.init();
    }
    if ($('.container.skills').length > 0) {
        app.skills.init();
    }
    if ($('.container.gallery').length > 0) {
        app.gallery.init();
    }
    TweenMax.to($('.container')[0], 0.4, {
        opacity: 1,
        ease: Power2.easeIn
    });
}
if ('caches' in window) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister()
        }
    })
    caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            return caches.delete(cacheName);
        }));
    });
}