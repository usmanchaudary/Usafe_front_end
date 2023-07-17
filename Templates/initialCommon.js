const createInitialCommonTemplate = (element) => {
    var html = "";
    switch (element.elementTag) {
        case "input":
        case "textarea":
            html = createInputElements(element);
            break;
        case "select":
            html = createSelectElements(element);
            break;
    }
    return html;
}

const createInputElements = (element) => {
    return `<div class="form-group">
                <label for="${element.name}">${element.name}</label>
                <${element.elementTag} type="${element.type}" ${element.multiple} class="form-control" id="${element.name}" placeholder="${element.name}" col="10" row="20" ></${element.elementTag}>
            </div>`;
}

const createSelectElements = (element) => {
    let html = `<div class="form-group">
                <label for="${element.name}">${element.name}</label>
                <select class="form-control" id="${element.name}" data-childName="${element.child}" ${element.type === "cascaded" ? 'onchange="populateNextSelect(this)"' : ""}> 
                <option selected disabled hidden>Select</option>
                `;
                    if(!element.Parent){
                        let departments = JSON.parse(localStorage.getItem("departments"));
                        for (let i = 0; i < departments.length; i++) {
                            html += `<option val="${departments[i].id}.options[i].id}"> ${departments[i].name} </option>`; 
                        }
                    }    
                    else{
                        for (let i = 0; i < element.options.length; i++) {
                            html += `<option val="${element.options[i].val}"> ${element.options[i].text} </option>`; 
                        }
                }
                html +=`</select>
            </div>`;
    return html;
}