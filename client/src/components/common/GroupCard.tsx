import { Chat } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Stack,
} from "@mui/material";

import { GroupCardProps } from "interfaces/groupchat"

 const GroupCard = ({ 
    id, 
    name 
}: GroupCardProps) => {
    return (
        <Card
            component={Link}
            to={`/groupchats/show/${id}`}
            sx={{
                maxWidth: "330px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
            }}
            elevation={0}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {name}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <Chat
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                marginTop: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191">
                            Group Chat
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default GroupCard;
