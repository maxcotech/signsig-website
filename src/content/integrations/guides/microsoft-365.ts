import type { IntegrationGuide } from "@/content/integrations/types";

/**
 * The Microsoft 365 setup guide — the only integration guide in the design
 * (`Integration Guide.png`, 2026-08-25). Copy transcribed verbatim.
 *
 * One file per guide: each is long enough (this one is ~110 lines, mostly the
 * code sample) that keeping them together would blow the 150-line ceiling.
 * Add a sibling file per new guide and wire it up in `integrations.data.ts`.
 *
 * Unlike the SDK snippets, this code sample is valid JavaScript as drawn — no
 * transcription caveats.
 */
export const MICROSOFT_365_GUIDE: IntegrationGuide = {
  title: "Microsoft 365 Integration",
  purpose:
    "This guide shows how to send documents for signature directly from Word, Outlook, and OneDrive, and automatically save signed documents back to your Microsoft 365 ecosystem.",
  prerequisites: [
    "Microsoft 365 account (Office 365 or Microsoft 365)",
    "SignSig account with API access",
    "Admin access to configure the integration",
  ],
  steps: [
    {
      title: "Step 1: Install the SignSig Add-in",
      items: [
        "Open Word, Excel, or Outlook",
        'Go to "Get Add-ins" in the ribbon',
        'Search for "SignSig"',
        'Click "Add" to install',
      ],
    },
    {
      title: "Step 2: Authenticate with SignSig",
      items: [
        "Open the SignSig add-in",
        'Click "Sign In"',
        "Log in with your SignSig account",
        "Grant permission for the add-in to access your documents",
      ],
    },
    {
      title: "Step 3: Configure Document Routing",
      items: [
        "Open the settings in the add-in",
        "Set your default signer group",
        "Choose where to save signed documents (OneDrive, SharePoint, etc.)",
        "Configure email notifications",
      ],
    },
    {
      title: "Step 4: Test the Integration",
      items: [
        "Create a test document in Word",
        "Add signature fields using the add-in",
        "Send for signature to a test email",
        "Verify the signed document is saved to your configured location",
      ],
    },
  ],
  samples: [
    {
      intro: "Using the REST API to send a document from your application:",
      lines: [
        "const axios = require('axios');",
        "",
        "const client = axios.create({",
        "  baseURL: 'https://api.signsig.com/v1',",
        "  headers: {",
        "    'Authorization': `Bearer ${process.env.SIGNSIG_API_KEY}`,",
        "    'Content-Type': 'application/json'",
        "  }",
        "});",
        "",
        "async function sendDocumentViaM365(documentPath, signerEmail) {",
        "  try {",
        "    // Create a document from a Word file",
        "    const documentResponse = await client.post('/documents', {",
        "      title: 'Contract for Signature',",
        "      signers: [",
        "        {",
        "          email: signerEmail,",
        "          name: 'John Doe'",
        "        }",
        "      ]",
        "    });",
        "",
        "    const documentId = documentResponse.data.id;",
        "",
        "    // Send the document for signature",
        "    const sendResponse = await client.post(`/documents/${documentId}/send`, {",
        "      message: 'Please sign this contract.',",
        "      redirectUrl: 'https://myapp.com/document-signed'",
        "    });",
        "",
        "    // Save to OneDrive",
        "    const saveResponse = await client.post(",
        "      `/documents/${documentId}/exports/save-to-onedrive`,",
        "      {",
        "        folderId: 'root',",
        "        fileName: 'signed-contract.docx'",
        "      }",
        "    );",
        "",
        "    console.log('Document sent and will be saved to OneDrive:', saveResponse.data);",
        "    return sendResponse.data;",
        "  } catch (error) {",
        "    console.error('Error sending document:', error.response.data);",
        "  }",
        "}",
        "",
        "// Usage",
        "await sendDocumentViaM365('proposal.docx', 'client@example.com');",
      ],
    },
  ],
  outcomeIntro: "After setup:",
  outcomes: [
    "You can send documents for signature directly from Word",
    "Signed documents are automatically saved to your OneDrive or SharePoint",
    "Signing activity is logged in both SignSig and your Microsoft 365 audit trail",
    "Team members receive notifications in Outlook when documents need attention",
  ],
};
