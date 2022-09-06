import { Flex, Box } from "@chakra-ui/react";
import Navbar from "../../components/Home/Navbar";
import ProfilePage from "../../components/Profile";

const userProfile = () => {
  return (
    <>
      <Navbar />
      <Flex flexWrap={"wrap"} justifyContent={"center"}>
        <ProfilePage />
      </Flex>
    </>
  );
};

export default userProfile;
