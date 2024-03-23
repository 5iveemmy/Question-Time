import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    rounded: 'md',
    border: '1px solid gray.200',
    boxShadow: 'none',
    height: '10',
    fontSize: '16px',
    _placeholder: {
      fontSize: 'sm',
      color: 'gray.300',
    },
    _focus: {
      borderColor: 'yellow',
      boxShadow: 'none',
    },
  },
});

const sizes = {
  md: definePartsStyle({
    field: {
      //borderRadius: '0px',
    },
  }),
};

export const inputTheme = defineMultiStyleConfig({ baseStyle, sizes });
