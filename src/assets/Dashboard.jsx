import React from "react";
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
  Checkbox, // Import Checkbox
} from "@mui/material";

export default function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full page height
        width: "100vw", // Full page width
        backgroundColor: "#0a111a", // Background color for the full page
        overflowX: "hidden", // Prevent horizontal scrolling
      }}
    >
      {/* Header Section */}
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

      {/* Table Container */}
      <Box
        sx={{
          flexGrow: 1, // Makes sure the table expands to cover available space
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
            backgroundColor: "#171f2b", // Dark background for table
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
                </TableCell>{" "}
                {/* New column for the checkbox */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Add your table rows here */}
              <TableRow style={{ color: "white" }}>
                <TableCell style={{ color: "#ffffff" }}>
                  Jeyachandran J
                </TableCell>

                <TableCell style={{ color: "#ffffff" }}>07418800609</TableCell>
                {!isSmallScreen && (
                  <TableCell style={{ color: "#ffffff" }}>
                    j.jeyachandran072@gmail.com
                  </TableCell>
                )}
                {!isSmallScreen && (
                  <TableCell style={{ color: "#ffffff" }}>123456789</TableCell>
                )}
                <TableCell style={{ color: "#ffffff" }}>
                  cont_P3svCQs89QayvC
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}>
                  <Checkbox  /> {/* Checkbox */}
                </TableCell>
              </TableRow>
              {/* Add other rows here */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Footer or additional sections if any */}
    </Box>
  );
}
