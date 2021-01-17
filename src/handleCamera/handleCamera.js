import { cos } from "react-native-reanimated";
import { projectStorage } from "../../config/config";
import * as cameraAndImageHelper from "../helpers/cameraHelper";

const uploadImage = async (image, currentUser, type) => {
  const childPath = `${currentUser.uid}/${Math.random().toString(36)}`;
  const ref = projectStorage.ref(type).child(childPath);
  try {
    const blob = await cameraAndImageHelper.prepareBlob(image.uri);
    await ref.put(blob);
    let downloadUrl = await ref.getDownloadURL();
    blob.close();
    return downloadUrl;
  } catch (error) {}
};
const openImageLibrary = async (setImage, currentUser, type) => {
  const result = await cameraAndImageHelper.openImageLibrary();
  setImage(result.uri);
  if (result) {
    const downloadUrl = await uploadImage(result, currentUser, type);
    setImage(downloadUrl);
  }
};

const openCamera = async (setImage, currentUser, type) => {
  const result = await cameraAndImageHelper.openCamera();
  if (result) {
    const downloadUrl = await uploadImage(result, currentUser, type);
    setImage(downloadUrl);
  }
};

export const addImage = (
  showActionSheetWithOptions,
  setImage,
  currentUser,
  type
) => {
  const options = ["Select from Photos", "Camera", "Cancel"];
  const cancelButtonIndex = 2;

  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      if (buttonIndex == 0) {
        openImageLibrary(setImage, currentUser, type);
      } else if (buttonIndex == 1) {
        openCamera(setImage, currentUser, type);
      }
    }
  );
};
