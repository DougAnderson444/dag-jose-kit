import { _ as __vitePreload } from "./preload-helper-fe81da0e.js";
import { S as SvelteComponent, i as init, s as safe_not_equal, o as onMount, a3 as onDestroy } from "./index-ef46e954.js";
function instance($$self, $$props, $$invalidate) {
  let { opts = {} } = $$props;
  let { hypnsNode = null } = $$props;
  let HyPNS;
  onMount(async () => {
    HyPNS = await __vitePreload(() => import("./hypns-bundle-4f2fbde4.js").then((n) => n.h), true ? ["_app/immutable/chunks/hypns-bundle-4f2fbde4.js","_app/immutable/chunks/index-396531f4.js","_app/immutable/chunks/preload-helper-fe81da0e.js","_app/immutable/chunks/index-ef46e954.js"] : void 0);
    if (HyPNS.default)
      HyPNS = HyPNS.default;
    if (!opts) {
      let wsProxy = ["wss://hyperswarm.mauve.moe"];
      $$invalidate(0, opts = {
        persist: true,
        swarmOpts: { announceLocalAddress: true, wsProxy }
      });
    }
    const node = new HyPNS(opts);
    await node.init();
    $$invalidate(1, hypnsNode = node);
    const terminationEvent = "onpagehide" in self ? "pagehide" : "unload";
    addEventListener(
      terminationEvent,
      async (event) => {
        await hypnsNode.close();
      },
      {
        capture: true
      }
    );
    try {
      const mod = await __vitePreload(() => import("./adapter_core-919699b9.js"), true ? [] : void 0);
      const adapter = mod.default;
    } catch (error) {
      console.warn("WebRTC adapter not found.");
    }
  });
  onDestroy(async () => {
    try {
      await hypnsNode.close();
    } catch (error) {
      console.log("Closed undefined Hypns component. ");
    }
  });
  $$self.$$set = ($$props2) => {
    if ("opts" in $$props2)
      $$invalidate(0, opts = $$props2.opts);
    if ("hypnsNode" in $$props2)
      $$invalidate(1, hypnsNode = $$props2.hypnsNode);
  };
  return [opts, hypnsNode];
}
class Component extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, null, safe_not_equal, { opts: 0, hypnsNode: 1 });
  }
}
const Component$1 = Component;
export {
  Component$1 as default
};
//# sourceMappingURL=index-5149353b.js.map
