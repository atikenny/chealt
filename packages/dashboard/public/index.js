import { LocationProvider, Router, Route, lazy, ErrorBoundary, hydrate, prerender as ssr } from 'preact-iso';
import Home from './pages/home/index.js';
import NotFound from './pages/_404.js';
import Header from './header.js';

const About = lazy(() => import('./pages/about/index.js'));

const App = () => (
  <LocationProvider>
    <div class="app">
      <Header />
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </div>
  </LocationProvider>
);

hydrate(<App />);

const prerender = async (data) => await ssr(<App {...data} />);

export { App, prerender };
