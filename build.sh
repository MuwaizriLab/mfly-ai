#!/bin/bash
echo "🔧 بدء بناء mfly.ai..."

# التحقق من إصدار Node.js
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# إنشاء package-lock.json أولاً إذا غير موجود
if [ ! -f "package-lock.json" ]; then
    echo "📝 إنشاء package-lock.json جديد..."
    npm init -y --silent
fi

# تثبيت dependencies مع خيارات خاصة
echo "📦 تثبيت dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund --progress=false

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
        echo "🔍 تفاصيل الخطأ:"
        npm run build 2>&1 | tail -20
        exit 1
    fi
else
    echo "❌ فشل تثبيت dependencies"
    echo "🔍 تفاصيل الخطأ:"
    npm install --legacy-peer-deps 2>&1 | tail -30
    exit 1
fi