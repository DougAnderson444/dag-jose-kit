import { S as SvelteComponent, i as init, s as safe_not_equal, l as element, N as svg_element, m as claim_element, n as children, O as claim_svg_element, h as detach, p as attr, a4 as xlink_attr, b as insert_hydration, J as append_hydration, E as noop, F as create_slot, w as create_component, a as space, x as claim_component, c as claim_space, a5 as toggle_class, y as mount_component, M as listen, a6 as action_destroyer, G as update_slot_base, H as get_all_dirty_from_scope, I as get_slot_changes, f as transition_in, t as transition_out, B as destroy_component, a7 as run_all, g as group_outros, d as check_outros, R as createEventDispatcher, a1 as add_render_callback, a2 as create_bidirectional_transition, a8 as null_to_empty, q as set_style, a9 as src_url_equal, L as set_input_value, aa as add_resize_listener, Q as is_function, o as onMount, ab as globals, r as text, u as claim_text, v as set_data, _ as binding_callbacks, e as empty, $ as bind, a0 as add_flush_callback, ac as bubble } from "./index-ef46e954.js";
import { _ as __vitePreload } from "./preload-helper-fe81da0e.js";
import { f as fade } from "./index-396531f4.js";
const app = "";
function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;
  var serializer = options && options.serializer ? options.serializer : serializerDefault;
  var strategy = options && options.strategy ? options.strategy : strategyDefault;
  return strategy(fn, {
    cache,
    serializer
  });
}
function isPrimitive(value) {
  return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function serializerDefault() {
  return JSON.stringify(arguments);
}
function ObjectWithoutPrototypeCache() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.has = function(key) {
  return key in this.cache;
};
ObjectWithoutPrototypeCache.prototype.get = function(key) {
  return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
  this.cache[key] = value;
};
var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
};
var memoize_default = memoize;
var DEFAULT_CLASS = {
  MAIN: "svelte-draggable",
  DRAGGING: "svelte-draggable-dragging",
  DRAGGED: "svelte-draggable-dragged"
};
var draggable = (node, options = {}) => {
  var _a, _b;
  let {
    bounds,
    axis = "both",
    gpuAcceleration = true,
    applyUserSelectHack = true,
    disabled = false,
    ignoreMultitouch = false,
    grid,
    position,
    cancel,
    handle,
    defaultClass = DEFAULT_CLASS.MAIN,
    defaultClassDragging = DEFAULT_CLASS.DRAGGING,
    defaultClassDragged = DEFAULT_CLASS.DRAGGED,
    defaultPosition = { x: 0, y: 0 },
    onDragStart,
    onDrag,
    onDragEnd
  } = options;
  const tick = new Promise(requestAnimationFrame);
  let active = false;
  let [translateX, translateY] = [0, 0];
  let [initialX, initialY] = [0, 0];
  let [clientToNodeOffsetX, clientToNodeOffsetY] = [0, 0];
  let { x: xOffset, y: yOffset } = { x: (_a = position == null ? void 0 : position.x) != null ? _a : 0, y: (_b = position == null ? void 0 : position.y) != null ? _b : 0 };
  setTranslate(xOffset, yOffset, node, gpuAcceleration);
  let canMoveInX;
  let canMoveInY;
  let bodyOriginalUserSelectVal = "";
  let computedBounds;
  let nodeRect;
  let dragEl;
  let cancelEl;
  let isControlled = !!position;
  const getEventData = () => ({
    offsetX: translateX,
    offsetY: translateY,
    domRect: node.getBoundingClientRect()
  });
  function fireSvelteDragStartEvent(node2) {
    const data = getEventData();
    node2.dispatchEvent(new CustomEvent("svelte-drag:start", { detail: data }));
    onDragStart == null ? void 0 : onDragStart(data);
  }
  function fireSvelteDragStopEvent(node2) {
    const data = getEventData();
    node2.dispatchEvent(new CustomEvent("svelte-drag:end", { detail: data }));
    onDragEnd == null ? void 0 : onDragEnd(data);
  }
  function fireSvelteDragEvent(node2, translateX2, translateY2) {
    const data = getEventData();
    node2.dispatchEvent(new CustomEvent("svelte-drag", { detail: data }));
    onDrag == null ? void 0 : onDrag(data);
  }
  const listen2 = addEventListener;
  listen2("touchstart", dragStart, false);
  listen2("touchend", dragEnd, false);
  listen2("touchmove", drag, false);
  listen2("mousedown", dragStart, false);
  listen2("mouseup", dragEnd, false);
  listen2("mousemove", drag, false);
  node.style.touchAction = "none";
  const calculateInverseScale = () => {
    let inverseScale = node.offsetWidth / nodeRect.width;
    if (isNaN(inverseScale))
      inverseScale = 1;
    return inverseScale;
  };
  function dragStart(e) {
    if (disabled)
      return;
    if (ignoreMultitouch && e.type === "touchstart" && e.touches.length > 1)
      return;
    node.classList.add(defaultClass);
    dragEl = getDragEl(handle, node);
    cancelEl = getCancelElement(cancel, node);
    canMoveInX = ["both", "x"].includes(axis);
    canMoveInY = ["both", "y"].includes(axis);
    if (typeof bounds !== "undefined") {
      computedBounds = computeBoundRect(bounds, node);
    }
    nodeRect = node.getBoundingClientRect();
    if (isString(handle) && isString(cancel) && handle === cancel)
      throw new Error("`handle` selector can't be same as `cancel` selector");
    if (cancelEl == null ? void 0 : cancelEl.contains(dragEl))
      throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");
    if (dragEl.contains(e.target) && !(cancelEl == null ? void 0 : cancelEl.contains(e.target)))
      active = true;
    if (!active)
      return;
    if (applyUserSelectHack) {
      bodyOriginalUserSelectVal = document.body.style.userSelect;
      document.body.style.userSelect = "none";
    }
    fireSvelteDragStartEvent(node);
    const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;
    const inverseScale = calculateInverseScale();
    if (canMoveInX)
      initialX = clientX - xOffset / inverseScale;
    if (canMoveInY)
      initialY = clientY - yOffset / inverseScale;
    if (computedBounds) {
      clientToNodeOffsetX = clientX - nodeRect.left;
      clientToNodeOffsetY = clientY - nodeRect.top;
    }
  }
  function dragEnd() {
    if (!active)
      return;
    node.classList.remove(defaultClassDragging);
    node.classList.add(defaultClassDragged);
    if (applyUserSelectHack)
      document.body.style.userSelect = bodyOriginalUserSelectVal;
    fireSvelteDragStopEvent(node);
    if (canMoveInX)
      initialX = translateX;
    if (canMoveInX)
      initialY = translateY;
    active = false;
  }
  function drag(e) {
    if (!active)
      return;
    node.classList.add(defaultClassDragging);
    e.preventDefault();
    nodeRect = node.getBoundingClientRect();
    const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;
    let [finalX, finalY] = [clientX, clientY];
    const inverseScale = calculateInverseScale();
    if (computedBounds) {
      const virtualClientBounds = {
        left: computedBounds.left + clientToNodeOffsetX,
        top: computedBounds.top + clientToNodeOffsetY,
        right: computedBounds.right + clientToNodeOffsetX - nodeRect.width,
        bottom: computedBounds.bottom + clientToNodeOffsetY - nodeRect.height
      };
      finalX = clamp(finalX, virtualClientBounds.left, virtualClientBounds.right);
      finalY = clamp(finalY, virtualClientBounds.top, virtualClientBounds.bottom);
    }
    if (Array.isArray(grid)) {
      let [xSnap, ySnap] = grid;
      if (isNaN(+xSnap) || xSnap < 0)
        throw new Error("1st argument of `grid` must be a valid positive number");
      if (isNaN(+ySnap) || ySnap < 0)
        throw new Error("2nd argument of `grid` must be a valid positive number");
      let [deltaX, deltaY] = [finalX - initialX, finalY - initialY];
      [deltaX, deltaY] = snapToGrid([Math.floor(xSnap / inverseScale), Math.floor(ySnap / inverseScale)], deltaX, deltaY);
      [finalX, finalY] = [initialX + deltaX, initialY + deltaY];
    }
    if (canMoveInX)
      translateX = (finalX - initialX) * inverseScale;
    if (canMoveInY)
      translateY = (finalY - initialY) * inverseScale;
    [xOffset, yOffset] = [translateX, translateY];
    fireSvelteDragEvent(node);
    tick.then(() => setTranslate(translateX, translateY, node, gpuAcceleration));
  }
  return {
    destroy: () => {
      const unlisten = removeEventListener;
      unlisten("touchstart", dragStart, false);
      unlisten("touchend", dragEnd, false);
      unlisten("touchmove", drag, false);
      unlisten("mousedown", dragStart, false);
      unlisten("mouseup", dragEnd, false);
      unlisten("mousemove", drag, false);
    },
    update: (options2) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      axis = options2.axis || "both";
      disabled = (_a2 = options2.disabled) != null ? _a2 : false;
      ignoreMultitouch = (_b2 = options2.ignoreMultitouch) != null ? _b2 : false;
      handle = options2.handle;
      bounds = options2.bounds;
      cancel = options2.cancel;
      applyUserSelectHack = (_c = options2.applyUserSelectHack) != null ? _c : true;
      grid = options2.grid;
      gpuAcceleration = (_d = options2.gpuAcceleration) != null ? _d : true;
      const dragged = node.classList.contains(defaultClassDragged);
      node.classList.remove(defaultClass, defaultClassDragged);
      defaultClass = (_e = options2.defaultClass) != null ? _e : DEFAULT_CLASS.MAIN;
      defaultClassDragging = (_f = options2.defaultClassDragging) != null ? _f : DEFAULT_CLASS.DRAGGING;
      defaultClassDragged = (_g = options2.defaultClassDragged) != null ? _g : DEFAULT_CLASS.DRAGGED;
      node.classList.add(defaultClass);
      if (dragged)
        node.classList.add(defaultClassDragged);
      if (isControlled) {
        xOffset = translateX = (_i = (_h = options2.position) == null ? void 0 : _h.x) != null ? _i : translateX;
        yOffset = translateY = (_k = (_j = options2.position) == null ? void 0 : _j.y) != null ? _k : translateY;
        tick.then(() => setTranslate(translateX, translateY, node, gpuAcceleration));
      }
    }
  };
};
function isTouchEvent(event) {
  return Boolean(event.touches && event.touches.length);
}
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function isString(val) {
  return typeof val === "string";
}
var snapToGrid = memoize_default(([xSnap, ySnap], pendingX, pendingY) => {
  const x = Math.round(pendingX / xSnap) * xSnap;
  const y = Math.round(pendingY / ySnap) * ySnap;
  return [x, y];
});
function getDragEl(handle, node) {
  if (!handle)
    return node;
  const handleEl = node.querySelector(handle);
  if (handleEl === null)
    throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");
  return handleEl;
}
function getCancelElement(cancel, node) {
  if (!cancel)
    return;
  const cancelEl = node.querySelector(cancel);
  if (cancelEl === null)
    throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");
  return cancelEl;
}
function computeBoundRect(bounds, rootNode) {
  if (typeof bounds === "object") {
    const [windowWidth, windowHeight] = [window.innerWidth, window.innerHeight];
    const { top = 0, left = 0, right = 0, bottom = 0 } = bounds;
    const computedRight = windowWidth - right;
    const computedBottom = windowHeight - bottom;
    return { top, right: computedRight, bottom: computedBottom, left };
  }
  if (bounds === "parent") {
    const boundRect = rootNode.parentNode.getBoundingClientRect();
    return boundRect;
  }
  const node = document.querySelector(bounds);
  if (node === null)
    throw new Error("The selector provided for bound doesn't exists in the document.");
  const computedBounds = node.getBoundingClientRect();
  return computedBounds;
}
function setTranslate(xPos, yPos, el, gpuAcceleration) {
  el.style.transform = gpuAcceleration ? `translate3d(${+xPos}px, ${+yPos}px, 0)` : `translate(${+xPos}px, ${+yPos}px)`;
}
const Logo_svelte_svelte_type_style_lang = "";
function create_fragment$4(ctx) {
  let div;
  let svg;
  let defs0;
  let defs1;
  let path0;
  let path1;
  let path2;
  let radialGradient;
  let stop0;
  let stop1;
  let use0;
  let use1;
  let use2;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      defs0 = svg_element("defs");
      defs1 = svg_element("defs");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      radialGradient = svg_element("radialGradient");
      stop0 = svg_element("stop");
      stop1 = svg_element("stop");
      use0 = svg_element("use");
      use1 = svg_element("use");
      use2 = svg_element("use");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        xmlns: true,
        "xmlns:xlink": true,
        viewBox: true,
        width: true,
        height: true,
        class: true
      });
      var svg_nodes = children(svg);
      defs0 = claim_svg_element(svg_nodes, "defs", {});
      children(defs0).forEach(detach);
      defs1 = claim_svg_element(svg_nodes, "defs", {});
      var defs1_nodes = children(defs1);
      path0 = claim_svg_element(defs1_nodes, "path", { id: true, d: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(defs1_nodes, "path", { id: true, d: true });
      children(path1).forEach(detach);
      path2 = claim_svg_element(defs1_nodes, "path", { id: true, d: true });
      children(path2).forEach(detach);
      radialGradient = claim_svg_element(defs1_nodes, "radialGradient", {
        id: true,
        cx: true,
        cy: true,
        r: true,
        gradientUnits: true
      });
      var radialGradient_nodes = children(radialGradient);
      stop0 = claim_svg_element(radialGradient_nodes, "stop", { offset: true, "stop-color": true });
      children(stop0).forEach(detach);
      stop1 = claim_svg_element(radialGradient_nodes, "stop", { offset: true, "stop-color": true });
      children(stop1).forEach(detach);
      radialGradient_nodes.forEach(detach);
      defs1_nodes.forEach(detach);
      use0 = claim_svg_element(svg_nodes, "use", { fill: true, "xlink:href": true });
      children(use0).forEach(detach);
      use1 = claim_svg_element(svg_nodes, "use", { fill: true, "xlink:href": true });
      children(use1).forEach(detach);
      use2 = claim_svg_element(svg_nodes, "use", { fill: true, "xlink:href": true });
      children(use2).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "id", "a");
      attr(path0, "d", "M258 1321c9-304 6-917 0-1191 52-161 1082-280 1083 330 1 609-618 545-701 538-2 67-2 208 0 422-222 56-349 23-382-99z");
      attr(path1, "id", "c");
      attr(path1, "d", "M1122 560c-107 223-284 293-529 209l-38 79c-1 2-4 2-5-1l-99-287c-1-5 1-11 6-13l273-106c3-1 6 2 5 5l-36 75c70 126 211 139 423 39z");
      attr(path2, "id", "d");
      attr(path2, "d", "M451 447c107-223 284-292 529-209l38-78c1-3 5-2 5 0l99 288c1 5-1 10-6 12L843 567c-3 1-6-3-5-6l37-75c-71-126-212-139-424-39z");
      attr(stop0, "offset", "0%");
      attr(stop0, "stop-color", "#69ed66");
      attr(stop1, "offset", "100%");
      attr(stop1, "stop-color", "#279c19");
      attr(radialGradient, "id", "b");
      attr(radialGradient, "cx", "992.3");
      attr(radialGradient, "cy", "174.2");
      attr(radialGradient, "r", "1312.8");
      attr(radialGradient, "gradientUnits", "userSpaceOnUse");
      attr(use0, "fill", "url(#b)");
      xlink_attr(use0, "xlink:href", "#a");
      attr(use1, "fill", "#fff");
      xlink_attr(use1, "xlink:href", "#c");
      attr(use2, "fill", "#fff");
      xlink_attr(use2, "xlink:href", "#d");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
      attr(svg, "viewBox", "0 0 1440 1440");
      attr(svg, "width", "100");
      attr(svg, "height", "100");
      attr(svg, "class", "svelte-189qcdl");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, defs0);
      append_hydration(svg, defs1);
      append_hydration(defs1, path0);
      append_hydration(defs1, path1);
      append_hydration(defs1, path2);
      append_hydration(defs1, radialGradient);
      append_hydration(radialGradient, stop0);
      append_hydration(radialGradient, stop1);
      append_hydration(svg, use0);
      append_hydration(svg, use1);
      append_hydration(svg, use2);
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
class Logo extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$4, safe_not_equal, {});
  }
}
const MenuWrapper_svelte_svelte_type_style_lang = "";
const get_default_slot_changes = (dirty) => ({
  openNav: dirty & 1,
  hideNav: dirty & 1
});
const get_default_slot_context = (ctx) => ({
  openNav: ctx[5],
  hideNav: ctx[6]
});
function create_fragment$3(ctx) {
  let div4;
  let logo;
  let t0;
  let div3;
  let div0;
  let t1;
  let div1;
  let t2;
  let div2;
  let t3;
  let div5;
  let t4;
  let div6;
  let current;
  let mounted;
  let dispose;
  logo = new Logo({});
  const default_slot_template = ctx[4].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[3], get_default_slot_context);
  return {
    c() {
      div4 = element("div");
      create_component(logo.$$.fragment);
      t0 = space();
      div3 = element("div");
      div0 = element("div");
      t1 = space();
      div1 = element("div");
      t2 = space();
      div2 = element("div");
      t3 = space();
      div5 = element("div");
      t4 = space();
      div6 = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div4 = claim_element(nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      claim_component(logo.$$.fragment, div4_nodes);
      t0 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      t1 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", { class: true });
      children(div1).forEach(detach);
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      children(div2).forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t3 = claim_space(nodes);
      div5 = claim_element(nodes, "DIV", { class: true });
      children(div5).forEach(detach);
      t4 = claim_space(nodes);
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      if (default_slot)
        default_slot.l(div6_nodes);
      div6_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "bar1 svelte-c02puv");
      attr(div1, "class", "bar2 svelte-c02puv");
      attr(div2, "class", "bar3 svelte-c02puv");
      attr(div3, "class", "menu-icon svelte-c02puv");
      attr(div4, "class", "container svelte-c02puv");
      toggle_class(div4, "change", ctx[0]);
      attr(div5, "class", "svelte-c02puv");
      toggle_class(div5, "mask", ctx[0]);
      attr(div6, "class", "sidenav svelte-c02puv");
      toggle_class(div6, "open", ctx[0]);
    },
    m(target, anchor) {
      insert_hydration(target, div4, anchor);
      mount_component(logo, div4, null);
      append_hydration(div4, t0);
      append_hydration(div4, div3);
      append_hydration(div3, div0);
      append_hydration(div3, t1);
      append_hydration(div3, div1);
      append_hydration(div3, t2);
      append_hydration(div3, div2);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, div5, anchor);
      insert_hydration(target, t4, anchor);
      insert_hydration(target, div6, anchor);
      if (default_slot) {
        default_slot.m(div6, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(div4, "click", ctx[1]),
          action_destroyer(draggable.call(null, div4)),
          listen(div5, "click", ctx[2])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        toggle_class(div4, "change", ctx2[0]);
      }
      if (dirty & 1) {
        toggle_class(div5, "mask", ctx2[0]);
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 9)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[3],
            !current ? get_all_dirty_from_scope(ctx2[3]) : get_slot_changes(default_slot_template, ctx2[3], dirty, get_default_slot_changes),
            get_default_slot_context
          );
        }
      }
      if (dirty & 1) {
        toggle_class(div6, "open", ctx2[0]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(logo.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(logo.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div4);
      destroy_component(logo);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div5);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(div6);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let navOpen = false;
  function handleNav() {
    $$invalidate(0, navOpen = !navOpen);
  }
  function onClickOutside(event) {
    $$invalidate(0, navOpen = false);
  }
  const func = () => $$invalidate(0, navOpen = true);
  const func_1 = () => $$invalidate(0, navOpen = false);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [navOpen, handleNav, onClickOutside, $$scope, slots, func, func_1];
}
class MenuWrapper extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
  }
}
var MessageType;
(function(MessageType2) {
  MessageType2["Call"] = "call";
  MessageType2["Reply"] = "reply";
  MessageType2["Syn"] = "syn";
  MessageType2["SynAck"] = "synAck";
  MessageType2["Ack"] = "ack";
})(MessageType || (MessageType = {}));
var Resolution;
(function(Resolution2) {
  Resolution2["Fulfilled"] = "fulfilled";
  Resolution2["Rejected"] = "rejected";
})(Resolution || (Resolution = {}));
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["ConnectionDestroyed"] = "ConnectionDestroyed";
  ErrorCode2["ConnectionTimeout"] = "ConnectionTimeout";
  ErrorCode2["NoIframeSrc"] = "NoIframeSrc";
})(ErrorCode || (ErrorCode = {}));
var NativeErrorName;
(function(NativeErrorName2) {
  NativeErrorName2["DataCloneError"] = "DataCloneError";
})(NativeErrorName || (NativeErrorName = {}));
var NativeEventType;
(function(NativeEventType2) {
  NativeEventType2["Message"] = "message";
})(NativeEventType || (NativeEventType = {}));
const createDestructor = (localName, log) => {
  const callbacks = [];
  let destroyed = false;
  return {
    destroy(error) {
      if (!destroyed) {
        destroyed = true;
        log(`${localName}: Destroying connection`);
        callbacks.forEach((callback) => {
          callback(error);
        });
      }
    },
    onDestroy(callback) {
      destroyed ? callback() : callbacks.push(callback);
    }
  };
};
const createLogger = (debug) => {
  return (...args) => {
    if (debug) {
      console.log("[Penpal]", ...args);
    }
  };
};
const DEFAULT_PORT_BY_PROTOCOL = {
  "http:": "80",
  "https:": "443"
};
const URL_REGEX = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/;
const opaqueOriginSchemes = ["file:", "data:"];
const getOriginFromSrc = (src) => {
  if (src && opaqueOriginSchemes.find((scheme) => src.startsWith(scheme))) {
    return "null";
  }
  const location = document.location;
  const regexResult = URL_REGEX.exec(src);
  let protocol;
  let hostname;
  let port;
  if (regexResult) {
    protocol = regexResult[1] ? regexResult[1] : location.protocol;
    hostname = regexResult[2];
    port = regexResult[4];
  } else {
    protocol = location.protocol;
    hostname = location.hostname;
    port = location.port;
  }
  const portSuffix = port && port !== DEFAULT_PORT_BY_PROTOCOL[protocol] ? `:${port}` : "";
  return `${protocol}//${hostname}${portSuffix}`;
};
const serializeError = ({ name, message, stack }) => ({
  name,
  message,
  stack
});
const deserializeError = (obj) => {
  const deserializedError = new Error();
  Object.keys(obj).forEach((key) => deserializedError[key] = obj[key]);
  return deserializedError;
};
const connectCallReceiver = (info, serializedMethods, log) => {
  const { localName, local, remote, originForSending, originForReceiving } = info;
  let destroyed = false;
  const handleMessageEvent = (event) => {
    if (event.source !== remote || event.data.penpal !== MessageType.Call) {
      return;
    }
    if (originForReceiving !== "*" && event.origin !== originForReceiving) {
      log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);
      return;
    }
    const callMessage = event.data;
    const { methodName, args, id: id2 } = callMessage;
    log(`${localName}: Received ${methodName}() call`);
    const createPromiseHandler = (resolution) => {
      return (returnValue) => {
        log(`${localName}: Sending ${methodName}() reply`);
        if (destroyed) {
          log(`${localName}: Unable to send ${methodName}() reply due to destroyed connection`);
          return;
        }
        const message = {
          penpal: MessageType.Reply,
          id: id2,
          resolution,
          returnValue
        };
        if (resolution === Resolution.Rejected && returnValue instanceof Error) {
          message.returnValue = serializeError(returnValue);
          message.returnValueIsError = true;
        }
        try {
          remote.postMessage(message, originForSending);
        } catch (err) {
          if (err.name === NativeErrorName.DataCloneError) {
            const errorReplyMessage = {
              penpal: MessageType.Reply,
              id: id2,
              resolution: Resolution.Rejected,
              returnValue: serializeError(err),
              returnValueIsError: true
            };
            remote.postMessage(errorReplyMessage, originForSending);
          }
          throw err;
        }
      };
    };
    new Promise((resolve) => resolve(serializedMethods[methodName].apply(serializedMethods, args))).then(createPromiseHandler(Resolution.Fulfilled), createPromiseHandler(Resolution.Rejected));
  };
  local.addEventListener(NativeEventType.Message, handleMessageEvent);
  return () => {
    destroyed = true;
    local.removeEventListener(NativeEventType.Message, handleMessageEvent);
  };
};
let id = 0;
const generateId = () => ++id;
const KEY_PATH_DELIMITER = ".";
const keyPathToSegments = (keyPath) => keyPath ? keyPath.split(KEY_PATH_DELIMITER) : [];
const segmentsToKeyPath = (segments) => segments.join(KEY_PATH_DELIMITER);
const createKeyPath = (key, prefix) => {
  const segments = keyPathToSegments(prefix || "");
  segments.push(key);
  return segmentsToKeyPath(segments);
};
const setAtKeyPath = (subject, keyPath, value) => {
  const segments = keyPathToSegments(keyPath);
  segments.reduce((prevSubject, key, idx) => {
    if (typeof prevSubject[key] === "undefined") {
      prevSubject[key] = {};
    }
    if (idx === segments.length - 1) {
      prevSubject[key] = value;
    }
    return prevSubject[key];
  }, subject);
  return subject;
};
const serializeMethods = (methods, prefix) => {
  const flattenedMethods = {};
  Object.keys(methods).forEach((key) => {
    const value = methods[key];
    const keyPath = createKeyPath(key, prefix);
    if (typeof value === "object") {
      Object.assign(flattenedMethods, serializeMethods(value, keyPath));
    }
    if (typeof value === "function") {
      flattenedMethods[keyPath] = value;
    }
  });
  return flattenedMethods;
};
const deserializeMethods = (flattenedMethods) => {
  const methods = {};
  for (const keyPath in flattenedMethods) {
    setAtKeyPath(methods, keyPath, flattenedMethods[keyPath]);
  }
  return methods;
};
const connectCallSender = (callSender, info, methodKeyPaths, destroyConnection, log) => {
  const { localName, local, remote, originForSending, originForReceiving } = info;
  let destroyed = false;
  log(`${localName}: Connecting call sender`);
  const createMethodProxy = (methodName) => {
    return (...args) => {
      log(`${localName}: Sending ${methodName}() call`);
      let iframeRemoved;
      try {
        if (remote.closed) {
          iframeRemoved = true;
        }
      } catch (e) {
        iframeRemoved = true;
      }
      if (iframeRemoved) {
        destroyConnection();
      }
      if (destroyed) {
        const error = new Error(`Unable to send ${methodName}() call due to destroyed connection`);
        error.code = ErrorCode.ConnectionDestroyed;
        throw error;
      }
      return new Promise((resolve, reject) => {
        const id2 = generateId();
        const handleMessageEvent = (event) => {
          if (event.source !== remote || event.data.penpal !== MessageType.Reply || event.data.id !== id2) {
            return;
          }
          if (originForReceiving !== "*" && event.origin !== originForReceiving) {
            log(`${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`);
            return;
          }
          const replyMessage = event.data;
          log(`${localName}: Received ${methodName}() reply`);
          local.removeEventListener(NativeEventType.Message, handleMessageEvent);
          let returnValue = replyMessage.returnValue;
          if (replyMessage.returnValueIsError) {
            returnValue = deserializeError(returnValue);
          }
          (replyMessage.resolution === Resolution.Fulfilled ? resolve : reject)(returnValue);
        };
        local.addEventListener(NativeEventType.Message, handleMessageEvent);
        const callMessage = {
          penpal: MessageType.Call,
          id: id2,
          methodName,
          args
        };
        remote.postMessage(callMessage, originForSending);
      });
    };
  };
  const flattenedMethods = methodKeyPaths.reduce((api, name) => {
    api[name] = createMethodProxy(name);
    return api;
  }, {});
  Object.assign(callSender, deserializeMethods(flattenedMethods));
  return () => {
    destroyed = true;
  };
};
const handleAckMessageFactory = (serializedMethods, childOrigin, originForSending, destructor, log) => {
  const { destroy, onDestroy } = destructor;
  let destroyCallReceiver;
  let receiverMethodNames;
  const callSender = {};
  return (event) => {
    if (childOrigin !== "*" && event.origin !== childOrigin) {
      log(`Parent: Handshake - Received ACK message from origin ${event.origin} which did not match expected origin ${childOrigin}`);
      return;
    }
    log("Parent: Handshake - Received ACK");
    const info = {
      localName: "Parent",
      local: window,
      remote: event.source,
      originForSending,
      originForReceiving: childOrigin
    };
    if (destroyCallReceiver) {
      destroyCallReceiver();
    }
    destroyCallReceiver = connectCallReceiver(info, serializedMethods, log);
    onDestroy(destroyCallReceiver);
    if (receiverMethodNames) {
      receiverMethodNames.forEach((receiverMethodName) => {
        delete callSender[receiverMethodName];
      });
    }
    receiverMethodNames = event.data.methodNames;
    const destroyCallSender = connectCallSender(callSender, info, receiverMethodNames, destroy, log);
    onDestroy(destroyCallSender);
    return callSender;
  };
};
const handleSynMessageFactory = (log, serializedMethods, childOrigin, originForSending) => {
  return (event) => {
    if (!event.source) {
      return;
    }
    if (childOrigin !== "*" && event.origin !== childOrigin) {
      log(`Parent: Handshake - Received SYN message from origin ${event.origin} which did not match expected origin ${childOrigin}`);
      return;
    }
    log("Parent: Handshake - Received SYN, responding with SYN-ACK");
    const synAckMessage = {
      penpal: MessageType.SynAck,
      methodNames: Object.keys(serializedMethods)
    };
    event.source.postMessage(synAckMessage, originForSending);
  };
};
const CHECK_IFRAME_IN_DOC_INTERVAL = 6e4;
const monitorIframeRemoval = (iframe, destructor) => {
  const { destroy, onDestroy } = destructor;
  const checkIframeInDocIntervalId = setInterval(() => {
    if (!iframe.isConnected) {
      clearInterval(checkIframeInDocIntervalId);
      destroy();
    }
  }, CHECK_IFRAME_IN_DOC_INTERVAL);
  onDestroy(() => {
    clearInterval(checkIframeInDocIntervalId);
  });
};
const startConnectionTimeout = (timeout, callback) => {
  let timeoutId;
  if (timeout !== void 0) {
    timeoutId = window.setTimeout(() => {
      const error = new Error(`Connection timed out after ${timeout}ms`);
      error.code = ErrorCode.ConnectionTimeout;
      callback(error);
    }, timeout);
  }
  return () => {
    clearTimeout(timeoutId);
  };
};
const validateIframeHasSrcOrSrcDoc = (iframe) => {
  if (!iframe.src && !iframe.srcdoc) {
    const error = new Error("Iframe must have src or srcdoc property defined.");
    error.code = ErrorCode.NoIframeSrc;
    throw error;
  }
};
const connectToChild = (options) => {
  let { iframe, methods = {}, childOrigin, timeout, debug = false } = options;
  const log = createLogger(debug);
  const destructor = createDestructor("Parent", log);
  const { onDestroy, destroy } = destructor;
  if (!childOrigin) {
    validateIframeHasSrcOrSrcDoc(iframe);
    childOrigin = getOriginFromSrc(iframe.src);
  }
  const originForSending = childOrigin === "null" ? "*" : childOrigin;
  const serializedMethods = serializeMethods(methods);
  const handleSynMessage = handleSynMessageFactory(log, serializedMethods, childOrigin, originForSending);
  const handleAckMessage = handleAckMessageFactory(serializedMethods, childOrigin, originForSending, destructor, log);
  const promise = new Promise((resolve, reject) => {
    const stopConnectionTimeout = startConnectionTimeout(timeout, destroy);
    const handleMessage = (event) => {
      if (event.source !== iframe.contentWindow || !event.data) {
        return;
      }
      if (event.data.penpal === MessageType.Syn) {
        handleSynMessage(event);
        return;
      }
      if (event.data.penpal === MessageType.Ack) {
        const callSender = handleAckMessage(event);
        if (callSender) {
          stopConnectionTimeout();
          resolve(callSender);
        }
        return;
      }
    };
    window.addEventListener(NativeEventType.Message, handleMessage);
    log("Parent: Awaiting handshake");
    monitorIframeRemoval(iframe, destructor);
    onDestroy((error) => {
      window.removeEventListener(NativeEventType.Message, handleMessage);
      if (error) {
        reject(error);
      }
    });
  });
  return {
    promise,
    destroy() {
      destroy();
    }
  };
};
const WalletSelectorIcons_svelte_svelte_type_style_lang = "";
function create_if_block_3(ctx) {
  let div;
  let svg;
  let rect;
  let path;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        "v-if": true,
        xmlns: true,
        "enable-background": true,
        viewBox: true,
        fill: true,
        class: true
      });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", { fill: true, height: true, width: true });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", { d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "fill", "none");
      attr(rect, "height", "24");
      attr(rect, "width", "24");
      attr(path, "d", "M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z");
      attr(svg, "v-if", "icon === 'close'");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "enable-background", "new 0 0 24 24");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
      attr(svg, "class", "svelte-1c05l0n");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, rect);
      append_hydration(svg, path);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_if_block_2(ctx) {
  let div;
  let svg;
  let path0;
  let path1;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        "v-else-if": true,
        xmlns: true,
        viewBox: true,
        fill: true,
        class: true
      });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", { d: true });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M0 0h24v24H0z");
      attr(path0, "fill", "none");
      attr(path1, "d", "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z");
      attr(svg, "v-else-if", "icon === 'launch'");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
      attr(svg, "class", "svelte-1c05l0n");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let svg;
  let path0;
  let path1;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        "v-else-if": true,
        xmlns: true,
        viewBox: true,
        fill: true,
        class: true
      });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", { d: true });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M0 0h24v24H0z");
      attr(path0, "fill", "none");
      attr(path1, "d", "M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z");
      attr(svg, "v-else-if", "icon === 'plug'");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
      attr(svg, "class", "svelte-1c05l0n");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_if_block$2(ctx) {
  let div;
  let svg;
  let path0;
  let path1;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", {
        "v-else-if": true,
        xmlns: true,
        viewBox: true,
        fill: true,
        class: true
      });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", { d: true });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M0 0h24v24H0V0z");
      attr(path0, "fill", "none");
      attr(path1, "d", "M18 14.49V9c0-1-1.01-2.01-2-2V3h-2v4h-4V3H8v2.48l9.51 9.5.49-.49zm-1.76 1.77L7.2 7.2l-.01.01L3.98 4 2.71 5.25l3.36 3.36C6.04 8.74 6 8.87 6 9v5.48L9.5 18v3h5v-3l.48-.48L19.45 22l1.26-1.28-4.47-4.46z");
      attr(svg, "v-else-if", "icon === 'unplug'");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "currentColor");
      attr(svg, "class", "svelte-1c05l0n");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_fragment$2(ctx) {
  let button;
  let div;
  let t0;
  let t1;
  let t2;
  let t3;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[0] === "close" && create_if_block_3();
  let if_block1 = ctx[0] === "launch" && create_if_block_2();
  let if_block2 = ctx[0] === "plug" && create_if_block_1();
  let if_block3 = ctx[0] === "unplug" && create_if_block$2();
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      button = element("button");
      div = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      t2 = space();
      if (if_block3)
        if_block3.c();
      t3 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      div = claim_element(button_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block0)
        if_block0.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      t1 = claim_space(div_nodes);
      if (if_block2)
        if_block2.l(div_nodes);
      t2 = claim_space(div_nodes);
      if (if_block3)
        if_block3.l(div_nodes);
      div_nodes.forEach(detach);
      t3 = claim_space(button_nodes);
      if (default_slot)
        default_slot.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "img-container svelte-1c05l0n");
      attr(button, "class", "svelte-1c05l0n");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, div);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t0);
      if (if_block1)
        if_block1.m(div, null);
      append_hydration(div, t1);
      if (if_block2)
        if_block2.m(div, null);
      append_hydration(div, t2);
      if (if_block3)
        if_block3.m(div, null);
      append_hydration(button, t3);
      if (default_slot) {
        default_slot.m(button, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[0] === "close") {
        if (if_block0) {
          if (dirty & 1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3();
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
      if (ctx2[0] === "launch") {
        if (if_block1) {
          if (dirty & 1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2();
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
      if (ctx2[0] === "plug") {
        if (if_block2) {
          if (dirty & 1) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1();
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, t2);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (ctx2[0] === "unplug") {
        if (if_block3) {
          if (dirty & 1) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block$2();
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(div, null);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
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
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(if_block3);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(if_block3);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { icon } = $$props;
  const dispatch = createEventDispatcher();
  const click_handler = () => dispatch("click", "detail value");
  $$self.$$set = ($$props2) => {
    if ("icon" in $$props2)
      $$invalidate(0, icon = $$props2.icon);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [icon, dispatch, $$scope, slots, click_handler];
}
class WalletSelectorIcons extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { icon: 0 });
  }
}
const ConnectorInside_svelte_svelte_type_style_lang = "";
const { window: window_1 } = globals;
function create_if_block$1(ctx) {
  let div;
  let iconbutton;
  let div_class_value;
  let div_transition;
  let current;
  iconbutton = new WalletSelectorIcons({ props: { icon: ctx[12] } });
  iconbutton.$on("click", ctx[15]);
  return {
    c() {
      div = element("div");
      create_component(iconbutton.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(iconbutton.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a;
      attr(div, "class", div_class_value = null_to_empty(!((_a = ctx[0]) == null ? void 0 : _a.keepPopup) ? "action dim" : "action") + " svelte-hxe3ne");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(iconbutton, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      var _a;
      const iconbutton_changes = {};
      if (dirty & 4096)
        iconbutton_changes.icon = ctx2[12];
      iconbutton.$set(iconbutton_changes);
      if (!current || dirty & 1 && div_class_value !== (div_class_value = null_to_empty(!((_a = ctx2[0]) == null ? void 0 : _a.keepPopup) ? "action dim" : "action") + " svelte-hxe3ne")) {
        attr(div, "class", div_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, { delay: 100, duration: 100 }, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(iconbutton);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_default_slot$1(ctx) {
  let span;
  let t_value = ctx[10].loading || !ctx[6] ? "Loading..." : "Load";
  let t;
  let span_class_value;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t = claim_text(span_nodes, t_value);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a;
      attr(span, "class", span_class_value = null_to_empty(((_a = ctx[0]) == null ? void 0 : _a.address) ? " connected " : " disconnected ") + " svelte-hxe3ne");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t);
    },
    p(ctx2, dirty) {
      var _a;
      if (dirty & 1088 && t_value !== (t_value = ctx2[10].loading || !ctx2[6] ? "Loading..." : "Load"))
        set_data(t, t_value);
      if (dirty & 1 && span_class_value !== (span_class_value = null_to_empty(((_a = ctx2[0]) == null ? void 0 : _a.address) ? " connected " : " disconnected ") + " svelte-hxe3ne")) {
        attr(span, "class", span_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_fragment$1(ctx) {
  var _a;
  let div6;
  let div4;
  let a;
  let div0;
  let logo;
  let t0;
  let div1;
  let input;
  let t1;
  let span;
  let t2;
  let div3;
  let t3;
  let div2;
  let iconbutton;
  let div2_class_value;
  let div4_resize_listener;
  let t4;
  let div5;
  let iframe_1;
  let iframe_1_src_value;
  let div5_resize_listener;
  let current;
  let mounted;
  let dispose;
  logo = new Logo({});
  let if_block = (((_a = ctx[0]) == null ? void 0 : _a.address) || ctx[1]) && create_if_block$1(ctx);
  iconbutton = new WalletSelectorIcons({
    props: {
      icon: ctx[11],
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  iconbutton.$on("click", ctx[23]);
  return {
    c() {
      div6 = element("div");
      div4 = element("div");
      a = element("a");
      div0 = element("div");
      create_component(logo.$$.fragment);
      t0 = space();
      div1 = element("div");
      input = element("input");
      t1 = space();
      span = element("span");
      t2 = space();
      div3 = element("div");
      if (if_block)
        if_block.c();
      t3 = space();
      div2 = element("div");
      create_component(iconbutton.$$.fragment);
      t4 = space();
      div5 = element("div");
      iframe_1 = element("iframe");
      this.h();
    },
    l(nodes) {
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      div4 = claim_element(div6_nodes, "DIV", { class: true, style: true });
      var div4_nodes = children(div4);
      a = claim_element(div4_nodes, "A", { href: true, target: true, rel: true });
      var a_nodes = children(a);
      div0 = claim_element(a_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(logo.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      a_nodes.forEach(detach);
      t0 = claim_space(div4_nodes);
      div1 = claim_element(div4_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      input = claim_element(div1_nodes, "INPUT", { class: true, placeholder: true });
      t1 = claim_space(div1_nodes);
      span = claim_element(div1_nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      div1_nodes.forEach(detach);
      t2 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      if (if_block)
        if_block.l(div3_nodes);
      t3 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      claim_component(iconbutton.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t4 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", { class: true, style: true });
      var div5_nodes = children(div5);
      iframe_1 = claim_element(div5_nodes, "IFRAME", {
        title: true,
        src: true,
        allow: true,
        class: true
      });
      children(iframe_1).forEach(detach);
      div5_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a2, _b;
      attr(div0, "class", "actions logo svelte-hxe3ne");
      attr(a, "href", "https://PeerPiper.io");
      attr(a, "target", "_blank");
      attr(a, "rel", "noreferrer");
      attr(input, "class", "url svelte-hxe3ne");
      attr(input, "placeholder", placeholder);
      attr(span, "class", "green-line svelte-hxe3ne");
      attr(div1, "class", "url-input-container svelte-hxe3ne");
      attr(div2, "class", div2_class_value = null_to_empty(((_a2 = ctx[10]) == null ? void 0 : _a2.loading) ? "action dim" : ((_b = ctx[0]) == null ? void 0 : _b.address) ? " connected " : " disconnected ") + " svelte-hxe3ne");
      attr(div3, "class", "actions svelte-hxe3ne");
      attr(div4, "class", "top svelte-hxe3ne");
      set_style(div4, "--topOffsetHeight", ctx[2]);
      add_render_callback(() => ctx[24].call(div4));
      attr(iframe_1, "title", "Web Wallet");
      if (!src_url_equal(iframe_1.src, iframe_1_src_value = ctx[6]))
        attr(iframe_1, "src", iframe_1_src_value);
      attr(iframe_1, "allow", "clipboard-read 'self' 'src'; clipboard-write 'self' 'src';");
      attr(iframe_1, "class", "svelte-hxe3ne");
      attr(div5, "class", "iframe svelte-hxe3ne");
      set_style(div5, "height", "calc(" + ctx[4] + "px + 18px)");
      add_render_callback(() => ctx[26].call(div5));
      attr(div6, "class", "connector-container svelte-hxe3ne");
    },
    m(target, anchor) {
      insert_hydration(target, div6, anchor);
      append_hydration(div6, div4);
      append_hydration(div4, a);
      append_hydration(a, div0);
      mount_component(logo, div0, null);
      append_hydration(div4, t0);
      append_hydration(div4, div1);
      append_hydration(div1, input);
      set_input_value(input, ctx[1]);
      append_hydration(div1, t1);
      append_hydration(div1, span);
      append_hydration(div4, t2);
      append_hydration(div4, div3);
      if (if_block)
        if_block.m(div3, null);
      append_hydration(div3, t3);
      append_hydration(div3, div2);
      mount_component(iconbutton, div2, null);
      div4_resize_listener = add_resize_listener(div4, ctx[24].bind(div4));
      append_hydration(div6, t4);
      append_hydration(div6, div5);
      append_hydration(div5, iframe_1);
      ctx[25](iframe_1);
      div5_resize_listener = add_resize_listener(div5, ctx[26].bind(div5));
      current = true;
      if (!mounted) {
        dispose = [
          listen(window_1, "keydown", ctx[16]),
          listen(input, "focus", ctx[20]),
          listen(input, "blur", ctx[21]),
          listen(input, "input", ctx[22]),
          listen(input, "input", function() {
            if (is_function(ctx[8]))
              ctx[8].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      var _a2, _b, _c;
      ctx = new_ctx;
      if (dirty & 2 && input.value !== ctx[1]) {
        set_input_value(input, ctx[1]);
      }
      if (((_a2 = ctx[0]) == null ? void 0 : _a2.address) || ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & 3) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div3, t3);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const iconbutton_changes = {};
      if (dirty & 2048)
        iconbutton_changes.icon = ctx[11];
      if (dirty & 1073742913) {
        iconbutton_changes.$$scope = { dirty, ctx };
      }
      iconbutton.$set(iconbutton_changes);
      if (!current || dirty & 1025 && div2_class_value !== (div2_class_value = null_to_empty(((_b = ctx[10]) == null ? void 0 : _b.loading) ? "action dim" : ((_c = ctx[0]) == null ? void 0 : _c.address) ? " connected " : " disconnected ") + " svelte-hxe3ne")) {
        attr(div2, "class", div2_class_value);
      }
      if (!current || dirty & 4) {
        set_style(div4, "--topOffsetHeight", ctx[2]);
      }
      if (!current || dirty & 64 && !src_url_equal(iframe_1.src, iframe_1_src_value = ctx[6])) {
        attr(iframe_1, "src", iframe_1_src_value);
      }
      if (!current || dirty & 16) {
        set_style(div5, "height", "calc(" + ctx[4] + "px + 18px)");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(logo.$$.fragment, local);
      transition_in(if_block);
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(logo.$$.fragment, local);
      transition_out(if_block);
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div6);
      destroy_component(logo);
      if (if_block)
        if_block.d();
      destroy_component(iconbutton);
      div4_resize_listener();
      ctx[25](null);
      div5_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
let placeholder = "Enter Wallet Url";
const INPUT_URL = "INPUT_URL";
function instance$1($$self, $$props, $$invalidate) {
  let popupIcon;
  let connectionIcon;
  let { wallet = null } = $$props;
  let { inputUrl = "https://peerpiper.github.io/iframe-wallet-sdk/" } = $$props;
  let { topOffsetHeight = 0 } = $$props;
  let { topOffsetWidth = 0 } = $$props;
  let { iframeParentHeight = 0 } = $$props;
  let { iframeParentWidth = 0 } = $$props;
  let iframeOffsetWidth;
  let { show } = $$props;
  let { hide } = $$props;
  const dispatch = createEventDispatcher();
  let src;
  let iframe;
  let focused;
  let saveInputURL;
  const data = {
    loading: true
  };
  onMount(async () => {
    const { ImmortalDB } = await __vitePreload(() => import("./index-f3824ee7.js"), true ? [] : void 0);
    $$invalidate(8, saveInputURL = async () => {
      try {
        await ImmortalDB.set(INPUT_URL, src);
      } catch (error) {
        console.warn("Did not save", src, error);
      }
    });
    try {
      const storedValue = await ImmortalDB.get(INPUT_URL, null);
      if (storedValue) {
        $$invalidate(1, inputUrl = storedValue);
      }
    } catch (error) {
      console.warn("Did not get", error);
    }
    connect();
  });
  async function handleIframeLoad() {
    $$invalidate(10, data.loading = false, data);
    let pending;
    const connection = connectToChild({
      iframe,
      methods: {
        setIframeParentHeight(height) {
          $$invalidate(4, iframeParentHeight = height);
        },
        setIframeParentWidth(width) {
          $$invalidate(17, iframeParentWidth = width);
        },
        show() {
          show();
        },
        hide() {
          hide();
        },
        walletReady() {
          $$invalidate(0, wallet = pending);
          dispatch("walletReady", { wallet });
          window.arweaveWallet = wallet.arweaveWalletAPI;
          return true;
        }
      }
    });
    pending = await connection.promise;
    show();
  }
  const connect = () => {
    if (src === inputUrl)
      return;
    $$invalidate(6, src = "");
    $$invalidate(6, src = inputUrl);
    $$invalidate(10, data.loading = true, data);
  };
  const disconnect = () => wallet.disconnect();
  const togglePopup = () => window.open(inputUrl);
  function handleKeydown(event) {
    if (event.key === "Enter" && focused)
      connect();
  }
  const focus_handler = () => $$invalidate(9, focused = true);
  const blur_handler = () => $$invalidate(9, focused = false);
  function input_input_handler() {
    inputUrl = this.value;
    $$invalidate(1, inputUrl);
  }
  const click_handler = () => {
    (wallet == null ? void 0 : wallet.address) ? disconnect() : connect();
  };
  function div4_elementresize_handler() {
    topOffsetHeight = this.offsetHeight;
    topOffsetWidth = this.offsetWidth;
    $$invalidate(2, topOffsetHeight);
    $$invalidate(3, topOffsetWidth);
  }
  function iframe_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      iframe = $$value;
      $$invalidate(7, iframe);
    });
  }
  function div5_elementresize_handler() {
    iframeOffsetWidth = this.offsetWidth;
    $$invalidate(5, iframeOffsetWidth);
  }
  $$self.$$set = ($$props2) => {
    if ("wallet" in $$props2)
      $$invalidate(0, wallet = $$props2.wallet);
    if ("inputUrl" in $$props2)
      $$invalidate(1, inputUrl = $$props2.inputUrl);
    if ("topOffsetHeight" in $$props2)
      $$invalidate(2, topOffsetHeight = $$props2.topOffsetHeight);
    if ("topOffsetWidth" in $$props2)
      $$invalidate(3, topOffsetWidth = $$props2.topOffsetWidth);
    if ("iframeParentHeight" in $$props2)
      $$invalidate(4, iframeParentHeight = $$props2.iframeParentHeight);
    if ("iframeParentWidth" in $$props2)
      $$invalidate(17, iframeParentWidth = $$props2.iframeParentWidth);
    if ("show" in $$props2)
      $$invalidate(18, show = $$props2.show);
    if ("hide" in $$props2)
      $$invalidate(19, hide = $$props2.hide);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 320) {
      src && saveInputURL && saveInputURL();
    }
    if ($$self.$$.dirty & 128) {
      iframe && iframe.addEventListener("load", handleIframeLoad);
    }
    if ($$self.$$.dirty & 1) {
      $$invalidate(12, popupIcon = (wallet == null ? void 0 : wallet.keepPopup) ? "close" : "launch");
    }
    if ($$self.$$.dirty & 1) {
      $$invalidate(11, connectionIcon = (wallet == null ? void 0 : wallet.address) ? "unplug" : "plug");
    }
    if ($$self.$$.dirty & 33) {
      iframeOffsetWidth && wallet && (wallet == null ? void 0 : wallet.setWidth(iframeOffsetWidth));
    }
  };
  return [
    wallet,
    inputUrl,
    topOffsetHeight,
    topOffsetWidth,
    iframeParentHeight,
    iframeOffsetWidth,
    src,
    iframe,
    saveInputURL,
    focused,
    data,
    connectionIcon,
    popupIcon,
    connect,
    disconnect,
    togglePopup,
    handleKeydown,
    iframeParentWidth,
    show,
    hide,
    focus_handler,
    blur_handler,
    input_input_handler,
    click_handler,
    div4_elementresize_handler,
    iframe_1_binding,
    div5_elementresize_handler
  ];
}
class ConnectorInside extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      wallet: 0,
      inputUrl: 1,
      topOffsetHeight: 2,
      topOffsetWidth: 3,
      iframeParentHeight: 4,
      iframeParentWidth: 17,
      show: 18,
      hide: 19
    });
  }
}
function create_if_block(ctx) {
  let menuwrapper;
  let current;
  menuwrapper = new MenuWrapper({
    props: {
      $$slots: {
        default: [
          create_default_slot,
          ({ openNav, hideNav }) => ({ 5: openNav, 6: hideNav }),
          ({ openNav, hideNav }) => (openNav ? 32 : 0) | (hideNav ? 64 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(menuwrapper.$$.fragment);
    },
    l(nodes) {
      claim_component(menuwrapper.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(menuwrapper, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const menuwrapper_changes = {};
      if (dirty & 227) {
        menuwrapper_changes.$$scope = { dirty, ctx: ctx2 };
      }
      menuwrapper.$set(menuwrapper_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menuwrapper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuwrapper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuwrapper, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let connectorinside;
  let updating_wallet;
  let current;
  function connectorinside_wallet_binding(value) {
    ctx[3](value);
  }
  let connectorinside_props = {
    inputUrl: ctx[1],
    show: ctx[5],
    hide: ctx[6]
  };
  if (ctx[0] !== void 0) {
    connectorinside_props.wallet = ctx[0];
  }
  connectorinside = new ConnectorInside({ props: connectorinside_props });
  binding_callbacks.push(() => bind(connectorinside, "wallet", connectorinside_wallet_binding));
  connectorinside.$on("walletReady", ctx[4]);
  return {
    c() {
      create_component(connectorinside.$$.fragment);
    },
    l(nodes) {
      claim_component(connectorinside.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(connectorinside, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const connectorinside_changes = {};
      if (dirty & 2)
        connectorinside_changes.inputUrl = ctx2[1];
      if (dirty & 32)
        connectorinside_changes.show = ctx2[5];
      if (dirty & 64)
        connectorinside_changes.hide = ctx2[6];
      if (!updating_wallet && dirty & 1) {
        updating_wallet = true;
        connectorinside_changes.wallet = ctx2[0];
        add_flush_callback(() => updating_wallet = false);
      }
      connectorinside.$set(connectorinside_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(connectorinside.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(connectorinside.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(connectorinside, detaching);
    }
  };
}
function create_fragment(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[2] && create_if_block(ctx);
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
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
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
function instance($$self, $$props, $$invalidate) {
  let { inputUrl } = $$props;
  let { wallet = null } = $$props;
  let mounted;
  onMount(() => {
    $$invalidate(2, mounted = true);
  });
  function connectorinside_wallet_binding(value) {
    wallet = value;
    $$invalidate(0, wallet);
  }
  function walletReady_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("inputUrl" in $$props2)
      $$invalidate(1, inputUrl = $$props2.inputUrl);
    if ("wallet" in $$props2)
      $$invalidate(0, wallet = $$props2.wallet);
  };
  return [wallet, inputUrl, mounted, connectorinside_wallet_binding, walletReady_handler];
}
class Web3WalletMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { inputUrl: 1, wallet: 0 });
  }
}
const Web3WalletMenu$1 = Web3WalletMenu;
export {
  Web3WalletMenu$1 as Web3WalletMenu
};
//# sourceMappingURL=index-d83d174c.js.map
