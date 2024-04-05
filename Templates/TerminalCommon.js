const createTerminalCommonTemplate = (element) => {
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
