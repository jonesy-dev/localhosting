import defaultColorsData from '../data/defaultColors.json';
import Sortable from 'sortablejs';

let providerList = document.querySelector('.providerList');
let providerHead = document.querySelector('.providerHead');
let defaultColors = defaultColorsData.defaultColors;

chrome.storage.local.get(['appProviders']).then((res) => {
  let appProviders = res.appProviders;
  // console.log('Localstore >>>', appProviders);

  for (let i = 0; i < appProviders?.length; i++) {
    let portComp = document.createElement('div');
    portComp.classList.add('portComp');
    portComp.dataset.id = appProviders[i].dataID;
    // portComp.style.backgroundColor = defaultColors[i];

    // create sections within port component
    let portCompHandle = document.createElement('i');
    portCompHandle.classList.add('portCompHandle', 'bi', 'bi-grip-vertical');
    let portProvider = document.createElement('span');
    portProvider.classList.add('portProvider');
    let portNumber = document.createElement('span');
    portNumber.classList.add('portNumber');
    let portCompInner = document.createElement('span');
    portCompInner.classList.add('portCompInner');

    // create content within each section
    portProvider.textContent = appProviders[i].provider;
    portNumber.textContent = appProviders[i].port;

    // assemble the port components
    portCompInner.appendChild(portProvider);
    portComp.appendChild(portCompHandle);
    portComp.appendChild(portCompInner);
    portComp.appendChild(portNumber);
    providerList.appendChild(portComp);
  }

  let provList = document.querySelector('.provList');
  for (let i = 0; i < appProviders?.length; i++) {
    let provComp = document.createElement('div');
    provComp.classList.add('provComp');
    let provAlias = document.createElement('input');
    provAlias.classList.add('provAlias');
    provAlias.type = 'text';
    provAlias.value = appProviders[i].provider;
    provAlias.setAttribute('disabled', '');
    let provPort = document.createElement('input');
    provPort.classList.add('provPort');
    provPort.type = 'number';
    provPort.value = appProviders[i].port;
    provPort.setAttribute('disabled', '');
    //
    provComp.appendChild(provAlias);
    provComp.appendChild(provPort);
    provList.appendChild(provComp);
  }
});

// controls for modifying providers
let providerListActions = document.createElement('div');
providerListActions.classList.add('providerListActions');

let editProvidersWrap = document.createElement('div');
editProvidersWrap.classList.add('editProvidersWrap');

let modifyStatusLabel = document.createElement('span');
modifyStatusLabel.classList.add('modifyStatusLabel');
modifyStatusLabel.textContent = '[read-only]';

let modifyButton = document.createElement('button');
modifyButton.classList.add('modifyButton');
modifyButton.type = 'button';
modifyButton.textContent = 'Modify list';

// assemble comps
providerHead.appendChild(modifyStatusLabel);
providerListActions.appendChild(editProvidersWrap);
providerListActions.appendChild(modifyButton);
providerList.insertAdjacentElement('beforebegin', providerListActions);

// sortable
let sortableProviders = document.querySelector('.providerList');
// let sortable = Sortable.create(sortableProviders, {
//   handle: '.portCompHandle',
//   ghostClass: 'ghost',
//   onUpdate: () => {
//     let updatedAppProviders = sortable.toArray();

//     chrome.storage.local.set({ appProviders: updatedAppProviders }).then(() => console.log('update >>', updatedAppProviders));
//   },
// });

// modify statements
let modifyEnabled = false;

const modifyProviders = () => {
  modifyEnabled = !modifyEnabled;
  console.log('modifyEnabled', modifyEnabled);
  //
  let modifyButtonDynamicText = modifyButton.textContent;
  modifyButton.textContent = modifyButtonDynamicText === 'Save changes' ? 'Modify list' : 'Save changes';
  //
  let modifyStatusLabelDynamicText = modifyStatusLabel.textContent;
  modifyStatusLabel.textContent = modifyStatusLabelDynamicText === '[read-only]' ? '[modifying]' : '[read-only]';
  //
  const modifiable = document.querySelectorAll('.modifyStatusLabel, .modifyButton, .providerList, .portComp, .portCompHandle');
  for (const element of modifiable) {
    element.classList.toggle('modifying');
  }
};

modifyButton.addEventListener('click', modifyProviders);
