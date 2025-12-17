import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";

export default function PhotosListScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      try {
        setLoading(true);
        setErrorText("");

        // _limit koyduk çünkü /photos 5000 kayıt döndürür, gereksiz yorar.
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_limit=50"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!cancelled) setPhotos(data);
      } catch (err) {
        if (!cancelled) setErrorText("Photos alınamadı.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPhotos();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Yükleniyor...</Text>
      </View>
    );
  }

  if (errorText) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{errorText}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      
      <FlatList
        data={photos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("PhotoDetail", { photoId: item.id })
            }
            style={{
              padding: 12,
              borderBottomWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image
  source={{ uri: `https://picsum.photos/seed/${item.id}/60` }}
  style={{ width: 60, height: 60, borderRadius: 10, backgroundColor: "#ddd" }}
/>



            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700" }} numberOfLines={2}>
                {item.id}. {item.title}
              </Text>
              <Text style={{ opacity: 0.7 }}>Album: {item.albumId}</Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
