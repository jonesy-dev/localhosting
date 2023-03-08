// import defaultData from '/src/data/defaultProviders.json';
import defaultData from './src/data/defaultProviders.json';

chrome.runtime.onInstalled.addListener(() => {
  // push default provider data into appProviders array
  let defaultServices = defaultData.providerGroup;

  chrome.storage.local.set({ appProviders: defaultServices }).then(() => {
    console.log('>>> Localstore', defaultServices);
  });
});
