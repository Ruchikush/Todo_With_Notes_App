import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import NotesScreen from './src/screens/NotesScreen';
import CustomTabBar from './src/components/CustomTabBar';
import { getUser } from './src/utils/storage';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [currentScreen, setCurrentScreen] = useState('Main');
  const [screenParams, setScreenParams] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      setIsAuthenticated(!!user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const navigate = (screen: string, params?: any) => {
    setCurrentScreen(screen);
    if (params) {
      setScreenParams(params);
    }
  };

  const goBack = () => {
    setCurrentScreen('Main');
    setScreenParams({});
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('Main');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('Main');
  };

  const renderScreen = () => {
    const navigation = { 
      navigate, 
      goBack,
      replace: (screen: string) => {
        if (screen === 'Main') {
          handleLogin();
        } else if (screen === 'Auth') {
          handleLogout();
        }
      }
    };

    if (!isAuthenticated) {
      return <AuthScreen navigation={navigation} />;
    }

    switch (currentScreen) {
      case 'TaskForm':
        return <TaskFormScreen navigation={navigation} route={{ params: screenParams }} />;
      case 'NoteForm':
        return <TaskFormScreen navigation={navigation} route={{ params: screenParams }} />;
      case 'Main':
      default:
        if (activeTab === 'Home') {
          return <HomeScreen navigation={{...navigation, logout: handleLogout}} />;
        } else {
          return <NotesScreen navigation={navigation} />;
        }
    }
  };

  if (loading) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#38514A"
        translucent={true}
      />
      
      {renderScreen()}
      
      {isAuthenticated && currentScreen === 'Main' && (
        <CustomTabBar
          state={{
            index: activeTab === 'Home' ? 0 : 1,
            routes: [
              { key: '1', name: 'Home' },
              { key: '2', name: 'Notes' }
            ]
          }}
          navigation={{
            navigate: (screen: string) => setActiveTab(screen),
            emit: () => ({ defaultPrevented: false })
          }}
          descriptors={{
            '1': { options: { tabBarLabel: 'Home' } },
            '2': { options: { tabBarLabel: 'Notes' } }
          }}
        />
      )}
    </View>
  );
};

export default App;