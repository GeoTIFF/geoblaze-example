import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

function renderApp() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}

renderApp();
module.hot.accept('./app', function () {
  renderApp();
});
