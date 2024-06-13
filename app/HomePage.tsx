import api, { setAuthToken } from "@/api";
import { Collapsible } from "@/components/Collapsible";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { Calendar } from "react-native-calendars";

interface Todo {
  id: string;
  title: string;
  date: Date | string;
  subject: string;
  status: boolean;
}

interface FetchData {
  id: string;
  email: string;
  password: string;
  name: string;
  todo: Todo[];
}

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [fetch, setFetch] = useState<FetchData>({} as FetchData);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchList();
  }, []);

  const addTodo = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await api.post("list", { title, date: date.toISOString(), subject }, { headers: { Authorization: `Bearer ${token}` } });

      if (title.trim() && subject.trim()) {
        const newTodo: Todo = {
          id: id,
          title: title,
          date: date,
          subject: subject,
          status: status,
        };

        setTodos([...todos, newTodo]);
        setTitle("");
        setSubject("");
        setDate(new Date());
        setStatus(false);
        fetchList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const fetchData = await api.get("list/detail", { headers: { Authorization: `Bearer ${token}` } });

      const todos = fetchData.data.todo.map((todo: Todo) => ({
        ...todo,
        date: new Date(todo.date),
      }));

      setFetch({ ...fetchData.data, todo: todos });
    } catch (error) {
      console.error("Failed to fetch list:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      await api.delete(`list/${id}`, { headers: { Authorization: `Bearer ${token}` } });

      setTodos(todos.filter((todo) => todo.id !== id));
      fetchList();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setCalendarVisible(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setAuthToken(undefined);
      router.replace("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <TextInput style={styles.input} placeholder="Enter task..." value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Subject" value={subject} onChangeText={setSubject} />

      <TouchableOpacity style={styles.dateButton} onPress={() => setCalendarVisible(true)}>
        <Text style={styles.dateText}>Select Date: {date.toDateString()}</Text>
      </TouchableOpacity>

      <Button title="Add Task" onPress={() => addTodo(Math.random().toString())} />

      <FlatList
        data={fetch.todo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Collapsible title={item.title}>
              <Text>{item.subject}</Text>
            </Collapsible>
            <Text>
              {new Date(item.date).toDateString()} - {item.status ? "Completed" : "Incomplete"}
            </Text>
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} />
      </View>

      <Modal visible={isCalendarVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => handleDateChange(new Date(day.dateString))}
              markedDates={{
                [date.toISOString().split("T")[0]]: { selected: true, selectedColor: "orange" },
              }}
            />
            <Button title="Close" onPress={() => setCalendarVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dateButton: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  todoItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonContainer: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
});

export default HomePage;
