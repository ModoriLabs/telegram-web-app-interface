import { useTonAddress } from "@tonconnect/ui-react";
import { nftCollectionAddress } from "@/constants/addresses";
import {
  BackButton,
  MainButton,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { css, styled } from "styled-components";
import InputContainer from "../common/InputContainer";
import { useTonClient } from "@/hooks/useTonClient";
import { useQuery } from "react-query";
import { NftItem } from "../../../build/tact_NftItem";
import { NftCollection } from "../../../build/tact_NftCollection";
import { Address, toNano } from "ton-core";
import useTonConnect from "@/hooks/useTonConnect";

const Container = styled.section`
  height: calc(100vh - 80px);
  padding-top: 25px;
  margin: 0 auto;
  width: 90%;
`;

const InputWrapper = styled.section<{
  isDisabled?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px 20px;
  ${(props) =>
    props.isDisabled &&
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

const AddingAd = () => {
  const router = useRouter();
  const showPopup = useShowPopup();
  const address = useTonAddress();
  const { sender } = useTonConnect();
  const [newUrl, setNewUrl] = useState("");
  console.log("newUrl", newUrl);

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
  const setUrl = async (newUrl: string) => {
    if (!nftItemContract) return;
    await nftItemContract.send(
      sender,
      {
        value: toNano("0.05"),
      },
      {
        $$type: "UpdateUrl",
        url: newUrl,
      }
    );
  };

  useEffect(() => {
    if (!!!address) {
      showPopup({
        message:
          "There is no detected wallet address. Please check your wallet",
      });
      router.back();
      return;
    }
  }, [address, router, showPopup]);

  return (
    <div>
      <BackButton onClick={() => router.back()} />
      <Container>
        <h1>insert your ad!</h1>
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
            <InputWrapper isDisabled>
              <p>Max user viewer</p>
              <input type="text" value={10} disabled />
            </InputWrapper>
          </InputContainer>
        </InputSection>
      </Container>
      <MainButton
        text="Confirm Ad!!"
        onClick={async () => {
          try {
            showPopup({
              message:
                "It will cost 10 Tons to register this video and 1 Ton for each user view. Do you want to continue?",
            });
          } catch (e: any) {
            showPopup({
              message: e,
            });
          }
        }}
      ></MainButton>
    </div>
  );
};

export default AddingAd;
