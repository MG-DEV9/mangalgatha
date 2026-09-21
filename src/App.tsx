import { BrowserRouter as Router } from 'react-router-dom';
import { RouteShell } from './components/RouteShell';

export default function App() {
  return (
    <Router>
      <RouteShell />
    </Router>
  );
}
