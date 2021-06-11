import { LocationProvider, Router, Route, ErrorBoundary, hydrate, prerender as ssr } from 'preact-iso';
import Home from './components/Home/index.js';
import NotFound from './components/ErrorPages/_404.js';
import Header from './components/Header.js';

const App = () => (
  <LocationProvider>
    <div class="app">
      <Header />
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </div>
  </LocationProvider>
);

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { App, prerender };
