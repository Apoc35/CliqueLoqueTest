import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Contracts from '../pages/Contracts';
import ContractDetails from '../pages/ContractDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/contracts',
    element: (
      <Layout>
        <Contracts />
      </Layout>
    ),
  },
  {
    path: '/contracts/:id',
    element: (
      <Layout>
        <ContractDetails />
      </Layout>
    ),
  },
]);
