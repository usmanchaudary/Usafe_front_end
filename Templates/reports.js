const reports = (imageSrc, status, formName, assignedTo, date,entity,id) => {
  return `<div class='ReportContainer'>
      <div class='ReportContent'>

        <div class='ReportImage'>
          <img src="${imageSrc}" alt="report"/>
        </div>

        
        <div class='ReportHeadings'>
          <p>Status:</p>
          <p>Type:</p>
          <p>Assigned to:</p>
          <p>Due Date:</p>
        </div>

        <div class='ReportDescriptions'>
          <p>${status}</p>
          <p>${formName}</p>
          <p>${assignedTo}</p>
          <p>${new Date(date).toDateString()}</p>
        </div>

      </div>
      <div class='ReportBorder'/>
      <button class='ReportButton' onclick= "NavigateToDetails('${entity}',${id})">VIEW DETAILS</button>

    </div>
  `;
};

const fetchReports = () => {
  let username = localStorage.getItem("userName");
 
  sendRequest("api/ChangeForm/fetchReports?userName="+username, "GET",{}, (data) => {
    reportCountCaller(data.length)
    for (const iterator of data) {
      $(".reports").append(reports(iterator.files? JSON.parse(iterator.files)[0]: "", iterator.status, iterator.formName, iterator.assignedTo, iterator.createdDate, iterator.entity ,iterator.id));
    }
  });

};
fetchReports();

const NavigateToDetails = (entity,id) => {
  window.location.href = "/Pages/reportDeatails/reportDetails.html?entity="+entity+"&id="+id;
};
