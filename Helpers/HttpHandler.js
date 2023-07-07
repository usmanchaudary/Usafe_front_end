const sendRequest = (url, method, body) => {
    $.ajax({
        url: `${serverURL}/${url}`,
        method: method || 'GET',
        data: body || {},
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            alert('some error occured');
        }
    })
}