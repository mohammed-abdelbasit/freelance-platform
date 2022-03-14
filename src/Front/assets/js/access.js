const user = JSON.parse(localStorage.getItem("user"));
let createJobLink = document.querySelector("#create-job-link");
let chargeBalanceLink = document.querySelector("#charge-balance-link");
let feedLink = document.querySelector("#feed-link");

//Freelancer
if (user.role === 0) {
  createJobLink.hidden = true;
  chargeBalanceLink.hidden = true;
} //Client
else if (user.role === 1) {
  feedLink.hidden = true;
} //Company
else if (user.role === 2) {
  feedLink.hidden = true;
  chargeBalanceLink.hidden = true;
}
