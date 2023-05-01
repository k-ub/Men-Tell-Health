import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const GroupChat = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chatName, setChatName] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios
      .get(`/api/groupchats/${id}`)
      .then((response) => {
        setChatName(response.data.name);
        setChatMessages(response.data.messages);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleMessageSend = () => {
    axios
      .post(`/api/groupchats/${id}`, { message: newMessage })
      .then((response) => {
        setChatMessages([...chatMessages, response.data.message]);
        setNewMessage("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box className={classes.container}>
          <Typography variant="h4">{chatName}</Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            {chatMessages.map((message, index) => (
              <Typography key={index}>{message}</Typography>
            ))}
          </Box>
          <form className={classes.form}>
            <TextField
              id="new-message"
              label="New Message"
              variant="outlined"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleMessageSend}
            >
              Send
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
};

export default GroupChat;
