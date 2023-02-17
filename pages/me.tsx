import type { FC, ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { NextPageWithLayout } from "../pages/_app";
import Layout from "../components/Layout";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { profile } from "../services/UserService";

const Me: NextPageWithLayout = () => {
  const router = useRouter();

  const { data: session } = useSession({ required: true });
  const { data, status } = useQuery(
    ["me"],
    async () => await profile({ session }),
    {
      enabled: !!session?.jwt,
    }
  );

  if (status === "loading" || !data) return null;

  return (
    <main>
      <Box sx={{ padding: "60px 0 28px" }}>
        <Stack direction="row" justifyContent="center" spacing={4}>
          <Avatar
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{ width: 120, height: 120 }}
          />
          <Stack direction="column" justifyContent="center">
            <Typography variant="h4" color="initial">
              {data.username}
            </Typography>
            <Typography variant="body1" color="initial">
              ht
            </Typography>
            <Typography variant="body1" color="initial">
              ht
            </Typography>
          </Stack>
        </Stack>
        {JSON.stringify(data || null)}
      </Box>
    </main>
  );
};

Me.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Me;
