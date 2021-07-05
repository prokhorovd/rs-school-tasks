import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import { App } from './app';

// console.log('Project initiated');

window.onload = () => {
  new App(document.body).render();
};
