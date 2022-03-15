async function getReports() {
  // console.log("Token: ", localStorage.getItem("token"));
  // console.log("user: ", JSON.parse(localStorage.getItem("user")));
  try {
    const { data } = await axios.get("http://localhost:4000/auth/report", {
      headers: { token: localStorage.getItem("token") },
    });
    let reportsContainer = document.querySelector("#reports-container");
    console.log(data);
    data.reports.forEach((item) => {
      const { repDate, repDetails, reported, reporter } = item;
      console.log(repDate, repDetails, reported, reporter);
      const htmlString = ` <td>
      <span class="me-1 bg-indigo text-white">k</span> ${reporter}
    </td>
    <td>${reported}</td>
    <td>${repDate}</td>
        `;
      var reportElement = document.createElement("div");
      reportElement.innerHTML = htmlString;
      reportsContainer.append(reportElement);
    });
  } catch (error) {
    console.log(error);
  }
}
