import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import icons from '@/constants/icons'; // Ensure this is the correct path to your icons

export default function History() {
    const router = useRouter();

    const DoneRequests = [
        { id: '123456789', type: 'Stock Adjustment', time: '10:52 AM', status: 'Approved' },
        { id: '123456788', type: 'Purchase Requisition', time: '9:12 AM', status: 'Denied' },
        { id: '123456787', type: 'Purchase Requisition', time: '9:12 AM', status: 'Cancelled' },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Approved':
                return { color: 'bg-green-500', icon: icons.approved };
            case 'Denied':
                return { color: 'bg-red-500', icon: icons.denied };
            case 'Cancelled':
                return { color: 'bg-yellow-500', icon: icons.cancel };
            default:
                return { color: 'bg-gray-500', icon: icons.approved }; 
        }
    };

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold">Completed Requests</Text>
            <ScrollView className="mt-4">
                {DoneRequests.map((req) => {
                    const { color, icon } = getStatusStyle(req.status);
                    return (
                        <TouchableOpacity
                            key={req.id}
                            className="bg-gray-100 rounded-lg p-4 mb-2"
                        >
                            <View className="flex-row justify-between">
                                <Text className="font-semibold text-lg">{req.type}</Text>
                                <Text className="text-gray-500">{req.time}</Text>
                            </View>
                            <Text className="text-primary">Request ID: {req.id}</Text>
                            <View className={`mt-2 p-2 rounded-lg ${color} flex-row justify-between items-center`}>
                                <Text className="text-white font-semibold">{req.status}</Text>
                                {typeof icon === 'string' ? (
                                    <Text className="text-white">{icon}</Text>
                                ) : (
                                    <Image source={icon} className="w-5 h-5" />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
