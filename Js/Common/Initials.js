
$.get('../../configuration/InitialCommonFields.json', structure => {
    //iterate through the structure and call the function to create the template
    structure.forEach(element => {
        $('#initialCommonFields').append(
            createInitialCommonTemplate(element));
    });
})

const populateNextSelect = (element) => {
    //get the if of element
    let parentName = $(element).attr("id");
    //get data-childName attribute
    let childName = $(element).attr("data-childName");
    let elementToPopulate = $(`#${childName}`);
    let selectedValue = $(element).val();
    let api = $(element).attr("data-api");
    if (api){
        let siteId = localStorage.getItem("siteId");
        let textField = $(element).attr("data-textField");
        let valueField = $(element).attr("data-valueField");

        if(parentName == "Area"){
            api = `${api}?siteId=${siteId}&deptId=${$('#Department').val()}&areaId=${selectedValue}`;
        }
        else{
            api = `${api}?siteId=${siteId}&deptId=${selectedValue}`;
        }

        //get the value of the selected option
        sendRequest(`${api}`,'GET',null, data => {
            elementToPopulate.empty();
            elementToPopulate.append(`<option selected disabled hidden>Select . . .</option>`);
            data.forEach(option => {
                elementToPopulate.append(`<option value="${option[valueField]}" >${option[textField]}</option>`);
            });
        })
    }
}
