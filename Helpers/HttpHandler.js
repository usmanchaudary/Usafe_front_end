const sendRequest = (url, method, body, successCallback) => {
  $.ajax({
    url: `${serverURL}/${url}`,
    method: method || "GET",
    data: body || {},
    contentType: "application/json",
    // processData: false,
    // contentType: false,
    success: successCallback
      ? successCallback
      : (data) => {
          alert("successfully submitted the data");
         // window.location.reload();
        },
    error: (err) => {
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
    success: successCallback
      ? successCallback
      : (data) => {
          alert("successfully submitted the data");
          window.location.reload();
        },
    error: (err) => {
      alert("some error occured");
    },
  });
};
