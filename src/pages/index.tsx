import dynamic from 'next/dynamic';

const DynamicMain = dynamic(() => import('@/components/main'), {
  ssr: false,
});

export default function Home() {
  return <DynamicMain />;
}
