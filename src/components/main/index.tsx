import {
  TonConnect,
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
  min-height: calc(100vh - 80px - 40px);
  max-height: calc(100vh - 80px - 40px);
`;

const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  > * + * {
    margin-top: 20px;
  }
`;

const WalletDisabledArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px - 40px);
`;
const ConnectWalletArea = styled.section`
  width: 90%;
  margin: 40px auto;
  > b {
    font-size: 18px;
    color: #1f2a37;
  }
`;
const ContainerButton = styled.button`
  display: flex;
  background-color: #e5edff;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  border-radius: 20px;
  padding: 20px;
  border: 2px solid #b4c6fc;
  transition: all 0.3s ease;
  width: 100%;
  cursor: pointer;
  min-height: 120px;
  > b {
    font-size: 18px;
    margin-bottom: 6px;
  }
  > p {
    color: #4b5563;
  }
  &:hover {
    background-color: #cddbfe;
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
        {!!address ? (
          <ConnectWalletArea>
            <b>Select the features you want to use!</b>
            <ButtonWrapper>
              <Link href={'/insert_ad'}>
                <ContainerButton>
                  <b>Register your ad</b>
                  <p>Publish ads on the platform for a successful business!</p>
                </ContainerButton>
              </Link>
              <Link href={'/insert_ad'}>
                <ContainerButton>
                  <b>To view ads</b>
                  <p>Easily receive airdrops by viewing ads!</p>
                </ContainerButton>
              </Link>
              <Link href={'/insert_ad'}>
                <ContainerButton>
                  <b>Dashboard</b>
                  <p>Check your wallet account information here</p>
                </ContainerButton>
              </Link>
            </ButtonWrapper>
          </ConnectWalletArea>
        ) : (
          <WalletDisabledArea>
            <b>서비스를 이용하기 위해서 지갑을 연결해주세요.</b>
          </WalletDisabledArea>
        )}

        {/* <MainButton
          text="ON CLICK!!"
          onClick={async () => {
            try {
              const tonConnectUI = new TonConnect();
            } catch (e: any) {
              showPopup({
                message: e,
              });
            }
          }}
        ></MainButton> */}
      </Container>
    </WebAppProvider>
  );
};

export default Main;
