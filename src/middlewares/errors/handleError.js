const handleError = (res, error, message, statusCode ) => {
    console.error(error);

    // Send a JSON response back to the client with the specified status code and message
    return res.status(statusCode).json({ message });
};

export default handleError