#!/usr/bin/env python3
"""本地启动作品集网站"""
import http.server, socketserver, webbrowser, sys, os

PORT = 8080
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

os.chdir(DIR)
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    url = f"http://localhost:{PORT}"
    print(f"🎮 作品集网站启动中: {url}")
    print(f"按 Ctrl+C 停止服务器")
    webbrowser.open(url)
    httpd.serve_forever()
