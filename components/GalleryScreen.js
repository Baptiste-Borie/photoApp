import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GallerySelector, removePhoto } from "../store/GallerySlice";

const GalleryScreen = () => {
  const dispatch = useDispatch();
  const photos = useSelector(GallerySelector);

  const renderItem = ({ item, index }) => (
    <View style={styles.photoContainer}>
      <Image
        source={{ uri: item.uri }}
        style={styles.photo}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => dispatch(removePhoto(index))}
      >
        <Text style={styles.removeText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery Screen</Text>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#1C1C1E",
  },
  photoContainer: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
    paddingBottom: 16,
  },
  photo: {
    width: "100%",
    height: 250,
    backgroundColor: "#E5E5EA",
  },
  removeButton: {
    marginTop: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  removeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default GalleryScreen;
