import React, {useState} from 'react';
import { Button, Dimensions, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Task from './src/Task';
const { width } = Dimensions.get("window");

export default function App() {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<Array<string>>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handleOnAddTask = () => {
    setModalVisible(!isModalVisible)
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

  const toggleModalVisibility = () =>{
    setModalVisible(!isModalVisible)
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
                  taskItems.map((task, index) => <TouchableOpacity key={index} onPress={() => completedTask(index)}><Task text={task} /></TouchableOpacity>)
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

      <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                    <TextInput style={styles.input} value={task} onChangeText={text => setTask(text)} placeholder={"Write a task"} />
                        {/** This button is responsible to close the modal */}
                        <Button title="Close" onPress={toggleModalVisibility} />
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
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    // position: 'absolute', 
    // right: 20,
    // bottom: 0,
  },
  addText:{
    fontWeight: 'bold',
    fontSize: 30,
  },

  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
},
viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
},
modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, 
                { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
},
textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
},
});
