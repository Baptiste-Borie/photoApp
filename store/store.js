import { configureStore } from "@reduxjs/toolkit";
import GalleryReducer from "./GallerySlice";

export default configureStore({
  reducer: {
    gallery: GalleryReducer,
  },
});
