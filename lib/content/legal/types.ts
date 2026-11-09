/** One numbered clause. `lead` is the bold label some clauses open with. */
export interface LegalClause {
  /** Anchor, e.g. "clause-2-8"; stable so support can link to it. */
  id: string;
  /** Display number, e.g. "2.8". */
  number: string;
  lead?: string;
  /** May contain `{email}`, rendered as the notices address. */
  text: string;
  /** Sub-items the clause introduces, such as a list of prohibited activities. */
  items?: string[];
}

/**
 * A block of the document. The opening blocks (introduction, about) carry no
 * number; numbered sections hold either clauses or plain paragraphs.
 */
export interface LegalSection {
  id: string;
  number?: number;
  heading: string;
  paragraphs?: string[];
  clauses?: LegalClause[];
}
