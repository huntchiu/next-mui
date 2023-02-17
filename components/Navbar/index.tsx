import { AppBar, Avatar, Box, Container, IconButton } from "@mui/material";
import { Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link as MUILink } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "../Link";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data: session, status } = useSession();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link href="/" color="inherit">
              <Typography variant="h5" noWrap>
                Tcdire
              </Typography>
            </Link>

            {/* flexGrow: 1 使 AppBar第2個元素佔滿剩下的所有寬度*/}
            <Box sx={{ flexGrow: 1 }}></Box>
            {!session ? (
              <Box
                sx={{
                  "& > :not(style) + :not(style)": {
                    ml: 2,
                  },
                }}
              >
                <Link href="/auth/signin" color="inherit">
                  登入
                </Link>
                <Link href="/auth/signup" color="inherit">
                  註冊
                </Link>
              </Box>
            ) : (
              <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar alt="TAvatar" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <Link href="/me" color="inherit" onClick={handleMenuClose}>
                      个人资料
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <MUILink
                      color="inherit"
                      underline="none"
                      onClick={() => {
                        handleMenuClose();
                        signOut({ callbackUrl: "/auth/signin" });
                      }}
                      sx={{ width: 1 }}
                    >
                      退出
                    </MUILink>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};
export default Navbar;
