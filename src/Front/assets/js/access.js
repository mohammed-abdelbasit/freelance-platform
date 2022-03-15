const user = JSON.parse(localStorage.getItem("user"));
let createJobLink = document.querySelector("#create-job-link");
let chargeBalanceLink = document.querySelector("#charge-balance-link");
let feedLink = document.querySelector("#feed-link");
let profile = document.getElementById("profile-id");

//Freelancer
if (user.role === 0) {
  createJobLink.hidden = true;
  chargeBalanceLink.hidden = true;
  profile.setAttribute("href", "freelancerProfile.html");
} //Client
else if (user.role === 1) {
  feedLink.hidden = true;
  profile.setAttribute("href", "profile.html");
} //Company
else if (user.role === 2) {
  feedLink.hidden = true;
  chargeBalanceLink.hidden = true;
  profile.setAttribute("href", "profile.html");
}
