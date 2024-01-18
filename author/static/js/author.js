
const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };
  
    if (password === confirm_password) {
      document.getElementById("error").innerText = "";
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      ) {
        // console.log(info);


        const csrftoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        .split('=')[1];
  
        fetch("http://127.0.0.1:8000/author/register/", {
          method: "POST",
          headers: { "content-type": "application/json", "X-CSRFToken": csrftoken },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            window.location.href = "http://127.0.0.1:8000/author/reg/";
          })
          .catch(err => console.error(err));

          
      } else {
        document.getElementById("error").innerText =
          "pass must contain eight characters, at least one letter, one number and one special character:";
      }
    } else {
      document.getElementById("error").innerText =
        "password and confirm password do not match";
      alert("password and confirm password do not match");
    }
  };
  
  const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
  };
  
  const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    // console.log(username, password);

    const csrftoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        .split('=')[1];

    if ((username, password)) {
      fetch("http://127.0.0.1:8000/author/login/", {
        method: "POST",
        headers: { "content-type": "application/json", "X-CSRFToken": csrftoken  },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
  
          if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "http://127.0.0.1:8000/";
          }
        });
    }
  };





  
  