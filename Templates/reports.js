const reports = (imageSrc, status, formName, assignedTo, date,entity,id) => {
  return `<div class='ReportContainer'>
      <div class='ReportContent'>

        <div class='ReportImage'>
          <img src="${imageSrc}" alt="no image found"/>
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
          <p title = ${assignedTo}>${addStars(assignedTo)}</p>
          <p>${new Date(date).toDateString()}</p>
        </div>

      </div>
      
      <button class='btn btn-warning btn-block' onclick= "NavigateToDetails('${entity}',${id})">VIEW DETAILS</button>

    </div>
  `;
};

const fetchReports = () => {
  let username = localStorage.getItem("userName");
 
  sendRequest("api/ChangeForm/fetchReports?userName="+username, "GET",{}, (data) => {
    reportCountCaller(data.length);
    let html = ``;
    for (const iterator of data) {
      html += reports(iterator.files? JSON.parse(iterator.files)[0]: "", iterator.status, iterator.formName, iterator.assignedTo, iterator.createdDate, iterator.entity ,iterator.id);
    }
    $(".reports").html(html);
  });

};
fetchReports();

const NavigateToDetails = (entity,id) => {
  window.location.href = "/Pages/reportDeatails/reportDetails.html?entity="+entity+"&id="+id;
};

//create a function which takes a string and add stars if length is greater than 20
function addStars(str){
  if(str.length > 20){
    return str.slice(0,10) + "....";
  }
  return str;
}