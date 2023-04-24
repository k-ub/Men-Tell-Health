import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";
import { Container, Box } from "@mui/material";

import { yariga } from "../assets";

import { CredentialResponse } from "../interfaces/google";

// Define the Login component
export const Login: React.FC = () => {
    // Setup the login mutation with the useLogin hook
    const { mutate: login } = useLogin<CredentialResponse>({
        v3LegacyAuthProviderCompatible: true,
    });

    // Define the GoogleButton component
    const GoogleButton = (): JSX.Element => {
        // Create a reference for the button container
        const divRef = useRef<HTMLDivElement>(null);

        // Setup an effect to handle Google's One Tap sign-in
        useEffect(() => {
            // Check if the window object, Google object, and div reference are available
            if (
                typeof window === "undefined" ||
                !window.google ||
                !divRef.current
            ) {
                return;
            }

            try {
                // Initialize the Google One Tap sign-in
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    callback: async (res: CredentialResponse) => {
                        // If the response contains a credential, call the login mutation
                        if (res.credential) {
                            login(res);
                        }
                    },
                });
                // Render the Google sign-in button in the referenced container
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                });
            } catch (error) {
                console.log(error);
            }
        }, []); // you can also add your client id as dependency here

        // Return the container div for the Google sign-in button
        return <div ref={divRef} />;
    };

    // Return the main content of the Login component
    return (
        <Box
          component="div"
          sx={{
            background: "linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)",
          }}
        >
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="div"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  padding: "24px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)",
                }}
              >
                <div>
                  {/* Uncomment the line below to display the Yariga Logo */}
                  {/* <img src={yariga} alt="Yariga Logo" /> */}
                </div>
                <Box mt={4}>
                  {/* Render the GoogleButton component */}
                  <GoogleButton />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      );
            };