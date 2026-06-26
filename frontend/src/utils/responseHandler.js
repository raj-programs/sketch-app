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
        message: error.response?.data?.message || "Something Went Wrong",
        status: error.response?.status,
    };
};
