// Type definition for an image object
export type FormImage = {
    url: string;
    name?: string;
    size?: number;
    nativeFile?: File;
  };
  
  // Type definition for upload response
  export type UploadResponse = {
    uploads: FormImage[];
  };
  
  // Splits images into uploadable and existing images
  const splitImages = (
    images: FormImage[]
  ): { uploadImages: FormImage[]; existingImages: FormImage[] } => {
    const uploadImages: FormImage[] = [];
    const existingImages: FormImage[] = [];
  
    // Classify images based on the presence of nativeFile
    images.forEach((image) => {
      if (image.nativeFile) {
        uploadImages.push(image);
      } else {
        existingImages.push(image);
      }
    });
  
    return { uploadImages, existingImages };
  };
  
  // Interface for uploads service
  interface UploadsService {
    create: (files: File[]) => Promise<UploadResponse>;
  }
  
  // Prepares images by uploading and combining with existing images
  export const prepareImages = async (images: FormImage[], uploads: UploadsService): Promise<FormImage[]> => {
    const { uploadImages, existingImages } = splitImages(images);
  
    let uploadedImgs: FormImage[] = [];
    if (uploadImages.length > 0) {
      // Extract native files from images that need to be uploaded
      const files = uploadImages.map((i) => i.nativeFile!);
  
      try {
        // Upload files and get the response
        const { uploads: uploaded } = await uploads.create(files);
        uploadedImgs = uploaded;
      } catch (error) {
        // Handle errors during file upload
        console.error("Error uploading images:", error);
        throw new Error("Failed to upload images. Please try again.");
      }
    }
  
    // Combine existing images with newly uploaded ones
    return [...existingImages, ...uploadedImgs];
  };
  