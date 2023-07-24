/* eslint-disable */
import {Node, mergeAttributes} from '@tiptap/core';

import {inputRules} from 'prosemirror-inputrules';

import {
    makeInlineMathInputRule,
    REGEX_INLINE_MATH_DOLLARS,
    mathPlugin,
} from '@benrbray/prosemirror-math';

export const Katex = Node.create({
    name: 'math_inline',
    group: 'inline math',
    content: 'text*',
    inline: true,
    atom: true,
    code: true,

    parseHTML() {
        return [{tag: 'math-inline'}];
    },

    renderHTML({HTMLAttributes}) {
        return ['math-inline', mergeAttributes(HTMLAttributes), 0];
    },

    addProseMirrorPlugins() {
        const inputRulePlugin = inputRules({
            rules: [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)],
        });
        return [mathPlugin, inputRulePlugin];
    },
});