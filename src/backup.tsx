import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Task from './src/Task';
import { FAB } from 'react-native-elements';

export default function App() {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<Array<string>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOnAddTask = () => {
    setModalVisible(!modalVisible)
    if(!task)return;
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask('')
  }

  const completedTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <>
    <View style={styles.container}>
      {/*Today's tasks */}
      <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's Task</Text>

          <ScrollView>
            <View style={styles.items}>
              {/* This is where all the task will go!*/}
              
                {
                  taskItems && taskItems.length > 0 
                  ? 
                  taskItems.map((task, index) => <TouchableOpacity key={index} onPress={() => completedTask(index)}><Task text={task} /></TouchableOpacity>) 
                  :
                   <Text style={{alignItems: 'center', fontSize: 13, color: 'orange', fontWeight: 'bold'}}>No tasks added</Text>
                }
              
            </View>
          </ScrollView>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        {/* <TextInput style={styles.input} value={task} onChangeText={text => setTask(text)} placeholder={"Write a task"} /> */}

        <TouchableOpacity onPress={handleOnAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput style={styles.input} value={task} onChangeText={text => setTask(text)} placeholder={"Write a task"} />

            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EAEA'
  },
  taskWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
    margin: -5
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121'
  },
  items:{
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#E7EAEA'
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper:{
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    position: 'absolute', 
    right: 20,
    bottom: 0,
  },
  addText:{
    fontWeight: 'bold',
    fontSize: 22,
    
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
