'use server'
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/supabase"


export const uploadImageToDatabase = async (image: File | null) => {

  if (image === null) return;

  const filename = `${image.name}-${uuidv4()}`;
  console.log(filename)

  const { data, error } = await supabase.storage
    .from("images")
    .upload(filename, image, {
        cacheControl: '3600',
        upsert: false,
    });

  if (error) {
    console.log(error);
    return;
  }

  const filepath = data.path;
  console.log(data.path)


  return data;

}

export default uploadImageToDatabase