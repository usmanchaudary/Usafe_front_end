const sendRequest = (url, method, body, successCallback) => {
  $.ajax({
    url: `${serverURL}/${url}`,
    method: method || "GET",
    data: body || {},
    contentType: "application/json",
    //add headers
    headers: {
      token: localStorage.getItem("token"),
      email : localStorage.getItem("userName")
    },
    success: successCallback
      ? successCallback
      : (data) => {
          swalSuccess("Data Saved Successfully");
        },
    error: (xhr, ajaxOptions, thrownError) => {
      if(xhr.status === 401){
        alert("Your session has expired. Please login again");
        localStorage.clear();
        window.location.href = "/Pages/Authentication/loginPage/loginPage.html";
        return;
      }
      //if any button is disabled then enable it
      $('button').attr('disabled',false);
      alert("some error occured");
      $('#load').hide();
    },
  });
};

const sendRequestWithFiles = (url, method, body, successCallback) => {
  $.ajax({
    url: `${serverURL}/${url}`,
    method: method || "GET",
    data: body || {},
    contentType: "application/json",
    processData: false,
    contentType: false,
    headers: {
      token: localStorage.getItem("token"),
      email : localStorage.getItem("userName")
    },
    success: successCallback
      ? successCallback
      : (data) => {
          swalSuccess("Data Saved Successfully");
        },
    error: (xhr, ajaxOptions, thrownError) => {
      if(xhr.status === 401){
        alert("Your session has expired. Please login again");
        localStorage.clear();
        window.location.href = "/Pages/Authentication/loginPage/loginPage.html";
        return;
      }
      $('button').attr('disabled',false);
      swalNotification("some error occured", "error");
    },
  });
};

const swalNotification = (message, type)=>{
  //if success message then add a timeout of 2 seconds

  swal.fire({
    title: type == "success" ? "Good job!" : "Oops!",
    text: message,
    icon: type,
    button: "Aww yiss!",
  });
  
}

function swalSuccess(message){
  swal.fire({
    title: "Data Saved Successfully",
    text: message,
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes, Goood Job!",
  }).then((result) => {
    if (result.isConfirmed) {
      // window.location.reload();
      window.location.href = "/Pages/reporting/reporting.html";
    }
  });
}