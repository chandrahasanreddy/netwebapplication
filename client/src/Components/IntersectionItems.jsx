import React, { useState } from "react";

const IntersectionItems = ({ intersectionId, categories }) => {
  const [expandedMainCategories, setExpandedMainCategories] = useState({});
  const [expandedRows, setExpandedRows] = useState({});

  // Toggle main category visibility
  const toggleMainCategory = (category) => {
    setExpandedMainCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Toggle a row's children visibility
  const toggleRow = (rowKey) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: !prev[rowKey],
    }));
  };

  // Recursive function to render rows, checking for children
  const renderRows = (items, parentKey = "") => {
    return items.map((item, idx) => {
      const rowKey = `${parentKey}-${idx}`; // Unique key for each row
      const hasChildren = item.children && item.children.length > 0;

      return (
        <React.Fragment key={rowKey}>
          {/* Main row */}
          <tr
            style={{
              cursor: hasChildren ? "pointer" : "default",
              backgroundColor: hasChildren ? "#f0f8ff" : "inherit",
            }}
            onClick={() => hasChildren && toggleRow(rowKey)}
          >
            <td>{item.factor}</td>
            <td>{item.baseConditions}</td>
            <td>{item.siteConditions}</td>
            <td>{item.siteCMF}</td>
          </tr>

          {/* Render nested table if row is expanded */}
          {hasChildren && expandedRows[rowKey] && (
            <tr>
              <td colSpan="4" style={{ paddingLeft: "20px" }}>
                <table border="1" style={{ marginTop: "10px", width: "95%" }}>
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>Base Conditions</th>
                      <th>Site Conditions</th>
                      <th>Site CMF</th>
                    </tr>
                  </thead>
                  <tbody>{renderRows(item.children, rowKey)}</tbody>
                </table>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <h3>Intersection ID: {intersectionId}</h3>
      <h4>Categories:</h4>
      <ul>
        {Object.keys(categories).length > 0 ? (
          Object.keys(categories).map((categoryName) => (
            <li key={categoryName}>
              {/* Main Category Toggle */}
              <strong
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => toggleMainCategory(categoryName)}
              >
                {categoryName}
              </strong>

              {/* Main Category Table */}
              {expandedMainCategories[categoryName] && (
                <table border="1" style={{ marginTop: "10px", width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>Base Conditions</th>
                      <th>Site Conditions</th>
                      <th>Site CMF</th>
                    </tr>
                  </thead>
                  <tbody>{renderRows(categories[categoryName])}</tbody>
                </table>
              )}
            </li>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </ul>
    </div>
  );
};

export default IntersectionItems;
