import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
  Progress,
  ModalFocusScope,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalHeader,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { userProfile } from "../../redux/action/userProfile";
import { useEffect } from "react";
import { axiosInstance } from "../../library/api";
import { useState } from "react";
import qs from "qs";
import M_avatar from "../modals/M_avatar";
import auth_types from "../../redux/reducers/types/auth";
import { WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import * as Yup from "yup";
import YupPassword from "yup-password";

import LinkNext from "next/link";
import M_changePassword from "../modals/M_changePassword/index";

const ProfileSetting = () => {
  YupPassword(Yup);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState();

  let passwordValidation = "";

  if (
    !/^[a-zA-Z0-9]+$/.test(password) ||
    !/\d/.test(password) ||
    !/\[A-Z]/.test(password)
  ) {
    passwordValidation = "Your password is too week";
  }
  const [userData, setUserData] = useState([]);
  const {
    fullname,
    email,
    username,
    id,

    gender,
    avatar_url,
    phone_number,
  } = userData;
  const [dataUsername, setDataUSername] = useState([]);
  const {
    isOpen: isOpenChangePass,
    onOpen: onOpenChangePass,
    onClose: onCloseChangePass,
  } = useDisclosure();

  const dispatch = useDispatch();
  const toast = useToast();
  const userSelector = useSelector((state) => {
    return state.auth;
  });
  const autoRender = useSelector((state) => {
    return state.render;
  });

  const renderDataUser = () => {
    axiosInstance.get(`/user/${userSelector?.id}`).then((res) => {
      const data = res.data.result;
      // console.log(data)
      setUserData(data);
    });
  };

  const fetchDataUser = async () => {
    await axiosInstance.get("/user").then((res) => {
      const dataUsername = res.data.result.usernames;
      setDataUSername(dataUsername);
    });
  };

  useEffect(() => {
    renderDataUser();
    fetchDataUser();
  }, [autoRender]);

  const formik = useFormik({
    initialValues: {
      id: userSelector?.id,
      fullname: userSelector?.fullname,
      username: userSelector?.username,

      gender: userSelector?.gender,
      avatar_url: userSelector?.avatar_url,
      phone_number: userSelector?.phone_number,
    },

    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("isi username anda")
        .test("Unique username", "Username already in use", function () {
          return new Promise((resolve) => {
            let check = dataUsername.find((val) => {
              return val == formik.values.username;
            });

            if (check) {
              formik.setFieldError("email", "Username already in use");
              resolve(false);
            } else {
              formik.setFieldError("email", "");
              resolve(true);
            }
          });
        }),

      phone_number: Yup.string()
        .min(12, "Must be at least 12 characters")
        .required("Phone number is required"),
    }),

    validateOnChange: false,
    onSubmit: async () => {
      const { fullname, username, gender, id, date_of_birth, phone_number } =
        formik.values;

      const body = {
        fullname,
        username,
        gender,
        date_of_birth,
        phone_number,
        // password,
      };

      try {
        await axiosInstance
          .patch(`/user/${id}`, qs.stringify(body))
          .then((val) => {
            dispatch({
              type: auth_types.AUTH_LOGIN,
              payload: val.data.user,
            });

            toast({
              title: "Your profile has been edited",
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
        toast({
          title: "Error",
          status: "error",
          duration: 1000,
        });
      }
      formik.setSubmitting(false);
    },
  });

  const reLink = async () => {
    // ini buat ngirim ulang link jwt kalo udah expired
    try {
      let body = {
        id: userSelector?.id,
        username: userSelector?.username,
        email: userSelector?.email,
        fullname: userSelector?.fullname,
        // phone_number: userSelector?.phone_number,
      };

      await axiosInstance.post("/user/new-link", qs.stringify(body));
      toast({
        tittle: "new link sending successfully",
        description: "please check your email",
        status: "success",
        duration: 1000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box maxW={"50%"} boxShadow={"dark-lg"}>
      <Box display={"flex"} p={5} alignItems={"center"} bgColor={"#ffdde1"}>
        <Avatar
          size="xl"
          name="Segun Adebayo"
          src={`http://${avatar_url}`}
          mr={10}
        />
        <Box p={5}>
          <Text mb={1}>{username}</Text>

          {/* mengganti avatar di Modals */}
          <M_avatar />
        </Box>

        {!userSelector.is_verified ? (
          <Button
            ml={2}
            color="white"
            fontSize={14}
            onClick={() => reLink()}
            bgColor={"orange.500"}
            _hover={{
              color: "orange",
              bgColor: "white",
              border: "2px solid orange",
            }}
            leftIcon={<WarningTwoIcon boxSize={4} />}
          >
            {" "}
            Send Verification Link
            {userSelector.is_verified} {/* // masih menjadi misteri */}
          </Button>
        ) : null}
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mb={3}
        bgColor={"white"}
        p={3}
      >
        <FormControl display={"flex"}>
          <FormLabel minW={"40%"} textAlign={"right"} mr={5}>
            Fullname
          </FormLabel>
          <Box maxW={"50%"}>
            <Input
              type={"text"}
              // maxW={"70%"}
              textAlign={"justify"}
              onChange={(event) =>
                formik.setFieldValue("fullname", event.target.value)
              }
              defaultValue={fullname}
            />
            {/* <Text fontSize={14}>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name
            </Text> */}
          </Box>
        </FormControl>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"white"}
        p={3}
      >
        <FormControl display={"flex"} isInvalid={formik.errors.username}>
          <FormLabel minW={"40%"} textAlign={"right"} mr={5}>
            Username
          </FormLabel>
          <Box maxW={"50%"}>
            <Input
              type={"text"}
              // maxW={"70%"}
              textAlign={"justify"}
              onChange={(event) =>
                formik.setFieldValue("username", event.target.value)
              }
              defaultValue={username}
            />
            <Text fontSize={14}>Username must be unique</Text>
          </Box>
          <FormHelperText textAlign={"left"} ml={2} mt={0} mb={2} color={"red"}>
            {formik.errors.username}
          </FormHelperText>
        </FormControl>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"white"}
        p={3}
      >
        <FormControl display={"flex"}>
          <FormLabel minW={"40%"} textAlign={"right"} mr={5}>
            Email
          </FormLabel>
          <Box maxW={"50%"}>
            <Input
              type={"text"}
              // maxW={"70%"}
              isDisabled
              bgColor={"grey"}
              defaultValue={email}
            />
            <Text fontSize={14} color={"red.500"}>
              * Email can't be changed
            </Text>
          </Box>
        </FormControl>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"white"}
        p={3}
      >
        <FormControl display={"flex"}>
          <FormLabel minW={"40%"} textAlign={"right"} mr={5}>
            Phone Number
          </FormLabel>
          <Box maxW={"50%"}>
            <Input
              type={"text"}
              // maxW={"70%"}
              textAlign={"justify"}
              onChange={(event) =>
                formik.setFieldValue("phone_number", event.target.value)
              }
              defaultValue={phone_number}
            />
            {/* <Text fontSize={14}>Username must be unique</Text> */}
          </Box>
        </FormControl>
      </Box>

      {/* BUTTON CHANGE PASSWORD */}

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"white"}
        p={3}
      >
        <FormControl display={"flex"}>
          <FormLabel minW={"40%"} textAlign={"right"} mr={5}>
            Password
          </FormLabel>
          <Box maxW={"50%"}>
            {/* <Button>
              <M_changePassword />
            </Button> */}

            <Text fontWeight={"bold"}>
              <Link onClick={onOpenChangePass}>Change Password</Link>
            </Text>

            <Modal
              isOpen={isOpenChangePass}
              onClose={onCloseChangePass}
              size="md"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <M_changePassword />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </FormControl>
      </Box>

      {/* CHANGE PASSWORD */}

      {/* <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"white"}
        p={3}
      >
        <FormControl
          px={2}
          ml={"110px"}
          maxW={"70%"}
          // isRequired
          isInvalid={formik.errors.password}
        >
          <InputGroup>
            <Input
              required
              // isRequired
              type={showPassword ? "text" : "password"}
              variant="filled"
              className="inputPlaceholder"
              onChange={(event) =>
                formik.setFieldValue("password", event.target.value)
              }
            />
            <FormLabel className="labelPlaceholder">
              &nbsp;Password&nbsp;
            </FormLabel>

            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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

          <FormHelperText textAlign={"left"} ml={2} mb={2} mt={0} color={"red"}>
            {password && formik.errors.password ? passwordValidation : null}{" "}
            {formik.errors.password}
          </FormHelperText>
        </FormControl>
      </Box> */}

      {/* CONFIRM PASSWORD */}

      {/* <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgColor={"white"}
        p={3}
      >
        <FormControl
          px={2}
          ml={"110px"}
          maxW={"70%"}
          // isRequired
          isInvalid={formik.errors.password}
        >
          <InputGroup>
            <Input
              // type={"text"}
              // maxW={"70%"}
              required
              textAlign={"justify"}
              type={showConfirmPassword ? "text" : "password"}
              variant="filled"
              className="inputPlaceholder"
              onChange={(event) =>
                formik.setFieldValue("confirmPassword", event.target.value)
              }
            />
            <FormLabel className="labelPlaceholder">Confirm Password</FormLabel>

            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() =>
                  setShowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <FormHelperText textAlign={"left"} ml={2} mt={0} mb={2} color={"red"}>
            {formik.errors.confirmPassword}
          </FormHelperText>
        </FormControl>
      </Box> */}

      <Box align={"center"} margin={"25px 0"}>
        <LinkNext href="/home">
          <Button colorScheme={"red"} mr={20} p={"0 20px"}>
            CANCEL
          </Button>
        </LinkNext>
        <Button
          colorScheme={"green"}
          p={"0 20px"}
          onClick={formik.handleSubmit}
        >
          SUBMIT
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSetting;
