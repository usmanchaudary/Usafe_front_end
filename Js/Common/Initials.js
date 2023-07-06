
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
    //get the value of the selected option
    $.get('../../configuration/cascadedList.json', data => {
        let selectedValue = $(element).val();
        let parentData = data.filter(x => x.parent === parentName)[0];

        let options = parentData.options.filter(x => x.parent === selectedValue);
        elementToPopulate.empty();
        elementToPopulate.append(`<option selected disabled hidden>Select Area</option>`);
        options.forEach(option => {
            elementToPopulate.append(`<option value="${option.val}">${option.text}</option>`);
        });
    })
}