import { Tag, TagProps, useColorMode } from "@chakra-ui/react";
import { Label } from "../../interfaces/Operation";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";

export interface LabelTagsProps extends TagProps {
  label: Label;
}

export const LabelTag = ({ label, ...props }: LabelTagsProps) => {
  const { colorMode } = useColorMode();
  const {t} = useTranslation('ns1',{ i18n } );

  const returnColor = () => {
    // let tempColor = '';
    if (label?.color_rgb == 'blue') {
      if (colorMode === 'dark')   { 
        return label?.color_rgb + ".600" 
      }
      else {
        return label?.color_rgb + ".300"
      }
    }
    else {
      if (colorMode === 'dark')   { 
        return label?.color_rgb + ".300"
      }
      else {
        return label?.color_rgb + ".100"
      }
    }
  }
  return (
    <Tag 
      key={label?.label_id} 
      color={ colorMode === 'dark' ? 'chakra-body-text' : '#1a202c' } 
      bg={ returnColor() } 
      {...props}> 
      {t(label?.name)} 
    </Tag>
  );
};
export default LabelTag;
