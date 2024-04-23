function camelCaseToTitleCase(camelCase: string): string {
  let result = camelCase.replace(/([A-Z])/g, ' $1');
  result = result.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  return result.trim();
}

export default camelCaseToTitleCase;
