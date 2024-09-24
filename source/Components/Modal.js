import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { Icons } from '../Assets'; // Adjust the import path as necessary

class Modals extends Component {
    render() {
        const { visible, onClose, headtext, destext } = this.props;

        return (
            <Modal visible={visible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={Icons.lockerrorimage} style={styles.modalImg} />
                        <Text style={styles.modalTitle}>{headtext}</Text>
                        <View style={styles.txtHead}>
                            <Text style={styles.modalTxt}>
                                {destext}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: '#2a7bbb',
        padding: 10,
        borderRadius: 8,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Modals;
