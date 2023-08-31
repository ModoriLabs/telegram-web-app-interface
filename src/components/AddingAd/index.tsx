import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useRouter } from 'next/router';

const AddingAd = () => {
  const router = useRouter();
  return (
    <div>
      <BackButton onClick={() => router.back()} />
      insert your ad!
    </div>
  );
};

export default AddingAd;
