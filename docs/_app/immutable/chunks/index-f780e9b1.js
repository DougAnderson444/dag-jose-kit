import { S as SvelteComponent, i as init, s as safe_not_equal, F as create_slot, l as element, m as claim_element, n as children, h as detach, p as attr, q as set_style, a1 as add_render_callback, b as insert_hydration, aa as add_resize_listener, G as update_slot_base, H as get_all_dirty_from_scope, I as get_slot_changes, f as transition_in, t as transition_out, _ as binding_callbacks, E as noop$1, e as empty, o as onMount, N as svg_element, O as claim_svg_element, Z as destroy_each, r as text, a as space, u as claim_text, c as claim_space, a4 as xlink_attr, J as append_hydration, v as set_data, M as listen, g as group_outros, d as check_outros, a7 as run_all, C as assign, w as create_component, x as claim_component, y as mount_component, z as get_spread_update, A as get_spread_object, B as destroy_component, R as createEventDispatcher, ab as globals, $ as bind, a0 as add_flush_callback, a6 as action_destroyer, Q as is_function } from "./index-ef46e954.js";
class Pointer {
  constructor(nativePointer) {
    this.id = -1;
    this.nativePointer = nativePointer;
    this.pageX = nativePointer.pageX;
    this.pageY = nativePointer.pageY;
    this.clientX = nativePointer.clientX;
    this.clientY = nativePointer.clientY;
    if (self.Touch && nativePointer instanceof Touch) {
      this.id = nativePointer.identifier;
    } else if (isPointerEvent(nativePointer)) {
      this.id = nativePointer.pointerId;
    }
  }
  getCoalesced() {
    if ("getCoalescedEvents" in this.nativePointer) {
      const events = this.nativePointer.getCoalescedEvents().map((p) => new Pointer(p));
      if (events.length > 0)
        return events;
    }
    return [this];
  }
}
const isPointerEvent = (event) => "pointerId" in event;
const isTouchEvent = (event) => "changedTouches" in event;
const noop = () => {
};
class PointerTracker {
  constructor(_element, { start = () => true, move = noop, end = noop, rawUpdates = false, avoidPointerEvents = false, eventListenerOptions = { capture: false, passive: false, once: false } } = {}) {
    this._element = _element;
    this.startPointers = [];
    this.currentPointers = [];
    this._excludeFromButtonsCheck = /* @__PURE__ */ new Set();
    this._pointerStart = (event) => {
      if (isPointerEvent(event) && event.buttons === 0) {
        this._excludeFromButtonsCheck.add(event.pointerId);
      } else if (!(event.buttons & 1)) {
        return;
      }
      const pointer = new Pointer(event);
      if (this.currentPointers.some((p) => p.id === pointer.id))
        return;
      if (!this._triggerPointerStart(pointer, event))
        return;
      if (isPointerEvent(event)) {
        const capturingElement = event.target && "setPointerCapture" in event.target ? event.target : this._element;
        capturingElement.setPointerCapture(event.pointerId);
        this._element.addEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move, this._eventListenerOptions);
        this._element.addEventListener("pointerup", this._pointerEnd, this._eventListenerOptions);
        this._element.addEventListener("pointercancel", this._pointerEnd, this._eventListenerOptions);
      } else {
        window.addEventListener("mousemove", this._move);
        window.addEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchStart = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerStart(new Pointer(touch), event);
      }
    };
    this._move = (event) => {
      if (!isTouchEvent(event) && (!isPointerEvent(event) || !this._excludeFromButtonsCheck.has(event.pointerId)) && event.buttons === 0) {
        this._pointerEnd(event);
        return;
      }
      const previousPointers = this.currentPointers.slice();
      const changedPointers = isTouchEvent(event) ? Array.from(event.changedTouches).map((t) => new Pointer(t)) : [new Pointer(event)];
      const trackedChangedPointers = [];
      for (const pointer of changedPointers) {
        const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
        if (index === -1)
          continue;
        trackedChangedPointers.push(pointer);
        this.currentPointers[index] = pointer;
      }
      if (trackedChangedPointers.length === 0)
        return;
      this._moveCallback(previousPointers, trackedChangedPointers, event);
    };
    this._triggerPointerEnd = (pointer, event) => {
      if (!isTouchEvent(event) && event.buttons & 1) {
        return false;
      }
      const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
      if (index === -1)
        return false;
      this.currentPointers.splice(index, 1);
      this.startPointers.splice(index, 1);
      this._excludeFromButtonsCheck.delete(pointer.id);
      const cancelled = !(event.type === "mouseup" || event.type === "touchend" || event.type === "pointerup");
      this._endCallback(pointer, event, cancelled);
      return true;
    };
    this._pointerEnd = (event) => {
      if (!this._triggerPointerEnd(new Pointer(event), event))
        return;
      if (isPointerEvent(event)) {
        if (this.currentPointers.length)
          return;
        this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
        this._element.removeEventListener("pointerup", this._pointerEnd);
        this._element.removeEventListener("pointercancel", this._pointerEnd);
      } else {
        window.removeEventListener("mousemove", this._move);
        window.removeEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchEnd = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerEnd(new Pointer(touch), event);
      }
    };
    this._startCallback = start;
    this._moveCallback = move;
    this._endCallback = end;
    this._rawUpdates = rawUpdates && "onpointerrawupdate" in window;
    this._eventListenerOptions = eventListenerOptions;
    if (self.PointerEvent && !avoidPointerEvents) {
      this._element.addEventListener("pointerdown", this._pointerStart, this._eventListenerOptions);
    } else {
      this._element.addEventListener("mousedown", this._pointerStart, this._eventListenerOptions);
      this._element.addEventListener("touchstart", this._touchStart, this._eventListenerOptions);
      this._element.addEventListener("touchmove", this._move, this._eventListenerOptions);
      this._element.addEventListener("touchend", this._touchEnd, this._eventListenerOptions);
      this._element.addEventListener("touchcancel", this._touchEnd, this._eventListenerOptions);
    }
  }
  stop() {
    this._element.removeEventListener("pointerdown", this._pointerStart);
    this._element.removeEventListener("mousedown", this._pointerStart);
    this._element.removeEventListener("touchstart", this._touchStart);
    this._element.removeEventListener("touchmove", this._move);
    this._element.removeEventListener("touchend", this._touchEnd);
    this._element.removeEventListener("touchcancel", this._touchEnd);
    this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
    this._element.removeEventListener("pointerup", this._pointerEnd);
    this._element.removeEventListener("pointercancel", this._pointerEnd);
    window.removeEventListener("mousemove", this._move);
    window.removeEventListener("mouseup", this._pointerEnd);
  }
  _triggerPointerStart(pointer, event) {
    if (!this._startCallback(pointer, event))
      return false;
    this.currentPointers.push(pointer);
    this.startPointers.push(pointer);
    return true;
  }
}
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
function fallback_block$3(ctx) {
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
      attr(div, "class", "h-16 w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[2em] border-pink-500/50");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let div_resize_listener;
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], null);
  const default_slot_or_fallback = default_slot || fallback_block$3();
  return {
    c() {
      div = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { id: true, class: true, style: true });
      var div_nodes = children(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", ctx[1]);
      attr(div, "class", "absolute");
      set_style(div, "left", ctx[5] + "px");
      set_style(div, "top", ctx[4] + "px");
      add_render_callback(() => ctx[11].call(div));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      ctx[10](div);
      div_resize_listener = add_resize_listener(div, ctx[11].bind(div));
      current = true;
    },
    p(ctx2, [dirty]) {
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
      if (!current || dirty & 2) {
        attr(div, "id", ctx2[1]);
      }
      if (!current || dirty & 32) {
        set_style(div, "left", ctx2[5] + "px");
      }
      if (!current || dirty & 16) {
        set_style(div, "top", ctx2[4] + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[10](null);
      div_resize_listener();
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let x2;
  let y2;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { marker } = $$props;
  let { id } = $$props;
  let { left } = $$props;
  let { top } = $$props;
  let offsetWidth;
  let offsetHeight;
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      marker = $$value;
      $$invalidate(0, marker);
    });
  }
  function div_elementresize_handler() {
    offsetWidth = this.offsetWidth;
    offsetHeight = this.offsetHeight;
    $$invalidate(2, offsetWidth);
    $$invalidate(3, offsetHeight);
  }
  $$self.$$set = ($$props2) => {
    if ("marker" in $$props2)
      $$invalidate(0, marker = $$props2.marker);
    if ("id" in $$props2)
      $$invalidate(1, id = $$props2.id);
    if ("left" in $$props2)
      $$invalidate(6, left = $$props2.left);
    if ("top" in $$props2)
      $$invalidate(7, top = $$props2.top);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 68) {
      $$invalidate(5, x2 = left - offsetWidth / 2);
    }
    if ($$self.$$.dirty & 136) {
      $$invalidate(4, y2 = top - offsetHeight / 2);
    }
  };
  return [
    marker,
    id,
    offsetWidth,
    offsetHeight,
    y2,
    x2,
    left,
    top,
    $$scope,
    slots,
    div_binding,
    div_elementresize_handler
  ];
}
class CursorMarker extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { marker: 0, id: 1, left: 6, top: 7 });
  }
}
const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function Path() {
  this._x0 = this._y0 = this._x1 = this._y1 = null;
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x2, y2) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x2, y2) {
    this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  quadraticCurveTo: function(x1, y1, x2, y2) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r)
      return;
    if (da < 0)
      da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x2 + r * Math.cos(a1)) + "," + (this._y1 = y2 + r * Math.sin(a1));
    }
  },
  rect: function(x2, y2, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function() {
    return this._;
  }
};
function constant(x2) {
  return function constant2() {
    return x2;
  };
}
var slice = Array.prototype.slice;
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}
class Bump {
  constructor(context, x2) {
    this._context = context;
    this._x = x2;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line)
          this._context.lineTo(x2, y2);
        else
          this._context.moveTo(x2, y2);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        if (this._x)
          this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
        else
          this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
        break;
      }
    }
    this._x0 = x2, this._y0 = y2;
  }
}
function bumpX(context) {
  return new Bump(context, true);
}
function linkSource(d) {
  return d.source;
}
function linkTarget(d) {
  return d.target;
}
function link(curve) {
  let source = linkSource;
  let target = linkTarget;
  let x$1 = x;
  let y$1 = y;
  let context = null;
  let output = null;
  function link2() {
    let buffer;
    const argv = slice.call(arguments);
    const s = source.apply(this, argv);
    const t = target.apply(this, argv);
    if (context == null)
      output = curve(buffer = path());
    output.lineStart();
    argv[0] = s, output.point(+x$1.apply(this, argv), +y$1.apply(this, argv));
    argv[0] = t, output.point(+x$1.apply(this, argv), +y$1.apply(this, argv));
    output.lineEnd();
    if (buffer)
      return output = null, buffer + "" || null;
  }
  link2.source = function(_) {
    return arguments.length ? (source = _, link2) : source;
  };
  link2.target = function(_) {
    return arguments.length ? (target = _, link2) : target;
  };
  link2.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), link2) : x$1;
  };
  link2.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), link2) : y$1;
  };
  link2.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link2) : context;
  };
  return link2;
}
const Links_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[17] = list[i];
  child_ctx[19] = i;
  return child_ctx;
}
function create_if_block$2(ctx) {
  let svg;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      svg = svg_element("svg");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { style: true, class: true });
      var svg_nodes = children(svg);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(svg_nodes);
      }
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(svg, "pointer-events", "none");
      attr(svg, "class", "svelte-1t43067");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(svg, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 2047) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(svg, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(svg);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  var _a, _b, _c, _d, _e, _f;
  let g;
  let path2;
  let path_d_value;
  let path_id_value;
  let text_1;
  let textPath0;
  let tspan;
  let t0_value = (((_c = (_b = (_a = ctx[17]) == null ? void 0 : _a.opts) == null ? void 0 : _b.label) == null ? void 0 : _c.enabled) ? (_f = (_e = (_d = ctx[17]) == null ? void 0 : _d.opts) == null ? void 0 : _e.label) == null ? void 0 : _f.value : "") + "";
  let t0;
  let t1;
  let textPath0_xlink_href_value;
  let textPath0_startOffset_value;
  let textPath1;
  let t2;
  let textPath1_xlink_href_value;
  let textPath1_opacity_value;
  return {
    c() {
      g = svg_element("g");
      path2 = svg_element("path");
      text_1 = svg_element("text");
      textPath0 = svg_element("textPath");
      tspan = svg_element("tspan");
      t0 = text(t0_value);
      t1 = space();
      textPath1 = svg_element("textPath");
      t2 = text("\u27A4");
      this.h();
    },
    l(nodes) {
      g = claim_svg_element(nodes, "g", { stroke: true, "stroke-opacity": true });
      var g_nodes = children(g);
      path2 = claim_svg_element(g_nodes, "path", {
        d: true,
        id: true,
        "stroke-width": true,
        stroke: true,
        fill: true,
        "stroke-linecap": true,
        "stroke-opacity": true
      });
      children(path2).forEach(detach);
      text_1 = claim_svg_element(g_nodes, "text", { class: true });
      var text_1_nodes = children(text_1);
      textPath0 = claim_svg_element(text_1_nodes, "textPath", { "xlink:href": true, startOffset: true });
      var textPath0_nodes = children(textPath0);
      tspan = claim_svg_element(textPath0_nodes, "tspan", { fill: true, class: true });
      var tspan_nodes = children(tspan);
      t0 = claim_text(tspan_nodes, t0_value);
      tspan_nodes.forEach(detach);
      t1 = claim_space(textPath0_nodes);
      textPath0_nodes.forEach(detach);
      textPath1 = claim_svg_element(text_1_nodes, "textPath", {
        "xlink:href": true,
        startOffset: true,
        fill: true,
        opacity: true
      });
      var textPath1_nodes = children(textPath1);
      t2 = claim_text(textPath1_nodes, "\u27A4");
      textPath1_nodes.forEach(detach);
      text_1_nodes.forEach(detach);
      g_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path2, "d", path_d_value = ctx[10](ctx[17]));
      attr(path2, "id", path_id_value = ctx[17].id);
      attr(path2, "stroke-width", ctx[2]);
      attr(path2, "stroke", ctx[1]);
      attr(path2, "fill", "none");
      attr(path2, "stroke-linecap", "round");
      attr(path2, "stroke-opacity", ctx[4]);
      attr(tspan, "fill", "black");
      attr(tspan, "class", "svelte-1t43067");
      xlink_attr(textPath0, "xlink:href", textPath0_xlink_href_value = "#" + ctx[17].id);
      attr(textPath0, "startOffset", textPath0_startOffset_value = ctx[7] + "%");
      xlink_attr(textPath1, "xlink:href", textPath1_xlink_href_value = "#" + ctx[17].id);
      attr(textPath1, "startOffset", ctx[8]);
      attr(textPath1, "fill", ctx[3]);
      attr(textPath1, "opacity", textPath1_opacity_value = ctx[4] * 1.3);
      attr(text_1, "class", "svelte-1t43067");
      attr(g, "stroke", ctx[6]);
      attr(g, "stroke-opacity", ctx[5]);
    },
    m(target, anchor) {
      insert_hydration(target, g, anchor);
      append_hydration(g, path2);
      append_hydration(g, text_1);
      append_hydration(text_1, textPath0);
      append_hydration(textPath0, tspan);
      append_hydration(tspan, t0);
      append_hydration(textPath0, t1);
      append_hydration(text_1, textPath1);
      append_hydration(textPath1, t2);
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      if (dirty & 1 && path_d_value !== (path_d_value = ctx2[10](ctx2[17]))) {
        attr(path2, "d", path_d_value);
      }
      if (dirty & 1 && path_id_value !== (path_id_value = ctx2[17].id)) {
        attr(path2, "id", path_id_value);
      }
      if (dirty & 4) {
        attr(path2, "stroke-width", ctx2[2]);
      }
      if (dirty & 2) {
        attr(path2, "stroke", ctx2[1]);
      }
      if (dirty & 16) {
        attr(path2, "stroke-opacity", ctx2[4]);
      }
      if (dirty & 1 && t0_value !== (t0_value = (((_c2 = (_b2 = (_a2 = ctx2[17]) == null ? void 0 : _a2.opts) == null ? void 0 : _b2.label) == null ? void 0 : _c2.enabled) ? (_f2 = (_e2 = (_d2 = ctx2[17]) == null ? void 0 : _d2.opts) == null ? void 0 : _e2.label) == null ? void 0 : _f2.value : "") + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && textPath0_xlink_href_value !== (textPath0_xlink_href_value = "#" + ctx2[17].id)) {
        xlink_attr(textPath0, "xlink:href", textPath0_xlink_href_value);
      }
      if (dirty & 128 && textPath0_startOffset_value !== (textPath0_startOffset_value = ctx2[7] + "%")) {
        attr(textPath0, "startOffset", textPath0_startOffset_value);
      }
      if (dirty & 1 && textPath1_xlink_href_value !== (textPath1_xlink_href_value = "#" + ctx2[17].id)) {
        xlink_attr(textPath1, "xlink:href", textPath1_xlink_href_value);
      }
      if (dirty & 256) {
        attr(textPath1, "startOffset", ctx2[8]);
      }
      if (dirty & 8) {
        attr(textPath1, "fill", ctx2[3]);
      }
      if (dirty & 16 && textPath1_opacity_value !== (textPath1_opacity_value = ctx2[4] * 1.3)) {
        attr(textPath1, "opacity", textPath1_opacity_value);
      }
      if (dirty & 64) {
        attr(g, "stroke", ctx2[6]);
      }
      if (dirty & 32) {
        attr(g, "stroke-opacity", ctx2[5]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(g);
    }
  };
}
function create_each_block$1(ctx) {
  let if_block_anchor;
  let if_block = ctx[17] && ctx[9] && create_if_block_1$1(ctx);
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
    },
    p(ctx2, dirty) {
      if (ctx2[17] && ctx2[9]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment$3(ctx) {
  let if_block_anchor;
  let if_block = ctx[9] && ctx[0] && ctx[0].length > 0 && create_if_block$2(ctx);
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
    },
    p(ctx2, [dirty]) {
      if (ctx2[9] && ctx2[0] && ctx2[0].length > 0) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$1,
    o: noop$1,
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { links } = $$props;
  let { calcOffsetFromCanvas } = $$props;
  let { strokeColor = "green" } = $$props;
  let { strokeWidth = 1 } = $$props;
  let { arrowColor = "green" } = $$props;
  let { strokeOpacity = "0.3" } = $$props;
  let { groupStrokeOpacity = "0.1" } = $$props;
  let { groupStrokeColor = "white" } = $$props;
  let { textStartOffset = 20 } = $$props;
  let { arrowStartOffset = "40%" } = $$props;
  const generateXcurve = link(bumpX);
  let mounted;
  let sourceX, sourceY, targetX, targetY;
  onMount(() => {
    $$invalidate(9, mounted = true);
  });
  function genPath(link2) {
    let sourceEl = document.getElementById(link2.source.id);
    let targetEl = document.getElementById(link2.target.id);
    if (!sourceEl || !targetEl)
      return;
    const { x: sx, y: sy } = calcOffsetFromCanvas(sourceEl);
    const { x: tx, y: ty } = calcOffsetFromCanvas(targetEl);
    sourceX = sx + sourceEl.offsetWidth / 2;
    sourceY = sy + sourceEl.offsetHeight / 2;
    targetX = tx + targetEl.offsetWidth / 2;
    targetY = ty + targetEl.offsetHeight / 2;
    let d = generateXcurve({
      source: [sourceX, sourceY],
      target: [targetX, targetY]
    });
    return d;
  }
  $$self.$$set = ($$props2) => {
    if ("links" in $$props2)
      $$invalidate(0, links = $$props2.links);
    if ("calcOffsetFromCanvas" in $$props2)
      $$invalidate(11, calcOffsetFromCanvas = $$props2.calcOffsetFromCanvas);
    if ("strokeColor" in $$props2)
      $$invalidate(1, strokeColor = $$props2.strokeColor);
    if ("strokeWidth" in $$props2)
      $$invalidate(2, strokeWidth = $$props2.strokeWidth);
    if ("arrowColor" in $$props2)
      $$invalidate(3, arrowColor = $$props2.arrowColor);
    if ("strokeOpacity" in $$props2)
      $$invalidate(4, strokeOpacity = $$props2.strokeOpacity);
    if ("groupStrokeOpacity" in $$props2)
      $$invalidate(5, groupStrokeOpacity = $$props2.groupStrokeOpacity);
    if ("groupStrokeColor" in $$props2)
      $$invalidate(6, groupStrokeColor = $$props2.groupStrokeColor);
    if ("textStartOffset" in $$props2)
      $$invalidate(7, textStartOffset = $$props2.textStartOffset);
    if ("arrowStartOffset" in $$props2)
      $$invalidate(8, arrowStartOffset = $$props2.arrowStartOffset);
  };
  return [
    links,
    strokeColor,
    strokeWidth,
    arrowColor,
    strokeOpacity,
    groupStrokeOpacity,
    groupStrokeColor,
    textStartOffset,
    arrowStartOffset,
    mounted,
    genPath,
    calcOffsetFromCanvas
  ];
}
class Links extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      links: 0,
      calcOffsetFromCanvas: 11,
      strokeColor: 1,
      strokeWidth: 2,
      arrowColor: 3,
      strokeOpacity: 4,
      groupStrokeOpacity: 5,
      groupStrokeColor: 6,
      textStartOffset: 7,
      arrowStartOffset: 8
    });
  }
}
function create_if_block$1(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  const default_slot_or_fallback = default_slot || fallback_block$2(ctx);
  return {
    c() {
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
    },
    l(nodes) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(nodes);
    },
    m(target, anchor) {
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[6],
            !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, null),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & 4)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
    }
  };
}
function fallback_block$2(ctx) {
  let div;
  let div_class_value;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { style: true, class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      set_style(div, "transform", "translate(-50%, -50%)");
      attr(div, "class", div_class_value = "absolute border-[" + (ctx[2] + "em") + "] md:border-[" + (ctx[2] / 2 + "em") + "] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && div_class_value !== (div_class_value = "absolute border-[" + (ctx2[2] + "em") + "] md:border-[" + (ctx2[2] / 2 + "em") + "] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full")) {
        attr(div, "class", div_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let div_id_value;
  let div_class_value;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[0] && create_if_block$1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        id: true,
        "data-highlighter": true,
        class: true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", div_id_value = ctx[1].id + "--highlighter");
      attr(div, "data-highlighter", "true");
      attr(div, "class", div_class_value = "absolute border-[" + (ctx[2] + "em") + "] md:border-[" + (ctx[2] / 2 + "em") + "] border-transparent rounded-full p-0 m-0");
      set_style(div, "top", ctx[5] + "px");
      set_style(div, "left", ctx[4] + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      ctx[9](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(window, "resize", ctx[8]),
          listen(div, "mouseover", ctx[10]),
          listen(div, "mouseleave", ctx[11]),
          listen(div, "focus", ctx[12]),
          listen(div, "blur", ctx[13])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & 2 && div_id_value !== (div_id_value = ctx2[1].id + "--highlighter")) {
        attr(div, "id", div_id_value);
      }
      if (!current || dirty & 4 && div_class_value !== (div_class_value = "absolute border-[" + (ctx2[2] + "em") + "] md:border-[" + (ctx2[2] / 2 + "em") + "] border-transparent rounded-full p-0 m-0")) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty & 32) {
        set_style(div, "top", ctx2[5] + "px");
      }
      if (!current || dirty & 16) {
        set_style(div, "left", ctx2[4] + "px");
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
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      ctx[9](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let top;
  let left;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { node } = $$props;
  let { zoneSize = 2 } = $$props;
  let { highlight = false } = $$props;
  let dot;
  const resize_handler = (e) => {
    $$invalidate(5, top), $$invalidate(3, dot), $$invalidate(1, node);
    $$invalidate(4, left), $$invalidate(3, dot), $$invalidate(1, node);
  };
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dot = $$value;
      $$invalidate(3, dot);
    });
  }
  const mouseover_handler = (e) => {
    $$invalidate(0, highlight = true);
  };
  const mouseleave_handler = (e) => {
    $$invalidate(0, highlight = false);
  };
  const focus_handler = (e) => {
    $$invalidate(0, highlight = true);
  };
  const blur_handler = (e) => {
    $$invalidate(0, highlight = false);
  };
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(1, node = $$props2.node);
    if ("zoneSize" in $$props2)
      $$invalidate(2, zoneSize = $$props2.zoneSize);
    if ("highlight" in $$props2)
      $$invalidate(0, highlight = $$props2.highlight);
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 10) {
      $$invalidate(5, top = dot ? -dot.offsetHeight / 2 + node.offsetHeight / 2 : 0);
    }
    if ($$self.$$.dirty & 10) {
      $$invalidate(4, left = dot ? -dot.offsetWidth / 2 + node.offsetWidth / 2 : 0);
    }
    if ($$self.$$.dirty & 10) {
      if (dot)
        node.insertAdjacentElement("beforeend", dot);
    }
  };
  return [
    highlight,
    node,
    zoneSize,
    dot,
    left,
    top,
    $$scope,
    slots,
    resize_handler,
    div_binding,
    mouseover_handler,
    mouseleave_handler,
    focus_handler,
    blur_handler
  ];
}
class Highlighter extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { node: 1, zoneSize: 2, highlight: 0 });
  }
}
const Highlighter$1 = Highlighter;
const generateLinkLabel = (nodes, sourceID, targetID = false) => {
  const match = nodes.find((el) => el.id == sourceID);
  if (!match || !match.value)
    return "";
  if (!targetID)
    return match.value + " to";
  const match2 = nodes.find((el) => el.id == targetID);
  if (!match2)
    return match.value;
  return `${match.value} to ${match2.value}`;
};
const { window: window_1 } = globals;
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i][0];
  child_ctx[19] = list[i][1].node;
  child_ctx[20] = list[i][1].highlight;
  return child_ctx;
}
const get_default_slot_changes = (dirty) => ({});
const get_default_slot_context = (ctx) => ({ connectable: ctx[10] });
const get_marker_slot_changes = (dirty) => ({});
const get_marker_slot_context = (ctx) => ({ connectable: ctx[10] });
function create_if_block_1(ctx) {
  let cursormarker;
  let updating_marker;
  let current;
  function cursormarker_marker_binding(value) {
    ctx[13](value);
  }
  let cursormarker_props = {
    left: ctx[7],
    top: ctx[8],
    id: MARKER,
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  if (ctx[5] !== void 0) {
    cursormarker_props.marker = ctx[5];
  }
  cursormarker = new CursorMarker({ props: cursormarker_props });
  binding_callbacks.push(() => bind(cursormarker, "marker", cursormarker_marker_binding));
  return {
    c() {
      create_component(cursormarker.$$.fragment);
    },
    l(nodes) {
      claim_component(cursormarker.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(cursormarker, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const cursormarker_changes = {};
      if (dirty & 128)
        cursormarker_changes.left = ctx2[7];
      if (dirty & 256)
        cursormarker_changes.top = ctx2[8];
      if (dirty & 32768) {
        cursormarker_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_marker && dirty & 32) {
        updating_marker = true;
        cursormarker_changes.marker = ctx2[5];
        add_flush_callback(() => updating_marker = false);
      }
      cursormarker.$set(cursormarker_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cursormarker.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cursormarker.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(cursormarker, detaching);
    }
  };
}
function fallback_block$1(ctx) {
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
      attr(div, "class", "h-32 w-32 md:h-16 md:w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[4em] md:border-[2em] ");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_default_slot(ctx) {
  let current;
  const marker_slot_template = ctx[11].marker;
  const marker_slot = create_slot(marker_slot_template, ctx, ctx[15], get_marker_slot_context);
  const marker_slot_or_fallback = marker_slot || fallback_block$1();
  return {
    c() {
      if (marker_slot_or_fallback)
        marker_slot_or_fallback.c();
    },
    l(nodes) {
      if (marker_slot_or_fallback)
        marker_slot_or_fallback.l(nodes);
    },
    m(target, anchor) {
      if (marker_slot_or_fallback) {
        marker_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (marker_slot) {
        if (marker_slot.p && (!current || dirty & 32768)) {
          update_slot_base(
            marker_slot,
            marker_slot_template,
            ctx2,
            ctx2[15],
            !current ? get_all_dirty_from_scope(ctx2[15]) : get_slot_changes(marker_slot_template, ctx2[15], dirty, get_marker_slot_changes),
            get_marker_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(marker_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(marker_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (marker_slot_or_fallback)
        marker_slot_or_fallback.d(detaching);
    }
  };
}
function create_if_block(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[15], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32768)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[15],
            !current ? get_all_dirty_from_scope(ctx2[15]) : get_slot_changes(default_slot_template, ctx2[15], dirty, get_default_slot_changes),
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
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_each_block(ctx) {
  let highlighter;
  let current;
  highlighter = new Highlighter$1({
    props: {
      node: ctx[19],
      highlight: ctx[20]
    }
  });
  return {
    c() {
      create_component(highlighter.$$.fragment);
    },
    l(nodes) {
      claim_component(highlighter.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(highlighter, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const highlighter_changes = {};
      if (dirty & 4)
        highlighter_changes.node = ctx2[19];
      if (dirty & 4)
        highlighter_changes.highlight = ctx2[20];
      highlighter.$set(highlighter_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(highlighter.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(highlighter.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(highlighter, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  var _a, _b;
  let div;
  let t0;
  let t1;
  let links0;
  let t2;
  let links1;
  let t3;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[4] && create_if_block_1(ctx);
  let if_block1 = ctx[3] && create_if_block(ctx);
  const links0_spread_levels = [
    { links: [ctx[6]] },
    {
      calcOffsetFromCanvas: ctx[9]
    },
    (_a = ctx[1]) == null ? void 0 : _a.links
  ];
  let links0_props = {};
  for (let i = 0; i < links0_spread_levels.length; i += 1) {
    links0_props = assign(links0_props, links0_spread_levels[i]);
  }
  links0 = new Links({ props: links0_props });
  const links1_spread_levels = [
    { links: ctx[0].links },
    {
      calcOffsetFromCanvas: ctx[9]
    },
    (_b = ctx[1]) == null ? void 0 : _b.links
  ];
  let links1_props = {};
  for (let i = 0; i < links1_spread_levels.length; i += 1) {
    links1_props = assign(links1_props, links1_spread_levels[i]);
  }
  links1 = new Links({ props: links1_props });
  let each_value = [...Object.entries(ctx[2])];
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
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      create_component(links0.$$.fragment);
      t2 = space();
      create_component(links1.$$.fragment);
      t3 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block0)
        if_block0.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      t1 = claim_space(div_nodes);
      claim_component(links0.$$.fragment, div_nodes);
      t2 = claim_space(div_nodes);
      claim_component(links1.$$.fragment, div_nodes);
      t3 = claim_space(div_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "relative");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t0);
      if (if_block1)
        if_block1.m(div, null);
      append_hydration(div, t1);
      mount_component(links0, div, null);
      append_hydration(div, t2);
      mount_component(links1, div, null);
      append_hydration(div, t3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      ctx[14](div);
      current = true;
      if (!mounted) {
        dispose = listen(window_1, "resize", ctx[12]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      var _a2, _b2;
      if (ctx2[4]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & 16) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[3]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      const links0_changes = dirty & 578 ? get_spread_update(links0_spread_levels, [
        dirty & 64 && { links: [ctx2[6]] },
        dirty & 512 && {
          calcOffsetFromCanvas: ctx2[9]
        },
        dirty & 2 && get_spread_object((_a2 = ctx2[1]) == null ? void 0 : _a2.links)
      ]) : {};
      links0.$set(links0_changes);
      const links1_changes = dirty & 515 ? get_spread_update(links1_spread_levels, [
        dirty & 1 && { links: ctx2[0].links },
        dirty & 512 && {
          calcOffsetFromCanvas: ctx2[9]
        },
        dirty & 2 && get_spread_object((_b2 = ctx2[1]) == null ? void 0 : _b2.links)
      ]) : {};
      links1.$set(links1_changes);
      if (dirty & 4) {
        each_value = [...Object.entries(ctx2[2])];
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
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(links0.$$.fragment, local);
      transition_in(links1.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(links0.$$.fragment, local);
      transition_out(links1.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      destroy_component(links0);
      destroy_component(links1);
      destroy_each(each_blocks, detaching);
      ctx[14](null);
      mounted = false;
      dispose();
    }
  };
}
const MARKER = "marker";
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { data } = $$props;
  let { opts = {} } = $$props;
  const dispatch = createEventDispatcher();
  let highlighters = {};
  let canvas;
  let connecting;
  let marker;
  let tempLink = null;
  let left = 0;
  let top = 0;
  function handler(p, e) {
    e.stopPropagation();
    e.preventDefault();
    $$invalidate(7, left = p.pageX - canvas.offsetLeft);
    $$invalidate(8, top = p.pageY - canvas.offsetTop);
  }
  function calcOffsetFromCanvas(child) {
    if (!child)
      return;
    if (child == canvas)
      return { x: child.offsetLeft, y: child.offsetTop };
    let sourceOffsetTop = child.getBoundingClientRect().top;
    let canvasOffsetTop = canvas.getBoundingClientRect().top;
    let sourceOffsetTopDiff = sourceOffsetTop - canvasOffsetTop;
    let sourceOffsetLeft = child.getBoundingClientRect().left;
    let canvasOffsetLeft = canvas.getBoundingClientRect().left;
    let sourceOffsetLeftDiff = sourceOffsetLeft - canvasOffsetLeft;
    return {
      x: sourceOffsetLeftDiff,
      y: sourceOffsetTopDiff
    };
  }
  function connectable(node, options) {
    var _a, _b;
    if (!node.id)
      node.id = nanoid();
    if (!node.style.position)
      node.style.position = "relative";
    let highlight = false;
    let overZone;
    $$invalidate(2, highlighters[node.id] = { node, highlight }, highlighters);
    let pointerTracker;
    if (options == null ? void 0 : options.dataset)
      node.dataset.dataset = JSON.stringify(options.dataset);
    if (!((_a = options == null ? void 0 : options.restrictions) == null ? void 0 : _a.startOnly))
      node.dataset.dropzone = true;
    if (!((_b = options == null ? void 0 : options.restrictions) == null ? void 0 : _b.dropOnly))
      pointerTracker = new PointerTracker(
        node,
        {
          start(pointer, event) {
            if (pointerTracker.currentPointers.length === 1)
              return false;
            $$invalidate(4, connecting = true);
            handler(pointer, event);
            return true;
          },
          move(previousPointers, changedPointers, event) {
            var _a2;
            handler(pointerTracker.currentPointers[0], event);
            $$invalidate(6, tempLink = {
              id: node.id + "-to-",
              source: { id: node.id },
              target: { id: MARKER },
              opts: {
                label: {
                  enabled: true,
                  value: generateLinkLabel(data.nodes, node.id)
                }
              }
            });
            if (overZone)
              $$invalidate(2, highlighters[overZone.id].highlight = false, highlighters);
            overZone = ((_a2 = document.elementFromPoint(pointerTracker.currentPointers[0].clientX, pointerTracker.currentPointers[0].clientY)) == null ? void 0 : _a2.closest(`[data-dropzone]`)) || null;
            if (overZone == null ? void 0 : overZone.id) {
              $$invalidate(2, highlighters[overZone.id].highlight = true, highlighters);
            }
          },
          end: (pointer, event, cancelled) => {
            var _a2, _b2;
            $$invalidate(5, marker.style.display = "none", marker);
            $$invalidate(4, connecting = false);
            if (highlighters && overZone && overZone.id && highlighters[overZone.id].highlight) {
              $$invalidate(2, highlighters[overZone.id].highlight = false, highlighters);
            }
            overZone = null;
            let drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
            let zone = drop.closest(`[data-dropzone]`);
            $$invalidate(6, tempLink = null);
            if (!zone || !(zone == null ? void 0 : zone.id) || !node || !(node == null ? void 0 : node.id))
              return;
            const newLink = {
              id: node.id + "-to-" + zone.id,
              source: { id: node.id },
              target: { id: zone.id },
              opts: {
                label: {
                  enabled: true,
                  value: generateLinkLabel(data.nodes, node.id, zone.id)
                }
              }
            };
            console.log({ newLink });
            $$invalidate(0, data.links = [...data.links, newLink], data);
            if ((options == null ? void 0 : options.dataset) || ((_a2 = zone == null ? void 0 : zone.dataset) == null ? void 0 : _a2.dataset)) {
              const detail = {
                source: { dataset: (options == null ? void 0 : options.dataset) || null },
                target: {
                  dataset: ((_b2 = zone == null ? void 0 : zone.dataset) == null ? void 0 : _b2.dataset) ? JSON.parse(zone.dataset.dataset) : null
                }
              };
              console.log(detail);
              dispatch("connected", detail);
            }
          },
          avoidPointerEvents: true,
          eventListenerOptions: { capture: true, passive: false }
        }
      );
    return {
      update(params) {
      },
      destroy() {
      }
    };
  }
  const resize_handler = (e) => {
    $$invalidate(0, data);
  };
  function cursormarker_marker_binding(value) {
    marker = value;
    $$invalidate(5, marker);
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvas = $$value;
      $$invalidate(3, canvas);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
    if ("opts" in $$props2)
      $$invalidate(1, opts = $$props2.opts);
    if ("$$scope" in $$props2)
      $$invalidate(15, $$scope = $$props2.$$scope);
  };
  return [
    data,
    opts,
    highlighters,
    canvas,
    connecting,
    marker,
    tempLink,
    left,
    top,
    calcOffsetFromCanvas,
    connectable,
    slots,
    resize_handler,
    cursormarker_marker_binding,
    div_binding,
    $$scope
  ];
}
class Canvas extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { data: 0, opts: 1 });
  }
}
const Canvas$1 = Canvas;
function fallback_block(ctx) {
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
      attr(div, "class", "flex h-4 w-4 border-2 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment(ctx) {
  let div1;
  let div0;
  let connectable_action;
  let div1_style_value;
  let div1_resize_listener;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[10], null);
  const default_slot_or_fallback = default_slot || fallback_block();
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "relative");
      attr(div1, "class", "flex absolute EndPoint");
      attr(div1, "style", div1_style_value = "top: " + ctx[8] + "px; " + (ctx[0] == "right" ? `right: ${ctx[7]}px;` : `left: ${ctx[6]}px;`));
      add_render_callback(() => ctx[14].call(div1));
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div0, null);
      }
      ctx[13](div1);
      div1_resize_listener = add_resize_listener(div1, ctx[14].bind(div1));
      current = true;
      if (!mounted) {
        dispose = [
          listen(window, "resize", ctx[12]),
          action_destroyer(connectable_action = ctx[1].call(null, div0, ctx[2]))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1024)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[10],
            !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(default_slot_template, ctx2[10], dirty, null),
            null
          );
        }
      }
      if (connectable_action && is_function(connectable_action.update) && dirty & 4)
        connectable_action.update.call(null, ctx2[2]);
      if (!current || dirty & 449 && div1_style_value !== (div1_style_value = "top: " + ctx2[8] + "px; " + (ctx2[0] == "right" ? `right: ${ctx2[7]}px;` : `left: ${ctx2[6]}px;`))) {
        attr(div1, "style", div1_style_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[13](null);
      div1_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let top;
  let right;
  let left;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { position = "right" } = $$props;
  let { connectable } = $$props;
  let { options = {} } = $$props;
  let dot;
  let offsetHeight, offsetWidth, parentHeight;
  const resize_handler = (e) => {
    $$invalidate(8, top), $$invalidate(9, parentHeight), $$invalidate(4, offsetHeight), $$invalidate(3, dot);
    $$invalidate(6, left), $$invalidate(5, offsetWidth);
    $$invalidate(7, right), $$invalidate(5, offsetWidth);
  };
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dot = $$value;
      $$invalidate(3, dot);
    });
  }
  function div1_elementresize_handler() {
    offsetWidth = this.offsetWidth;
    offsetHeight = this.offsetHeight;
    $$invalidate(5, offsetWidth);
    $$invalidate(4, offsetHeight);
  }
  $$self.$$set = ($$props2) => {
    if ("position" in $$props2)
      $$invalidate(0, position = $$props2.position);
    if ("connectable" in $$props2)
      $$invalidate(1, connectable = $$props2.connectable);
    if ("options" in $$props2)
      $$invalidate(2, options = $$props2.options);
    if ("$$scope" in $$props2)
      $$invalidate(10, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      if (dot) {
        $$invalidate(3, dot.parentNode.style.position = "relative", dot);
        $$invalidate(9, parentHeight = dot.parentNode.offsetHeight);
      }
    }
    if ($$self.$$.dirty & 528) {
      $$invalidate(8, top = parentHeight && offsetHeight ? parentHeight / 2 - offsetHeight / 2 : 0);
    }
    if ($$self.$$.dirty & 32) {
      $$invalidate(7, right = offsetWidth ? -offsetWidth / 2 : 0);
    }
    if ($$self.$$.dirty & 32) {
      $$invalidate(6, left = offsetWidth ? -offsetWidth / 2 : 0);
    }
  };
  return [
    position,
    connectable,
    options,
    dot,
    offsetHeight,
    offsetWidth,
    left,
    right,
    top,
    parentHeight,
    $$scope,
    slots,
    resize_handler,
    div1_binding,
    div1_elementresize_handler
  ];
}
class EndPoint extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { position: 0, connectable: 1, options: 2 });
  }
}
const EndPoint$1 = EndPoint;
export {
  Canvas$1 as Canvas,
  EndPoint$1 as EndPoint,
  Highlighter$1 as Highlighter,
  generateLinkLabel
};
//# sourceMappingURL=index-f780e9b1.js.map
