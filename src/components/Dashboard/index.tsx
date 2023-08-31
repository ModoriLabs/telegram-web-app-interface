import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.article`
  width: 90%;
  margin: 25px auto 0;
  > b {
    font-size: 18px;
  }
`;

const Dashboard = () => {
  const router = useRouter();

  return (
    <Container>
      <BackButton onClick={() => router.back()} />
      <section>
        <b>광고 시청 내역</b>
        <p>내역이 존재하지 않습니다.</p>
      </section>
      <section>
        <b>광고 내역</b>
        <p>내역이 존재하지 않습니다.</p>
      </section>
    </Container>
  );
};

export default Dashboard;
