$.get('../configuration/DcaChecklistTypes.json',structure=>{
    let sectionFor = getValue('sectionFor');
    let sectionHeadings = structure.find(element=>element.sectionFor == sectionFor)?.sectionHeading;

    sectionHeadings.forEach(element=>{
        $('#dcaChecklistType').append(createReportingTypeTemplate(element.heading,element.href));
    });
})