import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import { Button } from "@mui/material";

import { logo, yariga } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/"> Men-Tell Health
                {/* {collapsed ? (
                    <img src={logo} alt="Yariga" width="28px" />
                ) : (
                    <img src={yariga} alt="Refine" width="140px" />
                )} */}
            </Link>
        </Button>
    );
};