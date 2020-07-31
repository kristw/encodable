export default function makeSingleton<T>(create: () => T) {
  let singleton: T | undefined;

  return function getInstance() {
    if (typeof singleton === 'undefined') {
      singleton = create();
    }
    return singleton;
  };
}
