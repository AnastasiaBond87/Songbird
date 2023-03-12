
// nameOfClass = [class1, class2, ...]
// attr = {attribute name: attribute value}

export function addElement(element, nameOfClass, parentNode, attr) {
  const newElement = document.createElement(element);
  if (nameOfClass) {
    for (let i = 0; i < nameOfClass.length; i++) {
      newElement.classList.add(nameOfClass[i]);
    }
  }
  if (attr) {
    for (let key in attr) {
      newElement.setAttribute(key, attr[key]);
    }
  }
  parentNode.append(newElement);
  return newElement;
}