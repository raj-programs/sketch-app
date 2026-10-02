export const handleSucess = (response) => {
    return {
        success: true,
        message: response.data.message,
        data: response.data.data,
    };
};

export const handleError = (error) => {
    return{
        success: false,
        message: error.response?.data?.message || "Unable to complete your request. Please try again.",
        status: error.response?.status,
    };
};
