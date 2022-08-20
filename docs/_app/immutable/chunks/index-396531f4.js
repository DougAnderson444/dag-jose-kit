import { w as writable, _ as __vitePreload } from "./preload-helper-fe81da0e.js";
import { K as identity$3, S as SvelteComponent, i as init, s as safe_not_equal, l as element, r as text, a as space, m as claim_element, n as children, u as claim_text, h as detach, c as claim_space, p as attr, b as insert_hydration, J as append_hydration, L as set_input_value, M as listen, v as set_data, E as noop, F as create_slot, G as update_slot_base, H as get_all_dirty_from_scope, I as get_slot_changes, f as transition_in, t as transition_out, N as svg_element, O as claim_svg_element, P as prevent_default, Q as is_function, g as group_outros, d as check_outros, R as createEventDispatcher, T as handle_promise, e as empty, U as update_await_block_branch, w as create_component, x as claim_component, y as mount_component, B as destroy_component, q as set_style, C as assign, V as now, W as loop, X as component_subscribe, o as onMount, Y as set_store_value, Z as destroy_each, _ as binding_callbacks, $ as bind, a0 as add_flush_callback, a1 as add_render_callback, a2 as create_bidirectional_transition } from "./index-ef46e954.js";
function cubicOut(t) {
  const f2 = t - 1;
  return f2 * f2 * f2 + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function fade(node2, { delay = 0, duration = 400, easing = identity$3 } = {}) {
  const o = +getComputedStyle(node2).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node2, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node2);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
  };
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  var f2 = n.default;
  if (typeof f2 == "function") {
    var a = function() {
      return f2.apply(this, arguments);
    };
    a.prototype = f2.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var random = {};
var system = {};
var browser = {};
Object.defineProperty(browser, "__esModule", { value: true });
var QUOTA = 65536;
var BrowserRandomSource = function() {
  function BrowserRandomSource2() {
    this.isAvailable = false;
    this.isInstantiated = false;
    var browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
    if (browserCrypto && browserCrypto.getRandomValues) {
      this._crypto = browserCrypto;
      this.isAvailable = true;
      this.isInstantiated = true;
    }
  }
  BrowserRandomSource2.prototype.randomBytes = function(length2) {
    if (!this.isAvailable || !this._crypto) {
      throw new Error("Browser random byte generator is not available.");
    }
    var out = new Uint8Array(length2);
    for (var i = 0; i < out.length; i += QUOTA) {
      this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
    }
    return out;
  };
  return BrowserRandomSource2;
}();
browser.BrowserRandomSource = BrowserRandomSource;
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var node = {};
var wipe$1 = {};
Object.defineProperty(wipe$1, "__esModule", { value: true });
function wipe(array) {
  for (var i = 0; i < array.length; i++) {
    array[i] = 0;
  }
  return array;
}
wipe$1.wipe = wipe;
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
Object.defineProperty(node, "__esModule", { value: true });
var wipe_1$2 = wipe$1;
var NodeRandomSource = function() {
  function NodeRandomSource2() {
    this.isAvailable = false;
    this.isInstantiated = false;
    if (typeof commonjsRequire !== "undefined") {
      var nodeCrypto = require$$0$1;
      if (nodeCrypto && nodeCrypto.randomBytes) {
        this._crypto = nodeCrypto;
        this.isAvailable = true;
        this.isInstantiated = true;
      }
    }
  }
  NodeRandomSource2.prototype.randomBytes = function(length2) {
    if (!this.isAvailable || !this._crypto) {
      throw new Error("Node.js random byte generator is not available.");
    }
    var buffer2 = this._crypto.randomBytes(length2);
    if (buffer2.length !== length2) {
      throw new Error("NodeRandomSource: got fewer bytes than requested");
    }
    var out = new Uint8Array(length2);
    for (var i = 0; i < out.length; i++) {
      out[i] = buffer2[i];
    }
    wipe_1$2.wipe(buffer2);
    return out;
  };
  return NodeRandomSource2;
}();
node.NodeRandomSource = NodeRandomSource;
Object.defineProperty(system, "__esModule", { value: true });
var browser_1 = browser;
var node_1 = node;
var SystemRandomSource = function() {
  function SystemRandomSource2() {
    this.isAvailable = false;
    this.name = "";
    this._source = new browser_1.BrowserRandomSource();
    if (this._source.isAvailable) {
      this.isAvailable = true;
      this.name = "Browser";
      return;
    }
    this._source = new node_1.NodeRandomSource();
    if (this._source.isAvailable) {
      this.isAvailable = true;
      this.name = "Node";
      return;
    }
  }
  SystemRandomSource2.prototype.randomBytes = function(length2) {
    if (!this.isAvailable) {
      throw new Error("System random byte generator is not available.");
    }
    return this._source.randomBytes(length2);
  };
  return SystemRandomSource2;
}();
system.SystemRandomSource = SystemRandomSource;
var binary = {};
var int = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function imulShim(a, b) {
    var ah = a >>> 16 & 65535, al = a & 65535;
    var bh = b >>> 16 & 65535, bl = b & 65535;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
  }
  exports.mul = Math.imul || imulShim;
  function add5(a, b) {
    return a + b | 0;
  }
  exports.add = add5;
  function sub(a, b) {
    return a - b | 0;
  }
  exports.sub = sub;
  function rotl(x, n) {
    return x << n | x >>> 32 - n;
  }
  exports.rotl = rotl;
  function rotr(x, n) {
    return x << 32 - n | x >>> n;
  }
  exports.rotr = rotr;
  function isIntegerShim(n) {
    return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
  }
  exports.isInteger = Number.isInteger || isIntegerShim;
  exports.MAX_SAFE_INTEGER = 9007199254740991;
  exports.isSafeInteger = function(n) {
    return exports.isInteger(n) && (n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER);
  };
})(int);
Object.defineProperty(binary, "__esModule", { value: true });
var int_1 = int;
function readInt16BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
}
binary.readInt16BE = readInt16BE;
function readUint16BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
}
binary.readUint16BE = readUint16BE;
function readInt16LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
}
binary.readInt16LE = readInt16LE;
function readUint16LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 1] << 8 | array[offset]) >>> 0;
}
binary.readUint16LE = readUint16LE;
function writeUint16BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(2);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 8;
  out[offset + 1] = value >>> 0;
  return out;
}
binary.writeUint16BE = writeUint16BE;
binary.writeInt16BE = writeUint16BE;
function writeUint16LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(2);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 0;
  out[offset + 1] = value >>> 8;
  return out;
}
binary.writeUint16LE = writeUint16LE;
binary.writeInt16LE = writeUint16LE;
function readInt32BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
}
binary.readInt32BE = readInt32BE;
function readUint32BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
}
binary.readUint32BE = readUint32BE;
function readInt32LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
}
binary.readInt32LE = readInt32LE;
function readUint32LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
}
binary.readUint32LE = readUint32LE;
function writeUint32BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 24;
  out[offset + 1] = value >>> 16;
  out[offset + 2] = value >>> 8;
  out[offset + 3] = value >>> 0;
  return out;
}
binary.writeUint32BE = writeUint32BE;
binary.writeInt32BE = writeUint32BE;
function writeUint32LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  out[offset + 0] = value >>> 0;
  out[offset + 1] = value >>> 8;
  out[offset + 2] = value >>> 16;
  out[offset + 3] = value >>> 24;
  return out;
}
binary.writeUint32LE = writeUint32LE;
binary.writeInt32LE = writeUint32LE;
function readInt64BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var hi = readInt32BE(array, offset);
  var lo = readInt32BE(array, offset + 4);
  return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
}
binary.readInt64BE = readInt64BE;
function readUint64BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var hi = readUint32BE(array, offset);
  var lo = readUint32BE(array, offset + 4);
  return hi * 4294967296 + lo;
}
binary.readUint64BE = readUint64BE;
function readInt64LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var lo = readInt32LE(array, offset);
  var hi = readInt32LE(array, offset + 4);
  return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
}
binary.readInt64LE = readInt64LE;
function readUint64LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var lo = readUint32LE(array, offset);
  var hi = readUint32LE(array, offset + 4);
  return hi * 4294967296 + lo;
}
binary.readUint64LE = readUint64LE;
function writeUint64BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  writeUint32BE(value / 4294967296 >>> 0, out, offset);
  writeUint32BE(value >>> 0, out, offset + 4);
  return out;
}
binary.writeUint64BE = writeUint64BE;
binary.writeInt64BE = writeUint64BE;
function writeUint64LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  writeUint32LE(value >>> 0, out, offset);
  writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
  return out;
}
binary.writeUint64LE = writeUint64LE;
binary.writeInt64LE = writeUint64LE;
function readUintBE(bitLength, array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("readUintBE supports only bitLengths divisible by 8");
  }
  if (bitLength / 8 > array.length - offset) {
    throw new Error("readUintBE: array is too short for the given bitLength");
  }
  var result = 0;
  var mul5 = 1;
  for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
    result += array[i] * mul5;
    mul5 *= 256;
  }
  return result;
}
binary.readUintBE = readUintBE;
function readUintLE(bitLength, array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("readUintLE supports only bitLengths divisible by 8");
  }
  if (bitLength / 8 > array.length - offset) {
    throw new Error("readUintLE: array is too short for the given bitLength");
  }
  var result = 0;
  var mul5 = 1;
  for (var i = offset; i < offset + bitLength / 8; i++) {
    result += array[i] * mul5;
    mul5 *= 256;
  }
  return result;
}
binary.readUintLE = readUintLE;
function writeUintBE(bitLength, value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(bitLength / 8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("writeUintBE supports only bitLengths divisible by 8");
  }
  if (!int_1.isSafeInteger(value)) {
    throw new Error("writeUintBE value must be an integer");
  }
  var div = 1;
  for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
    out[i] = value / div & 255;
    div *= 256;
  }
  return out;
}
binary.writeUintBE = writeUintBE;
function writeUintLE(bitLength, value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(bitLength / 8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (bitLength % 8 !== 0) {
    throw new Error("writeUintLE supports only bitLengths divisible by 8");
  }
  if (!int_1.isSafeInteger(value)) {
    throw new Error("writeUintLE value must be an integer");
  }
  var div = 1;
  for (var i = offset; i < offset + bitLength / 8; i++) {
    out[i] = value / div & 255;
    div *= 256;
  }
  return out;
}
binary.writeUintLE = writeUintLE;
function readFloat32BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat32(offset);
}
binary.readFloat32BE = readFloat32BE;
function readFloat32LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat32(offset, true);
}
binary.readFloat32LE = readFloat32LE;
function readFloat64BE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat64(offset);
}
binary.readFloat64BE = readFloat64BE;
function readFloat64LE(array, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
  return view.getFloat64(offset, true);
}
binary.readFloat64LE = readFloat64LE;
function writeFloat32BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat32(offset, value);
  return out;
}
binary.writeFloat32BE = writeFloat32BE;
function writeFloat32LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(4);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat32(offset, value, true);
  return out;
}
binary.writeFloat32LE = writeFloat32LE;
function writeFloat64BE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat64(offset, value);
  return out;
}
binary.writeFloat64BE = writeFloat64BE;
function writeFloat64LE(value, out, offset) {
  if (out === void 0) {
    out = new Uint8Array(8);
  }
  if (offset === void 0) {
    offset = 0;
  }
  var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
  view.setFloat64(offset, value, true);
  return out;
}
binary.writeFloat64LE = writeFloat64LE;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var system_1 = system;
  var binary_12 = binary;
  var wipe_12 = wipe$1;
  exports.defaultRandomSource = new system_1.SystemRandomSource();
  function randomBytes(length2, prng) {
    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }
    return prng.randomBytes(length2);
  }
  exports.randomBytes = randomBytes;
  function randomUint32(prng) {
    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }
    var buf2 = randomBytes(4, prng);
    var result = binary_12.readUint32LE(buf2);
    wipe_12.wipe(buf2);
    return result;
  }
  exports.randomUint32 = randomUint32;
  var ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function randomString(length2, charset, prng) {
    if (charset === void 0) {
      charset = ALPHANUMERIC;
    }
    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }
    if (charset.length < 2) {
      throw new Error("randomString charset is too short");
    }
    if (charset.length > 256) {
      throw new Error("randomString charset is too long");
    }
    var out = "";
    var charsLen = charset.length;
    var maxByte = 256 - 256 % charsLen;
    while (length2 > 0) {
      var buf2 = randomBytes(Math.ceil(length2 * 256 / maxByte), prng);
      for (var i = 0; i < buf2.length && length2 > 0; i++) {
        var randomByte = buf2[i];
        if (randomByte < maxByte) {
          out += charset.charAt(randomByte % charsLen);
          length2--;
        }
      }
      wipe_12.wipe(buf2);
    }
    return out;
  }
  exports.randomString = randomString;
  function randomStringForEntropy(bits, charset, prng) {
    if (charset === void 0) {
      charset = ALPHANUMERIC;
    }
    if (prng === void 0) {
      prng = exports.defaultRandomSource;
    }
    var length2 = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
    return randomString(length2, charset, prng);
  }
  exports.randomStringForEntropy = randomStringForEntropy;
})(random);
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code$2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code$2.length; i < len; ++i) {
  lookup[i] = code$2[i];
  revLookup[code$2.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1)
    validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
function base$2(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET2.length; i++) {
    var x = ALPHABET2.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET2.length;
  var LEADER = ALPHABET2.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode3(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET2.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode: encode3,
    decodeUnsafe,
    decode: decode2
  };
}
var src$1 = base$2;
const basex = src$1;
const ALPHABET$1 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var bs58 = basex(ALPHABET$1);
var encode_1 = encode$6;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode$6(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$6.bytes = offset - oldOffset + 1;
  return out;
}
var decode$6 = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf2, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode$6,
  encodingLength: length
};
var _brrp_varint = varint;
const decode$5 = (data) => {
  const code2 = _brrp_varint.decode(data);
  return [
    code2,
    _brrp_varint.decode.bytes
  ];
};
const encodeTo = (int2, target, offset = 0) => {
  _brrp_varint.encode(int2, target, offset);
  return target;
};
const encodingLength = (int2) => {
  return _brrp_varint.encodingLength(int2);
};
const equals$1 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const fromString$2 = (str) => new TextEncoder().encode(str);
const toString$2 = (b) => new TextDecoder().decode(b);
const create = (code2, digest10) => {
  const size = digest10.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest10, digestOffset);
  return new Digest(code2, size, digest10, bytes);
};
const decode$4 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode$5(bytes);
  const [size, digestOffset] = decode$5(bytes.subarray(sizeOffset));
  const digest10 = bytes.subarray(sizeOffset + digestOffset);
  if (digest10.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest10, bytes);
};
const equals = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals$1(a.bytes, b.bytes);
  }
};
class Digest {
  constructor(code2, size, digest10, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest10;
    this.bytes = bytes;
  }
}
function base$1(ALPHABET2, name2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET2.length; i++) {
    var x = ALPHABET2.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET2.length;
  var LEADER = ALPHABET2.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode3(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET2.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode3,
    decodeUnsafe,
    decode: decode2
  };
}
var src = base$1;
var _brrp__multiformats_scope_baseX = src;
class Encoder {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text2) {
    if (typeof text2 === "string") {
      if (text2.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text2.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
}
class ComposedDecoder {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$1 = ({ name: name2, prefix, encode: encode3, decode: decode2 }) => new Codec(name2, prefix, encode3, decode2);
const baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode3, decode: decode2 } = _brrp__multiformats_scope_baseX(alphabet2, name2);
  return from$1({
    prefix,
    name: name2,
    encode: encode3,
    decode: (text2) => coerce(decode2(text2))
  });
};
const decode$3 = (string2, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer2 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer2 = buffer2 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer2 >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$5 = (data, alphabet2, bitsPerChar) => {
  const pad3 = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer2 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer2 = buffer2 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer2 >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer2 << bitsPerChar - bits];
  }
  if (pad3) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$1({
    prefix,
    name: name2,
    encode(input) {
      return encode$5(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$3(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc,
  base58flickr
}, Symbol.toStringTag, { value: "Module" }));
const base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32,
  base32upper,
  base32pad,
  base32padupper,
  base32hex,
  base32hexupper,
  base32hexpad,
  base32hexpadupper,
  base32z
}, Symbol.toStringTag, { value: "Module" }));
class CID {
  constructor(version2, code2, multihash, bytes) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly$1,
      version: readonly$1,
      multihash: readonly$1,
      bytes: readonly$1,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest10 } = this.multihash;
        const multihash = create(code2, digest10);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes } = value;
      return new CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest10 = decode$4(multihash);
      return CID.create(version2, code2, digest10);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest10) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new CID(version2, code2, digest10, digest10.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version2, code2, digest10.bytes);
        return new CID(version2, code2, digest10, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest10) {
    return CID.create(0, DAG_PB_CODE, digest10);
  }
  static createV1(code2, digest10) {
    return CID.create(1, code2, digest10);
  }
  static decode(bytes) {
    const [cid, remainder] = CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest10 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID.createV0(digest10) : CID.createV1(specs.codec, digest10);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$5(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [
        base32.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version2, code2, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
const cidSymbol = Symbol.for("@ipld/js-cid/CID");
const readonly$1 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$1 = "0.0.0-dev";
const deprecate = (range, message) => {
  if (range.test(version$1)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size);
  }
  return new Uint8Array(size);
}
function concat$1(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}
const identity$2 = from$1({
  prefix: "\0",
  name: "identity",
  encode: (buf2) => toString$2(buf2),
  decode: (str) => fromString$2(str)
});
const identityBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$2
}, Symbol.toStringTag, { value: "Module" }));
const base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2
}, Symbol.toStringTag, { value: "Module" }));
const base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8
}, Symbol.toStringTag, { value: "Module" }));
const base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10
}, Symbol.toStringTag, { value: "Module" }));
const base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});
const base16$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16,
  base16upper
}, Symbol.toStringTag, { value: "Module" }));
const base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36,
  base36upper
}, Symbol.toStringTag, { value: "Module" }));
const base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64,
  base64pad,
  base64url,
  base64urlpad
}, Symbol.toStringTag, { value: "Module" }));
const alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
const alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode$4(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode$2(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji = from$1({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode$4,
  decode: decode$2
});
const base256emoji$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji
}, Symbol.toStringTag, { value: "Module" }));
const from = ({ name: name2, code: code2, encode: encode3 }) => new Hasher(name2, code2, encode3);
class Hasher {
  constructor(name2, code2, encode3) {
    this.name = name2;
    this.code = code2;
    this.encode = encode3;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest10) => create(this.code, digest10));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
const sha$1 = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
const sha256$1 = from({
  name: "sha2-256",
  code: 18,
  encode: sha$1("SHA-256")
});
const sha512$1 = from({
  name: "sha2-512",
  code: 19,
  encode: sha$1("SHA-512")
});
const sha2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256: sha256$1,
  sha512: sha512$1
}, Symbol.toStringTag, { value: "Module" }));
const code$1 = 0;
const name$2 = "identity";
const encode$3 = coerce;
const digest = (input) => create(code$1, encode$3(input));
const identity = {
  code: code$1,
  name: name$2,
  encode: encode$3,
  digest
};
const identity$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const bases = {
  ...identityBase,
  ...base2$1,
  ...base8$1,
  ...base10$1,
  ...base16$1,
  ...base32$1,
  ...base36$1,
  ...base58,
  ...base64$1,
  ...base256emoji$1
};
({
  ...sha2,
  ...identity$1
});
function createCodec(name2, prefix, encode3, decode2) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode3
    },
    decoder: { decode: decode2 }
  };
}
const string = createCodec("utf8", "u", (buf2) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf2);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf2) => {
  let string2 = "a";
  for (let i = 0; i < buf2.length; i++) {
    string2 += String.fromCharCode(buf2[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf2 = allocUnsafe(str.length);
  for (let i = 0; i < str.length; i++) {
    buf2[i] = str.charCodeAt(i);
  }
  return buf2;
});
const BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
function fromString$1(string2, encoding = "utf8") {
  const base3 = BASES[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
function toString$1(array, encoding = "utf8") {
  const base3 = BASES[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
var sha256 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var binary_12 = binary;
  var wipe_12 = wipe$1;
  exports.DIGEST_LENGTH = 32;
  exports.BLOCK_SIZE = 64;
  var SHA2562 = function() {
    function SHA2563() {
      this.digestLength = exports.DIGEST_LENGTH;
      this.blockSize = exports.BLOCK_SIZE;
      this._state = new Int32Array(8);
      this._temp = new Int32Array(64);
      this._buffer = new Uint8Array(128);
      this._bufferLength = 0;
      this._bytesHashed = 0;
      this._finished = false;
      this.reset();
    }
    SHA2563.prototype._initState = function() {
      this._state[0] = 1779033703;
      this._state[1] = 3144134277;
      this._state[2] = 1013904242;
      this._state[3] = 2773480762;
      this._state[4] = 1359893119;
      this._state[5] = 2600822924;
      this._state[6] = 528734635;
      this._state[7] = 1541459225;
    };
    SHA2563.prototype.reset = function() {
      this._initState();
      this._bufferLength = 0;
      this._bytesHashed = 0;
      this._finished = false;
      return this;
    };
    SHA2563.prototype.clean = function() {
      wipe_12.wipe(this._buffer);
      wipe_12.wipe(this._temp);
      this.reset();
    };
    SHA2563.prototype.update = function(data, dataLength) {
      if (dataLength === void 0) {
        dataLength = data.length;
      }
      if (this._finished) {
        throw new Error("SHA256: can't update because hash was finished.");
      }
      var dataPos = 0;
      this._bytesHashed += dataLength;
      if (this._bufferLength > 0) {
        while (this._bufferLength < this.blockSize && dataLength > 0) {
          this._buffer[this._bufferLength++] = data[dataPos++];
          dataLength--;
        }
        if (this._bufferLength === this.blockSize) {
          hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
          this._bufferLength = 0;
        }
      }
      if (dataLength >= this.blockSize) {
        dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
        dataLength %= this.blockSize;
      }
      while (dataLength > 0) {
        this._buffer[this._bufferLength++] = data[dataPos++];
        dataLength--;
      }
      return this;
    };
    SHA2563.prototype.finish = function(out) {
      if (!this._finished) {
        var bytesHashed = this._bytesHashed;
        var left = this._bufferLength;
        var bitLenHi = bytesHashed / 536870912 | 0;
        var bitLenLo = bytesHashed << 3;
        var padLength = bytesHashed % 64 < 56 ? 64 : 128;
        this._buffer[left] = 128;
        for (var i = left + 1; i < padLength - 8; i++) {
          this._buffer[i] = 0;
        }
        binary_12.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
        binary_12.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
        hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
        this._finished = true;
      }
      for (var i = 0; i < this.digestLength / 4; i++) {
        binary_12.writeUint32BE(this._state[i], out, i * 4);
      }
      return this;
    };
    SHA2563.prototype.digest = function() {
      var out = new Uint8Array(this.digestLength);
      this.finish(out);
      return out;
    };
    SHA2563.prototype.saveState = function() {
      if (this._finished) {
        throw new Error("SHA256: cannot save finished state");
      }
      return {
        state: new Int32Array(this._state),
        buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
        bufferLength: this._bufferLength,
        bytesHashed: this._bytesHashed
      };
    };
    SHA2563.prototype.restoreState = function(savedState) {
      this._state.set(savedState.state);
      this._bufferLength = savedState.bufferLength;
      if (savedState.buffer) {
        this._buffer.set(savedState.buffer);
      }
      this._bytesHashed = savedState.bytesHashed;
      this._finished = false;
      return this;
    };
    SHA2563.prototype.cleanSavedState = function(savedState) {
      wipe_12.wipe(savedState.state);
      if (savedState.buffer) {
        wipe_12.wipe(savedState.buffer);
      }
      savedState.bufferLength = 0;
      savedState.bytesHashed = 0;
    };
    return SHA2563;
  }();
  exports.SHA256 = SHA2562;
  var K2 = new Int32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  function hashBlocks(w, v, p, pos, len) {
    while (len >= 64) {
      var a = v[0];
      var b = v[1];
      var c = v[2];
      var d = v[3];
      var e = v[4];
      var f2 = v[5];
      var g = v[6];
      var h = v[7];
      for (var i = 0; i < 16; i++) {
        var j = pos + i * 4;
        w[i] = binary_12.readUint32BE(p, j);
      }
      for (var i = 16; i < 64; i++) {
        var u = w[i - 2];
        var t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
        u = w[i - 15];
        var t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
        w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
      }
      for (var i = 0; i < 64; i++) {
        var t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f2 ^ ~e & g) | 0) + (h + (K2[i] + w[i] | 0) | 0) | 0;
        var t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
        h = g;
        g = f2;
        f2 = e;
        e = d + t1 | 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 | 0;
      }
      v[0] += a;
      v[1] += b;
      v[2] += c;
      v[3] += d;
      v[4] += e;
      v[5] += f2;
      v[6] += g;
      v[7] += h;
      pos += 64;
      len -= 64;
    }
    return pos;
  }
  function hash3(data) {
    var h = new SHA2562();
    h.update(data);
    var digest10 = h.digest();
    h.clean();
    return digest10;
  }
  exports.hash = hash3;
})(sha256);
var sha3 = { exports: {} };
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
(function(module) {
  (function() {
    var INPUT_ERROR = "input is invalid type";
    var FINALIZE_ERROR = "finalize already called";
    var WINDOW = typeof window === "object";
    var root = WINDOW ? window : {};
    if (root.JS_SHA3_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === "object";
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && true && module.exports;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
    var HEX_CHARS = "0123456789abcdef".split("");
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"];
    var CSHAKE_BYTEPAD = {
      "128": 168,
      "256": 136
    };
    if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
    }
    if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function(obj) {
        return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }
    var createOutputMethod = function(bits2, padding, outputType) {
      return function(message) {
        return new Keccak(bits2, padding, bits2).update(message)[outputType]();
      };
    };
    var createShakeOutputMethod = function(bits2, padding, outputType) {
      return function(message, outputBits) {
        return new Keccak(bits2, padding, outputBits).update(message)[outputType]();
      };
    };
    var createCshakeOutputMethod = function(bits2, padding, outputType) {
      return function(message, outputBits, n, s2) {
        return methods["cshake" + bits2].update(message, outputBits, n, s2)[outputType]();
      };
    };
    var createKmacOutputMethod = function(bits2, padding, outputType) {
      return function(key2, message, outputBits, s2) {
        return methods["kmac" + bits2].update(key2, message, outputBits, s2)[outputType]();
      };
    };
    var createOutputMethods = function(method, createMethod2, bits2, padding) {
      for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
        var type = OUTPUT_TYPES[i2];
        method[type] = createMethod2(bits2, padding, type);
      }
      return method;
    };
    var createMethod = function(bits2, padding) {
      var method = createOutputMethod(bits2, padding, "hex");
      method.create = function() {
        return new Keccak(bits2, padding, bits2);
      };
      method.update = function(message) {
        return method.create().update(message);
      };
      return createOutputMethods(method, createOutputMethod, bits2, padding);
    };
    var createShakeMethod = function(bits2, padding) {
      var method = createShakeOutputMethod(bits2, padding, "hex");
      method.create = function(outputBits) {
        return new Keccak(bits2, padding, outputBits);
      };
      method.update = function(message, outputBits) {
        return method.create(outputBits).update(message);
      };
      return createOutputMethods(method, createShakeOutputMethod, bits2, padding);
    };
    var createCshakeMethod = function(bits2, padding) {
      var w = CSHAKE_BYTEPAD[bits2];
      var method = createCshakeOutputMethod(bits2, padding, "hex");
      method.create = function(outputBits, n, s2) {
        if (!n && !s2) {
          return methods["shake" + bits2].create(outputBits);
        } else {
          return new Keccak(bits2, padding, outputBits).bytepad([n, s2], w);
        }
      };
      method.update = function(message, outputBits, n, s2) {
        return method.create(outputBits, n, s2).update(message);
      };
      return createOutputMethods(method, createCshakeOutputMethod, bits2, padding);
    };
    var createKmacMethod = function(bits2, padding) {
      var w = CSHAKE_BYTEPAD[bits2];
      var method = createKmacOutputMethod(bits2, padding, "hex");
      method.create = function(key2, outputBits, s2) {
        return new Kmac(bits2, padding, outputBits).bytepad(["KMAC", s2], w).bytepad([key2], w);
      };
      method.update = function(key2, message, outputBits, s2) {
        return method.create(key2, outputBits, s2).update(message);
      };
      return createOutputMethods(method, createKmacOutputMethod, bits2, padding);
    };
    var algorithms = [
      { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
      { name: "sha3", padding: PADDING, bits: BITS, createMethod },
      { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
      { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
      { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
    ];
    var methods = {}, methodNames = [];
    for (var i = 0; i < algorithms.length; ++i) {
      var algorithm = algorithms[i];
      var bits = algorithm.bits;
      for (var j = 0; j < bits.length; ++j) {
        var methodName = algorithm.name + "_" + bits[j];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
        if (algorithm.name !== "sha3") {
          var newMethodName = algorithm.name + bits[j];
          methodNames.push(newMethodName);
          methods[newMethodName] = methods[methodName];
        }
      }
    }
    function Keccak(bits2, padding, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding;
      this.outputBits = outputBits;
      this.reset = true;
      this.finalized = false;
      this.block = 0;
      this.start = 0;
      this.blockCount = 1600 - (bits2 << 1) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;
      for (var i2 = 0; i2 < 50; ++i2) {
        this.s[i2] = 0;
      }
    }
    Keccak.prototype.update = function(message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var notString, type = typeof message;
      if (type !== "string") {
        if (type === "object") {
          if (message === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var blocks = this.blocks, byteCount = this.byteCount, length2 = message.length, blockCount = this.blockCount, index = 0, s2 = this.s, i2, code2;
      while (index < length2) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i2 = 1; i2 < blockCount + 1; ++i2) {
            blocks[i2] = 0;
          }
        }
        if (notString) {
          for (i2 = this.start; index < length2 && i2 < byteCount; ++index) {
            blocks[i2 >> 2] |= message[index] << SHIFT[i2++ & 3];
          }
        } else {
          for (i2 = this.start; index < length2 && i2 < byteCount; ++index) {
            code2 = message.charCodeAt(index);
            if (code2 < 128) {
              blocks[i2 >> 2] |= code2 << SHIFT[i2++ & 3];
            } else if (code2 < 2048) {
              blocks[i2 >> 2] |= (192 | code2 >> 6) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code2 & 63) << SHIFT[i2++ & 3];
            } else if (code2 < 55296 || code2 >= 57344) {
              blocks[i2 >> 2] |= (224 | code2 >> 12) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code2 >> 6 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code2 & 63) << SHIFT[i2++ & 3];
            } else {
              code2 = 65536 + ((code2 & 1023) << 10 | message.charCodeAt(++index) & 1023);
              blocks[i2 >> 2] |= (240 | code2 >> 18) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code2 >> 12 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code2 >> 6 & 63) << SHIFT[i2++ & 3];
              blocks[i2 >> 2] |= (128 | code2 & 63) << SHIFT[i2++ & 3];
            }
          }
        }
        this.lastByteIndex = i2;
        if (i2 >= byteCount) {
          this.start = i2 - byteCount;
          this.block = blocks[blockCount];
          for (i2 = 0; i2 < blockCount; ++i2) {
            s2[i2] ^= blocks[i2];
          }
          f2(s2);
          this.reset = true;
        } else {
          this.start = i2;
        }
      }
      return this;
    };
    Keccak.prototype.encode = function(x, right) {
      var o = x & 255, n = 1;
      var bytes = [o];
      x = x >> 8;
      o = x & 255;
      while (o > 0) {
        bytes.unshift(o);
        x = x >> 8;
        o = x & 255;
        ++n;
      }
      if (right) {
        bytes.push(n);
      } else {
        bytes.unshift(n);
      }
      this.update(bytes);
      return bytes.length;
    };
    Keccak.prototype.encodeString = function(str) {
      var notString, type = typeof str;
      if (type !== "string") {
        if (type === "object") {
          if (str === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
            str = new Uint8Array(str);
          } else if (!Array.isArray(str)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var bytes = 0, length2 = str.length;
      if (notString) {
        bytes = length2;
      } else {
        for (var i2 = 0; i2 < str.length; ++i2) {
          var code2 = str.charCodeAt(i2);
          if (code2 < 128) {
            bytes += 1;
          } else if (code2 < 2048) {
            bytes += 2;
          } else if (code2 < 55296 || code2 >= 57344) {
            bytes += 3;
          } else {
            code2 = 65536 + ((code2 & 1023) << 10 | str.charCodeAt(++i2) & 1023);
            bytes += 4;
          }
        }
      }
      bytes += this.encode(bytes * 8);
      this.update(str);
      return bytes;
    };
    Keccak.prototype.bytepad = function(strs, w) {
      var bytes = this.encode(w);
      for (var i2 = 0; i2 < strs.length; ++i2) {
        bytes += this.encodeString(strs[i2]);
      }
      var paddingBytes = w - bytes % w;
      var zeros = [];
      zeros.length = paddingBytes;
      this.update(zeros);
      return this;
    };
    Keccak.prototype.finalize = function() {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s2 = this.s;
      blocks[i2 >> 2] |= this.padding[i2 & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i2 = 1; i2 < blockCount + 1; ++i2) {
          blocks[i2] = 0;
        }
      }
      blocks[blockCount - 1] |= 2147483648;
      for (i2 = 0; i2 < blockCount; ++i2) {
        s2[i2] ^= blocks[i2];
      }
      f2(s2);
    };
    Keccak.prototype.toString = Keccak.prototype.hex = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var hex = "", block;
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          block = s2[i2];
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
        }
        if (j2 % blockCount === 0) {
          f2(s2);
          i2 = 0;
        }
      }
      if (extraBytes) {
        block = s2[i2];
        hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
        if (extraBytes > 1) {
          hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
        }
        if (extraBytes > 2) {
          hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
        }
      }
      return hex;
    };
    Keccak.prototype.arrayBuffer = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var bytes = this.outputBits >> 3;
      var buffer2;
      if (extraBytes) {
        buffer2 = new ArrayBuffer(outputBlocks + 1 << 2);
      } else {
        buffer2 = new ArrayBuffer(bytes);
      }
      var array = new Uint32Array(buffer2);
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          array[j2] = s2[i2];
        }
        if (j2 % blockCount === 0) {
          f2(s2);
        }
      }
      if (extraBytes) {
        array[i2] = s2[i2];
        buffer2 = buffer2.slice(0, bytes);
      }
      return buffer2;
    };
    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
    Keccak.prototype.digest = Keccak.prototype.array = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
      var array = [], offset, block;
      while (j2 < outputBlocks) {
        for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
          offset = j2 << 2;
          block = s2[i2];
          array[offset] = block & 255;
          array[offset + 1] = block >> 8 & 255;
          array[offset + 2] = block >> 16 & 255;
          array[offset + 3] = block >> 24 & 255;
        }
        if (j2 % blockCount === 0) {
          f2(s2);
        }
      }
      if (extraBytes) {
        offset = j2 << 2;
        block = s2[i2];
        array[offset] = block & 255;
        if (extraBytes > 1) {
          array[offset + 1] = block >> 8 & 255;
        }
        if (extraBytes > 2) {
          array[offset + 2] = block >> 16 & 255;
        }
      }
      return array;
    };
    function Kmac(bits2, padding, outputBits) {
      Keccak.call(this, bits2, padding, outputBits);
    }
    Kmac.prototype = new Keccak();
    Kmac.prototype.finalize = function() {
      this.encode(this.outputBits, true);
      return Keccak.prototype.finalize.call(this);
    };
    var f2 = function(s2) {
      var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n = 0; n < 48; n += 2) {
        c0 = s2[0] ^ s2[10] ^ s2[20] ^ s2[30] ^ s2[40];
        c1 = s2[1] ^ s2[11] ^ s2[21] ^ s2[31] ^ s2[41];
        c2 = s2[2] ^ s2[12] ^ s2[22] ^ s2[32] ^ s2[42];
        c3 = s2[3] ^ s2[13] ^ s2[23] ^ s2[33] ^ s2[43];
        c4 = s2[4] ^ s2[14] ^ s2[24] ^ s2[34] ^ s2[44];
        c5 = s2[5] ^ s2[15] ^ s2[25] ^ s2[35] ^ s2[45];
        c6 = s2[6] ^ s2[16] ^ s2[26] ^ s2[36] ^ s2[46];
        c7 = s2[7] ^ s2[17] ^ s2[27] ^ s2[37] ^ s2[47];
        c8 = s2[8] ^ s2[18] ^ s2[28] ^ s2[38] ^ s2[48];
        c9 = s2[9] ^ s2[19] ^ s2[29] ^ s2[39] ^ s2[49];
        h = c8 ^ (c2 << 1 | c3 >>> 31);
        l = c9 ^ (c3 << 1 | c2 >>> 31);
        s2[0] ^= h;
        s2[1] ^= l;
        s2[10] ^= h;
        s2[11] ^= l;
        s2[20] ^= h;
        s2[21] ^= l;
        s2[30] ^= h;
        s2[31] ^= l;
        s2[40] ^= h;
        s2[41] ^= l;
        h = c0 ^ (c4 << 1 | c5 >>> 31);
        l = c1 ^ (c5 << 1 | c4 >>> 31);
        s2[2] ^= h;
        s2[3] ^= l;
        s2[12] ^= h;
        s2[13] ^= l;
        s2[22] ^= h;
        s2[23] ^= l;
        s2[32] ^= h;
        s2[33] ^= l;
        s2[42] ^= h;
        s2[43] ^= l;
        h = c2 ^ (c6 << 1 | c7 >>> 31);
        l = c3 ^ (c7 << 1 | c6 >>> 31);
        s2[4] ^= h;
        s2[5] ^= l;
        s2[14] ^= h;
        s2[15] ^= l;
        s2[24] ^= h;
        s2[25] ^= l;
        s2[34] ^= h;
        s2[35] ^= l;
        s2[44] ^= h;
        s2[45] ^= l;
        h = c4 ^ (c8 << 1 | c9 >>> 31);
        l = c5 ^ (c9 << 1 | c8 >>> 31);
        s2[6] ^= h;
        s2[7] ^= l;
        s2[16] ^= h;
        s2[17] ^= l;
        s2[26] ^= h;
        s2[27] ^= l;
        s2[36] ^= h;
        s2[37] ^= l;
        s2[46] ^= h;
        s2[47] ^= l;
        h = c6 ^ (c0 << 1 | c1 >>> 31);
        l = c7 ^ (c1 << 1 | c0 >>> 31);
        s2[8] ^= h;
        s2[9] ^= l;
        s2[18] ^= h;
        s2[19] ^= l;
        s2[28] ^= h;
        s2[29] ^= l;
        s2[38] ^= h;
        s2[39] ^= l;
        s2[48] ^= h;
        s2[49] ^= l;
        b0 = s2[0];
        b1 = s2[1];
        b32 = s2[11] << 4 | s2[10] >>> 28;
        b33 = s2[10] << 4 | s2[11] >>> 28;
        b14 = s2[20] << 3 | s2[21] >>> 29;
        b15 = s2[21] << 3 | s2[20] >>> 29;
        b46 = s2[31] << 9 | s2[30] >>> 23;
        b47 = s2[30] << 9 | s2[31] >>> 23;
        b28 = s2[40] << 18 | s2[41] >>> 14;
        b29 = s2[41] << 18 | s2[40] >>> 14;
        b20 = s2[2] << 1 | s2[3] >>> 31;
        b21 = s2[3] << 1 | s2[2] >>> 31;
        b2 = s2[13] << 12 | s2[12] >>> 20;
        b3 = s2[12] << 12 | s2[13] >>> 20;
        b34 = s2[22] << 10 | s2[23] >>> 22;
        b35 = s2[23] << 10 | s2[22] >>> 22;
        b16 = s2[33] << 13 | s2[32] >>> 19;
        b17 = s2[32] << 13 | s2[33] >>> 19;
        b48 = s2[42] << 2 | s2[43] >>> 30;
        b49 = s2[43] << 2 | s2[42] >>> 30;
        b40 = s2[5] << 30 | s2[4] >>> 2;
        b41 = s2[4] << 30 | s2[5] >>> 2;
        b22 = s2[14] << 6 | s2[15] >>> 26;
        b23 = s2[15] << 6 | s2[14] >>> 26;
        b4 = s2[25] << 11 | s2[24] >>> 21;
        b5 = s2[24] << 11 | s2[25] >>> 21;
        b36 = s2[34] << 15 | s2[35] >>> 17;
        b37 = s2[35] << 15 | s2[34] >>> 17;
        b18 = s2[45] << 29 | s2[44] >>> 3;
        b19 = s2[44] << 29 | s2[45] >>> 3;
        b10 = s2[6] << 28 | s2[7] >>> 4;
        b11 = s2[7] << 28 | s2[6] >>> 4;
        b42 = s2[17] << 23 | s2[16] >>> 9;
        b43 = s2[16] << 23 | s2[17] >>> 9;
        b24 = s2[26] << 25 | s2[27] >>> 7;
        b25 = s2[27] << 25 | s2[26] >>> 7;
        b6 = s2[36] << 21 | s2[37] >>> 11;
        b7 = s2[37] << 21 | s2[36] >>> 11;
        b38 = s2[47] << 24 | s2[46] >>> 8;
        b39 = s2[46] << 24 | s2[47] >>> 8;
        b30 = s2[8] << 27 | s2[9] >>> 5;
        b31 = s2[9] << 27 | s2[8] >>> 5;
        b12 = s2[18] << 20 | s2[19] >>> 12;
        b13 = s2[19] << 20 | s2[18] >>> 12;
        b44 = s2[29] << 7 | s2[28] >>> 25;
        b45 = s2[28] << 7 | s2[29] >>> 25;
        b26 = s2[38] << 8 | s2[39] >>> 24;
        b27 = s2[39] << 8 | s2[38] >>> 24;
        b8 = s2[48] << 14 | s2[49] >>> 18;
        b9 = s2[49] << 14 | s2[48] >>> 18;
        s2[0] = b0 ^ ~b2 & b4;
        s2[1] = b1 ^ ~b3 & b5;
        s2[10] = b10 ^ ~b12 & b14;
        s2[11] = b11 ^ ~b13 & b15;
        s2[20] = b20 ^ ~b22 & b24;
        s2[21] = b21 ^ ~b23 & b25;
        s2[30] = b30 ^ ~b32 & b34;
        s2[31] = b31 ^ ~b33 & b35;
        s2[40] = b40 ^ ~b42 & b44;
        s2[41] = b41 ^ ~b43 & b45;
        s2[2] = b2 ^ ~b4 & b6;
        s2[3] = b3 ^ ~b5 & b7;
        s2[12] = b12 ^ ~b14 & b16;
        s2[13] = b13 ^ ~b15 & b17;
        s2[22] = b22 ^ ~b24 & b26;
        s2[23] = b23 ^ ~b25 & b27;
        s2[32] = b32 ^ ~b34 & b36;
        s2[33] = b33 ^ ~b35 & b37;
        s2[42] = b42 ^ ~b44 & b46;
        s2[43] = b43 ^ ~b45 & b47;
        s2[4] = b4 ^ ~b6 & b8;
        s2[5] = b5 ^ ~b7 & b9;
        s2[14] = b14 ^ ~b16 & b18;
        s2[15] = b15 ^ ~b17 & b19;
        s2[24] = b24 ^ ~b26 & b28;
        s2[25] = b25 ^ ~b27 & b29;
        s2[34] = b34 ^ ~b36 & b38;
        s2[35] = b35 ^ ~b37 & b39;
        s2[44] = b44 ^ ~b46 & b48;
        s2[45] = b45 ^ ~b47 & b49;
        s2[6] = b6 ^ ~b8 & b0;
        s2[7] = b7 ^ ~b9 & b1;
        s2[16] = b16 ^ ~b18 & b10;
        s2[17] = b17 ^ ~b19 & b11;
        s2[26] = b26 ^ ~b28 & b20;
        s2[27] = b27 ^ ~b29 & b21;
        s2[36] = b36 ^ ~b38 & b30;
        s2[37] = b37 ^ ~b39 & b31;
        s2[46] = b46 ^ ~b48 & b40;
        s2[47] = b47 ^ ~b49 & b41;
        s2[8] = b8 ^ ~b0 & b2;
        s2[9] = b9 ^ ~b1 & b3;
        s2[18] = b18 ^ ~b10 & b12;
        s2[19] = b19 ^ ~b11 & b13;
        s2[28] = b28 ^ ~b20 & b22;
        s2[29] = b29 ^ ~b21 & b23;
        s2[38] = b38 ^ ~b30 & b32;
        s2[39] = b39 ^ ~b31 & b33;
        s2[48] = b48 ^ ~b40 & b42;
        s2[49] = b49 ^ ~b41 & b43;
        s2[0] ^= RC[n];
        s2[1] ^= RC[n + 1];
      }
    };
    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (i = 0; i < methodNames.length; ++i) {
        root[methodNames[i]] = methods[methodNames[i]];
      }
    }
  })();
})(sha3);
var elliptic = {};
const name$1 = "elliptic";
const version = "6.5.4";
const description = "EC cryptography";
const main = "lib/elliptic.js";
const files = [
  "lib"
];
const scripts = {
  lint: "eslint lib test",
  "lint:fix": "npm run lint -- --fix",
  unit: "istanbul test _mocha --reporter=spec test/index.js",
  test: "npm run lint && npm run unit",
  version: "grunt dist && git add dist/"
};
const repository = {
  type: "git",
  url: "git@github.com:indutny/elliptic"
};
const keywords = [
  "EC",
  "Elliptic",
  "curve",
  "Cryptography"
];
const author = "Fedor Indutny <fedor@indutny.com>";
const license = "MIT";
const bugs = {
  url: "https://github.com/indutny/elliptic/issues"
};
const homepage = "https://github.com/indutny/elliptic";
const devDependencies = {
  brfs: "^2.0.2",
  coveralls: "^3.1.0",
  eslint: "^7.6.0",
  grunt: "^1.2.1",
  "grunt-browserify": "^5.3.0",
  "grunt-cli": "^1.3.2",
  "grunt-contrib-connect": "^3.0.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^5.0.0",
  "grunt-mocha-istanbul": "^5.0.2",
  "grunt-saucelabs": "^9.0.1",
  istanbul: "^0.4.5",
  mocha: "^8.0.1"
};
const dependencies = {
  "bn.js": "^4.11.9",
  brorand: "^1.1.0",
  "hash.js": "^1.0.0",
  "hmac-drbg": "^1.0.1",
  inherits: "^2.0.4",
  "minimalistic-assert": "^1.0.1",
  "minimalistic-crypto-utils": "^1.0.1"
};
const require$$0 = {
  name: name$1,
  version,
  description,
  main,
  files,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  dependencies
};
var utils$m = {};
var bn = { exports: {} };
(function(module) {
  (function(module2, exports) {
    function assert2(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    function inherits2(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
    function BN2(number, base3, endian) {
      if (BN2.isBN(number)) {
        return number;
      }
      this.negative = 0;
      this.words = null;
      this.length = 0;
      this.red = null;
      if (number !== null) {
        if (base3 === "le" || base3 === "be") {
          endian = base3;
          base3 = 10;
        }
        this._init(number || 0, base3 || 10, endian || "be");
      }
    }
    if (typeof module2 === "object") {
      module2.exports = BN2;
    } else {
      exports.BN = BN2;
    }
    BN2.BN = BN2;
    BN2.wordSize = 26;
    var Buffer;
    try {
      if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
        Buffer = window.Buffer;
      } else {
        Buffer = require$$0$1.Buffer;
      }
    } catch (e) {
    }
    BN2.isBN = function isBN(num) {
      if (num instanceof BN2) {
        return true;
      }
      return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
    };
    BN2.max = function max(left, right) {
      if (left.cmp(right) > 0)
        return left;
      return right;
    };
    BN2.min = function min(left, right) {
      if (left.cmp(right) < 0)
        return left;
      return right;
    };
    BN2.prototype._init = function init4(number, base3, endian) {
      if (typeof number === "number") {
        return this._initNumber(number, base3, endian);
      }
      if (typeof number === "object") {
        return this._initArray(number, base3, endian);
      }
      if (base3 === "hex") {
        base3 = 16;
      }
      assert2(base3 === (base3 | 0) && base3 >= 2 && base3 <= 36);
      number = number.toString().replace(/\s+/g, "");
      var start = 0;
      if (number[0] === "-") {
        start++;
        this.negative = 1;
      }
      if (start < number.length) {
        if (base3 === 16) {
          this._parseHex(number, start, endian);
        } else {
          this._parseBase(number, base3, start);
          if (endian === "le") {
            this._initArray(this.toArray(), base3, endian);
          }
        }
      }
    };
    BN2.prototype._initNumber = function _initNumber(number, base3, endian) {
      if (number < 0) {
        this.negative = 1;
        number = -number;
      }
      if (number < 67108864) {
        this.words = [number & 67108863];
        this.length = 1;
      } else if (number < 4503599627370496) {
        this.words = [
          number & 67108863,
          number / 67108864 & 67108863
        ];
        this.length = 2;
      } else {
        assert2(number < 9007199254740992);
        this.words = [
          number & 67108863,
          number / 67108864 & 67108863,
          1
        ];
        this.length = 3;
      }
      if (endian !== "le")
        return;
      this._initArray(this.toArray(), base3, endian);
    };
    BN2.prototype._initArray = function _initArray(number, base3, endian) {
      assert2(typeof number.length === "number");
      if (number.length <= 0) {
        this.words = [0];
        this.length = 1;
        return this;
      }
      this.length = Math.ceil(number.length / 3);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }
      var j, w;
      var off = 0;
      if (endian === "be") {
        for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
          w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] = w >>> 26 - off & 67108863;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      } else if (endian === "le") {
        for (i = 0, j = 0; i < number.length; i += 3) {
          w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
          this.words[j] |= w << off & 67108863;
          this.words[j + 1] = w >>> 26 - off & 67108863;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      }
      return this.strip();
    };
    function parseHex4Bits(string2, index) {
      var c = string2.charCodeAt(index);
      if (c >= 65 && c <= 70) {
        return c - 55;
      } else if (c >= 97 && c <= 102) {
        return c - 87;
      } else {
        return c - 48 & 15;
      }
    }
    function parseHexByte(string2, lowerBound, index) {
      var r2 = parseHex4Bits(string2, index);
      if (index - 1 >= lowerBound) {
        r2 |= parseHex4Bits(string2, index - 1) << 4;
      }
      return r2;
    }
    BN2.prototype._parseHex = function _parseHex(number, start, endian) {
      this.length = Math.ceil((number.length - start) / 6);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }
      var off = 0;
      var j = 0;
      var w;
      if (endian === "be") {
        for (i = number.length - 1; i >= start; i -= 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 67108863;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      } else {
        var parseLength = number.length - start;
        for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 67108863;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      }
      this.strip();
    };
    function parseBase(str, start, end, mul5) {
      var r2 = 0;
      var len = Math.min(str.length, end);
      for (var i = start; i < len; i++) {
        var c = str.charCodeAt(i) - 48;
        r2 *= mul5;
        if (c >= 49) {
          r2 += c - 49 + 10;
        } else if (c >= 17) {
          r2 += c - 17 + 10;
        } else {
          r2 += c;
        }
      }
      return r2;
    }
    BN2.prototype._parseBase = function _parseBase(number, base3, start) {
      this.words = [0];
      this.length = 1;
      for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base3) {
        limbLen++;
      }
      limbLen--;
      limbPow = limbPow / base3 | 0;
      var total = number.length - start;
      var mod = total % limbLen;
      var end = Math.min(total, total - mod) + start;
      var word = 0;
      for (var i = start; i < end; i += limbLen) {
        word = parseBase(number, i, i + limbLen, base3);
        this.imuln(limbPow);
        if (this.words[0] + word < 67108864) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }
      if (mod !== 0) {
        var pow = 1;
        word = parseBase(number, i, number.length, base3);
        for (i = 0; i < mod; i++) {
          pow *= base3;
        }
        this.imuln(pow);
        if (this.words[0] + word < 67108864) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }
      this.strip();
    };
    BN2.prototype.copy = function copy(dest) {
      dest.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        dest.words[i] = this.words[i];
      }
      dest.length = this.length;
      dest.negative = this.negative;
      dest.red = this.red;
    };
    BN2.prototype.clone = function clone() {
      var r2 = new BN2(null);
      this.copy(r2);
      return r2;
    };
    BN2.prototype._expand = function _expand(size) {
      while (this.length < size) {
        this.words[this.length++] = 0;
      }
      return this;
    };
    BN2.prototype.strip = function strip() {
      while (this.length > 1 && this.words[this.length - 1] === 0) {
        this.length--;
      }
      return this._normSign();
    };
    BN2.prototype._normSign = function _normSign() {
      if (this.length === 1 && this.words[0] === 0) {
        this.negative = 0;
      }
      return this;
    };
    BN2.prototype.inspect = function inspect6() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var zeros = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ];
    var groupSizes = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ];
    var groupBases = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    BN2.prototype.toString = function toString2(base3, padding) {
      base3 = base3 || 10;
      padding = padding | 0 || 1;
      var out;
      if (base3 === 16 || base3 === "hex") {
        out = "";
        var off = 0;
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = this.words[i];
          var word = ((w << off | carry) & 16777215).toString(16);
          carry = w >>> 24 - off & 16777215;
          if (carry !== 0 || i !== this.length - 1) {
            out = zeros[6 - word.length] + word + out;
          } else {
            out = word + out;
          }
          off += 2;
          if (off >= 26) {
            off -= 26;
            i--;
          }
        }
        if (carry !== 0) {
          out = carry.toString(16) + out;
        }
        while (out.length % padding !== 0) {
          out = "0" + out;
        }
        if (this.negative !== 0) {
          out = "-" + out;
        }
        return out;
      }
      if (base3 === (base3 | 0) && base3 >= 2 && base3 <= 36) {
        var groupSize = groupSizes[base3];
        var groupBase = groupBases[base3];
        out = "";
        var c = this.clone();
        c.negative = 0;
        while (!c.isZero()) {
          var r2 = c.modn(groupBase).toString(base3);
          c = c.idivn(groupBase);
          if (!c.isZero()) {
            out = zeros[groupSize - r2.length] + r2 + out;
          } else {
            out = r2 + out;
          }
        }
        if (this.isZero()) {
          out = "0" + out;
        }
        while (out.length % padding !== 0) {
          out = "0" + out;
        }
        if (this.negative !== 0) {
          out = "-" + out;
        }
        return out;
      }
      assert2(false, "Base should be between 2 and 36");
    };
    BN2.prototype.toNumber = function toNumber() {
      var ret = this.words[0];
      if (this.length === 2) {
        ret += this.words[1] * 67108864;
      } else if (this.length === 3 && this.words[2] === 1) {
        ret += 4503599627370496 + this.words[1] * 67108864;
      } else if (this.length > 2) {
        assert2(false, "Number can only safely store up to 53 bits");
      }
      return this.negative !== 0 ? -ret : ret;
    };
    BN2.prototype.toJSON = function toJSON2() {
      return this.toString(16);
    };
    BN2.prototype.toBuffer = function toBuffer(endian, length2) {
      assert2(typeof Buffer !== "undefined");
      return this.toArrayLike(Buffer, endian, length2);
    };
    BN2.prototype.toArray = function toArray2(endian, length2) {
      return this.toArrayLike(Array, endian, length2);
    };
    BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length2) {
      var byteLength2 = this.byteLength();
      var reqLength = length2 || Math.max(1, byteLength2);
      assert2(byteLength2 <= reqLength, "byte array longer than desired length");
      assert2(reqLength > 0, "Requested array length <= 0");
      this.strip();
      var littleEndian = endian === "le";
      var res = new ArrayType(reqLength);
      var b, i;
      var q = this.clone();
      if (!littleEndian) {
        for (i = 0; i < reqLength - byteLength2; i++) {
          res[i] = 0;
        }
        for (i = 0; !q.isZero(); i++) {
          b = q.andln(255);
          q.iushrn(8);
          res[reqLength - i - 1] = b;
        }
      } else {
        for (i = 0; !q.isZero(); i++) {
          b = q.andln(255);
          q.iushrn(8);
          res[i] = b;
        }
        for (; i < reqLength; i++) {
          res[i] = 0;
        }
      }
      return res;
    };
    if (Math.clz32) {
      BN2.prototype._countBits = function _countBits(w) {
        return 32 - Math.clz32(w);
      };
    } else {
      BN2.prototype._countBits = function _countBits(w) {
        var t = w;
        var r2 = 0;
        if (t >= 4096) {
          r2 += 13;
          t >>>= 13;
        }
        if (t >= 64) {
          r2 += 7;
          t >>>= 7;
        }
        if (t >= 8) {
          r2 += 4;
          t >>>= 4;
        }
        if (t >= 2) {
          r2 += 2;
          t >>>= 2;
        }
        return r2 + t;
      };
    }
    BN2.prototype._zeroBits = function _zeroBits(w) {
      if (w === 0)
        return 26;
      var t = w;
      var r2 = 0;
      if ((t & 8191) === 0) {
        r2 += 13;
        t >>>= 13;
      }
      if ((t & 127) === 0) {
        r2 += 7;
        t >>>= 7;
      }
      if ((t & 15) === 0) {
        r2 += 4;
        t >>>= 4;
      }
      if ((t & 3) === 0) {
        r2 += 2;
        t >>>= 2;
      }
      if ((t & 1) === 0) {
        r2++;
      }
      return r2;
    };
    BN2.prototype.bitLength = function bitLength() {
      var w = this.words[this.length - 1];
      var hi = this._countBits(w);
      return (this.length - 1) * 26 + hi;
    };
    function toBitArray(num) {
      var w = new Array(num.bitLength());
      for (var bit = 0; bit < w.length; bit++) {
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
      }
      return w;
    }
    BN2.prototype.zeroBits = function zeroBits() {
      if (this.isZero())
        return 0;
      var r2 = 0;
      for (var i = 0; i < this.length; i++) {
        var b = this._zeroBits(this.words[i]);
        r2 += b;
        if (b !== 26)
          break;
      }
      return r2;
    };
    BN2.prototype.byteLength = function byteLength2() {
      return Math.ceil(this.bitLength() / 8);
    };
    BN2.prototype.toTwos = function toTwos(width) {
      if (this.negative !== 0) {
        return this.abs().inotn(width).iaddn(1);
      }
      return this.clone();
    };
    BN2.prototype.fromTwos = function fromTwos(width) {
      if (this.testn(width - 1)) {
        return this.notn(width).iaddn(1).ineg();
      }
      return this.clone();
    };
    BN2.prototype.isNeg = function isNeg() {
      return this.negative !== 0;
    };
    BN2.prototype.neg = function neg4() {
      return this.clone().ineg();
    };
    BN2.prototype.ineg = function ineg() {
      if (!this.isZero()) {
        this.negative ^= 1;
      }
      return this;
    };
    BN2.prototype.iuor = function iuor(num) {
      while (this.length < num.length) {
        this.words[this.length++] = 0;
      }
      for (var i = 0; i < num.length; i++) {
        this.words[i] = this.words[i] | num.words[i];
      }
      return this.strip();
    };
    BN2.prototype.ior = function ior(num) {
      assert2((this.negative | num.negative) === 0);
      return this.iuor(num);
    };
    BN2.prototype.or = function or2(num) {
      if (this.length > num.length)
        return this.clone().ior(num);
      return num.clone().ior(this);
    };
    BN2.prototype.uor = function uor(num) {
      if (this.length > num.length)
        return this.clone().iuor(num);
      return num.clone().iuor(this);
    };
    BN2.prototype.iuand = function iuand(num) {
      var b;
      if (this.length > num.length) {
        b = num;
      } else {
        b = this;
      }
      for (var i = 0; i < b.length; i++) {
        this.words[i] = this.words[i] & num.words[i];
      }
      this.length = b.length;
      return this.strip();
    };
    BN2.prototype.iand = function iand(num) {
      assert2((this.negative | num.negative) === 0);
      return this.iuand(num);
    };
    BN2.prototype.and = function and(num) {
      if (this.length > num.length)
        return this.clone().iand(num);
      return num.clone().iand(this);
    };
    BN2.prototype.uand = function uand(num) {
      if (this.length > num.length)
        return this.clone().iuand(num);
      return num.clone().iuand(this);
    };
    BN2.prototype.iuxor = function iuxor(num) {
      var a;
      var b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      for (var i = 0; i < b.length; i++) {
        this.words[i] = a.words[i] ^ b.words[i];
      }
      if (this !== a) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      this.length = a.length;
      return this.strip();
    };
    BN2.prototype.ixor = function ixor(num) {
      assert2((this.negative | num.negative) === 0);
      return this.iuxor(num);
    };
    BN2.prototype.xor = function xor(num) {
      if (this.length > num.length)
        return this.clone().ixor(num);
      return num.clone().ixor(this);
    };
    BN2.prototype.uxor = function uxor(num) {
      if (this.length > num.length)
        return this.clone().iuxor(num);
      return num.clone().iuxor(this);
    };
    BN2.prototype.inotn = function inotn(width) {
      assert2(typeof width === "number" && width >= 0);
      var bytesNeeded = Math.ceil(width / 26) | 0;
      var bitsLeft = width % 26;
      this._expand(bytesNeeded);
      if (bitsLeft > 0) {
        bytesNeeded--;
      }
      for (var i = 0; i < bytesNeeded; i++) {
        this.words[i] = ~this.words[i] & 67108863;
      }
      if (bitsLeft > 0) {
        this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
      }
      return this.strip();
    };
    BN2.prototype.notn = function notn(width) {
      return this.clone().inotn(width);
    };
    BN2.prototype.setn = function setn(bit, val) {
      assert2(typeof bit === "number" && bit >= 0);
      var off = bit / 26 | 0;
      var wbit = bit % 26;
      this._expand(off + 1);
      if (val) {
        this.words[off] = this.words[off] | 1 << wbit;
      } else {
        this.words[off] = this.words[off] & ~(1 << wbit);
      }
      return this.strip();
    };
    BN2.prototype.iadd = function iadd(num) {
      var r2;
      if (this.negative !== 0 && num.negative === 0) {
        this.negative = 0;
        r2 = this.isub(num);
        this.negative ^= 1;
        return this._normSign();
      } else if (this.negative === 0 && num.negative !== 0) {
        num.negative = 0;
        r2 = this.isub(num);
        num.negative = 1;
        return r2._normSign();
      }
      var a, b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r2 = (a.words[i] | 0) + (b.words[i] | 0) + carry;
        this.words[i] = r2 & 67108863;
        carry = r2 >>> 26;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r2 = (a.words[i] | 0) + carry;
        this.words[i] = r2 & 67108863;
        carry = r2 >>> 26;
      }
      this.length = a.length;
      if (carry !== 0) {
        this.words[this.length] = carry;
        this.length++;
      } else if (a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      return this;
    };
    BN2.prototype.add = function add5(num) {
      var res;
      if (num.negative !== 0 && this.negative === 0) {
        num.negative = 0;
        res = this.sub(num);
        num.negative ^= 1;
        return res;
      } else if (num.negative === 0 && this.negative !== 0) {
        this.negative = 0;
        res = num.sub(this);
        this.negative = 1;
        return res;
      }
      if (this.length > num.length)
        return this.clone().iadd(num);
      return num.clone().iadd(this);
    };
    BN2.prototype.isub = function isub(num) {
      if (num.negative !== 0) {
        num.negative = 0;
        var r2 = this.iadd(num);
        num.negative = 1;
        return r2._normSign();
      } else if (this.negative !== 0) {
        this.negative = 0;
        this.iadd(num);
        this.negative = 1;
        return this._normSign();
      }
      var cmp = this.cmp(num);
      if (cmp === 0) {
        this.negative = 0;
        this.length = 1;
        this.words[0] = 0;
        return this;
      }
      var a, b;
      if (cmp > 0) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }
      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r2 = (a.words[i] | 0) - (b.words[i] | 0) + carry;
        carry = r2 >> 26;
        this.words[i] = r2 & 67108863;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r2 = (a.words[i] | 0) + carry;
        carry = r2 >> 26;
        this.words[i] = r2 & 67108863;
      }
      if (carry === 0 && i < a.length && a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }
      this.length = Math.max(this.length, i);
      if (a !== this) {
        this.negative = 1;
      }
      return this.strip();
    };
    BN2.prototype.sub = function sub(num) {
      return this.clone().isub(num);
    };
    function smallMulTo(self2, num, out) {
      out.negative = num.negative ^ self2.negative;
      var len = self2.length + num.length | 0;
      out.length = len;
      len = len - 1 | 0;
      var a = self2.words[0] | 0;
      var b = num.words[0] | 0;
      var r2 = a * b;
      var lo = r2 & 67108863;
      var carry = r2 / 67108864 | 0;
      out.words[0] = lo;
      for (var k = 1; k < len; k++) {
        var ncarry = carry >>> 26;
        var rword = carry & 67108863;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
          var i = k - j | 0;
          a = self2.words[i] | 0;
          b = num.words[j] | 0;
          r2 = a * b + rword;
          ncarry += r2 / 67108864 | 0;
          rword = r2 & 67108863;
        }
        out.words[k] = rword | 0;
        carry = ncarry | 0;
      }
      if (carry !== 0) {
        out.words[k] = carry | 0;
      } else {
        out.length--;
      }
      return out.strip();
    }
    var comb10MulTo = function comb10MulTo2(self2, num, out) {
      var a = self2.words;
      var b = num.words;
      var o = out.words;
      var c = 0;
      var lo;
      var mid;
      var hi;
      var a0 = a[0] | 0;
      var al0 = a0 & 8191;
      var ah0 = a0 >>> 13;
      var a1 = a[1] | 0;
      var al1 = a1 & 8191;
      var ah1 = a1 >>> 13;
      var a2 = a[2] | 0;
      var al2 = a2 & 8191;
      var ah2 = a2 >>> 13;
      var a3 = a[3] | 0;
      var al3 = a3 & 8191;
      var ah3 = a3 >>> 13;
      var a4 = a[4] | 0;
      var al4 = a4 & 8191;
      var ah4 = a4 >>> 13;
      var a5 = a[5] | 0;
      var al5 = a5 & 8191;
      var ah5 = a5 >>> 13;
      var a6 = a[6] | 0;
      var al6 = a6 & 8191;
      var ah6 = a6 >>> 13;
      var a7 = a[7] | 0;
      var al7 = a7 & 8191;
      var ah7 = a7 >>> 13;
      var a8 = a[8] | 0;
      var al8 = a8 & 8191;
      var ah8 = a8 >>> 13;
      var a9 = a[9] | 0;
      var al9 = a9 & 8191;
      var ah9 = a9 >>> 13;
      var b0 = b[0] | 0;
      var bl0 = b0 & 8191;
      var bh0 = b0 >>> 13;
      var b1 = b[1] | 0;
      var bl1 = b1 & 8191;
      var bh1 = b1 >>> 13;
      var b2 = b[2] | 0;
      var bl2 = b2 & 8191;
      var bh2 = b2 >>> 13;
      var b3 = b[3] | 0;
      var bl3 = b3 & 8191;
      var bh3 = b3 >>> 13;
      var b4 = b[4] | 0;
      var bl4 = b4 & 8191;
      var bh4 = b4 >>> 13;
      var b5 = b[5] | 0;
      var bl5 = b5 & 8191;
      var bh5 = b5 >>> 13;
      var b6 = b[6] | 0;
      var bl6 = b6 & 8191;
      var bh6 = b6 >>> 13;
      var b7 = b[7] | 0;
      var bl7 = b7 & 8191;
      var bh7 = b7 >>> 13;
      var b8 = b[8] | 0;
      var bl8 = b8 & 8191;
      var bh8 = b8 >>> 13;
      var b9 = b[9] | 0;
      var bl9 = b9 & 8191;
      var bh9 = b9 >>> 13;
      out.negative = self2.negative ^ num.negative;
      out.length = 19;
      lo = Math.imul(al0, bl0);
      mid = Math.imul(al0, bh0);
      mid = mid + Math.imul(ah0, bl0) | 0;
      hi = Math.imul(ah0, bh0);
      var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
      w0 &= 67108863;
      lo = Math.imul(al1, bl0);
      mid = Math.imul(al1, bh0);
      mid = mid + Math.imul(ah1, bl0) | 0;
      hi = Math.imul(ah1, bh0);
      lo = lo + Math.imul(al0, bl1) | 0;
      mid = mid + Math.imul(al0, bh1) | 0;
      mid = mid + Math.imul(ah0, bl1) | 0;
      hi = hi + Math.imul(ah0, bh1) | 0;
      var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
      w1 &= 67108863;
      lo = Math.imul(al2, bl0);
      mid = Math.imul(al2, bh0);
      mid = mid + Math.imul(ah2, bl0) | 0;
      hi = Math.imul(ah2, bh0);
      lo = lo + Math.imul(al1, bl1) | 0;
      mid = mid + Math.imul(al1, bh1) | 0;
      mid = mid + Math.imul(ah1, bl1) | 0;
      hi = hi + Math.imul(ah1, bh1) | 0;
      lo = lo + Math.imul(al0, bl2) | 0;
      mid = mid + Math.imul(al0, bh2) | 0;
      mid = mid + Math.imul(ah0, bl2) | 0;
      hi = hi + Math.imul(ah0, bh2) | 0;
      var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
      w2 &= 67108863;
      lo = Math.imul(al3, bl0);
      mid = Math.imul(al3, bh0);
      mid = mid + Math.imul(ah3, bl0) | 0;
      hi = Math.imul(ah3, bh0);
      lo = lo + Math.imul(al2, bl1) | 0;
      mid = mid + Math.imul(al2, bh1) | 0;
      mid = mid + Math.imul(ah2, bl1) | 0;
      hi = hi + Math.imul(ah2, bh1) | 0;
      lo = lo + Math.imul(al1, bl2) | 0;
      mid = mid + Math.imul(al1, bh2) | 0;
      mid = mid + Math.imul(ah1, bl2) | 0;
      hi = hi + Math.imul(ah1, bh2) | 0;
      lo = lo + Math.imul(al0, bl3) | 0;
      mid = mid + Math.imul(al0, bh3) | 0;
      mid = mid + Math.imul(ah0, bl3) | 0;
      hi = hi + Math.imul(ah0, bh3) | 0;
      var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
      w3 &= 67108863;
      lo = Math.imul(al4, bl0);
      mid = Math.imul(al4, bh0);
      mid = mid + Math.imul(ah4, bl0) | 0;
      hi = Math.imul(ah4, bh0);
      lo = lo + Math.imul(al3, bl1) | 0;
      mid = mid + Math.imul(al3, bh1) | 0;
      mid = mid + Math.imul(ah3, bl1) | 0;
      hi = hi + Math.imul(ah3, bh1) | 0;
      lo = lo + Math.imul(al2, bl2) | 0;
      mid = mid + Math.imul(al2, bh2) | 0;
      mid = mid + Math.imul(ah2, bl2) | 0;
      hi = hi + Math.imul(ah2, bh2) | 0;
      lo = lo + Math.imul(al1, bl3) | 0;
      mid = mid + Math.imul(al1, bh3) | 0;
      mid = mid + Math.imul(ah1, bl3) | 0;
      hi = hi + Math.imul(ah1, bh3) | 0;
      lo = lo + Math.imul(al0, bl4) | 0;
      mid = mid + Math.imul(al0, bh4) | 0;
      mid = mid + Math.imul(ah0, bl4) | 0;
      hi = hi + Math.imul(ah0, bh4) | 0;
      var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
      w4 &= 67108863;
      lo = Math.imul(al5, bl0);
      mid = Math.imul(al5, bh0);
      mid = mid + Math.imul(ah5, bl0) | 0;
      hi = Math.imul(ah5, bh0);
      lo = lo + Math.imul(al4, bl1) | 0;
      mid = mid + Math.imul(al4, bh1) | 0;
      mid = mid + Math.imul(ah4, bl1) | 0;
      hi = hi + Math.imul(ah4, bh1) | 0;
      lo = lo + Math.imul(al3, bl2) | 0;
      mid = mid + Math.imul(al3, bh2) | 0;
      mid = mid + Math.imul(ah3, bl2) | 0;
      hi = hi + Math.imul(ah3, bh2) | 0;
      lo = lo + Math.imul(al2, bl3) | 0;
      mid = mid + Math.imul(al2, bh3) | 0;
      mid = mid + Math.imul(ah2, bl3) | 0;
      hi = hi + Math.imul(ah2, bh3) | 0;
      lo = lo + Math.imul(al1, bl4) | 0;
      mid = mid + Math.imul(al1, bh4) | 0;
      mid = mid + Math.imul(ah1, bl4) | 0;
      hi = hi + Math.imul(ah1, bh4) | 0;
      lo = lo + Math.imul(al0, bl5) | 0;
      mid = mid + Math.imul(al0, bh5) | 0;
      mid = mid + Math.imul(ah0, bl5) | 0;
      hi = hi + Math.imul(ah0, bh5) | 0;
      var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
      w5 &= 67108863;
      lo = Math.imul(al6, bl0);
      mid = Math.imul(al6, bh0);
      mid = mid + Math.imul(ah6, bl0) | 0;
      hi = Math.imul(ah6, bh0);
      lo = lo + Math.imul(al5, bl1) | 0;
      mid = mid + Math.imul(al5, bh1) | 0;
      mid = mid + Math.imul(ah5, bl1) | 0;
      hi = hi + Math.imul(ah5, bh1) | 0;
      lo = lo + Math.imul(al4, bl2) | 0;
      mid = mid + Math.imul(al4, bh2) | 0;
      mid = mid + Math.imul(ah4, bl2) | 0;
      hi = hi + Math.imul(ah4, bh2) | 0;
      lo = lo + Math.imul(al3, bl3) | 0;
      mid = mid + Math.imul(al3, bh3) | 0;
      mid = mid + Math.imul(ah3, bl3) | 0;
      hi = hi + Math.imul(ah3, bh3) | 0;
      lo = lo + Math.imul(al2, bl4) | 0;
      mid = mid + Math.imul(al2, bh4) | 0;
      mid = mid + Math.imul(ah2, bl4) | 0;
      hi = hi + Math.imul(ah2, bh4) | 0;
      lo = lo + Math.imul(al1, bl5) | 0;
      mid = mid + Math.imul(al1, bh5) | 0;
      mid = mid + Math.imul(ah1, bl5) | 0;
      hi = hi + Math.imul(ah1, bh5) | 0;
      lo = lo + Math.imul(al0, bl6) | 0;
      mid = mid + Math.imul(al0, bh6) | 0;
      mid = mid + Math.imul(ah0, bl6) | 0;
      hi = hi + Math.imul(ah0, bh6) | 0;
      var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
      w6 &= 67108863;
      lo = Math.imul(al7, bl0);
      mid = Math.imul(al7, bh0);
      mid = mid + Math.imul(ah7, bl0) | 0;
      hi = Math.imul(ah7, bh0);
      lo = lo + Math.imul(al6, bl1) | 0;
      mid = mid + Math.imul(al6, bh1) | 0;
      mid = mid + Math.imul(ah6, bl1) | 0;
      hi = hi + Math.imul(ah6, bh1) | 0;
      lo = lo + Math.imul(al5, bl2) | 0;
      mid = mid + Math.imul(al5, bh2) | 0;
      mid = mid + Math.imul(ah5, bl2) | 0;
      hi = hi + Math.imul(ah5, bh2) | 0;
      lo = lo + Math.imul(al4, bl3) | 0;
      mid = mid + Math.imul(al4, bh3) | 0;
      mid = mid + Math.imul(ah4, bl3) | 0;
      hi = hi + Math.imul(ah4, bh3) | 0;
      lo = lo + Math.imul(al3, bl4) | 0;
      mid = mid + Math.imul(al3, bh4) | 0;
      mid = mid + Math.imul(ah3, bl4) | 0;
      hi = hi + Math.imul(ah3, bh4) | 0;
      lo = lo + Math.imul(al2, bl5) | 0;
      mid = mid + Math.imul(al2, bh5) | 0;
      mid = mid + Math.imul(ah2, bl5) | 0;
      hi = hi + Math.imul(ah2, bh5) | 0;
      lo = lo + Math.imul(al1, bl6) | 0;
      mid = mid + Math.imul(al1, bh6) | 0;
      mid = mid + Math.imul(ah1, bl6) | 0;
      hi = hi + Math.imul(ah1, bh6) | 0;
      lo = lo + Math.imul(al0, bl7) | 0;
      mid = mid + Math.imul(al0, bh7) | 0;
      mid = mid + Math.imul(ah0, bl7) | 0;
      hi = hi + Math.imul(ah0, bh7) | 0;
      var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
      w7 &= 67108863;
      lo = Math.imul(al8, bl0);
      mid = Math.imul(al8, bh0);
      mid = mid + Math.imul(ah8, bl0) | 0;
      hi = Math.imul(ah8, bh0);
      lo = lo + Math.imul(al7, bl1) | 0;
      mid = mid + Math.imul(al7, bh1) | 0;
      mid = mid + Math.imul(ah7, bl1) | 0;
      hi = hi + Math.imul(ah7, bh1) | 0;
      lo = lo + Math.imul(al6, bl2) | 0;
      mid = mid + Math.imul(al6, bh2) | 0;
      mid = mid + Math.imul(ah6, bl2) | 0;
      hi = hi + Math.imul(ah6, bh2) | 0;
      lo = lo + Math.imul(al5, bl3) | 0;
      mid = mid + Math.imul(al5, bh3) | 0;
      mid = mid + Math.imul(ah5, bl3) | 0;
      hi = hi + Math.imul(ah5, bh3) | 0;
      lo = lo + Math.imul(al4, bl4) | 0;
      mid = mid + Math.imul(al4, bh4) | 0;
      mid = mid + Math.imul(ah4, bl4) | 0;
      hi = hi + Math.imul(ah4, bh4) | 0;
      lo = lo + Math.imul(al3, bl5) | 0;
      mid = mid + Math.imul(al3, bh5) | 0;
      mid = mid + Math.imul(ah3, bl5) | 0;
      hi = hi + Math.imul(ah3, bh5) | 0;
      lo = lo + Math.imul(al2, bl6) | 0;
      mid = mid + Math.imul(al2, bh6) | 0;
      mid = mid + Math.imul(ah2, bl6) | 0;
      hi = hi + Math.imul(ah2, bh6) | 0;
      lo = lo + Math.imul(al1, bl7) | 0;
      mid = mid + Math.imul(al1, bh7) | 0;
      mid = mid + Math.imul(ah1, bl7) | 0;
      hi = hi + Math.imul(ah1, bh7) | 0;
      lo = lo + Math.imul(al0, bl8) | 0;
      mid = mid + Math.imul(al0, bh8) | 0;
      mid = mid + Math.imul(ah0, bl8) | 0;
      hi = hi + Math.imul(ah0, bh8) | 0;
      var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
      w8 &= 67108863;
      lo = Math.imul(al9, bl0);
      mid = Math.imul(al9, bh0);
      mid = mid + Math.imul(ah9, bl0) | 0;
      hi = Math.imul(ah9, bh0);
      lo = lo + Math.imul(al8, bl1) | 0;
      mid = mid + Math.imul(al8, bh1) | 0;
      mid = mid + Math.imul(ah8, bl1) | 0;
      hi = hi + Math.imul(ah8, bh1) | 0;
      lo = lo + Math.imul(al7, bl2) | 0;
      mid = mid + Math.imul(al7, bh2) | 0;
      mid = mid + Math.imul(ah7, bl2) | 0;
      hi = hi + Math.imul(ah7, bh2) | 0;
      lo = lo + Math.imul(al6, bl3) | 0;
      mid = mid + Math.imul(al6, bh3) | 0;
      mid = mid + Math.imul(ah6, bl3) | 0;
      hi = hi + Math.imul(ah6, bh3) | 0;
      lo = lo + Math.imul(al5, bl4) | 0;
      mid = mid + Math.imul(al5, bh4) | 0;
      mid = mid + Math.imul(ah5, bl4) | 0;
      hi = hi + Math.imul(ah5, bh4) | 0;
      lo = lo + Math.imul(al4, bl5) | 0;
      mid = mid + Math.imul(al4, bh5) | 0;
      mid = mid + Math.imul(ah4, bl5) | 0;
      hi = hi + Math.imul(ah4, bh5) | 0;
      lo = lo + Math.imul(al3, bl6) | 0;
      mid = mid + Math.imul(al3, bh6) | 0;
      mid = mid + Math.imul(ah3, bl6) | 0;
      hi = hi + Math.imul(ah3, bh6) | 0;
      lo = lo + Math.imul(al2, bl7) | 0;
      mid = mid + Math.imul(al2, bh7) | 0;
      mid = mid + Math.imul(ah2, bl7) | 0;
      hi = hi + Math.imul(ah2, bh7) | 0;
      lo = lo + Math.imul(al1, bl8) | 0;
      mid = mid + Math.imul(al1, bh8) | 0;
      mid = mid + Math.imul(ah1, bl8) | 0;
      hi = hi + Math.imul(ah1, bh8) | 0;
      lo = lo + Math.imul(al0, bl9) | 0;
      mid = mid + Math.imul(al0, bh9) | 0;
      mid = mid + Math.imul(ah0, bl9) | 0;
      hi = hi + Math.imul(ah0, bh9) | 0;
      var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
      w9 &= 67108863;
      lo = Math.imul(al9, bl1);
      mid = Math.imul(al9, bh1);
      mid = mid + Math.imul(ah9, bl1) | 0;
      hi = Math.imul(ah9, bh1);
      lo = lo + Math.imul(al8, bl2) | 0;
      mid = mid + Math.imul(al8, bh2) | 0;
      mid = mid + Math.imul(ah8, bl2) | 0;
      hi = hi + Math.imul(ah8, bh2) | 0;
      lo = lo + Math.imul(al7, bl3) | 0;
      mid = mid + Math.imul(al7, bh3) | 0;
      mid = mid + Math.imul(ah7, bl3) | 0;
      hi = hi + Math.imul(ah7, bh3) | 0;
      lo = lo + Math.imul(al6, bl4) | 0;
      mid = mid + Math.imul(al6, bh4) | 0;
      mid = mid + Math.imul(ah6, bl4) | 0;
      hi = hi + Math.imul(ah6, bh4) | 0;
      lo = lo + Math.imul(al5, bl5) | 0;
      mid = mid + Math.imul(al5, bh5) | 0;
      mid = mid + Math.imul(ah5, bl5) | 0;
      hi = hi + Math.imul(ah5, bh5) | 0;
      lo = lo + Math.imul(al4, bl6) | 0;
      mid = mid + Math.imul(al4, bh6) | 0;
      mid = mid + Math.imul(ah4, bl6) | 0;
      hi = hi + Math.imul(ah4, bh6) | 0;
      lo = lo + Math.imul(al3, bl7) | 0;
      mid = mid + Math.imul(al3, bh7) | 0;
      mid = mid + Math.imul(ah3, bl7) | 0;
      hi = hi + Math.imul(ah3, bh7) | 0;
      lo = lo + Math.imul(al2, bl8) | 0;
      mid = mid + Math.imul(al2, bh8) | 0;
      mid = mid + Math.imul(ah2, bl8) | 0;
      hi = hi + Math.imul(ah2, bh8) | 0;
      lo = lo + Math.imul(al1, bl9) | 0;
      mid = mid + Math.imul(al1, bh9) | 0;
      mid = mid + Math.imul(ah1, bl9) | 0;
      hi = hi + Math.imul(ah1, bh9) | 0;
      var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
      w10 &= 67108863;
      lo = Math.imul(al9, bl2);
      mid = Math.imul(al9, bh2);
      mid = mid + Math.imul(ah9, bl2) | 0;
      hi = Math.imul(ah9, bh2);
      lo = lo + Math.imul(al8, bl3) | 0;
      mid = mid + Math.imul(al8, bh3) | 0;
      mid = mid + Math.imul(ah8, bl3) | 0;
      hi = hi + Math.imul(ah8, bh3) | 0;
      lo = lo + Math.imul(al7, bl4) | 0;
      mid = mid + Math.imul(al7, bh4) | 0;
      mid = mid + Math.imul(ah7, bl4) | 0;
      hi = hi + Math.imul(ah7, bh4) | 0;
      lo = lo + Math.imul(al6, bl5) | 0;
      mid = mid + Math.imul(al6, bh5) | 0;
      mid = mid + Math.imul(ah6, bl5) | 0;
      hi = hi + Math.imul(ah6, bh5) | 0;
      lo = lo + Math.imul(al5, bl6) | 0;
      mid = mid + Math.imul(al5, bh6) | 0;
      mid = mid + Math.imul(ah5, bl6) | 0;
      hi = hi + Math.imul(ah5, bh6) | 0;
      lo = lo + Math.imul(al4, bl7) | 0;
      mid = mid + Math.imul(al4, bh7) | 0;
      mid = mid + Math.imul(ah4, bl7) | 0;
      hi = hi + Math.imul(ah4, bh7) | 0;
      lo = lo + Math.imul(al3, bl8) | 0;
      mid = mid + Math.imul(al3, bh8) | 0;
      mid = mid + Math.imul(ah3, bl8) | 0;
      hi = hi + Math.imul(ah3, bh8) | 0;
      lo = lo + Math.imul(al2, bl9) | 0;
      mid = mid + Math.imul(al2, bh9) | 0;
      mid = mid + Math.imul(ah2, bl9) | 0;
      hi = hi + Math.imul(ah2, bh9) | 0;
      var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
      w11 &= 67108863;
      lo = Math.imul(al9, bl3);
      mid = Math.imul(al9, bh3);
      mid = mid + Math.imul(ah9, bl3) | 0;
      hi = Math.imul(ah9, bh3);
      lo = lo + Math.imul(al8, bl4) | 0;
      mid = mid + Math.imul(al8, bh4) | 0;
      mid = mid + Math.imul(ah8, bl4) | 0;
      hi = hi + Math.imul(ah8, bh4) | 0;
      lo = lo + Math.imul(al7, bl5) | 0;
      mid = mid + Math.imul(al7, bh5) | 0;
      mid = mid + Math.imul(ah7, bl5) | 0;
      hi = hi + Math.imul(ah7, bh5) | 0;
      lo = lo + Math.imul(al6, bl6) | 0;
      mid = mid + Math.imul(al6, bh6) | 0;
      mid = mid + Math.imul(ah6, bl6) | 0;
      hi = hi + Math.imul(ah6, bh6) | 0;
      lo = lo + Math.imul(al5, bl7) | 0;
      mid = mid + Math.imul(al5, bh7) | 0;
      mid = mid + Math.imul(ah5, bl7) | 0;
      hi = hi + Math.imul(ah5, bh7) | 0;
      lo = lo + Math.imul(al4, bl8) | 0;
      mid = mid + Math.imul(al4, bh8) | 0;
      mid = mid + Math.imul(ah4, bl8) | 0;
      hi = hi + Math.imul(ah4, bh8) | 0;
      lo = lo + Math.imul(al3, bl9) | 0;
      mid = mid + Math.imul(al3, bh9) | 0;
      mid = mid + Math.imul(ah3, bl9) | 0;
      hi = hi + Math.imul(ah3, bh9) | 0;
      var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
      w12 &= 67108863;
      lo = Math.imul(al9, bl4);
      mid = Math.imul(al9, bh4);
      mid = mid + Math.imul(ah9, bl4) | 0;
      hi = Math.imul(ah9, bh4);
      lo = lo + Math.imul(al8, bl5) | 0;
      mid = mid + Math.imul(al8, bh5) | 0;
      mid = mid + Math.imul(ah8, bl5) | 0;
      hi = hi + Math.imul(ah8, bh5) | 0;
      lo = lo + Math.imul(al7, bl6) | 0;
      mid = mid + Math.imul(al7, bh6) | 0;
      mid = mid + Math.imul(ah7, bl6) | 0;
      hi = hi + Math.imul(ah7, bh6) | 0;
      lo = lo + Math.imul(al6, bl7) | 0;
      mid = mid + Math.imul(al6, bh7) | 0;
      mid = mid + Math.imul(ah6, bl7) | 0;
      hi = hi + Math.imul(ah6, bh7) | 0;
      lo = lo + Math.imul(al5, bl8) | 0;
      mid = mid + Math.imul(al5, bh8) | 0;
      mid = mid + Math.imul(ah5, bl8) | 0;
      hi = hi + Math.imul(ah5, bh8) | 0;
      lo = lo + Math.imul(al4, bl9) | 0;
      mid = mid + Math.imul(al4, bh9) | 0;
      mid = mid + Math.imul(ah4, bl9) | 0;
      hi = hi + Math.imul(ah4, bh9) | 0;
      var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
      w13 &= 67108863;
      lo = Math.imul(al9, bl5);
      mid = Math.imul(al9, bh5);
      mid = mid + Math.imul(ah9, bl5) | 0;
      hi = Math.imul(ah9, bh5);
      lo = lo + Math.imul(al8, bl6) | 0;
      mid = mid + Math.imul(al8, bh6) | 0;
      mid = mid + Math.imul(ah8, bl6) | 0;
      hi = hi + Math.imul(ah8, bh6) | 0;
      lo = lo + Math.imul(al7, bl7) | 0;
      mid = mid + Math.imul(al7, bh7) | 0;
      mid = mid + Math.imul(ah7, bl7) | 0;
      hi = hi + Math.imul(ah7, bh7) | 0;
      lo = lo + Math.imul(al6, bl8) | 0;
      mid = mid + Math.imul(al6, bh8) | 0;
      mid = mid + Math.imul(ah6, bl8) | 0;
      hi = hi + Math.imul(ah6, bh8) | 0;
      lo = lo + Math.imul(al5, bl9) | 0;
      mid = mid + Math.imul(al5, bh9) | 0;
      mid = mid + Math.imul(ah5, bl9) | 0;
      hi = hi + Math.imul(ah5, bh9) | 0;
      var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
      w14 &= 67108863;
      lo = Math.imul(al9, bl6);
      mid = Math.imul(al9, bh6);
      mid = mid + Math.imul(ah9, bl6) | 0;
      hi = Math.imul(ah9, bh6);
      lo = lo + Math.imul(al8, bl7) | 0;
      mid = mid + Math.imul(al8, bh7) | 0;
      mid = mid + Math.imul(ah8, bl7) | 0;
      hi = hi + Math.imul(ah8, bh7) | 0;
      lo = lo + Math.imul(al7, bl8) | 0;
      mid = mid + Math.imul(al7, bh8) | 0;
      mid = mid + Math.imul(ah7, bl8) | 0;
      hi = hi + Math.imul(ah7, bh8) | 0;
      lo = lo + Math.imul(al6, bl9) | 0;
      mid = mid + Math.imul(al6, bh9) | 0;
      mid = mid + Math.imul(ah6, bl9) | 0;
      hi = hi + Math.imul(ah6, bh9) | 0;
      var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
      w15 &= 67108863;
      lo = Math.imul(al9, bl7);
      mid = Math.imul(al9, bh7);
      mid = mid + Math.imul(ah9, bl7) | 0;
      hi = Math.imul(ah9, bh7);
      lo = lo + Math.imul(al8, bl8) | 0;
      mid = mid + Math.imul(al8, bh8) | 0;
      mid = mid + Math.imul(ah8, bl8) | 0;
      hi = hi + Math.imul(ah8, bh8) | 0;
      lo = lo + Math.imul(al7, bl9) | 0;
      mid = mid + Math.imul(al7, bh9) | 0;
      mid = mid + Math.imul(ah7, bl9) | 0;
      hi = hi + Math.imul(ah7, bh9) | 0;
      var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
      w16 &= 67108863;
      lo = Math.imul(al9, bl8);
      mid = Math.imul(al9, bh8);
      mid = mid + Math.imul(ah9, bl8) | 0;
      hi = Math.imul(ah9, bh8);
      lo = lo + Math.imul(al8, bl9) | 0;
      mid = mid + Math.imul(al8, bh9) | 0;
      mid = mid + Math.imul(ah8, bl9) | 0;
      hi = hi + Math.imul(ah8, bh9) | 0;
      var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
      w17 &= 67108863;
      lo = Math.imul(al9, bl9);
      mid = Math.imul(al9, bh9);
      mid = mid + Math.imul(ah9, bl9) | 0;
      hi = Math.imul(ah9, bh9);
      var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
      c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
      w18 &= 67108863;
      o[0] = w0;
      o[1] = w1;
      o[2] = w2;
      o[3] = w3;
      o[4] = w4;
      o[5] = w5;
      o[6] = w6;
      o[7] = w7;
      o[8] = w8;
      o[9] = w9;
      o[10] = w10;
      o[11] = w11;
      o[12] = w12;
      o[13] = w13;
      o[14] = w14;
      o[15] = w15;
      o[16] = w16;
      o[17] = w17;
      o[18] = w18;
      if (c !== 0) {
        o[19] = c;
        out.length++;
      }
      return out;
    };
    if (!Math.imul) {
      comb10MulTo = smallMulTo;
    }
    function bigMulTo(self2, num, out) {
      out.negative = num.negative ^ self2.negative;
      out.length = self2.length + num.length;
      var carry = 0;
      var hncarry = 0;
      for (var k = 0; k < out.length - 1; k++) {
        var ncarry = hncarry;
        hncarry = 0;
        var rword = carry & 67108863;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
          var i = k - j;
          var a = self2.words[i] | 0;
          var b = num.words[j] | 0;
          var r2 = a * b;
          var lo = r2 & 67108863;
          ncarry = ncarry + (r2 / 67108864 | 0) | 0;
          lo = lo + rword | 0;
          rword = lo & 67108863;
          ncarry = ncarry + (lo >>> 26) | 0;
          hncarry += ncarry >>> 26;
          ncarry &= 67108863;
        }
        out.words[k] = rword;
        carry = ncarry;
        ncarry = hncarry;
      }
      if (carry !== 0) {
        out.words[k] = carry;
      } else {
        out.length--;
      }
      return out.strip();
    }
    function jumboMulTo(self2, num, out) {
      var fftm = new FFTM();
      return fftm.mulp(self2, num, out);
    }
    BN2.prototype.mulTo = function mulTo(num, out) {
      var res;
      var len = this.length + num.length;
      if (this.length === 10 && num.length === 10) {
        res = comb10MulTo(this, num, out);
      } else if (len < 63) {
        res = smallMulTo(this, num, out);
      } else if (len < 1024) {
        res = bigMulTo(this, num, out);
      } else {
        res = jumboMulTo(this, num, out);
      }
      return res;
    };
    function FFTM(x, y) {
      this.x = x;
      this.y = y;
    }
    FFTM.prototype.makeRBT = function makeRBT(N) {
      var t = new Array(N);
      var l = BN2.prototype._countBits(N) - 1;
      for (var i = 0; i < N; i++) {
        t[i] = this.revBin(i, l, N);
      }
      return t;
    };
    FFTM.prototype.revBin = function revBin(x, l, N) {
      if (x === 0 || x === N - 1)
        return x;
      var rb = 0;
      for (var i = 0; i < l; i++) {
        rb |= (x & 1) << l - i - 1;
        x >>= 1;
      }
      return rb;
    };
    FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
      for (var i = 0; i < N; i++) {
        rtws[i] = rws[rbt[i]];
        itws[i] = iws[rbt[i]];
      }
    };
    FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
      this.permute(rbt, rws, iws, rtws, itws, N);
      for (var s2 = 1; s2 < N; s2 <<= 1) {
        var l = s2 << 1;
        var rtwdf = Math.cos(2 * Math.PI / l);
        var itwdf = Math.sin(2 * Math.PI / l);
        for (var p = 0; p < N; p += l) {
          var rtwdf_ = rtwdf;
          var itwdf_ = itwdf;
          for (var j = 0; j < s2; j++) {
            var re = rtws[p + j];
            var ie = itws[p + j];
            var ro = rtws[p + j + s2];
            var io = itws[p + j + s2];
            var rx = rtwdf_ * ro - itwdf_ * io;
            io = rtwdf_ * io + itwdf_ * ro;
            ro = rx;
            rtws[p + j] = re + ro;
            itws[p + j] = ie + io;
            rtws[p + j + s2] = re - ro;
            itws[p + j + s2] = ie - io;
            if (j !== l) {
              rx = rtwdf * rtwdf_ - itwdf * itwdf_;
              itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
              rtwdf_ = rx;
            }
          }
        }
      }
    };
    FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
      var N = Math.max(m, n) | 1;
      var odd = N & 1;
      var i = 0;
      for (N = N / 2 | 0; N; N = N >>> 1) {
        i++;
      }
      return 1 << i + 1 + odd;
    };
    FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
      if (N <= 1)
        return;
      for (var i = 0; i < N / 2; i++) {
        var t = rws[i];
        rws[i] = rws[N - i - 1];
        rws[N - i - 1] = t;
        t = iws[i];
        iws[i] = -iws[N - i - 1];
        iws[N - i - 1] = -t;
      }
    };
    FFTM.prototype.normalize13b = function normalize13b(ws, N) {
      var carry = 0;
      for (var i = 0; i < N / 2; i++) {
        var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
        ws[i] = w & 67108863;
        if (w < 67108864) {
          carry = 0;
        } else {
          carry = w / 67108864 | 0;
        }
      }
      return ws;
    };
    FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
      var carry = 0;
      for (var i = 0; i < len; i++) {
        carry = carry + (ws[i] | 0);
        rws[2 * i] = carry & 8191;
        carry = carry >>> 13;
        rws[2 * i + 1] = carry & 8191;
        carry = carry >>> 13;
      }
      for (i = 2 * len; i < N; ++i) {
        rws[i] = 0;
      }
      assert2(carry === 0);
      assert2((carry & ~8191) === 0);
    };
    FFTM.prototype.stub = function stub(N) {
      var ph = new Array(N);
      for (var i = 0; i < N; i++) {
        ph[i] = 0;
      }
      return ph;
    };
    FFTM.prototype.mulp = function mulp(x, y, out) {
      var N = 2 * this.guessLen13b(x.length, y.length);
      var rbt = this.makeRBT(N);
      var _ = this.stub(N);
      var rws = new Array(N);
      var rwst = new Array(N);
      var iwst = new Array(N);
      var nrws = new Array(N);
      var nrwst = new Array(N);
      var niwst = new Array(N);
      var rmws = out.words;
      rmws.length = N;
      this.convert13b(x.words, x.length, rws, N);
      this.convert13b(y.words, y.length, nrws, N);
      this.transform(rws, _, rwst, iwst, N, rbt);
      this.transform(nrws, _, nrwst, niwst, N, rbt);
      for (var i = 0; i < N; i++) {
        var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
        iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
        rwst[i] = rx;
      }
      this.conjugate(rwst, iwst, N);
      this.transform(rwst, iwst, rmws, _, N, rbt);
      this.conjugate(rmws, _, N);
      this.normalize13b(rmws, N);
      out.negative = x.negative ^ y.negative;
      out.length = x.length + y.length;
      return out.strip();
    };
    BN2.prototype.mul = function mul5(num) {
      var out = new BN2(null);
      out.words = new Array(this.length + num.length);
      return this.mulTo(num, out);
    };
    BN2.prototype.mulf = function mulf(num) {
      var out = new BN2(null);
      out.words = new Array(this.length + num.length);
      return jumboMulTo(this, num, out);
    };
    BN2.prototype.imul = function imul(num) {
      return this.clone().mulTo(num, this);
    };
    BN2.prototype.imuln = function imuln(num) {
      assert2(typeof num === "number");
      assert2(num < 67108864);
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = (this.words[i] | 0) * num;
        var lo = (w & 67108863) + (carry & 67108863);
        carry >>= 26;
        carry += w / 67108864 | 0;
        carry += lo >>> 26;
        this.words[i] = lo & 67108863;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };
    BN2.prototype.muln = function muln(num) {
      return this.clone().imuln(num);
    };
    BN2.prototype.sqr = function sqr() {
      return this.mul(this);
    };
    BN2.prototype.isqr = function isqr() {
      return this.imul(this.clone());
    };
    BN2.prototype.pow = function pow(num) {
      var w = toBitArray(num);
      if (w.length === 0)
        return new BN2(1);
      var res = this;
      for (var i = 0; i < w.length; i++, res = res.sqr()) {
        if (w[i] !== 0)
          break;
      }
      if (++i < w.length) {
        for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
          if (w[i] === 0)
            continue;
          res = res.mul(q);
        }
      }
      return res;
    };
    BN2.prototype.iushln = function iushln(bits) {
      assert2(typeof bits === "number" && bits >= 0);
      var r2 = bits % 26;
      var s2 = (bits - r2) / 26;
      var carryMask = 67108863 >>> 26 - r2 << 26 - r2;
      var i;
      if (r2 !== 0) {
        var carry = 0;
        for (i = 0; i < this.length; i++) {
          var newCarry = this.words[i] & carryMask;
          var c = (this.words[i] | 0) - newCarry << r2;
          this.words[i] = c | carry;
          carry = newCarry >>> 26 - r2;
        }
        if (carry) {
          this.words[i] = carry;
          this.length++;
        }
      }
      if (s2 !== 0) {
        for (i = this.length - 1; i >= 0; i--) {
          this.words[i + s2] = this.words[i];
        }
        for (i = 0; i < s2; i++) {
          this.words[i] = 0;
        }
        this.length += s2;
      }
      return this.strip();
    };
    BN2.prototype.ishln = function ishln(bits) {
      assert2(this.negative === 0);
      return this.iushln(bits);
    };
    BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
      assert2(typeof bits === "number" && bits >= 0);
      var h;
      if (hint) {
        h = (hint - hint % 26) / 26;
      } else {
        h = 0;
      }
      var r2 = bits % 26;
      var s2 = Math.min((bits - r2) / 26, this.length);
      var mask = 67108863 ^ 67108863 >>> r2 << r2;
      var maskedWords = extended;
      h -= s2;
      h = Math.max(0, h);
      if (maskedWords) {
        for (var i = 0; i < s2; i++) {
          maskedWords.words[i] = this.words[i];
        }
        maskedWords.length = s2;
      }
      if (s2 === 0)
        ;
      else if (this.length > s2) {
        this.length -= s2;
        for (i = 0; i < this.length; i++) {
          this.words[i] = this.words[i + s2];
        }
      } else {
        this.words[0] = 0;
        this.length = 1;
      }
      var carry = 0;
      for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
        var word = this.words[i] | 0;
        this.words[i] = carry << 26 - r2 | word >>> r2;
        carry = word & mask;
      }
      if (maskedWords && carry !== 0) {
        maskedWords.words[maskedWords.length++] = carry;
      }
      if (this.length === 0) {
        this.words[0] = 0;
        this.length = 1;
      }
      return this.strip();
    };
    BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
      assert2(this.negative === 0);
      return this.iushrn(bits, hint, extended);
    };
    BN2.prototype.shln = function shln(bits) {
      return this.clone().ishln(bits);
    };
    BN2.prototype.ushln = function ushln(bits) {
      return this.clone().iushln(bits);
    };
    BN2.prototype.shrn = function shrn(bits) {
      return this.clone().ishrn(bits);
    };
    BN2.prototype.ushrn = function ushrn(bits) {
      return this.clone().iushrn(bits);
    };
    BN2.prototype.testn = function testn(bit) {
      assert2(typeof bit === "number" && bit >= 0);
      var r2 = bit % 26;
      var s2 = (bit - r2) / 26;
      var q = 1 << r2;
      if (this.length <= s2)
        return false;
      var w = this.words[s2];
      return !!(w & q);
    };
    BN2.prototype.imaskn = function imaskn(bits) {
      assert2(typeof bits === "number" && bits >= 0);
      var r2 = bits % 26;
      var s2 = (bits - r2) / 26;
      assert2(this.negative === 0, "imaskn works only with positive numbers");
      if (this.length <= s2) {
        return this;
      }
      if (r2 !== 0) {
        s2++;
      }
      this.length = Math.min(s2, this.length);
      if (r2 !== 0) {
        var mask = 67108863 ^ 67108863 >>> r2 << r2;
        this.words[this.length - 1] &= mask;
      }
      return this.strip();
    };
    BN2.prototype.maskn = function maskn(bits) {
      return this.clone().imaskn(bits);
    };
    BN2.prototype.iaddn = function iaddn(num) {
      assert2(typeof num === "number");
      assert2(num < 67108864);
      if (num < 0)
        return this.isubn(-num);
      if (this.negative !== 0) {
        if (this.length === 1 && (this.words[0] | 0) < num) {
          this.words[0] = num - (this.words[0] | 0);
          this.negative = 0;
          return this;
        }
        this.negative = 0;
        this.isubn(num);
        this.negative = 1;
        return this;
      }
      return this._iaddn(num);
    };
    BN2.prototype._iaddn = function _iaddn(num) {
      this.words[0] += num;
      for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
        this.words[i] -= 67108864;
        if (i === this.length - 1) {
          this.words[i + 1] = 1;
        } else {
          this.words[i + 1]++;
        }
      }
      this.length = Math.max(this.length, i + 1);
      return this;
    };
    BN2.prototype.isubn = function isubn(num) {
      assert2(typeof num === "number");
      assert2(num < 67108864);
      if (num < 0)
        return this.iaddn(-num);
      if (this.negative !== 0) {
        this.negative = 0;
        this.iaddn(num);
        this.negative = 1;
        return this;
      }
      this.words[0] -= num;
      if (this.length === 1 && this.words[0] < 0) {
        this.words[0] = -this.words[0];
        this.negative = 1;
      } else {
        for (var i = 0; i < this.length && this.words[i] < 0; i++) {
          this.words[i] += 67108864;
          this.words[i + 1] -= 1;
        }
      }
      return this.strip();
    };
    BN2.prototype.addn = function addn(num) {
      return this.clone().iaddn(num);
    };
    BN2.prototype.subn = function subn(num) {
      return this.clone().isubn(num);
    };
    BN2.prototype.iabs = function iabs() {
      this.negative = 0;
      return this;
    };
    BN2.prototype.abs = function abs() {
      return this.clone().iabs();
    };
    BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul5, shift) {
      var len = num.length + shift;
      var i;
      this._expand(len);
      var w;
      var carry = 0;
      for (i = 0; i < num.length; i++) {
        w = (this.words[i + shift] | 0) + carry;
        var right = (num.words[i] | 0) * mul5;
        w -= right & 67108863;
        carry = (w >> 26) - (right / 67108864 | 0);
        this.words[i + shift] = w & 67108863;
      }
      for (; i < this.length - shift; i++) {
        w = (this.words[i + shift] | 0) + carry;
        carry = w >> 26;
        this.words[i + shift] = w & 67108863;
      }
      if (carry === 0)
        return this.strip();
      assert2(carry === -1);
      carry = 0;
      for (i = 0; i < this.length; i++) {
        w = -(this.words[i] | 0) + carry;
        carry = w >> 26;
        this.words[i] = w & 67108863;
      }
      this.negative = 1;
      return this.strip();
    };
    BN2.prototype._wordDiv = function _wordDiv(num, mode) {
      var shift = this.length - num.length;
      var a = this.clone();
      var b = num;
      var bhi = b.words[b.length - 1] | 0;
      var bhiBits = this._countBits(bhi);
      shift = 26 - bhiBits;
      if (shift !== 0) {
        b = b.ushln(shift);
        a.iushln(shift);
        bhi = b.words[b.length - 1] | 0;
      }
      var m = a.length - b.length;
      var q;
      if (mode !== "mod") {
        q = new BN2(null);
        q.length = m + 1;
        q.words = new Array(q.length);
        for (var i = 0; i < q.length; i++) {
          q.words[i] = 0;
        }
      }
      var diff = a.clone()._ishlnsubmul(b, 1, m);
      if (diff.negative === 0) {
        a = diff;
        if (q) {
          q.words[m] = 1;
        }
      }
      for (var j = m - 1; j >= 0; j--) {
        var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
        qj = Math.min(qj / bhi | 0, 67108863);
        a._ishlnsubmul(b, qj, j);
        while (a.negative !== 0) {
          qj--;
          a.negative = 0;
          a._ishlnsubmul(b, 1, j);
          if (!a.isZero()) {
            a.negative ^= 1;
          }
        }
        if (q) {
          q.words[j] = qj;
        }
      }
      if (q) {
        q.strip();
      }
      a.strip();
      if (mode !== "div" && shift !== 0) {
        a.iushrn(shift);
      }
      return {
        div: q || null,
        mod: a
      };
    };
    BN2.prototype.divmod = function divmod(num, mode, positive) {
      assert2(!num.isZero());
      if (this.isZero()) {
        return {
          div: new BN2(0),
          mod: new BN2(0)
        };
      }
      var div, mod, res;
      if (this.negative !== 0 && num.negative === 0) {
        res = this.neg().divmod(num, mode);
        if (mode !== "mod") {
          div = res.div.neg();
        }
        if (mode !== "div") {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.iadd(num);
          }
        }
        return {
          div,
          mod
        };
      }
      if (this.negative === 0 && num.negative !== 0) {
        res = this.divmod(num.neg(), mode);
        if (mode !== "mod") {
          div = res.div.neg();
        }
        return {
          div,
          mod: res.mod
        };
      }
      if ((this.negative & num.negative) !== 0) {
        res = this.neg().divmod(num.neg(), mode);
        if (mode !== "div") {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.isub(num);
          }
        }
        return {
          div: res.div,
          mod
        };
      }
      if (num.length > this.length || this.cmp(num) < 0) {
        return {
          div: new BN2(0),
          mod: this
        };
      }
      if (num.length === 1) {
        if (mode === "div") {
          return {
            div: this.divn(num.words[0]),
            mod: null
          };
        }
        if (mode === "mod") {
          return {
            div: null,
            mod: new BN2(this.modn(num.words[0]))
          };
        }
        return {
          div: this.divn(num.words[0]),
          mod: new BN2(this.modn(num.words[0]))
        };
      }
      return this._wordDiv(num, mode);
    };
    BN2.prototype.div = function div(num) {
      return this.divmod(num, "div", false).div;
    };
    BN2.prototype.mod = function mod(num) {
      return this.divmod(num, "mod", false).mod;
    };
    BN2.prototype.umod = function umod(num) {
      return this.divmod(num, "mod", true).mod;
    };
    BN2.prototype.divRound = function divRound(num) {
      var dm = this.divmod(num);
      if (dm.mod.isZero())
        return dm.div;
      var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
      var half = num.ushrn(1);
      var r2 = num.andln(1);
      var cmp = mod.cmp(half);
      if (cmp < 0 || r2 === 1 && cmp === 0)
        return dm.div;
      return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
    };
    BN2.prototype.modn = function modn(num) {
      assert2(num <= 67108863);
      var p = (1 << 26) % num;
      var acc = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        acc = (p * acc + (this.words[i] | 0)) % num;
      }
      return acc;
    };
    BN2.prototype.idivn = function idivn(num) {
      assert2(num <= 67108863);
      var carry = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var w = (this.words[i] | 0) + carry * 67108864;
        this.words[i] = w / num | 0;
        carry = w % num;
      }
      return this.strip();
    };
    BN2.prototype.divn = function divn(num) {
      return this.clone().idivn(num);
    };
    BN2.prototype.egcd = function egcd(p) {
      assert2(p.negative === 0);
      assert2(!p.isZero());
      var x = this;
      var y = p.clone();
      if (x.negative !== 0) {
        x = x.umod(p);
      } else {
        x = x.clone();
      }
      var A = new BN2(1);
      var B = new BN2(0);
      var C = new BN2(0);
      var D = new BN2(1);
      var g = 0;
      while (x.isEven() && y.isEven()) {
        x.iushrn(1);
        y.iushrn(1);
        ++g;
      }
      var yp = y.clone();
      var xp = x.clone();
      while (!x.isZero()) {
        for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
          ;
        if (i > 0) {
          x.iushrn(i);
          while (i-- > 0) {
            if (A.isOdd() || B.isOdd()) {
              A.iadd(yp);
              B.isub(xp);
            }
            A.iushrn(1);
            B.iushrn(1);
          }
        }
        for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
          ;
        if (j > 0) {
          y.iushrn(j);
          while (j-- > 0) {
            if (C.isOdd() || D.isOdd()) {
              C.iadd(yp);
              D.isub(xp);
            }
            C.iushrn(1);
            D.iushrn(1);
          }
        }
        if (x.cmp(y) >= 0) {
          x.isub(y);
          A.isub(C);
          B.isub(D);
        } else {
          y.isub(x);
          C.isub(A);
          D.isub(B);
        }
      }
      return {
        a: C,
        b: D,
        gcd: y.iushln(g)
      };
    };
    BN2.prototype._invmp = function _invmp(p) {
      assert2(p.negative === 0);
      assert2(!p.isZero());
      var a = this;
      var b = p.clone();
      if (a.negative !== 0) {
        a = a.umod(p);
      } else {
        a = a.clone();
      }
      var x1 = new BN2(1);
      var x2 = new BN2(0);
      var delta = b.clone();
      while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
        for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
          ;
        if (i > 0) {
          a.iushrn(i);
          while (i-- > 0) {
            if (x1.isOdd()) {
              x1.iadd(delta);
            }
            x1.iushrn(1);
          }
        }
        for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
          ;
        if (j > 0) {
          b.iushrn(j);
          while (j-- > 0) {
            if (x2.isOdd()) {
              x2.iadd(delta);
            }
            x2.iushrn(1);
          }
        }
        if (a.cmp(b) >= 0) {
          a.isub(b);
          x1.isub(x2);
        } else {
          b.isub(a);
          x2.isub(x1);
        }
      }
      var res;
      if (a.cmpn(1) === 0) {
        res = x1;
      } else {
        res = x2;
      }
      if (res.cmpn(0) < 0) {
        res.iadd(p);
      }
      return res;
    };
    BN2.prototype.gcd = function gcd(num) {
      if (this.isZero())
        return num.abs();
      if (num.isZero())
        return this.abs();
      var a = this.clone();
      var b = num.clone();
      a.negative = 0;
      b.negative = 0;
      for (var shift = 0; a.isEven() && b.isEven(); shift++) {
        a.iushrn(1);
        b.iushrn(1);
      }
      do {
        while (a.isEven()) {
          a.iushrn(1);
        }
        while (b.isEven()) {
          b.iushrn(1);
        }
        var r2 = a.cmp(b);
        if (r2 < 0) {
          var t = a;
          a = b;
          b = t;
        } else if (r2 === 0 || b.cmpn(1) === 0) {
          break;
        }
        a.isub(b);
      } while (true);
      return b.iushln(shift);
    };
    BN2.prototype.invm = function invm(num) {
      return this.egcd(num).a.umod(num);
    };
    BN2.prototype.isEven = function isEven() {
      return (this.words[0] & 1) === 0;
    };
    BN2.prototype.isOdd = function isOdd() {
      return (this.words[0] & 1) === 1;
    };
    BN2.prototype.andln = function andln(num) {
      return this.words[0] & num;
    };
    BN2.prototype.bincn = function bincn(bit) {
      assert2(typeof bit === "number");
      var r2 = bit % 26;
      var s2 = (bit - r2) / 26;
      var q = 1 << r2;
      if (this.length <= s2) {
        this._expand(s2 + 1);
        this.words[s2] |= q;
        return this;
      }
      var carry = q;
      for (var i = s2; carry !== 0 && i < this.length; i++) {
        var w = this.words[i] | 0;
        w += carry;
        carry = w >>> 26;
        w &= 67108863;
        this.words[i] = w;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };
    BN2.prototype.isZero = function isZero() {
      return this.length === 1 && this.words[0] === 0;
    };
    BN2.prototype.cmpn = function cmpn(num) {
      var negative = num < 0;
      if (this.negative !== 0 && !negative)
        return -1;
      if (this.negative === 0 && negative)
        return 1;
      this.strip();
      var res;
      if (this.length > 1) {
        res = 1;
      } else {
        if (negative) {
          num = -num;
        }
        assert2(num <= 67108863, "Number is too big");
        var w = this.words[0] | 0;
        res = w === num ? 0 : w < num ? -1 : 1;
      }
      if (this.negative !== 0)
        return -res | 0;
      return res;
    };
    BN2.prototype.cmp = function cmp(num) {
      if (this.negative !== 0 && num.negative === 0)
        return -1;
      if (this.negative === 0 && num.negative !== 0)
        return 1;
      var res = this.ucmp(num);
      if (this.negative !== 0)
        return -res | 0;
      return res;
    };
    BN2.prototype.ucmp = function ucmp(num) {
      if (this.length > num.length)
        return 1;
      if (this.length < num.length)
        return -1;
      var res = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var a = this.words[i] | 0;
        var b = num.words[i] | 0;
        if (a === b)
          continue;
        if (a < b) {
          res = -1;
        } else if (a > b) {
          res = 1;
        }
        break;
      }
      return res;
    };
    BN2.prototype.gtn = function gtn(num) {
      return this.cmpn(num) === 1;
    };
    BN2.prototype.gt = function gt(num) {
      return this.cmp(num) === 1;
    };
    BN2.prototype.gten = function gten(num) {
      return this.cmpn(num) >= 0;
    };
    BN2.prototype.gte = function gte(num) {
      return this.cmp(num) >= 0;
    };
    BN2.prototype.ltn = function ltn(num) {
      return this.cmpn(num) === -1;
    };
    BN2.prototype.lt = function lt(num) {
      return this.cmp(num) === -1;
    };
    BN2.prototype.lten = function lten(num) {
      return this.cmpn(num) <= 0;
    };
    BN2.prototype.lte = function lte(num) {
      return this.cmp(num) <= 0;
    };
    BN2.prototype.eqn = function eqn(num) {
      return this.cmpn(num) === 0;
    };
    BN2.prototype.eq = function eq6(num) {
      return this.cmp(num) === 0;
    };
    BN2.red = function red2(num) {
      return new Red(num);
    };
    BN2.prototype.toRed = function toRed(ctx) {
      assert2(!this.red, "Already a number in reduction context");
      assert2(this.negative === 0, "red works only with positives");
      return ctx.convertTo(this)._forceRed(ctx);
    };
    BN2.prototype.fromRed = function fromRed() {
      assert2(this.red, "fromRed works only with numbers in reduction context");
      return this.red.convertFrom(this);
    };
    BN2.prototype._forceRed = function _forceRed(ctx) {
      this.red = ctx;
      return this;
    };
    BN2.prototype.forceRed = function forceRed(ctx) {
      assert2(!this.red, "Already a number in reduction context");
      return this._forceRed(ctx);
    };
    BN2.prototype.redAdd = function redAdd(num) {
      assert2(this.red, "redAdd works only with red numbers");
      return this.red.add(this, num);
    };
    BN2.prototype.redIAdd = function redIAdd(num) {
      assert2(this.red, "redIAdd works only with red numbers");
      return this.red.iadd(this, num);
    };
    BN2.prototype.redSub = function redSub(num) {
      assert2(this.red, "redSub works only with red numbers");
      return this.red.sub(this, num);
    };
    BN2.prototype.redISub = function redISub(num) {
      assert2(this.red, "redISub works only with red numbers");
      return this.red.isub(this, num);
    };
    BN2.prototype.redShl = function redShl(num) {
      assert2(this.red, "redShl works only with red numbers");
      return this.red.shl(this, num);
    };
    BN2.prototype.redMul = function redMul(num) {
      assert2(this.red, "redMul works only with red numbers");
      this.red._verify2(this, num);
      return this.red.mul(this, num);
    };
    BN2.prototype.redIMul = function redIMul(num) {
      assert2(this.red, "redMul works only with red numbers");
      this.red._verify2(this, num);
      return this.red.imul(this, num);
    };
    BN2.prototype.redSqr = function redSqr() {
      assert2(this.red, "redSqr works only with red numbers");
      this.red._verify1(this);
      return this.red.sqr(this);
    };
    BN2.prototype.redISqr = function redISqr() {
      assert2(this.red, "redISqr works only with red numbers");
      this.red._verify1(this);
      return this.red.isqr(this);
    };
    BN2.prototype.redSqrt = function redSqrt() {
      assert2(this.red, "redSqrt works only with red numbers");
      this.red._verify1(this);
      return this.red.sqrt(this);
    };
    BN2.prototype.redInvm = function redInvm() {
      assert2(this.red, "redInvm works only with red numbers");
      this.red._verify1(this);
      return this.red.invm(this);
    };
    BN2.prototype.redNeg = function redNeg() {
      assert2(this.red, "redNeg works only with red numbers");
      this.red._verify1(this);
      return this.red.neg(this);
    };
    BN2.prototype.redPow = function redPow(num) {
      assert2(this.red && !num.red, "redPow(normalNum)");
      this.red._verify1(this);
      return this.red.pow(this, num);
    };
    var primes = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function MPrime(name2, p) {
      this.name = name2;
      this.p = new BN2(p, 16);
      this.n = this.p.bitLength();
      this.k = new BN2(1).iushln(this.n).isub(this.p);
      this.tmp = this._tmp();
    }
    MPrime.prototype._tmp = function _tmp() {
      var tmp = new BN2(null);
      tmp.words = new Array(Math.ceil(this.n / 13));
      return tmp;
    };
    MPrime.prototype.ireduce = function ireduce(num) {
      var r2 = num;
      var rlen;
      do {
        this.split(r2, this.tmp);
        r2 = this.imulK(r2);
        r2 = r2.iadd(this.tmp);
        rlen = r2.bitLength();
      } while (rlen > this.n);
      var cmp = rlen < this.n ? -1 : r2.ucmp(this.p);
      if (cmp === 0) {
        r2.words[0] = 0;
        r2.length = 1;
      } else if (cmp > 0) {
        r2.isub(this.p);
      } else {
        if (r2.strip !== void 0) {
          r2.strip();
        } else {
          r2._strip();
        }
      }
      return r2;
    };
    MPrime.prototype.split = function split(input, out) {
      input.iushrn(this.n, 0, out);
    };
    MPrime.prototype.imulK = function imulK(num) {
      return num.imul(this.k);
    };
    function K256() {
      MPrime.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    inherits2(K256, MPrime);
    K256.prototype.split = function split(input, output) {
      var mask = 4194303;
      var outLen = Math.min(input.length, 9);
      for (var i = 0; i < outLen; i++) {
        output.words[i] = input.words[i];
      }
      output.length = outLen;
      if (input.length <= 9) {
        input.words[0] = 0;
        input.length = 1;
        return;
      }
      var prev = input.words[9];
      output.words[output.length++] = prev & mask;
      for (i = 10; i < input.length; i++) {
        var next = input.words[i] | 0;
        input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
        prev = next;
      }
      prev >>>= 22;
      input.words[i - 10] = prev;
      if (prev === 0 && input.length > 10) {
        input.length -= 10;
      } else {
        input.length -= 9;
      }
    };
    K256.prototype.imulK = function imulK(num) {
      num.words[num.length] = 0;
      num.words[num.length + 1] = 0;
      num.length += 2;
      var lo = 0;
      for (var i = 0; i < num.length; i++) {
        var w = num.words[i] | 0;
        lo += w * 977;
        num.words[i] = lo & 67108863;
        lo = w * 64 + (lo / 67108864 | 0);
      }
      if (num.words[num.length - 1] === 0) {
        num.length--;
        if (num.words[num.length - 1] === 0) {
          num.length--;
        }
      }
      return num;
    };
    function P224() {
      MPrime.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    inherits2(P224, MPrime);
    function P192() {
      MPrime.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    inherits2(P192, MPrime);
    function P25519() {
      MPrime.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    inherits2(P25519, MPrime);
    P25519.prototype.imulK = function imulK(num) {
      var carry = 0;
      for (var i = 0; i < num.length; i++) {
        var hi = (num.words[i] | 0) * 19 + carry;
        var lo = hi & 67108863;
        hi >>>= 26;
        num.words[i] = lo;
        carry = hi;
      }
      if (carry !== 0) {
        num.words[num.length++] = carry;
      }
      return num;
    };
    BN2._prime = function prime(name2) {
      if (primes[name2])
        return primes[name2];
      var prime2;
      if (name2 === "k256") {
        prime2 = new K256();
      } else if (name2 === "p224") {
        prime2 = new P224();
      } else if (name2 === "p192") {
        prime2 = new P192();
      } else if (name2 === "p25519") {
        prime2 = new P25519();
      } else {
        throw new Error("Unknown prime " + name2);
      }
      primes[name2] = prime2;
      return prime2;
    };
    function Red(m) {
      if (typeof m === "string") {
        var prime = BN2._prime(m);
        this.m = prime.p;
        this.prime = prime;
      } else {
        assert2(m.gtn(1), "modulus must be greater than 1");
        this.m = m;
        this.prime = null;
      }
    }
    Red.prototype._verify1 = function _verify1(a) {
      assert2(a.negative === 0, "red works only with positives");
      assert2(a.red, "red works only with red numbers");
    };
    Red.prototype._verify2 = function _verify2(a, b) {
      assert2((a.negative | b.negative) === 0, "red works only with positives");
      assert2(
        a.red && a.red === b.red,
        "red works only with red numbers"
      );
    };
    Red.prototype.imod = function imod(a) {
      if (this.prime)
        return this.prime.ireduce(a)._forceRed(this);
      return a.umod(this.m)._forceRed(this);
    };
    Red.prototype.neg = function neg4(a) {
      if (a.isZero()) {
        return a.clone();
      }
      return this.m.sub(a)._forceRed(this);
    };
    Red.prototype.add = function add5(a, b) {
      this._verify2(a, b);
      var res = a.add(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res._forceRed(this);
    };
    Red.prototype.iadd = function iadd(a, b) {
      this._verify2(a, b);
      var res = a.iadd(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res;
    };
    Red.prototype.sub = function sub(a, b) {
      this._verify2(a, b);
      var res = a.sub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Red.prototype.isub = function isub(a, b) {
      this._verify2(a, b);
      var res = a.isub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res;
    };
    Red.prototype.shl = function shl(a, num) {
      this._verify1(a);
      return this.imod(a.ushln(num));
    };
    Red.prototype.imul = function imul(a, b) {
      this._verify2(a, b);
      return this.imod(a.imul(b));
    };
    Red.prototype.mul = function mul5(a, b) {
      this._verify2(a, b);
      return this.imod(a.mul(b));
    };
    Red.prototype.isqr = function isqr(a) {
      return this.imul(a, a.clone());
    };
    Red.prototype.sqr = function sqr(a) {
      return this.mul(a, a);
    };
    Red.prototype.sqrt = function sqrt(a) {
      if (a.isZero())
        return a.clone();
      var mod3 = this.m.andln(3);
      assert2(mod3 % 2 === 1);
      if (mod3 === 3) {
        var pow = this.m.add(new BN2(1)).iushrn(2);
        return this.pow(a, pow);
      }
      var q = this.m.subn(1);
      var s2 = 0;
      while (!q.isZero() && q.andln(1) === 0) {
        s2++;
        q.iushrn(1);
      }
      assert2(!q.isZero());
      var one = new BN2(1).toRed(this);
      var nOne = one.redNeg();
      var lpow = this.m.subn(1).iushrn(1);
      var z = this.m.bitLength();
      z = new BN2(2 * z * z).toRed(this);
      while (this.pow(z, lpow).cmp(nOne) !== 0) {
        z.redIAdd(nOne);
      }
      var c = this.pow(z, q);
      var r2 = this.pow(a, q.addn(1).iushrn(1));
      var t = this.pow(a, q);
      var m = s2;
      while (t.cmp(one) !== 0) {
        var tmp = t;
        for (var i = 0; tmp.cmp(one) !== 0; i++) {
          tmp = tmp.redSqr();
        }
        assert2(i < m);
        var b = this.pow(c, new BN2(1).iushln(m - i - 1));
        r2 = r2.redMul(b);
        c = b.redSqr();
        t = t.redMul(c);
        m = i;
      }
      return r2;
    };
    Red.prototype.invm = function invm(a) {
      var inv = a._invmp(this.m);
      if (inv.negative !== 0) {
        inv.negative = 0;
        return this.imod(inv).redNeg();
      } else {
        return this.imod(inv);
      }
    };
    Red.prototype.pow = function pow(a, num) {
      if (num.isZero())
        return new BN2(1).toRed(this);
      if (num.cmpn(1) === 0)
        return a.clone();
      var windowSize = 4;
      var wnd = new Array(1 << windowSize);
      wnd[0] = new BN2(1).toRed(this);
      wnd[1] = a;
      for (var i = 2; i < wnd.length; i++) {
        wnd[i] = this.mul(wnd[i - 1], a);
      }
      var res = wnd[0];
      var current = 0;
      var currentLen = 0;
      var start = num.bitLength() % 26;
      if (start === 0) {
        start = 26;
      }
      for (i = num.length - 1; i >= 0; i--) {
        var word = num.words[i];
        for (var j = start - 1; j >= 0; j--) {
          var bit = word >> j & 1;
          if (res !== wnd[0]) {
            res = this.sqr(res);
          }
          if (bit === 0 && current === 0) {
            currentLen = 0;
            continue;
          }
          current <<= 1;
          current |= bit;
          currentLen++;
          if (currentLen !== windowSize && (i !== 0 || j !== 0))
            continue;
          res = this.mul(res, wnd[current]);
          currentLen = 0;
          current = 0;
        }
        start = 26;
      }
      return res;
    };
    Red.prototype.convertTo = function convertTo(num) {
      var r2 = num.umod(this.m);
      return r2 === num ? r2.clone() : r2;
    };
    Red.prototype.convertFrom = function convertFrom(num) {
      var res = num.clone();
      res.red = null;
      return res;
    };
    BN2.mont = function mont2(num) {
      return new Mont(num);
    };
    function Mont(m) {
      Red.call(this, m);
      this.shift = this.m.bitLength();
      if (this.shift % 26 !== 0) {
        this.shift += 26 - this.shift % 26;
      }
      this.r = new BN2(1).iushln(this.shift);
      this.r2 = this.imod(this.r.sqr());
      this.rinv = this.r._invmp(this.m);
      this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
      this.minv = this.minv.umod(this.r);
      this.minv = this.r.sub(this.minv);
    }
    inherits2(Mont, Red);
    Mont.prototype.convertTo = function convertTo(num) {
      return this.imod(num.ushln(this.shift));
    };
    Mont.prototype.convertFrom = function convertFrom(num) {
      var r2 = this.imod(num.mul(this.rinv));
      r2.red = null;
      return r2;
    };
    Mont.prototype.imul = function imul(a, b) {
      if (a.isZero() || b.isZero()) {
        a.words[0] = 0;
        a.length = 1;
        return a;
      }
      var t = a.imul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Mont.prototype.mul = function mul5(a, b) {
      if (a.isZero() || b.isZero())
        return new BN2(0)._forceRed(this);
      var t = a.mul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }
      return res._forceRed(this);
    };
    Mont.prototype.invm = function invm(a) {
      var res = this.imod(a._invmp(this.m).mul(this.r2));
      return res._forceRed(this);
    };
  })(module, commonjsGlobal);
})(bn);
var minimalisticAssert = assert$f;
function assert$f(val, msg) {
  if (!val)
    throw new Error(msg || "Assertion failed");
}
assert$f.equal = function assertEqual(l, r2, msg) {
  if (l != r2)
    throw new Error(msg || "Assertion failed: " + l + " != " + r2);
};
var utils$l = {};
(function(exports) {
  var utils2 = exports;
  function toArray2(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg !== "string") {
      for (var i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
      return res;
    }
    if (enc === "hex") {
      msg = msg.replace(/[^a-z0-9]+/ig, "");
      if (msg.length % 2 !== 0)
        msg = "0" + msg;
      for (var i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    } else {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 255;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    }
    return res;
  }
  utils2.toArray = toArray2;
  function zero22(word) {
    if (word.length === 1)
      return "0" + word;
    else
      return word;
  }
  utils2.zero2 = zero22;
  function toHex3(msg) {
    var res = "";
    for (var i = 0; i < msg.length; i++)
      res += zero22(msg[i].toString(16));
    return res;
  }
  utils2.toHex = toHex3;
  utils2.encode = function encode3(arr, enc) {
    if (enc === "hex")
      return toHex3(arr);
    else
      return arr;
  };
})(utils$l);
(function(exports) {
  var utils2 = exports;
  var BN2 = bn.exports;
  var minAssert = minimalisticAssert;
  var minUtils = utils$l;
  utils2.assert = minAssert;
  utils2.toArray = minUtils.toArray;
  utils2.zero2 = minUtils.zero2;
  utils2.toHex = minUtils.toHex;
  utils2.encode = minUtils.encode;
  function getNAF2(num, w, bits) {
    var naf = new Array(Math.max(num.bitLength(), bits) + 1);
    naf.fill(0);
    var ws = 1 << w + 1;
    var k = num.clone();
    for (var i = 0; i < naf.length; i++) {
      var z;
      var mod = k.andln(ws - 1);
      if (k.isOdd()) {
        if (mod > (ws >> 1) - 1)
          z = (ws >> 1) - mod;
        else
          z = mod;
        k.isubn(z);
      } else {
        z = 0;
      }
      naf[i] = z;
      k.iushrn(1);
    }
    return naf;
  }
  utils2.getNAF = getNAF2;
  function getJSF2(k1, k2) {
    var jsf = [
      [],
      []
    ];
    k1 = k1.clone();
    k2 = k2.clone();
    var d1 = 0;
    var d2 = 0;
    var m8;
    while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
      var m14 = k1.andln(3) + d1 & 3;
      var m24 = k2.andln(3) + d2 & 3;
      if (m14 === 3)
        m14 = -1;
      if (m24 === 3)
        m24 = -1;
      var u1;
      if ((m14 & 1) === 0) {
        u1 = 0;
      } else {
        m8 = k1.andln(7) + d1 & 7;
        if ((m8 === 3 || m8 === 5) && m24 === 2)
          u1 = -m14;
        else
          u1 = m14;
      }
      jsf[0].push(u1);
      var u2;
      if ((m24 & 1) === 0) {
        u2 = 0;
      } else {
        m8 = k2.andln(7) + d2 & 7;
        if ((m8 === 3 || m8 === 5) && m14 === 2)
          u2 = -m24;
        else
          u2 = m24;
      }
      jsf[1].push(u2);
      if (2 * d1 === u1 + 1)
        d1 = 1 - d1;
      if (2 * d2 === u2 + 1)
        d2 = 1 - d2;
      k1.iushrn(1);
      k2.iushrn(1);
    }
    return jsf;
  }
  utils2.getJSF = getJSF2;
  function cachedProperty2(obj, name2, computer) {
    var key2 = "_" + name2;
    obj.prototype[name2] = function cachedProperty3() {
      return this[key2] !== void 0 ? this[key2] : this[key2] = computer.call(this);
    };
  }
  utils2.cachedProperty = cachedProperty2;
  function parseBytes2(bytes) {
    return typeof bytes === "string" ? utils2.toArray(bytes, "hex") : bytes;
  }
  utils2.parseBytes = parseBytes2;
  function intFromLE(bytes) {
    return new BN2(bytes, "hex", "le");
  }
  utils2.intFromLE = intFromLE;
})(utils$m);
var brorand = { exports: {} };
var r$1;
brorand.exports = function rand(len) {
  if (!r$1)
    r$1 = new Rand(null);
  return r$1.generate(len);
};
function Rand(rand3) {
  this.rand = rand3;
}
brorand.exports.Rand = Rand;
Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};
Rand.prototype._rand = function _rand(n) {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);
  var res = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};
if (typeof self === "object") {
  if (self.crypto && self.crypto.getRandomValues) {
    Rand.prototype._rand = function _rand2(n) {
      var arr = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    Rand.prototype._rand = function _rand2(n) {
      var arr = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };
  } else if (typeof window === "object") {
    Rand.prototype._rand = function() {
      throw new Error("Not implemented yet");
    };
  }
} else {
  try {
    var crypto$1 = require$$0$1;
    if (typeof crypto$1.randomBytes !== "function")
      throw new Error("Not supported");
    Rand.prototype._rand = function _rand2(n) {
      return crypto$1.randomBytes(n);
    };
  } catch (e) {
  }
}
var curve = {};
var BN$7 = bn.exports;
var utils$k = utils$m;
var getNAF = utils$k.getNAF;
var getJSF = utils$k.getJSF;
var assert$e = utils$k.assert;
function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN$7(conf.p, 16);
  this.red = conf.prime ? BN$7.red(conf.prime) : BN$7.mont(this.p);
  this.zero = new BN$7(0).toRed(this.red);
  this.one = new BN$7(1).toRed(this.red);
  this.two = new BN$7(2).toRed(this.red);
  this.n = conf.n && new BN$7(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);
  this._bitLength = this.n ? this.n.bitLength() : 0;
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
var base = BaseCurve;
BaseCurve.prototype.point = function point() {
  throw new Error("Not implemented");
};
BaseCurve.prototype.validate = function validate() {
  throw new Error("Not implemented");
};
BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert$e(p.precomputed);
  var doubles = p._getDoubles();
  var naf = getNAF(k, 1, this._bitLength);
  var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;
  var repr = [];
  var j;
  var nafW;
  for (j = 0; j < naf.length; j += doubles.step) {
    nafW = 0;
    for (var l = j + doubles.step - 1; l >= j; l--)
      nafW = (nafW << 1) + naf[l];
    repr.push(nafW);
  }
  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (j = 0; j < repr.length; j++) {
      nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};
BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;
  var naf = getNAF(k, w, this._bitLength);
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    for (var l = 0; i >= 0 && naf[i] === 0; i--)
      l++;
    if (i >= 0)
      l++;
    acc = acc.dblp(l);
    if (i < 0)
      break;
    var z = naf[i];
    assert$e(z !== 0);
    if (p.type === "affine") {
      if (z > 0)
        acc = acc.mixedAdd(wnd[z - 1 >> 1]);
      else
        acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
    } else {
      if (z > 0)
        acc = acc.add(wnd[z - 1 >> 1]);
      else
        acc = acc.add(wnd[-z - 1 >> 1].neg());
    }
  }
  return p.type === "affine" ? acc.toP() : acc;
};
BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;
  var max = 0;
  var i;
  var j;
  var p;
  for (i = 0; i < len; i++) {
    p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }
  for (i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
      naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }
    var comb = [
      points[a],
      null,
      null,
      points[b]
    ];
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }
    var index = [
      -3,
      -1,
      -5,
      -7,
      0,
      7,
      5,
      1,
      3
    ];
    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;
      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }
  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (i = max; i >= 0; i--) {
    var k = 0;
    while (i >= 0) {
      var zero = true;
      for (j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;
    for (j = 0; j < len; j++) {
      var z = tmp[j];
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][z - 1 >> 1];
      else if (z < 0)
        p = wnd[j][-z - 1 >> 1].neg();
      if (p.type === "affine")
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  for (i = 0; i < len; i++)
    wnd[i] = null;
  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};
function BasePoint(curve2, type) {
  this.curve = curve2;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;
BasePoint.prototype.eq = function eq() {
  throw new Error("Not implemented");
};
BasePoint.prototype.validate = function validate2() {
  return this.curve.validate(this);
};
BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils$k.toArray(bytes, enc);
  var len = this.p.byteLength();
  if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
    if (bytes[0] === 6)
      assert$e(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 7)
      assert$e(bytes[bytes.length - 1] % 2 === 1);
    var res = this.point(
      bytes.slice(1, 1 + len),
      bytes.slice(1 + len, 1 + 2 * len)
    );
    return res;
  } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
  }
  throw new Error("Unknown point format");
};
BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};
BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray("be", len);
  if (compact)
    return [this.getY().isEven() ? 2 : 3].concat(x);
  return [4].concat(x, this.getY().toArray("be", len));
};
BasePoint.prototype.encode = function encode(enc, compact) {
  return utils$k.encode(this._encode(compact), enc);
};
BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;
  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;
  return this;
};
BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;
  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;
  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};
BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  var doubles = [this];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step,
    points: doubles
  };
};
BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  var res = [this];
  var max = (1 << wnd) - 1;
  var dbl5 = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl5);
  return {
    wnd,
    points: res
  };
};
BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};
BasePoint.prototype.dblp = function dblp(k) {
  var r2 = this;
  for (var i = 0; i < k; i++)
    r2 = r2.dbl();
  return r2;
};
var inherits_browser = { exports: {} };
if (typeof Object.create === "function") {
  inherits_browser.exports = function inherits2(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  inherits_browser.exports = function inherits2(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
var utils$j = utils$m;
var BN$6 = bn.exports;
var inherits$3 = inherits_browser.exports;
var Base$2 = base;
var assert$d = utils$j.assert;
function ShortCurve(conf) {
  Base$2.call(this, "short", conf);
  this.a = new BN$6(conf.a, 16).toRed(this.red);
  this.b = new BN$6(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();
  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits$3(ShortCurve, Base$2);
var short = ShortCurve;
ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN$6(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN$6(conf.lambda, 16);
  } else {
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert$d(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN$6(vec.a, 16),
        b: new BN$6(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }
  return {
    beta,
    lambda,
    basis
  };
};
ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  var red2 = num === this.p ? this.red : BN$6.mont(num);
  var tinv = new BN$6(2).toRed(red2).redInvm();
  var ntinv = tinv.redNeg();
  var s2 = new BN$6(3).toRed(red2).redNeg().redSqrt().redMul(tinv);
  var l1 = ntinv.redAdd(s2).fromRed();
  var l2 = ntinv.redSub(s2).fromRed();
  return [l1, l2];
};
ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN$6(1);
  var y1 = new BN$6(0);
  var x2 = new BN$6(0);
  var y2 = new BN$6(1);
  var a0;
  var b0;
  var a1;
  var b1;
  var a2;
  var b2;
  var prevR;
  var i = 0;
  var r2;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r2 = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));
    if (!a1 && r2.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r2.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r2;
    v = u;
    u = r2;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r2.neg();
  b2 = x;
  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }
  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 }
  ];
};
ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];
  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);
  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1, k2 };
};
ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN$6(x, 16);
  if (!x.red)
    x = x.toRed(this.red);
  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();
  return this.point(x, y);
};
ShortCurve.prototype.validate = function validate3(point5) {
  if (point5.inf)
    return true;
  var x = point5.x;
  var y = point5.y;
  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};
ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();
    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }
    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};
function Point$2(curve2, x, y, isRed) {
  Base$2.BasePoint.call(this, curve2, "affine");
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN$6(x, 16);
    this.y = new BN$6(y, 16);
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits$3(Point$2, Base$2.BasePoint);
ShortCurve.prototype.point = function point2(x, y, isRed) {
  return new Point$2(this, x, y, isRed);
};
ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red2) {
  return Point$2.fromJSON(this, obj, red2);
};
Point$2.prototype._getBeta = function _getBeta2() {
  if (!this.curve.endo)
    return;
  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;
  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve2 = this.curve;
    var endoMul = function(p) {
      return curve2.point(p.x.redMul(curve2.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};
Point$2.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [this.x, this.y];
  return [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }];
};
Point$2.fromJSON = function fromJSON(curve2, obj, red2) {
  if (typeof obj === "string")
    obj = JSON.parse(obj);
  var res = curve2.point(obj[0], obj[1], red2);
  if (!obj[2])
    return res;
  function obj2point(obj2) {
    return curve2.point(obj2[0], obj2[1], red2);
  }
  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [res].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [res].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};
Point$2.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return "<EC Point Infinity>";
  return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
Point$2.prototype.isInfinity = function isInfinity() {
  return this.inf;
};
Point$2.prototype.add = function add(p) {
  if (this.inf)
    return p;
  if (p.inf)
    return this;
  if (this.eq(p))
    return this.dbl();
  if (this.neg().eq(p))
    return this.curve.point(null, null);
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);
  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};
Point$2.prototype.dbl = function dbl() {
  if (this.inf)
    return this;
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);
  var a = this.curve.a;
  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};
Point$2.prototype.getX = function getX() {
  return this.x.fromRed();
};
Point$2.prototype.getY = function getY() {
  return this.y.fromRed();
};
Point$2.prototype.mul = function mul(k) {
  k = new BN$6(k, 16);
  if (this.isInfinity())
    return this;
  else if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([this], [k]);
  else
    return this.curve._wnafMul(this, k);
};
Point$2.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [this, p2];
  var coeffs = [k1, k2];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};
Point$2.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [this, p2];
  var coeffs = [k1, k2];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};
Point$2.prototype.eq = function eq2(p) {
  return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};
Point$2.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;
  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};
Point$2.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};
function JPoint(curve2, x, y, z) {
  Base$2.BasePoint.call(this, curve2, "jacobian");
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN$6(0);
  } else {
    this.x = new BN$6(x, 16);
    this.y = new BN$6(y, 16);
    this.z = new BN$6(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);
  this.zOne = this.z === this.curve.one;
}
inherits$3(JPoint, Base$2.BasePoint);
ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};
JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);
  return this.curve.point(ax, ay);
};
JPoint.prototype.neg = function neg2() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
JPoint.prototype.add = function add2(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));
  var h = u1.redSub(u2);
  var r2 = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r2.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }
  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);
  var nx = r2.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r2.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.mixedAdd = function mixedAdd(p) {
  if (this.isInfinity())
    return p.toJ();
  if (p.isInfinity())
    return this;
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);
  var h = u1.redSub(u2);
  var r2 = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r2.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }
  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);
  var nx = r2.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r2.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.dblp = function dblp2(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();
  var i;
  if (this.curve.zeroA || this.curve.threeA) {
    var r2 = this;
    for (i = 0; i < pow; i++)
      r2 = r2.dbl();
    return r2;
  }
  var a = this.curve.a;
  var tinv = this.curve.tinv;
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();
  var jyd = jy.redAdd(jy);
  for (i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);
    jx = nx;
    jz = nz;
    jyd = dny;
  }
  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};
JPoint.prototype.dbl = function dbl2() {
  if (this.isInfinity())
    return this;
  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};
JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  if (this.zOne) {
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var yyyy = yy.redSqr();
    var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s2 = s2.redIAdd(s2);
    var m = xx.redAdd(xx).redIAdd(xx);
    var t = m.redSqr().redISub(s2).redISub(s2);
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    nx = t;
    ny = m.redMul(s2.redISub(t)).redISub(yyyy8);
    nz = this.y.redAdd(this.y);
  } else {
    var a = this.x.redSqr();
    var b = this.y.redSqr();
    var c = b.redSqr();
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    var e = a.redAdd(a).redIAdd(a);
    var f2 = e.redSqr();
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);
    nx = f2.redISub(d).redISub(d);
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  if (this.zOne) {
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var yyyy = yy.redSqr();
    var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s2 = s2.redIAdd(s2);
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    var t = m.redSqr().redISub(s2).redISub(s2);
    nx = t;
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s2.redISub(t)).redISub(yyyy8);
    nz = this.y.redAdd(this.y);
  } else {
    var delta = this.z.redSqr();
    var gamma = this.y.redSqr();
    var beta = this.x.redMul(gamma);
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();
  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();
  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);
  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var xx = this.x.redSqr();
  var yy = this.y.redSqr();
  var zz = this.z.redSqr();
  var yyyy = yy.redSqr();
  var m = xx.redAdd(xx).redIAdd(xx);
  var mm = m.redSqr();
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  var ee = e.redSqr();
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
  return this.curve.jpoint(nx, ny, nz);
};
JPoint.prototype.mul = function mul2(k, kbase) {
  k = new BN$6(k, kbase);
  return this.curve._wnafMul(this, k);
};
JPoint.prototype.eq = function eq3(p) {
  if (p.type === "affine")
    return this.eq(p.toJ());
  if (this === p)
    return true;
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};
JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;
  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (; ; ) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;
    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};
JPoint.prototype.inspect = function inspect2() {
  if (this.isInfinity())
    return "<EC JPoint Infinity>";
  return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
JPoint.prototype.isInfinity = function isInfinity2() {
  return this.z.cmpn(0) === 0;
};
var BN$5 = bn.exports;
var inherits$2 = inherits_browser.exports;
var Base$1 = base;
var utils$i = utils$m;
function MontCurve(conf) {
  Base$1.call(this, "mont", conf);
  this.a = new BN$5(conf.a, 16).toRed(this.red);
  this.b = new BN$5(conf.b, 16).toRed(this.red);
  this.i4 = new BN$5(4).toRed(this.red).redInvm();
  this.two = new BN$5(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits$2(MontCurve, Base$1);
var mont = MontCurve;
MontCurve.prototype.validate = function validate4(point5) {
  var x = point5.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();
  return y.redSqr().cmp(rhs) === 0;
};
function Point$1(curve2, x, z) {
  Base$1.BasePoint.call(this, curve2, "projective");
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN$5(x, 16);
    this.z = new BN$5(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits$2(Point$1, Base$1.BasePoint);
MontCurve.prototype.decodePoint = function decodePoint2(bytes, enc) {
  return this.point(utils$i.toArray(bytes, enc), 1);
};
MontCurve.prototype.point = function point3(x, z) {
  return new Point$1(this, x, z);
};
MontCurve.prototype.pointFromJSON = function pointFromJSON2(obj) {
  return Point$1.fromJSON(this, obj);
};
Point$1.prototype.precompute = function precompute2() {
};
Point$1.prototype._encode = function _encode2() {
  return this.getX().toArray("be", this.curve.p.byteLength());
};
Point$1.fromJSON = function fromJSON2(curve2, obj) {
  return new Point$1(curve2, obj[0], obj[1] || curve2.one);
};
Point$1.prototype.inspect = function inspect3() {
  if (this.isInfinity())
    return "<EC Point Infinity>";
  return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
Point$1.prototype.isInfinity = function isInfinity3() {
  return this.z.cmpn(0) === 0;
};
Point$1.prototype.dbl = function dbl3() {
  var a = this.x.redAdd(this.z);
  var aa = a.redSqr();
  var b = this.x.redSub(this.z);
  var bb = b.redSqr();
  var c = aa.redSub(bb);
  var nx = aa.redMul(bb);
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};
Point$1.prototype.add = function add3() {
  throw new Error("Not supported on Montgomery curve");
};
Point$1.prototype.diffAdd = function diffAdd(p, diff) {
  var a = this.x.redAdd(this.z);
  var b = this.x.redSub(this.z);
  var c = p.x.redAdd(p.z);
  var d = p.x.redSub(p.z);
  var da = d.redMul(a);
  var cb = c.redMul(b);
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};
Point$1.prototype.mul = function mul3(k) {
  var t = k.clone();
  var a = this;
  var b = this.curve.point(null, null);
  var c = this;
  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));
  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      a = a.diffAdd(b, c);
      b = b.dbl();
    } else {
      b = a.diffAdd(b, c);
      a = a.dbl();
    }
  }
  return b;
};
Point$1.prototype.mulAdd = function mulAdd2() {
  throw new Error("Not supported on Montgomery curve");
};
Point$1.prototype.jumlAdd = function jumlAdd() {
  throw new Error("Not supported on Montgomery curve");
};
Point$1.prototype.eq = function eq4(other) {
  return this.getX().cmp(other.getX()) === 0;
};
Point$1.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};
Point$1.prototype.getX = function getX2() {
  this.normalize();
  return this.x.fromRed();
};
var utils$h = utils$m;
var BN$4 = bn.exports;
var inherits$1 = inherits_browser.exports;
var Base = base;
var assert$c = utils$h.assert;
function EdwardsCurve(conf) {
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;
  Base.call(this, "edwards", conf);
  this.a = new BN$4(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN$4(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN$4(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);
  assert$c(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits$1(EdwardsCurve, Base);
var edwards = EdwardsCurve;
EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};
EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};
EdwardsCurve.prototype.jpoint = function jpoint2(x, y, z, t) {
  return this.point(x, y, z, t);
};
EdwardsCurve.prototype.pointFromX = function pointFromX2(x, odd) {
  x = new BN$4(x, 16);
  if (!x.red)
    x = x.toRed(this.red);
  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));
  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();
  return this.point(x, y);
};
EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN$4(y, 16);
  if (!y.red)
    y = y.toRed(this.red);
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.c2);
  var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
  var x2 = lhs.redMul(rhs.redInvm());
  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error("invalid point");
    else
      return this.point(this.zero, y);
  }
  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  if (x.fromRed().isOdd() !== odd)
    x = x.redNeg();
  return this.point(x, y);
};
EdwardsCurve.prototype.validate = function validate5(point5) {
  if (point5.isInfinity())
    return true;
  point5.normalize();
  var x2 = point5.x.redSqr();
  var y2 = point5.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));
  return lhs.cmp(rhs) === 0;
};
function Point(curve2, x, y, z, t) {
  Base.BasePoint.call(this, curve2, "projective");
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN$4(x, 16);
    this.y = new BN$4(y, 16);
    this.z = z ? new BN$4(z, 16) : this.curve.one;
    this.t = t && new BN$4(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits$1(Point, Base.BasePoint);
EdwardsCurve.prototype.pointFromJSON = function pointFromJSON3(obj) {
  return Point.fromJSON(this, obj);
};
EdwardsCurve.prototype.point = function point4(x, y, z, t) {
  return new Point(this, x, y, z, t);
};
Point.fromJSON = function fromJSON3(curve2, obj) {
  return new Point(curve2, obj[0], obj[1], obj[2]);
};
Point.prototype.inspect = function inspect4() {
  if (this.isInfinity())
    return "<EC Point Infinity>";
  return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
Point.prototype.isInfinity = function isInfinity4() {
  return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
};
Point.prototype._extDbl = function _extDbl() {
  var a = this.x.redSqr();
  var b = this.y.redSqr();
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  var d = this.curve._mulA(a);
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  var g = d.redAdd(b);
  var f2 = g.redSub(c);
  var h = d.redSub(b);
  var nx = e.redMul(f2);
  var ny = g.redMul(h);
  var nt = e.redMul(h);
  var nz = f2.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};
Point.prototype._projDbl = function _projDbl() {
  var b = this.x.redAdd(this.y).redSqr();
  var c = this.x.redSqr();
  var d = this.y.redSqr();
  var nx;
  var ny;
  var nz;
  var e;
  var h;
  var j;
  if (this.curve.twisted) {
    e = this.curve._mulA(c);
    var f2 = e.redAdd(d);
    if (this.zOne) {
      nx = b.redSub(c).redSub(d).redMul(f2.redSub(this.curve.two));
      ny = f2.redMul(e.redSub(d));
      nz = f2.redSqr().redSub(f2).redSub(f2);
    } else {
      h = this.z.redSqr();
      j = f2.redSub(h).redISub(h);
      nx = b.redSub(c).redISub(d).redMul(j);
      ny = f2.redMul(e.redSub(d));
      nz = f2.redMul(j);
    }
  } else {
    e = c.redAdd(d);
    h = this.curve._mulC(this.z).redSqr();
    j = e.redSub(h).redSub(h);
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};
Point.prototype.dbl = function dbl4() {
  if (this.isInfinity())
    return this;
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};
Point.prototype._extAdd = function _extAdd(p) {
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  var d = this.z.redMul(p.z.redAdd(p.z));
  var e = b.redSub(a);
  var f2 = d.redSub(c);
  var g = d.redAdd(c);
  var h = b.redAdd(a);
  var nx = e.redMul(f2);
  var ny = g.redMul(h);
  var nt = e.redMul(h);
  var nz = f2.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};
Point.prototype._projAdd = function _projAdd(p) {
  var a = this.z.redMul(p.z);
  var b = a.redSqr();
  var c = this.x.redMul(p.x);
  var d = this.y.redMul(p.y);
  var e = this.curve.d.redMul(c).redMul(d);
  var f2 = b.redSub(e);
  var g = b.redAdd(e);
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f2).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    nz = f2.redMul(g);
  } else {
    ny = a.redMul(g).redMul(d.redSub(c));
    nz = this.curve._mulC(f2).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};
Point.prototype.add = function add4(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;
  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};
Point.prototype.mul = function mul4(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};
Point.prototype.mulAdd = function mulAdd3(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, false);
};
Point.prototype.jmulAdd = function jmulAdd2(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, true);
};
Point.prototype.normalize = function normalize2() {
  if (this.zOne)
    return this;
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};
Point.prototype.neg = function neg3() {
  return this.curve.point(
    this.x.redNeg(),
    this.y,
    this.z,
    this.t && this.t.redNeg()
  );
};
Point.prototype.getX = function getX3() {
  this.normalize();
  return this.x.fromRed();
};
Point.prototype.getY = function getY2() {
  this.normalize();
  return this.y.fromRed();
};
Point.prototype.eq = function eq5(other) {
  return this === other || this.getX().cmp(other.getX()) === 0 && this.getY().cmp(other.getY()) === 0;
};
Point.prototype.eqXToP = function eqXToP2(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;
  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (; ; ) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;
    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
};
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;
(function(exports) {
  var curve2 = exports;
  curve2.base = base;
  curve2.short = short;
  curve2.mont = mont;
  curve2.edwards = edwards;
})(curve);
var curves$2 = {};
var hash$2 = {};
var utils$g = {};
var assert$b = minimalisticAssert;
var inherits = inherits_browser.exports;
utils$g.inherits = inherits;
function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 64512) !== 55296) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 64512) === 56320;
}
function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === "string") {
    if (!enc) {
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = c >> 6 | 192;
          res[p++] = c & 63 | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
          res[p++] = c >> 18 | 240;
          res[p++] = c >> 12 & 63 | 128;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        } else {
          res[p++] = c >> 12 | 224;
          res[p++] = c >> 6 & 63 | 128;
          res[p++] = c & 63 | 128;
        }
      }
    } else if (enc === "hex") {
      msg = msg.replace(/[^a-z0-9]+/ig, "");
      if (msg.length % 2 !== 0)
        msg = "0" + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
utils$g.toArray = toArray;
function toHex(msg) {
  var res = "";
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils$g.toHex = toHex;
function htonl(w) {
  var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
  return res >>> 0;
}
utils$g.htonl = htonl;
function toHex32(msg, endian) {
  var res = "";
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === "little")
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
utils$g.toHex32 = toHex32;
function zero2(word) {
  if (word.length === 1)
    return "0" + word;
  else
    return word;
}
utils$g.zero2 = zero2;
function zero8(word) {
  if (word.length === 7)
    return "0" + word;
  else if (word.length === 6)
    return "00" + word;
  else if (word.length === 5)
    return "000" + word;
  else if (word.length === 4)
    return "0000" + word;
  else if (word.length === 3)
    return "00000" + word;
  else if (word.length === 2)
    return "000000" + word;
  else if (word.length === 1)
    return "0000000" + word;
  else
    return word;
}
utils$g.zero8 = zero8;
function join32(msg, start, end, endian) {
  var len = end - start;
  assert$b(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === "big")
      w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
    else
      w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
utils$g.join32 = join32;
function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === "big") {
      res[k] = m >>> 24;
      res[k + 1] = m >>> 16 & 255;
      res[k + 2] = m >>> 8 & 255;
      res[k + 3] = m & 255;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = m >>> 16 & 255;
      res[k + 1] = m >>> 8 & 255;
      res[k] = m & 255;
    }
  }
  return res;
}
utils$g.split32 = split32;
function rotr32$1(w, b) {
  return w >>> b | w << 32 - b;
}
utils$g.rotr32 = rotr32$1;
function rotl32$2(w, b) {
  return w << b | w >>> 32 - b;
}
utils$g.rotl32 = rotl32$2;
function sum32$3(a, b) {
  return a + b >>> 0;
}
utils$g.sum32 = sum32$3;
function sum32_3$1(a, b, c) {
  return a + b + c >>> 0;
}
utils$g.sum32_3 = sum32_3$1;
function sum32_4$2(a, b, c, d) {
  return a + b + c + d >>> 0;
}
utils$g.sum32_4 = sum32_4$2;
function sum32_5$2(a, b, c, d, e) {
  return a + b + c + d + e >>> 0;
}
utils$g.sum32_5 = sum32_5$2;
function sum64$1(buf2, pos, ah, al) {
  var bh = buf2[pos];
  var bl = buf2[pos + 1];
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf2[pos] = hi >>> 0;
  buf2[pos + 1] = lo;
}
utils$g.sum64 = sum64$1;
function sum64_hi$1(ah, al, bh, bl) {
  var lo = al + bl >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
utils$g.sum64_hi = sum64_hi$1;
function sum64_lo$1(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
utils$g.sum64_lo = sum64_lo$1;
function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
utils$g.sum64_4_hi = sum64_4_hi$1;
function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
utils$g.sum64_4_lo = sum64_4_lo$1;
function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = lo + bl >>> 0;
  carry += lo < al ? 1 : 0;
  lo = lo + cl >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = lo + dl >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = lo + el >>> 0;
  carry += lo < el ? 1 : 0;
  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
utils$g.sum64_5_hi = sum64_5_hi$1;
function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;
  return lo >>> 0;
}
utils$g.sum64_5_lo = sum64_5_lo$1;
function rotr64_hi$1(ah, al, num) {
  var r2 = al << 32 - num | ah >>> num;
  return r2 >>> 0;
}
utils$g.rotr64_hi = rotr64_hi$1;
function rotr64_lo$1(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
utils$g.rotr64_lo = rotr64_lo$1;
function shr64_hi$1(ah, al, num) {
  return ah >>> num;
}
utils$g.shr64_hi = shr64_hi$1;
function shr64_lo$1(ah, al, num) {
  var r2 = ah << 32 - num | al >>> num;
  return r2 >>> 0;
}
utils$g.shr64_lo = shr64_lo$1;
var common$5 = {};
var utils$f = utils$g;
var assert$a = minimalisticAssert;
function BlockHash$4() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = "big";
  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
common$5.BlockHash = BlockHash$4;
BlockHash$4.prototype.update = function update(msg, enc) {
  msg = utils$f.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;
  if (this.pending.length >= this._delta8) {
    msg = this.pending;
    var r2 = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r2, msg.length);
    if (this.pending.length === 0)
      this.pending = null;
    msg = utils$f.join32(msg, 0, msg.length - r2, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }
  return this;
};
BlockHash$4.prototype.digest = function digest2(enc) {
  this.update(this._pad());
  assert$a(this.pending === null);
  return this._digest(enc);
};
BlockHash$4.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - (len + this.padLength) % bytes;
  var res = new Array(k + this.padLength);
  res[0] = 128;
  for (var i = 1; i < k; i++)
    res[i] = 0;
  len <<= 3;
  if (this.endian === "big") {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = len >>> 24 & 255;
    res[i++] = len >>> 16 & 255;
    res[i++] = len >>> 8 & 255;
    res[i++] = len & 255;
  } else {
    res[i++] = len & 255;
    res[i++] = len >>> 8 & 255;
    res[i++] = len >>> 16 & 255;
    res[i++] = len >>> 24 & 255;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }
  return res;
};
var sha = {};
var common$4 = {};
var utils$e = utils$g;
var rotr32 = utils$e.rotr32;
function ft_1$1(s2, x, y, z) {
  if (s2 === 0)
    return ch32$1(x, y, z);
  if (s2 === 1 || s2 === 3)
    return p32(x, y, z);
  if (s2 === 2)
    return maj32$1(x, y, z);
}
common$4.ft_1 = ft_1$1;
function ch32$1(x, y, z) {
  return x & y ^ ~x & z;
}
common$4.ch32 = ch32$1;
function maj32$1(x, y, z) {
  return x & y ^ x & z ^ y & z;
}
common$4.maj32 = maj32$1;
function p32(x, y, z) {
  return x ^ y ^ z;
}
common$4.p32 = p32;
function s0_256$1(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
common$4.s0_256 = s0_256$1;
function s1_256$1(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
common$4.s1_256 = s1_256$1;
function g0_256$1(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
}
common$4.g0_256 = g0_256$1;
function g1_256$1(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
}
common$4.g1_256 = g1_256$1;
var utils$d = utils$g;
var common$3 = common$5;
var shaCommon$1 = common$4;
var rotl32$1 = utils$d.rotl32;
var sum32$2 = utils$d.sum32;
var sum32_5$1 = utils$d.sum32_5;
var ft_1 = shaCommon$1.ft_1;
var BlockHash$3 = common$3.BlockHash;
var sha1_K = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();
  BlockHash$3.call(this);
  this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ];
  this.W = new Array(80);
}
utils$d.inherits(SHA1, BlockHash$3);
var _1 = SHA1;
SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;
SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;
  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  for (i = 0; i < W.length; i++) {
    var s2 = ~~(i / 20);
    var t = sum32_5$1(rotl32$1(a, 5), ft_1(s2, b, c, d), e, W[i], sha1_K[s2]);
    e = d;
    d = c;
    c = rotl32$1(b, 30);
    b = a;
    a = t;
  }
  this.h[0] = sum32$2(this.h[0], a);
  this.h[1] = sum32$2(this.h[1], b);
  this.h[2] = sum32$2(this.h[2], c);
  this.h[3] = sum32$2(this.h[3], d);
  this.h[4] = sum32$2(this.h[4], e);
};
SHA1.prototype._digest = function digest3(enc) {
  if (enc === "hex")
    return utils$d.toHex32(this.h, "big");
  else
    return utils$d.split32(this.h, "big");
};
var utils$c = utils$g;
var common$2 = common$5;
var shaCommon = common$4;
var assert$9 = minimalisticAssert;
var sum32$1 = utils$c.sum32;
var sum32_4$1 = utils$c.sum32_4;
var sum32_5 = utils$c.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;
var BlockHash$2 = common$2.BlockHash;
var sha256_K = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
function SHA256$1() {
  if (!(this instanceof SHA256$1))
    return new SHA256$1();
  BlockHash$2.call(this);
  this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils$c.inherits(SHA256$1, BlockHash$2);
var _256 = SHA256$1;
SHA256$1.blockSize = 512;
SHA256$1.outSize = 256;
SHA256$1.hmacStrength = 192;
SHA256$1.padLength = 64;
SHA256$1.prototype._update = function _update2(msg, start) {
  var W = this.W;
  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f2 = this.h[5];
  var g = this.h[6];
  var h = this.h[7];
  assert$9(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f2, g), this.k[i], W[i]);
    var T2 = sum32$1(s0_256(a), maj32(a, b, c));
    h = g;
    g = f2;
    f2 = e;
    e = sum32$1(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32$1(T1, T2);
  }
  this.h[0] = sum32$1(this.h[0], a);
  this.h[1] = sum32$1(this.h[1], b);
  this.h[2] = sum32$1(this.h[2], c);
  this.h[3] = sum32$1(this.h[3], d);
  this.h[4] = sum32$1(this.h[4], e);
  this.h[5] = sum32$1(this.h[5], f2);
  this.h[6] = sum32$1(this.h[6], g);
  this.h[7] = sum32$1(this.h[7], h);
};
SHA256$1.prototype._digest = function digest4(enc) {
  if (enc === "hex")
    return utils$c.toHex32(this.h, "big");
  else
    return utils$c.split32(this.h, "big");
};
var utils$b = utils$g;
var SHA256 = _256;
function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();
  SHA256.call(this);
  this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
utils$b.inherits(SHA224, SHA256);
var _224 = SHA224;
SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;
SHA224.prototype._digest = function digest5(enc) {
  if (enc === "hex")
    return utils$b.toHex32(this.h.slice(0, 7), "big");
  else
    return utils$b.split32(this.h.slice(0, 7), "big");
};
var utils$a = utils$g;
var common$1 = common$5;
var assert$8 = minimalisticAssert;
var rotr64_hi = utils$a.rotr64_hi;
var rotr64_lo = utils$a.rotr64_lo;
var shr64_hi = utils$a.shr64_hi;
var shr64_lo = utils$a.shr64_lo;
var sum64 = utils$a.sum64;
var sum64_hi = utils$a.sum64_hi;
var sum64_lo = utils$a.sum64_lo;
var sum64_4_hi = utils$a.sum64_4_hi;
var sum64_4_lo = utils$a.sum64_4_lo;
var sum64_5_hi = utils$a.sum64_5_hi;
var sum64_5_lo = utils$a.sum64_5_lo;
var BlockHash$1 = common$1.BlockHash;
var sha512_K = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
function SHA512$1() {
  if (!(this instanceof SHA512$1))
    return new SHA512$1();
  BlockHash$1.call(this);
  this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils$a.inherits(SHA512$1, BlockHash$1);
var _512 = SHA512$1;
SHA512$1.blockSize = 1024;
SHA512$1.outSize = 512;
SHA512$1.hmacStrength = 192;
SHA512$1.padLength = 128;
SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];
    var c3_lo = W[i - 31];
    W[i] = sum64_4_hi(
      c0_hi,
      c0_lo,
      c1_hi,
      c1_lo,
      c2_hi,
      c2_lo,
      c3_hi,
      c3_lo
    );
    W[i + 1] = sum64_4_lo(
      c0_hi,
      c0_lo,
      c1_hi,
      c1_lo,
      c2_hi,
      c2_lo,
      c3_hi,
      c3_lo
    );
  }
};
SHA512$1.prototype._update = function _update3(msg, start) {
  this._prepareBlock(msg, start);
  var W = this.W;
  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];
  assert$8(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];
    var T1_hi = sum64_5_hi(
      c0_hi,
      c0_lo,
      c1_hi,
      c1_lo,
      c2_hi,
      c2_lo,
      c3_hi,
      c3_lo,
      c4_hi,
      c4_lo
    );
    var T1_lo = sum64_5_lo(
      c0_hi,
      c0_lo,
      c1_hi,
      c1_lo,
      c2_hi,
      c2_lo,
      c3_hi,
      c3_lo,
      c4_hi,
      c4_lo
    );
    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
    hh = gh;
    hl = gl;
    gh = fh;
    gl = fl;
    fh = eh;
    fl = el;
    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);
    dh = ch;
    dl = cl;
    ch = bh;
    cl = bl;
    bh = ah;
    bl = al;
    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }
  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};
SHA512$1.prototype._digest = function digest6(enc) {
  if (enc === "hex")
    return utils$a.toHex32(this.h, "big");
  else
    return utils$a.split32(this.h, "big");
};
function ch64_hi(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ ~xh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ ~xl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_hi(xh, xl, yh, yl, zh) {
  var r2 = xh & yh ^ xh & zh ^ yh & zh;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r2 = xl & yl ^ xl & zl ^ yl & zl;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);
  var c2_hi = rotr64_hi(xl, xh, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);
  var c2_lo = rotr64_lo(xl, xh, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);
  var c2_hi = shr64_hi(xh, xl, 6);
  var r2 = c0_hi ^ c1_hi ^ c2_hi;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);
  var c2_lo = shr64_lo(xh, xl, 6);
  var r2 = c0_lo ^ c1_lo ^ c2_lo;
  if (r2 < 0)
    r2 += 4294967296;
  return r2;
}
var utils$9 = utils$g;
var SHA512 = _512;
function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();
  SHA512.call(this);
  this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
utils$9.inherits(SHA384, SHA512);
var _384 = SHA384;
SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;
SHA384.prototype._digest = function digest7(enc) {
  if (enc === "hex")
    return utils$9.toHex32(this.h.slice(0, 12), "big");
  else
    return utils$9.split32(this.h.slice(0, 12), "big");
};
sha.sha1 = _1;
sha.sha224 = _224;
sha.sha256 = _256;
sha.sha384 = _384;
sha.sha512 = _512;
var ripemd = {};
var utils$8 = utils$g;
var common = common$5;
var rotl32 = utils$8.rotl32;
var sum32 = utils$8.sum32;
var sum32_3 = utils$8.sum32_3;
var sum32_4 = utils$8.sum32_4;
var BlockHash = common.BlockHash;
function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();
  BlockHash.call(this);
  this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  this.endian = "little";
}
utils$8.inherits(RIPEMD160, BlockHash);
ripemd.ripemd160 = RIPEMD160;
RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;
RIPEMD160.prototype._update = function update2(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]
      ),
      E
    );
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]
      ),
      Eh
    );
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};
RIPEMD160.prototype._digest = function digest8(enc) {
  if (enc === "hex")
    return utils$8.toHex32(this.h, "little");
  else
    return utils$8.split32(this.h, "little");
};
function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return x & y | ~x & z;
  else if (j <= 47)
    return (x | ~y) ^ z;
  else if (j <= 63)
    return x & z | y & ~z;
  else
    return x ^ (y | ~z);
}
function K(j) {
  if (j <= 15)
    return 0;
  else if (j <= 31)
    return 1518500249;
  else if (j <= 47)
    return 1859775393;
  else if (j <= 63)
    return 2400959708;
  else
    return 2840853838;
}
function Kh(j) {
  if (j <= 15)
    return 1352829926;
  else if (j <= 31)
    return 1548603684;
  else if (j <= 47)
    return 1836072691;
  else if (j <= 63)
    return 2053994217;
  else
    return 0;
}
var r = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
];
var rh = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
];
var s = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
];
var sh = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
];
var utils$7 = utils$g;
var assert$7 = minimalisticAssert;
function Hmac(hash3, key2, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash3, key2, enc);
  this.Hash = hash3;
  this.blockSize = hash3.blockSize / 8;
  this.outSize = hash3.outSize / 8;
  this.inner = null;
  this.outer = null;
  this._init(utils$7.toArray(key2, enc));
}
var hmac = Hmac;
Hmac.prototype._init = function init2(key2) {
  if (key2.length > this.blockSize)
    key2 = new this.Hash().update(key2).digest();
  assert$7(key2.length <= this.blockSize);
  for (var i = key2.length; i < this.blockSize; i++)
    key2.push(0);
  for (i = 0; i < key2.length; i++)
    key2[i] ^= 54;
  this.inner = new this.Hash().update(key2);
  for (i = 0; i < key2.length; i++)
    key2[i] ^= 106;
  this.outer = new this.Hash().update(key2);
};
Hmac.prototype.update = function update3(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};
Hmac.prototype.digest = function digest9(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};
(function(exports) {
  var hash3 = exports;
  hash3.utils = utils$g;
  hash3.common = common$5;
  hash3.sha = sha;
  hash3.ripemd = ripemd;
  hash3.hmac = hmac;
  hash3.sha1 = hash3.sha.sha1;
  hash3.sha256 = hash3.sha.sha256;
  hash3.sha224 = hash3.sha.sha224;
  hash3.sha384 = hash3.sha.sha384;
  hash3.sha512 = hash3.sha.sha512;
  hash3.ripemd160 = hash3.ripemd.ripemd160;
})(hash$2);
var secp256k1;
var hasRequiredSecp256k1;
function requireSecp256k1() {
  if (hasRequiredSecp256k1)
    return secp256k1;
  hasRequiredSecp256k1 = 1;
  secp256k1 = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
        ]
      ]
    }
  };
  return secp256k1;
}
(function(exports) {
  var curves2 = exports;
  var hash3 = hash$2;
  var curve$1 = curve;
  var utils2 = utils$m;
  var assert2 = utils2.assert;
  function PresetCurve(options) {
    if (options.type === "short")
      this.curve = new curve$1.short(options);
    else if (options.type === "edwards")
      this.curve = new curve$1.edwards(options);
    else
      this.curve = new curve$1.mont(options);
    this.g = this.curve.g;
    this.n = this.curve.n;
    this.hash = options.hash;
    assert2(this.g.validate(), "Invalid curve");
    assert2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  curves2.PresetCurve = PresetCurve;
  function defineCurve(name2, options) {
    Object.defineProperty(curves2, name2, {
      configurable: true,
      enumerable: true,
      get: function() {
        var curve2 = new PresetCurve(options);
        Object.defineProperty(curves2, name2, {
          configurable: true,
          enumerable: true,
          value: curve2
        });
        return curve2;
      }
    });
  }
  defineCurve("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: hash3.sha256,
    gRed: false,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  });
  defineCurve("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: hash3.sha256,
    gRed: false,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  });
  defineCurve("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: hash3.sha256,
    gRed: false,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  });
  defineCurve("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: hash3.sha384,
    gRed: false,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  });
  defineCurve("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: hash3.sha512,
    gRed: false,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  });
  defineCurve("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: hash3.sha256,
    gRed: false,
    g: [
      "9"
    ]
  });
  defineCurve("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: hash3.sha256,
    gRed: false,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var pre;
  try {
    pre = requireSecp256k1();
  } catch (e) {
    pre = void 0;
  }
  defineCurve("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: hash3.sha256,
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: false,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      pre
    ]
  });
})(curves$2);
var hash$1 = hash$2;
var utils$6 = utils$l;
var assert$6 = minimalisticAssert;
function HmacDRBG$1(options) {
  if (!(this instanceof HmacDRBG$1))
    return new HmacDRBG$1(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;
  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;
  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;
  var entropy = utils$6.toArray(options.entropy, options.entropyEnc || "hex");
  var nonce = utils$6.toArray(options.nonce, options.nonceEnc || "hex");
  var pers = utils$6.toArray(options.pers, options.persEnc || "hex");
  assert$6(
    entropy.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  );
  this._init(entropy, nonce, pers);
}
var hmacDrbg = HmacDRBG$1;
HmacDRBG$1.prototype._init = function init3(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);
  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0;
    this.V[i] = 1;
  }
  this._update(seed);
  this._reseed = 1;
  this.reseedInterval = 281474976710656;
};
HmacDRBG$1.prototype._hmac = function hmac2() {
  return new hash$1.hmac(this.hash, this.K);
};
HmacDRBG$1.prototype._update = function update4(seed) {
  var kmac = this._hmac().update(this.V).update([0]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;
  this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
  this.V = this._hmac().update(this.V).digest();
};
HmacDRBG$1.prototype.reseed = function reseed(entropy, entropyEnc, add5, addEnc) {
  if (typeof entropyEnc !== "string") {
    addEnc = add5;
    add5 = entropyEnc;
    entropyEnc = null;
  }
  entropy = utils$6.toArray(entropy, entropyEnc);
  add5 = utils$6.toArray(add5, addEnc);
  assert$6(
    entropy.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  );
  this._update(entropy.concat(add5 || []));
  this._reseed = 1;
};
HmacDRBG$1.prototype.generate = function generate2(len, enc, add5, addEnc) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  if (typeof enc !== "string") {
    addEnc = add5;
    add5 = enc;
    enc = null;
  }
  if (add5) {
    add5 = utils$6.toArray(add5, addEnc || "hex");
    this._update(add5);
  }
  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }
  var res = temp.slice(0, len);
  this._update(add5);
  this._reseed++;
  return utils$6.encode(res, enc);
};
var BN$3 = bn.exports;
var utils$5 = utils$m;
var assert$5 = utils$5.assert;
function KeyPair$3(ec2, options) {
  this.ec = ec2;
  this.priv = null;
  this.pub = null;
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
var key$1 = KeyPair$3;
KeyPair$3.fromPublic = function fromPublic(ec2, pub2, enc) {
  if (pub2 instanceof KeyPair$3)
    return pub2;
  return new KeyPair$3(ec2, {
    pub: pub2,
    pubEnc: enc
  });
};
KeyPair$3.fromPrivate = function fromPrivate(ec2, priv2, enc) {
  if (priv2 instanceof KeyPair$3)
    return priv2;
  return new KeyPair$3(ec2, {
    priv: priv2,
    privEnc: enc
  });
};
KeyPair$3.prototype.validate = function validate6() {
  var pub2 = this.getPublic();
  if (pub2.isInfinity())
    return { result: false, reason: "Invalid public key" };
  if (!pub2.validate())
    return { result: false, reason: "Public key is not a point" };
  if (!pub2.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: "Public key * N != O" };
  return { result: true, reason: null };
};
KeyPair$3.prototype.getPublic = function getPublic(compact, enc) {
  if (typeof compact === "string") {
    enc = compact;
    compact = null;
  }
  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);
  if (!enc)
    return this.pub;
  return this.pub.encode(enc, compact);
};
KeyPair$3.prototype.getPrivate = function getPrivate(enc) {
  if (enc === "hex")
    return this.priv.toString(16, 2);
  else
    return this.priv;
};
KeyPair$3.prototype._importPrivate = function _importPrivate(key2, enc) {
  this.priv = new BN$3(key2, enc || 16);
  this.priv = this.priv.umod(this.ec.curve.n);
};
KeyPair$3.prototype._importPublic = function _importPublic(key2, enc) {
  if (key2.x || key2.y) {
    if (this.ec.curve.type === "mont") {
      assert$5(key2.x, "Need x coordinate");
    } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
      assert$5(key2.x && key2.y, "Need both x and y coordinate");
    }
    this.pub = this.ec.curve.point(key2.x, key2.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key2, enc);
};
KeyPair$3.prototype.derive = function derive(pub2) {
  if (!pub2.validate()) {
    assert$5(pub2.validate(), "public point not validated");
  }
  return pub2.mul(this.priv).getX();
};
KeyPair$3.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};
KeyPair$3.prototype.verify = function verify(msg, signature2) {
  return this.ec.verify(msg, signature2, this);
};
KeyPair$3.prototype.inspect = function inspect5() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var BN$2 = bn.exports;
var utils$4 = utils$m;
var assert$4 = utils$4.assert;
function Signature$3(options, enc) {
  if (options instanceof Signature$3)
    return options;
  if (this._importDER(options, enc))
    return;
  assert$4(options.r && options.s, "Signature without r or s");
  this.r = new BN$2(options.r, 16);
  this.s = new BN$2(options.s, 16);
  if (options.recoveryParam === void 0)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
var signature$1 = Signature$3;
function Position() {
  this.place = 0;
}
function getLength(buf2, p) {
  var initial = buf2[p.place++];
  if (!(initial & 128)) {
    return initial;
  }
  var octetLen = initial & 15;
  if (octetLen === 0 || octetLen > 4) {
    return false;
  }
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf2[off];
    val >>>= 0;
  }
  if (val <= 127) {
    return false;
  }
  p.place = off;
  return val;
}
function rmPadding(buf2) {
  var i = 0;
  var len = buf2.length - 1;
  while (!buf2[i] && !(buf2[i + 1] & 128) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf2;
  }
  return buf2.slice(i);
}
Signature$3.prototype._importDER = function _importDER(data, enc) {
  data = utils$4.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 48) {
    return false;
  }
  var len = getLength(data, p);
  if (len === false) {
    return false;
  }
  if (len + p.place !== data.length) {
    return false;
  }
  if (data[p.place++] !== 2) {
    return false;
  }
  var rlen = getLength(data, p);
  if (rlen === false) {
    return false;
  }
  var r2 = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 2) {
    return false;
  }
  var slen = getLength(data, p);
  if (slen === false) {
    return false;
  }
  if (data.length !== slen + p.place) {
    return false;
  }
  var s2 = data.slice(p.place, slen + p.place);
  if (r2[0] === 0) {
    if (r2[1] & 128) {
      r2 = r2.slice(1);
    } else {
      return false;
    }
  }
  if (s2[0] === 0) {
    if (s2[1] & 128) {
      s2 = s2.slice(1);
    } else {
      return false;
    }
  }
  this.r = new BN$2(r2);
  this.s = new BN$2(s2);
  this.recoveryParam = null;
  return true;
};
function constructLength(arr, len) {
  if (len < 128) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 128);
  while (--octets) {
    arr.push(len >>> (octets << 3) & 255);
  }
  arr.push(len);
}
Signature$3.prototype.toDER = function toDER(enc) {
  var r2 = this.r.toArray();
  var s2 = this.s.toArray();
  if (r2[0] & 128)
    r2 = [0].concat(r2);
  if (s2[0] & 128)
    s2 = [0].concat(s2);
  r2 = rmPadding(r2);
  s2 = rmPadding(s2);
  while (!s2[0] && !(s2[1] & 128)) {
    s2 = s2.slice(1);
  }
  var arr = [2];
  constructLength(arr, r2.length);
  arr = arr.concat(r2);
  arr.push(2);
  constructLength(arr, s2.length);
  var backHalf = arr.concat(s2);
  var res = [48];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils$4.encode(res, enc);
};
var BN$1 = bn.exports;
var HmacDRBG = hmacDrbg;
var utils$3 = utils$m;
var curves$1 = curves$2;
var rand2 = brorand.exports;
var assert$3 = utils$3.assert;
var KeyPair$2 = key$1;
var Signature$2 = signature$1;
function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);
  if (typeof options === "string") {
    assert$3(
      Object.prototype.hasOwnProperty.call(curves$1, options),
      "Unknown curve " + options
    );
    options = curves$1[options];
  }
  if (options instanceof curves$1.PresetCurve)
    options = { curve: options };
  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);
  this.hash = options.hash || options.curve.hash;
}
var ec = EC;
EC.prototype.keyPair = function keyPair(options) {
  return new KeyPair$2(this, options);
};
EC.prototype.keyFromPrivate = function keyFromPrivate(priv2, enc) {
  return KeyPair$2.fromPrivate(this, priv2, enc);
};
EC.prototype.keyFromPublic = function keyFromPublic(pub2, enc) {
  return KeyPair$2.fromPublic(this, pub2, enc);
};
EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};
  var drbg = new HmacDRBG({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || "utf8",
    entropy: options.entropy || rand2(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || "utf8",
    nonce: this.n.toArray()
  });
  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN$1(2));
  for (; ; ) {
    var priv2 = new BN$1(drbg.generate(bytes));
    if (priv2.cmp(ns2) > 0)
      continue;
    priv2.iaddn(1);
    return this.keyFromPrivate(priv2);
  }
};
EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};
EC.prototype.sign = function sign2(msg, key2, enc, options) {
  if (typeof enc === "object") {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};
  key2 = this.keyFromPrivate(key2, enc);
  msg = this._truncateToN(new BN$1(msg, 16));
  var bytes = this.n.byteLength();
  var bkey = key2.getPrivate().toArray("be", bytes);
  var nonce = msg.toArray("be", bytes);
  var drbg = new HmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce,
    pers: options.pers,
    persEnc: options.persEnc || "utf8"
  });
  var ns1 = this.n.sub(new BN$1(1));
  for (var iter = 0; ; iter++) {
    var k = options.k ? options.k(iter) : new BN$1(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;
    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;
    var kpX = kp.getX();
    var r2 = kpX.umod(this.n);
    if (r2.cmpn(0) === 0)
      continue;
    var s2 = k.invm(this.n).mul(r2.mul(key2.getPrivate()).iadd(msg));
    s2 = s2.umod(this.n);
    if (s2.cmpn(0) === 0)
      continue;
    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r2) !== 0 ? 2 : 0);
    if (options.canonical && s2.cmp(this.nh) > 0) {
      s2 = this.n.sub(s2);
      recoveryParam ^= 1;
    }
    return new Signature$2({ r: r2, s: s2, recoveryParam });
  }
};
EC.prototype.verify = function verify2(msg, signature2, key2, enc) {
  msg = this._truncateToN(new BN$1(msg, 16));
  key2 = this.keyFromPublic(key2, enc);
  signature2 = new Signature$2(signature2, "hex");
  var r2 = signature2.r;
  var s2 = signature2.s;
  if (r2.cmpn(1) < 0 || r2.cmp(this.n) >= 0)
    return false;
  if (s2.cmpn(1) < 0 || s2.cmp(this.n) >= 0)
    return false;
  var sinv = s2.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r2).umod(this.n);
  var p;
  if (!this.curve._maxwellTrick) {
    p = this.g.mulAdd(u1, key2.getPublic(), u2);
    if (p.isInfinity())
      return false;
    return p.getX().umod(this.n).cmp(r2) === 0;
  }
  p = this.g.jmulAdd(u1, key2.getPublic(), u2);
  if (p.isInfinity())
    return false;
  return p.eqXToP(r2);
};
EC.prototype.recoverPubKey = function(msg, signature2, j, enc) {
  assert$3((3 & j) === j, "The recovery param is more than two bits");
  signature2 = new Signature$2(signature2, enc);
  var n = this.n;
  var e = new BN$1(msg);
  var r2 = signature2.r;
  var s2 = signature2.s;
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r2.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error("Unable to find sencond key candinate");
  if (isSecondKey)
    r2 = this.curve.pointFromX(r2.add(this.curve.n), isYOdd);
  else
    r2 = this.curve.pointFromX(r2, isYOdd);
  var rInv = signature2.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s22 = s2.mul(rInv).umod(n);
  return this.g.mulAdd(s1, r2, s22);
};
EC.prototype.getKeyRecoveryParam = function(e, signature2, Q, enc) {
  signature2 = new Signature$2(signature2, enc);
  if (signature2.recoveryParam !== null)
    return signature2.recoveryParam;
  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature2, i);
    } catch (e2) {
      continue;
    }
    if (Qprime.eq(Q))
      return i;
  }
  throw new Error("Unable to find valid recovery factor");
};
var utils$2 = utils$m;
var assert$2 = utils$2.assert;
var parseBytes$2 = utils$2.parseBytes;
var cachedProperty$1 = utils$2.cachedProperty;
function KeyPair$1(eddsa2, params) {
  this.eddsa = eddsa2;
  this._secret = parseBytes$2(params.secret);
  if (eddsa2.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes$2(params.pub);
}
KeyPair$1.fromPublic = function fromPublic2(eddsa2, pub2) {
  if (pub2 instanceof KeyPair$1)
    return pub2;
  return new KeyPair$1(eddsa2, { pub: pub2 });
};
KeyPair$1.fromSecret = function fromSecret(eddsa2, secret2) {
  if (secret2 instanceof KeyPair$1)
    return secret2;
  return new KeyPair$1(eddsa2, { secret: secret2 });
};
KeyPair$1.prototype.secret = function secret() {
  return this._secret;
};
cachedProperty$1(KeyPair$1, "pubBytes", function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});
cachedProperty$1(KeyPair$1, "pub", function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});
cachedProperty$1(KeyPair$1, "privBytes", function privBytes() {
  var eddsa2 = this.eddsa;
  var hash3 = this.hash();
  var lastIx = eddsa2.encodingLength - 1;
  var a = hash3.slice(0, eddsa2.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;
  return a;
});
cachedProperty$1(KeyPair$1, "priv", function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});
cachedProperty$1(KeyPair$1, "hash", function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});
cachedProperty$1(KeyPair$1, "messagePrefix", function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});
KeyPair$1.prototype.sign = function sign3(message) {
  assert$2(this._secret, "KeyPair can only verify");
  return this.eddsa.sign(message, this);
};
KeyPair$1.prototype.verify = function verify3(message, sig) {
  return this.eddsa.verify(message, sig, this);
};
KeyPair$1.prototype.getSecret = function getSecret(enc) {
  assert$2(this._secret, "KeyPair is public only");
  return utils$2.encode(this.secret(), enc);
};
KeyPair$1.prototype.getPublic = function getPublic2(enc) {
  return utils$2.encode(this.pubBytes(), enc);
};
var key = KeyPair$1;
var BN = bn.exports;
var utils$1 = utils$m;
var assert$1 = utils$1.assert;
var cachedProperty = utils$1.cachedProperty;
var parseBytes$1 = utils$1.parseBytes;
function Signature$1(eddsa2, sig) {
  this.eddsa = eddsa2;
  if (typeof sig !== "object")
    sig = parseBytes$1(sig);
  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa2.encodingLength),
      S: sig.slice(eddsa2.encodingLength)
    };
  }
  assert$1(sig.R && sig.S, "Signature without R or S");
  if (eddsa2.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN)
    this._S = sig.S;
  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}
cachedProperty(Signature$1, "S", function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});
cachedProperty(Signature$1, "R", function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});
cachedProperty(Signature$1, "Rencoded", function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});
cachedProperty(Signature$1, "Sencoded", function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});
Signature$1.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};
Signature$1.prototype.toHex = function toHex2() {
  return utils$1.encode(this.toBytes(), "hex").toUpperCase();
};
var signature = Signature$1;
var hash2 = hash$2;
var curves = curves$2;
var utils = utils$m;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = key;
var Signature = signature;
function EDDSA(curve2) {
  assert(curve2 === "ed25519", "only tested with ed25519 so far");
  if (!(this instanceof EDDSA))
    return new EDDSA(curve2);
  curve2 = curves[curve2].curve;
  this.curve = curve2;
  this.g = curve2.g;
  this.g.precompute(curve2.n.bitLength() + 1);
  this.pointClass = curve2.point().constructor;
  this.encodingLength = Math.ceil(curve2.n.bitLength() / 8);
  this.hash = hash2.sha512;
}
var eddsa = EDDSA;
EDDSA.prototype.sign = function sign4(message, secret2) {
  message = parseBytes(message);
  var key2 = this.keyFromSecret(secret2);
  var r2 = this.hashInt(key2.messagePrefix(), message);
  var R2 = this.g.mul(r2);
  var Rencoded2 = this.encodePoint(R2);
  var s_ = this.hashInt(Rencoded2, key2.pubBytes(), message).mul(key2.priv());
  var S2 = r2.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R2, S: S2, Rencoded: Rencoded2 });
};
EDDSA.prototype.verify = function verify4(message, sig, pub2) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key2 = this.keyFromPublic(pub2);
  var h = this.hashInt(sig.Rencoded(), key2.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key2.pub().mul(h));
  return RplusAh.eq(SG);
};
EDDSA.prototype.hashInt = function hashInt() {
  var hash3 = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash3.update(arguments[i]);
  return utils.intFromLE(hash3.digest()).umod(this.curve.n);
};
EDDSA.prototype.keyFromPublic = function keyFromPublic2(pub2) {
  return KeyPair.fromPublic(this, pub2);
};
EDDSA.prototype.keyFromSecret = function keyFromSecret(secret2) {
  return KeyPair.fromSecret(this, secret2);
};
EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};
EDDSA.prototype.encodePoint = function encodePoint(point5) {
  var enc = point5.getY().toArray("le", this.encodingLength);
  enc[this.encodingLength - 1] |= point5.getX().isOdd() ? 128 : 0;
  return enc;
};
EDDSA.prototype.decodePoint = function decodePoint3(bytes) {
  bytes = utils.parseBytes(bytes);
  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~128);
  var xIsOdd = (bytes[lastIx] & 128) !== 0;
  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};
EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray("le", this.encodingLength);
};
EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};
EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};
(function(exports) {
  var elliptic2 = exports;
  elliptic2.version = require$$0.version;
  elliptic2.utils = utils$m;
  elliptic2.rand = brorand.exports;
  elliptic2.curve = curve;
  elliptic2.curves = curves$2;
  elliptic2.ec = ec;
  elliptic2.eddsa = eddsa;
})(elliptic);
var ed25519 = {};
var sha512 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var binary_12 = binary;
  var wipe_12 = wipe$1;
  exports.DIGEST_LENGTH = 64;
  exports.BLOCK_SIZE = 128;
  var SHA5122 = function() {
    function SHA5123() {
      this.digestLength = exports.DIGEST_LENGTH;
      this.blockSize = exports.BLOCK_SIZE;
      this._stateHi = new Int32Array(8);
      this._stateLo = new Int32Array(8);
      this._tempHi = new Int32Array(16);
      this._tempLo = new Int32Array(16);
      this._buffer = new Uint8Array(256);
      this._bufferLength = 0;
      this._bytesHashed = 0;
      this._finished = false;
      this.reset();
    }
    SHA5123.prototype._initState = function() {
      this._stateHi[0] = 1779033703;
      this._stateHi[1] = 3144134277;
      this._stateHi[2] = 1013904242;
      this._stateHi[3] = 2773480762;
      this._stateHi[4] = 1359893119;
      this._stateHi[5] = 2600822924;
      this._stateHi[6] = 528734635;
      this._stateHi[7] = 1541459225;
      this._stateLo[0] = 4089235720;
      this._stateLo[1] = 2227873595;
      this._stateLo[2] = 4271175723;
      this._stateLo[3] = 1595750129;
      this._stateLo[4] = 2917565137;
      this._stateLo[5] = 725511199;
      this._stateLo[6] = 4215389547;
      this._stateLo[7] = 327033209;
    };
    SHA5123.prototype.reset = function() {
      this._initState();
      this._bufferLength = 0;
      this._bytesHashed = 0;
      this._finished = false;
      return this;
    };
    SHA5123.prototype.clean = function() {
      wipe_12.wipe(this._buffer);
      wipe_12.wipe(this._tempHi);
      wipe_12.wipe(this._tempLo);
      this.reset();
    };
    SHA5123.prototype.update = function(data, dataLength) {
      if (dataLength === void 0) {
        dataLength = data.length;
      }
      if (this._finished) {
        throw new Error("SHA512: can't update because hash was finished.");
      }
      var dataPos = 0;
      this._bytesHashed += dataLength;
      if (this._bufferLength > 0) {
        while (this._bufferLength < exports.BLOCK_SIZE && dataLength > 0) {
          this._buffer[this._bufferLength++] = data[dataPos++];
          dataLength--;
        }
        if (this._bufferLength === this.blockSize) {
          hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize);
          this._bufferLength = 0;
        }
      }
      if (dataLength >= this.blockSize) {
        dataPos = hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, data, dataPos, dataLength);
        dataLength %= this.blockSize;
      }
      while (dataLength > 0) {
        this._buffer[this._bufferLength++] = data[dataPos++];
        dataLength--;
      }
      return this;
    };
    SHA5123.prototype.finish = function(out) {
      if (!this._finished) {
        var bytesHashed = this._bytesHashed;
        var left = this._bufferLength;
        var bitLenHi = bytesHashed / 536870912 | 0;
        var bitLenLo = bytesHashed << 3;
        var padLength = bytesHashed % 128 < 112 ? 128 : 256;
        this._buffer[left] = 128;
        for (var i = left + 1; i < padLength - 8; i++) {
          this._buffer[i] = 0;
        }
        binary_12.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
        binary_12.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
        hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, padLength);
        this._finished = true;
      }
      for (var i = 0; i < this.digestLength / 8; i++) {
        binary_12.writeUint32BE(this._stateHi[i], out, i * 8);
        binary_12.writeUint32BE(this._stateLo[i], out, i * 8 + 4);
      }
      return this;
    };
    SHA5123.prototype.digest = function() {
      var out = new Uint8Array(this.digestLength);
      this.finish(out);
      return out;
    };
    SHA5123.prototype.saveState = function() {
      if (this._finished) {
        throw new Error("SHA256: cannot save finished state");
      }
      return {
        stateHi: new Int32Array(this._stateHi),
        stateLo: new Int32Array(this._stateLo),
        buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
        bufferLength: this._bufferLength,
        bytesHashed: this._bytesHashed
      };
    };
    SHA5123.prototype.restoreState = function(savedState) {
      this._stateHi.set(savedState.stateHi);
      this._stateLo.set(savedState.stateLo);
      this._bufferLength = savedState.bufferLength;
      if (savedState.buffer) {
        this._buffer.set(savedState.buffer);
      }
      this._bytesHashed = savedState.bytesHashed;
      this._finished = false;
      return this;
    };
    SHA5123.prototype.cleanSavedState = function(savedState) {
      wipe_12.wipe(savedState.stateHi);
      wipe_12.wipe(savedState.stateLo);
      if (savedState.buffer) {
        wipe_12.wipe(savedState.buffer);
      }
      savedState.bufferLength = 0;
      savedState.bytesHashed = 0;
    };
    return SHA5123;
  }();
  exports.SHA512 = SHA5122;
  var K2 = new Int32Array([
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ]);
  function hashBlocks(wh, wl, hh, hl, m, pos, len) {
    var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
    var h, l;
    var th, tl;
    var a, b, c, d;
    while (len >= 128) {
      for (var i = 0; i < 16; i++) {
        var j = 8 * i + pos;
        wh[i] = binary_12.readUint32BE(m, j);
        wl[i] = binary_12.readUint32BE(m, j + 4);
      }
      for (var i = 0; i < 80; i++) {
        var bh0 = ah0;
        var bh1 = ah1;
        var bh2 = ah2;
        var bh3 = ah3;
        var bh4 = ah4;
        var bh5 = ah5;
        var bh6 = ah6;
        var bh7 = ah7;
        var bl0 = al0;
        var bl1 = al1;
        var bl2 = al2;
        var bl3 = al3;
        var bl4 = al4;
        var bl5 = al5;
        var bl6 = al6;
        var bl7 = al7;
        h = ah7;
        l = al7;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
        l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = ah4 & ah5 ^ ~ah4 & ah6;
        l = al4 & al5 ^ ~al4 & al6;
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = K2[i * 2];
        l = K2[i * 2 + 1];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = wh[i % 16];
        l = wl[i % 16];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        th = c & 65535 | d << 16;
        tl = a & 65535 | b << 16;
        h = th;
        l = tl;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
        l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
        l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        bh7 = c & 65535 | d << 16;
        bl7 = a & 65535 | b << 16;
        h = bh3;
        l = bl3;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = th;
        l = tl;
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        bh3 = c & 65535 | d << 16;
        bl3 = a & 65535 | b << 16;
        ah1 = bh0;
        ah2 = bh1;
        ah3 = bh2;
        ah4 = bh3;
        ah5 = bh4;
        ah6 = bh5;
        ah7 = bh6;
        ah0 = bh7;
        al1 = bl0;
        al2 = bl1;
        al3 = bl2;
        al4 = bl3;
        al5 = bl4;
        al6 = bl5;
        al7 = bl6;
        al0 = bl7;
        if (i % 16 === 15) {
          for (var j = 0; j < 16; j++) {
            h = wh[j];
            l = wl[j];
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = wh[(j + 9) % 16];
            l = wl[(j + 9) % 16];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            th = wh[(j + 1) % 16];
            tl = wl[(j + 1) % 16];
            h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
            l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            th = wh[(j + 14) % 16];
            tl = wl[(j + 14) % 16];
            h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
            l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            wh[j] = c & 65535 | d << 16;
            wl[j] = a & 65535 | b << 16;
          }
        }
      }
      h = ah0;
      l = al0;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[0];
      l = hl[0];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[0] = ah0 = c & 65535 | d << 16;
      hl[0] = al0 = a & 65535 | b << 16;
      h = ah1;
      l = al1;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[1];
      l = hl[1];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[1] = ah1 = c & 65535 | d << 16;
      hl[1] = al1 = a & 65535 | b << 16;
      h = ah2;
      l = al2;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[2];
      l = hl[2];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[2] = ah2 = c & 65535 | d << 16;
      hl[2] = al2 = a & 65535 | b << 16;
      h = ah3;
      l = al3;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[3];
      l = hl[3];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[3] = ah3 = c & 65535 | d << 16;
      hl[3] = al3 = a & 65535 | b << 16;
      h = ah4;
      l = al4;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[4];
      l = hl[4];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[4] = ah4 = c & 65535 | d << 16;
      hl[4] = al4 = a & 65535 | b << 16;
      h = ah5;
      l = al5;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[5];
      l = hl[5];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[5] = ah5 = c & 65535 | d << 16;
      hl[5] = al5 = a & 65535 | b << 16;
      h = ah6;
      l = al6;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[6];
      l = hl[6];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[6] = ah6 = c & 65535 | d << 16;
      hl[6] = al6 = a & 65535 | b << 16;
      h = ah7;
      l = al7;
      a = l & 65535;
      b = l >>> 16;
      c = h & 65535;
      d = h >>> 16;
      h = hh[7];
      l = hl[7];
      a += l & 65535;
      b += l >>> 16;
      c += h & 65535;
      d += h >>> 16;
      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;
      hh[7] = ah7 = c & 65535 | d << 16;
      hl[7] = al7 = a & 65535 | b << 16;
      pos += 128;
      len -= 128;
    }
    return pos;
  }
  function hash3(data) {
    var h = new SHA5122();
    h.update(data);
    var digest10 = h.digest();
    h.clean();
    return digest10;
  }
  exports.hash = hash3;
})(sha512);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var random_1 = random;
  var sha512_1 = sha512;
  var wipe_12 = wipe$1;
  exports.SIGNATURE_LENGTH = 64;
  exports.PUBLIC_KEY_LENGTH = 32;
  exports.SECRET_KEY_LENGTH = 64;
  exports.SEED_LENGTH = 32;
  function gf(init4) {
    var r2 = new Float64Array(16);
    if (init4) {
      for (var i = 0; i < init4.length; i++) {
        r2[i] = init4[i];
      }
    }
    return r2;
  }
  var _9 = new Uint8Array(32);
  _9[0] = 9;
  var gf0 = gf();
  var gf1 = gf([1]);
  var D = gf([
    30883,
    4953,
    19914,
    30187,
    55467,
    16705,
    2637,
    112,
    59544,
    30585,
    16505,
    36039,
    65139,
    11119,
    27886,
    20995
  ]);
  var D2 = gf([
    61785,
    9906,
    39828,
    60374,
    45398,
    33411,
    5274,
    224,
    53552,
    61171,
    33010,
    6542,
    64743,
    22239,
    55772,
    9222
  ]);
  var X = gf([
    54554,
    36645,
    11616,
    51542,
    42930,
    38181,
    51040,
    26924,
    56412,
    64982,
    57905,
    49316,
    21502,
    52590,
    14035,
    8553
  ]);
  var Y = gf([
    26200,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214
  ]);
  var I = gf([
    41136,
    18958,
    6951,
    50414,
    58488,
    44335,
    6150,
    12099,
    55207,
    15867,
    153,
    11085,
    57099,
    20417,
    9344,
    11139
  ]);
  function set25519(r2, a) {
    for (var i = 0; i < 16; i++) {
      r2[i] = a[i] | 0;
    }
  }
  function car25519(o) {
    var c = 1;
    for (var i = 0; i < 16; i++) {
      var v = o[i] + c + 65535;
      c = Math.floor(v / 65536);
      o[i] = v - c * 65536;
    }
    o[0] += c - 1 + 37 * (c - 1);
  }
  function sel25519(p, q, b) {
    var c = ~(b - 1);
    for (var i = 0; i < 16; i++) {
      var t = c & (p[i] ^ q[i]);
      p[i] ^= t;
      q[i] ^= t;
    }
  }
  function pack25519(o, n) {
    var m = gf();
    var t = gf();
    for (var i = 0; i < 16; i++) {
      t[i] = n[i];
    }
    car25519(t);
    car25519(t);
    car25519(t);
    for (var j = 0; j < 2; j++) {
      m[0] = t[0] - 65517;
      for (var i = 1; i < 15; i++) {
        m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
        m[i - 1] &= 65535;
      }
      m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
      var b = m[15] >> 16 & 1;
      m[14] &= 65535;
      sel25519(t, m, 1 - b);
    }
    for (var i = 0; i < 16; i++) {
      o[2 * i] = t[i] & 255;
      o[2 * i + 1] = t[i] >> 8;
    }
  }
  function verify32(x, y) {
    var d = 0;
    for (var i = 0; i < 32; i++) {
      d |= x[i] ^ y[i];
    }
    return (1 & d - 1 >>> 8) - 1;
  }
  function neq25519(a, b) {
    var c = new Uint8Array(32);
    var d = new Uint8Array(32);
    pack25519(c, a);
    pack25519(d, b);
    return verify32(c, d);
  }
  function par25519(a) {
    var d = new Uint8Array(32);
    pack25519(d, a);
    return d[0] & 1;
  }
  function unpack25519(o, n) {
    for (var i = 0; i < 16; i++) {
      o[i] = n[2 * i] + (n[2 * i + 1] << 8);
    }
    o[15] &= 32767;
  }
  function add5(o, a, b) {
    for (var i = 0; i < 16; i++) {
      o[i] = a[i] + b[i];
    }
  }
  function sub(o, a, b) {
    for (var i = 0; i < 16; i++) {
      o[i] = a[i] - b[i];
    }
  }
  function mul5(o, a, b) {
    var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
  }
  function square(o, a) {
    mul5(o, a, a);
  }
  function inv25519(o, i) {
    var c = gf();
    var a;
    for (a = 0; a < 16; a++) {
      c[a] = i[a];
    }
    for (a = 253; a >= 0; a--) {
      square(c, c);
      if (a !== 2 && a !== 4) {
        mul5(c, c, i);
      }
    }
    for (a = 0; a < 16; a++) {
      o[a] = c[a];
    }
  }
  function pow2523(o, i) {
    var c = gf();
    var a;
    for (a = 0; a < 16; a++) {
      c[a] = i[a];
    }
    for (a = 250; a >= 0; a--) {
      square(c, c);
      if (a !== 1) {
        mul5(c, c, i);
      }
    }
    for (a = 0; a < 16; a++) {
      o[a] = c[a];
    }
  }
  function edadd(p, q) {
    var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f2 = gf(), g = gf(), h = gf(), t = gf();
    sub(a, p[1], p[0]);
    sub(t, q[1], q[0]);
    mul5(a, a, t);
    add5(b, p[0], p[1]);
    add5(t, q[0], q[1]);
    mul5(b, b, t);
    mul5(c, p[3], q[3]);
    mul5(c, c, D2);
    mul5(d, p[2], q[2]);
    add5(d, d, d);
    sub(e, b, a);
    sub(f2, d, c);
    add5(g, d, c);
    add5(h, b, a);
    mul5(p[0], e, f2);
    mul5(p[1], h, g);
    mul5(p[2], g, f2);
    mul5(p[3], e, h);
  }
  function cswap(p, q, b) {
    for (var i = 0; i < 4; i++) {
      sel25519(p[i], q[i], b);
    }
  }
  function pack(r2, p) {
    var tx = gf(), ty = gf(), zi = gf();
    inv25519(zi, p[2]);
    mul5(tx, p[0], zi);
    mul5(ty, p[1], zi);
    pack25519(r2, ty);
    r2[31] ^= par25519(tx) << 7;
  }
  function scalarmult(p, q, s2) {
    set25519(p[0], gf0);
    set25519(p[1], gf1);
    set25519(p[2], gf1);
    set25519(p[3], gf0);
    for (var i = 255; i >= 0; --i) {
      var b = s2[i / 8 | 0] >> (i & 7) & 1;
      cswap(p, q, b);
      edadd(q, p);
      edadd(p, p);
      cswap(p, q, b);
    }
  }
  function scalarbase(p, s2) {
    var q = [gf(), gf(), gf(), gf()];
    set25519(q[0], X);
    set25519(q[1], Y);
    set25519(q[2], gf1);
    mul5(q[3], X, Y);
    scalarmult(p, q, s2);
  }
  function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SEED_LENGTH) {
      throw new Error("ed25519: seed must be " + exports.SEED_LENGTH + " bytes");
    }
    var d = sha512_1.hash(seed);
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    var publicKey = new Uint8Array(32);
    var p = [gf(), gf(), gf(), gf()];
    scalarbase(p, d);
    pack(publicKey, p);
    var secretKey = new Uint8Array(64);
    secretKey.set(seed);
    secretKey.set(publicKey, 32);
    return {
      publicKey,
      secretKey
    };
  }
  exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
  function generateKeyPair(prng) {
    var seed = random_1.randomBytes(32, prng);
    var result = generateKeyPairFromSeed(seed);
    wipe_12.wipe(seed);
    return result;
  }
  exports.generateKeyPair = generateKeyPair;
  function extractPublicKeyFromSecretKey(secretKey) {
    if (secretKey.length !== exports.SECRET_KEY_LENGTH) {
      throw new Error("ed25519: secret key must be " + exports.SECRET_KEY_LENGTH + " bytes");
    }
    return new Uint8Array(secretKey.subarray(32));
  }
  exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
  var L = new Float64Array([
    237,
    211,
    245,
    92,
    26,
    99,
    18,
    88,
    214,
    156,
    247,
    162,
    222,
    249,
    222,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    16
  ]);
  function modL(r2, x) {
    var carry;
    var i;
    var j;
    var k;
    for (i = 63; i >= 32; --i) {
      carry = 0;
      for (j = i - 32, k = i - 12; j < k; ++j) {
        x[j] += carry - 16 * x[i] * L[j - (i - 32)];
        carry = Math.floor((x[j] + 128) / 256);
        x[j] -= carry * 256;
      }
      x[j] += carry;
      x[i] = 0;
    }
    carry = 0;
    for (j = 0; j < 32; j++) {
      x[j] += carry - (x[31] >> 4) * L[j];
      carry = x[j] >> 8;
      x[j] &= 255;
    }
    for (j = 0; j < 32; j++) {
      x[j] -= carry * L[j];
    }
    for (i = 0; i < 32; i++) {
      x[i + 1] += x[i] >> 8;
      r2[i] = x[i] & 255;
    }
  }
  function reduce(r2) {
    var x = new Float64Array(64);
    for (var i = 0; i < 64; i++) {
      x[i] = r2[i];
    }
    for (var i = 0; i < 64; i++) {
      r2[i] = 0;
    }
    modL(r2, x);
  }
  function sign5(secretKey, message) {
    var x = new Float64Array(64);
    var p = [gf(), gf(), gf(), gf()];
    var d = sha512_1.hash(secretKey.subarray(0, 32));
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    var signature2 = new Uint8Array(64);
    signature2.set(d.subarray(32), 32);
    var hs = new sha512_1.SHA512();
    hs.update(signature2.subarray(32));
    hs.update(message);
    var r2 = hs.digest();
    hs.clean();
    reduce(r2);
    scalarbase(p, r2);
    pack(signature2, p);
    hs.reset();
    hs.update(signature2.subarray(0, 32));
    hs.update(secretKey.subarray(32));
    hs.update(message);
    var h = hs.digest();
    reduce(h);
    for (var i = 0; i < 32; i++) {
      x[i] = r2[i];
    }
    for (var i = 0; i < 32; i++) {
      for (var j = 0; j < 32; j++) {
        x[i + j] += h[i] * d[j];
      }
    }
    modL(signature2.subarray(32), x);
    return signature2;
  }
  exports.sign = sign5;
  function unpackneg(r2, p) {
    var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
    set25519(r2[2], gf1);
    unpack25519(r2[1], p);
    square(num, r2[1]);
    mul5(den, num, D);
    sub(num, num, r2[2]);
    add5(den, r2[2], den);
    square(den2, den);
    square(den4, den2);
    mul5(den6, den4, den2);
    mul5(t, den6, num);
    mul5(t, t, den);
    pow2523(t, t);
    mul5(t, t, num);
    mul5(t, t, den);
    mul5(t, t, den);
    mul5(r2[0], t, den);
    square(chk, r2[0]);
    mul5(chk, chk, den);
    if (neq25519(chk, num)) {
      mul5(r2[0], r2[0], I);
    }
    square(chk, r2[0]);
    mul5(chk, chk, den);
    if (neq25519(chk, num)) {
      return -1;
    }
    if (par25519(r2[0]) === p[31] >> 7) {
      sub(r2[0], gf0, r2[0]);
    }
    mul5(r2[3], r2[0], r2[1]);
    return 0;
  }
  function verify5(publicKey, message, signature2) {
    var t = new Uint8Array(32);
    var p = [gf(), gf(), gf(), gf()];
    var q = [gf(), gf(), gf(), gf()];
    if (signature2.length !== exports.SIGNATURE_LENGTH) {
      throw new Error("ed25519: signature must be " + exports.SIGNATURE_LENGTH + " bytes");
    }
    if (unpackneg(q, publicKey)) {
      return false;
    }
    var hs = new sha512_1.SHA512();
    hs.update(signature2.subarray(0, 32));
    hs.update(publicKey);
    hs.update(message);
    var h = hs.digest();
    reduce(h);
    scalarmult(p, q, h);
    scalarbase(q, signature2.subarray(32));
    edadd(p, q);
    pack(t, p);
    if (verify32(signature2, t)) {
      return false;
    }
    return true;
  }
  exports.verify = verify5;
  function convertPublicKeyToX25519(publicKey) {
    var q = [gf(), gf(), gf(), gf()];
    if (unpackneg(q, publicKey)) {
      throw new Error("Ed25519: invalid public key");
    }
    var a = gf();
    var b = gf();
    var y = q[1];
    add5(a, gf1, y);
    sub(b, gf1, y);
    inv25519(b, b);
    mul5(a, a, b);
    var z = new Uint8Array(32);
    pack25519(z, a);
    return z;
  }
  exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
  function convertSecretKeyToX25519(secretKey) {
    var d = sha512_1.hash(secretKey.subarray(0, 32));
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    var o = new Uint8Array(d.subarray(0, 32));
    wipe_12.wipe(d);
    return o;
  }
  exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;
})(ed25519);
var dist = {};
Object.defineProperty(dist, "__esModule", { value: true });
dist.bech32m = dist.bech32 = void 0;
const ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const ALPHABET_MAP = {};
for (let z = 0; z < ALPHABET.length; z++) {
  const x = ALPHABET.charAt(z);
  ALPHABET_MAP[x] = z;
}
function polymodStep(pre) {
  const b = pre >> 25;
  return (pre & 33554431) << 5 ^ -(b >> 0 & 1) & 996825010 ^ -(b >> 1 & 1) & 642813549 ^ -(b >> 2 & 1) & 513874426 ^ -(b >> 3 & 1) & 1027748829 ^ -(b >> 4 & 1) & 705979059;
}
function prefixChk(prefix) {
  let chk = 1;
  for (let i = 0; i < prefix.length; ++i) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      return "Invalid prefix (" + prefix + ")";
    chk = polymodStep(chk) ^ c >> 5;
  }
  chk = polymodStep(chk);
  for (let i = 0; i < prefix.length; ++i) {
    const v = prefix.charCodeAt(i);
    chk = polymodStep(chk) ^ v & 31;
  }
  return chk;
}
function convert(data, inBits, outBits, pad3) {
  let value = 0;
  let bits = 0;
  const maxV = (1 << outBits) - 1;
  const result = [];
  for (let i = 0; i < data.length; ++i) {
    value = value << inBits | data[i];
    bits += inBits;
    while (bits >= outBits) {
      bits -= outBits;
      result.push(value >> bits & maxV);
    }
  }
  if (pad3) {
    if (bits > 0) {
      result.push(value << outBits - bits & maxV);
    }
  } else {
    if (bits >= inBits)
      return "Excess padding";
    if (value << outBits - bits & maxV)
      return "Non-zero padding";
  }
  return result;
}
function toWords(bytes) {
  return convert(bytes, 8, 5, true);
}
function fromWordsUnsafe(words) {
  const res = convert(words, 5, 8, false);
  if (Array.isArray(res))
    return res;
}
function fromWords(words) {
  const res = convert(words, 5, 8, false);
  if (Array.isArray(res))
    return res;
  throw new Error(res);
}
function getLibraryFromEncoding(encoding) {
  let ENCODING_CONST;
  if (encoding === "bech32") {
    ENCODING_CONST = 1;
  } else {
    ENCODING_CONST = 734539939;
  }
  function encode3(prefix, words, LIMIT) {
    LIMIT = LIMIT || 90;
    if (prefix.length + 7 + words.length > LIMIT)
      throw new TypeError("Exceeds length limit");
    prefix = prefix.toLowerCase();
    let chk = prefixChk(prefix);
    if (typeof chk === "string")
      throw new Error(chk);
    let result = prefix + "1";
    for (let i = 0; i < words.length; ++i) {
      const x = words[i];
      if (x >> 5 !== 0)
        throw new Error("Non 5-bit word");
      chk = polymodStep(chk) ^ x;
      result += ALPHABET.charAt(x);
    }
    for (let i = 0; i < 6; ++i) {
      chk = polymodStep(chk);
    }
    chk ^= ENCODING_CONST;
    for (let i = 0; i < 6; ++i) {
      const v = chk >> (5 - i) * 5 & 31;
      result += ALPHABET.charAt(v);
    }
    return result;
  }
  function __decode(str, LIMIT) {
    LIMIT = LIMIT || 90;
    if (str.length < 8)
      return str + " too short";
    if (str.length > LIMIT)
      return "Exceeds length limit";
    const lowered = str.toLowerCase();
    const uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered)
      return "Mixed-case string " + str;
    str = lowered;
    const split = str.lastIndexOf("1");
    if (split === -1)
      return "No separator character for " + str;
    if (split === 0)
      return "Missing prefix for " + str;
    const prefix = str.slice(0, split);
    const wordChars = str.slice(split + 1);
    if (wordChars.length < 6)
      return "Data too short";
    let chk = prefixChk(prefix);
    if (typeof chk === "string")
      return chk;
    const words = [];
    for (let i = 0; i < wordChars.length; ++i) {
      const c = wordChars.charAt(i);
      const v = ALPHABET_MAP[c];
      if (v === void 0)
        return "Unknown character " + c;
      chk = polymodStep(chk) ^ v;
      if (i + 6 >= wordChars.length)
        continue;
      words.push(v);
    }
    if (chk !== ENCODING_CONST)
      return "Invalid checksum for " + str;
    return { prefix, words };
  }
  function decodeUnsafe(str, LIMIT) {
    const res = __decode(str, LIMIT);
    if (typeof res === "object")
      return res;
  }
  function decode2(str, LIMIT) {
    const res = __decode(str, LIMIT);
    if (typeof res === "object")
      return res;
    throw new Error(res);
  }
  return {
    decodeUnsafe,
    decode: decode2,
    encode: encode3,
    toWords,
    fromWordsUnsafe,
    fromWords
  };
}
dist.bech32 = getLibraryFromEncoding("bech32");
dist.bech32m = getLibraryFromEncoding("bech32m");
var x25519 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var random_1 = random;
  var wipe_12 = wipe$1;
  exports.PUBLIC_KEY_LENGTH = 32;
  exports.SECRET_KEY_LENGTH = 32;
  exports.SHARED_KEY_LENGTH = 32;
  function gf(init4) {
    var r2 = new Float64Array(16);
    if (init4) {
      for (var i = 0; i < init4.length; i++) {
        r2[i] = init4[i];
      }
    }
    return r2;
  }
  var _9 = new Uint8Array(32);
  _9[0] = 9;
  var _121665 = gf([56129, 1]);
  function car25519(o) {
    var c = 1;
    for (var i = 0; i < 16; i++) {
      var v = o[i] + c + 65535;
      c = Math.floor(v / 65536);
      o[i] = v - c * 65536;
    }
    o[0] += c - 1 + 37 * (c - 1);
  }
  function sel25519(p, q, b) {
    var c = ~(b - 1);
    for (var i = 0; i < 16; i++) {
      var t = c & (p[i] ^ q[i]);
      p[i] ^= t;
      q[i] ^= t;
    }
  }
  function pack25519(o, n) {
    var m = gf();
    var t = gf();
    for (var i = 0; i < 16; i++) {
      t[i] = n[i];
    }
    car25519(t);
    car25519(t);
    car25519(t);
    for (var j = 0; j < 2; j++) {
      m[0] = t[0] - 65517;
      for (var i = 1; i < 15; i++) {
        m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
        m[i - 1] &= 65535;
      }
      m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
      var b = m[15] >> 16 & 1;
      m[14] &= 65535;
      sel25519(t, m, 1 - b);
    }
    for (var i = 0; i < 16; i++) {
      o[2 * i] = t[i] & 255;
      o[2 * i + 1] = t[i] >> 8;
    }
  }
  function unpack25519(o, n) {
    for (var i = 0; i < 16; i++) {
      o[i] = n[2 * i] + (n[2 * i + 1] << 8);
    }
    o[15] &= 32767;
  }
  function add5(o, a, b) {
    for (var i = 0; i < 16; i++) {
      o[i] = a[i] + b[i];
    }
  }
  function sub(o, a, b) {
    for (var i = 0; i < 16; i++) {
      o[i] = a[i] - b[i];
    }
  }
  function mul5(o, a, b) {
    var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
  }
  function square(o, a) {
    mul5(o, a, a);
  }
  function inv25519(o, inp) {
    var c = gf();
    for (var i = 0; i < 16; i++) {
      c[i] = inp[i];
    }
    for (var i = 253; i >= 0; i--) {
      square(c, c);
      if (i !== 2 && i !== 4) {
        mul5(c, c, inp);
      }
    }
    for (var i = 0; i < 16; i++) {
      o[i] = c[i];
    }
  }
  function scalarMult(n, p) {
    var z = new Uint8Array(32);
    var x = new Float64Array(80);
    var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f2 = gf();
    for (var i = 0; i < 31; i++) {
      z[i] = n[i];
    }
    z[31] = n[31] & 127 | 64;
    z[0] &= 248;
    unpack25519(x, p);
    for (var i = 0; i < 16; i++) {
      b[i] = x[i];
    }
    a[0] = d[0] = 1;
    for (var i = 254; i >= 0; --i) {
      var r2 = z[i >>> 3] >>> (i & 7) & 1;
      sel25519(a, b, r2);
      sel25519(c, d, r2);
      add5(e, a, c);
      sub(a, a, c);
      add5(c, b, d);
      sub(b, b, d);
      square(d, e);
      square(f2, a);
      mul5(a, c, a);
      mul5(c, b, e);
      add5(e, a, c);
      sub(a, a, c);
      square(b, a);
      sub(c, d, f2);
      mul5(a, c, _121665);
      add5(a, a, d);
      mul5(c, c, a);
      mul5(a, d, f2);
      mul5(d, b, x);
      square(b, e);
      sel25519(a, b, r2);
      sel25519(c, d, r2);
    }
    for (var i = 0; i < 16; i++) {
      x[i + 16] = a[i];
      x[i + 32] = c[i];
      x[i + 48] = b[i];
      x[i + 64] = d[i];
    }
    var x32 = x.subarray(32);
    var x16 = x.subarray(16);
    inv25519(x32, x32);
    mul5(x16, x16, x32);
    var q = new Uint8Array(32);
    pack25519(q, x16);
    return q;
  }
  exports.scalarMult = scalarMult;
  function scalarMultBase(n) {
    return scalarMult(n, _9);
  }
  exports.scalarMultBase = scalarMultBase;
  function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SECRET_KEY_LENGTH) {
      throw new Error("x25519: seed must be " + exports.SECRET_KEY_LENGTH + " bytes");
    }
    var secretKey = new Uint8Array(seed);
    var publicKey = scalarMultBase(secretKey);
    return {
      publicKey,
      secretKey
    };
  }
  exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
  function generateKeyPair(prng) {
    var seed = random_1.randomBytes(32, prng);
    var result = generateKeyPairFromSeed(seed);
    wipe_12.wipe(seed);
    return result;
  }
  exports.generateKeyPair = generateKeyPair;
  function sharedKey(mySecretKey, theirPublicKey, rejectZero) {
    if (rejectZero === void 0) {
      rejectZero = false;
    }
    if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
      throw new Error("X25519: incorrect secret key length");
    }
    if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
      throw new Error("X25519: incorrect public key length");
    }
    var result = scalarMult(mySecretKey, theirPublicKey);
    if (rejectZero) {
      var zeros = 0;
      for (var i = 0; i < result.length; i++) {
        zeros |= result[i];
      }
      if (zeros === 0) {
        throw new Error("X25519: invalid shared key");
      }
    }
    return result;
  }
  exports.sharedKey = sharedKey;
})(x25519);
var xchacha20poly1305 = {};
var xchacha20 = {};
var chacha = {};
Object.defineProperty(chacha, "__esModule", { value: true });
var binary_1$1 = binary;
var wipe_1$1 = wipe$1;
var ROUNDS$1 = 20;
function core(out, input, key2) {
  var j0 = 1634760805;
  var j1 = 857760878;
  var j2 = 2036477234;
  var j3 = 1797285236;
  var j4 = key2[3] << 24 | key2[2] << 16 | key2[1] << 8 | key2[0];
  var j5 = key2[7] << 24 | key2[6] << 16 | key2[5] << 8 | key2[4];
  var j6 = key2[11] << 24 | key2[10] << 16 | key2[9] << 8 | key2[8];
  var j7 = key2[15] << 24 | key2[14] << 16 | key2[13] << 8 | key2[12];
  var j8 = key2[19] << 24 | key2[18] << 16 | key2[17] << 8 | key2[16];
  var j9 = key2[23] << 24 | key2[22] << 16 | key2[21] << 8 | key2[20];
  var j10 = key2[27] << 24 | key2[26] << 16 | key2[25] << 8 | key2[24];
  var j11 = key2[31] << 24 | key2[30] << 16 | key2[29] << 8 | key2[28];
  var j12 = input[3] << 24 | input[2] << 16 | input[1] << 8 | input[0];
  var j13 = input[7] << 24 | input[6] << 16 | input[5] << 8 | input[4];
  var j14 = input[11] << 24 | input[10] << 16 | input[9] << 8 | input[8];
  var j15 = input[15] << 24 | input[14] << 16 | input[13] << 8 | input[12];
  var x0 = j0;
  var x1 = j1;
  var x2 = j2;
  var x3 = j3;
  var x4 = j4;
  var x5 = j5;
  var x6 = j6;
  var x7 = j7;
  var x8 = j8;
  var x9 = j9;
  var x10 = j10;
  var x11 = j11;
  var x12 = j12;
  var x13 = j13;
  var x14 = j14;
  var x15 = j15;
  for (var i = 0; i < ROUNDS$1; i += 2) {
    x0 = x0 + x4 | 0;
    x12 ^= x0;
    x12 = x12 >>> 32 - 16 | x12 << 16;
    x8 = x8 + x12 | 0;
    x4 ^= x8;
    x4 = x4 >>> 32 - 12 | x4 << 12;
    x1 = x1 + x5 | 0;
    x13 ^= x1;
    x13 = x13 >>> 32 - 16 | x13 << 16;
    x9 = x9 + x13 | 0;
    x5 ^= x9;
    x5 = x5 >>> 32 - 12 | x5 << 12;
    x2 = x2 + x6 | 0;
    x14 ^= x2;
    x14 = x14 >>> 32 - 16 | x14 << 16;
    x10 = x10 + x14 | 0;
    x6 ^= x10;
    x6 = x6 >>> 32 - 12 | x6 << 12;
    x3 = x3 + x7 | 0;
    x15 ^= x3;
    x15 = x15 >>> 32 - 16 | x15 << 16;
    x11 = x11 + x15 | 0;
    x7 ^= x11;
    x7 = x7 >>> 32 - 12 | x7 << 12;
    x2 = x2 + x6 | 0;
    x14 ^= x2;
    x14 = x14 >>> 32 - 8 | x14 << 8;
    x10 = x10 + x14 | 0;
    x6 ^= x10;
    x6 = x6 >>> 32 - 7 | x6 << 7;
    x3 = x3 + x7 | 0;
    x15 ^= x3;
    x15 = x15 >>> 32 - 8 | x15 << 8;
    x11 = x11 + x15 | 0;
    x7 ^= x11;
    x7 = x7 >>> 32 - 7 | x7 << 7;
    x1 = x1 + x5 | 0;
    x13 ^= x1;
    x13 = x13 >>> 32 - 8 | x13 << 8;
    x9 = x9 + x13 | 0;
    x5 ^= x9;
    x5 = x5 >>> 32 - 7 | x5 << 7;
    x0 = x0 + x4 | 0;
    x12 ^= x0;
    x12 = x12 >>> 32 - 8 | x12 << 8;
    x8 = x8 + x12 | 0;
    x4 ^= x8;
    x4 = x4 >>> 32 - 7 | x4 << 7;
    x0 = x0 + x5 | 0;
    x15 ^= x0;
    x15 = x15 >>> 32 - 16 | x15 << 16;
    x10 = x10 + x15 | 0;
    x5 ^= x10;
    x5 = x5 >>> 32 - 12 | x5 << 12;
    x1 = x1 + x6 | 0;
    x12 ^= x1;
    x12 = x12 >>> 32 - 16 | x12 << 16;
    x11 = x11 + x12 | 0;
    x6 ^= x11;
    x6 = x6 >>> 32 - 12 | x6 << 12;
    x2 = x2 + x7 | 0;
    x13 ^= x2;
    x13 = x13 >>> 32 - 16 | x13 << 16;
    x8 = x8 + x13 | 0;
    x7 ^= x8;
    x7 = x7 >>> 32 - 12 | x7 << 12;
    x3 = x3 + x4 | 0;
    x14 ^= x3;
    x14 = x14 >>> 32 - 16 | x14 << 16;
    x9 = x9 + x14 | 0;
    x4 ^= x9;
    x4 = x4 >>> 32 - 12 | x4 << 12;
    x2 = x2 + x7 | 0;
    x13 ^= x2;
    x13 = x13 >>> 32 - 8 | x13 << 8;
    x8 = x8 + x13 | 0;
    x7 ^= x8;
    x7 = x7 >>> 32 - 7 | x7 << 7;
    x3 = x3 + x4 | 0;
    x14 ^= x3;
    x14 = x14 >>> 32 - 8 | x14 << 8;
    x9 = x9 + x14 | 0;
    x4 ^= x9;
    x4 = x4 >>> 32 - 7 | x4 << 7;
    x1 = x1 + x6 | 0;
    x12 ^= x1;
    x12 = x12 >>> 32 - 8 | x12 << 8;
    x11 = x11 + x12 | 0;
    x6 ^= x11;
    x6 = x6 >>> 32 - 7 | x6 << 7;
    x0 = x0 + x5 | 0;
    x15 ^= x0;
    x15 = x15 >>> 32 - 8 | x15 << 8;
    x10 = x10 + x15 | 0;
    x5 ^= x10;
    x5 = x5 >>> 32 - 7 | x5 << 7;
  }
  binary_1$1.writeUint32LE(x0 + j0 | 0, out, 0);
  binary_1$1.writeUint32LE(x1 + j1 | 0, out, 4);
  binary_1$1.writeUint32LE(x2 + j2 | 0, out, 8);
  binary_1$1.writeUint32LE(x3 + j3 | 0, out, 12);
  binary_1$1.writeUint32LE(x4 + j4 | 0, out, 16);
  binary_1$1.writeUint32LE(x5 + j5 | 0, out, 20);
  binary_1$1.writeUint32LE(x6 + j6 | 0, out, 24);
  binary_1$1.writeUint32LE(x7 + j7 | 0, out, 28);
  binary_1$1.writeUint32LE(x8 + j8 | 0, out, 32);
  binary_1$1.writeUint32LE(x9 + j9 | 0, out, 36);
  binary_1$1.writeUint32LE(x10 + j10 | 0, out, 40);
  binary_1$1.writeUint32LE(x11 + j11 | 0, out, 44);
  binary_1$1.writeUint32LE(x12 + j12 | 0, out, 48);
  binary_1$1.writeUint32LE(x13 + j13 | 0, out, 52);
  binary_1$1.writeUint32LE(x14 + j14 | 0, out, 56);
  binary_1$1.writeUint32LE(x15 + j15 | 0, out, 60);
}
function streamXOR$1(key2, nonce, src2, dst, nonceInplaceCounterLength) {
  if (nonceInplaceCounterLength === void 0) {
    nonceInplaceCounterLength = 0;
  }
  if (key2.length !== 32) {
    throw new Error("ChaCha: key size must be 32 bytes");
  }
  if (dst.length < src2.length) {
    throw new Error("ChaCha: destination is shorter than source");
  }
  var nc;
  var counterLength;
  if (nonceInplaceCounterLength === 0) {
    if (nonce.length !== 8 && nonce.length !== 12) {
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    }
    nc = new Uint8Array(16);
    counterLength = nc.length - nonce.length;
    nc.set(nonce, counterLength);
  } else {
    if (nonce.length !== 16) {
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    }
    nc = nonce;
    counterLength = nonceInplaceCounterLength;
  }
  var block = new Uint8Array(64);
  for (var i = 0; i < src2.length; i += 64) {
    core(block, nc, key2);
    for (var j = i; j < i + 64 && j < src2.length; j++) {
      dst[j] = src2[j] ^ block[j - i];
    }
    incrementCounter(nc, 0, counterLength);
  }
  wipe_1$1.wipe(block);
  if (nonceInplaceCounterLength === 0) {
    wipe_1$1.wipe(nc);
  }
  return dst;
}
chacha.streamXOR = streamXOR$1;
function stream$1(key2, nonce, dst, nonceInplaceCounterLength) {
  if (nonceInplaceCounterLength === void 0) {
    nonceInplaceCounterLength = 0;
  }
  wipe_1$1.wipe(dst);
  return streamXOR$1(key2, nonce, dst, dst, nonceInplaceCounterLength);
}
chacha.stream = stream$1;
function incrementCounter(counter, pos, len) {
  var carry = 1;
  while (len--) {
    carry = carry + (counter[pos] & 255) | 0;
    counter[pos] = carry & 255;
    carry >>>= 8;
    pos++;
  }
  if (carry > 0) {
    throw new Error("ChaCha: counter overflow");
  }
}
Object.defineProperty(xchacha20, "__esModule", { value: true });
var binary_1 = binary;
var wipe_1 = wipe$1;
var chacha_1 = chacha;
var ROUNDS = 20;
function streamXOR(key2, nonce, src2, dst) {
  if (nonce.length !== 24) {
    throw new Error("XChaCha20 nonce must be 24 bytes");
  }
  var subkey = hchacha(key2, nonce.subarray(0, 16), new Uint8Array(32));
  var modifiedNonce = new Uint8Array(12);
  modifiedNonce.set(nonce.subarray(16), 4);
  var result = chacha_1.streamXOR(subkey, modifiedNonce, src2, dst);
  wipe_1.wipe(subkey);
  return result;
}
xchacha20.streamXOR = streamXOR;
function stream(key2, nonce, dst) {
  wipe_1.wipe(dst);
  return streamXOR(key2, nonce, dst, dst);
}
xchacha20.stream = stream;
function hchacha(key2, src2, dst) {
  var j0 = 1634760805;
  var j1 = 857760878;
  var j2 = 2036477234;
  var j3 = 1797285236;
  var j4 = key2[3] << 24 | key2[2] << 16 | key2[1] << 8 | key2[0];
  var j5 = key2[7] << 24 | key2[6] << 16 | key2[5] << 8 | key2[4];
  var j6 = key2[11] << 24 | key2[10] << 16 | key2[9] << 8 | key2[8];
  var j7 = key2[15] << 24 | key2[14] << 16 | key2[13] << 8 | key2[12];
  var j8 = key2[19] << 24 | key2[18] << 16 | key2[17] << 8 | key2[16];
  var j9 = key2[23] << 24 | key2[22] << 16 | key2[21] << 8 | key2[20];
  var j10 = key2[27] << 24 | key2[26] << 16 | key2[25] << 8 | key2[24];
  var j11 = key2[31] << 24 | key2[30] << 16 | key2[29] << 8 | key2[28];
  var j12 = src2[3] << 24 | src2[2] << 16 | src2[1] << 8 | src2[0];
  var j13 = src2[7] << 24 | src2[6] << 16 | src2[5] << 8 | src2[4];
  var j14 = src2[11] << 24 | src2[10] << 16 | src2[9] << 8 | src2[8];
  var j15 = src2[15] << 24 | src2[14] << 16 | src2[13] << 8 | src2[12];
  var x0 = j0;
  var x1 = j1;
  var x2 = j2;
  var x3 = j3;
  var x4 = j4;
  var x5 = j5;
  var x6 = j6;
  var x7 = j7;
  var x8 = j8;
  var x9 = j9;
  var x10 = j10;
  var x11 = j11;
  var x12 = j12;
  var x13 = j13;
  var x14 = j14;
  var x15 = j15;
  for (var i = 0; i < ROUNDS; i += 2) {
    x0 = x0 + x4 | 0;
    x12 ^= x0;
    x12 = x12 >>> 32 - 16 | x12 << 16;
    x8 = x8 + x12 | 0;
    x4 ^= x8;
    x4 = x4 >>> 32 - 12 | x4 << 12;
    x1 = x1 + x5 | 0;
    x13 ^= x1;
    x13 = x13 >>> 32 - 16 | x13 << 16;
    x9 = x9 + x13 | 0;
    x5 ^= x9;
    x5 = x5 >>> 32 - 12 | x5 << 12;
    x2 = x2 + x6 | 0;
    x14 ^= x2;
    x14 = x14 >>> 32 - 16 | x14 << 16;
    x10 = x10 + x14 | 0;
    x6 ^= x10;
    x6 = x6 >>> 32 - 12 | x6 << 12;
    x3 = x3 + x7 | 0;
    x15 ^= x3;
    x15 = x15 >>> 32 - 16 | x15 << 16;
    x11 = x11 + x15 | 0;
    x7 ^= x11;
    x7 = x7 >>> 32 - 12 | x7 << 12;
    x2 = x2 + x6 | 0;
    x14 ^= x2;
    x14 = x14 >>> 32 - 8 | x14 << 8;
    x10 = x10 + x14 | 0;
    x6 ^= x10;
    x6 = x6 >>> 32 - 7 | x6 << 7;
    x3 = x3 + x7 | 0;
    x15 ^= x3;
    x15 = x15 >>> 32 - 8 | x15 << 8;
    x11 = x11 + x15 | 0;
    x7 ^= x11;
    x7 = x7 >>> 32 - 7 | x7 << 7;
    x1 = x1 + x5 | 0;
    x13 ^= x1;
    x13 = x13 >>> 32 - 8 | x13 << 8;
    x9 = x9 + x13 | 0;
    x5 ^= x9;
    x5 = x5 >>> 32 - 7 | x5 << 7;
    x0 = x0 + x4 | 0;
    x12 ^= x0;
    x12 = x12 >>> 32 - 8 | x12 << 8;
    x8 = x8 + x12 | 0;
    x4 ^= x8;
    x4 = x4 >>> 32 - 7 | x4 << 7;
    x0 = x0 + x5 | 0;
    x15 ^= x0;
    x15 = x15 >>> 32 - 16 | x15 << 16;
    x10 = x10 + x15 | 0;
    x5 ^= x10;
    x5 = x5 >>> 32 - 12 | x5 << 12;
    x1 = x1 + x6 | 0;
    x12 ^= x1;
    x12 = x12 >>> 32 - 16 | x12 << 16;
    x11 = x11 + x12 | 0;
    x6 ^= x11;
    x6 = x6 >>> 32 - 12 | x6 << 12;
    x2 = x2 + x7 | 0;
    x13 ^= x2;
    x13 = x13 >>> 32 - 16 | x13 << 16;
    x8 = x8 + x13 | 0;
    x7 ^= x8;
    x7 = x7 >>> 32 - 12 | x7 << 12;
    x3 = x3 + x4 | 0;
    x14 ^= x3;
    x14 = x14 >>> 32 - 16 | x14 << 16;
    x9 = x9 + x14 | 0;
    x4 ^= x9;
    x4 = x4 >>> 32 - 12 | x4 << 12;
    x2 = x2 + x7 | 0;
    x13 ^= x2;
    x13 = x13 >>> 32 - 8 | x13 << 8;
    x8 = x8 + x13 | 0;
    x7 ^= x8;
    x7 = x7 >>> 32 - 7 | x7 << 7;
    x3 = x3 + x4 | 0;
    x14 ^= x3;
    x14 = x14 >>> 32 - 8 | x14 << 8;
    x9 = x9 + x14 | 0;
    x4 ^= x9;
    x4 = x4 >>> 32 - 7 | x4 << 7;
    x1 = x1 + x6 | 0;
    x12 ^= x1;
    x12 = x12 >>> 32 - 8 | x12 << 8;
    x11 = x11 + x12 | 0;
    x6 ^= x11;
    x6 = x6 >>> 32 - 7 | x6 << 7;
    x0 = x0 + x5 | 0;
    x15 ^= x0;
    x15 = x15 >>> 32 - 8 | x15 << 8;
    x10 = x10 + x15 | 0;
    x5 ^= x10;
    x5 = x5 >>> 32 - 7 | x5 << 7;
  }
  binary_1.writeUint32LE(x0, dst, 0);
  binary_1.writeUint32LE(x1, dst, 4);
  binary_1.writeUint32LE(x2, dst, 8);
  binary_1.writeUint32LE(x3, dst, 12);
  binary_1.writeUint32LE(x12, dst, 16);
  binary_1.writeUint32LE(x13, dst, 20);
  binary_1.writeUint32LE(x14, dst, 24);
  binary_1.writeUint32LE(x15, dst, 28);
  return dst;
}
xchacha20.hchacha = hchacha;
var chacha20poly1305 = {};
var poly1305 = {};
var constantTime = {};
Object.defineProperty(constantTime, "__esModule", { value: true });
function select(subject, resultIfOne, resultIfZero) {
  return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;
}
constantTime.select = select;
function lessOrEqual(a, b) {
  return (a | 0) - (b | 0) - 1 >>> 31 & 1;
}
constantTime.lessOrEqual = lessOrEqual;
function compare$1(a, b) {
  if (a.length !== b.length) {
    return 0;
  }
  var result = 0;
  for (var i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }
  return 1 & result - 1 >>> 8;
}
constantTime.compare = compare$1;
function equal(a, b) {
  if (a.length === 0 || b.length === 0) {
    return false;
  }
  return compare$1(a, b) !== 0;
}
constantTime.equal = equal;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var constant_time_1 = constantTime;
  var wipe_12 = wipe$1;
  exports.DIGEST_LENGTH = 16;
  var Poly1305 = function() {
    function Poly13052(key2) {
      this.digestLength = exports.DIGEST_LENGTH;
      this._buffer = new Uint8Array(16);
      this._r = new Uint16Array(10);
      this._h = new Uint16Array(10);
      this._pad = new Uint16Array(8);
      this._leftover = 0;
      this._fin = 0;
      this._finished = false;
      var t0 = key2[0] | key2[1] << 8;
      this._r[0] = t0 & 8191;
      var t1 = key2[2] | key2[3] << 8;
      this._r[1] = (t0 >>> 13 | t1 << 3) & 8191;
      var t2 = key2[4] | key2[5] << 8;
      this._r[2] = (t1 >>> 10 | t2 << 6) & 7939;
      var t3 = key2[6] | key2[7] << 8;
      this._r[3] = (t2 >>> 7 | t3 << 9) & 8191;
      var t4 = key2[8] | key2[9] << 8;
      this._r[4] = (t3 >>> 4 | t4 << 12) & 255;
      this._r[5] = t4 >>> 1 & 8190;
      var t5 = key2[10] | key2[11] << 8;
      this._r[6] = (t4 >>> 14 | t5 << 2) & 8191;
      var t6 = key2[12] | key2[13] << 8;
      this._r[7] = (t5 >>> 11 | t6 << 5) & 8065;
      var t7 = key2[14] | key2[15] << 8;
      this._r[8] = (t6 >>> 8 | t7 << 8) & 8191;
      this._r[9] = t7 >>> 5 & 127;
      this._pad[0] = key2[16] | key2[17] << 8;
      this._pad[1] = key2[18] | key2[19] << 8;
      this._pad[2] = key2[20] | key2[21] << 8;
      this._pad[3] = key2[22] | key2[23] << 8;
      this._pad[4] = key2[24] | key2[25] << 8;
      this._pad[5] = key2[26] | key2[27] << 8;
      this._pad[6] = key2[28] | key2[29] << 8;
      this._pad[7] = key2[30] | key2[31] << 8;
    }
    Poly13052.prototype._blocks = function(m, mpos, bytes) {
      var hibit = this._fin ? 0 : 1 << 11;
      var h0 = this._h[0], h1 = this._h[1], h2 = this._h[2], h3 = this._h[3], h4 = this._h[4], h5 = this._h[5], h6 = this._h[6], h7 = this._h[7], h8 = this._h[8], h9 = this._h[9];
      var r0 = this._r[0], r1 = this._r[1], r2 = this._r[2], r3 = this._r[3], r4 = this._r[4], r5 = this._r[5], r6 = this._r[6], r7 = this._r[7], r8 = this._r[8], r9 = this._r[9];
      while (bytes >= 16) {
        var t0 = m[mpos + 0] | m[mpos + 1] << 8;
        h0 += t0 & 8191;
        var t1 = m[mpos + 2] | m[mpos + 3] << 8;
        h1 += (t0 >>> 13 | t1 << 3) & 8191;
        var t2 = m[mpos + 4] | m[mpos + 5] << 8;
        h2 += (t1 >>> 10 | t2 << 6) & 8191;
        var t3 = m[mpos + 6] | m[mpos + 7] << 8;
        h3 += (t2 >>> 7 | t3 << 9) & 8191;
        var t4 = m[mpos + 8] | m[mpos + 9] << 8;
        h4 += (t3 >>> 4 | t4 << 12) & 8191;
        h5 += t4 >>> 1 & 8191;
        var t5 = m[mpos + 10] | m[mpos + 11] << 8;
        h6 += (t4 >>> 14 | t5 << 2) & 8191;
        var t6 = m[mpos + 12] | m[mpos + 13] << 8;
        h7 += (t5 >>> 11 | t6 << 5) & 8191;
        var t7 = m[mpos + 14] | m[mpos + 15] << 8;
        h8 += (t6 >>> 8 | t7 << 8) & 8191;
        h9 += t7 >>> 5 | hibit;
        var c = 0;
        var d0 = c;
        d0 += h0 * r0;
        d0 += h1 * (5 * r9);
        d0 += h2 * (5 * r8);
        d0 += h3 * (5 * r7);
        d0 += h4 * (5 * r6);
        c = d0 >>> 13;
        d0 &= 8191;
        d0 += h5 * (5 * r5);
        d0 += h6 * (5 * r4);
        d0 += h7 * (5 * r3);
        d0 += h8 * (5 * r2);
        d0 += h9 * (5 * r1);
        c += d0 >>> 13;
        d0 &= 8191;
        var d1 = c;
        d1 += h0 * r1;
        d1 += h1 * r0;
        d1 += h2 * (5 * r9);
        d1 += h3 * (5 * r8);
        d1 += h4 * (5 * r7);
        c = d1 >>> 13;
        d1 &= 8191;
        d1 += h5 * (5 * r6);
        d1 += h6 * (5 * r5);
        d1 += h7 * (5 * r4);
        d1 += h8 * (5 * r3);
        d1 += h9 * (5 * r2);
        c += d1 >>> 13;
        d1 &= 8191;
        var d2 = c;
        d2 += h0 * r2;
        d2 += h1 * r1;
        d2 += h2 * r0;
        d2 += h3 * (5 * r9);
        d2 += h4 * (5 * r8);
        c = d2 >>> 13;
        d2 &= 8191;
        d2 += h5 * (5 * r7);
        d2 += h6 * (5 * r6);
        d2 += h7 * (5 * r5);
        d2 += h8 * (5 * r4);
        d2 += h9 * (5 * r3);
        c += d2 >>> 13;
        d2 &= 8191;
        var d3 = c;
        d3 += h0 * r3;
        d3 += h1 * r2;
        d3 += h2 * r1;
        d3 += h3 * r0;
        d3 += h4 * (5 * r9);
        c = d3 >>> 13;
        d3 &= 8191;
        d3 += h5 * (5 * r8);
        d3 += h6 * (5 * r7);
        d3 += h7 * (5 * r6);
        d3 += h8 * (5 * r5);
        d3 += h9 * (5 * r4);
        c += d3 >>> 13;
        d3 &= 8191;
        var d4 = c;
        d4 += h0 * r4;
        d4 += h1 * r3;
        d4 += h2 * r2;
        d4 += h3 * r1;
        d4 += h4 * r0;
        c = d4 >>> 13;
        d4 &= 8191;
        d4 += h5 * (5 * r9);
        d4 += h6 * (5 * r8);
        d4 += h7 * (5 * r7);
        d4 += h8 * (5 * r6);
        d4 += h9 * (5 * r5);
        c += d4 >>> 13;
        d4 &= 8191;
        var d5 = c;
        d5 += h0 * r5;
        d5 += h1 * r4;
        d5 += h2 * r3;
        d5 += h3 * r2;
        d5 += h4 * r1;
        c = d5 >>> 13;
        d5 &= 8191;
        d5 += h5 * r0;
        d5 += h6 * (5 * r9);
        d5 += h7 * (5 * r8);
        d5 += h8 * (5 * r7);
        d5 += h9 * (5 * r6);
        c += d5 >>> 13;
        d5 &= 8191;
        var d6 = c;
        d6 += h0 * r6;
        d6 += h1 * r5;
        d6 += h2 * r4;
        d6 += h3 * r3;
        d6 += h4 * r2;
        c = d6 >>> 13;
        d6 &= 8191;
        d6 += h5 * r1;
        d6 += h6 * r0;
        d6 += h7 * (5 * r9);
        d6 += h8 * (5 * r8);
        d6 += h9 * (5 * r7);
        c += d6 >>> 13;
        d6 &= 8191;
        var d7 = c;
        d7 += h0 * r7;
        d7 += h1 * r6;
        d7 += h2 * r5;
        d7 += h3 * r4;
        d7 += h4 * r3;
        c = d7 >>> 13;
        d7 &= 8191;
        d7 += h5 * r2;
        d7 += h6 * r1;
        d7 += h7 * r0;
        d7 += h8 * (5 * r9);
        d7 += h9 * (5 * r8);
        c += d7 >>> 13;
        d7 &= 8191;
        var d8 = c;
        d8 += h0 * r8;
        d8 += h1 * r7;
        d8 += h2 * r6;
        d8 += h3 * r5;
        d8 += h4 * r4;
        c = d8 >>> 13;
        d8 &= 8191;
        d8 += h5 * r3;
        d8 += h6 * r2;
        d8 += h7 * r1;
        d8 += h8 * r0;
        d8 += h9 * (5 * r9);
        c += d8 >>> 13;
        d8 &= 8191;
        var d9 = c;
        d9 += h0 * r9;
        d9 += h1 * r8;
        d9 += h2 * r7;
        d9 += h3 * r6;
        d9 += h4 * r5;
        c = d9 >>> 13;
        d9 &= 8191;
        d9 += h5 * r4;
        d9 += h6 * r3;
        d9 += h7 * r2;
        d9 += h8 * r1;
        d9 += h9 * r0;
        c += d9 >>> 13;
        d9 &= 8191;
        c = (c << 2) + c | 0;
        c = c + d0 | 0;
        d0 = c & 8191;
        c = c >>> 13;
        d1 += c;
        h0 = d0;
        h1 = d1;
        h2 = d2;
        h3 = d3;
        h4 = d4;
        h5 = d5;
        h6 = d6;
        h7 = d7;
        h8 = d8;
        h9 = d9;
        mpos += 16;
        bytes -= 16;
      }
      this._h[0] = h0;
      this._h[1] = h1;
      this._h[2] = h2;
      this._h[3] = h3;
      this._h[4] = h4;
      this._h[5] = h5;
      this._h[6] = h6;
      this._h[7] = h7;
      this._h[8] = h8;
      this._h[9] = h9;
    };
    Poly13052.prototype.finish = function(mac, macpos) {
      if (macpos === void 0) {
        macpos = 0;
      }
      var g = new Uint16Array(10);
      var c;
      var mask;
      var f2;
      var i;
      if (this._leftover) {
        i = this._leftover;
        this._buffer[i++] = 1;
        for (; i < 16; i++) {
          this._buffer[i] = 0;
        }
        this._fin = 1;
        this._blocks(this._buffer, 0, 16);
      }
      c = this._h[1] >>> 13;
      this._h[1] &= 8191;
      for (i = 2; i < 10; i++) {
        this._h[i] += c;
        c = this._h[i] >>> 13;
        this._h[i] &= 8191;
      }
      this._h[0] += c * 5;
      c = this._h[0] >>> 13;
      this._h[0] &= 8191;
      this._h[1] += c;
      c = this._h[1] >>> 13;
      this._h[1] &= 8191;
      this._h[2] += c;
      g[0] = this._h[0] + 5;
      c = g[0] >>> 13;
      g[0] &= 8191;
      for (i = 1; i < 10; i++) {
        g[i] = this._h[i] + c;
        c = g[i] >>> 13;
        g[i] &= 8191;
      }
      g[9] -= 1 << 13;
      mask = (c ^ 1) - 1;
      for (i = 0; i < 10; i++) {
        g[i] &= mask;
      }
      mask = ~mask;
      for (i = 0; i < 10; i++) {
        this._h[i] = this._h[i] & mask | g[i];
      }
      this._h[0] = (this._h[0] | this._h[1] << 13) & 65535;
      this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535;
      this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535;
      this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535;
      this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535;
      this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535;
      this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535;
      this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535;
      f2 = this._h[0] + this._pad[0];
      this._h[0] = f2 & 65535;
      for (i = 1; i < 8; i++) {
        f2 = (this._h[i] + this._pad[i] | 0) + (f2 >>> 16) | 0;
        this._h[i] = f2 & 65535;
      }
      mac[macpos + 0] = this._h[0] >>> 0;
      mac[macpos + 1] = this._h[0] >>> 8;
      mac[macpos + 2] = this._h[1] >>> 0;
      mac[macpos + 3] = this._h[1] >>> 8;
      mac[macpos + 4] = this._h[2] >>> 0;
      mac[macpos + 5] = this._h[2] >>> 8;
      mac[macpos + 6] = this._h[3] >>> 0;
      mac[macpos + 7] = this._h[3] >>> 8;
      mac[macpos + 8] = this._h[4] >>> 0;
      mac[macpos + 9] = this._h[4] >>> 8;
      mac[macpos + 10] = this._h[5] >>> 0;
      mac[macpos + 11] = this._h[5] >>> 8;
      mac[macpos + 12] = this._h[6] >>> 0;
      mac[macpos + 13] = this._h[6] >>> 8;
      mac[macpos + 14] = this._h[7] >>> 0;
      mac[macpos + 15] = this._h[7] >>> 8;
      this._finished = true;
      return this;
    };
    Poly13052.prototype.update = function(m) {
      var mpos = 0;
      var bytes = m.length;
      var want;
      if (this._leftover) {
        want = 16 - this._leftover;
        if (want > bytes) {
          want = bytes;
        }
        for (var i = 0; i < want; i++) {
          this._buffer[this._leftover + i] = m[mpos + i];
        }
        bytes -= want;
        mpos += want;
        this._leftover += want;
        if (this._leftover < 16) {
          return this;
        }
        this._blocks(this._buffer, 0, 16);
        this._leftover = 0;
      }
      if (bytes >= 16) {
        want = bytes - bytes % 16;
        this._blocks(m, mpos, want);
        mpos += want;
        bytes -= want;
      }
      if (bytes) {
        for (var i = 0; i < bytes; i++) {
          this._buffer[this._leftover + i] = m[mpos + i];
        }
        this._leftover += bytes;
      }
      return this;
    };
    Poly13052.prototype.digest = function() {
      if (this._finished) {
        throw new Error("Poly1305 was finished");
      }
      var mac = new Uint8Array(16);
      this.finish(mac);
      return mac;
    };
    Poly13052.prototype.clean = function() {
      wipe_12.wipe(this._buffer);
      wipe_12.wipe(this._r);
      wipe_12.wipe(this._h);
      wipe_12.wipe(this._pad);
      this._leftover = 0;
      this._fin = 0;
      this._finished = true;
      return this;
    };
    return Poly13052;
  }();
  exports.Poly1305 = Poly1305;
  function oneTimeAuth(key2, data) {
    var h = new Poly1305(key2);
    h.update(data);
    var digest10 = h.digest();
    h.clean();
    return digest10;
  }
  exports.oneTimeAuth = oneTimeAuth;
  function equal2(a, b) {
    if (a.length !== exports.DIGEST_LENGTH || b.length !== exports.DIGEST_LENGTH) {
      return false;
    }
    return constant_time_1.equal(a, b);
  }
  exports.equal = equal2;
})(poly1305);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var chacha_12 = chacha;
  var poly1305_1 = poly1305;
  var wipe_12 = wipe$1;
  var binary_12 = binary;
  var constant_time_1 = constantTime;
  exports.KEY_LENGTH = 32;
  exports.NONCE_LENGTH = 12;
  exports.TAG_LENGTH = 16;
  var ZEROS = new Uint8Array(16);
  var ChaCha20Poly1305 = function() {
    function ChaCha20Poly13052(key2) {
      this.nonceLength = exports.NONCE_LENGTH;
      this.tagLength = exports.TAG_LENGTH;
      if (key2.length !== exports.KEY_LENGTH) {
        throw new Error("ChaCha20Poly1305 needs 32-byte key");
      }
      this._key = new Uint8Array(key2);
    }
    ChaCha20Poly13052.prototype.seal = function(nonce, plaintext, associatedData, dst) {
      if (nonce.length > 16) {
        throw new Error("ChaCha20Poly1305: incorrect nonce length");
      }
      var counter = new Uint8Array(16);
      counter.set(nonce, counter.length - nonce.length);
      var authKey = new Uint8Array(32);
      chacha_12.stream(this._key, counter, authKey, 4);
      var resultLength = plaintext.length + this.tagLength;
      var result;
      if (dst) {
        if (dst.length !== resultLength) {
          throw new Error("ChaCha20Poly1305: incorrect destination length");
        }
        result = dst;
      } else {
        result = new Uint8Array(resultLength);
      }
      chacha_12.streamXOR(this._key, counter, plaintext, result, 4);
      this._authenticate(result.subarray(result.length - this.tagLength, result.length), authKey, result.subarray(0, result.length - this.tagLength), associatedData);
      wipe_12.wipe(counter);
      return result;
    };
    ChaCha20Poly13052.prototype.open = function(nonce, sealed, associatedData, dst) {
      if (nonce.length > 16) {
        throw new Error("ChaCha20Poly1305: incorrect nonce length");
      }
      if (sealed.length < this.tagLength) {
        return null;
      }
      var counter = new Uint8Array(16);
      counter.set(nonce, counter.length - nonce.length);
      var authKey = new Uint8Array(32);
      chacha_12.stream(this._key, counter, authKey, 4);
      var calculatedTag = new Uint8Array(this.tagLength);
      this._authenticate(calculatedTag, authKey, sealed.subarray(0, sealed.length - this.tagLength), associatedData);
      if (!constant_time_1.equal(calculatedTag, sealed.subarray(sealed.length - this.tagLength, sealed.length))) {
        return null;
      }
      var resultLength = sealed.length - this.tagLength;
      var result;
      if (dst) {
        if (dst.length !== resultLength) {
          throw new Error("ChaCha20Poly1305: incorrect destination length");
        }
        result = dst;
      } else {
        result = new Uint8Array(resultLength);
      }
      chacha_12.streamXOR(this._key, counter, sealed.subarray(0, sealed.length - this.tagLength), result, 4);
      wipe_12.wipe(counter);
      return result;
    };
    ChaCha20Poly13052.prototype.clean = function() {
      wipe_12.wipe(this._key);
      return this;
    };
    ChaCha20Poly13052.prototype._authenticate = function(tagOut, authKey, ciphertext, associatedData) {
      var h = new poly1305_1.Poly1305(authKey);
      if (associatedData) {
        h.update(associatedData);
        if (associatedData.length % 16 > 0) {
          h.update(ZEROS.subarray(associatedData.length % 16));
        }
      }
      h.update(ciphertext);
      if (ciphertext.length % 16 > 0) {
        h.update(ZEROS.subarray(ciphertext.length % 16));
      }
      var length2 = new Uint8Array(8);
      if (associatedData) {
        binary_12.writeUint64LE(associatedData.length, length2);
      }
      h.update(length2);
      binary_12.writeUint64LE(ciphertext.length, length2);
      h.update(length2);
      var tag2 = h.digest();
      for (var i = 0; i < tag2.length; i++) {
        tagOut[i] = tag2[i];
      }
      h.clean();
      wipe_12.wipe(tag2);
      wipe_12.wipe(length2);
    };
    return ChaCha20Poly13052;
  }();
  exports.ChaCha20Poly1305 = ChaCha20Poly1305;
})(chacha20poly1305);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var xchacha20_1 = xchacha20;
  var chacha20poly1305_1 = chacha20poly1305;
  var wipe_12 = wipe$1;
  exports.KEY_LENGTH = 32;
  exports.NONCE_LENGTH = 24;
  exports.TAG_LENGTH = 16;
  var XChaCha20Poly1305 = function() {
    function XChaCha20Poly13052(key2) {
      this.nonceLength = exports.NONCE_LENGTH;
      this.tagLength = exports.TAG_LENGTH;
      if (key2.length !== exports.KEY_LENGTH) {
        throw new Error("ChaCha20Poly1305 needs 32-byte key");
      }
      this._key = new Uint8Array(key2);
    }
    XChaCha20Poly13052.prototype.seal = function(nonce, plaintext, associatedData, dst) {
      if (nonce.length !== 24) {
        throw new Error("XChaCha20Poly1305: incorrect nonce length");
      }
      var subKey = xchacha20_1.hchacha(this._key, nonce.subarray(0, 16), new Uint8Array(32));
      var modifiedNonce = new Uint8Array(12);
      modifiedNonce.set(nonce.subarray(16), 4);
      var chaChaPoly = new chacha20poly1305_1.ChaCha20Poly1305(subKey);
      var result = chaChaPoly.seal(modifiedNonce, plaintext, associatedData, dst);
      wipe_12.wipe(subKey);
      wipe_12.wipe(modifiedNonce);
      chaChaPoly.clean();
      return result;
    };
    XChaCha20Poly13052.prototype.open = function(nonce, sealed, associatedData, dst) {
      if (nonce.length !== 24) {
        throw new Error("XChaCha20Poly1305: incorrect nonce length");
      }
      if (sealed.length < this.tagLength) {
        return null;
      }
      var subKey = xchacha20_1.hchacha(this._key, nonce.subarray(0, 16), new Uint8Array(32));
      var modifiedNonce = new Uint8Array(12);
      modifiedNonce.set(nonce.subarray(16), 4);
      var chaChaPoly = new chacha20poly1305_1.ChaCha20Poly1305(subKey);
      var result = chaChaPoly.open(modifiedNonce, sealed, associatedData, dst);
      wipe_12.wipe(subKey);
      wipe_12.wipe(modifiedNonce);
      chaChaPoly.clean();
      return result;
    };
    XChaCha20Poly13052.prototype.clean = function() {
      wipe_12.wipe(this._key);
      return this;
    };
    return XChaCha20Poly13052;
  }();
  exports.XChaCha20Poly1305 = XChaCha20Poly1305;
})(xchacha20poly1305);
function bytesToBase64url(b) {
  return toString$1(b, "base64url");
}
function base64ToBytes(s2) {
  const inputBase64Url = s2.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return fromString$1(inputBase64Url, "base64url");
}
function encodeBase64url(s2) {
  return bytesToBase64url(fromString$1(s2));
}
function decodeBase64url(s2) {
  return toString$1(base64ToBytes(s2));
}
function toSealed(ciphertext, tag2) {
  return concat$1([base64ToBytes(ciphertext), base64ToBytes(tag2)]);
}
new elliptic.ec("secp256k1");
elliptic.ec;
new elliptic.ec("secp256k1");
const _iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
function _settle(pact, state, value) {
  if (!pact.s) {
    if (value instanceof _Pact) {
      if (value.s) {
        if (state & 1) {
          state = value.s;
        }
        value = value.v;
      } else {
        value.o = _settle.bind(null, pact, state);
        return;
      }
    }
    if (value && value.then) {
      value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
      return;
    }
    pact.s = state;
    pact.v = value;
    const observer = pact.o;
    if (observer) {
      observer(pact);
    }
  }
}
const _Pact = /* @__PURE__ */ function() {
  function _Pact2() {
  }
  _Pact2.prototype.then = function(onFulfilled, onRejected) {
    const result = new _Pact2();
    const state = this.s;
    if (state) {
      const callback = state & 1 ? onFulfilled : onRejected;
      if (callback) {
        try {
          _settle(result, 1, callback(this.v));
        } catch (e) {
          _settle(result, 2, e);
        }
        return result;
      } else {
        return this;
      }
    }
    this.o = function(_this) {
      try {
        const value = _this.v;
        if (_this.s & 1) {
          _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
        } else if (onRejected) {
          _settle(result, 1, onRejected(value));
        } else {
          _settle(result, 2, value);
        }
      } catch (e) {
        _settle(result, 2, e);
      }
    };
    return result;
  };
  return _Pact2;
}();
function _isSettledPact(thenable) {
  return thenable instanceof _Pact && thenable.s & 1;
}
function _forTo(array, body, check) {
  var i = -1, pact, reject;
  function _cycle(result) {
    try {
      while (++i < array.length && (!check || !check())) {
        result = body(i);
        if (result && result.then) {
          if (_isSettledPact(result)) {
            result = result.v;
          } else {
            result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
            return;
          }
        }
      }
      if (pact) {
        _settle(pact, 1, result);
      } else {
        pact = result;
      }
    } catch (e) {
      _settle(pact || (pact = new _Pact()), 2, e);
    }
  }
  _cycle();
  return pact;
}
function _forOf(target, body, check) {
  if (typeof target[_iteratorSymbol] === "function") {
    let _cycle = function(result) {
      try {
        while (!(step = iterator.next()).done && (!check || !check())) {
          result = body(step.value);
          if (result && result.then) {
            if (_isSettledPact(result)) {
              result = result.v;
            } else {
              result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
              return;
            }
          }
        }
        if (pact) {
          _settle(pact, 1, result);
        } else {
          pact = result;
        }
      } catch (e) {
        _settle(pact || (pact = new _Pact()), 2, e);
      }
    };
    var iterator = target[_iteratorSymbol](), step, pact, reject;
    _cycle();
    if (iterator.return) {
      var _fixup = function(value) {
        try {
          if (!step.done) {
            iterator.return();
          }
        } catch (e) {
        }
        return value;
      };
      if (pact && pact.then) {
        return pact.then(_fixup, function(e) {
          throw _fixup(e);
        });
      }
      _fixup();
    }
    return pact;
  }
  if (!("length" in target)) {
    throw new TypeError("Object is not iterable");
  }
  var values = [];
  for (var i = 0; i < target.length; i++) {
    values.push(target[i]);
  }
  return _forTo(values, function(i2) {
    return body(values[i2]);
  }, check);
}
function _for(test, update5, body) {
  var stage;
  for (; ; ) {
    var shouldContinue = test();
    if (_isSettledPact(shouldContinue)) {
      shouldContinue = shouldContinue.v;
    }
    if (!shouldContinue) {
      return result;
    }
    if (shouldContinue.then) {
      stage = 0;
      break;
    }
    var result = body();
    if (result && result.then) {
      if (_isSettledPact(result)) {
        result = result.s;
      } else {
        stage = 1;
        break;
      }
    }
    if (update5) {
      var updateValue = update5();
      if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
        stage = 2;
        break;
      }
    }
  }
  var pact = new _Pact();
  var reject = _settle.bind(null, pact, 2);
  (stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
  return pact;
  function _resumeAfterBody(value) {
    result = value;
    do {
      if (update5) {
        updateValue = update5();
        if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
          updateValue.then(_resumeAfterUpdate).then(void 0, reject);
          return;
        }
      }
      shouldContinue = test();
      if (!shouldContinue || _isSettledPact(shouldContinue) && !shouldContinue.v) {
        _settle(pact, 1, result);
        return;
      }
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
        return;
      }
      result = body();
      if (_isSettledPact(result)) {
        result = result.v;
      }
    } while (!result || !result.then);
    result.then(_resumeAfterBody).then(void 0, reject);
  }
  function _resumeAfterTest(shouldContinue2) {
    if (shouldContinue2) {
      result = body();
      if (result && result.then) {
        result.then(_resumeAfterBody).then(void 0, reject);
      } else {
        _resumeAfterBody(result);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
  function _resumeAfterUpdate() {
    if (shouldContinue = test()) {
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
      } else {
        _resumeAfterTest(shouldContinue);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
}
function validateJWE(jwe) {
  if (!(jwe.protected && jwe.iv && jwe.ciphertext && jwe.tag)) {
    throw new Error("bad_jwe: missing properties");
  }
  if (jwe.recipients) {
    jwe.recipients.map((rec) => {
      if (!(rec.header && rec.encrypted_key)) {
        throw new Error("bad_jwe: malformed recipients");
      }
    });
  }
}
function encodeJWE({
  ciphertext,
  tag: tag2,
  iv,
  protectedHeader,
  recipient
}, aad) {
  const jwe = {
    protected: protectedHeader,
    iv: bytesToBase64url(iv),
    ciphertext: bytesToBase64url(ciphertext),
    tag: bytesToBase64url(tag2)
  };
  if (aad)
    jwe.aad = bytesToBase64url(aad);
  if (recipient)
    jwe.recipients = [recipient];
  return jwe;
}
const decryptJWE = function(jwe, decrypter) {
  try {
    let _temp5 = function(_result) {
      if (_exit)
        ;
      if (cleartext === null)
        throw new Error("failure: Failed to decrypt");
      return cleartext;
    };
    let _exit;
    validateJWE(jwe);
    const protHeader = JSON.parse(decodeBase64url(jwe.protected));
    if (protHeader.enc !== decrypter.enc)
      throw new Error(`not_supported: Decrypter does not supported: '${protHeader.enc}'`);
    const sealed = toSealed(jwe.ciphertext, jwe.tag);
    const aad = fromString$1(jwe.aad ? `${jwe.protected}.${jwe.aad}` : jwe.protected);
    let cleartext = null;
    const _temp4 = function() {
      if (protHeader.alg === "dir" && decrypter.alg === "dir") {
        return Promise.resolve(decrypter.decrypt(sealed, base64ToBytes(jwe.iv), aad)).then(function(_decrypter$decrypt) {
          cleartext = _decrypter$decrypt;
        });
      } else
        return function() {
          if (!jwe.recipients || jwe.recipients.length === 0) {
            throw new Error("bad_jwe: missing recipients");
          } else {
            let i = 0;
            return _for(function() {
              return !cleartext && i < jwe.recipients.length;
            }, function() {
              return i++;
            }, function() {
              const recipient = jwe.recipients[i];
              Object.assign(recipient.header, protHeader);
              const _temp3 = function() {
                if (recipient.header.alg === decrypter.alg) {
                  return Promise.resolve(decrypter.decrypt(sealed, base64ToBytes(jwe.iv), aad, recipient)).then(function(_decrypter$decrypt2) {
                    cleartext = _decrypter$decrypt2;
                  });
                }
              }();
              if (_temp3 && _temp3.then)
                return _temp3.then(function() {
                });
            });
          }
        }();
    }();
    return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4));
  } catch (e) {
    return Promise.reject(e);
  }
};
const createJWE = function(cleartext, encrypters, protectedHeader = {}, aad) {
  try {
    if (encrypters[0].alg === "dir") {
      if (encrypters.length > 1)
        throw new Error('not_supported: Can only do "dir" encryption to one key.');
      return Promise.resolve(encrypters[0].encrypt(cleartext, protectedHeader, aad)).then(function(encryptionResult) {
        return encodeJWE(encryptionResult, aad);
      });
    } else {
      const tmpEnc = encrypters[0].enc;
      if (!encrypters.reduce((acc, encrypter) => acc && encrypter.enc === tmpEnc, true)) {
        throw new Error("invalid_argument: Incompatible encrypters passed");
      }
      let cek;
      let jwe;
      const _temp2 = _forOf(encrypters, function(encrypter) {
        const _temp = function() {
          if (!cek) {
            return Promise.resolve(encrypter.encrypt(cleartext, protectedHeader, aad)).then(function(encryptionResult) {
              cek = encryptionResult.cek;
              jwe = encodeJWE(encryptionResult, aad);
            });
          } else {
            return Promise.resolve(encrypter.encryptCek == null ? void 0 : encrypter.encryptCek(cek)).then(function(recipient) {
              if (recipient) {
                var _jwe, _jwe$recipients;
                (_jwe = jwe) == null ? void 0 : (_jwe$recipients = _jwe.recipients) == null ? void 0 : _jwe$recipients.push(recipient);
              }
            });
          }
        }();
        if (_temp && _temp.then)
          return _temp.then(function() {
          });
      });
      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function() {
        return jwe;
      }) : jwe);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
function xc20pEncrypter(key2) {
  const cipher = new xchacha20poly1305.XChaCha20Poly1305(key2);
  return (cleartext, aad) => {
    const iv = random.randomBytes(cipher.nonceLength);
    const sealed = cipher.seal(iv, cleartext, aad);
    return {
      ciphertext: sealed.subarray(0, sealed.length - cipher.tagLength),
      tag: sealed.subarray(sealed.length - cipher.tagLength),
      iv
    };
  };
}
function xc20pDirEncrypter(key2) {
  const encrypt = function(cleartext, protectedHeader = {}, aad) {
    try {
      const protHeader = encodeBase64url(JSON.stringify(Object.assign({
        alg
      }, protectedHeader, {
        enc
      })));
      const encodedAad = fromString$1(aad ? `${protHeader}.${bytesToBase64url(aad)}` : protHeader);
      return Promise.resolve({
        ...xc20pEncrypt(cleartext, encodedAad),
        protectedHeader: protHeader
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const xc20pEncrypt = xc20pEncrypter(key2);
  const enc = "XC20P";
  const alg = "dir";
  return {
    alg,
    enc,
    encrypt
  };
}
function xc20pDirDecrypter(key2) {
  const decrypt = function(sealed, iv, aad) {
    try {
      return Promise.resolve(cipher.open(iv, sealed, aad));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const cipher = new xchacha20poly1305.XChaCha20Poly1305(key2);
  return {
    alg: "dir",
    enc: "XC20P",
    decrypt
  };
}
const PUBLIC_KEY_BYTES = 32;
const LUT_HEX_4b = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const LUT_HEX_8b = new Array(256);
for (let n = 0; n < 256; n++) {
  LUT_HEX_8b[n] = `${LUT_HEX_4b[n >>> 4 & 15]}${LUT_HEX_4b[n & 15]}`;
}
function bufftoHex(buffer2) {
  let out = "";
  for (let idx = 0, edx = buffer2.length; idx < edx; idx++) {
    out += LUT_HEX_8b[buffer2[idx]];
  }
  return out;
}
const bytesFromHexString = (hexString) => new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
function hexToB64(hex) {
  const maybeValid = validatePubKey(hex);
  return base64Js.fromByteArray(maybeValid);
}
function validatePubKey(pubKey) {
  if (!pubKey)
    return false;
  let pubKeyBytes = base64Js.toByteArray(pubKey);
  if (pubKeyBytes.length == PUBLIC_KEY_BYTES) {
    return pubKeyBytes;
  }
  try {
    let b58Bytes = bs58.decode(pubKey);
    if (b58Bytes.length == PUBLIC_KEY_BYTES) {
      return b58Bytes;
    }
  } catch (error) {
  }
  try {
    let hexBytes = bytesFromHexString(pubKey);
    if (hexBytes.length === PUBLIC_KEY_BYTES) {
      return hexBytes;
    }
  } catch (error) {
    console.warn("Not hex either ", { pubKey });
  }
  console.warn("Not any supported encodings :( ");
  return false;
}
async function hexDigestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
async function getTagNodes({
  ipfsNode,
  rootCID
}) {
  if (!ipfsNode || !rootCID)
    return;
  console.log("getTagNodes for " + rootCID);
  const root = await ipfsNode.dag.get(CID.parse(rootCID), { timeout: 2e3 });
  console.log("got TagNodes for ", { root });
  const promises = Object.entries(root.value).map(async ([key2, val]) => {
    if (key2 === "prev" || !val)
      return null;
    let fields = await ipfsNode.dag.get(val);
    return [key2, fields.value];
  });
  const result = await Promise.all(promises);
  const filtered = result.filter((r2) => r2);
  return Object.fromEntries(filtered);
}
const readonly = ({ enumerable = true, configurable = false } = {}) => ({
  enumerable,
  configurable,
  writable: false
});
const links = function* (source, base3) {
  if (source == null)
    return;
  if (source instanceof Uint8Array)
    return;
  for (const [key2, value] of Object.entries(source)) {
    const path = [
      ...base3,
      key2
    ];
    if (value != null && typeof value === "object") {
      if (Array.isArray(value)) {
        for (const [index, element2] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          const cid = CID.asCID(element2);
          if (cid) {
            yield [
              elementPath.join("/"),
              cid
            ];
          } else if (typeof element2 === "object") {
            yield* links(element2, elementPath);
          }
        }
      } else {
        const cid = CID.asCID(value);
        if (cid) {
          yield [
            path.join("/"),
            cid
          ];
        } else {
          yield* links(value, path);
        }
      }
    }
  }
};
const tree = function* (source, base3) {
  if (source == null)
    return;
  for (const [key2, value] of Object.entries(source)) {
    const path = [
      ...base3,
      key2
    ];
    yield path.join("/");
    if (value != null && !(value instanceof Uint8Array) && typeof value === "object" && !CID.asCID(value)) {
      if (Array.isArray(value)) {
        for (const [index, element2] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          yield elementPath.join("/");
          if (typeof element2 === "object" && !CID.asCID(element2)) {
            yield* tree(element2, elementPath);
          }
        }
      } else {
        yield* tree(value, path);
      }
    }
  }
};
const get = (source, path) => {
  let node2 = source;
  for (const [index, key2] of path.entries()) {
    node2 = node2[key2];
    if (node2 == null) {
      throw new Error(`Object has no property at ${path.slice(0, index + 1).map((part) => `[${JSON.stringify(part)}]`).join("")}`);
    }
    const cid = CID.asCID(node2);
    if (cid) {
      return {
        value: cid,
        remaining: path.slice(index + 1).join("/")
      };
    }
  }
  return { value: node2 };
};
class Block {
  constructor({ cid, bytes, value }) {
    if (!cid || !bytes || typeof value === "undefined")
      throw new Error("Missing required argument");
    this.cid = cid;
    this.bytes = bytes;
    this.value = value;
    this.asBlock = this;
    Object.defineProperties(this, {
      cid: readonly(),
      bytes: readonly(),
      value: readonly(),
      asBlock: readonly()
    });
  }
  links() {
    return links(this.value, []);
  }
  tree() {
    return tree(this.value, []);
  }
  get(path = "/") {
    return get(this.value, path.split("/").filter(Boolean));
  }
}
const encode$2 = async ({ value, codec, hasher }) => {
  if (typeof value === "undefined")
    throw new Error('Missing required argument "value"');
  if (!codec || !hasher)
    throw new Error("Missing required argument: codec or hasher");
  const bytes = codec.encode(value);
  const hash3 = await hasher.digest(bytes);
  const cid = CID.create(1, codec.code, hash3);
  return new Block({
    value,
    bytes,
    cid
  });
};
const typeofs = [
  "string",
  "number",
  "bigint",
  "symbol"
];
const objectTypeNames = [
  "Function",
  "Generator",
  "AsyncGenerator",
  "GeneratorFunction",
  "AsyncGeneratorFunction",
  "AsyncFunction",
  "Observable",
  "Array",
  "Buffer",
  "Object",
  "RegExp",
  "Date",
  "Error",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Promise",
  "URL",
  "HTMLElement",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array"
];
function is(value) {
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  if (value === true || value === false) {
    return "boolean";
  }
  const typeOf = typeof value;
  if (typeofs.includes(typeOf)) {
    return typeOf;
  }
  if (typeOf === "function") {
    return "Function";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  if (isBuffer$1(value)) {
    return "Buffer";
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return "Object";
}
function isBuffer$1(value) {
  return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}
class Type {
  constructor(major, name2, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name2;
    this.terminal = terminal;
  }
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
}
Type.uint = new Type(0, "uint", true);
Type.negint = new Type(1, "negint", true);
Type.bytes = new Type(2, "bytes", true);
Type.string = new Type(3, "string", true);
Type.array = new Type(4, "array", false);
Type.map = new Type(5, "map", false);
Type.tag = new Type(6, "tag", false);
Type.float = new Type(7, "float", true);
Type.false = new Type(7, "false", true);
Type.true = new Type(7, "true", true);
Type.null = new Type(7, "null", true);
Type.undefined = new Type(7, "undefined", true);
Type.break = new Type(7, "break", true);
class Token {
  constructor(type, value, encodedLength) {
    this.type = type;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = void 0;
    this.byteValue = void 0;
  }
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
}
const useBuffer = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer === "function";
const textDecoder = new TextDecoder();
const textEncoder$1 = new TextEncoder();
function isBuffer(buf2) {
  return useBuffer && globalThis.Buffer.isBuffer(buf2);
}
function asU8A(buf2) {
  if (!(buf2 instanceof Uint8Array)) {
    return Uint8Array.from(buf2);
  }
  return isBuffer(buf2) ? new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength) : buf2;
}
const toString = useBuffer ? (bytes, start, end) => {
  return end - start > 64 ? globalThis.Buffer.from(bytes.subarray(start, end)).toString("utf8") : utf8Slice(bytes, start, end);
} : (bytes, start, end) => {
  return end - start > 64 ? textDecoder.decode(bytes.subarray(start, end)) : utf8Slice(bytes, start, end);
};
const fromString = useBuffer ? (string2) => {
  return string2.length > 64 ? globalThis.Buffer.from(string2) : utf8ToBytes(string2);
} : (string2) => {
  return string2.length > 64 ? textEncoder$1.encode(string2) : utf8ToBytes(string2);
};
const fromArray = (arr) => {
  return Uint8Array.from(arr);
};
const slice = useBuffer ? (bytes, start, end) => {
  if (isBuffer(bytes)) {
    return new Uint8Array(bytes.subarray(start, end));
  }
  return bytes.slice(start, end);
} : (bytes, start, end) => {
  return bytes.slice(start, end);
};
const concat = useBuffer ? (chunks, length2) => {
  chunks = chunks.map((c) => c instanceof Uint8Array ? c : globalThis.Buffer.from(c));
  return asU8A(globalThis.Buffer.concat(chunks, length2));
} : (chunks, length2) => {
  const out = new Uint8Array(length2);
  let off = 0;
  for (let b of chunks) {
    if (off + b.length > out.length) {
      b = b.subarray(0, out.length - off);
    }
    out.set(b, off);
    off += b.length;
  }
  return out;
};
const alloc = useBuffer ? (size) => {
  return globalThis.Buffer.allocUnsafe(size);
} : (size) => {
  return new Uint8Array(size);
};
function compare(b1, b2) {
  if (isBuffer(b1) && isBuffer(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(string2, units = Infinity) {
  let codePoint;
  const length2 = string2.length;
  let leadSurrogate = null;
  const bytes = [];
  for (let i = 0; i < length2; ++i) {
    codePoint = string2.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length2) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1)
        bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function utf8Slice(buf2, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf2[offset];
    let codePoint = null;
    let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf2[offset + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          fourthByte = buf2[offset + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
const MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = "";
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}
const defaultChunkSize = 256;
class Bl {
  constructor(chunkSize = defaultChunkSize) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.cursor = 0;
    this.maxCursor = -1;
    if (this.chunks.length) {
      this.chunks = [];
    }
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  push(bytes) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes.length < 64 && bytes.length < this.chunkSize) {
        topChunk = alloc(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes, 0);
      } else {
        this.chunks.push(bytes);
        this.maxCursor += bytes.length;
      }
    }
    this.cursor += bytes.length;
  }
  toBytes(reset = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset && this.cursor > chunk.length / 2) {
        byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = slice(chunk, 0, this.cursor);
      }
    } else {
      byts = concat(this.chunks, this.cursor);
    }
    if (reset) {
      this.reset();
    }
    return byts;
  }
}
const decodeErrPrefix = "CBOR decode error:";
const encodeErrPrefix = "CBOR encode error:";
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${decodeErrPrefix} not enough data for type`);
  }
}
const uintBoundaries = [
  24,
  256,
  65536,
  4294967296,
  BigInt("18446744073709551616")
];
function readUint8(data, offset, options) {
  assertEnoughData(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint16(data, offset, options) {
  assertEnoughData(data, offset, 2);
  const value = data[offset] << 8 | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint32(data, offset, options) {
  assertEnoughData(data, offset, 4);
  const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint64(data, offset, options) {
  assertEnoughData(data, offset, 8);
  const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
}
function decodeUint8(data, pos, _minor, options) {
  return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf2, token) {
  return encodeUintValue(buf2, 0, token.value);
}
function encodeUintValue(buf2, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf2.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf2.push([
      major | 24,
      nuint
    ]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf2.push([
      major | 25,
      nuint >>> 8,
      nuint & 255
    ]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf2.push([
      major | 26,
      nuint >>> 24 & 255,
      nuint >>> 16 & 255,
      nuint >>> 8 & 255,
      nuint & 255
    ]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set = [
        major | 27,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf2.push(set);
    } else {
      throw new Error(`${decodeErrPrefix} encountered BigInt larger than allowable range`);
    }
  }
}
encodeUint.encodedSize = function encodedSize(token) {
  return encodeUintValue.encodedSize(token.value);
};
encodeUintValue.encodedSize = function encodedSize2(uint) {
  if (uint < uintBoundaries[0]) {
    return 1;
  }
  if (uint < uintBoundaries[1]) {
    return 2;
  }
  if (uint < uintBoundaries[2]) {
    return 3;
  }
  if (uint < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeUint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
};
function decodeNegint8(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
}
const neg1b = BigInt(-1);
const pos1b = BigInt(1);
function decodeNegint64(data, pos, _minor, options) {
  const int2 = readUint64(data, pos + 1, options);
  if (typeof int2 !== "bigint") {
    const value = -1 - int2;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new Token(Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
  }
  return new Token(Type.negint, neg1b - BigInt(int2), 9);
}
function encodeNegint(buf2, token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  encodeUintValue(buf2, token.type.majorEncoded, unsigned);
}
encodeNegint.encodedSize = function encodedSize3(token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  if (unsigned < uintBoundaries[0]) {
    return 1;
  }
  if (unsigned < uintBoundaries[1]) {
    return 2;
  }
  if (unsigned < uintBoundaries[2]) {
    return 3;
  }
  if (unsigned < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
};
function toToken$3(data, pos, prefix, length2) {
  assertEnoughData(data, pos, prefix + length2);
  const buf2 = slice(data, pos + prefix, pos + prefix + length2);
  return new Token(Type.bytes, buf2, prefix + length2);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken$3(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken$3(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken$3(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken$3(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer bytes lengths not supported`);
  }
  return toToken$3(data, pos, 9, l);
}
function tokenBytes(token) {
  if (token.encodedBytes === void 0) {
    token.encodedBytes = token.type === Type.string ? fromString(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes(buf2, token) {
  const bytes = tokenBytes(token);
  encodeUintValue(buf2, token.type.majorEncoded, bytes.length);
  buf2.push(bytes);
}
encodeBytes.encodedSize = function encodedSize4(token) {
  const bytes = tokenBytes(token);
  return encodeUintValue.encodedSize(bytes.length) + bytes.length;
};
encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
  return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
};
function compareBytes(b1, b2) {
  return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : compare(b1, b2);
}
function toToken$2(data, pos, prefix, length2, options) {
  const totLength = prefix + length2;
  assertEnoughData(data, pos, totLength);
  const tok = new Token(Type.string, toString(data, pos + prefix, pos + totLength), totLength);
  if (options.retainStringBytes === true) {
    tok.byteValue = slice(data, pos + prefix, pos + totLength);
  }
  return tok;
}
function decodeStringCompact(data, pos, minor, options) {
  return toToken$2(data, pos, 1, minor, options);
}
function decodeString8(data, pos, _minor, options) {
  return toToken$2(data, pos, 2, readUint8(data, pos + 1, options), options);
}
function decodeString16(data, pos, _minor, options) {
  return toToken$2(data, pos, 3, readUint16(data, pos + 1, options), options);
}
function decodeString32(data, pos, _minor, options) {
  return toToken$2(data, pos, 5, readUint32(data, pos + 1, options), options);
}
function decodeString64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer string lengths not supported`);
  }
  return toToken$2(data, pos, 9, l, options);
}
const encodeString = encodeBytes;
function toToken$1(_data, _pos, prefix, length2) {
  return new Token(Type.array, length2, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken$1(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken$1(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken$1(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken$1(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer array lengths not supported`);
  }
  return toToken$1(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken$1(data, pos, 1, Infinity);
}
function encodeArray(buf2, token) {
  encodeUintValue(buf2, Type.array.majorEncoded, token.value);
}
encodeArray.compareTokens = encodeUint.compareTokens;
encodeArray.encodedSize = function encodedSize5(token) {
  return encodeUintValue.encodedSize(token.value);
};
function toToken(_data, _pos, prefix, length2) {
  return new Token(Type.map, length2, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer map lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken(data, pos, 1, Infinity);
}
function encodeMap(buf2, token) {
  encodeUintValue(buf2, Type.map.majorEncoded, token.value);
}
encodeMap.compareTokens = encodeUint.compareTokens;
encodeMap.encodedSize = function encodedSize6(token) {
  return encodeUintValue.encodedSize(token.value);
};
function decodeTagCompact(_data, _pos, minor, _options) {
  return new Token(Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf2, token) {
  encodeUintValue(buf2, Type.tag.majorEncoded, token.value);
}
encodeTag.compareTokens = encodeUint.compareTokens;
encodeTag.encodedSize = function encodedSize7(token) {
  return encodeUintValue.encodedSize(token.value);
};
const MINOR_FALSE = 20;
const MINOR_TRUE = 21;
const MINOR_NULL = 22;
const MINOR_UNDEFINED = 23;
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${decodeErrPrefix} undefined values are not supported`);
  } else if (options.coerceUndefinedToNull === true) {
    return new Token(Type.null, null, 1);
  }
  return new Token(Type.undefined, void 0, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return new Token(Type.break, void 0, 1);
}
function createToken(value, bytes, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${decodeErrPrefix} NaN values are not supported`);
    }
    if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
      throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
    }
  }
  return new Token(Type.float, value, bytes);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf2, token, options) {
  const float = token.value;
  if (float === false) {
    buf2.push([Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float === true) {
    buf2.push([Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float === null) {
    buf2.push([Type.float.majorEncoded | MINOR_NULL]);
  } else if (float === void 0) {
    buf2.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a[0] = 249;
        buf2.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          ui8a[0] = 250;
          buf2.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf2.push(ui8a.slice(0, 9));
    }
  }
}
encodeFloat.encodedSize = function encodedSize8(token, options) {
  const float = token.value;
  if (float === false || float === true || float === null || float === void 0) {
    return 1;
  }
  if (!options || options.float64 !== true) {
    encodeFloat16(float);
    let decoded = readFloat16(ui8a, 1);
    if (float === decoded || Number.isNaN(float)) {
      return 3;
    }
    encodeFloat32(float);
    decoded = readFloat32(ui8a, 1);
    if (float === decoded) {
      return 5;
    }
  }
  return 9;
};
const buffer = new ArrayBuffer(9);
const dataView = new DataView(buffer, 1);
const ui8a = new Uint8Array(buffer, 0);
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | 1 << 24 + logicalExponent, false);
      } else {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
      }
    }
  }
}
function readFloat16(ui8a2, pos) {
  if (ui8a2.length - pos < 2) {
    throw new Error(`${decodeErrPrefix} not enough data for float16`);
  }
  const half = (ui8a2[pos] << 8) + ui8a2[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = half >> 10 & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a2, pos) {
  if (ui8a2.length - pos < 4) {
    throw new Error(`${decodeErrPrefix} not enough data for float32`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a2, pos) {
  if (ui8a2.length - pos < 8) {
    throw new Error(`${decodeErrPrefix} not enough data for float64`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat.compareTokens = encodeUint.compareTokens;
function invalidMinor(data, pos, minor) {
  throw new Error(`${decodeErrPrefix} encountered invalid minor (${minor}) for major ${data[pos] >>> 5}`);
}
function errorer(msg) {
  return () => {
    throw new Error(`${decodeErrPrefix} ${msg}`);
  };
}
const jump = [];
for (let i = 0; i <= 23; i++) {
  jump[i] = invalidMinor;
}
jump[24] = decodeUint8;
jump[25] = decodeUint16;
jump[26] = decodeUint32;
jump[27] = decodeUint64;
jump[28] = invalidMinor;
jump[29] = invalidMinor;
jump[30] = invalidMinor;
jump[31] = invalidMinor;
for (let i = 32; i <= 55; i++) {
  jump[i] = invalidMinor;
}
jump[56] = decodeNegint8;
jump[57] = decodeNegint16;
jump[58] = decodeNegint32;
jump[59] = decodeNegint64;
jump[60] = invalidMinor;
jump[61] = invalidMinor;
jump[62] = invalidMinor;
jump[63] = invalidMinor;
for (let i = 64; i <= 87; i++) {
  jump[i] = decodeBytesCompact;
}
jump[88] = decodeBytes8;
jump[89] = decodeBytes16;
jump[90] = decodeBytes32;
jump[91] = decodeBytes64;
jump[92] = invalidMinor;
jump[93] = invalidMinor;
jump[94] = invalidMinor;
jump[95] = errorer("indefinite length bytes/strings are not supported");
for (let i = 96; i <= 119; i++) {
  jump[i] = decodeStringCompact;
}
jump[120] = decodeString8;
jump[121] = decodeString16;
jump[122] = decodeString32;
jump[123] = decodeString64;
jump[124] = invalidMinor;
jump[125] = invalidMinor;
jump[126] = invalidMinor;
jump[127] = errorer("indefinite length bytes/strings are not supported");
for (let i = 128; i <= 151; i++) {
  jump[i] = decodeArrayCompact;
}
jump[152] = decodeArray8;
jump[153] = decodeArray16;
jump[154] = decodeArray32;
jump[155] = decodeArray64;
jump[156] = invalidMinor;
jump[157] = invalidMinor;
jump[158] = invalidMinor;
jump[159] = decodeArrayIndefinite;
for (let i = 160; i <= 183; i++) {
  jump[i] = decodeMapCompact;
}
jump[184] = decodeMap8;
jump[185] = decodeMap16;
jump[186] = decodeMap32;
jump[187] = decodeMap64;
jump[188] = invalidMinor;
jump[189] = invalidMinor;
jump[190] = invalidMinor;
jump[191] = decodeMapIndefinite;
for (let i = 192; i <= 215; i++) {
  jump[i] = decodeTagCompact;
}
jump[216] = decodeTag8;
jump[217] = decodeTag16;
jump[218] = decodeTag32;
jump[219] = decodeTag64;
jump[220] = invalidMinor;
jump[221] = invalidMinor;
jump[222] = invalidMinor;
jump[223] = invalidMinor;
for (let i = 224; i <= 243; i++) {
  jump[i] = errorer("simple values are not supported");
}
jump[244] = invalidMinor;
jump[245] = invalidMinor;
jump[246] = invalidMinor;
jump[247] = decodeUndefined;
jump[248] = errorer("simple values are not supported");
jump[249] = decodeFloat16;
jump[250] = decodeFloat32;
jump[251] = decodeFloat64;
jump[252] = invalidMinor;
jump[253] = invalidMinor;
jump[254] = invalidMinor;
jump[255] = decodeBreak;
const quick = [];
for (let i = 0; i < 24; i++) {
  quick[i] = new Token(Type.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick[31 - i] = new Token(Type.negint, i, 1);
}
quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
quick[96] = new Token(Type.string, "", 1);
quick[128] = new Token(Type.array, 0, 1);
quick[160] = new Token(Type.map, 0, 1);
quick[244] = new Token(Type.false, false, 1);
quick[245] = new Token(Type.true, true, 1);
quick[246] = new Token(Type.null, null, 1);
function quickEncodeToken(token) {
  switch (token.type) {
    case Type.false:
      return fromArray([244]);
    case Type.true:
      return fromArray([245]);
    case Type.null:
      return fromArray([246]);
    case Type.bytes:
      if (!token.value.length) {
        return fromArray([64]);
      }
      return;
    case Type.string:
      if (token.value === "") {
        return fromArray([96]);
      }
      return;
    case Type.array:
      if (token.value === 0) {
        return fromArray([128]);
      }
      return;
    case Type.map:
      if (token.value === 0) {
        return fromArray([160]);
      }
      return;
    case Type.uint:
      if (token.value < 24) {
        return fromArray([Number(token.value)]);
      }
      return;
    case Type.negint:
      if (token.value >= -24) {
        return fromArray([31 - Number(token.value)]);
      }
  }
}
const defaultEncodeOptions = {
  float64: false,
  mapSorter,
  quickEncodeToken
};
function makeCborEncoders() {
  const encoders = [];
  encoders[Type.uint.major] = encodeUint;
  encoders[Type.negint.major] = encodeNegint;
  encoders[Type.bytes.major] = encodeBytes;
  encoders[Type.string.major] = encodeString;
  encoders[Type.array.major] = encodeArray;
  encoders[Type.map.major] = encodeMap;
  encoders[Type.tag.major] = encodeTag;
  encoders[Type.float.major] = encodeFloat;
  return encoders;
}
const cborEncoders = makeCborEncoders();
const buf = new Bl();
class Ref {
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while (p = p.parent);
    return false;
  }
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${encodeErrPrefix} object contains circular references`);
    }
    return new Ref(obj, stack);
  }
}
const simpleTokens = {
  null: new Token(Type.null, null),
  undefined: new Token(Type.undefined, void 0),
  true: new Token(Type.true, true),
  false: new Token(Type.false, false),
  emptyArray: new Token(Type.array, 0),
  emptyMap: new Token(Type.map, 0)
};
const typeEncoders = {
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new Token(Type.float, obj);
    } else if (obj >= 0) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  Uint8Array(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, obj);
  },
  string(obj, _typ, _options, _refStack) {
    return new Token(Type.string, obj);
  },
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens.true : simpleTokens.false;
  },
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens.null;
  },
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens.undefined;
  },
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj));
  },
  DataView(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
  },
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyArray,
          new Token(Type.break)
        ];
      }
      return simpleTokens.emptyArray;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [
        new Token(Type.array, obj.length),
        entries,
        new Token(Type.break)
      ];
    }
    return [
      new Token(Type.array, obj.length),
      entries
    ];
  },
  Object(obj, typ, options, refStack) {
    const isMap = typ !== "Object";
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length2 = isMap ? obj.size : keys.length;
    if (!length2) {
      if (options.addBreakTokens === true) {
        return [
          simpleTokens.emptyMap,
          new Token(Type.break)
        ];
      }
      return simpleTokens.emptyMap;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key2 of keys) {
      entries[i++] = [
        objectToTokens(key2, options, refStack),
        objectToTokens(isMap ? obj.get(key2) : obj[key2], options, refStack)
      ];
    }
    sortMapEntries(entries, options);
    if (options.addBreakTokens) {
      return [
        new Token(Type.map, length2),
        entries,
        new Token(Type.break)
      ];
    }
    return [
      new Token(Type.map, length2),
      entries
    ];
  }
};
typeEncoders.Map = typeEncoders.Object;
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) {
  typeEncoders[`${typ}Array`] = typeEncoders.DataView;
}
function objectToTokens(obj, options = {}, refStack) {
  const typ = is(obj);
  const customTypeEncoder = options && options.typeEncoders && options.typeEncoders[typ] || typeEncoders[typ];
  if (typeof customTypeEncoder === "function") {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn("WARNING: complex key types used, CBOR key sorting guarantees are gone");
  }
  return tcmp;
}
function tokensToEncoded(buf2, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf2, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf2, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf2 = new Bl(size);
      encoder(buf2, tokens, options);
      if (buf2.chunks.length !== 1) {
        throw new Error(`Unexpected error: pre-calculated length for ${tokens} was wrong`);
      }
      return asU8A(buf2.chunks[0]);
    }
  }
  buf.reset();
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode$1(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, cborEncoders, options);
}
const defaultDecodeOptions = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true
};
class Tokeniser {
  constructor(data, options = {}) {
    this.pos = 0;
    this.data = data;
    this.options = options;
  }
  done() {
    return this.pos >= this.data.length;
  }
  next() {
    const byt = this.data[this.pos];
    let token = quick[byt];
    if (token === void 0) {
      const decoder = jump[byt];
      if (!decoder) {
        throw new Error(`${decodeErrPrefix} no decoder for major type ${byt >>> 5} (byte 0x${byt.toString(16).padStart(2, "0")})`);
      }
      const minor = byt & 31;
      token = decoder(this.data, this.pos, minor, this.options);
    }
    this.pos += token.encodedLength;
    return token;
  }
}
const DONE = Symbol.for("DONE");
const BREAK = Symbol.for("BREAK");
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed array`);
    }
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${token.value})`);
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? void 0 : {};
  const m = useMaps ? /* @__PURE__ */ new Map() : void 0;
  for (let i = 0; i < token.value; i++) {
    const key2 = tokensToObject(tokeniser, options);
    if (key2 === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed map`);
    }
    if (key2 === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no key], expected ${token.value})`);
    }
    if (useMaps !== true && typeof key2 !== "string") {
      throw new Error(`${decodeErrPrefix} non-string keys not supported (got ${typeof key2})`);
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no value], expected ${token.value})`);
    }
    if (useMaps) {
      m.set(key2, value);
    } else {
      obj[key2] = value;
    }
  }
  return useMaps ? m : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token = tokeniser.next();
  if (token.type === Type.break) {
    return BREAK;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === Type.array) {
    return tokenToArray(token, tokeniser, options);
  }
  if (token.type === Type.map) {
    return tokenToMap(token, tokeniser, options);
  }
  if (token.type === Type.tag) {
    if (options.tags && typeof options.tags[token.value] === "function") {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${decodeErrPrefix} tag not supported (${token.value})`);
  }
  throw new Error("unsupported");
}
function decode$1(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${decodeErrPrefix} did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${decodeErrPrefix} got unexpected break`);
  }
  if (!tokeniser.done()) {
    throw new Error(`${decodeErrPrefix} too many terminals, data makes no sense`);
  }
  return decoded;
}
const CID_CBOR_TAG = 42;
function cidEncoder(obj) {
  if (obj.asCID !== obj) {
    return null;
  }
  const cid = CID.asCID(obj);
  if (!cid) {
    return null;
  }
  const bytes = new Uint8Array(cid.bytes.byteLength + 1);
  bytes.set(cid.bytes, 1);
  return [
    new Token(Type.tag, CID_CBOR_TAG),
    new Token(Type.bytes, bytes)
  ];
}
function undefinedEncoder() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function numberEncoder(num) {
  if (Number.isNaN(num)) {
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  }
  return null;
}
const encodeOptions = {
  float64: true,
  typeEncoders: {
    Object: cidEncoder,
    undefined: undefinedEncoder,
    number: numberEncoder
  }
};
function cidDecoder(bytes) {
  if (bytes[0] !== 0) {
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  }
  return CID.decode(bytes.subarray(1));
}
const decodeOptions = {
  allowIndefinite: false,
  coerceUndefinedToNull: true,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  strict: true,
  useMaps: false,
  tags: []
};
decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
const name = "dag-cbor";
const code = 113;
const encode2 = (node2) => encode$1(node2, encodeOptions);
const decode = (data) => decode$1(data, decodeOptions);
const dagCBOR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name,
  code,
  encode: encode2,
  decode
}, Symbol.toStringTag, { value: "Module" }));
const ENC_BLOCK_SIZE = 24;
function pad2(b, blockSize = ENC_BLOCK_SIZE) {
  const padLen = (blockSize - b.length % blockSize) % blockSize;
  const bytes = new Uint8Array(b.length + padLen);
  bytes.set(b, 0);
  return bytes;
}
async function encodeIdentityCID(obj) {
  const block = await encode$2({ value: obj, codec: dagCBOR, hasher: identity });
  return block.cid;
}
function decodeIdentityCID(cid) {
  cid = CID.asCID(cid);
  if (cid.code !== code)
    throw new Error("CID codec must be dag-cbor");
  if (cid.multihash.code !== identity.code)
    throw new Error("CID must use identity multihash");
  return decode(cid.multihash.digest);
}
async function prepareCleartext(cleartext, blockSize) {
  return pad2((await encodeIdentityCID(cleartext)).bytes, blockSize);
}
function decodeCleartext(b) {
  return decodeIdentityCID(CID.decodeFirst(b)[0]);
}
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
const textEncoder = new TextEncoder();
new TextDecoder();
const REKEYS = "reKeys";
let lock = false;
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
class DagJoseCryptor {
  constructor(ipfs, proxcryptor, cid) {
    this.grantAccess = async (tag2, targetPublicKey) => {
      if (!tag2)
        return;
      const senderPubKey = await this.proxcryptor.getPublicKey();
      const hashedPubkeys = await this.getHashedTags(tag2, targetPublicKey, senderPubKey);
      const resTagNode = await this.ipfs.dag.get(CID.parse(this.rootCID), { path: `/${tag2}` });
      let tagNode = resTagNode.value;
      let reKeyNode = tagNode[REKEYS];
      const targetsReEncryptedKey = await this.proxcryptor.transformTagKey(targetPublicKey, tag2, tagNode.encryptedKey);
      reKeyNode[hashedPubkeys] = targetsReEncryptedKey;
      tagNode = { ...tagNode, [REKEYS]: reKeyNode };
      this.rootCID = await this.updateDag(tag2, tagNode);
      this.emitter.emit("rootCIDUpdate", this.rootCID);
      return this.rootCID;
    };
    this.checkAccess = async (tagNode, targetPublicKey, senderPubKey) => {
      if (!tagNode.tag)
        return false;
      const hashedPubkeys = await this.getHashedTags(tagNode.tag, targetPublicKey, senderPubKey);
      if (hashedPubkeys in tagNode[REKEYS])
        return true;
      return false;
    };
    this.decryptFromTagNode = async (tagNode, senderPubKey) => {
      const targetPublicKey = await this.proxcryptor.getPublicKey();
      const hashTag = await this.getHashedTags(tagNode.tag, targetPublicKey, senderPubKey);
      if (!(hashTag in tagNode[REKEYS]))
        return false;
      const reKey = tagNode[REKEYS][hashTag];
      return await this.get(tagNode.encryptedData, reKey);
    };
    this.selfDecryptTagNode = async (tagNode) => {
      if (!this.rootCID || !this.ipfs || !tag)
        return false;
      try {
        return await this.selfDecrypt(tagNode);
      } catch (error) {
        console.warn(`${tag} no DAG data`);
        return false;
      }
    };
    this.selfDecrypt = async (tagNode) => {
      try {
        const symmetricKey = await this.proxcryptor.selfDecrypt(tagNode.encryptedKey);
        const decoded = await this.loadEncrypted(tagNode.encryptedData, symmetricKey);
        return decoded;
      } catch (error) {
        console.error("In selfDecrypt", error);
        return false;
      }
    };
    this.storeDAGEncrypted = async (payload, key2) => {
      const jwe = await this.makeJWE(payload, key2);
      const cid2 = await this.ipfs.dag.put(jwe, {
        pin: true,
        storeCodec: "dag-cbor",
        hashAlg: "sha2-256",
        preload: false
      });
      return cid2;
    };
    this.storeIPFSEncrypted = async (payload, key2) => {
      const jwe = await this.makeJWE(payload, key2);
      const res = await this.ipfs.add(JSON.stringify(jwe), {
        cidVersion: 1,
        pin: true
      });
      return res.cid;
    };
    this.makeJWE = async (payload, key2) => {
      const dirEncrypter = xc20pDirEncrypter(key2);
      const cleartext = await prepareCleartext(payload);
      const jwe = await createJWE(cleartext, [dirEncrypter]);
      return jwe;
    };
    this.loadEncrypted = async (cid2, key2) => {
      const dirDecrypter = xc20pDirDecrypter(key2);
      const retrieved = await this.ipfs.dag.get(cid2);
      const decryptedData = await decryptJWE(retrieved.value, dirDecrypter);
      return decodeCleartext(decryptedData);
    };
    this.ipfs = ipfs;
    this.proxcryptor = proxcryptor;
    this.rootCID = cid || null;
    this.emitter = mitt();
  }
  async updateDag(tag2, newEntry) {
    const newCID = await this.ipfs.dag.put(newEntry, {
      pin: true,
      storeCodec: "dag-cbor",
      preload: false
    });
    const exisitingData = this.rootCID ? await this.ipfs.dag.get(CID.parse(this.rootCID)) : {};
    let data = {
      ...exisitingData.value,
      [tag2]: newCID,
      prev: this.rootCID ? CID.parse(this.rootCID) : false
    };
    lock = true;
    const newRootCID = await this.ipfs.dag.put(data, {
      pin: true,
      storeCodec: "dag-cbor"
    });
    lock = false;
    this.ipfs.dag.get(newRootCID);
    return newRootCID.toString();
  }
  async getHashedTags(tag2, targetPublicKey, senderPubKey) {
    const tagArray = textEncoder.encode(tag2);
    const input = new Uint8Array([...tagArray, ...targetPublicKey, ...senderPubKey]);
    const hashedPubkeys = await hexDigestMessage(input);
    return hashedPubkeys;
  }
  async put(secretz, tag2, schema = {}) {
    secretz = Object.fromEntries(
      Object.entries(secretz).map(([k, v]) => v === void 0 ? [k, null] : [k, v])
    );
    const symmetricKey = random.randomBytes(32);
    const selfEncryptedSymmetricKey = await this.proxcryptor.selfEncrypt(symmetricKey, tag2);
    const cid = await this.storeDAGEncrypted(secretz, symmetricKey);
    await this.ipfs.pin.add(cid, { recursive: true });
    while (lock) {
      await sleep(1e3);
    }
    lock = true;
    let prev = false;
    try {
      let res = await this.ipfs.dag.resolve(`${this.rootCID}/${tag2}`);
      prev = res.cid;
    } catch (error) {
      prev = false;
    }
    const newEntry = {
      tag: tag2,
      schema,
      timestamp: +new Date(),
      encryptedData: cid,
      encryptedKey: selfEncryptedSymmetricKey,
      [REKEYS]: {},
      prev
    };
    this.rootCID = await this.updateDag(tag2, newEntry);
    this.emitter.emit("rootCIDUpdate", this.rootCID);
    lock = false;
  }
  async get(cid, re_encrypted_message) {
    const symmetricKey = await this.proxcryptor.reDecrypt(re_encrypted_message);
    const decoded = await this.loadEncrypted(cid, symmetricKey);
    return decoded;
  }
}
function create_fragment$a(ctx) {
  let div;
  let label;
  let span;
  let t0;
  let t1;
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      label = element("label");
      span = element("span");
      t0 = text(ctx[1]);
      t1 = space();
      input = element("input");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      label = claim_element(div_nodes, "LABEL", { class: true });
      var label_nodes = children(label);
      span = claim_element(label_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, ctx[1]);
      span_nodes.forEach(detach);
      t1 = claim_space(label_nodes);
      input = claim_element(label_nodes, "INPUT", {
        type: true,
        name: true,
        class: true,
        placeholder: true
      });
      label_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700");
      attr(input, "type", "text");
      attr(input, "name", "text");
      attr(input, "class", "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1");
      attr(input, "placeholder", ctx[2]);
      attr(label, "class", "flex-col");
      attr(div, "class", "flex-1 mt-2");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, label);
      append_hydration(label, span);
      append_hydration(span, t0);
      append_hydration(label, t1);
      append_hydration(label, input);
      set_input_value(input, ctx[0]);
      if (!mounted) {
        dispose = listen(input, "input", ctx[3]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2)
        set_data(t0, ctx2[1]);
      if (dirty & 4) {
        attr(input, "placeholder", ctx2[2]);
      }
      if (dirty & 1 && input.value !== ctx2[0]) {
        set_input_value(input, ctx2[0]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { name: name2 } = $$props;
  let { value } = $$props;
  let { placeholder = "" } = $$props;
  function input_input_handler() {
    value = this.value;
    $$invalidate(0, value);
  }
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2)
      $$invalidate(1, name2 = $$props2.name);
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("placeholder" in $$props2)
      $$invalidate(2, placeholder = $$props2.placeholder);
  };
  return [value, name2, placeholder, input_input_handler];
}
class Input extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { name: 1, value: 0, placeholder: 2 });
  }
}
function create_fragment$9(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex flex-grow flex-col bg-slate-100 shadow-md p-4 rounded-xl h-full border");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[0],
            !current ? get_all_dirty_from_scope(ctx2[0]) : get_slot_changes(default_slot_template, ctx2[0], dirty, null),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class Card extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {});
  }
}
function create_fragment$8(ctx) {
  let span1;
  let span0;
  let span1_class_value;
  let current;
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      span1 = element("span");
      span0 = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span1 = claim_element(nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      span0 = claim_element(span1_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      if (default_slot)
        default_slot.l(span0_nodes);
      span0_nodes.forEach(detach);
      span1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span0, "class", "relative pr-1");
      attr(span1, "class", span1_class_value = (ctx[0] == "pink" ? pink : ctx[1]) + " before:block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block");
    },
    m(target, anchor) {
      insert_hydration(target, span1, anchor);
      append_hydration(span1, span0);
      if (default_slot) {
        default_slot.m(span0, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[2],
            !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 1 && span1_class_value !== (span1_class_value = (ctx2[0] == "pink" ? pink : ctx2[1]) + " before:block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block")) {
        attr(span1, "class", span1_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span1);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
let pink = "before:bg-pink-500";
function instance$8($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { color = "green" } = $$props;
  let green2 = `before:bg-green-200 text-black `;
  $$self.$$set = ($$props2) => {
    if ("color" in $$props2)
      $$invalidate(0, color = $$props2.color);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [color, green2, $$scope, slots];
}
class Skew extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, { color: 0 });
  }
}
function create_fragment$7(ctx) {
  let div;
  let svg;
  let circle;
  let path;
  let t;
  let current;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      circle = svg_element("circle");
      path = svg_element("path");
      t = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        class: true,
        xmlns: true,
        fill: true,
        viewBox: true
      });
      var svg_nodes = children(svg);
      circle = claim_svg_element(svg_nodes, "circle", {
        class: true,
        cx: true,
        cy: true,
        r: true,
        stroke: true,
        "stroke-width": true
      });
      children(circle).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", { class: true, fill: true, d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      t = claim_space(div_nodes);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(circle, "class", "opacity-25");
      attr(circle, "cx", "12");
      attr(circle, "cy", "12");
      attr(circle, "r", "10");
      attr(circle, "stroke", "currentColor");
      attr(circle, "stroke-width", "4");
      attr(path, "class", "opacity-75");
      attr(path, "fill", "currentColor");
      attr(path, "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z");
      attr(svg, "class", "animate-spin -ml-1 mr-3 h-5 w-5 text-white");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "fill", "none");
      attr(svg, "viewBox", "0 0 24 24");
      attr(div, "class", "fixed top-10 right-10 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow-md rounded-md text-white bg-green-500 hover:bg-green-400 transition ease-in-out duration-150 cursor-progress");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, circle);
      append_hydration(svg, path);
      append_hydration(div, t);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[0],
            !current ? get_all_dirty_from_scope(ctx2[0]) : get_slot_changes(default_slot_template, ctx2[0], dirty, null),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class Spinner extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {});
  }
}
function create_fragment$6(ctx) {
  let button;
  let button_class_value;
  let button_disabled_value;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[4].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[3], null);
  return {
    c() {
      button = element("button");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      if (default_slot)
        default_slot.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", button_class_value = (!ctx[1] || ctx[1] == "Yes" ? green : ctx[1] == "No" ? red : ctx[1] == "Connecting" ? yellow : blue) + " font-bold rounded-lg shadow-md px-4 py-2 my-4 w-fit disabled:opacity-25");
      button.disabled = button_disabled_value = ctx[2] || ctx[1] == "Connecting";
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if (default_slot) {
        default_slot.m(button, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", prevent_default(function() {
          if (is_function(ctx[0]))
            ctx[0].apply(this, arguments);
        }));
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            ctx[3],
            !current ? get_all_dirty_from_scope(ctx[3]) : get_slot_changes(default_slot_template, ctx[3], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 2 && button_class_value !== (button_class_value = (!ctx[1] || ctx[1] == "Yes" ? green : ctx[1] == "No" ? red : ctx[1] == "Connecting" ? yellow : blue) + " font-bold rounded-lg shadow-md px-4 py-2 my-4 w-fit disabled:opacity-25")) {
        attr(button, "class", button_class_value);
      }
      if (!current || dirty & 6 && button_disabled_value !== (button_disabled_value = ctx[2] || ctx[1] == "Connecting")) {
        button.disabled = button_disabled_value;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
let green = "bg-green-500 hover:bg-green-700 text-white";
let blue = "bg-blue-500 hover:bg-blue-700 text-white";
let red = "bg-red-500 hover:bg-red-700 text-white";
let yellow = "bg-yellow-500 hover:bg-yellow-700 text-white";
function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { clickHandler = null } = $$props;
  let { type = "green" } = $$props;
  let { disabled = false } = $$props;
  $$self.$$set = ($$props2) => {
    if ("clickHandler" in $$props2)
      $$invalidate(0, clickHandler = $$props2.clickHandler);
    if ("type" in $$props2)
      $$invalidate(1, type = $$props2.type);
    if ("disabled" in $$props2)
      $$invalidate(2, disabled = $$props2.disabled);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [clickHandler, type, disabled, $$scope, slots];
}
class Button extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { clickHandler: 0, type: 1, disabled: 2 });
  }
}
function create_fragment$5(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "text-xl font-bold text-left my-4");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[0],
            !current ? get_all_dirty_from_scope(ctx2[0]) : get_slot_changes(default_slot_template, ctx2[0], dirty, null),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class Headerz extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {});
  }
}
const get_ep_slot_changes = (dirty) => ({ decrypted: dirty & 8 });
const get_ep_slot_context = (ctx) => ({ decrypted: ctx[3].data });
const get_default_slot_changes = (dirty) => ({ decrypted: dirty & 8 });
const get_default_slot_context = (ctx) => ({ decrypted: ctx[3].data });
const get_tag_slot_changes = (dirty) => ({ decrypted: dirty & 8 });
const get_tag_slot_context = (ctx) => ({ decrypted: ctx[3].data });
function create_if_block_1$2(ctx) {
  let button;
  let t;
  let button_disabled_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      t = text("\u{1F512} Decrypt");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t = claim_text(button_nodes, "\u{1F512} Decrypt");
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "flex-1 mr-2 disabled:opacity-30");
      button.disabled = button_disabled_value = ctx[1] && !ctx[2];
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, t);
      if (!mounted) {
        dispose = listen(button, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & 6 && button_disabled_value !== (button_disabled_value = ctx2[1] && !ctx2[2])) {
        button.disabled = button_disabled_value;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$4(ctx) {
  let await_block_anchor;
  let promise;
  let current;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block$2,
    then: create_then_block$2,
    catch: create_catch_block$2,
    value: 3,
    blocks: [, , ,]
  };
  handle_promise(promise = ctx[3], info);
  return {
    c() {
      await_block_anchor = empty();
      info.block.c();
    },
    l(nodes) {
      await_block_anchor = empty();
      info.block.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      if (dirty & 8 && promise !== (promise = ctx[3]) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(info.block);
      current = true;
    },
    o(local) {
      for (let i = 0; i < 3; i += 1) {
        const block = info.blocks[i];
        transition_out(block);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(await_block_anchor);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_catch_block$2(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_then_block$2(ctx) {
  let p;
  let t0;
  let t1;
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], get_default_slot_context);
  return {
    c() {
      p = element("p");
      t0 = text("\u{1F4C2} Decrypted:");
      t1 = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "\u{1F4C2} Decrypted:");
      p_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t0);
      insert_hydration(target, t1, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 264)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, get_default_slot_changes),
            get_default_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(p);
      if (detaching)
        detach(t1);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_pending_block$2(ctx) {
  let spinner;
  let current;
  spinner = new Spinner({
    props: {
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(spinner.$$.fragment);
    },
    l(nodes) {
      claim_component(spinner.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(spinner, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const spinner_changes = {};
      if (dirty & 256) {
        spinner_changes.$$scope = { dirty, ctx: ctx2 };
      }
      spinner.$set(spinner_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(spinner.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(spinner.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(spinner, detaching);
    }
  };
}
function create_default_slot$2(ctx) {
  let t;
  return {
    c() {
      t = text("Decrypting...");
    },
    l(nodes) {
      t = claim_text(nodes, "Decrypting...");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$4(ctx) {
  let div2;
  let div0;
  let t0;
  let div1;
  let current_block_type_index;
  let if_block;
  let t1;
  let current;
  const tag_slot_template = ctx[7].tag;
  const tag_slot = create_slot(tag_slot_template, ctx, ctx[8], get_tag_slot_context);
  const if_block_creators = [create_if_block$4, create_if_block_1$2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[3])
      return 0;
    if (ctx2[0])
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  const ep_slot_template = ctx[7].ep;
  const ep_slot = create_slot(ep_slot_template, ctx, ctx[8], get_ep_slot_context);
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      if (tag_slot)
        tag_slot.c();
      t0 = space();
      div1 = element("div");
      if (if_block)
        if_block.c();
      t1 = space();
      if (ep_slot)
        ep_slot.c();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (tag_slot)
        tag_slot.l(div0_nodes);
      div0_nodes.forEach(detach);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      if (if_block)
        if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      t1 = claim_space(div2_nodes);
      if (ep_slot)
        ep_slot.l(div2_nodes);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "shrink mr-2");
      attr(div1, "class", "grow");
      attr(div2, "class", "flex flex-row");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div0);
      if (tag_slot) {
        tag_slot.m(div0, null);
      }
      append_hydration(div2, t0);
      append_hydration(div2, div1);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div1, null);
      }
      append_hydration(div2, t1);
      if (ep_slot) {
        ep_slot.m(div2, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (tag_slot) {
        if (tag_slot.p && (!current || dirty & 264)) {
          update_slot_base(
            tag_slot,
            tag_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(tag_slot_template, ctx2[8], dirty, get_tag_slot_changes),
            get_tag_slot_context
          );
        }
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div1, null);
        } else {
          if_block = null;
        }
      }
      if (ep_slot) {
        if (ep_slot.p && (!current || dirty & 264)) {
          update_slot_base(
            ep_slot,
            ep_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(ep_slot_template, ctx2[8], dirty, get_ep_slot_changes),
            get_ep_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(tag_slot, local);
      transition_in(if_block);
      transition_in(ep_slot, local);
      current = true;
    },
    o(local) {
      transition_out(tag_slot, local);
      transition_out(if_block);
      transition_out(ep_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      if (tag_slot)
        tag_slot.d(detaching);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (ep_slot)
        ep_slot.d(detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { tagNode } = $$props;
  let { decrypt } = $$props;
  let { sender = void 0 } = $$props;
  let { viewAccess = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  let decrypted = false;
  let onAccessList = false;
  const decryptHandler = async (event) => {
    console.log("decryptHandler", { tagNode }, { sender });
    if (sender && viewAccess) {
      if (!onAccessList) {
        console.log("not on access list");
        return;
      }
      $$invalidate(3, decrypted = await decrypt(tagNode, sender));
    } else {
      $$invalidate(3, decrypted = await decrypt(tagNode));
      if (!decrypted) {
        console.log("not decrypted");
        return;
      }
    }
    dispatch("decrypted", { decrypted: decrypted.data });
  };
  $$self.$$set = ($$props2) => {
    if ("tagNode" in $$props2)
      $$invalidate(0, tagNode = $$props2.tagNode);
    if ("decrypt" in $$props2)
      $$invalidate(5, decrypt = $$props2.decrypt);
    if ("sender" in $$props2)
      $$invalidate(1, sender = $$props2.sender);
    if ("viewAccess" in $$props2)
      $$invalidate(6, viewAccess = $$props2.viewAccess);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 67) {
      if (tagNode)
        (async () => {
          console.log("View access for", { tagNode });
          console.log("tagNode.tag", tagNode.tag, !viewAccess || !tagNode.tag || !sender);
          if (!viewAccess || !tagNode.tag || !sender)
            return;
          $$invalidate(2, onAccessList = await viewAccess({ tagNode, sender }));
        })();
    }
  };
  return [
    tagNode,
    sender,
    onAccessList,
    decrypted,
    decryptHandler,
    decrypt,
    viewAccess,
    slots,
    $$scope
  ];
}
class Item extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      tagNode: 0,
      decrypt: 5,
      sender: 1,
      viewAccess: 6
    });
  }
}
function create_if_block_1$1(ctx) {
  let div;
  let span0;
  let t0;
  let t1;
  let span1;
  let t2;
  let t3;
  return {
    c() {
      div = element("div");
      span0 = element("span");
      t0 = text(ctx[3]);
      t1 = space();
      span1 = element("span");
      t2 = text(ctx[0]);
      t3 = text("%");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      span0 = claim_element(div_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t0 = claim_text(span0_nodes, ctx[3]);
      span0_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      span1 = claim_element(div_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      t2 = claim_text(span1_nodes, ctx[0]);
      t3 = claim_text(span1_nodes, "%");
      span1_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span0, "class", "text-base font-medium dark:text-white");
      attr(span1, "class", "text-sm font-medium dark:text-white");
      attr(div, "class", "flex justify-between mb-1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, span0);
      append_hydration(span0, t0);
      append_hydration(div, t1);
      append_hydration(div, span1);
      append_hydration(span1, t2);
      append_hydration(span1, t3);
    },
    p(ctx2, dirty) {
      if (dirty & 8)
        set_data(t0, ctx2[3]);
      if (dirty & 1)
        set_data(t2, ctx2[0]);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_else_block$1(ctx) {
  let div;
  let div_class_value;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", div_class_value = ctx[5][ctx[4]] + " " + ctx[1] + " rounded-full");
      set_style(div, "width", ctx[0] + "%");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 18 && div_class_value !== (div_class_value = ctx2[5][ctx2[4]] + " " + ctx2[1] + " rounded-full")) {
        attr(div, "class", div_class_value);
      }
      if (dirty & 1) {
        set_style(div, "width", ctx2[0] + "%");
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block$3(ctx) {
  let div;
  let t0;
  let t1;
  return {
    c() {
      div = element("div");
      t0 = text(ctx[0]);
      t1 = text("%");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, ctx[0]);
      t1 = claim_text(div_nodes, "%");
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full");
      set_style(div, "width", ctx[0] + "%");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
      if (dirty & 1) {
        set_style(div, "width", ctx2[0] + "%");
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$3(ctx) {
  let t;
  let div;
  let div_class_value;
  let if_block0 = ctx[3] && create_if_block_1$1(ctx);
  function select_block_type(ctx2, dirty) {
    if (ctx2[2])
      return create_if_block$3;
    return create_else_block$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t = space();
      div = element("div");
      if_block1.c();
      this.h();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block1.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", div_class_value = "w-full bg-gray-200 rounded-full " + ctx[1] + " dark:bg-gray-700");
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t, anchor);
      insert_hydration(target, div, anchor);
      if_block1.m(div, null);
    },
    p(ctx2, [dirty]) {
      if (ctx2[3]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1$1(ctx2);
          if_block0.c();
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div, null);
        }
      }
      if (dirty & 2 && div_class_value !== (div_class_value = "w-full bg-gray-200 rounded-full " + ctx2[1] + " dark:bg-gray-700")) {
        attr(div, "class", div_class_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
      if_block1.d();
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { progress = "45" } = $$props;
  let { size = "h-2.5" } = $$props;
  let { labelInside = false } = $$props;
  let { labelOutside = "" } = $$props;
  let { color = "green" } = $$props;
  const barColors = {
    blue: "bg-blue-600",
    gray: "bg-gray-600 dark:bg-gray-300",
    red: "bg-red-600 dark:bg-red-500",
    green: "bg-green-500 dark:bg-green-500",
    yellow: "bg-yellow-400",
    pink: "bg-pink-500 ",
    purple: "bg-purple-600 dark:bg-purple-500",
    indigo: "bg-indigo-600 dark:bg-indigo-500"
  };
  $$self.$$set = ($$props2) => {
    if ("progress" in $$props2)
      $$invalidate(0, progress = $$props2.progress);
    if ("size" in $$props2)
      $$invalidate(1, size = $$props2.size);
    if ("labelInside" in $$props2)
      $$invalidate(2, labelInside = $$props2.labelInside);
    if ("labelOutside" in $$props2)
      $$invalidate(3, labelOutside = $$props2.labelOutside);
    if ("color" in $$props2)
      $$invalidate(4, color = $$props2.color);
  };
  return [progress, size, labelInside, labelOutside, color, barColors];
}
class Progressbar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      progress: 0,
      size: 1,
      labelInside: 2,
      labelOutside: 3,
      color: 4
    });
  }
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key2) => {
      interpolators[key2] = get_interpolator(a[key2], b[key2]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key2) => {
        result[key2] = interpolators[key2](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity$3, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
function create_if_block$2(ctx) {
  let progressbar;
  let current;
  progressbar = new Progressbar({
    props: {
      size: "h-6",
      progress: String(ctx[1].toFixed(0)),
      labelOutside: "Loading" + (ctx[0] ? " " + ctx[0] : "") + "... " + ctx[1].toFixed(0) + "%"
    }
  });
  return {
    c() {
      create_component(progressbar.$$.fragment);
    },
    l(nodes) {
      claim_component(progressbar.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(progressbar, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const progressbar_changes = {};
      if (dirty & 2)
        progressbar_changes.progress = String(ctx2[1].toFixed(0));
      if (dirty & 3)
        progressbar_changes.labelOutside = "Loading" + (ctx2[0] ? " " + ctx2[0] : "") + "... " + ctx2[1].toFixed(0) + "%";
      progressbar.$set(progressbar_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(progressbar.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(progressbar.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(progressbar, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block$2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $loader;
  let { duration = 6e4 } = $$props;
  let { label = null } = $$props;
  const loader = tweened(1, { duration, easing: cubicOut });
  component_subscribe($$self, loader, (value) => $$invalidate(1, $loader = value));
  onMount(async () => {
    set_store_value(loader, $loader = 99, $loader);
  });
  $$self.$$set = ($$props2) => {
    if ("duration" in $$props2)
      $$invalidate(3, duration = $$props2.duration);
    if ("label" in $$props2)
      $$invalidate(0, label = $$props2.label);
  };
  return [label, $loader, loader, duration];
}
class Progress extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { duration: 3, label: 0 });
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i][0];
  child_ctx[10] = list[i][1];
  return child_ctx;
}
const get_endpoint_slot_changes = (dirty) => ({
  tag: dirty & 16,
  pubkey: dirty & 2
});
const get_endpoint_slot_context = (ctx) => ({
  tag: ctx[9],
  pubkey: ctx[1]
});
function create_if_block$1(ctx) {
  let previous_key = ctx[4];
  let key_block_anchor;
  let current;
  let key_block = create_key_block$1(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    l(nodes) {
      key_block.l(nodes);
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert_hydration(target, key_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 16 && safe_not_equal(previous_key, previous_key = ctx2[4])) {
        group_outros();
        transition_out(key_block, 1, 1, noop);
        check_outros();
        key_block = create_key_block$1(ctx2);
        key_block.c();
        transition_in(key_block, 1);
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(key_block);
      current = true;
    },
    o(local) {
      transition_out(key_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(key_block_anchor);
      key_block.d(detaching);
    }
  };
}
function create_catch_block$1(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_then_block$1(ctx) {
  let div;
  let t0;
  let t1;
  let t2;
  let each_1_anchor;
  let current;
  let each_value = Object.entries(ctx[4]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      t0 = text("rootCID: ");
      t1 = text(ctx[3]);
      t2 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, "rootCID: ");
      t1 = claim_text(div_nodes, ctx[3]);
      div_nodes.forEach(detach);
      t2 = claim_space(nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
      this.h();
    },
    h() {
      attr(div, "class", "text-xs bg-neutral-300 rounded-lg p-2");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
      insert_hydration(target, t2, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & 8)
        set_data(t1, ctx2[3]);
      if (dirty & 8471) {
        each_value = Object.entries(ctx2[4]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching)
        detach(t2);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_default_slot$1(ctx) {
  let div;
  let t_value = ctx[13] + "";
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, t_value);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "p-2");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & 8192 && t_value !== (t_value = ctx2[13] + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_tag_slot(ctx) {
  let t_value = ctx[9] + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && t_value !== (t_value = ctx2[9] + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_ep_slot(ctx) {
  let current;
  const endpoint_slot_template = ctx[7].endpoint;
  const endpoint_slot = create_slot(endpoint_slot_template, ctx, ctx[8], get_endpoint_slot_context);
  return {
    c() {
      if (endpoint_slot)
        endpoint_slot.c();
    },
    l(nodes) {
      if (endpoint_slot)
        endpoint_slot.l(nodes);
    },
    m(target, anchor) {
      if (endpoint_slot) {
        endpoint_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (endpoint_slot) {
        if (endpoint_slot.p && (!current || dirty & 274)) {
          update_slot_base(
            endpoint_slot,
            endpoint_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(endpoint_slot_template, ctx2[8], dirty, get_endpoint_slot_changes),
            get_endpoint_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(endpoint_slot, local);
      current = true;
    },
    o(local) {
      transition_out(endpoint_slot, local);
      current = false;
    },
    d(detaching) {
      if (endpoint_slot)
        endpoint_slot.d(detaching);
    }
  };
}
function create_key_block_1$1(ctx) {
  let item;
  let t;
  let current;
  item = new Item({
    props: {
      tagNode: ctx[10],
      decrypt: ctx[0],
      viewAccess: ctx[2],
      sender: ctx[1],
      $$slots: {
        ep: [
          create_ep_slot,
          ({ decrypted }) => ({ 13: decrypted }),
          ({ decrypted }) => decrypted ? 8192 : 0
        ],
        tag: [
          create_tag_slot,
          ({ decrypted }) => ({ 13: decrypted }),
          ({ decrypted }) => decrypted ? 8192 : 0
        ],
        default: [
          create_default_slot$1,
          ({ decrypted }) => ({ 13: decrypted }),
          ({ decrypted }) => decrypted ? 8192 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(item.$$.fragment);
      t = space();
    },
    l(nodes) {
      claim_component(item.$$.fragment, nodes);
      t = claim_space(nodes);
    },
    m(target, anchor) {
      mount_component(item, target, anchor);
      insert_hydration(target, t, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const item_changes = {};
      if (dirty & 16)
        item_changes.tagNode = ctx2[10];
      if (dirty & 1)
        item_changes.decrypt = ctx2[0];
      if (dirty & 4)
        item_changes.viewAccess = ctx2[2];
      if (dirty & 2)
        item_changes.sender = ctx2[1];
      if (dirty & 8466) {
        item_changes.$$scope = { dirty, ctx: ctx2 };
      }
      item.$set(item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(item, detaching);
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block$1(ctx) {
  let previous_key = ctx[10];
  let key_block_anchor;
  let current;
  let key_block = create_key_block_1$1(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    l(nodes) {
      key_block.l(nodes);
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert_hydration(target, key_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 16 && safe_not_equal(previous_key, previous_key = ctx2[10])) {
        group_outros();
        transition_out(key_block, 1, 1, noop);
        check_outros();
        key_block = create_key_block_1$1(ctx2);
        key_block.c();
        transition_in(key_block, 1);
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(key_block);
      current = true;
    },
    o(local) {
      transition_out(key_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(key_block_anchor);
      key_block.d(detaching);
    }
  };
}
function create_pending_block$1(ctx) {
  let t0;
  let t1;
  let t2;
  return {
    c() {
      t0 = text("Fetching ");
      t1 = text(ctx[3]);
      t2 = text("...");
    },
    l(nodes) {
      t0 = claim_text(nodes, "Fetching ");
      t1 = claim_text(nodes, ctx[3]);
      t2 = claim_text(nodes, "...");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 8)
        set_data(t1, ctx2[3]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
    }
  };
}
function create_key_block$1(ctx) {
  let await_block_anchor;
  let promise;
  let current;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block$1,
    then: create_then_block$1,
    catch: create_catch_block$1,
    value: 4,
    blocks: [, , ,]
  };
  handle_promise(promise = ctx[4], info);
  return {
    c() {
      await_block_anchor = empty();
      info.block.c();
    },
    l(nodes) {
      await_block_anchor = empty();
      info.block.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      if (dirty & 16 && promise !== (promise = ctx[4]) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(info.block);
      current = true;
    },
    o(local) {
      for (let i = 0; i < 3; i += 1) {
        const block = info.blocks[i];
        transition_out(block);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(await_block_anchor);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_fragment$1(ctx) {
  let t;
  let current;
  let if_block = ctx[4] && create_if_block$1(ctx);
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], null);
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[4]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 256)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, null),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { getTagNodes: getTagNodes2 } = $$props;
  let { decrypt } = $$props;
  let { sender = void 0 } = $$props;
  let { viewAccess = void 0 } = $$props;
  let { rootCID } = $$props;
  let { ipfsNode } = $$props;
  let tagNodes;
  (async () => {
    $$invalidate(4, tagNodes = await getTagNodes2({ ipfsNode, rootCID }));
    console.log({ tagNodes, rootCID });
  })();
  $$self.$$set = ($$props2) => {
    if ("getTagNodes" in $$props2)
      $$invalidate(5, getTagNodes2 = $$props2.getTagNodes);
    if ("decrypt" in $$props2)
      $$invalidate(0, decrypt = $$props2.decrypt);
    if ("sender" in $$props2)
      $$invalidate(1, sender = $$props2.sender);
    if ("viewAccess" in $$props2)
      $$invalidate(2, viewAccess = $$props2.viewAccess);
    if ("rootCID" in $$props2)
      $$invalidate(3, rootCID = $$props2.rootCID);
    if ("ipfsNode" in $$props2)
      $$invalidate(6, ipfsNode = $$props2.ipfsNode);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  return [
    decrypt,
    sender,
    viewAccess,
    rootCID,
    tagNodes,
    getTagNodes2,
    ipfsNode,
    slots,
    $$scope
  ];
}
class ListTagNodes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      getTagNodes: 5,
      decrypt: 0,
      sender: 1,
      viewAccess: 2,
      rootCID: 3,
      ipfsNode: 6
    });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[40] = list[i][0];
  child_ctx[16] = list[i][1].handle;
  child_ctx[41] = list[i][1].rootCID;
  return child_ctx;
}
function create_if_block_9(ctx) {
  let div;
  let progress;
  let current;
  progress = new Progress({
    props: { duration: 45e3, label: "PiperNet" }
  });
  return {
    c() {
      div = element("div");
      create_component(progress.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(progress.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "p-6 text-green-500 bg-neutral-900 rounded-xl");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(progress, div, null);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(progress.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(progress.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(progress);
    }
  };
}
function create_if_block_6(ctx) {
  let hypnscomponent;
  let updating_hypnsNode;
  let t;
  let if_block_anchor;
  let current;
  function hypnscomponent_hypnsNode_binding(value) {
    ctx[24](value);
  }
  let hypnscomponent_props = {};
  if (ctx[0] !== void 0) {
    hypnscomponent_props.hypnsNode = ctx[0];
  }
  hypnscomponent = new ctx[4]({ props: hypnscomponent_props });
  binding_callbacks.push(() => bind(hypnscomponent, "hypnsNode", hypnscomponent_hypnsNode_binding));
  let if_block = ctx[1] && ctx[5] && create_if_block_7(ctx);
  return {
    c() {
      create_component(hypnscomponent.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      claim_component(hypnscomponent.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(hypnscomponent, target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const hypnscomponent_changes = {};
      if (!updating_hypnsNode && dirty[0] & 1) {
        updating_hypnsNode = true;
        hypnscomponent_changes.hypnsNode = ctx2[0];
        add_flush_callback(() => updating_hypnsNode = false);
      }
      hypnscomponent.$set(hypnscomponent_changes);
      if (ctx2[1] && ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 34) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_7(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(hypnscomponent.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(hypnscomponent.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      destroy_component(hypnscomponent, detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_7(ctx) {
  var _a, _b;
  let if_block_anchor;
  let current;
  let if_block = ctx[1] != ((_b = (_a = ctx[5]) == null ? void 0 : _a.latest) == null ? void 0 : _b.rootCID) && create_if_block_8(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2, _b2;
      if (ctx2[1] != ((_b2 = (_a2 = ctx2[5]) == null ? void 0 : _a2.latest) == null ? void 0 : _b2.rootCID)) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 34) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_8(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_8(ctx) {
  let div;
  let t0;
  let button;
  let t1;
  let div_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      t0 = text("\u26A0\uFE0F PiperNet needs updating ");
      button = element("button");
      t1 = text("Publish Update");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, "\u26A0\uFE0F PiperNet needs updating ");
      button = claim_element(div_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t1 = claim_text(button_nodes, "Publish Update");
      button_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded");
      attr(div, "class", "text-amber-300 bg-neutral-900 rounded-lg p-4 m-4");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, button);
      append_hydration(button, t1);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[25]);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(
            div,
            fly,
            {
              delay: 100,
              duration: 300,
              x: 0,
              y: -200,
              opacity: 0.25,
              easing: quintOut
            },
            true
          );
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(
          div,
          fly,
          {
            delay: 100,
            duration: 300,
            x: 0,
            y: -200,
            opacity: 0.25,
            easing: quintOut
          },
          false
        );
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
      mounted = false;
      dispose();
    }
  };
}
function create_default_slot_15(ctx) {
  let t;
  return {
    c() {
      t = text("Proxcryptor");
    },
    l(nodes) {
      t = claim_text(nodes, "Proxcryptor");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_14(ctx) {
  let t0;
  let skew;
  let t1;
  let current;
  skew = new Skew({
    props: {
      $$slots: { default: [create_default_slot_15] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      t0 = text("DAG-JOSE-");
      create_component(skew.$$.fragment);
      t1 = text(" Mini Demo");
    },
    l(nodes) {
      t0 = claim_text(nodes, "DAG-JOSE-");
      claim_component(skew.$$.fragment, nodes);
      t1 = claim_text(nodes, " Mini Demo");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      mount_component(skew, target, anchor);
      insert_hydration(target, t1, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const skew_changes = {};
      if (dirty[1] & 8192) {
        skew_changes.$$scope = { dirty, ctx: ctx2 };
      }
      skew.$set(skew_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(skew.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(skew.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      destroy_component(skew, detaching);
      if (detaching)
        detach(t1);
    }
  };
}
function create_else_block_2(ctx) {
  let div;
  let spinner;
  let current;
  spinner = new Spinner({
    props: {
      $$slots: { default: [create_default_slot_13] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(spinner.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(spinner.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "fixed top-10 right-10 ");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(spinner, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const spinner_changes = {};
      if (dirty[1] & 8192) {
        spinner_changes.$$scope = { dirty, ctx: ctx2 };
      }
      spinner.$set(spinner_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(spinner.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(spinner.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(spinner);
    }
  };
}
function create_if_block_5(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[8];
  function switch_props(ctx2) {
    return {};
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props());
    switch_instance.$on("walletReady", ctx[26]);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (switch_value !== (switch_value = ctx2[8])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          switch_instance.$on("walletReady", ctx2[26]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot_13(ctx) {
  let t;
  return {
    c() {
      t = text("Loading Wallet...");
    },
    l(nodes) {
      t = claim_text(nodes, "Loading Wallet...");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block(ctx) {
  let div0;
  let card0;
  let t0;
  let card1;
  let t1;
  let div1;
  let current_block_type_index;
  let if_block;
  let current;
  card0 = new Card({
    props: {
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  card1 = new Card({
    props: {
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  const if_block_creators = [create_if_block_1, create_else_block_1];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[1] && ctx2[13])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div0 = element("div");
      create_component(card0.$$.fragment);
      t0 = space();
      create_component(card1.$$.fragment);
      t1 = space();
      div1 = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      div0 = claim_element(nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(card0.$$.fragment, div0_nodes);
      t0 = claim_space(div0_nodes);
      claim_component(card1.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      t1 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "flex flex-row mt-4 flex-nowrap justify-start items-stretch space-x-4 align-top ");
      attr(div1, "class", "mt-4");
    },
    m(target, anchor) {
      insert_hydration(target, div0, anchor);
      mount_component(card0, div0, null);
      append_hydration(div0, t0);
      mount_component(card1, div0, null);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, div1, anchor);
      if_blocks[current_block_type_index].m(div1, null);
      current = true;
    },
    p(ctx2, dirty) {
      const card0_changes = {};
      if (dirty[0] & 33280 | dirty[1] & 8192) {
        card0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card0.$set(card0_changes);
      const card1_changes = {};
      if (dirty[0] & 67589 | dirty[1] & 8192) {
        card1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card1.$set(card1_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div1, null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(card0.$$.fragment, local);
      transition_in(card1.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(card0.$$.fragment, local);
      transition_out(card1.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      destroy_component(card0);
      destroy_component(card1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_default_slot_12(ctx) {
  let t;
  return {
    c() {
      t = text("New");
    },
    l(nodes) {
      t = claim_text(nodes, "New");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_11(ctx) {
  let skew;
  let t;
  let current;
  skew = new Skew({
    props: {
      color: "pink",
      $$slots: { default: [create_default_slot_12] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(skew.$$.fragment);
      t = text(" Data");
    },
    l(nodes) {
      claim_component(skew.$$.fragment, nodes);
      t = claim_text(nodes, " Data");
    },
    m(target, anchor) {
      mount_component(skew, target, anchor);
      insert_hydration(target, t, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const skew_changes = {};
      if (dirty[1] & 8192) {
        skew_changes.$$scope = { dirty, ctx: ctx2 };
      }
      skew.$set(skew_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(skew.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(skew.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(skew, detaching);
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_10(ctx) {
  let t;
  return {
    c() {
      t = text("Encrypt & Save to Browser IPFS");
    },
    l(nodes) {
      t = claim_text(nodes, "Encrypt & Save to Browser IPFS");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_9(ctx) {
  let headerz;
  let t0;
  let input0;
  let updating_value;
  let t1;
  let input1;
  let updating_value_1;
  let t2;
  let button;
  let current;
  headerz = new Headerz({
    props: {
      $$slots: { default: [create_default_slot_11] },
      $$scope: { ctx }
    }
  });
  function input0_value_binding(value) {
    ctx[27](value);
  }
  let input0_props = { name: "Tag" };
  if (ctx[15] !== void 0) {
    input0_props.value = ctx[15];
  }
  input0 = new Input({ props: input0_props });
  binding_callbacks.push(() => bind(input0, "value", input0_value_binding));
  function input1_value_binding(value) {
    ctx[28](value);
  }
  let input1_props = { name: "Your Data" };
  if (ctx[9] !== void 0) {
    input1_props.value = ctx[9];
  }
  input1 = new Input({ props: input1_props });
  binding_callbacks.push(() => bind(input1, "value", input1_value_binding));
  button = new Button({
    props: {
      clickHandler: ctx[19],
      disabled: !ctx[15] || !ctx[9],
      type: "Yes",
      $$slots: { default: [create_default_slot_10] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(headerz.$$.fragment);
      t0 = space();
      create_component(input0.$$.fragment);
      t1 = space();
      create_component(input1.$$.fragment);
      t2 = space();
      create_component(button.$$.fragment);
    },
    l(nodes) {
      claim_component(headerz.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(input0.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(input1.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(headerz, target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(input0, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(input1, target, anchor);
      insert_hydration(target, t2, anchor);
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const headerz_changes = {};
      if (dirty[1] & 8192) {
        headerz_changes.$$scope = { dirty, ctx: ctx2 };
      }
      headerz.$set(headerz_changes);
      const input0_changes = {};
      if (!updating_value && dirty[0] & 32768) {
        updating_value = true;
        input0_changes.value = ctx2[15];
        add_flush_callback(() => updating_value = false);
      }
      input0.$set(input0_changes);
      const input1_changes = {};
      if (!updating_value_1 && dirty[0] & 512) {
        updating_value_1 = true;
        input1_changes.value = ctx2[9];
        add_flush_callback(() => updating_value_1 = false);
      }
      input1.$set(input1_changes);
      const button_changes = {};
      if (dirty[0] & 33280)
        button_changes.disabled = !ctx2[15] || !ctx2[9];
      if (dirty[1] & 8192) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(headerz.$$.fragment, local);
      transition_in(input0.$$.fragment, local);
      transition_in(input1.$$.fragment, local);
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(headerz.$$.fragment, local);
      transition_out(input0.$$.fragment, local);
      transition_out(input1.$$.fragment, local);
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(headerz, detaching);
      if (detaching)
        detach(t0);
      destroy_component(input0, detaching);
      if (detaching)
        detach(t1);
      destroy_component(input1, detaching);
      if (detaching)
        detach(t2);
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot_8(ctx) {
  let t;
  return {
    c() {
      t = text("Contacts");
    },
    l(nodes) {
      t = claim_text(nodes, "Contacts");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_7(ctx) {
  let t;
  return {
    c() {
      t = text("Save to Browser");
    },
    l(nodes) {
      t = claim_text(nodes, "Save to Browser");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_6(ctx) {
  let headerz;
  let t0;
  let input0;
  let updating_value;
  let t1;
  let input1;
  let updating_value_1;
  let t2;
  let button;
  let current;
  headerz = new Headerz({
    props: {
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  function input0_value_binding_1(value) {
    ctx[29](value);
  }
  let input0_props = { name: "Handle" };
  if (ctx[16] !== void 0) {
    input0_props.value = ctx[16];
  }
  input0 = new Input({ props: input0_props });
  binding_callbacks.push(() => bind(input0, "value", input0_value_binding_1));
  function input1_value_binding_1(value) {
    ctx[30](value);
  }
  let input1_props = { name: "Their Public Key" };
  if (ctx[11] !== void 0) {
    input1_props.value = ctx[11];
  }
  input1 = new Input({ props: input1_props });
  binding_callbacks.push(() => bind(input1, "value", input1_value_binding_1));
  button = new Button({
    props: {
      clickHandler: ctx[20],
      disabled: !ctx[16] || !ctx[11] || !ctx[0] || !ctx[2],
      type: "Yes",
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(headerz.$$.fragment);
      t0 = space();
      create_component(input0.$$.fragment);
      t1 = space();
      create_component(input1.$$.fragment);
      t2 = space();
      create_component(button.$$.fragment);
    },
    l(nodes) {
      claim_component(headerz.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(input0.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(input1.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(headerz, target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(input0, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(input1, target, anchor);
      insert_hydration(target, t2, anchor);
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const headerz_changes = {};
      if (dirty[1] & 8192) {
        headerz_changes.$$scope = { dirty, ctx: ctx2 };
      }
      headerz.$set(headerz_changes);
      const input0_changes = {};
      if (!updating_value && dirty[0] & 65536) {
        updating_value = true;
        input0_changes.value = ctx2[16];
        add_flush_callback(() => updating_value = false);
      }
      input0.$set(input0_changes);
      const input1_changes = {};
      if (!updating_value_1 && dirty[0] & 2048) {
        updating_value_1 = true;
        input1_changes.value = ctx2[11];
        add_flush_callback(() => updating_value_1 = false);
      }
      input1.$set(input1_changes);
      const button_changes = {};
      if (dirty[0] & 67589)
        button_changes.disabled = !ctx2[16] || !ctx2[11] || !ctx2[0] || !ctx2[2];
      if (dirty[1] & 8192) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(headerz.$$.fragment, local);
      transition_in(input0.$$.fragment, local);
      transition_in(input1.$$.fragment, local);
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(headerz.$$.fragment, local);
      transition_out(input0.$$.fragment, local);
      transition_out(input1.$$.fragment, local);
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(headerz, detaching);
      if (detaching)
        detach(t0);
      destroy_component(input0, detaching);
      if (detaching)
        detach(t1);
      destroy_component(input1, detaching);
      if (detaching)
        detach(t2);
      destroy_component(button, detaching);
    }
  };
}
function create_else_block_1(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text("No Data to Show Yet");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "No Data to Show Yet");
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex flex-grow rounded-3xl border-4 border-dashed p-10 font-extrabold text-xl text-black/30");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_1(ctx) {
  let canvas;
  let updating_data;
  let current;
  function canvas_data_binding(value) {
    ctx[31](value);
  }
  let canvas_props = {
    opts: ctx[18],
    $$slots: {
      default: [
        create_default_slot,
        ({ connectable }) => ({ 39: connectable }),
        ({ connectable }) => [0, connectable ? 256 : 0]
      ]
    },
    $$scope: { ctx }
  };
  if (ctx[12] !== void 0) {
    canvas_props.data = ctx[12];
  }
  canvas = new ctx[13]({ props: canvas_props });
  binding_callbacks.push(() => bind(canvas, "data", canvas_data_binding));
  canvas.$on("connected", ctx[22]);
  return {
    c() {
      create_component(canvas.$$.fragment);
    },
    l(nodes) {
      claim_component(canvas.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(canvas, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const canvas_changes = {};
      if (dirty[0] & 164966 | dirty[1] & 8448) {
        canvas_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_data && dirty[0] & 4096) {
        updating_data = true;
        canvas_changes.data = ctx2[12];
        add_flush_callback(() => updating_data = false);
      }
      canvas.$set(canvas_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(canvas.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(canvas.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(canvas, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("Your Data Details");
    },
    l(nodes) {
      t = claim_text(nodes, "Your Data Details");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block_2(ctx) {
  let previous_key = ctx[17];
  let key_block_anchor;
  let current;
  let key_block = create_key_block(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    l(nodes) {
      key_block.l(nodes);
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert_hydration(target, key_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 131072 && safe_not_equal(previous_key, previous_key = ctx2[17])) {
        group_outros();
        transition_out(key_block, 1, 1, noop);
        check_outros();
        key_block = create_key_block(ctx2);
        key_block.c();
        transition_in(key_block, 1);
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(key_block);
      current = true;
    },
    o(local) {
      transition_out(key_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(key_block_anchor);
      key_block.d(detaching);
    }
  };
}
function create_catch_block(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_then_block(ctx) {
  let div;
  let headerz;
  let t0;
  let listtagnodes;
  let t1;
  let if_block_anchor;
  let current;
  headerz = new Headerz({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  listtagnodes = new ListTagNodes({
    props: {
      getTagNodes,
      ipfsNode: ctx[2],
      rootCID: ctx[1],
      decrypt: ctx[6].selfDecrypt,
      $$slots: {
        endpoint: [
          create_endpoint_slot,
          ({ tag: tag2 }) => ({ 15: tag2 }),
          ({ tag: tag2 }) => [tag2 ? 32768 : 0]
        ]
      },
      $$scope: { ctx }
    }
  });
  let if_block = ctx[10] && create_if_block_3(ctx);
  return {
    c() {
      div = element("div");
      create_component(headerz.$$.fragment);
      t0 = space();
      create_component(listtagnodes.$$.fragment);
      t1 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(headerz.$$.fragment, div_nodes);
      t0 = claim_space(div_nodes);
      claim_component(listtagnodes.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(div, "class", "flex-initial flex flex-col bg-slate-200/20 shadow-lg m-1 p-4 rounded-xl w-2/5");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(headerz, div, null);
      append_hydration(div, t0);
      mount_component(listtagnodes, div, null);
      insert_hydration(target, t1, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const headerz_changes = {};
      if (dirty[1] & 8192) {
        headerz_changes.$$scope = { dirty, ctx: ctx2 };
      }
      headerz.$set(headerz_changes);
      const listtagnodes_changes = {};
      if (dirty[0] & 4)
        listtagnodes_changes.ipfsNode = ctx2[2];
      if (dirty[0] & 2)
        listtagnodes_changes.rootCID = ctx2[1];
      if (dirty[0] & 64)
        listtagnodes_changes.decrypt = ctx2[6].selfDecrypt;
      if (dirty[0] & 32768 | dirty[1] & 8448) {
        listtagnodes_changes.$$scope = { dirty, ctx: ctx2 };
      }
      listtagnodes.$set(listtagnodes_changes);
      if (ctx2[10]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 1024) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(headerz.$$.fragment, local);
      transition_in(listtagnodes.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(headerz.$$.fragment, local);
      transition_out(listtagnodes.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(headerz);
      destroy_component(listtagnodes);
      if (detaching)
        detach(t1);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("Data");
    },
    l(nodes) {
      t = claim_text(nodes, "Data");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_endpoint_slot(ctx) {
  let endpoint;
  let current;
  endpoint = new ctx[14]({
    props: {
      slot: "endpoint",
      position: "right",
      connectable: ctx[39],
      options: {
        dataset: { tag: ctx[15] },
        startOnly: true
      }
    }
  });
  return {
    c() {
      create_component(endpoint.$$.fragment);
    },
    l(nodes) {
      claim_component(endpoint.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(endpoint, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const endpoint_changes = {};
      if (dirty[1] & 256)
        endpoint_changes.connectable = ctx2[39];
      if (dirty[0] & 32768)
        endpoint_changes.options = {
          dataset: { tag: ctx2[15] },
          startOnly: true
        };
      endpoint.$set(endpoint_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(endpoint.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(endpoint.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(endpoint, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let previous_key = ctx[10];
  let key_block_anchor;
  let current;
  let key_block = create_key_block_1(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    l(nodes) {
      key_block.l(nodes);
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert_hydration(target, key_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 1024 && safe_not_equal(previous_key, previous_key = ctx2[10])) {
        group_outros();
        transition_out(key_block, 1, 1, noop);
        check_outros();
        key_block = create_key_block_1(ctx2);
        key_block.c();
        transition_in(key_block, 1);
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(key_block);
      current = true;
    },
    o(local) {
      transition_out(key_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(key_block_anchor);
      key_block.d(detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("Contacts");
    },
    l(nodes) {
      t = claim_text(nodes, "Contacts");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "h-4 w-4 bg-white rounded-full border-4 border-black hover:ring hover:ring-green-800");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_else_block(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text("No rootCID");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "No rootCID");
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "text-xs");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_4(ctx) {
  let div;
  let listtagnodes;
  let t;
  let current;
  listtagnodes = new ListTagNodes({
    props: {
      getTagNodes,
      ipfsNode: ctx[2],
      rootCID: ctx[41],
      decrypt: ctx[40].toLocaleUpperCase() == ctx[5].publicKey.toLocaleUpperCase() ? ctx[6].selfDecrypt : ctx[6].decryptFromTagNode,
      sender: ctx[40].toLocaleUpperCase() == ctx[5].publicKey.toLocaleUpperCase() ? void 0 : bytesFromHexString(ctx[40]),
      viewAccess: ctx[40].toLocaleUpperCase() == ctx[5].publicKey.toLocaleUpperCase() ? void 0 : ctx[21]
    }
  });
  return {
    c() {
      div = element("div");
      create_component(listtagnodes.$$.fragment);
      t = space();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(listtagnodes.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "p-2");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(listtagnodes, div, null);
      append_hydration(div, t);
      current = true;
    },
    p(ctx2, dirty) {
      const listtagnodes_changes = {};
      if (dirty[0] & 4)
        listtagnodes_changes.ipfsNode = ctx2[2];
      if (dirty[0] & 1024)
        listtagnodes_changes.rootCID = ctx2[41];
      if (dirty[0] & 1120)
        listtagnodes_changes.decrypt = ctx2[40].toLocaleUpperCase() == ctx2[5].publicKey.toLocaleUpperCase() ? ctx2[6].selfDecrypt : ctx2[6].decryptFromTagNode;
      if (dirty[0] & 1056)
        listtagnodes_changes.sender = ctx2[40].toLocaleUpperCase() == ctx2[5].publicKey.toLocaleUpperCase() ? void 0 : bytesFromHexString(ctx2[40]);
      if (dirty[0] & 1056)
        listtagnodes_changes.viewAccess = ctx2[40].toLocaleUpperCase() == ctx2[5].publicKey.toLocaleUpperCase() ? void 0 : ctx2[21];
      listtagnodes.$set(listtagnodes_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(listtagnodes.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listtagnodes.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(listtagnodes);
    }
  };
}
function create_each_block(ctx) {
  let div2;
  let div0;
  let t0_value = ctx[16] + "";
  let t0;
  let t1;
  let div1;
  let t2_value = hexToB64(ctx[40]) + "";
  let t2;
  let t3;
  let endpoint;
  let t4;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  endpoint = new ctx[14]({
    props: {
      slot: "endpoint",
      position: "left",
      connectable: ctx[39],
      options: {
        dataset: { pubkey: ctx[40] },
        startOnly: true
      },
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  const if_block_creators = [create_if_block_4, create_else_block];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    if (ctx2[41])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_2(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      t2 = text(t2_value);
      t3 = space();
      create_component(endpoint.$$.fragment);
      t4 = space();
      if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      div0_nodes.forEach(detach);
      t1 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      t2 = claim_text(div1_nodes, t2_value);
      div1_nodes.forEach(detach);
      t3 = claim_space(div2_nodes);
      claim_component(endpoint.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach);
      t4 = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(div0, "class", "p-2");
      attr(div1, "class", "p-2");
      attr(div2, "class", "flex flew-row items-center bg-green-100 rounded-lg text-xs h-fit border-2");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div0);
      append_hydration(div0, t0);
      append_hydration(div2, t1);
      append_hydration(div2, div1);
      append_hydration(div1, t2);
      append_hydration(div2, t3);
      mount_component(endpoint, div2, null);
      insert_hydration(target, t4, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty[0] & 1024) && t0_value !== (t0_value = ctx2[16] + ""))
        set_data(t0, t0_value);
      if ((!current || dirty[0] & 1024) && t2_value !== (t2_value = hexToB64(ctx2[40]) + ""))
        set_data(t2, t2_value);
      const endpoint_changes = {};
      if (dirty[1] & 256)
        endpoint_changes.connectable = ctx2[39];
      if (dirty[0] & 1024)
        endpoint_changes.options = {
          dataset: { pubkey: ctx2[40] },
          startOnly: true
        };
      if (dirty[1] & 8192) {
        endpoint_changes.$$scope = { dirty, ctx: ctx2 };
      }
      endpoint.$set(endpoint_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(endpoint.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(endpoint.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      destroy_component(endpoint);
      if (detaching)
        detach(t4);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_key_block_1(ctx) {
  let div;
  let headerz;
  let t;
  let current;
  headerz = new Headerz({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  let each_value = Object.entries(ctx[10]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      create_component(headerz.$$.fragment);
      t = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(headerz.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex-initial flex flex-col bg-slate-200/20 shadow-lg m-1 p-4 rounded-xl w-2/5");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(headerz, div, null);
      append_hydration(div, t);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const headerz_changes = {};
      if (dirty[1] & 8192) {
        headerz_changes.$$scope = { dirty, ctx: ctx2 };
      }
      headerz.$set(headerz_changes);
      if (dirty[0] & 2098276 | dirty[1] & 256) {
        each_value = Object.entries(ctx2[10]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(headerz.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(headerz.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(headerz);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_pending_block(ctx) {
  let t;
  return {
    c() {
      t = text("Getting Tag NodeList...");
    },
    l(nodes) {
      t = claim_text(nodes, "Getting Tag NodeList...");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_key_block(ctx) {
  let await_block_anchor;
  let promise;
  let current;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block,
    value: 17,
    blocks: [, , ,]
  };
  handle_promise(promise = ctx[17], info);
  return {
    c() {
      await_block_anchor = empty();
      info.block.c();
    },
    l(nodes) {
      await_block_anchor = empty();
      info.block.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      if (dirty[0] & 131072 && promise !== (promise = ctx[17]) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(info.block);
      current = true;
    },
    o(local) {
      for (let i = 0; i < 3; i += 1) {
        const block = info.blocks[i];
        transition_out(block);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(await_block_anchor);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_default_slot_1(ctx) {
  let headerz;
  let t0;
  let div0;
  let t1;
  let span;
  let t2;
  let t3;
  let div1;
  let current;
  headerz = new Headerz({
    props: {
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  let if_block = ctx[17] && create_if_block_2(ctx);
  return {
    c() {
      create_component(headerz.$$.fragment);
      t0 = space();
      div0 = element("div");
      t1 = text("MyRootCID: ");
      span = element("span");
      t2 = text(ctx[1]);
      t3 = space();
      div1 = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      claim_component(headerz.$$.fragment, nodes);
      t0 = claim_space(nodes);
      div0 = claim_element(nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t1 = claim_text(div0_nodes, "MyRootCID: ");
      span = claim_element(div0_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t2 = claim_text(span_nodes, ctx[1]);
      span_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t3 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      if (if_block)
        if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "bg-green-100 rounded-xl p-2 my-2 mono text-sm");
      attr(div0, "class", "my-2");
      attr(div1, "class", "flex flex-row justify-between w-full");
    },
    m(target, anchor) {
      mount_component(headerz, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div0, anchor);
      append_hydration(div0, t1);
      append_hydration(div0, span);
      append_hydration(span, t2);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, div1, anchor);
      if (if_block)
        if_block.m(div1, null);
      current = true;
    },
    p(ctx2, dirty) {
      const headerz_changes = {};
      if (dirty[1] & 8192) {
        headerz_changes.$$scope = { dirty, ctx: ctx2 };
      }
      headerz.$set(headerz_changes);
      if (!current || dirty[0] & 2)
        set_data(t2, ctx2[1]);
      if (ctx2[17]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 131072) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(headerz.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(headerz.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      destroy_component(headerz, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div1);
      if (if_block)
        if_block.d();
    }
  };
}
function create_default_slot(ctx) {
  let card;
  let current;
  card = new Card({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(card.$$.fragment);
    },
    l(nodes) {
      claim_component(card.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(card, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const card_changes = {};
      if (dirty[0] & 164966 | dirty[1] & 8448) {
        card_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card.$set(card_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(card.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(card.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(card, detaching);
    }
  };
}
function create_fragment(ctx) {
  let t0;
  let t1;
  let main2;
  let headerz;
  let t2;
  let current_block_type_index;
  let if_block2;
  let t3;
  let div;
  let t4;
  let t5;
  let current;
  let if_block0 = !ctx[2] && create_if_block_9();
  let if_block1 = ctx[4] && create_if_block_6(ctx);
  headerz = new Headerz({
    props: {
      $$slots: { default: [create_default_slot_14] },
      $$scope: { ctx }
    }
  });
  const if_block_creators = [create_if_block_5, create_else_block_2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[8])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block3 = ctx[7] && create_if_block(ctx);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      main2 = element("main");
      create_component(headerz.$$.fragment);
      t2 = space();
      if_block2.c();
      t3 = space();
      div = element("div");
      t4 = text("Once IPFS & the wallet are loaded, then you can use the proxcryptor");
      t5 = space();
      if (if_block3)
        if_block3.c();
      this.h();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t1 = claim_space(nodes);
      main2 = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main2);
      claim_component(headerz.$$.fragment, main_nodes);
      t2 = claim_space(main_nodes);
      if_block2.l(main_nodes);
      t3 = claim_space(main_nodes);
      div = claim_element(main_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t4 = claim_text(div_nodes, "Once IPFS & the wallet are loaded, then you can use the proxcryptor");
      div_nodes.forEach(detach);
      t5 = claim_space(main_nodes);
      if (if_block3)
        if_block3.l(main_nodes);
      main_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "text-lg font-semibold text-left ");
      attr(main2, "class", "m-4 flex flex-col h-screen");
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, main2, anchor);
      mount_component(headerz, main2, null);
      append_hydration(main2, t2);
      if_blocks[current_block_type_index].m(main2, null);
      append_hydration(main2, t3);
      append_hydration(main2, div);
      append_hydration(div, t4);
      append_hydration(main2, t5);
      if (if_block3)
        if_block3.m(main2, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (!ctx2[2]) {
        if (if_block0) {
          if (dirty[0] & 4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_9();
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[4]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 16) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_6(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(t1.parentNode, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      const headerz_changes = {};
      if (dirty[1] & 8192) {
        headerz_changes.$$scope = { dirty, ctx: ctx2 };
      }
      headerz.$set(headerz_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block2 = if_blocks[current_block_type_index];
        if (!if_block2) {
          if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block2.c();
        } else {
          if_block2.p(ctx2, dirty);
        }
        transition_in(if_block2, 1);
        if_block2.m(main2, t3);
      }
      if (ctx2[7]) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
          if (dirty[0] & 128) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block(ctx2);
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(main2, null);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(headerz.$$.fragment, local);
      transition_in(if_block2);
      transition_in(if_block3);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(headerz.$$.fragment, local);
      transition_out(if_block2);
      transition_out(if_block3);
      current = false;
    },
    d(detaching) {
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t0);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(main2);
      destroy_component(headerz);
      if_blocks[current_block_type_index].d();
      if (if_block3)
        if_block3.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let HypnsComponent;
  let hypnsNode;
  let myHypnsInstance;
  let setJoseCryptor;
  let joseCryptor;
  let myRootCID;
  let loaded;
  let ipfsNode;
  async function loadIPFS() {
    if (globalThis.ipfsNode && !ipfsNode) {
      $$invalidate(2, ipfsNode = globalThis.ipfsNode);
      return;
    }
    const mod = await __vitePreload(() => import("./ipfs-core-721ec08e.js"), true ? [] : void 0);
    const IPFSModule = mod.default;
    $$invalidate(2, ipfsNode = await IPFSModule.create());
    globalThis.ipfsNode = ipfsNode;
  }
  let wallet = null;
  let Web3WalletMenu;
  let tag2 = "Color";
  let myData = "Blue";
  let contacts = void 0;
  let handle = "DougAnderson444";
  let myContact = "GnHDprayyzahnWjDqvQ9AGWsmjojWymVNztGHNr4S7an";
  let myTagNodes;
  let data = { nodes: [], links: [] };
  let Canvas;
  let EndPoint;
  let opts = {
    links: { strokeWidth: 1, textStartOffset: 20 }
  };
  onMount(async () => {
    $$invalidate(4, HypnsComponent = (await __vitePreload(() => import("./index-5149353b.js"), true ? ["_app/immutable/chunks/index-5149353b.js","_app/immutable/chunks/preload-helper-fe81da0e.js","_app/immutable/chunks/index-ef46e954.js"] : void 0)).default);
    await loadIPFS();
    $$invalidate(8, { Web3WalletMenu } = await __vitePreload(() => import("./index-d83d174c.js"), true ? ["_app/immutable/chunks/index-d83d174c.js","_app/immutable/assets/index-ef28ff1a.css","_app/immutable/chunks/index-ef46e954.js","_app/immutable/chunks/preload-helper-fe81da0e.js"] : void 0), Web3WalletMenu);
    $$invalidate(13, { Canvas, EndPoint } = await __vitePreload(() => import("./index-f780e9b1.js"), true ? ["_app/immutable/chunks/index-f780e9b1.js","_app/immutable/assets/index-8f4e920d.css","_app/immutable/chunks/index-ef46e954.js"] : void 0), Canvas, $$invalidate(14, EndPoint));
    $$invalidate(23, setJoseCryptor = async () => {
      if (!(wallet == null ? void 0 : wallet.proxcryptor))
        return;
      $$invalidate(6, joseCryptor = new DagJoseCryptor(ipfsNode, wallet.proxcryptor, myRootCID));
      joseCryptor.emitter.on("rootCIDUpdate", (val) => {
        console.log("rootCIDUpdate", { val });
        $$invalidate(1, myRootCID = val);
      });
      const pk = await wallet.proxcryptor.getPublicKey();
      if (!Array.isArray(pk))
        return;
      $$invalidate(7, loaded = true);
    });
  });
  async function putValue(event) {
    console.log("putting: ", { [tag2]: myData });
    if (!loaded || !tag2 || !myData)
      return;
    await joseCryptor.put({ data: myData }, tag2);
  }
  async function putContact(_) {
    const maybeValid = validatePubKey(myContact);
    if (!maybeValid || !hypnsNode)
      return;
    updateContacts(maybeValid);
    try {
      await getInstance(bufftoHex(maybeValid));
    } catch (error) {
      console.error(error);
    }
    if (!loaded || !tag2 || !myData)
      return;
    await joseCryptor.put({ data: contacts }, "Contacts");
  }
  function updateContacts(pubkey, rootCID = null) {
    const existing = contacts == null ? void 0 : contacts[bufftoHex(pubkey)];
    if (existing) {
      existing.rootCID = rootCID;
      $$invalidate(10, contacts);
      console.log({ contacts });
      return;
    }
    $$invalidate(10, contacts = {
      ...contacts,
      [bufftoHex(pubkey)]: { handle, rootCID }
    });
  }
  async function handleRootCIDUpdate() {
    if (!myRootCID)
      return;
    const tn = await getTagNodes({ ipfsNode, rootCID: myRootCID });
    if (!tn)
      return;
    $$invalidate(17, myTagNodes = tn);
    if (!contacts && myTagNodes.hasOwnProperty("Contacts")) {
      console.log("Pulling contacts from crypt");
      const res = await joseCryptor.selfDecrypt(myTagNodes.Contacts);
      console.log({ res });
      if (!res)
        return;
      $$invalidate(10, contacts = res.data);
      for (const [pubkey, { handle: handle2, rootCID }] of Object.entries(contacts)) {
        const instance2 = await getInstance(pubkey);
        console.log(`Contact setup. `, { instance: instance2 });
      }
    }
  }
  async function initHypnsNode() {
    const instance2 = await hypnsNode.open({ wallet });
    await instance2.ready();
    $$invalidate(5, myHypnsInstance = instance2);
    myHypnsInstance.on("update", (latest) => {
      console.log("SELF rootCIDUpdate", { latest });
      if (latest == null ? void 0 : latest.rootCID) {
        if (joseCryptor.rootCID != latest.rootCID) {
          $$invalidate(6, joseCryptor.rootCID = latest.rootCID, joseCryptor);
        }
        $$invalidate(1, myRootCID = latest.rootCID);
        pinCID(latest.rootCID);
        $$invalidate(5, myHypnsInstance);
      }
    });
  }
  async function getInstance(pk) {
    const maybeValid = validatePubKey(pk);
    if (!maybeValid)
      return null;
    const publicKey = bufftoHex(maybeValid);
    try {
      console.log("Setting up PiperNet for", publicKey);
      const inst = await hypnsNode.open({ keypair: { publicKey } });
      inst.on("update", (latest) => {
        if (latest == null ? void 0 : latest.rootCID) {
          console.log(`PiperNet update for ${publicKey} => ${latest.rootCID}`);
          updateContacts(maybeValid, latest.rootCID);
          pinCID(latest.rootCID);
        }
      });
      await inst.ready();
      return inst;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  async function pinCID(cid) {
    console.log("Pinning...", cid.toString());
    let pinned = await ipfsNode.pin.add(cid, { recursive: true });
    console.log({ pinned: pinned.toString() });
    for await (const ref of ipfsNode.refs(cid, { recursive: true })) {
      if (ref.err)
        ;
    }
  }
  async function viewAccess({ tagNode, sender }) {
    if (!wallet)
      return false;
    const pk = await wallet.proxcryptor.getPublicKey();
    if (!Array.isArray(pk))
      return false;
    return await joseCryptor.checkAccess(tagNode, pk, sender);
  }
  async function handleConnected(e) {
    var _a, _b, _c, _d, _e, _f;
    console.log("Connected", e.detail);
    ((_a = e.detail.source) == null ? void 0 : _a.dataset) + " to " + ((_b = e.detail.target) == null ? void 0 : _b.dataset);
    const maybeValid = validatePubKey((_d = (_c = e.detail.target) == null ? void 0 : _c.dataset) == null ? void 0 : _d.pubkey);
    if (!maybeValid)
      return;
    if (!((_f = (_e = e.detail.source) == null ? void 0 : _e.dataset) == null ? void 0 : _f.tag))
      return;
    const pubkey = maybeValid;
    await joseCryptor.grantAccess(e.detail.source.dataset.tag, pubkey);
  }
  function hypnscomponent_hypnsNode_binding(value) {
    hypnsNode = value;
    $$invalidate(0, hypnsNode);
  }
  const click_handler = (_) => myHypnsInstance.publish({ rootCID: myRootCID });
  const walletReady_handler = (e) => {
    $$invalidate(3, wallet = e.detail.wallet);
  };
  function input0_value_binding(value) {
    tag2 = value;
    $$invalidate(15, tag2);
  }
  function input1_value_binding(value) {
    myData = value;
    $$invalidate(9, myData);
  }
  function input0_value_binding_1(value) {
    handle = value;
    $$invalidate(16, handle);
  }
  function input1_value_binding_1(value) {
    myContact = value;
    $$invalidate(11, myContact);
  }
  function canvas_data_binding(value) {
    data = value;
    $$invalidate(12, data);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 8388620) {
      if (ipfsNode && setJoseCryptor && wallet && (wallet == null ? void 0 : wallet.proxcryptor))
        setJoseCryptor();
    }
    if ($$self.$$.dirty[0] & 9) {
      !!hypnsNode && wallet && initHypnsNode();
    }
    if ($$self.$$.dirty[0] & 2) {
      myRootCID && handleRootCIDUpdate();
    }
  };
  return [
    hypnsNode,
    myRootCID,
    ipfsNode,
    wallet,
    HypnsComponent,
    myHypnsInstance,
    joseCryptor,
    loaded,
    Web3WalletMenu,
    myData,
    contacts,
    myContact,
    data,
    Canvas,
    EndPoint,
    tag2,
    handle,
    myTagNodes,
    opts,
    putValue,
    putContact,
    viewAccess,
    handleConnected,
    setJoseCryptor,
    hypnscomponent_hypnsNode_binding,
    click_handler,
    walletReady_handler,
    input0_value_binding,
    input1_value_binding,
    input0_value_binding_1,
    input1_value_binding_1,
    canvas_data_binding
  ];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);
  }
}
export {
  Routes as R,
  commonjsRequire as a,
  commonjsGlobal as c,
  fade as f,
  getDefaultExportFromCjs as g
};
//# sourceMappingURL=index-396531f4.js.map
