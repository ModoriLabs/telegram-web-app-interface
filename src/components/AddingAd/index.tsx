import { useTonAddress } from '@tonconnect/ui-react';
import {
  BackButton,
  MainButton,
  useShowPopup,
} from '@vkruglikov/react-telegram-web-app';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { css, styled } from 'styled-components';
import InputContainer from '../common/InputContainer';

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
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    if (!!!address) {
      showPopup({
        message:
          'There is no detected wallet address. Please check your wallet',
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
                value={searchKey}
                onChange={(event) => {
                  setSearchKey(event.target.value);
                }}
                placeholder="Enter the ad url"
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
      {!!searchKey && (
        <MainButton
          text="Confirm Ad!!"
          onClick={async () => {
            try {
              showPopup({
                message:
                  'It will cost 10 Tons to register this video and 1 Ton for each user view. Do you want to continue?',
              });
            } catch (e: any) {
              showPopup({
                message: e,
              });
            }
          }}
        ></MainButton>
      )}
    </div>
  );
};

export default AddingAd;
