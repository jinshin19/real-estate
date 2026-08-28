// Angular Imports
import { toast } from '@spartan-ng/brain/sonner';
// Constants
import { ImageC } from '../../constants';

// export const FileU = ({
//   files,
//   types,
//   validators = {
//     maxFileSize: {
//       use: false,
//       value: 1024 * 1024 * 5,
//     },
//     maximumFile: {
//       use: false,
//       value: 10,
//     },
//   },
// }: FileUI) => {
//   if (!files) return;

//   console.log(validators);

//   Array.from(files).forEach((file, index) => {
//     const fileSize = file.size;
//     const fileType = file.type;
//     const fileName = file.name;

//     if (validators.maximumFile?.value! > fileSize) {
//       toast.error(
//         `${fileName} is not a supported file type (${fileType}). Please upload a JPG, JPEG, PNG, or WebP file.`,
//       );
//       return;
//     }

//     if (validators.maxFileSize?.value! > fileSize) {
//       toast.error(
//         `${fileName} is too large. The file size exceeds the maximum allowed limit of 5 MB.`,
//       );
//       return;
//     }

//     if (validators.maximumFile?.value! > fileSize) {
//       toast.error(`${fileName} cannot be uploaded. The maximum allowed number of files is 10.`);
//     }
//   });
// };

export const ValidateImagesU = ({
  files,
  types,
  validators = {
    maxFileSize: 1024 * 1024 * 5,
    maximumFile: 10,
  },
}: ValidateImagesI): boolean => {
  if (!files) return false;

  return Array.from(files).every((file) => {
    const fileSize = file.size;
    const fileType = file.type;
    const fileName = file.name;

    if (!types.includes(fileType)) {
      toast.error(ImageC.ERRORS.FILE_TYPE_NOT_SUPPORTED(fileName, fileType), {
        duration: 5000,
      });
      return false;
    }

    if (validators.maxFileSize! < fileSize) {
      toast.error(ImageC.ERRORS.FILE_SIZE_EXCEEDED(fileName), {
        duration: 5000,
      });
      return false;
    }

    if (validators.maximumFile! < files.length) {
      toast.error(ImageC.ERRORS.MAXIMUM_FILES, {
        duration: 5000,
      });
      return false;
    }

    return true;
  });
};

// interface FileUI {
//   files: FileList | null;
//   types: string[];
//   validators?: {
//     maxFileSize?: {
//       use: boolean;
//       value: number;
//     };
//     maximumFile?: {
//       use: boolean;
//       value: number;
//     };
//   };
// }

interface ValidateImagesI {
  files: FileList | null;
  types: string[];
  validators?: {
    maxFileSize?: number;
    maximumFile?: number;
  };
}
