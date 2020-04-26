export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const updateMessage = (message) => ({
  message,
  type: UPDATE_MESSAGE,
});


export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const updateAddress = (address) => ({
  address,
  type: UPDATE_ADDRESS,
});

export const UPDATE_NEARBY_RESULTS = 'UPDATE_NEARBY_RESULTS';
export const updateNearbyResults = (nearbyResults) => ({
  nearbyResults,
  type: UPDATE_NEARBY_RESULTS,
});

