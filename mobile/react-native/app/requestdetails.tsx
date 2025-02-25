import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RequestDetails() {
    const router = useRouter();
    const { id, type, time, requester, date } = useLocalSearchParams(); 

    return (
        <SafeAreaView className="flex-1 bg-white">r
            {/* Header Section */}
            <View className="bg-gray-200 p-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Text className="text-lg">{'←'}</Text>
                </TouchableOpacity>
                <Text className="text-2xl font-bold mt-2">{type}</Text>
                <Text className="text-red-500">Request ID: {id}</Text>
                <Text className="text-gray-500">{time}</Text>
            </View>

            {/* Details Section */}
            <View className="bg-white m-4 p-4 rounded-lg shadow-sm">
                <Text className="font-semibold text-lg">Request by: {requester}</Text>
                <Text className="text-gray-500">{date}, {time}</Text>

                {/* Table Headers */}
                <View className="mt-4 flex-row justify-between">
                    <Text className="italic text-gray-500">quantity</Text>
                    <Text className="italic text-gray-500">item</Text>
                    <Text className="italic text-gray-500">price</Text>
                </View>

                {/* Placeholder for items */}
                <View className="border-t mt-2 pt-2"></View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-around p-4">
                <TouchableOpacity className="bg-orange-500 p-3 rounded-lg">
                    <Text className="text-white font-bold">Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-300 p-3 rounded-lg">
                    <Text className="font-bold">Deny</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-400 p-3 rounded-lg">
                    <Text className="font-bold">Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
