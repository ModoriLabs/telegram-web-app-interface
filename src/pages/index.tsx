import { Inter } from 'next/font/google';
import { BackButton, MainButton, WebAppProvider, useShowPopup } from '@vkruglikov/react-telegram-web-app';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const showPopup = useShowPopup();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  return (
    <>
      <section id="main">
        <WebAppProvider
          options={{
            smoothButtonsTransition: true,
          }}>
          <BackButton onClick={() => console.log('Hello, I am back button!')} />
          <div>
            <h1>나의 수익: 0</h1>
          </div>
          <button>Adding AD</button>
          <button>View AD for airdrops!</button>
          <button>connect wallet!</button>
          <MainButton text="ON CLICK!!" onClick={handleClick} disabled={false}></MainButton>
        </WebAppProvider>
      </section>
    </>
  );
}
