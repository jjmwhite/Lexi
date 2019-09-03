# Lexi: Visual Thesaurus
We've all been there: you're writing something—an important email, note, or presentation—and you realize you've used the same word five times in two paragraphs. Cue the "words like ..." search. With crowded, ad-heavy interfaces and a user experience that remains largely unchanged since the early 2000s, online thesauruses leave much to be desired. 
    
**Lexi** offers users a seamless, intuitive user experience, tracing a clear visual and verbal path from one synonym to the next until you find that perfect word.

![Lexi screenshot](src/assets/images/screenshot_with_hover.png)

## Architecture and Technologies
* **D3** forms the backbone of Lexi's visual depiction
* **Vanilla Javascript** is used for all data manipulation
* **Axios** handles asynchronous requests
* **Express** configures backend endpoints and route remote API requests
* **Merriam-Webster API** supplies the lexical data
* **Webpack** for bundling scripts into a single source

## Functionality and Features
* Users enter a root word for which they'd like a synonym, and Lexi displays a path via each lexical type (noun, verb, adjective, etc.) and a list of synonyms they can choose from to begin exploring.
* Hovering over a lexical type shows the specific definition of the root word for that type.
* Synonyms will always populate only within the scope of the seleted word type (i.e. selecting a noun will only populate other nouns).
* Once user a clicks on a synonym, that word's definition becomes visible on on hover, and its synonyms are populated as an expansion of the tree. 

## Background and Development


**Initial Timeline**
* **Day 1:** Seting up overall file structure, requested API key, implemented logic via vanilla JS DOM manipulation
* **Day 2:** Researching D3 and started bilding out data visualization using a static dataset
* **Day 3:** Integrating API calls into D3 interactive display, storing and passing data via sessionStorage

**Subsequent Features:**
* Alert modal added for screens less that 800px wide
* Initial page load shows use guide

**Planned Expansions:**
  * Integrate animation so that if a user clicks an already expanded node, the node will collapse, hiding any of its children
  * Add highlighting so that the more times a word appears in the results tree, the darker/brighter its color