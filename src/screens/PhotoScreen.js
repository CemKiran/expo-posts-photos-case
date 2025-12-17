import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

export default function PhotoScreen({ route }) {
  const { photoId } = route.params || {};
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPhoto() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${photoId}`
        );
        const data = await res.json();
        if (!cancelled) setPhoto(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (photoId) loadPhoto();
    else setLoading(false);

    return () => {
      cancelled = true;
    };
  }, [photoId]);

  if (!photoId) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>photoId gelmedi.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Yükleniyor...</Text>
      </View>
    );
  }

  if (!photo || !photo.id) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Foto bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image
        source={{ uri: `https://picsum.photos/seed/${photoId}/800/500` }}
        style={{
          width: "100%",
          height: 260,
          borderRadius: 16,
          backgroundColor: "#ddd",
        }}
      />

      <Text style={{ fontSize: 16, fontWeight: "800", marginTop: 12 }}>
        {photo.title}
      </Text>

      <Text style={{ marginTop: 8, opacity: 0.7 }}>Photo ID: {photo.id}</Text>
      <Text style={{ opacity: 0.7 }}>Album ID: {photo.albumId}</Text>
    </View>
  );
}
