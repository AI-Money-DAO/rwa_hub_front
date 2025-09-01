import Head from 'next/head';
import { AboutSection } from '@/components/features/AboutSection';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>关于我们 - RWA Hub</title>
        <meta
          name="description"
          content="了解RWA Hub的使命、愿景和团队，我们致力于成为全球领先的RWA服务平台"
        />
      </Head>

      <AboutSection />
    </>
  );
}
