const init_state = {
  id: "",
  username: "",
  email: "",
  fullname: "",
  bio: "",
  phone_number: "",
  website: "",
  gender: "",
  is_verified: false,
  avatar_url: "",
  role: "",
  password: "",
  oldpassword: "",
};
import auth_types from "./types/auth";
const auth_reducer = (state = init_state, action) => {
  if (action.type === auth_types.AUTH_LOGIN) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      fullname: action.payload.fullname,
      bio: action.payload.bio,
      phone_number: action.payload.phone_number,
      website: action.payload.website,
      gender: action.payload.gender,
      is_verified: action.payload.is_verified,
      avatar_url: action.payload.avatar_url,
      role: action.payload.role,
      password: action.payload.password,
      oldpassword: action.payload.oldpassword,
    };
  } else if (action.type === auth_types.AUTH_LOGOUT) {
    return init_state;
  }

  return state;
};

export default auth_reducer;
