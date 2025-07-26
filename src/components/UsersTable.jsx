import { useEffect, useState } from "react";
import usersData from "./users.json";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    IconButton,
    Grid
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
// =======================================================================
const UsersTable = () => {
    // -------------------------------------------------------------------
    const [users, setUsers] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [familyname, setLastname] = useState("");
    const [idnumber, setIdnumber] = useState("");
    const [filteredusers, setFilteredusers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    // -------------------------------------------------------------------
    const handleAddUser = () => {
        if (!firstname || !familyname || !idnumber) {
            alert("Please fill all the fields.");
            return;
        }
        const newuser = {
            firstname,
            familyname,
            idnumber,
        };
        setUsers([...users, newuser]);
        setFirstname("");
        setLastname("");
        setIdnumber("");
    };
    const handleSearch = () => {
        if (!firstname && !familyname && !idnumber) {
            alert("Please fill in at least one field.");
            return;
        }
        const filtered = users.filter((user) => {
            return (
                (firstname === "" ||
                    user.firstname
                        .toLowerCase()
                        .includes(firstname.toLowerCase())) &&
                (familyname === "" ||
                    user.familyname
                        .toLowerCase()
                        .includes(familyname.toLowerCase())) &&
                (idnumber === "" || user.idnumber.includes(idnumber))
            );
        });
        if (filtered.length === 0) {
            alert("No user found.");
        }
        setFilteredusers(filtered);
    };
    const handleShowAll = () => {
        setFilteredusers(users);
        setFirstname("");
        setLastname("");
        setIdnumber("");
    };
    const handleDeleteUser = (idToDelete) => {
        const updatedUsers = users.filter(
            (user) => user.idnumber !== idToDelete
        );
        setUsers(updatedUsers);
        const updatedFiltered = filteredusers.filter(
            (user) => user.idnumber !== idToDelete
        );
        setFilteredusers(updatedFiltered);
    };
    const handleEdit = (user) => {
        setEditUser({ ...user, originalId: user.idnumber });
        setShowModal(true);
    };
    const handleSaveEdit = () => {
        const updatedUsers = users.map((user) =>
            user.idnumber === editUser.originalId
                ? {
                      firstname: editUser.firstname,
                      familyname: editUser.familyname,
                      idnumber: editUser.idnumber,
                  }
                : user
        );
        setUsers(updatedUsers);
        const updatedFiltered = filteredusers.map((user) =>
            user.idnumber === editUser.originalId
                ? {
                      firstname: editUser.firstname,
                      familyname: editUser.familyname,
                      idnumber: editUser.idnumber,
                  }
                : user
        );
        setFilteredusers(updatedFiltered);
        setShowModal(false);
        setEditUser(null);
    };
    const handleCancelEdit = () => {
        setShowModal(false);
        setEditUser(null);
    };
    // -------------------------------------------------------------------
    useEffect(() => {
        setUsers(usersData);
    }, []);
    // -------------------------------------------------------------------
    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" sx={{ m: 3, pt: 3 }}>
                Users Information Table
            </Typography>
            <Grid container spacing={2} justifyContent="center" mb={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Last Name"
                        value={familyname}
                        onChange={(e) => setLastname(e.target.value)}
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="ID Number"
                        value={idnumber}
                        onChange={(e) => setIdnumber(e.target.value)}
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Button
                                variant="contained"
                                onClick={handleAddUser}
                                fullWidth
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: "#0856a9",
                                    mb: 2,
                                    "&:hover": {
                                        backgroundColor: "#2686e7ff",
                                    },
                                }}
                            >
                                Add User
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                variant="outlined"
                                onClick={handleSearch}
                                fullWidth
                                sx={{ textTransform: "none", color: "#0856a9" }}
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                variant="outlined"
                                onClick={handleShowAll}
                                fullWidth
                                sx={{ textTransform: "none", color: "#0856a9" }}
                            >
                                Show All
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#0856a9" }}>
                            <TableCell
                                sx={{
                                    color: "#fff",
                                    width: "10%",
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                No.
                            </TableCell>
                            <TableCell
                                sx={{ color: "#fff", textAlign: "center",fontWeight: "bold" }}
                            >
                                First Name
                            </TableCell>
                            <TableCell
                                sx={{ color: "#fff", textAlign: "center",fontWeight: "bold" }}
                            >
                                Last Name
                            </TableCell>
                            <TableCell
                                sx={{ color: "#fff", textAlign: "center",fontWeight: "bold" }}
                            >
                                National ID
                            </TableCell>
                            <TableCell
                                sx={{ color: "#fff", textAlign: "center",fontWeight: "bold" }}
                            >
                                Operations
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(filteredusers.length > 0 ? filteredusers : users).map(
                            (user, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        sx={{
                                            textAlign: "center",
                                            backgroundColor: "#0856a9",
                                            color: "#fff",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {user.firstname}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {user.familyname}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {user.idnumber}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(user)}
                                            sx={{
                                                color: "#064487ff",
                                                "&:hover": {
                                                    color: "#007bff",
                                                },
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDeleteUser(user.idnumber)
                                            }
                                            sx={{
                                                color: "#991a06ff",
                                                "&:hover": {
                                                    color: "#e62305",
                                                },
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* ---------------------------------------------------------- */}
            <Dialog open={showModal} onClose={handleCancelEdit}>
                <DialogTitle>Edit User Info</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="First Name"
                        value={editUser?.firstname || ""}
                        onChange={(e) =>
                            setEditUser({
                                ...editUser,
                                firstname: e.target.value,
                            })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Family Name"
                        value={editUser?.familyname || ""}
                        onChange={(e) =>
                            setEditUser({
                                ...editUser,
                                familyname: e.target.value,
                            })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="ID Number"
                        value={editUser?.idnumber || ""}
                        onChange={(e) =>
                            setEditUser({
                                ...editUser,
                                idnumber: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveEdit} variant="contained">
                        Save
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outlined">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
export default UsersTable;
