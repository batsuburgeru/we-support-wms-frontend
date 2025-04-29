import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
  } from 'react-native';
  import { useRouter } from 'expo-router';
  import { useEffect, useState } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { Check, Denys, Cancels } from '@/assets/svg/iconsvg';
  import DropDownPicker from 'react-native-dropdown-picker';
  
  interface PurchaseRequest {
    id: string;
    status: 'Approved' | 'Returned' | 'Rejected';
    time: string;
    date: string;
    type: string;
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
            const newValue =
              typeof callback === 'function' ? callback(selectedClient) : callback;
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
    const [pendingRequests, setPendingRequests] = useState<PurchaseRequest[]>([]);
    const [clientNames, setClientNames] = useState<string[]>([]);
    const [selectedClient, setSelectedClient] = useState<string>('__all__');
    const [selectedStatus, setSelectedStatus] = useState<string>('__all__');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
  
    const API_BASE = 'http://192.168.1.19:3002';
  
    const fetchRequests = async () => {
      try {
        const url = `${API_BASE}/purchaseRequests/read-purchase-requests`;
        const response = await fetch(url);
        const data = await response.json();
  
        if (data && Array.isArray(data)) {
          const reshapedData: PurchaseRequest[] = data.map((request: any) => {
            const purchaseRequest = request.purchaseRequest;
  
            return {
              id: purchaseRequest.id,
              type: 'Purchase Request',
              status: purchaseRequest.status,
              date: new Date(purchaseRequest.created_at).toLocaleDateString(),
              time: new Date(purchaseRequest.created_at).toLocaleTimeString(),
              created_at: purchaseRequest.created_at,
              clientName: purchaseRequest.client_name,
              productName:
                request.prItems?.map((item: any) => item.product_name).join(', ') || '',
            };
          });
  
          const filteredRequests = reshapedData.filter((req) =>
            ['Approved', 'Returned', 'Rejected'].includes(req.status)
          );
  
          const sortedData = filteredRequests.sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
  
          setPendingRequests(sortedData);
          setErrorMessage(null);
  
          const uniqueNames = Array.from(
            new Set(
              reshapedData
                .map((req) => req.clientName)
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
  
      const interval = setInterval(() => {
        fetchRequests();
      }, 10000);
  
      return () => clearInterval(interval);
    }, []);
  
    const getStatusStyle = (status: string) => {
      switch (status) {
        case 'Approved':
          return {
            color: 'bg-primary',
            icon: <Check width={24} height={24} />,
            displayText: 'Approved',
          };
        case 'Returned':
          return {
            color: 'bg-secondary',
            icon: <Denys width={24} height={24} />,
            displayText: 'Returned',
          };
        case 'Rejected':
          return {
            color: 'bg-gray',
            icon: <Cancels width={24} height={24} />,
            displayText: 'Rejected',
          };
        default:
          return {
            color: 'bg-gray-700',
            icon: <Cancels width={24} height={24} />,
            displayText: 'Unknown',
          };
      }
    };
  
    // Combined filtering based on selectedClient and selectedStatus
    const filteredRequests = pendingRequests.filter((req) => {
      const matchesClient =
        selectedClient === '__all__' || req.clientName === selectedClient;
      const matchesStatus =
        selectedStatus === '__all__' || req.status === selectedStatus;
      return matchesClient && matchesStatus;
    });
  
    return (
      <SafeAreaView className="flex-1 bg-white p-4 mb-20 px-5">
        <Text className="text-4xl font-poppins-bold pt-5">Completed Requests</Text>
        <SearchableDropdown
          clientNames={clientNames}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />
  
        <View className="flex-row justify-between my-4 flex-wrap">
          {['All', 'Approved', 'Returned', 'Rejected'].map((status) => {
            const value = status === 'All' ? '__all__' : status;
            const isSelected = selectedStatus === value;
  
            return (
              <TouchableOpacity
                key={status}
                style={{
                  backgroundColor: isSelected ? '#EB5E28' : '#d1d5db',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  marginRight: 8,
                  marginBottom: 8,
                }}
                onPress={() => setSelectedStatus(value)}
              >
                <Text
                  className="font-poppins-semibold"
                  style={{
                    color: isSelected ? 'white' : 'black',
                    fontWeight: '600',
                  }}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
  
        {filteredRequests.length === 0 ? (
          <Text className="text-center text-gray-500 mt-4">No requests found.</Text>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refreshRequests} />
            }
          >
            {filteredRequests.map((req) => {
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
                    <Text className="text-black font-poppins-semibold">{req.time}</Text>
                    <Text className="text-primary font-poppins-bold">{req.id}</Text>
                  </View>
                  <View
                    className={`mt-2 p-2 rounded-lg ${color} flex-row justify-between items-center`}
                  >
                    <Text className="text-white font-poppins-bold">{displayText}</Text>
                    {icon}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
  