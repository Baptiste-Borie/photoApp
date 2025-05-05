import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "Gallery",
  initialState: [],
  reducers: {
    // State : immutable
    // Reducer : renvoie le nouvel état mis à jour
    addPhoto: (state, action) => {
      state.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addPhoto, removePhoto } = gallerySlice.actions;
export const GallerySelector = (state) => state.gallery;
export default gallerySlice.reducer;
