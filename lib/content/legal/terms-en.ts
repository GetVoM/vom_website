import type { LegalSection } from "./types";

/**
 * Terms and conditions, English text. Source: the WordPress page /en/terms-and-conditions/,
 * last saved there on 2026-09-14. Typo fixes only (owner, 2026-11-09); every change is listed in
 * docs/content/legal/terms-text-changes.md. `{email}` renders as the notices address.
 */
export const termsEn: LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    paragraphs: [
      "These Terms and Conditions constitute a formal “Agreement” between the cloud accounting company."
    ]
  },
  {
    id: "about",
    heading: "About VoM",
    paragraphs: [
      "VoM is a local accounting platform based in Riyadh, Kingdom of Saudi Arabia, aiming to enhance the “financial value” for small businesses by focusing on facilitating the management of their financial data. Our top priority at VoM is our customers, as we strive to ensure that individuals can manage their businesses independently and with ease, even without an accounting background."
    ]
  },
  {
    id: "section-1",
    number: 1,
    heading: "The Website",
    clauses: [
      {
        id: "clause-1-1",
        number: "1.1",
        text: "We endeavor to ensure that the website is free from any errors, defects, malfunctions, or corruption. Therefore, we assume no liability for any damage or loss of data on the subscriber’s personal computer system, network, or server resulting from the use of the website or from downloading any materials provided through this website."
      },
      {
        id: "clause-1-2",
        number: "1.2",
        text: "We cannot guarantee that access to the website will be uninterrupted or error-free at all times."
      },
      {
        id: "clause-1-3",
        number: "1.3",
        text: "There may also be instances where access to the website is interrupted for maintenance, emergency repairs, or upgrades to improve the performance or functionality of the site. Access may also be interrupted due to failures in telecommunications links and equipment, which are beyond our control."
      },
      {
        id: "clause-1-4",
        number: "1.4",
        text: "VoM is committed to providing a Service Level Agreement (SLA) with a 99.5% uptime for its core services. Compensation for any service interruption is limited to “total outage” cases only, and it is required that the customer provides proof of actual direct damage resulting from such interruption. In the event that damage is proven and compensation is due, the customer has the right to deduct the compensation amount from future subscription fees at VoM’s discretion."
      }
    ]
  },
  {
    id: "section-2",
    number: 2,
    heading: "Password, Subscription, and Security",
    clauses: [
      {
        id: "clause-2-1",
        number: "2.1",
        text: "The subscriber is responsible for maintaining the confidentiality of their password and username."
      },
      {
        id: "clause-2-2",
        number: "2.2",
        text: "The subscriber agrees not to share their subscription username and password with other users to allow them access to the content. If we become aware that a single subscription is being used by multiple users, or if multiple users are sharing one account, we will immediately close the account, block any access to the content for the subscriber who violated the agreement, and pursue a claim for the value of the losses incurred due to this violation of use."
      },
      {
        id: "clause-2-3",
        number: "2.3",
        text: "The subscriber bears full responsibility for all activity within the site covered by these terms. The subscriber acknowledges their full responsibility for managing the permissions of their users within the system and defining access levels for each user. The entity (the subscriber) bears all legal and financial consequences resulting from any action taken by users authorized by it."
      },
      {
        id: "clause-2-4",
        number: "2.4",
        text: "The subscriber undertakes to notify VoM via the email address {email} of any unauthorized use of their username and/or password, or any other security breach of which the subscriber becomes aware."
      },
      {
        id: "clause-2-5",
        number: "2.5",
        text: "The subscriber may change their password at any time by following the instructions provided by the system."
      },
      {
        id: "clause-2-6",
        number: "2.6",
        text: "If your account is inactive for at least two months (as determined by VoM), we may deactivate your account. Deactivated accounts are not deleted; they are stored and can be restored. We will notify you via email if we decide to deactivate your account. If you know in advance that your account will be inactive at some point and you do not want us to deactivate it, inform us at VoM in advance. We reserve the right to charge data storage fees for storing information associated with deactivated accounts. If your account remains inactive after deactivation and we do not receive a response from you, we may terminate it at any time without prior notice."
      },
      {
        id: "clause-2-7",
        number: "2.7",
        text: "The subscription is for a limited period only (e.g., 12 months) and renews automatically. Annual renewal can only be initiated and authorized by the subscriber, who must re-register for a new subscription period. The subscriber cannot cancel their subscription once they have agreed to the subscription period. Similarly, the subscriber cannot upgrade from one period to another but must complete a period and re-register for another."
      },
      {
        id: "clause-2-8",
        number: "2.8",
        lead: "Refunds:",
        text: "The customer is obligated to use and test the system during the 7-day trial period. The customer has no right to claim a refund after this period expires. If a refund is requested during the trial period (the 7 days), the training fee (if obtained), amounting to 500 Saudi Riyals including VAT, is excluded and is non-refundable."
      },
      {
        id: "clause-2-9",
        number: "2.9",
        lead: "Training:",
        text: "The program is committed to providing only one training session as part of the subscription, which covers the system usage mechanism only and does not include accounting consulting."
      }
    ]
  },
  {
    id: "section-3",
    number: 3,
    heading: "Copyright",
    clauses: [
      {
        id: "clause-3-1",
        number: "3.1",
        text: "All contents of this site (texts, illustrations, audio files) and the site itself are owned by VoM. No part of this site may be copied, reproduced, redesigned, or recreated without prior consent from VoM."
      }
    ]
  },
  {
    id: "section-4",
    number: 4,
    heading: "Access and Data Export",
    clauses: [
      {
        id: "clause-4-1",
        number: "4.1",
        text: "Access to the system, services, and data associated with the account is available only during the active subscription period."
      },
      {
        id: "clause-4-2",
        number: "4.2",
        text: "Upon expiration or non-renewal of the subscription, access to the account and use of the system will be suspended until the subscription is reactivated. The Company retains the data in accordance with its approved data retention policy."
      },
      {
        id: "clause-4-3",
        number: "4.3",
        text: "The user acknowledges that the service is provided as a subscription-based cloud system (SaaS), and that the subscription fees cover system operation, data hosting, backup, security, updates, and ongoing maintenance."
      },
      {
        id: "clause-4-4",
        number: "4.4",
        text: "The system also allows the user to export their data and reports during the active subscription period and retain copies thereof for use when needed, and the user shall be solely responsible for exporting such data and reports before the expiry of their active subscription period."
      }
    ]
  },
  {
    id: "section-5",
    number: 5,
    heading: "Data",
    clauses: [
      {
        id: "clause-5-1",
        number: "5.1",
        text: "If you register to open an account on VoM, you agree to:",
        items: [
          "Provide true, accurate, current, and complete information as may be requested by any registration forms on the services (“Registration Data”); and",
          "Promptly update the Registration Data and any other information you provide to VoM to ensure it remains true, accurate, and complete."
        ]
      },
      {
        id: "clause-5-2",
        number: "5.2",
        text: "VoM is not responsible for any data recorded by the company in the system, and VoM encourages all users to maintain and update accurate information, whether internally or shared with third parties."
      },
      {
        id: "clause-5-3",
        number: "5.3",
        text: "All generated invoices must contain your company’s VAT number."
      },
      {
        id: "clause-5-4",
        number: "5.4",
        text: "Data entered by the user is kept in strict confidence and is not shared with any other party outside the system."
      },
      {
        id: "clause-5-5",
        number: "5.5",
        text: "For the purposes of “service development” and “continuous improvement,” the subscriber agrees to grant VoM the right to use the data entered into the system to train and develop the platform’s artificial intelligence models. The subscriber alone bears full legal responsibility for obtaining all necessary approvals and permits from their users and end-customers to collect and use this data for this purpose."
      },
      {
        id: "clause-5-6",
        number: "5.6",
        text: "The subscriber undertakes to enter accurate and correct financial and accounting data and bears full legal and financial responsibility for its validity and reliability."
      },
      {
        id: "clause-5-7",
        number: "5.7",
        lead: "Data Retention and Backup:",
        text: "Financial data retention policies are subject to applicable regulations. The subscriber bears full responsibility for taking periodic backups of their financial data, exporting it, and keeping it outside the platform to ensure its continuity and compliance with regulatory requirements."
      },
      {
        id: "clause-5-8",
        number: "5.8",
        lead: "Cybersecurity and Data Protection:",
        text: "VoM is committed to applying best technical and organizational practices and standards to protect data, in accordance with the controls of the National Cybersecurity Authority (NCA) in the Kingdom of Saudi Arabia. This includes the use of advanced encryption technologies to protect data during transit and storage."
      },
      {
        id: "clause-5-9",
        number: "5.9",
        lead: "Reporting Breaches:",
        text: "In the event of any security breach affecting subscriber data, VoM is committed to notifying the subscriber immediately upon discovery of the breach, clarifying the nature of the breach and the corrective measures taken to mitigate its effects."
      }
    ]
  },
  {
    id: "section-6",
    number: 6,
    heading: "Service",
    clauses: [
      {
        id: "clause-6-1",
        number: "6.1",
        text: "All prices are displayed on the website www.getvom.com."
      },
      {
        id: "clause-6-2",
        number: "6.2",
        text: "The user will be charged on a monthly, quarterly, or annual basis based on one of the three packages they subscribed to."
      },
      {
        id: "clause-6-3",
        number: "6.3",
        text: "Subscriptions can only be paid via a valid credit/debit card, and the subscriber must provide details thereof when applying for VoM services."
      },
      {
        id: "clause-6-4",
        number: "6.4",
        text: "We reserve the right to modify subscription prices without notice. Any adjustment or change in subscription fees will be valid only for new subscribers or new subscriptions for renewed periods and will not affect existing subscriptions. Where indicated, all prices are inclusive of the 15% Value Added Tax (VAT) in the Kingdom of Saudi Arabia."
      },
      {
        id: "clause-6-5",
        number: "6.5",
        text: "All payments are processed through the secure sites of our payment processing partners (HyperPay). We do not handle any payments directly ourselves and do not store any credit card details on our servers."
      },
      {
        id: "clause-6-6",
        number: "6.6",
        lead: "Technical Integration:",
        text: "VoM provides technical integration capabilities with external systems via Application Programming Interfaces (API). The subscriber is responsible for ensuring their systems are compatible with the integration requirements, and VoM bears no responsibility for any malfunction resulting from third-party systems."
      },
      {
        id: "clause-6-7",
        number: "6.7",
        lead: "Technical Support:",
        text: "Technical support services are provided during official working hours, which start from 8:00 AM to 5:00 PM, Sunday to Thursday, Saudi Arabia time."
      },
      {
        id: "clause-6-8",
        number: "6.8",
        lead: "Electronic Invoicing (ZATCA):",
        text: "The platform provides technical tools that comply with the requirements of the Zakat, Tax and Customs Authority (ZATCA) for electronic invoicing. However, the subscriber alone bears full responsibility for complying with all tax laws and regulations in force in the Kingdom of Saudi Arabia, and VoM bears no responsibility for any fines or violations resulting from misuse of the system or entry of incorrect data."
      }
    ]
  },
  {
    id: "section-7",
    number: 7,
    heading: "Limitation of Liability",
    clauses: [
      {
        id: "clause-7-1",
        number: "7.1",
        text: "The subscriber is not entitled to use a single license for multiple users or allow multiple users to log in, whether privately or for commercial reasons."
      },
      {
        id: "clause-7-2",
        number: "7.2",
        text: "When subscribing to the services of this site, the subscriber undertakes to use the services for lawful purposes only and bears full responsibility for the content of any messages and texts sent by them or on their behalf to third parties via the services. They acknowledge being the sole person responsible for them and release VoM from any subsequent claim or demand. The subscriber agrees to indemnify VoM for any cost resulting from claims or lawsuits filed against it by a third party for damages caused by the subscriber or persons authorized by the subscriber to access the services."
      },
      {
        id: "clause-7-3",
        number: "7.3",
        text: "If you do not agree to the amended terms, you must stop using the services. You may cancel your account with us without further obligation, except for the amount due for the balance of the billing period in which you cancel your account (if the billing period is monthly, we will prorate your account to the nearest end of the month after cancellation)."
      },
      {
        id: "clause-7-4",
        number: "7.4",
        text: "VoM has the right to terminate any subscription or account if the user violates its terms and policies."
      },
      {
        id: "clause-7-5",
        number: "7.5",
        lead: "Dispute Resolution:",
        text: "In the event of any dispute related to the signing, conclusion, or execution of this Agreement, both parties undertake to attempt to resolve it amicably through a simplified and rapid mechanism within thirty (30) days from the date of the dispute notification. Excluded from this amicable mechanism are claims related to the protection of intellectual property rights and financial claims due to VoM, where VoM has the right to immediately resort to the competent judicial authorities in the Kingdom of Saudi Arabia."
      },
      {
        id: "clause-7-6",
        number: "7.6",
        lead: "Disclaimer of Professional Advice:",
        text: "The VoM platform is a technical tool (SaaS) aimed at facilitating the management of accounting and financial operations. Neither the platform nor any of its representatives provides any professional financial, tax, legal, or accounting advice. The subscriber must consult certified professional advisors to obtain such advice."
      },
      {
        id: "clause-7-7",
        number: "7.7",
        lead: "Compliance with Accounting Standards:",
        text: "The subscriber undertakes to apply the accounting standards approved in the Kingdom of Saudi Arabia (SOCPA) when using the platform to prepare their financial reports and bears sole responsibility for any deviation from these standards."
      },
      {
        id: "clause-7-8",
        number: "7.8",
        lead: "Limits of Liability:",
        text: "In all cases, the total liability of VoM towards the subscriber for any claims arising from or related to this Agreement, whether in contract or tort, shall not exceed the total fees paid by the subscriber to VoM during the twelve (12) months preceding the date the claim arose."
      }
    ]
  },
  {
    id: "section-8",
    number: 8,
    heading: "Contact Information",
    paragraphs: [
      "The user can contact the company directly via email:",
      "{email}",
      "Both parties adopt email as the primary and official means for all legal and administrative notifications and correspondence related to this Agreement."
    ]
  },
  {
    id: "section-9",
    number: 9,
    heading: "Subscriber Obligations and Financial Operations (VoM Pay)",
    clauses: [
      {
        id: "clause-9-1",
        number: "9.1",
        lead: "Legality of Products and Services:",
        text: "The subscriber undertakes to ensure the legality of the products and services they offer and to deliver them in a timely manner. The subscriber bears full responsibility for any violations committed by their customers, as well as responsibility for any suspicious or stolen payment transactions. VoM has the right to disconnect the service immediately if this is proven."
      },
      {
        id: "clause-9-2",
        number: "9.2",
        lead: "Representations and Warranties:",
        text: "The subscriber acknowledges their full legal capacity and authority to sign this Agreement, the accuracy of all information provided, and that they have reviewed all terms and conditions. They also undertake not to charge their customers any additional fees for the service."
      },
      {
        id: "clause-9-3",
        number: "9.3",
        lead: "Product Details:",
        text: "The subscriber undertakes to provide a detailed description of goods and services, including delivery time, price, and the currency used."
      },
      {
        id: "clause-9-4",
        number: "9.4",
        lead: "Commitment to Activity:",
        text: "The subscriber undertakes to practice only the activity described in the contract, and VoM has the right to take necessary measures in case of violation."
      },
      {
        id: "clause-9-5",
        number: "9.5",
        lead: "Change of Activity:",
        text: "It is prohibited to use the services for activities not agreed upon, and the subscriber undertakes to notify VoM immediately upon changing their activity."
      },
      {
        id: "clause-9-6",
        number: "9.6",
        lead: "Card Data Security:",
        text: "The subscriber bears full responsibility for the security of their customers’ cardholder data."
      },
      {
        id: "clause-9-7",
        number: "9.7",
        lead: "Suspension of Payments:",
        text: "VoM has the right to delay the transfer of payments to verify their legality and reverse them if necessary."
      },
      {
        id: "clause-9-8",
        number: "9.8",
        lead: "Refunds:",
        text: "The subscriber undertakes to refund amounts when canceling transactions in coordination with VoM."
      },
      {
        id: "clause-9-9",
        number: "9.9",
        lead: "Audit and Review:",
        text: "The subscriber undertakes to provide the necessary information and assistance to audit transactions."
      },
      {
        id: "clause-9-10",
        number: "9.10",
        lead: "Accuracy of Data:",
        text: "The subscriber acknowledges the accuracy and correctness of all data provided."
      },
      {
        id: "clause-9-11",
        number: "9.11",
        lead: "Suspicious Transactions:",
        text: "The subscriber undertakes to report immediately any suspicious transactions (money laundering, terrorist financing, or fraud)."
      },
      {
        id: "clause-9-12",
        number: "9.12",
        lead: "Linking Accounts:",
        text: "The subscriber undertakes not to link the account to more than one website without assigning a different payment page."
      },
      {
        id: "clause-9-13",
        number: "9.13",
        lead: "Chargebacks:",
        text: "The subscriber bears full responsibility towards customers and bears all chargebacks."
      },
      {
        id: "clause-9-14",
        number: "9.14",
        lead: "Agreement Duration:",
        text: "The duration of the agreement is one year, renewable automatically unless one party notifies the other of non-renewal 30 days in advance."
      },
      {
        id: "clause-9-15",
        number: "9.15",
        lead: "Termination:",
        text: "VoM has the right to terminate the agreement immediately upon the subscriber’s breach, and the subscriber has the right to terminate with 30 days’ prior notice."
      },
      {
        id: "clause-9-16",
        number: "9.16",
        lead: "Confidentiality:",
        text: "Confidential information refers to all technical, financial, and commercial data and information exchanged between the parties. Both parties undertake to maintain the confidentiality of this information and not to disclose it to any third party except with prior written consent or if required by laws, regulations, or requests from competent judicial and governmental authorities. The obligation of confidentiality remains in effect even after the expiration or termination of this Agreement."
      },
      {
        id: "clause-9-17",
        number: "9.17",
        lead: "Fees and Commissions:",
        text: "The following commissions apply: Mada 0.90%, Credit Cards 2.25%, Apple Pay 2.25%, multi-merchant and installation fees 1,725 Saudi Riyals, and transfer fees 1 Saudi Riyal. 15% VAT is added, and the transfer period is within two working days."
      },
      {
        id: "clause-9-18",
        number: "9.18",
        lead: "Advertising Use:",
        text: "VoM has the right to use the subscriber’s name and trademark for advertising purposes."
      },
      {
        id: "clause-9-19",
        number: "9.19",
        lead: "Dealing with Competitors:",
        text: "VoM has the right to deal with entities that are competitors to the subscriber."
      },
      {
        id: "clause-9-20",
        number: "9.20",
        text: "The terms and conditions mentioned herein represent the contract concluded between the users of technical payment services (the user, merchant, seller, organization, person, you, or what you represent) and VoM. VoM acts as an intermediary technical platform to provide technical integration services and does not practice any financing or banking activities subject to the supervision of the Saudi Central Bank (SAMA) directly, and does not bear any joint liability for financial transactions."
      },
      {
        id: "clause-9-21",
        number: "9.21",
        text: "Only companies, institutions, persons, and organizations permitted to conduct payment and money receipt operations within their countries by official authorities may apply to use VoM services. VoM services may not be used by those who are not permitted to receive money or conduct commercial or non-commercial financial operations within their countries."
      },
      {
        id: "clause-9-22",
        number: "9.22",
        text: "Amounts transferred by VoM must serve the same purpose mentioned in the service application form and comply with the merchant’s licensed activities."
      },
      {
        id: "clause-9-23",
        number: "9.23",
        text: "The trade name shown on the invoice must represent the merchant and their authorized activities."
      },
      {
        id: "clause-9-24",
        number: "9.24",
        text: "Merchants under 16 years of age must be represented by a legal guardian in accordance with the applicable laws of the country."
      },
      {
        id: "clause-9-25",
        number: "9.25",
        text: "The entity or person applying for the service agrees that VoM may request additional information or an update of the data previously provided at any time. Examples of information and data that may be requested include, but are not limited to, proof of identity, business policies and procedures, financial information, licenses, invoices, delivery receipts, or any other information. Failure to provide the requested information may result in service interruption or contract cancellation."
      },
      {
        id: "clause-9-26",
        number: "9.26",
        text: "Agreement to notify us of any modification to the business activity, including change in the nature of the activity, change of ownership, change in the volume of financial transactions, change in the geographical location of the activity, and other changes that affect VoM’s assessment of the activity."
      },
      {
        id: "clause-9-27",
        number: "9.27",
        text: "VoM grants its users a non-exclusive, non-transferable, and non-assignable license to benefit from its services. The user may not use VoM services to transfer or receive any money on behalf of other sites or intermediary merchants not approved by VoM."
      },
      {
        id: "clause-9-28",
        number: "9.28",
        text: "Upon registering with VoM, completing the application form, and approving your account, you will be granted access to the VoM platform where you can review your sales transactions via dashboards, request additional services, contact the support team, and submit a request to change the bank data registered in your account from the VoM platform."
      },
      {
        id: "clause-9-29",
        number: "9.29",
        text: "VoM is committed to maintaining the confidentiality of personal and financial information and any other information it may have about the customer or any other parties VoM may use, and not to disclose it to third parties except in cases approved by law or with prior consent from the customer."
      },
      {
        id: "clause-9-30",
        number: "9.30",
        text: "VoM is committed to exercising due diligence to handle customer complaints and grievances in a quick and fair manner through the legitimate methods adopted by VoM via the website, application, visiting the company’s headquarters, or by mail, with a commitment to follow up on the complaint with the customer and update them on the status of the complaint in a timely manner."
      },
      {
        id: "clause-9-31",
        number: "9.31",
        text: "VoM is committed to providing the dispute resolution mechanism it follows when resolving customer complaints, with the steps to be followed announced to customers via the website and the company’s social media accounts."
      },
      {
        id: "clause-9-32",
        number: "9.32",
        text: "This contract is subject to the laws of the country where VoM services are provided, and any dispute arising between the user and VoM falls within the jurisdiction of the courts of that country."
      },
      {
        id: "clause-9-33",
        number: "9.33",
        text: "VoM has the right to request the signing of additional contracts or contract addendums with the user."
      },
      {
        id: "clause-9-34",
        number: "9.34",
        text: "VoM has the right to amend the terms and conditions at any time."
      },
      {
        id: "clause-9-35",
        number: "9.35",
        text: "The user may not use VoM services to practice any prohibited activity or deal with entities prohibited by VoM in the country of activity, including:",
        items: [
          "Persons who have information indicating their potential involvement in criminal activities or are listed on any public blacklist related to criminal activities, drug trafficking, terrorism, and organized crime.",
          "Individuals or companies that engage in activities that make it impossible to verify the legality or source of funds, or who have funds that do not correspond to their financial situations.",
          "Persons who refuse to provide the information or documents required to verify the activity or provide suspicious or illegally obtained documents.",
          "Legal entities with unidentified shareholders or control structure.",
          "Exchange offices, money transmitters, and unauthorized entities of a similar nature.",
          "Financial institutions residing in countries or territories that have no physical presence (also known as “shell banks”) and are not part of an organized financial group.",
          "Any business not compliant with Islamic Sharia.",
          "Sub-agents.",
          "Bitcoin companies and Bitcoin trading platforms",
          "Businesses that deal directly or indirectly with sanctioned countries, including Iran, Syria, South Sudan, North Korea, Cuba, Eritrea, and the Central African Republic.",
          "Failure of merchants to provide sufficient information to verify identity, including information on the ultimate beneficial owner(s)",
          "Merchants or the ultimate beneficial owner(s) subject to sanctions by the United Nations, the Treasury Department, the European Union, the Office of Foreign Assets Control (OFAC), or listed on relevant sanctions lists",
          "Merchants or the ultimate beneficial owner(s) residing in sanctioned jurisdictions, including Iran, Syria, Sudan, North Korea, Cuba, Eritrea, and the Central African Republic.",
          "Casinos, betting entities, and online gambling companies",
          "Merchants providing financial services without Central Bank approval, such as unauthorized private investments, exchange companies, money pooling, or Hawala",
          "Charities and non-profit organizations not accredited and regulated by the Ministry of Social Affairs and Labor",
          "Anonymous accounts and accounts under fictitious names.",
          "Numbered accounts where the owner is known by a number instead of a name.",
          "Merchants with incomplete due diligence or ambiguity and uncertainty regarding the information provided.",
          "Companies not licensed by the Ministry of Commerce and Industry.",
          "Anything that violates faith and public morals.",
          "Gambling tools, machines, and devices.",
          "Asbestos.",
          "Children’s products that take the form of cigarettes and are kept in boxes like cigarettes.",
          "Industrial and hazardous waste.",
          "Predators and endangered animals.",
          "Alcohol products.",
          "Medicines of all kinds.",
          "Sex and adult tools.",
          "Sex books.",
          "Firearms.",
          "Radioactive medical and biological materials.",
          "Tobacco products without a license.",
          "Electronic cigarettes without a license.",
          "Fireworks products.",
          "Radioactive materials.",
          "Explosive materials.",
          "Ivory.",
          "High-risk merchants – file sharing.",
          "Network/Multi-level marketing.",
          "Buying and selling securities.",
          "Illegal file sharing and distribution via network or internet.",
          "Mobile dating apps/websites.",
          "Buying and selling gold, jewelry, and gemstones via e-commerce only, not points of sale.",
          "Crowdfunding.",
          "Microsoft Office software and keys.",
          "Telecom merchant access keys.",
          "E-commerce adult content (text, video).",
          "Merchants of non-prescription drugs face-to-face.",
          "Long-distance telecommunications VOIP.",
          "Ammunition sellers.",
          "Telemarketing services.",
          "Escort services.",
          "Prohibited or restricted activities can be updated at any time."
        ]
      },
      {
        id: "clause-9-36",
        number: "9.36",
        text: "The email used by applicants for VoM services is the official means of communication with the user, and the applicant agrees to use email for verification and approval of terms and conditions, in addition to all information related to the user."
      },
      {
        id: "clause-9-37",
        number: "9.37",
        text: "All fields of the registration form must be filled out and all required documents attached before the registration request is approved."
      },
      {
        id: "clause-9-38",
        number: "9.38",
        text: "All information sent by the customer to VoM, in any type of media, whether written or oral, must be true and accurate."
      },
      {
        id: "clause-9-39",
        number: "9.39",
        text: "Upon registration, the customer must provide the information required by VoM to fill out the “Know Your Customer” (KYC) form, which must be approved via email confirmation. The customer is responsible for updating KYC information in the event of any change, or as soon as VoM requests it within a period of 14 days."
      },
      {
        id: "clause-9-40",
        number: "9.40",
        text: "All required information must be provided within 14 days from the date of registration; incomplete registration requests will be automatically canceled after the specified period."
      },
      {
        id: "clause-9-41",
        number: "9.41",
        text: "New customers cannot conduct transactions until their data is verified, approved, and their accounts are properly activated as merchants in the company’s system."
      },
      {
        id: "clause-9-42",
        number: "9.42",
        text: "The company has the right to obtain personal data of persons and companies through official authorities, including all civil ID information, including name, date of birth, ID number, ID expiry date, address registered on the ID, and any other available data."
      },
      {
        id: "clause-9-43",
        number: "9.43",
        text: "Details of fees and commissions due to VoM for services provided to the customer are specified in the terms of the contract concluded with the customer or specified in the price quote provided to the customer."
      },
      {
        id: "clause-9-44",
        number: "9.44",
        text: "VoM is committed to notifying the user within a sufficient time before making any adjustments or changes to fees, commissions, imposing new fees, or any of the terms of services the user receives"
      },
      {
        id: "clause-9-45",
        number: "9.45",
        text: "VoM may withhold payment transactions and request supporting documents and evidence to verify the legality of payment transactions before transferring them to the user’s bank account. In the event that the customer fails to provide sufficient evidence to prove the legality of the transferred amounts, VoM has the right to take all necessary measures in this case, which include returning the amounts to their source, canceling the account, and notifying the concerned authorities without notifying the user or obtaining any kind of approval. Information exchanged with financial institutions or relevant official bodies may include information concerning the user, which may include the user’s financial transactions or any other information as needed."
      },
      {
        id: "clause-9-46",
        number: "9.46",
        text: "Merchants confirm that it is illegal to commit any money laundering, fraud, or any type of illegal activity. In case of suspicion of any fraud or money laundering activities, the company will report the activity and the party committing these activities to the relevant authorities without notifying them"
      },
      {
        id: "clause-9-47",
        number: "9.47",
        text: "The user has no right to object to the withholding of any amounts related to payment transactions or returned to their source in case of failure to provide any evidence or documents proving the legality of the payment transactions."
      },
      {
        id: "clause-9-48",
        number: "9.48",
        text: "Settlement of payment transactions and deposits takes place within 24 working hours or the next working day if the user does not request a different time period for settlements and deposits. VoM may withhold payments for an indefinite period if it concludes or finds that the payment transactions may be suspicious or illegal."
      },
      {
        id: "clause-9-49",
        number: "9.49",
        text: "Settlement of deposits is made to the bank data provided by the user when registering the account with VoM. The user may request to change this registered bank data via their account platform registered in VoM or the official email."
      },
      {
        id: "clause-9-50",
        number: "9.50",
        text: "The user is available to use the “Refund” option to recover the full or partial amount of the payment transaction, and therefore there must be a sufficient balance in their account with VoM to use the “Refund” option."
      },
      {
        id: "clause-9-51",
        number: "9.51",
        text: "VoM may withhold a reserve amount calculated from the transaction volume of high-risk customers. This reserve is settled when closing accounts in case they are not used"
      },
      {
        id: "clause-9-52",
        number: "9.52",
        text: "VoM may return amounts to their sources that have not been transferred to the user’s bank account for more than 30 days due to the user’s inability to provide valid bank data, and therefore their account is considered neglected, which entails suspending the account. VoM may withhold pending amounts or hand them over to other entities at VoM’s sole discretion"
      },
      {
        id: "clause-9-53",
        number: "9.53",
        text: "VoM may deduct the transfer fee “commission” directly from the amounts transferred to the user during the settlement process"
      },
      {
        id: "clause-9-54",
        number: "9.54",
        text: "The user undertakes to pay any outstanding fees within five working days."
      },
      {
        id: "clause-9-55",
        number: "9.55",
        text: "Any fees paid by the customer to VoM are considered non-refundable, whether they are part of fees or commissions."
      },
      {
        id: "clause-9-56",
        number: "9.56",
        text: "Approval to register an account with VoM represents your electronic signature, and corresponding with us through the support option, whether through the VoM application or the VoM platform, is considered an official notice from you and is equivalent to your personal signature"
      },
      {
        id: "clause-9-57",
        number: "9.57",
        text: "Approval that the email used to register an account with VoM is your approved email, and all electronic correspondence received from this email address is equivalent to official letters signed by you or your legal representative."
      },
      {
        id: "clause-9-58",
        number: "9.58",
        text: "Approval to receive all notifications from VoM on your email and your registered phone number for the purpose of communicating with you and also for the purpose of verification “Multi-Factor Authentication system”."
      },
      {
        id: "clause-9-59",
        number: "9.59",
        text: "The terms and conditions are valid as long as the subscription with VoM is valid."
      },
      {
        id: "clause-9-60",
        number: "9.60",
        text: "The user can terminate the contract with VoM at any time during the term of the contract, provided that notice is given 30 days in advance."
      },
      {
        id: "clause-9-61",
        number: "9.61",
        text: "The contract duration with VoM is one year from the date of receiving the verification email and renews automatically unless the contract is terminated by the user or VoM, provided that notice is given 30 days in advance"
      },
      {
        id: "clause-9-62",
        number: "9.62",
        text: "Termination of the contract does not mean waiving the requirements requested from the user regarding previous payment transactions."
      },
      {
        id: "clause-9-63",
        number: "9.63",
        text: "In the event of opening an account with VoM and not providing the information and documents required to complete the registration process within 14 days, the account will be automatically canceled. No amounts that the merchant may have paid during this period will be returned."
      },
      {
        id: "clause-9-64",
        number: "9.64",
        text: "Inactive accounts that have had no transactions for more than six months are considered dormant and are automatically suspended. To reactivate these accounts, the merchant’s information must be updated."
      },
      {
        id: "clause-9-65",
        number: "9.65",
        text: "VoM may stop or cancel the account at any time, and VoM may send a letter to your email registered with it with the reasons. Such reasons are subject to VoM’s discretion and may include, but are not limited to, increased transaction risk, suspicious transactions, prohibited and illegal activities by the user, or a change in the user’s operations, ownership, or management."
      },
      {
        id: "clause-9-66",
        number: "9.66",
        text: "Data is retained for a period of 10 years from the date of service termination."
      },
      {
        id: "clause-9-67",
        number: "9.67",
        text: "Users are responsible for maintaining up-to-date and true information about their profiles, directors, board of directors, key persons, nature of business, volume and value of transactions, and any other information requested by VoM."
      },
      {
        id: "clause-9-68",
        number: "9.68",
        text: "The user bears responsibility for the nature of the buyers or customers they deal with and agrees to deal only with legitimate customers."
      },
      {
        id: "clause-9-69",
        number: "9.69",
        text: "The user is solely responsible for the nature of the payment transactions made on their account, whether erroneous or suspicious, and VoM will not bear any responsibility for any payment transaction that must be returned to its source."
      },
      {
        id: "clause-9-70",
        number: "9.70",
        text: "If the user is suspicious of any transaction, the responsibility for keeping the transaction unexecuted lies with the user until they contact the customer and conduct all necessary investigations to ensure the validity and legality of the transaction."
      },
      {
        id: "clause-9-71",
        number: "9.71",
        text: "VoM is not responsible for the products or services sold using VoM’s payment services."
      },
      {
        id: "clause-9-72",
        number: "9.72",
        text: "VoM may withhold any payment transactions found to be suspicious and requiring supporting documents and information to evaluate the legality and validity of the payment transactions. In the event that it finds the transactions are illegal, it has the right to withhold these transactions and return the amounts to their source, or withhold the transactions for a period of time determined by VoM to ensure there are no requests for refunds for transactions by the bank issuing the card, based on the request of the bank cardholder used in the payment for these transactions “chargeback or fraud”."
      },
      {
        id: "clause-9-73",
        number: "9.73",
        text: "The user bears full responsibility for all invoices generated/paid or pending/payment by their customers through the use of various VoM services."
      },
      {
        id: "clause-9-74",
        number: "9.74",
        text: "The user bears the responsibility to pay the amounts related to transactions disputed by the bank “chargeback or fraud” and deducted from VoM in case of losing the dispute in favor of the bank cardholder, and undertakes to agree to VoM’s right to direct deduction from their available balance."
      },
      {
        id: "clause-9-75",
        number: "9.75",
        text: "The user is responsible for completing transactions with their customers, generating invoices, and obtaining receipt authorizations as they will be required to verify certain transactions according to the requirements of VoM’s risk assessment procedures. They must always ensure they obtain supporting evidence for the payment transactions of their account."
      },
      {
        id: "clause-9-76",
        number: "9.76",
        text: "The user must ensure compliance with anti-money laundering laws and electronic payment and trading laws regulated by the country where the transactions are carried out."
      },
      {
        id: "clause-9-77",
        number: "9.77",
        text: "Approval that VoM may request an accounting audit on some payment transactions, which may require financial or non-financial documents, examination of the user’s work systems, conducting recorded interviews, or any other procedures according to VoM’s decisions."
      },
      {
        id: "clause-9-78",
        number: "9.78",
        text: "Approval that VoM may refer to you or use your logo when presenting its portfolio to the public or private sector."
      },
      {
        id: "clause-9-79",
        number: "9.79",
        text: "The user may refer to VoM as a payment service provider as long as their account is active. Users who have suspended or terminated accounts must refrain from using the VoM trademark in any of their public or private activities."
      },
      {
        id: "clause-9-80",
        number: "9.80",
        text: "The user acknowledges that all products, services, or activities for which money is received through VoM services are valid for use and not contrary to public order or public morals of the country, and that the user is qualified to sell or distribute these products and services and has no rights to a third party. They undertake to deliver the products or services to customers in a timely manner and according to the specifications mentioned in the advertisement for them. The user is solely responsible for any violation in this regard and is also responsible for any legal violations by the customer. The user acknowledges and undertakes their commitment towards VoM or any third party for all transactions their customers perform to pay their financial obligations and undertakes to return all amounts paid through VoM regarding these transactions, with VoM reserving the right to stop the account and stop its services to the user in case of any fraudulent or suspicious transactions."
      },
      {
        id: "clause-9-81",
        number: "9.81",
        text: "The user must notify VoM of any change in operations or management within a week of its date. Such change may include the value and volume of payment transactions, change in activities, change in address or contact information, change in ownership structure, or any other relevant changes. Failure to notify VoM of these changes may lead to account suspension and service interruption."
      },
      {
        id: "clause-9-82",
        number: "9.82",
        text: "Payment services provided by third-party payment service providers, such as Apple Pay and Google Pay, and provided through us are provided by a third party, and VoM is not responsible for the quality of the services provided."
      },
      {
        id: "clause-9-83",
        number: "9.83",
        text: "Apple Pay and Google Pay transactions are considered not protected by 3D Secure by some banks and payment card systems. In the case of chargebacks or fraud claims, the merchant bears full responsibility and undertakes to pay any funds deducted from VoM due to fraud or chargeback incidents related to the merchant’s activities. The merchant authorizes VoM to deduct these chargebacks automatically from their balances before settlement. Proof of service or delivery of products may not be sufficient for some banks or payment card systems, and any chargebacks on VoM will be charged to the merchants."
      },
      {
        id: "clause-9-84",
        number: "9.84",
        text: "VoM has the right to suspend any suspicious transactions and request supporting information and documents to evaluate the legality of the transactions. In case VoM does not find the transaction legitimate, it has the right to cancel the transaction, return the transaction value to its source, or suspend it for a period of time determined by VoM to ensure its existence and to ensure that there are no claims for chargebacks or fraud on the transactions."
      },
      {
        id: "clause-9-85",
        number: "9.85",
        text: "Merchants who apply to use Apple Pay services through VoM agree to confirm their acceptance of Apple’s terms (Apple Pay Merchant Terms), as specified on Apple’s website, and that VoM is not responsible for merchants’ non-compliance with these terms."
      },
      {
        id: "clause-9-86",
        number: "9.86",
        text: "Merchants who apply to use Google Pay services through VoM agree to confirm their acceptance of Google’s terms (Google Pay Terms of Service), as specified on Google’s website, and that VoM is not responsible for merchants’ non-compliance with these terms."
      },
      {
        id: "clause-9-87",
        number: "9.87",
        text: "Merchants confirm their responsibility for following up on future amendments to Apple’s terms (Apple Pay Merchant Terms) and Google’s terms (Google Pay Terms of Service)."
      },
      {
        id: "clause-9-88",
        number: "9.88",
        text: "The international express shipping service provided through our company is provided by a third party, and our company will not be responsible towards the merchant or the consumer regarding delivery time or the condition of the sent parcels."
      },
      {
        id: "clause-9-89",
        number: "9.89",
        text: "Fees associated with international express shipping services are based on an accurate description of the parcel’s dimensions and weight. This includes the product to be shipped and the packaging for shipping. The responsibility for accurately estimating the dimensions and weights of the parcels lies solely with the merchant."
      },
      {
        id: "clause-9-90",
        number: "9.90",
        text: "In the event of a continued discrepancy between the actual weight and dimensions and the weight and dimensions estimated by the merchant, where the actual shipping fees are higher than the fees charged during the payment process based on the information provided by the merchant, our company has the right to terminate the shipping agreement with the merchant without any liability on us."
      },
      {
        id: "clause-9-91",
        number: "9.91",
        text: "VoM will not bear any responsibility for any loss or delay due to fire, natural disasters, failure in the banking system, power outage, problems in telecommunications, wars, strikes, outbreak of riots, terrorist attacks, failure in the performance of affiliated banks, failure in the performance of merchants, or any accidents or events VoM does not have the ability to control."
      },
      {
        id: "clause-9-92",
        number: "9.92",
        text: "Merchants may face the risk of payment-related disputes and chargebacks, where customers request a refund or question a particular transaction."
      },
      {
        id: "clause-9-93",
        number: "9.93",
        text: "Merchants using VoM services may be exposed to risks related to fraudulent activities, and fraudsters may use stolen cards to make purchases or engage in other fraudulent activities, making the merchant responsible for any losses resulting from that."
      },
      {
        id: "clause-9-94",
        number: "9.94",
        text: "Merchants using VoM services must comply with legal and regulatory requirements, and non-compliance can lead to legal consequences, fines, or even termination of the merchant’s account."
      },
      {
        id: "clause-9-95",
        number: "9.95",
        text: "Merchants using VoM services rely on the stability and functionality of the provided payment infrastructure. Technical problems, service interruptions, and network failure can hinder payment processing."
      },
      {
        id: "clause-9-96",
        number: "9.96",
        lead: "Force Majeure:",
        text: "Neither party shall be considered responsible for any delay or failure in performing its obligations under this Agreement if it is caused by events beyond its reasonable control (force majeure), including, but not limited to, natural disasters, wars, strikes, or interruption of internet and telecommunications services."
      },
      {
        id: "clause-9-97",
        number: "9.97",
        lead: "Severability:",
        text: "If any provision of this Agreement is ruled invalid or unenforceable by a competent court, this does not affect the validity and enforceability of the remaining provisions, which shall remain in effect and produce their legal effects."
      },
      {
        id: "clause-9-98",
        number: "9.98",
        lead: "Entire Agreement:",
        text: "This Agreement (including any addendums or policies referred to) constitutes the entire agreement between the parties regarding its subject matter and supersedes all previous agreements, correspondence, and understandings, whether oral or written."
      },
      {
        id: "clause-9-99",
        number: "9.99",
        lead: "Governing Law and Jurisdiction:",
        text: "This Agreement is governed by and construed in accordance with the regulations and laws in force in the Kingdom of Saudi Arabia. In the event of any dispute that cannot be resolved amicably, the exclusive jurisdiction shall be the courts of the Kingdom of Saudi Arabia to consider and adjudicate the dispute."
      }
    ]
  }
];
