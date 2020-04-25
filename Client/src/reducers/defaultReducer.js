import {
    UPDATE_MESSAGE,
} from '../actions/index';

const defaults = {
    message: '',
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
        default: {
            return state;
        }
    }
};

export default reducer;