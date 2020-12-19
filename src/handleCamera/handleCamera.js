import { projectStorage } from "../../config/config";
import * as cameraAndImageHelper from "../helpers/cameraHelper";

const uploadImage = async (image, currentUser) => {
  const ref = projectStorage.ref("posts").child(currentUser);
  console.log(currentUser);
  setImage(image.uri);

  try {
    const img = await cameraAndImageHelper.prepareBlob(image.uri);
    await ref.put(img);
    let downloadUrl = await ref.getDownloadURL();
    img.close();
    return downloadUrl;
  } catch (error) {}
};
const openImageLibrary = async (setImage, currentUser) => {
  const result = await cameraAndImageHelper.openImageLibrary();
  setImage(result.uri);
  if (result) {
    const downloadUrl = await uploadImage(result, currentUser);
    setImage(downloadUrl);
  }
};

const openCamera = async (setImage, currentUser) => {
  const result = await cameraAndImageHelper.openCamera();
  if (result) {
    const downloadUrl = await uploadImage(result, currentUser);
    setImage(downloadUrl);
  }
};

export const addImage = (showActionSheetWithOptions, setImage, currentUser) => {
  const options = ["Select from Photos", "Camera", "Cancel"];
  const cancelButtonIndex = 2;

  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      if (buttonIndex == 0) {
        openImageLibrary(setImage, currentUser);
      } else if (buttonIndex == 1) {
        openCamera(setImage, currentUser);
      }
    }
  );
};
