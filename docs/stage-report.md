# LifeShare DevOps – Stage Report

> Generated: 2026-10-26  
> Project: LifeShare GPS Blood Bank Availability Finder  
> Repo root: `c:\bloodbank`

---

## Pre-flight Inspection

| Item | Finding | Status |
|:---|:---|:---|
| App type | Pure static SPA (HTML5 + CSS3 + vanilla JS) | INSPECTED ONLY |
| Backend | None live; `schema.sql` defines 4-table MySQL schema | INSPECTED ONLY |
| Data store | `localStorage` in browser + MySQL seeded via schema.sql | INSPECTED ONLY |
| Git repo | Did not exist — initialized fresh | VERIFIED |
| Docker client | v29.8.0 (linux/x86_64 containers) | VERIFIED |
| Docker Compose | v5.5.1 | VERIFIED |
| Node/npm | Node 20 LTS (inside container) | VERIFIED |

---

## Stage 1 – Git Initialisation

| Action | Result | Status |
|:---|:---|:---|
| `git init` | Repo created at `c:\bloodbank\.git` | VERIFIED |
| `.gitignore` | Excludes `node_modules/`, `.env`, generated PDFs | VERIFIED |
| `.env.example` | Placeholder credentials only (no real secrets) | VERIFIED |
| Initial commit | `b954db2` — 23 files | VERIFIED |

---

## Stage 2 – Containerisation

### Dockerfile

- Base: `node:20-alpine` (small, well-maintained)
- Runs as non-root user `lifeshare` (uid 1000)
- Only app source files copied (enforced by `.dockerignore`)
- `npm ci --omit=dev` — no dev deps in image
- Exposes port 3000

### Build result

```
lifeshare-frontend:local   ~67 MB (Alpine + serve)
0 HIGH/CRITICAL vulnerabilities reported (npm audit clean)
```

**Status: VERIFIED** — `docker build` exit 0, image `lifeshare-frontend:local` exists.

### Smoke test

```
docker run -d -p 3001:3000 lifeshare-frontend:local
curl.exe --max-time 10 http://localhost:3001  →  HTTP 200
```

**Status: VERIFIED**

---

## Stage 3 – Docker Compose Stack

### Services

| Service | Image | Port | Health |
|:---|:---|:---|:---|
| `frontend` | `lifeshare-frontend:local` | 3000 | HTTP GET / |
| `db` | `mysql:8.0` | 3307→3306 | `mysqladmin ping` |

### Compose verification

```
lifeshare-db       Up (healthy)   0.0.0.0:3307->3306/tcp
lifeshare-frontend Up (healthy)   0.0.0.0:3000->3000/tcp
```

### Database seed verification

```sql
SHOW TABLES;           -- blood_inventory, blood_requests, donors, hospitals
SELECT COUNT(*) FROM hospitals;   -- 6
SELECT COUNT(*) FROM donors;      -- 9
```

**Status: VERIFIED**

### Credentials handling

- `.env` is gitignored — never committed
- `MYSQL_ROOT_PASSWORD`, `MYSQL_USER`, `MYSQL_PASSWORD` come from env vars
- `.env.example` has safe placeholders only

---

## Stage 4 – CI/CD Pipeline

File: [`.github/workflows/ci.yml`](file:///c:/bloodbank/.github/workflows/ci.yml)

| Job | What it does |
|:---|:---|
| `lint` | Node 20 setup, `npm ci`, grep for TODO/FIXME |
| `build` | Docker Buildx with layer cache (GHA cache) |
| `scan` | Trivy — fails on CRITICAL/HIGH unfixed CVEs |
| `smoke` | Runs container, `curl --max-time 10` to verify HTTP 200 |

**Status: INSPECTED ONLY** — pipeline is valid YAML; executes on GitHub push to `main`.

---

## Stage 5 – Kubernetes Manifests

Files in `k8s/`:

| Manifest | Purpose |
|:---|:---|
| `namespace.yaml` | `lifeshare` namespace |
| `db-secret.yaml` | MySQL credentials via K8s Secret (stringData) |
| `frontend-deployment.yaml` | 2-replica Deployment + ClusterIP Service, rolling update, liveness/readiness probes |
| `db-statefulset.yaml` | MySQL StatefulSet + headless Service + 1 Gi PVC |
| `hpa.yaml` | HPA: 2–10 replicas, scale at 60% CPU / 70% memory |
| `ingress.yaml` | nginx Ingress at `lifeshare.local` |

**Status: INSPECTED ONLY** — manifests authored and committed; apply with:

```powershell
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/db-secret.yaml
kubectl apply -f k8s/db-statefulset.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## Stage 6 – Autoscaling

HPA configured via [`k8s/hpa.yaml`](file:///c:/bloodbank/k8s/hpa.yaml):
- Min replicas: **2** (HA baseline)
- Max replicas: **10**
- Scale trigger: CPU ≥ 60% OR Memory ≥ 70%
- Requires `metrics-server` running in cluster

**Status: NOT DONE** (K8s cluster not available in this environment — Docker Desktop K8s can be enabled via Settings → Kubernetes)

---

## Stage 7 – Monitoring

File: [`monitoring/prometheus.yml`](file:///c:/bloodbank/monitoring/prometheus.yml)

Scrape jobs defined:
- `prometheus` — self (localhost:9090)
- `lifeshare-frontend` — HTTP endpoint
- `lifeshare-db` — mysqld-exporter sidecar (port 9104)

To start Prometheus alongside the stack, add to `docker-compose.yml`:

```yaml
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
    ports:
      - "9090:9090"
```

**Status: INSPECTED ONLY** — config authored; Prometheus not yet running.

---

## Stage 8 – Rollback

File: [`rollback.ps1`](file:///c:/bloodbank/rollback.ps1)

```powershell
# Roll back to previous revision
.\rollback.ps1

# Roll back to specific revision
.\rollback.ps1 -ToRevision 2
```

Script:
1. Prints rollout history
2. Calls `kubectl rollout undo`
3. Waits for completion (`--timeout=120s`)
4. Prints pod status

**Status: NOT DONE** — script authored; requires running K8s cluster to execute.

---

## Security Notes

- No wildcard CORS added
- No scans disabled
- All credentials come from environment variables
- Non-root container user (`lifeshare`, uid 1000)
- `.env` gitignored; `.env.example` has placeholders only
- Trivy scan in CI fails on CRITICAL/HIGH CVEs

---

## File Tree (DevOps additions only)

```
c:\bloodbank\
├── .dockerignore
├── .env.example            ← placeholders only
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── rollback.ps1
├── .github\
│   └── workflows\
│       └── ci.yml
├── k8s\
│   ├── namespace.yaml
│   ├── db-secret.yaml
│   ├── frontend-deployment.yaml
│   ├── db-statefulset.yaml
│   ├── hpa.yaml
│   └── ingress.yaml
├── monitoring\
│   └── prometheus.yml
└── docs\
    └── stage-report.md     ← this file
```
