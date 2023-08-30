import { BackButton, MainButton, WebAppProvider, useShowPopup } from '@vkruglikov/react-telegram-web-app';
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
  }
`;

const Main = () => {
  const showPopup = useShowPopup();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  return (
    <>
      <Container>
        <WebAppProvider
          options={{
            smoothButtonsTransition: true,
          }}>
          <BackButton onClick={() => console.log('Hello, I am back button!')} />
          <div>
            <h1>나의 수익: 0</h1>
          </div>
          <ButtonWrapper>
            <button>Adding AD</button>
            <button>View AD for airdrops!</button>
            <button>connect wallet!</button>
          </ButtonWrapper>
          <MainButton text="ON CLICK!!" onClick={handleClick} disabled={false}></MainButton>
        </WebAppProvider>
      </Container>
    </>
  );
};

export default Main;
