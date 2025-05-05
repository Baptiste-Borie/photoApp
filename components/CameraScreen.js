import React, { useState, useRef } from "react";
import { Button } from "react-native";
import { useDispatch } from "react-redux";
import * as FileSystem from "expo-file-system";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { addPhoto } from "../store/GallerySlice";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const dispatch = useDispatch();

  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const savePhoto = async (photo) => {
    try {
      const uri = photo.uri;
      const filename = `${Date.now()}.jpg`;
      const newUri = FileSystem.documentDirectory + filename;

      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      return newUri;
    } catch (error) {
      console.error("Error saving photo:", error);
      return null;
    }
  };

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      const savedUri = await savePhoto(photo);

      if (savedUri) {
        dispatch(addPhoto({ uri: savedUri }));
      }
    } catch (error) {
      console.error("Erreur lors de la prise de la photo", error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.78)",
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 28,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  text: {
    fontSize: 17,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.46)",
    letterSpacing: 0.5,
  },

  message: {
    color: "#444",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default CameraScreen;
