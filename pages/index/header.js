//Getting the JSON file header.json and its data.
async function fetchHeaderData() {
  const response = await fetch('../../data/header.json');
  const headerData = await response.json();
  console.log(headerData);
  return headerData;
}
//This function uses the data and creates the elements for the header.
function createNavigation(headerData) {
  const navigationContainer = document.querySelector('#navigation-menu');

  //Creates a nav element
  const nav = document.createElement('nav');
  nav.className = 'main-nav';

  //left side of navigation with logo and name
  const leftSection = document.createElement('div');
  leftSection.className = 'nav-left';

  const logoLink = document.createElement('a');
  logoLink.href = '/index.html';

  const logo = document.createElement('img');
  logo.src = headerData.header.mainHeader.logo;
  logo.alt = headerData.header.mainHeader.alt;
  logo.className = 'nav-logo';

  logoLink.appendChild(logo);

  const brandNameLink = document.createElement('a');
  brandNameLink.href = '/index.html';

  const brandName = document.createElement('span');
  brandName.className = 'brand-name';
  brandName.textContent = headerData.header.mainHeader.brandName;

  brandNameLink.appendChild(brandName);

  leftSection.appendChild(logoLink);
  leftSection.appendChild(brandNameLink);
  //the right section of the navigation meny with the hamburger menu, and its overlay on click.
  const rightSection = document.createElement('div');
  rightSection.className = 'nav-right';

  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.className = 'hamburger-btn';
  hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';

  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  menuOverlay.style.display = 'none'; //Added this just so the hamburger menu i closed by default. This will probably be handled by SCSS in the future.

  const overlayBlur = document.createElement('div');
  overlayBlur.className = 'overlay-blur';

  const overlayLogoContainer = document.createElement('div');
  overlayLogoContainer.className = 'overlay-logo';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  menuOverlay.appendChild(closeBtn);

  const overlayLogo = document.createElement('img');
  overlayLogo.src = headerData.header.hamburgerMenu.menuLogo;
  overlayLogo.alt = headerData.header.mainHeader.alt;
  overlayLogo.className = 'overlay-logo';

  overlayLogoContainer.appendChild(overlayLogo);
  menuOverlay.appendChild(overlayLogoContainer);

  const menuLinks = document.createElement('ul');
  menuLinks.className = 'menu-links';
  //This loops through each link from the JSON file, and creates <li> elements for each link. Also adds the correct text.
  headerData.header.hamburgerMenu.menuLinks.forEach((link) => {
    const menuItem = document.createElement('li');
    const menuLink = document.createElement('a');
    //Using a switch that adds the href attribute depending on the link text. This can be updated when we get more webpages online.
    switch (link.text) {
      case 'Om oss':
        menuLink.href = '/pages/about/about.html';
        break;
      case 'Barnkalas':
        menuLink.href = '/pages/kids/kids.html';
        break;
      default:
        menuLink.href = '#';
    }

    menuLink.textContent = link.text;
    menuItem.appendChild(menuLink);
    menuLinks.appendChild(menuItem);
  });

  menuOverlay.appendChild(menuLinks);

  hamburgerBtn.addEventListener('click', () => {
    menuOverlay.style.display = 'block';
    overlayBlur.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    menuOverlay.style.display = 'none';
    overlayBlur.classList.remove('active');
  });

  overlayBlur.addEventListener('click', () => {
    menuOverlay.style.display = 'none';
    overlayBlur.classList.remove('active');
  });
  //appending the different elements thats been created above.
  rightSection.appendChild(hamburgerBtn);
  nav.appendChild(leftSection);
  nav.appendChild(rightSection);
  navigationContainer.appendChild(nav);
  navigationContainer.appendChild(menuOverlay);
  navigationContainer.appendChild(overlayBlur);
}
//
export async function initHeader() {
  const headerData = await fetchHeaderData();
  createNavigation(headerData);
}
