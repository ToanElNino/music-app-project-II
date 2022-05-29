import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const UserInfoItem = ({labelTitle, infoTitle}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.labelTitle}>{labelTitle}</Text>
      <Text style={styles.infoTitle}>{infoTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.7,
    marginTop: 7,
    paddingVertical: 5,
  },
  labelTitle: {
    fontWeight: '900',
    fontSize: 14,
    marginVertical: 8,
    color: '#6D1D3A',
    width: 100,
  },
  infoTitle: {
    marginVertical: 8,
    color: '#242A53',
  },
});

export default UserInfoItem;