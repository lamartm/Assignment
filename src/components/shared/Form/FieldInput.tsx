import { useTheme } from '@chakra-ui/system';
import dynamic from 'next/dynamic';
import { forwardRef, InputHTMLAttributes, useState, PropsWithChildren } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { Props as MaskProps } from 'react-input-mask';

import { Box, BoxProps } from '@/components/shared/Grid';
import { IconButton } from '@/components/shared/IconButton';
import { Label } from '@/components/shared/Label';

const InputMask = dynamic(() => import('react-input-mask'));

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  Partial<MaskProps> & {
    type?: 'text' | 'textarea' | 'number' | 'password' | 'email' | 'tel' | 'search';
    color?: string;
    sx?: any;
    inputRef?: any;
    clearable?: boolean;
    hasError?: boolean;
    readonly?: boolean;
    onClear?: () => void;
    start?: string | number | JSX.Element;
    end?: string | number | JSX.Element;
    labelProps?: any;
  };

export type FieldInputProps = InputProps & {
  label?: string;
  name: string;
};

export const Input = forwardRef<any, InputProps>(
  ({ hasError, color, mask, maskPlaceholder = null, start, end, ...props }, ref) => {
    let additionalProps: any = {};

    if (props.readOnly) {
      additionalProps = {
        ...additionalProps,
        opacity: '0.3',
        userSelect: 'none',
        cursor: 'not-allowed',
      };
    }

    if (hasError) {
      additionalProps = {
        ...additionalProps,
        color: 'error',
      };
    }

    const styles = {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      margin: '0',
      color: color || 'black',
      pl: start ? 0 : '12px',
      pr: end ? 0 : '12px',
      py: '14px',
      ["&[type='number']::-webkit-inner-spin-button, &[type='number']::-webkit-outer-spin-button"]:
        {
          appearance: 'none',
          margin: 0,
        },
      '&:focus': {
        outline: 'none',
      },
      ...additionalProps,
    };

    if (mask) {
      return (
        <InputMask mask={mask} maskPlaceholder={maskPlaceholder} {...props}>
          {(inputProps: any) => <Box ref={ref} as="input" sx={styles} {...inputProps} />}
        </InputMask>
      );
    }

    return <Box ref={ref} as="input" sx={styles} {...props} />;
  },
);

type InputWrapperProps = InputProps & { hasFocus?: boolean };

export const InputWrapper = ({ hasFocus, hasError, ...props }: InputWrapperProps) => {
  const theme = useTheme();

  let additionalProps: any = {};

  if (hasFocus) {
    additionalProps = {
      ...additionalProps,
      outline: 'none',
      boxShadow: theme.shadows.outline || 'inherit',
      borderColor: 'gray.300',
    };
  }

  if (hasError) {
    additionalProps = {
      ...additionalProps,
      color: 'error',
      borderColor: 'error',
    };
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5px"
      height="42px"
      position="relative"
      transition="all 0.3s ease"
      overflow="hidden"
      {...additionalProps}
      {...props}
    />
  );
};

export const AdornmentWrapper = (props: BoxProps) => (
  <Box
    minWidth={40}
    display="flex"
    alignItems="center"
    justifyContent="center"
    px={2}
    height="100%"
    flex="1"
    bg="gray.50"
    {...props}
  />
);

const Clear = ({ onClick }: Pick<BoxProps, 'onClick'>) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" px={3} height="100%" flex="1">
      <IconButton
        type="button"
        aria-label="Clear"
        icon={<HiOutlineX />}
        size={30}
        onClick={onClick}
        tabIndex={-1}
        hideOutline
      />
    </Box>
  );
};

const FieldInputWrapper = ({
  isFloating,
  children,
}: PropsWithChildren<{ isFloating: boolean }>) => {
  if (isFloating) {
    // TODO: create floating logic
  }

  return <Box position="relative">{children}</Box>;
};

export const FieldInput = forwardRef<any, FieldInputProps>(
  (
    {
      label,
      name,
      color,
      sx,
      type,
      clearable,
      onClear,
      start,
      end,
      hasError,
      onBlur,
      onFocus,
      onChange,
      inputRef,
      required,
      value,
      labelProps,
      ...props
    },
    ref,
  ) => {
    const initFloat = Boolean(
      value !== undefined ||
        props.defaultValue !== undefined ||
        start !== undefined ||
        end !== undefined,
    );
    const hasValue = Boolean(
      (value !== undefined && value !== '') ||
        (props.defaultValue !== undefined && props.defaultValue !== ''),
    );

    const [hasFocus, setHasFocus] = useState(false);

    const shouldFloat = initFloat || hasValue || hasFocus;

    return (
      <FieldInputWrapper isFloating={shouldFloat}>
        {label && (
          <Label htmlFor={name} color={color} required={required} {...labelProps}>
            {label}
          </Label>
        )}
        <InputWrapper sx={sx} color={color} hasFocus={hasFocus} hasError={hasError}>
          {start && <AdornmentWrapper>{start}</AdornmentWrapper>}
          <Input
            type={type}
            hasError={hasError}
            {...props}
            id={name}
            start={start}
            end={end}
            name={name}
            ref={ref || inputRef}
            required={required}
            value={value}
            onChange={e => {
              if (onChange) onChange(e);
            }}
            onBlur={e => {
              setHasFocus(false);
              if (onBlur) onBlur(e);
            }}
            onFocus={e => {
              setHasFocus(true);
              if (onFocus) onFocus(e);
            }}
          />
          {clearable && hasValue && <Clear onClick={onClear} />}
          {end && <AdornmentWrapper>{end}</AdornmentWrapper>}
        </InputWrapper>
      </FieldInputWrapper>
    );
  },
);
