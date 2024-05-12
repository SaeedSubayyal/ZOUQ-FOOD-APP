import React, {useState} from 'react';
import {View, Button, Modal, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-date-picker';
import {COLORS} from '../../styles/colors';

interface MyDateProps {
  date: any;
  showDatePicker: boolean;
  handleDateChange: (selectedDate: any) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const MyDatePicker = ({
  date,
  showDatePicker,
  handleDateChange,
  onClose,
  onConfirm,
}: MyDateProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Modal animationType="slide" transparent={true} visible={showDatePicker}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              padding: 20,
            }}>
            <DateTimePicker
              mode="date"
              date={date}
              onDateChange={handleDateChange}
            />
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row',
              }}>
              <TouchableOpacity style={{marginRight: 20}} onPress={onClose}>
                <Text
                  style={{color: COLORS.primary, fontSize: 16, padding: 10}}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm}>
                <Text
                  style={{color: COLORS.primary, fontSize: 16, padding: 10}}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyDatePicker;
