#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File path
const filePath = path.join(__dirname, 'src/components/WhatsAppGenerator.tsx');

console.log('🚀 Starting mobile view removal process...');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Error reading file:', err);
    process.exit(1);
  }

  console.log('📖 File loaded successfully');
  
  // Split into lines for easier processing
  const lines = data.split('\n');
  console.log(`📊 Total lines: ${lines.length}`);

  // Find the mobile view section
  let mobileViewStart = -1;
  let mobileViewEnd = -1;
  let braceCount = 0;
  let inMobileView = false;

  // Look for the mobile view conditional
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Look for mobile view start
    if (line.includes('viewMode === \'mobile\'') && !inMobileView) {
      mobileViewStart = i;
      inMobileView = true;
      console.log(`🔍 Found mobile view start at line ${i + 1}`);
      continue;
    }

    if (inMobileView) {
      // Count braces to find the end of mobile view
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      
      // Look for the desktop view start (which marks mobile view end)
      if (line.includes('Desktop View') || line.includes('viewMode === \'desktop\'')) {
        mobileViewEnd = i;
        console.log(`🔍 Found mobile view end at line ${i + 1}`);
        break;
      }
    }
  }

  if (mobileViewStart === -1) {
    console.error('❌ Could not find mobile view section');
    process.exit(1);
  }

  if (mobileViewEnd === -1) {
    console.error('❌ Could not find mobile view end');
    process.exit(1);
  }

  console.log(`📏 Mobile view spans lines ${mobileViewStart + 1} to ${mobileViewEnd}`);

  // Create the replacement - remove mobile view and keep only desktop view
  const newLines = [];
  
  // Add everything before mobile view
  for (let i = 0; i < mobileViewStart; i++) {
    newLines.push(lines[i]);
  }

  // Add desktop view only (remove the mobile view conditional structure)
  let foundDesktopView = false;
  let inDesktopView = false;
  let desktopBraceCount = 0;

  for (let i = mobileViewEnd; i < lines.length; i++) {
    const line = lines[i];
    
    if (!foundDesktopView && (line.includes('Desktop View') || line.includes('viewMode === \'desktop\''))) {
      foundDesktopView = true;
      inDesktopView = true;
      // Skip the conditional wrapper, just add the desktop content
      continue;
    }

    if (inDesktopView) {
      // Skip the opening brace of desktop view conditional
      if (line.trim() === '{' && desktopBraceCount === 0) {
        desktopBraceCount++;
        continue;
      }
      
      desktopBraceCount += (line.match(/\{/g) || []).length;
      desktopBraceCount -= (line.match(/\}/g) || []).length;
      
      // Add desktop content until we reach the end
      if (desktopBraceCount >= 0) {
        newLines.push(line);
      }
      
      if (desktopBraceCount <= 0 && i > mobileViewEnd + 5) {
        break;
      }
    }
  }

  // Add remaining lines after desktop view
  let foundEnd = false;
  for (let i = mobileViewEnd; i < lines.length; i++) {
    const line = lines[i];
    if (!foundEnd && line.trim() === ')' && line.includes(')')) {
      foundEnd = true;
      continue;
    }
    if (foundEnd) {
      newLines.push(line);
    }
  }

  // Join the new content
  const newContent = newLines.join('\n');

  // Write back to file
  fs.writeFile(filePath, newContent, 'utf8', (err) => {
    if (err) {
      console.error('❌ Error writing file:', err);
      process.exit(1);
    }
    
    console.log('✅ Mobile view removed successfully!');
    console.log('📈 File updated');
    
    // Show some stats
    const removedLines = mobileViewEnd - mobileViewStart;
    console.log(`🗑️  Removed approximately ${removedLines} lines of mobile view code`);
    console.log('🎉 Process completed!');
  });
});