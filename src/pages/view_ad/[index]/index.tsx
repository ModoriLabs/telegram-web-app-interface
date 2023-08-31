import dynamic from 'next/dynamic';

const DynamicViewAd = dynamic(() => import('@/components/ViewAd'), {
  ssr: false,
});

export default function ViewAd() {
  return <DynamicViewAd />;
}
