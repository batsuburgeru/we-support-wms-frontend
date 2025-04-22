import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

interface Request {
    id: string;
    type: string;
    status: string;
    time: string;
    date: string;
    created_at: string;
    clientName?: string;
    productName?: string;
}

export function SearchableDropdown({
    clientNames,
    selectedClient,
    setSelectedClient,
}: {
    clientNames: string[];
    selectedClient: string;
    setSelectedClient: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const dropdownItems = [
            { label: 'View All', value: '__all__' },
            ...clientNames.map((name) => ({ label: name, value: name })),
        ];
        setItems(dropdownItems);
    }, [clientNames]);

    return (
        <View style={{ margin: 16 }}>
            <DropDownPicker
                open={open}
                value={selectedClient}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => {
                    const newValue = typeof callback === 'function' ? callback(selectedClient) : callback;
                    if (typeof newValue === 'string') {
                        setSelectedClient(newValue);
                    }
                }}
                setItems={setItems}
                searchable={true}
                placeholder="Select a requester"
                searchPlaceholder="Search names..."
                style={{
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 8,
                    backgroundColor: '#ffffff',
                    paddingHorizontal: 10,
                }}
                dropDownContainerStyle={{
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 8,
                    backgroundColor: '#f9f9f9',
                }}
                textStyle={{
                    fontSize: 16,
                    color: '#333333',
                }}
                searchTextInputStyle={{
                    borderWidth: 1,
                    borderColor: '#cccccc',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    color: '#333333',
                }}
            />
        </View>
    );
}

export default function Requests() {
    const router = useRouter();
    const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
    const [clientNames, setClientNames] = useState<string[]>([]);
    const [selectedClient, setSelectedClient] = useState<string>('__all__');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const API_BASE = 'http://192.168.1.8:3002';

    const fetchRequests = async () => {
        try {
            const url = `${API_BASE}/purchaseRequests/read-purchase-requests`;
            const response = await fetch(url);
            const data = await response.json();
    
            if (data && Array.isArray(data)) {
                const reshapedData: Request[] = data.map((request: any) => {
                    const purchaseRequest = request.purchaseRequest;
    
                    return {
                        id: purchaseRequest.id,
                        type: 'Purchase Request',
                        status: purchaseRequest.status, // Get status from purchaseRequest
                        date: new Date(purchaseRequest.created_at).toLocaleDateString(),
                        time: new Date(purchaseRequest.created_at).toLocaleTimeString(),
                        created_at: purchaseRequest.created_at,
                        clientName: purchaseRequest.client_name,
                        productName: request.prItems?.map((item: any) => item.product_name).join(', ') || '',
                    };
                });
    
                // Filter out only requests with "Pending" status
                const filteredRequests = reshapedData.filter(
                    req => req.status.toLowerCase() === 'pending' &&  // Ensure the comparison is case-insensitive
                    (selectedClient === '__all__' || req.clientName === selectedClient)
                );
    
                // Sort the filtered requests by creation time
                const sortedData = filteredRequests.sort(
                    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
    
                setPendingRequests(sortedData);
                setErrorMessage(null);
    
                // Extract unique client names for dropdown
                const uniqueNames = Array.from(
                    new Set(
                        reshapedData
                            .map(req => req.clientName)
                            .filter((name): name is string => Boolean(name))
                    )
                );
                setClientNames(uniqueNames);
            } else if (data.error) {
                setErrorMessage(data.error);
            } else {
                setErrorMessage('Unexpected response format from the server.');
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            setErrorMessage('Failed to fetch requests. Please try again later.');
        }
    };       

    const refreshRequests = async () => {
        setRefreshing(true);
        await fetchRequests();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedClient]);

    return (
        <SafeAreaView className="flex-1 bg-white p-4 px-5">
            <Text className="pt-5 text-4xl font-poppins-bold">Requests</Text>

            {errorMessage ? (
                <Text className="text-red-500 text-center mt-4">
                    {errorMessage}
                </Text>
            ) : (
                <Text className="text-2xl text-black font-poppins-semibold">
                    You have{' '}
                    <Text className="text-primary font-poppins-semibold">
                        {pendingRequests.length}
                    </Text>{' '}
                    pending requests.
                </Text>
            )}

            <SearchableDropdown
                clientNames={clientNames}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
            />

            <ScrollView
                className="mt-4 mb-20 px-5"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshRequests}
                    />
                }
            >
                {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                        <TouchableOpacity
                            key={req.id}
                            className="bg-tabs rounded-lg p-4 mb-2"
                            onPress={() => router.push(`/requestdetails?id=${req.id}`)}
                        >
                            <View className="flex-row justify-between">
                                <Text className="font-poppins-bold text-lg">
                                    {req.type}
                                </Text>
                                <Text className="text-black font-poppins-semibold">
                                    {req.date}
                                </Text>
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
                ) : !errorMessage ? (
                    <Text className="text-gray-500 text-center mt-4">
                        No pending requests.
                    </Text>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}
