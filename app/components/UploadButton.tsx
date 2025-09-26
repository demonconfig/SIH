import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface UploadButtonProps {
  label: string;
  onFileSelect: (file: DocumentPicker.DocumentPickerResult) => void; // ✅ use the type from function return
}

const UploadButton: React.FC<UploadButtonProps> = ({ label, onFileSelect }) => {
  const handlePress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onFileSelect(result); // ✅ result has correct type
        const fileName = result.assets[0].name || 'Unknown file';
        alert(`File selected: ${fileName}`);
      }
    } catch (err) {
      console.error('Document pick error:', err);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UploadButton;
