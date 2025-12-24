#!/usr/bin/env node

import { build } from 'esbuild';
import { readFileSync, writeFileSync, chmodSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

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

