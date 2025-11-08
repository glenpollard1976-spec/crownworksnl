/**
 * COMPREHENSIVE PROJECT AUDIT
 * Checks every file, button, link, API endpoint, and configuration
 */

const fs = require('fs');
const path = require('path');

const issues = [];
const warnings = [];
const passed = [];

function logIssue(file, line, issue) {
  issues.push({ file, line, issue });
  console.log(`❌ ${file}:${line} - ${issue}`);
}

function logWarning(file, line, warning) {
  warnings.push({ file, line, warning });
  console.log(`⚠️  ${file}:${line} - ${warning}`);
}

function logPass(file, check) {
  passed.push({ file, check });
  console.log(`✅ ${file} - ${check}`);
}

// Check 1: All API Routes
function checkAPIRoutes() {
  console.log('\n📡 Checking API Routes...\n');
  
  const apiRoutes = [
    'app/api/checkout/route.js',
    'app/api/contact/route.js',
    'app/api/ai-agent/route.js',
    'app/api/business-audit-agent/route.js',
    'app/api/presales/route.js',
    'app/api/webhook/route.js'
  ];
  
  apiRoutes.forEach(route => {
    const filePath = path.join(__dirname, '..', route);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Check for proper exports
      if (!content.includes('export async function')) {
        logIssue(route, 0, 'Missing export function');
      } else {
        logPass(route, 'Has export function');
      }
      
      // Check for error handling
      if (!content.includes('try') || !content.includes('catch')) {
        logWarning(route, 0, 'Missing try/catch error handling');
      }
      
      // Check for rate limiting
      if (route.includes('checkout') || route.includes('contact')) {
        if (!content.includes('checkRateLimit') && !content.includes('rateLimit')) {
          logWarning(route, 0, 'Missing rate limiting');
        }
      }
    } else {
      logIssue(route, 0, 'File does not exist');
    }
  });
}

// Check 2: All Page Components
function checkPageComponents() {
  console.log('\n📄 Checking Page Components...\n');
  
  const pages = [
    'app/page.js',
    'app/presales/page.js',
    'app/business-audit/page.js',
    'app/business-audit-agent/page.js',
    'app/university/page.js',
    'app/university/[courseId]/page.js',
    'app/success/page.js',
    'app/email-list/page.js'
  ];
  
  pages.forEach(page => {
    const filePath = path.join(__dirname, '..', page);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      
      // Check for broken button patterns
      lines.forEach((line, index) => {
        // Check for Button wrapped in <a>
        if (line.includes('<Button') && lines[index + 1]?.includes('<a') || 
            line.includes('<a') && lines[index + 1]?.includes('<Button')) {
          logIssue(page, index + 1, 'Button wrapped in anchor tag (invalid HTML)');
        }
        
        // Check for buttons without onClick
        if (line.includes('<button') && !line.includes('onClick') && 
            !line.includes('type="submit"') && !line.includes('type="button"')) {
          logWarning(page, index + 1, 'Button missing onClick handler');
        }
        
        // Check for links without href
        if (line.includes('<a ') && !line.includes('href=') && !line.includes('href =')) {
          logIssue(page, index + 1, 'Anchor tag missing href attribute');
        }
      });
      
      logPass(page, 'File exists and readable');
    } else {
      logIssue(page, 0, 'File does not exist');
    }
  });
}

// Check 3: UI Components
function checkUIComponents() {
  console.log('\n🎨 Checking UI Components...\n');
  
  const components = [
    'components/ui/button.jsx',
    'components/ui/card.jsx',
    'components/AIAgentWidget.jsx'
  ];
  
  components.forEach(comp => {
    const filePath = path.join(__dirname, '..', comp);
    if (fs.existsSync(filePath)) {
      logPass(comp, 'Component exists');
    } else {
      logIssue(comp, 0, 'Component missing');
    }
  });
}

// Check 4: Configuration Files
function checkConfigFiles() {
  console.log('\n⚙️  Checking Configuration Files...\n');
  
  const configs = [
    'package.json',
    'next.config.mjs',
    'vercel.json',
    'app/sitemap.js',
    'app/robots.js',
    'tailwind.config.js'
  ];
  
  configs.forEach(config => {
    const filePath = path.join(__dirname, '..', config);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Check for correct URLs
      if (content.includes('crownworksnl.com') && !content.includes('www.crownworksnl.com')) {
        logWarning(config, 0, 'Contains non-www URL');
      }
      
      logPass(config, 'Configuration file exists');
    } else {
      logIssue(config, 0, 'Configuration file missing');
    }
  });
}

// Check 5: Security
function checkSecurity() {
  console.log('\n🔒 Checking Security...\n');
  
  const securityFile = path.join(__dirname, '..', 'lib/security.js');
  if (fs.existsSync(securityFile)) {
    const content = fs.readFileSync(securityFile, 'utf-8');
    
    if (!content.includes('validateContactForm')) {
      logIssue('lib/security.js', 0, 'Missing validateContactForm');
    } else {
      logPass('lib/security.js', 'Has validateContactForm');
    }
    
    if (!content.includes('checkRateLimit')) {
      logWarning('lib/security.js', 0, 'Missing checkRateLimit');
    } else {
      logPass('lib/security.js', 'Has checkRateLimit');
    }
  } else {
    logIssue('lib/security.js', 0, 'Security file missing');
  }
}

// Check 6: Main Page Buttons
function checkMainPageButtons() {
  console.log('\n🔘 Checking Main Page Buttons...\n');
  
  const pageFile = path.join(__dirname, '..', 'app/page.js');
  if (!fs.existsSync(pageFile)) {
    logIssue('app/page.js', 0, 'Main page file missing');
    return;
  }
  
  const content = fs.readFileSync(pageFile, 'utf-8');
  const lines = content.split('\n');
  
  // Count buttons
  let buttonCount = 0;
  let linkCount = 0;
  let brokenPatterns = 0;
  
  lines.forEach((line, index) => {
    if (line.includes('<button') || line.includes('<Button')) {
      buttonCount++;
      
      // Check if button has proper handler
      if (!line.includes('onClick') && !line.includes('type="submit"')) {
        // Check next few lines
        const nextLines = lines.slice(index, index + 5).join('\n');
        if (!nextLines.includes('onClick')) {
          logWarning('app/page.js', index + 1, `Button without onClick handler`);
        }
      }
    }
    
    if (line.includes('<a ') || line.includes('<a href')) {
      linkCount++;
      
      // Check for href
      if (!line.includes('href=') && !line.includes('href =')) {
        const nextLines = lines.slice(index, index + 3).join('\n');
        if (!nextLines.includes('href')) {
          logIssue('app/page.js', index + 1, 'Anchor tag without href');
        }
      }
    }
    
    // Check for broken patterns
    if (line.includes('<Button') && lines[index + 1]?.includes('<a')) {
      brokenPatterns++;
      logIssue('app/page.js', index + 1, 'Button wrapped in anchor (invalid)');
    }
  });
  
  console.log(`   Found ${buttonCount} buttons`);
  console.log(`   Found ${linkCount} links`);
  if (brokenPatterns === 0) {
    logPass('app/page.js', 'No broken button/link patterns');
  }
}

// Main audit
function runFullAudit() {
  console.log('========================================');
  console.log('  COMPREHENSIVE PROJECT AUDIT');
  console.log('========================================\n');
  
  checkAPIRoutes();
  checkPageComponents();
  checkUIComponents();
  checkConfigFiles();
  checkSecurity();
  checkMainPageButtons();
  
  // Summary
  console.log('\n========================================');
  console.log('  AUDIT SUMMARY');
  console.log('========================================\n');
  console.log(`✅ Passed: ${passed.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`❌ Issues: ${issues.length}\n`);
  
  if (issues.length > 0) {
    console.log('❌ CRITICAL ISSUES:');
    issues.forEach(issue => {
      console.log(`   ${issue.file}:${issue.line} - ${issue.issue}`);
    });
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    warnings.forEach(warning => {
      console.log(`   ${warning.file}:${warning.line} - ${warning.warning}`);
    });
    console.log('');
  }
  
  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ PROJECT IS CLEAN - NO ISSUES FOUND!\n');
  }
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    passed: passed.length,
    warnings: warnings.length,
    issues: issues.length,
    details: {
      issues,
      warnings,
      passed
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'AUDIT_REPORT.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('📄 Full report saved to: AUDIT_REPORT.json\n');
  
  process.exit(issues.length > 0 ? 1 : 0);
}

runFullAudit();

