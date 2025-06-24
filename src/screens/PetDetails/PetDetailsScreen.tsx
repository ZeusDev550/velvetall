import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONT_POPPINS } from '../../utils/theme';
import { CustomText } from '../../components/CustomText';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';
import axios from 'axios';

interface PetDetailsForm {
  size: '0-15' | '16-40' | '41-100' | '101+' | '';
  age: 'Puppy' | 'Adult' | '';
  friendlyWithDogs: 'Yes' | 'No' | 'Unsure' | '';
  friendlyWithCats: 'Yes' | 'No' | 'Unsure' | '';
}

type RouteParams = {
  initialData: {
    petType: string;
    dates: string;
    location: string;
  };
};

const PetDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const initialData = route.params?.initialData || { petType: '', dates: '', location: '' };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<PetDetailsForm>({
    size: '',
    age: '',
    friendlyWithDogs: '',
    friendlyWithCats: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...formData,
        petType: initialData.petType,
      };

      console.log('Submitting payload:', payload);
      await axios.post('http://192.168.100.80:5260/api/pets', payload);
      navigation.navigate('Searching');
    } catch (err) {
      setError('Failed to save pet details. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const SelectionButton = ({ 
    selected, 
    onPress, 
    label,
    style = {}
  }: { 
    selected: boolean; 
    onPress: () => void; 
    label: string;
    style?: object;
  }) => (
    <TouchableOpacity
      style={[
        styles.selectionButton,
        selected && styles.selectedButton,
        style
      ]}
      onPress={onPress}
    >
      <CustomText textStyle={[styles.buttonText, selected && styles.selectedButtonText]}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <CustomText textStyle={styles.title}>Tell us about your dogs</CustomText>
          {error ? <CustomText textStyle={styles.errorText}>{error}</CustomText> : null}

          {/* Dog Size Selection */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>Dog size (lbs)</CustomText>
            <View style={styles.optionsRow}>
              {[
                { label: '0-15', value: '0-15' },
                { label: '16-40', value: '16-40' },
                { label: '41-100', value: '41-100' },
                { label: '101+', value: '101+' },
              ].map((option) => (
                <SelectionButton
                  key={option.value}
                  selected={formData.size === option.value}
                  onPress={() => setFormData(prev => ({ ...prev, size: option.value as PetDetailsForm['size'] }))}
                  label={option.label}
                  style={styles.sizeButton}
                />
              ))}
            </View>
          </View>

          {/* Age Selection */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>How old are your dogs?</CustomText>
            <View style={styles.optionsRow}>
              <SelectionButton
                selected={formData.age === 'Puppy'}
                onPress={() => setFormData(prev => ({ ...prev, age: 'Puppy' }))}
                label="Puppy (less than 1 year)"
                style={styles.ageButton}
              />
              <SelectionButton
                selected={formData.age === 'Adult'}
                onPress={() => setFormData(prev => ({ ...prev, age: 'Adult' }))}
                label="Adult"
                style={styles.ageButton}
              />
            </View>
          </View>

          {/* Dog Compatibility */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>Does your dog get along with other dogs?</CustomText>
            <View style={styles.optionsRow}>
              <SelectionButton
                selected={formData.friendlyWithDogs === 'Yes'}
                onPress={() => setFormData(prev => ({ ...prev, friendlyWithDogs: 'Yes' }))}
                label="Yes"
              />
              <SelectionButton
                selected={formData.friendlyWithDogs === 'No'}
                onPress={() => setFormData(prev => ({ ...prev, friendlyWithDogs: 'No' }))}
                label="No"
              />
              <SelectionButton
                selected={formData.friendlyWithDogs === 'Unsure'}
                onPress={() => setFormData(prev => ({ ...prev, friendlyWithDogs: 'Unsure' }))}
                label="Unsure"
              />
            </View>
          </View>

          {/* Cat Compatibility */}
          <View style={styles.section}>
            <CustomText textStyle={styles.sectionTitle}>Does your dog get along with cats?</CustomText>
            <View style={styles.optionsRow}>
              <SelectionButton
                selected={formData.friendlyWithCats === 'Yes'}
                onPress={() => setFormData(prev => ({ ...prev, friendlyWithCats: 'Yes' }))}
                label="Yes"
              />
              <SelectionButton
                selected={formData.friendlyWithCats === 'No'}
                onPress={() => setFormData(prev => ({ ...prev, friendlyWithCats: 'No' }))}
                label="No"
              />
              <SelectionButton
                selected={formData.friendlyWithCats === 'Unsure'}
                onPress={() => setFormData(prev => ({ ...prev, friendlyWithCats: 'Unsure' }))}
                label="Unsure"
              />
            </View>
          </View>
        </View>

        {/* Search Now Button */}
        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <CustomText textStyle={styles.searchButtonText}>
            Search Now
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: FONT_POPPINS.semiBoldFont,
    color: COLORS.TextPrimary,
    marginBottom: 30,
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 15,
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontFamily: FONT_POPPINS.mediumFont,
    color: COLORS.TextPrimary,
    marginBottom: 15,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  selectionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButton: {
    minWidth: 80,
  },
  ageButton: {
    minWidth: 120,
  },
  selectedButton: {
    backgroundColor: '#E6E9E3',
    borderColor: '#E6E9E3',
  },
  buttonText: {
    fontSize: RFValue(14),
    fontFamily: FONT_POPPINS.regularFont,
    color: COLORS.TextPrimary,
    textAlign: 'center',
  },
  selectedButtonText: {
    color: COLORS.TextPrimary,
  },
  searchButton: {
    backgroundColor: '#8FA77F',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    opacity: 0.7,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(16),
    fontFamily: FONT_POPPINS.mediumFont,
  },
});

export default PetDetailsScreen;