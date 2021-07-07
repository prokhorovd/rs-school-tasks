import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import { App } from './app';
import { setRouting } from './routing';

// console.log('Project initiated');

window.onload = () => {
  new App(document.body).render();
  setRouting(window);
};
