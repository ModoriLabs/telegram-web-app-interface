import ADVideo from "@/assets/videos/ad.mp4";
import { useQuery } from "react-query";
import styled from "styled-components";
import { NftCollection } from "../../../build/tact_NftCollection";
import { Address, toNano } from "ton-core";
import { nftCollectionAddress } from "@/constants/addresses";
import { useTonClient } from "@/hooks/useTonClient";
import { NftItem } from "../../../build/tact_NftItem";
import YouTube from "react-youtube";
import { useState } from "react";
import { isCallChain } from "typescript";
import useTonConnect from "@/hooks/useTonConnect";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";

export const VideoWrapper = styled.article`
  width: 100%;
  position: relative;
  &::before {
    content: "";
    display: block;
    padding-top: 80%;
  }
  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;
const ViewAd = () => {
  const [claimable, setClaimable] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [isHideVideo, setIsHideVideo] = useState(false);
  const client = useTonClient();
  const address = useTonAddress();
  const { sender } = useTonConnect();
  const { data: nftCollectionContract } = useQuery(
    "nftCollectionContract",
    async () => {
      const nftCollectionWrapper = NftCollection.fromAddress(
        Address.parse(nftCollectionAddress)
      );
      const nftCollectionContract = await client.open(nftCollectionWrapper);
      return nftCollectionContract;
    }
  );

  const { data: nftItemContract } = useQuery(
    "nftItemContract",
    async () => {
      if (!nftCollectionContract) return;
      const currentNftItemAddress =
        await nftCollectionContract.getGetCurrentNftAddress();

      const nftItemWrapper = NftItem.fromAddress(currentNftItemAddress);
      const nftItemContract = await client.open(nftItemWrapper);
      return nftItemContract;
    },
    {
      refetchInterval: (data, query) => {
        if (data) {
          // stop refetch
          return false;
        }
        return 1000;
      },
    }
  );

  const { data: url } = useQuery(
    "url",
    async () => nftItemContract?.getGetUrl(),
    {
      refetchInterval: (data, query) => {
        if (data) {
          // stop refetch
          return false;
        }
        return 1000;
      },
    }
  );
  const handleClaim = async () => {
    await nftItemContract?.send(
      sender,
      {
        value: toNano("0.05"),
      },
      "Claim"
    );

    setClaimed(true);
    const count = localStorage.getItem(address);
    const newCount = count ? Number(count) + 1 : 1;
    localStorage.setItem(address, String(newCount));
    console.log("address", address);
  };

  if (!url) {
    const opts = {
      height: "300",
      width: "390",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        controls: 0,
        autoplay: 1,
      },
    } as const;
    return (
      <section>
        <div>
          <div>This is a default video</div>
          <div>Now video is on loading...</div>
          <YouTube
            opts={opts}
            videoId="rumF8zJUFYI"
            onEnd={() => {
              !claimed && setClaimable(true);
            }}
          />
        </div>
      </section>
    );
  }

  const opts = {
    height: "600",
    width: "390",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0,
      autoplay: 1,
      end: 10,
    },
  } as const;

  const count = localStorage.getItem(address);
  const claimedAmount = count ? `${Number(count) * 0.1} TON` : "0";
  return (
    <section>
      {!isHideVideo && (
        <div>
          <div>
            Current Video Url is: <b>{url}</b>
          </div>
          <YouTube
            opts={opts}
            videoId={url}
            onEnd={() => {
              setClaimable(true);
              setIsHideVideo(true);
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
      )}
      {/* <button disabled={!claimable} onClick={handleClaim}> */}
      <button
        style={{
          width: "300px",
          height: "200px",
          margin: "20px auto",
          display: "block",
        }}
        disabled={claimed || !claimable}
        onClick={handleClaim}
      >
        Earn
      </button>
      <div>Claimd amount: {claimedAmount}</div>
    </section>
  );
};

export default ViewAd;
