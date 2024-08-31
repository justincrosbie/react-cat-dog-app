/**
 * Represents a single fact about a cat or a dog.
 *
 * @interface Fact
 */
export interface Fact {
    /**
     * Unique identifier for the fact.
     * @type {string}
     */
    _id: string;
  
    /**
     * Version number of the fact (used by some databases for optimistic concurrency control).
     * @type {number}
     */
    __v: number;
  
    /**
     * The actual text content of the fact.
     * @type {string}
     */
    text: string;
  
    /**
     * The date and time when the fact was last updated.
     * @type {string}
     */
    updatedAt: string;
  
    /**
     * Indicates whether the fact has been marked as deleted.
     * @type {boolean}
     */
    deleted: boolean;
  
    /**
     * The source of the fact, typically 'cat' or 'dog'.
     * @type {string}
     */
    source: string;
  
    /**
     * The number of times this fact has been sent or displayed.
     * @type {number}
     */
    sentCount: number;
  }
  
  /**
   * Represents the type of facts that can be selected.
   * - 'cat': Only cat facts
   * - 'dog': Only dog facts
   * - 'both': Both cat and dog facts
   *
   * @typedef {('cat' | 'dog' | 'both')} FactType
   */
  export type FactType = 'cat' | 'dog' | 'both';
  