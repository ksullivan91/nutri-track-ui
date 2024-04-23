function camelCaseToTitleCase(camelCase: string): string {
  // First, add a space before each uppercase letter.
  let result = camelCase.replace(/([A-Z])/g, ' $1');
  // Then, capitalize the first letter of each word.
  result = result.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  // Finally, remove any leading whitespace left by the first replace.
  return result.trim();
}

export default camelCaseToTitleCase;
