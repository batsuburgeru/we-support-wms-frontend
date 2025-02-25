import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Requests() {
    const router = useRouter();

    // Sample request data
    const requests = [
        { id: '123456789', type: 'Stock Adjustment', time: '10:52 AM', requester: 'Warehouse Manager', date: 'Feb 21, 2025' },
        { id: '123456781', type: 'Purchase Requisition', time: '9:12 AM', requester: 'Warehouse Manager', date: 'Feb 21, 2025' },
        { id: '123456782', type: 'Purchase Requisition', time: '9:12 AM', requester: 'Warehouse Manager', date: 'Feb 21, 2025' },
        { id: '123456783', type: 'Purchase Requisition', time: '9:12 AM', requester: 'Warehouse Manager', date: 'Feb 21, 2025' },
        { id: '123456784', type: 'Purchase Requisition', time: '9:12 AM', requester: 'Warehouse Manager', date: 'Feb 21, 2025' },
        { id: '123456785', type: 'Purchase Requisition', time: '9:12 AM', requester: 'Warehouse Manager', date: 'Feb 21, 2025' },
        { id: '123456786', type: 'Purchase Requisition', time: '9:12 AM', requester: 'Warehouse Manager', date: 'Feb 21, 2025' },
        

    ];

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold">Requests</Text>
            <Text className="text-lg text-gray-600">
                You have <Text className="text-primary">{requests.length}</Text> new requests.
            </Text>

            <ScrollView className="mt-4">
                {requests.map((req) => (
                    <TouchableOpacity
                        key={req.id}
                        className="bg-gray-100 rounded-lg p-4 mb-2"
                        onPress={() => router.push(`/requestdetails?id=${req.id}`)} 
                    >
                        <View className="flex-row justify-between">
                            <Text className="font-semibold text-lg">{req.type}</Text>
                            <Text className="text-gray-500">{req.time}</Text>
                        </View>
                        <Text className="text-red-500">Request ID: {req.id}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
