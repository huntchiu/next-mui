import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";
import Navbar from "../Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      {children}
    </Container>
  );
};
export default Layout;
