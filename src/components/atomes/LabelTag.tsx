import { Tag, TagProps, useColorMode } from "@chakra-ui/react";
import { Label } from "../../interfaces/Operation";

export interface LabelTagsProps extends TagProps {
  label: Label;
}

export const LabelTag = ({ label, ...props }: LabelTagsProps) => {
  const { colorMode } = useColorMode();
  return (
    <Tag 
      key={label?.label_id} 
      color={ colorMode === 'dark' ? 'chakra-body-text' : '#1a202c' } 
      bg={ colorMode === 'dark' ? label?.color_rgb + ".300" : label?.color_rgb + ".100"} 
      {...props}> 
      {label?.name} 
    </Tag>
  );
};
export default LabelTag;
