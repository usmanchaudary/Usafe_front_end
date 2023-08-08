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
          alert("successfully submitted the data");
         // window.location.reload();
        },
    error: (xhr, ajaxOptions, thrownError) => {
      if(xhr.status === 401){
        alert("Your session has expired. Please login again");
        localStorage.clear();
        window.location.href = "/Pages/Authentication/loginPage/loginPage.html";
      }
      //if any button is disabled then enable it
      $('button').attr('disabled',false);
      alert("some error occured");
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
          alert("successfully submitted the data");
          window.location.reload();
        },
    error: (xhr, ajaxOptions, thrownError) => {
      if(xhr.status === 401){
        alert("Your session has expired. Please login again");
        localStorage.clear();
        window.location.href = "/Pages/Authentication/loginPage/loginPage.html";
      }
      $('button').attr('disabled',false);
      alert("some error occured");
    },
  });
};
