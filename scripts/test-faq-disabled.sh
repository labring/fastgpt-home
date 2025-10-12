#!/bin/bash

# Test script to verify FAQ routes don't trigger SEO when NEXT_PUBLIC_FAQ is not set
# Usage: ./scripts/test-faq-disabled.sh

set -e

echo "🧪 Testing FAQ Disabled Functionality"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
PASS=0
FAIL=0

# Function to test
test_case() {
  local name="$1"
  local command="$2"
  local expected="$3"

  echo -n "Testing: $name... "

  if eval "$command" | grep -q "$expected"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASS++))
  else
    echo -e "${RED}✗ FAIL${NC}"
    echo "  Expected: $expected"
    ((FAIL++))
  fi
}

# Step 1: Verify environment
echo "📋 Step 1: Verifying Environment"
echo "--------------------------------"

if grep -q "NEXT_PUBLIC_FAQ=true" .env.local 2>/dev/null; then
  echo -e "${YELLOW}⚠ WARNING: NEXT_PUBLIC_FAQ is set to 'true' in .env.local${NC}"
  echo "For this test, it should be empty or not set."
  echo ""
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo -e "${GREEN}✓ Environment check complete${NC}"
echo ""

# Step 2: Clean build
echo "🧹 Step 2: Cleaning Previous Build"
echo "-----------------------------------"
rm -rf .next out
echo -e "${GREEN}✓ Clean complete${NC}"
echo ""

# Step 3: Build with FAQ disabled
echo "🔨 Step 3: Building with FAQ Disabled"
echo "--------------------------------------"
NEXT_PUBLIC_FAQ= npm run build > /tmp/build.log 2>&1

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Build successful${NC}"
else
  echo -e "${RED}✗ Build failed${NC}"
  echo "Check /tmp/build.log for details"
  exit 1
fi
echo ""

# Step 4: Check static files
echo "📂 Step 4: Checking Static Files"
echo "---------------------------------"

FAQ_FILES=$(find out -name "*faq*" -type f 2>/dev/null | wc -l)

if [ "$FAQ_FILES" -eq 0 ]; then
  echo -e "${GREEN}✓ No FAQ static files generated${NC}"
  ((PASS++))
else
  echo -e "${RED}✗ Found $FAQ_FILES FAQ files:${NC}"
  find out -name "*faq*" -type f
  ((FAIL++))
fi
echo ""

# Step 5: Start server in background
echo "🚀 Step 5: Starting Production Server"
echo "--------------------------------------"

# Kill any existing process on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

npm start > /tmp/server.log 2>&1 &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

if kill -0 $SERVER_PID 2>/dev/null; then
  echo -e "${GREEN}✓ Server started (PID: $SERVER_PID)${NC}"
else
  echo -e "${RED}✗ Server failed to start${NC}"
  cat /tmp/server.log
  exit 1
fi
echo ""

# Step 6: Test HTTP responses
echo "🌐 Step 6: Testing HTTP Responses"
echo "----------------------------------"

test_http() {
  local url="$1"
  local expected_status="$2"

  echo -n "Testing $url... "

  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$url")

  if [ "$STATUS" = "$expected_status" ]; then
    echo -e "${GREEN}✓ $STATUS (expected)${NC}"
    ((PASS++))
  else
    echo -e "${RED}✗ $STATUS (expected $expected_status)${NC}"
    ((FAIL++))
  fi
}

test_http "/en/faq" "404"
test_http "/zh/faq" "404"
test_http "/ja/faq" "404"
test_http "/en/faq/Can-AI-automatically-generate-FAQ" "404"

echo ""

# Step 7: Check robots meta tags
echo "🤖 Step 7: Checking Robots Meta Tags"
echo "-------------------------------------"

check_noindex() {
  local url="$1"

  echo -n "Checking $url for noindex... "

  CONTENT=$(curl -s "http://localhost:3000$url")

  # If page loads (not 404), check for noindex
  if echo "$CONTENT" | grep -q "robots.*noindex"; then
    echo -e "${GREEN}✓ Has noindex tag${NC}"
    ((PASS++))
  elif echo "$CONTENT" | grep -q "404"; then
    echo -e "${GREEN}✓ Returns 404${NC}"
    ((PASS++))
  else
    echo -e "${RED}✗ No noindex tag and not 404${NC}"
    ((FAIL++))
  fi
}

check_noindex "/en/faq"

echo ""

# Step 8: Check sitemap
echo "🗺️  Step 8: Checking Sitemap"
echo "----------------------------"

if [ -f "out/sitemap.xml" ]; then
  if grep -q "/faq" out/sitemap.xml; then
    echo -e "${RED}✗ Sitemap contains FAQ URLs${NC}"
    ((FAIL++))
  else
    echo -e "${GREEN}✓ Sitemap does not contain FAQ URLs${NC}"
    ((PASS++))
  fi
else
  echo -e "${YELLOW}⚠ Sitemap not found${NC}"
fi

echo ""

# Cleanup
echo "🧹 Cleanup"
echo "----------"
kill $SERVER_PID 2>/dev/null || true
echo -e "${GREEN}✓ Server stopped${NC}"
echo ""

# Summary
echo "📊 Test Summary"
echo "==============="
echo -e "Passed: ${GREEN}$PASS${NC}"
echo -e "Failed: ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}🎉 All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed${NC}"
  exit 1
fi
