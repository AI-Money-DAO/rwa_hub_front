import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Determine layout strategy based on route
  const isAuthPage = router.pathname.startsWith('/auth');
  const isDashboardPage = router.pathname.startsWith('/dashboard');
  const isChatPage = router.pathname.startsWith('/chat');

  // Auth pages don't use any layout (handled in Layout component)
  // Dashboard pages use layout with sidebar
  // Chat pages use layout without sidebar
  // Public pages use layout without sidebar
  const showSidebar = isDashboardPage;

  return (
    <>
      <Head>
        <title>RWA Hub - 专业的RWA资产服务平台</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthProvider>
        <Layout showSidebar={showSidebar}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}
