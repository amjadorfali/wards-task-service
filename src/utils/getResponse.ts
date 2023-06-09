const success = (data?: any) => {
  return {
    resultCode: "SUCCESS",
    data
  };
};

const error = (errorCode: string, errorData?: object | string) => {
  return {
    resultCode: "ERROR",
    errorCode,
    errorData
  };
};

export const getResponse = { success, error };
