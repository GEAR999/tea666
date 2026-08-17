#!/bin/bash
# 泡饮百科 Android APK 构建脚本

echo "=== 泡饮百科 Android 构建 ==="

# 1. 同步 web 资源到 Android 项目
echo "同步 web 资源..."
npx cap sync android

# 2. 构建 APK
echo "构建 APK..."
cd android
./gradlew assembleDebug

# 3. 复制 APK 到项目根目录
echo "复制 APK..."
cp app/build/outputs/apk/debug/app-debug.apk ../paoyin-baike.apk

echo "=== 构建完成 ==="
echo "APK 位置: ./paoyin-baike.apk"
