# LifeShare — GPS Blood Bank & Donor Availability Finder

LifeShare is an academic capstone application designed to bridge blood donors, healthcare centers, and patients in emergencies using real-time GPS Geolocation, Haversine spherical distance sorting, and dynamic inventory management.

This repository contains the complete application and enterprise DevOps pipeline: Docker containerization, GitHub Actions CI/CD with security scanning, local Kubernetes deployment on `kind` with Horizontal Pod Autoscaling (HPA) and zero-downtime rollback, and a full Prometheus/Grafana monitoring suite.

---

## 1. Prerequisites

- **OS:** Windows 10/11, macOS, or Linux
- **Docker Desktop:** Running with Linux containers
- **Tools:**
  - `git`
  - `curl` (use `curl.exe` on Windows PowerShell)
  - `kubectl` (v1.28+)
  - `kind` (v0.20+)
  - `helm` (v3+)
  - `node` (v20+ for local tests)

---

## 2. One-Command Local Start (Docker Compose)

For quick local development without Kubernetes:

```powershell
# 1. Clone repository and navigate to root
cd c:\bloodbank

# 2. Setup local environment variables
cp .env.example .env

# 3. Start stack with Docker Compose
docker compose up -d --build
```

### Accessing Local Services
- **Web Application & UI:** [http://localhost:8088](http://localhost:8088)
- **Healthcheck Endpoint:** [http://localhost:8088/health.php](http://localhost:8088/health.php)
- **Hospitals API (with stock):** [http://localhost:8088/api/hospitals.php](http://localhost:8088/api/hospitals.php)
- **Donors API:** [http://localhost:8088/api/donors.php](http://localhost:8088/api/donors.php)
- **MySQL Database:** `localhost:3307` (user: `lifeshare`, database: `blood_bank_db`)

### Stopping Docker Compose
```powershell
docker compose stop
```

---

## 3. Kubernetes Cluster Setup (`kind`)

To run the application in a local Kubernetes cluster with metrics and autoscaling:

```powershell
# 1. Create kind cluster with mapped port 30080
kind create cluster --config k8s/kind-config.yaml

# 2. Install metrics-server with kind-compatible TLS flags
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl patch deployment metrics-server -n kube-system --type 'json' -p '[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'

# 3. Build & load local image into kind
docker build -t lifeshare-web:stage2 .
kind load docker-image lifeshare-web:stage2 --name lifeshare

# 4. Generate local secret from template (gitignored)
cp k8s/secret.example.yaml k8s/secret.yaml

# 5. Deploy all resources via Kustomize
kubectl apply -k k8s/
```

### Accessing Application in Kubernetes
```powershell
# Access via mapped NodePort
curl.exe --max-time 10 http://localhost:30080/health.php
```

---

## 4. How Continuous Integration (CI) Works

The CI pipeline is defined in [`.github/workflows/ci.yml`](file:///.github/workflows/ci.yml) and automatically triggers on `push` and `pull_request`:

1. **Linting:** Validates PHP syntax (`php -l`) and JavaScript syntax (`node --check`).
2. **Testing:** Executes Haversine unit tests and launches service containers to test API contracts (`node --test tests/`).
3. **Security Scan:** Builds the image and runs **Trivy** vulnerability scanner pinned to release `@0.29.0`. Fails build on any unfixed `HIGH` or `CRITICAL` vulnerability (currently 0 CVEs).
4. **Publishing:** On push to `main`, automatically pushes tagged images to GitHub Container Registry (`ghcr.io`).

Run tests locally anytime:
```powershell
npm run test:unit
```

---

## 5. Monitoring & Alerting (`kube-prometheus-stack`)

Install Prometheus and Grafana using Helm:

```powershell
# 1. Add Prometheus Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# 2. Install stack with lightweight laptop resource limits
helm install prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace \
  -f k8s/monitoring/values.yaml

# 3. Apply custom alert rules and Grafana dashboard
kubectl apply -f k8s/monitoring/alert-rules.yaml
kubectl apply -f k8s/monitoring/dashboard.yaml
```

### Local Access to Dashboards
Run in separate background sessions:
```powershell
# Prometheus UI
kubectl port-forward svc/prometheus-stack-kube-prom-prometheus 9090:9090 -n monitoring --address 127.0.0.1

# Grafana UI (login: admin / admin)
kubectl port-forward svc/prometheus-stack-grafana 3000:80 -n monitoring --address 127.0.0.1
```
Open [http://localhost:3000](http://localhost:3000) and open **LifeShare Deployment Overview**.

---

## 6. How to Run Evaluator Demonstrations

A step-by-step 10-minute demonstration covering:
- Smoke tests & seed data verification
- Pod self-healing
- Erroneous deployment with zero downtime & instant rollback
- Autoscaling from 2 to 5 pods under heavy load
- Alert firing and clearing

👉 Follow the full script in [`docs/DEMO_SCRIPT.md`](file:///docs/DEMO_SCRIPT.md).

---

## 7. Troubleshooting

| Issue | Cause | Resolution |
|---|---|---|
| Port 8080 or 3306 in use | Windows services or local MySQL bound to default ports | Compose maps web to port **8088** and MySQL to **3307**. Check `.env` `APP_PORT`. |
| `metrics-server` shows 0/1 | kind uses self-signed kubelet certificates | Ensure patch `--kubelet-insecure-tls` was applied to metrics-server deployment. |
| Image pull error in kind | Local image not loaded into kind node | Run `kind load docker-image lifeshare-web:stage2 --name lifeshare`. |
| HPA shows `<unknown>/50%` | metrics-server is still collecting first cycle metrics | Wait 30 seconds for initial cycle to register. |

---

## 8. Safe Teardown

To shut down only the local kind cluster without deleting any global Docker volumes or configurations:

```powershell
kind delete cluster --name lifeshare
```
