import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

import AppNavbar from '@/components/Menu/AppNavbar';

import '@/styles/globals.css';
import { AppShell, MantineProvider } from '@mantine/core';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

const inter = Inter({ subsets: ['latin'] });

function App(props: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const isMenu = router.pathname.startsWith('/menu');
  const { Component, pageProps } = props;

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <div className={inter.className}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
              fontFamily: 'Poppins',
            }}
          >
            {isMenu ? (
              <AppShell navbar={<AppNavbar />}>
                <Component {...pageProps} />
              </AppShell>
            ) : (
              <Component {...pageProps} />
            )}
          </MantineProvider>
        </QueryClientProvider>
      </SessionContextProvider>
    </div>
  );
}

export default appWithTranslation(App);
