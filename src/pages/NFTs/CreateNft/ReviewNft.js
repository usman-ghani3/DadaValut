import React from "react";
import {
    Box,
    Button,
    Flex,
    Grid,
    Badge,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Table,
    Tbody,
    Td,
    Image,
    Select,
    Divider,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    Link,
    Stack,
    Icon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    FormLabel,
    Textarea,
    RadioGroup, Radio, Container,
} from "@chakra-ui/react";
import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react";
import PreviewImg from '../../../assets/images/image2.png';

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"

function ReviewNft(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef()

    const state = useSelector(state => state);
    const {mintsteps,accountInfo}  =   state?.TradingBot
    const dispatch = useDispatch();
    const handleClick =async() => {
        dispatch(setMintSteps(mintsteps+1))
    };



    return (
        
        <>
            <Box width={'90%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'}>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}  pt={'3rem'}>
                    <Box>
                        <Heading fontSize={'2rem'} color={'#000'} fontWeight={'700'} mb={2}>Review</Heading>
                        <Text  fontSize={'1rem'} color={'#4A5568'} fontWeight={'400'}>Tellus ipsum ridiculus tempor ultricies. Felis nec eget nisi malesuada fringilla. Sit id.</Text>
                    </Box>
                    <Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Flex templateColumns="repeat(2, 2fr)"   pt={'3rem'} m={'auto'} flexWrap={'wrap'} w={{base:"100%",md:"80%", lg:'80%',xl:'60%'}}>
                                <Box width={{base:'100%',sm:'100% ' ,md:'70%'}} pr={2} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Box p={10} bg={'#C4C4C422'} minH={'600px'}>
                                        <Image src={PreviewImg} width={'100%'}  />
                                        <Grid templateColumns="repeat(2, 1fr)" gap={6}  pt={'3rem'}>
                                            <Box>
                                                <Text color={'#000000'} fontWeight={'300'} fontSize={'16px'}>Magdalena Murua</Text>
                                                <Heading color={'#000000'} fontWeight={'600'} fontSize={'16px'} >Empty Diamonds,    2019, Ed. 1/1</Heading>
                                            </Box>
                                            <Box>
                                                <Text color={'#000000'} fontWeight={'300'} textAlign={'right'}>$ 2000</Text>
                                            </Box>
                                        </Grid>
                                    </Box>

                                </Box>
                                <Box width={{base:'100%', sm:'80%' ,md:'30%'}} pl={2} d={'flex'} flexDirection={'column'}  m={'auto'} mt={{base:'1rem',md:'0rem'}}>
                                    <Box display={'flex'} >
                                        <Button mx={'auto'} w={'48%'} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  marginLeft='auto' marginRight={'1rem'} >Edit</Button>
                                        <Button mx={'auto'} w={'48%'} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  marginLeft='auto' marginRight={'1rem'} >Delete</Button>
                                    </Box>
                                    <Button mt={'2em'} bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }} fontWeight={'600'} fontSoze={'16px'} w={'100%'} onClick={onOpen}>
                                        <Icon width={'20px'} height={'20px'} mr={2} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 9.12538C7.70163 9.12538 7.41548 9.00685 7.2045 8.79587C6.99353 8.58489 6.875 8.29874 6.875 8.00038C6.875 7.70201 6.99353 7.41586 7.2045 7.20488C7.41548 6.9939 7.70163 6.87538 8 6.87538C8.29837 6.87538 8.58452 6.9939 8.7955 7.20488C9.00647 7.41586 9.125 7.70201 9.125 8.00038C9.125 8.29874 9.00647 8.58489 8.7955 8.79587C8.58452 9.00685 8.29837 9.12538 8 9.12538ZM7.604 11.3709C7.73525 11.5284 7.86725 11.6814 8 11.8276C8.13275 11.6814 8.26475 11.5291 8.396 11.3709C8.13203 11.3765 7.86797 11.3765 7.604 11.3709ZM6.10775 11.2771C5.5318 11.2172 4.95965 11.125 4.394 11.0011C4.33775 11.2636 4.295 11.5186 4.2665 11.7631C4.124 12.9504 4.32275 13.6719 4.625 13.8459C4.92725 14.0206 5.651 13.8316 6.60875 13.1154C6.806 12.9676 7.00475 12.8034 7.20425 12.6241C6.81387 12.196 6.4478 11.7463 6.10775 11.2771ZM11.606 11.0011C11.0683 11.1211 10.4937 11.2141 9.89225 11.2771C9.5522 11.7463 9.18613 12.196 8.79575 12.6241C8.99525 12.8041 9.194 12.9676 9.39125 13.1154C10.349 13.8316 11.0728 14.0206 11.375 13.8459C11.6772 13.6719 11.8752 12.9504 11.7343 11.7631C11.7033 11.5073 11.6608 11.2531 11.6068 11.0011H11.606ZM12.6935 10.7109C13.1262 12.6901 12.899 14.2659 11.9375 14.8209C10.976 15.3759 9.49775 14.7849 8 13.4206C6.50225 14.7849 5.024 15.3751 4.0625 14.8201C3.101 14.2651 2.87375 12.6901 3.30575 10.7101C1.37525 10.0959 0.125 9.11038 0.125 8.00038C0.125 6.89038 1.37525 5.90563 3.30575 5.28988C2.87375 3.31063 3.101 1.73488 4.0625 1.17988C5.024 0.624875 6.50225 1.21588 8 2.58013C9.49775 1.21588 10.976 0.625626 11.9375 1.18063C12.899 1.73563 13.1263 3.31063 12.6943 5.29063C14.6248 5.90488 15.875 6.89038 15.875 8.00038C15.875 9.11038 14.6248 10.0951 12.6943 10.7109H12.6935ZM7.2035 3.37663C7.01277 3.20398 6.81432 3.04006 6.60875 2.88538C5.651 2.16913 4.92725 1.98013 4.625 2.15488C4.32275 2.32888 4.12475 3.05038 4.26575 4.23763C4.29575 4.48288 4.33775 4.73713 4.39325 4.99963C4.95915 4.87568 5.53154 4.78353 6.10775 4.72363C6.464 4.23388 6.8315 3.78313 7.20425 3.37663H7.2035ZM9.89225 4.72363C10.4937 4.78663 11.0683 4.88038 11.606 4.99963C11.6623 4.73713 11.705 4.48213 11.7335 4.23763C11.876 3.05038 11.6772 2.32888 11.375 2.15488C11.0728 1.98013 10.349 2.16913 9.39125 2.88538C9.18543 3.04004 8.98673 3.20396 8.79575 3.37663C9.1685 3.78313 9.536 4.23388 9.89225 4.72363ZM8.396 4.62988C8.26475 4.47238 8.13275 4.31938 8 4.17313C7.86725 4.31938 7.73525 4.47163 7.604 4.62988C7.86797 4.62427 8.13203 4.62427 8.396 4.62988ZM5.279 10.0284C5.14217 9.8027 5.01014 9.57415 4.883 9.34288C4.81175 9.53563 4.74575 9.72538 4.68575 9.91363C4.8785 9.95563 5.0765 9.99388 5.27825 10.0284H5.279ZM6.728 10.2039C7.57483 10.2668 8.42517 10.2668 9.272 10.2039C9.7499 9.50184 10.1751 8.76532 10.544 8.00038C10.1751 7.23543 9.7499 6.49891 9.272 5.79688C8.42517 5.73398 7.57483 5.73398 6.728 5.79688C6.2501 6.49891 5.82493 7.23543 5.456 8.00038C5.82493 8.76532 6.2501 9.50184 6.728 10.2039ZM11.117 6.65788C11.1883 6.46513 11.2543 6.27538 11.3143 6.08713C11.1176 6.04446 10.9201 6.0062 10.7218 5.97237C10.8583 6.19806 10.9901 6.42661 11.117 6.65788ZM3.5975 6.37813C3.3425 6.46063 3.101 6.55062 2.8745 6.64813C1.77575 7.11912 1.25 7.65163 1.25 8.00038C1.25 8.34913 1.775 8.88163 2.8745 9.35263C3.101 9.45013 3.3425 9.54013 3.5975 9.62263C3.764 9.09763 3.97025 8.55313 4.21625 8.00038C3.97987 7.4716 3.77329 6.93001 3.5975 6.37813ZM4.685 6.08713C4.74575 6.27463 4.81175 6.46513 4.883 6.65712C5.01015 6.4261 5.14218 6.1978 5.279 5.97237C5.0765 6.00688 4.8785 6.04513 4.68575 6.08713H4.685ZM12.4025 9.62263C12.6575 9.54013 12.899 9.45013 13.1255 9.35263C14.2242 8.88163 14.75 8.34913 14.75 8.00038C14.75 7.65163 14.225 7.11912 13.1255 6.64813C12.8887 6.54725 12.6475 6.45716 12.4025 6.37813C12.236 6.90313 12.0297 7.44763 11.7838 8.00038C12.0297 8.55313 12.236 9.09688 12.4025 9.62263ZM11.315 9.91363C11.2543 9.72613 11.1883 9.53563 11.117 9.34363C10.9899 9.57465 10.8578 9.80295 10.721 10.0284C10.9235 9.99388 11.1215 9.95563 11.3143 9.91363H11.315Z" fill="white"/>
                                        </Icon>
                                        Mint NFT
                                    </Button>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Grid>

            </Box>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody p={4}>
                        <Box>
                            <Text fontSize={'12px'} color={'#718096'} textAlign={'center'} mb={3} fontWeight={'700'}>Mint Tiger Ed. 1/1</Text>
                            <Text fontSize={'18px'} color={'#1A202C'} textAlign={'center'} fontWeight={'400'}>Count:1</Text>
                            <Box display={'flex'}>
                                <Box display={'flex'} width={'50%'} mx={'auto'}>
                                    <Button mx={'auto'} w={'48%'} onClick={onClose} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D'_focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  marginLeft='auto' marginRight={'1rem'} >Cancel</Button>
                                    <Button mx={'auto'} w={'50%'} textAlign={'center'} border='1px solid #C4C4C4' bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  marginLeft='auto' onClick={handleClick} >Mint</Button>

                                </Box>
                            </Box>
                        </Box>
                    </ModalBody>

                </ModalContent>
            </Modal>




        </>

    );
}

export default ReviewNft;
