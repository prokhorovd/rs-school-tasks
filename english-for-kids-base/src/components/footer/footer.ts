import './footer.css';
import { BaseComponent } from '../baseComponent';

export const renderFooter = (): HTMLElement => {
  const footerBody = new BaseComponent('footer', ['footer']);
  // footerBody.element.innerText = 'Test Footer';
  const footerGithubLink = new BaseComponent('a', ['footer__gh-link']);
  footerGithubLink.element.setAttribute('href', 'https://github.com/prokhorovd');
  footerGithubLink.element.setAttribute('target', '_blank');
  // footerGithubLink.element.innerText = 'prokhorovd';
  const footerRsSchoolLink = new BaseComponent('a', ['footer__rs-link']);
  footerRsSchoolLink.element.setAttribute('href', 'https://rs.school/js/');
  footerRsSchoolLink.element.setAttribute('target', '_blank');
  const authorName = new BaseComponent('div', ['footer__author']);
  authorName.element.innerText = 'prokhorovd 2021';
  // assemble footer
  footerBody.element.appendChild(footerGithubLink.render());
  footerBody.element.appendChild(authorName.render());
  footerBody.element.appendChild(footerRsSchoolLink.render());

  return footerBody.render();
};
