import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DoneRequests } from '@/components/data/requests';
import {Check, Denys, Cancels} from '@/assets/svg/iconsvg';


export default function History() {
    const router = useRouter();
    const params = useLocalSearchParams(); 
    const [filter, setFilter] = useState<"All" | "Approved" | "Denied" | "Cancelled">("All");

    useEffect(() => {
        if (params.status && ["Approved", "Denied", "Cancelled"].includes(params.status as string)) {
            setFilter(params.status as "Approved" | "Denied" | "Cancelled");
        }
    }, [params.status]);

    const getStatusStyle = (status: "Approved" | "Denied" | "Cancelled") => {
        switch (status) {
            case "Approved":
                return { color: "bg-primary", icon: <Check width={24} height={24} /> };
            case "Denied":
                return { color: "bg-secondary", icon: <Denys width={24} height={24} /> };
            case "Cancelled":
                return { color: "bg-gray", icon: <Cancels width={24} height={24} /> };
            default:
                return { color: "bg-gray-700", icon: <Cancels width={24} height={24} /> };
        }
    };

    const filteredRequests = DoneRequests.filter(req =>
        filter === "All" ? ["Approved", "Denied", "Cancelled"].includes(req.status) : req.status === filter
    );

    return (
        <SafeAreaView className="flex-1 bg-white p-4 mb-20">
            <Text className="text-4xl font-poppins-bold">Completed Requests</Text>

            {/* Filter Buttons */}
            <View className="flex-row justify-between my-4">
                {["All", "Approved", "Denied", "Cancelled"].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={{
                            backgroundColor: filter === status ? "#EB5E28" : "#d1d5db",
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            borderRadius: 8,
                        }}
                        onPress={() => setFilter(status as "All" | "Approved" | "Denied" | "Cancelled")}
                    >
                        <Text className='font-poppins-semibold' style={{ color: filter === status ? "white" : "black", fontWeight: "600" }}>
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Requests List */}
            <ScrollView>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => {
                        const { color, icon } = getStatusStyle(req.status as "Approved" | "Denied" | "Cancelled");
                        return (
                            <TouchableOpacity 
                                key={req.id} 
                                className="bg-tabs rounded-lg p-4 mb-2"
                                onPress={() => router.push(`/requestdetails?id=${req.id}`)} // Navigate to RequestDetails
                            >
                                <View className="flex-row justify-between">
                                    <Text className="text-lg font-poppins">{req.type}</Text>
                                    <Text className="text-gray-500 font-poppins">{req.time}</Text>
                                </View>
                                <Text className="text-primary font-poppins">Request ID: {req.id}</Text>
                                <View className={`mt-2 p-2 rounded-lg ${color} flex-row justify-between items-center`}>
                                    <Text className="text-white font-poppins">{req.status}</Text>
                                    {icon}
                                </View>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <Text className="text-center text-gray-500 mt-4">No requests found.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
