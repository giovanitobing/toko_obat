import {
  AddIcon,
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  EditIcon,
  HamburgerIcon,
  SettingsIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { BsHeartFill, BsCart4 } from "react-icons/bs";
// import  from "../../modals/";
import { CgProfile, CgLogOut, CgHome } from "react-icons/cg";

import { BsShop } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import jsCoockie from "js-cookie";
import Image from "next/image";
import Logo from "../../../public/NavbarLogo.gif";
import NavbarAvatar from "../../../public/NavbarAvatar.png";
import { useRouter } from "next/router";
import auth_types from "../../../redux/reducers/types/auth";
import { axiosInstance } from "../../../library/api";
import qs from "qs";
// import Loading from "../../../public/Loading.gif";
import Loading from "../../../public/LoginLogo3.gif";
import { useEffect, useState } from "react";

const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userSelector = useSelector((state) => {
    return state.auth;
  });

  const autoRender = useSelector((state) => {
    return state.post;
  });

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    jsCoockie.remove("auth_token");

    dispatch({
      type: auth_types.AUTH_LOGOUT,
    });
    setIsLoading(true);
    router.push("/auth");
  };

  // const reLink = async () => {
  //   // ini buat ngirim ulang link jwt kalo udah expired
  //   try {
  //     let body = {
  //       id: userSelector?.id,
  //       username: userSelector?.username,
  //       email: userSelector?.email,
  //       fullname: userSelector?.fullname,
  //     };

  //     await axiosInstance.post("/user/new-link", qs.stringify(body));
  //     toast({
  //       tittle: "new link sending successfully",
  //       description: "please check your email",
  //       status: "success",
  //       duration: 1000,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    setIsLoading(false);
  }, [autoRender]);

  return (
    <Box
      top={0}
      position={"sticky"}
      zIndex={2}
      border={"2px"}
      borderColor="#FF8AAE"
    >
      <Flex bgColor={"#ffffff"} px={3} align={"center"} alignItems={"center"}>
        <HStack flex={4} align={"center"}>
          <Link href="/home">
            <Image src={Logo} alt="Logo" width={130} height={60} />
          </Link>
          <Text>Welcome Back, {userSelector.username}</Text>
        </HStack>

        <Box
          flex={8}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          <FormControl maxW={"75%"}>
            <Input type={"text"} placeholder={"Search...."} bgColor={"white"} />
          </FormControl>
        </Box>

        <Box
          flex={4}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"space-evenly"}
        >
          <Button
            bgColor={"#e3e3e3"}
            _activeLink={"/home"}
            // disabled={userSelector?.is_verified ? false : true}

            //.... untuk mem-protected
          >
            {/* <Link href={userSelector?.is_verified ? "/home" : null}> */}
            <Link href="/home">
              <Icon boxSize={6} as={FaHome} />
            </Link>
          </Button>

          {/* Add new Product */}

          <Button bgColor={"#e3e3e3"}>
            <Icon boxSize={6} as={BsShop} />
          </Button>

          {/* {userSelector?.is_verified ? (
              <Button bgColor={"#e3e3e3"}>
                <Icon boxSize={6} as={BsHeartFill} />
              </Button>
            ) : (
              <Button bgColor={"#e3e3e3"} disabled>
                <Icon boxSize={6} as={BsHeartFill} />
              </Button>
            )} 

          {/* {userSelector?.is_verified ? (
            <Button bgColor={"#e3e3e3"}>
              <Icon boxSize={6} as={BsCart4} />
            </Button>
          ) : (
            <Button bgColor={"#e3e3e3"} disabled>
              <Icon boxSize={6} as={BsCart4} />
            </Button>
          )} */}

          {/* {userSelector?.is_verified ? (
              <Button bgColor={"#e3e3e3"}>
                <Icon boxSize={6} as={ChatIcon} />
              </Button>
            ) : (
              <Button bgColor={"#e3e3e3"} disabled>
                <Icon boxSize={6} as={ChatIcon} />
              </Button>
            )} */}
        </Box>

        <Menu>
          <MenuButton bgColor={"#ffffff"}>
            <Avatar
              size="md"
              name={userSelector?.username}
              src={`http://${userSelector?.avatar_url}`}
              // src="https://m.media-amazon.com/images/I/715FkGUr7jL._SL1500_.jpg"
            />
          </MenuButton>
          <MenuList>
            {/* <Link href={`/profile/${userSelector?.id}`}>
              <MenuItem icon={<CgProfile />}>Profile</MenuItem>
            </Link> */}
            <Link href={`/profile/setting/${userSelector?.id}`}>
              <MenuItem icon={<EditIcon />}>Edit Profile</MenuItem>
            </Link>
            <MenuDivider />
            <MenuItem icon={<CgLogOut />} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default NavbarAdmin;
