import React, { useEffect, useState } from "react"; 
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  useTheme,
  useMediaQuery,
  Checkbox,
} from "@mui/material";

export default function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 
  const [registrations, setRegistrations] = useState([]); 
  const [hiddenRows, setHiddenRows] = useState({}); 

  // Fetch hidden rows from localStorage when the component mounts
  useEffect(() => {
    const savedHiddenRows = localStorage.getItem("hiddenRows");
    if (savedHiddenRows) {
      setHiddenRows(JSON.parse(savedHiddenRows));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard"); 
        const data = await response.json();
        setRegistrations(data); 
      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    };

    fetchData();
  }, []); 

  const handleCheckboxChange = (id) => {
    setHiddenRows((prev) => {
      const updatedHiddenRows = { ...prev, [id]: !prev[id] };
      
      // Save updated hiddenRows to localStorage
      localStorage.setItem("hiddenRows", JSON.stringify(updatedHiddenRows));
      
      return updatedHiddenRows;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#0a111a",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 2,
          px: 4,
        }}
      >
        <Typography variant="h6" sx={{ color: "#ffffff" }}></Typography>
        <div style={{ width: "100%" }}>
          <h3 style={{ textAlign: "center", fontSize: "20px" }}>
            Customer Details
          </h3>
        </div>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "100%",
            overflowX: "auto",
            color: "#ffffff",
            backgroundColor: "#171f2b",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#2a86f3" }}>Name</TableCell>
                <TableCell style={{ color: "#2a86f3" }}>Phone</TableCell>
                {!isSmallScreen && (
                  <TableCell style={{ color: "#2a86f3" }}>Email</TableCell>
                )}
                {!isSmallScreen && (
                  <TableCell style={{ color: "#2a86f3" }}>
                    Account Number
                  </TableCell>
                )}
                <TableCell style={{ color: "#2a86f3" }}>Referral ID</TableCell>
                <TableCell style={{ color: "#2a86f3" }}>
                  Transferred
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrations
                .filter((registration) => !hiddenRows[registration.id]) // Only show rows that are not hidden
                .map((registration) => (
                  <TableRow key={registration.id} style={{ color: "white" }}>
                    <TableCell style={{ color: "#ffffff" }}>
                      {registration.name}
                    </TableCell>
                    <TableCell style={{ color: "#ffffff" }}>
                      {registration.contact}
                    </TableCell>
                    {!isSmallScreen && (
                      <TableCell style={{ color: "#ffffff" }}>
                        {registration.email}
                      </TableCell>
                    )}
                    {!isSmallScreen && (
                      <TableCell style={{ color: "#ffffff" }}>
                        {registration.accountNumber}
                      </TableCell>
                    )}
                    <TableCell style={{ color: "#ffffff" }}>
                      {registration.randomId}
                    </TableCell>
                    <TableCell style={{ color: "#ffffff" }}>
                      {registration.TokenTxn && (
                        <Checkbox
                          checked={hiddenRows[registration.id] || false}
                          onChange={() => handleCheckboxChange(registration.id)} // Toggle hidden state
                          style={{
                            backgroundColor: hiddenRows[registration.id]
                              ? "green" // Set checkbox background color to green if checked
                              : "white", // Default color
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
