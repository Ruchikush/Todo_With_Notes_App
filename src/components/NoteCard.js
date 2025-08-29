import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../constants/styles';
import colors from '../constants/colors';

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.text, { fontWeight: 'bold' }]}>
        {note.title}
      </Text>
      <Text style={[styles.text, { fontSize: 14 }]}>
        {note.content}
      </Text>
      <Text style={[styles.text, { fontSize: 12, color: colors.gray }]}>
        {new Date(note.date).toLocaleDateString()}
      </Text>
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

export default NoteCard;