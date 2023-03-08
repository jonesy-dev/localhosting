import defaultColorsData from '../data/defaultColors.json';

// consts for prefixing before port numbers
const PROTOCOL = 'http://';
const LOCALHOST_TEXT = 'localhost:';
const PREFIX_PORT = PROTOCOL + LOCALHOST_TEXT;

chrome.storage.local.get(['appProviders']).then((res) => {
  console.log(res.appProviders);
  let appProviders = res.appProviders;
  //

  let defaultColors = defaultColorsData.defaultColors;
  for (let i = 0; i < appProviders?.length; i++) {
    let portGroup = document.querySelector('.portGroup');
    let portComp = document.createElement('div');
    portComp.classList.add('portComp');
    portComp.style.backgroundColor = defaultColors[i];

    // create sections within port component
    let portOptions = document.createElement('span');
    portOptions.classList.add('portOptions');
    let portProvider = document.createElement('span');
    portProvider.classList.add('portProvider');
    let portNumber = document.createElement('span');
    portNumber.classList.add('portNumber');
    let portCompInner = document.createElement('span');
    portCompInner.classList.add('portCompInner');

    // create content within each section

    // portOptions
    let openInNewTab = document.createElement('i');
    openInNewTab.classList.add('openInNewTab', 'bi', 'bi-box-arrow-up-right');
    // portProvider
    portProvider.textContent = appProviders[i].provider;
    // portNumber
    portNumber.textContent = appProviders[i].port;

    // assemble the port components
    portOptions.appendChild(openInNewTab);
    portCompInner.appendChild(portOptions);
    portCompInner.appendChild(portProvider);
    // portComp.appendChild(portOptions);
    // portComp.appendChild(portProvider);
    portComp.appendChild(portCompInner);
    portComp.appendChild(portNumber);
    portGroup.appendChild(portComp);
  }
});

// click events for port components
let portCompGroup = document.querySelectorAll('.portComp');

portCompGroup.forEach((link) => {
  link.addEventListener('click', function handleClick(event) {
    let getClickedPortClass = link.querySelector('.portNumber');
    let getClickedProviderClass = link.querySelector('.portProvider');
    let getPortString = getClickedPortClass.textContent;
    let getProviderString = getClickedProviderClass.textContent;
    let portID = parseInt(getPortString);
    let color = link.style.backgroundColor;
    console.log(getProviderString);

    chrome.tabs.update({
      url: `${PREFIX_PORT + portID}`,
    });

    chrome.action.setBadgeBackgroundColor({ color: `${color}` });
    chrome.action.setBadgeText({ text: `${portID}` });
    // chrome.action.setTitle({ title: `` });
  });
});

// option page link
document.querySelector('.configLink').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('config.html'));
  }
});
