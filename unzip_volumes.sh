#!/bin/bash

# Set the directory where your .tar.zst files are stored
source_directory="./volumes/"

# Set the directory where you want to store the decompressed files
target_directory="./volumes/unzipped_volumes/"

# Check if the source directory exists
if [ ! -d "$source_directory" ]; then
  echo "Source directory not found: $source_directory"
  exit 1
fi

# Create the target directory if it doesn't exist
mkdir -p "$target_directory"

# Loop through .tar.zst files in the source directory
for source_file in "$source_directory"/*.tar.zst; do
  if [ -f "$source_file" ]; then
    # Extract the file using zstd and tar into the target directory
    filename=$(basename "$source_file")
    zstd -d -c -f "$source_file" | tar -xvf - -C "$target_directory"
    echo "Decompressed: $source_file"
  fi
done

echo "Decompression complete. Decompressed files are in: $target_directory"
