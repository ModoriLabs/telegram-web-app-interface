import { useTonAddress } from "@tonconnect/ui-react";
import { nftCollectionAddress } from "@/constants/addresses";
import {
  BackButton,
  MainButton,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import YouTube from "react-youtube";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { css, styled } from "styled-components";
import InputContainer from "../common/InputContainer";
import { useTonClient } from "@/hooks/useTonClient";
import { useQuery } from "react-query";
import { NftItem } from "../../../build/tact_NftItem";
import { NftCollection } from "../../../build/tact_NftCollection";
import { Address, toNano } from "ton-core";
import useTonConnect from "@/hooks/useTonConnect";
import { toast } from "react-toastify";

const Container = styled.section`
  height: calc(100vh - 80px);
  padding-top: 25px;
  margin: 0 auto;
  width: 90%;
`;

const InputWrapper = styled.section<{
  $isDisabled?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 20px;
  ${(props) =>
    props.$isDisabled &&
    css`
      background-color: #e5e7eb;
    `}
  input {
    text-align: right;
    font-size: 14px;
    background-color: transparent;
  }
  p {
    font-size: 14px;
    white-space: nowrap;
    margin-right: 10px;
  }
`;

const InputSection = styled.section`
  margin-top: 30px;
  > * + * {
    margin-top: 10px;
  }
`;

const Checkbox = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  label {
    margin-left: 6px;
    padding-left: 6px;
    font-size: 14px;
    color: #999;
  }
`;

const AddingAd = () => {
  const router = useRouter();
  const showPopup = useShowPopup();
  const address = useTonAddress();
  const { width, height } = useWindowSize();
  const [isAgreeFees, setAgreeFees] = useState(false);
  const { sender } = useTonConnect();
  const [isConfetti, setConfetti] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const isValidUrl = isValidYouTubeShortID(newUrl);

  const client = useTonClient();
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

  const { data: nftItemContract } = useQuery("nftItemContract", async () => {
    if (!nftCollectionContract) return;
    const currentNftItemAddress =
      await nftCollectionContract.getGetCurrentNftAddress();

    const nftItemWrapper = NftItem.fromAddress(currentNftItemAddress);
    const nftItemContract = await client.open(nftItemWrapper);
    return nftItemContract;
  });

  const { data: url } = useQuery("url", async () =>
    nftItemContract?.getGetUrl()
  );

  function isValidYouTubeShortID(str: String) {
    if (!str) return false;
    return !str.includes("/") && !str.includes("http");
  }

  const mint = useCallback(async () => {
    if (!nftCollectionContract) return;
    if (!isValidYouTubeShortID(newUrl)) {
      showPopup({
        message: "Please enter a valid YouTube Short ID",
      });
      return;
    }
    nftCollectionContract
      ?.send(
        sender,
        {
          value: toNano("1.05"),
        },
        {
          $$type: "Mint",
          url: newUrl,
        }
      )
      .then(() => {
        setConfetti(true);
        const mintingData = localStorage.getItem("minting");
        let mintingArray = [];

        if (mintingData) {
          mintingArray = JSON.parse(mintingData);
        } else {
          mintingArray.push(
            ...[
              {
                address: address,
                url: "a28k9P7FhLg",
              },
              {
                address: address,
                url: "zc8R6a-kOTM",
              },
              {
                address: address,
                url: "dE7DCF_s7HQ",
              },
            ]
          );
        }

        mintingArray.push({
          address: address,
          url: newUrl,
        });
        localStorage.setItem("minting", JSON.stringify(mintingArray));
      });
  }, [nftCollectionContract, address, newUrl, sender, showPopup]);

  useEffect(() => {
    if (!!!address) {
      showPopup({
        message:
          "There is no detected wallet address. Please check your wallet",
      });
      router.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (isConfetti) {
      toast.success("Ad confirm Success!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isConfetti]);
  return (
    <div>
      {isConfetti && <Confetti width={width} height={height} />}
      <BackButton onClick={() => router.push("/")} />
      <Container>
        <h1>Enroll your Ad!</h1>
        <InputSection>
          <InputContainer>
            <InputWrapper>
              <p>URL</p>
              <input
                type="text"
                value={newUrl}
                onChange={(event) => {
                  setNewUrl(event.target.value);
                }}
                placeholder={url || "Enter the ad url"}
              />
            </InputWrapper>
          </InputContainer>

          <InputContainer>
            <InputWrapper $isDisabled>
              <p>Max user viewer</p>
              <input type="text" value={10} disabled />
            </InputWrapper>
          </InputContainer>
        </InputSection>
        {!!newUrl && (
          <Checkbox>
            <input
              type="checkbox"
              id="checkbox-input"
              onChange={({ target: { checked } }) => {
                setAgreeFees(checked);
              }}
            />
            <label htmlFor="checkbox-input">
              When registering for this video, you will need to pay 1 TON. which
              will be distributed to Max user viewers (10) in the order in which
              the ad is shown, in increments of 0.1 TON (1 TON / Max user
              viewers). If you understand and agree, please click the
              corresponding checkbox.
            </label>
          </Checkbox>
        )}
        {isValidUrl && (
          <YouTube
            style={{
              marginTop: "20px",
            }}
            opts={{
              height: "250",
              width: "350",
              playerVars: {
                controls: 0,
                end: 10,
              },
            }}
            videoId={newUrl}
            onEnd={() => {}}
          />
        )}
      </Container>

      {isAgreeFees &&
        (isConfetti ? (
          <MainButton
            text={"Go to main page"}
            onClick={async () => {
              try {
                router.push("/");
                return;
              } catch (e: any) {
                console.log(e);
              }
            }}
          ></MainButton>
        ) : (
          <MainButton text={"Confirm Ad!!"} onClick={mint}></MainButton>
        ))}
    </div>
  );
};

export default AddingAd;
