import dynamic from 'next/dynamic';

const DynamicAddingAd = dynamic(() => import('@/components/AddingAd'), {
  ssr: false,
});

export default function AddingAd() {
  return <DynamicAddingAd />;
}
