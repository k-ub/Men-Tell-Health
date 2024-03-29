import {
    Refine,
    LegacyAuthProvider as AuthProvider,
} from "@refinedev/core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    ReadyPage,
    ErrorComponent,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import {
    AccountCircleOutlined,
    ChatBubbleOutline,
    PeopleAltOutlined,
    StarOutlineRounded
} from "@mui/icons-material";
import ArticleIcon from '@mui/icons-material/Article';
import PlaceIcon from '@mui/icons-material/Place';

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";
import { ColorModeContextProvider } from "contexts/color-mode";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";


import GroupChat from "pages/GroupChat";
import GroupChatList from "pages/GroupChatList";

import {
    Login,
    Home,
    Agents,
    MyProfile,
    ArticleDetails,
    AllArticles,
    CreateArticle,
    AgentProfile,
    EditArticle,
    CreateGroupChat
} from "pages";

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import CreateEvent from "pages/CreateEvent";


const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

interface Category {
    _id: string;
    name: string;
  }
  

function App() {
    const authProvider: AuthProvider = {
        login: async ({ credential }: CredentialResponse) => {
            const profileObj = credential ? parseJwt(credential) : null;

            if (profileObj) {
                const response = await fetch(
                    "http://localhost:8080/api/v1/users",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: profileObj.name,
                            email: profileObj.email,
                            avatar: profileObj.picture,
                        }),
                    },
                );

                const data = await response.json();

                if (response.status === 200) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            ...profileObj,
                            avatar: profileObj.picture,
                            userid: data._id,
                        }),
                    );
                } else {
                    return Promise.reject();
                }
            }
            localStorage.setItem("token", `${credential}`);

            return Promise.resolve();
        },
        logout: async () => {
            const token = localStorage.getItem("token");

            if (token && typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                axios.defaults.headers.common = {};
                return new Promise<void>((resolve) => {
                    window.google?.accounts.id.revoke(token, () => {
                        resolve();
                    });
                });
            }

            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            const token = localStorage.getItem("token");

            if (token) {
                return Promise.resolve();
            }
            return Promise.reject();
        },

        getPermissions: async () => null,
        getUserIdentity: async () => {
            const user = localStorage.getItem("user");
            if (user) {
                return Promise.resolve(JSON.parse(user));
            }
        },
    };

    return (
        <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
            <Refine
                    dataProvider={dataProvider("http://localhost:8080/api/v1")}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "articles",
                            list: AllArticles,
                            show: ArticleDetails,
                            create: CreateArticle,
                            edit: EditArticle,
                            icon: <ArticleIcon />,
                        },
                        {
                            name: "agents",
                            list: Agents,
                            show: AgentProfile,
                            icon: <PeopleAltOutlined />,
                        },
                        {
                            name: "events",
                            list: CreateEvent,
                            icon: <PlaceIcon />,
                        },
                        {
                            name: "groupchats",
                            list: GroupChatList,
                            show: GroupChat,
                            create: CreateGroupChat,
                          
                            icon: <ChatBubbleOutline />,
                          },
                        {
                            name: "my-profile",
                            options: { label: "My Profile " },
                            list: MyProfile,
                            icon: <AccountCircleOutlined />,
                        },
                    ]}
                    Title={Title}
                    Sider={Sider}
                    Layout={Layout}
                    Header={Header}
                    legacyRouterProvider={routerProvider}
                    legacyAuthProvider={authProvider}
                    LoginPage={Login}
                    DashboardPage={Home}
                />
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
}

export default App;

