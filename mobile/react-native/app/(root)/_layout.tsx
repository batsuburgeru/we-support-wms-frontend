// import { useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import { Redirect, Slot, useRouter } from "expo-router";
// import { AuthProvider, useAuth } from "../context/AuthProvider"; // ✅ Import AuthProvider

// export default function RootLayout() {
//   return (
//     <AuthProvider> {/* ✅ Wrap App with AuthProvider */}
//       <AuthWrapper /> {/* ✅ Handles login state */}
//     </AuthProvider>
//   );
// }

// // Separate Auth Logic into Another Component
// function AuthWrapper() {
//   const { isLoggedIn } = useAuth(); // ✅ Get login state from context
//   const [loading, setLoading] = useState(false);

//   // Simulate loading state (You can replace this with an API call later)
//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#FF5733" />
//       </View>
//     );
//   }

//   // If not logged in, redirect to SignIn page
//   if (!isLoggedIn) {
//     return <Redirect href="/signIn" />;
//   }

//   return <Slot />;
// }
