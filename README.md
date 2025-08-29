# 📌 React Native Interview Task: To-Do & Notes App

A simple **To-Do & Notes App** built with **React Native** as part of an interview task.  
The app demonstrates UI design, state management, persistent storage, API usage, and clean code structure.  

---
## Install dependencies:
npm install

## Run the app:
npx react-native run-android   # For Android
npx react-native run-ios 

## 🚀 Features

### 🔑 Authentication
- User **Login** and **Logout** functionality.
- **Validation** for empty fields and incorrect credentials.
- **Local storage management** with AsyncStorage.
- Prevents **duplicate user registration**.
- Handles **edge cases** like:
  - Already registered user.
  - After login, user cannot directly navigate back to login screen without logging out and Vice-Versa.

### 📝 To-Do
- **Home Screen** with a task list (FlatList).
- Each task includes:
  - Title
  - Description
  - Status (**Pending / Completed**)
- **Toggle task status** (complete/incomplete).
- **Delete tasks**.
- **Add/Edit task screen** with form validation.
- **Reusable TaskCard component** for consistency.
- Handles **empty list** gracefully.

### 🗒️ Notes
- A dedicated **Notes screen/tab** to add free-form notes.
- Stored in **AsyncStorage** for persistence.

### ⚙️ Technical Implementation
- **React Navigation** (Stack + Bottom Tabs).
- **React Native core components** (View, Text, FlatList, TouchableOpacity, TextInput, etc.).
- **AsyncStorage** for persistent local storage.
- **Reusable components** for clean code.
- **Animations** for adding/deleting tasks.
- **Search & Filter** for tasks (e.g., show only completed).

### 🌐 API Integration
- Integrated with a mock API (`https://jsonplaceholder.typicode.com/`) to demonstrate API handling.
- Example: Fetch tasks or notes as dummy data.

---

## 📌 Approach & Assumptions

### **Approach**
- Focused on clean UI + smooth UX.
- Used **React Navigation** for structured navigation flow.
- Managed state using **React hooks** with **AsyncStorage** for persistence.
- Created reusable components for tasks, notes, inputFileds, tabBar and buttons.
- Added form validation and edge-case handling for reliability.

### **Assumptions**
- user login system Implemented
- Data persistence handled **locally** via AsyncStorage.
- API used only for demonstration purposes (mock data).

---

## 📜 License
This project is created for interview purposes. Free to use and extend.

---

## 👨‍💻 Developed by
**[Ruchika Kushwah]**