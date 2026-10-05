// Jekyll/kramdown-markeringar ("inline attribute lists") som Astro inte känner till.
//
//   {: .important }        på raden före ett stycke → hela stycket blir en callout-ruta
//   [Text](url){: .btn }   direkt efter en länk     → länken får knappstil
//
// Utan det här renderas markeringen som synlig text. Klasser vi inte har någon stil för
// tas bort tyst — hellre ingen stil än "{: .text-delta }" mitt i texten.
import { visit, SKIP } from 'unist-util-visit';

const CALLOUTS = new Set(['important', 'note', 'warning', 'new', 'highlight']);
const LINK_CLASSES = { btn: 'btn-primary' };

const BLOCK_IAL = /^\{:\s*((?:\.[\w-]+\s*)+)\}[ \t]*\n?/;
const INLINE_IAL = /^\{:\s*((?:\.[\w-]+\s*)+)\}/;

const classesOf = (raw) => [...raw.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);

export default function remarkKramdownIal() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index == null) return;

      // Markering efter en länk: [Text](url){: .btn }
      node.children.forEach((child, i) => {
        const prev = node.children[i - 1];
        if (child.type !== 'text' || prev?.type !== 'link') return;
        const m = child.value.match(INLINE_IAL);
        if (!m) return;
        const classes = classesOf(m[1]).map((c) => LINK_CLASSES[c]).filter(Boolean);
        if (classes.length) {
          prev.data = { ...prev.data, hProperties: { ...prev.data?.hProperties, className: classes } };
        }
        child.value = child.value.slice(m[0].length);
      });

      // Markering före stycket: första textraden är själva markeringen
      const first = node.children[0];
      if (first?.type !== 'text') return;
      const m = first.value.match(BLOCK_IAL);
      if (!m) return;
      first.value = first.value.slice(m[0].length);
      if (!first.value) node.children.shift();

      const callout = classesOf(m[1]).find((c) => CALLOUTS.has(c));
      if (!callout || node.children.length === 0) return;
      parent.children[index] = {
        type: 'blockquote',
        data: { hName: 'div', hProperties: { className: [`callout-${callout}`] } },
        children: [node],
      };
      return [SKIP, index + 1];
    });
  };
}
