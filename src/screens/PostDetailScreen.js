import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function PostDetailScreen({ route }) {

  const { postId } = route.params || {};

  // post verisini burada tutuyoruz.
  const [post, setPost] = useState(null);

  // yüklenme durumunu kontrol etmek için
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    let cancelled = false;

    async function loadPost() {
      try {
        setLoading(true);

        // postId ile spesifik post çekiyoruz
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

      
        const data = await res.json();

        // ekran kapanmadıysa state güncelle
        if (!cancelled) setPost(data);
      } finally {
        // hata olsa da olmasa da loading kapansın
        if (!cancelled) setLoading(false);
      }
    }

   
    if (postId) loadPost();
    else setLoading(false);

    
    return () => {
      cancelled = true;
    };
  }, [postId]); 

  
  if (!postId) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>postId gelmedi.</Text>
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

  
  if (!post || !post.id) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Post bulunamadı.</Text>
      </View>
    );
  }


  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 12 }}>
        {post.title}
      </Text>

      <Text style={{ fontSize: 15, lineHeight: 22 }}>{post.body}</Text>

      <Text style={{ marginTop: 16, opacity: 0.7 }}>Post ID: {post.id}</Text>
      <Text style={{ opacity: 0.7 }}>User ID: {post.userId}</Text>
    </View>
  );
}
