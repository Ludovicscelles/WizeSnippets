export const getPrismLanguage = (language: string): string => {
  const prismLanguages: Record<string, string> = {
    JavaScript: "javascript",
    Python: "python",
    Java: "java",
    "C#": "csharp",
    "C++": "cpp",
    Ruby: "ruby",
    PHP: "php",
    Go: "go",
    Swift: "swift",
    Kotlin: "kotlin",
    Rust: "rust",
    TypeScript: "typescript",
    HTML: "markup",
    CSS: "css",
    SQL: "sql",
    Bash: "bash",
  };

  return prismLanguages[language] || "plaintext";
};
