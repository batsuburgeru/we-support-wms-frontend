import { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

interface Request {
    id: string;
    type: string;
    status: string;
    time: string;
    created_at: string; // Add this if needed for mapping the created_at field
}

export default function Requests() {
    const router = useRouter();
    const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // For handling error messages

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = 'http://192.168.1.5:3002/purchaseRequests/view-purchase-requests';
                const response = await fetch(API_URL);
                const data = await response.json();
    
                console.log("API Response:", data); // Log for debugging
    
                // Check if data contains the correct structure
                if (data && Array.isArray(data.data)) {
                    // Explicitly type `request` parameter in `map` function
                    const reshapedData: Request[] = data.data.map((request: Request) => ({
                        id: request.id, // Use the actual ID from the response
                        type: "Purchase Request", // Static type for each request
                        status: request.status,
                        time: new Date(request.created_at).toLocaleString(), // Format the creation time
                    }));
    
                    // Filter for pending requests
                    setPendingRequests(reshapedData.filter(req => req.status === "Pending"));
                    setErrorMessage(null); // Clear any previous error messages
                } else if (data.error) {
                    // Handle case where API response contains an error
                    setErrorMessage(data.error);
                } else {
                    // Unexpected response format
                    setErrorMessage("Unexpected response format from the server.");
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                setErrorMessage("Failed to fetch requests. Please try again later.");
            }
        };
    
        fetchData();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white p-4 px-5">
            <Text className="pt-5 text-4xl font-poppins-bold">Pending Requests</Text>
            {errorMessage ? (
                <Text className="text-red-500 text-center mt-4">{errorMessage}</Text>
            ) : (
                <Text className="text-2xl text-black font-poppins-semibold">
                    You have <Text className="text-primary font-poppins-semibold">{pendingRequests.length}</Text> pending requests.
                </Text>
            )}

            <ScrollView className="mt-4">
                {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                        <TouchableOpacity
                            key={req.id}
                            className="bg-tabs rounded-lg p-4 mb-2"
                            onPress={() => router.push(`/requestdetails?id=${req.id}`)} 
                        >
                            <View className="flex-row justify-between">
                                <Text className="font-poppins-semibold text-lg">{req.type}</Text>
                                <Text className="text-gray-500 font-poppins-semibold">{req.time}</Text>
                            </View>
                            <Text className="text-primary font-poppins-semibold">Request ID: {req.id}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    !errorMessage && <Text className="text-gray-500 text-center mt-4">No pending requests.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
