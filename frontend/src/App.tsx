import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState, useEffect } from 'react';
import { trpc } from './lib/trpc';
import Home from './Pages/Home';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:5000/trpc',
          },
        ),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
          </Routes>
          {/* <Home/> */}
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}