import React from 'react';
import { ReactNode, useState } from 'react';
import { styled } from 'styled-components';

const Container = styled.div<{
  isFocused: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.isFocused ? '#efc2c0' : '#e5e7eb')};
  transition: border 0.3s ease;

  input {
    width: 100%;
    border: none;
  }
`;

const InputContainer: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement<React.PropsWithRef<any>>(child, {
        onFocus: handleInputFocus,
        onBlur: handleInputBlur,
      });
    }
    return child;
  });

  return <Container isFocused={isInputFocused}>{childrenWithProps}</Container>;
};

export default InputContainer;
