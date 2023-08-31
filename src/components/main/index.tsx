import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from '@tonconnect/ui-react';
import {
  BackButton,
  MainButton,
  WebAppProvider,
  useShowPopup,
} from '@vkruglikov/react-telegram-web-app';
import Link from 'next/link';
import { styled } from 'styled-components';

const Container = styled.section`
  min-height: 100vh;
`;

const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 50px auto;
  > * + * {
    margin-top: 20px;
  }
  a {
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 10px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    display: flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
  }
`;

const Main = () => {
  const showPopup = useShowPopup();
  const wallet = useTonWallet();
  const address = useTonAddress();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <Container>
        {/* <BackButton
          onClick={() =>
            showPopup({
              message: 'Hello, I am popup',
            })
          }
        /> */}
        <div>
          <b>{!!address ? 'Greetings!' : '지갑을 연결해주세요.'}</b>
          {!!address && (
            <p>
              {address.slice(0, 6)}...{address.slice(-10)}
            </p>
          )}
          <TonConnectButton
            className={`nav__button ${address ? 'connect' : ''}`}
          />
        </div>
        {!!address ? (
          <ButtonWrapper>
            <Link href={'/insert_ad'}>광고 보기</Link>
            <Link href={'/insert_ad'}>광고 등록</Link>
          </ButtonWrapper>
        ) : (
          <></>
        )}
        {/* <MainButton text="ON CLICK!!"></MainButton> */}
      </Container>
    </WebAppProvider>
  );
};

export default Main;
