import { Box, Divider, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

const CitationLine = ({ citation, id, updateList }) => {
    const handleDelete = (id) => {
        console.log(id);
        axios({
            method: 'delete',
            url: process.env.REACT_APP_BASE_URL + 'citation/' + id,
        }).then((response) => {
            console.log(response.message);
        });
        updateList();
    };
    return (
        <>
            <Box sx={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", position: { lg: "relative" } }}>
                <Typography align="center" fontStyle="italic" fontWeight="bold"> {citation} </Typography>
                <Box sx={{ position: { xl: "absolute" }, right: 0, minWidth: 65, mt: { xs: 3, xl: 0 } }}>

                    <DeleteIcon onClick={() => { handleDelete(id) }} sx={{ cursor: "pointer" }} />

                    <EditIcon sx={{ marginLeft: 2, cursor: "pointer" }} />
                </Box>
            </Box>

            <Divider sx={{ width: "100%", margin: "25px 0" }} />
        </>
    );
}

export default CitationLine;