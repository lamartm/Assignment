import { background, chakra } from '@chakra-ui/system';
import styled from '@emotion/styled';
import { DialogContent as DContent, DialogOverlay } from '@reach/dialog';
import { AnimatePresence } from 'framer-motion';
import React, { forwardRef, ReactNode, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { useKey } from 'react-use';

import { Button } from '@/components/shared/Button';
import { BoxProps, Box } from '@/components/shared/Grid';
import { IconButton } from '@/components/shared/IconButton';
import { Heading } from '@/components/shared/Text';
import CloseLightIcon from '@/icons/components/CloseLight';
import { colors } from '@/theme/colors';

import { MotionBox } from '../MotionBox';
import { useModal, useModalState } from './modalStore';

const DialogContent = chakra(DContent);

type CustomComponentProps = BoxProps & { isShown: boolean; duration?: number };

interface ModalProps {
  id: string;
  onOpen?: () => void;
  onClose?: () => void;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  p?: any;
  sx?: BoxProps;
  buttonProps?: BoxProps;
  overlayComponent?: React.ForwardRefExoticComponent<CustomComponentProps>;
  contentComponent?: React.ForwardRefExoticComponent<CustomComponentProps>;
  duration?: number;
  delay?: number;
  children?: ReactNode;
  title?: string;
  callback?: () => void;
  callbackLabel?: string;
}

const Overlay = forwardRef<any, CustomComponentProps>(({ duration, delay, ...props }, ref) => {
  return (
    <MotionBox
      initial={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 0,
        transition: {
          delay,
          delayChildren: delay,
        },
      }}
      animate={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        opacity: 1,
      }}
      exit={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 0,
      }}
      transition={{
        duration,
        ease: 'easeInOut',
      }}
      {...props}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        zIndex: 99,
      }}
      ref={ref}
    />
  );
});

const Content = forwardRef<any, CustomComponentProps & { duration?: number }>(
  ({ width, height, duration, sx, ...props }, ref) => {
    return (
      <MotionBox
        initial={{
          opacity: 0,
          x: '-50%',
          y: 'calc(-50% + 40px)',
        }}
        animate={{
          opacity: 1,
          y: '-50%',
        }}
        exit={{
          opacity: 0,
          x: '-50%',
          y: 'calc(-50% + 40px)',
        }}
        transition={{
          duration,
          ease: 'easeOut',
        }}
        {...props}
        sx={{
          bg: colors.white,
          outline: 'none',
          width: width as any,
          height: height,
          maxWidth: {
            base: 'calc(100% - 32px)',
            xs: 'calc(100% - 48px)',
          },
          maxHeight: 'calc(100% - 96px)',
          overflow: 'auto',
          position: 'fixed',
          top: '50%',
          left: '50%',
          textAlign: 'center',
          ...sx,
        }}
        ref={ref}
      />
    );
  },
);

export const CloseButton = styled(IconButton)`
  border-radius: 50%;
  overflow: hidden;
  transition: transform ease-in-out 150ms;

  &:hover,
  &:focus {
    transform: scale(1.125);
    opacity: 1;
  }
`;

export const Modal = ({
  children,
  id,
  onOpen,
  onClose,
  width = '100%',
  height = 'auto',
  duration = 0.3,
  delay = 0,
  maxWidth = '1280px',
  maxHeight,
  p,
  sx,
  buttonProps: { sx: buttonPropsSx, ...buttonProps } = {},
  contentComponent = Content,
  overlayComponent = Overlay,
  title: _title,
  callback: _callback,
  callbackLabel: _callbackLabel,
}: ModalProps) => {
  const { hide } = useModal(id);
  const modal = useModalState(id);

  const isOpen = modal?.isShown || false;

  const title = modal?.title || _title;
  const callback = modal?.callback || _callback;
  const callbackLabel = modal?.callbackLabel || _callbackLabel;

  useEffect(() => {
    if (isOpen) onOpen && onOpen();
  }, [isOpen, onOpen]);

  const onDismiss = () => {
    hide();

    if (onClose) {
      setTimeout(onClose, duration * 1000);
    }
  };

  const onConfirm = () => {
    if (callback) {
      callback();
    }

    onDismiss();
  };

  useKey('Escape', onDismiss);

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogOverlay
          as={overlayComponent as any}
          onDismiss={modal.isClosable ? onDismiss : undefined}
          duration={duration}
          delay={delay}>
          <FocusLock returnFocus={true}>
            <DialogContent
              as={contentComponent as any}
              aria-label="Modal"
              width={width}
              height={height}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              duration={duration}
              onClick={e => e.stopPropagation()}
              p={p || { base: '40px 24px', md: '64px' }}
              backgroundColor={colors.primary}
              color={colors.white}
              sx={sx}>
              {modal && (
                <>
                  {modal.isClosable && modal.closeButton && (
                    <Box top={0} right={0} zIndex={99} position="absolute" p={4}>
                      <IconButton
                        aria-label="Close"
                        onClick={onDismiss}
                        size={20}
                        icon={<CloseLightIcon size={25} />}
                        sx={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                        {...buttonProps}
                      />
                    </Box>
                  )}

                  {title && (
                    <Heading fontSize="40px" lineHeight={1} mb="24px">
                      {title}
                    </Heading>
                  )}

                  {modal.content}

                  {children}

                  {callback && callbackLabel && (
                    <Button onClick={onConfirm}>{callbackLabel}</Button>
                  )}
                </>
              )}
            </DialogContent>
          </FocusLock>
        </DialogOverlay>
      )}
    </AnimatePresence>
  );
};
