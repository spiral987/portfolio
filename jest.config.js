// jest.config.js
module.exports = {
  // テスト対象のファイルパターンを指定
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.js'],
  // テスト実行前にJestがTypeScriptファイルを変換するために使用するプリセット
  preset: 'ts-jest',
  // テスト環境
  testEnvironment: 'node',
  // モジュール解決のエイリアス (src/ を @/ として扱うなど、tsconfig.jsonに合わせる)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
