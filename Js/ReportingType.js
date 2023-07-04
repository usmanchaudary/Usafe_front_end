$.get('../configuration/ReportingTypes.json', structure => {
    //iterate through the structure and call the function to create the template
    structure.forEach(element => {
       $('#reportingTypes').append(createReportingTypeTemplate(element.heading, element.href));
    });
})