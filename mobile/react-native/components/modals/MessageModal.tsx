import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

interface MessageModalProps {
    visible: boolean;
    title: string;
    remarks: string;
    setRemarks: (text: string) => void;
    onClose: () => void;
    onConfirm: () => void;
    id: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ visible, title, remarks, setRemarks, onClose, id }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter(); 

    const subtitle =
        title === "Approve"
            ? "Approve this request?"
            : title === "Return"
            ? "Return this request?"
            : "Reject this request?";

    const handleConfirm = async () => {
        if (!remarks.trim()) {
            alert("Please provide remarks before confirming.");
            return;
        }

        setLoading(true);

        try {
            const API_URL = `http://192.168.68.104:3002/purchaseRequests/update-purchase-request-status/${id}`;
            const payload = {
                status: title === "Approve" ? "Approved" : title === "Return" ? "Returned" : "Rejected",
                note: remarks,
            };

            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log("Status updated successfully!");
                // Navigate back to index.tsx after successful update
                router.push('/');
            } else {
                alert("Failed to update status. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please check your connection and try again.");
            console.error("Error occurred while updating status:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-light p-6 rounded-lg w-4/5 shadow-tabs">
                    {/* Title */}
                    <Text className="text-2xl font-poppins-bold text-center">
                        <Text
                            className={
                                title === "Approve"
                                    ? "text-primary"
                                    : title === "Return" || title === "Reject"
                                    ? "text-red-600"
                                    : "text-black"
                            }
                        >
                            {title}
                        </Text>{" "}
                        request
                    </Text>
                    <Text className="text-lg text-center mt-2 font-poppins-semibold">{subtitle}</Text>

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
                        <TouchableOpacity
                            onPress={handleConfirm}
                            className={`bg-primary px-8 py-3 rounded-lg mx-5 ${loading ? "opacity-50" : ""}`}
                            disabled={loading}
                        >
                            <Text className="text-white font-poppins-bold text-lg">
                                {loading ? "Processing..." : "Confirm"}
                            </Text>
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