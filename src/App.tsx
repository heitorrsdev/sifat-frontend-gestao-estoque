import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="sifat-bg flex items-center min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      <main className="flex-1 mt-16 max-w-7xl w-full p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
