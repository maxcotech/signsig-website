import type { IntegrationGuide } from "@/content/integrations/types";

/**
 * Salesforce setup guide — transcribed verbatim from the content document
 * ("SECTION 3: INTEGRATION GUIDES → GUIDE 4"), 2026-08-26.
 *
 * The only guide with two code samples: an Apex class and the platform-event
 * trigger that calls into it. They are separate because they go in separate
 * files in a Salesforce org — which is why `samples` is a list.
 */
export const SALESFORCE_GUIDE: IntegrationGuide = {
  title: "Integrate SignSig with Salesforce",
  purpose:
    "This guide shows how to send quotes and agreements from Salesforce opportunities, track signing status, and automatically update records when documents are signed.",
  prerequisites: [
    "Salesforce org with API access",
    "SignSig account with Enterprise or Professional plan",
    "Salesforce admin access",
  ],
  steps: [
    {
      title: "Step 1: Install the SignSig Managed Package",
      items: [
        "Go to the Salesforce AppExchange",
        'Search for "SignSig"',
        'Click "Get It Now"',
        "Select your organization",
        'Click "Install"',
      ],
    },
    {
      title: "Step 2: Grant Required Permissions",
      items: [
        "In Salesforce Setup, go to Profiles",
        "Edit the profile you want to grant access to",
        'Under "Custom Apps", enable "SignSig"',
        "Save",
      ],
    },
    {
      title: "Step 3: Configure the Integration",
      items: [
        "In Salesforce, go to Setup > Integrations > SignSig",
        "Enter your SignSig API Key",
        "Configure the mapping between Salesforce fields and SignSig fields",
        "Set up automatic updates (when to update Opportunity stage, etc.)",
      ],
    },
    {
      title: "Step 4: Add SignSig to Your Opportunity Layout",
      items: [
        "Go to Setup > Object Manager > Opportunity",
        'Click "Layouts"',
        "Edit your Opportunity Page Layout",
        'Drag the "SignSig Documents" component to your layout',
        "Save",
      ],
    },
  ],
  samples: [
    {
      intro: "Using Apex to send a document from Salesforce:",
      lines: [
        "public class SignSigIntegration {",
        "    private static final String SIGNSIG_API_KEY = [SELECT Value__c FROM SignSig_Config__c LIMIT 1].Value__c;",
        "    private static final String SIGNSIG_API_URL = 'https://api.signsig.com/v1';",
        "",
        "    public static void sendAgreementFromOpportunity(Id opportunityId, String signerEmail) {",
        "        // Get the opportunity",
        "        Opportunity opp = [SELECT Id, Name, AccountId, Account.Name FROM Opportunity WHERE Id = :opportunityId];",
        "",
        "        // Prepare the document data",
        "        Map<String, Object> documentData = new Map<String, Object>{",
        "            'title' => opp.Name + ' - Service Agreement',",
        "            'signers' => new List<Map<String, String>>{",
        "                new Map<String, String>{",
        "                    'email' => signerEmail,",
        "                    'name' => opp.Account.Name",
        "                }",
        "            }",
        "        };",
        "",
        "        // Make the API call to SignSig",
        "        HttpRequest req = new HttpRequest();",
        "        req.setEndpoint(SIGNSIG_API_URL + '/documents');",
        "        req.setMethod('POST');",
        "        req.setHeader('Authorization', 'Bearer ' + SIGNSIG_API_KEY);",
        "        req.setHeader('Content-Type', 'application/json');",
        "        req.setBody(JSON.serialize(documentData));",
        "",
        "        Http http = new Http();",
        "        HttpResponse response = http.send(req);",
        "",
        "        if (response.getStatusCode() == 201) {",
        "            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());",
        "            String documentId = (String) result.get('id');",
        "",
        "            // Store the document ID in Salesforce for tracking",
        "            SignSig_Document__c sigDoc = new SignSig_Document__c(",
        "                Opportunity__c = opportunityId,",
        "                Document_ID__c = documentId,",
        "                Status__c = 'Pending Signature'",
        "            );",
        "            insert sigDoc;",
        "",
        "            System.debug('Document sent: ' + documentId);",
        "        } else {",
        "            System.debug('Error: ' + response.getBody());",
        "        }",
        "    }",
        "",
        "    // Called via webhook when document is signed",
        "    @AuraEnabled(continuation=true)",
        "    public static void handleDocumentSigned(String documentId) {",
        "        // Update the opportunity stage",
        "        SignSig_Document__c sigDoc = [SELECT Opportunity__c FROM SignSig_Document__c WHERE Document_ID__c = :documentId];",
        "",
        "        Opportunity opp = new Opportunity(",
        "            Id = sigDoc.Opportunity__c,",
        "            StageName = 'Closed Won'",
        "        );",
        "        update opp;",
        "    }",
        "}",
      ],
    },
    {
      intro: "Trigger to listen for document signing:",
      lines: [
        "trigger SignSigWebhookTrigger on SignSig_Webhook__e (after insert) {",
        "    for (SignSig_Webhook__e event : Trigger.new) {",
        "        if (event.Event_Type__c == 'document.signed') {",
        "            SignSigIntegration.handleDocumentSigned(event.Document_ID__c);",
        "        }",
        "    }",
        "}",
      ],
    },
  ],
  outcomeIntro: "After setup:",
  outcomes: [
    "Sales teams can send agreements from Opportunities without leaving Salesforce",
    "Signing status is tracked automatically in Salesforce",
    "Opportunity stage updates automatically when documents are signed",
    "Complete audit trail in Salesforce for compliance",
  ],
};
