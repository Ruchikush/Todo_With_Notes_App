# 📌 React Native Interview Task: To-Do & Notes App

A simple **To-Do & Notes App** built with **React Native** as part of an interview task.  
The app demonstrates UI design, state management, persistent storage, API usage, and clean code structure.  

---
## Install dependencies:
npm install

## Run the app:
npx react-native run-android   # For Android
npx react-native run-ios 

## Animation 
branch - "feature/animation" - checkout to this branch

## 🚀 Features

### 🔑 Authentication
- User **Login** and **Logout** functionality.
- **Validation** for empty fields and incorrect credentials.
- **Local storage management** with AsyncStorage.
- Prevents **duplicate user registration**.
- Handles **edge cases** like:
  - Already registered user.
  - password validations
  - After logout user directly navigate to the login page, after refresh the page user still on login page.

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
- user able to create, edit and delete the notes.
- Stored in **AsyncStorage** for persistence.

### ⚙️ Technical Implementation
- **React Navigation** (Stack + Bottom Tabs).
- **React Native core components** (View, Text, FlatList, TouchableOpacity, TextInput, etc.).
- **AsyncStorage** for persistent local storage.
- **Reusable components** for clean code.
- **Animations** added on the Task page - If you want to see the animation checkout to "feature/animation" branch and see the changes.
- **Search & Filter** for tasks, this also support search after applying complete, pending filter.

### 🌐 API Integration
- Integrated with a mock API (`https://jsonplaceholder.typicode.com/`) to demonstrate API handling.(get, put, post, delete)
- Example: Fetch tasks and handel notes data in local storage.

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