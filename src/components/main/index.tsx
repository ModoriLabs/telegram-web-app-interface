import { BackButton, MainButton, WebAppProvider, useShowPopup } from '@vkruglikov/react-telegram-web-app';
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
  button {
    height: 40px;
    border: 0;
    border-radius: 10px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
`;

const Main = () => {
  const showPopup = useShowPopup();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  console.log(window);
  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}>
      <Container>
        <BackButton
          onClick={() =>
            showPopup({
              message: 'Hello, I am popup',
            })
          }
        />
        <div>
          <h1>나의 수익: 0</h1>
        </div>
        <ButtonWrapper>
          <Link href={'/insert_ad'}>Adding AD</Link>
          <button>View AD for airdrops!</button>
          <button>connect wallet!</button>
        </ButtonWrapper>
        <MainButton text="ON CLICK!!"></MainButton>
      </Container>
    </WebAppProvider>
  );
};

export default Main;
