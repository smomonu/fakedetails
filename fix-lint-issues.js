#!/usr/bin/env node

/**
 * Node.js script to automatically fix ESLint unused variable issues
 * by prefixing unused variables with underscore (_)
 */

import fs from 'fs';
import path from 'path';

const UNUSED_VARS_TO_FIX = [
  'createClient',
  'Database', 
  'setUserProfile',
  'showSettings',
  'setShowSettings',
  'chatTheme',
  'setChatTheme',
  'setShowTimestamps',
  'setShowReadReceipts',
  'clearChat',
  'randomizeContact',
  'exportChat',
  'copyToClipboard'
];

function fixUnusedVariables(filePath) {
  console.log(`🔧 Fixing unused variables in: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let fixedCount = 0;

  UNUSED_VARS_TO_FIX.forEach(varName => {
    // Fix variable declarations (const, let, var)
    const declRegex = new RegExp(`\\b(const|let|var)\\s+(${varName})\\b`, 'g');
    if (content.match(declRegex)) {
      content = content.replace(declRegex, `$1 _${varName}`);
      fixedCount++;
      console.log(`  ✅ Fixed declaration: ${varName} -> _${varName}`);
    }

    // Fix destructuring assignments
    const destructRegex = new RegExp(`\\{([^}]*\\s+)(${varName})(\\s*[,}])`, 'g');
    if (content.match(destructRegex)) {
      content = content.replace(destructRegex, `{$1_${varName}$3`);
      fixedCount++;
      console.log(`  ✅ Fixed destructuring: ${varName} -> _${varName}`);
    }

    // Fix function parameters
    const paramRegex = new RegExp(`\\(([^)]*\\s+)(${varName})(\\s*[,)])`, 'g');
    if (content.match(paramRegex)) {
      content = content.replace(paramRegex, `($1_${varName}$3`);
      fixedCount++;
      console.log(`  ✅ Fixed parameter: ${varName} -> _${varName}`);
    }
  });

  if (fixedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✨ Fixed ${fixedCount} unused variables in ${path.basename(filePath)}`);
  } else {
    console.log(`ℹ️  No unused variables found to fix in ${path.basename(filePath)}`);
  }

  return fixedCount;
}

function removeUnusedImports(filePath) {
  console.log(`🗑️  Removing unused imports in: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let fixedCount = 0;

  // Remove unused createClient import
  const createClientImport = /import\s*\{\s*createClient\s*\}\s*from\s*['"][^'"]*['"];?\s*\n?/g;
  if (content.match(createClientImport)) {
    content = content.replace(createClientImport, '');
    fixedCount++;
    console.log(`  ✅ Removed unused import: createClient`);
  }

  // Remove unused Database type import
  const databaseImport = /,?\s*Database\s*,?/g;
  if (content.match(databaseImport)) {
    content = content.replace(databaseImport, '');
    fixedCount++;
    console.log(`  ✅ Removed unused type import: Database`);
  }

  if (fixedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✨ Removed ${fixedCount} unused imports in ${path.basename(filePath)}`);
  }

  return fixedCount;
}

function main() {
  console.log('🚀 Starting ESLint unused variable fix script...\n');

  const whatsAppGeneratorPath = './src/components/WhatsAppGenerator.tsx';
  
  if (!fs.existsSync(whatsAppGeneratorPath)) {
    console.error(`❌ File not found: ${whatsAppGeneratorPath}`);
    process.exit(1);
  }

  try {
    const variablesFixes = fixUnusedVariables(whatsAppGeneratorPath);
    const importsFixes = removeUnusedImports(whatsAppGeneratorPath);
    
    const totalFixes = variablesFixes + importsFixes;
    
    console.log(`\n🎉 Script completed successfully!`);
    console.log(`📊 Total fixes applied: ${totalFixes}`);
    
    if (totalFixes > 0) {
      console.log(`\n💡 Next steps:`);
      console.log(`   1. Run 'npm run lint' to verify fixes`);
      console.log(`   2. Test the application to ensure functionality`);
      console.log(`   3. Commit your changes`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing files: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
main();