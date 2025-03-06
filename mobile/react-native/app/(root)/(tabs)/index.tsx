import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DoneRequests } from '@/components/data/requests';  

export default function Requests() {
    const router = useRouter();

    const pendingRequests = DoneRequests.filter(req => req.status === "Pending");

    return (
        <SafeAreaView className="flex-1 bg-white p-4 px-5">
            <Text className="pt-5 text-4xl font-poppins-bold">Requests</Text>
            <Text className="text-2xl text-black font-poppins-semibold">
                You have <Text className="text-primary font-poppins-semibold">{pendingRequests.length}</Text> pending requests.
            </Text>

            <ScrollView className="mt-4">
                {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                        <TouchableOpacity
                            key={req.id}
                            className="bg-tabs rounded-lg p-4 mb-2"
                            onPress={() => router.push(`/requestdetails?id=${req.id}`)} 
                        >
                            <View className="flex-row justify-between">
                                <Text className="font-poppins-semibold text-lg">{req.type}</Text>
                                <Text className="text-gray-500 font-poppins-semibold">{req.time}</Text>
                            </View>
                            <Text className="text-primary font-poppins-semibold">Request ID: {req.id}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text className="text-gray-500 text-center mt-4">No pending requests.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
