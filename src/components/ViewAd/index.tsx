import { BackButton, MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { NftCollection } from "../../../build/tact_NftCollection";
import { Address, toNano } from "ton-core";
import { nftCollectionAddress } from "@/constants/addresses";
import { useTonClient } from "@/hooks/useTonClient";
import { NftItem } from "../../../build/tact_NftItem";
import YouTube from "react-youtube";
import useTonConnect from "@/hooks/useTonConnect";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";

const Container = styled.article`
  width: 90%;
  margin: 25px auto 0;
  position: relative;
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
const NullAudio = styled.article`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > button {
    position: absolute;
    bottom: 0px;
    height: 40px;
  }
`;

const ViewAd = () => {
  const router = useRouter();
  const [claimable, setClaimable] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
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
  };

  if (!url) {
    const opts = {
      height: "300",
      width: "390",
      playerVars: {
        controls: 0,
        autoplay: 1,
      },
    } as const;
    return (
      <section>
        <div>
          <div>This is a default video</div>
          <div>Now video is on loading...</div>
          <YouTube opts={opts} videoId="rumF8zJUFYI" onEnd={() => {}} />
        </div>
      </section>
    );
  }

  const opts = {
    height: "250",
    width: "350",
    playerVars: {
      controls: 0,
      autoplay: 1,
      end: 10,
    },
  } as const;

  const count = localStorage.getItem(address);
  const claimedAmount = count ? `${Number(count) * 0.1} TON` : "0";
  // TODO: showFinale -> show finale animation
  return (
    <Container>
      <BackButton onClick={() => router.back()} />
      <div>
        <div>
          Current Video Url is: <b>{url}</b>
        </div>
        <YouTube
          opts={opts}
          videoId={url}
          onEnd={() => {
            setClaimable(true);
            setShowFinale(true);
          }}
        />
      </div>
      <div>Claimd amount: {claimedAmount}</div>

      {claimable && (
        <MainButton
          disabled={!claimable}
          text="Earn"
          onClick={async () => {
            try {
              claimable && handleClaim();
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
