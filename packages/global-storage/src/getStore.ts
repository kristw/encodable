import Store from './Store';

declare global {
  interface Window {
    __SINGLETON_STORE_COUNT__: number | undefined;
  }
}

export const COUNTER = '__SINGLETON_STORE_COUNT__';

let store: Store | undefined;

/**
 * Retrive the singleton store
 */
export default function getStore() {
  if (typeof store === 'undefined') {
    const oldCount = window[COUNTER];
    if (typeof oldCount === 'number') {
      // eslint-disable-next-line no-console
      console.warn(
        `Found ${oldCount} existing instance(s) of global-storage. This may cause unexpected behaviors. There should be only one global-storage in your node_modules. Check your dependencies. All libraries should list global-storage as peerDependencies and only install it as dependencies at the application level.`,
      );
      window[COUNTER] = oldCount + 1;
    } else {
      window[COUNTER] = 1;
    }

    store = new Store();
  }
  return store;
}

/**
 * Only expose for testing
 * Do not use if you don't know what you are doing.
 */
export function dangerouslyResetStore() {
  store = undefined;
}
