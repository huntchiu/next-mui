import type { FC, ReactNode } from "react";
import { Link as MUILink, LinkProps } from "@mui/material";
import NextLink from "next/link";

interface MyLinkProps extends LinkProps {
  href: string;
  children?: ReactNode;
}

const Link: FC<MyLinkProps> = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <MUILink underline="none" {...rest}>
        {children}
      </MUILink>
    </NextLink>
  );
};
export default Link;
