import { Box, Card, CardContent } from "@mui/material";
import { InputAdornment, TextField, Typography } from "@mui/material";
import Link from "../../components/Link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import request from "../../helpers/request";

interface IUserFormValues {
  email: string;
  password: string;
}

const SignupPage = ({}) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("邮箱必须是有效的电子邮件")
          .required("邮箱是必填的字段"),
        password: yup
          .string()
          .min(6, "密码必须至少为 6 个字符")
          .max(15, "密码必须至多为 15 个字符")
          .required("密码是必填的字段"),
        // confirmPassword: yup
        //   .string()
        //   .oneOf([yup.ref("password"), null], "两次密码输入不一致")
        //   .required("密码是必填的字段"),
      })
    ),
  });

  const registerUser = async (data: IUserFormValues) => {
    return request.post("/auth/local/register", {
      ...data,
      username: data.email,
    });
  };
  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: (data) => {
      toast.success("注册成功 !", {
        onClose: () => router.push("/auth/signin"),
      });
    },
    onError: (error) => {
      // if (axios.isAxiosError(error)) {
      //   const data = error.response?.data as IRestApiError;
      //   toast.error(data?.error.message);
      // } else {
      //   console.log(error);
      // }
    },
  });

  const handleSubmitForm = (data: IUserFormValues) => {
    mutate(data);
  };

  return (
    <Card
      sx={{
        mt: 18,
        maxWidth: {
          lg: "15%",
          sm: "35%",
          xs: "100%",
        },
        mx: "auto",
      }}
    >
      <CardContent>
        <Typography variant="h5" textAlign="center">
          账号注册
        </Typography>
        <Box component="form" sx={{ my: 2 }}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                fullWidth
                size="small"
                margin="dense"
                placeholder="邮箱"
                // 显示表单验证的错误信息
                helperText={errors.email?.message}
                error={errors.email ? true : false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                fullWidth
                size="small"
                margin="dense"
                placeholder="密码"
                type="password"
                helperText={errors.password?.message}
                error={errors.password ? true : false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ fontSize: 20, color: "#8d8b90" }} />
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />
          <LoadingButton
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleSubmit(handleSubmitForm)}
            sx={{ mt: 2 }}
            loading={isLoading}
          >
            注册
          </LoadingButton>
        </Box>
        <Typography variant="body2" textAlign="center">
          已经有账号?点此
          <Link href="/auth/signin">登入账号</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SignupPage;
