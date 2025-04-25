// Import necessary hooks and components from React and React Native libraries
import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    RefreshControl,
} from 'react-native';

// Import routing hook from Expo Router for navigation
import { useRouter } from 'expo-router';

// Import DropDownPicker component for the dropdown menu
import DropDownPicker from 'react-native-dropdown-picker';

// Define the structure/interface of a Request object
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

// SearchableDropdown: Functional component for client filtering dropdown
export function SearchableDropdown({
    clientNames,
    selectedClient,
    setSelectedClient,
}: {
    clientNames: string[];
    selectedClient: string;
    setSelectedClient: (value: string) => void;
}) {
    const [open, setOpen] = useState(false); // Controls visibility of the dropdown
    const [items, setItems] = useState<{ label: string; value: string }[]>([]); // Dropdown items

    useEffect(() => {
        // Transform clientNames into dropdown-friendly format and add "View All"
        const dropdownItems = [
            { label: 'View All', value: '__all__' },
            ...clientNames.map((name) => ({ label: name, value: name })),
        ];
        setItems(dropdownItems); // Populate dropdown items
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
                        setSelectedClient(newValue); // Update selected client
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

// Main Requests component
export default function Requests() {
    const router = useRouter(); // Navigation router from Expo

    // State declarations
    const [pendingRequests, setPendingRequests] = useState<Request[]>([]); // Requests with "Pending" status
    const [clientNames, setClientNames] = useState<string[]>([]); // Unique client names for dropdown
    const [selectedClient, setSelectedClient] = useState<string>('__all__'); // Default is "View All"
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error messages
    const [refreshing, setRefreshing] = useState<boolean>(false); // Refresh indicator state

    const API_BASE = 'http://192.168.26.52:3002'; // Local backend API base URL

    // Function to fetch all purchase requests and filter them based on client and status
    const fetchRequests = async () => {
        try {
            const url = `${API_BASE}/purchaseRequests/read-purchase-requests`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && Array.isArray(data)) {
                // Format the raw response data
                const reshapedData: Request[] = data.map((request: any) => {
                    const purchaseRequest = request.purchaseRequest;

                    return {
                        id: purchaseRequest.id,
                        type: 'Purchase Request',
                        status: purchaseRequest.status,
                        date: new Date(purchaseRequest.created_at).toLocaleDateString(),
                        time: new Date(purchaseRequest.created_at).toLocaleTimeString(),
                        created_at: purchaseRequest.created_at,
                        clientName: purchaseRequest.client_name,
                        productName: request.prItems?.map((item: any) => item.product_name).join(', ') || '',
                    };
                });

                // Filter by "Pending" and optionally by selected client
                const filteredRequests = reshapedData.filter(
                    req => req.status.toLowerCase() === 'pending' &&
                        (selectedClient === '__all__' || req.clientName === selectedClient)
                );

                // Sort by most recent
                const sortedData = filteredRequests.sort(
                    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setPendingRequests(sortedData); // Save to state
                setErrorMessage(null); // Clear errors

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
                setErrorMessage(data.error); // Show backend error
            } else {
                setErrorMessage('Unexpected response format from the server.');
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            setErrorMessage('Failed to fetch requests. Please try again later.');
        }
    };

    // Function to trigger data refresh
    const refreshRequests = async () => {
        setRefreshing(true);
        await fetchRequests();
        setRefreshing(false);
    };

    // Fetch data whenever selectedClient changes
    useEffect(() => {
        fetchRequests();
    }, [selectedClient]);

    return (
        <SafeAreaView className="flex-1 bg-white p-4 px-5">
            {/* Title Header */}
            <Text className="pt-5 text-4xl font-poppins-bold">Requests</Text>

            {/* Error message or summary of pending requests */}
            {errorMessage ? (
                <Text className="text-red-500 text-center mt-4">{errorMessage}</Text>
            ) : (
                <Text className="text-2xl text-black font-poppins-semibold">
                    You have{' '}
                    <Text className="text-primary font-poppins-semibold">
                        {pendingRequests.length}
                    </Text>{' '}
                    pending requests.
                </Text>
            )}

            {/* Dropdown for client filtering */}
            <SearchableDropdown
                clientNames={clientNames}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
            />

            {/* Scrollable list of filtered requests */}
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
                            onPress={() => router.push(`/requestdetails?id=${req.id}`)} // Navigate to detail page
                        >
                            <View className="flex-row justify-between">
                                <Text className="font-poppins-bold text-lg">
                                    {req.type}
                                </Text>
                                {/* Add more request info here if needed (e.g. time, product name) */}
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    // Fallback UI if no pending requests
                    <Text className="text-center text-gray-500 mt-5">
                        No pending requests found.
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
