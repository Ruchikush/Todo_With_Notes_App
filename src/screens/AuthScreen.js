import React, {useState, useEffect} from 'react';
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
import {storeUser, authenticateUser} from '../utils/storage';
import colors from '../constants/colors';

const AuthScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    const user = await getUser();
    if (user) {
      navigation.replace('Main');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation (only for signup)
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isLogin) {
        // Login logic
        await authenticateUser(formData.email, formData.password);
        Alert.alert('Success', 'Logged in successfully');
      } else {
        // Signup logic
      await storeUser(formData);
        Alert.alert('Success', 'Account created successfully');
      }

      if (navigation.replace) {
        navigation.replace('Main');
      } else {
        navigation.navigate('Main');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
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
            <View>
              <View
                style={[
                  styles.inputContainer,
                  errors.name && styles.inputError,
                ]}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#696969"
                value={formData.name}
                onChangeText={text => setFormData({...formData, name: text})}
              />
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
          )}

          {/* Email */}
          <View>
            <View
              style={[
                styles.inputContainer,
                errors.email && styles.inputError,
              ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#696969"
              keyboardType="email-address"
                autoCapitalize="none"
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
            />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Password */}
          <View>
            <View
              style={[
                styles.inputContainerpass,
                errors.password && styles.inputError,
              ]}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Password"
              placeholderTextColor="#696969"
              secureTextEntry={!showPassword}
              value={formData.password}
                onChangeText={text =>
                  setFormData({...formData, password: text})
                }
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color="#202124"
              />
            </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
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
            <TouchableOpacity
              onPress={() => {
                setIsLogin(!isLogin);
                setErrors({}); // Clear errors when switching modes
              }}>
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

  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 15,
    marginLeft: 15,
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
