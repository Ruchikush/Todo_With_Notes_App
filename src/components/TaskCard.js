import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../constants/styles';
import colors from '../constants/colors';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[styles.text, { fontWeight: 'bold', textDecorationLine: task.completed ? 'line-through' : 'none' }]}>
          {task.title}
        </Text>
        <TouchableOpacity onPress={onToggle}>
          <Icon 
            name={task.completed ? 'check-box' : 'check-box-outline-blank'} 
            size={24} 
            color={task.completed ? colors.secondary : colors.gray} 
          />
        </TouchableOpacity>
      </View>
      {task.description && (
        <Text style={[styles.text, { fontSize: 14, textDecorationLine: task.completed ? 'line-through' : 'none' }]}>
          {task.description}
        </Text>
      )}
      {task.time && (
        <Text style={[styles.text, { fontSize: 12, color: colors.gray }]}>
          {task.time}
        </Text>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
        <TouchableOpacity onPress={onEdit} style={{ marginRight: 16 }}>
          <Icon name="edit" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="delete" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;