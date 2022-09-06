import {
  Container,
  Box,
  Stack,
  HStack,
  Flex,
  VStack,
  Center,
  Button,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";

// import ContentCard from "./ContentCard";
import { useState } from "react";
import { axiosInstance } from "../../library/api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";
import Image from "next/image";
// import Loading from "../../public/Loading.gif";
import Loading from "../../public/LoginProject.gif";
// import InfiniteScroll from "react-infinite-scroller";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state) => {
    return state.auth;
  });

  const autoRender = useSelector((state) => {
    return state.render;
  });
  const [loadPage, setLoadPage] = useState(1);
  const [contentList, setContentList] = useState([]);

  const fetchData = async () => {
    await axiosInstance
      .get("/post")
      .then((res) => {
        const data = res.data.result;
        console.log(data);
        setContentList(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (autoRender?.value !== undefined) {
      setLoadPage(loadPage);
      fetchData();
      console.log(contentList);
    }
  }, [autoRender?.value]);

  useEffect(() => {
    if (!userSelector.id) {
      Router.push("/auth");
    } else {
      setIsLoading(false);
    }
  }, [userSelector?.id]);

  return (
    <>
      {isLoading ? (
        <Center minHeight={"100vh"} bgColor="white">
          <Image src={Loading} alt="" />
        </Center>
      ) : (
        <>{userSelector?.role == "admin" ? <NavbarAdmin /> : <Navbar />}</>
      )}
    </>
  );
};

export default Home;
