const form = document.getElementById("createjob");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  console.log("here");

  const title = document.getElementById("title").value;
  const details = document.getElementById("details").value;
  const price = document.getElementById("price").value;
  const deliverables = document.getElementById("deliverables").value;
  const duration = document.getElementById("duration").value;

  let category = "empty";

  if (document.getElementById("graphic-design-radio-bt").checked)
    category = "graphic design";
  if (document.getElementById("software-development-radio-bt").checked)
    category = "software development";

  try {
    const res = await axios.post("http://localhost:4000/create", {
      title,
      details,
      price,
      deliverables,
      duration,
      category,
    });
    console.log(res.data);

    return true;
  } catch (error) {
    console.log(error);
  }
});
