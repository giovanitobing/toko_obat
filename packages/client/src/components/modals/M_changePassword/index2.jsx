import {
  Button,
  Input,
  Text,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../library/api";

const M_changePassword = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const autoRender = useSelector((state) => {
    return state.render;
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (value) => {
      const { email } = formik.values;
      try {
        let body = {
          email,
        };

        const bodyParsed = await qs.stringify(body);

        await axios
          .post(`http://localhost:2000/user/sendResetPassword`, bodyParsed)
          .then(() => {
            toast({
              title: "Your link has been sended successfully",
              status: "success",
              duration: 1000,
            });
          })
          .then(onClose());
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <Button variant="link" style={{ textDecoration: "none" }}>
        <Text color={"#5DBA7D"}>Change Password?</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password?</ModalHeader>
          <ModalBody>
            <Text mb={2}>
              Please enter your account's email for change your password
            </Text>
            <Input
              onChange={async (event) => {
                await formik.setFieldValue("email", event.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              CANCEL
            </Button>

            <Button
              variant="ghost"
              colorScheme={"green"}
              onClick={async () => {
                await formik.handleSubmit();
              }}
            >
              SEND
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default M_changePassword;
