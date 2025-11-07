#!/usr/bin/env node

/**
 * Auto Fix Vercel Domain Linking
 * This script helps fix the Vercel domain configuration
 */

const { execSync } = require('child_process');
const { spawn } = require('child_process');

console.log('========================================');
console.log('  AUTO FIX VERCEL DOMAIN');
console.log('========================================');
console.log('');

// Check if vercel CLI is available
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    console.log('Vercel CLI not found. Please install: npm install -g vercel');
    return false;
  }
}

// List projects
function listProjects() {
  try {
    const output = execSync('vercel ls --json', { encoding: 'utf-8' });
    return JSON.parse(output);
  } catch (e) {
    console.error('Error listing projects:', e.message);
    return null;
  }
}

// Add domain to project
function addDomain(projectName, domain) {
  try {
    const output = execSync(`vercel domains add ${domain} ${projectName}`, { encoding: 'utf-8' });
    console.log(output);
    return true;
  } catch (e) {
    console.error('Error adding domain:', e.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('[1/5] Checking Vercel CLI...');
  if (!checkVercelCLI()) {
    console.log('Opening Vercel dashboard for manual setup...');
    const { exec } = require('child_process');
    if (process.platform === 'win32') {
      exec('start https://vercel.com/dashboard');
    } else if (process.platform === 'darwin') {
      exec('open https://vercel.com/dashboard');
    } else {
      exec('xdg-open https://vercel.com/dashboard');
    }
    return;
  }

  console.log('[2/5] Listing projects...');
  const projects = listProjects();
  
  if (!projects || projects.length === 0) {
    console.log('No projects found. Opening Vercel dashboard...');
    const { exec } = require('child_process');
    if (process.platform === 'win32') {
      exec('start https://vercel.com/dashboard');
    }
    return;
  }

  console.log('\nFound Projects:');
  projects.forEach((project, index) => {
    console.log(`${index + 1}. ${project.name} - ${project.url || 'No URL'}`);
  });

  // Find crownworksnl project
  const crownworksProject = projects.find(p => 
    p.name.toLowerCase().includes('crownworks') || 
    p.name.toLowerCase().includes('crown')
  );

  if (crownworksProject) {
    console.log(`\n[3/5] Found CrownWorksNL project: ${crownworksProject.name}`);
    console.log(`Project URL: ${crownworksProject.url || 'N/A'}`);
    
    console.log('\n[4/5] Attempting to add crownworksnl.com...');
    const success = addDomain(crownworksProject.name, 'crownworksnl.com');
    
    if (success) {
      console.log('\n========================================');
      console.log('  DOMAIN ADDED SUCCESSFULLY!');
      console.log('========================================');
    } else {
      console.log('\nDomain may need manual configuration.');
      console.log('Opening Vercel dashboard...');
      const { exec } = require('child_process');
      if (process.platform === 'win32') {
        exec(`start https://vercel.com/dashboard/${crownworksProject.name}/settings/domains`);
      }
    }
  } else {
    console.log('\nCrownWorksNL project not found automatically.');
    console.log('Opening Vercel dashboard for manual selection...');
    const { exec } = require('child_process');
    if (process.platform === 'win32') {
      exec('start https://vercel.com/dashboard');
    }
  }

  console.log('\n========================================');
  console.log('  NEXT STEPS:');
  console.log('========================================');
  console.log('1. Delete the WRONG project');
  console.log('2. Verify crownworksnl.com is added to CORRECT project');
  console.log('3. Configure DNS if needed');
  console.log('4. Redeploy');
  console.log('');
}

main().catch(console.error);

