import { Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';


const ButtonComponent = ({ text, bcolor, color, icon, onClick }) => {
    const getRamdonFromParent = () => {
        onClick();
    }
    return (
        <>
            <Button
                onClick={getRamdonFromParent}
                sx={{ backgroundColor: bcolor, color: color, margin: "5px 10px 5px 0", padding: "0 15px", fontWeight: "bold", height: 50, borderRadius: 2 }}>
                {icon === "eyes" &&
                    <RemoveRedEyeIcon sx={{ width: 18, marginRight: 1 }} />
                }

                {icon === "add" &&
                    <AddIcon />
                }
                {text}
            </Button>
        </>
    );
}

export default ButtonComponent;