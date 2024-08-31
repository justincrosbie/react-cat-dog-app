/**
 * Represents a single fact about a cat or a dog.
 *
 * @interface Fact
 */

/*
{
"status": {
"verified": null,
"sentCount": 0
},
"_id": "651ea2bd05d7704d4031eeb3",
"user": "6516995a6e83e41526be69a0",
"text": "Cats are cutie.",
"type": "cat",
"deleted": false,
"createdAt": "2023-10-05T11:49:17.005Z",
"updatedAt": "2023-10-05T11:49:17.005Z",
"__v": 0
}*/
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
     * The userid of the user who created the fact.
     * @type {string}
     */
    user: string;
  
    /**
     * The actual text content of the fact.
     * @type {string}
     */
    text: string;
  
    /**
     * The date and time when the fact was created.
     * @type {string}
     */
    createdAt: string;
  
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
    type: string;
  
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
  