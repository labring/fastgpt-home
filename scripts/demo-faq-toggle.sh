#!/bin/bash

# Interactive demo to show FAQ toggle behavior
# Usage: ./scripts/demo-faq-toggle.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}   FAQ 功能开关演示${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Function to show current status
show_status() {
  echo -e "${YELLOW}当前状态检查...${NC}"

  if grep -q "NEXT_PUBLIC_FAQ=true" .env.local 2>/dev/null; then
    echo -e "FAQ 状态: ${GREEN}启用 ✓${NC}"
    FAQ_ENABLED=true
  else
    echo -e "FAQ 状态: ${RED}禁用 ✗${NC}"
    FAQ_ENABLED=false
  fi

  if [ -d "out" ]; then
    FAQ_FILES=$(find out -name "*faq*" -type f 2>/dev/null | wc -l | tr -d ' ')
    echo -e "FAQ 文件: ${YELLOW}$FAQ_FILES 个${NC}"
  else
    echo -e "FAQ 文件: ${YELLOW}未构建${NC}"
  fi
  echo ""
}

# Demo 1: Disable FAQ
demo_disable() {
  echo -e "${BLUE}[演示 1] 禁用 FAQ 功能${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  echo "步骤 1: 设置环境变量为空"
  sed -i '' 's/NEXT_PUBLIC_FAQ=.*/NEXT_PUBLIC_FAQ=/' .env.local 2>/dev/null || echo "NEXT_PUBLIC_FAQ=" >> .env.local
  echo -e "${GREEN}✓${NC} NEXT_PUBLIC_FAQ 已设置为空"
  echo ""

  echo "步骤 2: 清理并重新构建"
  rm -rf .next out
  echo -e "${GREEN}✓${NC} 清理完成"

  echo "正在构建..."
  NEXT_PUBLIC_FAQ= npm run build > /tmp/build-disabled.log 2>&1
  echo -e "${GREEN}✓${NC} 构建完成"
  echo ""

  echo "步骤 3: 验证结果"
  FAQ_FILES=$(find out -name "*faq*" -type f 2>/dev/null | wc -l | tr -d ' ')

  if [ "$FAQ_FILES" -eq 0 ]; then
    echo -e "${GREEN}✓ 成功！没有生成 FAQ 文件${NC}"
  else
    echo -e "${RED}✗ 错误：仍然生成了 $FAQ_FILES 个 FAQ 文件${NC}"
  fi
  echo ""
}

# Demo 2: Enable FAQ
demo_enable() {
  echo -e "${BLUE}[演示 2] 启用 FAQ 功能${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  echo "步骤 1: 设置环境变量为 true"
  sed -i '' 's/NEXT_PUBLIC_FAQ=.*/NEXT_PUBLIC_FAQ=true/' .env.local 2>/dev/null || echo "NEXT_PUBLIC_FAQ=true" >> .env.local
  echo -e "${GREEN}✓${NC} NEXT_PUBLIC_FAQ=true"
  echo ""

  echo "步骤 2: 清理并重新构建"
  rm -rf .next out
  echo -e "${GREEN}✓${NC} 清理完成"

  echo "正在构建..."
  NEXT_PUBLIC_FAQ=true npm run build > /tmp/build-enabled.log 2>&1
  echo -e "${GREEN}✓${NC} 构建完成"
  echo ""

  echo "步骤 3: 验证结果"
  FAQ_FILES=$(find out -name "*faq*" -type f 2>/dev/null | wc -l | tr -d ' ')

  if [ "$FAQ_FILES" -gt 0 ]; then
    echo -e "${GREEN}✓ 成功！生成了 $FAQ_FILES 个 FAQ 文件${NC}"
    echo ""
    echo "FAQ 文件列表（前 5 个）："
    find out -name "*faq*" -type f | head -5
  else
    echo -e "${RED}✗ 错误：没有生成 FAQ 文件${NC}"
  fi
  echo ""
}

# Demo 3: Runtime test
demo_runtime() {
  echo -e "${BLUE}[演示 3] 运行时测试${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  echo "步骤 1: 启动生产服务器"

  # Kill existing server
  lsof -ti:3000 | xargs kill -9 2>/dev/null || true
  sleep 1

  # Start server
  npm start > /tmp/server.log 2>&1 &
  SERVER_PID=$!

  echo "等待服务器启动..."
  sleep 5

  if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${RED}✗ 服务器启动失败${NC}"
    cat /tmp/server.log
    return 1
  fi

  echo -e "${GREEN}✓${NC} 服务器已启动 (PID: $SERVER_PID)"
  echo ""

  echo "步骤 2: 测试 FAQ 路由"

  # Test FAQ route
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en/faq)

  echo -ne "访问 /en/faq... "
  if grep -q "NEXT_PUBLIC_FAQ=true" .env.local 2>/dev/null; then
    # FAQ enabled
    if [ "$STATUS" = "200" ]; then
      echo -e "${GREEN}✓ 返回 200 (正确)${NC}"
    else
      echo -e "${RED}✗ 返回 $STATUS (期望 200)${NC}"
    fi
  else
    # FAQ disabled
    if [ "$STATUS" = "404" ]; then
      echo -e "${GREEN}✓ 返回 404 (正确)${NC}"
    else
      echo -e "${RED}✗ 返回 $STATUS (期望 404)${NC}"
    fi
  fi
  echo ""

  echo "步骤 3: 清理"
  kill $SERVER_PID 2>/dev/null || true
  echo -e "${GREEN}✓${NC} 服务器已停止"
  echo ""
}

# Main menu
main_menu() {
  while true; do
    echo -e "${YELLOW}请选择演示:${NC}"
    echo "1) 演示 FAQ 禁用"
    echo "2) 演示 FAQ 启用"
    echo "3) 运行时测试"
    echo "4) 显示当前状态"
    echo "5) 运行所有演示"
    echo "6) 退出"
    echo ""
    read -p "请输入选项 (1-6): " choice

    case $choice in
      1)
        demo_disable
        ;;
      2)
        demo_enable
        ;;
      3)
        demo_runtime
        ;;
      4)
        show_status
        ;;
      5)
        show_status
        demo_disable
        demo_enable
        demo_runtime
        show_status
        ;;
      6)
        echo "再见！"
        exit 0
        ;;
      *)
        echo -e "${RED}无效选项，请重试${NC}"
        ;;
    esac

    echo ""
    read -p "按 Enter 继续..."
    clear
  done
}

# Initial status
clear
show_status

# Show menu
main_menu
