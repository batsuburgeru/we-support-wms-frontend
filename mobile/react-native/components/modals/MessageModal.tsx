import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

// Define the MessageModalProps interface to define the types of props passed to the MessageModal component
interface MessageModalProps {
    visible: boolean; // Determines if the modal is visible or not
    title: string; // Represents the title of the modal (Approve, Return, or Reject)
    remarks: string; // Holds the user input for remarks
    setRemarks: (text: string) => void; // Function to update the remarks state
    onClose: () => void; // Function to close the modal
    onConfirm: () => void; // Function to handle confirmation action
    id: string; // Unique identifier for the purchase request
}

// Functional component MessageModal with destructured props
const MessageModal: React.FC<MessageModalProps> = ({
    visible,
    title,
    remarks,
    setRemarks,
    onClose,
    id,
}) => {
    const [loading, setLoading] = useState(false); // State to indicate loading during the confirmation process
    const router = useRouter(); // Provides routing functionality to navigate between screens

    // Determine the subtitle message based on the title of the modal
    const subtitle =
        title === "Approve"
            ? "Approve this request?"
            : title === "Return"
            ? "Return this request?"
            : "Reject this request?";

    // Function to handle the confirmation process
    const handleConfirm = async () => {
        // Set default remarks if no input is provided by the user
        const defaultRemarks = 
            title === "Approve"
                ? "Approved without additional comments."
                : title === "Return"
                ? "Returned without specific notes."
                : "Rejected without further explanation.";

        // Use remarks input or default remarks
        const finalRemarks = remarks.trim() || defaultRemarks;

        setLoading(true); // Set loading state to true during the process

        // Determine the status based on the title
        const status = 
            title === "Approve"
                ? "Approved"
                : title === "Return"
                ? "Returned"
                : "Rejected";

        // Payload to be sent to the server
        const payload = {
            status,
            note: finalRemarks,
        };

        console.log("Updating status for ID:", id); // Log the ID being updated
        console.log("Payload:", payload); // Log the payload details

        try {
            // API URL for updating the purchase request status
            const API_URL = `http://192.168.1.22:3002/purchaseRequests/update-purchase-request-status/${id}`;

            // Make a PUT request to update the status
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json(); 
                console.log("Status updated successfully:", result); 
                router.push('/request'); 
            } else {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                alert("Failed to update status. Server responded with: " + errorText); 
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
                    {/* Modal Title */}
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

                    {/* Remarks Input Field */}
                    <TextInput
                        className="mt-4 p-3 border rounded-lg bg-light h-52 text-black"
                        placeholder={
                            title === "Approve"
                                ? "Your request has been approved..."
                                : "Unfortunately, I am denying this request because..."
                        }
                        multiline
                        value={remarks} // Bind the remarks state to the TextInput
                        onChangeText={setRemarks} // Update remarks state on user input
                    />

                    {/* Action Buttons */}
                    <View className="flex-row mt-6">
                        <TouchableOpacity
                            onPress={handleConfirm} // Trigger the confirmation process
                            className={`bg-primary px-8 py-3 rounded-lg mx-5 ${loading ? "opacity-50" : ""}`}
                            disabled={loading} // Disable button during loading
                        >
                            <Text className="text-white font-poppins-bold text-lg">
                                {loading ? "Processing..." : "Confirm"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose} // Trigger the modal close function
                            className="bg-tabs px-8 py-3 rounded-lg mr-10"
                        >
                            <Text className="font-poppins-bold text-lg">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default MessageModal; // Export the component for reuse