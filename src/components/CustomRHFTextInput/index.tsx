import React, {FC, ReactNode} from 'react';
import {Controller} from 'react-hook-form';
import {TextStyle, View, ViewStyle} from 'react-native';
import CustomTextInput from '../CustomTextInput';
import {IconType} from '../CustomIcon/interface';
import {RFValue} from 'react-native-responsive-fontsize';
import { COLORS } from '../../utils/theme';

const CustomRHFTextInput: FC<{
  control: any;
  name: string;
  rules?: any;
  secureTextEntry?: boolean;
  defaultValue?: string;
  keyboardType?: any;
  placeholder?: string;
  width?: number;
  multiline?: boolean;
  containerStyle?: any;
  editable?: boolean;
  editField?: boolean;
  textInputRef?: any;
  maxLength?: number;
  changeBorderColorOnFocus?: boolean;
  bottomTextInfo?: string;
  textStyle?: any;
  title?: string;
  titleTextStyle?: ViewStyle | TextStyle;
  numberOfLines?: number;
  important?: boolean;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  type: 'standard' | 'outlined';
  leftImage?: string;
  // iconType?: IconType;
  // iconSize?: number;
  // iconName?: string;
  // iconColor?: string;
  renderLeftIcon?: ReactNode;
  onChangeText?: (value: string) => void;
}> = ({
  control,
  name,
  rules,
  secureTextEntry,
  defaultValue,
  keyboardType,
  placeholder,
  multiline,
  containerStyle,
  editField,
  textInputRef,
  maxLength,
  changeBorderColorOnFocus = false,
  bottomTextInfo,
  textStyle,
  title,
  titleTextStyle,
  numberOfLines,
  important = false,
  disabled = false,
  autoCapitalize,
  type = 'standard',
  leftImage,
  // iconType,
  // iconName,
  // iconSize = RFValue(16),
  // iconColor = COLORS.Black,
  renderLeftIcon,
  onChangeText,
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue || null}
        key={name}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <CustomTextInput
            multiline={multiline}
            keyboardType={keyboardType}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            inputContainerStyle={containerStyle}
            value={value}
            onChangeText={value => {
              onChange(value);
              onChangeText && onChangeText(value);
            }}
            error={error?.message}
            onBlur={onBlur}
            editField={editField}
            name={name}
            textInputRef={textInputRef}
            maxLength={maxLength}
            changeBorderColorOnFocus={changeBorderColorOnFocus}
            bottomTextInfo={bottomTextInfo}
            textStyle={textStyle}
            title={title}
            titleTextStyle={titleTextStyle}
            numberOfLines={numberOfLines}
            important={important}
            disabled={disabled}
            autoCapitalize={autoCapitalize}
            type={type}
            leftImage={leftImage}
            // iconType={iconType}
            // iconName={iconName}
            // iconSize={iconSize}
            // iconColor={iconColor}
            renderLeftIcon={renderLeftIcon}
          />
        )}
      />
    </View>
  );
};

export default CustomRHFTextInput;
