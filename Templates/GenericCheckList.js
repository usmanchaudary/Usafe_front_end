const createResultHtml = (questions)=>{
    return `
    <div id="resultContainer">
    <h2>Checklist Results</h2>
    <div class="accordion" id="accordionResults">
      ${questions
        .map(
          (question, index) => `
          <div class="card">
            <div class="card-header" id="questionHeading${index}">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#questionCollapse${index}" aria-expanded="true" aria-controls="questionCollapse${index}">
                  ${question.heading} (${question.question})
                </button>
              </h5>
            </div>
            <div id="questionCollapse${index}" class="collapse" aria-labelledby="questionHeading${index}" data-parent="#accordionResults">
              <div class="card-body">
                <!-- Display input values for question ${index + 1} -->
                <p>Compliance: <span id="question${index + 1}ComplianceValue">${question.compliance}</span></p>
                <p>Status: <span id="question${index + 1}StatusValue">${question.status}</span></p>
                <p>Actions / Remarks: <span id="question${index + 1}ActionsValue">${question.actions}</span></p>
                <p>Responsibility: <span id="question${index + 1}ResponsibilityValue">${question.responsibility}</span></p>
              </div>
            </div>
          </div>`
        )
        .join("")}
    </div>`;
}