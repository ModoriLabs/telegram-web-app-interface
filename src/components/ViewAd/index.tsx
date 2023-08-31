import { BackButton, MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { NftCollection } from "../../../build/tact_NftCollection";
import { Address } from "ton-core";
import { nftCollectionAddress } from "@/constants/addresses";
import { useTonClient } from "@/hooks/useTonClient";
import { NftItem } from "../../../build/tact_NftItem";
import YouTube from "react-youtube";

const VideoWrapper = styled.article`
  margin-top: 10px;
  width: 100%;
  height: initial;
  position: relative;
  border-radius: 10px;
  &::before {
    content: "";
    display: block;
    padding-top: 80%;
  }
  > video {
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
const Container = styled.article`
  width: 90%;
  margin: 25px auto 0;
  > b {
    font-size: 18px;
  }
`;

const ViewAd = () => {
  const router = useRouter();
  const [claimable, setClaimable] = useState(false);
  const client = useTonClient();
  const { data: nftItemContract } = useQuery("nftItemContract", async () => {
    const nftCollectionWrapper = NftCollection.fromAddress(
      Address.parse(nftCollectionAddress)
    );
    const nftCollectionContract = await client.open(nftCollectionWrapper);

    const currentNftItemAddress =
      await nftCollectionContract.getGetCurrentNftAddress();

    const nftItemWrapper = NftItem.fromAddress(currentNftItemAddress);
    const nftItemContract = await client.open(nftItemWrapper);
    return nftItemContract;
  });

  const { data: url } = useQuery("url", async () =>
    nftItemContract?.getGetUrl()
  );
  const handleClaim = () => {
    console.log("!!!!!!!!!!!!!!!!claim!!!!!!!!!!!!!!!!!!");
  };
  console.log("url", url);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0,
      autoplay: 1,
    },
  } as const;
  return (
    <Container>
      <BackButton onClick={() => router.back()} />
      <div>
        <div>
          Current Video Url is: <b>{url}</b>
        </div>
        <YouTube
          opts={opts}
          videoId="Si-fcjJ1cO4"
          onEnd={() => {
            setClaimable(true);
          }}
        />

        {/* <VideoWrapper>
        <video controls playsInline>
          <source
            src={
              // "https://youtu.be/A_RqixtLCtw?si=N9wzTwMHH1JZhATD&origin=http://localhost:3000&autoplay=1&mute=1&enablejsapi=1&widgetid=1"
              "https://youtu.be/A_RqixtLCtw?si=N9wzTwMHH1JZhATD?origin=https://localhost:3000"
            }
            type="video/mp4"
          />
        </video>
      </VideoWrapper> */}
      </div>
      {claimable && (
        <MainButton
          text="Earn"
          onClick={async () => {
            try {
              handleClaim();
              // TODO: Claim contract
            } catch (e: any) {
              console.error(e);
            }
          }}
        ></MainButton>
      )}
    </Container>
  );
};

export default ViewAd;
