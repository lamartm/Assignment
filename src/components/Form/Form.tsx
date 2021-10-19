import { HiOutlineMail } from 'react-icons/hi';

import { Button } from '@/components/shared/Button';
import { FinalForm, FinalFormProps } from '@/components/shared/FinalForm/FinalForm';
import { FormInput } from '@/components/shared/FinalForm/FormInput';
import { Column, Flex, Row, Stack } from '@/components/shared/Grid';
import { Heading } from '@/components/shared/Text';

export type FormProps = FinalFormProps<any>;

export function Form({ ...props }: FormProps) {
  return (
    <FinalForm {...props}>
      {({ form }) => (
        <>
          <Stack padding="70px 0 100px 0" space={4} flexDirection={['column', 'row']}>
            <Heading as="h1" textAlign={['center', 'initial']} paddingBottom={['30px', '0px']}>
              QUESTIONS? WE ARE HERE TO HELP!
            </Heading>
            <Flex flexDirection="column" paddingLeft="30px">
              <Row>
                <Column col={6} paddingBottom="40px">
                  <FormInput
                    name="firstname"
                    label="NAME"
                    sx={{
                      border: 'none',
                      borderRadius: '0px',
                      borderBottom: '1px lightgrey solid',
                    }}
                    clearable
                  />
                </Column>
                <Column col={6}>
                  <FormInput
                    start={<HiOutlineMail />}
                    type="email"
                    name="email"
                    label="EMAIL"
                    sx={{
                      border: 'none',
                      borderRadius: '0px',
                      borderBottom: '1px lightgrey solid',
                    }}
                    clearable
                  />
                </Column>
                <Column col={6}>
                  <FormInput
                    name="lastname"
                    label="MESSAGE"
                    sx={{
                      border: 'none',
                      borderRadius: '0px',
                      borderBottom: '1px lightgrey solid',
                    }}
                  />
                </Column>
              </Row>
              <Column textAlign={['center', 'initial']} paddingTop="40px">
                <Button
                  sx={{
                    background: 'blue',
                    borderRadius: '0px',
                    padding: '15px 30px 15px 30px',
                  }}
                  type="submit">
                  SEND
                </Button>
              </Column>
            </Flex>
          </Stack>
        </>
      )}
    </FinalForm>
  );
}
