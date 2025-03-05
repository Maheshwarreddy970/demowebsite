'use server';

import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Directly configure Cloudinary
cloudinary.config({
  cloud_name: 'dbcodcumz',
  api_key: '314516783632521',
  api_secret: 'vFjO8Jk0_dO2AR59serkmAVMhQU',
});

export async function uploadImageToCloudinary(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert Buffer to Readable Stream
    const stream = Readable.from(buffer);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { upload_preset: 'demoweb' }, // Hardcoded preset
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });

    return { success: true, url: (result as any).secure_url };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to upload image' };
  }
}
