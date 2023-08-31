import { TonConnectButton } from '@tonconnect/ui-react';
import { styled } from 'styled-components';

const Container = styled.section`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #d1d5db;
  padding: 0 20px;
`;

const Navigation: React.FC = () => {
  return (
    <Container>
      <b>AD-Slide</b>
      <TonConnectButton />
    </Container>
  );
};

export default Navigation;
