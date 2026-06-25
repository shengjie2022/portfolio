#!/usr/bin/env python3
"""
GitHub Pages 部署辅助脚本
将 portfolio 文件夹内容迁移到仓库根目录

使用方法：
1. 确保安装了 Python 3
2. 安装 requests: pip install requests
3. 运行脚本，按提示操作

此脚本会：
1. 克隆仓库（需要 Git 已安装并登录 GitHub）
2. 将 portfolio/ 下的所有文件移动到仓库根目录
3. 提交并推送
"""

import subprocess
import shutil
import os
import sys

REPO_URL = "https://github.com/shengjie2022/Game-Portfolio.git"
CLONE_DIR = os.path.join(os.path.expanduser("~"), "game-portfolio-deploy")

def run(cmd, check=True):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0 and check:
        print(f"❌ 命令失败: {cmd}")
        print(result.stderr)
        sys.exit(1)
    return result

def main():
    print("🚀 开始部署 Portfolio 网站\n")

    # Step 1: 克隆仓库
    if os.path.exists(CLONE_DIR):
        print("📁 已有本地副本，更新中...")
        run(f'git -C "{CLONE_DIR}" pull origin main', check=False)
    else:
        print("📥 克隆仓库...")
        run(f'git clone {REPO_URL} "{CLONE_DIR}"')

    portfolio_src = os.path.join(CLONE_DIR, "portfolio")

    if not os.path.exists(portfolio_src):
        print("❌ portfolio 文件夹不存在，请确认仓库结构正确")
        sys.exit(1)

    print("📂 迁移文件到根目录...")

    # 移动 portfolio 下的所有内容到根目录
    moved = []
    for item in os.listdir(portfolio_src):
        src = os.path.join(portfolio_src, item)
        dst = os.path.join(CLONE_DIR, item)

        # 根目录已有同名文件时跳过（README.md）
        if os.path.exists(dst):
            print(f"  ⚠️  跳过已有文件: {item}")
            continue

        shutil.move(src, dst)
        moved.append(item)
        print(f"  ✅ 移动: {item}")

    # 删除空的 portfolio 文件夹
    if os.path.exists(portfolio_src):
        os.rmdir(portfolio_src)
        print("  🗑️  删除空的 portfolio 文件夹")

    # Step 2: 提交并推送
    print("\n📤 提交更改...")
    run(f'git -C "{CLONE_DIR}" add .')
    run(f'git -C "{CLONE_DIR}" commit -m "refactor: 将 portfolio 内容迁移到根目录以启用 GitHub Pages"')

    print("\n🔼 推送到 GitHub...")
    result = run(f'git -C "{CLONE_DIR}" push origin main', check=False)

    if result.returncode == 0:
        print("\n✅ 部署完成！")
        print("   GitHub Pages 将在 2 分钟后自动部署")
        print("   访问: https://shengjie2022.github.io/Game-Portfolio/")
        print(f"\n   本地仓库保留在: {CLONE_DIR}")
    else:
        print("\n❌ 推送失败，可能需要先登录 GitHub")
        print("   请在终端运行: git push origin main")
        print(f"   （在目录 {CLONE_DIR} 中）")

if __name__ == "__main__":
    main()
