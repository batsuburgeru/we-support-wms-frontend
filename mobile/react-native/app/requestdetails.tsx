import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Back } from '@/assets/svg/iconsvg';
import { MessageModal } from '@/components';

interface RequestItem {
    name: string;
    quantity: number;
    price: string;
    image: string | null;
}

interface RequestDetails {
    id: string;
    type: string;
    status: string;
    requester: string;
    date: string;
    time: string;
    items: RequestItem[];
    note: string;
}

export default function RequestDetails() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); 

    const [request, setRequest] = useState<RequestDetails | null>(null); // Explicitly typed state
    const [modalType, setModalType] = useState<string | null>(null);
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const API_URL = 'http://192.168.1.5:3002/purchaseRequests/read-purchase-requests';
                const response = await fetch(API_URL);
                const data = await response.json();

                console.log("API Response:", data); // Debugging log

                if (data && Array.isArray(data.data)) {
                    const matchedRequest = data.data.find((req: any) => req.purchaseRequest.id === id);
                    if (matchedRequest) {
                        setRequest({
                            id: matchedRequest.purchaseRequest.id,
                            type: "Purchase Request",
                            status: matchedRequest.purchaseRequest.status,
                            requester: matchedRequest.purchaseRequest.created_by,
                            date: new Date(matchedRequest.purchaseRequest.created_at).toLocaleDateString(),
                            time: new Date(matchedRequest.purchaseRequest.created_at).toLocaleTimeString(),
                            items: matchedRequest.prItems.map((item: { product_id: string; quantity: number; unit_price: string }) => ({
                                name: `Product ID: ${item.product_id}`, // Replace with actual product name if available
                                quantity: item.quantity,
                                price: `$${item.unit_price}`,
                                image: null, // Replace with a valid image URL if available
                            })),
                            note: matchedRequest.deliveryNote?.note || "",
                        });
                    } else {
                        console.error("No matching request found for ID:", id);
                    }
                } else {
                    console.error("Invalid response format from the server.");
                }
            } catch (error) {
                console.error("Error fetching request details:", error);
            }
        };

        fetchRequestDetails();
    }, [id]);

    const handleConfirm = () => {
        console.log(`${modalType} confirmed with remarks: ${remarks}`);
        setModalType(null);
        setRemarks("");

        if (modalType === "Cancel") {
            router.back();
        }
    };

    if (!request) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text className="text-lg font-bold">Request not found!</Text>
                <TouchableOpacity onPress={() => router.back()} className="bg-primary p-3 mt-4 rounded-lg">
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-tabs">
            {/* Header Section */}
            <View className="bg-tabs p-4 flex-row items-center pt-5">
                <TouchableOpacity onPress={() => router.back()} className="mr-2">
                    <Back width={30} height={30} />
                </TouchableOpacity>
            </View>
    
            <View className="pl-14">
                <Text className="text-2xl font-poppins-bold">{request.type}</Text>
                <Text className="text-primary font-poppins-semibold">Request ID: {request.id}</Text>
                <Text className="text-lg font-poppins-semibold mt-1">
                    Status: {request.status ? request.status : "Unknown"}
                </Text>
            </View>

            {/* Details Section */}
            <View className="bg-white rounded-lg flex-1 p-10">
                <Text className="font-poppins-semibold text-lg">Requested by: {request.requester}</Text>
                <Text className="font-poppins text-black">{request.date}, {request.time}</Text>

                {/* List Items with Images */}
                <ScrollView className="border-t mt-2 pt-2">
                    {request.items.map((item: RequestItem, index: number) => (
                        <View key={index} className="mt-4 p-4 rounded-lg bg-tabs flex-row items-center">
                            {/* <Image 
                             source={item.image ? { uri: item.image } : require('@/assets/images/fallback.png')} 
                             style={{ width: 50, height: 50, marginRight: 10, borderRadius: 5 }} 
                            /> */}
                            <View className="flex-1">
                                <Text className="font-poppins font-bold">{item.name}</Text>
                                <View className="flex-row justify-between mt-2">
                                    <Text className="font-poppins">Quantity: {item.quantity}</Text>
                                    <Text className="font-poppins">Price: {item.price}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Note Section */}
                    {request.note && (
                        <View className="mt-4 p-4 bg-gray-200 rounded-lg">
                            <Text className="font-poppins-bold text-lg">Note:</Text>
                            <Text className="font-poppins text-black mt-1">{request.note}</Text>
                        </View>
                    )}
                </ScrollView>
            </View>

            {/* Action Buttons - Only Show if Status is Pending */}
            {request.status === "Pending" && (
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
            )}

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
