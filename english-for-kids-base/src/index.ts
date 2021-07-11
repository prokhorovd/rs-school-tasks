import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import { App } from './app';
import { setRouting } from './routing';
import { createStatisticsBase, createTable, sortTable } from './components/stats/stats';

// console.log('Project initiated');

window.onload = () => {
  new App(document.body).render();
  window.location.hash = 'main';
  setRouting(window);
  createStatisticsBase();
  // todo del test section below
  // document.body.appendChild(createTable());
  // sortTable('categoryNumber');
  // sortTable('translation');
};
