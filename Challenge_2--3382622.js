class SearchSuggestionSystem {
  constructor(products) {
    this.products = products.sort();
    this.trie = this.buildTrie(products);
  }

  buildTrie(products) {
    const trie = {};
    for (const product of products) {
      let node = trie;
      for (const char of product) {
        if (!node[char]) {
          node[char] = {};
        }
        node = node[char];

        if (!node.suggestions) {
          node.suggestions = [];
        }
        if (node.suggestions.length < 3) {
          node.suggestions.push(product);
        }
      }
    }
    return trie;
  }

  getSuggestions(searchWord) {
    const result = [];
    let node = this.trie;
    for (const char of searchWord) {
      if (node && node[char]) {
        node = node[char];
        result.push(node.suggestions || []);
      } else {
        node = null;
        result.push([]);
      }
    }
    return result;
  }
}

const products = ['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad'];
const searchWord = 'mouse';
const suggestionSystem = new SearchSuggestionSystem(products);
console.log(suggestionSystem.getSuggestions(searchWord));
console.log(suggestionSystem.getSuggestions(searchWord));
