import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function PostsListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

 
  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        setErrorText("");

        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!cancelled) setPosts(data);
      } catch (err) {
        if (!cancelled) setErrorText("Posts alınamadı.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

 
  async function deletePost(postId) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { method: "DELETE" }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

   
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }


  function handleDelete(postId) {
    Alert.alert("Silme Onayı", "Bu Post Silinsin mi?", [
      { text: "Vazgeç", style: "cancel" },
      {
        text: "Sil",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePost(postId);
          } catch (e) {
            Alert.alert("Hata", "Silme işlemi başarısız.");
          }
        },
      },
    ]);
  }

 
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
      data={posts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={{ padding: 14,
         marginHorizontal: 12,
         marginVertical: 6,
         backgroundColor: "#fff",
         borderRadius: 12,
         
         // IOS Shadow
         shadowColor: "#000",
         shadowOffset:{width:0, height: 2},
         shadowOpacity: 0.15,
         shadowRadius: 6,

         //Android Shadow
         elevation: 4,
         }}>
          <Pressable
            onPress={() =>
              navigation.navigate("PostDetail", { postId: item.id })
            }
          >
            <Text style={{ fontWeight: "700", marginBottom: 6 }}>
              {item.id}. {item.title}
            </Text>
            <Text numberOfLines={2}>{item.body}</Text>
          </Pressable>

          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <Pressable onPress={() => navigation.navigate("PostEdit", { 
              postId: item.id,
              onUpdated: (updatedPost) => {
                setPosts((prev) =>
                  prev.map((p) => (p.id === updatedPost.id ? {...p, ...updatedPost } :p ))
              );
              },
             })}>
              <Text>Edit</Text>
            </Pressable>

            <Pressable onPress={() => handleDelete(item.id)}>
              <Text>Sil</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  </View>
  )}
