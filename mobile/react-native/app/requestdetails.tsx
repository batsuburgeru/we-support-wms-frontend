
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Back } from '@/assets/svg/iconsvg';
import MessageModal from '@/components/modals/MessageModal';

interface RequestItem {
  name: string;
  quantity: number;
  price: string;
  total_price: string;
  image?: string | null;
  product_img_url?: string | null;
}

interface RequestDetails {
  id: string;
  type: string;
  status: string;
  requester: string;
  approved: string;
  date: string;
  time: string;
  sum: number;
  items: RequestItem[];
  note: string;
  product_img_url?: string | null;
}

interface CartItem {
  total_price: string;
}

export default function RequestDetails(): JSX.Element {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };

  const [request, setRequest] = useState<RequestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<string>('');

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true);
        const API_URL = `http://192.168.1.19:3002/purchaseRequests/read-purchase-requests`;
        const response = await fetch(API_URL);
        const data = await response.json();

        if (Array.isArray(data)) {
          const matchedRequest = data.find(
            (req: any) => req.purchaseRequest.id === id
          );

          if (matchedRequest) {
            const totalCartCost = matchedRequest.prItems.reduce(
              (sum: number, cartItem: CartItem): number =>
                sum + parseFloat(cartItem.total_price),
              0
            );

            setRequest({
              id: matchedRequest.purchaseRequest.id,
              type: 'Purchase Request',
              status: matchedRequest.purchaseRequest.status,
              approved: matchedRequest.purchaseRequest.approved_by_name,
              requester: matchedRequest.purchaseRequest.client_name || 'Unknown',
              date: new Date(matchedRequest.purchaseRequest.created_at).toLocaleDateString(),
              time: new Date(matchedRequest.purchaseRequest.created_at).toLocaleTimeString(),
              sum: totalCartCost,
              items: matchedRequest.prItems.map((item: any) => ({
                name: item.product_name || `Product ID: ${item.product_id}`,
                quantity: item.quantity,
                price: `₱${item.unit_price}`,
                total_price: `₱${item.total_price}`,
                image: null,
                product_img_url: item.product_img_url || null,
              })),
              note: matchedRequest.deliveryNote?.note || '',
              product_img_url: matchedRequest.purchaseRequest.product_img_url || null,
            });
          } else {
            console.error(`No matching request found for ID: ${id}`);
          }
        } else {
          console.error('Invalid response format from the server.');
        }
      } catch (error) {
        console.error('Error fetching request details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id]);

  const parseNote = (note: string) => {
    if (!request) {
      console.error('Request object is null or undefined.');
      return [];
    }
  
    const lines = note.split('\n');
    return lines.map((line) => {
      const lineToParse = `${request.approved} ${request.status} Purchase Request`;
      const colonIndex = line.indexOf(lineToParse);
      if (colonIndex > -1) {
        return {
          sender: line.substring(0, colonIndex).trim(),
          message: line.substring(colonIndex + 1).trim(),
        };
      } else {
        return {
          sender: 'Unknown',
          message: line.trim(),
        };
      }
    });
  };

  const handleConfirm = async () => {
    if (!modalType || !request) return;

    try {
      const API_URL = `http://192.168.1.19:3002/purchaseRequests/update-purchase-request-status/${request.id}`;
      const payload = {
        status:
          modalType === 'Approve'
            ? 'Approved'
            : modalType === 'Return'
            ? 'Returned'
            : 'Rejected',
        note: remarks,
      };

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Status updated successfully!');
        router.back();
      } else {
        console.error('Failed to update status:', await response.text());
      }
    } catch (error) {
      console.error('Error occurred while updating status:', error);
    } finally {
      setModalType(null);
      setRemarks('');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending':
        return { bgColor: 'bg-tabs', textColor: 'text-black' };
      case 'Approved':
        return { bgColor: 'bg-primary', textColor: 'text-white' };
      case 'Returned':
        return { bgColor: 'bg-secondary', textColor: 'text-white' };
      case 'Rejected':
        return { bgColor: 'bg-gray', textColor: 'text-white' };
      default:
        return { bgColor: 'bg-gray-300', textColor: 'text-gray-800' };
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#EB5E28" />
        <Text className="text-lg font-semibold mt-4">Loading request details...</Text>
      </SafeAreaView>
    );
  }

  if (!request) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Request not found!</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary p-3 mt-4 rounded-lg"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const statusStyle = getStatusStyle(request.status);

  return (
    <SafeAreaView className="flex-1 bg-tabs">
      <View className="bg-tabs p-4 flex-row items-center pt-5">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Back width={30} height={30} />
        </TouchableOpacity>
      </View>

      <View className="pl-14">
        <Text className="text-2xl font-poppins-bold">{request.type}</Text>
        <Text className="text-primary font-poppins-semibold">
          Request ID: {request.id}
        </Text>
        <Text
          className={`text-lg font-poppins-semibold mt-1 p-2 rounded-lg w-44 mb-3 ${statusStyle.bgColor} ${statusStyle.textColor}`}
        >
          Status: {request.status || 'Unknown'}
        </Text>
      </View>
      <ScrollView>
      <View className="bg-white rounded-lg flex-1 p-10">
        <Text className="font-poppins-semibold text-lg">
          Requested by: {request.requester}
        </Text>
        <Text className="font-poppins text-black">
          {request.date}, {request.time}
        </Text>

        <ScrollView className="border-t mt-2 pt-2">
          {request.items.map((item, index) => (
            <View
              key={index}
              className="mt-4 p-4 rounded-lg bg-tabs flex-row items-center"
            >
              <Image
                source={{
                  uri: item.product_img_url
                    ? `http://192.168.1.19:3002${item.product_img_url}`
                    : 'fallback-image-url',
                }}
                className="w-28 h-28 mr-2 rounded-sm"
                onError={() => console.error('Image failed to load')}
              />
                <View className="flex justify-between">
                  <Text className="font-poppins-bold text-lg">
                    {item.name}
                  </Text>
                  <Text className="font-poppins-semibold">
                    Unit Price: {item.price}
                  </Text>
                  <Text className="font-poppins-semibold">
                    Quantity: {item.quantity}
                  </Text>
                  <Text className="font-poppins-semibold">
                    Total Price: {item.total_price}
                  </Text>
                </View>
              </View>
          ))}

          <View className="flex justify-center mt-2 w-full pr-4">
            <Text className="font-poppins-bold text-right text-lg">
              Total Price: ₱{request.sum.toFixed(2)}
            </Text>
          </View>

          {request.note && (
            <View className="mt-4 bg-white rounded-lg flex-1">
              <Text className="font-poppins-bold text-lg mb-2">Notes:</Text>
              <ScrollView className="flex-1">
                {request.note.split('\n').map((line, index) => (
                  <View key={index} className="mb-4">
                    <Text className={`${
                      index % 2 === 0 ? 'text-left text-sm text-gray-500 ml-2' : 'text-right text-sm text-gray-500 mr-2'
                    }`}>
                      {index % 2 === 0 ? request.requester : request.approved}
                    </Text>
                    
                    <View
                      className={`${
                        index % 2 === 0 ? 'self-start bg-tabs' : 'self-end bg-primary'
                      } p-3 rounded-lg max-w-[80%]`}
                    >
                      <Text
                        className={`${
                          index % 2 === 0 ? 'text-black' : 'text-white'
                        } font-poppins`}
                      >
                        {line}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </View>

      {request.status === 'Pending' && (
        <View className="flex-row justify-around p-4 bg-white">
          <TouchableOpacity
            className="bg-primary p-3 px-7 rounded-lg"
            onPress={() => setModalType('Approve')}>
            <Text className="text-white font-poppins-bold text-xl">Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-tabs p-3 px-7 rounded-lg"
            onPress={() => setModalType('Return')}>
            <Text className="font-poppins-bold text-xl">Return</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-tabs p-3 px-7 rounded-lg"
            onPress={() => setModalType('Reject')}>
            <Text className="font-poppins-bold text-xl">Reject</Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>
      {modalType && (
        <MessageModal
          visible={!!modalType}
          title={modalType}
          remarks={remarks}
          setRemarks={setRemarks}
          onClose={() => {
            setModalType(null);
            setRemarks('');
          }}
          onConfirm={handleConfirm}
          id={request?.id || ''}
        />
      )}
    </SafeAreaView>
  );
}
