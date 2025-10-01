import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores([
    '.next/*',
    'out/*',
    'coverage/*',
    '**/*.d.ts',
    '**/*.config.*',
    '.storybook/*',
    'jest-setup.js'
  ]),
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/style',
      'plugin:jest/recommended',
      'plugin:react/recommended',
      'plugin:@next/next/recommended',
      'plugin:storybook/recommended',
      'prettier'
    ),

    plugins: {
      react,
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',

        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      // トリプルイコールの強制
      eqeqeq: ['error', 'always'],
      // シングルクォートの強制
      // シングルクォートが入った文字列はダブルクォートで解決される："'aaaa'"など
      quotes: ['error', 'single'],
      // 関数宣言の代わりに関数式の使用を強制
      // アロー関数を許容
      // アロー関数の強制はできないのでお気持ち程度
      'func-style': [
        'error',
        'expression',
        {
          allowArrowFunctions: true
        }
      ],
      // Arrayメソッドのコールバックにreturnを強制
      // mapなどをforEachのように使うことを防ぐことや、return漏れを防ぐのが目的
      // forEachでのreturnを禁止
      // returnの有無で使い分けするのが目的
      'array-callback-return': [
        'error',
        {
          checkForEach: true
        }
      ],
      // 名前空間の使用を許可。一定規模のプロジェクトではあったほうが整理が良い
      '@typescript-eslint/no-namespace': 'off',
      // 関数の戻り型を定義しないことを許可
      // 毎回書くと冗長で、UnionTypeをstringで定義したりするとバグのもとになったり
      // メンテが手間なので推論で済む場合は省略したい
      '@typescript-eslint/explicit-function-return-type': 'off',
      // exportされた関数の戻り型を定義しないことを許可
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // anyの使用を許容しない
      // 不明な型を扱う場合、型安全のためにunknownを利用する
      '@typescript-eslint/no-explicit-any': 1,
      // Boolean型以外をBoolean的に扱うことの禁止
      // !''や!0のようなケースを阻止する
      // 以下を防ぐのが目的。基本はeqeqeqと同じ信念
      // - optionalをBoolean的に扱った時に非optional化した時の誤作動
      // - 期待値の考慮漏れによる誤作動
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowAny: false,
          allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
        }
      ],
      // 次の型変数を初期化する時に型を書くことを許容しない
      // number, string, boolean
      // コードの冗長化防止
      // 但し関数の仮引数は許可する（型があったりなかったりすると読みづらいと感じるため）
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true
        }
      ],
      // 未使用の変数を許容しない
      '@typescript-eslint/no-unused-vars': 'error',
      // key propsがない時に警告
      // 以下の条件も警告する
      // - フラグメントショートハンドにkey propsが必要な場合
      // - スプレッド前にkey propsがある場合
      'react/jsx-key': [
        'warn',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true
        }
      ],
      // フラグメントのショートハンドを強制する（key propsがあるときは除外される）
      'react/jsx-fragments': ['warn', 'syntax'],
      // import React from 'react'を書かなくても良くする
      'react/react-in-jsx-scope': 'off',
      // 閉じタグのスペースルールを以下の形式にする
      // <hoge></hoge>
      // <hoge />
      // <hoge
      //   piyo='fuga'
      // />
      'react/jsx-tag-spacing': [
        'warn',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],
      // 子要素を持たない終了タグを禁止
      // <div></div> -> <div />
      'react/self-closing-comp': [
        'warn',
        {
          component: true,
          html: true
        }
      ],
      // テストを書きやすくするために許容（screenではより複雑になるため）
      'testing-library/no-container': 'off',
      // テストを書きやすくするために許容（screenではより複雑になるため）
      'testing-library/no-node-access': 'off'
    }
  }
]);
