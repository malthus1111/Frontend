import './App.css';
import { Box, Typography, Divider } from '@mui/material';
import CitationCard from './components/CitationCard';
import { useEffect, useState } from 'react';
import ButtonComponent from './components/ButtonComponent';
import Search from './components/Search';
import CitationLine from './components/CitationLine';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function App() {


	const [currenCitation, setCurrentCitation] = useState({});
	const [allCitations, setAllCitations] = useState([]);
	const [open, setOpen] = useState(false);
	const [citation, setCitation] = useState('');
	const [auteur, setAuteur] = useState('');
	const [acteur, setActeur] = useState('');
	const [personnage, setPersonnage] = useState('');
	const [episode, setEpisode] = useState('');
	const [saison, setSaison] = useState('');
	const [favoris, setFavoris] = useState(true);



	const getRandomFromMyCitations = (() => {
		axios({
			method: 'get',
			url: process.env.REACT_APP_BASE_URL + 'citation/random',
			responseType: "json"
		}).then((response) => {
			setCurrentCitation(response.data.citation);
			setFavoris(true);
		});
	});

	const getRandomFromKaamelott = (() => {
		axios({
			method: 'get',
			url: process.env.REACT_APP_BASE_URL + 'citation/random-external',
			responseType: "json"
		}).then((response) => {
			setCurrentCitation(response.data.citation);
			setFavoris(false);
		});
	});

	const getAllCitations = (() => {
		axios({
			method: 'get',
			url: process.env.REACT_APP_BASE_URL + 'citation/all',
			responseType: "json"
		}).then((response) => {
			setAllCitations(response.data.citation);
		});
	});

	const handleUpdateCitationList = ((data) => {
		setAllCitations(data)
	});





	useEffect(() => {
		getAllCitations();
		getRandomFromMyCitations();
	}, []);


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreate = () => {

		const data = { citation, acteur, auteur, personnage, episode, saison }
		axios({
			method: 'post',
			url: process.env.REACT_APP_BASE_URL + 'citation',
			data: data
		}).then((response) => {
			console.log(response.message);
		});
		getAllCitations();
		setOpen(false);
	};


	return (
		<Box
			sx={{
				fontFamily: "Roboto",
				display: "flex",
				flexDirection: "column",
				margin: "auto",
				width: {
					xs: "90%",
					md: "60%"
				}
			}}
			className="App">
			<Typography variant='h3' sx={{ textAlign: 'center', fontWeight: 'bold', margin: "50px" }} >
				Citations
			</Typography>

			<CitationCard citationObject={currenCitation} favoris={favoris} />

			<Typography variant='h6' sx={{ margin: "25px auto 15px" }} >
				Afficher une autre citation
			</Typography>

			<Box sx={{ display: "flex", flexFlow: "row wrap", justifyContent: "center" }}>
				<ButtonComponent onClick={getRandomFromMyCitations} text="Parmis mes citations" bcolor="white" color="#8F00FF" icon="eyes" />
				<ButtonComponent onClick={getRandomFromKaamelott} text="Parmis les citations de Kaamelott" bcolor="white" color="#8F00FF" icon="eyes" />
			</Box>

			<Divider sx={{ width: "100%", margin: "35px auto 0" }} />

			<Typography variant='h5' sx={{ fontWeight: 'bold', margin: "25px auto 15px" }} >
				Mes citations
			</Typography>

			<Box sx={{ display: "flex", flexFlow: "row wrap", justifyContent: { xs: "center", lg: "space-between" }, alignItems: "center", }}>
				<ButtonComponent onClick={handleClickOpen} text="Ajouter une citation" bcolor="#8F00FF" color="white" icon="add" />
				<Search name={handleUpdateCitationList} />
			</Box>

			<Divider sx={{ width: "100%", margin: "25px 0" }} />

			{allCitations && allCitations.map((item, index) => {
				return (
					<CitationLine key={index} citation={item.citation} id={item.id} updateList={getAllCitations} />
				);
			})}

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Créer une citation</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Veuillez entrer les informations pour la création de la ciattion.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="citation"
						label="Citation"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setCitation(e.target.value)
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="auteur"
						label="Auteur"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setAuteur(e.target.value)
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="acteur"
						label="Acteur"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setActeur(e.target.value)
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="personnage"
						label="Personnage"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setPersonnage(e.target.value)
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="saison"
						label="Saison"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setSaison(e.target.value)
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="episode"
						label="Épisode"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setEpisode(e.target.value)
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Fermer</Button>
					<Button onClick={handleCreate}>Créer</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default App;
