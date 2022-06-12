import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CommentItem = (comment)=>{
    console.log(comment);
    return(
        <View style={styles.itemContainer}>
            <Text style={{color:'black'}}>{'hihi' + comment.commentDate}</Text>
        </View>
    )
}
export default CommentItem;
const styles = StyleSheet.create({
    itemContainer:{
        backgroundColor: 'grey', 
        marginVertical: 10,
        paddingVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

})