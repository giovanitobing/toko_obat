import {
  Box,
  Text,
  Stack,
  Heading,
  Button,
  InputGroup,
  Icon,
  FormHelperText,
  Progress,
  InputRightElement,
  FormControl,
  FormLabel,
  Input,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../../library/api";
import auth_types from "../../../redux/reducers/types/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import qs from "qs";

export default function MchangePassword() {
  const [passwordViewOld, setPasswordViewOld] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const toast = useToast();
  const autoRender = useSelector((state) => {
    return state.render;
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      repassword: "",
      oldpassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password should be of minimum 8 characters length")
        .matches(
          /\w*[a-z]\w*/,
          "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        ) // lower
        .matches(
          /\w*[A-Z]\w*/,
          "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        ) // upper
        .matches(
          /\d/,
          "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        ) //must have number
        .matches(
          /[!@#$%^&*()\-_"=+{}; :,<.>]/,
          "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"
        ), //special char
      repassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords is not match")
        .required("Confirm password is required"),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { password, oldpassword } = formik.values;

      const { restoken } = router.query;

      try {
        let body = {
          password: password,
          oldpassword: oldpassword,
        };

        const res = await axiosInstance
          .patch(
            `/user/editChangePassword/${userSelector.id}`,
            qs.stringify(body)
          )
          .then((val) => {
            dispatch({
              type: auth_types.AUTH_LOGIN,
              payload: val.data.user,
            });

            toast({
              title: "Your password has been changed",
              status: "success",
              duration: 1000,
            });

            dispatch({
              type: "AUTO_RENDER",
              payload: {
                value: !autoRender.value,
              },
            });
          });
      } catch (err) {
        console.log(err);
        // toast({
        //   title: "Error",
        //   status: "error",
        //   duration: 1000,
        // });
      }
      formik.setSubmitting(false);
    },
  });

  return (
    <>
      {/* ---------- Old Password ---------- */}

      <FormControl isRequired isInvalid={formik.errors.confirmPassword}>
        <InputGroup>
          <Input
            required
            isRequired
            type={passwordViewOld ? "text" : "password"}
            variant="filled"
            className="inputPlaceholder"
            onChange={(event) =>
              formik.setFieldValue("oldpassword", event.target.value)
            }
          />
          <FormLabel className="labelPlaceholder">
            &nbsp;Old Password &nbsp;
          </FormLabel>

          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() =>
                setPasswordViewOld((passwordViewOld) => !passwordViewOld)
              }
            >
              {passwordViewOld ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText textAlign={"left"} ml={2} mb={2} mt={0} color={"red"}>
          {formik.errors.confirmPassword}
        </FormHelperText>
      </FormControl>

      {/* ---------- New Password ---------- */}
      <FormControl
        id="password"
        marginTop={"20px"}
        mb={"7px"}
        isInvalid={formik.errors.password}
      >
        <InputGroup>
          <Input
            required
            isRequired
            variant={"filled"}
            className="inputPlaceholder"
            type={passwordView ? "text" : "password"}
            onChange={(event) =>
              formik.setFieldValue("password", event.target.value)
            }
          />
          <FormLabel className="labelPlaceholder">
            &nbsp; New Password &nbsp;
          </FormLabel>
          <InputRightElement>
            <Button
              variant={"ghost"}
              onClick={() => setPasswordView((passwordView) => !passwordView)}
            >
              {passwordView ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.values.password.length > 7 &&
        formik.values.password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ) ? (
          <>
            <Progress value={100} size="xs" colorScheme="green" />
            <Text fontWeight="semibold" color="green">
              Strong
            </Text>
          </>
        ) : formik.values.password.length > 5 &&
          formik.values.password.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/
          ) ? (
          <>
            <Progress value={75} size="xs" colorScheme="yellow" />
            <Text fontWeight="semibold" color="#dbe300">
              Medium
            </Text>
          </>
        ) : formik.values.password.length > 4 &&
          formik.values.password.match(
            /^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
          ) ? (
          <>
            <Progress value={50} size="xs" colorScheme="red" />
            <Text fontWeight="semibold" color="orange">
              Weak
            </Text>
          </>
        ) : formik.values.password.length > 0 &&
          formik.values.password.match(/^(?=.*[a-z])/) ? (
          <>
            <Progress value={25} size="xs" colorScheme="red" />
            <Text fontWeight="semibold" color="red">
              Very weak
            </Text>
          </>
        ) : (
          <></>
        )}
        <FormHelperText textAlign={"center"} color="red">
          {formik.errors.password}
        </FormHelperText>
      </FormControl>

      {/* ---------- Confirm New Password ---------- */}
      <FormControl
        id="repassword"
        marginTop={"20px"}
        isInvalid={formik.errors.repassword}
      >
        <InputGroup>
          <Input
            required
            isRequired
            variant={"filled"}
            className="inputPlaceholder"
            type={confirmNewPassword ? "text" : "password"}
            onChange={(event) =>
              formik.setFieldValue("repassword", event.target.value)
            }
          />
          <FormLabel className="labelPlaceholder">
            &nbsp; Confirm New Password &nbsp;
          </FormLabel>
          <InputRightElement>
            <Button
              variant={"ghost"}
              onClick={() =>
                setConfirmNewPassword(
                  (confirmNewPassword) => !confirmNewPassword
                )
              }
            >
              {confirmNewPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText color="red">{formik.errors.repassword}</FormHelperText>
      </FormControl>

      <Button onClick={formik.handleSubmit} colorScheme="green" mt={"10px"}>
        SUBMIT
      </Button>
      {/* bgColor='#33bbff' */}
    </>
  );
}
