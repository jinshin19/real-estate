export const RESPONSE_MESSAGES = {
  SUCCESS: {
    OK: 'OK',
    CREATED: 'Created successfully.',
    UPDATED: 'Updated successfully.',
    DELETED: 'Deleted successfully.',
    RETRIEVED: 'Retrieved successfully.',
    REGISTERED: 'Registered Successfully',
  },

  ERROR: {
    NOT_FOUND: 'Not found.',
    ALREADY_EXISTS: 'Already exists.',
    PERMISSION_DENIED: 'Permission denied.',
    VALIDATION_FAILED: 'Validation failed.',
    AUTHENTICATION_REQUIRED: 'Authentication required.',
    UNPROCESSABLE_ENTITY: 'Unable to process the request.',
    INTERNAL_SERVER_ERROR: 'An unexpected error occurred.',
    FILE_REQUIRED: 'At least one file is required.',
    FILE_SIZE_EXCEEDED:
      'The file size exceeds the maximum allowed limit of 5 MB.',
    FILE_TYPE_NOT_SUPPORTED: 'Please upload a JPG, JPEG, PNG, or WebP file.',
  },
} as const;
