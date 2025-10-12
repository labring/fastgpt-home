#!/bin/bash

# Quick test to verify current FAQ state
# Usage: ./scripts/quick-test-faq.sh

echo "🔍 Quick FAQ Test"
echo "================="
echo ""

# Check environment
echo "📋 Environment Check:"
if grep -q "NEXT_PUBLIC_FAQ=true" .env.local 2>/dev/null; then
  echo "✅ FAQ is ENABLED (NEXT_PUBLIC_FAQ=true)"
  ENABLED=true
else
  echo "❌ FAQ is DISABLED (NEXT_PUBLIC_FAQ not set or empty)"
  ENABLED=false
fi
echo ""

# Check if server is running
echo "🌐 Server Check:"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 > /dev/null 2>&1; then
  echo "✅ Server is running on port 3000"

  # Test FAQ endpoint
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en/faq)
  echo "📄 /en/faq returns: $STATUS"

  if [ "$STATUS" = "404" ] && [ "$ENABLED" = false ]; then
    echo "✅ Correct: FAQ disabled, returns 404"
  elif [ "$STATUS" = "200" ] && [ "$ENABLED" = true ]; then
    echo "✅ Correct: FAQ enabled, returns 200"
  else
    echo "⚠️  Warning: Unexpected status code for current config"
  fi
else
  echo "❌ Server is not running"
  echo "   Run: npm start"
fi
echo ""

# Check static files
echo "📂 Static Files Check:"
FAQ_COUNT=$(find out -name "*faq*" -type f 2>/dev/null | wc -l | tr -d ' ')

if [ "$FAQ_COUNT" -eq 0 ] && [ "$ENABLED" = false ]; then
  echo "✅ Correct: No FAQ files (FAQ disabled)"
elif [ "$FAQ_COUNT" -gt 0 ] && [ "$ENABLED" = true ]; then
  echo "✅ Correct: $FAQ_COUNT FAQ files found (FAQ enabled)"
elif [ -d "out" ]; then
  echo "⚠️  Warning: Found $FAQ_COUNT FAQ files, expected different count"
else
  echo "ℹ️  No 'out' directory found (not built yet)"
fi
echo ""

# Recommendation
echo "💡 Next Steps:"
if [ ! -d ".next" ]; then
  echo "   1. Build the project: npm run build"
  echo "   2. Run this test again"
elif [ ! -d "out" ]; then
  echo "   1. Export static files: npm run build"
  echo "   2. Run this test again"
else
  echo "   ✓ All checks complete"
  echo ""
  echo "   For comprehensive testing, run:"
  echo "   ./scripts/test-faq-disabled.sh"
fi
