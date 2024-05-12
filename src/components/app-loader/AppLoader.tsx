import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface LoaderProps {
  loading: boolean;
}
const AppLoader: FC<LoaderProps> = ({loading}) => {
  return (
    <Modal
      transparent
      visible={loading}
      onRequestClose={() => {}} // You can define a function to handle modal close if needed
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff', // White background for the modal content
    padding: 20,
    borderRadius: 10,
  },
});
