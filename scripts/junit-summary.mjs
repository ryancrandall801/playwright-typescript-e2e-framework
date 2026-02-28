import fs from 'node:fs';
import { XMLParser } from 'fast-xml-parser';

const filePath = process.argv[2] || 'test-results/junit.xml';
const label = process.argv[3] || '';

if (!fs.existsSync(filePath)) {
  console.log(`JUnit file not found at ${filePath}`);
  process.exit(0);
}

const xml = fs.readFileSync(filePath, 'utf8');
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
const data = parser.parse(xml);

function toArray(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

const suites = toArray(data.testsuites?.testsuite ?? data.testsuite);

let tests = 0;
let failures = 0;
let errors = 0;
let skipped = 0;
let time = 0;

for (const s of suites) {
  tests += Number(s.tests ?? 0);
  failures += Number(s.failures ?? 0);
  errors += Number(s.errors ?? 0);
  skipped += Number(s.skipped ?? 0);
  time += Number(s.time ?? 0);
}

const passed = tests - failures - errors - skipped;
const status = failures + errors > 0 ? '❌ Failed' : '✅ Passed';

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (!summaryPath) process.exit(0);

const title = label ? `### ${label} — Test Summary` : '### Test Summary';

const md = `
${title}

| Result | Tests | Passed | Failed | Errors | Skipped | Time (s) |
|---|---:|---:|---:|---:|---:|---:|
| ${status} | ${tests} | ${passed} | ${failures} | ${errors} | ${skipped} | ${time.toFixed(2)} |

`;

fs.appendFileSync(summaryPath, md);