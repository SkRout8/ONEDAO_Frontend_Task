import React, { useState } from "react";
import {
  LayoutGrid,
  ClipboardList,
  Users,
  Car,
  UserCircle2,
  Clock3,
  Map,
  GitBranch,
  ShieldCheck,
  Settings,
  Menu,
  LogOut,
  Folder,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

/* ---------- Mock data ---------- */
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "rides", label: "Rides", icon: UserCircle2 },
  { id: "clients", label: "Clients", icon: Users },
  { id: "drivers", label: "Drivers", icon: Car },
  { id: "shift", label: "Shift", icon: Clock3 },
  { id: "live-map", label: "Live map", icon: Map },
  { id: "car-classes", label: "Car classes", icon: Car },
  { id: "branches", label: "Branches", icon: GitBranch },
  { id: "moderators", label: "Moderators", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

const kbCards = [
  { id: "total-orders", label: "Total Orders", bg: "#E9EEFF", chip: "#4C6FFF" },
  { id: "total-earnings", label: "Total Earnings", bg: "#FFE4E6", chip: "#FF6B7A" },
  { id: "profit", label: "Profit", bg: "#FFE9D6", chip: "#FFA24B" },
  { id: "expenses", label: "Expenses", bg: "#DAF5E6", chip: "#3CCB7F" },
];

const drivers = [
  { name: "Maharrm Hasanli", phone: "+998 (99) 436-46-15", orders: 5, income: "$ 98", img: "https://i.pravatar.cc/80?img=12" },
  { name: "Gina Garza", phone: "+998 (99) 158-10-15", orders: 5, income: "$ 15", img: "https://i.pravatar.cc/80?img=47" },
  { name: "Brian Reed", phone: "+998 (95) 489-46-20", orders: 5, income: "$ 23", img: "https://i.pravatar.cc/80?img=13" },
  { name: "Tammy Spencer", phone: "+998 (95) 785-10-02", orders: 5, income: "$ 98", img: "https://i.pravatar.cc/80?img=45" },
  { name: "Joseph Brooks", phone: "+998 (99) 436-46-15", orders: 5, income: "$ 98", img: "https://i.pravatar.cc/80?img=15" },
  { name: "Juan Steward", phone: "+998 (99) 436-46-15", orders: 5, income: "$ 98", img: "https://i.pravatar.cc/80?img=52" },
];

const chartData = [
  { m: "Jan", avg: 30, exam: 45 },
  { m: "Feb", avg: 55, exam: 60 },
  { m: "Mar", avg: 70, exam: 50 },
  { m: "Apr", avg: 62, exam: 40 },
  { m: "May", avg: 45, exam: 55 },
  { m: "Jun", avg: 40, exam: 65 },
  { m: "Jul", avg: 38, exam: 60 },
  { m: "Aug", avg: 30, exam: 45 },
  { m: "Sep", avg: 45, exam: 70 },
  { m: "Oct", avg: 62, exam: 75 },
  { m: "Nov", avg: 70, exam: 80 },
  { m: "Dec", avg: 78, exam: 88 },
];

const tableRows = [
  {
    id: 1,
    user: "Sierra Ferguson",
    phone: "+998 (99) 436-46-15",
    comfort: "simple",
    time: "04.12.2021 20:30",
    start: "пл. Беш Агач, Furkat Street, Tashkent, Oʻzbekiston",
    finish: "пл. Беш Агач, Furkat Street, Tashkent, Oʻzbekiston",
    income: "50 300 000 SUM",
    img: "https://i.pravatar.cc/80?img=32",
  },
  {
    id: 2,
    user: "Sierra Ferguson",
    phone: "+998 (99) 436-46-15",
    comfort: "otra",
    time: "04.12.2021 20:24",
    start: "21 Hamidulla Oripov koʻchasi, Тошкент, Oʻzbekiston",
    finish: "21 Hamidulla Oripov koʻchasi, Тошкент, Oʻzbekiston",
    income: "300 000 SUM",
    img: "https://i.pravatar.cc/80?img=44",
  },
  {
    id: 3,
    user: "Sierra Ferguson",
    phone: "+998 (99) 436-46-15",
    comfort: "convenient",
    time: "04.12.2021 20:23",
    start: "76 Фарғона Йўли, Тошкент, Oʻzbekiston",
    finish: "76 Фарғона Йўли, Тошкент, Oʻzbekiston",
    income: "5 300 000 SUM",
    img: "https://i.pravatar.cc/80?img=48",
  },
  {
    id: 4,
    user: "Sierra Ferguson",
    phone: "+998 (99) 436-46-15",
    comfort: "convenient",
    time: "17.11.2021 12:19",
    start: "13 Kumarik koʻchasi, Tashkent 100167, Oʻzbekiston",
    finish: "13 Kumarik koʻchasi, Tashkent 100167, Oʻzbekiston",
    income: "500 300 000 SUM",
    img: "https://i.pravatar.cc/80?img=25",
  },
  {
    id: 5,
    user: "Sierra Ferguson",
    phone: "+998 (99) 436-46-15",
    comfort: "convenient",
    time: "04.12.2021 20:30",
    start: "1 Kuyi Talarik koʻchasi, Тошкент 100091, Oʻzbekiston",
    finish: "1 Kuyi Talarik koʻchasi, Тошкент 100091, Oʻzbekiston",
    income: "50 300 000 SUM",
    img: "https://i.pravatar.cc/80?img=41",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-dark text-white p-2 rounded shadow" style={{ fontSize: '12px' }}>
      <div className="fw-semibold">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="d-flex align-items-center gap-2">
          <span
            className="d-inline-block rounded-circle"
            style={{ width: '8px', height: '8px', backgroundColor: p.color }}
          />
          <span className="text-capitalize">{p.dataKey}:</span>
          <span className="fw-medium">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [allSelected, setAllSelected] = useState(false);

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
      setAllSelected(false);
    } else {
      setSelectedRows(tableRows.map((r) => r.id));
      setAllSelected(true);
    }
  };

  return (
    <div data-testid="dashboard-root" className="bg-light min-vh-100  ">
      <div className="container-fluid p-0">
        <div className="bg-white  shadow overflow-hidden">
          <div className="row g-0">
            {/* Sidebar */}
            <aside 
              data-testid="dashboard-sidebar" 
              className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3"
              style={{ minHeight: '100vh' }}
            >
              {/* Profile */}
              <div className="d-flex align-items-center gap-3 pb-3 border-bottom border-secondary">
                <img
                  src="https://i.pravatar.cc/80?img=12"
                  alt="Maharram"
                  className="rounded-circle object-fit-cover"
                  style={{ width: '48px', height: '48px' }}
                />
                <div>
                  <div className="fw-semibold">Maharram</div>
                  <div className="text-white-50 small">+998 (99) 436-46-15</div>
                </div>
              </div>

              <div className="mt-4 mb-2 small text-white-50 text-uppercase tracking-wide">
                Main Menu
              </div>

              <nav className="nav flex-column gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      data-testid={`sidebar-item-${item.id}`}
                      onClick={() => setActive(item.id)}
                      className={`nav-link text-start d-flex align-items-center gap-3 rounded-3 ${
                        isActive 
                          ? 'bg-white text-primary fw-semibold' 
                          : 'text-white-50 hover-bg-light'
                      }`}
                      style={{ 
                        padding: '10px 12px',
                        transition: 'all 0.2s',
                        background: isActive ? 'white' : 'transparent',
                        color: isActive ? '#4C6FFF' : 'rgba(255,255,255,0.7)',
                        border: 'none'
                      }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
              {/* Top Bar */}
              <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <button
                    data-testid="menu-toggle"
                    className="btn btn-light rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px' }}
                  >
                    <Menu size={20} />
                  </button>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="text-secondary" style={{ fontSize: '22px' }}>Good morning,</span>
                    <span className="fw-semibold" style={{ fontSize: '22px' }}>Maharram</span>
                    <span style={{ fontSize: '24px' }}>👋</span>
                  </div>
                  <div className="d-none d-md-block text-secondary small ms-3">
                    you have <span className="text-primary fw-medium">1 new message</span>
                  </div>
                </div>
                <button
                  data-testid="logout-btn"
                  className="btn btn-dark rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <LogOut size={16} />
                </button>
              </div>

              {/* Grid: Left + Right */}
              <div className="row g-4">
                {/* Left Column */}
                <div className="col-12 col-xl-8">
                  {/* Knowledge Base */}
                  <h2 className="h4 fw-semibold mb-3">Knowledge base</h2>
                  <div className="row g-3">
                    {kbCards.map((c) => (
                      <div key={c.id} className="col-6 col-md-3">
                        <button
                          data-testid={`kb-card-${c.id}`}
                          className="btn w-100 text-start rounded-4 p-3 d-flex align-items-center justify-content-between"
                          style={{ background: c.bg, transition: 'transform 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div 
                              className="position-relative rounded d-flex align-items-center justify-content-center"
                              style={{ 
                                width: '44px', 
                                height: '36px', 
                                background: c.chip,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            >
                              <span 
                                className="position-absolute top-0 start-0 m-1"
                                style={{ 
                                  width: '16px', 
                                  height: '6px', 
                                  background: 'rgba(255,255,255,0.4)',
                                  borderRadius: '2px'
                                }}
                              />
                              <Folder size={20} color="white" />
                            </div>
                            <span className="fw-semibold text-dark small">{c.label}</span>
                          </div>
                          <ChevronRight size={16} className="text-secondary" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Statistic */}
                  <div className="bg-light rounded-4 p-4 border mt-4">
                    <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">
                      <div>
                        <h3 className="h5 fw-semibold">Statistic</h3>
                        <div className="mt-3 text-secondary fw-medium">Progress score</div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-2">
                        <div className="d-flex align-items-center gap-2 bg-white px-3 py-1 rounded-3 border small">
                          <ChevronLeft size={14} className="text-secondary" />
                          <span>Aug 2021</span>
                          <ChevronRight size={14} className="text-secondary" />
                        </div>
                        <div className="d-flex gap-4 small">
                          <span className="d-flex align-items-center gap-1">
                            <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', background: '#4C6FFF' }} />
                            Average grade
                          </span>
                          <span className="d-flex align-items-center gap-1">
                            <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', background: '#3CCB7F' }} />
                            Exams
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ height: '240px', width: '100%', marginTop: '16px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
                          <XAxis
                            dataKey="m"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                          />
                          <YAxis hide domain={[0, 100]} />
                          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }} />
                          <ReferenceLine x="Aug" stroke="#e2e8f0" strokeWidth={30} strokeOpacity={0.6} />
                          <Line
                            type="monotone"
                            dataKey="avg"
                            stroke="#4C6FFF"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 5, fill: "#4C6FFF" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="exam"
                            stroke="#3CCB7F"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 5, fill: "#3CCB7F" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Right Column - Top Drivers */}
                <div className="col-12 col-xl-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="h4 fw-semibold mb-0">Top Drivers</h2>
                    <button className="btn btn-light rounded-3 d-flex align-items-center justify-content-center">
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {drivers.map((d, i) => (
                      <div
                        key={i}
                        data-testid={`driver-card-${i}`}
                        className="bg-white border rounded-4 p-3 d-flex align-items-center gap-3 shadow-sm"
                      >
                        <img
                          src={d.img}
                          alt={d.name}
                          className="rounded-circle object-fit-cover flex-shrink-0"
                          style={{ width: '44px', height: '44px' }}
                        />
                        <div className="flex-grow-1 min-w-0">
                          <div className="fw-semibold text-truncate">{d.name}</div>
                          <div className="small text-secondary">{d.phone}</div>
                        </div>
                        <div className="text-end small flex-shrink-0">
                          <div className="text-secondary">
                            Orders: <span className="text-dark fw-semibold">{d.orders}</span>
                          </div>
                          <div className="text-secondary mt-1">
                            Income: <span className="text-dark fw-semibold">{d.income}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-4 border overflow-hidden mt-4">
                <div className="table-responsive">
                  <table className="table table-hover mb-0" style={{ fontSize: '13px' }}>
                    <thead className="bg-light">
                      <tr>
                        <th className="p-3" style={{ width: '40px' }}>
                          <input
                            data-testid="select-all-checkbox"
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleAll}
                            className="form-check-input"
                          />
                        </th>
                        <th className="p-3 text-start fw-medium">
                          <div className="d-flex align-items-center gap-1">
                            User <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="p-3 text-start fw-medium">Car Comfort</th>
                        <th className="p-3 text-start fw-medium">Ordered Time</th>
                        <th className="p-3 text-start fw-medium">Start Location</th>
                        <th className="p-3 text-start fw-medium">Finish Location</th>
                        <th className="p-3 text-start fw-medium">Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((r) => {
                        const checked = selectedRows.includes(r.id);
                        return (
                          <tr key={r.id} data-testid={`table-row-${r.id}`}>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleRow(r.id)}
                                className="form-check-input"
                              />
                            </td>
                            <td className="p-3">
                              <div className="d-flex align-items-center gap-3" style={{ minWidth: '180px' }}>
                                <img
                                  src={r.img}
                                  alt={r.user}
                                  className="rounded-circle object-fit-cover flex-shrink-0"
                                  style={{ width: '36px', height: '36px' }}
                                />
                                <div className="lh-1">
                                  <div className="fw-semibold">{r.user}</div>
                                  <div className="small text-secondary">{r.phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">{r.comfort}</td>
                            <td className="p-3 text-nowrap">{r.time}</td>
                            <td className="p-3" style={{ maxWidth: '220px' }}>
                              <span className="text-truncate d-block">{r.start}</span>
                            </td>
                            <td className="p-3" style={{ maxWidth: '220px' }}>
                              <span className="text-truncate d-block">{r.finish}</span>
                            </td>
                            <td className="p-3">
                              <span className="badge bg-success-subtle text-success-emphasis px-3 py-2 rounded-3">
                                {r.income}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 p-3 border-top">
                  <span className="text-secondary small">1-2 of items</span>
                  <button
                    data-testid="pagination-prev"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="btn btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[1, 2].map((n) => (
                    <button
                      key={n}
                      data-testid={`pagination-page-${n}`}
                      onClick={() => setPage(n)}
                      className={`btn rounded-3 d-flex align-items-center justify-content-center ${
                        page === n ? 'btn-primary' : 'btn-outline-secondary'
                      }`}
                      style={{ width: '32px', height: '32px', fontSize: '13px' }}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    data-testid="pagination-next"
                    onClick={() => setPage((p) => Math.min(2, p + 1))}
                    className="btn btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;