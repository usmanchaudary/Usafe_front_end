// $.get('../../configuration/TerminalCommonFields.json', structure => {
//     //iterate through the structure and call the function to create the template
//     structure.forEach(element => {
//         $('#terminalCommonFields').append(createTerminalCommonTemplate(element));
//     });
// });
$.get('../../configuration/TerminalCommonFields.json', structure => {
    //iterate through the structure and call the function to create the template
    structure.forEach(element => {
        $('#terminalCommonFields').append(createTerminalCommonTemplate(element));
    });
});
