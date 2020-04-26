import {
    UPDATE_MESSAGE,
    UPDATE_ADDRESS,
    UPDATE_NEARBY_RESULTS,
    UPDATE_DISTANCE,
} from '../actions/index';

const defaults = {
    address: '',
    nearbyResults: [],
    distance: null,
};

const reducer = (state = defaults, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE: {
            const { message } = action;
      
            return {
                ...state,
                message,
            };
        }
        case UPDATE_ADDRESS: {
            const { address } = action;
      
            return {
                ...state,
                address,
            };
        }
        case UPDATE_NEARBY_RESULTS: {
            const { nearbyResults } = action;
            return {
                ...state,
                nearbyResults,
            };
        }
        case UPDATE_DISTANCE: {
            const { distance } = action;
            return {
                ...state,
                distance,
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;