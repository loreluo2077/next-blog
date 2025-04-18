import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // 测试环境
    environment: 'node',
    // 包含的文件
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 排除的文件
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
}); 