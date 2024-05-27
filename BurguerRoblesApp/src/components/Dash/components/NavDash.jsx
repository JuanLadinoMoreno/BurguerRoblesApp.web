import React, { useState } from 'react'

function NavDash() {

     const [isExpanded, setIsExpanded] = useState(true)

     
     const handleToggle = () => {
          setIsExpanded(!isExpanded);
        };
  return (
    <>
    <aside id="sidebar " className={`sidebar ${isExpanded ? 'expand' : ''}` }>
        {/* <aside id="sidebar " className="d-flex flex-column navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed bg-danger"> */}
          <div className="d-flex ">

            <button className="toggle-btn" type="button" onClick={handleToggle}>
              <i className="fab fa-facebook-f"></i>
            </button>

            <div className="sidebar-logo">
              <a href="#">CodzSword</a>
            </div>
          </div>

          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fab fa-instagram"></i>
                <span>Profile</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fab fa-twitter"></i>
                <span>Task</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                <i className="fab fa-youtube"></i>
                <span>Auth</span>
              </a>
              <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Login</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Register</a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                <i className="lni lni-layout"></i>
                <span>Multi Level</span>
              </a>
              <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                    data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                    Two Links
                  </a>
                  <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                    <li className="sidebar-item">
                      <a href="#" className="sidebar-link">Link 1</a>
                    </li>
                    <li className="sidebar-item">
                      <a href="#" className="sidebar-link">Link 2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="lni lni-popup"></i>
                <span>Notification</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="lni lni-cog"></i>
                <span>Setting</span>
              </a>
            </li>
          </ul>
          <div className="sidebar-footer">
            <a href="#" className="sidebar-link">
              <i className="lni lni-exit"></i>
              <span>Logout</span>
            </a>
          </div>
        </aside>
    </>
  )
}

export default NavDash