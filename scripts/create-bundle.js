#!/usr/bin/env node

import { build } from 'esbuild';
import { readFileSync, writeFileSync, chmodSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Плагин для обработки импортов с ?raw
const rawPlugin = {
  name: 'raw',
  setup(build) {
    // Обрабатываем импорты с суффиксом ?raw
    build.onResolve({ filter: /\?raw$/ }, args => {
      // Разрешаем путь относительно исходного файла
      const pathWithoutSuffix = args.path.replace(/\?raw$/, '');
      // args.importer содержит путь к файлу, который делает импорт
      // Если importer есть, разрешаем относительно него, иначе относительно корня
      const baseDir = args.importer ? dirname(args.importer) : rootDir;
      const resolvedPath = resolve(baseDir, pathWithoutSuffix);
      return {
        path: resolvedPath,
        namespace: 'raw',
      };
    });

    // Загружаем содержимое файла как текст
    build.onLoad({ filter: /.*/, namespace: 'raw' }, async (args) => {
      const contents = readFileSync(args.path, 'utf-8');
      return {
        contents: `export default ${JSON.stringify(contents)};`,
        loader: 'js',
      };
    });
  },
};

async function createBundle() {
  console.log('Создание standalone bundle...');
  
  try {
    await build({
      entryPoints: [join(rootDir, 'src/index.ts')],
      bundle: true,
      platform: 'node',
      target: 'node18',
      format: 'esm',
      outfile: join(rootDir, 'dist/bundle.js'),
      external: [],
      plugins: [rawPlugin],
      // Не используем banner - esbuild автоматически сохранит shebang из исходника
      minify: false,
      sourcemap: false,
      logLevel: 'info',
    });

    // Проверяем и исправляем дубликат shebang если он есть
    let bundleContent = readFileSync(join(rootDir, 'dist/bundle.js'), 'utf-8');
    // Удаляем дубликаты shebang в начале файла, оставляя только один
    const shebangRegex = /^(#!\/usr\/bin\/env node\n)+/;
    if (shebangRegex.test(bundleContent)) {
      bundleContent = bundleContent.replace(shebangRegex, '#!/usr/bin/env node\n');
      writeFileSync(join(rootDir, 'dist/bundle.js'), bundleContent);
      console.log('⚠️  Исправлен дубликат shebang');
    }

    // Делаем файл исполняемым
    chmodSync(join(rootDir, 'dist/bundle.js'), 0o755);
    
    console.log('✅ Bundle создан: dist/bundle.js');
    console.log('\nТеперь вы можете:');
    console.log('1. Закоммитить dist/bundle.js в репозиторий');
    console.log('2. Создать GitHub Release с этим файлом');
    console.log('3. Пользователи могут использовать прямую ссылку на raw файл');
  } catch (error) {
    console.error('❌ Ошибка при создании bundle:', error);
    process.exit(1);
  }
}

createBundle();

