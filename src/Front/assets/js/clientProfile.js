let user = JSON.parse(localStorage.getItem("user"));
let jobs = [];

async function getJobs() {
  // console.log("Token: ", localStorage.getItem("token"));
  console.log("user: ", user);
  try {
    const { data } = await axios.get(
      `http://localhost:4000/auth/job/getJobsByUserId?userId=${user["_id"]}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    // let currentJob = [];
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].owner == JSON.parse(localStorage.getItem("user"))) {
    //     currentJob.push(data[i]);
    //   }
    // }
    if (data.length > 0) {
      console.log(data);
      jobs = data;
      let myJobsDiv = document.getElementById("myJobs");
      data.forEach((job) => {
        let interestedArray = Array.from(job.interested);
        myJobsDiv.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">
        <div class="card mb-4 bg-light border-0">
          <div class="card-body">
            <header class="d-flex flex-column gap-2">
              <div class="d-flex justify-content-between align-items-center w-100 gap-2">
                <span class="h5">${job.title}</span>
                <button class="btn btn-secondary btn-sm rounded-pill">
                  ${job.category}
                </button>
              </div>
              <span class="text-indigo">${job.duration}</span>
            </header>
            <p class="my-3">
              ${job.details}
            </p>
            <footer class="d-flex justify-content-between align-items-center">
              <button onclick="showInterestedFreelancersModal([${
                "'" + interestedArray.join("', '") + "'"
              }])" class="btn btn-indigo btn-sm w-30" ${
          job.interested.length < 1 ? "disabled" : ""
        }>
                Interested Freelancers
              </button>
            </footer>
          </div>
        </div>
      </div>
        `;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function showInterestedFreelancersModal(interestedArray) {
  let interestedList = document.getElementById("interestedList");
  interestedList.innerHTML = "";
  for (interested of interestedArray) {
    const { data } = await axios.get(
      `http://localhost:4000/auth/user/${interested}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log(data);
    interestedList.innerHTML += `
    <li class="d-flex justify-content-between">
              <button class="btn">
                <span class="badge rounded-circle bg-primary me-2">${data.username
                  .charAt(0)
                  .toUpperCase()}</span>
                ${data.username}
              </button>
              <button class="btn btn-sm btn-indigo px-4 py-0">Contact</button>
            </li>`;
  }
  $("#interestedModal").modal("show");
}
