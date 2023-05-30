import { Box, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from "axios";


const CitationCard = ({ citationObject, favoris }) => {



    const handleCreate = () => {

        const data = {
            "citation": citationObject.citation,
            "acteur": citationObject.infos.acteur,
            "auteur": citationObject.infos.auteur,
            "personnage": citationObject.infos.personnage,
            "episode": citationObject.infos.episode,
            "saison": citationObject.infos.saison
        }
        axios({
            method: 'post',
            url: process.env.REACT_APP_BASE_URL + 'citation',
            data: data
        })

    }


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                border: 4,
                borderColor: "#8F00FF",
                padding: {
                    xs: "40px 40px 10px",
                    sm: "40px 50px 20px",
                },
                borderRadius: 1
            }}>

            <Typography
                variant="h6"
                sx={{
                    width: {
                        xs: "100%",
                        sm: "80%",
                        md: "80%"
                    },
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#8F00FF",
                    margin: "auto"
                }}>
                “{citationObject.citation}“
            </Typography>

            <Typography
                sx={{
                    textAlign: {
                        xs: "center",
                        sm: "right",
                    },
                    fontStyle: "italic",
                    color: "#8F00FF",
                    margin: "15px 0"
                }}>
                {citationObject.infos && citationObject.infos.auteur}
            </Typography>

            <Typography sx={{ display: "flex", justifyContent: "center", textAlign: "center", }}>
                {!favoris &&
                    <>
                        <StarBorderIcon
                            sx={{
                                color: "#8F00FF"
                            }}
                        />
                        <Typography sx={{ cursor: 'pointer', textDecoration: 'underline', color: "#8F00FF" }} onClick={handleCreate}> Mettre en favoris</Typography>
                    </>
                }
            </Typography>

        </Box>
    );
}

export default CitationCard;