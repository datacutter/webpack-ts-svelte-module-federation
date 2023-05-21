declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: any };

/**
 * Load component
 * @param scope 
 * @param module 
 * @returns {Promise<T | undefined>}
 */
export default async function loadComponent<T>(scope: string, module: string): Promise<T | undefined> {
  // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');
  const container = (window as any)[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const Module = factory();
  return Module;
}