import './header.css';
import { BaseComponent } from '../baseComponent';
import { categoryNameList } from '../../appSettings';

// create one menu item
function createMenuList(categoryName: string): HTMLElement {
  // Name can contain only one word
  const newMenuItem = new BaseComponent('li', ['nav-item', 'sidebar-menu__item']);
  const newMenuItemLink = new BaseComponent('a', ['nav-link']);
  newMenuItemLink.element.setAttribute('href', `#${categoryName.split(' ')[0].toLowerCase()}`);
  newMenuItemLink.element.innerText = `${categoryName}`;
  newMenuItem.element.appendChild(newMenuItemLink.render());
  return newMenuItem.render();
}

function openSidebar(): void {
  const sidebarMenu = document.querySelector('.sidebar-menu__list') as HTMLElement;
  const sidebarMenuOverlay = document.querySelector('.sidebar-menu__overlay') as HTMLElement;
  sidebarMenu.style.width = '300px';
  sidebarMenuOverlay.style.display = 'block';
}

function closeSidebar(): void {
  const sidebarMenu = document.querySelector('.sidebar-menu__list') as HTMLElement;
  const sidebarMenuOverlay = document.querySelector('.sidebar-menu__overlay') as HTMLElement;
  sidebarMenu.style.width = '0';
  sidebarMenuOverlay.style.display = 'none';
}

export class Header extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement | null) {
    super('header', ['header']);
    // todo sidebar navigation menu
    const navigation = new BaseComponent('nav', ['sidebar-menu']);
    const navigationList = new BaseComponent('ul', ['sidebar-menu__list', 'nav', 'flex-column']);
    const navigationCloseBtn = new BaseComponent('button', ['btn', 'btn-menu']);
    const navigationOverlay = new BaseComponent('div', ['sidebar-menu__overlay']);
    navigationCloseBtn.element.setAttribute('id', 'sidebar-menu__btn-close');
    navigationCloseBtn.element.innerText = 'Close Menu';
    navigationCloseBtn.element.addEventListener('click', closeSidebar);
    navigationList.element.appendChild(navigationCloseBtn.render());
    const mainMenuItem = createMenuList('Main Menu');
    navigationList.element.appendChild(mainMenuItem);
    // create menu items using data from appSettings.ts
    for (let i = 0; i < categoryNameList.length; i++) {
      const menuItem = createMenuList(`${categoryNameList[i]}`);
      navigationList.element.appendChild(menuItem);
    }
    navigation.element.appendChild(navigationList.render());
    navigation.element.appendChild(navigationOverlay.render());
    // open menu button
    const navigationOpenBtn = new BaseComponent('button', ['btn', 'btn-menu']);
    navigationOpenBtn.element.setAttribute('id', 'sidebar-menu__btn-open');
    navigationOpenBtn.element.innerText = 'Menu';
    navigationOpenBtn.element.addEventListener('click', openSidebar);
    navigation.element.appendChild(navigationOpenBtn.render());
    this.element.appendChild(navigation.render());
    // todo play/restart buttons
    // todo change app mode button
  }

  render(): HTMLElement {
    this.rootElement?.appendChild(this.element);
    return super.render();
  }
}
