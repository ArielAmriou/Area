import http.server
import socketserver
import ssl


def main():
    PORT = 8000

    with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
        print(f"http://localhost:{PORT}")
        httpd.serve_forever()


if __name__ == "__main__":
    main()