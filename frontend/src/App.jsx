import { RouterProvider } from 'react-router-dom';
import { CompanyProvider } from './context/CompanyContext';
import { router } from './routes';

function App() {
  return (
    <CompanyProvider>
      <RouterProvider router={router} />
    </CompanyProvider>
  );
}

export default App;
