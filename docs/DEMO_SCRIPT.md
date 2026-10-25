# LifeShare DevOps — 10-Minute Demonstration Script
**Project:** LifeShare – GPS Blood Bank Availability Finder  
**Author:** DevOps Team (Athreya, Dhiraj, Rithwik, Sagar)  
**Target Audience:** Evaluators, Mentors, Engineering Team  
**Estimated Duration:** 10 minutes

---

## Prerequisites Before Demo
- Windows 11 with PowerShell & Docker Desktop running.
- Tools verified: `docker`, `kind`, `kubectl`, `helm`, `curl.exe`.
- Repository cloned at `c:\bloodbank`.

---

## Act 1: Containerized Application & Local Smoke Test (2 mins)

### Step 1.1: Local Stack Health Check
Verify the containerized Apache + PHP 8.2 + MySQL 8 stack:
```powershell
# Verify Compose containers are healthy
docker compose ps

# Check the healthcheck endpoint
curl.exe --max-time 10 -s http://localhost:8088/health.php
```
**Expected Output:**
`{"status":"healthy","php":"8.2.35","db":"connected","tables":4,"ts":"..."}`

### Step 1.2: Verify Hyderabad Seed Data
```powershell
curl.exe --max-time 10 -s http://localhost:8088/api/hospitals.php
```
**Talking Point:** "The database runs MySQL 8 initialized automatically with our 4-table schema and 6 Hyderabad hospitals. The PHP API reads credentials exclusively from environment variables."

---

## Act 2: Continuous Integration & Security (2 mins)

### Step 2.1: Run Local Test Suite
```powershell
# Run Haversine unit tests and API integration tests
node --test tests/haversine.test.js tests/api.test.js
```
**Expected Output:** 7 tests passing (Haversine distance formula + API response schemas).

### Step 2.2: Demonstrate Clean Vulnerability Scan (Trivy)
```powershell
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:0.59.1 image --severity HIGH,CRITICAL --ignore-unfixed --exit-code 1 lifeshare-web:stage2
```
**Talking Point:** "Our GitHub Actions CI runs on every push and PR. It runs PHP lint, JS syntax checks, unit tests, and Trivy scans. Upgrading the Debian base packages in the Dockerfile eliminated all known HIGH and CRITICAL vulnerabilities (0 CVEs)."

---

## Act 3: Kubernetes Deployment & Self-Healing (2 mins)

### Step 3.1: Verify Cluster & Application
```powershell
# Show nodes and lifeshare namespace
kubectl get nodes
kubectl get pods,svc,hpa -n lifeshare

# Test web endpoint via mapped NodePort
curl.exe --max-time 10 -s http://localhost:30080/health.php
```

### Step 3.2: Demonstrate Self-Healing
```powershell
# Delete an active web pod
$pod = (kubectl get pods -n lifeshare -l app.kubernetes.io/name=lifeshare-web -o jsonpath='{.items[0].metadata.name}')
kubectl delete pod $pod -n lifeshare

# Immediately observe replacement
kubectl get pods -n lifeshare -l app.kubernetes.io/name=lifeshare-web
```
**Talking Point:** "Within 4 seconds, Kubernetes detects the pod termination and schedules a replacement to maintain the declared 2 replicas."

---

## Act 4: Failed Release & Instant Rollback (2 mins)

### Step 4.1: Deploy Bad Tag & Show Zero Downtime
```powershell
# Deploy a non-existent container tag
kubectl set image deployment/lifeshare-web web=lifeshare-web:nonexistent-v99 -n lifeshare

# Check pods - new pod stalls in ErrImagePull, old pods continue running
kubectl get pods -n lifeshare -l app.kubernetes.io/name=lifeshare-web

# Confirm application traffic is never interrupted
curl.exe --max-time 10 -sf http://localhost:30080/health.php -o NUL -w "HTTP Status: %{http_code}\n"
```
**Expected Output:** `HTTP Status: 200`.

### Step 4.2: Rollback to Healthy Revision
```powershell
kubectl rollout undo deployment/lifeshare-web -n lifeshare
kubectl rollout status deployment/lifeshare-web -n lifeshare
```
**Talking Point:** "Because maxUnavailable is set to 0, faulty deployments never take down active pods. Rollback is instant and clean."

---

## Act 5: Autoscaling (HPA) Under Load (1 min)

```powershell
# Launch in-cluster load generator
kubectl run load-generator --image=busybox:1.28 --restart=Never -n lifeshare -- /bin/sh -c "for i in 1 2 3 4 5 6 7 8; do while true; do wget -q -O- http://lifeshare-web/api/hospitals.php > /dev/null; done & done; wait"

# Observe HPA scale up to 5 replicas
kubectl get hpa -n lifeshare
kubectl get pods -n lifeshare -l app.kubernetes.io/name=lifeshare-web

# Clean up load generator
kubectl delete pod load-generator -n lifeshare
```
**Talking Point:** "Our HPA monitors CPU via metrics-server and automatically scales from 2 to 5 pods when CPU exceeds 50%."

---

## Act 6: Monitoring, Alerting & Grafana (1 min)

### Step 6.1: Access Prometheus & Grafana (Local Only)
```powershell
# Forward Prometheus & Grafana to localhost (background processes)
kubectl port-forward svc/prometheus-stack-kube-prom-prometheus 9090:9090 -n monitoring --address 127.0.0.1
kubectl port-forward svc/prometheus-stack-grafana 3000:80 -n monitoring --address 127.0.0.1
```
- Open browser: `http://localhost:3000` (User: `admin`, Password: `admin`).
- Navigate to **Dashboards** → **LifeShare Deployment Overview**.
- View live panels: Pod Count, CPU Usage, Memory Working Set, Restarts.

### Step 6.2: Alert Rule Trigger & Clearing
```powershell
# Check alert rules via Prometheus API
$res = (curl.exe --max-time 10 -s http://127.0.0.1:9090/api/v1/alerts | ConvertFrom-Json)
$res.data.alerts | Where-Object { $_.labels.alertname -like "LifeShare*" }
```
**Talking Point:** "We defined 4 Prometheus alerts covering Pod Not Ready, Replicas Unavailable, Repeated Restarts, and High CPU. When a pod is disrupted, alerts fire in Prometheus and clear automatically upon reconciliation."
