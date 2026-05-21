# Advanced AI Demand Forecasting — v2.0

A full-stack AI-powered demand forecasting platform with advanced analytics, multi-model ML forecasting, admin panel, notifications, and enhanced UI/UX.

---

## What's New in v2.0

### Advanced Forecasting Enhancements
- **4 ML Models**: Linear Regression, Random Forest, XGBoost (Gradient Boosting fallback), ARIMA
- **Model Comparison**: Side-by-side accuracy, MAE, RMSE, R² comparison table + chart
- **Forecast History**: Full paginated history with model, category, region, accuracy
- **Prediction Metrics**: MAE, RMSE, R² Score, Accuracy % stored per forecast
- **Filters**: Category, Region per forecast run

### Admin Panel Module
- **Admin Dashboard**: KPI cards, API calls chart, model usage pie chart, storage meter
- **User Management**: List, search, activate/deactivate, delete users
- **System Analytics Tab**: Model performance over time, response times, error rates
- **Recent Activity Monitor**: All user actions tracked in real-time

### Notifications Module
- **In-app notification bell** in the Navbar with unread badge counter
- **Notification dropdown**: Quick preview, mark read, mark all read
- **Full Notifications page**: Filter by type (success/error/warning/info/unread)
- **Auto-triggered notifications** on: forecast complete, dataset upload, upload fail, report ready, stock alert

### Dashboard Enhancements
- **Filters**: Date Range, Product Category, Region — all live-filtered
- **Advanced Charts**: Area chart (sales vs forecast), Pie chart (region), multi-line AI forecast
- **Recent Forecasting Activity** section with status badges
- **Collapsible Sidebar** for more screen real estate

###  API Enhancements
- **Pagination** on all list endpoints (datasets, reports, forecasts, notifications, users)
- **Search & Filter** query params on datasets, reports, users
- **Full CRUD** on datasets and notifications
- **Model comparison endpoint** `/forecast/compare`
- **Forecast history endpoint** `/forecast/history`

###  Frontend Enhancements
- **Collapsible sidebar** with icon-only collapsed state
- **Sticky Navbar** with notification dropdown
- **Loading states** and button feedback on all async actions
- **Drag-and-drop** CSV upload zone
- **Mobile-responsive** grid layouts
- **Settings tabs**: Profile, Notifications, API Settings, Security

### Reports & Export
- **Detailed table view** with month, sales, forecast, growth, profit, category, region
- **PDF export** with styled autoTable (violet header)
- **Excel export** via SheetJS
- **Saved reports library** with quick download buttons
- **Report detail modal** on click

### Database Enhancements
- **Indexed columns** on all frequently queried fields (email, role, created_at, is_read)
- **Enriched models**: Dataset (category, region, file_size, columns_list), Forecast (mae, rmse, r2, category, region), Report (date_from, date_to, growth_rate), Notification (type, is_read), User (is_active, last_login)

---


##  Setup Instructions

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure MySQL in app/core/config.py
# Default: mysql+pymysql://root:3256@localhost:3306/demand_forecasting

# Start server
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend

npm install
npm run dev
```

App: http://localhost:5173

---

##  Demo Login

Use any email/password — the demo accepts all credentials.

- `admin@example.com` → Admin role
- `manager@example.com` → Manager role  
- Anything else → Analyst role

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Recharts |
| Backend | FastAPI, Python 3.11+ |
| ML | scikit-learn, pandas, numpy |
| Auth | JWT (python-jose), bcrypt |
| Database | SQLAlchemy + MySQL |
| Export | jsPDF, jspdf-autotable, SheetJS |
| Charts | Recharts (Line, Bar, Area, Pie, Radar) |

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login, get JWT |
| GET | /datasets/ | List datasets (paginated, filterable) |
| POST | /datasets/upload | Upload CSV dataset |
| GET | /forecast/linear | Linear Regression forecast |
| GET | /forecast/random-forest | Random Forest forecast |
| GET | /forecast/xgboost | XGBoost forecast |
| GET | /forecast/arima | ARIMA forecast |
| GET | /forecast/compare | Compare all 4 models |
| GET | /forecast/history | Paginated forecast history |
| GET | /analytics/summary | Full dashboard analytics |
| GET | /analytics/sales-trends | Monthly trends (filterable) |
| GET | /reports/ | List reports (paginated) |
| POST | /reports/generate | Generate new report |
| GET | /admin/dashboard | Admin KPIs |
| GET | /admin/users | All users (paginated) |
| PUT | /admin/users/{id}/toggle | Toggle user status |
| GET | /notifications/ | Get notifications |
| PUT | /notifications/{id}/read | Mark as read |
| PUT | /notifications/read-all | Mark all read |
