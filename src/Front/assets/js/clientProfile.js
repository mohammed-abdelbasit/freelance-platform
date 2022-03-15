async function getJobs() {
  // console.log("Token: ", localStorage.getItem("token"));
  // console.log("user: ", JSON.parse(localStorage.getItem("user")));
  try {
    const { data } = await axios.get("http://localhost:4000/auth/job/jobs", {
      headers: { token: localStorage.getItem("token") },
    });

    // let currentJob = [];
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].owner == JSON.parse(localStorage.getItem("user"))) {
    //     currentJob.push(data[i]);
    //   }
    // }
    let currentJob = data[0];
    console.log(currentJob.username);
    console.log(JSON.parse(localStorage.getItem("user")));
  } catch (error) {
    console.log(error);
  }
}
