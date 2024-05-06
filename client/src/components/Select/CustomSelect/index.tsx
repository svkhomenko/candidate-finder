import { Icon, useToken } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
import { ClearIndicatorProps, components } from 'react-select';
import Select from 'react-select';

const CustomSelect = (props: any) => {
  const [green100, green200] = useToken('colors', ['green.100', 'green.500']);

  const ClearIndicator = (props: ClearIndicatorProps) => {
    return (
      <components.ClearIndicator {...props}>
        <Icon as={FiX} boxSize={5} />
      </components.ClearIndicator>
    );
  };

  return (
    <Select
      {...props}
      components={{ ClearIndicator }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: green200,
          primary25: green100,
          primary50: green100,
          primary75: green100,
        },
      })}
      menuPortalTarget={document.body}
    />
  );
};

export default CustomSelect;
