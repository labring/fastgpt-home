#!/usr/bin/env node

const { verifyTechnicalContent } = require('./import-technical-content');

try {
  verifyTechnicalContent();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
