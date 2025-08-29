import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {storeUser} from '../utils/storage';
import colors from '../constants/colors';

const AuthScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      await storeUser(formData);
      if (navigation.replace) {
        navigation.replace('Main');
      } else {
        navigation.navigate('Main');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Header */}
      <ImageBackground
        source={require('../../assets/bg-gradient.png.jpg')}
        style={styles.headerBg}
        resizeMode="cover">
        <Text style={styles.title}>
          {isLogin ? 'Sign in' : 'Create an account'}
        </Text>
        <Text style={styles.subtitle}>
          Let Genie help you stay organized and
        </Text>
        <Text style={styles.subtitle}>productive.</Text>
      </ImageBackground>

      {/* White Card Container */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {/* Full Name */}
          {!isLogin && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#696969"
                value={formData.name}
                onChangeText={text => setFormData({...formData, name: text})}
              />
            </View>
          )}

          {/* Email */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#696969"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
            />
          </View>

          {/* Password */}
         
          <View style={styles.inputContainerpass}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Password"
              placeholderTextColor="#696969"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color="#202124"
              />
            </TouchableOpacity>
          </View>

          {/* Remember me */}
          <View style={styles.rememberRow}>
            <TouchableOpacity
              onPress={() =>
                setFormData({...formData, rememberMe: !formData.rememberMe})
              }
              style={[
                styles.checkbox,
                formData.rememberMe && {backgroundColor: colors.dark},
              ]}>
              {formData.rememberMe && (
                <Icon name="check" size={14} color="#fff" />
              )}
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember me</Text>
          </View>

          {/* Submit button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isLogin ? 'Sign in' : 'Sign up'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Buttons */}
         
          {/* Social Buttons Row */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <AntIcon name="google" size={20} color="#000" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <AntIcon name="apple1" size={20} color="#000" />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Switch */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.switchLink}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  headerBg: {
    height: 265,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.dark,
  },
  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 5,
  },
  scrollContent: {flexGrow: 1},
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    // marginTop: -5, // overlap effect
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputContainerpass: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 48,
    fontSize: 15,
    color: colors.dark,
  },
  rememberRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rememberText: {fontSize: 14, color: colors.dark},
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {color: colors.white, fontSize: 16, fontWeight: '600'},
  dividerRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  divider: {flex: 1, height: 1, backgroundColor: '#ddd'},
  orText: {marginHorizontal: 10, color: colors.gray},
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },

  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  socialText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  switchRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 10},
  switchText: {fontSize: 14, color: colors.gray},
  switchLink: {fontSize: 14, color: colors.dark, fontWeight: '600'},
});

export default AuthScreen;