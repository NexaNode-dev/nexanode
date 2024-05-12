// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Landing } from '@nexanode/zendens-frontend-landing-feature';

import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
