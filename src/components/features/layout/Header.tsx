import styled from '@emotion/styled';
import Link from 'next/link';
import { useState, useEffect, PropsWithChildren } from 'react';

import { Overlay } from '@/components/Overlay';
import { Box, Container } from '@/components/shared/Grid';
import { Modal } from '@/components/shared/Modal';
import { useModal } from '@/components/shared/Modal/modalStore';

const MainHeader = styled.header`
  top: 0;
  left: 0;
  z-index: 1;
  color: white;
  position: fixed;
  width: 100%;
  background-color: white;
`;

const HeaderButton = styled.button`
  width: 64px;
  height: 88px;
  cursor: pointer;
  border: none;
  align-self: center;
  background-color: transparent;
  &::before,
  &::after {
    content: '';
    width: 22px;
    height: 2px;
    background-color: black;
    display: inline-block;
    position: absolute;
  }
  &::after {
    top: 56px;
  }
`;

const HeaderWrapper = styled.div<{ headerBorder: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.headerBorder} 2px solid;
  transition: border-bottom 0.1s ease-in-out;
`;

export function Header() {
  const [position, setPosition] = useState(true);

  const headerBorder = position === true ? 'white' : 'lightgrey';

  const ModalButton = ({ children, id }: PropsWithChildren<{ id: string }>) => {
    const { show } = useModal(id);
    return <HeaderButton onClick={() => show()}>{children}</HeaderButton>;
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scroll = document.scrollingElement?.scrollTop;
      (scroll || '') > 10 ? setPosition(false) : setPosition(true);
    });
  }, []);
  return (
    <MainHeader>
      <Container>
        <HeaderWrapper headerBorder={headerBorder}>
          <Link href="/">
            <Box as="h1" color="blackAlpha.900" pl="10px">
              DEPT
            </Box>
          </Link>
          <ModalButton id="modal"></ModalButton>
          <Modal id="modal" height="100%" width="100%" maxHeight="100%" maxWidth="100%" p="0">
            <Overlay></Overlay>
          </Modal>
        </HeaderWrapper>
      </Container>
    </MainHeader>
  );
}
