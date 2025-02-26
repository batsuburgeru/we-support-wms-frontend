import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { MessageModal } from '@/components';
import icons from '@/constants/icons';

export default function RequestDetails() {
    const router = useRouter();

    // Sample data
    const id = "REQ-20240226-001";
    const type = "Purchase Request";
    const time = "10:30 AM";
    const requester = "John Doe";
    const date = "February 26, 2025";
    const items = [
        { quantity: 2, name: "Laptop", price: "$1200" },
        { quantity: 5, name: "Wireless Mouse", price: "$25" },
        { quantity: 3, name: "Keyboard", price: "$45" },
        { quantity: 3, name: "Keyboard", price: "$45" },
        { quantity: 3, name: "Keyboard", price: "$45" },
        { quantity: 3, name: "Keyboard", price: "$45" },
        { quantity: 3, name: "Keyboard", price: "$45" },
        { quantity: 3, name: "Keyboard", price: "$45" },
    ];

    // State for modals
    const [modalType, setModalType] = useState<string | null>(null);
    const [remarks, setRemarks] = useState("");

    // Handle modal confirmation
    const handleConfirm = () => {
        console.log(`${modalType} confirmed with remarks: ${remarks}`);
        setModalType(null);
        setRemarks("");

        // If Cancel is confirmed, navigate back
        if (modalType === "Cancel") {
            router.back();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-tabs">
            {/* Header Section */}
            <View className="bg-tabs p-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.back} className="w-10 h-10"  />
                </TouchableOpacity>
                <Text className="text-2xl font-poppins-bold mt-2 px-8">{type}</Text>
                <Text className="text-primary font-poppins-semibold px-8">Request ID: {id}</Text>
            </View>

            {/* Details Section */}
            <View className="bg-white rounded-lg flex-1 p-10">
                <Text className="font-poppins-semibold text-lg">Request by: {requester}</Text>
                <Text className="font-poppins text-black">{date},{time}</Text>

                {/* Table Headers */}
                <View className="mt-4 flex-row justify-between">
                    <Text className="font-poppins text-gray-500">Quantity</Text>
                    <Text className="italic text-gray-500">Item</Text>
                    <Text className="italic text-gray-500">Price</Text>
                </View>

                {/* List Items */}
                <View className="border-t mt-2 pt-2">
                    {items.map((item, index) => (
                        <View key={index} className="flex-row justify-between mt-2">
                            <Text>{item.quantity}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-around p-4 bg-white">
                <TouchableOpacity className="bg-primary p-3 px-7 rounded-lg" onPress={() => setModalType("Approve")}>
                    <Text className="text-white font-poppins-bold text-xl">Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-tabs p-3 px-7 rounded-lg" onPress={() => setModalType("Deny")}>
                    <Text className="font-poppins-bold text-xl">Deny</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-tabs p-3 px-7 rounded-lg" onPress={() => setModalType("Cancel")}>
                    <Text className="font-poppins-bold text-xl">Cancel</Text>
                </TouchableOpacity>
            </View>

            {/* Modals */}
            {modalType && (
                <MessageModal
                    visible={!!modalType}
                    title={modalType}
                    remarks={remarks}
                    setRemarks={setRemarks}
                    onClose={() => {
                        setModalType(null);
                        setRemarks("");
                    }}
                    onConfirm={handleConfirm}
                />
            )}
        </SafeAreaView>
    );
}
