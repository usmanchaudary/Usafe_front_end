
let sectionFor = getValue('sectionFor');
sendRequest(`api/checklist/getdcaChecklisttypes?checkListFormName=${sectionFor}`, "GET", null,result =>{
    if(result.sectionHeading.length){
        result.sectionHeading.forEach(element=>{
            $('#dcaChecklistType').append(createReportingTypeTemplate(element.heading,element.href));
        });
    }
});

// $.get('../configuration/DcaChecklistTypes.json',structure=>{
//     let sectionHeadings = structure.find(element=>element.sectionFor == sectionFor)?.sectionHeading;

//     sectionHeadings.forEach(element=>{
//         $('#dcaChecklistType').append(createReportingTypeTemplate(element.heading,element.href));
//     });
// })