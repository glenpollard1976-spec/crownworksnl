// Auto-deploy script for CrownWorksNL
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Auto-Deploying CrownWorksNL...\n');

// Check if vercel is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI found\n');
} catch (error) {
  console.log('❌ Vercel CLI not found. Installing...\n');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed\n');
  } catch (installError) {
    console.error('❌ Failed to install Vercel CLI');
    console.log('\n📋 Manual Deployment Required:');
    console.log('1. Go to: https://vercel.com/new');
    console.log('2. Drag folder: C:\\Users\\glenp\\Downloads\\CrownQuestNL');
    console.log('3. Click Deploy\n');
    process.exit(1);
  }
}

// Try to deploy
console.log('📦 Starting deployment...\n');
console.log('⚠️  If not logged in, you may need to authenticate\n');

try {
  // Try production deploy with auto-confirm
  const output = execSync('vercel --prod --yes --confirm', { 
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  console.log(output);
  console.log('\n✅ Deployment initiated!\n');
} catch (error) {
  if (error.message.includes('login') || error.message.includes('token')) {
    console.log('⚠️  Authentication required\n');
    console.log('🔐 Please run: vercel login');
    console.log('   Then run this script again\n');
    console.log('OR use manual deployment:');
    console.log('1. Go to: https://vercel.com/new');
    console.log('2. Drag: C:\\Users\\glenp\\Downloads\\CrownQuestNL');
    console.log('3. Click Deploy\n');
  } else {
    console.error('❌ Deployment error:', error.message);
    console.log('\n📋 Fallback: Manual deployment');
    console.log('Go to: https://vercel.com/new');
    console.log('Drag folder: C:\\Users\\glenp\\Downloads\\CrownQuestNL\n');
  }
}

