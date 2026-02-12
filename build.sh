#!/bin/bash
echo "🔧 بدء بناء mfly.ai..."

# التحقق من إصدار Node.js
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# تثبيت dependencies مع خيارات خاصة
echo "📦 تثبيت dependencies..."
npm ci --legacy-peer-deps --no-audit --no-fund

# التحقق من تثبيت dependencies
if [ $? -eq 0 ]; then
    echo "✅ تثبيت dependencies ناجح"
    
    # بناء المشروع
    echo "🏗️  بناء المشروع..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "🎉 البناء ناجح!"
        exit 0
    else
        echo "❌ فشل البناء"
        exit 1
    fi
else
    echo "❌ فشل تثبيت dependencies"
    exit 1
fi