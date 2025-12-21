import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";

export default function PostEditScreen({ route }) {
  const { postId } = route.params;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const data = await res.json();

        if (!cancelled) {
          setTitle(data.title);
          setBody(data.body);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  async function handleSave() {
    try {
      setSaving(true);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body }),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const updated = await res.json();

      Alert.alert("Başarılı", "Post güncellendi.");
      route.params?.onUpdated?.(updated);
    } catch (e) {
      Alert.alert("Hata", "Kaydetme başarısız.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "700", marginBottom: 6 }}>Başlık</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginBottom: 16,
        }}
      />

      <Text style={{ fontWeight: "700", marginBottom: 6 }}>İçerik</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        multiline
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          minHeight: 120,
          textAlignVertical: "top",
        }}
      />

      <Pressable
        onPress={handleSave}
        disabled={saving}
        style={{
          marginTop: 16,
          paddingVertical: 12,
          borderWidth: 1,
          borderRadius: 10,
          alignItems: "center",
          opacity: saving ? 0.6 : 1,
        }}
      >
        <Text style={{ fontWeight: "700" }}>
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Text>
      </Pressable>
    </View>
  );
}
