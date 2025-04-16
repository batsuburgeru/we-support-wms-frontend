import { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

interface Request {
    id: string;
    type: string;
    status: string;
    time: string;
    date: string;
    created_at: string;
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



export default function Requests() {
    const router = useRouter();
    const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const fetchRequests = async () => {
        try {
            const API_URL = 'http://192.168.68.104:3002/purchaseRequests/view-purchase-requests';
            const response = await fetch(API_URL);
            const data = await response.json();

            console.log("API Response:", data);

            if (data && Array.isArray(data.data)) {
                const reshapedData: Request[] = data.data.map((request: any) => ({
                    id: request.id,
                    type: "Purchase Request",
                    status: request.status,
                    date: new Date(request.created_at).toLocaleDateString(),
                    time: new Date(request.created_at).toLocaleTimeString(),
                    created_at: request.created_at, 
                }));
                const sortedData = reshapedData
                    .filter(req => req.status === "Pending")
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                setPendingRequests(sortedData);
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
        }, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval); // Cleanup interval
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white p-4 px-5">
            <Text className="pt-5 text-4xl font-poppins-bold">Requests</Text>
            {errorMessage ? (
                <Text className="text-red-500 text-center mt-4">{errorMessage}</Text>
            ) : (
                <Text className="text-2xl text-black font-poppins-semibold">
                    You have <Text className="text-primary font-poppins-semibold">{pendingRequests.length}</Text> pending requests.
                </Text>
            )}

            <SearchableDropdown />

            <ScrollView
                className="mt-4 mb-20 px-5"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshRequests} />}>
                {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                        <TouchableOpacity
                            key={req.id}
                            className="bg-tabs rounded-lg p-4 mb-2"
                            onPress={() => router.push(`/requestdetails?id=${req.id}`)}>
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