import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import UploadButton from './components/UploadButton';

export default function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passportOrAadhar, setPassportOrAadhar] = useState('');
  const [destination, setDestination] = useState('');
  const [hotel, setHotel] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [pdfFile, setPdfFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);

  const handleRegister = async () => {
    if (!pdfFile || !('uri' in pdfFile)) {
      Alert.alert('Please select a PDF file');
      return;
    }

    const uri = (pdfFile as any).uri as string;
    const name = (pdfFile as any).name ?? uri.split('/').pop() ?? 'document.pdf';

    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('passport_or_aadhar', passportOrAadhar);
    formData.append('destination', destination);
    formData.append('hotel', hotel);
    formData.append('itinerary', itinerary);
    formData.append('emergency_contact', emergencyContact);
    formData.append('pdf', {
      uri,
      name: name,
      type: 'application/pdf'
    } as any);

    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      Alert.alert('Success', `User ID: ${data.user_id}\nBlockchain tx: ${data.blockchain_tx}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Passport/Aadhar" value={passportOrAadhar} onChangeText={setPassportOrAadhar} style={styles.input} />
      <TextInput placeholder="Destination" value={destination} onChangeText={setDestination} style={styles.input} />
      <TextInput placeholder="Hotel" value={hotel} onChangeText={setHotel} style={styles.input} />
      <TextInput placeholder="Itinerary" value={itinerary} onChangeText={setItinerary} style={styles.input} />
      <TextInput placeholder="Emergency Contact" value={emergencyContact} onChangeText={setEmergencyContact} style={styles.input} />
      <UploadButton {...({ label: "Select PDF", onFileSelect: setPdfFile } as any)} />
      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 10, borderRadius: 6 }
});
