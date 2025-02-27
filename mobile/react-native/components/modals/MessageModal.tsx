import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';

interface MessageModalProps {
    visible: boolean;
    title: string;
    remarks: string;
    setRemarks: (text: string) => void;
    onClose: () => void;
    onConfirm: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ visible, title, remarks, setRemarks, onClose, onConfirm }) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-light p-6 rounded-lg w-4/5 shadow-tabs">
                    {/* Modal Title */}
                        <Text className="text-2xl font-poppins-bold text-center">
                            <Text className={title === "Approve" ? "text-primary" : title === "Deny"||"Cancel" ? "text-red-600" : "text-black" }>
                                {title}
                            </Text> request?
                        </Text>
                    {/* Remarks Input */}
                    <TextInput
                        className="mt-4 p-3 border rounded-lg bg-light h-52 text-black"
                        placeholder={
                            title === "Approve"
                                ? "Your request has been approved..."
                                : "Unfortunately, I am denying this request because..."
                        }
                        multiline
                        value={remarks}
                        onChangeText={setRemarks}
                    />

                    {/* Buttons */}
                    <View className="flex-row mt-6">
                        <TouchableOpacity onPress={onConfirm} className="bg-primary px-8 py-3 rounded-lg mx-5">
                            <Text className="text-white font-poppins-bold text-lg">Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} className="bg-tabs px-8 py-3 rounded-lg mr-10">
                            <Text className="font-poppins-bold text-lg">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default MessageModal;
