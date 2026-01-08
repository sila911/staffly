import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([
    { id: "001", name: "Sem Sila", age: 18, gender: "Male", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200" },
    { id: "002", name: "Sok Bophana", age: 30, gender: "Female", address: "Siem Reap", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200" },
    { id: "003", name: "Chan Tola", age: 22, gender: "Male", address: "Kampong Cham", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200" },
    { id: "004", name: "Nak Sokheang", age: 25, gender: "Male", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200" },
    { id: "005", name: "Ang Dalin", age: 19, gender: "Female", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200" },
    { id: "006", name: "Ban Vichea", age: 28, gender: "Male", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&h=200" },
    { id: "007", name: "Sok Sreymom", age: 18, gender: "Female", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200" },
    { id: "008", name: "Zu Ra", age: 24, gender: "Female", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200" },
    { id: "009", name: "Ly Sokha", age: 27, gender: "Male", address: "Battambang", photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&h=200" },
    { id: "010", name: "Vong Vibal", age: 31, gender: "Male", address: "Kandal", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200" },
    { id: "011", name: "Chea Sophea", age: 23, gender: "Female", address: "Takeo", photo: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=200&h=200" },
    { id: "012", name: "Heng Dara", age: 29, gender: "Male", address: "Prey Veng", photo: "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?auto=format&fit=crop&w=200&h=200" },
    { id: "013", name: "Lim Rotha", age: 21, gender: "Male", address: "Kampot", photo: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=200&h=200" },
    { id: "014", name: "Sam Nang", age: 26, gender: "Male", address: "Battambang", photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&h=200" },
    { id: "015", name: "Keo Malis", age: 20, gender: "Female", address: "Kampong Speu", photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&h=200" },
    { id: "016", name: "Tep Visal", age: 33, gender: "Male", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&h=200" },
    { id: "017", name: "Ros Thida", age: 22, gender: "Female", address: "Battambang", photo: "https://images.unsplash.com/photo-1530785602389-07594daf831c?auto=format&fit=crop&w=200&h=200" },
    { id: "018", name: "Khmer Nary", age: 24, gender: "Female", address: "Siem Reap", photo: "https://images.unsplash.com/photo-1515023115689-589c33041697?auto=format&fit=crop&w=200&h=200" },
    { id: "019", name: "Chhay Rithy", age: 35, gender: "Male", address: "Banteay Meanchey", photo: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?auto=format&fit=crop&w=200&h=200" },
    { id: "020", name: "Mao Sreyleak", age: 19, gender: "Female", address: "Phnom Penh", photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&h=200" },
  ]);

  const [formData, setFormData] = useState({ name: '', age: '', gender: '', address: '', photo: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success Popup State

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
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: imageUrl });
      if (errors.photo) {
        setErrors({ ...errors, photo: false });
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.age) newErrors.age = true;
    if (!formData.gender) newErrors.gender = true;
    if (!formData.address) newErrors.address = true;
    if (!formData.photo) newErrors.photo = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      setShowSuccessModal(true); // SHOW SUCCESS POPUP
    }

    setFormData({ name: '', age: '', gender: '', address: '', photo: '' });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (employee) => {
    setFormData({ ...employee });
    setIsEditing(true);
    setCurrentId(employee.id);
    setErrors({});

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

      <div className="form-card">
        <h3>{isEditing ? `Edit Employee (ID: ${currentId})` : "Add New Employee"}</h3>
        <form onSubmit={handleSubmit} className="form-grid">

          {/* NAME */}
          <div className="form-group">
            <label>
              Full Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Chan Dara"
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">Please input Full Name</span>}
          </div>

          {/* AGE */}
          <div className="form-group">
            <label>
              Age <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Ex: 25"
              min="15"
              className={errors.age ? "input-error" : ""}
            />
            {errors.age && <span className="error-message">Please input Age</span>}
          </div>

          {/* GENDER */}
          <div className="form-group">
            <label>
              Gender <span className="required-asterisk">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={errors.gender ? "input-error" : ""}
            >
              <option value="" disabled>Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
            {errors.gender && <span className="error-message">Please select Gender</span>}
          </div>

          {/* ADDRESS */}
          <div className="form-group">
            <label>
              Current Address <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ex: Phnom Penh"
              className={errors.address ? "input-error" : ""}
            />
            {errors.address && <span className="error-message">Please input Current Address</span>}
          </div>

          {/* PHOTO UPLOAD */}
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>
              Upload Photo <span className="required-asterisk">*</span>
            </label>

            {formData.photo ? (
              <div className="photo-preview-container">
                <span className="preview-label-text">Photo preview :</span>
                <img src={formData.photo} alt="Preview" className="photo-preview-image" />
                <button type="button" className="btn-change-photo" onClick={triggerFileInput}>
                  Change Photo
                </button>
              </div>
            ) : (
              <div
                className={`upload-box ${errors.photo ? "input-error" : ""}`}
                onClick={triggerFileInput}
              >
                <div className="upload-icon">📁</div>
                <p className="upload-text">
                  Drop your image here, or <span className="upload-highlight">browse</span>
                </p>
                <p className="upload-hint">Supports: JPG, PNG, GIF</p>
              </div>
            )}
            {errors.photo && <span className="error-message">Please upload a photo</span>}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>

          <button type="submit" className="btn-submit">
            {isEditing ? "Update Details" : "+ Add Employee"}
          </button>
        </form>
      </div>

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

      {/* --- NEW: SUCCESS POPUP MODAL --- */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="success-icon">✅</span>
            <h3 className="success-title">Add employee successfully</h3>
            <button className="btn-success" onClick={() => setShowSuccessModal(false)}>
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App