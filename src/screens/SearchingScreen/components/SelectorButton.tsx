import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText } from '../../../components/CustomText';
import { COLORS } from '../../../utils/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface SelectorButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const SelectorButton: React.FC<SelectorButtonProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { borderColor: selected ? COLORS.Primary : COLORS.BorderPrimary, backgroundColor: selected ? COLORS.BorderPrimary : '#fff' }
      ]}
    >
      <CustomText
        textType="BodyMediumRegular"
        color={selected ? COLORS.Primary : COLORS.TextPrimary}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.2,
    borderRadius: wp(6),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    margin: wp(1),
  },
});

export default SelectorButton;
