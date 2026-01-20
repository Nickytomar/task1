import React from 'react';
import { View, Text } from 'react-native';

export default function UserDetailScreen({ route }) {
  const { user } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>

      <Text style={{ marginTop: 12, fontWeight: 'bold' }}>
        Address
      </Text>
      <Text>
        {user.address.street}, {user.address.city}
      </Text>
    </View>
  );
}
