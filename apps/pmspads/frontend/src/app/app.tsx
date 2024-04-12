// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes } from 'react-router-dom';

import { Homepage } from '@nexanode/pmspads-frontend-homepage-feature';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
