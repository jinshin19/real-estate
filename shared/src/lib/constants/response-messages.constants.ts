export const RESPONSE_MESSAGES = {
  SUCCESS: {
    CREATED: "Created successfully.",
    UPDATED: "Updated successfully.",
    DELETED: "Deleted successfully.",
    RETRIEVED: "Retrieved successfully.",
    REGISTERED: "Registered Successfully",
  },

  ERROR: {
    NOT_FOUND: "Not found.",
    ALREADY_EXISTS: "Already exists.",
    PERMISSION_DENIED: "Permission denied.",
    VALIDATION_FAILED: "Validation failed.",
    AUTHENTICATION_REQUIRED: "Authentication required.",
    UNPROCESSABLE_ENTITY: "Unable to process the request.",
    INTERNAL_SERVER_ERROR: "An unexpected error occurred.",
  },
} as const;
