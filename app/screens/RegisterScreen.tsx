// app/screens/RegisterScreen.tsx
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import UploadButton from '../components/UploadButton';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [passportOrAadhar, setPassportOrAadhar] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [hotel, setHotel] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [pdfFile, setPdfFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const handleRegister = () => {
    if (!fullName || !passportOrAadhar || !email || !destination || !pdfFile) {
      Alert.alert('Error', 'Please fill all required fields and upload your document');
      return;
    }

    // TODO: Call backend API to register the user and upload PDF
    console.log({
      fullName,
      passportOrAadhar,
      email,
      destination,
      hotel,
      itinerary,
      emergencyContact,
      pdfFileUri: pdfFile.uri,
      pdfFileName: pdfFile.name,
    });

    Alert.alert('Success', 'User Registered Successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Passport / Aadhaar No"
        value={passportOrAadhar}
        onChangeText={setPassportOrAadhar}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <UploadButton
        label="Upload Passport / Aadhaar PDF"
        onFileSelect={(file) => setPdfFile(file)}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        style={styles.input}
        placeholder="Hotel"
        value={hotel}
        onChangeText={setHotel}
      />

      <TextInput
        style={styles.input}
        placeholder="Trip Itinerary"
        value={itinerary}
        onChangeText={setItinerary}
      />

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#10B981', // green-500
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegisterScreen;
