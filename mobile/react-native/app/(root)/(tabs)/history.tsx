import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Denys, Cancels } from '@/assets/svg/iconsvg';

interface PurchaseRequest {
    id: string;
    status: "Approved" | "Returned" | "Rejected";
    created_at: string;
    type: string;
}

export default function History() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [filter, setFilter] = useState<"All" | "Approved" | "Returned" | "Rejected">("All");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [requests, setRequests] = useState<PurchaseRequest[]>([]);

    useEffect(() => {
        if (params.status && ["Approved", "Returned", "Rejected"].includes(params.status as string)) {
            setFilter(params.status as "Approved" | "Returned" | "Rejected");
        }
    }, [params.status]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://192.168.1.5:3002/purchaseRequests/read-purchase-requests');
            const result = await response.json();

            if (Array.isArray(result)) {
                const mappedRequests = result.map((item: any) => ({
                    id: item.purchaseRequest.id,
                    status: item.purchaseRequest.status,
                    created_at: item.purchaseRequest.created_at,
                    type: "Purchase Request",
                }));
                setRequests(mappedRequests);
            } else {
                console.error("Unexpected data format:", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
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
            fetchRequests(); // Automatically refresh data every 10 seconds
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Approved":
                return { color: "bg-primary", icon: <Check width={24} height={24} />, displayText: "Approved" };
            case "Returned":
                return { color: "bg-secondary", icon: <Denys width={24} height={24} />, displayText: "Returned" };
            case "Rejected":
                return { color: "bg-gray", icon: <Cancels width={24} height={24} />, displayText: "Rejected" };
            default:
                return { color: "bg-gray-700", icon: <Cancels width={24} height={24} />, displayText: "Unknown" };
        }
    };

    const filteredRequests = requests.filter((req) =>
        filter === "All" ? ["Approved", "Returned", "Rejected"].includes(req.status) : req.status === filter
    );

    return (
        <SafeAreaView className="flex-1 bg-white p-4 mb-20 px-5">
            <Text className="text-4xl font-poppins-bold pt-5">Completed Requests</Text>

            {/* Filter Buttons */}
            <View className="flex-row justify-between my-4">
                {["All", "Approved", "Returned", "Rejected"].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={{
                            backgroundColor: filter === status ? "#EB5E28" : "#d1d5db",
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            borderRadius: 8,
                        }}
                        onPress={() => setFilter(status as "All" | "Approved" | "Returned" | "Rejected")}
                    >
                        <Text
                            className="font-poppins-semibold"
                            style={{
                                color: filter === status ? "white" : "black",
                                fontWeight: "600",
                            }}
                        >
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Requests List */}
            {loading ? (
                <ActivityIndicator size="large" color="#EB5E28" />
            ) : (
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshRequests} />}
                >
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((req) => {
                            const { color, icon, displayText } = getStatusStyle(req.status);
                            return (
                                <TouchableOpacity
                                    key={req.id}
                                    className="bg-tabs rounded-lg p-4 mb-2"
                                    onPress={() => router.push(`/requestdetails?id=${req.id}`)}
                                >
                                    <View className="flex-row justify-between">
                                        <Text className="text-lg font-poppins-bold">{req.type}</Text>
                                        <Text className="text-black font-poppins-semibold">
                                            {new Date(req.created_at).toLocaleString()}
                                        </Text>
                                    </View>
                                    <Text className="text-primary font-poppins-semibold">Request ID: {req.id}</Text>
                                    <View className={`mt-2 p-2 rounded-lg ${color} flex-row justify-between items-center`}>
                                        <Text className="text-white font-poppins-bold">{displayText}</Text>
                                        {icon}
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    ) : (
                        <Text className="text-center text-gray-500 mt-4">No requests found.</Text>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}