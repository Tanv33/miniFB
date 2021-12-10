export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      if (
        action.payload.fullName &&
        action.payload.email &&
        action.payload.gender &&
        action.payload.phoneNumber &&
        action.payload.address
      ) {
        return { ...state, user: action.payload };
      } else {
        console.log(`invalid data in USER_LOGIN reducer `);
        return state;
      }
    }
    case "USER_LOGOUT": {
      return { ...state, user: null }; // set this to null on purpose, do not change
    }

    default: {
      return state;
    }
  }
};
