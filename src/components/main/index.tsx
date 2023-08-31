import {
  CHAIN,
  TonConnect,
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
import {
  BackButton,
  MainButton,
  WebAppProvider,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";
import Link from "next/link";
import { styled } from "styled-components";
import { Address, contractAddress } from "ton-core";
import { NftCollection } from "../../../build/tact_NftCollection";
import { useQuery } from "react-query";
import { useTonClient } from "@/hooks/useTonClient";
import { NftItem } from "../../../build/tact_NftItem";

const Container = styled.section`
  min-height: calc(100vh - 80px - 40px);
  max-height: calc(100vh - 80px - 40px);
`;

const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  > * + * {
    margin-top: 10px;
  }
`;

const WalletDisabledArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px - 40px);
`;
const ConnectWalletArea = styled.section`
  width: 90%;
  margin: 40px auto;
  > b {
    font-size: 18px;
    color: #1f2a37;
  }
`;
const ContainerButton = styled.button`
  display: flex;
  background-color: #f5dddb;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  border-radius: 20px;
  padding: 20px;
  transition: all 0.3s ease;
  width: 100%;
  cursor: pointer;
  min-height: 120px;
  > b {
    font-size: 18px;
    margin-bottom: 6px;
  }
  > p {
    color: #4b5563;
  }
  &:hover {
    background-color: #efc2c0;
  }
`;

const Main = () => {
  const showPopup = useShowPopup();
  const wallet = useTonWallet();
  const address = useTonAddress();

  const handleClick = () =>
    showPopup({
      message: "Hello, I am popup",
    });

  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <Container>
        {!!address ? (
          <ConnectWalletArea>
            <b>Select the features you want to use!</b>
            <ButtonWrapper>
              <Link href={"/insert_ad"}>
                <ContainerButton>
                  <b>Register your ad</b>
                  <p>Publish ads on the platform for a successful business!</p>
                </ContainerButton>
              </Link>
              <Link href={"/view_ad/1"}>
                <ContainerButton>
                  <b>To view ads</b>
                  <p>Easily receive airdrops by viewing ads!</p>
                </ContainerButton>
              </Link>
              <Link href={"/insert_ad"}>
                <ContainerButton>
                  <b>Dashboard</b>
                  <p>Check your wallet account information here</p>
                </ContainerButton>
              </Link>
            </ButtonWrapper>
          </ConnectWalletArea>
        ) : (
          <WalletDisabledArea>
            <b>Please connect your wallet to use the service.</b>
          </WalletDisabledArea>
        )}
      </Container>
    </WebAppProvider>
  );
};

export default Main;
