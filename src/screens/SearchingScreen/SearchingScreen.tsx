import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SelectorButton from './components/SelectorButton';
import { useSearchForm } from './hooks/useSearchForm';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomIcon } from '../../components/CustomIcon';
import { CustomText } from '../../components/CustomText';
import { COLORS, SHADOW } from '../../utils/theme';

const SearchingScreen = () => {
  const form = useSearchForm();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomIcon
              type="Ionicons"
              icon="arrow-back"
              size={24}
              color={COLORS.TextPrimary}
            />
          </TouchableOpacity>
        <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey100}>Skip</CustomText>
      </View>

      <View style={[styles.card, SHADOW.dark]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <CustomText color={COLORS.TextPrimary} style={styles.title}>
            Tell us about your dogs
          </CustomText>

          <CustomText textType="BodyLargeSemiBold" color={COLORS.TextPrimary}>Dog size (lbs)</CustomText>
          <View style={styles.optionsRow}>
            {['0-15', '16-40', '41-100', '101+'].map(size => (
              <SelectorButton
                key={size}
                label={size}
                selected={form.dogSize === size}
                onPress={() => form.setDogSize(size)}
              />
            ))}
          </View>

          <CustomText textType="BodyLargeSemiBold" color={COLORS.TextPrimary}>How old are your dogs?</CustomText>
          <View style={styles.optionsRow}>
            {['Puppy (less than 1 year)', 'Adult'].map(age => (
              <SelectorButton
                key={age}
                label={age}
                selected={form.dogAge === age}
                onPress={() => form.setDogAge(age)}
              />
            ))}
          </View>

          <CustomText textType="BodyLargeSemiBold" color={COLORS.TextPrimary}>Does your dog get along with other dogs?</CustomText>
          <View style={styles.optionsRow}>
            {['Yes', 'No', 'Unsure'].map(option => (
              <SelectorButton
                key={option}
                label={option}
                selected={form.getAlongWithDogs === option}
                onPress={() => form.setGetAlongWithDogs(option)}
              />
            ))}
          </View>

          <CustomText textType="BodyLargeSemiBold" color={COLORS.TextPrimary}>Does your dog get along with cats?</CustomText>
          <View style={styles.optionsRow}>
            {['Yes', 'No', 'Unsure'].map(option => (
              <SelectorButton
                key={option}
                label={option}
                selected={form.getAlongWithCats === option}
                onPress={() => form.setGetAlongWithCats(option)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={form.handleSearch}>
        <CustomText textType="BodyLargeSemiBold" color="#fff">Search Now</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(4),
    marginHorizontal: wp(5),
    padding: wp(5),
    height: hp(70),
  },
  scrollContainer: {
    paddingBottom: hp(5),
  },
  title: {
    marginBottom: hp(3),
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: hp(1),
  },
  searchButton: {
    backgroundColor: COLORS.Primary,
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    paddingVertical: hp(2),
    borderRadius: wp(8),
    alignItems: 'center',
  },
});

export default SearchingScreen;
