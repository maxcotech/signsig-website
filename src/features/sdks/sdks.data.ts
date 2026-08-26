/**
 * The SDKs & Libraries cards. Copy transcribed verbatim from the design
 * (`SDKs & Libraries.png`, 2026-08-25).
 *
 * ✅ THE TWO BROKEN SNIPPETS ARE FIXED. The design PNG had a Maven block whose
 * closing tags read `<groupId>`/`<artifactId>` (invalid XML — it would not
 * parse) and a .NET package spelled `SignSig.SdK`. Both were flagged rather
 * than silently corrected. The content document (2026-08-26) supplies the
 * correct forms — `</groupId>`, `</artifactId>` and `SignSig.Sdk` — which are
 * now used here. The design PNG is wrong on these two points; the document
 * wins, because a snippet is a copy-paste target and has to actually work.
 *
 * The TypeScript install also changed: the design showed only
 * `npm install @signsig/types`, the document specifies
 * `npm install @signsig/sdk @signsig/types` (the SDK is needed too).
 */

export type SdkEntry = {
  id: string;
  /** Badge text. Uppercase in the design; stored as displayed. */
  label: string;
  description: string;
  /** Rendered as one block, one array entry per line. */
  command: readonly string[];
};

export const SDK_ENTRIES: readonly SdkEntry[] = [
  {
    id: "node",
    label: "NODE JS",
    description:
      "Full-featured SDK for browser and Node.js environments with first-class TypeScript support.",
    command: ["npm install @signsig/sdk"],
  },
  {
    id: "typescript",
    label: "TYPESCRIPT",
    description:
      "Complete type definitions included. Build type-safe signing workflows without separate typing packages.",
    command: ["npm install @signsig/sdk @signsig/types"],
  },
  {
    id: "python",
    label: "PYTHON",
    description:
      "Pythonic SDK with async support. Perfect for data science, automation, and batch processing.",
    command: ["pip install signsig"],
  },
  {
    id: "php",
    label: "PHP",
    description:
      "PSR-compliant SDK for modern PHP applications. Works with Laravel, Symfony, and Slim.",
    command: ["composer require signsig/sdk"],
  },
  {
    id: "ruby",
    label: "RUBY",
    description:
      "Gem for Rails, Sinatra, and Ruby applications with chainable API design.",
    command: ["gem install signsig"],
  },
  {
    id: "go",
    label: "GO",
    description:
      "Lightweight SDK for high-performance applications. Zero external dependencies.",
    command: ["go get github.com/signsig/go-sdk"],
  },
  {
    id: "dotnet",
    label: ".NET",
    description:
      "Modern SDK for .NET Framework and .NET Core with async/await support.",
    // Corrected from the design's "SignSig.SdK" per the content document.
    command: ["dotnet add package SignSig.Sdk"],
  },
  {
    id: "openapi",
    label: "OPENAPI / POSTMAN",
    description:
      "Complete OpenAPI specification and Postman collection for exploration and testing.",
    command: [
      "# Import into Postman",
      "# Download from: https://signsig.com/postman-collection",
    ],
  },
  {
    id: "rest",
    label: "REST API",
    description:
      "JSON-based API for direct HTTP requests. Use with any language or platform.",
    command: [
      "# No installation needed. Use curl, axios, or your HTTP client",
      'curl https://api.signsig.com/v1/documents \\ -H "Authorization: Bearer YOUR_API_KEY"',
    ],
  },
  {
    id: "java",
    label: "JAVA",
    description:
      "Full-featured SDK for Java and Kotlin. Maven and Gradle support.",
    // Valid XML, per the content document. The design's version was missing
    // the closing slashes and would not parse.
    command: [
      "<dependency>",
      "    <groupId>com.signsig</groupId>",
      "    <artifactId>signsig-sdk</artifactId>",
      "    <version>2.0.0</version>",
      "</dependency>",
    ],
  },
] as const;
