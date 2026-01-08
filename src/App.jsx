import { useState, useRef } from 'react'
import './App.css'

function App() {
  // Default data uses URL strings (Internet links)
  const [employees, setEmployees] = useState([
    { id: "001", name: "Sem Sila", age: 18, gender: "Male", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: "002", name: "Sok Bophana", age: 30, gender: "Female", address: "Siem Reap", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: "003", name: "Chan Tola", age: 22, gender: "Male", address: "Kampong Cham", photo: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: "004", name: "Nak Sokheang", age: 25, gender: "Male", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: "005", name: "Ang Dalin", age: 19, gender: "Female", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: "006", name: "Ban Vichea", age: 28, gender: "Male", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: "007", name: "Sok Sreymom", age: 18, gender: "Female", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: "008", name: "Zu Ra", age: 24, gender: "Female", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/women/5.jpg" },
    { id: "009", name: "Ly Sokha", age: 27, gender: "Male", address: "Battambang", photo: "https://randomuser.me/api/portraits/men/6.jpg" },
    { id: "010", name: "Vong Vibal", age: 31, gender: "Male", address: "Kandal", photo: "https://randomuser.me/api/portraits/men/7.jpg" },
    { id: "011", name: "Chea Sophea", age: 23, gender: "Female", address: "Takeo", photo: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: "012", name: "Heng Dara", age: 29, gender: "Male", address: "Prey Veng", photo: "https://randomuser.me/api/portraits/men/8.jpg" },
    { id: "013", name: "Lim Rotha", age: 21, gender: "Male", address: "Kampot", photo: "https://randomuser.me/api/portraits/men/9.jpg" },
    { id: "014", name: "Sam Nang", age: 26, gender: "Male", address: "Battambang", photo: "https://randomuser.me/api/portraits/men/10.jpg" },
    { id: "015", name: "Keo Malis", age: 20, gender: "Female", address: "Kampong Speu", photo: "https://randomuser.me/api/portraits/women/7.jpg" },
    { id: "016", name: "Tep Visal", age: 33, gender: "Male", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: "017", name: "Ros Thida", age: 22, gender: "Female", address: "Battambang", photo: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: "018", name: "Khmer Nary", age: 24, gender: "Female", address: "Siem Reap", photo: "https://randomuser.me/api/portraits/women/9.jpg" },
    { id: "019", name: "Chhay Rithy", age: 35, gender: "Male", address: "Banteay Meanchey", photo: "https://randomuser.me/api/portraits/men/12.jpg" },
    { id: "020", name: "Mao Sreyleak", age: 19, gender: "Female", address: "Phnom Penh", photo: "https://randomuser.me/api/portraits/women/10.jpg" },
  ]);

  const [formData, setFormData] = useState({ name: '', age: '', gender: '', address: '', photo: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Create a ref to clear the file input after submit
  const fileInputRef = useRef(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [sortType, setSortType] = useState("default");

  const generateId = () => {
    if (employees.length === 0) return "001";
    const maxId = Math.max(...employees.map(emp => parseInt(emp.id)));
    return String(maxId + 1).padStart(3, '0');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- NEW: HANDLE FILE UPLOAD ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the file
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- FIX: Validation now checks for PHOTO ---
    if (!formData.name || !formData.age || !formData.gender || !formData.photo) {
      alert("Please fill in all fields and UPLOAD A PHOTO.");
      return;
    }

    if (parseInt(formData.age) < 15) {
      alert("Employee must be at least 15 years old.");
      return;
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

    // Reset Form
    setFormData({ name: '', age: '', gender: '', address: '', photo: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input visually
    }
  };

  const handleEdit = (employee) => {
    setFormData({ ...employee });
    setIsEditing(true);
    setCurrentId(employee.id);

    // Clear file input because we can't "fill" it, 
    // but the preview will show the existing photo from formData.photo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleView = (employee) => {
    setSelectedProfile(employee);
    setShowProfileModal(true);
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
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: Chan Dara" />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Ex: 25" min="15" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="" disabled>Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="form-group">
            <label>Current Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Ex: Phnom Penh" />
          </div>

          {/* --- NEW: FILE UPLOAD INPUT --- */}
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Upload Photo (Required)</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="file-input"
              />
            </div>

            {/* Show Preview if photo exists (either from URL or Upload) */}
            {formData.photo && (
              <div className="photo-preview-container">
                <span className="preview-label">Photo Preview:</span>
                <img src={formData.photo} alt="Preview" className="photo-preview" />
              </div>
            )}
          </div>

          <button type="submit" className="btn-submit">
            {isEditing ? "Update Details" : "+ Add Employee"}
          </button>
        </form>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <input type="text" placeholder="🔍 Search by Name..." value={filterName} onChange={(e) => setFilterName(e.target.value)} />
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
              <th>Photo</th>
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
                <td>
                  {emp.photo ? (
                    <img src={emp.photo} alt="Avatar" className="table-avatar" />
                  ) : (
                    <div className="avatar-placeholder">{emp.name.charAt(0)}</div>
                  )}
                </td>
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
                    <button className="btn-view" onClick={() => handleView(emp)}>View</button>
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

      {/* PROFILE MODAL */}
      {showProfileModal && selectedProfile && (
        <div className="modal-overlay">
          <div className="modal-content profile-modal">
            <div className="profile-header">
              {selectedProfile.photo ? (
                <img src={selectedProfile.photo} alt="Profile" className="profile-image-large" />
              ) : (
                <div className="profile-avatar-placeholder">
                  {selectedProfile.name.charAt(0).toUpperCase()}
                </div>
              )}
              <h3>{selectedProfile.name}</h3>
            </div>

            <div className="profile-details">
              <div className="profile-row">
                <span className="profile-label">Employee ID:</span>
                <span className="profile-value">#{selectedProfile.id}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Age:</span>
                <span className="profile-value">{selectedProfile.age} Years Old</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Gender:</span>
                <span className="profile-value">
                  <span className={`badge ${selectedProfile.gender.toLowerCase()}`}>
                    {selectedProfile.gender}
                  </span>
                </span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Address:</span>
                <span className="profile-value">{selectedProfile.address}</span>
              </div>
            </div>

            <button className="btn-close" onClick={() => setShowProfileModal(false)}>
              Close Profile
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App