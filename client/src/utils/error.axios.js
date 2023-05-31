function createErrorMessage(error) {
	console.log(error);
	if (error.response) {
		// The request was made and the server responded with a status code outside the range of 2xx
		return error.response.data.error; // Response data from the server
	} else if (error.request) {
		// The request was made but no response was received
		return "Error: Unable to get a response from the server.";
	} else {
		// Something happened in setting up the request that triggered an error
		return error.message;
	}
}

export default createErrorMessage;
