import { useState } from 'react'
import './App.css'

function App() {
  // 1. STATE: The list of employees
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

  // NEW STATE: specific for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null); // Tracks which ID we are editing

  // NEW STATE: specific for Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Filter/Sort State
  const [filterName, setFilterName] = useState(""); // CHANGE: Renamed from filterAddress
  const [filterGender, setFilterGender] = useState("All");
  const [sortType, setSortType] = useState("default");

  // --- HELPER FUNCTION: GENERATE ID ---
  const generateId = () => {
    if (employees.length === 0) return "001";

    // Find the highest ID number currently in the list
    const maxId = Math.max(...employees.map(emp => parseInt(emp.id)));

    // Add 1 and pad with zeros (e.g., 9 becomes "009", 10 becomes "010")
    return String(maxId + 1).padStart(3, '0');
  };

  // --- HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age) return;

    if (isEditing) {
      // --- UPDATE LOGIC ---
      setEmployees(employees.map(emp =>
        emp.id === currentId ? { ...emp, ...formData } : emp
      ));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      // --- CREATE LOGIC (Auto ID) ---
      const newEmployee = {
        id: generateId(), // CALL THE HELPER FUNCTION
        ...formData,
        age: parseInt(formData.age)
      };
      setEmployees([...employees, newEmployee]);
    }

    setFormData({ name: '', age: '', gender: 'Female', address: '' });
  };

  // --- NEW: EDIT HANDLER ---
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      age: employee.age,
      gender: employee.gender,
      address: employee.address
    });
    setIsEditing(true);
    setCurrentId(employee.id);
  };

  // --- NEW: DELETE HANDLER (Step 1: Open Modal) ---
  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  // --- NEW: EXECUTE DELETE (Step 2: Actually Delete) ---
  const executeDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  // --- SORTING AND FILTERING ---
  const filteredList = employees.filter(emp => {
    // CHANGE: Filtering by NAME now
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
      <h1>Employee Directory</h1>

      {/* FORM */}
      <div className="form-card">
        <h3>{isEditing ? `Edit Employee (ID: ${currentId})` : "Add New Employee"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter age" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" />
          </div>
          <button type="submit" className="btn-submit">
            {isEditing ? "Update Employee" : "Submit"}
          </button>
        </form>
      </div>

      {/* FILTERS */}
      <div className="filters">
        {/* CHANGE: Input now filters by Name */}
        <input
          type="text"
          placeholder="Filter by Name..."
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

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th> {/* Added ID Column */}
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
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.age}</td>
              <td>{emp.gender}</td>
              <td>{emp.address}</td>
              <td>
                <button className="btn-delete" onClick={() => confirmDelete(emp)}>Delete</button>
                {/* CHANGE: Added Edit Button */}
                <button className="btn-edit" onClick={() => handleEdit(emp)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* NEW: DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Do you want to delete <strong>{employeeToDelete?.name}</strong>?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn-delete" onClick={executeDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App