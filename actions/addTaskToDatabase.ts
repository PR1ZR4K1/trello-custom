"use server"

import uploadImageToDatabase from "./uploadImageToDatabase";

export const addTaskToDatabase = async (todo: string, columnId: TypedColumn, image?: File | null) => {
  let file: Image | undefined;
  
  if (image) {
    const fileUploaded = await uploadImageToDatabase(image);

    if (fileUploaded) {
      file = {
        bucketId: fileUploaded,
        fileId: image.name,
      }
    }
  }


}