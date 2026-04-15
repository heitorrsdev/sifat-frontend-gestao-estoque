import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export function App() {
  return (
    <div className="sifat-bg flex items-center flex-col h-screen font-sans text-gray-900">
      <Header />
      <main className="scroll-hidden flex-1 mt-16 w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
