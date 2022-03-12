const form = document.getElementById("signup");
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    let role = 0;
    if (document.getElementById("freelancer-radio-bt").checked) role = 0;
    if (document.getElementById("client-radio-bt").checked) role = 1;
    if (document.getElementById("company-radio-bt").checked) role = 2;

    try {
      const res = await axios.post("http://localhost:4000/user/signup", {
        email,
        password,
        username,
        role,
      });
      console.log(res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      window.location.assign("./feed.html");
      return true;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
});
