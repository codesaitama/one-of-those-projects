import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Task from './src/Task'

export default function App() {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<Array<string>>([])

  const handleOnAddTask = () => {
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
      <View style={styles.bgWrapper}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} value={task} onChangeText={text => setTask(text)} placeholder={"Write a task"} />

          <TouchableOpacity onPress={handleOnAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EAEA'
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121'
  },
  items:{
    marginTop: 30,
  },
  bgWrapper:{
    // marginHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#212121'
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
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
    borderWidth: 1
  },
  addText:{
    fontWeight: 'bold',
    fontSize: 22
  }
});
