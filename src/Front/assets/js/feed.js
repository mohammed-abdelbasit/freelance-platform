async function getJobs() {
  // console.log("Token: ", localStorage.getItem("token"));
  // console.log("user: ", JSON.parse(localStorage.getItem("user")));
  try {
    const { data } = await axios.get("http://localhost:4000/auth/job/jobs", {
      headers: { token: localStorage.getItem("token") },
    });
    let jobsContainer = document.querySelector("#jobs-container");
    data.forEach((item) => {
      const { category, duration, details, price, title, owner, _id } = item;
      const htmlString = `
        <div class="card mb-4 bg-light border-0">
          <div class="card-body">
            <header class="d-flex flex-column gap-2">
              <div
                class="d-flex justify-content-between align-items-center w-100 gap-2"
              >
                <span class="h5">${title}</span>
                <button class="btn btn-secondary btn-sm rounded-pill">
                  ${category}
                </button>
              </div>
              <span class="text-indigo">${details}</span>
            </header>
            <h5 class="my-3 fw-bold">
             ${duration}
            </h5>
            <footer
              class="d-flex justify-content-between align-items-center"
            >
              <span
                >${price} <span class="text-indigo fw-bold">SDG</span></span
              >
              <button class="btn btn-indigo btn-sm" id="interested-btn" value=${_id}>Interested</button>
            </footer>
          </div>
          <div class="card-footer bg-white border-0 px-0">
            <p class="m-1">
              <span class="btn btn-danger m-1 rounded-circle">
              ${owner.username.charAt(0)}</span> ${owner.username}
            </p>
          </div>
        </div>
      `;
      var jobElement = document.createElement("div");
      jobElement.classList = "col-12 col-md-6 col-lg-4";
      jobElement.innerHTML = htmlString;
      jobsContainer.append(jobElement);

      // handle interested freelancer event
      const interestedFreelancer = JSON.parse(localStorage.getItem("user"));
      const currentJob = data;

      console.log("current jobs: ", currentJob);

      // const interestedBtn = document.getElementById("interested-btn");
      // interestedBtn.addEventListener("click", async function (event) {});
    });
  } catch (error) {
    console.log(error);
  }
}

async function interested(jobId) {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/auth/job/interested",
      { jobId },
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  } catch (error) {}
}
