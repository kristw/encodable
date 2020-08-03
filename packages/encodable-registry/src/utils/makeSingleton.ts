/**
 * Helper function for creating a singleton
 * @param create factory function
 */
export default function makeSingleton<T>(create: () => T) {
  let singleton: T | undefined;

  return function getInstance() {
    if (typeof singleton === 'undefined') {
      singleton = create();
    }
    return singleton;
  };
}
