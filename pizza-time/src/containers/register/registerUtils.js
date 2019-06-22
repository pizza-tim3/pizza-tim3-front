const registerWithBackend = async userObj => {
  const url = `${process.env.REACT_APP_BACK_END_URL}/api/users`;
  const body = userObj;
  const data = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
  return await fetch(url, data).then(res => res.json());
};

// takes the result from a register with pop up call
const registerWithPopup = async result => {
  console.log(result);
  const {
    user: { uid, photoURL },
    additionalUserInfo: {
      profile: { email, family_name, given_name, name }
    }
  } = result;

  // make object to send to backend
  const userObj = {
    email,
    username: name,
    first_name: given_name,
    last_name: family_name,
    firebase_uid: uid,
    avatar: photoURL
  };
  //send information to backend
  // console.log(userObj);
  const response = await registerWithBackend(userObj);
  console.log(response);
  return response;
};

module.exports = {
  registerWithPopup,
  registerWithBackend
};
