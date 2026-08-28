export const ImageC = {
  ERRORS: {
    FILE_SIZE_EXCEEDED: (fileName: string) =>
      `${fileName} is too large. The file size exceeds the maximum allowed limit of 5 MB.`,
    FILE_TYPE_NOT_SUPPORTED: (fileName: string, fileType: string) =>
      `${fileName} is not a supported file type (${fileType}). Please upload a JPG, JPEG, PNG, or WebP file.`,
    MAXIMUM_FILES: 'You can upload a maximum of 10 images at a time.',
  },
};
