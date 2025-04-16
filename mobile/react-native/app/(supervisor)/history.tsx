import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Denys, Cancels } from '@/assets/svg/iconsvg';
import DropDownPicker from 'react-native-dropdown-picker';

interface PurchaseRequest {
    id: string;
    status: "Approved" | "Returned" | "Rejected";
    time: string;
    date: string;
    type: string;
}

export function SearchableDropdown() {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<{ label: string; value: string }[]>([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' },
        { label: 'Option 5', value: 'option5' },
    ]);

    return (
        <View style={{ margin: 16 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchable={true}
                placeholder="Select an option"
                searchPlaceholder="Search options..."
                style={{
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 8,
                    backgroundColor: '#ffffff',
                    paddingHorizontal: 10,
                }} // Dropdown appearance
                dropDownContainerStyle={{
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 8,
                    backgroundColor: '#f9f9f9',
                }} // Dropdown container style
                textStyle={{
                    fontSize: 16,
                    color: '#333333',
                }} // Dropdown text style
                searchTextInputStyle={{
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    color: '#333333',
                }} // Search input style
            />
        </View>
    );
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
            const response = await fetch('http://192.168.68.104:3002/purchaseRequests/read-purchase-requests');
            const result = await response.json();
    
            if (Array.isArray(result)) {
                const mappedRequests = result.map((item: any) => ({
                    id: item.purchaseRequest.id,
                    status: item.purchaseRequest.status,
                    date: new Date(item.purchaseRequest.created_at).toLocaleDateString(),
                    time: new Date(item.purchaseRequest.created_at).toLocaleTimeString(),
                    type: "Purchase Request",
                    created_at: item.purchaseRequest.created_at, // Include created_at for sorting
                }));
    
                // Sort the data in descending order based on created_at
                const sortedData = mappedRequests
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // Sort descending
    
                setRequests(sortedData); // Update state with sorted data
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
            fetchRequests();  
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
            <SearchableDropdown/>
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
                                <Text className="font-poppins-bold text-lg">{req.type}</Text>
                                <Text className="text-black font-poppins-semibold">{req.date}</Text>
                                </View>
                                <View className="flex-row justify-between items-center flex-wrap">
                                <Text className="text-primary font-poppins-bold flex-shrink">
                                Request ID:
                                </Text>
                                <Text className="text-black font-poppins-semibold">
                                {req.time}
                                </Text>
                                <Text className="text-primary font-poppins-bold">
                                {req.id}
                                </Text>
                                </View>
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