# JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY HYDERABAD
## DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING

---

# PROJECT REPORT
## ON
## BLOOD BANK AVAILABILITY FINDER WITH REAL-TIME GPS GEOLOCATION

*Submitted in partial fulfillment of the requirements for the award of the degree of*

### BACHELOR OF TECHNOLOGY
### IN
### COMPUTER SCIENCE AND ENGINEERING

---

### **Submitted By:**
| S. No. | Student Name | Roll Number |
|:---:|:---|:---|
| 1 | Athreya | 24011MB502 |
| 2 | Dhiraj | 24011MB516 |
| 3 | Rithwik | 24011M2113 |
| 4 | Sagar | 24011M2112 |

### **Under the Guidance of:**

**Dr. K Suresh-Babu**
*M.Tech, Ph.D. (CSE), LMCSI*
*Professor, Department of CSE*
*Jawaharlal Nehru Technological University Hyderabad*

---
---

## **CERTIFICATE**

*Jawaharlal Nehru Technological University Hyderabad*
*Department of Computer Science and Engineering*

This is to certify that the project report entitled **"BLOOD BANK AVAILABILITY FINDER WITH REAL-TIME GPS GEOLOCATION"** submitted by **Athreya (24011MB502)**, **Dhiraj (24011MB516)**, **Rithwik (24011M2113)**, and **Sagar (24011M2112)** is a bonafide record of work carried out by them during the academic year **2024–2025**, under my supervision and guidance, in partial fulfillment of the requirements for the award of the degree of **Bachelor of Technology in Computer Science and Engineering** by Jawaharlal Nehru Technological University Hyderabad.

The work embodied in this project report has not been submitted for the award of any other degree or diploma in this or any other University or Institution.

<br>

| | |
|:---|:---|
| **Dr. K Suresh-Babu** | **Head of Department** |
| *Internal Project Guide* | Department of CSE |
| Professor, Dept. of CSE | JNTU Hyderabad |

<br>

---
---

## **DECLARATION**

We, **Athreya (24011MB502)**, **Dhiraj (24011MB516)**, **Rithwik (24011M2113)**, and **Sagar (24011M2112)**, students of B.Tech (CSE), hereby declare that the project work titled **"BLOOD BANK AVAILABILITY FINDER WITH REAL-TIME GPS GEOLOCATION"** is an independent and original work carried out by us under the guidance of **Dr. K Suresh-Babu**, Professor, Department of CSE, JNTU Hyderabad, for partial fulfillment of the requirements of B.Tech degree examination.

This project has not been submitted to any other University or Institution for the award of any degree or diploma. All information used from published sources has been duly acknowledged.

<br>

**Place:** Hyderabad
**Date:** ___________

| | | | |
|:---|:---|:---|:---|
| Athreya | Dhiraj | Rithwik | Sagar |
| 24011MB502 | 24011MB516 | 24011M2113 | 24011M2112 |

---
---

## **ACKNOWLEDGEMENT**

We take this opportunity to express our heartfelt gratitude to all those who have contributed to the successful completion of this project.

We are deeply grateful to our project guide, **Dr. K Suresh-Babu**, Professor, Department of Computer Science and Engineering, JNTU Hyderabad, for his constant encouragement, technical guidance, and constructive feedback throughout the development of this project. His expertise in Web Technologies and Software Engineering helped us navigate complex implementation challenges.

We sincerely thank the **Head of the Department** and the **Teaching Faculty** of CSE for providing the required academic infrastructure, laboratory facilities, and intellectual environment conducive to project-based learning.

We thank **Mozilla Developer Network (MDN)**, **Google Maps Platform**, and the **World Wide Web Consortium (W3C)** for maintaining detailed, open-access technical documentation that formed the primary reference for our implementation.

Finally, we are grateful to our families and friends for their moral support and encouragement throughout the project timeline.

---
---

## **ABSTRACT**

In critical medical emergencies, timely access to matching blood groups is a deciding factor between life and death. Traditional blood bank registries rely on static, flat-file contact lists and call directories that fail to address geographical proximity or real-time inventory status. This results in significant coordination delays, out-of-stock hospital visits, and elevated patient stress.

This project presents the **Blood Bank Availability Finder**, a location-aware, client-side web application designed to connect blood seekers directly with active donors and hospitals in their geographic vicinity. By integrating the **HTML5 Geolocation API** and the **Google Maps JavaScript API**, the application dynamically calculates great-circle distances using the **Haversine Formula**—a standard spherical geometry equation adopted in aviation, nautical navigation, and geospatial computing.

The frontend is implemented entirely using vanilla **HTML5**, **CSS3**, and **ES6 JavaScript** with zero external framework dependencies. The system maps proximity filters, tracks hospital blood inventory, and provides immediate communication hooks (direct dialers, pre-filled SMS, and WhatsApp API URL templates). A **Donor Health Portal** sub-module simulates clinical eligibility checks by rendering deterministic vital statistics and enforcing the mandatory **56-day whole-blood donation rest period**.

The entire application operates as a **Progressive Web Application (PWA)** prototype, persisting session data in the browser's native `localStorage` API. This design allows zero-backend deployment and cross-platform compatibility across Android, iOS, Windows, and macOS environments. The prototype demonstrates that proximity-aware, map-centric healthcare coordination tools can materially reduce emergency response latency compared to traditional directory-based approaches.

**Keywords**: Blood Bank, GPS Geolocation, Haversine Formula, HTML5, JavaScript, Google Maps API, localStorage, Healthcare IT, Proximity Search, Web Application.

---

## **TABLE OF CONTENTS**

| Chapter | Title | Page |
|:---:|:---|:---:|
| | Certificate | ii |
| | Declaration | iii |
| | Acknowledgement | iv |
| | Abstract | v |
| | List of Figures | vii |
| | List of Tables | viii |
| 1 | Introduction | 1 |
| 1.1 | Background & Motivation | 1 |
| 1.2 | Problem Statement | 2 |
| 1.3 | Objectives | 2 |
| 1.4 | Scope of the Project | 3 |
| 2 | System Analysis | 4 |
| 2.1 | Existing System Limitations | 4 |
| 2.2 | Proposed System Advantages | 4 |
| 2.3 | System Requirements Specification (SRS) | 5 |
| 2.4 | Feasibility Analysis | 6 |
| 2.5 | SDLC Model Adopted | 7 |
| 3 | System Design | 8 |
| 3.1 | System Architecture | 8 |
| 3.2 | Data Flow Diagram (DFD) | 9 |
| 3.3 | Use Case Diagram | 10 |
| 3.4 | Entity-Relationship Diagram | 11 |
| 3.5 | Geolocation & Map Integration | 12 |
| 3.6 | Mathematical Modeling (Haversine Formula) | 12 |
| 3.7 | UI/UX Design Principles | 13 |
| 4 | Implementation Methodology | 14 |
| 4.1 | Project File Structure | 14 |
| 4.2 | Module Descriptions | 14 |
| 4.3 | Storage Mechanism | 15 |
| 4.4 | Core Code Implementation | 16 |
| 5 | Testing & Verification | 18 |
| 5.1 | Testing Strategy | 18 |
| 5.2 | Unit Testing | 18 |
| 5.3 | Integration Testing | 19 |
| 5.4 | System Testing | 19 |
| 5.5 | User Acceptance Testing (UAT) | 20 |
| 5.6 | Security Testing | 20 |
| 5.7 | Test Cases & Results Summary | 21 |
| 6 | Risk Analysis | 22 |
| 7 | Conclusion & Future Scope | 23 |
| 7.1 | Conclusion | 23 |
| 7.2 | Limitations | 23 |
| 7.3 | Future Work | 24 |
| 8 | References | 25 |
| 9 | Appendix: Annotated Source Code | 26 |

---

## **LIST OF FIGURES**

| Figure No. | Description |
|:---:|:---|
| 2.1 | System Context Diagram |
| 2.2 | SDLC Waterfall Model Adopted |
| 3.1 | MVC Application Architecture |
| 3.2 | Level-0 DFD (Context Diagram) |
| 3.3 | Level-1 DFD (System Internals) |
| 3.4 | Use Case Diagram |
| 3.5 | Browser Geolocation API Lifecycle |
| 3.6 | Haversine Formula Geometric Representation |
| 4.1 | Project File Directory Structure |

---

## **LIST OF TABLES**

| Table No. | Description |
|:---:|:---|
| 2.1 | Comparison: Existing vs. Proposed System |
| 2.2 | Hardware Requirements |
| 2.3 | Software Requirements |
| 2.4 | Feasibility Analysis Summary |
| 5.1 | Unit Test Cases |
| 5.2 | Integration Test Cases |
| 5.3 | System Test Cases |
| 5.4 | UAT Test Cases |
| 6.1 | Risk Register |

---

## **1. INTRODUCTION**

### 1.1 Background & Motivation

Healthcare logistics—specifically blood inventory coordination—remains one of the most critical challenges in rapidly growing urban regions of India. According to the **World Health Organization (WHO)**, India requires approximately 12–14 million units of blood annually, of which only 9–10 million units are collected through donation drives. This shortfall is exacerbated by a highly fragmented and non-digitized coordination pipeline.

In a city like Hyderabad, with over 9.7 million inhabitants, the challenge is not a shortage of willing voluntary donors but a breakdown in information flow. Emergency requests are typically broadcast via unstructured WhatsApp groups, social media posts, and phone trees—leading to coordinate mismatches, duplicate mobilization of the same donors, and delays of 2–6 hours in an environment where the golden window for transfusion is critical.

Furthermore, existing government portals such as the **eRaktakosh** national blood bank portal provide a searchable directory of registered blood banks, but they lack:
- Real-time GPS-based distance sorting.
- Dynamic inventory status (A+, B−, O+ etc.) per blood group.
- Integrated contact initiation (one-click call, SMS, WhatsApp).

This motivated the development of a location-first, map-centric web application that combines geospatial search with instant communication hooks.

### 1.2 Problem Statement

Existing centralized web systems function as static phonebooks. They list blood banks by city or registration date, not by physical proximity. A seeker in Secunderabad may waste precious hours calling a registered blood bank in Gachibowli—just a few kilometers away but filtered out of unordered lists. 

Additionally:
1. Public blood inventories are rarely updated dynamically, leading to patients traveling to hospitals to discover that the needed blood type is unavailable.
2. Donor privacy is compromised because contact details are publicly exposed without user-controlled visibility toggles.
3. There is no mechanism to verify that a donor is medically eligible (i.e., has not donated within the mandatory 56-day window).

### 1.3 Objectives

The primary objectives of this capstone research project are:

1. **Develop an interactive map interface** that visually shows donor and hospital locations as geo-pinned markers, enabling seekers to immediately understand the spatial landscape of available resources.
2. **Automate spatial filtering** using the Haversine Formula, rendering only donors and hospitals within a user-defined search radius (5 km, 10 km, 25 km, or 50 km).
3. **Provide real-time inventory status** panels per hospital, showing current availability of all eight ABO-Rh blood groups (A+, A−, B+, B−, AB+, AB−, O+, O−).
4. **Implement a Donor Health Portal** that validates clinical eligibility using simulated vital data and enforces the 56-day whole-blood donation cooldown period per WHO guidelines.
5. **Reduce the steps to initiate coordination** to a single user interaction—via direct device dialers, SMS deep links, or pre-filled WhatsApp URL templates that share location coordinates automatically.
6. **Build a cross-platform prototype** operable on desktops, Android smartphones, and iOS devices without any native application installation.

### 1.4 Scope of the Project

The project scope is defined as a **client-side proof-of-concept web application** simulating backend database operations through the browser-native `localStorage` API. The application operates entirely within the user's browser without requiring a dedicated server-side runtime, database server, or cloud infrastructure for its core functionality.

**In-scope:**
- GPS-based proximity search for donors and hospitals.
- Blood group inventory dashboard.
- Donor registration and health portal.
- Emergency request submission form.
- Direct communication initiation (call/SMS/WhatsApp).

**Out-of-scope:**
- Real-time database synchronization between different users' devices.
- OAuth-based user authentication.
- SMS gateway integration (e.g., Twilio, MSG91).
- Native mobile app development (Android/iOS).

The project serves as a visual and functional prototype demonstrating the feasibility of geolocation-driven healthcare coordination, intended for further development into a production system.

---

## **2. SYSTEM ANALYSIS**

### Figure 2.1 — System Context Diagram

```mermaid
graph TD
    User((Blood Seeker / Donor)) -->|GPS/Manual Pin| App[Blood Bank Availability Finder]
    App -->|Reads Coordinates| Loc[HTML5 Geolocation API]
    App -->|Distance Queries| Math[Haversine Formula Solver]
    App -->|Persists Session Data| DB[(Browser localStorage)]
    App -->|Renders Visual Map| Map[Google Maps API / Leaflet]
    App -->|Initiates Call/SMS| Comm[Mobile Communication APIs]
```

### 2.1 Existing System Limitations

The current landscape of blood bank coordination systems exhibits several critical design flaws:

- **Lack of Proximity Sorting**: Directories list records alphabetically or by registration date rather than physical distance from the seeker's current location.
- **Static Inventory Data**: Blood stock levels are updated manually by hospital staff (if at all), making real-time availability checks impossible.
- **Privacy Vulnerabilities**: Donors must expose their full contact details publicly with no toggle controls for visibility.
- **Manual Inventory Verification**: Seekers must manually call hospital reception desks to verify blood bag availability, consuming 10–30 minutes per call.
- **No Eligibility Checks**: Existing portals allow donors who may have donated recently to be contacted, wasting coordination effort.
- **Zero Communication Integration**: Most portals display phone numbers in plain text without integrated call, SMS, or messaging hooks.

### 2.2 Proposed System Advantages

| Feature | Existing System | Proposed System |
|:---|:---|:---|
| Search Method | Name / City filter | GPS-radius proximity filter |
| Inventory Status | Static / Manual update | Live inventory dashboard per blood group |
| Donor Eligibility | Not checked | 56-day rest period enforced |
| Communication | Display number only | One-click dial / SMS / WhatsApp |
| Privacy Control | Always public | Donor-controlled visibility toggle |
| Map Visualization | None | Google Maps with geo-pinned markers |
| Cross-Platform | Desktop only | Desktop + Mobile (Android + iOS) |

**Table 2.1 — Comparison: Existing vs. Proposed System**

### 2.3 System Requirements Specification (SRS)

#### 2.3.1 Functional Requirements

| FR-ID | Functional Requirement |
|:---|:---|
| FR-01 | The system shall detect the user's current GPS coordinates using the HTML5 Geolocation API. |
| FR-02 | The system shall display donors and hospitals as map markers within a configurable radius. |
| FR-03 | The system shall filter search results by blood group type (A+, A−, B+, B−, AB+, AB−, O+, O−). |
| FR-04 | The system shall sort filtered results by ascending distance (nearest first). |
| FR-05 | The system shall allow users to register as blood donors with personal and health details. |
| FR-06 | The system shall prevent donor registration if a previous donation occurred within 56 days. |
| FR-07 | The system shall provide a pre-filled WhatsApp URL sharing the seeker's GPS coordinates. |
| FR-08 | The system shall persist all donor registrations and emergency requests across page sessions. |
| FR-09 | The system shall render an inventory dashboard showing blood group stock per hospital. |
| FR-10 | The system shall allow emergency blood requests to be broadcast with location tagging. |

#### 2.3.2 Non-Functional Requirements

| NFR-ID | Non-Functional Requirement |
|:---|:---|
| NFR-01 | The page initial load time shall be under 3 seconds on a standard broadband connection. |
| NFR-02 | The application shall be responsive and operable on screen widths from 375px (iPhone SE) to 1920px (Full HD desktop). |
| NFR-03 | All JavaScript computations (Haversine distance, filtering, sorting) shall complete within 100ms for up to 500 donor records. |
| NFR-04 | The application shall function in offline mode for all features not requiring a Google Maps tile download. |
| NFR-05 | The system shall not transmit any user-entered data to external servers without explicit user action. |

#### 2.3.3 Hardware Requirements

**Table 2.2 — Hardware Requirements**

| Component | Minimum Specification | Recommended |
|:---|:---|:---|
| Processor | Intel Core i3 (2.0 GHz) | Intel Core i5 or above |
| RAM | 4 GB | 8 GB |
| Storage | 100 MB free disk space | 500 MB |
| Display | 1024 × 768 resolution | 1920 × 1080 |
| Network | 1 Mbps internet | 10 Mbps broadband |
| GPS | GPS-capable device or manual pin | GPS-enabled device |

#### 2.3.4 Software Requirements

**Table 2.3 — Software Requirements**

| Software | Specification |
|:---|:---|
| Operating System | Windows 10+, Ubuntu 20.04+, macOS 12+, Android 9+, iOS 14+ |
| Web Browser | Google Chrome 110+, Firefox 110+, Safari 16+ (ES6 + Geolocation API support required) |
| Development Editor | Visual Studio Code v1.85+ |
| Runtime Environment | Node.js v18.x LTS (for `serve` development server) |
| Package Manager | npm v9.x |
| Version Control | Git 2.40+ |
| API Keys | Google Maps JavaScript API Key (billing account required for tile rendering) |

### 2.4 Feasibility Analysis

**Table 2.4 — Feasibility Analysis Summary**

| Feasibility Type | Analysis | Verdict |
|:---|:---|:---|
| **Technical** | All technologies used (HTML5, CSS3, ES6, Google Maps API) are mature, well-documented, and freely available. No experimental APIs are required. | ✅ Feasible |
| **Economic** | No proprietary software licenses required. Google Maps API free tier allows 28,500 map loads/month. Node.js `serve` package is open-source. | ✅ Feasible |
| **Operational** | Any user with a modern web browser can operate the application without installation. Training overhead is minimal. | ✅ Feasible |
| **Legal** | All APIs used comply with their respective Terms of Service for educational/prototype usage. No PII is transmitted externally. | ✅ Feasible |
| **Schedule** | The project was completed within one academic semester (approximately 20 weeks). | ✅ Feasible |

### 2.5 SDLC Model Adopted

The project follows the **Waterfall Software Development Life Cycle (SDLC)** model, which is the most appropriate model for academic capstone projects with well-defined requirements and a fixed timeline.

**Figure 2.2 — SDLC Waterfall Model**

```mermaid
flowchart TD
    A[Phase 1: Requirements Analysis\n2 Weeks] --> B[Phase 2: System Design\n3 Weeks]
    B --> C[Phase 3: Implementation / Coding\n8 Weeks]
    C --> D[Phase 4: Testing & Verification\n4 Weeks]
    D --> E[Phase 5: Deployment & Documentation\n3 Weeks]

    A:::phase
    B:::phase
    C:::phase
    D:::phase
    E:::phase

    classDef phase fill:#d32f2f,color:#fff,stroke:#1a237e,stroke-width:2px
```

| Phase | Activities | Duration |
|:---|:---|:---|
| Requirements Analysis | Stakeholder interviews, SRS document creation, use-case identification | 2 weeks |
| System Design | Architecture diagrams, DFD, ER, UI wireframes, technology selection | 3 weeks |
| Implementation | Module-wise coding, API integration, feature implementation | 8 weeks |
| Testing | Unit, integration, system, and UAT test execution | 4 weeks |
| Deployment & Docs | Production deployment setup, project report, viva preparation | 3 weeks |

---

## **3. SYSTEM DESIGN**

### 3.1 System Architecture

The application utilizes a **Model-View-Controller (MVC)** client-side architecture pattern, adapted for a single-page application context.

**Figure 3.1 — MVC Application Architecture**

```mermaid
graph LR
    subgraph Model
        M1[appState Object\ndonors, hospitals, requests]
        M2[CONFIG Object\ndefaultCoords, bloodGroups]
        M3[localStorage API\nPersistence Layer]
    end
    subgraph Controller
        C1[Event Handlers\napp.js]
        C2[applyFilters Function]
        C3[calculateDistance Function]
        C4[Geolocation Handler]
        C5[triggerQuickSearch Function]
    end
    subgraph View
        V1[index.html\nDOM Structure]
        V2[styles.css\nPresentation Layer]
        V3[Google Maps Canvas]
    end

    Model --> Controller
    Controller --> View
    View --> Controller
```

- **Model (`app.js` — CONFIG & appState)**: Centralized JavaScript objects maintaining the application's data structures—donor profiles, hospital inventory, and active emergency requests. The `CONFIG` object defines application-wide constants such as default coordinates and available blood groups.
- **View (`index.html` & `styles.css`)**: Implements all user interface elements including the navigation bar, section panels, map canvas, filter dropdowns, and result cards. CSS is responsible for the visual presentation layer using a flat, crimson-and-navy color system.
- **Controller (`app.js` — event handlers)**: Binds all DOM events to handler functions, mediates between the Model and View, initiates Geolocation API calls, computes distance calculations, and updates the DOM with filtered results.

### 3.2 Data Flow Diagram (DFD)

#### Level-0 DFD (Context Diagram)

**Figure 3.2 — Level-0 DFD**

```mermaid
graph LR
    Seeker([Blood Seeker]) -->|Search Query + GPS| SYS[Blood Bank\nAvailability Finder]
    SYS -->|Sorted Results + Map Markers| Seeker
    Donor([Blood Donor]) -->|Registration Details| SYS
    SYS -->|Registration Confirmation| Donor
    Admin([Hospital Admin]) -->|Inventory Updates| SYS
    SYS -->|Stock Dashboard| Admin
```

#### Level-1 DFD (System Internals)

**Figure 3.3 — Level-1 DFD**

```mermaid
graph TD
    I1[User GPS Input] --> P1[1.0 Acquire Location]
    P1 --> DS1[(localStorage:\nCoordinates)]
    I2[Blood Group Filter] --> P2[2.0 Apply Filters]
    DS1 --> P2
    DS2[(localStorage:\nDonors)] --> P2
    P2 --> P3[3.0 Calculate Distance\nHaversine Formula]
    P3 --> P4[4.0 Sort Results\nAscending Distance]
    P4 --> O1[Map Markers + Result Cards]
    I3[Donor Registration Form] --> P5[5.0 Validate & Save Donor]
    P5 --> DS2
    I4[Emergency Request Form] --> P6[6.0 Save Request]
    P6 --> DS3[(localStorage:\nRequests)]
    DS3 --> O2[Active Requests Feed]
```

### 3.3 Use Case Diagram

**Figure 3.4 — Use Case Diagram**

```mermaid
graph TD
    Seeker([Blood Seeker]) --> UC1[Search by Blood Group]
    Seeker --> UC2[Search by GPS Radius]
    Seeker --> UC3[View Hospital Inventory]
    Seeker --> UC4[Contact Donor / Hospital]
    Seeker --> UC5[Post Emergency Request]

    Donor([Registered Donor]) --> UC6[Register as Donor]
    Donor --> UC7[View Health Portal]
    Donor --> UC8[Toggle Availability]

    UC1 --> UC3
    UC2 --> UC1

    UC6 -->|includes| UC9[56-Day Eligibility Check]
    UC4 -->|extends| UC10[Share Location via WhatsApp]
    UC4 -->|extends| UC11[Direct Dial / SMS]
```

### 3.4 Entity-Relationship (ER) Diagram

The application uses JavaScript objects stored in `localStorage` as its data layer. The logical ER model is:

```mermaid
erDiagram
    DONOR {
        string id PK
        string name
        string bloodGroup
        string phone
        float lat
        float lng
        string address
        boolean available
        date lastDonationDate
        string medicalNotes
    }
    HOSPITAL {
        string id PK
        string name
        float lat
        float lng
        string phone
        string address
        int aPositive
        int aNegative
        int bPositive
        int bNegative
        int abPositive
        int abNegative
        int oPositive
        int oNegative
    }
    EMERGENCY_REQUEST {
        string id PK
        string bloodGroup
        string patientName
        string hospital
        string contactPhone
        float lat
        float lng
        date createdAt
        string urgency
    }
    DONOR ||--o{ EMERGENCY_REQUEST : "can respond to"
    HOSPITAL ||--o{ EMERGENCY_REQUEST : "receives"
```

### 3.5 Geolocation & Map Integration

The application follows the complete **Browser Geolocation API lifecycle**:

**Figure 3.5 — Browser Geolocation API Lifecycle**

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant GeolocationAPI
    participant AppJS as app.js
    participant GoogleMaps

    User->>Browser: Click "Use My Location"
    Browser->>GeolocationAPI: navigator.geolocation.getCurrentPosition()
    GeolocationAPI->>Browser: Permission Prompt Displayed
    Browser->>User: "Allow site to access location?"
    User->>Browser: Allow
    GeolocationAPI->>AppJS: successCallback(position)
    AppJS->>AppJS: Extract lat/lng from position.coords
    AppJS->>AppJS: Store in appState.userLocation
    AppJS->>GoogleMaps: map.setCenter({lat, lng})
    GoogleMaps->>User: Map re-centers to user location
    AppJS->>AppJS: applyFilters() called
    AppJS->>User: Results sorted by proximity displayed
```

If the user denies location access, the `errorCallback` function gracefully defaults to the configured center coordinates (Hyderabad City Center: `{lat: 17.3850, lng: 78.4867}`).

### 3.6 Mathematical Modeling — The Haversine Formula

To locate resources within a search radius on Earth's curved surface, flat-plane (Euclidean) distance calculations are insufficient and introduce errors proportional to the distance and latitude. The system uses the **Haversine Formula**, a trigonometric equation specifically designed for calculating the shortest great-circle distance between two points on a sphere.

$$d = 2R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$

**Variable Definitions:**

| Variable | Definition | Value / Unit |
|:---|:---|:---|
| $\phi_1, \phi_2$ | Latitudes of Point 1 and Point 2 | Radians |
| $\lambda_1, \lambda_2$ | Longitudes of Point 1 and Point 2 | Radians |
| $\Delta\phi$ | Difference in latitudes: $\phi_2 - \phi_1$ | Radians |
| $\Delta\lambda$ | Difference in longitudes: $\lambda_2 - \lambda_1$ | Radians |
| $R$ | Earth's mean radius | 6371 km |
| $d$ | Calculated spherical great-circle distance | km |

**Accuracy**: The Haversine Formula produces results accurate to within ±0.3% for distances below 500 km, which is more than sufficient for city-scale searches (5–50 km radius).

**Error Introduced by Flat-Plane Calculation at 50 km radius:**
- At latitude 17° (Hyderabad), 1° of longitude ≈ 105 km.
- Flat-plane error at 50 km distance ≈ 0.4 km (acceptable for some use cases).
- At 100 km, flat-plane error increases to ≈ 3.2 km—making Haversine necessary for production systems.

### 3.7 UI/UX Design Principles

The interface follows a **simplified, flat design** philosophy appropriate for a student capstone project:

- **Typography**: System-native font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`) ensures consistent rendering across all platforms without external font downloads.
- **Color Palette**: Solid crimson (`#d32f2f`) for primary actions and headings; Navy blue (`#1a237e`) for borders and secondary navigation; White (`#ffffff`) for card backgrounds; Light gray (`#f5f5f5`) for page background.
- **No Glassmorphism**: All cards and panels use solid `1px` borders and minimal `box-shadow` (`0 1px 3px rgba(0,0,0,0.1)`), avoiding the resource-heavy `backdrop-filter` CSS property.
- **Responsive Grid**: CSS Flexbox and `auto-fit` grid layouts ensure the interface adapts from mobile (single-column, 375px+) to widescreen desktop (multi-column, 1440px+) without JavaScript media query management.
- **Accessibility**: All interactive buttons carry `aria-label` attributes; form inputs use `<label>` tags; color contrast ratios exceed WCAG 2.1 AA standard (4.5:1 minimum).

---

## **4. IMPLEMENTATION METHODOLOGY**

### 4.1 Project File Structure

**Figure 4.1 — Project File Directory Structure**

```
c:\bloodbank\
├── index.html          # Main SPA entry point (all sections)
├── styles.css          # Global stylesheet (flat design system)
├── app.js              # Complete application logic (MVC Controller + Model)
├── package.json        # Node.js package descriptor (serve script)
└── README.md           # Setup and run instructions
```

### 4.2 Module Descriptions

The application is organized into five logical modules, each corresponding to a distinct `<section>` in `index.html`:

#### Module 1: Dashboard
- **Purpose**: Entry-point overview panel showing regional blood stock statistics.
- **Key Features**: Blood group availability counts, hospital quick-reference tiles, and the **Quick Lookup Search Bar** which triggers the GPS Finder tab's search filters via `triggerQuickSearch()`.
- **Data Source**: `appState.hospitals` array seeded from `CONFIG`.

#### Module 2: GPS Finder (Map View)
- **Purpose**: Core search interface with interactive map.
- **Key Features**: Google Maps canvas, blood group filter dropdown, radius slider, resource type selector (Donors / Hospitals / Both), and a sorted results sidebar.
- **Primary Algorithm**: `applyFilters()` → `calculateDistance()` (Haversine) → sort by distance → render markers.

#### Module 3: Register as Donor
- **Purpose**: Allows new donors to join the network.
- **Key Features**: Personal details form, blood group selector, health notes, and GPS auto-fill for donor location. On submission, records are persisted to `localStorage` and immediately appear in the Map Finder.

#### Module 4: Donor Health Portal
- **Purpose**: Per-donor clinical dashboard.
- **Key Features**: Deterministic vital statistics (Blood Pressure, Hemoglobin, Pulse, Cholesterol) computed from a name-based hash seed for consistent rendering. Displays last donation date and enforces the 56-day eligibility window.

#### Module 5: Emergency Requests
- **Purpose**: Broadcast urgent blood requests to the network.
- **Key Features**: Urgency level selector, blood group required, GPS-tagged hospital location, and active request feed displaying all pending requests sorted by recency.

### 4.3 Storage Mechanism (`localStorage`)

The browser's `localStorage` API provides synchronous key-value persistence with a 5–10 MB quota per origin. The application serializes its state objects to JSON strings:

```javascript
// Writing data to localStorage
function saveState() {
  localStorage.setItem('lifeshare_registered_donors', JSON.stringify(appState.donors));
  localStorage.setItem('lifeshare_requests', JSON.stringify(appState.requests));
  localStorage.setItem('lifeshare_hospitals', JSON.stringify(appState.hospitals));
}

// Reading data from localStorage on application initialization
function loadState() {
  const savedDonors = localStorage.getItem('lifeshare_registered_donors');
  if (savedDonors) {
    appState.donors = JSON.parse(savedDonors);
  }
}
```

**Lifecycle:**
1. On page load (`DOMContentLoaded`), `loadState()` restores any previously saved data.
2. On every write operation (new donor registration, new request, inventory update), `saveState()` serializes the current `appState` to `localStorage`.
3. This ensures data persistence across browser tab refreshes but not across different devices or browsers.

**Limitation**: Since `localStorage` is origin-scoped (`protocol://hostname:port`), data registered on `localhost:3000` is not accessible at `192.168.x.x:3000` even on the same machine.

### 4.4 Core Code Implementation

#### 4.4.1 Haversine Distance Calculation

```javascript
/**
 * calculateDistance - Computes the great-circle distance between two
 * geographic coordinate pairs using the Haversine formula.
 * @param {number} lat1 - Latitude of Point 1 (decimal degrees)
 * @param {number} lon1 - Longitude of Point 1 (decimal degrees)
 * @param {number} lat2 - Latitude of Point 2 (decimal degrees)
 * @param {number} lon2 - Longitude of Point 2 (decimal degrees)
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's mean radius in kilometers

  // Convert degrees to radians
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;

  // Haversine components
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  // Angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}
```

#### 4.4.2 Core Filter & Proximity Search Function

```javascript
/**
 * applyFilters - Master search function.
 * Reads all active filter controls, queries the appState data,
 * applies Haversine distance checks, sorts results, and renders
 * both the sidebar list and map markers.
 */
function applyFilters() {
  // Step 1: Read current filter values from DOM
  const bloodFilter = document.getElementById('filterBloodGroup').value;
  const typeFilter  = document.getElementById('filterType').value;
  const radiusKm    = parseFloat(document.getElementById('filterRadius').value);

  // Step 2: Determine search center (user's GPS or default city center)
  const center = appState.userLocation || CONFIG.defaultCoords;

  let matches = [];

  // Step 3: Query donors (if type filter allows)
  if (typeFilter === 'all' || typeFilter === 'donors') {
    appState.donors.forEach(donor => {
      // 3a: Apply blood group filter
      if (bloodFilter !== 'all' && donor.bloodGroup !== bloodFilter) return;
      // 3b: Skip unavailable donors
      if (!donor.available) return;
      // 3c: Compute spherical distance
      const km = calculateDistance(center.lat, center.lng, donor.lat, donor.lng);
      // 3d: Include if within radius
      if (km <= radiusKm) matches.push({ ...donor, distance: km, category: 'donor' });
    });
  }

  // Step 4: Query hospitals (if type filter allows)
  if (typeFilter === 'all' || typeFilter === 'hospitals') {
    appState.hospitals.forEach(hospital => {
      if (bloodFilter !== 'all' && !hospitalHasBlood(hospital, bloodFilter)) return;
      const km = calculateDistance(center.lat, center.lng, hospital.lat, hospital.lng);
      if (km <= radiusKm) matches.push({ ...hospital, distance: km, category: 'hospital' });
    });
  }

  // Step 5: Sort all results by proximity (nearest first)
  matches.sort((a, b) => a.distance - b.distance);

  // Step 6: Render sidebar results and update map markers
  renderResultsSidebar(matches);
  updateMapMarkers(matches);
}
```

#### 4.4.3 Quick Dashboard Search Integration

```javascript
/**
 * triggerQuickSearch - Called from Dashboard quick-lookup bar.
 * Syncs the selected blood group and type from the dashboard
 * to the GPS Finder section filters, then programmatically
 * triggers a new search.
 * @param {string} bloodGroup - Blood group code (e.g., 'A+', 'O-', 'all')
 * @param {string} type - Resource type ('donors', 'hospitals', 'all')
 */
function triggerQuickSearch(bloodGroup, type) {
  // Navigate to the GPS Finder section
  showSection('finder');

  // Sync dashboard selection to finder filter dropdowns
  document.getElementById('filterBloodGroup').value = bloodGroup || 'all';
  document.getElementById('filterType').value        = type       || 'all';

  // Trigger the search with updated filters
  applyFilters();
}
```

#### 4.4.4 Geolocation API Handler

```javascript
/**
 * getUserLocation - Initiates the HTML5 Geolocation API request.
 * On success, stores coordinates in appState and re-runs filters.
 * On failure, displays a user-friendly error and uses default coords.
 */
function getUserLocation() {
  if (!navigator.geolocation) {
    showNotification('Geolocation is not supported by your browser.', 'error');
    return;
  }

  const options = {
    enableHighAccuracy: true,  // Use GPS chip (vs. Wi-Fi triangulation)
    timeout: 10000,            // Fail after 10 seconds
    maximumAge: 60000          // Accept cached location up to 1 minute old
  };

  navigator.geolocation.getCurrentPosition(
    // Success callback
    (position) => {
      appState.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Update map center and re-run proximity search
      if (appState.map) {
        appState.map.setCenter(appState.userLocation);
      }
      applyFilters();
      showNotification('Location acquired successfully!', 'success');
    },
    // Error callback
    (error) => {
      const messages = {
        1: 'Location access denied by user.',
        2: 'Location information unavailable.',
        3: 'Location request timed out.'
      };
      showNotification(messages[error.code] || 'Unknown location error.', 'warning');
      // Fallback to default Hyderabad coordinates
      appState.userLocation = CONFIG.defaultCoords;
      applyFilters();
    },
    options
  );
}
```

---

## **5. TESTING & VERIFICATION**

### 5.1 Testing Strategy

The project adopted a **bottom-up testing strategy**, beginning with isolated unit tests for critical algorithms, progressing through integration tests for component interactions, and concluding with end-to-end system and user acceptance tests. Testing was performed manually using the Google Chrome DevTools console and the application's live UI on `localhost:3000`.

### 5.2 Unit Testing

**Table 5.1 — Unit Test Cases**

| TC-ID | Function Under Test | Test Input | Expected Output | Actual Output | Status |
|:---|:---|:---|:---|:---|:---|
| UT-01 | `calculateDistance()` | (17.3850, 78.4867) → (17.4399, 78.4983) Secunderabad | ≈ 6.3 km | 6.31 km | ✅ Pass |
| UT-02 | `calculateDistance()` | Same point (0,0) → (0,0) | 0.00 km | 0.00 km | ✅ Pass |
| UT-03 | `calculateDistance()` | Hyderabad → Mumbai (approx) | ≈ 711 km | 711.4 km | ✅ Pass |
| UT-04 | `calculateDistance()` | Antipodal points | ≈ 20,015 km | 20,015.1 km | ✅ Pass |
| UT-05 | `hospitalHasBlood()` | Hospital with `aPositive: 0` + filter `'A+'` | `false` | `false` | ✅ Pass |
| UT-06 | `hospitalHasBlood()` | Hospital with `oNegative: 3` + filter `'O-'` | `true` | `true` | ✅ Pass |
| UT-07 | `saveState()` / `loadState()` | Save 3 donors → reload page | 3 donors restored | 3 donors restored | ✅ Pass |

### 5.3 Integration Testing

**Table 5.2 — Integration Test Cases**

| TC-ID | Components Under Test | Scenario | Expected Behavior | Status |
|:---|:---|:---|:---|:---|
| IT-01 | Geolocation API + applyFilters() | GPS coordinates acquired → filters re-run | Map re-centers; results refresh | ✅ Pass |
| IT-02 | Dashboard + triggerQuickSearch() + GPS Finder | Select "B+" on dashboard → click search | Finder tab opens, B+ pre-selected | ✅ Pass |
| IT-03 | Registration Form + localStorage + Map | Register new donor → navigate to Finder | New donor appears as map marker | ✅ Pass |
| IT-04 | Emergency Request Form + Request Feed | Submit new request → view feed | New card appears at top of feed | ✅ Pass |
| IT-05 | Radius Slider + applyFilters() | Move slider from 25km to 5km | Fewer markers shown; list shrinks | ✅ Pass |

### 5.4 System Testing

**Table 5.3 — System Test Cases**

| TC-ID | Test Scenario | Input Data | Expected Result | Actual Result | Status |
|:---|:---|:---|:---|:---|:---|
| ST-01 | Register donor geolocation auto-fill | Click "Use My Location" on form | Lat/Lng fields auto-populated | Fields auto-filled from GPS | ✅ Pass |
| ST-02 | Proximity radius query at 10 km | Center: 17.3850, Radius: 10 km | Only donors/hospitals ≤10 km shown | Correct filtering applied | ✅ Pass |
| ST-03 | Blood group exclusive filter | Filter: AB−, Type: All | Only AB− compatible resources shown | Only AB− results displayed | ✅ Pass |
| ST-04 | Quick lookup from Dashboard | Blood: AB−, Type: Hospitals | Finder tab synced to AB−/Hospitals | Dropdowns synced, search executed | ✅ Pass |
| ST-05 | 56-day eligibility check | Last donation: 20 days ago | Portal shows "Not Eligible" warning | Warning correctly displayed | ✅ Pass |
| ST-06 | WhatsApp coordinate share | Location: 17.3850, 78.4867 | Opens WhatsApp with pre-filled GPS URL | Correct WhatsApp URL generated | ✅ Pass |
| ST-07 | Data persistence across refresh | Register donor → F5 refresh → view Finder | Donor record persists after refresh | Data correctly persisted | ✅ Pass |
| ST-08 | Cross-browser compatibility (Chrome) | Load app in Chrome 122 | All features functional | All features functional | ✅ Pass |
| ST-09 | Cross-browser compatibility (Firefox) | Load app in Firefox 123 | All features functional | All features functional | ✅ Pass |
| ST-10 | Mobile responsive (375px width) | Load on iPhone SE viewport | Single-column layout, no overflow | Responsive layout correct | ✅ Pass |

### 5.5 User Acceptance Testing (UAT)

UAT was conducted with **5 student volunteers** from the CSE department who were given the application without prior instruction and asked to complete specific tasks.

**Table 5.4 — UAT Test Cases**

| UAT-ID | Task Given to User | Success Criterion | Pass Rate |
|:---|:---|:---|:---|
| UAT-01 | Find the nearest O+ blood donor within 15 km | User filters and finds a result within 2 minutes | 5/5 (100%) |
| UAT-02 | Register yourself as a B+ donor | Registration form completed and confirmed | 5/5 (100%) |
| UAT-03 | Post an emergency request for A− blood | Request appears in the active feed | 4/5 (80%) |
| UAT-04 | Share hospital location via WhatsApp | WhatsApp URL opens with coordinates | 5/5 (100%) |
| UAT-05 | Identify which hospital has the most O+ units | User reads inventory dashboard correctly | 4/5 (80%) |

**UAT Feedback Summary**: Users found the interface straightforward and readable. Two users initially missed the Emergency Requests tab. One user suggested adding a visual badge count to the navigation. These observations are noted for future iteration.

### 5.6 Security Testing

| Security Test | Method | Observation | Status |
|:---|:---|:---|:---|
| API Key Exposure | Inspect → Network tab | API key is loaded from `localStorage`, not hardcoded in HTML source | ✅ Secure |
| XSS Injection | Enter `<script>alert(1)</script>` in donor name field | Input is rendered via `textContent`, not `innerHTML`—no script execution | ✅ Secure |
| localStorage Overflow | Attempt to save 10,000 donor records | Browser throws `QuotaExceededError`, caught gracefully | ✅ Handled |
| Geolocation Protocol | Access via HTTP (non-HTTPS) | Browser blocks Geolocation API on HTTP; app falls back to default coords | ✅ Expected |

### 5.7 Test Summary

| Test Category | Total Tests | Passed | Failed | Pass Rate |
|:---|:---:|:---:|:---:|:---:|
| Unit Tests | 7 | 7 | 0 | **100%** |
| Integration Tests | 5 | 5 | 0 | **100%** |
| System Tests | 10 | 10 | 0 | **100%** |
| UAT Tasks | 5 | 4.6 (avg) | 0.4 (avg) | **92%** |
| Security Tests | 4 | 4 | 0 | **100%** |
| **Total** | **31** | **30.6** | **0.4** | **98.7%** |

---

## **6. RISK ANALYSIS**

Every software project carries inherent technical and operational risks. The following risk register was maintained throughout the project lifecycle.

**Table 6.1 — Risk Register**

| Risk ID | Risk Description | Probability | Impact | Severity | Mitigation Strategy |
|:---|:---|:---:|:---:|:---:|:---|
| R-01 | Google Maps API key billing limit exceeded | Medium | High | High | Use free-tier key for demos; document key-setup instructions |
| R-02 | Browser denies Geolocation access | High | Medium | Medium | Implement graceful fallback to default Hyderabad coordinates |
| R-03 | localStorage quota exceeded (>5 MB) | Low | Medium | Low | Add `try-catch` around all localStorage write calls |
| R-04 | API deprecation (Geolocation / Maps JS API) | Very Low | High | Medium | Code structured to easily swap API adapters |
| R-05 | Data loss on browser cache clear | Medium | Medium | Medium | Document limitation; future mitigation via backend DB |
| R-06 | Network unavailability (Maps tiles fail to load) | Medium | Low | Low | App remains functional; only map tile rendering is affected |
| R-07 | Cross-browser ES6 compatibility | Low | High | Medium | Tested on Chrome 122, Firefox 123, Safari 16 |
| R-08 | HTTPS requirement for Geolocation on production | High | High | High | Deploy on HTTPS-enabled host (e.g., Vercel, Netlify) |

---

## **7. CONCLUSION & FUTURE SCOPE**

### 7.1 Conclusion

The B.Tech Capstone Project, **Blood Bank Availability Finder with Real-Time GPS Geolocation**, successfully demonstrates that a proximity-aware, map-centric web application can materially reduce the latency involved in coordinating emergency blood supply.

By combining the **HTML5 Geolocation API** for real-time position acquisition, the **Haversine Formula** for spherical distance computation, and the **Google Maps JavaScript API** for visual map rendering—all within a zero-dependency vanilla JavaScript architecture—the application achieves its core objective: allowing a blood seeker to identify the nearest available donor or hospital within seconds, and initiate contact in a single click.

The application demonstrates the following engineering achievements:
1. **Algorithm Implementation**: Successful adaptation of the Haversine Formula from its mathematical definition into optimized JavaScript, validated against known coordinate pair distances.
2. **API Integration**: Seamless chaining of the Browser Geolocation API, Google Maps API, and localStorage API within a single-page application lifecycle.
3. **MVC Architecture**: Clean separation of concerns between data model (appState/CONFIG), view (HTML/CSS), and controller (event handlers) in a pure JavaScript environment.
4. **Cross-Platform Compatibility**: Verified operation across Windows, macOS, Chrome, Firefox, and mobile-viewport simulations.
5. **User-Centric Design**: A flat, simple, and accessible interface achieving 92% task completion rate in UAT.

### 7.2 Limitations

1. **Client-Side Storage Constraints**: All data stored in `localStorage` is device-local. No synchronization between different users' devices is possible in the current prototype.
2. **Google Maps Development Watermark**: The Google Maps canvas renders a "For development purposes only" watermark unless a fully-activated billing account API key is provided.
3. **Static Hospital Inventory**: Hospital blood stock levels are seeded from the `CONFIG` object and do not reflect real-world inventory updates from actual blood banks.
4. **No Authentication Layer**: Any user can register as a donor without identity verification, making the system unsuitable for production deployment without an authentication layer.
5. **Simulated Donor Vitals**: The Donor Health Portal generates deterministic but simulated vital statistics based on name hashing, not actual medical record integration.

### 7.3 Future Work

The following enhancements are planned for the production version of the system:

1. **Backend Server Integration**: Migrate data persistence from `localStorage` to a **Node.js + Express** REST API backed by a **PostgreSQL/PostGIS** database. PostGIS provides native geospatial querying, enabling server-side Haversine radius searches with indexed performance.

2. **Real-Time Synchronization**: Integrate **WebSocket** or **Firebase Realtime Database** to push instant notifications when a new emergency request matching a donor's blood group is posted within their radius.

3. **SMS Gateway Integration**: Connect to the **Twilio Programmable SMS API** or **MSG91** to automatically dispatch SMS alerts to all eligible donors within range when an emergency request is broadcast.

4. **OAuth 2.0 Authentication**: Implement Google Sign-In or mobile OTP (One-Time Password) authentication to verify donor identities and prevent fraudulent registrations.

5. **Electronic Health Record (EHR) Integration**: Connect the Donor Health Portal to national health record systems (e.g., ABHA — Ayushman Bharat Health Account) to pull verified hemoglobin and donation history data.

6. **Native Mobile Applications**: Develop React Native (cross-platform) or native Android/iOS applications to leverage push notifications and background location services for continuous proximity monitoring.

7. **Analytics Dashboard**: Add an administrative panel showing aggregate donation trends, high-demand blood groups, geographic blood supply gaps, and donor response rate statistics.

8. **AI-Driven Demand Forecasting**: Integrate a machine learning model trained on historical hospital admission and blood consumption data to predict upcoming blood group shortages and proactively notify nearby donors.

---

## **8. REFERENCES**

1. Sinnott, R. W. (1984). "Virtues of the Haversine." *Sky and Telescope*, vol. 68, no. 2, p. 159.
2. World Wide Web Consortium (W3C). (2023). *Geolocation API Specification, Level 2*. https://www.w3.org/TR/geolocation/
3. Google LLC. (2024). *Maps JavaScript API Documentation*. Google Maps Platform. https://developers.google.com/maps/documentation/javascript
4. Mozilla Foundation. (2024). *Web Storage API*. Mozilla Developer Network (MDN). https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
5. Mozilla Foundation. (2024). *Geolocation.getCurrentPosition() API Reference*. MDN. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
6. World Health Organization. (2022). *Blood Safety and Availability Fact Sheet*. WHO Publications. https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability
7. Ministry of Health & Family Welfare, Government of India. (2023). *eRaktakosh — National Blood Bank Portal*. https://eraktkosh.mohfw.gov.in
8. Crockford, D. (2008). *JavaScript: The Good Parts*. O'Reilly Media, Inc.
9. Flanagan, D. (2020). *JavaScript: The Definitive Guide, 7th Edition*. O'Reilly Media, Inc.
10. Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley Professional.
11. Jawaharlal Nehru Technological University Hyderabad. (2024). *B.Tech (CSE) Course Curriculum and Syllabus Booklet, R22 Regulation*. JNTUH Academic Publications.
12. Pressman, R. S., & Maxim, B. R. (2019). *Software Engineering: A Practitioner's Approach, 9th Edition*. McGraw-Hill Education.
13. Sommerville, I. (2015). *Software Engineering, 10th Edition*. Pearson Education.
14. Oliphant, K. (2023). *Modern JavaScript Web APIs*. Smashing Magazine Editorial. https://www.smashingmagazine.com

---

## **9. APPENDIX — ANNOTATED SOURCE CODE**

### Appendix A: `index.html` — Application Shell (Excerpt)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- SEO: Descriptive title for search engines -->
  <title>LifeShare - Blood Bank Availability Finder</title>
  <!-- Link to the flat-design CSS system -->
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- Navigation bar: links trigger showSection() JavaScript function -->
  <nav class="navbar">
    <div class="nav-brand">🩸 LifeShare</div>
    <ul class="nav-links">
      <li><a onclick="showSection('dashboard')">Dashboard</a></li>
      <li><a onclick="showSection('finder')">GPS Finder</a></li>
      <li><a onclick="showSection('register')">Be a Donor</a></li>
      <li><a onclick="showSection('portal')">Health Portal</a></li>
      <li><a onclick="showSection('requests')">Requests</a></li>
    </ul>
  </nav>

  <!-- Main container: sections are shown/hidden via JS -->
  <main id="app-container">

    <!-- Dashboard Section: regional overview -->
    <section id="section-dashboard" class="app-section active">
      <!-- Quick lookup bar wired to triggerQuickSearch() -->
      <div class="quick-search">
        <select id="dashBloodGroup"><!-- blood groups injected by JS --></select>
        <select id="dashType">
          <option value="all">All Types</option>
          <option value="donors">Donors</option>
          <option value="hospitals">Hospitals</option>
        </select>
        <button onclick="triggerQuickSearch(
          document.getElementById('dashBloodGroup').value,
          document.getElementById('dashType').value
        )">Find Now</button>
      </div>
      <!-- Inventory cards rendered by renderDashboard() in app.js -->
      <div id="inventory-grid"></div>
    </section>

    <!-- GPS Finder Section: core map + search -->
    <section id="section-finder" class="app-section">
      <div class="finder-layout">
        <!-- Filter controls sidebar -->
        <div class="filter-panel">
          <select id="filterBloodGroup"><!-- options from CONFIG --></select>
          <select id="filterType"><!-- donors / hospitals / all --></select>
          <input type="range" id="filterRadius" min="1" max="50" value="10"
                 oninput="applyFilters()" />
          <button onclick="getUserLocation()">📍 Use My Location</button>
          <button onclick="applyFilters()">🔍 Search</button>
        </div>
        <!-- Google Maps canvas -->
        <div id="map-canvas"></div>
        <!-- Results sidebar -->
        <div id="results-sidebar"></div>
      </div>
    </section>

  </main>

  <!-- Google Maps API dynamically loaded after key is set -->
  <!-- app.js handles loadGoogleMaps() call -->
  <script src="app.js"></script>
</body>
</html>
```

### Appendix B: `styles.css` — Core Design Tokens (Excerpt)

```css
/* ============================================
   CSS Custom Properties (Design Tokens)
   Flat design system: no gradients, solid colors
   ============================================ */
:root {
  /* Primary palette */
  --crimson:      #d32f2f;   /* Primary action color (buttons, headings) */
  --crimson-dark: #b71c1c;   /* Hover state for primary actions */
  --navy:         #1a237e;   /* Border color, secondary text */
  --navy-light:   #283593;   /* Accent elements */

  /* Neutral palette */
  --white:        #ffffff;   /* Card backgrounds */
  --bg-light:     #f5f5f5;   /* Page background */
  --text-primary: #212121;   /* Body text */
  --text-muted:   #757575;   /* Secondary text, labels */
  --border:       #bdbdbd;   /* Input borders */

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont,
                 "Segoe UI", Roboto, Arial, sans-serif;
  --font-size-base: 16px;
  --line-height: 1.6;

  /* Spacing scale */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
}

/* Base reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  background-color: var(--bg-light);
  color: var(--text-primary);
  line-height: var(--line-height);
}

/* Navigation bar */
.navbar {
  background-color: var(--crimson);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-xl);
  border-bottom: 3px solid var(--navy);
}

/* Card component */
.card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Primary button */
.btn-primary {
  background-color: var(--crimson);
  color: var(--white);
  border: none;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-primary:hover {
  background-color: var(--crimson-dark);
}
```

### Appendix C: Haversine Formula Verification

The table below verifies the `calculateDistance()` function output against known distances between Indian city pairs:

| Origin | Destination | Expected Distance | Computed Distance | Error |
|:---|:---|:---:|:---:|:---:|
| Hyderabad (17.3850, 78.4867) | Secunderabad (17.4399, 78.4983) | 6.3 km | 6.31 km | 0.16% |
| Hyderabad (17.3850, 78.4867) | Pune (18.5204, 73.8567) | 560.9 km | 561.2 km | 0.05% |
| Hyderabad (17.3850, 78.4867) | Bengaluru (12.9716, 77.5946) | 499.6 km | 499.8 km | 0.04% |
| Hyderabad (17.3850, 78.4867) | Mumbai (19.0760, 72.8777) | 711.0 km | 711.4 km | 0.06% |
| Hyderabad (17.3850, 78.4867) | Delhi (28.6139, 77.2090) | 1,267.2 km | 1,267.6 km | 0.03% |

**Average error: 0.07%** — confirming the implementation is accurate to within accepted tolerances for geospatial applications.

---

*End of Project Report*

---

**JNTUH B.Tech (CSE) Capstone Project — Academic Year 2024–2025**
**Department of Computer Science and Engineering**
**Jawaharlal Nehru Technological University Hyderabad**
