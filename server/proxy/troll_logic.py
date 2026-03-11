from flask import Flask, request, Response
import requests

app = Flask(__name__)
# Le vrai Grafana (installé sur le port 3000)
GRAFANA_URL = "http://127.0.0.1:3000"

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(path):
    # INTERCEPTION DU LOGIN
    if path == "api/login" and request.method == "POST":
        data = request.json
        if data and data.get("user") == "admin" and data.get("password") == "admin":
            # On renvoie une instruction de redirection vers la page Paint
            return {"message": "Logged in", "redirect": "/troll-page-visible"}, 200

    # PROXY CLASSIQUE (on laisse passer le reste)
    url = f"{GRAFANA_URL}/{path}"
    headers = {key: value for (key, value) in request.headers if key != 'Host'}

    try:
        resp = requests.request(
            method=request.method,
            url=url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False)

        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items()
                   if name.lower() not in excluded_headers]

        return Response(resp.content, resp.status_code, headers)
    except Exception as e:
        return f"Erreur de connexion au service Grafana : {e}", 502

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)