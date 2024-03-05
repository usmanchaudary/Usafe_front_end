const reports = (imageSrc, status, formName, assignedTo, date, entity, id) => {
  return `<div class='ReportContainer' style="background-color: whitesmoke;border-radius: 20px">
      <div class='ReportContent'>

        <div class='ReportImage'>
        
          <img src="${imageSrc? imageSrc: '../no-document.png'}" style="height: ${imageSrc? '150px':'100px'}" alt="Image not available"/>
        </div>

        
        <div class='ReportHeadings'>
          <p>Status:</p>
          <p>Type:</p>
          <p>Assigned to:</p>
          <p>Due Date:</p>
        </div>

        <div class='ReportDescriptions'>
          <p style="color:${status.toLowerCase() == 'pending'? 'blue':'green'}">${status}</p>
          <p style="text-wrap:nowrap">${formName}</p>
          <p title = ${assignedTo}>${addStars(assignedTo)}</p>
          <p style="color: red">${new Date(date).toDateString()}</p>
        </div>

      </div>
      <div style="margin-top: auto;">
      <button class='btn btn-warning btn-block' style="background: linear-gradient(45deg, #ffeb3b, #ff9800);" onclick="NavigateToDetails('${entity}',${id})">VIEW DETAILS</button>
      </div>

    </div>
  `;
};

const fetchReports = () => {
  let username = localStorage.getItem("userName");

  sendRequest("api/ChangeForm/fetchReports?userName=" + username, "GET", {}, (data) => {
    reportCountCaller(data.length);
    let html = ``;
    for (const iterator of data) {
      html += reports(iterator.files ? JSON.parse(iterator.files)[0] : "", iterator.status, iterator.formName, iterator.assignedTo, iterator.createdDate, iterator.entity, iterator.id);
    }
    $(".reports").html(html);
  });

};
fetchReports();

const NavigateToDetails = (entity, id) => {
  window.location.href = "/Pages/reportDeatails/reportDetails.html?entity=" + entity + "&id=" + id;
};

//create a function which takes a string and add stars if length is greater than 20
function addStars(str) {
  if (str.length > 20) {
    return str.slice(0, 10) + "....";
  }
  return str;
}