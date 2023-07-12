const sendRequest = (url, method, body) => {
  $.ajax({
    url: `${serverURL}/${url}`,
    method: method || "GET",
    data: body || {},
    contentType: "application/json",
    processData: false,
    contentType: false,
    success: (data) => {
      alert("successfully submitted the data");
      window.location.reload();
    },
    error: (err) => {
      alert("some error occured");
    },
  });
};