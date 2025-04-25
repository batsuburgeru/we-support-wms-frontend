import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native'; // Import necessary React Native components

import { useRouter, useLocalSearchParams } from 'expo-router'; // Import Expo Router hooks for navigation and fetching parameters
import React, { useState, useEffect } from 'react'; // Import React and its hooks
import { Back } from '@/assets/svg/iconsvg'; // Import a custom SVG component for the back button
import MessageModal from '@/components/modals/MessageModal'; // Import the MessageModal component

// Define the structure of a RequestItem
interface RequestItem {
  name: string; // Name of the product/item in the request
  quantity: number; // Quantity of the product/item
  price: string; // Unit price of the product/item
  total_price: string; // Total price for the product/item (unit price × quantity)
  image?: string | null; // Optional image of the product/item
  product_img_url?: string | null; // Optional URL for the product image
}

// Define the structure of RequestDetails
interface RequestDetails {
  id: string; // Request ID
  type: string; // Type of request, e.g., "Purchase Request"
  status: string; // Status of the request, e.g., "Pending", "Approved"
  requester: string; // Name of the requester
  approved: string; // Name of the approver
  date: string; // Date the request was created
  time: string; // Time the request was created
  sum: number; // Total cost of the request (sum of all items)
  items: RequestItem[]; // Array of items in the request
  note: string; // Additional notes about the request
  product_img_url?: string | null; // Optional URL for a product image
}

// Define the structure of CartItem
interface CartItem {
  total_price: string; // Total price for a cart item
}

// Define the RequestDetails component, which fetches and displays request details
export default function RequestDetails(): JSX.Element {
  const router = useRouter(); // Provides navigation functionality
  const { id } = useLocalSearchParams() as { id: string }; // Fetch the request ID from route parameters

  // States
  const [request, setRequest] = useState<RequestDetails | null>(null); // Holds the request details
  const [loading, setLoading] = useState(true); // Indicates whether data is being loaded
  const [modalType, setModalType] = useState<string | null>(null); // Tracks modal type (Approve, Return, Reject)
  const [remarks, setRemarks] = useState<string>(''); // Tracks user input remarks

  // Fetch request details when the component loads
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true); // Show loading indicator
        const API_URL = `http://192.168.26.52:3002/purchaseRequests/read-purchase-requests`; // API URL to fetch request details
        const response = await fetch(API_URL); // Fetch data from the server
        const data = await response.json(); // Parse response JSON

        if (Array.isArray(data)) { // Check if response is an array
          // Find the request that matches the provided ID
          const matchedRequest = data.find(
            (req: any) => req.purchaseRequest.id === id
          );

          if (matchedRequest) {
            // Calculate the total cost of all items in the cart
            const totalCartCost = matchedRequest.prItems.reduce(
              (sum: number, cartItem: CartItem): number =>
                sum + parseFloat(cartItem.total_price),
              0
            );

            // Set the details of the request in state
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
            console.error(`No matching request found for ID: ${id}`); // Log error if no match is found
          }
        } else {
          console.error('Invalid response format from the server.'); // Log error for invalid response format
        }
      } catch (error) {
        console.error('Error fetching request details:', error); // Log network errors
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchRequestDetails(); // Trigger fetch
  }, [id]); // Dependency array ensures fetch runs only when `id` changes

  // Function to parse notes into a structured format
  const parseNote = (note: string) => {
    if (!request) {
      console.error('Request object is null or undefined.');
      return [];
    }

    const lines = note.split('\n'); // Split note into lines
    return lines.map((line) => {
      const lineToParse = `${request.approved} ${request.status} Purchase Request`;
      const colonIndex = line.indexOf(lineToParse); // Search for matching string
      if (colonIndex > -1) {
        return {
          sender: line.substring(0, colonIndex).trim(), // Extract sender's name
          message: line.substring(colonIndex + 1).trim(), // Extract message text
        };
      } else {
        return {
          sender: 'Unknown', // Set sender to 'Unknown' if no match
          message: line.trim(), // Trim whitespace
        };
      }
    });
  };

  // Function to confirm modal actions (Approve, Return, Reject)
  const handleConfirm = async () => {
    if (!modalType || !request) return; // Exit if modalType or request is null

    try {
      const API_URL = `http://192.168.26.52:3002/purchaseRequests/update-purchase-request-status/${request.id}`; // API URL for updating request status
      const payload = {
        status:
          modalType === 'Approve'
            ? 'Approved'
            : modalType === 'Return'
            ? 'Returned'
            : 'Rejected', // Determine status based on modalType
        note: remarks, // Include remarks in the payload
      };

      const response = await fetch(API_URL, {
        method: 'PUT', // Send PUT request
        headers: { 'Content-Type': 'application/json' }, // JSON headers
        body: JSON.stringify(payload), // Convert payload to JSON
      });

      if (response.ok) {
        console.log('Status updated successfully!'); // Log success
        router.back(); // Navigate back to the previous screen
      } else {
        console.error('Failed to update status:', await response.text()); // Log server error
      }
    } catch (error) {
      console.error('Error occurred while updating status:', error); // Log network error
    } finally {
      setModalType(null); // Reset modalType
      setRemarks(''); // Clear remarks
    }
  };

  // Function to determine status styles based on the status value
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
        return { bgColor: 'bg-gray-300', textColor: 'text-gray-800' }; // Default style for unrecognized statuses
    }
  };
  if (loading) {
    // Render a loading indicator and message while the request details are being fetched
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#EB5E28" /> // Show a spinning loader
        <Text className="text-lg font-semibold mt-4">Loading request details...</Text>
      </SafeAreaView>
    );
  }

  if (!request) {
    // Render a message if the request data is not found
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Request not found!</Text> // Show error message
        <TouchableOpacity
          onPress={() => router.back()} // Navigate back to the previous screen
          className="bg-primary p-3 mt-4 rounded-lg"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const statusStyle = getStatusStyle(request.status); // Determine the styling for the request status based on its value

  return (
    <SafeAreaView className="flex-1 bg-tabs">
      <View className="bg-tabs p-4 flex-row items-center pt-5">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Back width={30} height={30} /> // Render a custom back button
        </TouchableOpacity>
      </View>

      <View className="pl-14">
        <Text className="text-2xl font-poppins-bold">{request.type}</Text> // Display the type of request
        <Text className="text-primary font-poppins-semibold">
          Request ID: {request.id} // Display the request ID
        </Text>
        <Text
          className={`text-lg font-poppins-semibold mt-1 p-2 rounded-lg w-44 mb-3 ${statusStyle.bgColor} ${statusStyle.textColor}`}
        >
          Status: {request.status || 'Unknown'} // Display the status of the request with appropriate styling
        </Text>
      </View>
      <ScrollView>
        <View className="bg-white rounded-lg flex-1 p-10">
          <Text className="font-poppins-semibold text-lg">
            Requested by: {request.requester} // Display the name of the requester
          </Text>
          <Text className="font-poppins text-black">
            {request.date}, {request.time} // Display the date and time of the request
          </Text>

          <ScrollView className="border-t mt-2 pt-2">
            {request.items.map((item, index) => (
              <View
                key={index} // Map over the items in the request to display each one
                className="mt-4 p-4 rounded-lg bg-tabs flex-row items-center"
              >
                <Image
                  source={{
                    uri: item.product_img_url
                      ? `http://192.168.26.52:3002${item.product_img_url}?t=${new Date().getTime()}` // Display the product image, if available
                      : 'fallback-image-url', // Fallback image if URL is missing
                  }}
                  className="w-28 h-28 mr-2 rounded-sm"
                  onError={() => console.error('Image failed to load')} // Log errors if the image fails to load
                />
                <View className="flex justify-between">
                  <Text className="font-poppins-bold text-lg">
                    {item.name} // Display the name of the item
                  </Text>
                  <Text className="font-poppins-semibold">
                    Unit Price: {item.price} // Display the unit price
                  </Text>
                  <Text className="font-poppins-semibold">
                    Quantity: {item.quantity} // Display the quantity of the item
                  </Text>
                  <Text className="font-poppins-semibold">
                    Total Price: {item.total_price} // Display the total price of the item
                  </Text>
                </View>
              </View>
            ))}

            <View className="flex justify-center mt-2 w-full pr-4">
              <Text className="font-poppins-bold text-right text-lg">
                Total Price: ₱{request.sum.toFixed(2)} // Display the total cost of all items
              </Text>
            </View>

            {request.note && (
              // Render the notes section if a note is available
              <View className="mt-4 bg-white rounded-lg flex-1">
                <Text className="font-poppins-bold text-lg mb-2">Notes:</Text>
                <ScrollView className="flex-1">
                  {request.note.split('\n').map((line, index) => (
                    <View key={index} className="mb-4">
                      <Text className={`${index % 2 === 0 ? 'text-left text-sm text-gray-500 ml-2' : 'text-right text-sm text-gray-500 mr-2'}`}>
                        {index % 2 === 0 ? request.requester : request.approved} // Display either the requester or approver for each note
                      </Text>

                      <View
                        className={`${index % 2 === 0 ? 'self-start bg-tabs' : 'self-end bg-primary'} p-3 rounded-lg max-w-[80%]`}
                      >
                        <Text className={`${index % 2 === 0 ? 'text-black' : 'text-white'} font-poppins`}>
                          {line} // Display the note content
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
          // Render action buttons only if the request status is "Pending"
          <View className="flex-row justify-around p-4 bg-white">
            <TouchableOpacity
              className="bg-primary p-3 px-7 rounded-lg"
              onPress={() => setModalType('Approve')} // Open the "Approve" modal
            >
              <Text className="text-white font-poppins-bold text-xl">Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-tabs p-3 px-7 rounded-lg"
              onPress={() => setModalType('Return')} // Open the "Return" modal
            >
              <Text className="font-poppins-bold text-xl">Return</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-tabs p-3 px-7 rounded-lg"
              onPress={() => setModalType('Reject')} // Open the "Reject" modal
            >
              <Text className="font-poppins-bold text-xl">Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {modalType && (
        // Render the MessageModal when an action button is clicked
        <MessageModal
          visible={!!modalType} // Show modal based on modalType state
          title={modalType} // Pass the modal type (Approve, Return, Reject)
          remarks={remarks} // Pass the remarks state to the modal
          setRemarks={setRemarks} // Function to update remarks
          onClose={() => {
            setModalType(null); // Close the modal
            setRemarks(''); // Clear the remarks state
          }}
          onConfirm={handleConfirm} // Handle confirmation action
          id={request?.id || ''} // Pass the request ID to the modal
        />
      )}
    </SafeAreaView>
  );
}