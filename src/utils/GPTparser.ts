export const GPTparser = (formattedString: string | null) => {
  // Function to extract JSON content from the formatted string
  const extractJsonContent = (str: string) => {
    const match = str.match(/```json\n([\s\S]*?)\n```/);
    return match ? match[1] : null;
  };

  // Split the input string into separate JSON strings
  const jsonStrings = formattedString?.split("\n\n");

  // Process each JSON string
  const result = jsonStrings?.map((jsonString) => {
    const content = extractJsonContent(jsonString);
    if (!content) {
      throw new Error("Unable to extract JSON content");
    }

    try {
      const parsedData = JSON.parse(content);
      if (!Array.isArray(parsedData)) {
        throw new Error("The parsed data is not an array");
      }
      return parsedData; // This will be an array of objects
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  });

  return result;
};
