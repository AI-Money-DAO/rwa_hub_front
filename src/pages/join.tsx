import Head from 'next/head';
import { JoinUsSection } from '@/components/features/JoinUsSection';

export default function JoinPage() {
  return (
    <>
      <Head>
        <title>加入我们 - RWA Hub</title>
        <meta
          name="description"
          content="加入RWA Hub社区，无论您是专业投资者、技术专家还是RWA爱好者，我们都为您提供参与机会"
        />
      </Head>

      <JoinUsSection />
    </>
  );
}
