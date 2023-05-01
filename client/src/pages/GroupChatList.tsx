import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const GroupChatList: React.FC = () => {
  const classes = useStyles();
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  interface GroupChat {
    _id: string;
    name: string;
    description: string;
  }

  useEffect(() => {
    const fetchGroupChats = async () => {
      try {
        const response = await axios.get<GroupChat[]>("/api/groupchats");

        if (response.status === 200) {
          setGroupChats(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupChats();
  }, []);


  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box className={classes.container}>
          <Typography variant="h4">All Group Chats</Typography>
          <List>
            {groupChats.map((groupChat: GroupChat) => (
              <ListItem
                key={groupChat._id}
                component={Link}
                to={`/groupchats/${groupChat._id}`}
                button
              >
                <ListItemText
                  primary={groupChat.name}
                  secondary={groupChat.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
};

export default GroupChatList;
