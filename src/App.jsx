import { useState, useRef } from 'react' // Added useRef for scrolling (optional, but window.scrollTo is easier)
import './App.css'

function App() {
  const [employees, setEmployees] = useState([
    { id: "001", name: "Sem Sila", age: 18, gender: "Male", address: "Phnom Penh" },
    { id: "002", name: "Sok Bophana", age: 30, gender: "Female", address: "Siem Reap" },
    { id: "003", name: "Chan Tola", age: 22, gender: "Male", address: "Kampong Cham" },
    { id: "004", name: "Nak Sokheang", age: 25, gender: "Male", address: "Phnom Penh" },
    { id: "005", name: "Ang Dalin", age: 19, gender: "Female", address: "Phnom Penh" },
    { id: "006", name: "Ban Vichea", age: 28, gender: "Male", address: "Phnom Penh" },
    { id: "007", name: "Sok Sreymom", age: 18, gender: "Female", address: "Phnom Penh" },
    { id: "008", name: "Zu Ra", age: 24, gender: "Female", address: "Phnom Penh" },
    { id: "009", name: "Ly Sokha", age: 27, gender: "Male", address: "Battambang" },
    { id: "010", name: "Vong Vibal", age: 31, gender: "Male", address: "Kandal" },
    { id: "011", name: "Chea Sophea", age: 23, gender: "Female", address: "Takeo" },
    { id: "012", name: "Heng Dara", age: 29, gender: "Male", address: "Prey Veng" },
    { id: "013", name: "Lim Rotha", age: 21, gender: "Male", address: "Kampot" },
    { id: "014", name: "Sam Nang", age: 26, gender: "Male", address: "Battambang" },
    { id: "015", name: "Keo Malis", age: 20, gender: "Female", address: "Kampong Speu" },
    { id: "016", name: "Tep Visal", age: 33, gender: "Male", address: "Phnom Penh" },
    { id: "017", name: "Ros Thida", age: 22, gender: "Female", address: "Battambang" },
    { id: "018", name: "Khmer Nary", age: 24, gender: "Female", address: "Siem Reap" },
    { id: "019", name: "Chhay Rithy", age: 35, gender: "Male", address: "Banteay Meanchey" },
    { id: "020", name: "Mao Sreyleak", age: 19, gender: "Female", address: "Phnom Penh" },
  ]);

  const [formData, setFormData] = useState({ name: '', age: '', gender: 'Female', address: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Filters
  const [filterName, setFilterName] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [sortType, setSortType] = useState("default");

  // --- LOGIC ---
  const generateId = () => {
    if (employees.length === 0) return "001";
    const maxId = Math.max(...employees.map(emp => parseInt(emp.id)));
    return String(maxId + 1).padStart(3, '0');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age) return;

    // --- FIX 2: AGE VALIDATION ---
    if (parseInt(formData.age) < 15) {
      alert("Employee must be at least 15 years old.");
      return; // Stop the function here
    }

    if (isEditing) {
      setEmployees(employees.map(emp =>
        emp.id === currentId ? { ...emp, ...formData } : emp
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      const newEmployee = {
        id: generateId(),
        ...formData,
        age: parseInt(formData.age)
      };
      setEmployees([...employees, newEmployee]);
    }
    setFormData({ name: '', age: '', gender: 'Female', address: '' });
  };

  const handleEdit = (employee) => {
    setFormData({ ...employee });
    setIsEditing(true);
    setCurrentId(employee.id);

    // --- FIX 3: SCROLL TO TOP ---
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Makes it scroll nicely instead of jumping
    });
  };

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const executeDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  // --- FILTER & SORT ---
  const filteredList = employees.filter(emp => {
    const matchesName = emp.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesGender = filterGender === "All" || emp.gender === filterGender;
    return matchesName && matchesGender;
  });

  const finalList = filteredList.sort((a, b) => {
    if (sortType === "nameAz") return a.name.localeCompare(b.name);
    if (sortType === "nameZa") return b.name.localeCompare(a.name);
    if (sortType === "ageHigh") return b.age - a.age;
    if (sortType === "ageLow") return a.age - b.age;
    return 0;
  });

  return (
    <div className="container">
      <h1>Employee Management</h1>

      {/* FORM CARD */}
      <div className="form-card">
        <h3>{isEditing ? `Edit Employee (ID: ${currentId})` : "Add New Employee"}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Chan Dara"
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Ex: 25 (Min: 15)"
              min="15" // Shows browser warning
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="form-group">
            <label>Current Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ex: Phnom Penh"
            />
          </div>
          <button type="submit" className="btn-submit">
            {isEditing ? "Update Details" : "+ Add Employee"}
          </button>
        </form>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by Name..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="default">Sort By...</option>
          <option value="nameAz">Name (A-Z)</option>
          <option value="nameZa">Name (Z-A)</option>
          <option value="ageHigh">Age (Highest)</option>
          <option value="ageLow">Age (Lowest)</option>
        </select>
      </div>

      {/* TABLE CARD */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalList.map((emp) => (
              <tr key={emp.id}>
                <td>#{emp.id}</td>
                <td style={{ fontWeight: 'bold' }}>{emp.name}</td>
                <td>{emp.age}</td>
                <td>
                  <span className={`badge ${emp.gender.toLowerCase()}`}>
                    {emp.gender}
                  </span>
                </td>
                <td>{emp.address}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(emp)}>Edit</button>
                    <button className="btn-delete" onClick={() => confirmDelete(emp)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {finalList.length === 0 && <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>No employees found.</p>}
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{employeeToDelete?.name}</strong>?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn-delete" onClick={executeDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App