const form = document.getElementById("signup");
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const freelancerBtn = document.getElementById("freelancer");
  const companyBtn = document.getElementById("company");
  const clientBtn = document.getElementById("client");
  console.log(username, password);
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    let role = 0;
    if (freelancerBtn === document.activeElement) role = 0;
    if (clientBtn === document.activeElement) role = 1;
    if (companyBtn === document.activeElement) role = 2;
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
      location.href("./feed.html");
      return true;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
});
