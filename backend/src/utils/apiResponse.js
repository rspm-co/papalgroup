export const successResponse = ({
  message = 'Success',
  data = null,
  meta = null,
} = {}) => ({
  success: true,
  message,
  data,
  meta,
})

export const errorResponse = ({
  message = 'Internal server error',
  details = null,
} = {}) => ({
  success: false,
  message,
  details,
})
