import { useTonAddress } from "@tonconnect/ui-react";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const Container = styled.article`
  width: 90%;
  margin: 25px auto 0;
  > b {
    font-size: 18px;
  }
`;
const VideoWrapper = styled.article`
  margin-top: 10px;
  width: 100%;
  height: initial;
  position: relative;
  border-radius: 10px;
  &::before {
    content: "";
    display: block;
    padding-top: 65%;
  }
  > * {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
`;
const VideoGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const DashboardContainer = styled.section`
  margin-top: 30px;
  > b {
    margin-bottom: 10px;
    display: block;
    font-size: 18px;
  }
`;
const Dashboard = () => {
  const router = useRouter();
  const address = useTonAddress();
  const count = localStorage.getItem(address);
  const claimedAmount = count
    ? `${(Number(count) * 0.1).toLocaleString()} TON`
    : "0";
  const minting = localStorage.getItem("minting");
  const [mintingData, setMintingData] = useState<
    {
      address: string;
      url: string;
    }[]
  >([]);

  useEffect(() => {
    if (minting !== null) {
      const parsedMintingData = JSON.parse(minting);
      setMintingData(parsedMintingData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !!address ? (
    <Container>
      <BackButton
        onClick={() => {
          router.push("/");
        }}
      />
      <DashboardContainer>
        <b>Ad viewing history</b>
        {!!!count ? (
          <p>There is no history exists</p>
        ) : (
          <section>
            <p>Total viewed: {count}</p>
            <p>Total claimed amount: {claimedAmount}</p>
          </section>
        )}
      </DashboardContainer>
      <DashboardContainer>
        <b>Ads Creation History</b>
        {mintingData.length !== 0 ? (
          <VideoGrid>
            {mintingData.map((data, index) => {
              return (
                <VideoWrapper key={index}>
                  <YouTube
                    opts={{
                      height: "100%",
                      width: "100%",
                    }}
                    videoId={data.url}
                  />
                </VideoWrapper>
              );
            })}
          </VideoGrid>
        ) : (
          <p>There is no history exists</p>
        )}
      </DashboardContainer>
    </Container>
  ) : (
    <Container>
      <b>No wallet detected. Please connect your wallet and try again</b>
    </Container>
  );
};

export default Dashboard;
