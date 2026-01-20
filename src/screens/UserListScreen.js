import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { fetchUsers } from '../services/api';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadUsers = async (pageNumber, isRefresh = false) => {
    try {
      setLoading(true);
      const data = await fetchUsers(pageNumber);

      // Stop pagination if no more data
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setUsers(prev =>
        isRefresh ? data : [...prev, ...data]
      );
      setError('');
    } catch (err) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const handleLoadMore = () => {
    // Disable pagination during search or loading
    if (loading || !hasMore || search.length > 0) return;
    setPage(prev => prev + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
    loadUsers(1, true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
        }}
      />

      {error ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>
          {error}
        </Text>
      ) : null}

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserDetail', { user: item })
            }
          >
            <View style={{ padding: 12, borderBottomWidth: 0.5 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && !refreshing ? (
            <ActivityIndicator size="small" />
          ) : null
        }
        ListEmptyComponent={
          !loading && (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No users found
            </Text>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}
