"use server"

import { supabase } from "@/supabase"
import { revalidatePath } from "next/cache"

export async function updateDatabaseRows(new_status: string, filter_timestamp: string) {

  const { data, error } = await supabase
    .from('todos')
    .update({status: new_status})
    .eq('created_at', filter_timestamp)
    .select()

  if (error || !data) {
    console.error(error)
    return
  }
  
  // make sure to refetch data for the board once we update the database
  revalidatePath('/', 'page')
}