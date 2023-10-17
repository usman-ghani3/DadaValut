import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,

    Input,
    Text,

    Grid,
    Modal,
    ModalOverlay,
    ModalContent,

    ModalCloseButton,
    useColorModeValue as mode, Heading, Stack, Icon, Divider,
    Spinner,
    useToast,
    useDisclosure, ModalBody,
    Link
} from "@chakra-ui/react";
import { Formik } from "formik";
import { ARTWORKDETAILS, REVENUESPLIT, SALEINFORMATION, TRANSACTIONHISTORY } from "../../components";
import CreateNFTStep1 from "../NFTs/CreateNft/CreateNftStep1";
import CreateNFTStep2 from "../NFTs/CreateNft/CreateNftStep2";
import CreateNFTStep3 from "../NFTs/CreateNft/CreateNftStep3";
import CreateNFTStep4 from "../NFTs/CreateNft/CreateNftStep4";
import CryptoJS from 'crypto-js';
import { IoCloseCircleOutline } from "react-icons/io5";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import Dummy from "../../assets/images/dummy.png";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { BioRymHeading } from "../../assets/StyledComponent/styeledComponent";
import server from "../../apis/server";
import { setToken } from "../../redux/action/tradingBot";
import { setUser } from "../../redux/action/tradingBot";
import { Link as ReachLink, navigate } from "@reach/router"
import { useDispatch, useSelector } from 'react-redux'
import { IoExit } from "react-icons/io5";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import * as yup from "yup";
import { NonceProvider } from "react-select";
const InfuraId = process.env.REACT_APP_INFURA_ID;
const AccountSetting = () => {
    const infuraId = InfuraId;
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: infuraId, // required
            },
        },
    };
    const toast = useToast()
    const dispatch = useDispatch();
    const User1 = JSON.parse(localStorage.getItem("User"))

    const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject") : "";
    const userType = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : ""
    const userID = userType?._id
    const userAccount = userType?.account_type
    const [loader, setLoader] = useState(true)
    const [componentUpdater, setComponentUpdater] = useState(true)
    const [passwordString, setPasswordString] = useState("")


    console.log(userType?._id)
    const { isOpen: isChangeEmailOpen, onOpen: onChangeEmailOpen, onClose: onChangeEmailClose
    } = useDisclosure();

    const {
        isOpen: changepasswordModalOpen,
        onOpen: onOpenchangepasswordModal,
        onClose: onClosechangepasswordModal,
    } = useDisclosure();
    const {
        isOpen: Change2FAModalOpen,
        onOpen: onOpenChange2FAModal,
        onClose: onCloseChange2FAModal,
    } = useDisclosure();
    const [accountData, setAccountData] = useState([])
    useEffect(() => {
        load();
    }, [componentUpdater]);
    let validationSchemaEmail = yup.object({

        newemail: yup.string().email('Invalid email').required('This field is required.'),


    });
    let validationSchemaPassword = yup.object({
        currentPassword: yup.string().required('This field is required.'),
        newPassword: yup.string().required('This field is required.'),


    });
    async function load() {
        console.log(userID)
        console.log(userAccount)
        ///users/getAccountSettingsData
        const { data } = await server.post(
            "users/getAccountSettingsData",
            {
                'userId': userID,
                'accountType': userAccount
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (data) {
            if (!(data.error && data.message)) {
                console.log(data)
                setAccountData(data)
                setLoader(false)
                if (data?.password?.length > 0)
                    setPasswordString(Array(data?.password?.length + 1).join("."))

            }
        }
    }
    async function handleEmailChange(values, resetForm) {
        console.log(values.currentemail)

        setLoader(true)
        let dataa = {
            currentEmail: values.currentemail,
            updatedEmail: values.newemail,
        }
        console.log(dataa)
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
        try {
            const { data } = await server.post(
                "users/changeEmail",

                {
                    payload: ciphertext
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (data) {
                console.log(data)
                onChangeEmailClose()
                if (data?.message) {
                    toast({
                        title: 'You tried to change your email address',
                        description: `Please click on a link in your email to change your email`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true, variant: 'top-accent',
                        position: 'top-right',
                    })
                }
                else if (data?.error) {
                    toast({
                        title: 'New email already exists',

                        status: 'error',
                        duration: 4000,
                        isClosable: true, variant: 'top-accent',
                        position: 'top-right',
                    })
                }
                setLoader(false)
                // setCheckForgetStatus(true)
            }
        }
        catch (e) {

            toast({
                title: 'Failed',
                description: `${e.message}`,
                status: 'error',
                duration: 4000,
                isClosable: true, variant: 'top-accent',
                position: 'top-right',
            })
        }

        // const {data} = await server.post(
        //     "users/changeEmail",  
        //    {
        //     'currentEmail':values?.email,
        //      'updatedEmail':values?.updatedEmail
        //    } ,
        //     { 
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     } 
        //   )
    }


    async function handlePasswordChange(values, restForm) {
        console.log(accountData?._id)
        console.log(accountData?.account)
        console.log(values)
        setLoader(true)
        const { data } = await server.post(
            "users/changeAccountPassword",
            {
                'user_id': userID,
                'current_password': values?.currentPassword,
                'updated_password': values?.newPassword,
                'account_type': userAccount
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (data) {

            if (data?.message) {
                toast({
                    title: 'You changed your password',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'top-accent',
                })
                userType.password = values?.newPassword
                let userObj = CryptoJS.AES.encrypt(JSON.stringify(userType), 'userObject').toString();
                localStorage.setItem('User', JSON.stringify(userObj));
                componentUpdater ? setComponentUpdater(false) : setComponentUpdater(true)
                onClosechangepasswordModal()
                setLoader(false)

            }
            else if (data?.error) {
                setLoader(false)
                toast({
                    title: `${data.error}`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'top-accent',
                })
            }
        }

    }
    async function handle2faEnable(values, resetForm) {
        setLoader(true)
        const { data } = await server.post(
            "users/change2faSettings",
            {
                'user_id': userID,
                'is_two_FA': true,
                'account_type': userAccount
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (data) {

            console.log(data)
            onCloseChange2FAModal()
            setLoader(false)
            toast({
                title: 'You enabled two-factor authentication',

                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
                variant: 'top-accent',
            })
            userType.is_two_FA = true
            let userObj = CryptoJS.AES.encrypt(JSON.stringify(userType), 'userObject').toString();
            localStorage.setItem('User', JSON.stringify(userObj));
            componentUpdater ? setComponentUpdater(false) : setComponentUpdater(true)
        }
    }
    async function handle2faDisable() {
        setLoader(true)
        const { data } = await server.post(
            "users/change2faSettings",
            {
                'user_id': userID,
                'is_two_FA': false,
                'account_type': userAccount
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (data) {

            console.log(data)
            onCloseChange2FAModal()
            setLoader(false)
            toast({
                title: 'You disabled two-factor authentication',

                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
                variant: 'top-accent',
            })
            userType.is_two_FA = false
            let userObj = CryptoJS.AES.encrypt(JSON.stringify(userType), 'userObject').toString();
            localStorage.setItem('User', JSON.stringify(userObj));
            componentUpdater ? setComponentUpdater(false) : setComponentUpdater(true)
        }
    }
    const handleLogout = async () => {
        setLoader(true)
        if (userAccount == "gallery") {

            const { data } = await server.post(
                "/users/Loginsession",
                { gallery_last_login: new Date(), gallery_login_count: "1", email: accountData?.email, account_type: userAccount }
                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        }


        const { dataa } = await server.post(
            "/notification/updateNotification",
            { userId: userID }
            ,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        if (dataa) {
            setLoader(false)

            dispatch(setToken(''))
            dispatch(setUser(''))
            localStorage.clear()




            navigate("/Login")
            toast({
                title: 'Success',
                description: `Logout Successful`,
                status: 'success',
                duration: 4000,
                variant: 'top-accent',
                isClosable: true,
                position: 'top-right'
            })
        }
        else {
            setLoader(false)

            dispatch(setToken(''))
            dispatch(setUser(''))
            localStorage.clear()




            navigate("/Login")
            toast({
                title: 'Success',
                description: `Logout Successful`,
                status: 'success',
                duration: 4000,
                variant: 'top-accent',
                isClosable: true,
                position: 'top-right'
            })
        }
    }
    const handleChaneCryptoWallet = async () => {
        const web3Modal = new Web3Modal(
            {

                providerOptions,
            }
        );
        web3Modal.connect().then(async (r) => {
            console.log(r)
            if (r?.networkVersion == "0x4" || r?.chainId == "0x4") {

                console.log(r)
                const web3 = new Web3(r);
                const account = (await web3.eth.getAccounts())
                ///users/changeWalletAddress
                setLoader(true)
                const { data } = await server.post(
                    "users/changeWalletAddress",
                    {
                        'userId': userID,
                        'walletAddress': account[0],
                        'accountType': userAccount
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                if (data) {
                    if (data?.account_type == "artist")
                        userType.artist_wallet_account = account[0]
                    else
                        userType.collector_wallet_public_key = account[0]
                    let userObj = CryptoJS.AES.encrypt(JSON.stringify(userType), 'userObject').toString();
                    localStorage.setItem('User', JSON.stringify(userObj));
                    toast({
                        title: 'Success',
                        description: `${data?.message}`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position: 'top-right',
                        variant: 'top-accent',
                    })
                    componentUpdater ? setComponentUpdater(false) : setComponentUpdater(true)
                    setLoader(false)
                    localStorage.removeItem("walletconnect")


                }


            }
            else {
                localStorage.removeItem("walletconnect")
                toast({
                    title: 'Failure',
                    description: `please switch to  network`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true, variant: 'top-accent',
                    position: 'top-right',
                })
            }
        })


    }
    if (loader) {
        return (
            <Box height='100vh' display='flex'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#0C0B86'
                    size='xl'
                    margin='auto'

                /></Box>
        )
    }
    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box display={'flex'} flexDirection={'column'} marginBottom={'1.5rem'} alignItems={'start'} py={15} px={{ base: '8', sm: '12', md: '6', lg: '6' }} minH={'136'} bg={'#fff'}>
                    <Flex w={'100%'} display={{ base: "block", sm: "flex", md: "flex", lg: "flex" }}>
                        <Box mr={'auto'} mt={'6px'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px">{accountData?.name}</Heading>
                        </Box>
                    </Flex>
                    <Heading mt={'48px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>Manage your account</Heading>
                </Box>
                <Box px={{ base: '2', sm: '4', md: '6', lg: '6' }} bg={'#fff'} >
                    {accountData?.accountType == "gallery" ?
                        <>
                            <Divider />
                            <Flex flexWrap={'wrap'}>
                                <Box width={{ base: '100%', sm: '100%', md: '35%' }} p={8}>
                                    <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} >
                                        Subscription details
                                    </Text>
                                    <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                                        You’re on the premier plan
                                    </Text>
                                </Box>
                                <Box width={{ base: '100%', sm: '100%', md: '65%' }} p={8}>
                                    <Grid p={0} templateColumns={{ base: "repeat(1 , 1fr)", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} gap={6}>
                                        <Button
                                            color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' _focus={{ bg: "transparent", }} _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} marginLeft='auto' marginRight={'1rem'} width={'100%'} >
                                            <Link isExternal href='https://www.stripe.com' fontSize={'14px'} fontWeight={'500'} mb={0} w={'100%'} display={'block'}>
                                                Manage with Stripe
                                                <Icon ml={1} width="17px" height="16px" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.16667 4V5.33333H3.83333V12.6667H11.1667V9.33333H12.5V13.3333C12.5 13.5101 12.4298 13.6797 12.3047 13.8047C12.1797 13.9298 12.0101 14 11.8333 14H3.16667C2.98986 14 2.82029 13.9298 2.69526 13.8047C2.57024 13.6797 2.5 13.5101 2.5 13.3333V4.66667C2.5 4.48986 2.57024 4.32029 2.69526 4.19526C2.82029 4.07024 2.98986 4 3.16667 4H7.16667ZM14.5 2V7.33333H13.1667V4.27533L7.97133 9.47133L7.02867 8.52867L12.2233 3.33333H9.16667V2H14.5Z" fill="#201F1F" />
                                                </Icon>
                                            </Link>
                                        </Button>
                                    </Grid>
                                </Box>
                            </Flex>
                        </>
                        : null
                    }
                    <Divider />
                    <Flex flexWrap={'wrap'}>
                        <Box width={{ base: '100%', sm: '100%', md: '35%' }} p={8}>
                            <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                                Security details
                            </Text>
                            <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                                Information about your account security settings
                            </Text>
                        </Box>
                        <Box width={{ base: '100%', sm: '100%', md: '65%' }} p={8}>
                            <Grid marginTop='1rem' templateColumns={{ base: "repeat(1 , 1fr)", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} mx={'auto'} gap={6} mb={8}>
                                <Box>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                        Email address
                                    </Text>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                        {accountData?.email}
                                    </Text>
                                </Box>
                                <Box>
                                    <Button color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }} _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }} marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={onChangeEmailOpen} cursor={'pointer'}>
                                        Change email
                                    </Button>
                                </Box>
                                <Box mb={'14px'}>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                        Password
                                    </Text>
                                    <Text fontSize={'30px'} lineHeight={'14px'} fontWeight={'500'} mb={'0rem'} color={'#636262'}>{passwordString}</Text>
                                </Box>
                                <Box>
                                    <Button color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }} _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }} marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={onOpenchangepasswordModal}>
                                        Change password
                                    </Button>
                                </Box>
                                <Box>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                        Two-factor authentication
                                    </Text>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                        {accountData?.TwoFA == false ?
                                            <Text>Disabled</Text> : <Text>Enabled</Text>}
                                    </Text>
                                </Box>
                                <Box>
                                    <Button color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }} _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }} marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={onOpenChange2FAModal}>
                                        Change 2FA settings
                                    </Button>
                                </Box>
                                {accountData?.accountType == "artist" || accountData?.accountType == "collector" ?
                                    <>
                                        <Box>
                                            <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                                Crypto Wallet
                                            </Text>
                                            <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                                {accountData?.walletAccount?.slice(0, 6) + "..." + accountData?.walletAccount?.slice(36, 42)}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Button color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }} _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }} marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={handleChaneCryptoWallet}>
                                                Change Crypto Wallet
                                            </Button>
                                        </Box>
                                    </>
                                    :
                                    null
                                }
                            </Grid>
                        </Box>
                    </Flex>
                    <Divider />
                    <Flex flexWrap={'wrap'}>
                        <Box width={{ base: '100%', sm: '100%', md: '35%' }} p={8}>
                            <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                                Log out
                            </Text>
                            <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                                Log out of your DadaVault account
                            </Text>
                        </Box>
                        <Box width={{ base: '100%', sm: '100%', md: '65%' }} p={8}>
                            <Button textAlign={'center'} border='1px solid #DD2922' borderRadius={'0px'} bg='#DD2922' color='#FFF' _focus={{ bg: "#9B2C2C", }} _disabled={{ bg: '#DD2922', opacity: '0.5' }} _hover={{ bg: "#C53030", }} _active={{ bg: "#9B2C2C", }} width={'100%'} onClick={handleLogout} cursor={'pointer'} rightIcon={<IoExit />} maxW={'308px'}>
                                Log out
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Box>





            <Modal onClose={onChangeEmailClose} isOpen={isChangeEmailOpen} size={'xl'} >
                <ModalOverlay />
                <ModalContent>
                    <ModalBody py={'1.5rem'} px={'0rem'}>
                        <Formik
                            initialValues={{ currentemail: accountData?.email, newemail: "" }}
                            validationSchema={validationSchemaEmail}
                            onSubmit={(values, { resetForm }) => {
                                handleEmailChange(values, resetForm);
                            }}
                        >
                            {(formikProps) => (
                                <>
                                    <Text px={'1.5rem'} fontSize={'16px'} lineHeight={'28px'} fontWeight={'700'} color={'#363535'} mb={2} >Change Email</Text>
                                    <Divider mb={6} />
                                    <Box width={'50%'} px={'1.5rem'}>
                                        <Text fontSize={'16px'} lineHeight={'24px'} fontWeight={'500'} mb={2} color={'#636262'}>Current email</Text>
                                        <Input
                                            mb={3} type="text"
                                            bg={'#fff'}
                                            borderRadius={'0'}
                                            borderColor={'#D2D2D2'}
                                            color={'#363535'}
                                            mb={4}
                                            placeHolder={'Enter your current email address'}
                                            _placeholder={{ color: '#201F1F5C' }}
                                            value={formikProps.values.currentemail}
                                            onChange={formikProps.handleChange("currentemail")}
                                            onBlur={formikProps.handleBlur("currentemail")}
                                            isDisabled
                                        />
                                        <Text fontSize={'16px'} lineHeight={'24px'} fontWeight={'500'} mb={2} color={'#636262'} >New email</Text>
                                        <Box mb={5}>
                                            <Input
                                                mb={1}
                                                type="text"
                                                name="email"
                                                id="email"
                                                bg={'#fff'}
                                                borderRadius={'0'}
                                                borderColor={(formikProps.errors.newemail && formikProps.touched.newemail) ? '#DD2922' : ' #D2D2D2'}
                                                border={(formikProps.errors.newemail && formikProps.touched.newemail) ? '2px solid #DD2922' : '1px solid #D2D2D2'}
                                                fontWeight={'400'}
                                                color={'#363535'}
                                                placeHolder={'Enter your new email address'}
                                                _placeholder={{ color: '#201F1F5C' }}
                                                value={formikProps.values.newemail}
                                                onChange={formikProps.handleChange("newemail")}
                                                onBlur={formikProps.handleBlur("newemail")}
                                                error={
                                                    formikProps.errors.newemail && formikProps.touched.newemail
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <div>
                                                {formikProps.errors.newemail && formikProps.touched.newemail && (
                                                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>
                                                        {formikProps.errors.newemail}
                                                    </Alert>
                                                )}
                                            </div>
                                        </Box>
                                        <Box>
                                            <Button borderRadius={'0px'} border={'1px solid #D2D2D2'} color={'#201F1F'} bg={'transparent'}
                                                onClick={
                                                    () => {
                                                        onChangeEmailClose()
                                                    }
                                                }
                                                _focus={{ bg: "#D2D2D2", }} _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}

                                            >
                                                Cancel
                                            </Button>
                                            <Button mx={'1rem'} bg={'#0F0EA7'} color={'#fff'} __focus={{ bg: "#090864", }} _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                _disabled={{ bg: '#0F0EA750' }} borderRadius={'0px'} isDisabled={(formikProps?.values?.currentemail && formikProps?.values?.newemail) ? false : true}
                                                onClick={formikProps?.handleSubmit}
                                            >

                                                Save
                                            </Button>
                                        </Box>


                                    </Box>

                                </>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal onClose={onClosechangepasswordModal} isOpen={changepasswordModalOpen} size={'xl'} >
                <ModalOverlay />
                <ModalContent  >
                    <ModalBody py={'1.5rem'} px={'0rem'}>
                        <Formik
                            initialValues={{ currentPassword: "", newPassword: "" }}
                            validationSchema={validationSchemaPassword}
                            onSubmit={(values, { resetForm }) => {
                                handlePasswordChange(values, resetForm);
                            }}
                        >
                            {(formikProps) => (
                                <>
                                    <Text fontSize={'16px'} px={'1.5rem'} lineHeight={'28px'} fontWeight={'700'} color={'#363535'} mb={2} >Change password</Text>
                                    <Divider mb={6} />
                                    <Box width={'50%'} px={'1.5rem'}>
                                        <Text fontSize={'16px'} lineHeight={'24px'} fontWeight={'500'} mb={2} color={'#636262'}>Current password</Text>
                                        <Box mb={2}>
                                            <Input

                                                mb={1} type="password"
                                                bg={'#fff'}
                                                borderRadius={'0'}

                                                color={'#363535'}
                                                borderColor={(formikProps.errors.currentPassword && formikProps.touched.currentPassword) ? '#DD2922' : ' #D2D2D2'}
                                                border={(formikProps.errors.currentPassword && formikProps.touched.currentPassword) ? '2px solid #DD2922' : '1px solid #D2D2D2'}
                                                placeHolder={'Enter your current password'}
                                                _placeholder={{ color: '#201F1F5C' }}
                                                value={formikProps.values.currentPassword}
                                                onChange={formikProps.handleChange("currentPassword")}
                                                onBlur={formikProps.handleBlur("currentPassword")}
                                                error={
                                                    formikProps.errors.currentPassword && formikProps.touched.currentPassword
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <div>
                                                {formikProps.errors.currentPassword && formikProps.touched.currentPassword && (
                                                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>
                                                        {formikProps.errors.currentPassword}
                                                    </Alert>
                                                )}
                                            </div>
                                        </Box>
                                        <Text fontSize={'16px'} lineHeight={'24px'} fontWeight={'500'} mb={2} color={'#636262'} >New password</Text>
                                        <Box mb={5}>
                                            <Input
                                                mb={1}
                                                type="password"
                                                name="email"
                                                id="email"
                                                bg={'#fff'}
                                                borderRadius={'0'}
                                                borderColor={(formikProps.errors.newPassword && formikProps.touched.newPassword) ? '#DD2922' : ' #D2D2D2'}
                                                border={(formikProps.errors.newPassword && formikProps.touched.newPassword) ? '2px solid #DD2922' : '1px solid #D2D2D2'}
                                                fontWeight={'400'}
                                                color={'#363535'}
                                                placeHolder={'Enter your new email password'}
                                                _placeholder={{ color: '#201F1F5C' }}
                                                value={formikProps.values.newPassword}
                                                onChange={formikProps.handleChange("newPassword")}
                                                onBlur={formikProps.handleBlur("newPassword")}
                                                error={
                                                    formikProps.errors.newPassword && formikProps.touched.newPassword
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <div>
                                                {formikProps.errors.newPassword && formikProps.touched.newPassword && (
                                                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>
                                                        {formikProps.errors.newPassword}
                                                    </Alert>
                                                )}
                                            </div>
                                        </Box>
                                        <Box>
                                            <Button borderRadius={'0px'} border={'1px solid #D2D2D2'} bg={'transparent'} color={'#201F1F'} onClick={() => {
                                                onClosechangepasswordModal()
                                            }}
                                                _focus={{ bg: "#D2D2D2", }} _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button mx={'1rem'} bg={'#0F0EA7'} color={'#fff'} _focus={{ bg: "#090864", }} _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                _disabled={{ bg: '#0F0EA750' }} borderRadius={'0px'} onClick={formikProps.handleSubmit}
                                                isDisabled={(formikProps?.values?.currentPassword && formikProps?.values?.newPassword) ? false : true} >
                                                Save
                                            </Button>
                                        </Box>


                                    </Box>
                                </>
                            )}
                        </Formik>


                    </ModalBody>

                </ModalContent>
            </Modal>
            <Modal onClose={onCloseChange2FAModal} isOpen={Change2FAModalOpen} size={'xl'} >
                <ModalOverlay />
                <ModalContent  >
                    <ModalBody py={'1.5rem'} px={'0px'}>
                        <Text fontSize={'16px'} lineHeight={'28px'} px={'1.5rem'} fontWeight={'700'} color={'#363535'} mb={2} >Change 2FA settings</Text>
                        <Divider mb={6} borderColor={'#D2D2D2'} />
                        <Box width={'100%'} px={'1.5rem'} mb={10}>
                            <Box display={'flex'} mb={6}>
                                <Box>
                                    <Text fontSize={'16px'} lineHeight={'24px'} fontWeight={'600'} mb={2} color={'#363535'}>Email</Text>
                                    {accountData?.TwoFA ?
                                        <Text color={'#008A27'} fontWeight={'500'} lineHeight={'24px'} fontSize={'14px'}>
                                            <Icon width="16px" mr={'10px'} height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99992 14.6667C4.31792 14.6667 1.33325 11.682 1.33325 8.00004C1.33325 4.31804 4.31792 1.33337 7.99992 1.33337C11.6819 1.33337 14.6666 4.31804 14.6666 8.00004C14.6666 11.682 11.6819 14.6667 7.99992 14.6667ZM7.33525 10.6667L12.0486 5.95271L11.1059 5.01004L7.33525 8.78137L5.44925 6.89537L4.50659 7.83804L7.33525 10.6667Z" fill="#008A27" />
                                            </Icon>
                                            Enabled
                                        </Text>
                                        :
                                        <Text color={'#d62700'} fontWeight={'500'} lineHeight={'24px'} fontSize={'14px'} display={'flex'} alignItems={'center'}>
                                            <Text as={'span'} fontSize={'16px'} paddingRight={'0.5rem'}><IoCloseCircleOutline /></Text>
                                            Disabled
                                        </Text>
                                    }
                                </Box>


                                {accountData?.TwoFA == true ?
                                    <Icon ml={'auto'} cursor={'pointer'} width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handle2faDisable}>
                                        <rect width="32" height="32" fill="#E6E6E6" />
                                        <path d="M19.3333 12H22.6666V13.3334H21.3333V22C21.3333 22.1769 21.263 22.3464 21.138 22.4714C21.013 22.5965 20.8434 22.6667 20.6666 22.6667H11.3333C11.1564 22.6667 10.9869 22.5965 10.8618 22.4714C10.7368 22.3464 10.6666 22.1769 10.6666 22V13.3334H9.33325V12H12.6666V10C12.6666 9.82323 12.7368 9.65366 12.8618 9.52864C12.9869 9.40361 13.1564 9.33337 13.3333 9.33337H18.6666C18.8434 9.33337 19.013 9.40361 19.138 9.52864C19.263 9.65366 19.3333 9.82323 19.3333 10V12ZM13.9999 15.3334V19.3334H15.3333V15.3334H13.9999ZM16.6666 15.3334V19.3334H17.9999V15.3334H16.6666ZM13.9999 10.6667V12H17.9999V10.6667H13.9999Z" fill="#636262" />
                                    </Icon>
                                    :
                                    // <Icon ml={'auto'} width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handle2faEnable}>
                                    //     <rect width="32" height="32" fill="#E6E6E6"/>
                                    //     <path d="M19.3333 12H22.6666V13.3334H21.3333V22C21.3333 22.1769 21.263 22.3464 21.138 22.4714C21.013 22.5965 20.8434 22.6667 20.6666 22.6667H11.3333C11.1564 22.6667 10.9869 22.5965 10.8618 22.4714C10.7368 22.3464 10.6666 22.1769 10.6666 22V13.3334H9.33325V12H12.6666V10C12.6666 9.82323 12.7368 9.65366 12.8618 9.52864C12.9869 9.40361 13.1564 9.33337 13.3333 9.33337H18.6666C18.8434 9.33337 19.013 9.40361 19.138 9.52864C19.263 9.65366 19.3333 9.82323 19.3333 10V12ZM13.9999 15.3334V19.3334H15.3333V15.3334H13.9999ZM16.6666 15.3334V19.3334H17.9999V15.3334H16.6666ZM13.9999 10.6667V12H17.9999V10.6667H13.9999Z" fill="#636262"/>
                                    // </Icon>
                                    <Icon ml={'auto'} cursor={'pointer'} width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handle2faEnable}>
                                        <rect width="32" height="32" fill="#E6E6E6" />
                                        <path d="M12.8287 20H10V17.1713L17.6233 9.54797C17.7484 9.42299 17.9179 9.35278 18.0947 9.35278C18.2714 9.35278 18.441 9.42299 18.566 9.54797L20.452 11.434C20.577 11.559 20.6472 11.7285 20.6472 11.9053C20.6472 12.0821 20.577 12.2516 20.452 12.3766L12.8287 20ZM10 21.3333H22V22.6666H10V21.3333Z" fill="#636262" />
                                    </Icon>


                                }
                            </Box>
                            {accountData?.TwoFA ?
                                <Text fontSize={'14px'} lineHeight={'24px'} fontWeight={'400'} mb={2} color={'#636262'}>You’re receiving 2FA verification codes at your email address.</Text>
                                :
                                <Text fontSize={'14px'} lineHeight={'24px'} fontWeight={'400'} mb={2} color={'#636262'}>You’re not receiving 2FA verification codes at your email address.</Text>
                            }
                        </Box>

                        <Divider borderColor={'#D2D2D2'} />

                    </ModalBody>

                </ModalContent>
            </Modal>



        </>
    );
};

export default AccountSetting;
