import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import icons from '@/constants/icons'; // Ensure this is the correct path to your icons
import { SafeAreaView } from 'react-native-safe-area-context';

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
                return { color: 'bg-green-700', icon: icons.wapp };
            case 'Denied':
                return { color: 'bg-red-700', icon: icons.wden };
            case 'Cancelled':
                return { color: 'bg-yellow-600', icon: icons.wcan };
            default:
                return { color: 'bg-gray-700', icon: icons.wcan }; 
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <Text className="text-4xl font-poppins-bold">Completed Requests</Text>
            <ScrollView className="mt-4">
                {DoneRequests.map((req) => {
                    const { color, icon } = getStatusStyle(req.status);
                    return (
                        <TouchableOpacity
                            key={req.id}
                            className="bg-tabs rounded-lg p-4 mb-2"
                        >
                            <View className="flex-row justify-between">
                                <Text className="text-lg font-poppins">{req.type}</Text>
                                <Text className="text-gray-500 font-poppins">{req.time}</Text>
                            </View>
                            <Text className="text-primary font-poppins">Request ID: {req.id}</Text>
                            <View className={`mt-2 p-2 rounded-lg ${color} flex-row justify-between items-center`}>
                                <Text className="text-white font-poppins">{req.status}</Text>
                                {typeof icon === 'string' ? (
                                    <Text className="text-white text-poppins">{icon}</Text>
                                ) : (
                                    <Image source={icon}/>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
