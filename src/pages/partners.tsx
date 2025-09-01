import Head from 'next/head';
import { PartnersSection } from '@/components/features/PartnersSection';

export default function PartnersPage() {
  return (
    <>
      <Head>
        <title>合作伙伴 - RWA Hub</title>
        <meta
          name="description"
          content="查看RWA Hub的战略合作伙伴，我们与行业领先机构共同推动RWA生态发展"
        />
      </Head>

      <PartnersSection />
    </>
  );
}
