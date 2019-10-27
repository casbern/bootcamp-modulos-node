import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express(); // same as the app var from previous app. Receive expres.

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
