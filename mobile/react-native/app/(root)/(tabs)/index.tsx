import { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';

interface Request {
    id: string;
    type: string;
    status: string;
    time: string;
    date: string;
    created_at: string;
}

export default function Requests() {
    const router = useRouter();
    const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRequests = async () => {
        try {
            const API_URL = 'http://192.168.1.5:3002/purchaseRequests/view-purchase-requests';
            const response = await fetch(API_URL);
            const data = await response.json();

            console.log("API Response:", data);

            if (data && Array.isArray(data.data)) {
                const reshapedData: Request[] = data.data.map((request: Request) => ({
                    id: request.id,
                    type: "Purchase Request",
                    status: request.status,
                    date: new Date(request.created_at).toLocaleDateString(),
                    time: new Date(request.created_at).toLocaleTimeString(),
                }));

                setPendingRequests(reshapedData.filter(req => req.status === "Pending"));
                setErrorMessage(null);
            } else if (data.error) {
                setErrorMessage(data.error);
            } else {
                setErrorMessage("Unexpected response format from the server.");
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            setErrorMessage("Failed to fetch requests. Please try again later.");
        }
    };

    const refreshRequests = async () => {
        setRefreshing(true);
        await fetchRequests();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchRequests();

        const interval = setInterval(() => {
            fetchRequests();
        }, 10000); // Refresh every 30 seconds

        return () => clearInterval(interval); // Cleanup interval
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

            <ScrollView
                className="mt-4 mb-20"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshRequests} />}
            >
                {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                        <TouchableOpacity
                            key={req.id}
                            className="bg-tabs rounded-lg p-4 mb-2"
                            onPress={() => router.push(`/requestdetails?id=${req.id}`)}
                        >
                            <View className="flex-row justify-between">
                                <Text className="font-poppins-bold text-lg">{req.type}</Text>
                                <Text className="text-black font-poppins-semibold">{req.date}</Text>
                            </View>
                            <View className="flex-row justify-between items-center flex-wrap">
                            <Text className="text-primary font-poppins-semibold flex-shrink">
                            Request ID:
                            </Text>
                            <Text className="text-black font-poppins-semibold">
                            {req.time}
                            </Text>
                            <Text className="text-primary font-poppins-semibold">
                            {req.id}
                            </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    !errorMessage && <Text className="text-gray-500 text-center mt-4">No pending requests.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}