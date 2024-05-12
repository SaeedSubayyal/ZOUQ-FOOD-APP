import React, {FC} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ModalProps {
  visible: boolean;
  children: any;
  onPressCross: any;
}

const AppModal: FC<ModalProps> = ({visible, children, onPressCross}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={onPressCross}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}>
            <Text
              style={{
                // backgroundColor: 'red',
                fontSize: 25,
              }}>
              x
            </Text>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
