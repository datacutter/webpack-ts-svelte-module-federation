import App from './views/app.svelte';
import loadComponent from './utils/load-component';

// Dynamic import second app
import(/* webpackChunkName: 'app2' */ 'app2').then(() => {
  loadComponent('app2', './App').then((module: any) => {
    const App2 = module.default;
    new App2({
      target: document.body,
    });
  });
});

new App({
  target: document.body,
});

